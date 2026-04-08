import type { StateLegalConfig } from "../types";

export const HI_CONFIG: StateLegalConfig = {
  stateCode: "HI",
  stateName: "Hawaii",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: ["HRS §§ 572D-1 to 572D-11"],

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
    notes: "Standard UPAA financial disclosure required.",
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
    safetyValve: "public_assistance",
    specialRules: [],
    notes:
      "Spousal support can be modified or eliminated. Public assistance safety valve applies. Hawaii has NOT removed the public assistance override (unlike Delaware).",
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
      ruleId: "hi-clean-upaa",
      description:
        "Hawaii adopted a clean UPAA in 1987 with no significant deviations from the uniform act.",
      platformImpact:
        "Standard UPAA compliance is sufficient. No special state-specific modifications needed.",
      severity: "informational",
    },
  ],

  caseLaw: [
    {
      citation: "Lewis v. Lewis, 748 P.2d 1362 (Haw. 1988)",
      description:
        "Early Hawaii case addressing prenuptial agreement enforcement under the UPAA.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Standard UPAA compliance workflow.",
      "Ensure adequate financial disclosure.",
    ],
    warnings: [
      "Standard UPAA requirements apply with no significant deviations.",
    ],
    marketingNotes: [
      "Good self-service viability. Clean UPAA state with straightforward requirements.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
