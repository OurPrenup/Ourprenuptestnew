import type { StateLegalConfig } from "../types";

export const FL_CONFIG: StateLegalConfig = {
  stateCode: "FL",
  stateName: "Florida",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: [
    "Fla. Stat. § 61.079",
    "Fla. Stat. § 732.701",
    "Fla. Stat. § 732.702",
  ],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "recommended",
    notarizationType: "standard",
    witnesses: "recommended",
    witnessCount: 2,
    witnessRules:
      "Fla. Stat. § 61.079 only requires writing and signatures for prenup validity. However, § 732.702 requires two subscribing witnesses for provisions waiving estate/elective share rights. Since most prenups touch estate matters, two witnesses plus notarization are strongly recommended as best practice.",
    acknowledgmentOptions: null,
    wetInkRequired: false,
  },

  financialDisclosure: {
    strictness: "standard",
    waiverPermitted: true,
    specialRequirements: null,
    notes:
      "Full and frank disclosure required. Standard falls between strict and soft.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "Courts examine whether each party had a meaningful opportunity to consult independent counsel.",
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "none",
    details:
      "No statutory waiting period. Florida attorneys recommend signing at least 30 days before the wedding.",
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
      "Spousal support can be modified, limited, or eliminated. Broad contractual freedom. Public assistance safety valve applies.",
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
      ruleId: "fl-two-witnesses-recommended",
      description:
        "Fla. Stat. § 61.079 requires only writing and signatures for prenup validity. However, two subscribing witnesses are required under § 732.702 for provisions waiving estate/elective share rights. Since most prenups include estate provisions, two witnesses plus notarization are strongly recommended.",
      platformImpact:
        "Platform should instruct users to have 2 witnesses plus a notary at the signing ceremony as best practice. Explain this is for estate provision enforceability.",
      severity: "critical",
    },
    {
      ruleId: "fl-probate-compliance",
      description:
        "Death-related provisions must comply with the Probate Code (§§ 732.701-702), which requires 2 subscribing witnesses.",
      platformImpact:
        "Any provisions addressing death or estate matters must be executed with 2 witnesses to comply with probate requirements.",
      severity: "critical",
    },
    {
      ruleId: "fl-clerical-errors",
      description:
        "Clerical errors can invalidate a prenuptial agreement in Florida.",
      platformImpact:
        "Platform must implement careful review and proofreading steps before finalizing the agreement.",
      severity: "important",
    },
    {
      ruleId: "fl-lifestyle-clauses",
      description:
        "Lifestyle clauses (e.g., weight requirements, social media restrictions) are not enforceable in Florida.",
      platformImpact:
        "Do not offer or encourage lifestyle clauses. Inform users they are unenforceable.",
      severity: "informational",
    },
    {
      ruleId: "fl-sunset-clauses",
      description: "Sunset clauses are permitted in Florida prenuptial agreements.",
      platformImpact:
        "Platform may offer sunset clause as an optional provision.",
      severity: "informational",
    },
  ],

  caseLaw: [
    {
      citation: "McNamara v. McNamara (Fla. 2010)",
      description:
        "Addressed prenuptial agreement enforcement and execution requirements under Florida law.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Provide detailed signing ceremony instructions: 2 witnesses + notary required.",
      "Implement proofreading/review step to catch clerical errors.",
      "Ensure estate/death provisions comply with Probate Code witness requirements.",
    ],
    warnings: [
      "Two witnesses and a notary are not required for basic prenup validity but are strongly recommended for estate provision enforceability under § 732.702.",
      "Clerical errors can invalidate the agreement — careful review is essential.",
      "Lifestyle clauses are not enforceable.",
    ],
    marketingNotes: [
      "Self-service viable with clear signing ceremony guidance.",
      "Florida is a large prenup market with broad contractual freedom.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
