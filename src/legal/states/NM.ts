import type { StateLegalConfig } from "../types";

export const NM_CONFIG: StateLegalConfig = {
  stateCode: "NM",
  stateName: "New Mexico",
  researchDepth: "verified",

  propertyRegime: "community_property",
  communityPropertyVariant: "standard",

  upaaStatus: "upaa",
  statuteCitations: [
    "N.M. Stat. Ann. § 40-3A-1",
    "N.M. Stat. Ann. § 40-3A-2",
    "N.M. Stat. Ann. § 40-3A-3",
    "N.M. Stat. Ann. § 40-3A-4",
    "N.M. Stat. Ann. § 40-3A-5",
    "N.M. Stat. Ann. § 40-3A-6",
    "N.M. Stat. Ann. § 40-3A-7",
    "N.M. Stat. Ann. § 40-3A-8",
    "N.M. Stat. Ann. § 40-3A-9",
    "N.M. Stat. Ann. § 40-3A-10",
  ],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "required",
    notarizationType: "acknowledgment_nm",
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
      "Standard UPAA financial disclosure. Waiver is permitted under the statute.",
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
      "N.M. Stat. Ann. § 40-3A-4(B) prohibits adverse modification of a spouse's right to support. Rivera v. Rivera (2010) confirmed this prohibition.",
    safetyValve: "none",
    specialRules: [
      "Spousal support CANNOT be waived or adversely modified in a prenuptial agreement (§ 40-3A-4(B)).",
      "Rivera v. Rivera (2010) confirmed the statutory prohibition on spousal support modification.",
    ],
    notes:
      "Spousal support provisions are prohibited. New Mexico law does not allow prenuptial agreements to adversely modify a spouse's right to support.",
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
      ruleId: "nm-no-spousal-support-modification",
      description:
        "N.M. Stat. Ann. § 40-3A-4(B) prohibits adverse modification of a spouse's right to support. Rivera v. Rivera (2010) confirmed this prohibition.",
      platformImpact:
        "Platform MUST disable spousal support modification for New Mexico agreements. Do not allow waiver or modification of spousal support.",
      severity: "critical",
    },
    {
      ruleId: "nm-notarization-required",
      description:
        "Notarization is required under § 40-3A-3 using New Mexico acknowledgment form.",
      platformImpact:
        "Require notarization in the execution workflow. Use New Mexico acknowledgment format.",
      severity: "critical",
    },
    {
      ruleId: "nm-amendment-by-conduct",
      description:
        "Under § 40-3A-6, a prenuptial agreement may be amended by the conduct of the parties, not just by written amendment.",
      platformImpact:
        "Include warning about amendment by conduct. Recommend periodic review of agreement to ensure conduct has not effectively amended terms.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Rivera v. Rivera (N.M. 2010)",
      description:
        "Confirmed that New Mexico law prohibits adverse modification of spousal support rights in prenuptial agreements under § 40-3A-4(B).",
    },
    {
      citation: "Lebeck v. Lebeck (N.M. 1994)",
      description:
        "Addressed prenuptial agreement enforceability under New Mexico's UPAA framework.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Disable spousal support modification for New Mexico agreements.",
      "Require notarization using New Mexico acknowledgment form.",
      "Include warning about amendment by conduct.",
      "Include community property clauses.",
    ],
    warnings: [
      "Spousal support CANNOT be waived or modified in prenuptial agreements.",
      "Notarization is required.",
      "Agreements may be amended by conduct of the parties.",
    ],
    marketingNotes: [
      "Community property state — prenups valuable for asset protection.",
      "Good self-service viability despite spousal support limitation.",
      "Straightforward UPAA requirements aside from spousal support prohibition.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
