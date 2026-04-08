import { createDefaultState } from "../types";

export const OH_CONFIG = createDefaultState({
  stateCode: "OH",
  stateName: "Ohio",
  researchDepth: "needs_verification",
  upaaStatus: "not_adopted",
  statuteCitations: ["R.C. 3103.06"],
  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: [],
    warnings: ["No UPAA — governed by R.C. 3103.06 and case law", "Needs individual verification"],
    marketingNotes: [],
  },
});
