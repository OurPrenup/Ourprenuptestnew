import { ALL_STATES } from "./states";
import type { StateCode } from "./types";

const EXCLUDED_STATES = new Set<StateCode>(["LA"]);

export function isStateAvailable(stateCode: StateCode): boolean {
  if (EXCLUDED_STATES.has(stateCode)) return false;
  const config = ALL_STATES[stateCode];
  if (!config) return false;
  return config.researchDepth !== "needs_verification";
}

export function getUnavailableReason(stateCode: StateCode): string | null {
  if (EXCLUDED_STATES.has(stateCode)) {
    return "Louisiana requires a unique legal format that our platform does not yet support. Please consult a local attorney.";
  }
  const config = ALL_STATES[stateCode];
  if (config?.researchDepth === "needs_verification") {
    return `Our legal research for ${config.stateName} is still being verified. We strongly recommend attorney review for agreements in this state.`;
  }
  return null;
}
