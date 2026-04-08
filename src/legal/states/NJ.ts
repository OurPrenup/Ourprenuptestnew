import type { StateLegalConfig } from "../types";

export const NJ_CONFIG: StateLegalConfig = {
  stateCode: "NJ",
  stateName: "New Jersey",
  researchDepth: "verified",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: [
    "N.J.S.A. § 37:2-31",
    "N.J.S.A. § 37:2-32",
    "N.J.S.A. § 37:2-33",
    "N.J.S.A. § 37:2-34",
    "N.J.S.A. § 37:2-35",
    "N.J.S.A. § 37:2-36",
    "N.J.S.A. § 37:2-37",
    "N.J.S.A. § 37:2-38",
    "N.J.S.A. § 37:2-39",
    "N.J.S.A. § 37:2-40",
    "N.J.S.A. § 37:2-41",
  ],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "not_required",
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
    specialRequirements:
      "Must include an ANNEXED statement of current assets physically attached to the agreement (N.J.S.A. § 37:2-33). This is a separate document that must be physically appended.",
    notes:
      "Standard disclosure with annexed asset statement requirement. The annexed statement must be physically attached to the agreement and list current assets.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "Explicit waiver required if declining independent counsel.",
    writtenWaiverRequired: true,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "recommended",
    details:
      "No statutory waiting period, but 1-2 weeks before the wedding is recommended to avoid claims of duress.",
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
      "Spousal support can be modified. Public assistance safety valve applies. Post-2013 amendments deleted enforcement-time unconscionability review for spousal support.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: "clear_and_convincing",
    uniqueTest:
      "Post-June 27, 2013 amendments deleted enforcement-time unconscionability review. Clear and convincing evidence standard applies.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "nj-annexed-asset-statement",
      description:
        "Must include an annexed statement of current assets physically attached to the agreement (N.J.S.A. § 37:2-33). This is distinct from general disclosure and must be a separate appended document.",
      platformImpact:
        "Platform must generate a separate asset statement document and instruct users to physically attach it to the signed agreement. Include instructions for proper annexation.",
      severity: "critical",
    },
    {
      ruleId: "nj-three-frameworks",
      description:
        "New Jersey has THREE different legal frameworks depending on the date of execution: pre-UPAA, UPAA (1988), and post-June 27, 2013 amendments. The platform should generate agreements under the current (post-2013) framework.",
      platformImpact:
        "Generate all new agreements under the post-2013 framework. Be aware of historical frameworks for any amendment or enforcement questions.",
      severity: "important",
    },
    {
      ruleId: "nj-civil-unions",
      description:
        "New Jersey prenuptial agreement law applies to civil unions as well as marriages.",
      platformImpact:
        "Ensure agreement templates accommodate civil unions.",
      severity: "informational",
    },
    {
      ruleId: "nj-mid-marriage-skepticism",
      description:
        "Mid-marriage (postnuptial) agreements are subject to 'great skepticism' by New Jersey courts.",
      platformImpact:
        "If platform offers postnuptial agreements, include prominent warnings about heightened scrutiny in New Jersey.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "In re Evans (N.J.)",
      description:
        "Key New Jersey case addressing prenuptial agreement enforceability under the state's framework.",
    },
  ],

  platformNotes: {
    selfServiceViability: "excellent",
    requiredPlatformActions: [
      "Generate annexed asset statement as a separate document.",
      "Include instructions for physically attaching the asset statement to the agreement.",
      "Include explicit counsel waiver language if declining independent counsel.",
      "Apply post-2013 framework for all new agreements.",
    ],
    warnings: [
      "Annexed asset statement must be physically attached to the agreement.",
      "Three different legal frameworks exist depending on execution date.",
      "Mid-marriage agreements face 'great skepticism.'",
      "Clear and convincing evidence standard for unconscionability.",
    ],
    marketingNotes: [
      "Excellent self-service viability.",
      "Post-2013 amendments streamlined requirements significantly.",
      "No notarization or witnesses required.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
