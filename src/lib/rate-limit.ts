/**
 * Simple in-memory rate limiter.
 *
 * Suitable for single-server deployments. For multi-server / serverless
 * deployments, replace the in-memory Map with a Redis-backed store
 * (e.g. @upstash/ratelimit or ioredis).
 */

interface RateLimitEntry {
  count: number;
  /** Timestamp (ms) when this window started */
  windowStart: number;
}

interface RateLimitResult {
  /** True if the request should be blocked */
  limited: boolean;
  /** Seconds until the client can retry (only set when limited) */
  retryAfter?: number;
}

interface RateLimiterOptions {
  /** Time window in milliseconds */
  windowMs: number;
  /** Maximum requests allowed per window */
  maxRequests: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

/** Interval handle for the cleanup timer (created once). */
let cleanupStarted = false;

function startCleanup() {
  if (cleanupStarted) return;
  cleanupStarted = true;

  // Every 60 seconds, purge expired entries from all stores
  setInterval(() => {
    const now = Date.now();
    for (const [, store] of stores) {
      for (const [key, entry] of store) {
        // Find the max windowMs among all limiters — conservative 5-minute max
        if (now - entry.windowStart > 5 * 60 * 1000) {
          store.delete(key);
        }
      }
    }
  }, 60_000).unref();
}

/**
 * Create a rate limiter instance with the given window and max requests.
 *
 * Usage:
 *   const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 5 });
 *
 *   // In your route handler:
 *   const ip = req.headers.get("x-forwarded-for") ?? "unknown";
 *   const { limited, retryAfter } = limiter.check(ip);
 *   if (limited) {
 *     return NextResponse.json(
 *       { error: "Too many requests" },
 *       { status: 429, headers: { "Retry-After": String(retryAfter) } }
 *     );
 *   }
 */
export function createRateLimiter(options: RateLimiterOptions) {
  const { windowMs, maxRequests } = options;
  const storeKey = `${windowMs}:${maxRequests}:${Math.random()}`;
  const store = new Map<string, RateLimitEntry>();
  stores.set(storeKey, store);

  startCleanup();

  return {
    /**
     * Check (and count) a request for the given key (IP address, user ID, etc.).
     * Returns whether the request is rate-limited.
     */
    check(key: string): RateLimitResult {
      const now = Date.now();
      const entry = store.get(key);

      if (!entry || now - entry.windowStart >= windowMs) {
        // Start a new window
        store.set(key, { count: 1, windowStart: now });
        return { limited: false };
      }

      entry.count += 1;

      if (entry.count > maxRequests) {
        const retryAfter = Math.ceil(
          (entry.windowStart + windowMs - now) / 1000
        );
        return { limited: true, retryAfter };
      }

      return { limited: false };
    },
  };
}

/**
 * Extract a client identifier from a Request for rate-limiting purposes.
 * Checks x-forwarded-for (standard proxy header) and x-real-ip (Vercel).
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "anonymous";
}
