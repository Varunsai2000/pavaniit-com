import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { stages } from "@/content/stages";

export const dynamic = "force-static";

// Update when a page's content really changes; search engines trust honest lastmod dates.
const UPDATED = "2026-11-16";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...stages.map((s) => s.href), "/pricing/", "/glossary/", "/about/", "/contact/", "/privacy/"];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: UPDATED }));
}
