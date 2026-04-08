import type { StateLegalConfig } from "../types";

export const AZ_CONFIG: StateLegalConfig = {
  stateCode: "AZ",
  stateName: "Arizona",
  researchDepth: "deeply_researched",

  propertyRegime: "community_property",
  communityPropertyVariant: "standard",

  upaaStatus: "upaa",
  statuteCitations: ["ARS § 25-201", "ARS § 25-202", "ARS § 25-203", "ARS § 25-204", "ARS § 25-205"],

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
      "Fair and reasonable disclosure required under UPAA. Can be waived in writing.",
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
    safetyValve: "public_assistance",
    specialRules: [],
    notes:
      "Spousal support can be modified or eliminated. Public assistance safety valve applies under UPAA.",
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
      ruleId: "az-community-property",
      description:
        "Arizona is a community property state. Without a prenup, most property acquired during marriage is split 50/50.",
      platformImpact:
        "Platform must include community property clauses explaining how community vs. separate property will be handled.",
      severity: "critical",
    },
    {
      ruleId: "az-no-lifestyle-clauses",
      description:
        "Lifestyle clauses (infidelity penalties, weight requirements, etc.) are not enforceable in Arizona.",
      platformImpact:
        "Do not offer lifestyle clause options for Arizona agreements.",
      severity: "informational",
    },
    {
      ruleId: "az-effective-upon-marriage",
      description:
        "Prenuptial agreement becomes effective upon marriage. No consideration beyond marriage is required.",
      platformImpact: "Note in agreement that it takes effect upon marriage.",
      severity: "informational",
    },
  ],

  caseLaw: [],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Include community property clauses and separate property designations.",
      "Explain community property default rules to users.",
    ],
    warnings: [
      "Community property state: without a prenup, most marital property is split 50/50.",
    ],
    marketingNotes: [
      "Good self-service state with standard UPAA framework.",
      "Community property regime makes prenups particularly valuable for asset protection.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
