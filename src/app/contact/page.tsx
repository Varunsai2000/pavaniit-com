import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { Crumbs, JsonLd, V, Words } from "@/components/bits";
import { breadcrumbSchema } from "@/content/schema";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Pavani IT: book a call",
  description: "Tell us who you want to hire in India. We reply within one working day to set up a 30-minute call.",
  alternates: { canonical: "/contact/" },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact/" }])} />
      <section className="section section-page-top">
        <div className="wrap contact-layout">
          <div className="page-intro">
            <Crumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
            <h1 className="h1"><Words>Tell us who you want to hire</Words></h1>
            <p className="lead">
              Share a few details and we&apos;ll reply within one working day to set up a 30-minute call.
            </p>
            <ul className="contact-facts">
              <li><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><span>Phone</span><span><V>{site.phone}</V></span></li>
              <li><span>Office</span><span><V>{site.address}</V>, <V>{site.city}</V></span></li>
              <li><span>Job seekers</span><span>Send your CV to <a href={`mailto:${site.careersEmail}`}>{site.careersEmail}</a></span></li>
            </ul>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
