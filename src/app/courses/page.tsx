import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Art from "@/components/Art";
import CourseCards from "@/components/CourseCards";
import { Crumbs, CtaBand, FaqSection, JsonLd, MoreLink, Words } from "@/components/bits";
import { batchSteps, catalogueLine, courses, coursesIn, enquireHref, learnerFaq, tracks, whyLearn } from "@/content/courses";
import { breadcrumbSchema, courseListSchema, courseSchema, faqSchema } from "@/content/schema";
import { ogImage, site } from "@/content/site";

const title = `AI and software courses in ${site.city} and live online`;
const description = `Agentic AI, forward deployed engineer, Claude Code and Codex, full-stack, cloud and data engineering courses, taught live in ${site.city} or online.`;

export const metadata: Metadata = {
  title: `${title} | Pavani IT`,
  description,
  alternates: { canonical: "/courses/" },
  openGraph: { title, description, url: "/courses/", images: [ogImage] },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Courses", href: "/courses/" }])} />
      <JsonLd data={courseListSchema()} />
      {courses.map((c) => (
        <JsonLd key={c.slug} data={courseSchema(c)} />
      ))}
      <JsonLd data={faqSchema(learnerFaq)} />

      <section className="page-hero">
        <div className="wrap hero-split">
          <div className="hero-copy">
            <Crumbs items={[{ name: "Home", href: "/" }, { name: "Courses" }]} />
            <h1 className="h1"><Words>{title}</Words></h1>
            <p className="lead">
              Pavani IT teaches the skills engineering roles ask for now: {catalogueLine}. Every class is
              taught live, in our {site.city} classroom or online, and when you finish you can join our recruitment
              pool.
            </p>
            <div className="hero-actions">
              <Link prefetch={false} className="btn btn-primary" href={enquireHref()}>
                Ask about a batch
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link prefetch={false} className="btn btn-secondary" href="#courses">
                See the courses
              </Link>
            </div>
          </div>
          <div className="hero-visual frame frame-fill">
            <Art name="grow" priority sizes="(max-width: 960px) 100vw, (max-width: 1360px) 50vw, 640px" />
          </div>
        </div>
      </section>

      <section className="section on-mist" id="courses" aria-labelledby="courses-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="courses-title">Choose a course</h2>
            <p className="lead">
              Each course runs in the classroom and live online, and ends with a project you build yourself.
            </p>
          </div>
          {tracks.map((t) => (
            <div className="course-track" key={t.id}>
              <div className="course-track-head">
                <h3 className="h3">{t.title}</h3>
                <p>{t.lead}</p>
              </div>
              <CourseCards items={coursesIn(t.id)} columns={3} level={4} />
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="why-title">Why learn with us</h2>
            <p className="lead">We hire for these skills as well as teach them, so the courses follow what employers ask for.</p>
          </div>
          <ol className="ledger">
            {whyLearn.map((d, i) => (
              <li key={d.k}>
                <span className="ledger-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ledger-k">{d.k}</h3>
                <p>{d.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section on-mist" aria-labelledby="batch-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="batch-title">How a batch works</h2>
            <p className="lead">From your first question to your finished project.</p>
          </div>
          <ol className="steps">
            {batchSteps.map((s, i) => (
              <li key={s.k}>
                <span className="step-n" aria-hidden="true">{i + 1}</span>
                <h3 className="h4">{s.k}</h3>
                <p>{s.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="teams-title">
        <div className="wrap next-stage">
          <div className="section-head">
            <h2 className="h2" id="teams-title">Training a team?</h2>
            <p className="lead">
              Companies can book the same topics for their own engineers, built around the stack they use, on-site or
              live online.
            </p>
          </div>
          <div>
            <MoreLink href="/corporate-training-india/">Corporate training for companies</MoreLink>
          </div>
        </div>
      </section>

      <FaqSection items={learnerFaq} title="Questions learners ask us" ruled />
      <CtaBand
        title="Ask about the next batch."
        body="Tell us which course you're interested in and how you'd like to attend. We reply within one working day with dates, timings and the fee."
        action={{ href: enquireHref(), label: "Ask about a batch" }}
        pricingLink={false}
      />
    </>
  );
}
