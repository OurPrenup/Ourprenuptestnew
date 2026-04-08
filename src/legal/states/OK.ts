import type { StateLegalConfig } from "../types";

export const OK_CONFIG: StateLegalConfig = {
  stateCode: "OK",
  stateName: "Oklahoma",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: [
    "43 Okla. Stat. § 121",
    "43 Okla. Stat. § 122",
    "43 Okla. Stat. § 123",
    "43 Okla. Stat. § 124",
    "43 Okla. Stat. § 125",
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
      "Fair and reasonable disclosure required under UPAA. Can be waived in writing per 43 Okla. Stat. § 123.",
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
      "Spousal support can be modified or eliminated. Standard UPAA public assistance safety valve applies.",
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
      ruleId: "ok-upaa",
      description:
        "Oklahoma follows the Uniform Premarital Agreement Act (43 Okla. Stat. §§ 121–125). Agreements must be in writing, signed by both parties, and become effective upon marriage.",
      platformImpact:
        "Standard UPAA framework applies. No unusual requirements.",
      severity: "informational",
    },
    {
      ruleId: "ok-equitable-distribution",
      description:
        "Oklahoma is an equitable distribution state. Without a prenup, marital property is divided fairly by the court based on relevant factors.",
      platformImpact:
        "Include equitable distribution clauses explaining how property will be handled.",
      severity: "informational",
    },
  ],

  caseLaw: [],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Standard UPAA compliance: written agreement, both signatures, voluntary execution.",
    ],
    warnings: [],
    marketingNotes: [
      "Good self-service state with standard UPAA framework.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
