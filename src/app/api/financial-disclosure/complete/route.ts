import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, financialDisclosures } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * POST /api/financial-disclosure/complete
 * Mark financial disclosure as completed.
 */
export async function POST() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!user.coupleId) return NextResponse.json({ error: "No couple linked" }, { status: 400 });

  const result = await db
    .update(financialDisclosures)
    .set({ completedAt: new Date(), updatedAt: new Date() })
    .where(
      and(
        eq(financialDisclosures.userId, user.id),
        eq(financialDisclosures.coupleId, user.coupleId)
      )
    )
    .returning();

  if (result.length === 0) {
    return NextResponse.json(
      { error: "No disclosure data found. Save data first." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
