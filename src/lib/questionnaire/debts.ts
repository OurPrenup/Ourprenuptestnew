import { Question } from "./introduction";

export const debtsQuestions: Question[] = [
  {
    id: "debts_intro",
    type: "info",
    question: "Understanding debts and liabilities",
    helperText:
      "Debt can be just as important as assets when it comes to your prenup. Just like property, debts fall into two categories: pre-marital debt (what you each owe before the wedding) and marital debt (what's taken on during the marriage). A prenup helps you both agree upfront on who's responsible for what, so there are no surprises down the road.",
    required: false,
  },
  {
    id: "premarital_debt_info",
    type: "info",
    question: "A quick note on pre-marital debt",
    helperText:
      "Generally speaking, any debt you brought into the marriage belongs to you — and the same goes for your partner. Student loans, car loans, credit card balances, and other obligations from before the wedding day are each person's individual responsibility. Your prenup will make this crystal clear so neither of you is caught off guard.",
    required: false,
    proTip:
      "Even in states where pre-marital debt is typically kept separate by default, having it explicitly stated in your prenup adds an extra layer of certainty. It's one less thing to worry about.",
  },
  {
    id: "premarital_debt_acknowledgment",
    type: "radio",
    question:
      "Any debt either partner had before the marriage will remain that person's sole responsibility. Does this work for both of you?",
    helperText:
      "This means your partner won't be on the hook for your pre-existing student loans, and vice versa.",
    required: true,
    options: [{ label: "Understood", value: "understood" }],
  },
  {
    id: "marital_debt_handling",
    type: "radio",
    question: "How should debts taken on during the marriage be handled?",
    helperText:
      "This covers things like credit cards, personal loans, or any new borrowing that happens while you're married.",
    required: true,
    options: [
      {
        label: "Whoever's name is on the debt is responsible for it",
        value: "name_based",
        description:
          "If one partner takes out a loan in their name only, that debt stays with them.",
      },
      {
        label: "All marital debt is shared equally",
        value: "shared_equally",
        description:
          "Any debt taken on during the marriage is considered a joint responsibility, regardless of whose name is on it.",
      },
      {
        label: "Let state law decide",
        value: "state_law",
        description:
          "Your state's default rules will determine how marital debt is divided.",
      },
    ],
    proTip:
      "Many couples prefer the name-based approach because it encourages responsible borrowing and avoids one partner being surprised by the other's spending habits. That said, shared responsibility can make sense for couples who manage all finances jointly.",
  },
  {
    id: "real_estate_liabilities",
    type: "radio",
    question:
      "Mortgages or liens on real estate purchased during the marriage will generally follow the same rules as your other marital debts. Sound good?",
    helperText:
      "If you buy a home together during the marriage, the mortgage responsibility will align with whatever you chose for marital debt handling above. If only one partner's name is on the mortgage, the rules you selected will apply.",
    required: true,
    options: [{ label: "Understood", value: "understood" }],
    proTip:
      "If you're planning to buy a home together, it's worth talking about how the down payment and mortgage payments will work — especially if one partner is contributing more. Your prenup can address this in detail.",
  },
  {
    id: "debt_disclosure_note",
    type: "info",
    question: "You'll list specific debts later",
    helperText:
      "In the financial disclosure section of this questionnaire, both you and your partner will have the opportunity to list out your individual debts and liabilities in detail. Full transparency is a cornerstone of a strong prenup — and honestly, of a strong marriage. For now, we just need to establish the ground rules.",
    required: false,
  },
];
