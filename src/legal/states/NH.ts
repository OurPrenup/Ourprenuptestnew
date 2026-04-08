import type { StateLegalConfig } from "../types";

export const NH_CONFIG: StateLegalConfig = {
  stateCode: "NH",
  stateName: "New Hampshire",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "not_adopted",
  statuteCitations: ["RSA 460:2-a"],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "recommended",
    notarizationType: "standard",
    witnesses: "recommended",
    witnessCount: 2,
    witnessRules: null,
    acknowledgmentOptions: null,
    wetInkRequired: false,
  },

  financialDisclosure: {
    strictness: "standard",
    waiverPermitted: false,
    specialRequirements: null,
    notes:
      "Financial disclosure is required. As a non-UPAA state, disclosure requirements are governed by case law and general equitable principles.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "Strict scrutiny applied to agreements where one party did not have independent counsel.",
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "recommended",
    details:
      "Not statutorily required, but case law treats proximity to the wedding as near-mandatory grounds for heightened scrutiny. Recommend signing at least 30 days before the wedding.",
    daysRequired: 30,
    calculationBasis: "before_wedding",
  },

  spousalSupport: {
    canModify: true,
    disabled: false,
    disabledReason: null,
    safetyValve: "none",
    specialRules: [],
    notes:
      "Spousal support can be modified. No specific statutory safety valve. Courts retain general equitable oversight.",
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
      ruleId: "nh-non-upaa",
      description:
        "New Hampshire has NOT adopted the UPAA or UPMAA. Prenuptial agreements are governed by RSA 460:2-a and common law principles.",
      platformImpact:
        "Cannot rely on standard UPAA framework. Must ensure compliance with RSA 460:2-a and general equitable principles.",
      severity: "important",
    },
    {
      ruleId: "nh-recommended-waiting",
      description:
        "While no statutory waiting period exists, case law treats signing near the wedding date with heightened scrutiny. Recommend signing at least 30 days before the wedding.",
      platformImpact:
        "Platform should recommend a 30-day buffer before the wedding. Warn users about heightened scrutiny for last-minute agreements.",
      severity: "important",
    },
    {
      ruleId: "nh-witnesses-recommended",
      description:
        "Two witnesses are recommended for execution of the agreement.",
      platformImpact:
        "Include witness signature blocks in the agreement template.",
      severity: "important",
    },
  ],

  caseLaw: [],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Include witness signature blocks for two witnesses.",
      "Recommend signing at least 30 days before the wedding.",
      "Ensure full financial disclosure.",
      "Recommend independent counsel for both parties.",
    ],
    warnings: [
      "Non-UPAA state — governed by RSA 460:2-a and common law.",
      "Strict scrutiny applied when one party lacks independent counsel.",
      "Signing close to the wedding date triggers heightened scrutiny.",
    ],
    marketingNotes: [
      "Self-service friendly despite non-UPAA status.",
      "Straightforward requirements with good enforceability track record.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
