import type { StateLegalConfig } from "../types";

export const IN_CONFIG: StateLegalConfig = {
  stateCode: "IN",
  stateName: "Indiana",
  researchDepth: "verified",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: [
    "Ind. Code § 31-11-3-1",
    "Ind. Code § 31-11-3-2",
    "Ind. Code § 31-11-3-3",
    "Ind. Code § 31-11-3-4",
    "Ind. Code § 31-11-3-5",
    "Ind. Code § 31-11-3-6",
    "Ind. Code § 31-11-3-7",
    "Ind. Code § 31-11-3-8",
    "Ind. Code § 31-11-3-9",
    "Ind. Code § 31-11-3-10",
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
      "Full disclosure of assets, liabilities, income, and value required. Financial schedules should be attached. Failure to disclose can invalidate the agreement.",
    notes:
      "Disclosure cannot be waived in Indiana. Full disclosure of assets, liabilities, income, and their value is required. Financial schedules should be attached to the agreement.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "Not required but courts consider whether each party had the opportunity to consult independent counsel.",
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
    safetyValve: "extreme_hardship",
    specialRules: [
      "Extreme hardship override (§ 31-11-3-8) is broader than standard UPAA public assistance safety valve.",
      "Court can require spousal maintenance to avoid extreme hardship under circumstances not reasonably foreseeable at execution.",
      "Foreseeability language should be included to strengthen enforceability.",
    ],
    notes:
      "Spousal support can be modified or eliminated under § 31-11-3-5(a)(4). However, Indiana's extreme hardship override (§ 31-11-3-8) is broader than the standard UPAA public assistance safety valve — courts can order maintenance to avoid extreme hardship even if not foreseeable at execution.",
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
      ruleId: "postnup_limited",
      description:
        "Postnuptial agreements are severely limited in Indiana — they can only be created during marital breakdown. A prenuptial agreement is the ONLY opportunity for marital financial planning in a stable marriage.",
      platformImpact:
        "Highlight that prenup is the only option for stable marriages. Use as a key selling point. Postnup is not a fallback in Indiana.",
      severity: "important",
    },
    {
      ruleId: "all_property_division",
      description:
        "Indiana uses an all-in equitable distribution model — ALL property, including premarital assets, is subject to division upon divorce. Without a prenup, even assets brought into the marriage can be divided.",
      platformImpact:
        "Emphasize that Indiana divides ALL property by default, making prenups especially valuable for protecting premarital assets. Include clear language designating separate property.",
      severity: "important",
    },
    {
      ruleId: "in-extreme-hardship-override",
      description:
        "Indiana's extreme hardship override (§ 31-11-3-8) is broader than the standard UPAA public assistance safety valve. Courts can require spousal maintenance to avoid extreme hardship under circumstances not reasonably foreseeable at execution.",
      platformImpact:
        "Include foreseeability language in spousal support provisions. Warn users that spousal support waivers may be overridden if enforcement would cause extreme hardship.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Wagner v. Wagner, 888 N.E.2d 924 (Ind. Ct. App. 2008)",
      description:
        "Key Indiana case addressing prenuptial agreement enforceability and the extreme hardship override.",
    },
    {
      citation: "Rider v. Rider (Ind.)",
      description:
        "Indiana case addressing prenuptial agreement standards and enforcement.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Include foreseeability language in spousal support provisions.",
      "Require full financial disclosure with attached schedules.",
      "Emphasize that prenup is the only option for stable marriages (postnups limited).",
      "Highlight that all property including premarital is subject to division without a prenup.",
    ],
    warnings: [
      "Postnuptial agreements are only available during marital breakdown — prenup is the only opportunity.",
      "All property (including premarital) is subject to equitable distribution by default.",
      "Extreme hardship override is broader than standard public assistance safety valve.",
      "Disclosure cannot be waived — failure to disclose invalidates the agreement.",
    ],
    marketingNotes: [
      "CRITICAL SELLING POINT: Postnups are unavailable for stable marriages in Indiana.",
      "All property including premarital assets is at risk without a prenup.",
      "Good self-service viability for property and spousal support planning.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
