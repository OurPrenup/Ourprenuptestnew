// =============================================================================
// OurPrenup — State Legal Data Model
// Every field maps to a platform behavior. Do not remove or simplify fields.
// =============================================================================

// -- State Code Union --
export type StateCode =
  | "AL" | "AK" | "AZ" | "AR" | "CA" | "CO" | "CT" | "DE" | "FL" | "GA"
  | "HI" | "ID" | "IL" | "IN" | "IA" | "KS" | "KY" | "LA" | "ME" | "MD"
  | "MA" | "MI" | "MN" | "MS" | "MO" | "MT" | "NE" | "NV" | "NH" | "NJ"
  | "NM" | "NY" | "NC" | "ND" | "OH" | "OK" | "OR" | "PA" | "RI" | "SC"
  | "SD" | "TN" | "TX" | "UT" | "VT" | "VA" | "WA" | "WV" | "WI" | "WY";

// -- Enum-like Union Types --

export type ResearchDepth =
  | "deeply_researched"
  | "verified"
  | "partially_verified"
  | "needs_verification";

export type PropertyRegime = "community_property" | "equitable_distribution";

export type CommunityPropertyVariant =
  | "standard"
  | "umpa_wisconsin"
  | "opt_in_alaska";

export type UPAAStatus =
  | "upaa"
  | "upmaa"
  | "not_adopted"
  | "own_framework"
  | "disputed";

export type RequirementLevel = "required" | "recommended" | "not_required";

export type NotarizationType =
  | "standard"
  | "deed_style_ny"
  | "authentic_act_la"
  | "acknowledgment_nm";

export type CounselRequirement =
  | "required"
  | "conditionally_required"
  | "required_for_spousal_support"
  | "opportunity_required"
  | "recommended"
  | "not_required";

export type DisclosureStrictness = "strict" | "standard" | "soft";

export type WaitingPeriodType = "mandatory" | "recommended" | "none";

export type UnconscionabilityReviewTime =
  | "at_execution"
  | "dual_time"
  | "at_enforcement";

export type SafetyValveType =
  | "public_assistance"
  | "extreme_hardship"
  | "dependent_spouse"
  | "none_removed"
  | "none";

export type SelfServiceViability =
  | "excellent"
  | "good"
  | "moderate"
  | "limited"
  | "exclude";

export type RuleSeverity = "critical" | "important" | "informational";

// -- Sub-Interfaces --

export interface AcknowledgmentOption {
  id: string;
  description: string;
  isDefault: boolean;
}

export interface ExecutionRequirements {
  writingRequired: true;
  bothSignatures: true;
  notarization: RequirementLevel;
  notarizationType: NotarizationType;
  witnesses: RequirementLevel;
  witnessCount: number | null;
  witnessRules: string | null;
  acknowledgmentOptions: AcknowledgmentOption[] | null;
  wetInkRequired: boolean;
}

export interface FinancialDisclosure {
  strictness: DisclosureStrictness;
  waiverPermitted: boolean;
  specialRequirements: string | null;
  notes: string;
}

export interface IndependentCounsel {
  requirement: CounselRequirement;
  conditions: string | null;
  writtenWaiverRequired: boolean;
}

export interface WaitingPeriod {
  hasMandatoryPeriod: boolean;
  type: WaitingPeriodType;
  details: string | null;
  daysRequired: number | null;
  calculationBasis: "from_final_draft" | "before_wedding" | null;
}

export interface SpousalSupport {
  canModify: boolean;
  disabled: boolean;
  disabledReason: string | null;
  safetyValve: SafetyValveType;
  specialRules: string[];
  notes: string;
}

export interface Unconscionability {
  reviewTime: UnconscionabilityReviewTime;
  burdenOfProof: string | null;
  uniqueTest: string | null;
  threeOptionRemedy: boolean;
  presumptionOfFraud: boolean;
}

export interface UniqueRule {
  ruleId: string;
  description: string;
  platformImpact: string;
  severity: RuleSeverity;
}

export interface CaseLaw {
  citation: string;
  description: string;
}

export interface PlatformNotes {
  selfServiceViability: SelfServiceViability;
  requiredPlatformActions: string[];
  warnings: string[];
  marketingNotes: string[];
}

// -- Main Interface --

export interface StateLegalConfig {
  stateCode: StateCode;
  stateName: string;
  researchDepth: ResearchDepth;

  propertyRegime: PropertyRegime;
  communityPropertyVariant: CommunityPropertyVariant | null;

  upaaStatus: UPAAStatus;
  statuteCitations: string[];

  execution: ExecutionRequirements;
  financialDisclosure: FinancialDisclosure;
  independentCounsel: IndependentCounsel;
  waitingPeriod: WaitingPeriod;
  spousalSupport: SpousalSupport;
  unconscionability: Unconscionability;

  childProvisions: "cannot_predetermine";

  uniqueRules: UniqueRule[];
  caseLaw: CaseLaw[];
  platformNotes: PlatformNotes;

  agreementTerminology: string;
}

// -- Factory for "needs verification" states with sensible defaults --

type DefaultOverrides = Partial<StateLegalConfig> &
  Pick<StateLegalConfig, "stateCode" | "stateName" | "researchDepth">;

export function createDefaultState(overrides: DefaultOverrides): StateLegalConfig {
  return {
    propertyRegime: "equitable_distribution",
    communityPropertyVariant: null,
    upaaStatus: "upaa",
    statuteCitations: [],
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
      notes: "Standard UPAA financial disclosure required.",
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
      canModify: true,
      disabled: false,
      disabledReason: null,
      safetyValve: "public_assistance",
      specialRules: [],
      notes: "Spousal support can be modified. Public assistance safety valve applies.",
    },
    unconscionability: {
      reviewTime: "at_execution",
      burdenOfProof: null,
      uniqueTest: null,
      threeOptionRemedy: false,
      presumptionOfFraud: false,
    },
    childProvisions: "cannot_predetermine",
    uniqueRules: [],
    caseLaw: [],
    platformNotes: {
      selfServiceViability: "moderate",
      requiredPlatformActions: [],
      warnings: [],
      marketingNotes: [],
    },
    agreementTerminology: "prenuptial agreement",
    ...overrides,
  };
}
