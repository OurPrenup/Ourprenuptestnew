# Claude Code Implementation Prompt — OurPrenup State-by-State Legal Rules Engine

> **Copy everything below this line and paste it into Claude Code alongside the `OurPrenup_Complete_50State_Reference.md` file.**

---

## Context

I'm building **OurPrenup**, an online prenuptial agreement builder. Attached is `OurPrenup_Complete_50State_Reference.md` — a comprehensive, 50-state legal reference covering every rule, requirement, edge case, and platform implication for prenuptial agreements across all US states. This is the single source of truth. **Do not omit, summarize, or simplify any detail from this file.** Every field, every caveat, every unique rule matters — they directly affect what users see, what the platform enforces, and whether the generated agreement is legally defensible.

## What I Need You to Build

A **state-specific legal rules engine** that powers the entire prenup builder. When a user selects their state, the platform must dynamically adapt every aspect of the experience — form fields, signing instructions, validation rules, warnings, required documents, disabled features, and generated agreement language — based on that state's specific legal requirements.

### 1. State Legal Data Model

Create a structured data file (JSON, TypeScript, or whatever fits our stack best) that encodes **every field** from the reference document for all 50 states. Each state entry must include, at minimum:

```
- state name, abbreviation
- research depth level (deeply_researched | verified | partially_verified | needs_verification)
- property regime (community_property | equitable_distribution)
  - community property variant if applicable (standard | umpa_wisconsin | opt_in_alaska)
- UPAA/UPMAA status (upaa | upmaa | not_adopted | own_framework)
  - statute citation(s)
- execution requirements:
  - writing required (always true)
  - both signatures required (always true)
  - notarization (required | recommended | not_required)
  - notarization type if special (deed_style_ny | authentic_act_la | acknowledgment_nm | standard)
  - witnesses (required | recommended | not_required)
    - witness count if required
    - witness rules (e.g., "notary_cannot_be_witness" for MN, "one_must_be_notary" for GA)
  - acknowledgment options (for AR: array of 4 methods)
- financial disclosure:
  - strictness level (strict | standard | soft)
  - waiver permitted (boolean)
  - special requirements (e.g., "annexed_asset_statement" for NJ, "basis_for_valuation" for MN, "line_by_line_itemization" for MA)
- independent counsel:
  - requirement level (required | conditionally_required | required_for_spousal_support | opportunity_required | recommended | not_required)
  - conditions (e.g., "required_if_agreement_not_inherently_fair" for AL, "required_if_modifying_spousal_support" for CA)
  - written waiver required if declining (boolean — true for CA, TX)
- waiting period:
  - has_mandatory_period (boolean)
  - period details (e.g., "7_days_from_final_draft" for CA, "7_days_before_wedding" for MN, "30_days_recommended" for NH/SC)
  - type (mandatory | recommended | none)
- spousal support:
  - can_modify (boolean)
  - disabled (boolean — true for IA, NM, SD)
  - safety_valve type (public_assistance | extreme_hardship_IN | dependent_spouse_NC | none_removed_DE)
  - special rules (e.g., "attorney_required_for_support_modification" for CA, "cannot_limit_during_marriage" for NV, "guideline_calculation_required" for NY)
- unconscionability:
  - review_time (at_execution | dual_time | at_enforcement)
  - burden_of_proof if special (e.g., "clear_and_convincing" for NJ)
  - unique_test (e.g., "or_conjunction" for NV — each ground independent; "and_conjunction" for RI — must prove both)
  - three_option_remedy (boolean — true for ND)
  - presumption_of_fraud (boolean — true for NV)
- child provisions: always "cannot_predetermine" (universal)
- unique rules: array of objects, each with:
  - rule_id (slug)
  - description
  - platform_impact (what the platform must do differently)
  - severity (critical | important | informational)
- key case law: array of case citations with short descriptions
- platform notes:
  - self_service_viability (excellent | good | moderate | limited | exclude)
  - required_platform_actions: array of specific things the platform MUST do
  - warnings: array of user-facing warnings/disclosures
  - marketing_notes: state-specific selling points (e.g., IN postnups unavailable)
```

### 2. State Selection Integration

When a user picks their state in the builder flow:

- **Load all rules** for that state from the data model
- **Adapt the UI dynamically:**
  - If spousal support is disabled (IA, NM, SD): hide/disable the entire spousal support section with an explanation ("New Mexico law prohibits prenuptial agreements from modifying spousal support rights")
  - If notarization is required: show a non-dismissible banner and add notary acknowledgment blocks to the generated document
  - If witnesses are required: show witness count, any special rules (e.g., GA: "You'll need a notary public plus one additional witness"), and add witness signature blocks
  - If a waiting period applies: calculate and display the deadline ("Your agreement must be signed by [date] — at least 7 days before your wedding on [wedding_date]")
  - If attorney is required or conditionally required: show appropriate messaging and, for CA spousal support, gate that section behind attorney confirmation
  - If community property state: load community property-specific clauses (transmutation, separate property classification, commingling rules)
  - If the state has special disclosure requirements: adapt the financial disclosure form (e.g., NJ: generate an annexed asset statement as a separate attached schedule; MN: require "basis for valuation" field; MA: require line-by-line itemization)

### 3. Signing Instructions Generator

Based on the state's execution requirements, generate a **customized signing ceremony instruction sheet** that tells the user exactly how to execute their agreement. This must account for:

- How many people need to be present (e.g., MN: minimum 5 — both parties + 2 witnesses + notary)
- Whether notary can also serve as witness (MN: no; GA: notary IS one of the witnesses)
- Which acknowledgment option to use (AR: default to Option 4 — 2 disinterested witnesses)
- Deed-style acknowledgment language (NY: must conform to Real Property Law § 309-a)
- Authentic act format (LA: notary + 2 witnesses simultaneously present)
- Parish/county filing instructions if applicable (LA)
- Wet-ink requirements (MD: no digital signatures)

### 4. Generated Agreement Customization

The actual prenuptial agreement document must be dynamically customized per state:

- Use correct terminology ("marital property agreement" for WI, "matrimonial agreement" for LA, "prenuptial agreement" for most states)
- Include state-specific statute references in recitals
- Add required acknowledgment/waiver language (CO: plain-language waiver for unrepresented parties; CA: separate written waiver of counsel)
- Include fiduciary duty acknowledgment (CA)
- Add state-specific enforcement language
- Include severability clauses
- Generate appropriate signature blocks, witness blocks, and notary blocks per state requirements

### 5. Validation & Safety Rails

Build validation that **prevents users from generating an unenforceable agreement:**

- Block generation if required fields for that state are incomplete
- Warn if agreement appears one-sided in states with presumption of fraud (NV) or dual-time review (CT, MA, MN, SC)
- Flag if spousal support waiver is attempted in IA, NM, or SD
- Warn about timing if wedding date is within the mandatory waiting period
- For states marked `needs_verification`: display a disclaimer ("Legal requirements for [state] are based on framework research. We strongly recommend attorney review before signing.")
- For SC: require attorney package or display prominent "South Carolina courts apply heightened scrutiny to prenuptial agreements" warning

### 6. Research Depth Indicators

Surface the research depth level to the user in an honest, trust-building way:

- **Deeply Researched / Verified**: "Our [state] prenup is built on thoroughly researched state law including [statute citation] and key court decisions."
- **Partially Verified**: "Our [state] prenup follows the established legal framework. We recommend attorney review to confirm all requirements."
- **Needs Deep Verification**: "Legal requirements for [state] are based on general framework research. Attorney review is strongly recommended before signing."

### 7. Key Cross-State Decision Tables

Build lookup tables the platform can query for quick decisions:

| Decision | States |
|----------|--------|
| Disable spousal support section | IA, NM, SD |
| Require notarization | CA, GA, LA, MO (or witnesses), NM, NY, SC, WV, + MN |
| Require witnesses | AR (option), FL (real estate), GA, LA, MI, MN, + OH (verify) |
| Require attorney involvement | AL (conditional), CA (spousal support), SC (both parties) |
| Mandatory waiting period | CA (7 days), MN (7 days) |
| Community property clauses needed | AZ, CA, ID, LA, NV, NM, TX, WA, WI, + AK (opt-in) |
| Dual-time unconscionability warning | CT, MA, MN, SC |
| UPMAA compliance language | CO, ND |
| Deed-style acknowledgment | NY |
| Annexed asset statement | NJ |
| Parish filing instructions | LA |
| Written counsel waiver | CA, TX |
| Statutory form option | WI |

## Implementation Notes

- **Do not truncate, approximate, or generalize any state's rules.** The difference between "notarization required" and "acknowledgment required" matters. The difference between "public assistance safety valve" and "extreme hardship override" matters. These distinctions determine enforceability.
- **Every unique rule flagged in the reference must have a corresponding platform behavior.** If the reference says "amendment by conduct" is possible in NM, the platform should warn users about it. If NV has a "presumption of fraud," the platform must generate the four-part Fick acknowledgment language.
- **Treat the reference document as a database schema**, not as prose to be summarized. Every field in every state entry maps to a platform behavior.
- **When in doubt, be more cautious.** If a state's rules are ambiguous, default to stricter requirements (require notarization rather than just recommend it, etc.).
- **The data model must be easy to update.** As we verify the remaining 14 states and as laws change, we need to be able to update individual state entries without touching the rest of the codebase.

## File Structure Suggestion

```
/src/legal/
  states/              # Individual state config files or one big states.json
  engine.ts            # Core rules engine — takes state code, returns all rules
  signing-instructions.ts   # Generates signing ceremony instructions
  document-generator.ts     # Customizes agreement language per state
  validators.ts        # Pre-generation validation rules
  cross-state-tables.ts     # Quick-lookup decision tables
  types.ts             # TypeScript interfaces for the data model
```

Please read the entire `OurPrenup_Complete_50State_Reference.md` file carefully before writing any code. Every detail in that file exists for a reason and must be represented in the implementation. Start with the data model and types, then build outward.
