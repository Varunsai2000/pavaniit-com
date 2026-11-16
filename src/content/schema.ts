import { real, site } from "./site";
import type { QA, Stage } from "./stages";

/** Structured data helpers. Placeholder values are omitted so nothing false ships. */

export const abs = (path: string) => new URL(path, site.url).toString();

export function organizationSchema() {
  const sameAs = [real(site.linkedin)].filter(Boolean);
  // City and state are enough for a valid address; the street joins once it's set.
  const address = real(site.city)
    ? {
        "@type": "PostalAddress",
        ...(real(site.address) ? { streetAddress: site.address } : {}),
        addressLocality: site.city,
        addressRegion: real(site.state),
        addressCountry: "IN",
      }
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": abs("/#organization"),
    name: site.name,
    legalName: real(site.legalName),
    url: abs("/"),
    logo: abs("/apple-touch-icon.png"),
    description: site.description,
    email: site.email,
    telephone: real(site.phone),
    address,
    areaServed: { "@type": "Country", name: "India" },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: abs("/"),
    name: site.name,
    publisher: { "@id": abs("/#organization") },
    inLanguage: "en-IN",
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

export function serviceSchema(stage: Stage) {
  return stage.services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.short,
    provider: { "@id": abs("/#organization") },
    areaServed: { "@type": "Country", name: "India" },
    url: abs(`${stage.href}#${service.id}`),
  }));
}

/** FAQPage no longer earns rich results in Google (2026), but it still labels Q&A for other engines. */
export function faqSchema(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
