import type { StateLegalConfig } from "../types";

export const MN_CONFIG: StateLegalConfig = {
  stateCode: "MN",
  stateName: "Minnesota",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "own_framework",
  statuteCitations: ["Minn. Stat. § 519.11"],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "required",
    notarizationType: "standard",
    witnesses: "required",
    witnessCount: 2,
    witnessRules:
      "Notary cannot serve as a witness. Minimum at signing: 2 parties + 2 witnesses + 1 notary = 5 people.",
    acknowledgmentOptions: null,
    wetInkRequired: false,
  },

  financialDisclosure: {
    strictness: "strict",
    waiverPermitted: false,
    specialRequirements:
      "Must include basis for valuations — explain HOW values were arrived at. Must include reasonably accurate description of all material facts and good faith value estimates. Cannot be waived.",
    notes:
      "Post-August 2024 amendments require strict disclosure including: (1) reasonably accurate description of all material facts, (2) good faith value estimates, and (3) the BASIS for those valuations. Disclosure cannot be waived.",
  },

  independentCounsel: {
    requirement: "opportunity_required",
    conditions:
      "Meaningful opportunity to consult independent counsel required. Each party must have a genuine chance to retain counsel. A springing prenup presented hours before the wedding fails this standard.",
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: true,
    type: "mandatory",
    details:
      "Must be signed at least 7 days BEFORE the wedding ceremony. If signed within the 7-day window, the agreement is PRESUMED not valid. Different from California: Minnesota measures from the wedding date, California measures from the final draft.",
    daysRequired: 7,
    calculationBasis: "before_wedding",
  },

  spousalSupport: {
    canModify: true,
    disabled: false,
    disabledReason: null,
    safetyValve: "public_assistance",
    specialRules: [
      "Courts review fairness of spousal support provisions at both execution and enforcement (dual-time review).",
      "Public assistance safety valve applies — court can override spousal support waiver if enforcement would leave a spouse on public assistance.",
    ],
    notes:
      "Spousal support can be addressed. Courts review fairness at both execution and enforcement. Public assistance safety valve applies.",
  },

  unconscionability: {
    reviewTime: "dual_time",
    burdenOfProof: null,
    uniqueTest:
      "Dual-time review under 2024 amendments: agreement must be fair at both execution and enforcement. Additionally, McKee-Johnson four-factor common law test applies alongside statutory requirements.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "mn-7-day-pre-wedding",
      description:
        "Must be signed at least 7 days before the wedding ceremony (August 2024 amendments). If signed within the 7-day window, the agreement is presumed not valid. Different from California's 7-day rule which measures from the final draft.",
      platformImpact:
        "Enforce a 7-day pre-wedding timer. Calculate based on the wedding date, not the final draft date. Block signing within 7 days of the ceremony. Display clear countdown.",
      severity: "critical",
    },
    {
      ruleId: "mn-notary-not-witness",
      description:
        "The notary cannot serve as one of the two required witnesses. Minimum 5 people must be present at signing: 2 parties + 2 witnesses + 1 notary.",
      platformImpact:
        "Generate separate signature blocks for 2 witnesses and 1 notary. Instruct users that 5 people minimum must be present. Explicitly state the notary cannot be a witness.",
      severity: "critical",
    },
    {
      ruleId: "mn-valuation-basis",
      description:
        "Post-August 2024 amendments require that financial disclosure include the BASIS for valuations — not just the values, but how they were arrived at (e.g., appraisal, tax assessment, market estimate).",
      platformImpact:
        "Add a 'basis for valuation' field to each asset in the financial disclosure module. Require users to explain how each value was determined.",
      severity: "critical",
    },
    {
      ruleId: "mn-dual-enforcement-tests",
      description:
        "TWO enforceability tests apply: (1) Statutory (§ 519.11): fair and full disclosure + opportunity for counsel. (2) Common law (McKee-Johnson): four-factor test. 2024 amendments confirmed marriage is adequate consideration.",
      platformImpact:
        "Ensure agreement satisfies both statutory and common law requirements. Include fairness warnings. Document meaningful counsel opportunity.",
      severity: "important",
    },
    {
      ruleId: "mn-2024-amendments",
      description:
        "Major amendments effective August 1, 2024 added the 7-day pre-wedding requirement, valuation basis disclosure, meaningful counsel opportunity, dual-time unconscionability review, inclusive terminology, and confirmed marriage as adequate consideration.",
      platformImpact:
        "All Minnesota agreements must comply with post-August 2024 requirements. Use inclusive terminology as required by the amendments.",
      severity: "important",
    },
    {
      ruleId: "mn-postnup-separate-counsel",
      description:
        "Postnuptial agreements in Minnesota require separate counsel for each party.",
      platformImpact:
        "If postnup support is added, require proof of separate counsel for Minnesota postnups.",
      severity: "informational",
    },
  ],

  caseLaw: [
    {
      citation: "McKee-Johnson v. Johnson (Minn.)",
      description:
        "Established the four-factor common law test for prenuptial agreement enforceability in Minnesota.",
    },
    {
      citation: "Kremer v. Kremer, 912 N.W.2d 617 (Minn. 2018)",
      description:
        "Key Minnesota case addressing prenuptial agreement enforceability standards.",
    },
  ],

  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: [
      "Enforce 7-day pre-wedding signing timer based on wedding date.",
      "Require 'basis for valuation' field for each disclosed asset.",
      "Generate signature blocks for 2 witnesses + 1 notary (notary separate from witnesses).",
      "Instruct: minimum 5 people at signing (2 parties + 2 witnesses + 1 notary).",
      "Document meaningful opportunity for independent counsel.",
      "Include fairness warnings for dual-time unconscionability review.",
      "Use inclusive terminology per 2024 amendments.",
    ],
    warnings: [
      "Complex requirements after August 2024 amendments.",
      "Signing within 7 days of the wedding creates a presumption of invalidity.",
      "Notary cannot serve as a witness — 5 people minimum at signing.",
      "Disclosure must include basis for valuations, not just values.",
      "Dual-time review: agreement must be fair at both execution and enforcement.",
    ],
    marketingNotes: [
      "Moderate self-service viability due to complex execution and disclosure requirements.",
      "Emphasize the importance of starting early (7-day pre-wedding rule).",
      "Valuation basis requirement adds thoroughness that strengthens enforceability.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
