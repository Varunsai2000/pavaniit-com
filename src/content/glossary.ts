/**
 * Glossary of Indian employment terms. Each definition answers the question
 * in its first sentence (answer engines quote that sentence). Keep figures
 * tied to the sources listed at the bottom, and update `reviewed` when you
 * re-check them.
 */

export type Term = { id: string; term: string; definition: string; related?: string[] };

export const glossaryReviewed = "2026-11-15";

export const glossary: Term[] = [
  {
    id: "employer-of-record",
    term: "Employer of Record (EOR)",
    definition:
      "An Employer of Record is a company that legally employs someone on another company's behalf. In India, the EOR holds the employment contract and runs payroll, tax, PF, ESI and other statutory obligations, while the client company directs the person's day-to-day work.",
    related: ["contract-staffing", "fixed-term-employment"],
  },
  {
    id: "ctc",
    term: "Cost to company (CTC)",
    definition:
      "CTC is the total annual cost of employing someone in India: gross salary plus the employer's PF contribution, gratuity provision, insurance premiums, bonuses and allowances. Offers in India are usually quoted as CTC, so monthly take-home pay is lower than CTC divided by twelve.",
    related: ["in-hand-salary", "provident-fund"],
  },
  {
    id: "in-hand-salary",
    term: "In-hand salary",
    definition:
      "In-hand (take-home) salary is what an employee receives each month after deductions: their own PF contribution, ESI if they are covered, professional tax and income tax (TDS).",
    related: ["ctc", "tds-on-salary"],
  },
  {
    id: "provident-fund",
    term: "Provident Fund (PF, EPF)",
    definition:
      "The Employees' Provident Fund is a retirement savings scheme run by EPFO. The employee and employer each contribute 12% of the employee's basic wages and dearness allowance, commonly calculated on a wage ceiling of ₹15,000 a month, and part of the employer's share goes to the Employees' Pension Scheme.",
    related: ["uan", "wages-50-percent-rule"],
  },
  {
    id: "uan",
    term: "Universal Account Number (UAN)",
    definition:
      "A UAN is a 12-digit number issued by EPFO that stays with an employee for life and links all of their PF accounts across employers.",
    related: ["provident-fund"],
  },
  {
    id: "esi",
    term: "Employees' State Insurance (ESI)",
    definition:
      "ESI is a state health insurance and cash benefit scheme run by ESIC for employees earning up to ₹21,000 a month. The employer contributes 3.25% and the employee 0.75% of wages.",
  },
  {
    id: "professional-tax",
    term: "Professional tax",
    definition:
      "Professional tax is a tax on employment levied by some Indian states and deducted from salary by the employer. The Constitution caps it at ₹2,500 per person per year; rates, slabs and due dates vary by state, and some states don't levy it.",
    related: ["labour-welfare-fund"],
  },
  {
    id: "labour-welfare-fund",
    term: "Labour welfare fund (LWF)",
    definition:
      "The labour welfare fund is a small contribution paid by employees and employers to a state welfare board, half-yearly or yearly, in the states that have one.",
    related: ["professional-tax"],
  },
  {
    id: "tds-on-salary",
    term: "TDS on salary",
    definition:
      "TDS on salary is income tax the employer deducts each month based on the employee's expected tax for the year. It is deposited with the government by the 7th of the following month (tax deducted in March is due by 30 April), and the employer files quarterly returns and issues a year-end tax certificate.",
    related: ["in-hand-salary"],
  },
  {
    id: "gratuity",
    term: "Gratuity",
    definition:
      "Gratuity is a lump sum paid when an employee leaves after at least five years of continuous service, or after one year for fixed-term employees under the Code on Social Security. It is calculated as 15 days' wages for each completed year of service.",
    related: ["fixed-term-employment", "wages-50-percent-rule"],
  },
  {
    id: "statutory-bonus",
    term: "Statutory bonus",
    definition:
      "Statutory bonus is an annual payment of 8.33% to 20% of wages that employers must make to eligible lower-paid employees. The Code on Wages now governs it, carrying over the rules of the Payment of Bonus Act.",
  },
  {
    id: "full-and-final-settlement",
    term: "Full and final settlement (F&F)",
    definition:
      "Full and final settlement is the payment of everything owed to an employee who leaves: unpaid salary, leave encashment, gratuity and reimbursements, less any recoveries. Under the Code on Wages, wages must be paid within two working days of resignation, removal or retrenchment.",
    related: ["gratuity", "notice-period"],
  },
  {
    id: "notice-period",
    term: "Notice period",
    definition:
      "A notice period is the time an employee must keep working after resigning, as set by their contract. In Indian technology roles 30 to 90 days is common, which often makes it the longest part of hiring.",
  },
  {
    id: "fixed-term-employment",
    term: "Fixed-term employment",
    definition:
      "Fixed-term employment is employment for a set period, on the same hours, wages and benefits as permanent staff doing similar work. Under the Code on Social Security, fixed-term employees qualify for gratuity after one year.",
    related: ["gratuity"],
  },
  {
    id: "shops-and-establishments",
    term: "Shops and establishments registration",
    definition:
      "Shops and establishments registration is the state registration most offices and commercial premises need. Each state's act also sets working hours, weekly holidays, leave and the records an employer must keep.",
  },
  {
    id: "labour-codes",
    term: "Labour codes",
    definition:
      "The labour codes are four laws that consolidate 29 central labour laws: the Code on Wages (2019), the Industrial Relations Code (2020), the Code on Social Security (2020) and the Occupational Safety, Health and Working Conditions Code (2020). They took effect on 21 November 2025; central rules were notified in May 2026 and states are issuing their own.",
    related: ["wages-50-percent-rule"],
  },
  {
    id: "wages-50-percent-rule",
    term: "Wages and the 50% rule",
    definition:
      "Under the labour codes, wages means basic pay, dearness allowance and retaining allowance. If the allowances left out of wages exceed 50% of total pay, the excess is added back, which raises PF, gratuity and other amounts calculated on wages.",
    related: ["labour-codes", "provident-fund", "gratuity"],
  },
  {
    id: "posh-internal-committee",
    term: "POSH Internal Committee",
    definition:
      "Under the POSH Act, 2013, every employer with 10 or more employees must set up an Internal Committee to handle complaints of sexual harassment at work, with at least one external member, and must run awareness programmes regularly.",
  },
  {
    id: "contract-staffing",
    term: "Contract staffing",
    definition:
      "Contract staffing is an arrangement in which a staffing company employs people who work on a client's projects. The staffing company is the employer and handles payroll and compliance; the client pays a monthly fee per person.",
    related: ["employer-of-record"],
  },
  {
    id: "hire-train-deploy",
    term: "Hire, train, deploy",
    definition:
      "Hire-train-deploy is a hiring model in which a partner recruits graduates, trains them on the client's technology stack, and places them on the client's team once they are ready to work.",
  },
];

export const glossarySources = [
  { label: "Employees' Provident Fund Organisation (EPFO)", href: "https://www.epfindia.gov.in/" },
  { label: "Employees' State Insurance Corporation (ESIC)", href: "https://www.esic.gov.in/" },
  { label: "Ministry of Labour and Employment: labour codes", href: "https://labour.gov.in/" },
];
