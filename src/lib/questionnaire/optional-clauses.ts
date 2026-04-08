import { Question } from "./introduction";

export const optionalClausesQuestions: Question[] = [
  {
    id: "death_provision",
    type: "radio",
    question: "Would you like to include a death provision in your agreement?",
    helperText:
      "A death provision specifies what happens to shared and separate assets if one partner passes away during the marriage. Without one, state inheritance laws will apply by default.",
    required: true,
    options: [
      {
        label: "Yes, include a death provision",
        value: "yes",
        description:
          "Outline how assets should be handled if one partner passes away, giving both of you clarity and peace of mind.",
      },
      {
        label: "No, skip this provision",
        value: "no",
        description:
          "State inheritance and probate laws will determine asset distribution if one partner passes away.",
      },
    ],
  },
  {
    id: "sunset_clause",
    type: "radio",
    question: "Do you want to include a sunset clause?",
    helperText:
      "A sunset clause means your prenuptial agreement automatically expires after a certain number of years. After that point, standard state laws would apply to your marriage.",
    required: true,
    options: [
      {
        label: "Yes, include a sunset clause",
        value: "yes",
        description:
          "The agreement will expire after a set period, and you can renegotiate or let state law take over.",
      },
      {
        label: "No, keep the agreement in effect indefinitely",
        value: "no",
        description:
          "Your prenup will remain active for the entire duration of the marriage unless formally amended.",
      },
    ],
    proTip:
      "Sunset clauses are popular with couples who feel that a long marriage changes the dynamic of their financial partnership. Common timeframes range from 5 to 15 years. You can always renegotiate your prenup later regardless of this choice.",
  },
  {
    id: "pet_clause",
    type: "radio",
    question: "What would you like to happen to your pets in the event of a divorce?",
    helperText:
      "Pets are an important part of many families. While most states treat pets as property, you can decide ahead of time what arrangement works best for your furry (or scaly) family members.",
    required: true,
    options: [
      {
        label: "No pet clause needed",
        value: "no_clause",
        description:
          "We do not have pets or prefer not to include a specific arrangement for them.",
      },
      {
        label: "One partner keeps all pets",
        value: "one_partner",
        description:
          "A designated partner will retain custody of all pets from the marriage.",
      },
      {
        label: "Shared custody arrangement",
        value: "shared_custody",
        description:
          "Both partners will share time and responsibility for the pets after a divorce.",
      },
      {
        label: "Divide pets individually",
        value: "divide_individually",
        description:
          "Each pet will be assigned to a specific partner based on individual circumstances and agreements.",
      },
    ],
  },
  {
    id: "life_insurance",
    type: "radio",
    question:
      "Would you like to require each other to maintain a life insurance policy during the marriage?",
    helperText:
      "A life insurance requirement ensures that both partners have financial protection if something unexpected happens. This is especially common when one partner is the primary earner.",
    required: true,
    options: [
      {
        label: "Yes, require life insurance policies",
        value: "yes",
        description:
          "Both partners agree to maintain an active life insurance policy naming the other as a beneficiary during the marriage.",
      },
      {
        label: "No, do not require life insurance",
        value: "no",
        description:
          "Life insurance will not be a requirement as part of this agreement.",
      },
    ],
  },
  {
    id: "health_insurance",
    type: "radio",
    question:
      "In the event of a divorce, how should health insurance be handled?",
    helperText:
      "If one partner currently provides health insurance coverage for the other, it is worth deciding what happens to that coverage after a divorce.",
    required: true,
    options: [
      {
        label: "Continue providing coverage for a transition period",
        value: "continue",
        description:
          "The providing partner agrees to maintain health insurance coverage for the other for a reasonable transition period after the divorce is finalized.",
      },
      {
        label: "No obligation to continue coverage",
        value: "no_obligation",
        description:
          "Neither partner is required to provide health insurance for the other after the divorce. Each person will arrange their own coverage.",
      },
    ],
  },
];

export const optionalClausesMeta = {
  locked: true,
};
