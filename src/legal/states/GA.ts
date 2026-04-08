import type { StateLegalConfig } from "../types";

export const GA_CONFIG: StateLegalConfig = {
  stateCode: "GA",
  stateName: "Georgia",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "not_adopted",
  statuteCitations: ["Ga. Code § 19-3-62"],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "required",
    notarizationType: "standard",
    witnesses: "required",
    witnessCount: 2,
    witnessRules:
      "Two witnesses required under § 19-3-62, one of whom MUST be a Notary Public. The notary cannot serve as both notary and witness — you need a notary plus one additional witness. Without proper witnesses the agreement is INVALID.",
    acknowledgmentOptions: null,
    wetInkRequired: false,
  },

  financialDisclosure: {
    strictness: "standard",
    waiverPermitted: false,
    specialRequirements: null,
    notes: "Full financial disclosure required.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions: null,
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "none",
    details: "No statutory waiting period.",
    daysRequired: null,
    calculationBasis: null,
  },

  spousalSupport: {
    canModify: true,
    disabled: false,
    disabledReason: null,
    safetyValve: "none",
    specialRules: [],
    notes: "Spousal support can be addressed in the prenuptial agreement.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest:
      "Case-by-case analysis. Georgia has not adopted the UPAA, so courts evaluate fairness on a case-by-case basis.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "ga-two-witnesses-notary",
      description:
        "Georgia requires two witnesses for a valid prenuptial agreement under § 19-3-62. One of the two witnesses must be a Notary Public. The notary cannot count as both the notary and a witness — a separate additional witness is required.",
      platformImpact:
        "Platform MUST provide detailed signing ceremony instructions: notary + 1 additional witness. Without proper witnesses the agreement is void.",
      severity: "critical",
    },
    {
      ruleId: "ga-no-upaa",
      description:
        "Georgia has not adopted the UPAA or UPMAA. Prenuptial agreements are governed by § 19-3-62 and case law.",
      platformImpact:
        "Cannot rely on UPAA framework. Must follow Georgia-specific statutory and case law requirements.",
      severity: "important",
    },
    {
      ruleId: "ga-self-drafted-vulnerable",
      description:
        "Self-drafted prenuptial agreements are particularly vulnerable to challenge in Georgia, especially for witness/execution defects.",
      platformImpact:
        "Signing ceremony compliance must be heavily emphasized. Consider additional verification steps.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Multiple Georgia cases invalidating for lack of witnesses",
      description:
        "Georgia courts have consistently invalidated prenuptial agreements that failed to meet the two-witness requirement.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Provide critical signing ceremony instructions: notary public as one witness + one additional witness.",
      "Emphasize that notary cannot serve as both notary and witness.",
      "Include witness verification checklist in signing instructions.",
    ],
    warnings: [
      "Two witnesses required — one MUST be a Notary Public. Failure invalidates the agreement.",
      "Notary cannot count as both the notary and a witness.",
      "Georgia has not adopted the UPAA; case law governs enforcement.",
      "Self-drafted agreements are particularly vulnerable to challenge.",
    ],
    marketingNotes: [
      "Self-service viable with strict signing ceremony guidance.",
      "Witness requirements are the most critical compliance point.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
