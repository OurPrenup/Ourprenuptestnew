import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, payments } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * GET /api/payments/status
 * Returns which products the current user's couple has purchased.
 */
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);

  if (!user || !user.coupleId) {
    return NextResponse.json({
      hasPrenup: false,
      hasAttorney: false,
      hasNotarization: false,
    });
  }

  const completedPayments = await db
    .select()
    .from(payments)
    .where(
      and(
        eq(payments.coupleId, user.coupleId),
        eq(payments.status, "completed")
      )
    );

  const productTypes = completedPayments.map((p) => p.productType);

  return NextResponse.json({
    hasPrenup: productTypes.includes("prenup"),
    hasAttorney:
      productTypes.includes("attorney_single") ||
      productTypes.includes("attorney_both"),
    hasNotarization: productTypes.includes("notarization"),
  });
}
