import { db } from "@/lib/db";
import { couples, users } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

// 20 validation attempts per 15 minutes per IP — prevents token enumeration
const validateLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, maxRequests: 20 });

/**
 * GET /api/invite/validate?token=xxx
 * Check if an invite token is valid. Public route (no auth required).
 */
export async function GET(req: Request) {
  // Rate limit: prevent token enumeration on this public endpoint
  const { limited, retryAfter } = validateLimiter.check(getClientIp(req));
  if (limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  const [couple] = await db
    .select()
    .from(couples)
    .where(eq(couples.inviteToken, token))
    .limit(1);

  if (!couple) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }

  // Already accepted
  if (couple.partnerUserId) {
    return NextResponse.json({ error: "Already accepted" }, { status: 410 });
  }

  // Check expiry
  if (couple.inviteExpiresAt && new Date() > new Date(couple.inviteExpiresAt)) {
    return NextResponse.json({ error: "Invite expired" }, { status: 410 });
  }

  // Get sender name
  let senderName = "Your partner";
  if (couple.primaryUserId) {
    const [sender] = await db
      .select()
      .from(users)
      .where(and(eq(users.id, couple.primaryUserId), isNull(users.deletedAt)))
      .limit(1);

    if (sender) {
      senderName = [sender.firstName, sender.lastName].filter(Boolean).join(" ") || "Your partner";
    }
  }

  return NextResponse.json({ valid: true, senderName });
}
