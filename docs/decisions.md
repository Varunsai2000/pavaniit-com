# Decisions and open questions

## Morning summary (16 November 2026)

Every item in `docs/polish-checklist.md` is ticked, and every change is pushed to `main`, one commit per round. Check the five open questions below first; they're the only things the site needs from you before launch.

**What changed overnight**
- **Home hero:** now a slim split, like Deel. Headline, one sentence, Book a call and See pricing, and "From €62 per employee per month" on the left; the illustration on the right, with nothing laid over it. The whole hero fits in a 1440×900 window.
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

**Still to do before launch** (not design work): answer the open questions below, and fill the bracketed placeholders in `src/content/site.ts`:
- company name, CIN, GSTIN, address, city and phone;
- the founder and advisor;
- the other services' prices;
- the Web3Forms access key, so the form sends without opening an email app.

Then choose hosting.

---

A running log of section-level changes made by the polish loop, and the questions that need an answer from Pavani IT. Newest first. Each change is its own commit, so any of them can be reverted on its own.

## Open questions

1. **Employer PF rate.** The price sheet shows "Employer PF (8%)" and "Employee's PF (8%)", so the site shows 8%. The statutory rate is 12% of basic wages; 8% of gross matches that only when basic is two-thirds of gross. Consider wording such as "Employer PF (12% of basic wages)" so it can't be read as a non-statutory rate.
2. **Health insurance, gratuity and labour welfare fund.** Older Employer of Record copy (the EOR page's service list, its FAQ, the glossary) mentions these. They are not in the price sheet's "Services covered", so they were taken off the price card. Confirm whether they are offered; if not, they should come off the EOR page too.
3. **Independent contractor package (€23 / ₹2,400).** The site shows the price only. What does it cover (contracts, invoicing, payments)?
4. **Hero price line.** It reads "From €62 per employee per month", the six-employee rate. Switch it to "€78 per employee per month" if you'd rather lead with the single-hire price.
5. **Other prices** (recruitment, contract staffing, payroll for your own entity, training, hire-train-deploy) are still placeholders.

## Log

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
