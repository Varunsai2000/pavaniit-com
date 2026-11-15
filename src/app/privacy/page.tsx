import type { Metadata } from "next";
import { Crumbs, JsonLd, V } from "@/components/bits";
import { breadcrumbSchema } from "@/content/schema";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy notice | Pavani IT",
  description:
    "How Pavani IT collects, uses and protects personal data shared through this website, under India's Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/privacy/" },
};

const sections = [
  ["who", "Who we are"],
  ["collect", "What we collect"],
  ["why", "Why we use it"],
  ["share", "Who we share it with"],
  ["keep", "How long we keep it"],
  ["protect", "How we protect it"],
  ["rights", "Your rights"],
  ["contact", "Questions and complaints"],
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Privacy notice", href: "/privacy/" }])} />
      <section className="page-hero">
        <div className="wrap page-hero-plain">
          <Crumbs items={[{ name: "Home", href: "/" }, { name: "Privacy notice" }]} />
          <div>
            <h1 className="h1">Privacy notice</h1>
            <p className="lead">
              What personal data Pavani IT collects through this website, why, and what you can ask us to do with it.
              Last updated 15 November 2026.
            </p>
          </div>
        </div>
      </section>

      <section className="section ruled">
        <div className="wrap doc">
          <aside className="doc-aside">
            <p className="h4">On this page</p>
            <nav aria-label="Sections">
              {sections.map(([id, label]) => (
                <a key={id} href={`#${id}`}>{label}</a>
              ))}
            </nav>
          </aside>

          <article className="prose">
            <p className="prose-lead">
              This notice follows India&apos;s Digital Personal Data Protection Act, 2023 and the rules made under it.
            </p>

            <h2 id="who">Who we are</h2>
            <p>
              <V>{site.legalName}</V>, trading as Pavani IT, provides recruitment, contract staffing, Employer of Record,
              payroll and compliance, training and HR advisory services in India. For this website we decide why and how
              your personal data is used, which makes us the data fiduciary.
            </p>

            <h2 id="collect">What we collect</h2>
            <p><strong>When you send an enquiry,</strong> we receive your name, work email, company, country, the services you are interested in, approximate team size and anything you write in the message box.</p>
            <p><strong>When you send us your CV,</strong> we receive what it contains, usually your contact details, work history, education and skills.</p>
            <p><strong>When you visit the site,</strong> we don&apos;t use analytics, advertising or tracking cookies, and our fonts are served from our own domain.</p>
            <p>Please don&apos;t send government ID numbers, bank details or health information through the website. If we need them later, for example to employ you, we will ask through a secure channel and explain why.</p>

            <h2 id="why">Why we use it</h2>
            <ul>
              <li>To reply to your enquiry and discuss the services you asked about.</li>
              <li>To prepare a proposal and, if you become a client, to provide our services.</li>
              <li>To consider you for roles we are recruiting for, if you send us your CV.</li>
              <li>To meet legal obligations, such as keeping business records.</li>
            </ul>
            <p>We use enquiry details because you shared them for that purpose. We use your CV with your consent, and we ask before sharing it with any client.</p>

            <h2 id="share">Who we share it with</h2>
            <ul>
              <li><strong>Service providers</strong> that run parts of our business: the form service that delivers website enquiries to our inbox, and our email provider. They may only use your data to provide that service.</li>
              <li><strong>Clients,</strong> only for candidates, and only after you agree to be put forward for a specific role.</li>
              <li><strong>Government authorities,</strong> when the law requires it.</li>
            </ul>
            <p>We don&apos;t sell personal data or share it for advertising.</p>

            <h2 id="keep">How long we keep it</h2>
            <p>We keep enquiry details while we are in contact about your enquiry and delete them within 12 months of our last contact, unless you become a client. We keep CVs for up to 12 months so we can match you with new roles, unless you ask us to delete yours sooner. Where the law requires longer retention, we keep only what it requires.</p>

            <h2 id="protect">How we protect it</h2>
            <p>We limit access to the people who need it, use providers that encrypt data in transit, and review access regularly. If a breach affects your data, we will tell you and the Data Protection Board of India as the law requires.</p>

            <h2 id="rights">Your rights</h2>
            <p>You can ask us to:</p>
            <ul>
              <li>tell you what personal data we hold about you and how we use it,</li>
              <li>correct, complete or update it,</li>
              <li>delete it, where we no longer need it for a legal reason,</li>
              <li>withdraw your consent, for example to stop us considering your CV, and</li>
              <li>nominate someone to exercise these rights for you if you die or become unable to.</li>
            </ul>

            <h2 id="contact">Questions and complaints</h2>
            <p>Email <a href={`mailto:${site.email}?subject=Privacy`}>{site.email}</a> with &ldquo;Privacy&rdquo; in the subject line. We confirm receipt and respond within 30 days. If you are not satisfied with our answer, you can complain to the Data Protection Board of India.</p>
          </article>
        </div>
      </section>
    </>
  );
}
