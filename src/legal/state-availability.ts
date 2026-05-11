import { ALL_STATES } from "./states";
import type { StateCode } from "./types";

const EXCLUDED_STATES = new Set<StateCode>(["LA", "WV"]);

export function isStateAvailable(stateCode: StateCode): boolean {
  if (EXCLUDED_STATES.has(stateCode)) return false;
  const config = ALL_STATES[stateCode];
  if (!config) return false;
  if (config.platformNotes.selfServiceViability === "exclude") return false;
  return true;
}

export function getUnavailableReason(stateCode: StateCode): string | null {
  if (EXCLUDED_STATES.has(stateCode)) {
    if (stateCode === "LA") {
      return "Louisiana requires a unique legal format (authentic act) that our platform does not yet support. Please consult a local attorney.";
    }
    if (stateCode === "WV") {
      return "West Virginia's prenuptial agreement requirements are still being verified. Please consult a local attorney.";
    }
    return "This state is not currently available on our platform. Please consult a local attorney.";
  }
  const config = ALL_STATES[stateCode];
  if (!config) return null;
  if (config.platformNotes.selfServiceViability === "exclude") {
    return `${config.stateName} requires independent legal counsel for both parties. Self-service prenup creation is not available for this state.`;
  }
  return null;
}
