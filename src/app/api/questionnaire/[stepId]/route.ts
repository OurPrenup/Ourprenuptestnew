import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, questionnaireAnswers, couples, payments } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

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

// Steps that require payment before answers can be saved
const PREMIUM_STEP_IDS = new Set([
  "spousal-support",
  "legal-representation",
  "optional-clauses",
  "additional-documents",
]);

/**
 * Check if the couple has a completed prenup payment.
 */
async function hasPrenupPayment(coupleId: string): Promise<boolean> {
  const [paid] = await db
    .select({ id: payments.id })
    .from(payments)
    .where(
      and(
        eq(payments.coupleId, coupleId),
        eq(payments.productType, "prenup"),
        eq(payments.status, "completed")
      )
    )
    .limit(1);
  return !!paid;
}

async function getUser(clerkId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);
  return user ?? null;
}

/**
 * GET /api/questionnaire/[stepId]
 * Load saved answers for a questionnaire step.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ stepId: string }> }
) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUser(clerkId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { stepId } = await params;

  if (!VALID_STEP_IDS.has(stepId)) {
    return NextResponse.json({ error: "Invalid step ID" }, { status: 400 });
  }

  const [row] = await db
    .select()
    .from(questionnaireAnswers)
    .where(
      and(
        eq(questionnaireAnswers.userId, user.id),
        eq(questionnaireAnswers.stepId, stepId)
      )
    )
    .limit(1);

  return NextResponse.json({
    answers: row?.answers ?? {},
    completedAt: row?.completedAt ?? null,
  });
}

/**
 * PUT /api/questionnaire/[stepId]
 * Save (upsert) answers for a questionnaire step.
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ stepId: string }> }
) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUser(clerkId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!user.coupleId) return NextResponse.json({ error: "No couple linked" }, { status: 400 });

  const { stepId } = await params;

  if (!VALID_STEP_IDS.has(stepId)) {
    return NextResponse.json({ error: "Invalid step ID" }, { status: 400 });
  }

  // Block saves to premium steps unless the couple has paid
  if (PREMIUM_STEP_IDS.has(stepId)) {
    const paid = await hasPrenupPayment(user.coupleId);
    if (!paid) {
      return NextResponse.json(
        { error: "Payment required to access this section" },
        { status: 403 }
      );
    }
  }

  let body: { answers: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { answers } = body;

  // Validate answers is a plain object (not null, not array)
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return NextResponse.json({ error: "Answers must be a valid object" }, { status: 400 });
  }

  // Upsert: insert or update on conflict
  await db
    .insert(questionnaireAnswers)
    .values({
      userId: user.id,
      coupleId: user.coupleId,
      stepId,
      answers,
    })
    .onConflictDoUpdate({
      target: [questionnaireAnswers.userId, questionnaireAnswers.stepId],
      set: {
        answers,
        updatedAt: new Date(),
      },
    });

  // Sync state + wedding date to the couples table so downstream
  // systems (document generation, state engine) can read them.
  if (stepId === "introduction" && user.coupleId) {
    const ans = answers as Record<string, unknown>;
    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (typeof ans.state_of_residence === "string" && ans.state_of_residence) {
      updates.stateCode = ans.state_of_residence;
    }
    if (typeof ans.wedding_date === "string" && ans.wedding_date) {
      updates.weddingDate = ans.wedding_date;
    }
    if (Object.keys(updates).length > 1) {
      await db.update(couples).set(updates).where(eq(couples.id, user.coupleId));
    }
  }

  return NextResponse.json({ success: true });
}
