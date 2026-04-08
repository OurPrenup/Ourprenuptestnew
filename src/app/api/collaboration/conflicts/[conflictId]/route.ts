// =============================================================================
// POST /api/collaboration/conflicts/[conflictId]/resolve
// Saves the agreed-upon resolution for a specific conflict.
// =============================================================================

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, collaborationConflicts } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

async function getUser(clerkId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);
  return user ?? null;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ conflictId: string }> }
) {
  // 1. Auth
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(clerkId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { conflictId } = await params;

  // 2. Parse body
  const body = await request.json();
  const { resolvedAnswer } = body;

  if (resolvedAnswer === undefined) {
    return NextResponse.json(
      { error: "resolvedAnswer is required" },
      { status: 400 }
    );
  }

  // 3. Load the conflict and verify it belongs to this user's couple
  const [conflict] = await db
    .select()
    .from(collaborationConflicts)
    .where(eq(collaborationConflicts.id, conflictId))
    .limit(1);

  if (!conflict) {
    return NextResponse.json(
      { error: "Conflict not found" },
      { status: 404 }
    );
  }

  if (conflict.coupleId !== user.coupleId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 4. Update the conflict with the resolution
  const [updated] = await db
    .update(collaborationConflicts)
    .set({
      resolvedAnswer,
      resolvedBy: user.id,
      updatedAt: new Date(),
    })
    .where(eq(collaborationConflicts.id, conflictId))
    .returning();

  return NextResponse.json({
    id: updated.id,
    stepId: updated.stepId,
    questionId: updated.questionId,
    resolvedAnswer: updated.resolvedAnswer,
    resolvedBy: updated.resolvedBy,
    status: "resolved",
  });
}
