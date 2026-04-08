import type { StateLegalConfig } from "../types";

export const NY_CONFIG: StateLegalConfig = {
  stateCode: "NY",
  stateName: "New York",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "not_adopted",
  statuteCitations: ["NY DRL § 236(B)(3)"],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "required",
    notarizationType: "deed_style_ny",
    witnesses: "recommended",
    witnessCount: 2,
    witnessRules: null,
    acknowledgmentOptions: null,
    wetInkRequired: false,
  },

  financialDisclosure: {
    strictness: "standard",
    waiverPermitted: false,
    specialRequirements: null,
    notes:
      "Financial disclosure is required. As a non-UPAA state, courts apply general equitable principles to evaluate adequacy of disclosure.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "If the prenuptial agreement addresses embryo disposition, independent counsel is REQUIRED for both parties.",
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
    safetyValve: "none",
    specialRules: [
      "Waiver must include calculation using actual incomes, NYS guideline maintenance formula, and both parties acknowledging the deviation (J.M. v. G.V. 2025).",
      "A waiver that leaves a spouse unable to self-support will not be enforced.",
    ],
    notes:
      "Spousal support can be modified. No specific statutory safety valve, but courts will not enforce waivers that leave a spouse unable to self-support. Must include guideline maintenance calculation.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest:
      "Strong presumption of enforceability. Must show agreement is 'manifestly unfair' AND there was overreaching to invalidate.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "ny-deed-style-acknowledgment",
      description:
        "New York requires deed-style acknowledgment, which is stricter than regular notarization. Must conform to Real Property Law § 309-a. This is the most commonly missed requirement.",
      platformImpact:
        "Platform must use deed-style acknowledgment format conforming to Real Property Law § 309-a, not standard notarization. Include proper acknowledgment language in the agreement template.",
      severity: "critical",
    },
    {
      ruleId: "ny-embryo-disposition-counsel",
      description:
        "If the prenuptial agreement addresses embryo disposition, independent counsel is REQUIRED for both parties.",
      platformImpact:
        "Detect when embryo disposition provisions are included and require independent counsel for both parties.",
      severity: "critical",
    },
    {
      ruleId: "ny-maintenance-calculation",
      description:
        "Spousal support waivers must include a calculation using actual incomes and the NYS guideline maintenance formula, with both parties acknowledging the deviation (J.M. v. G.V. 2025).",
      platformImpact:
        "Platform must generate guideline maintenance calculation using actual incomes and include acknowledgment of deviation from guidelines.",
      severity: "critical",
    },
    {
      ruleId: "ny-no-expiration",
      description:
        "New York prenuptial agreements last forever unless jointly terminated by the parties. There is no automatic expiration.",
      platformImpact:
        "Include language about indefinite duration. Offer optional sunset clause if parties desire one.",
      severity: "important",
    },
    {
      ruleId: "ny-non-upaa",
      description:
        "New York has NOT adopted the UPAA or UPMAA. Prenuptial agreements are governed by NY DRL § 236(B)(3) and common law.",
      platformImpact:
        "Cannot rely on standard UPAA framework. Must ensure compliance with DRL § 236(B)(3) and case law requirements.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Christian v. Christian (N.Y. 1977)",
      description:
        "Foundational New York case on prenuptial agreement enforceability.",
    },
    {
      citation: "J.M. v. G.V. (N.Y. 2025)",
      description:
        "Established that spousal support waivers must include calculation using actual incomes, NYS guideline maintenance formula, and both parties' acknowledgment of the deviation.",
    },
    {
      citation: "Matisoff v. Dobi (N.Y. 1997)",
      description:
        "Addressed enforceability standards and the strong presumption of enforceability for New York prenuptial agreements.",
    },
    {
      citation: "B.W. v. R.F. (N.Y. 2016)",
      description:
        "Addressed modern enforceability considerations for New York prenuptial agreements.",
    },
  ],

  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: [
      "Use deed-style acknowledgment conforming to Real Property Law § 309-a.",
      "Generate guideline maintenance calculation using actual incomes.",
      "Include acknowledgment of deviation from maintenance guidelines.",
      "Detect embryo disposition provisions and require independent counsel.",
      "Include language about indefinite agreement duration.",
    ],
    warnings: [
      "Deed-style acknowledgment (not standard notarization) is required — most commonly missed requirement.",
      "Non-UPAA state — governed by DRL § 236(B)(3) and case law.",
      "Embryo disposition provisions require independent counsel.",
      "Spousal support waivers must include guideline maintenance calculation.",
    ],
    marketingNotes: [
      "Moderate self-service viability due to deed-style acknowledgment and maintenance calculation requirements.",
      "Strong presumption of enforceability favors well-drafted agreements.",
      "Non-UPAA state with well-developed case law.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
