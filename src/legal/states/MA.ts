import type { StateLegalConfig } from "../types";

export const MA_CONFIG: StateLegalConfig = {
  stateCode: "MA",
  stateName: "Massachusetts",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "not_adopted",
  statuteCitations: [],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "recommended",
    notarizationType: "standard",
    witnesses: "not_required",
    witnessCount: null,
    witnessRules: null,
    acknowledgmentOptions: null,
    wetInkRequired: false,
  },

  financialDisclosure: {
    strictness: "strict",
    waiverPermitted: false,
    specialRequirements:
      "Must explicitly disclose all assets line by line, item by item. Massachusetts requires the most detailed financial disclosure of any state.",
    notes:
      "STRICT disclosure required. Every asset must be individually listed and valued. Massachusetts has the most demanding financial disclosure requirements in the country. Failure to disclose is a primary ground for invalidation.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "Strongly recommended. Courts give heavy weight to whether each party had independent counsel. Not having counsel significantly weakens the agreement.",
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "none",
    details: null,
    daysRequired: null,
    calculationBasis: null,
  },

  spousalSupport: {
    canModify: true,
    disabled: false,
    disabledReason: null,
    safetyValve: "none",
    specialRules: [
      "Spousal support provisions are subject to the second look doctrine — courts review fairness at enforcement, not just execution.",
      "Spousal support waivers that leave a spouse unable to support themselves may be modified at enforcement.",
    ],
    notes:
      "Spousal support can be addressed but is subject to the second look doctrine. Courts will review fairness of spousal support provisions at the time of enforcement, not just at execution.",
  },

  unconscionability: {
    reviewTime: "dual_time",
    burdenOfProof: null,
    uniqueTest:
      "Second look doctrine: (1) Agreement must be fair and reasonable at the time of execution with full disclosure and no duress. (2) Agreement must also be fair and reasonable at the time of enforcement. Both prongs must be satisfied.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "ma-second-look-doctrine",
      description:
        "Massachusetts applies a second look doctrine (dual-time review). The agreement must be fair both at execution and at enforcement. Even a properly executed agreement can be invalidated if circumstances have changed significantly.",
      platformImpact:
        "Include fairness warnings throughout. Recommend periodic review of the agreement. Advise balanced terms to survive second look. Include provisions for changed circumstances.",
      severity: "critical",
    },
    {
      ruleId: "ma-strict-disclosure",
      description:
        "Massachusetts requires the most detailed financial disclosure of any state. Every asset must be explicitly listed line by line, item by item. Generic or summary disclosures are insufficient.",
      platformImpact:
        "Require extremely detailed, itemized financial disclosure. Do not allow summary or grouped asset entries. Each asset, liability, and income source must be individually identified and valued.",
      severity: "critical",
    },
    {
      ruleId: "ma-case-law-governed",
      description:
        "Massachusetts has not adopted the UPAA. Prenuptial agreements are governed entirely by case law, primarily DeMatteo v. DeMatteo (2002).",
      platformImpact:
        "Do not reference UPAA provisions. Follow DeMatteo framework for enforceability requirements.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "DeMatteo v. DeMatteo, 436 Mass. 18 (2002)",
      description:
        "Landmark Massachusetts case establishing the modern framework for prenuptial agreement enforceability, including the second look doctrine.",
    },
    {
      citation: "Osborne v. Osborne (Mass.)",
      description:
        "Early Massachusetts case recognizing the enforceability of prenuptial agreements.",
    },
    {
      citation: "Ansin v. Craven-Ansin, 457 Mass. 283 (2010)",
      description:
        "Clarified aspects of prenuptial agreement enforceability in Massachusetts, including the scope of the second look doctrine.",
    },
  ],

  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: [
      "Require extremely detailed, itemized financial disclosure — line by line, item by item.",
      "Include fairness warnings about the second look doctrine.",
      "Recommend periodic review of the agreement to address changed circumstances.",
      "Strongly recommend independent counsel for both parties.",
      "Include balanced terms to increase enforceability under second look.",
    ],
    warnings: [
      "Second look doctrine + strict disclosure = one of the hardest states for enforceability.",
      "Generic or summary financial disclosures will likely result in invalidation.",
      "Courts will review fairness at enforcement — lopsided agreements are at high risk.",
      "Not having independent counsel significantly weakens the agreement.",
    ],
    marketingNotes: [
      "Self-service possible but must emphasize thorough disclosure and balanced terms.",
      "Position as requiring extra care — Massachusetts is one of the strictest states.",
      "Recommend periodic review as a value-add service.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
