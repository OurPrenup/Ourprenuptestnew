import { createDefaultState } from "../types";

export const WY_CONFIG = createDefaultState({
  stateCode: "WY",
  stateName: "Wyoming",
  researchDepth: "needs_verification",
  upaaStatus: "not_adopted",
  statuteCitations: [],
  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: [],
    warnings: ["No UPAA — governed by general contract law", "Needs individual verification"],
    marketingNotes: [],
  },
});
