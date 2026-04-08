import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { couples, users } from "@/lib/db/schema";
import { eq, and, isNull, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * POST /api/invite/accept
 * Accept a partner invite. Requires authentication (partner must have signed up first).
 * Body: { token: string }
 */
export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { token?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { token } = body;

  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  // Find the couple by invite token (initial read — we re-verify inside the transaction)
  const [couple] = await db
    .select()
    .from(couples)
    .where(eq(couples.inviteToken, token))
    .limit(1);

  if (!couple) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 404 });
  }

  if (couple.partnerUserId) {
    return NextResponse.json({ error: "Invite already accepted" }, { status: 410 });
  }

  // Check if the invite has expired
  if (couple.inviteExpiresAt && new Date() > new Date(couple.inviteExpiresAt)) {
    return NextResponse.json({ error: "This invitation has expired. Ask your partner to send a new one." }, { status: 410 });
  }

  // Find the accepting user
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Don't let the primary partner accept their own invite
  if (couple.primaryUserId === user.id) {
    return NextResponse.json({ error: "Cannot accept your own invite" }, { status: 400 });
  }

  // Don't let someone who already belongs to a couple accept another invite
  if (user.coupleId && user.coupleId !== couple.id) {
    return NextResponse.json(
      { error: "You are already part of another couple" },
      { status: 409 }
    );
  }

  // Use a transaction with a row-level lock to prevent two people from
  // both becoming the partner at the same time.
  try {
    const result = await db.transaction(async (tx) => {
      // Re-read the couple row WITH a lock (SELECT ... FOR UPDATE).
      // This makes any other concurrent transaction wait until this one finishes.
      const [freshCouple] = await tx.execute(
        sql`SELECT id, partner_user_id FROM couples WHERE id = ${couple.id} FOR UPDATE`
      );

      // Re-check: if someone else already became the partner while we were
      // waiting for the lock, stop here.
      if (!freshCouple || freshCouple.partner_user_id !== null) {
        return { alreadyTaken: true };
      }

      // Link partner to couple and invalidate the invite token
      await tx
        .update(couples)
        .set({
          partnerUserId: user.id,
          inviteToken: null, // Invalidate token so it can't be reused
          updatedAt: new Date(),
        })
        .where(eq(couples.id, couple.id));

      // Update user role and link to couple
      await tx
        .update(users)
        .set({
          role: "partner",
          coupleId: couple.id,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id));

      return { alreadyTaken: false };
    });

    if (result.alreadyTaken) {
      return NextResponse.json({ error: "Invite already accepted" }, { status: 410 });
    }
  } catch (err) {
    console.error("Failed to accept invite:", err);
    return NextResponse.json({ error: "Failed to link accounts" }, { status: 500 });
  }

  return NextResponse.json({ success: true, coupleId: couple.id });
}
