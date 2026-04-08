import { Question } from "./introduction";

export const financialQuestions: Question[] = [
  {
    id: "financial_intro",
    type: "info",
    question: "Financial considerations for your marriage",
    helperText:
      "This section covers a few important financial topics that come up during marriage — things like taxes, joint bank accounts, and financial transparency. Most of these are straightforward acknowledgments, but they're worth understanding because they can have a real impact on how your prenup works in practice.",
    required: false,
  },
  {
    id: "income_taxes",
    type: "radio",
    question:
      "How you file your taxes (jointly or separately) won't change the terms of your prenup. Does that make sense?",
    helperText:
      "Many couples wonder whether filing jointly somehow merges their finances in the eyes of their prenup. It doesn't. Your tax filing status is a separate decision, and choosing to file jointly for the tax benefits won't override anything in your agreement.",
    required: true,
    options: [{ label: "Understood", value: "understood" }],
    proTip:
      "Filing jointly often comes with tax advantages, so don't feel like your prenup forces you into filing separately. Talk to a tax professional about which approach saves you the most.",
  },
  {
    id: "joint_accounts_info",
    type: "info",
    question: "A word about joint bank accounts",
    helperText:
      "Opening a joint bank account is a common and practical step for married couples — it makes paying shared bills much easier. However, it's important to know that mixing separate property into a joint account can blur the lines. Once separate funds are \"commingled\" with shared money, it can become difficult to prove what was originally yours alone. This doesn't mean you shouldn't have a joint account — just be mindful about how you use it.",
    required: false,
    proTip:
      "A simple strategy many couples use: maintain one joint account for shared expenses (rent, groceries, utilities) while keeping individual accounts for personal savings and separate property. This gives you the best of both worlds.",
  },
  {
    id: "joint_accounts_acknowledgment",
    type: "radio",
    question:
      "Do you understand that commingling separate property in joint accounts may affect its classification?",
    helperText:
      "We want to make sure you're aware that moving separate assets into shared accounts could make them harder to protect under your prenup.",
    required: true,
    options: [{ label: "Yes, I understand", value: "understood" }],
  },
  {
    id: "financial_disclosure",
    type: "radio",
    question:
      "Both partners agree to share a complete picture of their finances before signing the prenup. Fair enough?",
    helperText:
      "A prenup is only as strong as the honesty behind it. Courts can throw out an agreement if one partner wasn't fully transparent about their assets, debts, income, and financial obligations. This isn't about distrust — it's about building your agreement on a solid foundation. You'll both have a chance to provide detailed financial information in a later section.",
    required: true,
    options: [{ label: "Understood", value: "understood" }],
    proTip:
      "Think of financial disclosure as a healthy exercise for your relationship. Many couples say that going through this process actually brought them closer together and opened up conversations they'd been putting off.",
  },
];
