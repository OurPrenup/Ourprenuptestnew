import type { StateLegalConfig } from "../types";

export const DE_CONFIG: StateLegalConfig = {
  stateCode: "DE",
  stateName: "Delaware",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: ["Del. Code Ann. tit. 13, §§ 321-328"],

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
      "Fair and reasonable disclosure required. Minor omissions are acceptable per Silverman.",
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
    safetyValve: "none_removed",
    specialRules: [
      "Delaware removed the UPAA public assistance safety valve — courts may not override spousal support waivers even if one party ends up on welfare.",
    ],
    notes:
      "Delaware is unique among UPAA states in removing the public assistance override for spousal support waivers.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest:
      "Standard UPAA unconscionability at execution. Laches defense available — unreasonable delay in challenging can bar the claim.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "de-no-public-assistance-override",
      description:
        "Delaware removed the UPAA public assistance safety valve. Courts cannot override spousal support waivers even if one party would qualify for public assistance.",
      platformImpact:
        "Platform must clearly warn users that spousal support waivers are final and courts will not intervene even in hardship situations.",
      severity: "critical",
    },
    {
      ruleId: "de-sunset-clauses",
      description:
        "Sunset clauses are permitted in Delaware prenuptial agreements.",
      platformImpact:
        "Platform may offer sunset clause as an optional provision.",
      severity: "informational",
    },
    {
      ruleId: "de-laches-defense",
      description:
        "Laches can bar late challenges to prenuptial agreements. In the Sullivan estate case, a 30-year delay barred the challenge.",
      platformImpact:
        "Inform users that delayed challenges to agreements may be barred by laches.",
      severity: "informational",
    },
  ],

  caseLaw: [
    {
      citation: "Silverman v. Silverman (Del.)",
      description:
        "Held that minor omissions in financial disclosure do not invalidate a prenuptial agreement.",
    },
    {
      citation: "Sullivan estate case (Del.)",
      description:
        "Applied laches defense to bar a challenge to a prenuptial agreement after a 30-year delay.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Clearly warn that Delaware removed the public assistance safety valve for spousal support.",
      "Include prominent disclosure that spousal support waivers are final.",
    ],
    warnings: [
      "No public assistance safety valve: spousal support waivers cannot be overridden by courts even in hardship.",
      "Users waiving spousal support must understand the finality of that waiver.",
    ],
    marketingNotes: [
      "Good self-service viability with standard UPAA framework.",
      "Unique removal of public assistance override requires clear user education.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
