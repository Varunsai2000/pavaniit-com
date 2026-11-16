import type { Metadata } from "next";
import { Fragment } from "react";
import { Crumbs, CtaBand, JsonLd, Words } from "@/components/bits";
import { breadcrumbSchema } from "@/content/schema";
import { glossary, glossaryReviewed, glossarySources } from "@/content/glossary";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Glossary of Indian payroll and employment terms | Pavani IT",
  description:
    "Plain definitions of CTC, PF, UAN, ESI, professional tax, gratuity, TDS, full-and-final settlement, the labour codes and other Indian employment terms.",
  alternates: { canonical: "/glossary/" },
};

const reviewed = new Date(glossaryReviewed).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function Page() {
  const byId = new Map(glossary.map((t) => [t.id, t]));
  const termSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glossary of Indian payroll and employment terms",
    url: new URL("/glossary/", site.url).toString(),
    hasDefinedTerm: glossary.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      url: new URL(`/glossary/#${t.id}`, site.url).toString(),
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Glossary", href: "/glossary/" }])} />
      <JsonLd data={termSet} />
      <section className="page-hero">
        <div className="wrap page-hero-plain">
            <Crumbs items={[{ name: "Home", href: "/" }, { name: "Glossary" }]} />
            <div>
              <h1 className="h1"><Words>Indian payroll and employment terms</Words></h1>
              <p className="lead">
                Plain definitions of the words you will meet when employing people in India, from CTC to the labour
                codes. Last reviewed {reviewed}.
              </p>
            </div>
        </div>
      </section>

      <section className="section ruled">
        <div className="wrap doc">
          <aside className="doc-aside">
            <p className="h4">{glossary.length} terms</p>
            <nav aria-label="Terms">
              {glossary.map((t) => (
                <a key={t.id} href={`#${t.id}`}>{t.term}</a>
              ))}
            </nav>
          </aside>
          <div>
            <div className="terms">
              {glossary.map((t) => (
                <article className="term" id={t.id} key={t.id}>
                  <h2>{t.term}</h2>
                  <p>{t.definition}</p>
                  {t.related && (
                    <p className="term-related">
                      Related:{" "}
                      {t.related.map((r, i) => (
                        <Fragment key={r}>
                          {i > 0 && ", "}
                          <a href={`#${r}`}>{byId.get(r)?.term ?? r}</a>
                        </Fragment>
                      ))}
                    </p>
                  )}
                </article>
              ))}
            </div>
            <div className="prose glossary-sources">
              <h2>Sources</h2>
              <ul>
                {glossarySources.map((s) => (
                  <li key={s.href}><a href={s.href} rel="noopener">{s.label}</a></li>
                ))}
              </ul>
              <p>These definitions are general information, not legal or tax advice for your situation.</p>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
