// =============================================================================
// GET /api/collaboration/partner-progress
// Returns the partner's completed steps so the current user can see
// their progress in real time.
// =============================================================================

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, couples, progress } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

async function getUser(clerkId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);
  return user ?? null;
}

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(clerkId);
  if (!user || !user.coupleId) {
    return NextResponse.json({ error: "No couple found" }, { status: 404 });
  }

  // Load couple
  const [couple] = await db
    .select()
    .from(couples)
    .where(eq(couples.id, user.coupleId))
    .limit(1);

  if (!couple) {
    return NextResponse.json({ error: "Couple not found" }, { status: 404 });
  }

  // Determine partner's user ID
  const partnerId =
    couple.primaryUserId === user.id
      ? couple.partnerUserId
      : couple.primaryUserId;

  if (!partnerId) {
    return NextResponse.json({
      completedSteps: [],
      partnerJoined: false,
    });
  }

  // Load partner's progress
  const [partnerProgress] = await db
    .select()
    .from(progress)
    .where(
      and(
        eq(progress.coupleId, couple.id),
        eq(progress.userId, partnerId)
      )
    )
    .limit(1);

  // Load partner's user info (first name only for privacy)
  const [partner] = await db
    .select({ firstName: users.firstName })
    .from(users)
    .where(and(eq(users.id, partnerId), isNull(users.deletedAt)))
    .limit(1);

  return NextResponse.json({
    completedSteps: partnerProgress?.completedSteps ?? [],
    partnerJoined: true,
    partnerName: partner?.firstName ?? "Your partner",
  });
}
