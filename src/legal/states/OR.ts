import { createDefaultState } from "../types";

export const OR_CONFIG = createDefaultState({
  stateCode: "OR",
  stateName: "Oregon",
  researchDepth: "needs_verification",
  statuteCitations: ["ORS §§ 108.700 to 108.740"],
  caseLaw: [
    { citation: "In re Marriage of Bowers (1996)", description: "Key Oregon prenup enforcement case." },
  ],
  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [],
    warnings: ["Needs individual statute verification"],
    marketingNotes: [],
  },
});
