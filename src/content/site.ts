/**
 * Company facts and prices. This is the one file to edit before launch.
 *
 * Anything wrapped in square brackets, e.g. "[CIN]", is a placeholder. The site
 * never shows a placeholder: whatever depends on it (the CIN in the footer, the
 * phone row on the contact page, the people on the About page) is left out, and
 * so is structured data and llms.txt. Replace it with the real value (no
 * brackets) and it appears everywhere it belongs.
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

  email: "biz@pavaniit.com",
  /** Same inbox for now; careers links pre-fill a "Job application" subject so CVs are easy to filter. */
  careersEmail: "biz@pavaniit.com",
  phone: "[Phone number]",
  city: "Vijayawada",
  state: "Andhra Pradesh",
  address: "[Office address]",
  cin: "[CIN]",
  gstin: "[GSTIN]",
  linkedin: "[LinkedIn page URL]",

  /** Paste your Web3Forms access key to deliver enquiries by email. Empty = form opens the visitor's email app. */
  web3formsKey: "",
} as const;

/** The office location from whichever parts are real: street address, city, state. */
export const officeLine = (): string =>
  [site.address, site.city, site.state].map((v) => real(v)).filter(Boolean).join(", ");

/** The name for legal lines: the registered company name once it's set, otherwise the trading name. */
export const legalName = (): string => real(site.legalName) ?? site.name;

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

/* ---------------------------------------------------------------------------
   Employer of Record pricing, from Pavani IT's price sheet (November 2026).
   Rupee prices are the real prices. Dollar figures are conversions at
   inrPerUsd, rounded to the dollar; change the rate here and every page,
   llms.txt and the structured data follow.
   --------------------------------------------------------------------------- */

export const inrPerUsd = 94;
const toUsd = (inr: number) => Math.round(inr / inrPerUsd);
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export type Plan = { id: string; name: string; usd: string; inr: string; unit: string; priceUsd: number; priceInr: number };

const plan = (id: string, name: string, priceInr: number, unit: string): Plan => ({
  id, name, unit, priceInr, priceUsd: toUsd(priceInr), usd: usd(toUsd(priceInr)), inr: inr(priceInr),
});

export const eorPlans: Plan[] = [
  plan("eor-employee", "Full-time employee", 8200, "per employee per month"),
  plan("eor-team", "Six or more employees", 6500, "per employee per month"),
  plan("eor-contractor", "Independent contractor", 2400, "per contractor per month"),
];

/** Worked example: what a company pays in a month for one employee on ₹50,000.
    Each row is converted on its own and the dollar total is the sum of the rows,
    so the receipt adds up in both currencies. */
const exampleRows = [
  { label: "Employee salary", inr: 50000 },
  { label: "Employer PF (8%)", inr: 4000 },
  { label: "EOR service fee", inr: 8200 },
  { label: "GST (18% on the EOR fee)", inr: 1476 },
  { label: "FX conversion fee (1%)", inr: 637 },
].map((r) => ({ label: r.label, inrN: r.inr, usdN: toUsd(r.inr) }));

export const eorExample = {
  salary: inr(50000),
  rows: exampleRows.map((r) => ({ label: r.label, usd: usd(r.usdN), inr: inr(r.inrN) })),
  total: {
    label: "Estimated monthly cost",
    usd: usd(exampleRows.reduce((a, r) => a + r.usdN, 0)),
    inr: inr(exampleRows.reduce((a, r) => a + r.inrN, 0)),
  },
};

export const prices: Price[] = [
  {
    id: "eor",
    service: "Employer of Record",
    stage: "Employ",
    amount: eorPlans[0].usd,
    amountLocal: eorPlans[0].inr,
    unit: "per employee per month",
    includes: [
      "Onboarding and employment documentation",
      "Monthly payroll and salary disbursement",
      "PF, ESI (where applicable), TDS and professional tax",
      "GST invoicing and statutory filings",
      "Exit formalities and full-and-final settlement",
    ],
    note: `${eorPlans[1].usd} (${eorPlans[1].inr}) per employee from six employees. A one-month refundable salary deposit may apply.`,
  },
  {
    id: "recruitment",
    service: "Recruitment",
    stage: "Hire",
    amount: "8.33%",
    unit: "of annual CTC, once the person joins",
    includes: [
      "Role brief, sourcing and screening",
      "Shortlist with salary and notice-period details",
      "Offer negotiation and follow-up through notice period",
    ],
    note: "That is one month's salary. If the person leaves within 90 days of joining, we find a replacement at no extra fee.",
  },
  {
    id: "staffing",
    service: "Contract staffing",
    stage: "Hire",
    amount: "12%",
    unit: "of each person's monthly CTC",
    includes: [
      "We find the person and employ them on our payroll",
      "All statutory costs and filings",
      "Option to move them onto your payroll",
    ],
    note: `Minimum ${usd(toUsd(8200))} (${inr(8200)}) per person per month, the same as our Employer of Record fee.`,
  },
  {
    id: "payroll",
    service: "Payroll and compliance",
    stage: "Pay",
    amount: usd(toUsd(500)),
    amountLocal: inr(500),
    unit: "per employee per month",
    includes: [
      "Monthly payroll and payslips for your Indian entity",
      "TDS, PF, ESI, professional tax and labour welfare fund filings",
      "Labour-code registers and returns",
    ],
    note: `Minimum ${usd(toUsd(5000))} (${inr(5000)}) a month.`,
  },
  {
    id: "training",
    service: "Corporate training",
    stage: "Grow",
    amount: usd(toUsd(60000)),
    amountLocal: inr(60000),
    unit: "per training day, for up to 20 people",
    includes: ["Curriculum built on your stack", "Live online or on-site", "End-of-programme assessment"],
    note: "Travel for on-site sessions outside Vijayawada is billed at cost.",
  },
  {
    id: "htd",
    service: "Hire, train, deploy",
    stage: "Grow",
    amount: usd(toUsd(150000)),
    amountLocal: inr(150000),
    unit: "per graduate who joins your team",
    includes: ["Graduate selection against your role", "Up to 12 weeks of training on your stack", "Placement on your team"],
    note: "No fee for anyone who doesn't join. If a graduate leaves within 90 days, we place a replacement at no extra fee.",
  },
];

/** The three packages as price cards (home and pricing pages). */
export const eorPlanCards: Price[] = eorPlans.map((p) => ({
  id: p.id,
  service: p.name,
  stage: "Employ",
  amount: p.usd,
  amountLocal: p.inr,
  unit: p.unit,
  includes: [],
}));

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
