import { createDefaultState } from "../types";

export const UT_CONFIG = createDefaultState({
  stateCode: "UT",
  stateName: "Utah",
  researchDepth: "needs_verification",
  statuteCitations: ["Utah Code §§ 30-8-1 to 30-8-9"],
  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [],
    warnings: ["Needs individual statute verification"],
    marketingNotes: [],
  },
});
