import type { StateLegalConfig } from "../types";

export const CT_CONFIG: StateLegalConfig = {
  stateCode: "CT",
  stateName: "Connecticut",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: ["Conn. Gen. Stat. §§ 46b-36a to 46b-36j"],

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
      "Fair and reasonable disclosure required. Need not be exact, but a general approximation of assets and liabilities is sufficient.",
  },

  independentCounsel: {
    requirement: "opportunity_required",
    conditions:
      "Each party must have reasonable opportunity to consult independent counsel (§ 46b-36g(a)(4)). Denial of this opportunity renders the agreement unenforceable.",
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
    safetyValve: "public_assistance",
    specialRules: [],
    notes:
      "Spousal support can be modified or eliminated (§ 46b-36g(b)). Public assistance safety valve applies.",
  },

  unconscionability: {
    reviewTime: "dual_time",
    burdenOfProof: null,
    uniqueTest:
      "McHugh three-prong test: (1) agreement was validly entered, (2) no violation of statute or public policy, (3) circumstances at dissolution so beyond contemplation as to cause injustice. Standard: must 'surprise or shock the conscience.'",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "ct-dual-time-unconscionability",
      description:
        "Connecticut applies dual-time unconscionability review under § 46b-36g(a)(2). An agreement can be challenged as unconscionable at execution OR at enforcement. Changed circumstances at dissolution that were beyond contemplation and cause injustice may void the agreement.",
      platformImpact:
        "Platform must include strong fairness warnings. Recommend periodic review and amendment to address changed circumstances.",
      severity: "critical",
    },
    {
      ruleId: "ct-arbitration-clauses",
      description:
        "Connecticut courts have upheld arbitration clauses in prenuptial agreements.",
      platformImpact:
        "Arbitration clause may be offered as an optional provision.",
      severity: "informational",
    },
    {
      ruleId: "ct-bad-bargain-insufficient",
      description:
        "A merely bad bargain is insufficient to void a prenuptial agreement. The standard requires the agreement to 'shock the conscience.'",
      platformImpact:
        "Educate users that unfavorable terms alone do not make an agreement unconscionable.",
      severity: "informational",
    },
  ],

  caseLaw: [
    {
      citation: "McHugh v. McHugh (Conn. 1980)",
      description:
        "Established the three-prong test for prenuptial agreement enforcement: valid entry, no policy violation, and no injustice from changed circumstances.",
    },
    {
      citation: "Grabe v. Hokin (Conn. 2019)",
      description:
        "Applied the McHugh framework in evaluating prenuptial agreement unconscionability.",
    },
    {
      citation: "Bedrick v. Bedrick (Conn. 2011)",
      description:
        "Further refined dual-time unconscionability analysis for prenuptial agreements.",
    },
    {
      citation: "McKenna v. Delente (Conn. 2010)",
      description:
        "Addressed the scope of prenuptial agreement enforceability under Connecticut law.",
    },
    {
      citation: "Dornemann v. Dornemann (Conn. 2004)",
      description:
        "Examined changed circumstances as a basis for challenging prenuptial agreements.",
    },
    {
      citation: "Friezo v. Friezo (Conn. 2007)",
      description:
        "Clarified the application of unconscionability standards to prenuptial agreements at enforcement.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Include strong fairness warnings about dual-time unconscionability review.",
      "Recommend periodic review and amendment to address changed circumstances.",
      "Ensure both parties have reasonable opportunity to consult independent counsel.",
    ],
    warnings: [
      "Dual-time unconscionability: agreement can be challenged at execution OR enforcement.",
      "Changed circumstances at dissolution that shock the conscience may void the agreement.",
      "Denial of opportunity for independent counsel renders agreement unenforceable.",
    ],
    marketingNotes: [
      "Self-service viable with strong fairness protections built in.",
      "Dual-time review means agreements should be periodically revisited.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
