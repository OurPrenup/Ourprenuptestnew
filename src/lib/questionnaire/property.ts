import { Question } from "./introduction";

export const propertyQuestions: Question[] = [
  {
    id: "property_intro",
    type: "info",
    question: "Let's talk about property",
    helperText:
      "One of the most important parts of a prenup is deciding what happens to property — both what you already own and what you'll acquire together. In the eyes of the law, there are two main categories: separate property (things you owned before the marriage or received individually as gifts or inheritance) and marital property (things acquired during the marriage, regardless of whose name is on it). Understanding this distinction is key to building an agreement that works for both of you.",
    required: false,
  },
  {
    id: "separate_property_info",
    type: "info",
    question: "What counts as separate property?",
    helperText:
      "Separate property generally includes anything you owned before getting married, as well as inheritances and gifts directed specifically to one partner. A prenup can help make sure these items stay with the original owner if things don't work out. Without a prenup, the lines between separate and shared property can get blurry over time — especially if separate assets get mixed in with joint finances.",
    required: false,
    proTip:
      "Even something that starts as separate property can become marital property if it gets \"commingled.\" For example, depositing an inheritance into a shared bank account may make it harder to claim as solely yours later on.",
  },
  {
    id: "own_property_together",
    type: "radio",
    question: "Do you and your partner currently own any property together?",
    helperText:
      "This includes real estate, vehicles, or any other significant assets you hold joint title to.",
    required: true,
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    proTip:
      "If you already own property together, your prenup can spell out exactly what happens to that property — whether it stays joint or gets divided a certain way. This is one of the most valuable things a prenup can do for couples who've already built a life together.",
  },
  {
    id: "partner_one_employed",
    type: "radio",
    question: "Are you currently employed?",
    helperText: "Let us know your current work situation.",
    required: true,
    options: [
      { label: "Yes, I am employed", value: "yes" },
      { label: "No, I am not currently employed", value: "no" },
      { label: "I am currently in school", value: "in_school" },
    ],
  },
  {
    id: "partner_one_employer",
    type: "text",
    question: "Who is your current employer?",
    helperText: "Enter the name of the company or organization you work for.",
    required: false,
  },
  {
    id: "partner_two_employed",
    type: "radio",
    question: "Is your partner currently employed?",
    helperText: "Let us know your partner's current work situation.",
    required: true,
    options: [
      { label: "Yes, they are employed", value: "yes" },
      { label: "No, they are not currently employed", value: "no" },
      { label: "They are currently in school", value: "in_school" },
    ],
  },
  {
    id: "partner_two_employer",
    type: "text",
    question: "Who is your partner's current employer?",
    helperText:
      "Enter the name of the company or organization your partner works for.",
    required: false,
  },
  {
    id: "own_business",
    type: "radio",
    question: "Do you or your partner currently own a business?",
    helperText:
      "This includes sole proprietorships, partnerships, LLCs, or any ownership stake in a company.",
    required: true,
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    proTip:
      "If either of you owns a business, a prenup is one of the best ways to protect it. Without one, a business started before the marriage — or even during it — could be subject to division. A clear agreement now can save significant headaches (and legal fees) later.",
  },
  {
    id: "inheritance_treatment",
    type: "radio",
    question: "How would you like inheritances to be treated during the marriage?",
    helperText:
      "This applies to any inheritance either partner receives while you're married.",
    required: true,
    options: [
      {
        label: "Keep inheritances as separate property",
        value: "keep_separate",
        description:
          "Any inheritance received during the marriage stays with the person who received it.",
      },
      {
        label: "Let state law decide",
        value: "state_law",
        description:
          "Your state's default rules will determine how inheritances are treated.",
      },
    ],
    proTip:
      "Most couples choose to keep inheritances separate. This is often what family members expect when they leave assets to a specific person, and it tends to reduce friction if circumstances change.",
  },
  {
    id: "gifts_acknowledgment",
    type: "radio",
    question:
      "Gifts given specifically to one partner will remain that partner's separate property. Does this sound right to you?",
    helperText:
      "This means a birthday gift from your parents to you, for example, would stay yours. Gifts given to both of you as a couple (like wedding presents) are treated as shared.",
    required: true,
    options: [{ label: "Understood", value: "understood" }],
  },
];
