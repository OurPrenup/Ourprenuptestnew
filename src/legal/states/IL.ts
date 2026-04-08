import { createDefaultState } from "../types";

export const IL_CONFIG = createDefaultState({
  stateCode: "IL",
  stateName: "Illinois",
  researchDepth: "needs_verification",
  statuteCitations: ["750 ILCS 10/1 et seq."],
  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [],
    warnings: ["Needs individual statute verification"],
    marketingNotes: [],
  },
});
