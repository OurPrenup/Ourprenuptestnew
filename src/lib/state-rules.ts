export type PropertyRegime = "community" | "equitable";
export type CounselRequirement = "required" | "recommended" | "optional";

export interface StateAdditionalClause {
  id: string;
  title: string;
  description: string;
  fields: {
    id: string;
    label: string;
    type: "text" | "checkbox" | "select";
    options?: string[];
  }[];
}

export interface StateRules {
  stateCode: string;
  stateName: string;
  propertyRegime: PropertyRegime;
  spousalSupportWaivable: boolean;
  spousalSupportNotes: string;
  signingRequirements: {
    witnesses: boolean;
    notarization: boolean;
    independentCounsel: CounselRequirement;
  };
  additionalClauses: StateAdditionalClause[];
  warnings: string[];
}

// Community property states
const COMMUNITY_PROPERTY_STATES = new Set([
  "AZ",
  "CA",
  "ID",
  "LA",
  "NV",
  "NM",
  "TX",
  "WA",
  "WI",
]);

// States where spousal support waivers are generally NOT enforceable or heavily scrutinized
const SPOUSAL_SUPPORT_NOT_WAIVABLE = new Set([
  "CA",
  "CT",
  "IN",
  "IA",
  "NE",
  "NM",
  "ND",
  "SD",
]);

// States requiring witnesses
const WITNESS_REQUIRED_STATES = new Set(["FL", "MN", "NE", "NH"]);

// States where independent counsel is required for enforceability
const COUNSEL_REQUIRED_STATES = new Set(["CA"]);
// States where independent counsel is strongly recommended
const COUNSEL_RECOMMENDED_STATES = new Set([
  "CT",
  "FL",
  "MA",
  "NJ",
  "NY",
  "PA",
]);

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

// Community property state additional clauses
function getCommunityPropertyClauses(
  stateCode: string
): StateAdditionalClause[] {
  const clauses: StateAdditionalClause[] = [
    {
      id: "transmutation",
      title: "Transmutation of Separate Property",
      description:
        "Define how separate property may be converted to community property (or vice versa) during the marriage.",
      fields: [
        {
          id: "transmutation_conditions",
          label: "Under what conditions can property be transmuted?",
          type: "select",
          options: [
            "Only with written agreement by both parties",
            "Never — all property retains its original classification",
            "Custom terms (describe below)",
          ],
        },
        {
          id: "transmutation_details",
          label: "Additional details or custom terms",
          type: "text",
        },
      ],
    },
    {
      id: "community_income",
      title: "Treatment of Income During Marriage",
      description:
        "Specify whether income earned during marriage is community or separate property.",
      fields: [
        {
          id: "income_classification",
          label: "How should income earned during marriage be classified?",
          type: "select",
          options: [
            "Community property (state default)",
            "Separate property of the earner",
            "Split — a percentage remains separate",
          ],
        },
      ],
    },
    {
      id: "commingling",
      title: "Commingling Protection",
      description:
        "Address what happens when separate and community property are mixed together.",
      fields: [
        {
          id: "commingling_rule",
          label: "How should commingled assets be treated?",
          type: "select",
          options: [
            "Commingled assets become community property",
            "Original separate property contribution is traced and remains separate",
            "Custom arrangement",
          ],
        },
      ],
    },
  ];

  if (stateCode === "CA") {
    clauses.push({
      id: "ca_fiduciary",
      title: "California Fiduciary Duty Acknowledgment",
      description:
        "California requires spouses to act as fiduciaries to each other regarding community property. Both parties must acknowledge this duty.",
      fields: [
        {
          id: "ca_fiduciary_ack",
          label: "Both parties acknowledge California fiduciary duty requirements",
          type: "checkbox",
        },
      ],
    });
  }

  if (stateCode === "TX") {
    clauses.push({
      id: "tx_homestead",
      title: "Texas Homestead Provisions",
      description:
        "Texas has unique homestead protections. Specify how the marital homestead will be treated.",
      fields: [
        {
          id: "tx_homestead_treatment",
          label: "Homestead treatment",
          type: "select",
          options: [
            "Homestead remains community property",
            "Homestead is designated as one party's separate property",
            "Homestead is jointly owned but with specific equity split",
          ],
        },
      ],
    });
  }

  if (stateCode === "LA") {
    clauses.push({
      id: "la_matrimonial",
      title: "Louisiana Matrimonial Regime",
      description:
        "Louisiana uses a civil law system. Choose whether to opt into a separation of property regime.",
      fields: [
        {
          id: "la_regime",
          label: "Matrimonial property regime",
          type: "select",
          options: [
            "Community of acquets and gains (state default)",
            "Separation of property regime",
          ],
        },
      ],
    });
  }

  if (stateCode === "WI") {
    clauses.push({
      id: "wi_marital_property",
      title: "Wisconsin Marital Property Classification",
      description:
        "Wisconsin follows the Uniform Marital Property Act. Specify classification preferences.",
      fields: [
        {
          id: "wi_classification",
          label: "Property classification preference",
          type: "select",
          options: [
            "Follow statutory marital property defaults",
            "Opt out of marital property classification for specific assets",
          ],
        },
      ],
    });
  }

  return clauses;
}

// Equitable distribution state additional clauses
function getEquitableDistributionClauses(
  stateCode: string
): StateAdditionalClause[] {
  const clauses: StateAdditionalClause[] = [
    {
      id: "property_division",
      title: "Property Division Standard",
      description:
        "Your state uses equitable distribution, meaning property is divided fairly but not necessarily equally. Define your preferred division approach.",
      fields: [
        {
          id: "division_approach",
          label: "Preferred property division approach",
          type: "select",
          options: [
            "Each party keeps their own separate property; marital property split 50/50",
            "Each party keeps their own separate property; marital property divided based on contribution",
            "Custom division terms",
          ],
        },
      ],
    },
  ];

  if (stateCode === "NY") {
    clauses.push({
      id: "ny_separate_property",
      title: "New York Separate Property Definition",
      description:
        "New York has specific definitions for separate property. Clearly identify assets each party wishes to keep separate.",
      fields: [
        {
          id: "ny_separate_ack",
          label:
            "Both parties agree to the separate property schedule attached as an exhibit",
          type: "checkbox",
        },
      ],
    });
  }

  if (stateCode === "FL") {
    clauses.push({
      id: "fl_enhanced_value",
      title: "Florida Enhanced Value of Separate Assets",
      description:
        "Florida law distinguishes between passive and active appreciation of separate property during marriage.",
      fields: [
        {
          id: "fl_appreciation",
          label: "Treatment of appreciation on separate property",
          type: "select",
          options: [
            "All appreciation remains separate property",
            "Active appreciation becomes marital property",
            "Both active and passive appreciation become marital property",
          ],
        },
      ],
    });
  }

  return clauses;
}

function buildStateRules(stateCode: string): StateRules {
  const isCommunity = COMMUNITY_PROPERTY_STATES.has(stateCode);
  const spousalWaivable = !SPOUSAL_SUPPORT_NOT_WAIVABLE.has(stateCode);
  const witnessesRequired = WITNESS_REQUIRED_STATES.has(stateCode);

  let counselReq: CounselRequirement = "optional";
  if (COUNSEL_REQUIRED_STATES.has(stateCode)) counselReq = "required";
  else if (COUNSEL_RECOMMENDED_STATES.has(stateCode))
    counselReq = "recommended";

  const warnings: string[] = [];

  if (isCommunity) {
    warnings.push(
      `${STATE_NAMES[stateCode]} is a community property state. Without a prenup, most property acquired during marriage is owned equally by both spouses.`
    );
  }

  if (!spousalWaivable) {
    warnings.push(
      `${STATE_NAMES[stateCode]} courts may not enforce a complete waiver of spousal support. Consider including fair spousal support terms rather than a full waiver.`
    );
  }

  if (witnessesRequired) {
    warnings.push(
      `${STATE_NAMES[stateCode]} requires witness signatures for prenuptial agreements to be enforceable.`
    );
  }

  if (counselReq === "required") {
    warnings.push(
      `${STATE_NAMES[stateCode]} requires both parties to have independent legal counsel for the prenup to be enforceable.`
    );
  } else if (counselReq === "recommended") {
    warnings.push(
      `In ${STATE_NAMES[stateCode]}, having independent legal counsel for both parties is strongly recommended for enforceability.`
    );
  }

  let spousalNotes = "";
  if (!spousalWaivable) {
    const noteMap: Record<string, string> = {
      CA: "California Family Code gives courts broad discretion to modify or reject spousal support waivers deemed unconscionable at the time of enforcement.",
      CT: "Connecticut courts retain authority to award alimony regardless of prenuptial provisions if enforcement would be unconscionable.",
      IN: "Indiana courts may disregard spousal support waivers if one party would become a public charge.",
      IA: "Iowa courts can override spousal maintenance waivers if enforcement would cause undue hardship.",
      NE: "Nebraska courts may modify or reject spousal support limitations that would be unconscionable at enforcement.",
      NM: "New Mexico courts have significant discretion in awarding spousal support and may not uphold full waivers.",
      ND: "North Dakota courts may find spousal support waivers unenforceable if circumstances have substantially changed.",
      SD: "South Dakota courts retain discretion to award spousal support if a waiver would be unconscionable.",
    };
    spousalNotes =
      noteMap[stateCode] ||
      "Courts in this state may not enforce a complete waiver of spousal support.";
  } else {
    spousalNotes =
      "Spousal support waivers are generally enforceable in this state when the agreement is entered into voluntarily with full disclosure.";
  }

  const additionalClauses = isCommunity
    ? getCommunityPropertyClauses(stateCode)
    : getEquitableDistributionClauses(stateCode);

  return {
    stateCode,
    stateName: STATE_NAMES[stateCode] || stateCode,
    propertyRegime: isCommunity ? "community" : "equitable",
    spousalSupportWaivable: spousalWaivable,
    spousalSupportNotes: spousalNotes,
    signingRequirements: {
      witnesses: witnessesRequired,
      notarization: true,
      independentCounsel: counselReq,
    },
    additionalClauses,
    warnings,
  };
}

// Pre-build rules for all 50 states
const STATE_RULES: Record<string, StateRules> = {};
for (const code of Object.keys(STATE_NAMES)) {
  STATE_RULES[code] = buildStateRules(code);
}

export function getStateRules(stateCode: string): StateRules | null {
  return STATE_RULES[stateCode] || null;
}

export function getStateName(stateCode: string): string {
  return STATE_NAMES[stateCode] || stateCode;
}

export { STATE_NAMES, COMMUNITY_PROPERTY_STATES };
