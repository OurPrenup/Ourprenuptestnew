// =============================================================================
// EXCLUDED FROM PLATFORM — Louisiana requires an "authentic act" format with
// unique terminology ("First Appearing" / "Second Appearing"), wet-ink
// signatures, and a notarial process that differs fundamentally from all other
// states. Supporting LA properly requires a completely separate document
// template. Retained for reference only. (Issue #30)
// =============================================================================

import type { StateLegalConfig } from "../types";

export const LA_CONFIG: StateLegalConfig = {
  stateCode: "LA",
  stateName: "Louisiana",
  researchDepth: "deeply_researched",

  propertyRegime: "community_property",
  communityPropertyVariant: "standard",

  upaaStatus: "own_framework",
  statuteCitations: [
    "La. Civil Code Art. 2328",
    "La. Civil Code Art. 2329",
    "La. Civil Code Art. 2330",
    "La. Civil Code Art. 2331",
    "La. Civil Code Art. 2332",
  ],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "required",
    notarizationType: "authentic_act_la",
    witnesses: "required",
    witnessCount: 2,
    witnessRules:
      "Both witnesses must sign along with notary and both parties at the same time. Courts have invalidated prenups with only one witness. Lawyers often serve as witnesses.",
    acknowledgmentOptions: [
      {
        id: "authentic_act",
        description:
          "Authentic act: signed by both parties, notary, and two witnesses simultaneously.",
        isDefault: true,
      },
      {
        id: "private_acknowledged",
        description:
          "Privately signed then acknowledged before a notary or court.",
        isDefault: false,
      },
    ],
    wetInkRequired: false,
  },

  financialDisclosure: {
    strictness: "strict",
    waiverPermitted: false,
    specialRequirements:
      "Full disclosure required. Courts scrutinize disclosure closely in Louisiana's civil law system.",
    notes:
      "Full financial disclosure is required. Louisiana courts scrutinize disclosure closely. Detailed asset and liability schedules should be attached.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "Strongly recommended. Lawyers often serve as the two required witnesses in Louisiana.",
    writtenWaiverRequired: false,
  },

  waitingPeriod: {
    hasMandatoryPeriod: false,
    type: "none",
    details:
      "No statutory waiting period, but everything MUST be completed before the wedding ceremony.",
    daysRequired: null,
    calculationBasis: null,
  },

  spousalSupport: {
    canModify: true,
    disabled: false,
    disabledReason: null,
    safetyValve: "none",
    specialRules: [
      "Courts generally favor enforcement if all formalities are properly met.",
      "Authentic act format strengthens enforceability of spousal support provisions.",
    ],
    notes:
      "Spousal support can generally be addressed in Louisiana matrimonial agreements. Courts favor enforcement when formalities are properly met.",
  },

  unconscionability: {
    reviewTime: "at_execution",
    burdenOfProof: null,
    uniqueTest:
      "Fraud and duress review under Louisiana civil law principles.",
    threeOptionRemedy: false,
    presumptionOfFraud: false,
  },

  childProvisions: "cannot_predetermine",

  uniqueRules: [
    {
      ruleId: "la-authentic-act",
      description:
        "Louisiana requires an authentic act: the agreement must be signed by both parties, a notary, and TWO witnesses simultaneously. Courts have invalidated prenups executed with only one witness.",
      platformImpact:
        "Generate authentic act format. Instruct users that signing must include both parties, notary, and 2 witnesses all present at the same time. Provide clear execution instructions.",
      severity: "critical",
    },
    {
      ruleId: "la-parish-filing",
      description:
        "Must file the matrimonial agreement with the clerk of court in the local parish. If the agreement involves real estate, must also file in the parish where the property is located. If the parties reside in different parishes, file in both.",
      platformImpact:
        "Generate parish filing instructions. Ask users for their parish and any real estate parishes. Provide specific filing guidance for each applicable parish.",
      severity: "critical",
    },
    {
      ruleId: "la-before-wedding",
      description:
        "All execution formalities must be completed before the wedding ceremony. No exceptions.",
      platformImpact:
        "Enforce pre-wedding completion timeline. All signing, notarization, and witnessing must occur before the ceremony date.",
      severity: "critical",
    },
    {
      ruleId: "la-community-property-opt-out",
      description:
        "Louisiana is a community property state. The most common provision in a matrimonial agreement is opting out of the community property regime entirely (separation of property regime).",
      platformImpact:
        "Default template should include community property opt-out (separation of property regime). Explain the community property default and how the agreement modifies it.",
      severity: "important",
    },
    {
      ruleId: "la-civil-law",
      description:
        "Louisiana is the only US state using a civil law system. Prenuptial agreements are called 'matrimonial agreements' and governed by the Civil Code, not common law or the UPAA.",
      platformImpact:
        "Use 'matrimonial agreement' terminology throughout. Apply civil law principles. Do not reference UPAA provisions.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Acurio v. Acurio, 224 So.3d 935 (La. App. 2017)",
      description:
        "Key Louisiana case addressing matrimonial agreement enforceability and execution formalities.",
    },
  ],

  platformNotes: {
    selfServiceViability: "moderate",
    requiredPlatformActions: [
      "Generate authentic act format with signature blocks for both parties, notary, and 2 witnesses.",
      "Instruct users: notary + 2 witnesses must be present at the same time as both parties.",
      "Generate parish filing instructions based on user's parish and any real estate parishes.",
      "Ensure all execution is completed before the wedding ceremony.",
      "Include community property opt-out (separation of property regime) as default provision.",
      "Use 'matrimonial agreement' terminology throughout.",
    ],
    warnings: [
      "Complex execution requirements — authentic act with notary and 2 witnesses simultaneously.",
      "Parish filing is mandatory and must not be overlooked.",
      "All formalities must be completed before the wedding — no post-ceremony execution.",
      "Courts have invalidated agreements with only one witness.",
    ],
    marketingNotes: [
      "Community property state — matrimonial agreements are particularly valuable.",
      "Moderate self-service viability due to execution complexity.",
      "Civil law system requires specialized terminology and format.",
    ],
  },

  agreementTerminology: "matrimonial agreement",
};
