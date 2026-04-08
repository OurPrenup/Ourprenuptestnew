export interface Question {
  id: string;
  type: "text" | "select" | "multi-select" | "date" | "radio" | "info";
  question: string;
  helperText?: string;
  required: boolean;
  options?: { label: string; value: string; description?: string }[];
  proTip?: string;
}

export const introductionQuestions: Question[] = [
  {
    id: "first_name",
    type: "text",
    question: "What is your legal first name?",
    helperText: "Enter your name exactly as it appears on your government-issued ID.",
    required: true,
    proTip:
      "Your legal name is critical for your prenuptial agreement to be enforceable. Make sure it matches your ID exactly — including middle names if applicable.",
  },
  {
    id: "last_name",
    type: "text",
    question: "What is your legal last name?",
    helperText: "Enter your last name as it appears on your government-issued ID.",
    required: true,
  },
  {
    id: "date_of_birth",
    type: "date",
    question: "What is your date of birth?",
    required: true,
  },
  {
    id: "email",
    type: "text",
    question: "What is your email address?",
    helperText: "We'll use this to send you important updates about your prenup.",
    required: true,
  },
  {
    id: "state_of_residence",
    type: "select",
    question: "What state do you currently reside in?",
    helperText: "Your prenup will be governed by the laws of this state.",
    required: true,
    options: [
      { label: "Alabama", value: "AL" },
      { label: "Alaska", value: "AK" },
      { label: "Arizona", value: "AZ" },
      { label: "Arkansas", value: "AR" },
      { label: "California", value: "CA" },
      { label: "Colorado", value: "CO" },
      { label: "Connecticut", value: "CT" },
      { label: "Delaware", value: "DE" },
      { label: "Florida", value: "FL" },
      { label: "Georgia", value: "GA" },
      { label: "Hawaii", value: "HI" },
      { label: "Idaho", value: "ID" },
      { label: "Illinois", value: "IL" },
      { label: "Indiana", value: "IN" },
      { label: "Iowa", value: "IA" },
      { label: "Kansas", value: "KS" },
      { label: "Kentucky", value: "KY" },
      { label: "Maine", value: "ME" },
      { label: "Maryland", value: "MD" },
      { label: "Massachusetts", value: "MA" },
      { label: "Michigan", value: "MI" },
      { label: "Minnesota", value: "MN" },
      { label: "Mississippi", value: "MS" },
      { label: "Missouri", value: "MO" },
      { label: "Montana", value: "MT" },
      { label: "Nebraska", value: "NE" },
      { label: "Nevada", value: "NV" },
      { label: "New Hampshire", value: "NH" },
      { label: "New Jersey", value: "NJ" },
      { label: "New Mexico", value: "NM" },
      { label: "New York", value: "NY" },
      { label: "North Carolina", value: "NC" },
      { label: "North Dakota", value: "ND" },
      { label: "Ohio", value: "OH" },
      { label: "Oklahoma", value: "OK" },
      { label: "Oregon", value: "OR" },
      { label: "Pennsylvania", value: "PA" },
      { label: "Rhode Island", value: "RI" },
      { label: "South Dakota", value: "SD" },
      { label: "Tennessee", value: "TN" },
      { label: "Texas", value: "TX" },
      { label: "Utah", value: "UT" },
      { label: "Vermont", value: "VT" },
      { label: "Virginia", value: "VA" },
      { label: "Washington", value: "WA" },
      { label: "West Virginia", value: "WV" },
      { label: "Wisconsin", value: "WI" },
      { label: "Wyoming", value: "WY" },
    ],
    proTip:
      "The state you reside in determines which laws apply to your prenuptial agreement. If you're planning to move after your wedding, you may want to consult with an attorney about how that could affect your agreement.",
  },
  {
    id: "wedding_date",
    type: "date",
    question: "When is your wedding date?",
    helperText: "Your prenup must be signed before your wedding day.",
    required: true,
    proTip:
      "Most attorneys recommend having your prenup completed at least 30 days before your wedding. Courts may scrutinize agreements signed too close to the wedding date.",
  },
  {
    id: "previously_married",
    type: "radio",
    question: "Have you been previously married?",
    required: true,
    options: [
      { label: "No, this is my first marriage", value: "no" },
      { label: "Yes, I have been previously married", value: "yes" },
    ],
  },
  {
    id: "prenup_goals",
    type: "multi-select",
    question: "What are your primary goals for this prenup?",
    helperText: "Select all that apply. This helps us tailor the agreement to your needs.",
    required: true,
    options: [
      {
        label: "Protect pre-marital assets",
        value: "protect_assets",
        description: "Keep what you brought into the marriage separate",
      },
      {
        label: "Protect a business or professional practice",
        value: "protect_business",
        description: "Shield business interests from division",
      },
      {
        label: "Define spousal support terms",
        value: "spousal_support",
        description: "Set expectations for alimony if applicable",
      },
      {
        label: "Protect inheritance or family wealth",
        value: "protect_inheritance",
        description: "Keep inherited assets in your family",
      },
      {
        label: "Clarify financial responsibilities during marriage",
        value: "financial_clarity",
        description: "Define how expenses, debts, and savings will be handled",
      },
      {
        label: "Protect against partner's debts",
        value: "debt_protection",
        description: "Ensure you're not liable for your partner's existing debts",
      },
    ],
    proTip:
      "There's no wrong answer here! Your goals help us customize which sections of the questionnaire are most relevant to your situation.",
  },
];
