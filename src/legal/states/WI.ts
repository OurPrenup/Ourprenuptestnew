import type { StateLegalConfig } from "../types";

export const WI_CONFIG: StateLegalConfig = {
  stateCode: "WI",
  stateName: "Wisconsin",
  researchDepth: "verified",

  propertyRegime: "community_property",
  communityPropertyVariant: "umpa_wisconsin",

  upaaStatus: "own_framework",
  statuteCitations: [
    "Wis. Stat. § 766.58",
    "Wis. Stat. § 766.587",
    "Wis. Stat. § 766.588",
    "Wis. Stat. § 766.589",
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
    specialRequirements:
      "Statutory form agreements under § 766.587 are enforceable WITHOUT financial disclosure — unique to Wisconsin.",
    notes:
      "Standard disclosure for non-statutory-form agreements. Statutory form agreements under § 766.587 do not require financial disclosure, which is unique among all states.",
  },

  independentCounsel: {
    requirement: "not_required",
    conditions:
      "Per § 766.58(8), one attorney representing both parties does not make the agreement unconscionable.",
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
    specialRules: [
      "During marriage: cannot result in less than necessary/adequate support (§ 766.58(9)(a)).",
      "At dissolution/death: public assistance safety valve (§ 766.58(9)(b)).",
    ],
    notes:
      "Spousal support can be modified. Dual safety valve: during marriage, support cannot be reduced below necessary/adequate levels; at dissolution or death, public assistance safety valve applies.",
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
      ruleId: "wi-marital-property-agreement",
      description:
        "Wisconsin calls these 'marital property agreements' rather than prenuptial agreements. They operate under the Wisconsin Marital Property Act (WMPA), based on the Uniform Marital Property Act (UMPA), which is distinct from the UPAA/community property frameworks used by other states.",
      platformImpact:
        "Platform must use 'marital property agreement' terminology for Wisconsin. Agreement templates must align with WMPA framework rather than UPAA.",
      severity: "critical",
    },
    {
      ruleId: "wi-statutory-form-option",
      description:
        "Wisconsin provides statutory form agreements under §§ 766.587-766.589 that are enforceable without financial disclosure. This is a unique streamlined option not available in any other state.",
      platformImpact:
        "Platform should offer statutory form option for Wisconsin users as a simplified pathway. No financial disclosure module needed for statutory form agreements.",
      severity: "critical",
    },
    {
      ruleId: "wi-determination-date",
      description:
        "Wisconsin uses a 'determination date' concept that affects property classification. The determination date is the last to occur of: marriage, domicile in Wisconsin, or January 1, 1986.",
      platformImpact:
        "Platform must collect determination date information for Wisconsin users and explain its significance for property classification.",
      severity: "important",
    },
    {
      ruleId: "wi-one-attorney-permitted",
      description:
        "Per § 766.58(8), one attorney representing both parties does not render the agreement unconscionable. This is more permissive than most states.",
      platformImpact:
        "Platform can inform users that shared counsel is permitted without affecting enforceability.",
      severity: "important",
    },
    {
      ruleId: "wi-binding-arbitration",
      description:
        "Wisconsin permits binding arbitration clauses in marital property agreements.",
      platformImpact:
        "Platform may offer optional binding arbitration clause for Wisconsin agreements.",
      severity: "informational",
    },
    {
      ruleId: "wi-digital-property",
      description:
        "Wisconsin's framework addresses digital property classification.",
      platformImpact:
        "Platform can include digital property provisions for Wisconsin agreements with statutory backing.",
      severity: "informational",
    },
    {
      ruleId: "wi-dual-support-safety-valve",
      description:
        "Wisconsin has a dual safety valve for spousal support: during marriage, support cannot be reduced below necessary/adequate levels (§ 766.58(9)(a)); at dissolution or death, public assistance safety valve applies (§ 766.58(9)(b)).",
      platformImpact:
        "Platform must implement both safety valve checks for Wisconsin spousal support provisions.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Button v. Button (Wis.)",
      description:
        "Key case interpreting Wisconsin's marital property agreement framework and enforceability standards.",
    },
  ],

  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: [
      "Use 'marital property agreement' terminology throughout.",
      "Offer statutory form option under §§ 766.587-766.589.",
      "Collect and explain determination date for property classification.",
      "Implement dual spousal support safety valve.",
      "Align agreement templates with WMPA framework.",
    ],
    warnings: [
      "Most complex legal framework of any state. WMPA/UMPA differs significantly from UPAA and standard community property.",
      "Terminology must be 'marital property agreement' — not 'prenuptial agreement.'",
      "Dual spousal support safety valve has different rules during marriage vs. at dissolution.",
      "Determination date concept adds complexity to property classification.",
    ],
    marketingNotes: [
      "Moderate self-service viability due to framework complexity.",
      "Statutory form option is a unique selling point — simplest pathway in the country for basic agreements.",
      "One-attorney provision reduces cost barrier for couples.",
    ],
  },

  agreementTerminology: "marital property agreement",
};
