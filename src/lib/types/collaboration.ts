// =============================================================================
// Shared types for the collaboration / conflict resolution system
// =============================================================================

export interface ConflictItem {
  id: string | null;
  stepId: string;
  questionId: string;
  primaryAnswer: unknown;
  partnerAnswer: unknown;
  resolvedAnswer: unknown | null;
  resolvedBy: string | null;
  status: "unresolved" | "resolved";
}
