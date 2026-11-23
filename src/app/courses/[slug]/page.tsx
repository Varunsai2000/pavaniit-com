import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CourseCards from "@/components/CourseCards";
import { CheckList, Crumbs, CtaBand, JsonLd, Words } from "@/components/bits";
import { classModes, courseBySlug, courseHref, courses, enquireHref, factsToAsk, lowerName, placementHelp } from "@/content/courses";
import { breadcrumbSchema, courseSchema } from "@/content/schema";
import { ogImage, real, site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => courses.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = courseBySlug((await params).slug);
  const title = `${course.name} course in ${site.city}`;
  const description = `${course.short} Taught live, in ${site.city} or online.`;
  return {
    title: `${title} | Pavani IT`,
    description,
    alternates: { canonical: courseHref(course) },
    openGraph: { title, description, url: courseHref(course), images: [ogImage] },
  };
}

export default async function Page({ params }: Props) {
  const course = courseBySlug((await params).slug);
  const others = [
    ...courses.filter((c) => c.track === course.track && c.slug !== course.slug),
    ...courses.filter((c) => c.track !== course.track),
  ].slice(0, 3);
  const facts = [
    { k: "Classes", v: classModes.map((m, i) => (i ? m.charAt(0).toLowerCase() + m.slice(1) : m)).join(", or ") },
    { k: "Duration", v: course.duration },
    { k: "Days and times", v: course.schedule },
    { k: "Fee", v: course.fee },
    { k: "Next batches", v: course.nextBatch },
    { k: "Covers", v: course.stack },
    { k: "Taught by", v: course.trainer },
  ].filter((f): f is { k: string; v: string } => Boolean(real(f.v)));
  // Facts not set yet are hidden, never shown as placeholders; the visitor is asked to enquire.
  const toAsk = factsToAsk(course);
  const fit = [
    { k: "Who it's for", v: course.forWho },
    { k: "Before you start", v: course.before },
    { k: "What you finish with", v: course.project },
    { k: "After the course", v: placementHelp },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Courses", href: "/courses/" },
          { name: course.name, href: courseHref(course) },
        ])}
      />
      <JsonLd data={courseSchema(course)} />

      <section className="page-hero">
        <div className="wrap hero-split">
          <div className="hero-copy">
            <Crumbs items={[{ name: "Home", href: "/" }, { name: "Courses", href: "/courses/" }, { name: course.name }]} />
            <h1 className="h1"><Words>{`${course.name} course`}</Words></h1>
            <p className="lead">{course.lead}</p>
            <div className="hero-actions">
              <Link prefetch={false} className="btn btn-primary" href={enquireHref(course)}>
                Ask about a batch
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link prefetch={false} className="btn btn-secondary" href="/courses/#courses">
                All courses
              </Link>
            </div>
          </div>
          <div className="course-facts">
            <h2 className="h4">At a glance</h2>
            <ul className="contact-facts">
              {facts.map((f) => (
                <li key={f.k}>
                  <span>{f.k}</span>
                  <span>{f.v}</span>
                </li>
              ))}
            </ul>
            {toAsk && (
              <p className="course-facts-note">
                Ask us for {toAsk}. We reply within one working day.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section ruled" aria-labelledby="learn-title">
        <div className="wrap">
          <div className="service-block">
            <div className="section-head">
              <h2 className="h2" id="learn-title">What you&apos;ll learn</h2>
              <p className="lead">The modules in order, with practical work in each one, then a final project.</p>
            </div>
            <CheckList items={course.modules} />
          </div>
        </div>
      </section>

      <section className="section ruled" aria-labelledby="fit-title">
        <div className="wrap depth">
          <div className="section-head">
            <h2 className="h2" id="fit-title">Is it for you?</h2>
          </div>
          <ul className="depth-list">
            {fit.map((f) => (
              <li key={f.k}><b>{f.k}</b><p>{f.v}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight on-mist" aria-labelledby="others-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="others-title">Other courses</h2>
          </div>
          <CourseCards items={others} columns={3} />
        </div>
      </section>

      <CtaBand
        title={`Ask about the next ${lowerName(course)} batch.`}
        body="Tell us how you'd like to attend. We reply within one working day with dates, timings and the fee."
        action={{ href: enquireHref(course), label: "Ask about a batch" }}
        pricingLink={false}
      />
    </>
  );
}
