import type { StateLegalConfig } from "../types";

export const ND_CONFIG: StateLegalConfig = {
  stateCode: "ND",
  stateName: "North Dakota",
  researchDepth: "verified",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upmaa",
  statuteCitations: ["N.D. Cent. Code Ch. 14-03.2"],

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
    strictness: "standard",
    waiverPermitted: true,
    specialRequirements: null,
    notes:
      "Standard UPMAA financial disclosure. Waiver is permitted under the statute.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions: null,
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
    safetyValve: "public_assistance",
    specialRules: [],
    notes:
      "Spousal support can be modified. Public assistance safety valve applies under the UPMAA framework.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest: null,
    threeOptionRemedy: true,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "nd-upmaa-state",
      description:
        "North Dakota adopted the UPMAA in 2013, repealing the old UPAA. One of only two states (with Colorado) to adopt the UPMAA. Covers both premarital and marital agreements.",
      platformImpact:
        "Use UPMAA framework. Agreement templates should accommodate both premarital and marital agreements under the same statute.",
      severity: "important",
    },
    {
      ruleId: "nd-three-option-remedy",
      description:
        "UPMAA provides three remedial options for unconscionability: (1) refuse to enforce the entire agreement, (2) enforce the agreement without the unconscionable provisions, or (3) limit the application of unconscionable provisions to avoid an unconscionable result.",
      platformImpact:
        "Draft provisions as severable where possible. Include severability clause to preserve enforceable portions.",
      severity: "important",
    },
    {
      ruleId: "nd-no-supplementation",
      description:
        "North Dakota's UPMAA prohibits principles of law and equity from supplementing material terms of the agreement. This protects agreements from judicial rewriting.",
      platformImpact:
        "Ensure agreements are comprehensive in their material terms. Courts cannot supplement missing material terms.",
      severity: "important",
    },
    {
      ruleId: "nd-duress-separate-ground",
      description:
        "Under the UPMAA, 'duress' is a separate and independent ground for invalidation, distinct from involuntariness.",
      platformImpact:
        "Include anti-duress acknowledgment language. Ensure signing process is well-documented and free from pressure.",
      severity: "important",
    },
    {
      ruleId: "nd-electronic-records",
      description:
        "Electronic records may be permitted for prenuptial agreements under North Dakota's UPMAA framework.",
      platformImpact:
        "Electronic execution may be available. Confirm with local counsel before relying on electronic signatures.",
      severity: "informational",
    },
  ],

  caseLaw: [],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Use UPMAA framework for agreement generation.",
      "Include severability clause for three-option remedy protection.",
      "Include anti-duress acknowledgment language.",
      "Ensure material terms are comprehensive — courts cannot supplement.",
    ],
    warnings: [
      "UPMAA state (not UPAA) — different framework than most states.",
      "Duress is a separate ground for invalidation.",
      "Courts cannot supplement material terms of the agreement.",
      "Framework is relatively new (2013) — limited case law.",
    ],
    marketingNotes: [
      "Modern UPMAA framework with protective features for agreements.",
      "Good self-service viability with straightforward requirements.",
      "Three-option remedy for unconscionability provides flexibility.",
      "Electronic records may be permitted.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
