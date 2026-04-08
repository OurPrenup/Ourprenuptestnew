import { createDefaultState } from "../types";

export const VT_CONFIG = createDefaultState({
  stateCode: "VT",
  stateName: "Vermont",
  researchDepth: "needs_verification",
  upaaStatus: "not_adopted",
  statuteCitations: [],
  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: [],
    warnings: ["No UPAA — governed by case law", "Needs individual verification"],
    marketingNotes: [],
  },
});
