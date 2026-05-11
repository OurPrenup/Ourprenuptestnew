import type { StateLegalConfig } from "../types";

export const NC_CONFIG: StateLegalConfig = {
  stateCode: "NC",
  stateName: "North Carolina",
  researchDepth: "verified",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: [
    "N.C. Gen. Stat. § 52B-1",
    "N.C. Gen. Stat. § 52B-2",
    "N.C. Gen. Stat. § 52B-3",
    "N.C. Gen. Stat. § 52B-4",
    "N.C. Gen. Stat. § 52B-5",
    "N.C. Gen. Stat. § 52B-6",
    "N.C. Gen. Stat. § 52B-7",
    "N.C. Gen. Stat. § 52B-8",
    "N.C. Gen. Stat. § 52B-9",
    "N.C. Gen. Stat. § 52B-10",
    "N.C. Gen. Stat. § 52B-11",
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
      "Standard UPAA financial disclosure. Notably, an unconscionable agreement is STILL enforceable if proper disclosure was given.",
  },

  independentCounsel: {
    requirement: "not_required",
    conditions:
      "Kornegay v. Robinson upheld a prenuptial agreement even where the wife did not read it before signing. Counsel is not required but always advisable.",
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
      "§ 52B-7(b): court can override a spousal support waiver when it causes a party to be eligible for public assistance.",
      "Court must also find the party qualifies as a 'dependent spouse' under G.S. 50-16.1A and that requirements of G.S. 50-16.2A (postseparation support) or G.S. 50-16.3A (alimony) have been met.",
    ],
    notes:
      "Spousal support can be modified. Primary trigger is public assistance eligibility (§ 52B-7(b)), with additional requirement that the party qualifies as a dependent spouse under G.S. 50-16.1A.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest:
      "An unconscionable agreement is STILL enforceable if proper financial disclosure was provided. Unconscionability alone does not invalidate if disclosure was adequate.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "nc-public-assistance-plus-dependent-spouse",
      description:
        "§ 52B-7(b): court can override a spousal support waiver when it causes eligibility for public assistance. Additionally, the court must find the party is a 'dependent spouse' under G.S. 50-16.1A. This is a dual requirement — public assistance trigger plus dependent spouse finding.",
      platformImpact:
        "Include public assistance safety valve language. Explain the dual requirement in user-facing materials.",
      severity: "important",
    },
    {
      ruleId: "nc-unconscionability-with-disclosure",
      description:
        "An unconscionable prenuptial agreement is STILL enforceable in North Carolina if proper financial disclosure was given. This is more protective of agreements than most states.",
      platformImpact:
        "Emphasize thorough financial disclosure as the key to enforceability. Even one-sided agreements survive with proper disclosure.",
      severity: "important",
    },
    {
      ruleId: "nc-one-year-separation",
      description:
        "North Carolina requires a 1-year separation period before divorce can be finalized.",
      platformImpact:
        "Include informational note about the 1-year separation requirement in user materials.",
      severity: "informational",
    },
  ],

  caseLaw: [
    {
      citation: "Kornegay v. Robinson (N.C.)",
      description:
        "Upheld a prenuptial agreement even where the wife did not read it before signing, establishing a low threshold for independent counsel requirements.",
    },
    {
      citation: "Muchmore v. Trask (N.C. 2008)",
      description:
        "Addressed enforceability standards for North Carolina prenuptial agreements.",
    },
    {
      citation: "Stewart v. Stewart (N.C. 2000)",
      description:
        "Examined prenuptial agreement validity and enforcement in North Carolina.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Ensure thorough financial disclosure — key to enforceability even for one-sided agreements.",
      "Include dependent spouse threshold language for spousal support provisions.",
      "Include informational note about 1-year separation requirement.",
    ],
    warnings: [
      "Unconscionable agreements can still be enforced if disclosure was proper — disclosure is paramount.",
      "Public assistance eligibility plus dependent spouse threshold must be met before court overrides spousal support waiver.",
      "North Carolina requires 1-year separation before divorce.",
    ],
    marketingNotes: [
      "Good self-service viability with favorable enforceability standards.",
      "One of the most agreement-friendly states — proper disclosure makes even one-sided agreements enforceable.",
      "No counsel requirement, no witnesses, no waiting period.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
