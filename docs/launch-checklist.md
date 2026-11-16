# Launch checklist

Work top to bottom, one item per round. For each item: review it at 1440px and 390px, fix what's wrong, rebuild, re-check both widths, tick it, add a line to the Done log, log section-level changes in `docs/decisions.md`, then commit and push to `main`.

## Rules for every round

- **No visible placeholders.** No bracketed text anywhere on the site. Facts only Pavani IT can supply (registered company name, CIN, GSTIN, street address, phone, people's names and backgrounds, LinkedIn URL) are never invented: whatever depends on them is hidden until the real value is set in `src/content/site.ts`, and appears automatically once it is.
- **Real information only.** Prices follow the EOR price sheet and the researched prices recorded in `docs/decisions.md`. No invented clients, logos, testimonials, statistics, awards or certifications.
- **Every animation explains something.** Motion follows the existing system (tokens, reduced motion, nothing hidden without JavaScript).
- **Design system.** Every value comes from `src/app/tokens.css`; one content edge and the 12-column grid; pure monochrome; Manrope only.
- **Accessibility and layout.** WCAG 2.2 AA, keyboard and focus, 44px touch targets, no sideways scroll from 375 to 1920px.

## Items

- [x] **Prices.** Set researched prices for recruitment, contract staffing, payroll, training and hire-train-deploy, anchored to the EOR fee, in dollars with rupees beside them. Show the rupee amount and the note in the pricing page's price list. Say that fees exclude GST.
- [x] **No placeholders.** Footer, contact page, About page, privacy notice and structured data render only real company details; the About page's people section is hidden until names are set.
- [x] **Open questions settled.** Benefits mentioned outside the price sheet, the contractor package scope, PF wording, hero price line. Decide conservatively and log each decision.
- [x] **Home page review**, every section: hero, stages, monthly calendar, comparison, prices, India details, FAQ, call to action.
- [x] **Recruitment and staffing page review**, every section.
- [x] **Employer of Record page review**, every section.
- [x] **Payroll and compliance page review**, every section.
- [x] **Training page review**, every section.
- [x] **Pricing page review**, every section.
- [x] **About page review**, every section.
- [x] **Glossary review**: definitions accurate as of November 2026, labour-codes wording current.
- [x] **Contact page and form**: validation, errors, success state, email fallback without a Web3Forms key, keyboard and screen-reader behaviour.
- [x] **Privacy notice**: matches what the site actually does (no analytics, form handling, hosting, email), DPDP Act 2023 points, a way to contact for privacy requests.
- [x] **AI-run positioning and lower prices** (your answers): one plain line on AI plus people where fees are explained; other services about 35% below market; AI providers in the privacy notice.
- [x] **404 page review.**
- [x] **Header, menus and footer review** on every width: services menu, mobile menu, focus order, Escape, links.
- [x] **Search and sharing**: titles and descriptions per page, canonical URLs, sitemap, robots, structured data validity, Open Graph image (no outdated prices or currency), favicon set.
- [x] **Accessibility audit**: automated scan of every page plus keyboard pass; fix every finding.
- [x] **Performance**: image weights, fonts, unused CSS or JS, load metrics on phone.
- [x] **Final check**: all pages at 375, 768, 1440 and 1920px; no placeholders, console errors, broken links or sideways scroll. Write a short launch summary at the top of `docs/decisions.md` listing what Pavani IT still needs to supply and the hosting steps. Then stop the loop.

## Done log

- Prices: researched rates for recruitment (8.33% of annual CTC, 90-day replacement), contract staffing (12% of monthly CTC, minimum the EOR fee), payroll ($5 / ₹500 per employee, minimum ₹5,000), training ($638 / ₹60,000 a day for up to 20) and hire-train-deploy ($1,596 / ₹1,50,000 per graduate who joins). Rupees and terms now show in the pricing page list; fees noted as before GST. Checked at 1440 and 390px.
- No placeholders: footer, contact page, privacy notice and About render only real company details; CIN, GSTIN, phone, street address and the people section appear automatically once set in `src/content/site.ts`. Scan of visible text, meta tags and structured data on 11 pages finds no bracketed text. Checked at 1440 and 390px.
- Open questions: PF labelled as 12% of basic pay (₹4,000 on an assumed ₹33,333 basic, stated in the notes); health insurance removed from EOR and onboarding lists and the duties table; "statutory benefits" wording; scope line on each EOR package card; card buttons aligned. Checked at 1440, 768 and 390px.
- Home page: fixed the Pay hand-off line, the "from day one" gratuity claim, and dated labour-codes wording; added a legal-deadlines line to the calendar; recruitment shown as one month's salary. Every section read at 1440 and 390px; no sideways scroll.
- Recruitment and staffing page: step badges showed overflowing "Step" text; now the number, with "Step" for screen readers. Every section read at 1440 and 390px.
- Employer of Record page: added "What it costs" with the three EOR packages and a link to the monthly example; rest of the page checked. 1440 and 390px.
- Payroll and compliance page: removed the due-date list that repeated the calendar (its unique facts moved into the intro); time-proofed the labour-codes FAQ here and on the home page. 1440 and 390px.
- Training page: removed a section that repeated the service blocks; its POSH, induction and first-time manager line moved into the corporate training list. 1440 and 390px.
- Pricing page: all figures verified; EOR price sections now say fees are before 18% GST. 1440 and 390px.
- About page: added a company details list (trading name, office, where we work, email; registered name, CIN and GSTIN appear when set). 1440 and 390px.
- Glossary: PF wage ceiling updated to ₹25,000 (from 17 September 2026); central labour-code rules dated 8 and 9 May 2026; last reviewed 16 November 2026. 1440 and 390px.
- Contact form: on-screen fallback (address plus copy button) when no email app opens; fields stay aligned when one shows an error. Validation, focus, keyboard, hand-off and copy tested at 1440 and 390px.
- Privacy notice: enquiry handling described as it really works (email app now, Web3Forms once its key is set); host logs, data outside India and adults-only added; dated 16 November 2026. 1440 and 390px.
- AI-run positioning: line on home prices, pricing intro, About, a new FAQ and llms.txt; human-team overstatements reworded; prices lowered (5%, 8% with ₹6,500 minimum, ₹300 with ₹3,000 minimum, ₹40,000 a day, ₹1,00,000 per graduate); privacy notice lists AI providers. 1440 and 390px.
- 404 page: own title, one noindex tag, direct links to the four stages and pricing. 1440 and 390px.
- Header, menus and footer: services menu moved after its button so Tab enters it; duplicate phone-menu button removed; Escape, outside click, scroll lock, focus return and footer links checked at 1440 and 390px.
- Search and sharing: link-preview image on every page; new sharing image with real prices (no invented example); home and pricing descriptions trimmed; company address in structured data; sitemap dated 16 November 2026.
- Training and hire-train-deploy quoted per programme (your decision); pricing page says "Every standard fee, in writing" and explains the exception; worded prices join their terms with a comma on stage pages and in llms.txt; pricing description back to 141 characters.
- Accessibility: axe-core on 11 pages at two widths, one landmark finding fixed, now clean; keyboard pass on five pages with a visible focus indicator at every stop.
- Performance: in-between picture sizes and accurate size hints; home LCP on a throttled phone 7.2 s to 3.6 s (uncompressed test server); inner pages 0.8 to 1.4 s; no layout shift.
- Final check: 11 pages at four widths; no sideways scroll (375 to 1920px), placeholders, console errors or axe violations; links and images all load. Launch summary written at the top of `docs/decisions.md`.
