// =============================================================================
// Auto-derived cross-state lookup tables
// All tables are computed from state data — never hardcoded separately.
// =============================================================================

import type { StateCode, StateLegalConfig } from "./types";
import { ALL_STATES } from "./states";

function statesWhere(predicate: (config: StateLegalConfig) => boolean): Set<StateCode> {
  return new Set(
    (Object.entries(ALL_STATES) as [StateCode, StateLegalConfig][])
      .filter(([, config]) => predicate(config))
      .map(([code]) => code)
  );
}

/** IA, NM, SD — spousal support cannot be modified in prenups */
export const SPOUSAL_SUPPORT_DISABLED_STATES = statesWhere(
  (c) => c.spousalSupport.disabled
);

/** States where notarization is legally required (not just recommended) */
export const NOTARIZATION_REQUIRED_STATES = statesWhere(
  (c) => c.execution.notarization === "required"
);

/** States where witnesses are legally required */
export const WITNESS_REQUIRED_STATES = statesWhere(
  (c) => c.execution.witnesses === "required"
);

/** States where attorney involvement is required or conditionally required */
export const ATTORNEY_REQUIRED_STATES = statesWhere(
  (c) =>
    c.independentCounsel.requirement === "required" ||
    c.independentCounsel.requirement === "conditionally_required" ||
    c.independentCounsel.requirement === "required_for_spousal_support"
);

/** States with mandatory waiting periods */
export const MANDATORY_WAITING_PERIOD_STATES = statesWhere(
  (c) => c.waitingPeriod.hasMandatoryPeriod
);

/** AZ, CA, ID, LA, NV, NM, TX, WA, WI */
export const COMMUNITY_PROPERTY_STATES = statesWhere(
  (c) => c.propertyRegime === "community_property"
);

/** AK — opt-in community property */
export const OPT_IN_COMMUNITY_PROPERTY_STATES = statesWhere(
  (c) => c.communityPropertyVariant === "opt_in_alaska"
);

/** CT, MA, MN, SC — unconscionability reviewed at both execution and enforcement */
export const DUAL_TIME_UNCONSCIONABILITY_STATES = statesWhere(
  (c) => c.unconscionability.reviewTime === "dual_time"
);

/** CO, ND — adopted UPMAA (stricter than UPAA) */
export const UPMAA_STATES = statesWhere(
  (c) => c.upaaStatus === "upmaa"
);

/** CA, TX — require written counsel waiver if declining representation */
export const WRITTEN_COUNSEL_WAIVER_STATES = statesWhere(
  (c) => c.independentCounsel.writtenWaiverRequired
);

/** SC (and conditionally AL) — excluded from self-service */
export const EXCLUDED_FROM_SELF_SERVICE = statesWhere(
  (c) => c.platformNotes.selfServiceViability === "exclude"
);

/** States with three-option unconscionability remedy (ND) */
export const THREE_OPTION_REMEDY_STATES = statesWhere(
  (c) => c.unconscionability.threeOptionRemedy
);

/** NV — presumption of fraud where agreement greatly disfavors one party */
export const PRESUMPTION_OF_FRAUD_STATES = statesWhere(
  (c) => c.unconscionability.presumptionOfFraud
);
