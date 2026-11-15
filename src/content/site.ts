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
  /** The same price in rupees, shown under the main amount. */
  amountLocal?: string;
  unit: string;
  includes: string[];
  note?: string;
};

export const prices: Price[] = [
  {
    id: "eor",
    service: "Employer of Record",
    stage: "Employ",
    amount: "€78",
    amountLocal: "₹8,200",
    unit: "per employee per month",
    includes: [
      "Onboarding and employment documentation",
      "Monthly payroll and salary disbursement",
      "PF, ESI (where applicable), TDS and professional tax",
      "GST invoicing and statutory filings",
      "Exit formalities and full-and-final settlement",
    ],
    note: "€62 per employee from six employees. A one-month refundable salary deposit may apply.",
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

/* ---------------------------------------------------------------------------
   Employer of Record pricing, from Pavani IT's price sheet (November 2026).
   EUR figures are approximate conversions of the INR prices.
   --------------------------------------------------------------------------- */

export type Plan = { id: string; name: string; eur: string; inr: string; unit: string; priceEur: number; priceInr: number };

export const eorPlans: Plan[] = [
  { id: "eor-employee", name: "Full-time employee", eur: "€78", inr: "₹8,200", unit: "per employee per month", priceEur: 78, priceInr: 8200 },
  { id: "eor-team", name: "Six or more employees", eur: "€62", inr: "₹6,500", unit: "per employee per month", priceEur: 62, priceInr: 6500 },
  { id: "eor-contractor", name: "Independent contractor", eur: "€23", inr: "₹2,400", unit: "per contractor per month", priceEur: 23, priceInr: 2400 },
];

/** The three packages as price cards (home and pricing pages). */
export const eorPlanCards: Price[] = eorPlans.map((p) => ({
  id: p.id,
  service: p.name,
  stage: "Employ",
  amount: p.eur,
  amountLocal: p.inr,
  unit: p.unit,
  includes: [],
}));

/** Worked example: what a company pays in a month for one employee on ₹50,000. */
export const eorExample = {
  salary: "₹50,000",
  rows: [
    { label: "Employee salary", eur: "€475", inr: "₹50,000" },
    { label: "Employer PF (8%)", eur: "€38", inr: "₹4,000" },
    { label: "EOR service fee", eur: "€78", inr: "₹8,200" },
    { label: "GST (18% on the EOR fee)", eur: "€14", inr: "₹1,476" },
    { label: "FX conversion fee (1%)", eur: "€6", inr: "₹637" },
  ],
  total: { label: "Estimated monthly cost", eur: "€611", inr: "₹64,313" },
};

/** What the Employer of Record fee covers. */
export const eorCovered = [
  "Employee onboarding and employment documentation",
  "Monthly payroll and salary disbursement",
  "PF registration, calculations and remittances",
  "ESI administration (where applicable)",
  "TDS and professional tax compliance",
  "GST invoicing and statutory filings",
  "Employee records and leave administration",
  "Exit formalities and full-and-final settlements",
];

/** The terms that sit under the price. */
export const eorNotes = [
  "The employee's PF (8%), professional tax (₹200) and TDS are deducted from their salary.",
  "Employer PF (8%), ESI (where applicable) and GST are included in the company cost.",
  "An FX conversion fee of 1% applies to payments from abroad.",
  "A one-month refundable salary deposit may apply.",
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
