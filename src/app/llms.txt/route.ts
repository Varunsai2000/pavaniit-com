import { glossary } from "@/content/glossary";
import { eorExample, eorPlans, prices, real, site, unitJoin } from "@/content/site";
import { homeFaq, stages } from "@/content/stages";

export const dynamic = "force-static";

/**
 * /llms.txt: a plain-text summary for AI agents (llmstxt.org). It doesn't help
 * Google Search, but assistants that fetch it get the facts without parsing HTML.
 * Placeholder values from site.ts are left out.
 */
export function GET() {
  const url = (p: string) => `${site.url}${p}`;
  const lines: string[] = [];
  lines.push(`# ${site.name}`, "");
  lines.push(`> ${site.description}`, "");
  lines.push(
    "Pavani IT works only in India. AI handles the routine work and people handle the rest, which keeps fees low. Services are organised as four stages: Hire (recruitment, contract staffing), Employ (Employer of Record, onboarding), Pay (payroll, statutory compliance) and Grow (corporate training, hire-train-deploy).",
  );
  const location = [real(site.city), real(site.state)].filter(Boolean).join(", ");
  if (location) lines.push(`Based in ${location}, India.`);
  lines.push(`Contact: ${site.email}${real(site.phone) ? `, ${site.phone}` : ""}`, "");

  lines.push("## Services", "");
  for (const s of stages) {
    lines.push(`- [${s.title}](${url(s.href)}): ${s.lead}`);
  }
  lines.push("");

  const published = prices.filter((p) => real(p.amount));
  lines.push("## Pricing", "");
  if (published.length) {
    for (const p of published) lines.push(`- ${p.service}: ${p.amount}${p.amountLocal ? ` (${p.amountLocal})` : ""}${unitJoin(p)}${p.unit}`);
    lines.push(`- Employer of Record packages: ${eorPlans.map((p) => `${p.name} ${p.usd} (${p.inr}) ${p.unit}`).join("; ")}`);
    lines.push(`- Example: one employee on ${eorExample.salary} a month costs about ${eorExample.total.inr} (${eorExample.total.usd}) a month in total: ${eorExample.rows.map((r) => `${r.label} ${r.inr}`).join(", ")}.`);
    lines.push(`- [Full pricing](${url("/pricing/")})`);
  } else {
    lines.push(`- [Pricing](${url("/pricing/")}): published fees for every service`);
  }
  lines.push("");

  lines.push("## Common questions", "");
  for (const f of homeFaq) lines.push(`- ${f.q} ${f.a}`);
  lines.push("");

  lines.push("## Reference", "");
  lines.push(`- [Glossary of Indian payroll and employment terms](${url("/glossary/")}): ${glossary.map((t) => t.term).join(", ")}`);
  lines.push(`- [Pricing](${url("/pricing/")})`);
  lines.push(`- [About](${url("/about/")})`);
  lines.push(`- [Contact](${url("/contact/")})`);
  lines.push("");

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
