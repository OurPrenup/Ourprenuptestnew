// =============================================================================
// Document Assembly — Main Orchestrator
// Pulls together questionnaire answers, financial disclosures, and the legal
// engine output into a single DocumentContent object for PDF rendering.
// =============================================================================

import { generateDocumentCustomization } from "@/legal/document-generator";
import type { StateCode } from "@/legal/types";
import type { DocumentContent } from "./types";
import {
  extractPartyInfo,
  extractProvisions,
  extractDisclosure,
} from "./merge-answers";

// ---------------------------------------------------------------------------
// Input: raw data from the database
// ---------------------------------------------------------------------------

export interface AssembleInput {
  stateCode: StateCode;
  weddingDate: string; // ISO date string

  /** Primary user's questionnaire answers, keyed by stepId → { questionId: value } */
  primaryAnswers: Record<string, Record<string, unknown>>;

  /** Partner's questionnaire answers (same shape). Null if partner hasn't completed. */
  partnerAnswers: Record<string, Record<string, unknown>> | null;

  /** Primary user's financial disclosure data (raw JSONB) */
  primaryDisclosure: Record<string, unknown> | null;

  /** Partner's financial disclosure data */
  partnerDisclosure: Record<string, unknown> | null;
}

// ---------------------------------------------------------------------------
// Main assembly function
// ---------------------------------------------------------------------------

export function assembleDocument(input: AssembleInput): DocumentContent {
  const {
    stateCode,
    weddingDate,
    primaryAnswers,
    partnerAnswers,
    primaryDisclosure,
    partnerDisclosure,
  } = input;

  // 1. Get state-specific legal customization from the engine
  // "no_waiver" means the parties did NOT waive spousal support — so support IS included
  const spousalApproach = primaryAnswers["spousal-support"]?.["spousal_support_approach"] as string | undefined;
  const includesSpousalSupport = spousalApproach !== "waiver";

  const customization = generateDocumentCustomization(stateCode, {
    includesSpousalSupport,
    weddingDate: weddingDate ? new Date(weddingDate) : undefined,
  });

  // 2. Extract party information
  // Party 1: always from their own answers (isOwnAnswers = true)
  const party1 = extractPartyInfo(primaryAnswers, 1, true);

  // Party 2: use partner's OWN answers if available (isOwnAnswers = true),
  // otherwise fall back to what the primary user said about their partner (isOwnAnswers = false)
  const party2 = partnerAnswers
    ? extractPartyInfo(partnerAnswers, 2, true)
    : extractPartyInfo(primaryAnswers, 2, false);

  // 3. Extract provisions (use primary answers; conflicts should be resolved by now)
  const provisions = extractProvisions(primaryAnswers);

  // 4. Parse financial disclosures
  const party1Disclosure = extractDisclosure(primaryDisclosure);
  const party2Disclosure = extractDisclosure(partnerDisclosure);

  // 5. Assemble the full document
  return {
    stateCode,
    stateName: customization.stateName,
    weddingDate,
    generatedAt: new Date().toISOString(),

    party1,
    party2,

    terminology: customization.terminology,
    recitalStatuteRefs: customization.recitalStatuteRefs,
    requiredLanguage: customization.requiredLanguage,
    signatureBlocks: customization.signatureBlocks,
    notaryBlock: customization.notaryBlock,
    witnessBlocks: customization.witnessBlocks,
    signingInstructionsSummary: customization.signingInstructionsSummary,

    provisions,

    party1Disclosure,
    party2Disclosure,
  };
}
