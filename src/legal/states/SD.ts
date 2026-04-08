import type { StateLegalConfig } from "../types";

export const SD_CONFIG: StateLegalConfig = {
  stateCode: "SD",
  stateName: "South Dakota",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: ["SDCL §§ 25-2-16 to 25-2-25"],

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
      "Standard UPAA financial disclosure required. Waiver of disclosure is permitted.",
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
      "South Dakota adopted the UPAA in full, including § 3(a)(4) (codified as SDCL § 25-2-18(4)), which permits modification or elimination of spousal support. Standard UPAA public assistance safety valve applies.",
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
      ruleId: "sd-upaa-full",
      description:
        "South Dakota adopted the UPAA in full (SDCL §§ 25-2-16 to 25-2-25), including provisions for spousal support modification. Standard UPAA framework applies.",
      platformImpact:
        "Standard UPAA compliance. All UPAA provisions are available including spousal support modification.",
      severity: "informational",
    },
  ],

  caseLaw: [],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Standard UPAA execution requirements apply.",
    ],
    warnings: [],
    marketingNotes: [
      "Standard UPAA state with good self-service viability. All UPAA provisions available.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
