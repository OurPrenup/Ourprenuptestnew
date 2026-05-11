// =============================================================================
// GET /api/validate
// Runs the legal validators against saved questionnaire answers.
// Returns a ValidationSummary for the current couple.
// =============================================================================

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import {
  users,
  couples,
  questionnaireAnswers,
  financialDisclosures,
} from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { validateAgreement } from "@/legal/validators";
import type { AgreementAnswers } from "@/legal/validators";
import type { StateCode } from "@/legal/types";

async function getUser(clerkId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.clerkId, clerkId), isNull(users.deletedAt)))
    .limit(1);
  return user ?? null;
}

export async function GET() {
  // 1. Auth
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(clerkId);
  if (!user || !user.coupleId) {
    return NextResponse.json({ error: "No couple found" }, { status: 404 });
  }

  // 2. Load couple
  const [couple] = await db
    .select()
    .from(couples)
    .where(eq(couples.id, user.coupleId))
    .limit(1);

  if (!couple) {
    return NextResponse.json({
      isValid: false,
      errors: [{ field: "couple", severity: "error", message: "No couple record found.", stateSpecific: false }],
      warnings: [],
      infos: [],
      all: [{ field: "couple", severity: "error", message: "No couple record found.", stateSpecific: false }],
    });
  }

  if (!couple.stateCode) {
    return NextResponse.json({
      isValid: false,
      errors: [{ field: "state", severity: "error", message: "State of residence is required. Please complete the Introduction step.", stateSpecific: false }],
      warnings: [],
      infos: [],
      all: [{ field: "state", severity: "error", message: "State of residence is required. Please complete the Introduction step.", stateSpecific: false }],
    });
  }

  // 3. Load questionnaire answers for the CURRENT user (not always primary)
  const answerUserId = user.id;

  const answerRows = await db
    .select()
    .from(questionnaireAnswers)
    .where(eq(questionnaireAnswers.userId, answerUserId));

  const allAnswers: Record<string, Record<string, unknown>> = {};
  for (const row of answerRows) {
    allAnswers[row.stepId] = row.answers as Record<string, unknown>;
  }

  // 4. Check financial disclosure
  const [disclosure] = await db
    .select()
    .from(financialDisclosures)
    .where(
      and(
        eq(financialDisclosures.userId, answerUserId),
        eq(financialDisclosures.coupleId, couple.id)
      )
    )
    .limit(1);

  // 5. Map to AgreementAnswers format
  const spousalSupport = allAnswers["spousal-support"];
  const legalRep = allAnswers["legal-representation"];

  const agreementAnswers: AgreementAnswers = {
    includesSpousalSupport:
      spousalSupport?.spousal_support_approach !== "no_waiver",
    spousalSupportFullWaiver:
      spousalSupport?.spousal_support_approach === "waiver",
    hasAttorney: {
      party1: legalRep?.partner1_attorney === "yes",
      party2: legalRep?.partner2_attorney === "yes",
    },
    financialDisclosureComplete: !!disclosure?.completedAt,
    weddingDate: couple.weddingDate
      ? new Date(couple.weddingDate)
      : undefined,
  };

  // 6. Run validation
  const result = validateAgreement(
    couple.stateCode as StateCode,
    agreementAnswers,
    couple.weddingDate ? new Date(couple.weddingDate) : undefined
  );

  return NextResponse.json(result);
}
