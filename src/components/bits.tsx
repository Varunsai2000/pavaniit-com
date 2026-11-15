import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Check, GraduationCap, IdCard, Plus, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { isPlaceholder } from "@/content/site";
import type { QA, StageId } from "@/content/stages";
import Art from "./Art";

/** Renders a site.ts value; placeholders get a dashed outline so they're easy to find. */
export function V({ children }: { children: string }) {
  return isPlaceholder(children) ? (
    <span className="ph" title="Placeholder: set in src/content/site.ts">
      {children}
    </span>
  ) : (
    <>{children}</>
  );
}

export const stageIcon: Record<StageId, LucideIcon> = {
  hire: BriefcaseBusiness,
  employ: IdCard,
  pay: Wallet,
  grow: GraduationCap,
};

export function Tick() {
  return (
    <span className="tick" aria-hidden="true">
      <Check strokeWidth={3} />
    </span>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" strokeWidth={2.4} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>
            {item.q}
            <Plus aria-hidden="true" />
          </summary>
          <div className="answer">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ items, title = "Questions buyers ask us" }: { items: QA[]; title?: string }) {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="wrap faq-layout">
        <div className="section-head">
          <h2 className="h2" id="faq-title">
            {title}
          </h2>
        </div>
        <Faq items={items} />
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Tell us who you want to hire in India.",
  body = "A 30-minute call is enough to tell you which services you need, what they cost and how soon someone could start.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="section-tight" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta-band">
          <div className="cta-copy">
            <h2 className="h2" id="cta-title">
              {title}
            </h2>
            <p>
              {body} Prefer email? Write to <a href="mailto:hello@pavaniit.com">hello@pavaniit.com</a>.
            </p>
            <div className="cta-actions">
              <Link prefetch={false} className="btn btn-light" href="/contact/">
                Book a call
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link prefetch={false} className="btn btn-ghost-light" href="/pricing/">
                See pricing
              </Link>
            </div>
          </div>
          <div className="cta-art frame frame-inset frame-fill">
            <Art name="hire" decorative sizes="(max-width: 860px) 100vw, 45vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Link text with a trailing arrow; the last word and the arrow never wrap apart. */
export function ArrowText({ children }: { children: string }) {
  const i = children.lastIndexOf(" ");
  return (
    <>
      {children.slice(0, i + 1)}
      <span className="nowrap">
        {children.slice(i + 1)}
        <ArrowRight aria-hidden="true" />
      </span>
    </>
  );
}

export function MoreLink({ href, children }: { href: string; children: string }) {
  return (
    <Link prefetch={false} className="text-link" href={href}>
      <ArrowText>{children}</ArrowText>
    </Link>
  );
}

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        {items.map((item) =>
          item.href ? (
            <li key={item.name}>
              <Link prefetch={false} href={item.href}>{item.name}</Link>
            </li>
          ) : (
            <li key={item.name} aria-current="page">
              {item.name}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
