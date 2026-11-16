# Decisions and open questions

## Morning summary (16 November 2026)

Every item in `docs/polish-checklist.md` is ticked, and every change is pushed to `main`, one commit per round. Check the five open questions below first; they're the only things the site needs from you before launch.

**What changed overnight**
- **Home hero:** now a slim split, like Deel. Headline, one sentence, Book a call and See pricing, and "From $69 per employee per month" on the left; the illustration on the right, with nothing laid over it. The whole hero fits in a 1440×900 window.
- **Real pricing:** your price sheet is now on the site:
  - the pricing page shows the three packages, a ₹50,000 monthly cost receipt, the eight covered services and your four notes;
  - the home page shows the three packages;
  - the Employer of Record page, `llms.txt` and the structured data use the real numbers too.
- **One structure everywhere:**
  - one content edge and one 12-column grid;
  - one hero pattern and one section-heading pattern;
  - sections separated by thin rules, with grey bands only to mark a new chapter.
- **Stage cards:** each stage now appears once on the home page, as illustrated cards with its services and how it hands over to the next.
- **Closing band:** text only, half the old height, no repeated illustration.
- **Fixed:** on the contact form, the service options couldn't be ticked with a mouse or a tap. They work now and sit in a 2×2 grid.
- **Smaller fixes:**
  - readable line lengths on the privacy page and glossary;
  - body-size checklists;
  - table headers aligned;
  - placeholder avatars on About;
  - 32px footer link rows;
  - no hover lifts.
- **Design tokens:** every size, colour, space and timing in the CSS comes from `src/app/tokens.css`. Nothing is hard-coded elsewhere.

**Checked:**
- all 11 pages at 375, 768, 1440 and 1920px;
- no sideways scroll at any width, and no element past the screen edge;
- exactly one h1 per page;
- no console errors;
- all internal links resolve;
- images load.

**Before launch** (16 November 2026). Every item below needs something from Pavani IT; the design work is done.
1. **Company details** in `src/content/site.ts`: registered company name, CIN, GSTIN, street address and phone. They show in the footer of every page. Indian company law expects a company's website to show its name, registered office, CIN, phone and email (Companies Act 2013, section 12(3)(c)); worth confirming with your CA. City is set: Vijayawada, Andhra Pradesh.
2. **Confirm the researched prices** for the other services (see the log), since they are published offers.
3. **People on the About page** (founder and compliance advisor), or hide that section.
4. **Open questions 1 to 4 below** (PF wording, benefits mentioned outside the price sheet, what the contractor package covers, which price the hero leads with).
5. **Domain:** pavaniit.com pointed at the host. Email is settled: biz@pavaniit.com is the one address on the site.
6. **Contact form:** a free Web3Forms access key, so enquiries arrive by email instead of opening the visitor's email app. The privacy notice then needs to name Web3Forms as a service that receives form data.
7. **Hosting:** Cloudflare Pages or Netlify. Both read the security headers already in `public/_headers`. Build command `npm run build`, output folder `out`, then point the domain at it.
8. **Privacy notice:** name the hosting provider and the form service, add a named contact for privacy requests, and have someone qualified check it against the DPDP Act 2023.
9. **After launch:** submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools, check link previews (LinkedIn Post Inspector), and send one test enquiry through the form.

---

A running log of section-level changes made by the polish loop, and the questions that need an answer from Pavani IT. Newest first. Each change is its own commit, so any of them can be reverted on its own.

## Open questions

1. **Employer PF rate.** The price sheet shows "Employer PF (8%)" and "Employee's PF (8%)", so the site shows 8%. The statutory rate is 12% of basic wages; 8% of gross matches that only when basic is two-thirds of gross. Consider wording such as "Employer PF (12% of basic wages)" so it can't be read as a non-statutory rate.
2. **Health insurance, gratuity and labour welfare fund.** Older Employer of Record copy (the EOR page's service list, its FAQ, the glossary) mentions these. They are not in the price sheet's "Services covered", so they were taken off the price card. Confirm whether they are offered; if not, they should come off the EOR page too.
3. **Independent contractor package ($26 / ₹2,400).** The site shows the price only. What does it cover (contracts, invoicing, payments)?
4. **Hero price line.** It reads "From $69 per employee per month", the six-employee rate. Switch it to "$87 per employee per month" if you'd rather lead with the single-hire price.
5. ~~Other prices~~ Set from research on 16 November 2026 (see the log). Confirm or adjust them before launch: they are published offers.

## Log

- **Prices for every service** (your request: research them and anchor them to the EOR pricing). Shown in dollars converted from rupees at ₹94, with rupees beside them; all fees are before 18% GST. Reasoning and sources:
  - **Recruitment: 8.33% of annual CTC** (one month's salary), charged when the person joins, with a 90-day replacement guarantee. Indian agencies charge 8.33% to 12.5% for junior and mid-level roles and 15% to 20% for senior roles; 90 days is the most common guarantee ([Hyring](https://hyring.com/blog/recruitment-agency-fees-india/), [GoodSpace](https://goodspace.ai/blogs/recruitment-agency-fees-india)). The bottom of the range fits your low-fee EOR positioning.
  - **Contract staffing: 12% of monthly CTC, minimum $87 (₹8,200) per person per month.** Vendor guides put Indian IT contract-staffing markups at 15% to 35% and volume staffing at 5% to 15% ([GoodSpace](https://goodspace.ai/blogs/it-staffing-and-staff-augmentation-india), [RecruitBPM](https://recruitbpm.com/blog/price-contract-staffing-services-a-rate-card-guide)). 12% sits below IT norms; the minimum equals the EOR fee, so contract staffing (which adds sourcing) never costs less than employing someone you found yourself.
  - **Payroll and compliance for your own entity: $5 (₹500) per employee per month, minimum $53 (₹5,000) a month.** Managed payroll in India runs about ₹150 to ₹400 for basic processing and ₹500+ with full compliance; Paybooks charges ₹20,000 a month for up to 50 employees ([Zoho](https://www.zoho.com/in/payroll/academy/payroll-operations/payroll-processing-cost.html), [Paybooks](https://paybooks.in/managed-payroll-service/), [Topsource](https://topsourceworldwide.com/insights/india-payroll-outsourcing-costs-and-services-the-complete-2026-guide/)). ₹500 matches full-compliance service.
  - **Corporate training: $638 (₹60,000) per training day, for up to 20 people**; travel outside Vijayawada at cost. Technical trainers charge ₹15,000 to ₹40,000 a day, and one-day cohort workshops for about 15 people sell for ₹45,000 to ₹1,00,000 ([Technovids](https://technovids.com/ai-training-pricing), [Build Fast with AI](https://www.buildfastwithai.com/blogs/corporate-ai-training-cost-india)). ₹60,000 includes a curriculum built on the client's stack.
  - **Hire, train, deploy: $1,596 (₹1,50,000) per graduate who joins**, covering selection and up to 12 weeks of training, no fee for anyone who doesn't join, 90-day replacement. No published per-graduate rate exists; this is built from its parts: one-month recruitment fee on a typical ₹4.5 lakh fresher CTC (about ₹37,500) plus about 12 weeks of training shared across a cohort of 20 (about ₹1,10,000 to ₹1,20,000 at the training day rate).
  - The pricing page's list of other services now shows the rupee amount and each price's terms. The hire-train-deploy FAQ says "up to 12 weeks" to match.
- **Email: biz@pavaniit.com** (your inbox). It replaces hello@ everywhere: contact page, footer, call-to-action band, privacy requests, the form's email fallback, structured data and `llms.txt`. Careers links use the same inbox with a "Job application" subject, so CVs are easy to filter; set `careersEmail` in `src/content/site.ts` if you add a separate careers address.
- **Office city: Vijayawada, Andhra Pradesh** (your confirmation). Shown on About, Contact, the footer and `llms.txt`, with the state so readers abroad can place it. The street address is still a placeholder; the structured-data address appears once it is filled. Two old mentions of Pune (the hero picture's description and an example in the contact form) were removed, since the office isn't there.
- **Premium pass** (your request: high-end corporate feel, every animation clear, nothing overdone). Built from an independent Codex review of the code and screenshots, plus a study of Stripe, Linear, Vercel, Mercury, Attio, Deel and Ramp (their live CSS). Rule kept throughout: motion must explain something real, and nothing is invented.
  - **Type and space:** headings at a lighter weight (640, was 700) read calmer at large sizes; the content width is 1280px (was 1360) so lines and cards sit tighter; section spacing tops out at 120px (was 140); lead paragraphs wrap without orphans; prices and dates use tabular figures.
  - **Header:** clear at the top of the page, then frosted glass with a hairline once you scroll (without JavaScript it stays frosted). Nav hover and the current page show a thin underline instead of grey pills. Small buttons are 44px tall, the touch-target size.
  - **Buttons:** the black button has a lit top edge and a contact shadow; on hover its arrow moves toward where it goes. Press still scales to 97%.
  - **Surfaces:** one card style everywhere (hairline ring, soft shadow). Dark bands and the black price card have light falling from the top. The three prices form one joined rail instead of three loose cards.
  - **Placeholders:** a dashed underline instead of a grey wireframe chip, so unfinished details stay findable without making pages look unfinished.
  - **Footer:** a larger wordmark; link rows grow to 44px on touch screens.
  - **Motion, each with a job:** page headings rise word by word in reading order on load, then the lead, buttons and price line follow (under a second). The hero picture is painted at once and settles to its crop. Each section's heading and its one main component rise in once as you reach them; rows and cards never animate on their own. The calendar's deadlines resolve in date order when it comes into view, showing what is already done this month for today's real date. FAQ answers open to their height instead of jumping. The journey thread draws in 1s (was 1.6s).
  - **Left out on purpose:** page-to-page transitions, parallax, scroll-jacking, count-up numbers, marquees, cursor effects, logo walls and badges. None of the reference sites use the first five, and the rest would need claims we don't have.
  - **Safe by default:** server HTML is the final state; nothing is hidden without JavaScript; reduced motion turns every animation off (headings render as plain text). No layout shift, no sideways scroll at 375 to 1920px, and no console errors on any page.
- **Prices in dollars, not euros** (your request). Dollar figures are converted from your rupee prices at ₹94 to the dollar (your choice, 16 November 2026) and rounded: $87 per employee, $69 from six employees, $26 per contractor; the ₹50,000 example comes to $685 a month, with each row converted and the total the sum of the rows, so the receipt adds up. Rupee prices are unchanged and still shown beside every dollar figure. The rate is one setting, `inrPerUsd` in `src/content/site.ts`; the pages, `llms.txt` and the structured data (now USD and INR offers) all follow it.
- **Monthly calendar section lined up** (your feedback: misaligned). The calendar card ran about 125px below the four steps beside it. Now the steps share the card's height in four equal rows, so both columns start and end on the same line, and the first step's text starts level with the month name. Inside the card, the calendar spans the card's full width: Monday lines up with the month name, Sunday with the status badges, and the list's dates sit centred under Monday. Checked at 390, 961, 1024, 1280, 1440 and 1920px; the payroll page's calendar gets the same alignment inside the card.
- **No cards over the hero illustration** (your request). The live time card on the home hero is gone, along with its component, styles and tokens, so the picture stands on its own at every width.
- **Price cards stay three across on tablets** (they used to stack into wide, mostly empty slabs below 980px; now only below 640px).
- **All raw values are tokens.** The last fluid paddings and viewport heights moved into a "Fluid spacing" group in `tokens.css`.
- **Fixed: contact-form service options couldn't be ticked with a mouse or by tapping** (only the keyboard worked). They're now a tidy 2×2 grid. The form still opens the visitor's email app until a Web3Forms access key is added to `src/content/site.ts`.
- **Closing call-to-action band is text only.** It repeated the Hire illustration on every page, twice on the home and recruitment pages. Now the headline sits on the left, and the offer and two buttons on the right, at half the height.
- **Home prices show only real numbers.** The home section lists the three Employer of Record packages. The placeholder recruitment and payroll prices live only on the pricing page's price list until you have real numbers.
- **Reading pages share one template** (About, Pricing, Glossary, Privacy): a plain hero, then white sections, each starting with a thin rule. About now leads with "How we work" and puts the people (still placeholders) last. The privacy notice's title moved out of the sidebar into a proper hero, matching the glossary.
- **Stage pages share one structure.** Same split hero as the home page. White content sections, each starting with a thin rule: services, then the stage's own section. One grey band (what comes next), then the FAQ and the call-to-action band. The stage-specific sections used to sit on grey right before the grey next-stage band, which merged into one block.
- **Hero slimmed (your feedback: "bloated").** It's now a split hero like Deel: headline, one sentence, Book a call and See pricing, and one price line on the left; the illustration on the right, cropped to the text's height, with the live time card on it. Removed the four-row service index and the filings and payroll example cards. The whole hero now fits in a 1440×900 window.
- **Stage cards carry the services.** With the index out of the hero, each card shows its services ("Recruitment · Contract staffing") above the hand-off line, so the four stages are described once, in one place.
- **Real Employer of Record pricing**, from your price sheet:
  - Three packages: €78 / ₹8,200 per employee, €62 / ₹6,500 per employee from six employees, and €23 / ₹2,400 per contractor (per month).
  - The ₹50,000 worked example (total ₹64,313 / €611), shown as a receipt.
  - The eight covered services and the four notes.
  - The other services' prices moved into a ruled price list.
  - The home price card, the EOR page, `llms.txt` and the structured data (EUR and INR offers) now use the real numbers.
- **Stage cards tell the hand-off story** (your choice): no repeated service descriptions on the home page; the details stay on each stage page.
- **FAQ on the home page** got the same section rule as the sections above it.
