import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

// One allow-all rule: search and AI answer crawlers (OAI-SearchBot, Claude-SearchBot,
// PerplexityBot, Googlebot, Bingbot) can all read the site. To opt out of AI *training*
// crawlers only, add disallow rules for GPTBot, ClaudeBot, Google-Extended or CCBot here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
