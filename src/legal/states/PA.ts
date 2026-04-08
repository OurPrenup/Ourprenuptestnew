import type { StateLegalConfig } from "../types";

export const PA_CONFIG: StateLegalConfig = {
  stateCode: "PA",
  stateName: "Pennsylvania",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "not_adopted",
  statuteCitations: ["23 Pa.C.S. § 3106"],

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
    specialRequirements: null,
    notes:
      "Full and fair disclosure required. Waiver of disclosure is not permitted. However, Pennsylvania only requires voluntariness and disclosure — not fairness of terms.",
  },

  independentCounsel: {
    requirement: "not_required",
    conditions:
      "Simeone v. Simeone (1990) rejected paternalistic approach. Prenups treated as business contracts; parties presumed capable of protecting their own interests.",
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "none",
    details:
      "No waiting period. Pennsylvania courts have upheld agreements signed the day before the wedding.",
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
      "Spousal support can be modified or eliminated. No public assistance safety valve.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest:
      "Pennsylvania does not require agreements to be fair or reasonable. Only voluntariness and full disclosure required. Most permissive standard.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "pa-business-contract-approach",
      description:
        "Pennsylvania treats prenuptial agreements as ordinary business contracts. Courts will not inquire into the reasonableness of terms. Only voluntariness and disclosure matter.",
      platformImpact:
        "Best state for self-service. Platform can present agreements with confidence that reasonable terms will be upheld if voluntariness and disclosure are documented.",
      severity: "critical",
    },
    {
      ruleId: "pa-no-fairness-review",
      description:
        "Unlike most states, Pennsylvania does not review prenuptial agreements for substantive fairness or unconscionability of terms. The only grounds for invalidation are lack of voluntariness or lack of disclosure.",
      platformImpact:
        "Platform does not need to build fairness guardrails for PA agreements beyond ensuring voluntariness and disclosure documentation.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Simeone v. Simeone (Pa. 1990)",
      description:
        "Landmark case rejecting paternalistic approach to prenups. Prenuptial agreements treated as ordinary contracts. No requirement of fairness or reasonableness — only voluntariness and disclosure.",
    },
    {
      citation: "Porreco v. Porreco (Pa. 2003)",
      description:
        "Reaffirmed the Simeone framework. Upheld prenuptial agreement enforcement under the business contract approach.",
    },
  ],

  platformNotes: {
    selfServiceViability: "excellent",
    requiredPlatformActions: [
      "Document voluntariness thoroughly.",
      "Ensure full financial disclosure is completed and recorded.",
    ],
    warnings: [
      "Despite permissive standards, disclosure must still be provided — waiver of disclosure is not permitted.",
    ],
    marketingNotes: [
      "Best self-service state in the country. Courts treat prenups as business contracts.",
      "Ideal for self-service platform — minimal legal hurdles if voluntariness and disclosure are documented.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
