import { Question } from "./introduction";

export const spousalSupportQuestions: Question[] = [
  {
    id: "spousal_support_intro",
    type: "info",
    question: "Understanding Spousal Support",
    helperText:
      "Spousal support (sometimes called alimony) is financial assistance that one partner may be required to provide the other after a divorce. A prenup lets you and your partner decide these terms together now, rather than leaving it up to a court later. This section allows you to choose the approach that feels right for both of you.",
    required: false,
  },
  {
    id: "spousal_support_approach",
    type: "radio",
    question: "How would you like to handle spousal support?",
    helperText:
      "Choose the option that best reflects what you and your partner have discussed. There is no single right answer — it depends on your unique situation.",
    required: true,
    options: [
      {
        label: "Waiver of Support",
        value: "waiver",
        description:
          "Both partners agree to give up any right to request spousal support from the other, regardless of circumstances at the time of divorce.",
      },
      {
        label: "No Waiver or Modification",
        value: "no_waiver",
        description:
          "Leave spousal support entirely up to state law at the time of divorce. Neither partner waives or limits any rights.",
      },
      {
        label: "Payment Based on Marriage Length",
        value: "marriage_length",
        description:
          "One partner agrees to make a one-time payment to the other, with the amount scaling based on how many years the marriage lasted.",
      },
      {
        label: "Conditional Waiver Based on Children",
        value: "conditional_children",
        description:
          "Both partners waive spousal support if there are no children. If children are born or adopted during the marriage, state law applies instead.",
      },
      {
        label: "Lump Sum",
        value: "lump_sum",
        description:
          "One partner agrees to pay a fixed, one-time amount to the other in the event of a divorce, regardless of other factors.",
      },
    ],
    proTip:
      "Spousal support decisions can have significant long-term financial implications for both partners. We strongly recommend having an independent attorney review this section before you finalize your agreement.",
  },
];

export const spousalSupportMeta = {
  locked: true,
};
