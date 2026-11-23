import type { Metadata } from "next";
import Link from "next/link";
import CourseEnquiryForm from "@/components/CourseEnquiryForm";
import { Crumbs, JsonLd, Words } from "@/components/bits";
import { breadcrumbSchema } from "@/content/schema";
import { officeLine, ogImage, real, site } from "@/content/site";

const description = "Tell us which course you're interested in. We reply within one working day with the next batch dates, timings and the fee.";

export const metadata: Metadata = {
  title: "Ask about a course batch | Pavani IT",
  description,
  alternates: { canonical: "/courses/enquire/" },
  openGraph: { title: "Ask about a course batch", description, url: "/courses/enquire/", images: [ogImage] },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Courses", href: "/courses/" },
          { name: "Ask about a batch", href: "/courses/enquire/" },
        ])}
      />
      <section className="section section-page-top">
        <div className="wrap contact-layout">
          <div className="page-intro">
            <Crumbs items={[{ name: "Home", href: "/" }, { name: "Courses", href: "/courses/" }, { name: "Ask about a batch" }]} />
            <h1 className="h1"><Words>Ask about a batch</Words></h1>
            <p className="lead">{description}</p>
            <ul className="contact-facts">
              <li><span>Email</span><a href={`mailto:${site.email}?subject=Course%20enquiry`}>{site.email}</a></li>
              {real(site.phone) && (
                <li><span>Phone</span><a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a></li>
              )}
              <li><span>Classroom</span><span>{officeLine()}</span></li>
              <li><span>Companies</span><span>Training a team? <Link prefetch={false} href="/contact/?need=grow">Book a call</Link> instead.</span></li>
            </ul>
          </div>
          <CourseEnquiryForm />
        </div>
      </section>
    </>
  );
}
