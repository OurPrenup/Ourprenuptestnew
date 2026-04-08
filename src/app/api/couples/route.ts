import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, couples } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sanitizeCoupleRecord } from "@/lib/sanitize";

/**
 * POST /api/couples
 * Create a couple record for the current user (called when user starts questionnaire).
 * If user already has a couple, returns it.
 */
export async function POST() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Find user in DB
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
  }

  // If user already has a couple, return it
  if (user.coupleId) {
    const [couple] = await db
      .select()
      .from(couples)
      .where(eq(couples.id, user.coupleId))
      .limit(1);

    return NextResponse.json({ couple: sanitizeCoupleRecord(couple) });
  }

  // Create new couple inside a transaction to prevent race conditions (double-click)
  try {
    const result = await db.transaction(async (tx) => {
      // Re-check inside transaction to prevent race condition
      const [freshUser] = await tx
        .select()
        .from(users)
        .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
        .limit(1);

      if (freshUser?.coupleId) {
        // Another request already created the couple
        const [existingCouple] = await tx
          .select()
          .from(couples)
          .where(eq(couples.id, freshUser.coupleId))
          .limit(1);
        return { couple: existingCouple, created: false };
      }

      const inviteToken = crypto.randomBytes(32).toString("hex");

      const [couple] = await tx
        .insert(couples)
        .values({
          primaryUserId: freshUser!.id,
          inviteToken,
          status: "draft",
        })
        .returning();

      // Link user to couple
      await tx
        .update(users)
        .set({ coupleId: couple.id, role: "primary", updatedAt: new Date() })
        .where(eq(users.id, freshUser!.id));

      return { couple, created: true };
    });

    return NextResponse.json(
      { couple: result.couple ? sanitizeCoupleRecord(result.couple) : null },
      { status: result.created ? 201 : 200 }
    );
  } catch (err) {
    console.error("Failed to create couple:", err);
    return NextResponse.json({ error: "Failed to create couple" }, { status: 500 });
  }
}
