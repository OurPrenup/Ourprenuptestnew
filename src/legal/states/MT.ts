import { createDefaultState } from "../types";

export const MT_CONFIG = createDefaultState({
  stateCode: "MT",
  stateName: "Montana",
  researchDepth: "needs_verification",
  statuteCitations: ["Mont. Code Ann. §§ 40-2-601 to 40-2-610"],
  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [],
    warnings: ["Needs individual statute verification"],
    marketingNotes: [],
  },
});
