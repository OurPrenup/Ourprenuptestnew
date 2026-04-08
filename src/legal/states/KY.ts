import type { StateLegalConfig } from "../types";

export const KY_CONFIG: StateLegalConfig = {
  stateCode: "KY",
  stateName: "Kentucky",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: [
    "KRS § 371.010",
    "KRS § 371.020",
    "KRS § 371.030",
    "KRS § 371.040",
    "KRS § 371.050",
    "KRS § 371.060",
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
      "Fair and reasonable disclosure required under UPAA. Can be waived in writing per KRS § 371.030.",
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
      "Spousal support can be modified or eliminated. Public assistance safety valve applies under standard UPAA provisions.",
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
      ruleId: "ky-upaa",
      description:
        "Kentucky follows the Uniform Premarital Agreement Act (KRS 371.010–371.060). Agreements must be in writing, signed by both parties, and become effective upon marriage.",
      platformImpact:
        "Standard UPAA framework applies. No unusual requirements beyond standard compliance.",
      severity: "informational",
    },
    {
      ruleId: "ky-equitable-distribution",
      description:
        "Kentucky is an equitable distribution state. Without a prenup, marital property is divided fairly (but not necessarily equally) by the court.",
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
      "Equitable distribution regime makes prenups valuable for certainty in property division.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
