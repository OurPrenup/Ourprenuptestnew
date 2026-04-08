import { createDefaultState } from "../types";

export const KS_CONFIG = createDefaultState({
  stateCode: "KS",
  stateName: "Kansas",
  researchDepth: "needs_verification",
  statuteCitations: ["K.S.A. §§ 23-801 to 23-811"],
  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [],
    warnings: ["Needs individual statute verification"],
    marketingNotes: [],
  },
});
