// =============================================================================
// PDF Shared Styles — Consistent typography and spacing for all PDF templates
// =============================================================================

import { StyleSheet } from "@react-pdf/renderer";

export const theme = {
  colors: {
    navy: "#1a2332",
    navyLight: "#2d3a4a",
    text: "#333333",
    textSecondary: "#666666",
    border: "#cccccc",
    borderLight: "#e5e5e5",
    background: "#f8f9fa",
    white: "#ffffff",
    accent: "#2563eb",
  },
  fonts: {
    body: "Helvetica",
    heading: "Helvetica-Bold",
    italic: "Helvetica-Oblique",
  },
};

export const baseStyles = StyleSheet.create({
  page: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingLeft: 72,
    paddingRight: 72,
    fontFamily: theme.fonts.body,
    fontSize: 11,
    lineHeight: 1.6,
    color: theme.colors.text,
  },
  // Headings
  title: {
    fontFamily: theme.fonts.heading,
    fontSize: 18,
    color: theme.colors.navy,
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: theme.fonts.italic,
    fontSize: 11,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 13,
    color: theme.colors.navy,
    marginTop: 20,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    paddingBottom: 4,
  },
  subsectionTitle: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    color: theme.colors.navyLight,
    marginTop: 12,
    marginBottom: 4,
  },
  // Text
  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 8,
    textAlign: "justify" as const,
  },
  paragraphBold: {
    fontFamily: theme.fonts.heading,
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 8,
  },
  smallText: {
    fontSize: 9,
    color: theme.colors.textSecondary,
    lineHeight: 1.4,
  },
  // Layout
  row: {
    flexDirection: "row" as const,
    alignItems: "flex-start" as const,
  },
  spacer: {
    height: 12,
  },
  largeSpacer: {
    height: 24,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginVertical: 16,
  },
  // Signature
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text,
    width: 250,
    marginTop: 24,
    marginBottom: 4,
  },
  signatureLabel: {
    fontSize: 9,
    color: theme.colors.textSecondary,
    marginBottom: 16,
  },
  // Page numbering
  pageNumber: {
    position: "absolute" as const,
    fontSize: 9,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center" as const,
    color: theme.colors.textSecondary,
  },
  // Header
  header: {
    position: "absolute" as const,
    fontSize: 8,
    top: 30,
    left: 72,
    right: 72,
    textAlign: "center" as const,
    color: theme.colors.textSecondary,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.borderLight,
    paddingBottom: 8,
  },
  // Tables
  tableRow: {
    flexDirection: "row" as const,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.borderLight,
    paddingVertical: 4,
  },
  tableHeader: {
    flexDirection: "row" as const,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 6,
    backgroundColor: theme.colors.background,
  },
  tableCell: {
    fontSize: 10,
    paddingHorizontal: 4,
  },
  tableCellBold: {
    fontFamily: theme.fonts.heading,
    fontSize: 10,
    paddingHorizontal: 4,
  },
});
