import { createDefaultState } from "../types";

export const MD_CONFIG = createDefaultState({
  stateCode: "MD",
  stateName: "Maryland",
  researchDepth: "needs_verification",
  upaaStatus: "not_adopted",
  statuteCitations: [],
  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "recommended",
    notarizationType: "standard",
    witnesses: "not_required",
    witnessCount: null,
    witnessRules: null,
    acknowledgmentOptions: null,
    wetInkRequired: true,
  },
  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: ["Wet ink signatures required — no digital"],
    warnings: ["No UPAA — Marital Property Act and case law", "Needs individual verification"],
    marketingNotes: [],
  },
});
