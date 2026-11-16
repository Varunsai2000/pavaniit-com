import { Words } from "@/components/bits";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap nf">
      <h1 className="h1"><Words>{"This page doesn’t exist"}</Words></h1>
      <p className="lead">The link may be old or mistyped. Everything about our services starts on the home page.</p>
      <div className="cta-actions">
        <Link prefetch={false} className="btn btn-primary" href="/">Go to the home page</Link>
        <Link prefetch={false} className="btn btn-secondary" href="/contact/">Contact us</Link>
      </div>
    </section>
  );
}
