import Link from "next/link";
import { courseHref, courses, enquireHref } from "@/content/courses";
import { legalName, officeLine, real, site } from "@/content/site";
import { stages } from "@/content/stages";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link prefetch={false} className="brand" href="/" aria-label="Pavani IT home">
              Pavani IT
            </Link>
            <p>Employer of Record, recruitment, payroll and training in India, and software courses for individuals.</p>
            <p>{officeLine()}</p>
          </div>

          <div className="footer-col">
            <h2>Services</h2>
            <ul>
              {stages.flatMap((stage) =>
                stage.services.map((s) => (
                  <li key={s.id}>
                    <Link prefetch={false} href={`${stage.href}#${s.id}`}>{s.name}</Link>
                  </li>
                )),
              )}
            </ul>
          </div>

          <div className="footer-col">
            <h2>Courses</h2>
            <ul>
              {courses.map((c) => (
                <li key={c.slug}>
                  <Link prefetch={false} href={courseHref(c)}>{c.name}</Link>
                </li>
              ))}
              <li><Link prefetch={false} href={enquireHref()}>Ask about a batch</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>Company</h2>
            <ul>
              <li><Link prefetch={false} href="/about/">About</Link></li>
              <li><Link prefetch={false} href="/pricing/">Pricing</Link></li>
              <li><Link prefetch={false} href="/contact/">Contact</Link></li>
              <li><a href={`mailto:${site.careersEmail}?subject=Job%20application`}>Careers</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>Resources</h2>
            <ul>
              <li><Link prefetch={false} href="/glossary/">Glossary of Indian HR terms</Link></li>
              <li><Link prefetch={false} href="/employer-of-record-india/#eor-vs-entity">EOR or your own entity?</Link></li>
              <li><Link prefetch={false} href="/privacy/">Privacy notice</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-legal">
          <span>
            © {new Date().getFullYear()} {legalName()}.
            {real(site.cin) && <> CIN {site.cin}.</>}
            {real(site.gstin) && <> GSTIN {site.gstin}.</>}
          </span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {real(site.phone) && <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>}
        </div>
      </div>
    </footer>
  );
}
