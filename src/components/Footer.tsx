import Link from "next/link";
import { site } from "@/content/site";
import { stages } from "@/content/stages";
import { V } from "./bits";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link prefetch={false} className="brand" href="/" aria-label="Pavani IT home">
              Pavani IT
            </Link>
            <p>Recruitment, Employer of Record, payroll, compliance and training in India.</p>
            <p>
              <V>{site.address}</V>, <V>{site.city}</V>
            </p>
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
            <h2>Company</h2>
            <ul>
              <li><Link prefetch={false} href="/about/">About</Link></li>
              <li><Link prefetch={false} href="/pricing/">Pricing</Link></li>
              <li><Link prefetch={false} href="/contact/">Contact</Link></li>
              <li><a href={`mailto:${site.careersEmail}`}>Careers</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>Resources</h2>
            <ul>
              <li><Link prefetch={false} href="/glossary/">Glossary of Indian HR terms</Link></li>
              <li><Link prefetch={false} href="/employer-of-record-india/#eor-vs-entity">EOR or your own entity?</Link></li>
              <li><a href="/llms.txt">llms.txt</a></li>
              <li><Link prefetch={false} href="/privacy/">Privacy notice</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-legal">
          <span>
            © {new Date().getFullYear()} <V>{site.legalName}</V>. CIN <V>{site.cin}</V>. GSTIN <V>{site.gstin}</V>.
          </span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <V>{site.phone}</V>
        </div>
      </div>
    </footer>
  );
}
