import type { StateLegalConfig } from "../types";

export const WA_CONFIG: StateLegalConfig = {
  stateCode: "WA",
  stateName: "Washington",
  researchDepth: "deeply_researched",

  propertyRegime: "community_property",
  communityPropertyVariant: "standard",

  upaaStatus: "not_adopted",
  statuteCitations: ["RCW 26.09"],

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
    strictness: "strict",
    waiverPermitted: false,
    specialRequirements: null,
    notes:
      "Strict financial disclosure required. Waiver not permitted. Courts scrutinize adequacy of disclosure closely.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "Presenting an agreement on a 'take it or leave it' basis without counsel may lead to invalidation. Courts view lack of counsel as a factor weighing against voluntariness.",
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "none",
    details:
      "No mandatory waiting period, but timing is closely examined by courts. Last-minute agreements face heightened scrutiny.",
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
      "Spousal support can be modified or eliminated. No statutory safety valve.",
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
      ruleId: "wa-community-property",
      description:
        "Washington is a community property state. Without a prenuptial agreement, all property acquired during marriage is presumed community property.",
      platformImpact:
        "Platform must explain community property defaults and how the agreement modifies them.",
      severity: "critical",
    },
    {
      ruleId: "wa-process-documentation",
      description:
        "Washington courts highly value process documentation. Keeping records of emails, drafts, negotiation timelines, and communications significantly strengthens enforceability.",
      platformImpact:
        "Platform should generate and preserve a full audit trail of the agreement process: drafts, revisions, communications, and timeline. Provide users with downloadable process documentation.",
      severity: "critical",
    },
    {
      ruleId: "wa-clarity-requirement",
      description:
        "Washington courts will strike down ambiguous provisions. Agreement language must be clear and unambiguous.",
      platformImpact:
        "Platform must use clear, precise language in all agreement templates. Avoid vague or open-ended provisions that could be interpreted multiple ways.",
      severity: "important",
    },
    {
      ruleId: "wa-take-it-or-leave-it",
      description:
        "Presenting an agreement on a 'take it or leave it' basis without opportunity for negotiation or counsel weighs heavily against enforceability.",
      platformImpact:
        "Platform should document that both parties had opportunity to negotiate and consult counsel. Include negotiation steps in the workflow.",
      severity: "important",
    },
  ],

  caseLaw: [],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Include community property explanation and classification guidance.",
      "Generate comprehensive process documentation and audit trail.",
      "Ensure agreement language is clear and unambiguous.",
      "Document negotiation opportunity for both parties.",
    ],
    warnings: [
      "Community property state — ensure users understand default property regime.",
      "Timing is closely examined — last-minute agreements face heightened scrutiny.",
      "Ambiguous provisions will be struck down. Clarity is critical.",
      "'Take it or leave it' presentation without counsel may invalidate the agreement.",
    ],
    marketingNotes: [
      "Good self-service viability with strong process documentation.",
      "Community property framework makes prenups valuable for WA couples.",
      "Platform's built-in audit trail is a significant advantage for WA enforceability.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
