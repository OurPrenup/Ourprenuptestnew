import type { StateLegalConfig } from "../types";

export const TX_CONFIG: StateLegalConfig = {
  stateCode: "TX",
  stateName: "Texas",
  researchDepth: "deeply_researched",

  propertyRegime: "community_property",
  communityPropertyVariant: "standard",

  upaaStatus: "upaa",
  statuteCitations: ["TX Family Code Ch. 4"],

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
    strictness: "soft",
    waiverPermitted: true,
    specialRequirements: null,
    notes:
      "Disclosure is only scrutinized if unconscionability is alleged. Softer standard than most UPAA states. Waiver permitted.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "Signed waivers required if party declines independent counsel.",
    writtenWaiverRequired: true,
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
      "Spousal support can be modified or eliminated. Public assistance safety valve applies.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest:
      "Three-part test: agreement must be unconscionable AND the challenging party must not have received adequate financial disclosure AND did not have adequate knowledge of the other party's finances.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "tx-community-property",
      description:
        "Texas is a community property state. Without a prenuptial agreement, all property acquired during marriage is presumed community property and divided equally.",
      platformImpact:
        "Platform must explain community property defaults and how the agreement modifies them. Include community/separate property classification guidance.",
      severity: "critical",
    },
    {
      ruleId: "tx-soft-disclosure",
      description:
        "Texas applies a softer disclosure standard than most UPAA states. Disclosure is only scrutinized when unconscionability is alleged.",
      platformImpact:
        "Financial disclosure module can be less rigid but should still collect thorough disclosure for best protection.",
      severity: "important",
    },
    {
      ruleId: "tx-signed-counsel-waiver",
      description:
        "Texas requires signed written waivers if a party declines independent counsel. This is more formal than most states' counsel waiver process.",
      platformImpact:
        "Platform must generate a signed counsel waiver document if a party declines attorney representation.",
      severity: "important",
    },
  ],

  caseLaw: [],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Include community property explanation and classification guidance.",
      "Generate signed counsel waiver if party declines independent counsel.",
      "Collect thorough financial disclosure despite softer standard.",
    ],
    warnings: [
      "Community property state — ensure users understand default property regime.",
      "Signed counsel waivers must be generated and executed if counsel is declined.",
    ],
    marketingNotes: [
      "Large market state with good self-service viability.",
      "Community property framework makes prenups especially valuable for TX couples.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
