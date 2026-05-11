import type { StateLegalConfig } from "../types";

export const SD_CONFIG: StateLegalConfig = {
  stateCode: "SD",
  stateName: "South Dakota",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: ["SDCL §§ 25-2-16 to 25-2-25"],

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
      "Standard UPAA financial disclosure required. Waiver of disclosure is permitted.",
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
      "South Dakota deliberately omitted UPAA § 3(a)(4) when adopting the UPAA in 1989 (SL 1989, ch 216, § 3). Connolly v. Connolly (270 N.W.2d 44, S.D. 1978) invalidated an alimony waiver. Sanford v. Sanford (2005 SD 34) reaffirmed post-UPAA: the legislature intentionally omitted spousal-support waiver authority. Spousal support waivers are void as against public policy.",
    safetyValve: "none",
    specialRules: [
      "South Dakota deliberately omitted UPAA § 3(a)(4) from its adoption. Prenuptial agreements cannot modify or eliminate spousal support.",
      "Any spousal support provisions in an SD prenup are void and unenforceable as contrary to public policy.",
      "Property provisions remain valid and severable from void spousal support provisions.",
    ],
    notes:
      "CRITICAL: South Dakota did NOT adopt UPAA § 3(a)(4). Prenuptial agreements in SD CANNOT address spousal support. Connolly v. Connolly (1978) and Sanford v. Sanford (2005) confirm waivers are unenforceable. The spousal support module must be completely disabled for SD.",
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
      ruleId: "sd-no-spousal-support",
      description:
        "South Dakota deliberately omitted UPAA § 3(a)(4) when adopting the UPAA in 1989. Prenuptial agreements cannot modify or eliminate spousal support. Confirmed by Connolly v. Connolly (1978) and Sanford v. Sanford (2005 SD 34).",
      platformImpact:
        "Spousal support section must be completely disabled for SD. Do not allow users to add any spousal support provisions. Display clear explanation that SD law does not permit prenups to address spousal support.",
      severity: "critical",
    },
    {
      ruleId: "sd-property-severable",
      description:
        "Property provisions are severable from void spousal support provisions. A prenup with an illegal spousal support waiver is not entirely void — the property provisions survive.",
      platformImpact:
        "Include severability clause. Property-focused agreements are fully viable.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Connolly v. Connolly, 270 N.W.2d 44 (S.D. 1978)",
      description:
        "Invalidated an alimony waiver in a prenuptial agreement. Established that spousal support waivers are contrary to public policy in South Dakota.",
    },
    {
      citation: "Sanford v. Sanford, 2005 SD 34",
      description:
        "Reaffirmed post-UPAA that the legislature intentionally omitted spousal-support waiver authority. Property provisions are severable from void spousal support waivers.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Disable spousal support module entirely for SD users.",
      "Display explanation that SD law does not allow prenups to address spousal support.",
      "Focus agreement on property division, financial rights, and estate planning.",
      "Include severability clause.",
    ],
    warnings: [
      "Spousal support provisions are completely unenforceable in SD prenups.",
      "SD deliberately omitted UPAA § 3(a)(4) — this cannot be worked around.",
    ],
    marketingNotes: [
      "Self-service viable for property-focused agreements.",
      "Cannot offer spousal support planning — must be transparent about this limitation.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
