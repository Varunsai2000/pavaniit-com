import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Art from "@/components/Art";
import Journey from "@/components/Journey";
import LiveClock from "@/components/LiveClock";
import MonthCycle from "@/components/MonthCycle";
import PriceCard from "@/components/PriceCard";
import { ComparisonTable } from "@/components/EorTables";
import { ArrowText, CtaBand, FaqSection, JsonLd, MoreLink, V } from "@/components/bits";
import { faqSchema } from "@/content/schema";
import { prices } from "@/content/site";
import { homeFaq, stages } from "@/content/stages";

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

const eor = prices.find((p) => p.id === "eor")!;
const homePrices = ["eor", "recruitment", "payroll"].map((id) => prices.find((p) => p.id === id)!);

const monthly = [
  { k: "Inputs", v: "Attendance, leave, new joiners and exits collected from you and checked." },
  { k: "Payroll", v: "Salaries, deductions and employer costs calculated, then approved by you." },
  { k: "Payments", v: "Salaries paid and statutory dues deposited on time." },
  { k: "Report", v: "One report: who was paid, what was deducted, what was filed, what is due next." },
];

const depth = [
  { k: "Notice periods", v: "Most candidates serve 30 to 90 days' notice. We stay in touch through it, so accepted offers turn into people who join." },
  { k: "State rules", v: "Professional tax, labour welfare fund and shops and establishments rules differ by state. We register and file in each state you employ in." },
  { k: "The labour codes", v: "In force since 21 November 2025, with states still issuing their rules. Salary structures have to meet the new definition of wages." },
  { k: "Exit deadlines", v: "Under the Code on Wages, dues on exit must be paid within two working days, so we plan the full-and-final settlement before the last day." },
  { k: "CTC offers", v: "Indian offers are quoted as annual cost to company. We show you and the candidate what monthly take-home pay will be before anyone signs." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="hero-top">
            <h1 className="display hero-title" id="hero-title">
              Hire your team in India without setting up a company.
            </h1>
            <div className="hero-side">
              <p className="lead">
                Pavani IT is an Indian Employer of Record. We employ your people under Indian law and run their
                contracts, payroll, PF, ESI, tax and exits, while they work full-time for you.
              </p>
              <ol className="service-index" aria-label="Services">
                {stages.map((stage) => (
                  <li key={stage.id}>
                    <Link prefetch={false} className="index-row" href={stage.href}>
                      <span className="index-n" aria-hidden="true">{String(stage.number).padStart(2, "0")}</span>
                      <span className="index-name">{stage.label}<span className="sr-only">:</span></span>
                      <span className="index-svc">
                        {stage.services.map((s, i) => (
                          <span key={s.id}>
                            {i > 0 && <span className="sr-only">, </span>}
                            {s.name}
                          </span>
                        ))}
                      </span>
                      <ArrowRight className="index-arrow" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
            <div className="hero-actions hero-cta">
              <Link prefetch={false} className="btn btn-primary" href="/contact/">
                Book a call
                <ArrowRight aria-hidden="true" />
              </Link>
              <p className="hero-price">
                Employer of Record from <strong><V>{eor.amount}</V></strong> {eor.unit}.
              </p>
            </div>
          </div>


          <div className="hero-scene frame">
            <Art name="hero" className="hero-art" priority sizes="(max-width: 1440px) 100vw, 1360px" />
            <LiveClock />
            <div className="float float-filings" aria-hidden="true">
              <div className="float-head">
                November filings
                <span className="float-ex">Example</span>
              </div>
              <ul className="rows">
                <li><span className="d">7</span><span>TDS for October</span><span className="badge badge-done">Filed</span></li>
                <li><span className="d">15</span><span>PF and ESI</span><span className="badge badge-done">Filed</span></li>
                <li><span className="d">30</span><span>November salaries</span><span className="badge badge-due">Scheduled</span></li>
              </ul>
            </div>
            <div className="float float-pay" aria-hidden="true">
              <div className="float-head">
                October payroll
                <span className="float-ex">Example</span>
              </div>
              <p className="money">₹38,42,600</p>
              <p className="money-sub">
                Net salaries to 18 people <span className="badge badge-done"><Check strokeWidth={3} />Paid 30 Oct</span>
              </p>
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
                      {stage.services.map((s) => (
                        <div className="stage-svc" key={s.id}>
                          <h4>{s.name}</h4>
                          <p>{s.short}</p>
                        </div>
                      ))}
                    </div>
                    <div className="stage-foot">
                      <Link prefetch={false} className="text-link stage-link" href={stage.href}>
                        <ArrowText>
                          {stage.label === "Employ" ? "How Employer of Record works" : `More on ${stage.label.toLowerCase()}`}
                        </ArrowText>
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
              What you pay for the services most companies start with. Every fee is in the proposal before you sign.
            </p>
          </div>
          <div className="price-grid">
            {homePrices.map((p, i) => (
              <PriceCard key={p.id} price={p} lead={i === 0} />
            ))}
          </div>
          <div className="section-foot">
            <MoreLink href="/pricing/">All prices, including staffing and training</MoreLink>
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

      <FaqSection items={homeFaq} />
      <CtaBand />
    </>
  );
}
