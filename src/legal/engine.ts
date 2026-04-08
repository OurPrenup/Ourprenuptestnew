// =============================================================================
// OurPrenup — State Legal Rules Engine
// Primary API for all state-specific legal lookups.
// =============================================================================

import type { StateCode, StateLegalConfig, ResearchDepth } from "./types";
import { ALL_STATES } from "./states";

// ---------------------------------------------------------------------------
// Core lookup
// ---------------------------------------------------------------------------

export function getStateLegalConfig(stateCode: StateCode): StateLegalConfig {
  return ALL_STATES[stateCode];
}

// ---------------------------------------------------------------------------
// Convenience boolean checks
// ---------------------------------------------------------------------------

export function isCommunityPropertyState(stateCode: StateCode): boolean {
  return ALL_STATES[stateCode].propertyRegime === "community_property";
}

export function isSpousalSupportDisabled(stateCode: StateCode): boolean {
  return ALL_STATES[stateCode].spousalSupport.disabled;
}

export function requiresNotarization(stateCode: StateCode): boolean {
  return ALL_STATES[stateCode].execution.notarization === "required";
}

export function requiresWitnesses(stateCode: StateCode): boolean {
  return ALL_STATES[stateCode].execution.witnesses === "required";
}

export function getWitnessCount(stateCode: StateCode): number {
  return ALL_STATES[stateCode].execution.witnessCount ?? 0;
}

export function requiresAttorney(stateCode: StateCode): boolean {
  const req = ALL_STATES[stateCode].independentCounsel.requirement;
  return req === "required" || req === "conditionally_required";
}

export function requiresAttorneyForSpousalSupport(stateCode: StateCode): boolean {
  return ALL_STATES[stateCode].independentCounsel.requirement === "required_for_spousal_support";
}

export function hasWaitingPeriod(stateCode: StateCode): boolean {
  return ALL_STATES[stateCode].waitingPeriod.hasMandatoryPeriod;
}

export function getResearchDepth(stateCode: StateCode): ResearchDepth {
  return ALL_STATES[stateCode].researchDepth;
}

export function isExcludedFromSelfService(stateCode: StateCode): boolean {
  return ALL_STATES[stateCode].platformNotes.selfServiceViability === "exclude";
}

export function hasDualTimeReview(stateCode: StateCode): boolean {
  return ALL_STATES[stateCode].unconscionability.reviewTime === "dual_time";
}

// ---------------------------------------------------------------------------
// Deadline calculator
// ---------------------------------------------------------------------------

export interface SigningDeadlineResult {
  /** A concrete deadline date, if calculable from the wedding date. */
  deadline: Date | null;
  /** A human-readable message describing the timing requirement. */
  message: string | null;
}

/**
 * Returns signing deadline information based on state rules.
 * For states like MN (before_wedding basis), returns a concrete deadline date.
 * For states like CA (from_final_draft basis), returns a descriptive message
 * since the deadline depends on when the final draft is presented, not the wedding date.
 * Returns nulls for both fields if no mandatory timing requirement.
 */
export function getSigningDeadline(
  stateCode: StateCode,
  weddingDate: Date
): SigningDeadlineResult {
  const config = ALL_STATES[stateCode];
  const wp = config.waitingPeriod;

  if (!wp.hasMandatoryPeriod || wp.daysRequired === null) {
    return { deadline: null, message: null };
  }

  if (wp.calculationBasis === "before_wedding") {
    // MN: must be signed X days before wedding
    const deadline = new Date(weddingDate);
    deadline.setDate(deadline.getDate() - wp.daysRequired);
    return { deadline, message: null };
  }

  // CA: 7 days from final draft to signing — can't compute a date without
  // knowing when the final draft was presented, so return a message instead.
  return {
    deadline: null,
    message: `${config.stateName} law requires at least ${wp.daysRequired} days between when your partner receives the final draft and when you both sign. Plan accordingly.`,
  };
}

// ---------------------------------------------------------------------------
// Backward-compatible exports
// ---------------------------------------------------------------------------

export const STATE_NAMES: Record<string, string> = Object.fromEntries(
  (Object.values(ALL_STATES) as StateLegalConfig[]).map((c) => [c.stateCode, c.stateName])
);

export function getStateName(stateCode: string): string {
  return STATE_NAMES[stateCode] || stateCode;
}

export function isValidStateCode(code: string): code is StateCode {
  return code in ALL_STATES;
}

// Re-export types and data
export type { StateCode, StateLegalConfig, ResearchDepth } from "./types";
export { ALL_STATES } from "./states";
