import type { StateLegalConfig } from "../types";

export const CA_CONFIG: StateLegalConfig = {
  stateCode: "CA",
  stateName: "California",
  researchDepth: "deeply_researched",

  propertyRegime: "community_property",
  communityPropertyVariant: "standard",

  upaaStatus: "upaa",
  statuteCitations: [
    "CA Family Code § 1600",
    "CA Family Code § 1601",
    "CA Family Code § 1610",
    "CA Family Code § 1611",
    "CA Family Code § 1612",
    "CA Family Code § 1613",
    "CA Family Code § 1614",
    "CA Family Code § 1615",
    "CA Family Code § 1616",
    "CA Family Code § 1617",
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
    waiverPermitted: false,
    specialRequirements:
      "Complete information about the other party's properties, debts, and income required. Fiduciary duty between spouses applies to community property.",
    notes:
      "'Adequate knowledge' standard. Both parties must have complete information about the other's properties, debts, and income. Fiduciary duty applies.",
  },

  independentCounsel: {
    requirement: "required_for_spousal_support",
    conditions:
      "Independent counsel is REQUIRED for both parties if the agreement modifies or eliminates spousal support (§ 1612(c)). Without attorneys, spousal support provisions are unenforceable. If no attorney is retained for non-spousal-support provisions, party must be advised IN WRITING of rights being relinquished AND must execute a SEPARATE written waiver of counsel.",
    writtenWaiverRequired: true,
  },

  waitingPeriod: {
    hasMandatoryPeriod: true,
    type: "mandatory",
    details:
      "7 calendar days between presentation of the final agreement and signing (§ 1615(c)(2)(B)). Applies to all prenups after January 1, 2020. Substantive changes restart the 7-day clock. Cannot be waived. Does NOT apply to postnuptial agreements.",
    daysRequired: 7,
    calculationBasis: "from_final_draft",
  },

  spousalSupport: {
    canModify: true,
    disabled: false,
    disabledReason: null,
    safetyValve: "none",
    specialRules: [
      "Both parties MUST have independent counsel to modify/eliminate spousal support (§ 1612(c)).",
      "Without attorneys, spousal support provisions are unenforceable.",
      "Courts can order temporary support while litigating validity.",
      "Step-up clauses (increasing support over time) increase enforceability.",
    ],
    notes:
      "Spousal support can be modified or eliminated ONLY if both parties have independent counsel. Without attorneys, spousal support provisions are unenforceable.",
  },

  unconscionability: {
    reviewTime: "dual_time",
    burdenOfProof: null,
    uniqueTest:
      "Primarily reviewed at execution, but spousal support provisions are also subject to review at enforcement.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "ca-7-day-rule",
      description:
        "Mandatory 7 calendar day waiting period between presentation of final agreement and signing (§ 1615(c)(2)(B)). Applies to all prenups after January 1, 2020. Substantive changes restart the clock. Cannot be waived.",
      platformImpact:
        "Platform must enforce a 7-day timer from final draft presentation to signing. Track draft versions; any substantive change restarts the timer. Recommend starting 3-6 months before the wedding.",
      severity: "critical",
    },
    {
      ruleId: "ca-spousal-support-attorney-req",
      description:
        "Independent counsel required for BOTH parties if modifying or eliminating spousal support (§ 1612(c)). Without attorneys, spousal support provisions are unenforceable.",
      platformImpact:
        "Platform must detect when spousal support is being modified and require attorney engagement for both parties. If no attorneys, disable spousal support modification.",
      severity: "critical",
    },
    {
      ruleId: "ca-written-waiver-of-counsel",
      description:
        "If a party does not have an attorney (for non-spousal-support provisions), they must be advised in writing of the rights being relinquished AND execute a separate written waiver of counsel.",
      platformImpact:
        "Generate a separate written waiver of counsel document. Include written advisement of rights being relinquished.",
      severity: "critical",
    },
    {
      ruleId: "ca-fiduciary-duty",
      description:
        "Spouses owe each other fiduciary duties regarding community property. The prenuptial agreement should include an acknowledgment of this duty.",
      platformImpact:
        "Include fiduciary duty acknowledgment clause in every California agreement.",
      severity: "important",
    },
    {
      ruleId: "ca-community-property",
      description:
        "California is a community property state. Without a prenup, most property acquired during marriage is community property and divided equally.",
      platformImpact:
        "Include community property clauses. Explain the default 50/50 split and how the agreement modifies it.",
      severity: "important",
    },
    {
      ruleId: "ca-sunset-clauses",
      description:
        "Sunset clauses (agreement expires after a set number of years) are permitted and may be used to increase enforceability.",
      platformImpact:
        "Offer sunset clause as an optional provision in California agreements.",
      severity: "informational",
    },
    {
      ruleId: "ca-notarization-recommended",
      description:
        "Notarization is not required by CA Family Code §§ 1611/1615 for prenup validity (only writing + signatures are required). However, notarization is strongly recommended as best practice to prevent authenticity disputes.",
      platformImpact:
        "Recommend notarization in the execution workflow but do not present it as a statutory requirement.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Marriage of Clarke & Akel (Cal. Ct. App. 2018)",
      description:
        "Addressed enforceability requirements under the modern California prenuptial framework.",
    },
    {
      citation: "Marriage of Cadwell-Faso & Faso (Cal. Ct. App. 2011)",
      description:
        "Examined disclosure and voluntariness requirements for California prenuptial agreements.",
    },
    {
      citation: "Marriage of Bonds (Cal. 2000)",
      description:
        "Landmark California Supreme Court case on prenuptial agreement enforceability, voluntariness, and independent counsel.",
    },
  ],

  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: [
      "Enforce 7-day mandatory waiting period timer from final draft.",
      "Detect spousal support modifications and require independent counsel for both parties.",
      "Generate separate written waiver of counsel document when attorney is not retained.",
      "Include fiduciary duty acknowledgment in every agreement.",
      "Recommend notarization in the execution workflow (not statutorily required but best practice).",
      "Include community property clauses and separate property designations.",
      "Track draft versions to restart 7-day clock on substantive changes.",
    ],
    warnings: [
      "Most complex state for prenuptial agreements.",
      "Spousal support provisions are unenforceable without independent counsel for both parties.",
      "7-day waiting period cannot be waived; substantive changes restart the clock.",
      "Recommend starting the process 3-6 months before the wedding.",
    ],
    marketingNotes: [
      "Self-service possible if no spousal support modification is desired.",
      "Community property state — prenups are particularly valuable.",
      "Most complex requirements among all states; position as premium offering.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
