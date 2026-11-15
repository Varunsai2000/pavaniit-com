# Decisions and open questions

A running log of section-level changes made by the polish loop, and the questions that need an answer from Pavani IT. Newest first. Each change is its own commit, so any of them can be reverted on its own.

## Open questions

1. **Employer PF rate.** The price sheet shows "Employer PF (8%)" and "Employee's PF (8%)", so the site shows 8%. The statutory rate is 12% of basic wages; 8% of gross matches that only when basic is two-thirds of gross. Consider wording such as "Employer PF (12% of basic wages)" so it can't be read as a non-statutory rate.
2. **Health insurance, gratuity and labour welfare fund.** Older Employer of Record copy (the EOR page's service list, its FAQ, the glossary) mentions these. They are not in the price sheet's "Services covered", so they were taken off the price card. Confirm whether they are offered; if not, they should come off the EOR page too.
3. **Independent contractor package (€23 / ₹2,400).** The site shows the price only. What does it cover (contracts, invoicing, payments)?
4. **Hero price line.** It reads "From €62 per employee per month", the six-employee rate. Switch it to "€78 per employee per month" if you'd rather lead with the single-hire price.
5. **Other prices** (recruitment, contract staffing, payroll for your own entity, training, hire-train-deploy) are still placeholders.

## Log

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
