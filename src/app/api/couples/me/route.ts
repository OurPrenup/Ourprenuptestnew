import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, couples } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { sanitizeCoupleRecord } from "@/lib/sanitize";

/**
 * GET /api/couples/me
 * Returns the current user's couple record (or null if none exists).
 * This is a read-only endpoint — it never creates data.
 */
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!user.coupleId) {
    return NextResponse.json({ couple: null });
  }

  const [couple] = await db
    .select()
    .from(couples)
    .where(eq(couples.id, user.coupleId))
    .limit(1);

  return NextResponse.json({ couple: couple ? sanitizeCoupleRecord(couple) : null });
}
