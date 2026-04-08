// =============================================================================
// PDF Render — Converts React-PDF components to Buffer
// Runs server-side only (API routes / server actions).
// =============================================================================

import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentContent } from "@/lib/document-assembly/types";
import { PrenupDocument } from "./prenup-template";
import { SummaryDocument } from "./summary-template";
import { DisclosureExhibitDocument } from "./disclosure-exhibit";

/**
 * Render the main prenuptial agreement PDF.
 */
export async function renderPrenupPdf(
  content: DocumentContent
): Promise<Buffer> {
  const element = React.createElement(PrenupDocument, { content });
  return renderToBuffer(element as never);
}

/**
 * Render the plain-language summary PDF.
 */
export async function renderSummaryPdf(
  content: DocumentContent
): Promise<Buffer> {
  const element = React.createElement(SummaryDocument, { content });
  return renderToBuffer(element as never);
}

/**
 * Render the financial disclosure exhibits PDF.
 */
export async function renderDisclosureExhibitPdf(
  content: DocumentContent
): Promise<Buffer> {
  const element = React.createElement(DisclosureExhibitDocument, {
    party1Name: content.party1.fullName,
    party2Name: content.party2.fullName,
    party1Disclosure: content.party1Disclosure,
    party2Disclosure: content.party2Disclosure,
  });
  return renderToBuffer(element as never);
}
