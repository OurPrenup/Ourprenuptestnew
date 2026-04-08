import { createDefaultState } from "../types";

export const VA_CONFIG = createDefaultState({
  stateCode: "VA",
  stateName: "Virginia",
  researchDepth: "needs_verification",
  statuteCitations: ["Va. Code §§ 20-147 to 20-154"],
  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [],
    warnings: ["Needs individual statute verification"],
    marketingNotes: [],
  },
});
