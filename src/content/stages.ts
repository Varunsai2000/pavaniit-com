/**
 * The four stages and their services. The service descriptions ("short") are
 * the user-approved copy; keep them verbatim.
 */

export type QA = { q: string; a: string };

export type Service = {
  id: string;
  name: string;
  short: string;
  details: string[];
};

export type StageId = "hire" | "employ" | "pay" | "grow";

export type Stage = {
  id: StageId;
  label: "Hire" | "Employ" | "Pay" | "Grow";
  number: 1 | 2 | 3 | 4;
  href: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  services: [Service, Service];
  priceIds: string[];
  faq: QA[];
};

export const stages: Stage[] = [
  {
    id: "hire",
    label: "Hire",
    number: 1,
    href: "/recruitment-staffing-india/",
    title: "Recruitment and contract staffing in India",
    metaTitle: "Recruitment and contract staffing in India | Pavani IT",
    metaDescription:
      "Permanent hiring for engineering, product and business roles in India, or skilled people on Pavani IT's payroll working on your projects.",
    lead: "Pavani IT recruits engineering, product and business people in India, either as your permanent employees or on our payroll as contract staff. We source and screen; you interview the shortlist and decide.",
    services: [
      {
        id: "recruitment",
        name: "Recruitment",
        short:
          "Permanent hiring for engineering, product and business roles. We source and screen; you interview the shortlist and decide.",
        details: [
          "A scoping call and a written role brief before we start",
          "Sourcing from our network, job boards and referrals",
          "Screening interviews and skills checks before anyone reaches you",
          "A shortlist with notes on each candidate, salary expectations and notice period",
          "Offer negotiation, and follow-up through the notice period so accepted offers turn into joiners",
        ],
      },
      {
        id: "contract-staffing",
        name: "Contract staffing",
        short:
          "Skilled people on our payroll, working on your projects for as long as you need them, with the option to move them onto yours.",
        details: [
          "People employed by Pavani IT, working full-time on your projects",
          "One monthly invoice covering salary, statutory costs and our fee",
          "Extend, end or convert to your payroll on terms agreed up front",
          "Contract-labour compliance handled by us",
        ],
      },
    ],
    priceIds: ["recruitment", "staffing"],
    faq: [
      {
        q: "How long does it take to hire someone in India?",
        a: "Finding and closing a candidate usually takes a few weeks. The bigger factor is the notice period: many candidates in India must serve 30 to 90 days with their current employer. We stay in touch with candidates through their notice period to reduce last-minute drop-offs.",
      },
      {
        q: "Can we convert contract staff to permanent employees?",
        a: "Yes. The conversion terms, including any fee, are written into the contract before anyone starts, so there are no surprises when you want to move someone onto your payroll.",
      },
      {
        q: "Which roles do you recruit for?",
        a: "Engineering, product, data, design, business, operations and support roles. We tell you on the first call if a role is outside what we can fill well.",
      },
    ],
  },
  {
    id: "employ",
    label: "Employ",
    number: 2,
    href: "/employer-of-record-india/",
    title: "Employer of Record in India",
    metaTitle: "Employer of Record (EOR) in India | Pavani IT",
    metaDescription:
      "Hire full-time employees in India without an Indian entity. Pavani IT is the legal employer and runs contracts, payroll, PF, ESI, tax and exits under Indian law.",
    lead: "An Employer of Record (EOR) is a company that legally employs people on your behalf. With Pavani IT as your Employer of Record in India, your team works full-time for you while we hold the employment contract and run payroll, taxes, statutory benefits and filings under Indian law. You don't need an Indian entity.",
    services: [
      {
        id: "employer-of-record",
        name: "Employer of Record",
        short:
          "We become the legal employer in India while the person works full-time for you. No Indian entity or local HR team needed.",
        details: [
          "Employment contract that follows Indian labour law and the labour codes",
          "Salary paid in rupees every month, with payslips",
          "Income tax (TDS), PF, ESI, professional tax and labour welfare fund deducted and filed",
          "Statutory leave, bonus and gratuity where they apply",
          "Employee records and leave administration",
          "Exits handled, including full-and-final settlement within the legal deadline",
        ],
      },
      {
        id: "onboarding",
        name: "Onboarding",
        short:
          "Offer letters, employment contracts, background checks and PF and ESI enrolment, finished before day one.",
        details: [
          "Offer letter and employment contract",
          "Background, education and employment checks",
          "PF enrolment and UAN linking, ESI where the salary is eligible",
          "Employee record set up for payroll and leave",
          "A first-day checklist shared with you and the new hire",
        ],
      },
    ],
    priceIds: ["eor"],
    faq: [
      {
        q: "Is Employer of Record legal in India?",
        a: "Yes. India has no separate EOR statute: an Employer of Record is a registered Indian employer that employs the person and meets every employer obligation, while you direct their day-to-day work under a service agreement with us.",
      },
      {
        q: "Do we need an Indian company to hire through you?",
        a: "No. Foreign companies hire through our Employer of Record service without an Indian entity. If you set one up later, we can transfer your team to it.",
      },
      {
        q: "Can you employ someone we've already found?",
        a: "Yes. If you've already chosen the person, we issue the contract and onboard them. You only use our recruitment service if you need it.",
      },
      {
        q: "How quickly can someone start?",
        a: "Mostly that depends on their notice period: many candidates in India serve 30 to 90 days with their current employer. Our side of the paperwork is ready before their first day.",
      },
    ],
  },
  {
    id: "pay",
    label: "Pay",
    number: 3,
    href: "/payroll-compliance-india/",
    title: "Payroll and statutory compliance in India",
    metaTitle: "Payroll and statutory compliance in India | Pavani IT",
    metaDescription:
      "Monthly payroll for your Indian employees, with TDS, PF, ESI, professional tax and labour welfare fund filed on time and labour-code registers kept.",
    lead: "Pavani IT runs monthly payroll for companies that employ people in India, and makes every statutory payment and filing on time: TDS by the 7th, PF and ESI by the 15th, and professional tax and labour welfare fund on each state's dates. You stay the employer; we do the work.",
    services: [
      {
        id: "payroll",
        name: "Payroll",
        short:
          "Monthly salary processing, payslips, reimbursements, tax declarations and year-end tax certificates.",
        details: [
          "Attendance, leave and variable-pay inputs collected and checked",
          "Payslips for every employee, every month",
          "Reimbursements and tax-saving declarations",
          "Year-end tax certificates for every employee",
          "One monthly report: who was paid, what was deducted, what was filed",
        ],
      },
      {
        id: "statutory-compliance",
        name: "Statutory compliance",
        short:
          "PF, ESI, professional tax, labour welfare fund, TDS, and the registers and returns the labour codes require.",
        details: [
          "PF and ESI contributions and returns",
          "Professional tax and labour welfare fund in each state you employ in",
          "TDS on salaries deposited monthly, quarterly returns filed",
          "Registers and returns under the labour codes",
          "Shops and establishments registration and renewals",
        ],
      },
    ],
    priceIds: ["payroll"],
    faq: [
      {
        q: "What's the difference between payroll outsourcing and Employer of Record?",
        a: "With payroll outsourcing you stay the legal employer, and we run payroll and filings for your Indian entity. With Employer of Record, Pavani IT is the legal employer, so you don't need an entity at all.",
      },
      {
        q: "What do the new labour codes change for payroll?",
        a: "The four labour codes took effect on 21 November 2025. PF and gratuity are now calculated on a wider definition of wages, so allowances above half of total pay count towards them; fixed-term employees qualify for gratuity after one year; and registrations and returns are consolidated, with each state's own rules on top. We review salary structures and tell you what has to change.",
      },
      {
        q: "Can you run payroll for employees in different states?",
        a: "Yes. Professional tax, labour welfare fund and shops and establishments rules differ by state; we register and file for each state where you have people.",
      },
    ],
  },
  {
    id: "grow",
    label: "Grow",
    number: 4,
    href: "/corporate-training-india/",
    title: "Corporate training and hire-train-deploy in India",
    metaTitle: "Corporate training and hire-train-deploy in India | Pavani IT",
    metaDescription:
      "Technical upskilling for engineering teams in India, and graduate cohorts trained on your stack before they join your team.",
    lead: "Pavani IT trains engineering teams on the stack they already use, and builds graduate cohorts that join your team ready to work.",
    services: [
      {
        id: "corporate-training",
        name: "Corporate training",
        short:
          "Technical upskilling for your teams, built around your stack and delivered on-site or live online.",
        details: [
          "Cloud and DevOps, data engineering, full-stack development, and practical use of AI coding tools",
          "Labs built on your own stack",
          "Live online or on-site at your office",
          "An assessment at the end so you can see what changed",
        ],
      },
      {
        id: "hire-train-deploy",
        name: "Hire, train, deploy",
        short: "We recruit graduates, train them for your projects, and place them on your team ready to work.",
        details: [
          "Graduates selected against your role and stack",
          "Training on your stack before they join your team",
          "They join on our payroll or yours, as agreed",
          "The option to make them permanent employees",
        ],
      },
    ],
    priceIds: ["training", "htd"],
    faq: [
      {
        q: "How long is a hire-train-deploy cohort?",
        a: "Up to 12 weeks, depending on the role and the gap between graduate skills and your stack. We agree the length and curriculum with you before selection starts.",
      },
      {
        q: "Do you run POSH training?",
        a: "Yes. The POSH Act requires employers to run awareness sessions regularly; we deliver them alongside induction and first-time manager programmes.",
      },
    ],
  },
];

/** "Recruitment and contract staffing": first service as named, the rest lowercased. */
export const servicesLine = (stage: Stage) =>
  stage.services.map((s, i) => (i === 0 ? s.name : s.name.charAt(0).toLowerCase() + s.name.slice(1))).join(" and ");

/** The short link label for a stage card (home journey and next-stage cards). */
export const stageLinkLabel = (stage: Stage) =>
  stage.id === "employ" ? "How Employer of Record works" : `More on ${stage.label.toLowerCase()}`;

/** Authored hand-offs between stages (never built from the stage verbs). */
export const handoff: Record<StageId, string> = {
  hire: "Once they accept, we can employ them.",
  employ: "Once they're on board, we run their payroll.",
  pay: "Once payroll runs, we help them grow.",
  grow: "Need more people? Start with hiring.",
};

export const stageById = (id: StageId): Stage => {
  const stage = stages.find((s) => s.id === id);
  if (!stage) throw new Error(`Unknown stage ${id}`);
  return stage;
};

export const homeFaq: QA[] = [
  {
    q: "What is an Employer of Record?",
    a: "An Employer of Record is a company that legally employs someone on your behalf. The person works for you full-time, while the Employer of Record holds the employment contract and handles payroll, taxes, statutory benefits and filings in India.",
  },
  {
    q: "Do we need an Indian company to hire through Pavani IT?",
    a: "No. Foreign companies hire through our Employer of Record service without an Indian entity. If you set one up later, we can transfer your team to it.",
  },
  {
    q: "How quickly can someone start?",
    a: "Mostly that depends on notice periods: many candidates in India serve 30 to 90 days with their current employer. Our side of the paperwork is ready before their first day.",
  },
  {
    q: "What do the new labour codes change?",
    a: "The four labour codes took effect on 21 November 2025. PF and gratuity are now calculated on a wider definition of wages, fixed-term employees qualify for gratuity after one year, and registrations and returns are consolidated. We review your salary structures and policies and tell you what needs to change.",
  },
  {
    q: "We already use payroll software. Why use Pavani IT?",
    a: "Software calculates. Someone still has to collect inputs, check them, file returns on time and answer employee questions. We do that work, on your software or ours.",
  },
];
