import { Question } from "./introduction";

export const legalRepresentationQuestions: Question[] = [
  {
    id: "disclosure_intro",
    type: "info",
    question: "Your Right to Full Disclosure and Legal Advice",
    helperText:
      "For a prenuptial agreement to hold up in court, both partners need to fully disclose their finances and have the opportunity to seek independent legal advice. This section helps ensure your agreement is built on a foundation of honesty and fairness — which protects both of you.",
    required: false,
  },
  {
    id: "partner1_attorney",
    type: "radio",
    question: "Has Partner 1 consulted with an independent attorney about this agreement?",
    helperText:
      "An independent attorney is a lawyer who represents only your interests, separate from your partner's legal counsel.",
    required: true,
    options: [
      {
        label: "No, but I acknowledge my right to do so",
        value: "no_acknowledge",
        description:
          "I understand I have the right to consult with my own attorney and am choosing to proceed without one at this time.",
      },
      {
        label: "Yes, I have consulted with an attorney",
        value: "yes",
        description:
          "I have spoken with an independent attorney who has reviewed or will review this agreement on my behalf.",
      },
    ],
    proTip:
      "Even if you feel confident about your agreement, having an attorney review it can catch issues you might not have considered. Many family law attorneys offer flat-rate prenup reviews.",
  },
  {
    id: "partner2_attorney",
    type: "radio",
    question: "Has Partner 2 consulted with an independent attorney about this agreement?",
    helperText:
      "Courts look favorably on agreements where both parties had the chance to receive independent legal guidance.",
    required: true,
    options: [
      {
        label: "No, but I acknowledge my right to do so",
        value: "no_acknowledge",
        description:
          "I understand I have the right to consult with my own attorney and am choosing to proceed without one at this time.",
      },
      {
        label: "Yes, I have consulted with an attorney",
        value: "yes",
        description:
          "I have spoken with an independent attorney who has reviewed or will review this agreement on my behalf.",
      },
    ],
  },
  {
    id: "confidentiality_clause_info",
    type: "info",
    question: "Confidentiality of Your Financial Details",
    helperText:
      "Your prenuptial agreement will include a confidentiality clause. This means that the financial information both of you share during this process — such as income, assets, and debts — will remain private between you and your partner. Neither party may disclose these details to third parties except as required by law or court order.",
    required: false,
  },
];

export const legalRepresentationMeta = {
  locked: true,
};
