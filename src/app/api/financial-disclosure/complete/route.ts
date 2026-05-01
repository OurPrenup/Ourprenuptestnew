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

  // Verify disclosure has actual data before allowing completion
  const [existing] = await db
    .select({ data: financialDisclosures.data })
    .from(financialDisclosures)
    .where(
      and(
        eq(financialDisclosures.userId, user.id),
        eq(financialDisclosures.coupleId, user.coupleId)
      )
    )
    .limit(1);

  if (!existing) {
    return NextResponse.json(
      { error: "No disclosure data found. Save data first." },
      { status: 404 }
    );
  }

  const disclosureData = existing.data as Record<string, unknown> | null;
  const categories = (disclosureData as Record<string, unknown>)?.categories as
    | Record<string, { items: unknown[] }>
    | undefined;
  const hasItems =
    categories &&
    Object.values(categories).some((cat) => cat?.items && cat.items.length > 0);
  const incomeData = (disclosureData as Record<string, unknown>)?.incomeData as
    | { amount: string }[]
    | undefined;
  const hasIncome =
    incomeData &&
    incomeData.some((row) => row.amount && row.amount.trim() !== "");

  if (!hasItems && !hasIncome) {
    return NextResponse.json(
      {
        error:
          "Please add at least one asset, debt, or income entry before marking as complete.",
      },
      { status: 400 }
    );
  }

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
