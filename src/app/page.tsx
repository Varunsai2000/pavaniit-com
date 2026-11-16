import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Art from "@/components/Art";
import Journey from "@/components/Journey";
import MonthCycle from "@/components/MonthCycle";
import PriceCard from "@/components/PriceCard";
import { ComparisonTable } from "@/components/EorTables";
import { ArrowText, CtaBand, FaqSection, JsonLd, MoreLink, V, Words } from "@/components/bits";
import { faqSchema } from "@/content/schema";
import { eorPlanCards, eorPlans } from "@/content/site";
import { handoff, homeFaq, stageLinkLabel, stages } from "@/content/stages";

export const metadata: Metadata = {
  title: "Employer of Record in India | Pavani IT",
  description:
    "Hire full-time employees in India without an Indian entity. Pavani IT recruits, employs, pays and trains your team under Indian law, with payroll and compliance run in-house.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hire your team in India without setting up a company",
    description: "Pavani IT is an Indian Employer of Record: contracts, payroll, PF, ESI, tax and exits handled under Indian law.",
    url: "/",
  },
};


const monthly = [
  { k: "Inputs", v: "Attendance, leave, new joiners and exits collected from you and checked." },
  { k: "Payroll", v: "Salaries, deductions and employer costs calculated, then approved by you." },
  { k: "Payments", v: "Salaries paid and statutory dues deposited on time." },
  { k: "Report", v: "One report: who was paid, what was deducted, what was filed, what is due next." },
];

const depth = [
  { k: "Notice periods", v: "Most candidates serve 30 to 90 days' notice. We stay in touch through it, so accepted offers turn into people who join." },
  { k: "State rules", v: "Professional tax, labour welfare fund and shops and establishments rules differ by state. We register and file in each state you employ in." },
  { k: "The labour codes", v: "In force since 21 November 2025, with each state's own rules on top. Salary structures have to meet the new definition of wages." },
  { k: "Exit deadlines", v: "Under the Code on Wages, dues on exit must be paid within two working days, so we plan the full-and-final settlement before the last day." },
  { k: "CTC offers", v: "Indian offers are quoted as annual cost to company. We show you and the candidate what monthly take-home pay will be before anyone signs." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="hero-split">
            <div className="hero-copy">
              <h1 className="display" id="hero-title">
                <Words>Hire your team in India without setting up a company.</Words>
              </h1>
              <p className="lead">
                Pavani IT is an Indian Employer of Record. We employ your people under Indian law and run their
                contracts, payroll, PF, ESI, tax and exits, while they work full-time for you.
              </p>
              <div className="hero-actions">
                <Link prefetch={false} className="btn btn-primary" href="/contact/">
                  Book a call
                  <ArrowRight aria-hidden="true" />
                </Link>
                <Link prefetch={false} className="btn btn-secondary" href="/pricing/">
                  See pricing
                </Link>
              </div>
              <p className="hero-price">
                From <strong>{eorPlans[1].usd}</strong> {eorPlans[1].unit}. No Indian entity needed.
              </p>
            </div>
            <div className="hero-visual frame frame-fill">
              <Art name="hero" className="hero-art" priority sizes="(max-width: 960px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section on-mist" aria-labelledby="stages-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="stages-title">
              From offer letter to appraisal
            </h2>
            <p className="lead">
              Pick one service or all of them. Each stage hands over cleanly to the next, so your people never fall
              between vendors.
            </p>
          </div>

          <Journey>
            <ol className="journey-grid">
              {stages.map((stage) => (
                <li key={stage.id}>
                  <article className="stage">
                    <div className="stage-art frame frame-inset">
                      <Art name={stage.id} />
                      <span className="stage-num" aria-hidden="true">{stage.number}</span>
                    </div>
                    <div className="stage-body">
                      <h3 className="stage-name">{stage.label}</h3>
                      <p className="stage-services dot-list">
                        {stage.services.map((s, i) => (
                          <span key={s.id}>
                            {i > 0 && <span className="sr-only">, </span>}
                            {s.name}
                          </span>
                        ))}
                      </p>
                      <p className="stage-handoff">{handoff[stage.id]}</p>
                    </div>
                    <div className="stage-foot">
                      <Link prefetch={false} className="text-link stage-link" href={stage.href}>
                        <ArrowText>{stageLinkLabel(stage)}</ArrowText>
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </Journey>
        </div>
      </section>

      <section className="section on-ink" aria-labelledby="cycle-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="cycle-title">
              Every month in India runs to the same calendar.
            </h2>
            <p className="lead">
              Employing someone in India means a fixed cycle of salary payments and statutory filings, with state rules
              on top. We run all of it and send you one report.
            </p>
          </div>
          <div className="cycle">
            <MonthCycle />
            <ol className="cycle-steps">
              {monthly.map((m, i) => (
                <li key={m.k}>
                  <span className="cycle-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="h4">{m.k}</h3>
                    <p>{m.v}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section ruled" aria-labelledby="compare-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="compare-title">
              Employer of Record, your own entity, or contractors?
            </h2>
            <p className="lead">
              There are three ways to have people working for you in India. An Employer of Record is the fastest way to
              employ them properly.
            </p>
          </div>
          <ComparisonTable />
          <div className="section-foot">
            <MoreLink href="/employer-of-record-india/">How Employer of Record works in India</MoreLink>
          </div>
        </div>
      </section>

      <section className="section ruled" aria-labelledby="pricing-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="pricing-title">
              Prices, in writing
            </h2>
            <p className="lead">
              Employer of Record is one monthly fee per person, on top of their salary and statutory costs. Every fee is
              in the proposal before you sign.
            </p>
          </div>
          <div className="price-grid">
            {eorPlanCards.map((p, i) => (
              <PriceCard key={p.id} price={p} lead={i === 0} />
            ))}
          </div>
          <div className="section-foot">
            <MoreLink href="/pricing/">All prices, with a monthly cost example</MoreLink>
          </div>
        </div>
      </section>

      <section className="section ruled" aria-labelledby="depth-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="depth-title">
              We only work in India, so we know the details.
            </h2>
            <p className="lead">These are the details that decide whether employing someone in India goes smoothly.</p>
          </div>
          <ol className="ledger">
            {depth.map((d, i) => (
              <li key={d.k}>
                <span className="ledger-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ledger-k">{d.k}</h3>
                <p>{d.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection items={homeFaq} ruled />
      <CtaBand />
    </>
  );
}
