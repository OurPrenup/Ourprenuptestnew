// =============================================================================
// Financial Disclosure Exhibit — Tabular PDF of each party's financial data
// =============================================================================

import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { FinancialDisclosureSummary } from "@/lib/document-assembly/types";
import { baseStyles, theme } from "./styles";
import { StyleSheet } from "@react-pdf/renderer";

const s = StyleSheet.create({
  tableContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 6,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.borderLight,
    paddingVertical: 4,
    minHeight: 20,
  },
  colDescription: {
    width: "50%",
    paddingHorizontal: 6,
    fontSize: 10,
  },
  colValue: {
    width: "25%",
    paddingHorizontal: 6,
    fontSize: 10,
    textAlign: "right" as const,
  },
  colOwner: {
    width: "25%",
    paddingHorizontal: 6,
    fontSize: 10,
  },
  headerText: {
    fontFamily: theme.fonts.heading,
    fontSize: 10,
  },
  emptyMessage: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.italic,
    marginTop: 4,
    marginBottom: 12,
  },
});

// ---------------------------------------------------------------------------
// Category display config
// ---------------------------------------------------------------------------
const CATEGORIES: { key: keyof FinancialDisclosureSummary; label: string }[] = [
  { key: "accounts", label: "Bank Accounts & Cash" },
  { key: "assets", label: "Other Assets" },
  { key: "income", label: "Income (Past 3 Years)" },
  { key: "realEstate", label: "Real Estate" },
  { key: "vehicles", label: "Vehicles" },
  { key: "business", label: "Business Ownership" },
  { key: "debts", label: "Debts & Liabilities" },
  { key: "inheritance", label: "Potential Inheritance" },
  { key: "trusts", label: "Trusts" },
];

// ---------------------------------------------------------------------------
// Single disclosure table
// ---------------------------------------------------------------------------
function DisclosureTable({
  category,
  items,
}: {
  category: string;
  items: { description: string; value: string; owner: string }[];
}) {
  return (
    <View style={s.tableContainer}>
      <Text style={baseStyles.subsectionTitle}>{category}</Text>
      {items.length === 0 ? (
        <Text style={s.emptyMessage}>No items disclosed.</Text>
      ) : (
        <>
          <View style={s.headerRow}>
            <Text style={[s.colDescription, s.headerText]}>Description</Text>
            <Text style={[s.colValue, s.headerText]}>Value</Text>
            <Text style={[s.colOwner, s.headerText]}>Owner</Text>
          </View>
          {items.map((item, i) => (
            <View key={i} style={s.row}>
              <Text style={s.colDescription}>{item.description}</Text>
              <Text style={s.colValue}>{item.value}</Text>
              <Text style={s.colOwner}>{item.owner}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Single party exhibit page
// ---------------------------------------------------------------------------
function PartyExhibit({
  exhibitLabel,
  partyName,
  disclosure,
}: {
  exhibitLabel: string;
  partyName: string;
  disclosure: FinancialDisclosureSummary;
}) {
  return (
    <Page size="LETTER" style={baseStyles.page} wrap>
      <Text style={baseStyles.header} fixed>
        {exhibitLabel} — FINANCIAL DISCLOSURE — {partyName.toUpperCase()}
      </Text>

      <Text style={baseStyles.title}>{exhibitLabel}</Text>
      <Text style={baseStyles.subtitle}>
        Financial Disclosure of {partyName}
      </Text>

      {CATEGORIES.map(({ key, label }) => (
        <DisclosureTable
          key={key}
          category={label}
          items={disclosure[key] ?? []}
        />
      ))}

      <View style={{ marginTop: 24 }}>
        <Text style={baseStyles.paragraph}>
          I, {partyName}, hereby certify that the above financial disclosure is
          true, complete, and accurate to the best of my knowledge as of the
          date of this Agreement.
        </Text>
        <View style={{ marginTop: 16 }}>
          <View style={baseStyles.signatureLine} />
          <Text style={baseStyles.signatureLabel}>
            {partyName} — Signature
          </Text>
          <Text style={baseStyles.signatureLabel}>
            Date: ______________________________
          </Text>
        </View>
      </View>

      <Text
        style={baseStyles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </Page>
  );
}

// ---------------------------------------------------------------------------
// Main disclosure exhibit document
// ---------------------------------------------------------------------------

export function DisclosureExhibitDocument({
  party1Name,
  party2Name,
  party1Disclosure,
  party2Disclosure,
}: {
  party1Name: string;
  party2Name: string;
  party1Disclosure: FinancialDisclosureSummary | null;
  party2Disclosure: FinancialDisclosureSummary | null;
}) {
  const emptyDisclosure: FinancialDisclosureSummary = {
    accounts: [],
    assets: [],
    income: [],
    realEstate: [],
    vehicles: [],
    business: [],
    debts: [],
    inheritance: [],
    trusts: [],
  };

  return (
    <Document
      title="Financial Disclosure Exhibits"
      author="OurPrenup"
      subject="Financial Disclosure"
    >
      <PartyExhibit
        exhibitLabel="EXHIBIT A"
        partyName={party1Name}
        disclosure={party1Disclosure ?? emptyDisclosure}
      />
      <PartyExhibit
        exhibitLabel="EXHIBIT B"
        partyName={party2Name}
        disclosure={party2Disclosure ?? emptyDisclosure}
      />
    </Document>
  );
}
