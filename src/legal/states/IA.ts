import type { StateLegalConfig } from "../types";

export const IA_CONFIG: StateLegalConfig = {
  stateCode: "IA",
  stateName: "Iowa",
  researchDepth: "partially_verified",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: [
    "Iowa Code § 596.1",
    "Iowa Code § 596.2",
    "Iowa Code § 596.3",
    "Iowa Code § 596.4",
    "Iowa Code § 596.5",
    "Iowa Code § 596.6",
    "Iowa Code § 596.7",
    "Iowa Code § 596.8",
    "Iowa Code § 596.9",
    "Iowa Code § 596.10",
    "Iowa Code § 596.11",
    "Iowa Code § 596.12",
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
      "Standard UPAA financial disclosure required. Disclosure waiver is permitted under Iowa's UPAA adoption.",
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
    canModify: false,
    disabled: true,
    disabledReason:
      "Iowa did not adopt UPAA § 3(a)(4) permitting modification/elimination of spousal support. Iowa prenups cannot address spousal support.",
    safetyValve: "none",
    specialRules: [
      "Iowa did not adopt the UPAA provision allowing prenuptial agreements to modify or eliminate spousal support.",
      "Any spousal support provisions in an Iowa prenup are unenforceable.",
      "Spousal support section must be disabled in the platform for Iowa users.",
    ],
    notes:
      "CRITICAL: Iowa did NOT adopt UPAA § 3(a)(4). Prenuptial agreements in Iowa CANNOT address spousal support. The spousal support module must be completely disabled for Iowa.",
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
      ruleId: "ia-no-spousal-support",
      description:
        "Iowa did not adopt UPAA § 3(a)(4). Prenuptial agreements cannot modify or eliminate spousal support. This is the single most important rule for Iowa prenups.",
      platformImpact:
        "Spousal support section must be completely disabled for Iowa. Do not allow users to add any spousal support provisions. Display clear explanation that Iowa law does not permit prenups to address spousal support.",
      severity: "critical",
    },
  ],

  caseLaw: [],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Disable spousal support module entirely for Iowa users.",
      "Display explanation that Iowa law does not allow prenups to address spousal support.",
      "Focus agreement on property division and financial rights.",
    ],
    warnings: [
      "Spousal support provisions are completely unenforceable in Iowa prenups.",
      "Iowa did not adopt UPAA § 3(a)(4) — this cannot be worked around.",
    ],
    marketingNotes: [
      "Self-service viable for property-focused agreements.",
      "Cannot offer spousal support planning — must be transparent about this limitation.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
