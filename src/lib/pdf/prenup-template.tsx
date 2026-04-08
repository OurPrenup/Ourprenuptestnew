// =============================================================================
// Prenup PDF Template — Main prenuptial agreement document
// Uses @react-pdf/renderer to produce a professional legal document.
// =============================================================================

import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { DocumentContent } from "@/lib/document-assembly/types";
import { baseStyles } from "./styles";

// ---------------------------------------------------------------------------
// Helper: format date for display
// ---------------------------------------------------------------------------
function formatDate(iso: string): string {
  if (!iso) return "_______________";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// ---------------------------------------------------------------------------
// Helper: article number tracking
// ---------------------------------------------------------------------------
function useArticleCounter() {
  let count = 0;
  return () => {
    count += 1;
    return toRoman(count);
  };
}

function toRoman(num: number): string {
  const map: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let result = "";
  let remaining = num;
  for (const [value, symbol] of map) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Spousal support description
// ---------------------------------------------------------------------------
function describeSpousalSupport(
  approach: DocumentContent["provisions"]["spousalSupportApproach"]
): string {
  switch (approach) {
    case "waiver":
      return "Both parties hereby waive any and all rights to spousal support, alimony, or maintenance from the other party, regardless of the circumstances at the time of any dissolution of the marriage.";
    case "no_waiver":
      return "Neither party waives or modifies any rights to spousal support. In the event of dissolution, spousal support shall be determined in accordance with applicable state law at the time of the proceedings.";
    case "marriage_length":
      return "In the event of dissolution, one party shall pay the other a lump-sum payment calculated based on the duration of the marriage, as follows: For each full year of marriage, the higher-earning party shall pay the lower-earning party a sum to be determined by the court, taking into account the standard of living established during the marriage.";
    case "conditional_children":
      return "Both parties waive spousal support in the event of dissolution, provided that no children have been born to or adopted by the parties during the marriage. If children have been born to or adopted by the parties, spousal support shall be determined in accordance with applicable state law.";
    case "lump_sum":
      return "In the event of dissolution, one party shall pay the other a fixed lump-sum payment as full and final settlement of any spousal support obligation. The specific amount shall be set forth in a separate schedule attached to this agreement.";
    default:
      return "Spousal support shall be determined in accordance with applicable state law.";
  }
}

// ---------------------------------------------------------------------------
// Marital debt description
// ---------------------------------------------------------------------------
function describeDebtHandling(
  approach: DocumentContent["provisions"]["maritalDebtHandling"]
): string {
  switch (approach) {
    case "name_based":
      return "Debts incurred during the marriage shall be the sole responsibility of the party in whose name the debt was incurred. Neither party shall be liable for debts incurred solely by the other party during the marriage.";
    case "shared_equally":
      return "All debts incurred during the marriage, regardless of which party incurred them, shall be considered joint marital obligations and shall be divided equally between the parties in the event of dissolution.";
    case "state_law":
      return "The division of debts incurred during the marriage shall be governed by applicable state law in effect at the time of any dissolution proceedings.";
    default:
      return "Marital debt shall be handled in accordance with applicable state law.";
  }
}

// ---------------------------------------------------------------------------
// Main PDF Component
// ---------------------------------------------------------------------------

export function PrenupDocument({ content }: { content: DocumentContent }) {
  const nextArticle = useArticleCounter();

  return (
    <Document
      title={`Prenuptial Agreement — ${content.party1.fullName} & ${content.party2.fullName}`}
      author="OurPrenup"
      subject="Prenuptial Agreement"
    >
      {/* ================================================================= */}
      {/* PAGE 1: Title + Recitals                                          */}
      {/* ================================================================= */}
      <Page size="LETTER" style={baseStyles.page}>
        {/* Header */}
        <Text style={baseStyles.header} fixed>
          {content.terminology.toUpperCase()} — {content.party1.lastName} &{" "}
          {content.party2.lastName}
        </Text>

        {/* Title */}
        <View style={{ marginTop: 20 }}>
          <Text style={baseStyles.title}>
            {content.terminology.toUpperCase()}
          </Text>
          <Text style={baseStyles.subtitle}>
            State of {content.stateName}
          </Text>
        </View>

        {/* Preamble */}
        <Text style={baseStyles.paragraph}>
          This {content.terminology} (the &quot;Agreement&quot;) is entered into
          on _________________, 20___, by and between:
        </Text>

        <View style={{ marginLeft: 24, marginBottom: 12 }}>
          <Text style={baseStyles.paragraphBold}>
            {content.party1.fullName} (&quot;Party 1&quot;)
          </Text>
          {content.party1.dateOfBirth ? (
            <Text style={baseStyles.smallText}>
              Date of Birth: {formatDate(content.party1.dateOfBirth)}
            </Text>
          ) : null}
          <View style={baseStyles.spacer} />
          <Text style={baseStyles.paragraphBold}>
            {content.party2.fullName} (&quot;Party 2&quot;)
          </Text>
          {content.party2.dateOfBirth ? (
            <Text style={baseStyles.smallText}>
              Date of Birth: {formatDate(content.party2.dateOfBirth)}
            </Text>
          ) : null}
        </View>

        <Text style={baseStyles.paragraph}>
          collectively referred to as the &quot;Parties.&quot;
        </Text>

        {/* Recitals */}
        <Text style={baseStyles.sectionTitle}>RECITALS</Text>
        <Text style={baseStyles.paragraph}>
          WHEREAS, the Parties intend to marry on or about{" "}
          {formatDate(content.weddingDate)}; and
        </Text>
        <Text style={baseStyles.paragraph}>
          WHEREAS, each Party desires to define their respective rights and
          obligations regarding property, debts, and financial matters during the
          marriage and in the event of its dissolution; and
        </Text>
        {content.recitalStatuteRefs.map((ref, i) => (
          <Text key={i} style={baseStyles.paragraph}>
            WHEREAS, {ref}
            {i < content.recitalStatuteRefs.length - 1 ? " and" : ""}
          </Text>
        ))}
        <Text style={baseStyles.paragraph}>
          NOW, THEREFORE, in consideration of the mutual promises and covenants
          contained herein, and for other good and valuable consideration, the
          receipt and sufficiency of which are hereby acknowledged, the Parties
          agree as follows:
        </Text>

        {/* Page number */}
        <Text
          style={baseStyles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* ================================================================= */}
      {/* PAGE 2+: Articles                                                  */}
      {/* ================================================================= */}
      <Page size="LETTER" style={baseStyles.page} wrap>
        <Text style={baseStyles.header} fixed>
          {content.terminology.toUpperCase()} — {content.party1.lastName} &{" "}
          {content.party2.lastName}
        </Text>

        {/* ARTICLE: Separate Property */}
        <Text style={baseStyles.sectionTitle}>
          ARTICLE {nextArticle()}. SEPARATE PROPERTY
        </Text>
        <Text style={baseStyles.paragraph}>
          All property owned by either Party prior to the marriage, including but
          not limited to real property, personal property, bank accounts,
          investments, and retirement accounts, shall remain the separate
          property of that Party and shall not be subject to division in the
          event of dissolution.
        </Text>
        {content.provisions.inheritanceTreatment === "keep_separate" ? (
          <Text style={baseStyles.paragraph}>
            Any inheritance received by either Party during the marriage,
            whether by will, trust, intestate succession, or otherwise, shall
            remain the separate property of the receiving Party.
          </Text>
        ) : (
          <Text style={baseStyles.paragraph}>
            The treatment of inheritances received during the marriage shall be
            governed by applicable state law.
          </Text>
        )}
        <Text style={baseStyles.paragraph}>
          Gifts directed specifically to one Party shall remain that Party&apos;s
          separate property. Gifts given to both Parties jointly shall be
          considered marital property.
        </Text>

        {/* ARTICLE: Marital Property */}
        <Text style={baseStyles.sectionTitle}>
          ARTICLE {nextArticle()}. MARITAL PROPERTY
        </Text>
        <Text style={baseStyles.paragraph}>
          Property acquired by either Party during the marriage, except as
          otherwise provided in this Agreement, shall be classified and divided
          in accordance with the laws of the State of {content.stateName} in
          effect at the time of any dissolution proceedings.
        </Text>
        {content.provisions.ownPropertyTogether ? (
          <Text style={baseStyles.paragraph}>
            The Parties acknowledge that they currently own property together.
            Any jointly-held property shall be treated as marital property
            subject to equitable division unless otherwise specified in a
            schedule attached hereto.
          </Text>
        ) : null}

        {/* ARTICLE: Pre-Marital Debts */}
        <Text style={baseStyles.sectionTitle}>
          ARTICLE {nextArticle()}. PRE-MARITAL DEBTS
        </Text>
        <Text style={baseStyles.paragraph}>
          All debts and financial obligations incurred by either Party prior to
          the marriage shall remain the sole responsibility of the Party who
          incurred them. Neither Party shall be liable for the pre-marital debts
          of the other.
        </Text>

        {/* ARTICLE: Marital Debts */}
        <Text style={baseStyles.sectionTitle}>
          ARTICLE {nextArticle()}. MARITAL DEBTS
        </Text>
        <Text style={baseStyles.paragraph}>
          {describeDebtHandling(content.provisions.maritalDebtHandling)}
        </Text>

        {/* ARTICLE: Spousal Support */}
        <Text style={baseStyles.sectionTitle}>
          ARTICLE {nextArticle()}. SPOUSAL SUPPORT
        </Text>
        <Text style={baseStyles.paragraph}>
          {describeSpousalSupport(content.provisions.spousalSupportApproach)}
        </Text>

        {/* ARTICLE: Financial Disclosure */}
        <Text style={baseStyles.sectionTitle}>
          ARTICLE {nextArticle()}. FINANCIAL DISCLOSURE
        </Text>
        <Text style={baseStyles.paragraph}>
          Each Party represents and warrants that they have made full, fair, and
          complete disclosure of their respective assets, income, and
          liabilities to the other Party. A detailed schedule of each Party&apos;s
          financial information is attached hereto as Exhibit A (Party 1) and
          Exhibit B (Party 2) and incorporated herein by reference.
        </Text>

        {/* ARTICLE: Business Interests */}
        {(content.party1.ownsBusiness || content.party2.ownsBusiness) ? (
          <>
            <Text style={baseStyles.sectionTitle}>
              ARTICLE {nextArticle()}. BUSINESS INTERESTS
            </Text>
            <Text style={baseStyles.paragraph}>
              Any business interest owned by either Party prior to the marriage
              shall remain the separate property of that Party, including any
              appreciation in value attributable to market forces or the
              individual efforts of the owning Party. However, to the extent that
              marital efforts or marital funds contribute to the growth of a
              pre-marital business, the non-owning Party may have a claim to a
              portion of that growth as determined by applicable state law.
            </Text>
          </>
        ) : null}

        {/* Optional clauses */}
        {content.provisions.deathProvision ? (
          <>
            <Text style={baseStyles.sectionTitle}>
              ARTICLE {nextArticle()}. RIGHTS UPON DEATH
            </Text>
            <Text style={baseStyles.paragraph}>
              In the event of the death of either Party during the marriage, the
              surviving Party shall retain all rights provided by this Agreement
              with respect to separate property. The surviving Party&apos;s rights to
              marital property, elective share, and intestate succession shall
              be governed by applicable state law unless superseded by the
              decedent&apos;s estate plan.
            </Text>
          </>
        ) : null}

        {content.provisions.sunsetClause ? (
          <>
            <Text style={baseStyles.sectionTitle}>
              ARTICLE {nextArticle()}. SUNSET PROVISION
            </Text>
            <Text style={baseStyles.paragraph}>
              This Agreement shall automatically terminate and be of no further
              force or effect upon the _____ anniversary of the Parties&apos;
              marriage, unless the Parties execute a written extension or
              renewal prior to that date. Upon termination, all rights and
              obligations of the Parties shall be governed by applicable state
              law.
            </Text>
          </>
        ) : null}

        {content.provisions.petClause !== "no_clause" ? (
          <>
            <Text style={baseStyles.sectionTitle}>
              ARTICLE {nextArticle()}. PET CUSTODY
            </Text>
            <Text style={baseStyles.paragraph}>
              {content.provisions.petClause === "one_partner"
                ? "In the event of dissolution, all pets owned or acquired during the marriage shall remain with one designated Party as agreed upon by both Parties."
                : content.provisions.petClause === "shared_custody"
                  ? "In the event of dissolution, the Parties agree to a shared custody arrangement for all pets owned or acquired during the marriage, with a schedule and terms to be agreed upon in good faith."
                  : "In the event of dissolution, pets shall be divided between the Parties based on individual circumstances, with each pet assigned to the Party best suited to provide for its care."}
            </Text>
          </>
        ) : null}

        {content.provisions.lifeInsurance ? (
          <>
            <Text style={baseStyles.sectionTitle}>
              ARTICLE {nextArticle()}. LIFE INSURANCE
            </Text>
            <Text style={baseStyles.paragraph}>
              During the marriage, each Party agrees to maintain a life insurance
              policy naming the other Party as a beneficiary, in an amount
              reasonably sufficient to provide for the surviving Party&apos;s
              financial security.
            </Text>
          </>
        ) : null}

        {content.provisions.healthInsuranceContinue ? (
          <>
            <Text style={baseStyles.sectionTitle}>
              ARTICLE {nextArticle()}. HEALTH INSURANCE
            </Text>
            <Text style={baseStyles.paragraph}>
              In the event of dissolution, the Party providing health insurance
              coverage to the other Party agrees to maintain such coverage for a
              reasonable transition period not to exceed twelve (12) months from
              the date the dissolution is finalized, to the extent permitted by
              the applicable insurance plan.
            </Text>
          </>
        ) : null}

        {/* Required language blocks from legal engine */}
        {content.requiredLanguage.map((block) => (
          <View key={block.id}>
            <Text style={baseStyles.sectionTitle}>
              ARTICLE {nextArticle()}. {block.title.toUpperCase()}
            </Text>
            <Text style={baseStyles.paragraph}>{block.content}</Text>
          </View>
        ))}

        {/* ARTICLE: General Provisions */}
        <Text style={baseStyles.sectionTitle}>
          ARTICLE {nextArticle()}. GENERAL PROVISIONS
        </Text>
        <Text style={baseStyles.subsectionTitle}>Entire Agreement</Text>
        <Text style={baseStyles.paragraph}>
          This Agreement, together with all exhibits and schedules attached
          hereto, constitutes the entire agreement between the Parties with
          respect to the subject matter hereof and supersedes all prior
          negotiations, representations, warranties, commitments, offers,
          and agreements, whether written or oral.
        </Text>
        <Text style={baseStyles.subsectionTitle}>Amendments</Text>
        <Text style={baseStyles.paragraph}>
          This Agreement may not be modified, amended, or supplemented except by
          a written instrument signed by both Parties and, where required by
          applicable law, notarized.
        </Text>
        <Text style={baseStyles.subsectionTitle}>Severability</Text>
        <Text style={baseStyles.paragraph}>
          If any provision of this Agreement is found to be invalid or
          unenforceable by a court of competent jurisdiction, the remaining
          provisions shall continue in full force and effect.
        </Text>
        <Text style={baseStyles.subsectionTitle}>Governing Law</Text>
        <Text style={baseStyles.paragraph}>
          This Agreement shall be governed by and construed in accordance with
          the laws of the State of {content.stateName}.
        </Text>
        <Text style={baseStyles.subsectionTitle}>
          Confidentiality
        </Text>
        <Text style={baseStyles.paragraph}>
          The Parties agree to keep the terms of this Agreement and all
          financial information exchanged in connection herewith confidential,
          except as required by law or court order, or as necessary to enforce
          the terms of this Agreement.
        </Text>

        {/* Page number */}
        <Text
          style={baseStyles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* ================================================================= */}
      {/* SIGNATURE PAGE                                                     */}
      {/* ================================================================= */}
      <Page size="LETTER" style={baseStyles.page}>
        <Text style={baseStyles.header} fixed>
          {content.terminology.toUpperCase()} — {content.party1.lastName} &{" "}
          {content.party2.lastName}
        </Text>

        <Text style={baseStyles.sectionTitle}>SIGNATURES</Text>
        <Text style={baseStyles.paragraph}>
          IN WITNESS WHEREOF, the Parties have executed this{" "}
          {content.terminology} as of the date first written above.
        </Text>

        {/* Signature blocks from legal engine (includes state-specific notes) */}
        {content.signatureBlocks.map((block, i) => {
          const partyName =
            block.role === "Party 1"
              ? content.party1.fullName
              : block.role === "Party 2"
                ? content.party2.fullName
                : null;

          return (
            <View key={i} style={{ marginTop: i === 0 ? 24 : 16 }}>
              {block.role === "instructions" ? (
                <>
                  <Text style={baseStyles.subsectionTitle}>{block.label}</Text>
                  {block.lines.map((line, li) => (
                    <Text key={li} style={baseStyles.smallText}>{line}</Text>
                  ))}
                </>
              ) : (
                <>
                  {block.lines.map((line, li) => (
                    <Text key={li} style={baseStyles.signatureLabel}>{line}</Text>
                  ))}
                  {partyName ? (
                    <Text style={baseStyles.signatureLabel}>
                      {partyName} — {block.role}
                    </Text>
                  ) : null}
                </>
              )}
            </View>
          );
        })}

        {/* Witness blocks */}
        {content.witnessBlocks.map((wb, i) => (
          <View key={i} style={{ marginTop: 24 }}>
            <Text style={baseStyles.subsectionTitle}>{wb.label}</Text>
            {Array.from({ length: wb.count }).map((_, wi) => (
              <View key={wi} style={{ marginTop: 12 }}>
                <View style={baseStyles.signatureLine} />
                <Text style={baseStyles.signatureLabel}>
                  Witness {wi + 1} — Signature
                </Text>
                <Text style={baseStyles.signatureLabel}>
                  Printed Name: ______________________________
                </Text>
                <Text style={baseStyles.signatureLabel}>
                  Address: ______________________________
                </Text>
              </View>
            ))}
          </View>
        ))}

        {/* Notary block */}
        {content.notaryBlock ? (
          <View style={{ marginTop: 24 }} break>
            <Text style={baseStyles.sectionTitle}>
              {content.notaryBlock.title}
            </Text>
            <Text style={baseStyles.paragraph}>
              {content.notaryBlock.content}
            </Text>
          </View>
        ) : null}

        {/* Page number */}
        <Text
          style={baseStyles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
