import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, questionnaireAnswers, payments } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

// Steps that require payment before they can be completed
const PREMIUM_STEP_IDS = new Set([
  "spousal-support",
  "legal-representation",
  "optional-clauses",
  "additional-documents",
]);

// Valid step IDs for the questionnaire
const VALID_STEP_IDS = new Set([
  "introduction",
  "property",
  "debts",
  "financial",
  "spousal-support",
  "legal-representation",
  "optional-clauses",
  "additional-documents",
]);

/**
 * POST /api/questionnaire/[stepId]/complete
 * Mark a questionnaire step as completed.
 */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ stepId: string }> }
) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { stepId } = await params;

  if (!VALID_STEP_IDS.has(stepId)) {
    return NextResponse.json({ error: "Invalid step ID" }, { status: 400 });
  }

  // Block completion of premium steps unless the couple has paid
  if (PREMIUM_STEP_IDS.has(stepId) && user.coupleId) {
    const [paid] = await db
      .select({ id: payments.id })
      .from(payments)
      .where(
        and(
          eq(payments.coupleId, user.coupleId),
          eq(payments.productType, "prenup"),
          eq(payments.status, "completed")
        )
      )
      .limit(1);
    if (!paid) {
      return NextResponse.json(
        { error: "Payment required to complete this section" },
        { status: 403 }
      );
    }
  }

  // Update completedAt timestamp
  const result = await db
    .update(questionnaireAnswers)
    .set({ completedAt: new Date(), updatedAt: new Date() })
    .where(
      and(
        eq(questionnaireAnswers.userId, user.id),
        eq(questionnaireAnswers.stepId, stepId)
      )
    )
    .returning();

  if (result.length === 0) {
    return NextResponse.json(
      { error: "No answers found for this step. Save answers first." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
