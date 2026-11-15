import type { Metadata } from "next";
import Link from "next/link";
import PriceCard from "@/components/PriceCard";
import { ArrowText, CheckList, Crumbs, CtaBand, FaqSection, JsonLd, V } from "@/components/bits";
import { abs, breadcrumbSchema } from "@/content/schema";
import { eorCovered, eorExample, eorNotes, eorPlanCards, eorPlans, prices } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing: Employer of Record in India from €62 a month | Pavani IT",
  description:
    "Employer of Record in India: €78 (₹8,200) per employee per month, €62 from six employees, €23 per contractor. See a full monthly cost example and what the fee covers.",
  alternates: { canonical: "/pricing/" },
};

const faq = [
  {
    q: "What does the Employer of Record fee include?",
    a: "Onboarding and employment documentation, monthly payroll and salary disbursement, PF registration and remittances, ESI where applicable, TDS and professional tax, GST invoicing and statutory filings, employee records and leave, and exit formalities with the full-and-final settlement.",
  },
  {
    q: "What do we pay on top of the salary?",
    a: "Employer PF (8%), ESI where applicable, our fee, 18% GST on the fee, and a 1% FX conversion fee on payments from abroad. For a ₹50,000 monthly salary that comes to about ₹64,313 (€611) a month.",
  },
  {
    q: "Is there a deposit?",
    a: "A one-month refundable salary deposit may apply. It is written into your proposal before you sign.",
  },
  {
    q: "How are we invoiced?",
    a: "One invoice a month covering salaries, statutory costs and our fee, raised before payroll runs so salaries are paid on time.",
  },
];

const others = prices.filter((p) => p.id !== "eor");

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Employer of Record in India",
  serviceType: "Employer of Record",
  provider: { "@id": abs("/#organization") },
  areaServed: { "@type": "Country", name: "India" },
  url: abs("/pricing/"),
  offers: eorPlans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    priceSpecification: [
      { "@type": "UnitPriceSpecification", price: p.priceEur, priceCurrency: "EUR", unitText: p.unit },
      { "@type": "UnitPriceSpecification", price: p.priceInr, priceCurrency: "INR", unitText: p.unit },
    ],
  })),
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Pricing", href: "/pricing/" }])} />
      <JsonLd data={offerSchema} />

      <section className="page-hero">
        <div className="wrap page-hero-plain">
          <Crumbs items={[{ name: "Home", href: "/" }, { name: "Pricing" }]} />
          <div>
            <h1 className="h1">Pricing</h1>
            <p className="lead">
              Every fee for every service, in writing. Salaries and statutory employer costs are passed through at
              cost; what you see here is what Pavani IT charges on top.
            </p>
          </div>
        </div>
      </section>

      <section className="section ruled" aria-labelledby="eor-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="eor-title">Employer of Record</h2>
            <p className="lead">One monthly fee per person, on top of their salary and statutory costs.</p>
          </div>
          <div className="price-grid">
            {eorPlanCards.map((p, i) => (
              <PriceCard key={p.id} price={p} lead={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="section on-mist" aria-labelledby="month-title">
        <div className="wrap depth">
          <div className="section-head">
            <h2 className="h2" id="month-title">What a month costs</h2>
            <p className="lead">
              A worked example for one employee on a monthly salary of {eorExample.salary}. Euro figures are
              approximate.
            </p>
          </div>
          <div className="receipt-wrap">
            <table className="receipt">
              <caption className="sr-only">Estimated monthly cost for one employee on a {eorExample.salary} monthly salary</caption>
              <thead>
                <tr>
                  <th scope="col">Cost</th>
                  <th scope="col">EUR</th>
                  <th scope="col">INR</th>
                </tr>
              </thead>
              <tbody>
                {eorExample.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td>{r.eur}</td>
                    <td>{r.inr}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">{eorExample.total.label}</th>
                  <td>{eorExample.total.eur}</td>
                  <td>{eorExample.total.inr}</td>
                </tr>
              </tfoot>
            </table>
            <ul className="receipt-notes">
              {eorNotes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="covered-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="covered-title">What the fee covers</h2>
            <p className="lead">Everything we run for each employee, every month.</p>
          </div>
          <div className="check-list-2">
            <CheckList items={eorCovered} />
          </div>
        </div>
      </section>

      <section className="section ruled" aria-labelledby="others-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="others-title">Other services</h2>
            <p className="lead">Recruitment, contract staffing, payroll for your own entity, and training.</p>
          </div>
          <ul className="price-list">
            {others.map((p) => (
              <li key={p.id} id={`price-${p.id}`}>
                <div className="pl-name">
                  <h3>{p.service}</h3>
                  <p>{p.stage}</p>
                </div>
                <div className="pl-price">
                  <p className="pl-amount"><V>{p.amount}</V></p>
                  <p>{p.unit}</p>
                </div>
                <ul className="pl-includes">
                  {p.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link prefetch={false} className="text-link pl-cta" href={`/contact/?need=${p.stage.toLowerCase()}`}>
                  <ArrowText>Get a quote</ArrowText>
                  <span className="sr-only"> for {p.service}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection items={faq} title="Pricing questions" ruled />
      <CtaBand title="Want a quote for your team?" body="Tell us the roles, locations and start dates, and we'll send a written proposal." pricingLink={false} />
    </>
  );
}
