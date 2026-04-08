// Shared progress tracking logic
// In the future this will connect to a database/localStorage.
// For now it provides the structure and types.

export interface StepProgress {
  id: string;
  label: string;
  status: "completed" | "active" | "locked";
}

export const DASHBOARD_STEPS = [
  { id: "invite", label: "Invite Partner" },
  { id: "questionnaire", label: "Questionnaire" },
  { id: "financial-disclosure", label: "Financial Disclosure" },
  { id: "collaboration", label: "Collaborate" },
  { id: "documents", label: "Generate Document" },
  { id: "attorney", label: "Attorney Review" },
  { id: "review-notarize", label: "E-Sign & Notarize" },
] as const;

export const QUESTIONNAIRE_STEPS = [
  { id: "introduction", label: "Introduction" },
  { id: "property", label: "Property" },
  { id: "debts", label: "Debts & Liabilities" },
  { id: "financial", label: "Financial Considerations" },
  { id: "spousal-support", label: "Spousal Support" },
  { id: "legal-representation", label: "Disclosure & Legal" },
  { id: "optional-clauses", label: "Optional Clauses" },
  { id: "additional-documents", label: "Additional Documents" },
] as const;

/**
 * Compute dashboard step statuses based on completed step IDs.
 * Rules:
 *  - A step is "completed" if its id is in the completedSteps set
 *  - The first non-completed step is "active"
 *  - Everything after that is "locked"
 */
export function computeStepStatuses(
  completedStepIds: Set<string>
): StepProgress[] {
  let foundActive = false;

  return DASHBOARD_STEPS.map((step) => {
    if (completedStepIds.has(step.id)) {
      return { ...step, status: "completed" as const };
    }
    if (!foundActive) {
      foundActive = true;
      return { ...step, status: "active" as const };
    }
    return { ...step, status: "locked" as const };
  });
}

/**
 * Check if all questionnaire sub-steps are completed.
 */
export function isQuestionnaireComplete(completedStepIds: Set<string>): boolean {
  return QUESTIONNAIRE_STEPS.every((s) => completedStepIds.has(s.id));
}

/**
 * Calculate overall progress percentage.
 * The questionnaire dashboard step is weighted by its 8 sub-steps,
 * so each sub-step contributes proportionally to overall progress.
 *
 * Total weight: 6 (non-questionnaire dashboard steps) + 8 (questionnaire sub-steps) = 14
 */
export function computeProgressPercentage(completedStepIds: Set<string>): number {
  const NON_QUESTIONNAIRE_STEPS = DASHBOARD_STEPS.filter(
    (s) => s.id !== "questionnaire"
  );
  const totalWeight = NON_QUESTIONNAIRE_STEPS.length + QUESTIONNAIRE_STEPS.length; // 14

  // Count completed non-questionnaire dashboard steps
  const completedDashboard = NON_QUESTIONNAIRE_STEPS.filter((s) =>
    completedStepIds.has(s.id)
  ).length;

  // Count completed questionnaire sub-steps
  const completedQuestionnaire = QUESTIONNAIRE_STEPS.filter((s) =>
    completedStepIds.has(s.id)
  ).length;

  return Math.round(((completedDashboard + completedQuestionnaire) / totalWeight) * 100);
}
