import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, couples } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { sanitizeCoupleRecord } from "@/lib/sanitize";

/**
 * GET /api/couples/[coupleId]
 * Get couple status and info.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ coupleId: string }> }
) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { coupleId } = await params;

  // Verify user belongs to this couple
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);

  if (!user || user.coupleId !== coupleId) {
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

  return NextResponse.json({ couple: sanitizeCoupleRecord(couple) });
}
