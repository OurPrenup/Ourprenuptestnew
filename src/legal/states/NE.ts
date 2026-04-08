import type { StateLegalConfig } from "../types";

export const NE_CONFIG: StateLegalConfig = {
  stateCode: "NE",
  stateName: "Nebraska",
  researchDepth: "verified",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: [
    "Neb. Rev. Stat. § 42-1001",
    "Neb. Rev. Stat. § 42-1002",
    "Neb. Rev. Stat. § 42-1003",
    "Neb. Rev. Stat. § 42-1004",
    "Neb. Rev. Stat. § 42-1005",
    "Neb. Rev. Stat. § 42-1006",
    "Neb. Rev. Stat. § 42-1007",
    "Neb. Rev. Stat. § 42-1008",
    "Neb. Rev. Stat. § 42-1009",
    "Neb. Rev. Stat. § 42-1010",
    "Neb. Rev. Stat. § 42-1011",
  ],

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
    waiverPermitted: false,
    specialRequirements:
      "Full disclosure with monetary values required.",
    notes:
      "Standard UPAA disclosure with no deviations. Full financial disclosure with monetary values is required.",
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
    specialRules: [
      "Public assistance safety valve: waiver unenforceable if it would cause the spouse to be eligible for public assistance as a result of the divorce (not independent circumstances). Auxier v. Auxier (2023) clarified this distinction.",
    ],
    notes:
      "Spousal support can be modified. Public assistance safety valve applies, but only where public assistance eligibility is caused by the divorce itself, not independent circumstances (Auxier 2023).",
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
      ruleId: "ne-standard-upaa",
      description:
        "Nebraska adopted the UPAA in 1994 with no significant deviations from the uniform act.",
      platformImpact:
        "Standard UPAA compliance is sufficient. No special platform modifications needed.",
      severity: "informational",
    },
    {
      ruleId: "ne-public-assistance-causation",
      description:
        "Public assistance safety valve requires that eligibility for public assistance must be CAUSED by the divorce, not by independent circumstances (Auxier v. Auxier 2023).",
      platformImpact:
        "Include spousal support safety valve language specifying the causation requirement.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Auxier v. Auxier (Neb. 2023)",
      description:
        "Clarified that the public assistance safety valve applies only when public assistance eligibility is caused by the divorce itself, not by independent circumstances.",
    },
    {
      citation: "Mamot v. Mamot (Neb.)",
      description:
        "Addressed enforceability of prenuptial agreements under Nebraska's UPAA framework.",
    },
    {
      citation: "Devney v. Devney (Neb.)",
      description:
        "Addressed prenuptial agreement validity and enforcement in Nebraska.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Ensure full financial disclosure with monetary values.",
      "Include public assistance safety valve with causation language per Auxier.",
    ],
    warnings: [
      "Public assistance safety valve has a causation requirement — must be caused by divorce, not independent circumstances.",
    ],
    marketingNotes: [
      "Standard UPAA state with straightforward requirements.",
      "Self-service friendly with no unusual procedural hurdles.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
