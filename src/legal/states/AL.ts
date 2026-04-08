import type { StateLegalConfig } from "../types";

export const AL_CONFIG: StateLegalConfig = {
  stateCode: "AL",
  stateName: "Alabama",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "disputed",
  statuteCitations: ["Ala. Code § 30-4-9 (2007)"],

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
    waiverPermitted: false,
    specialRequirements: "Certified financial statements recommended.",
    notes:
      "General picture of finances sufficient. Certified financial statements recommended but not strictly required.",
  },

  independentCounsel: {
    requirement: "conditionally_required",
    conditions:
      "Two-prong Nelson/Hollar test: enforcing party must prove EITHER (a) agreement was fair/just/equitable to the other spouse, OR (b) other spouse entered freely with competent independent advice and full knowledge. If agreement is not inherently fair on its face, independent counsel becomes a hard requirement.",
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "none",
    details:
      "No statutory waiting period. Courts have upheld agreements signed the day before the wedding if opportunity to consult attorney existed.",
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
      "Fairness-OR-process test: if agreement is fair on its face, enforced without need for attorneys. If not fair, attorneys are required for enforcement.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "al-fairness-or-process",
      description:
        "Unique fairness-OR-process enforcement test from Nelson v. Nelson (2010) and Hollar v. Hollar (2023). If the agreement is fair on its face, it is enforced without attorneys. If not inherently fair, independent counsel is required.",
      platformImpact:
        "Platform must ensure substantive fairness OR require attorney review. Include waiver of counsel option with risk disclosure.",
      severity: "critical",
    },
    {
      ruleId: "al-fraud-invalidation",
      description: "Fraud invalidates the agreement entirely.",
      platformImpact:
        "Ensure full disclosure and no misrepresentation in the agreement process.",
      severity: "important",
    },
    {
      ruleId: "al-amendments",
      description:
        "Amendments must be in writing and signed by both parties.",
      platformImpact:
        "Amendment workflow must produce written, signed documents.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Nelson v. Nelson (Ala. 2010)",
      description:
        "Established the two-prong enforcement test: fairness OR free entry with independent advice and full knowledge.",
    },
    {
      citation: "Hollar v. Hollar (Ala. 2023)",
      description:
        "Reaffirmed the Nelson test for prenuptial agreement enforcement.",
    },
    {
      citation: "Ayers v. Ayers (Ala. 2022)",
      description:
        "Applied the Nelson framework in evaluating prenuptial agreement validity.",
    },
    {
      citation: "Williams v. Williams (Ala. 2014)",
      description:
        "Further clarified application of prenuptial enforcement standards in Alabama.",
    },
  ],

  platformNotes: {
    selfServiceViability: "limited",
    requiredPlatformActions: [
      "Ensure substantive fairness OR require attorney review.",
      "Include waiver of counsel option with detailed risk disclosure.",
      "Recommend certified financial statements for disclosure.",
    ],
    warnings: [
      "Conditional attorney requirement: if agreement is not substantively fair, independent counsel is a hard requirement for enforcement.",
      "UPAA adoption is disputed in Alabama; framework aligns but adoption is contested.",
    ],
    marketingNotes: [
      "Moderate risk for self-service. Must clearly communicate fairness requirements.",
      "Attorney review strongly recommended for complex or one-sided agreements.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
