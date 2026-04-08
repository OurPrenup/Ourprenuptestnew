// =============================================================================
// Signing Instructions Generator
// Produces step-by-step ceremony instructions per state.
// =============================================================================

import type { StateCode, StateLegalConfig } from "./types";
import { ALL_STATES } from "./states";

export interface SigningPerson {
  role: string;
  count: number;
  constraints: string | null;
}

export interface SigningInstructions {
  stateCode: StateCode;
  stateName: string;
  steps: string[];
  requiredPeople: SigningPerson[];
  totalPeopleCount: number;
  specialNotes: string[];
  deadline: Date | null;
  /** Message describing the timing requirement when a concrete deadline can't be calculated (e.g., CA's from_final_draft basis). */
  deadlineMessage: string | null;
  agreementTerminology: string;
}

export function generateSigningInstructions(
  stateCode: StateCode,
  options?: { weddingDate?: Date }
): SigningInstructions {
  const config = ALL_STATES[stateCode];
  const steps: string[] = [];
  const people: SigningPerson[] = [];
  const notes: string[] = [];

  // Both parties always required
  people.push({ role: "Signing parties", count: 2, constraints: null });

  // Step 1: Review
  steps.push(
    `Both parties review the final ${config.agreementTerminology} and all attached financial schedules.`
  );

  // Waiting period step
  if (config.waitingPeriod.hasMandatoryPeriod && config.waitingPeriod.daysRequired) {
    if (config.waitingPeriod.calculationBasis === "from_final_draft") {
      steps.push(
        `Wait at least ${config.waitingPeriod.daysRequired} calendar days after the final draft is presented before signing. Substantive changes restart the clock.`
      );
    } else if (config.waitingPeriod.calculationBasis === "before_wedding") {
      steps.push(
        `Sign at least ${config.waitingPeriod.daysRequired} days before the wedding ceremony. Agreements signed within this window are presumed invalid.`
      );
    }
  }

  // Counsel acknowledgment
  if (
    config.independentCounsel.requirement === "required" ||
    config.independentCounsel.requirement === "conditionally_required"
  ) {
    steps.push(
      "Each party must have their own independent attorney review the agreement before signing."
    );
    notes.push(
      `Attorney involvement is required in ${config.stateName}. ${config.independentCounsel.conditions || ""}`
    );
  } else if (config.independentCounsel.requirement === "required_for_spousal_support") {
    steps.push(
      "If the agreement modifies or eliminates spousal support, each party must have independent counsel."
    );
  } else if (config.independentCounsel.requirement === "opportunity_required") {
    steps.push(
      "Each party must have had a meaningful opportunity to consult with an independent attorney before signing."
    );
  }

  // Written counsel waiver
  if (config.independentCounsel.writtenWaiverRequired) {
    steps.push(
      "If either party declines attorney representation, execute a separate written waiver of counsel."
    );
  }

  // Signing step
  steps.push(`Both parties sign the ${config.agreementTerminology}.`);

  // Witnesses
  if (config.execution.witnesses === "required" && config.execution.witnessCount) {
    const witnessCount = config.execution.witnessCount;
    steps.push(
      `${witnessCount} witness${witnessCount > 1 ? "es" : ""} must be present and sign the agreement.`
    );
    people.push({
      role: "Witness",
      count: witnessCount,
      constraints: config.execution.witnessRules,
    });

    if (config.execution.witnessRules) {
      notes.push(config.execution.witnessRules);
    }
  } else if (config.execution.witnesses === "recommended" && config.execution.witnessCount) {
    steps.push(
      `Have ${config.execution.witnessCount} witness${config.execution.witnessCount > 1 ? "es" : ""} present and sign (strongly recommended).`
    );
    people.push({
      role: "Witness (recommended)",
      count: config.execution.witnessCount,
      constraints: config.execution.witnessRules,
    });
  }

  // Notarization
  if (config.execution.notarization === "required") {
    addNotarizationStep(config, steps, people, notes);
  } else {
    steps.push(
      `Have the agreement notarized. While ${config.stateName} does not legally require notarization, we strongly recommend it. Notarized agreements are significantly harder to challenge in court.`
    );
    people.push({
      role: "Notary Public (recommended)",
      count: 1,
      constraints: null,
    });
  }

  // Acknowledgment options (AR)
  if (config.execution.acknowledgmentOptions?.length) {
    notes.push(
      `${config.stateName} offers ${config.execution.acknowledgmentOptions.length} acknowledgment options. ` +
      config.execution.acknowledgmentOptions
        .map((opt, i) => `(${i + 1}) ${opt.description}`)
        .join(". ")
    );
  }

  // State-specific notes
  addStateSpecificNotes(stateCode, config, steps, notes);

  // Calculate deadline
  let deadline: Date | null = null;
  let deadlineMessage: string | null = null;
  if (config.waitingPeriod.hasMandatoryPeriod && config.waitingPeriod.daysRequired) {
    if (config.waitingPeriod.calculationBasis === "before_wedding" && options?.weddingDate) {
      deadline = new Date(options.weddingDate);
      deadline.setDate(deadline.getDate() - config.waitingPeriod.daysRequired);
    } else if (config.waitingPeriod.calculationBasis === "from_final_draft") {
      deadlineMessage = `${config.stateName} law requires at least ${config.waitingPeriod.daysRequired} days between when your partner receives the final draft and when you both sign. Plan accordingly.`;
    }
  }

  // Final step
  steps.push("Keep the original signed agreement in a safe location. Provide copies to both parties and their attorneys.");

  const totalPeopleCount = people.reduce((sum, p) => sum + p.count, 0);

  return {
    stateCode,
    stateName: config.stateName,
    steps,
    requiredPeople: people,
    totalPeopleCount,
    specialNotes: notes,
    deadline,
    deadlineMessage,
    agreementTerminology: config.agreementTerminology,
  };
}

function addNotarizationStep(
  config: StateLegalConfig,
  steps: string[],
  people: SigningPerson[],
  notes: string[]
): void {
  switch (config.execution.notarizationType) {
    case "deed_style_ny":
      steps.push(
        "Have the agreement acknowledged with a deed-style acknowledgment before a Notary Public. Each party must appear before the notary, orally confirm they signed, and the notary must verify identity and add their seal with specific acknowledgment language conforming to Real Property Law § 309-a."
      );
      notes.push(
        "New York requires deed-style acknowledgment — regular notarization is NOT sufficient. Incorrect notary language can invalidate the agreement."
      );
      people.push({
        role: "Notary Public",
        count: 1,
        constraints: "Must perform deed-style acknowledgment per Real Property Law § 309-a",
      });
      break;

    case "authentic_act_la":
      steps.push(
        "Execute the agreement as an authentic act: both parties, 2 witnesses, and a notary must all sign at the same time and place."
      );
      notes.push(
        "Louisiana requires an authentic act. All participants (both parties, 2 witnesses, notary) must be present simultaneously."
      );
      people.push({
        role: "Notary Public",
        count: 1,
        constraints: "Must be present with both parties and witnesses simultaneously for authentic act execution",
      });
      break;

    case "acknowledgment_nm":
      steps.push(
        "Have the agreement acknowledged (notarized) as required by N.M. Stat. Ann. § 40-3A-3."
      );
      people.push({
        role: "Notary Public",
        count: 1,
        constraints: null,
      });
      break;

    default:
      steps.push(
        `Have the agreement notarized. Notarization is required in ${config.stateName}.`
      );
      people.push({
        role: "Notary Public",
        count: 1,
        constraints: null,
      });
      break;
  }
}

function addStateSpecificNotes(
  stateCode: StateCode,
  config: StateLegalConfig,
  steps: string[],
  notes: string[]
): void {
  if (stateCode === "LA") {
    steps.push(
      "File the agreement with the clerk of court in your local parish. If the agreement involves real estate, also file in the parish where the property is located."
    );
    notes.push(
      "All signing must be completed BEFORE the wedding ceremony. Louisiana does not recognize prenuptial agreements executed after marriage."
    );
  }

  if (stateCode === "CA") {
    notes.push(
      "California imposes a fiduciary duty between spouses regarding community property. The agreement should include a fiduciary duty acknowledgment."
    );
  }

  if (stateCode === "MN") {
    notes.push(
      "Financial disclosure must include the BASIS for all valuations — explain how each value was determined."
    );
  }

  if (config.execution.wetInkRequired) {
    notes.push(
      `${config.stateName} requires wet-ink (physical) signatures. Electronic/digital signatures are not accepted.`
    );
  }

  if (config.spousalSupport.disabled) {
    notes.push(
      `${config.stateName} does not allow spousal support provisions in prenuptial agreements. Any spousal support terms will not be enforceable.`
    );
  }
}
