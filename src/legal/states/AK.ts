import type { StateLegalConfig } from "../types";

export const AK_CONFIG: StateLegalConfig = {
  stateCode: "AK",
  stateName: "Alaska",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: "opt_in_alaska",

  upaaStatus: "not_adopted",
  statuteCitations: ["AS 34.75", "AS 25.24.160"],

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
    specialRequirements:
      "Community property agreements under AS 34.75 require full disclosure OR a voluntary written waiver of disclosure.",
    notes:
      "Full and fair disclosure required. For community property opt-in agreements, disclosure must be complete or voluntarily waived in writing.",
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
    safetyValve: "none",
    specialRules: [
      "Courts ensure maintenance provisions fairly allocate the economic effect of the marriage.",
    ],
    notes:
      "Spousal support can be addressed. Courts ensure maintenance fairly allocates economic effect of marriage.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest:
      "Agreement must be 'legally procured and ostensibly fair' to be enforceable.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "ak-opt-in-community-property",
      description:
        "Alaska offers opt-in community property under AS 34.75. Couples can execute a community property agreement or trust before or during marriage (not after divorce filing). This is unique among equitable distribution states.",
      platformImpact:
        "Platform must ask whether the couple wants to opt into community property under AS 34.75. If yes, generate community property agreement/trust provisions with full disclosure requirements.",
      severity: "critical",
    },
    {
      ruleId: "ak-no-upaa",
      description:
        "Alaska has not adopted UPAA. Prenuptial agreements are governed by case law and general contract principles.",
      platformImpact:
        "Cannot rely on UPAA framework. Must follow Alaska case law standards for enforceability.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Batey v. Batey, 933 P.2d 551 (Alaska 1997)",
      description:
        "Key case establishing that prenuptial agreements must be legally procured and ostensibly fair to be enforceable.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Ask whether couple wants to opt into community property under AS 34.75.",
      "If community property opted in, generate appropriate agreement/trust provisions.",
      "Ensure full disclosure or written waiver for community property agreements.",
    ],
    warnings: [
      "Unusual state: equitable distribution with opt-in community property option.",
      "No UPAA; governed by case law and contract principles.",
    ],
    marketingNotes: [
      "Self-service friendly with special handling for opt-in community property.",
      "Unique offering: couples can choose their property regime.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
