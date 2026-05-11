import type { StateLegalConfig } from "../types";

export const AR_CONFIG: StateLegalConfig = {
  stateCode: "AR",
  stateName: "Arkansas",
  researchDepth: "deeply_researched",

  propertyRegime: "equitable_distribution",
  communityPropertyVariant: null,

  upaaStatus: "upaa",
  statuteCitations: [
    "A.C.A. § 9-11-401",
    "A.C.A. § 9-11-402",
    "A.C.A. § 9-11-403",
    "A.C.A. § 9-11-404",
    "A.C.A. § 9-11-405",
    "A.C.A. § 9-11-406",
    "A.C.A. § 9-11-407",
    "A.C.A. § 9-11-408",
    "A.C.A. § 9-11-409",
    "A.C.A. § 9-11-410",
    "A.C.A. § 9-11-411",
    "A.C.A. § 9-11-412",
    "A.C.A. § 9-11-413",
  ],

  execution: {
    writingRequired: true,
    bothSignatures: true,
    notarization: "recommended",
    notarizationType: "standard",
    witnesses: "recommended",
    witnessCount: 2,
    witnessRules:
      "Acknowledgment IS required under § 9-11-402, but can be satisfied by one of four methods: (1) formal declaration before an authorized public officer, (2) sworn affirmation by respective attorneys, (3) notary-witnessed signing with attorney consultation statement, (4) two disinterested witnesses. Option 4 is the recommended default for self-service. Neither notarization nor witnesses are independently required — but one form of acknowledgment must be used.",
    acknowledgmentOptions: [
      {
        id: "ar-ack-1",
        description:
          "Formal declaration before an authorized public officer (e.g., judge, clerk).",
        isDefault: false,
      },
      {
        id: "ar-ack-2",
        description:
          "Sworn affirmation by the respective attorneys of each party.",
        isDefault: false,
      },
      {
        id: "ar-ack-3",
        description:
          "Notary-witnessed signing with specific acknowledgment statements.",
        isDefault: false,
      },
      {
        id: "ar-ack-4",
        description:
          "Execution witnessed by two disinterested parties. Simplest option for self-service.",
        isDefault: true,
      },
    ],
    wetInkRequired: false,
  },

  financialDisclosure: {
    strictness: "standard",
    waiverPermitted: true,
    specialRequirements: null,
    notes:
      "Standard UPAA financial disclosure required. Disclosure can be waived in writing.",
  },

  independentCounsel: {
    requirement: "recommended",
    conditions:
      "One of the four acknowledgment options (option 2) involves attorney affirmation, but counsel is not independently required.",
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
    specialRules: [],
    notes:
      "Spousal support can be addressed. Public assistance safety valve applies under § 9-11-406(b).",
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
      ruleId: "ar-acknowledgment-requirement",
      description:
        "Arkansas requires acknowledgment under § 9-11-402. One of four methods must be used: (1) formal declaration before authorized public officer, (2) sworn affirmation by respective attorneys, (3) notary-witnessed signing with acknowledgment statements, (4) execution witnessed by 2 disinterested parties.",
      platformImpact:
        "Platform should default to option 4 (two disinterested witnesses) for self-service. Offer option 3 (notary) as alternative for online notarization workflows.",
      severity: "critical",
    },
    {
      ruleId: "ar-contemplation-of-lasting-marriage",
      description:
        "Arkansas courts hold that prenuptial agreements must be made in contemplation of a lasting marriage, not in anticipation of divorce.",
      platformImpact:
        "Include language in the agreement affirming it is made in contemplation of a lasting marriage.",
      severity: "important",
    },
  ],

  caseLaw: [
    {
      citation: "Franks v. Franks, 548 S.W.3d 871 (Ark. 2018)",
      description:
        "Key case addressing prenuptial agreement enforceability and acknowledgment requirements under Arkansas UPAA.",
    },
    {
      citation: "Banks v. Banks (Ark.)",
      description:
        "Further clarification of prenuptial agreement standards in Arkansas.",
    },
  ],

  platformNotes: {
    selfServiceViability: "good",
    requiredPlatformActions: [
      "Implement acknowledgment option selection (default: option 4 — two disinterested witnesses).",
      "Offer option 3 (notary with statements) as alternative.",
      "Include language affirming agreement is made in contemplation of lasting marriage.",
    ],
    warnings: [
      "Acknowledgment IS required per § 9-11-402 — agreement is invalid without one of the four prescribed methods. Neither notarization nor witnesses alone are required, but one form of acknowledgment must be used.",
    ],
    marketingNotes: [
      "Self-service viable with witness-based acknowledgment (option 4).",
      "UPAA state adopted in 1987 — well-established framework.",
    ],
  },

  agreementTerminology: "prenuptial agreement",
};
