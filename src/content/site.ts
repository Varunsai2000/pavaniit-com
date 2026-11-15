/**
 * Company facts and prices. This is the one file to edit before launch.
 *
 * Anything wrapped in square brackets, e.g. "[City]", is a placeholder. It
 * renders on the site with a dashed outline so it's easy to spot, and it is
 * left out of structured data and llms.txt. Replace it with the real value
 * (no brackets) and the outline disappears everywhere.
 */

export const isPlaceholder = (value?: string | null): boolean =>
  !value || value.trim().startsWith("[");

/** Returns the value only when it's real; otherwise undefined. */
export const real = (value?: string | null): string | undefined =>
  isPlaceholder(value) ? undefined : (value as string);

export const site = {
  name: "Pavani IT",
  legalName: "[Registered company name]",
  url: "https://pavaniit.com",
  description:
    "Pavani IT is an Indian Employer of Record. We recruit, employ, pay and train people in India for companies abroad and Indian businesses, with payroll and statutory compliance run in-house.",

  email: "hello@pavaniit.com",
  careersEmail: "careers@pavaniit.com",
  phone: "[Phone number]",
  city: "[City]",
  state: "[State]",
  address: "[Office address]",
  cin: "[CIN]",
  gstin: "[GSTIN]",
  linkedin: "[LinkedIn page URL]",

  /** Paste your Web3Forms access key to deliver enquiries by email. Empty = form opens the visitor's email app. */
  web3formsKey: "",
} as const;

export type Price = {
  id: string;
  service: string;
  stage: "Hire" | "Employ" | "Pay" | "Grow";
  amount: string;
  unit: string;
  includes: string[];
  note?: string;
};

export const prices: Price[] = [
  {
    id: "eor",
    service: "Employer of Record",
    stage: "Employ",
    amount: "[$ amount]",
    unit: "per employee per month",
    includes: [
      "Employment contract under Indian law",
      "Monthly payroll, payslips and income tax deduction",
      "PF, ESI, gratuity, professional tax and labour welfare fund",
      "Statutory leave and health insurance",
      "Onboarding, exits and full-and-final settlement",
    ],
    note: "[Deposit terms]",
  },
  {
    id: "recruitment",
    service: "Recruitment",
    stage: "Hire",
    amount: "[% of annual CTC]",
    unit: "one-time, when the person joins",
    includes: [
      "Role brief, sourcing and screening",
      "Shortlist with salary and notice-period details",
      "Offer negotiation and follow-up through notice period",
    ],
    note: "[Replacement guarantee]",
  },
  {
    id: "staffing",
    service: "Contract staffing",
    stage: "Hire",
    amount: "[% on monthly CTC]",
    unit: "added to each person's monthly cost",
    includes: [
      "People on Pavani IT's payroll, working full-time for you",
      "All statutory costs and filings",
      "Option to move them onto your payroll",
    ],
  },
  {
    id: "payroll",
    service: "Payroll and compliance",
    stage: "Pay",
    amount: "[₹ amount]",
    unit: "per employee per month",
    includes: [
      "Monthly payroll and payslips for your Indian entity",
      "TDS, PF, ESI, professional tax and labour welfare fund filings",
      "Labour-code registers and returns",
    ],
  },
  {
    id: "training",
    service: "Corporate training",
    stage: "Grow",
    amount: "[Price per programme]",
    unit: "per cohort, scoped with you",
    includes: ["Curriculum built on your stack", "Live online or on-site", "End-of-programme assessment"],
  },
  {
    id: "htd",
    service: "Hire, train, deploy",
    stage: "Grow",
    amount: "[Price per placed graduate]",
    unit: "per graduate who joins your team",
    includes: ["Graduate selection against your role", "Training on your stack", "Placement on your team"],
  },
];

export type Person = { name: string; role: string; background: string };

/** Named experts shown on About and as reviewers on guides. Never invent these. */
export const people: Person[] = [
  {
    name: "[Founder name]",
    role: "Founder",
    background: "[Background, e.g. years in HR operations and the companies worked with]",
  },
  {
    name: "[Advisor name]",
    role: "[Compliance advisor, e.g. Chartered Accountant or labour-law practitioner]",
    background: "[Credential and experience]",
  },
];
