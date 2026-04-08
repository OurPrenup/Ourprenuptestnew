import type { StateLegalConfig } from "../types";

export const WV_CONFIG: StateLegalConfig = {
  stateCode: "WV",
  stateName: "West Virginia",
  researchDepth: "partially_verified",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "not_adopted",
  statuteCitations: [],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "required",
    notarizationType: "standard",
    witnesses: "not_required",
    witnessCount: null,
    witnessRules: null,
    acknowledgmentOptions: null,
    wetInkRequired: false,
  },

  financialDisclosure: {
    strictness: "standard",
    waiverPermitted: false,
    specialRequirements: null,
    notes:
      "Standard financial disclosure required. No specific statutory framework — requirements derived from case law.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "Some sources indicate independent counsel may be required — needs verification.",
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
    specialRules: [],
    notes:
      "Spousal support can be modified. No statutory safety valve.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest: null,
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "wv-no-specific-statute",
      description:
        "West Virginia has no specific prenuptial agreement statute. Enforcement relies on general contract law and case law principles.",
      platformImpact:
        "Less statutory certainty. Platform should recommend attorney review and ensure thorough documentation.",
      severity: "important",
    },
    {
      ruleId: "wv-notarization-required",
      description:
        "Notarization is required for prenuptial agreements in West Virginia.",
      platformImpact:
        "Platform must inform users that notarization is mandatory and guide them through the notarization process.",
      severity: "critical",
    },
    {
      ruleId: "wv-counsel-verification-needed",
      description:
        "Some sources indicate independent counsel may be required in West Virginia. This needs further verification.",
      platformImpact:
        "Until verified, platform should strongly recommend independent counsel and note the uncertainty.",
      severity: "important",
    },
  ],

  caseLaw: [],

  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: [
      "Require notarization for WV agreements.",
      "Strongly recommend independent counsel pending verification of requirement.",
      "Ensure thorough financial disclosure documentation.",
    ],
    warnings: [
      "No specific prenuptial statute — enforcement based on case law.",
      "Independent counsel requirement needs verification — may be required.",
      "Research depth is partially verified. Additional legal research recommended.",
    ],
    marketingNotes: [
      "Moderate self-service viability. Recommend attorney review for added protection.",
      "Notarization requirement adds a step but is straightforward.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
