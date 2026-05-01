// =============================================================================
// Agreement Validation & Safety Rails
// Prevents unenforceable agreements and surfaces state-specific warnings.
// =============================================================================

import type { StateCode, StateLegalConfig } from "./types";
import { ALL_STATES } from "./states";

export type ValidationSeverity = "error" | "warning" | "info";

export interface ValidationResult {
  field: string;
  severity: ValidationSeverity;
  message: string;
  stateSpecific: boolean;
}

export interface ValidationSummary {
  isValid: boolean;
  errors: ValidationResult[];
  warnings: ValidationResult[];
  infos: ValidationResult[];
  all: ValidationResult[];
}

export interface AgreementAnswers {
  includesSpousalSupport?: boolean;
  spousalSupportFullWaiver?: boolean;
  hasAttorney?: {
    party1: boolean;
    party2: boolean;
  };
  financialDisclosureComplete?: boolean;
  signingDate?: Date;
  weddingDate?: Date;
}

export function validateAgreement(
  stateCode: StateCode,
  answers: AgreementAnswers,
  weddingDate?: Date
): ValidationSummary {
  const config = ALL_STATES[stateCode];
  const results: ValidationResult[] = [];
  const effectiveWeddingDate = weddingDate || answers.weddingDate;

  // Self-service exclusion check
  validateSelfService(config, results);

  // Spousal support checks
  validateSpousalSupport(config, answers, results);

  // Attorney checks
  validateAttorney(config, answers, results);

  // Disclosure checks
  validateDisclosure(config, answers, results);

  // Timing checks
  validateTiming(config, answers, effectiveWeddingDate, results);

  // Unconscionability warnings
  validateUnconscionability(config, results);

  // Research depth disclaimer
  validateResearchDepth(config, results);

  // Unique rules
  validateUniqueRules(config, results);

  const errors = results.filter((r) => r.severity === "error");
  const warnings = results.filter((r) => r.severity === "warning");
  const infos = results.filter((r) => r.severity === "info");

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    infos,
    all: results,
  };
}

function validateSelfService(config: StateLegalConfig, results: ValidationResult[]): void {
  if (config.platformNotes.selfServiceViability === "exclude") {
    results.push({
      field: "state",
      severity: "error",
      message: `${config.stateName} requires attorney involvement for both parties. Self-service prenup creation is not available for this state. Please consider our attorney-assisted package.`,
      stateSpecific: true,
    });
  }
}

function validateSpousalSupport(
  config: StateLegalConfig,
  answers: AgreementAnswers,
  results: ValidationResult[]
): void {
  if (config.spousalSupport.disabled && answers.includesSpousalSupport) {
    results.push({
      field: "spousalSupport",
      severity: "error",
      message: `${config.stateName} does not permit spousal support modification in prenuptial agreements. ${config.spousalSupport.disabledReason || ""} Remove spousal support provisions to proceed.`,
      stateSpecific: true,
    });
  }

  if (
    answers.spousalSupportFullWaiver &&
    !config.spousalSupport.disabled &&
    config.spousalSupport.canModify
  ) {
    if (config.unconscionability.reviewTime === "dual_time") {
      results.push({
        field: "spousalSupport",
        severity: "warning",
        message: `${config.stateName} reviews prenup fairness at both signing AND enforcement. A full spousal support waiver could be overturned years later if circumstances change significantly. Consider including a graduated or conditional support provision instead.`,
        stateSpecific: true,
      });
    }

    if (config.unconscionability.presumptionOfFraud) {
      results.push({
        field: "spousalSupport",
        severity: "warning",
        message: `${config.stateName} applies a presumption of fraud where a prenup greatly disfavors one party. A full spousal support waiver significantly increases challenge risk. Consider balanced terms.`,
        stateSpecific: true,
      });
    }

    for (const rule of config.spousalSupport.specialRules) {
      results.push({
        field: "spousalSupport",
        severity: "info",
        message: rule,
        stateSpecific: true,
      });
    }
  }
}

function validateAttorney(
  config: StateLegalConfig,
  answers: AgreementAnswers,
  results: ValidationResult[]
): void {
  const req = config.independentCounsel.requirement;
  const party1Has = answers.hasAttorney?.party1 ?? false;
  const party2Has = answers.hasAttorney?.party2 ?? false;

  if (req === "required") {
    if (!party1Has || !party2Has) {
      results.push({
        field: "attorney",
        severity: "error",
        message: `${config.stateName} requires both parties to have independent legal counsel. The agreement may not be enforceable without attorneys for both parties.`,
        stateSpecific: true,
      });
    }
  }

  if (req === "required_for_spousal_support" && answers.includesSpousalSupport) {
    if (!party1Has || !party2Has) {
      results.push({
        field: "attorney",
        severity: "error",
        message: `${config.stateName} requires independent counsel for both parties when the agreement modifies spousal support. Without attorneys, spousal support provisions are unenforceable.`,
        stateSpecific: true,
      });
    }
  }

  if (req === "conditionally_required") {
    if (!party1Has || !party2Has) {
      results.push({
        field: "attorney",
        severity: "warning",
        message: `In ${config.stateName}, attorney involvement may be required depending on the fairness of the agreement. ${config.independentCounsel.conditions || ""} Without attorneys, the agreement must be inherently fair to be enforceable.`,
        stateSpecific: true,
      });
    }
  }
}

function validateDisclosure(
  config: StateLegalConfig,
  answers: AgreementAnswers,
  results: ValidationResult[]
): void {
  if (answers.financialDisclosureComplete === false) {
    const severity: ValidationSeverity =
      config.financialDisclosure.strictness === "strict" ? "error" : "warning";
    results.push({
      field: "financialDisclosure",
      severity,
      message: `Financial disclosure is incomplete. ${config.stateName} requires ${config.financialDisclosure.strictness === "strict" ? "thorough, detailed" : "fair and reasonable"} financial disclosure for enforceability.`,
      stateSpecific: true,
    });
  }

  if (config.financialDisclosure.specialRequirements) {
    results.push({
      field: "financialDisclosure",
      severity: "info",
      message: config.financialDisclosure.specialRequirements,
      stateSpecific: true,
    });
  }
}

function validateTiming(
  config: StateLegalConfig,
  answers: AgreementAnswers,
  weddingDate: Date | undefined,
  results: ValidationResult[]
): void {
  if (!weddingDate) return;

  // Normalize both dates to midnight UTC to avoid DST and time-of-day skew
  const now = new Date();
  const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const weddingUTC = Date.UTC(weddingDate.getUTCFullYear(), weddingDate.getUTCMonth(), weddingDate.getUTCDate());
  const daysUntilWedding = Math.round((weddingUTC - nowUTC) / (1000 * 60 * 60 * 24));

  // Past wedding date check — a prenup must be signed before the wedding
  if (daysUntilWedding < 0) {
    results.push({
      field: "timing",
      severity: "warning",
      message: `Your wedding date appears to be in the past. A prenuptial agreement must be signed before the marriage takes place. Please verify your wedding date is correct.`,
      stateSpecific: false,
    });
    return;
  }

  // Mandatory waiting period check
  if (config.waitingPeriod.hasMandatoryPeriod && config.waitingPeriod.daysRequired) {
    if (config.waitingPeriod.calculationBasis === "before_wedding") {
      if (daysUntilWedding < config.waitingPeriod.daysRequired) {
        results.push({
          field: "timing",
          severity: "error",
          message: `${config.stateName} requires the agreement to be signed at least ${config.waitingPeriod.daysRequired} days before the wedding. Your wedding is ${daysUntilWedding} days away. Agreements signed within this window are presumed invalid.`,
          stateSpecific: true,
        });
      }
    } else if (config.waitingPeriod.calculationBasis === "from_final_draft") {
      results.push({
        field: "timing",
        severity: "warning",
        message: `${config.stateName} law requires at least ${config.waitingPeriod.daysRequired} days between when your partner receives the final draft and when you both sign. Plan accordingly.`,
        stateSpecific: true,
      });
    }
  }

  // Recommended timing warnings
  if (config.waitingPeriod.type === "recommended" && config.waitingPeriod.daysRequired) {
    if (daysUntilWedding < config.waitingPeriod.daysRequired) {
      results.push({
        field: "timing",
        severity: "warning",
        message: `${config.stateName} strongly recommends signing at least ${config.waitingPeriod.daysRequired} days before the wedding. Signing too close to the wedding increases the risk of a duress challenge.`,
        stateSpecific: true,
      });
    }
  }

  // General timing warning
  if (daysUntilWedding < 14 && !config.waitingPeriod.hasMandatoryPeriod) {
    results.push({
      field: "timing",
      severity: "warning",
      message: "Signing a prenuptial agreement less than 2 weeks before the wedding may raise voluntariness concerns. Courts may view this as potential duress.",
      stateSpecific: false,
    });
  }
}

function validateUnconscionability(config: StateLegalConfig, results: ValidationResult[]): void {
  if (config.unconscionability.reviewTime === "dual_time") {
    results.push({
      field: "fairness",
      severity: "warning",
      message: `${config.stateName} reviews prenuptial agreements for fairness at BOTH the time of signing and the time of enforcement. An agreement that is fair when signed can be invalidated years later if circumstances change dramatically. Consider including periodic review or amendment provisions.`,
      stateSpecific: true,
    });
  }

  if (config.unconscionability.uniqueTest) {
    results.push({
      field: "fairness",
      severity: "info",
      message: `${config.stateName} standard: ${config.unconscionability.uniqueTest}`,
      stateSpecific: true,
    });
  }
}

function validateResearchDepth(config: StateLegalConfig, results: ValidationResult[]): void {
  if (config.researchDepth === "needs_verification") {
    results.push({
      field: "researchDepth",
      severity: "warning",
      message: `Our ${config.stateName} legal research is based on general framework analysis. We strongly recommend having an attorney licensed in ${config.stateName} review your agreement before signing.`,
      stateSpecific: true,
    });
  }
}

function validateUniqueRules(config: StateLegalConfig, results: ValidationResult[]): void {
  for (const rule of config.uniqueRules) {
    if (rule.severity === "critical") {
      results.push({
        field: rule.ruleId,
        severity: "error",
        message: `${config.stateName}: ${rule.description}`,
        stateSpecific: true,
      });
    } else if (rule.severity === "important") {
      results.push({
        field: rule.ruleId,
        severity: "warning",
        message: `${config.stateName}: ${rule.description}`,
        stateSpecific: true,
      });
    } else if (rule.severity === "informational") {
      results.push({
        field: "state_rules",
        severity: "info",
        message: `${config.stateName}: ${rule.description}`,
        stateSpecific: true,
      });
    }
  }
}
