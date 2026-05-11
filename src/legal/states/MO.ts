import type { StateLegalConfig } from "../types";

export const MO_CONFIG: StateLegalConfig = {
  stateCode: "MO",
  stateName: "Missouri",
  researchDepth: "verified",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "not_adopted",
  statuteCitations: ["RSMo § 451.220"],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "recommended",
    notarizationType: "standard",
    witnesses: "recommended",
    witnessCount: 1,
    witnessRules:
      "RSMo § 451.220 requires EITHER acknowledgment (notarization) OR proof by at least one subscribing witness — they are alternatives, not both required. Best practice: do both for maximum enforceability.",
    acknowledgmentOptions: [
      {
        id: "acknowledged",
        description:
          "Acknowledged (notarized) — the standard and recommended approach.",
        isDefault: true,
      },
      {
        id: "proved_by_witness",
        description:
          "Proved by one or more subscribing witnesses — alternative to notarization under RSMo § 451.220.",
        isDefault: false,
      },
    ],
    wetInkRequired: false,
  },

  financialDisclosure: {
    strictness: "strict",
    waiverPermitted: false,
    specialRequirements:
      "Full disclosure mandatory. Failing to disclose often renders the agreement unenforceable. Part of the six-word 'freely, fairly, knowingly, understandingly, in good faith, and with full disclosure' standard.",
    notes:
      "Full disclosure is mandatory under Missouri's six-word standard. Failure to provide complete financial disclosure is a primary ground for invalidation.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "Not required but highly recommended. Separate attorneys for each party recommended. Courts consider availability of counsel in enforceability analysis.",
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "recommended",
    details: "Best practice: signed at least 30 days before wedding.",
    daysRequired: null,
    calculationBasis: null,
  },

  spousalSupport: {
    canModify: true,
    disabled: false,
    disabledReason: null,
    safetyValve: "none",
    specialRules: [
      "Courts examine fairness of spousal support provisions as part of overall conscionability review.",
    ],
    notes:
      "Spousal support can be addressed. Courts examine fairness of provisions as part of the broader enforceability analysis.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest:
      "Inequality so strong, gross, and manifest that it must be impossible to state it to a person of common sense without producing an exclamation at the inequality of it.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "mo-six-word-standard",
      description:
        "Missouri applies a demanding six-word enforcement standard: the agreement must have been entered into 'freely, fairly, knowingly, understandingly, in good faith, and with full disclosure.' This is MORE demanding than most states' enforceability tests.",
      platformImpact:
        "Generate robust acknowledgment language covering all six elements. Include explicit acknowledgments that the agreement was entered freely, fairly, knowingly, understandingly, in good faith, and with full disclosure.",
      severity: "critical",
    },
    {
      ruleId: "mo-notarize-or-witness",
      description:
        "Under RSMo § 451.220, the agreement must be either (a) acknowledged (notarized) or (b) proved by one or more subscribing witnesses. Best practice is to do both.",
      platformImpact:
        "Generate both notary acknowledgment AND witness signature blocks. Instruct users to do both for maximum enforceability.",
      severity: "critical",
    },
    {
      ruleId: "mo-two-part-enforcement",
      description:
        "TWO-PART enforcement test: (1) Agreement must be 'freely, fairly, knowingly, understandingly, in good faith, and with full disclosure.' (2) Agreement must not be unconscionable. Both parts must be satisfied.",
      platformImpact:
        "Ensure agreement satisfies both the six-word standard and conscionability. Include language addressing all six elements explicitly.",
      severity: "important",
    },
    {
      ruleId: "mo-postnups-questionable",
      description:
        "Postnuptial agreements may not be enforceable in Missouri. RSMo § 451.220 predates the UPAA and may only cover premarital agreements.",
      platformImpact:
        "Do not offer postnuptial agreements for Missouri until legal landscape is clarified.",
      severity: "important",
    },
    {
      ruleId: "mo-pre-upaa-statute",
      description:
        "RSMo § 451.220 predates the UPAA and uses a different framework. Missouri has not adopted the UPAA.",
      platformImpact:
        "Do not reference UPAA provisions for Missouri. Follow the RSMo § 451.220 framework and case law.",
      severity: "informational",
    },
  ],

  caseLaw: [
    {
      citation: "In re Marriage of Thomas, 199 S.W.3d 847 (Mo. Ct. App. 2006)",
      description:
        "Key Missouri case addressing prenuptial agreement enforceability and the six-word standard.",
    },
    {
      citation: "Short v. Short, 356 S.W.3d 235 (Mo. Ct. App. 2011)",
      description:
        "Missouri case examining enforceability of prenuptial agreements and disclosure requirements.",
    },
    {
      citation: "Chapman v. Corbin, 316 S.W.2d 880 (Mo. 1958)",
      description:
        "Historical Missouri case establishing the unconscionability standard for prenuptial agreements.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Generate notary acknowledgment AND witness signature blocks (best practice: both).",
      "Include robust acknowledgment language covering all six elements of the Missouri standard.",
      "Require full financial disclosure as part of the six-word standard.",
      "Recommend signing at least 30 days before the wedding.",
      "Include explicit acknowledgments: freely, fairly, knowingly, understandingly, in good faith, with full disclosure.",
    ],
    warnings: [
      "Six-word standard is more demanding than most states' enforceability tests.",
      "Full disclosure is mandatory — failure to disclose often invalidates the agreement.",
      "Postnuptial agreements may not be enforceable in Missouri.",
      "RSMo § 451.220 predates the UPAA — different framework applies.",
    ],
    marketingNotes: [
      "Good self-service viability for prenuptial agreements.",
      "Postnups should not be offered for Missouri.",
      "Emphasize the importance of the six-word standard and thorough disclosure.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
