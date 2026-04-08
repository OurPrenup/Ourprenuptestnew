import type { StateLegalConfig } from "../types";

export const TN_CONFIG: StateLegalConfig = {
  stateCode: "TN",
  stateName: "Tennessee",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upmaa",
  statuteCitations: [
    "Tenn. Code Ann. § 36-3-501",
    "Tenn. Code Ann. § 36-3-502",
    "Tenn. Code Ann. § 36-3-503",
    "Tenn. Code Ann. § 36-3-504",
    "Tenn. Code Ann. § 36-3-505",
    "Tenn. Code Ann. § 36-3-506",
    "Tenn. Code Ann. § 36-3-507",
    "Tenn. Code Ann. § 36-3-508",
    "Tenn. Code Ann. § 36-3-509",
    "Tenn. Code Ann. § 36-3-510",
    "Tenn. Code Ann. § 36-3-511",
    "Tenn. Code Ann. § 36-3-512",
    "Tenn. Code Ann. § 36-3-513",
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
      "UPMAA requires access to adequate financial disclosure. Waiver permitted if party had adequate knowledge or reasonably could have had adequate knowledge.",
  },

  independentCounsel: {
    requirement: "opportunity_required",
    conditions:
      "Under UPMAA, each party must be given a reasonable opportunity to have independent legal counsel before signing.",
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
      "Spousal support provisions are subject to unconscionability review at enforcement under UPMAA's dual-time framework for support provisions.",
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
      ruleId: "tn-upmaa-2023",
      description:
        "Tennessee adopted the Uniform Premarital and Marital Agreements Act (UPMAA) in 2023. This replaced the prior case-law-only framework with a comprehensive statutory framework.",
      platformImpact:
        "UPMAA framework applies. Stronger protections for the less-advantaged party compared to UPAA.",
      severity: "informational",
    },
    {
      ruleId: "tn-opportunity-for-counsel",
      description:
        "Under Tennessee's UPMAA, each party must be given a reasonable opportunity to have independent legal counsel review the agreement before signing.",
      platformImpact:
        "Platform must advise both parties to seek independent counsel and document that the opportunity was provided.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Cary v. Cary (1996)",
      description: "Key Tennessee prenup case establishing enforcement principles. Predates UPMAA adoption but remains informative for historical context.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "UPMAA compliance: written agreement, both signatures, voluntary execution.",
      "Ensure both parties are advised to seek independent counsel.",
    ],
    warnings: [],
    marketingNotes: [
      "Good self-service state with modern UPMAA framework (adopted 2023).",
      "UPMAA provides clearer rules and stronger consumer protections than the prior case-law approach.",
    ],
  },

  agreementTerminology: "premarital agreement",
};
