import type { StateLegalConfig } from "../types";

export const MI_CONFIG: StateLegalConfig = {
  stateCode: "MI",
  stateName: "Michigan",
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
    witnesses: "required",
    witnessCount: 2,
    witnessRules:
      "Two witnesses are required for Michigan prenuptial agreements. Both witnesses must sign the agreement.",
    acknowledgmentOptions: null,
    wetInkRequired: false,
  },

  financialDisclosure: {
    strictness: "standard",
    waiverPermitted: false,
    specialRequirements: null,
    notes:
      "Standard financial disclosure required. Courts review for adequacy of disclosure as part of enforceability analysis.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "Not required but courts give heavy weight to whether each party had independent counsel.",
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
      "Spousal support can be addressed in Michigan prenuptial agreements.",
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
      ruleId: "mi-two-witnesses",
      description:
        "Michigan requires two witnesses for prenuptial agreements. Both witnesses must sign the agreement at execution.",
      platformImpact:
        "Generate signature blocks for two witnesses. Instruct users that two witnesses must be present at signing and must sign the agreement.",
      severity: "critical",
    },
    {
      ruleId: "mi-upmaa-pending",
      description:
        "UPMAA bill S.B. 160 was introduced in Michigan in 2025. If passed, this would replace the current case-law-based framework with a statutory framework. Monitor for legislative changes.",
      platformImpact:
        "Monitor S.B. 160 for passage. If enacted, Michigan's legal config will need significant updates to reflect the new statutory framework.",
      severity: "informational",
    },
  ],

  caseLaw: [],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Generate signature blocks for two witnesses.",
      "Instruct users that two witnesses must be present at signing.",
      "Monitor UPMAA S.B. 160 for potential legislative changes.",
    ],
    warnings: [
      "Two witnesses are required — agreements without two witnesses may be invalidated.",
      "UPMAA bill S.B. 160 is pending — framework may change.",
      "No specific prenuptial statute — governed by standard contract principles and case law.",
    ],
    marketingNotes: [
      "Good self-service viability.",
      "Must instruct users about the two-witness requirement.",
      "Monitor pending UPMAA legislation.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
