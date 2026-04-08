import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/terms",
  "/privacy",
  "/disclaimer",
  "/invite/accept(.*)",
  "/api/webhooks/(.*)",
  "/api/invite/validate(.*)",
]);

// Routes exempt from CSRF origin checking (webhooks receive legitimate cross-origin requests)
const isCsrfExempt = createRouteMatcher([
  "/api/webhooks/(.*)",
]);

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

/**
 * CSRF protection: for state-mutating API requests, verify the Origin header
 * matches the app's URL. Browsers always send the Origin header on cross-origin
 * requests and on same-origin POST/PUT/DELETE, so a mismatch indicates a
 * cross-site request forgery attempt.
 *
 * Returns a 403 response if the check fails, or null if the request is allowed.
 */
function checkCsrf(request: NextRequest): NextResponse | null {
  // Only check mutating methods on API routes
  if (!MUTATING_METHODS.has(request.method)) return null;
  if (!request.nextUrl.pathname.startsWith("/api/")) return null;
  if (isCsrfExempt(request)) return null;

  const origin = request.headers.get("origin");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  // In development without APP_URL configured, allow requests (same as auth bypass)
  if (!appUrl && process.env.NODE_ENV !== "production") return null;

  // If no Origin header is present, the browser omitted it (same-origin GET-like
  // navigation or non-browser client). For safety, require it on mutating requests.
  if (!origin) {
    return NextResponse.json(
      { error: "Missing Origin header" },
      { status: 403 }
    );
  }

  // Normalize: compare origin against allowed origins
  const allowedOrigins = [appUrl];
  // Also allow localhost variations in development
  if (process.env.NODE_ENV !== "production") {
    allowedOrigins.push("http://localhost:3000", "http://127.0.0.1:3000");
  }

  if (!allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: "CSRF origin mismatch" },
      { status: 403 }
    );
  }

  return null;
}

const clerkKeyConfigured =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("REPLACE_ME");

const isProduction = process.env.NODE_ENV === "production";

function getMiddleware() {
  if (clerkKeyConfigured) {
    // Normal authenticated middleware
    return clerkMiddleware(async (auth, request) => {
      // CSRF check on mutating API requests
      const csrfResponse = checkCsrf(request);
      if (csrfResponse) return csrfResponse;

      const url = request.nextUrl;

      // After sign-in/sign-up, if there's an invite_token in the URL,
      // redirect to /invite/complete to finalize the partner link
      if (
        !isPublicRoute(request) &&
        url.pathname !== "/invite/complete" &&
        url.searchParams.has("invite_token")
      ) {
        const token = url.searchParams.get("invite_token")!;
        const completeUrl = new URL("/invite/complete", url.origin);
        completeUrl.searchParams.set("token", token);
        return NextResponse.redirect(completeUrl);
      }

      if (!isPublicRoute(request)) {
        await auth.protect();
      }
    });
  }

  if (isProduction) {
    // SAFETY: In production, refuse to serve ANY requests if Clerk is not configured.
    // This prevents deploying a completely unprotected app.
    console.error(
      "[FATAL] Clerk is not configured. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY before deploying to production."
    );
    return function blockedMiddleware() {
      return new NextResponse(
        "Application misconfigured: authentication provider is not set up. Please contact the site administrator.",
        { status: 503 }
      );
    };
  }

  // Development only: allow requests through without auth, but warn loudly
  console.warn(
    "[DEV WARNING] Clerk is not configured — all routes are unprotected. This is OK for local development only."
  );
  return function devNoopMiddleware(request: NextRequest) {
    const csrfResponse = checkCsrf(request);
    if (csrfResponse) return csrfResponse;
    return NextResponse.next();
  };
}

export default getMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
