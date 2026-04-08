// =============================================================================
// OurPrenup — State-Specific Optional Clauses
// Generates optional clauses dynamically based on each state's legal config.
// =============================================================================

import type { StateCode, StateLegalConfig } from "./types";
import { getStateLegalConfig } from "./engine";

export interface ClauseField {
  id: string;
  label: string;
  type: "text" | "checkbox" | "select";
  options?: string[];
}

export interface OptionalClause {
  id: string;
  title: string;
  description: string;
  category: "property" | "support" | "execution" | "protection" | "estate" | "unique";
  fields: ClauseField[];
}

// ---------------------------------------------------------------------------
// Community Property Clauses — shared across AZ, CA, ID, LA, NV, NM, TX, WA, WI
// ---------------------------------------------------------------------------

function getCommunityPropertyClauses(config: StateLegalConfig): OptionalClause[] {
  const clauses: OptionalClause[] = [
    {
      id: "transmutation",
      title: "Transmutation of Separate Property",
      description:
        `In ${config.stateName}, property acquired during marriage is presumed community property. Define how separate property may be converted to community property (or vice versa).`,
      category: "property",
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
        `Specify whether income earned during marriage is community or separate property under ${config.stateName} law.`,
      category: "property",
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
        "Address what happens when separate and community property are mixed together (e.g., depositing inheritance into a joint account).",
      category: "property",
      fields: [
        {
          id: "commingling_rule",
          label: "How should commingled assets be treated?",
          type: "select",
          options: [
            "Commingled assets become community property",
            "Original separate property contribution is traced and remains separate",
            "Custom arrangement (describe below)",
          ],
        },
        {
          id: "commingling_details",
          label: "Custom commingling terms (if applicable)",
          type: "text",
        },
      ],
    },
  ];

  return clauses;
}

// ---------------------------------------------------------------------------
// Equitable Distribution Clauses — shared across non-community-property states
// ---------------------------------------------------------------------------

function getEquitableDistributionClauses(config: StateLegalConfig): OptionalClause[] {
  return [
    {
      id: "property_division",
      title: "Property Division Standard",
      description:
        `${config.stateName} uses equitable distribution, meaning property is divided fairly but not necessarily equally. Define your preferred division approach.`,
      category: "property",
      fields: [
        {
          id: "division_approach",
          label: "Preferred property division approach",
          type: "select",
          options: [
            "Each party keeps their own separate property; marital property split 50/50",
            "Each party keeps their own separate property; marital property divided based on contribution",
            "Custom division terms (describe below)",
          ],
        },
        {
          id: "division_details",
          label: "Custom division terms (if applicable)",
          type: "text",
        },
      ],
    },
    {
      id: "separate_property_definition",
      title: "Separate Property Protection",
      description:
        "Clearly define which assets each party considers separate property and will remain separate throughout the marriage.",
      category: "property",
      fields: [
        {
          id: "separate_property_schedule",
          label: "Both parties agree to identify separate property in an attached schedule/exhibit",
          type: "checkbox",
        },
        {
          id: "appreciation_rule",
          label: "How should appreciation on separate property be treated?",
          type: "select",
          options: [
            "All appreciation remains separate property",
            "Only passive appreciation remains separate; active appreciation is marital",
            "All appreciation becomes marital property",
          ],
        },
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// State-Specific Clauses
// ---------------------------------------------------------------------------

function getCaliforniaClauses(): OptionalClause[] {
  return [
    {
      id: "ca_fiduciary",
      title: "California Fiduciary Duty Acknowledgment",
      description:
        "California law requires spouses to act as fiduciaries to each other regarding community property. Both parties must acknowledge this duty in the agreement.",
      category: "protection",
      fields: [
        {
          id: "ca_fiduciary_ack",
          label: "Both parties acknowledge California fiduciary duty requirements (CA Family Code § 1100)",
          type: "checkbox",
        },
      ],
    },
    {
      id: "ca_sunset",
      title: "Sunset Clause (California-Approved)",
      description:
        "California courts have recognized sunset clauses. Setting an expiration date can increase enforceability and reflect evolving partnership dynamics.",
      category: "protection",
      fields: [
        {
          id: "ca_sunset_years",
          label: "Agreement expires after how many years?",
          type: "select",
          options: ["5 years", "7 years", "10 years", "15 years", "20 years", "No sunset — remains in effect indefinitely"],
        },
      ],
    },
  ];
}

function getTexasClauses(): OptionalClause[] {
  return [
    {
      id: "tx_homestead",
      title: "Texas Homestead Provisions",
      description:
        "Texas has unique constitutional homestead protections. Specify how the marital homestead will be treated in the agreement.",
      category: "property",
      fields: [
        {
          id: "tx_homestead_treatment",
          label: "Homestead treatment",
          type: "select",
          options: [
            "Homestead remains community property",
            "Homestead is designated as one party's separate property",
            "Homestead is jointly owned with a specific equity split",
          ],
        },
      ],
    },
    {
      id: "tx_business_income",
      title: "Business Income Classification",
      description:
        "In Texas, income from a separate-property business during marriage is community property by default. You can agree to change this treatment.",
      category: "property",
      fields: [
        {
          id: "tx_business_income_rule",
          label: "How should income from separate-property businesses be treated?",
          type: "select",
          options: [
            "Community property (Texas default)",
            "Separate property of the business owner",
            "Split — reasonable salary is community, excess is separate",
          ],
        },
      ],
    },
  ];
}

function getLouisianaClauses(): OptionalClause[] {
  return [
    {
      id: "la_regime",
      title: "Louisiana Matrimonial Regime Selection",
      description:
        "Louisiana uses a civil law system. Choose whether to maintain the default community regime or opt into a separation of property regime.",
      category: "property",
      fields: [
        {
          id: "la_regime_choice",
          label: "Matrimonial property regime",
          type: "select",
          options: [
            "Community of acquets and gains (Louisiana default)",
            "Total separation of property regime",
            "Modified community regime (custom terms below)",
          ],
        },
        {
          id: "la_regime_details",
          label: "Modified regime details (if applicable)",
          type: "text",
        },
      ],
    },
    {
      id: "la_parish_filing",
      title: "Parish Filing Acknowledgment",
      description:
        "Louisiana requires filing the matrimonial agreement with the clerk of court in your parish. If real estate is involved, you must also file in the parish where the property is located.",
      category: "execution",
      fields: [
        {
          id: "la_primary_parish",
          label: "Primary parish for filing",
          type: "text",
        },
        {
          id: "la_real_estate_parish",
          label: "Additional parish for real estate filing (if different)",
          type: "text",
        },
        {
          id: "la_filing_ack",
          label: "Both parties acknowledge the parish filing requirement",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getWisconsinClauses(): OptionalClause[] {
  return [
    {
      id: "wi_classification",
      title: "Wisconsin Marital Property Classification",
      description:
        "Wisconsin follows the Uniform Marital Property Act (UMPA). Specify how you want property classified under this framework.",
      category: "property",
      fields: [
        {
          id: "wi_classification_pref",
          label: "Property classification preference",
          type: "select",
          options: [
            "Follow statutory marital property defaults",
            "Opt out of marital property classification for specific assets",
            "Classify all property as individual property",
          ],
        },
      ],
    },
    {
      id: "wi_statutory_form",
      title: "Wisconsin Statutory Form Option",
      description:
        "Wisconsin uniquely offers statutory form agreements (§ 766.587) that are enforceable without financial disclosure. This is the simplest pathway available in any state.",
      category: "execution",
      fields: [
        {
          id: "wi_statutory_form_choice",
          label: "Would you like to use the Wisconsin statutory form?",
          type: "select",
          options: [
            "Yes — use the statutory form (no financial disclosure required)",
            "No — use a custom agreement with full financial disclosure",
          ],
        },
      ],
    },
    {
      id: "wi_determination_date",
      title: "Determination Date",
      description:
        "Wisconsin uses a 'determination date' for property classification — the last of: your marriage date, date you became domiciled in Wisconsin, or January 1, 1986.",
      category: "property",
      fields: [
        {
          id: "wi_domicile_date",
          label: "Date you became domiciled in Wisconsin (if after marriage)",
          type: "text",
        },
        {
          id: "wi_determination_ack",
          label: "Both parties acknowledge the determination date affects property classification",
          type: "checkbox",
        },
      ],
    },
    {
      id: "wi_arbitration",
      title: "Binding Arbitration Clause",
      description:
        "Wisconsin permits binding arbitration clauses in marital property agreements. This means disputes would be resolved by an arbitrator instead of in court.",
      category: "protection",
      fields: [
        {
          id: "wi_arbitration_choice",
          label: "Include a binding arbitration clause?",
          type: "select",
          options: [
            "Yes — disputes will be resolved through binding arbitration",
            "No — disputes will be resolved in court",
          ],
        },
      ],
    },
    {
      id: "wi_digital_property",
      title: "Digital Property Provisions",
      description:
        "Wisconsin's framework addresses digital property classification. You can specify how digital assets (crypto, online accounts, digital businesses) are treated.",
      category: "property",
      fields: [
        {
          id: "wi_digital_treatment",
          label: "How should digital assets be classified?",
          type: "select",
          options: [
            "Follow the same rules as physical property",
            "All digital assets remain individual property",
            "Digital assets acquired during marriage are marital property",
          ],
        },
      ],
    },
  ];
}

function getAlaskaClauses(): OptionalClause[] {
  return [
    {
      id: "ak_community_opt_in",
      title: "Alaska Opt-In Community Property",
      description:
        "Alaska is unique — it's an equitable distribution state that allows couples to opt into community property under AS 34.75. This can provide tax advantages and different property protections.",
      category: "property",
      fields: [
        {
          id: "ak_opt_in_choice",
          label: "Would you like to opt into community property?",
          type: "select",
          options: [
            "No — keep equitable distribution (Alaska default)",
            "Yes — opt into community property for all marital assets",
            "Yes — opt into community property for specific assets only",
          ],
        },
        {
          id: "ak_opt_in_assets",
          label: "If opting in for specific assets, describe which assets",
          type: "text",
        },
      ],
    },
  ];
}

function getNewYorkClauses(): OptionalClause[] {
  return [
    {
      id: "ny_separate_property",
      title: "New York Separate Property Schedule",
      description:
        "New York has specific definitions for separate property under DRL § 236(B). Clearly identify assets each party wishes to keep separate.",
      category: "property",
      fields: [
        {
          id: "ny_separate_ack",
          label: "Both parties agree to the separate property schedule attached as an exhibit",
          type: "checkbox",
        },
      ],
    },
    {
      id: "ny_embryo_disposition",
      title: "Embryo Disposition Provisions",
      description:
        "New York allows prenuptial agreements to address embryo disposition. Note: if you include this provision, independent counsel is REQUIRED for both parties.",
      category: "unique",
      fields: [
        {
          id: "ny_embryo_choice",
          label: "Would you like to address embryo disposition?",
          type: "select",
          options: [
            "No — do not include embryo provisions",
            "Yes — include embryo disposition terms (requires independent counsel for both parties)",
          ],
        },
        {
          id: "ny_embryo_terms",
          label: "Describe desired embryo disposition terms",
          type: "text",
        },
      ],
    },
    {
      id: "ny_maintenance_calc",
      title: "Maintenance Calculation Acknowledgment",
      description:
        "New York requires that any spousal support waiver include a calculation using actual incomes and the NYS guideline maintenance formula, with both parties acknowledging the deviation (J.M. v. G.V. 2025).",
      category: "support",
      fields: [
        {
          id: "ny_maintenance_ack",
          label: "Both parties acknowledge the NYS guideline maintenance calculation and deviation",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getFloridaClauses(): OptionalClause[] {
  return [
    {
      id: "fl_enhanced_value",
      title: "Florida Enhanced Value of Separate Assets",
      description:
        "Florida law distinguishes between passive and active appreciation of separate property during marriage. Specify how appreciation should be treated.",
      category: "property",
      fields: [
        {
          id: "fl_appreciation",
          label: "Treatment of appreciation on separate property",
          type: "select",
          options: [
            "All appreciation remains separate property",
            "Active appreciation (from marital effort) becomes marital property",
            "Both active and passive appreciation become marital property",
          ],
        },
      ],
    },
    {
      id: "fl_estate_provisions",
      title: "Florida Estate & Probate Provisions",
      description:
        "Florida requires 2 witnesses for provisions touching real estate and estates (§ 732.702). If you include death-related provisions, they must comply with the Probate Code.",
      category: "estate",
      fields: [
        {
          id: "fl_estate_waiver",
          label: "Include waiver of elective share (surviving spouse's right to a portion of the estate)?",
          type: "select",
          options: [
            "Yes — waive elective share rights",
            "No — preserve elective share rights",
            "Partial waiver with specific terms",
          ],
        },
        {
          id: "fl_probate_ack",
          label: "Both parties acknowledge that 2 witnesses are required at signing for estate provisions",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getArkansasClauses(): OptionalClause[] {
  return [
    {
      id: "ar_acknowledgment",
      title: "Arkansas Acknowledgment Method",
      description:
        "Arkansas requires one of four acknowledgment methods under § 9-11-402. Select the method you will use at signing.",
      category: "execution",
      fields: [
        {
          id: "ar_ack_method",
          label: "Acknowledgment method",
          type: "select",
          options: [
            "Option 1: Formal declaration before an authorized public officer (judge, clerk)",
            "Option 2: Sworn affirmation by the respective attorneys of each party",
            "Option 3: Notary-witnessed signing with acknowledgment statements",
            "Option 4: Execution witnessed by 2 disinterested parties (recommended for self-service)",
          ],
        },
      ],
    },
    {
      id: "ar_lasting_marriage",
      title: "Contemplation of Lasting Marriage",
      description:
        "Arkansas courts require that prenuptial agreements be made in contemplation of a lasting marriage, not in anticipation of divorce.",
      category: "protection",
      fields: [
        {
          id: "ar_lasting_ack",
          label: "Both parties affirm this agreement is made in contemplation of a lasting marriage",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getColoradoClauses(): OptionalClause[] {
  return [
    {
      id: "co_plain_language_waiver",
      title: "Colorado Plain-Language Waiver Notice (UPMAA)",
      description:
        "Colorado's UPMAA requires that if either party does not have independent counsel, the agreement must include a plain-language explanation of the marital rights being modified or waived.",
      category: "execution",
      fields: [
        {
          id: "co_waiver_party1",
          label: "Party 1 has independent legal counsel",
          type: "select",
          options: ["Yes", "No — include plain-language waiver notice"],
        },
        {
          id: "co_waiver_party2",
          label: "Party 2 has independent legal counsel",
          type: "select",
          options: ["Yes", "No — include plain-language waiver notice"],
        },
      ],
    },
  ];
}

function getMinnesotaClauses(): OptionalClause[] {
  return [
    {
      id: "mn_valuation_basis",
      title: "Valuation Basis Documentation (Required)",
      description:
        "Minnesota's 2024 amendments require financial disclosure to include the BASIS for all valuations — not just values, but how they were determined (e.g., appraisal, tax assessment, market estimate).",
      category: "execution",
      fields: [
        {
          id: "mn_valuation_method",
          label: "Primary valuation method for assets",
          type: "select",
          options: [
            "Professional appraisals",
            "Tax assessment values",
            "Recent market estimates",
            "Combination of methods (detailed in financial schedule)",
          ],
        },
        {
          id: "mn_valuation_ack",
          label: "Both parties confirm all asset valuations include the basis for each value",
          type: "checkbox",
        },
      ],
    },
    {
      id: "mn_dual_time_fairness",
      title: "Dual-Time Fairness Acknowledgment",
      description:
        "Minnesota reviews agreements for fairness at BOTH execution and enforcement. Both parties should acknowledge this dual-time standard.",
      category: "protection",
      fields: [
        {
          id: "mn_dual_time_ack",
          label: "Both parties understand the agreement must be fair at both signing and enforcement",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getPennsylvaniaClauses(): OptionalClause[] {
  return [
    {
      id: "pa_business_contract",
      title: "Pennsylvania Business Contract Standard",
      description:
        "Pennsylvania treats prenuptial agreements as ordinary business contracts (Simeone v. Simeone, 1990). Courts do not review for fairness — only voluntariness and disclosure. This provides the strongest enforceability in the country.",
      category: "protection",
      fields: [
        {
          id: "pa_voluntariness_ack",
          label: "Both parties acknowledge this agreement is entered into voluntarily as a business contract",
          type: "checkbox",
        },
        {
          id: "pa_disclosure_ack",
          label: "Both parties acknowledge they have received full financial disclosure",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getIndianaClauses(): OptionalClause[] {
  return [
    {
      id: "in_all_property",
      title: "Indiana All-Property Protection",
      description:
        "Indiana divides ALL property upon divorce — including assets brought into the marriage. Without a prenup, even premarital assets are subject to division. Clearly designate what remains separate.",
      category: "property",
      fields: [
        {
          id: "in_premarital_protection",
          label: "How should premarital assets be handled?",
          type: "select",
          options: [
            "All premarital assets remain separate property of the original owner",
            "Premarital assets are protected but appreciation may be divided",
            "Custom terms for specific premarital assets",
          ],
        },
        {
          id: "in_premarital_details",
          label: "Describe specific premarital assets to protect (if applicable)",
          type: "text",
        },
      ],
    },
    {
      id: "in_hardship_foreseeability",
      title: "Extreme Hardship Foreseeability Language",
      description:
        "Indiana's extreme hardship override (§ 31-11-3-8) allows courts to require maintenance even if waived. Including foreseeability language strengthens enforceability.",
      category: "support",
      fields: [
        {
          id: "in_foreseeability_ack",
          label: "Both parties acknowledge circumstances that could constitute extreme hardship and accept the spousal support terms with this understanding",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getNorthDakotaClauses(): OptionalClause[] {
  return [
    {
      id: "nd_severability",
      title: "UPMAA Severability Clause",
      description:
        "North Dakota's UPMAA provides three remedial options for unconscionable provisions: refuse enforcement entirely, enforce without the unconscionable parts, or limit their application. A severability clause helps preserve enforceable portions.",
      category: "protection",
      fields: [
        {
          id: "nd_severability_ack",
          label: "Include severability clause allowing courts to preserve enforceable provisions",
          type: "checkbox",
        },
      ],
    },
    {
      id: "nd_anti_duress",
      title: "Anti-Duress Acknowledgment",
      description:
        "Under North Dakota's UPMAA, duress is a separate and independent ground for invalidation. Both parties should document the absence of duress.",
      category: "execution",
      fields: [
        {
          id: "nd_duress_ack",
          label: "Both parties affirm this agreement was signed free from duress, coercion, or undue pressure",
          type: "checkbox",
        },
        {
          id: "nd_signing_location",
          label: "Where will the agreement be signed? (documents the setting)",
          type: "text",
        },
      ],
    },
  ];
}

function getConnecticutClauses(): OptionalClause[] {
  return [
    {
      id: "ct_dual_time",
      title: "Connecticut Dual-Time Unconscionability Acknowledgment",
      description:
        "Connecticut reviews prenuptial agreements for unconscionability at BOTH execution and enforcement. An agreement that was fair when signed can still be invalidated if circumstances have changed drastically.",
      category: "protection",
      fields: [
        {
          id: "ct_dual_time_ack",
          label: "Both parties understand the agreement will be reviewed for fairness at both signing and enforcement",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getMassachusettsClauses(): OptionalClause[] {
  return [
    {
      id: "ma_second_look",
      title: "Massachusetts Second Look Doctrine",
      description:
        "Massachusetts applies a 'second look' doctrine — courts can review the agreement's fairness at the time of divorce, not just when it was signed. This is one of the strictest standards in the country.",
      category: "protection",
      fields: [
        {
          id: "ma_second_look_ack",
          label: "Both parties acknowledge the second look doctrine may apply at enforcement",
          type: "checkbox",
        },
        {
          id: "ma_fairness_provision",
          label: "Include a provision for periodic review of agreement terms?",
          type: "select",
          options: [
            "No — the agreement stands as written",
            "Yes — review terms every 5 years",
            "Yes — review terms every 10 years",
          ],
        },
      ],
    },
  ];
}

function getNewJerseyClauses(): OptionalClause[] {
  return [
    {
      id: "nj_asset_statement",
      title: "New Jersey Annexed Asset Statement",
      description:
        "New Jersey best practice is to annex a detailed asset and liability statement to the agreement. Post-2013 amendments apply a 'clear and convincing' evidence standard to challenges.",
      category: "execution",
      fields: [
        {
          id: "nj_asset_annex",
          label: "Both parties agree to annex a complete asset and liability statement to the agreement",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getMissouriClauses(): OptionalClause[] {
  return [
    {
      id: "mo_execution_method",
      title: "Missouri Execution Method",
      description:
        "Missouri allows either notarization OR two witnesses for execution. Choose your preferred method.",
      category: "execution",
      fields: [
        {
          id: "mo_execution_choice",
          label: "Execution method",
          type: "select",
          options: [
            "Notarization (recommended)",
            "Two witnesses",
            "Both notarization and two witnesses (strongest protection)",
          ],
        },
      ],
    },
  ];
}

function getRhodeIslandClauses(): OptionalClause[] {
  return [
    {
      id: "ri_and_conjunction",
      title: "Rhode Island 'AND' Standard Acknowledgment",
      description:
        "Rhode Island uses a unique 'AND' conjunction for challenges — a party must prove the agreement was BOTH involuntary AND unconscionable to invalidate it. This is a higher bar than most states.",
      category: "protection",
      fields: [
        {
          id: "ri_standard_ack",
          label: "Both parties acknowledge Rhode Island's higher standard for challenging this agreement",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getWashingtonClauses(): OptionalClause[] {
  return [
    {
      id: "wa_process_documentation",
      title: "Washington Process Documentation",
      description:
        "Washington courts value thorough documentation of the negotiation process. Documenting how the agreement was reached strengthens enforceability.",
      category: "execution",
      fields: [
        {
          id: "wa_process_ack",
          label: "Both parties agree to maintain documentation of the negotiation process",
          type: "checkbox",
        },
        {
          id: "wa_negotiation_timeline",
          label: "Approximate date negotiations began",
          type: "text",
        },
      ],
    },
  ];
}

function getMichiganClauses(): OptionalClause[] {
  return [
    {
      id: "mi_witness_requirement",
      title: "Michigan Witness Requirement",
      description:
        "Michigan requires two witnesses for prenuptial agreements. Ensure your signing ceremony includes two disinterested witnesses.",
      category: "execution",
      fields: [
        {
          id: "mi_witness_ack",
          label: "Both parties acknowledge that two witnesses are required at signing",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getGeorgiaClauses(): OptionalClause[] {
  return [
    {
      id: "ga_witness_notary",
      title: "Georgia Witness & Notary Requirement",
      description:
        "Georgia requires two witnesses, and one of them must be the notary public. This is a unique requirement — plan your signing ceremony accordingly.",
      category: "execution",
      fields: [
        {
          id: "ga_witness_ack",
          label: "Both parties acknowledge that two witnesses are required, one of whom must be the notary",
          type: "checkbox",
        },
      ],
    },
  ];
}

function getWestVirginiaClauses(): OptionalClause[] {
  return [
    {
      id: "wv_attorney_confirmation",
      title: "West Virginia Attorney Involvement",
      description:
        "West Virginia may require attorney involvement for prenuptial agreement enforceability. This is still being verified — consulting an attorney is strongly recommended.",
      category: "execution",
      fields: [
        {
          id: "wv_attorney_status",
          label: "Attorney involvement status",
          type: "select",
          options: [
            "Both parties have independent attorneys",
            "One party has an attorney",
            "Neither party has an attorney (increased enforceability risk)",
          ],
        },
      ],
    },
  ];
}

function getNevadaClauses(): OptionalClause[] {
  return [
    {
      id: "nv_comprehensive",
      title: "Nevada Comprehensive Statute Coverage",
      description:
        "Nevada has one of the most comprehensive prenuptial agreement statutes in the country. Take advantage of the broad scope of provisions permitted.",
      category: "property",
      fields: [
        {
          id: "nv_business_interests",
          label: "Include provisions for business interests and ownership stakes?",
          type: "select",
          options: [
            "Yes — business interests remain separate property of the owner",
            "Yes — business interests are subject to equitable division",
            "No — do not address business interests specifically",
          ],
        },
        {
          id: "nv_retirement",
          label: "Include provisions for retirement accounts?",
          type: "select",
          options: [
            "Premarital retirement accounts remain separate property",
            "All retirement accounts are community property",
            "Premarital balances are separate; contributions during marriage are community",
          ],
        },
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Shared Protection Clauses — available in select states
// ---------------------------------------------------------------------------

function getSeverabilityClause(config: StateLegalConfig): OptionalClause {
  const stateFramework =
    config.upaaStatus === "upmaa"
      ? "the Uniform Premarital and Marital Agreements Act"
      : config.upaaStatus === "upaa"
        ? "the Uniform Premarital Agreement Act"
        : `${config.stateName} contract law`;

  return {
    id: "severability",
    title: "Severability Clause",
    description: `If any provision of this Agreement is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction under ${stateFramework}, such finding shall not affect the validity of the remaining provisions, which shall continue in full force and effect. The parties intend that each provision of this Agreement be viewed as separate and divisible, and any provision found to be invalid shall be modified to the minimum extent necessary to make it enforceable, or severed if modification is not possible.`,
    category: "protection",
    fields: [],
  };
}

// ---------------------------------------------------------------------------
// Main Export — generates all applicable clauses for a state
// ---------------------------------------------------------------------------

export function getStateOptionalClauses(stateCode: StateCode): OptionalClause[] {
  const config = getStateLegalConfig(stateCode);
  const clauses: OptionalClause[] = [];

  // 1. Property regime clauses
  if (config.propertyRegime === "community_property") {
    clauses.push(...getCommunityPropertyClauses(config));
  } else {
    clauses.push(...getEquitableDistributionClauses(config));
  }

  // 2. State-specific clauses
  const stateSpecificMap: Partial<Record<StateCode, () => OptionalClause[]>> = {
    CA: getCaliforniaClauses,
    TX: getTexasClauses,
    LA: getLouisianaClauses,
    WI: getWisconsinClauses,
    AK: getAlaskaClauses,
    NY: getNewYorkClauses,
    FL: getFloridaClauses,
    AR: getArkansasClauses,
    CO: getColoradoClauses,
    MN: getMinnesotaClauses,
    PA: getPennsylvaniaClauses,
    IN: getIndianaClauses,
    ND: getNorthDakotaClauses,
    CT: getConnecticutClauses,
    MA: getMassachusettsClauses,
    NJ: getNewJerseyClauses,
    MO: getMissouriClauses,
    RI: getRhodeIslandClauses,
    WA: getWashingtonClauses,
    MI: getMichiganClauses,
    GA: getGeorgiaClauses,
    WV: getWestVirginiaClauses,
    NV: getNevadaClauses,
  };

  const stateGetter = stateSpecificMap[stateCode];
  if (stateGetter) {
    clauses.push(...stateGetter());
  }

  // Severability clause — included unless the state already has its own
  const hasStateSeverability = clauses.some((c) => c.id.includes("severability"));
  if (!hasStateSeverability) {
    clauses.push(getSeverabilityClause(config));
  }

  return clauses;
}

// Helper to get clause count for a state (useful for UI)
export function getStateClauseCount(stateCode: StateCode): number {
  return getStateOptionalClauses(stateCode).length;
}
