// =============================================================================
// GET  /api/collaboration/conflicts — Read-only, returns current conflicts
// POST /api/collaboration/conflicts — Detects & upserts conflicts from answers
// =============================================================================

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import {
  users,
  couples,
  questionnaireAnswers,
  collaborationConflicts,
  progress,
} from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { deepEqual } from "@/lib/utils";

import type { ConflictItem } from "@/lib/types/collaboration";

// Fields where each partner answers about themselves — not conflicts
const PER_PERSON_FIELDS = new Set([
  "introduction:first_name",
  "introduction:last_name",
  "introduction:date_of_birth",
  "introduction:email",
  "introduction:previously_married",
  "introduction:prenup_goals",
]);

const ALL_STEP_IDS = [
  "introduction",
  "property",
  "debts",
  "financial",
  "spousal-support",
  "legal-representation",
  "optional-clauses",
  "additional-documents",
];

async function getUser(clerkId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);
  return user ?? null;
}

async function getCoupleAndPartnerCheck(userId: string, coupleId: string) {
  const [couple] = await db
    .select()
    .from(couples)
    .where(eq(couples.id, coupleId))
    .limit(1);

  if (!couple) return { couple: null, bothComplete: false };

  if (!couple.primaryUserId || !couple.partnerUserId) {
    return { couple, bothComplete: false };
  }

  // Check if both partners have completed ALL steps
  const [primaryProgress] = await db
    .select()
    .from(progress)
    .where(
      and(
        eq(progress.coupleId, couple.id),
        eq(progress.userId, couple.primaryUserId)
      )
    )
    .limit(1);

  const [partnerProgress] = await db
    .select()
    .from(progress)
    .where(
      and(
        eq(progress.coupleId, couple.id),
        eq(progress.userId, couple.partnerUserId)
      )
    )
    .limit(1);

  const primarySteps = primaryProgress?.completedSteps ?? [];
  const partnerSteps = partnerProgress?.completedSteps ?? [];

  const bothComplete =
    ALL_STEP_IDS.every((s) => primarySteps.includes(s)) &&
    ALL_STEP_IDS.every((s) => partnerSteps.includes(s));

  return { couple, bothComplete };
}

// ---------------------------------------------------------------------------
// GET — Read stored conflicts + fresh answer data (no side effects)
// ---------------------------------------------------------------------------
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(clerkId);
  if (!user || !user.coupleId) {
    return NextResponse.json({ error: "No couple found" }, { status: 404 });
  }

  const { couple, bothComplete } = await getCoupleAndPartnerCheck(
    user.id,
    user.coupleId
  );

  if (!couple || !couple.primaryUserId || !couple.partnerUserId) {
    return NextResponse.json({
      conflicts: [],
      bothComplete: false,
      totalConflicts: 0,
      unresolvedCount: 0,
      resolvedCount: 0,
      message: "Partner has not joined yet",
    });
  }

  // Load current answers for both partners
  const primaryAnswerRows = await db
    .select()
    .from(questionnaireAnswers)
    .where(eq(questionnaireAnswers.userId, couple.primaryUserId));

  const partnerAnswerRows = await db
    .select()
    .from(questionnaireAnswers)
    .where(eq(questionnaireAnswers.userId, couple.partnerUserId));

  const primaryByStep: Record<string, Record<string, unknown>> = {};
  for (const row of primaryAnswerRows) {
    primaryByStep[row.stepId] = row.answers as Record<string, unknown>;
  }

  const partnerByStep: Record<string, Record<string, unknown>> = {};
  for (const row of partnerAnswerRows) {
    partnerByStep[row.stepId] = row.answers as Record<string, unknown>;
  }

  // Load stored conflicts (for resolution status)
  const storedConflicts = await db
    .select()
    .from(collaborationConflicts)
    .where(eq(collaborationConflicts.coupleId, couple.id));

  const storedMap = new Map<string, typeof storedConflicts[0]>();
  for (const c of storedConflicts) {
    storedMap.set(`${c.stepId}:${c.questionId}`, c);
  }

  // Diff all steps — always use FRESH answer data
  const allStepIds = new Set([
    ...Object.keys(primaryByStep),
    ...Object.keys(partnerByStep),
  ]);

  const conflicts: ConflictItem[] = [];

  for (const stepId of allStepIds) {
    const primary = primaryByStep[stepId] ?? {};
    const partner = partnerByStep[stepId] ?? {};

    const allQuestionIds = new Set([
      ...Object.keys(primary),
      ...Object.keys(partner),
    ]);

    for (const questionId of allQuestionIds) {
      if (PER_PERSON_FIELDS.has(`${stepId}:${questionId}`)) continue;

      const pVal = primary[questionId];
      const partVal = partner[questionId];

      if (pVal === undefined && partVal === undefined) continue;
      if (pVal === "" && partVal === "") continue;

      if (deepEqual(pVal, partVal)) continue;

      const key = `${stepId}:${questionId}`;
      const stored = storedMap.get(key);

      conflicts.push({
        id: stored?.id ?? null,
        stepId,
        questionId,
        // Always show CURRENT answers, not stale stored ones
        primaryAnswer: pVal ?? null,
        partnerAnswer: partVal ?? null,
        resolvedAnswer: stored?.resolvedAnswer ?? null,
        resolvedBy: stored?.resolvedBy ?? null,
        status: stored?.resolvedAnswer != null ? "resolved" : "unresolved",
      });
    }
  }

  return NextResponse.json({
    conflicts,
    bothComplete,
    totalConflicts: conflicts.length,
    unresolvedCount: conflicts.filter((c) => c.status === "unresolved").length,
    resolvedCount: conflicts.filter((c) => c.status === "resolved").length,
  });
}

// ---------------------------------------------------------------------------
// POST — Detect conflicts and upsert them into the database
// Called explicitly when user visits collaboration page (not on every GET)
// ---------------------------------------------------------------------------
export async function POST() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(clerkId);
  if (!user || !user.coupleId) {
    return NextResponse.json({ error: "No couple found" }, { status: 404 });
  }

  const { couple, bothComplete } = await getCoupleAndPartnerCheck(
    user.id,
    user.coupleId
  );

  if (!couple || !couple.primaryUserId || !couple.partnerUserId) {
    return NextResponse.json({
      conflicts: [],
      bothComplete: false,
      synced: false,
      message: "Partner has not joined yet",
    });
  }

  // Load current answers
  const primaryAnswerRows = await db
    .select()
    .from(questionnaireAnswers)
    .where(eq(questionnaireAnswers.userId, couple.primaryUserId));

  const partnerAnswerRows = await db
    .select()
    .from(questionnaireAnswers)
    .where(eq(questionnaireAnswers.userId, couple.partnerUserId));

  const primaryByStep: Record<string, Record<string, unknown>> = {};
  for (const row of primaryAnswerRows) {
    primaryByStep[row.stepId] = row.answers as Record<string, unknown>;
  }

  const partnerByStep: Record<string, Record<string, unknown>> = {};
  for (const row of partnerAnswerRows) {
    partnerByStep[row.stepId] = row.answers as Record<string, unknown>;
  }

  // Load existing conflicts so we can check if answers actually changed
  const storedConflicts = await db
    .select()
    .from(collaborationConflicts)
    .where(eq(collaborationConflicts.coupleId, couple.id));

  const storedMap = new Map(
    storedConflicts.map((c) => [
      `${c.stepId}:${c.questionId}`,
      { primaryAnswer: c.primaryAnswer, partnerAnswer: c.partnerAnswer },
    ])
  );

  // Diff and upsert
  const allStepIds = new Set([
    ...Object.keys(primaryByStep),
    ...Object.keys(partnerByStep),
  ]);

  let upsertedCount = 0;

  for (const stepId of allStepIds) {
    const primary = primaryByStep[stepId] ?? {};
    const partner = partnerByStep[stepId] ?? {};

    const allQuestionIds = new Set([
      ...Object.keys(primary),
      ...Object.keys(partner),
    ]);

    for (const questionId of allQuestionIds) {
      if (PER_PERSON_FIELDS.has(`${stepId}:${questionId}`)) continue;

      const pVal = primary[questionId];
      const partVal = partner[questionId];

      if (pVal === undefined && partVal === undefined) continue;
      if (pVal === "" && partVal === "") continue;

      if (deepEqual(pVal, partVal)) continue;

      // Upsert: insert if new, update answers if changed.
      // Only clear the resolution if the underlying answers actually changed —
      // otherwise visiting the collaboration page would wipe all resolutions.
      const existingKey = `${stepId}:${questionId}`;
      const existing = storedMap.get(existingKey);
      const answersChanged =
        !existing ||
        !deepEqual(existing.primaryAnswer, pVal ?? null) ||
        !deepEqual(existing.partnerAnswer, partVal ?? null);

      await db
        .insert(collaborationConflicts)
        .values({
          coupleId: couple.id,
          stepId,
          questionId,
          primaryAnswer: pVal ?? null,
          partnerAnswer: partVal ?? null,
        })
        .onConflictDoUpdate({
          target: [
            collaborationConflicts.coupleId,
            collaborationConflicts.stepId,
            collaborationConflicts.questionId,
          ],
          set: {
            primaryAnswer: pVal ?? null,
            partnerAnswer: partVal ?? null,
            // Only wipe the resolution if the answers themselves changed
            ...(answersChanged
              ? { resolvedAnswer: null, resolvedBy: null }
              : {}),
            updatedAt: new Date(),
          },
        });

      upsertedCount++;
    }
  }

  return NextResponse.json({
    synced: true,
    bothComplete,
    upsertedCount,
  });
}
