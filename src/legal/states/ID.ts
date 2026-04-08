import type { StateLegalConfig } from "../types";

export const ID_CONFIG: StateLegalConfig = {
  stateCode: "ID",
  stateName: "Idaho",
  researchDepth: "deeply_researched",

  propertyRegime: "community_property",
  communityPropertyVariant: "standard",

  upaaStatus: "upaa",
  statuteCitations: [
    "Idaho Code §§ 32-921 to 32-925",
    "Idaho Code § 32-924",
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
    waiverPermitted: true,
    specialRequirements: null,
    notes:
      "Fair and reasonable disclosure required. Can be waived in writing.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions: null,
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "none",
    details: "No statutory waiting period.",
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
      "Spousal support can be modified or eliminated. Public assistance safety valve applies.",
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
      ruleId: "id-community-property",
      description:
        "Idaho is a community property state. A common prenuptial provision is to opt out of community property rules, keeping assets as separate property.",
      platformImpact:
        "Platform must include community property opt-out clauses and educate users on community vs. separate property distinctions.",
      severity: "critical",
    },
    {
      ruleId: "id-standard-upaa",
      description:
        "Idaho adopted a standard UPAA with no significant deviations.",
      platformImpact:
        "Standard UPAA compliance is sufficient beyond community property considerations.",
      severity: "informational",
    },
  ],

  caseLaw: [
    {
      citation: "Bakowski v. Bakowski (Idaho)",
      description:
        "Addressed prenuptial agreement enforcement under Idaho's UPAA framework.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Include community property education and opt-out clauses.",
      "Explain the distinction between community and separate property.",
      "Standard UPAA compliance workflow.",
    ],
    warnings: [
      "Community property state: users must understand that without a prenup, most property acquired during marriage is community property.",
      "Community property opt-out is a common and important provision.",
    ],
    marketingNotes: [
      "Good self-service viability. Community property framework makes prenups particularly valuable.",
      "Standard UPAA state with straightforward requirements.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
