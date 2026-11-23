# pavaniit-site

Website for **Pavani IT**, an Indian Employer of Record and HR services company: recruitment, contract staffing, Employer of Record, onboarding, payroll, statutory compliance, corporate training and hire-train-deploy.

Next.js (React) with **static export**: every page is prerendered to plain HTML in `out/`, so Google and AI crawlers, most of which don't run JavaScript, read the full content.

## Run it

```bash
npm install
npm run dev        # http://localhost:4173, live reload
npm run build      # static site in out/
npm run preview    # serve out/ on http://localhost:4174
```

## Before launch: fill in the placeholders

Every company fact lives in **`src/content/site.ts`**, and every course fact in **`src/content/courses.ts`**. Values in square brackets, like `"[City]"`, are placeholders. Pages leave them out until they're set (a course page asks visitors to enquire for the fee and dates instead), and so do structured data and `llms.txt`. Replace each one with the real value, without brackets, and it appears everywhere. If a placeholder is ever passed to the `V` component, it shows with a dashed outline so it's easy to find.

| What | Where in `site.ts` |
| --- | --- |
| Prices for every service, deposit terms, replacement guarantee | `prices` |
| Courses: names and syllabi (drafts), fees, durations, days and times, batch dates, stack, trainer | `src/content/courses.ts` |
| Founder and advisor names, roles, credentials | `people` |
| City, state, office address, phone | `site.city`, `site.state`, `site.address`, `site.phone` |
| Registered company name, CIN, GSTIN | `site.legalName`, `site.cin`, `site.gstin` |
| LinkedIn page | `site.linkedin` |
| Enquiry form delivery | `site.web3formsKey`, from web3forms.com (free); until set, the form opens the visitor's email app |

The domain is assumed to be `pavaniit.com` (`site.url`, plus the two email addresses).

## Structure

| Route | Purpose |
| --- | --- |
| `/` | Home, led for foreign companies hiring in India |
| `/recruitment-staffing-india/` | Hire: recruitment and contract staffing |
| `/employer-of-record-india/` | Employ: Employer of Record and onboarding |
| `/payroll-compliance-india/` | Pay: payroll and statutory compliance |
| `/corporate-training-india/` | Grow: corporate training and hire-train-deploy |
| `/courses/`, `/courses/<course>/` | Training institute: courses for individuals, one page per course |
| `/courses/enquire/` | Learners ask about a batch (separate from the company enquiry form) |
| `/pricing/`, `/about/`, `/contact/`, `/glossary/`, `/privacy/` | Supporting pages |
| `/llms.txt`, `/robots.txt`, `/sitemap.xml` | Generated from content at build time |

Content is data, not markup: services and FAQs in `src/content/stages.ts`, glossary in `src/content/glossary.ts`, structured data in `src/content/schema.ts`.

## Design

Original design, informed by the best EOR sites (Deel was the reference for polish, not layout):

- **Type:** Manrope for all text, self-hosted at build time by `next/font`. The logo is a text-only wordmark, "Pavani IT" in Young Serif (`--font-wordmark` in `src/app/layout.tsx`), so a future name change is a text edit plus `tools/render-images.sh` for the icons.
- **Colour:** pure monochrome (white, neutral greys, black). Status is shown by shape: done is solid black, due is outlined. Tokens are at the top of `src/app/globals.css`.
- **Illustrations:** a matching set of black ink line drawings (hero plus one per stage) in `public/illustrations/`, generated with ChatGPT and shipped as WebP. They are illustrations, not staff photos; see the README in that folder.
- **Motion** (following Emil Kowalski's design-engineering rules):
  - Custom ease-out curves, interface transitions under 300ms, and buttons that scale down slightly on press.
  - Hover effects only on devices with a mouse or trackpad, and every animation switched off when the visitor asks for reduced motion.
  - Illustrative moments: product cards settling over the hero, a live "your time / Pune time" card with the real working-hour overlap and a rotating "now in Pune" task, a marigold thread that draws itself between the four stage badges on scroll, and this month's statutory calendar computed live.
- **Honesty:** product UI over the illustration is labelled "Example". There are no invented customers, logos, stats or testimonials; add real ones when you have them.
- **Records:** `PRODUCT.md` holds product truth.

## SEO, AEO and GEO

What's built in:

- **Crawlable HTML:** static export, one H1 per page, ordered headings, unique titles and descriptions, self-referencing canonicals, trailing-slash URLs that describe the page (`/employer-of-record-india/`).
- **Structured data (JSON-LD):** Organization and WebSite on every page; BreadcrumbList, Service and FAQPage on service pages; DefinedTermSet on the glossary. Placeholder values are never emitted. FAQPage no longer earns rich results in Google (since 2026), but it still labels Q&A for other engines.
- **Answer-first copy (AEO):** each page and glossary term opens with a direct one- or two-sentence answer, for example "An Employer of Record (EOR) is…", followed by detail, with real HTML tables (EOR vs entity vs contractors, who does what).
- **AI assistants (GEO):** `robots.txt` allows all crawlers, including OAI-SearchBot, Claude-SearchBot and PerplexityBot. `/llms.txt` summarises services, prices and FAQs for agents (it doesn't affect Google). Prices are published as text, because assistants skip "contact sales".
- **Sitemap** with honest `lastmod` dates (update `UPDATED` in `src/app/sitemap.ts` when content really changes).

Next steps that make the biggest difference:

1. Fill in real prices, people (with credentials) and the address. These are the strongest trust and citation signals.
2. After deploying: verify the domain in Google Search Console and Bing Webmaster Tools, submit `sitemap.xml`, and set up a Google Business Profile with the same name, address and phone as the site.
3. Write the India hiring guide (notice periods, statutory benefits, probation, termination, labour codes), reviewed by a named CA or labour-law adviser, with links to EPFO, ESIC and the labour ministry and a visible "last reviewed" date. Payroll and compliance count as money/legal ("YMYL") topics, so named expertise matters.
4. Add state pages only where they hold genuinely state-specific facts (professional tax slabs, labour welfare fund, shops and establishments).
5. Track 20 buyer prompts ("best employer of record in India for a US startup", etc.) in ChatGPT, Perplexity and Google AI Overviews monthly.

## Deploy

The site is hosted free on Netlify. pavaniit.com is registered at Hostinger, and its DNS is managed there. `out/` is a plain static site.

1. In Netlify, import `niteshballa/pavaniit-site` from GitHub. `netlify.toml` sets the build: `npm run build`, publish folder `out`, Node 22, and `NETLIFY_NEXT_PLUGIN_SKIP=true`, because a static export needs no Next.js server runtime. Netlify reads `public/_headers` (security headers and caching) and serves `404.html`. Every push to `main` deploys.
2. Add `pavaniit.com` (primary) and `www.pavaniit.com` under the project's Domain management.
3. In Hostinger's hPanel (Domains → pavaniit.com → DNS / Nameservers):
   - **A record**, name `@`: change the value to `75.2.60.5` (Netlify's load balancer). It points at Hostinger's parking page today.
   - **CNAME record**, name `www`: change the value to the site's `<name>.netlify.app` address.
   - Leave every email record exactly as it is. biz@pavaniit.com runs on Google Workspace: the MX record (`smtp.google.com`), the SPF and DMARC TXT records and the `google._domainkey` DKIM record must not change.

HTTPS is issued by Netlify automatically once DNS has spread. Full go-live steps are in `docs/decisions.md`.

**Fallback, Hostinger web hosting:** `npm run zip` builds the site into `pavaniit-com.zip`; extract it into `public_html`. `public/.htaccess` gives Hostinger's server the same headers and caching as `public/_headers`; keep the two in step.

## Regenerating images

`public/og-image.png` (link previews) and `public/apple-touch-icon.png` are rendered from the HTML in `tools/` with headless Chrome:

```bash
tools/render-images.sh
```
