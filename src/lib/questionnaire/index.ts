export type { Question } from "./introduction";
export { introductionQuestions } from "./introduction";
export { spousalSupportQuestions, spousalSupportMeta } from "./spousal-support";
export {
  legalRepresentationQuestions,
  legalRepresentationMeta,
} from "./legal-representation";
export {
  optionalClausesQuestions,
  optionalClausesMeta,
} from "./optional-clauses";
export {
  additionalDocumentsQuestions,
  additionalDocumentsMeta,
} from "./additional-documents";

export const questionnaireSteps = [
  {
    id: "introduction",
    label: "Introduction",
    path: "/questionnaire/introduction",
    locked: false,
  },
  {
    id: "property",
    label: "Property",
    path: "/questionnaire/property",
    locked: false,
  },
  {
    id: "debts",
    label: "Debts & Liabilities",
    path: "/questionnaire/debts",
    locked: false,
  },
  {
    id: "financial",
    label: "Financial Considerations",
    path: "/questionnaire/financial",
    locked: false,
  },
  {
    id: "spousal-support",
    label: "Spousal Support",
    path: "/questionnaire/spousal-support",
    locked: true,
  },
  {
    id: "legal-representation",
    label: "Disclosure & Legal",
    path: "/questionnaire/legal-representation",
    locked: true,
  },
  {
    id: "optional-clauses",
    label: "Optional Clauses",
    path: "/questionnaire/optional-clauses",
    locked: true,
  },
  {
    id: "additional-documents",
    label: "Additional Documents",
    path: "/questionnaire/additional-documents",
    locked: true,
  },
];
