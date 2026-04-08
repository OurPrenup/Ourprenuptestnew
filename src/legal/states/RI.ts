import { createDefaultState } from "../types";

export const RI_CONFIG = createDefaultState({
  stateCode: "RI",
  stateName: "Rhode Island",
  researchDepth: "needs_verification",
  statuteCitations: ["R.I. Gen. Laws §§ 15-17-1 to 15-17-11"],
  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: "Must prove BOTH involuntariness AND unconscionability (RI changed UPAA 'or' to 'and'). Higher bar for challengers.",
    uniqueTest: "Rhode Island requires proof of both involuntariness AND unconscionability — not either/or. Penhallow: unconscionable agreement upheld because voluntarily entered.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },
  uniqueRules: [
    {
      ruleId: "and_conjunction",
      description: "RI changed UPAA 'or' to 'and' — must prove BOTH involuntariness AND unconscionability to invalidate.",
      platformImpact: "Rhode Island is very favorable to prenup enforcement. Challengers face higher burden.",
      severity: "important",
    },
  ],
  caseLaw: [
    { citation: "Penhallow v. Penhallow", description: "Upheld unconscionable agreement because it was entered voluntarily — demonstrating the AND conjunction requirement." },
  ],
  platformNotes: {
    selfServiceViability: "excellent",
    requiredPlatformActions: [],
    warnings: [],
    marketingNotes: ["RI is very favorable to prenup enforcement due to AND conjunction requirement"],
  },
});
