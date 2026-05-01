// =============================================================================
// Merge Answers — Combines questionnaire + disclosure data from both partners
// into structured types ready for document assembly.
// =============================================================================

import type {
  PartyInfo,
  PrenupProvisions,
  FinancialDisclosureSummary,
  DisclosureItem,
} from "./types";

// ---------------------------------------------------------------------------
// Questionnaire answers are stored as JSONB keyed by question ID.
// These helpers extract typed values from the raw records.
// ---------------------------------------------------------------------------

type RawAnswers = Record<string, Record<string, unknown>>;

function str(answers: RawAnswers, stepId: string, questionId: string, fallback = ""): string {
  return (answers[stepId]?.[questionId] as string) ?? fallback;
}

function bool(answers: RawAnswers, stepId: string, questionId: string): boolean {
  const v = answers[stepId]?.[questionId];
  return v === "yes" || v === true;
}

function arr(answers: RawAnswers, stepId: string, questionId: string): string[] {
  const v = answers[stepId]?.[questionId];
  if (Array.isArray(v)) return v as string[];
  return [];
}

// ---------------------------------------------------------------------------
// Extract party info from a single user's questionnaire answers.
//
// `partnerNumber` determines which partner's data to extract (1 or 2).
// `isOwnAnswers` indicates whether the answers come from the party's own
// form (true) or from the other partner describing them (false). Employment
// fields always use the partner_one_*/partner_two_* prefixed names since
// that's how the questionnaire stores them.
// ---------------------------------------------------------------------------

export function extractPartyInfo(
  answers: RawAnswers,
  partnerNumber: 1 | 2,
  isOwnAnswers = true,
): PartyInfo {
  // When reading a party's OWN answers, first_name/last_name are theirs.
  // When reading from the OTHER partner's answers (isOwnAnswers=false),
  // we can't get this party's name from the questionnaire — use placeholders.
  const firstName = isOwnAnswers ? str(answers, "introduction", "first_name") : "";
  const lastName = isOwnAnswers ? str(answers, "introduction", "last_name") : "";

  const employedKey = partnerNumber === 1 ? "partner_one_employed" : "partner_two_employed";
  const employerKey = partnerNumber === 1 ? "partner_one_employer" : "partner_two_employer";
  // "own_business" is the only business question ID in the questionnaire
  const businessKey = "own_business";
  const attorneyKey = partnerNumber === 1 ? "partner1_attorney" : "partner2_attorney";

  const employedValue = str(answers, "property", employedKey);

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim(),
    dateOfBirth: str(answers, "introduction", "date_of_birth"),
    email: str(answers, "introduction", "email"),
    stateOfResidence: str(answers, "introduction", "state_of_residence"),
    previouslyMarried: bool(answers, "introduction", "previously_married"),
    employed: employedValue === "in_school" ? "in_school" : employedValue === "yes",
    employer: str(answers, "property", employerKey) || null,
    ownsBusiness: bool(answers, "property", businessKey),
    hasAttorney: str(answers, "legal-representation", attorneyKey) === "yes",
  };
}

// ---------------------------------------------------------------------------
// Merge provisions from the primary user's questionnaire answers.
// (Both partners answer the same questions; for now we use the primary's
//  answers, or resolved conflicts from the collaboration phase.)
// ---------------------------------------------------------------------------

export function extractProvisions(answers: RawAnswers): PrenupProvisions {
  return {
    // Property
    ownPropertyTogether: bool(answers, "property", "own_property_together"),
    inheritanceTreatment:
      (str(answers, "property", "inheritance_treatment") as "keep_separate" | "state_law") || "keep_separate",
    giftsAcknowledged: str(answers, "property", "gifts_acknowledgment") === "understood",

    // Debts
    premaritalDebtAcknowledged: str(answers, "debts", "premarital_debt_acknowledgment") === "understood",
    maritalDebtHandling:
      (str(answers, "debts", "marital_debt_handling") as "name_based" | "shared_equally" | "state_law") || "name_based",
    realEstateLiabilitiesAcknowledged: str(answers, "debts", "real_estate_liabilities") === "understood",

    // Financial
    taxFilingAcknowledged: str(answers, "financial", "income_taxes") === "understood",
    jointAccountsAcknowledged: str(answers, "financial", "joint_accounts_acknowledgment") === "understood",
    financialDisclosureAcknowledged: str(answers, "financial", "financial_disclosure") === "understood",

    // Spousal support
    spousalSupportApproach:
      (str(answers, "spousal-support", "spousal_support_approach") as PrenupProvisions["spousalSupportApproach"]) ||
      "no_waiver",

    // Optional clauses
    deathProvision: bool(answers, "optional-clauses", "death_provision"),
    sunsetClause: bool(answers, "optional-clauses", "sunset_clause"),
    petClause:
      (str(answers, "optional-clauses", "pet_clause") as PrenupProvisions["petClause"]) || "no_clause",
    lifeInsurance: bool(answers, "optional-clauses", "life_insurance"),
    healthInsuranceContinue: str(answers, "optional-clauses", "health_insurance") === "continue",

    // Additional documents
    translatedSummary: bool(answers, "additional-documents", "language_translation"),

    // Goals
    goals: arr(answers, "introduction", "prenup_goals"),
  };
}

// ---------------------------------------------------------------------------
// Parse financial disclosure data from the raw JSONB
// ---------------------------------------------------------------------------

const DISCLOSURE_CATEGORIES = [
  "accounts",
  "assets",
  "income",
  "real_estate",
  "vehicles",
  "business",
  "debts",
  "inheritance",
  "trusts",
] as const;

export function extractDisclosure(
  rawData: Record<string, unknown> | null
): FinancialDisclosureSummary | null {
  if (!rawData) return null;

  // The financial disclosure page saves as:
  //   { categories: { accounts: { items: [...], expanded }, ... }, incomeData: [...] }
  // Handle both the nested format and a hypothetical flat format for resilience.
  const categories = (rawData.categories ?? rawData) as Record<string, unknown>;

  const result: Record<string, DisclosureItem[]> = {};

  for (const category of DISCLOSURE_CATEGORIES) {
    const catData = categories[category];
    // Nested format: { items: [...], expanded: bool }
    const items = catData && typeof catData === "object" && !Array.isArray(catData)
      ? (catData as Record<string, unknown>).items
      : catData;

    if (Array.isArray(items)) {
      result[category] = items
        .filter((item: Record<string, unknown>) => item.description || item.value)
        .map((item: Record<string, unknown>) => ({
          description: String(item.description || ""),
          value: String(item.value || ""),
          owner: String(item.owner || ""),
        }));
    } else {
      result[category] = [];
    }
  }

  // Income is stored separately as incomeData: [{ year, amount, owner }]
  const incomeData = rawData.incomeData;
  if (Array.isArray(incomeData) && incomeData.length > 0) {
    result.income = incomeData
      .filter((row: Record<string, unknown>) => row.amount)
      .map((row: Record<string, unknown>) => ({
        description: `${row.year ?? "Unknown year"} gross income`,
        value: String(row.amount || ""),
        owner: String(row.owner || ""),
      }));
  }

  return {
    accounts: result.accounts,
    assets: result.assets,
    income: result.income,
    realEstate: result.real_estate,
    vehicles: result.vehicles,
    business: result.business,
    debts: result.debts,
    inheritance: result.inheritance,
    trusts: result.trusts,
  };
}
