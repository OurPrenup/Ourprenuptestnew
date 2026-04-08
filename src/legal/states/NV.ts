import type { StateLegalConfig } from "../types";

export const NV_CONFIG: StateLegalConfig = {
  stateCode: "NV",
  stateName: "Nevada",
  researchDepth: "verified",

  propertyRegime: "community_property",
  communityPropertyVariant: "standard",

  upaaStatus: "upaa",
  statuteCitations: [
    "NRS § 123A.010",
    "NRS § 123A.020",
    "NRS § 123A.030",
    "NRS § 123A.040",
    "NRS § 123A.050",
    "NRS § 123A.060",
    "NRS § 123A.070",
    "NRS § 123A.080",
    "NRS § 123A.090",
    "NRS § 123A.100",
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
    strictness: "strict",
    waiverPermitted: true,
    specialRequirements: null,
    notes:
      "Non-disclosure is an INDEPENDENT ground for invalidation under Fick v. Fick. Even if the agreement is otherwise fair, lack of disclosure alone can void it.",
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
    specialRules: [
      "Cannot limit support during marriage — any such provision is void ab initio (Cord v. Neuhoff 1978).",
      "NRS 123A.080(1) uses OR — each ground (involuntary, unconscionable, lack of disclosure) independently invalidates the agreement.",
    ],
    notes:
      "Spousal support can be modified for post-divorce purposes. Cannot limit support during marriage. Public assistance safety valve applies.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest:
      "NRS 123A.080(1) uses OR — involuntary OR unconscionable OR lack of disclosure each independently invalidates. Presumption of fraud where agreement greatly disfavors one party. Four-part test to overcome: (1) opportunity for independent counsel, (2) no coercion, (3) substantial business acumen, (4) understood finances.",
    threeOptionRemedy: false,
    presumptionOfFraud: true,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "nv-presumption-of-fraud",
      description:
        "Presumption of fraud arises where a prenuptial agreement greatly disfavors one party. Must overcome with four-part test: opportunity for counsel, no coercion, substantial business acumen, and understood finances.",
      platformImpact:
        "Platform should flag highly one-sided agreements and recommend independent counsel. Include acknowledgment of financial understanding.",
      severity: "critical",
    },
    {
      ruleId: "nv-or-standard",
      description:
        "NRS 123A.080(1) uses OR — involuntary, unconscionable, or lack of disclosure EACH independently invalidates the agreement.",
      platformImpact:
        "Each ground must be independently addressed. Disclosure alone is sufficient to void agreement if missing.",
      severity: "critical",
    },
    {
      ruleId: "nv-no-support-during-marriage",
      description:
        "Cannot limit spousal support during the marriage — any such provision is void ab initio (Cord v. Neuhoff 1978).",
      platformImpact:
        "Platform must not allow provisions limiting support during marriage. Only post-divorce support may be modified.",
      severity: "critical",
    },
    {
      ruleId: "nv-independent-disclosure-ground",
      description:
        "Non-disclosure is an independent ground for invalidation regardless of other factors (Fick v. Fick 1993).",
      platformImpact:
        "Require thorough financial disclosure. Warn users that skipping disclosure alone can void the agreement.",
      severity: "critical",
    },
  ],

  caseLaw: [
    {
      citation: "Fick v. Fick (Nev. 1993)",
      description:
        "Established that non-disclosure is an independent ground for invalidation of a prenuptial agreement, regardless of other factors.",
    },
    {
      citation: "Cord v. Neuhoff (Nev. 1978)",
      description:
        "Held that provisions limiting spousal support during the marriage are void ab initio.",
    },
    {
      citation: "Sullivan v. Sullivan (Nev. 2021)",
      description:
        "Addressed modern enforceability standards for Nevada prenuptial agreements.",
    },
    {
      citation: "Buettner v. Buettner (Nev.)",
      description:
        "Examined enforceability and disclosure requirements for Nevada prenuptial agreements.",
    },
    {
      citation: "Sogg v. Nevada State Bank (Nev.)",
      description:
        "Addressed the intersection of prenuptial agreements and financial institutions in Nevada.",
    },
  ],

  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: [
      "Require thorough financial disclosure — non-disclosure alone invalidates.",
      "Prevent provisions limiting support during marriage.",
      "Flag highly one-sided agreements and recommend counsel.",
      "Include acknowledgment of financial understanding to overcome presumption of fraud.",
    ],
    warnings: [
      "Presumption of fraud applies to one-sided agreements.",
      "Non-disclosure is an independent ground for invalidation.",
      "Cannot limit spousal support during marriage.",
      "Each invalidation ground under NRS 123A.080(1) is independent (OR standard).",
    ],
    marketingNotes: [
      "Community property state — prenups are valuable for asset protection.",
      "Moderate self-service viability due to presumption of fraud and strict disclosure.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
