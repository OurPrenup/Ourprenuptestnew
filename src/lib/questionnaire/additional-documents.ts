import { Question } from "./introduction";

export const additionalDocumentsQuestions: Question[] = [
  {
    id: "language_translation",
    type: "radio",
    question:
      "Would you like a translated summary of rights attached to your agreement?",
    helperText:
      "If either partner is more comfortable in a language other than English, a translated summary ensures both of you fully understand the terms you are agreeing to.",
    required: true,
    options: [
      {
        label: "Yes, I would like a translated summary",
        value: "yes",
        description:
          "A plain-language summary of key rights and obligations will be prepared in the requested language and attached to your agreement.",
      },
      {
        label: "No, a translation is not needed",
        value: "no",
        description:
          "Both partners are comfortable reviewing the agreement in English and do not need an additional translation.",
      },
    ],
  },
  {
    id: "translation_importance_info",
    type: "info",
    question: "Why Translated Summaries Matter",
    helperText:
      "Courts may question the enforceability of a prenuptial agreement if one partner did not fully understand what they were signing. Providing a translated summary in a partner's preferred language demonstrates good faith and helps ensure that both of you entered the agreement with complete understanding. This small step can make a meaningful difference in protecting your agreement down the road.",
    required: false,
  },
];

export const additionalDocumentsMeta = {
  locked: true,
};
