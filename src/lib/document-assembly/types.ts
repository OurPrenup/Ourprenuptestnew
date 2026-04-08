// =============================================================================
// Document Assembly — Types
// Defines the shape of a fully assembled document ready for PDF rendering.
// =============================================================================

import type { StateCode } from "@/legal/types";
import type {
  DocumentCustomization,
  RequiredLanguageBlock,
  SignatureBlock,
  NotaryBlock,
  WitnessBlock,
} from "@/legal/document-generator";

// ---------------------------------------------------------------------------
// Party information (extracted from questionnaire answers)
// ---------------------------------------------------------------------------

export interface PartyInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  email: string;
  stateOfResidence: string;
  previouslyMarried: boolean;
  employed: boolean | "in_school";
  employer: string | null;
  ownsBusiness: boolean;
  hasAttorney: boolean;
}

// ---------------------------------------------------------------------------
// Prenup provisions (merged from both partners' answers)
// ---------------------------------------------------------------------------

export interface PrenupProvisions {
  // Property
  ownPropertyTogether: boolean;
  inheritanceTreatment: "keep_separate" | "state_law";
  giftsAcknowledged: boolean;

  // Debts
  premaritalDebtAcknowledged: boolean;
  maritalDebtHandling: "name_based" | "shared_equally" | "state_law";
  realEstateLiabilitiesAcknowledged: boolean;

  // Financial
  taxFilingAcknowledged: boolean;
  jointAccountsAcknowledged: boolean;
  financialDisclosureAcknowledged: boolean;

  // Spousal support
  spousalSupportApproach:
    | "waiver"
    | "no_waiver"
    | "marriage_length"
    | "conditional_children"
    | "lump_sum";

  // Optional clauses
  deathProvision: boolean;
  sunsetClause: boolean;
  petClause: "no_clause" | "one_partner" | "shared_custody" | "divide_individually";
  lifeInsurance: boolean;
  healthInsuranceContinue: boolean;

  // Additional documents
  translatedSummary: boolean;

  // Prenup goals
  goals: string[];
}

// ---------------------------------------------------------------------------
// Financial disclosure summary (for the exhibit)
// ---------------------------------------------------------------------------

export interface DisclosureItem {
  description: string;
  value: string;
  owner: string;
}

export interface FinancialDisclosureSummary {
  accounts: DisclosureItem[];
  assets: DisclosureItem[];
  income: DisclosureItem[];
  realEstate: DisclosureItem[];
  vehicles: DisclosureItem[];
  business: DisclosureItem[];
  debts: DisclosureItem[];
  inheritance: DisclosureItem[];
  trusts: DisclosureItem[];
}

// ---------------------------------------------------------------------------
// Full assembled document content — ready for PDF rendering
// ---------------------------------------------------------------------------

export interface DocumentContent {
  // Metadata
  stateCode: StateCode;
  stateName: string;
  weddingDate: string;
  generatedAt: string;

  // Parties
  party1: PartyInfo;
  party2: PartyInfo;

  // Legal customization from engine
  terminology: string;
  recitalStatuteRefs: string[];
  requiredLanguage: RequiredLanguageBlock[];
  signatureBlocks: SignatureBlock[];
  notaryBlock: NotaryBlock | null;
  witnessBlocks: WitnessBlock[];
  signingInstructionsSummary: string;

  // Merged provisions
  provisions: PrenupProvisions;

  // Financial disclosures
  party1Disclosure: FinancialDisclosureSummary | null;
  party2Disclosure: FinancialDisclosureSummary | null;
}
