import type { Metadata } from "next";
import { Crumbs, CtaBand, JsonLd, Words } from "@/components/bits";
import { breadcrumbSchema } from "@/content/schema";
import { officeLine, people, real, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Pavani IT",
  description:
    "Pavani IT is an Indian HR company that recruits, employs, pays and trains people in India for companies abroad and Indian businesses.",
  alternates: { canonical: "/about/" },
};

const principles = [
  { k: "Prove it in writing", v: "Prices, scope and timelines go in the proposal before you sign. If it isn't written down, we don't charge for it." },
  { k: "India only", v: "We don't spread across 150 countries. Every rule we handle is one we work with every month." },
  { k: "One partner, four stages", v: "Hiring, employing, paying and training are handled by the same team, so nothing is lost between vendors." },
  { k: "Answer first", v: "Ask us a question and you get the answer, then the detail. Most of them are already on this site." },
];

/** Initials for the avatar circle. */
const initials = (name: string) => name.split(" ").map((p) => p[0]).slice(0, 2).join("");

/** Only people whose name and background are set; the section is left out until then. */
const team = people.filter((p) => real(p.name) && real(p.role) && real(p.background));

/** Company details for due diligence. Registered name, CIN and GSTIN appear once they're set in site.ts. */
const details = [
  { k: "Trading name", v: site.name },
  { k: "Registered name", v: real(site.legalName) },
  { k: "CIN", v: real(site.cin) },
  { k: "GSTIN", v: real(site.gstin) },
  { k: "Office", v: officeLine() },
  { k: "Works in", v: "India only, in every state where you employ people" },
].filter((d): d is { k: string; v: string } => Boolean(d.v));

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About", href: "/about/" }])} />
      <section className="page-hero">
        <div className="wrap page-hero-plain">
            <Crumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
            <div>
              <h1 className="h1"><Words>An Indian employer for teams built from anywhere</Words></h1>
              <p className="lead">
                Pavani IT recruits, employs, pays and trains people in India for companies abroad and for Indian
                businesses. We are based in {site.city}, {site.state}, and run payroll and statutory compliance ourselves.
              </p>
            </div>
        </div>
      </section>

      <section className="section ruled" aria-labelledby="how-title">
        <div className="wrap depth">
          <div className="section-head">
            <h2 className="h2" id="how-title">How we work</h2>
          </div>
          <ul className="depth-list">
            {principles.map((p) => (
              <li key={p.k}><b>{p.k}</b><p>{p.v}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {team.length > 0 && (
        <section className="section ruled" aria-labelledby="people-title">
          <div className="wrap">
            <div className="section-head">
              <h2 className="h2" id="people-title">Who you will work with</h2>
              <p className="lead">The people who review our guides and answer your questions.</p>
            </div>
            <div className="people">
              {team.map((p) => (
                <article className="person-card" key={p.role}>
                  <span className="avatar" aria-hidden="true">{initials(p.name)}</span>
                  <div>
                    <h3 className="h3">{p.name}</h3>
                    <p className="person-role">{p.role}</p>
                    <p>{p.background}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section ruled" aria-labelledby="details-title">
        <div className="wrap depth">
          <div className="section-head">
            <h2 className="h2" id="details-title">Company details</h2>
            <p className="lead">For your supplier checks.</p>
          </div>
          <ul className="contact-facts">
            {details.map((d) => (
              <li key={d.k}><span>{d.k}</span><span>{d.v}</span></li>
            ))}
            <li><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
