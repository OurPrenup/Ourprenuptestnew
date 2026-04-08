// =============================================================================
// Document Generator — State-Specific Agreement Customization
// Returns terminology, statute refs, required language, and signature blocks.
// =============================================================================

import type { StateCode, StateLegalConfig } from "./types";
import { ALL_STATES } from "./states";
import { generateSigningInstructions } from "./signing-instructions";

// ---------------------------------------------------------------------------
// Output interfaces
// ---------------------------------------------------------------------------

export interface DocumentCustomization {
  stateCode: StateCode;
  stateName: string;
  terminology: string;
  recitalStatuteRefs: string[];
  requiredLanguage: RequiredLanguageBlock[];
  signatureBlocks: SignatureBlock[];
  notaryBlock: NotaryBlock | null;
  witnessBlocks: WitnessBlock[];
  signingInstructionsSummary: string;
}

export interface RequiredLanguageBlock {
  id: string;
  title: string;
  content: string;
  required: boolean;
}

export interface SignatureBlock {
  role: string;
  label: string;
  lines: string[];
}

export interface NotaryBlock {
  style: "standard" | "deed_style" | "authentic_act" | "acknowledgment";
  title: string;
  content: string;
}

export interface WitnessBlock {
  label: string;
  count: number;
  lines: string[];
}

// ---------------------------------------------------------------------------
// Main function
// ---------------------------------------------------------------------------

export function generateDocumentCustomization(
  stateCode: StateCode,
  options?: {
    includesSpousalSupport?: boolean;
    weddingDate?: Date;
  }
): DocumentCustomization {
  const config = ALL_STATES[stateCode];
  const instructions = generateSigningInstructions(stateCode, {
    weddingDate: options?.weddingDate,
  });

  return {
    stateCode,
    stateName: config.stateName,
    terminology: config.agreementTerminology,
    recitalStatuteRefs: buildRecitalRefs(config),
    requiredLanguage: buildRequiredLanguage(config, options),
    signatureBlocks: buildSignatureBlocks(config),
    notaryBlock: buildNotaryBlock(config),
    witnessBlocks: buildWitnessBlocks(config),
    signingInstructionsSummary: instructions.steps.join("\n"),
  };
}

// ---------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------

function buildRecitalRefs(config: StateLegalConfig): string[] {
  const refs: string[] = [];

  if (config.statuteCitations.length > 0) {
    refs.push(
      `This ${config.agreementTerminology} is entered into pursuant to ${config.statuteCitations.join("; ")}.`
    );
  } else {
    refs.push(
      `This ${config.agreementTerminology} is entered into pursuant to the laws of the State of ${config.stateName}.`
    );
  }

  if (config.propertyRegime === "community_property") {
    refs.push(
      `${config.stateName} is a community property state. Without this agreement, most property acquired during the marriage would be presumed community property and subject to equal division.`
    );
  }

  return refs;
}

function buildRequiredLanguage(
  config: StateLegalConfig,
  options?: { includesSpousalSupport?: boolean }
): RequiredLanguageBlock[] {
  const blocks: RequiredLanguageBlock[] = [];

  // Voluntariness acknowledgment (all states)
  blocks.push({
    id: "voluntariness",
    title: "Voluntary Execution",
    content:
      "Both parties acknowledge that they are entering into this agreement voluntarily, without duress, coercion, or undue influence from any person.",
    required: true,
  });

  // Financial disclosure acknowledgment
  blocks.push({
    id: "disclosure",
    title: "Financial Disclosure",
    content: buildDisclosureLanguage(config),
    required: true,
  });

  // Counsel acknowledgment
  blocks.push({
    id: "counsel",
    title: "Legal Counsel",
    content: buildCounselLanguage(config),
    required: true,
  });

  // CO plain-language waiver
  if (config.stateCode === "CO") {
    blocks.push({
      id: "co_plain_language",
      title: "Colorado Plain-Language Waiver Notice",
      content:
        "NOTICE: By entering into this agreement without independent legal counsel, each party acknowledges that they have been provided with a clear, plain-language explanation of the marital rights and obligations being modified or waived by this agreement, including but not limited to: the right to an equitable division of marital property, the right to spousal maintenance, and other rights conferred by Colorado law.",
      required: true,
    });
  }

  // CA fiduciary duty
  if (config.stateCode === "CA") {
    blocks.push({
      id: "ca_fiduciary",
      title: "California Fiduciary Duty Acknowledgment",
      content:
        "Both parties acknowledge that under California law, parties to a marriage owe each other fiduciary duties with respect to the management and control of community property. Each party acknowledges this duty and agrees that this agreement has been entered into with full knowledge of these fiduciary obligations.",
      required: true,
    });
  }

  // CA written waiver of counsel
  if (config.stateCode === "CA") {
    blocks.push({
      id: "ca_counsel_waiver",
      title: "Written Waiver of Counsel (California)",
      content:
        "If either party has not been represented by independent legal counsel in connection with this agreement, that party hereby acknowledges: (1) they have been advised in writing of the terms of this agreement and of the rights being waived; (2) they have been given the opportunity to seek independent counsel; and (3) they voluntarily elect to execute this agreement without independent counsel.",
      required: true,
    });
  }

  // MO six-word acknowledgment
  if (config.stateCode === "MO") {
    blocks.push({
      id: "mo_six_word",
      title: "Missouri Enforcement Standard Acknowledgment",
      content:
        "Both parties acknowledge and affirm that this agreement has been entered into freely, fairly, knowingly, understandingly, and in good faith, with full disclosure of all material assets, income, and liabilities.",
      required: true,
    });
  }

  // NY spousal support calculation (if applicable)
  if (config.stateCode === "NY" && options?.includesSpousalSupport) {
    blocks.push({
      id: "ny_spousal_calc",
      title: "New York Spousal Support Calculation",
      content:
        "In accordance with New York law, both parties acknowledge: the calculation of guideline maintenance based on actual incomes, as set forth in Schedule [X] attached hereto; the New York State guideline maintenance formula amount; and the specific dollar amount being waived or modified by this agreement. Both parties have reviewed and understand these calculations.",
      required: true,
    });
  }

  // NJ annexed statement reference
  if (config.stateCode === "NJ") {
    blocks.push({
      id: "nj_annexed",
      title: "New Jersey Annexed Asset Statement",
      content:
        "Attached hereto and incorporated herein as Schedule A is the Statement of Current Assets of each party, as required by N.J.S.A. § 37:2-33.",
      required: true,
    });
  }

  return blocks;
}

function buildDisclosureLanguage(config: StateLegalConfig): string {
  if (config.financialDisclosure.strictness === "strict") {
    if (config.stateCode === "MA") {
      return "Both parties have made full, complete, and detailed financial disclosure, including an itemized listing of all assets (with values), all income sources, and all liabilities. Each party has reviewed the other's complete financial information and acknowledges full understanding thereof.";
    }
    if (config.stateCode === "MN") {
      return "Both parties have provided a reasonably accurate description of all material facts relating to their income and property, including good-faith value estimates and the basis for those valuations, as required by Minn. Stat. § 519.11.";
    }
    return `Both parties have made full, fair, and complete financial disclosure. Each party has reviewed and acknowledges understanding of the other party's complete financial information, as required by ${config.stateName} law.`;
  }

  if (config.financialDisclosure.strictness === "soft") {
    return "Both parties have had the opportunity to review each other's financial information. Each party enters this agreement with adequate knowledge of the other's financial circumstances.";
  }

  return "Both parties have made fair and reasonable financial disclosure of their respective assets, income, and liabilities. Each party acknowledges receipt and review of the other party's financial information.";
}

function buildCounselLanguage(config: StateLegalConfig): string {
  switch (config.independentCounsel.requirement) {
    case "required":
      return "Both parties have been represented by independent legal counsel in the negotiation and execution of this agreement. Each party's attorney has reviewed this agreement and advised their client of its terms, effects, and the rights being waived.";
    case "conditionally_required":
      return `Each party has had the opportunity to consult with independent legal counsel. ${config.independentCounsel.conditions || ""} Each party understands the terms, effects, and the rights being waived by this agreement.`;
    case "required_for_spousal_support":
      return "Each party has had the opportunity to consult with independent legal counsel regarding this agreement. If this agreement modifies or eliminates spousal support, both parties have been represented by independent counsel with respect to those provisions.";
    case "opportunity_required":
      return "Each party has been afforded a meaningful opportunity to consult with independent legal counsel before executing this agreement. Each party acknowledges having had sufficient time and opportunity to seek legal advice.";
    default:
      return "Each party has been advised to seek independent legal counsel before signing this agreement. Each party acknowledges that they understand the terms, effects, and rights being modified or waived.";
  }
}

function buildSignatureBlocks(config: StateLegalConfig): SignatureBlock[] {
  const signatureNote = config.execution.wetInkRequired
    ? "Signature (wet ink required — electronic signatures are not valid)"
    : "Signature";

  const notarizationNote =
    config.execution.notarization === "required"
      ? `\nThis agreement must be notarized in ${config.stateName}.`
      : config.execution.notarization === "recommended"
        ? `\nNotarization is recommended in ${config.stateName} to strengthen enforceability.`
        : "";

  const witnessNote =
    config.execution.witnesses === "required"
      ? `\n${config.execution.witnessCount ?? 2} witness(es) required in ${config.stateName}.`
      : config.execution.witnesses === "recommended"
        ? `\nWitnesses are recommended in ${config.stateName} to strengthen enforceability.`
        : "";

  const stateNotes = (notarizationNote + witnessNote).trim();

  const blocks: SignatureBlock[] = [
    {
      role: "Party 1",
      label: "First Party",
      lines: [
        "___________________________________",
        signatureNote,
        "",
        "___________________________________",
        "Printed Name",
        "",
        "Date: ______________________________",
      ],
    },
    {
      role: "Party 2",
      label: "Second Party",
      lines: [
        "___________________________________",
        signatureNote,
        "",
        "___________________________________",
        "Printed Name",
        "",
        "Date: ______________________________",
      ],
    },
  ];

  if (stateNotes) {
    blocks.push({
      role: "instructions",
      label: `Signing Requirements — ${config.stateName}`,
      lines: stateNotes.split("\n").filter(Boolean),
    });
  }

  return blocks;
}

function buildNotaryBlock(config: StateLegalConfig): NotaryBlock | null {
  if (config.execution.notarizationType === "deed_style_ny") {
    return {
      style: "deed_style",
      title: "ACKNOWLEDGMENT (New York Deed-Style)",
      content: `STATE OF NEW YORK\nCOUNTY OF _______________\n\nOn the _____ day of _____________, 20___, before me, the undersigned, a Notary Public in and for said State, personally appeared _________________________, known to me or proved to me on the basis of satisfactory evidence to be the individual whose name is subscribed to the within instrument and acknowledged to me that he/she executed the same in his/her capacity, and that by his/her signature on the instrument, the individual, or the person upon behalf of which the individual acted, executed the instrument.\n\n___________________________________\nNotary Public\nMy Commission Expires: ______________\n\n[REPEAT FOR SECOND PARTY]`,
    };
  }

  if (config.execution.notarizationType === "authentic_act_la") {
    return {
      style: "authentic_act",
      title: "AUTHENTIC ACT (Louisiana)",
      content: `STATE OF LOUISIANA\nPARISH OF _______________\n\nBEFORE ME, the undersigned Notary Public, duly commissioned and qualified in and for the aforesaid Parish and State, and in the presence of the undersigned competent witnesses, personally came and appeared:\n\n_________________________ ("First Party")\n_________________________ ("Second Party")\n\nwho declared unto me, Notary, in the presence of the undersigned witnesses, that they have entered into this Matrimonial Agreement freely and voluntarily.\n\n___________________________________\nNotary Public\nBar Roll No.: ________________________\n\nWITNESSES:\n\n___________________________________\nWitness 1 (Print Name: ________________)\n\n___________________________________\nWitness 2 (Print Name: ________________)`,
    };
  }

  if (config.execution.notarizationType === "acknowledgment_nm") {
    return {
      style: "acknowledgment",
      title: "ACKNOWLEDGMENT (New Mexico)",
      content: `STATE OF NEW MEXICO\nCOUNTY OF _______________\n\nThis instrument was acknowledged before me on the _____ day of _____________, 20___, by _________________________ and _________________________.\n\n___________________________________\nNotary Public\nMy Commission Expires: ______________`,
    };
  }

  // Standard notary block
  if (config.execution.notarization === "required" || config.execution.notarization === "recommended") {
    return {
      style: "standard",
      title: "NOTARY ACKNOWLEDGMENT",
      content: `STATE OF ${config.stateName.toUpperCase()}\nCOUNTY OF _______________\n\nOn the _____ day of _____________, 20___, before me personally appeared _________________________ and _________________________, known to me (or proved to me on the basis of satisfactory evidence) to be the persons whose names are subscribed to the within instrument and acknowledged to me that they executed the same.\n\n___________________________________\nNotary Public\nMy Commission Expires: ______________`,
    };
  }

  return null;
}

function buildWitnessBlocks(config: StateLegalConfig): WitnessBlock[] {
  const count = config.execution.witnessCount;
  if (!count || config.execution.witnesses === "not_required") return [];

  const lines: string[] = [];
  for (let i = 1; i <= count; i++) {
    lines.push(
      `Witness ${i}:`,
      "",
      "___________________________________",
      "Signature",
      "",
      "___________________________________",
      "Printed Name",
      "",
      "Address: ___________________________",
      ""
    );
  }

  return [
    {
      label:
        config.execution.witnesses === "required"
          ? `WITNESSES (Required — ${count})`
          : `WITNESSES (Recommended — ${count})`,
      count,
      lines,
    },
  ];
}
