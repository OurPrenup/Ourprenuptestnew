import type { StateLegalConfig } from "../types";

export const CO_CONFIG: StateLegalConfig = {
  stateCode: "CO",
  stateName: "Colorado",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upmaa",
  statuteCitations: ["C.R.S. § 14-2-301 et seq."],

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
      "Adequate financial disclosure required under UPMAA. Written record format.",
  },

  independentCounsel: {
    requirement: "opportunity_required",
    conditions:
      "If unrepresented, agreement must include plain-language waiver notice explaining marital rights and obligations being modified or waived.",
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "none",
    details: "No specific statutory waiting period.",
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
    uniqueTest: null,
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "co-plain-language-waiver",
      description:
        "If a party is not represented by independent counsel, the agreement must include a notice of waiver of rights and an explanation in plain language of the marital rights and obligations being modified or waived.",
      platformImpact:
        "Platform MUST generate a plain-language waiver/notice section for unrepresented parties explaining rights being modified.",
      severity: "critical",
    },
    {
      ruleId: "co-upmaa-adoption",
      description:
        "Colorado adopted the UPMAA in 2013 (effective July 1, 2014), replacing the older Colorado Marital Agreement Act (CMAA, 1986-2014). Marriage is adequate consideration under UPMAA.",
      platformImpact:
        "No separate consideration required. Pre-2014 CMAA case law may still be referenced by courts.",
      severity: "informational",
    },
  ],

  caseLaw: [
    {
      citation: "Pre-2014 CMAA case law",
      description:
        "Colorado CMAA (1986-2014) case law may still be referenced by courts for prenuptial agreement interpretation.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Generate plain-language waiver notice for unrepresented parties.",
      "Include explanation of marital rights and obligations being modified or waived.",
    ],
    warnings: [
      "Plain-language waiver notice is required if either party does not have independent counsel.",
      "Pre-2014 CMAA case law may still apply to interpretation questions.",
    ],
    marketingNotes: [
      "Self-service viable with proper plain-language waiver generation.",
      "UPMAA framework provides clear, modern requirements.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
