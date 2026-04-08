import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, couples } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getResend, FROM_EMAIL } from "@/lib/email";
import PartnerInviteEmail from "@/emails/partner-invite";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

// 5 invite emails per 15 minutes per IP — prevents email spam
const inviteLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, maxRequests: 5 });

/**
 * POST /api/couples/[coupleId]/invite
 * Send an invite email to the partner.
 * Body: { partnerName: string, partnerEmail: string }
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ coupleId: string }> }
) {
  // Rate limit: prevent invite email spam
  const { limited, retryAfter } = inviteLimiter.check(getClientIp(req));
  if (limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { coupleId } = await params;

  // Verify user is the primary partner of this couple
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);

  if (!user || user.coupleId !== coupleId || user.role !== "primary") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [couple] = await db
    .select()
    .from(couples)
    .where(eq(couples.id, coupleId))
    .limit(1);

  if (!couple) {
    return NextResponse.json({ error: "Couple not found" }, { status: 404 });
  }

  const { partnerName, partnerEmail } = await req.json();

  if (!partnerName || !partnerEmail) {
    return NextResponse.json({ error: "Name and email required" }, { status: 400 });
  }

  // Update couple with invite info + set expiry (7 days from now)
  const inviteExpiresAt = new Date();
  inviteExpiresAt.setDate(inviteExpiresAt.getDate() + 7);

  await db
    .update(couples)
    .set({
      inviteEmail: partnerEmail,
      inviteExpiresAt,
      updatedAt: new Date(),
    })
    .where(eq(couples.id, coupleId));

  // Build invite URL
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const inviteUrl = `${appUrl}/invite/accept?token=${couple.inviteToken}`;

  // Send the email
  const senderName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Your partner";

  try {
    const resend = getResend();
    await resend.emails.send({
      from: FROM_EMAIL,
      to: partnerEmail,
      subject: `${senderName} invited you to create your prenup together`,
      react: PartnerInviteEmail({ partnerName, senderName, inviteUrl }),
    });
  } catch (err) {
    console.error("Failed to send invite email:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true, inviteUrl });
}
