// EXCLUDED FROM PLATFORM: South Carolina requires independent counsel for EACH party
// (the strictest requirement in the country) and has no comprehensive prenuptial statute.
// Courts are historically hostile to prenuptial agreements. Self-service is not viable.
// See issue #26. This config is retained for reference but SC is removed from the
// user-facing state selection dropdown in src/lib/questionnaire/introduction.ts.
import type { StateLegalConfig } from "../types";

export const SC_CONFIG: StateLegalConfig = {
  stateCode: "SC",
  stateName: "South Carolina",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "not_adopted",
  statuteCitations: [],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "required",
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
      "SC Family Court Financial Disclosure form must be completed before a notary.",
    notes:
      "Strict financial disclosure required. SC Family Court Financial Disclosure form must be executed before a notary. No waiver permitted.",
  },

  independentCounsel: {
    requirement: "required",
    conditions:
      "Independent counsel required for EACH party. South Carolina has the strictest independent counsel requirement in the country.",
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "recommended",
    details:
      "No mandatory waiting period, but 30 days before the wedding is strongly recommended. Courts scrutinize timing closely.",
    daysRequired: 30,
    calculationBasis: "before_wedding",
  },

  spousalSupport: {
    canModify: true,
    disabled: false,
    disabledReason: null,
    safetyValve: "none",
    specialRules: [],
    notes:
      "Spousal support can be modified. No statutory safety valve. Courts apply fundamentally fair standard.",
  },

  unconscionability: {
    reviewTime: "dual_time",
    burdenOfProof: null,
    uniqueTest:
      "Agreement must be 'fundamentally fair' at BOTH execution AND enforcement. Courts are hostile to prenuptial agreements and scrutinize them closely.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "sc-court-hostility",
      description:
        "South Carolina courts are historically hostile to prenuptial agreements. No comprehensive prenuptial statute exists; enforcement relies entirely on case law with a high bar.",
      platformImpact:
        "State should be excluded from self-service platform. Risk of invalidation too high without full attorney involvement on both sides.",
      severity: "critical",
    },
    {
      ruleId: "sc-dual-fairness-review",
      description:
        "Agreements must be fundamentally fair at both the time of execution and the time of enforcement. Changed circumstances can invalidate an otherwise valid agreement.",
      platformImpact:
        "Cannot guarantee long-term enforceability. Even a well-drafted agreement may be struck down if circumstances change significantly.",
      severity: "critical",
    },
    {
      ruleId: "sc-independent-counsel-each-party",
      description:
        "Independent counsel required for each party — the strictest counsel requirement in the country.",
      platformImpact:
        "Platform must require proof of independent counsel for each party. Cannot offer counsel waiver option.",
      severity: "critical",
    },
    {
      ruleId: "sc-bill-4800-pending",
      description:
        "Bill 4800 (2025) is pending in the South Carolina legislature which may modernize prenuptial agreement law. Monitor for changes.",
      platformImpact:
        "If passed, may change enforceability framework. Monitor legislative developments.",
      severity: "informational",
    },
  ],

  caseLaw: [
    {
      citation: "Holler v. Holler (S.C. 2005)",
      description:
        "Key case establishing strict requirements for prenuptial agreement enforcement in South Carolina, including independent counsel and fundamental fairness.",
    },
    {
      citation: "Hudson v. Hudson (S.C.)",
      description:
        "Further established South Carolina's high bar for prenuptial agreement enforceability.",
    },
  ],

  platformNotes: {
    selfServiceViability: "exclude",
    requiredPlatformActions: [
      "Do not offer self-service prenuptial agreements for South Carolina.",
      "Require independent counsel for each party.",
      "Require SC Family Court Financial Disclosure form executed before a notary.",
      "Recommend minimum 30 days before wedding for signing.",
    ],
    warnings: [
      "South Carolina is the most difficult state for prenuptial agreements. Courts are hostile and requirements are the strictest in the country.",
      "No comprehensive statute — enforcement relies on case law.",
      "Dual-time unconscionability review means agreements can be invalidated at enforcement even if valid at execution.",
    ],
    marketingNotes: [
      "Not suitable for self-service. Refer users to local family law attorneys.",
      "Bill 4800 (2025) pending — may improve landscape if passed.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
