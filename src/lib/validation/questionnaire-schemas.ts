// =============================================================================
// Zod Validation Schemas — One per questionnaire step
// Used to validate answers before marking a step complete.
//
// Each field uses .default("") so that missing/undefined fields get coerced
// to an empty string before the .min(1) check runs. This ensures users see
// our custom error messages ("First name is required") instead of a generic
// Zod "expected string, received undefined" error.
//
// .passthrough() allows extra keys (info-type question IDs, future fields)
// without causing validation failures.
// =============================================================================

import { z } from "zod";

/** Required string helper — treats undefined/missing as empty string */
const req = (msg: string) => z.string().default("").pipe(z.string().min(1, msg));

// ---------------------------------------------------------------------------
// Step 1: Introduction
// ---------------------------------------------------------------------------
export const introductionSchema = z.object({
  first_name: req("First name is required"),
  last_name: req("Last name is required"),
  date_of_birth: req("Date of birth is required"),
  email: z.string().default("").pipe(
    z.string().min(1, "Email is required").email("Please enter a valid email address")
  ),
  state_of_residence: req("State is required"),
  wedding_date: req("Wedding date is required"),
  previously_married: req("This question is required"),
  prenup_goals: z
    .array(z.string())
    .default([])
    .pipe(z.array(z.string()).min(1, "Please select at least one goal")),
}).passthrough();

// ---------------------------------------------------------------------------
// Step 2: Property
// ---------------------------------------------------------------------------
export const propertySchema = z.object({
  own_property_together: req("This question is required"),
  partner_one_employed: req("This question is required"),
  partner_one_employer: z.string().optional(),
  partner_two_employed: req("This question is required"),
  partner_two_employer: z.string().optional(),
  own_business: req("This question is required"),
  inheritance_treatment: req("This question is required"),
  gifts_acknowledgment: req("Please acknowledge to continue"),
}).passthrough();

// ---------------------------------------------------------------------------
// Step 3: Debts
// ---------------------------------------------------------------------------
export const debtsSchema = z.object({
  premarital_debt_acknowledgment: req("Please acknowledge to continue"),
  marital_debt_handling: req("Please select an option"),
  real_estate_liabilities: req("Please acknowledge to continue"),
}).passthrough();

// ---------------------------------------------------------------------------
// Step 4: Financial
// ---------------------------------------------------------------------------
export const financialSchema = z.object({
  income_taxes: req("Please acknowledge to continue"),
  joint_accounts_acknowledgment: req("Please acknowledge to continue"),
  financial_disclosure: req("Please acknowledge to continue"),
}).passthrough();

// ---------------------------------------------------------------------------
// Step 5: Spousal Support
// ---------------------------------------------------------------------------
export const spousalSupportSchema = z.object({
  spousal_support_approach: req("Please select an approach"),
}).passthrough();

// ---------------------------------------------------------------------------
// Step 6: Legal Representation
// ---------------------------------------------------------------------------
export const legalRepresentationSchema = z.object({
  partner1_attorney: req("This question is required"),
  partner2_attorney: req("This question is required"),
}).passthrough();

// ---------------------------------------------------------------------------
// Step 7: Optional Clauses
// ---------------------------------------------------------------------------
export const optionalClausesSchema = z.object({
  death_provision: req("Please select an option"),
  sunset_clause: req("Please select an option"),
  pet_clause: req("Please select an option"),
  life_insurance: req("Please select an option"),
  health_insurance: req("Please select an option"),
}).passthrough();

// ---------------------------------------------------------------------------
// Step 8: Additional Documents
// ---------------------------------------------------------------------------
export const additionalDocumentsSchema = z.object({
  language_translation: req("Please select an option"),
}).passthrough();

// ---------------------------------------------------------------------------
// Schema registry — keyed by stepId
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const questionnaireSchemas: Record<string, z.ZodType<any>> = {
  introduction: introductionSchema,
  property: propertySchema,
  debts: debtsSchema,
  financial: financialSchema,
  "spousal-support": spousalSupportSchema,
  "legal-representation": legalRepresentationSchema,
  "optional-clauses": optionalClausesSchema,
  "additional-documents": additionalDocumentsSchema,
};

// ---------------------------------------------------------------------------
// Validate helper — returns field-level errors
// ---------------------------------------------------------------------------

export type FieldErrors = Record<string, string>;

export function validateStep(
  stepId: string,
  answers: Record<string, unknown>
): { valid: boolean; errors: FieldErrors } {
  const schema = questionnaireSchemas[stepId];
  if (!schema) return { valid: true, errors: {} };

  const result = schema.safeParse(answers);
  if (result.success) return { valid: true, errors: {} };

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as string;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { valid: false, errors };
}
