import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, progress } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

// All valid step IDs (dashboard steps + questionnaire sub-steps)
const VALID_STEP_IDS = new Set([
  // Dashboard steps
  "invite",
  "questionnaire",
  "financial-disclosure",
  "collaboration",
  "documents",
  "attorney",
  "review-notarize",
  // Questionnaire sub-steps
  "introduction",
  "property",
  "debts",
  "financial",
  "spousal-support",
  "legal-representation",
  "optional-clauses",
  "additional-documents",
]);

async function getUser(clerkId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);
  return user ?? null;
}

/**
 * GET /api/progress
 * Load the current user's completed steps.
 */
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUser(clerkId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (!user.coupleId) {
    return NextResponse.json({ completedSteps: ["invite"] });
  }

  const [row] = await db
    .select()
    .from(progress)
    .where(
      and(
        eq(progress.coupleId, user.coupleId),
        eq(progress.userId, user.id)
      )
    )
    .limit(1);

  return NextResponse.json({
    completedSteps: row?.completedSteps ?? ["invite"],
  });
}

/**
 * PUT /api/progress
 * Sync completed steps to the database.
 */
export async function PUT(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUser(clerkId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!user.coupleId) return NextResponse.json({ error: "No couple linked" }, { status: 400 });

  let body: { completedSteps: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { completedSteps: rawSteps } = body;

  // Validate: must be an array of strings with valid step IDs
  if (!Array.isArray(rawSteps)) {
    return NextResponse.json({ error: "completedSteps must be an array" }, { status: 400 });
  }

  const completedSteps = rawSteps.filter(
    (s): s is string => typeof s === "string" && VALID_STEP_IDS.has(s)
  );

  // Users can freely add or remove completed steps (e.g., going back to fix
  // answers). The real safeguard is on document generation, which independently
  // verifies all steps are complete before producing the prenup.
  await db
    .insert(progress)
    .values({
      coupleId: user.coupleId,
      userId: user.id,
      completedSteps,
    })
    .onConflictDoUpdate({
      target: [progress.coupleId, progress.userId],
      set: {
        completedSteps,
        updatedAt: new Date(),
      },
    });

  return NextResponse.json({ success: true });
}
