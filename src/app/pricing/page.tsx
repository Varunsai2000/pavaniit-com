import type { Metadata } from "next";
import PriceCard from "@/components/PriceCard";
import { Crumbs, CtaBand, FaqSection, JsonLd } from "@/components/bits";
import { breadcrumbSchema } from "@/content/schema";
import { prices } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing: Employer of Record, recruitment and payroll in India | Pavani IT",
  description:
    "Published prices for Pavani IT's Employer of Record, recruitment, contract staffing, payroll and compliance, and training services in India.",
  alternates: { canonical: "/pricing/" },
};

const faq = [
  {
    q: "What does the Employer of Record fee include?",
    a: "The employment contract, monthly payroll and payslips, income tax deduction, PF, ESI, gratuity, professional tax and labour welfare fund, statutory leave, health insurance, onboarding and exits. Salaries and statutory employer costs are billed at cost on the same monthly invoice.",
  },
  {
    q: "Are there setup or exit fees?",
    a: "Any one-time fee is listed on this page and in your proposal. We don't add charges that aren't written down before you sign.",
  },
  {
    q: "How are we invoiced?",
    a: "One invoice a month covering salaries, statutory costs and our fee, raised before payroll runs so salaries are paid on time.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Pricing", href: "/pricing/" }])} />
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

      <section className="section" aria-labelledby="prices-title">
        <div className="wrap">
          <h2 className="sr-only" id="prices-title">
            Prices by service
          </h2>
          <div className="price-grid">
            {prices.map((p, i) => (
              <PriceCard key={p.id} price={p} lead={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faq} title="Pricing questions" />
      <CtaBand title="Want a quote for your team?" body="Tell us the roles, locations and start dates, and we'll send a written proposal." />
    </>
  );
}
