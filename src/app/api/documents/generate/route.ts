// =============================================================================
// POST /api/documents/generate
// Orchestrates: fetch answers -> assemble -> render PDF -> save to DB
// =============================================================================

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import {
  users,
  couples,
  questionnaireAnswers,
  financialDisclosures,
  documents,
  payments,
  collaborationConflicts,
} from "@/lib/db/schema";
import { eq, and, sql, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { assembleDocument } from "@/lib/document-assembly/assemble";
import type { StateCode } from "@/legal/types";
import { isStateAvailable, getUnavailableReason } from "@/legal/state-availability";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

// 3 document generations per 10 minutes per IP — CPU-heavy operation
const generateLimiter = createRateLimiter({ windowMs: 10 * 60 * 1000, maxRequests: 3 });

/** All 8 questionnaire steps that must be completed before generation */
const ALL_QUESTIONNAIRE_STEPS = [
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

export async function POST(req: Request) {
  // Rate limit: CPU-heavy PDF generation
  const { limited, retryAfter } = generateLimiter.check(getClientIp(req));
  if (limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  // 1. Auth
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(clerkId);
  if (!user || !user.coupleId) {
    return NextResponse.json({ error: "User or couple not found" }, { status: 404 });
  }

  // 2. Load couple record
  const [couple] = await db
    .select()
    .from(couples)
    .where(eq(couples.id, user.coupleId))
    .limit(1);

  if (!couple) {
    return NextResponse.json({ error: "Couple not found" }, { status: 404 });
  }

  if (!couple.stateCode) {
    return NextResponse.json(
      { error: "State not selected. Complete the questionnaire first." },
      { status: 400 }
    );
  }

  if (!isStateAvailable(couple.stateCode as StateCode)) {
    return NextResponse.json(
      { error: getUnavailableReason(couple.stateCode as StateCode) ?? "This state is not yet supported." },
      { status: 400 }
    );
  }

  if (!couple.primaryUserId) {
    return NextResponse.json(
      { error: "Primary user not found on couple record." },
      { status: 400 }
    );
  }

  // ── Gate 1: Payment ──────────────────────────────────────────────────
  // The couple must have a completed prenup payment.
  const [prenupPayment] = await db
    .select({ id: payments.id })
    .from(payments)
    .where(
      and(
        eq(payments.coupleId, couple.id),
        eq(payments.productType, "prenup"),
        eq(payments.status, "completed")
      )
    )
    .limit(1);

  if (!prenupPayment) {
    return NextResponse.json(
      { error: "Payment required. Please purchase your prenup package before generating documents." },
      { status: 403 }
    );
  }

  // ── Gate 2: Partner must be linked ───────────────────────────────────
  if (!couple.partnerUserId) {
    return NextResponse.json(
      { error: "Your partner must accept the invite and join before documents can be generated." },
      { status: 400 }
    );
  }

  // ── Gate 3: Both parties must complete all questionnaire steps ──────
  // Check primary user's completed steps
  const primaryCompletedRows = await db
    .select({ stepId: questionnaireAnswers.stepId })
    .from(questionnaireAnswers)
    .where(
      and(
        eq(questionnaireAnswers.userId, couple.primaryUserId),
        sql`${questionnaireAnswers.completedAt} IS NOT NULL`
      )
    );
  const primaryCompletedSteps = new Set(primaryCompletedRows.map((r) => r.stepId));
  const primaryMissing = ALL_QUESTIONNAIRE_STEPS.filter((s) => !primaryCompletedSteps.has(s));

  if (primaryMissing.length > 0) {
    return NextResponse.json(
      {
        error: `The primary partner has not completed: ${primaryMissing.join(", ")}. Both partners must finish all questionnaire steps.`,
      },
      { status: 400 }
    );
  }

  // Check partner's completed steps
  const partnerCompletedRows = await db
    .select({ stepId: questionnaireAnswers.stepId })
    .from(questionnaireAnswers)
    .where(
      and(
        eq(questionnaireAnswers.userId, couple.partnerUserId),
        sql`${questionnaireAnswers.completedAt} IS NOT NULL`
      )
    );
  const partnerCompletedSteps = new Set(partnerCompletedRows.map((r) => r.stepId));
  const partnerMissing = ALL_QUESTIONNAIRE_STEPS.filter((s) => !partnerCompletedSteps.has(s));

  if (partnerMissing.length > 0) {
    return NextResponse.json(
      {
        error: `Your partner has not completed: ${partnerMissing.join(", ")}. Both partners must finish all questionnaire steps.`,
      },
      { status: 400 }
    );
  }

  // ── Gate 4: All conflicts must be resolved ─────────────────────────
  const [unresolvedConflict] = await db
    .select({ id: collaborationConflicts.id })
    .from(collaborationConflicts)
    .where(
      and(
        eq(collaborationConflicts.coupleId, couple.id),
        isNull(collaborationConflicts.resolvedAnswer)
      )
    )
    .limit(1);

  if (unresolvedConflict) {
    return NextResponse.json(
      { error: "There are unresolved disagreements between you and your partner. Please resolve all conflicts before generating documents." },
      { status: 400 }
    );
  }

  // ── Gate 5: Both partners must have completed financial disclosures ──
  const [primaryDisclosureCheck] = await db
    .select({ completedAt: financialDisclosures.completedAt })
    .from(financialDisclosures)
    .where(
      and(
        eq(financialDisclosures.userId, couple.primaryUserId),
        eq(financialDisclosures.coupleId, couple.id)
      )
    )
    .limit(1);

  const [partnerDisclosureCheck] = await db
    .select({ completedAt: financialDisclosures.completedAt })
    .from(financialDisclosures)
    .where(
      and(
        eq(financialDisclosures.userId, couple.partnerUserId),
        eq(financialDisclosures.coupleId, couple.id)
      )
    )
    .limit(1);

  if (!primaryDisclosureCheck?.completedAt || !partnerDisclosureCheck?.completedAt) {
    return NextResponse.json(
      { error: "Both partners must complete their financial disclosure before generating documents." },
      { status: 400 }
    );
  }

  try {
    // 3. Load primary user's questionnaire answers (all steps)
    const primaryAnswerRows = await db
      .select()
      .from(questionnaireAnswers)
      .where(eq(questionnaireAnswers.userId, couple.primaryUserId));

    const primaryAnswers: Record<string, Record<string, unknown>> = {};
    for (const row of primaryAnswerRows) {
      primaryAnswers[row.stepId] = row.answers as Record<string, unknown>;
    }

    // 4. Load partner's questionnaire answers (if partner exists)
    let partnerAnswers: Record<string, Record<string, unknown>> | null = null;
    if (couple.partnerUserId) {
      const partnerAnswerRows = await db
        .select()
        .from(questionnaireAnswers)
        .where(eq(questionnaireAnswers.userId, couple.partnerUserId));

      partnerAnswers = {};
      for (const row of partnerAnswerRows) {
        partnerAnswers[row.stepId] = row.answers as Record<string, unknown>;
      }
    }

    // 5. Load financial disclosures
    const [primaryDisclosureRow] = await db
      .select()
      .from(financialDisclosures)
      .where(
        and(
          eq(financialDisclosures.userId, couple.primaryUserId),
          eq(financialDisclosures.coupleId, couple.id)
        )
      )
      .limit(1);

    let partnerDisclosureRow = null;
    if (couple.partnerUserId) {
      const [row] = await db
        .select()
        .from(financialDisclosures)
        .where(
          and(
            eq(financialDisclosures.userId, couple.partnerUserId),
            eq(financialDisclosures.coupleId, couple.id)
          )
        )
        .limit(1);
      partnerDisclosureRow = row ?? null;
    }

    // 6. Load resolved conflicts so the document reflects agreed answers
    const resolvedConflictRows = await db
      .select({
        stepId: collaborationConflicts.stepId,
        questionId: collaborationConflicts.questionId,
        resolvedAnswer: collaborationConflicts.resolvedAnswer,
      })
      .from(collaborationConflicts)
      .where(
        and(
          eq(collaborationConflicts.coupleId, couple.id),
          sql`${collaborationConflicts.resolvedAnswer} IS NOT NULL`
        )
      );

    // 7. Assemble the document content
    const content = assembleDocument({
      stateCode: couple.stateCode as StateCode,
      weddingDate: couple.weddingDate ?? "",
      primaryAnswers,
      partnerAnswers,
      primaryDisclosure: (primaryDisclosureRow?.data as Record<string, unknown>) ?? null,
      partnerDisclosure: (partnerDisclosureRow?.data as Record<string, unknown>) ?? null,
      resolvedConflicts: resolvedConflictRows.map((r) => ({
        stepId: r.stepId,
        questionId: r.questionId,
        resolvedAnswer: r.resolvedAnswer,
      })),
    });

    // 7. Render PDFs (dynamic import to keep the module server-only)
    const { renderPrenupPdf, renderSummaryPdf, renderDisclosureExhibitPdf } =
      await import("@/lib/pdf/render");

    const [prenupBuffer, summaryBuffer, disclosureBuffer] = await Promise.all([
      renderPrenupPdf(content),
      renderSummaryPdf(content),
      renderDisclosureExhibitPdf(content),
    ]);

    // 8–9. Save document records inside a transaction.
    // Lock the couple row first so concurrent generation requests are serialized.
    // This prevents two requests from computing the same version number.
    const now = new Date();

    const txResult = await db.transaction(async (tx) => {
      // Lock the couple row — any other concurrent document generation for
      // this couple will block here until this transaction commits.
      await tx.execute(
        sql`SELECT id FROM couples WHERE id = ${couple.id} FOR UPDATE`
      );

      // Now safely compute the next version (no other transaction can be
      // doing this simultaneously for the same couple).
      const [{ maxVersion }] = await tx
        .select({ maxVersion: sql<number>`COALESCE(MAX(${documents.version}), 0)` })
        .from(documents)
        .where(eq(documents.coupleId, couple.id));

      const nextVersion = (maxVersion ?? 0) + 1;

      const [prenupDoc] = await tx
        .insert(documents)
        .values({
          coupleId: couple.id,
          type: "prenup",
          version: nextVersion,
          pdfStoragePath: `data:application/pdf;base64,${prenupBuffer.toString("base64")}`,
          generatedAt: now,
        })
        .returning();

      const [summaryDoc] = await tx
        .insert(documents)
        .values({
          coupleId: couple.id,
          type: "summary",
          version: nextVersion,
          pdfStoragePath: `data:application/pdf;base64,${summaryBuffer.toString("base64")}`,
          generatedAt: now,
        })
        .returning();

      const [disclosureDoc] = await tx
        .insert(documents)
        .values({
          coupleId: couple.id,
          type: "disclosure_exhibit",
          version: nextVersion,
          pdfStoragePath: `data:application/pdf;base64,${disclosureBuffer.toString("base64")}`,
          generatedAt: now,
        })
        .returning();

      return { nextVersion, prenupDoc, summaryDoc, disclosureDoc };
    });

    return NextResponse.json({
      success: true,
      version: txResult.nextVersion,
      documents: {
        prenup: { id: txResult.prenupDoc.id, type: "prenup" },
        summary: { id: txResult.summaryDoc.id, type: "summary" },
        disclosureExhibit: { id: txResult.disclosureDoc.id, type: "disclosure_exhibit" },
      },
    });
  } catch (err) {
    console.error("Failed to generate documents:", err);
    return NextResponse.json(
      { error: "Failed to generate your prenup. Please try again or contact support." },
      { status: 500 }
    );
  }
}
