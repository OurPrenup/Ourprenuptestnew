import { createDefaultState } from "../types";

export const MS_CONFIG = createDefaultState({
  stateCode: "MS",
  stateName: "Mississippi",
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
