// =============================================================================
// Summary PDF Template — Plain-language summary of the prenup
// =============================================================================

import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { DocumentContent } from "@/lib/document-assembly/types";
import { baseStyles } from "./styles";

function formatDate(iso: string): string {
  if (!iso) return "_______________";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "_______________";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function describeSpousalSupport(
  approach: DocumentContent["provisions"]["spousalSupportApproach"]
): string {
  switch (approach) {
    case "waiver":
      return "Both of you have agreed to waive any right to spousal support (alimony) from the other, no matter what.";
    case "no_waiver":
      return "Neither of you has waived the right to spousal support. If the marriage ends, a court would decide based on state law.";
    case "marriage_length":
      return "If the marriage ends, one partner may owe the other a lump-sum payment based on how long you were married.";
    case "conditional_children":
      return "Spousal support is waived unless you have children together. If children are involved, state law applies.";
    case "lump_sum":
      return "If the marriage ends, one partner will pay the other a fixed one-time amount.";
    default:
      return "Spousal support will be determined by state law.";
  }
}

function describeDebt(
  handling: DocumentContent["provisions"]["maritalDebtHandling"]
): string {
  switch (handling) {
    case "name_based":
      return "Whoever's name is on the debt is responsible for it.";
    case "shared_equally":
      return "All debts taken on during the marriage are shared equally.";
    case "state_law":
      return "State law will determine how debts are divided.";
    default:
      return "Debt handling follows state law.";
  }
}

export function SummaryDocument({ content }: { content: DocumentContent }) {
  return (
    <Document
      title={`Agreement Summary — ${content.party1.fullName} & ${content.party2.fullName}`}
      author="OurPrenup"
      subject="Plain-Language Summary"
    >
      <Page size="LETTER" style={baseStyles.page}>
        <Text style={baseStyles.header} fixed>
          PLAIN-LANGUAGE SUMMARY — FOR REFERENCE ONLY
        </Text>

        <Text style={baseStyles.title}>
          Your Prenup at a Glance
        </Text>
        <Text style={baseStyles.subtitle}>
          This is a simplified summary — not the legal agreement itself.
        </Text>

        {/* Parties */}
        <Text style={baseStyles.sectionTitle}>Who&apos;s Involved</Text>
        <Text style={baseStyles.paragraph}>
          This agreement is between {content.party1.fullName} and{" "}
          {content.party2.fullName}, who plan to marry on{" "}
          {formatDate(content.weddingDate)}.
        </Text>
        <Text style={baseStyles.paragraph}>
          The agreement is governed by the laws of {content.stateName}.
        </Text>

        {/* Separate Property */}
        <Text style={baseStyles.sectionTitle}>
          What You Keep (Separate Property)
        </Text>
        <Text style={baseStyles.paragraph}>
          Everything each of you owned before the marriage stays with the
          original owner. This includes bank accounts, investments, real
          estate, and personal belongings.
        </Text>
        <Text style={baseStyles.paragraph}>
          {content.provisions.inheritanceTreatment === "keep_separate"
            ? "Inheritances received during the marriage will remain separate property — they go to the person who received them."
            : "Inheritances during the marriage will be handled according to state law."}
        </Text>

        {/* Debts */}
        <Text style={baseStyles.sectionTitle}>Debts</Text>
        <Text style={baseStyles.paragraph}>
          <Text style={baseStyles.paragraphBold}>Before marriage: </Text>
          Any debt either of you brought into the marriage is that person&apos;s
          sole responsibility.
        </Text>
        <Text style={baseStyles.paragraph}>
          <Text style={baseStyles.paragraphBold}>During marriage: </Text>
          {describeDebt(content.provisions.maritalDebtHandling)}
        </Text>

        {/* Spousal Support */}
        <Text style={baseStyles.sectionTitle}>Spousal Support</Text>
        <Text style={baseStyles.paragraph}>
          {describeSpousalSupport(content.provisions.spousalSupportApproach)}
        </Text>

        {/* Optional Clauses */}
        {(content.provisions.deathProvision ||
          content.provisions.sunsetClause ||
          content.provisions.petClause !== "no_clause" ||
          content.provisions.lifeInsurance ||
          content.provisions.healthInsuranceContinue) ? (
          <>
            <Text style={baseStyles.sectionTitle}>Optional Provisions</Text>
            {content.provisions.deathProvision ? (
              <Text style={baseStyles.paragraph}>
                • <Text style={baseStyles.paragraphBold}>Death provision: </Text>
                The agreement includes terms for what happens if one partner
                passes away during the marriage.
              </Text>
            ) : null}
            {content.provisions.sunsetClause ? (
              <Text style={baseStyles.paragraph}>
                • <Text style={baseStyles.paragraphBold}>Sunset clause: </Text>
                This agreement expires after a set number of years.
              </Text>
            ) : null}
            {content.provisions.petClause !== "no_clause" ? (
              <Text style={baseStyles.paragraph}>
                • <Text style={baseStyles.paragraphBold}>Pets: </Text>
                {content.provisions.petClause === "one_partner"
                  ? "One partner keeps all pets."
                  : content.provisions.petClause === "shared_custody"
                    ? "Pets will be shared between both partners."
                    : "Each pet will be assigned individually."}
              </Text>
            ) : null}
            {content.provisions.lifeInsurance ? (
              <Text style={baseStyles.paragraph}>
                • <Text style={baseStyles.paragraphBold}>Life insurance: </Text>
                Both partners will maintain life insurance naming the other as
                beneficiary.
              </Text>
            ) : null}
            {content.provisions.healthInsuranceContinue ? (
              <Text style={baseStyles.paragraph}>
                • <Text style={baseStyles.paragraphBold}>Health insurance: </Text>
                After a divorce, the providing partner continues coverage for
                a transition period.
              </Text>
            ) : null}
          </>
        ) : null}

        {/* Signing */}
        <Text style={baseStyles.sectionTitle}>Signing Requirements</Text>
        {content.signingInstructionsSummary
          .split("\n")
          .filter((line: string) => line.trim())
          .map((step: string, i: number) => (
            <Text key={i} style={baseStyles.paragraph}>
              {step}
            </Text>
          ))}

        {/* Disclaimer */}
        <View style={{ marginTop: 24, padding: 12, backgroundColor: "#f8f9fa" }}>
          <Text style={baseStyles.paragraphBold}>Important Disclaimer</Text>
          <Text style={baseStyles.smallText}>
            This summary is provided for informational purposes only and is not
            a substitute for the actual {content.terminology}. In the event of
            any conflict between this summary and the Agreement, the Agreement
            controls. Both parties are encouraged to consult with independent
            legal counsel before signing.
          </Text>
        </View>

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
