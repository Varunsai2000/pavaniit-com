import type { Metadata } from "next";
import Link from "next/link";
import { Words } from "@/components/bits";
import { stages } from "@/content/stages";

export const metadata: Metadata = {
  title: "Page not found | Pavani IT",
};

export default function NotFound() {
  return (
    <section className="wrap nf">
      <h1 className="h1"><Words>{"This page doesn’t exist"}</Words></h1>
      <p className="lead">The link may be old or mistyped. Everything about our services starts on the home page.</p>
      <div className="cta-actions">
        <Link prefetch={false} className="btn btn-primary" href="/">Go to the home page</Link>
        <Link prefetch={false} className="btn btn-secondary" href="/contact/">Contact us</Link>
      </div>
      <p className="nf-links">
        Or go straight to{" "}
        {stages.map((s) => (
          <span key={s.id}>
            <Link prefetch={false} href={s.href}>{s.label}</Link>,{" "}
          </span>
        ))}
        or <Link prefetch={false} href="/pricing/">Pricing</Link>.
      </p>
    </section>
  );
}
