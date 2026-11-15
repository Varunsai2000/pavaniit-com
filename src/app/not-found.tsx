import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap nf">
      <h1 className="h1">This page doesn&apos;t exist</h1>
      <p className="lead">The link may be old or mistyped. Everything about our services starts on the home page.</p>
      <div className="cta-actions">
        <Link className="btn btn-primary" href="/">Go to the home page</Link>
        <Link className="btn btn-secondary" href="/contact/">Contact us</Link>
      </div>
    </section>
  );
}
