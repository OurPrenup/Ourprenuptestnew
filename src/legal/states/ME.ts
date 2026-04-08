import { createDefaultState } from "../types";

export const ME_CONFIG = createDefaultState({
  stateCode: "ME",
  stateName: "Maine",
  researchDepth: "needs_verification",
  statuteCitations: ["19-A M.R.S.A. §§ 601-611"],
  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [],
    warnings: ["Needs individual statute verification"],
    marketingNotes: [],
  },
});
