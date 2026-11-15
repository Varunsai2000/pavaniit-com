import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prices } from "@/content/site";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/content/schema";
import { handoff, servicesLine, stages, type Stage } from "@/content/stages";
import Art from "./Art";
import { CheckList, Crumbs, CtaBand, FaqSection, JsonLd, V } from "./bits";

/** Shared layout for the four stage pages. `children` slots in stage-specific sections. */
export default function StagePage({ stage, children }: { stage: Stage; children?: React.ReactNode }) {
  const stagePrices = prices.filter((p) => stage.priceIds.includes(p.id));
  const next = stages.find((s) => s.number === stage.number + 1) ?? stages[0];
  const crumbs = [
    { name: "Home", href: "/" },
    { name: stage.label, href: stage.href },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {serviceSchema(stage).map((s) => (
        <JsonLd key={s.name} data={s} />
      ))}
      <JsonLd data={faqSchema(stage.faq)} />

      <section className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <Crumbs items={[{ name: "Home", href: "/" }, { name: `${stage.number}. ${stage.label}: ${servicesLine(stage)}` }]} />
            <h1 className="h1">{stage.title}</h1>
            <p className="lead">{stage.lead}</p>
            <div className="page-hero-meta">
              {stagePrices.map((p) => (
                <p className="hero-price" key={p.id}>
                  {p.service}: <strong><V>{p.amount}</V></strong> {p.unit}
                </p>
              ))}
              <div className="hero-actions">
                <Link prefetch={false} className="btn btn-primary" href={`/contact/?need=${stage.id}`}>
                  Book a call
                  <ArrowRight aria-hidden="true" />
                </Link>
                <Link prefetch={false} className="btn btn-secondary" href="/pricing/">
                  Pricing
                </Link>
              </div>
            </div>
          </div>
          <div className="page-hero-art frame">
            <Art name={stage.id} priority sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
        </div>
      </section>

      <section className="section section-after-hero" aria-label={`${stage.label} services`}>
        <div className="wrap">
          {stage.services.map((service) => (
            <div className="service-block" id={service.id} key={service.id}>
              <div>
                <h2 className="h2">{service.name}</h2>
                <p className="lead">{service.short}</p>
              </div>
              <CheckList items={service.details} />
            </div>
          ))}
        </div>
      </section>

      {children}

      <section className="section-tight on-mist" aria-labelledby="next-stage">
        <div className="wrap next-stage">
          <div className="heading-stack">
            <h2 className="h2" id="next-stage">
              {handoff[stage.id]}
            </h2>
            <p className="lead">
              Each stage hands over cleanly to the next, so your people never fall between vendors.
            </p>
          </div>
          <Link prefetch={false} className="next-card" href={next.href}>
            <div className="stage-art frame frame-inset frame-fill">
              <Art name={next.id} sizes="(max-width: 520px) 100vw, 25vw" />
              <span className="stage-num" aria-hidden="true">{next.number}</span>
            </div>
            <div className="next-card-body">
              <p className="stage-name">{next.label}</p>
              <p className="muted">{servicesLine(next)}</p>
              <span className="text-link">
                {next.title}
                <ArrowRight aria-hidden="true" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <FaqSection items={stage.faq} title={`${stage.label}: common questions`} />
      <CtaBand />
    </>
  );
}
