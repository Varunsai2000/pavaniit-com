# Polish checklist

Pure monochrome system (white, neutral greys, black; status by shape, not colour). Manrope only.
Each loop round takes the first unchecked item, then: screenshot it at 1440px and 390px, critique it against the rules below, fix it, rebuild, re-check both widths, tick it, and note what changed.

Rules for every item:
- Emil Kowalski's motion rules: animate transform and opacity only, ease-out, interface transitions under 300ms, `:active` press feedback, hover only on `(hover: hover) and (pointer: fine)`, nothing moves under reduced motion.
- Anti-slop: no decorative gradients or glows, no hover-lift-and-zoom, fewer radius sizes, no template "heading left, text right" on every section, real alignment.
- Accessibility: AA contrast, visible focus, tap targets of at least 44px, short link names, correct heading order.
- No sideways scroll at 375, 768, 1440 or 1920px.
- One source of truth: every colour, font, size, weight, line height, letter spacing, space, width, radius, border, shadow and duration comes from `src/app/tokens.css`. No raw px/rem/hex/rgba/ms values in `globals.css` or components, and no inline `style` in TSX. The only exceptions are media-query breakpoints (480, 640, 860, 1100px; CSS can't use variables there) and 1px hairlines inside tokens.
- Organised: every section sits on one shared content edge and one 12-column grid. Its left edge, column lines and vertical gaps line up with the header, with the sections above and below, and with the footer. Each block reads as one ordered group: what to read first, second and third is obvious. Check it with a grid overlay (Playwright-injected) at 1440 and 1920px, plus a single clean column at 390px.
- Component anatomy: every section is heading block, then one primary component (card row, ruled list, table, ledger, form or calendar), then at most one foot link or call to action. Never two competing primary components in one section. Cards share one anatomy (framed art, title, body, one short link). Lists share one anatomy (ruled rows with a label column on the grid). There's at most one call to action per section, and background bands change only to mark a new chapter of the page.
- Top-notch standard for every section: the same container and gutters, a consistent heading stack (title, then lead), vertical rhythm from the section tokens, every image in the shared frame, optical alignment checked against the grid, and type that wraps well at every width (no orphans in headings, balanced lines).

## Illustrations (black ink line art, redrawn in ChatGPT)
Chat: https://chatgpt.com/c/6af98cde-1580-83ec-a95e-ce6010283eff, same compositions, "identical black ink line style: fine technical pen, light cross-hatching, pure black on white, no colour, no grey washes, no text". Download each from a fresh Chrome tab (Chrome blocks repeat downloads per tab), move it out of Downloads, then `cwebp -q 80 -resize` to `public/illustrations/<name>-<w>.webp` (hero 1536 and 960; others 1200 and 600).
- [x] hero
- [x] hire
- [x] employ
- [x] pay
- [x] grow

## Design system (do these first, in order)
- [x] Tokens file: create `src/app/tokens.css`, the single source for colour, font families (`--font-manrope`, `--font-wordmark` from layout.tsx), type scale (12/14/15/16/17/18/20/22/28px plus fluid display, h1, h2 and lead), weights, line heights, tracking, a 4px space scale, container widths, gutter, section padding, header height, radii (card 16, control 10, inline 6, pill), borders, shadows, motion (ease-out, ease-in-out, 160/200/300/500ms) and control sizes. Import it before `globals.css`. Document each group in a comment.
- [x] Refactor `globals.css` onto the tokens. Measured today: 18 font sizes, 6 weights, 8 letter-spacings, 14 line heights, 22 spacing values (incl. off-scale 3, 6, 10, 11, 14, 18, 22, 26, 36px), stray hex/rgba colours (including leftover green rgba in shadows and focus rings) and 15 durations. Snap spacing to the 4px scale and line heights to the token set. Then grep to prove no raw values remain outside tokens.css.
- [x] Remove all 17 inline styles from TSX (page.tsx, contact, privacy, training, about, glossary, EOR, StagePage, EnquiryForm, Journey, NeedPicker) in favour of token-based classes.
- [x] Frames: one `.frame` primitive (border, radius, paper background, overflow) used by every illustration surface: hero scene, stage cards, page-hero art, next-stage card and CTA art. Same treatment everywhere.
- [x] One content edge. Today sections alternate between `.wrap` (1200px) and `.wrap-wide` (1360px), so the content edge jumps between x=40 and x=120 at 1440px (280 and 360 at 1920px). The home page switches four times; every inner page puts the hero at 40 and the next section at 120. Give the header, every section and the footer one container. Where text needs a shorter line, limit its measure inside that same left edge; never re-centre a narrower box.
- [x] One 12-column grid. Add grid tokens (`--grid-cols`, `--grid-gap`) and a small set of spans. Replace the 8 ad-hoc two-column ratios (0.6/1.4, 0.75/1.25, 0.85/1.15, 0.9/1.1, 1/0.9, 1/1, 1.1/0.9, 1.15/0.85) in the hero, section heads, depth, service blocks, next stage, contact, privacy, page hero and CTA with spans on that grid (for example 7/5, 6/6, 5/7, 4/8), so column lines carry from one section to the next. Verify with the overlay.
- [x] Hero organisation (home and the four stage-page heroes). Make the headline, lead, price line, need picker, call button and hint read as one ordered group sitting on the grid. The side column's top should align with the headline's cap height and its end with the headline's last line. Gaps come from tokens (one for related items, a larger one between groups). The scene frame spans exactly the grid width. On phones, one column with one rhythm. Re-check the 1440×900 first viewport so faces stay above the fold.
- [x] Section scaffold: one `.section` / `.section-head` pattern (title then lead, the same max-width and spacing) used by every section on every page, with at most two heading layouts (stacked, or split on the grid) and one heading-to-content gap. Remove one-off heading wrappers.

## Page structure (before the remaining component polish)
- [x] Hero rethink: replace the Hire / Employ / Pay / Grow toggle chips with a structure that informs. The chips read as a form control, and they duplicate the four stage cards directly below. The direction is agreed with the user first; the need picker can live on the contact page, which already has the same choice.
- [x] Home page structure: audit the order and anatomy of every section (hero, stages, calendar, comparison, prices, India details, FAQ, CTA). Each section gets one job and one primary component; merge or cut repeats (for example, the stages appearing in the hero and in the cards, or prices teased in two places). Make the background bands follow the page's chapters.
- [x] Stage-page template structure: hero, service blocks, the stage-specific section, next stage, FAQ, CTA. Make every stage-specific section use a standard component (ruled list, steps, table or calendar), with the same order and anatomy on all four pages.
- [x] Inner-page structure: Pricing, About, Contact, Glossary, Privacy and 404 each get the same audit (one job per section, standard components, a clear reading order) before their polish items below.

## Global
- [x] Mobile menu is a 40px strip: `backdrop-filter` on `.site-header` traps the fixed `.mobile-menu`. Move background and blur to `.site-header::before`.
- [x] Type scale: cut about 13 text sizes to 6 steps. Merge `--ink-2` and `--ink-3` if they're indistinguishable.
- [x] Radius scale: reduce to 3 values (cards, controls, pills).
- [x] Section rhythm: replace alternating mist bands with rules where it helps, and break the repeated split-heading pattern in at least two sections.
- [x] Prefetch: `prefetch={false}` on header, footer and card links so other pages' hero images don't load. Services-menu thumbnails at about 160px wide.
- [x] Hover and press on chips: move `:hover`/`:active` to the chip wrapper (the input covers the label).

## Components (home)
- [x] Header and services menu
- [x] Hero: headline, lead and price line
- [x] Hero: need picker. 2×2 on phones; checked state in monochrome.
- [x] Hero scene: crop the art so faces sit above the fold at 1440×900. Put "Example" on each floating card. Float-ins at 500ms, transform and opacity only.
- [x] Live clock card: reduced motion means no rotating text. Pause while off-screen. Compositor-only pulse.
- [x] Journey cards: the thread hangs from the badge rings instead of crossing the numerals. No hover-lift or zoom. Short link names: link only the "More on…" text, stretched over the card. Reveal must not hide content without JS.
- [x] Monthly calendar section: make it the page's centrepiece, full-bleed black band.
- [x] Comparison table: its columns are sized by the table, so they don't sit on the grid. Use fixed layout with four equal columns (label, EOR, entity, contractors) so they line up with columns 1, 4, 7 and 10.
- [x] Pricing cards
- [x] "We only work in India" list: a numbered full-width ledger.
- [x] FAQ
- [x] CTA band: art panel framed inside the black band (since reworked: text only).
- [x] Footer: 32px link rows, drop "llms.txt" from the visible links (keep the file).

## Components (inner pages)
- [x] Stage page hero (all four): now the same split hero as the home page.
- [x] Service blocks and check lists
- [x] "Who does what" table: align the header with the row labels.
- [x] Next-stage card: the arrow detaches and shrinks (`.text-link svg { flex: none }`).
- [x] Pricing page: rebuilt with the real Employer of Record prices (see docs/decisions.md).
- [x] About page
- [ ] Contact page and enquiry form, including error and sent states
- [ ] Glossary page
- [ ] Privacy page
- [ ] 404 page

## Done log
- Mobile menu: moved header background and blur to `::before` so the fixed menu sizes to the viewport.
- Prefetch: `prefetch={false}` on every Link, so a page no longer downloads other pages' hero images.
- Chips: hover and press now target the chip wrapper, so they fire under the invisible checkbox.
- Type scale: fixed rem sizes reduced to 12, 14, 15, 16, 17, 18, 20 and 22px, plus the fluid display/h1/h2.
- Radius scale: 16px containers, 10px controls, pills, and 6px only for inline placeholder chips.
- Illustrations: hero and hire redrawn as black ink line art and converted to WebP.
- Illustrations: employ redrawn as ink line art.
- Illustrations: pay redrawn as ink line art.
- Illustrations: grow redrawn; the full set is now black ink line art.
- Section rhythm: calendar is now a full-width black band with the cycle as four numbered steps; comparison, pricing and India details sit on white separated by content-aligned rules; India details became a numbered full-width ledger. Checked at 1440 and 390px, no sideways scroll.
- Header: services-menu thumbnails now 160px WebP (about 5 KB each, was about 65 KB); removed the duplicate Contact link (Book a call goes to the same page). Phone menu verified full-height.
- First viewport: picker moved beside the lead; tighter spacing and a 2:1 crop put the illustration at 493px on a 1440×900 screen (was 635), faces visible; hero stacks below 1100px; "Example" label on each floating card; float-ins 500ms transform/opacity only; compositor-only pulse; clock text doesn't rotate under reduced motion and pauses off-screen; need chips 2×2 on phones. Checked at 1440, 820 and 390px.
- Tokens: created `src/app/tokens.css` (colour, font families, fixed and fluid type scale, weights, leading, tracking, 4px space scale, layout, radii, borders, shadows, motion, controls, layers); moved the old `:root` block out of `globals.css` and renamed every reference (`--color-*`, `--radius-*`, `--container*`, `--section-y`, `--font-body`, `--font-brand`). No undefined variables; pages render identically at 1440 and 390px.
- Refactor onto tokens: every font size, weight, tracking, line height, space, radius, colour, shadow, duration, size, measure, column width, offset and layer in `globals.css` now reads from `tokens.css` (only media-query breakpoints stay literal). Off-scale spacing snapped up to the 4px scale (10→12, 14→16, 18→20, 22→24, 26→28, 36→40). Text widths kept as named measures so nothing rewraps. A before/after comparison of every element on all 11 pages at 1440 and 390px found nothing missing and no sideways scroll; pages are 20–230px taller from the snaps.
- Inline styles: all 17 `style={}` props removed. New token-based classes: `.section-page-top`, `.section-after-hero`, `.section-foot`, `.heading-stack`, `.page-intro`, `.need-picker`, `.person-role`, `.prose-lead`, `.glossary-sources`; form errors use the existing `.field-error`; the unused `--i` on calendar days was deleted. New tokens for the two section paddings and for layering (`--z-below/base/raised/float`), so no raw z-index is left. Every page keeps the same height at 1440 and 390px (home on phones +2px from the picker gap snapping to 20px); no sideways scroll.
- Frames: one `.frame` primitive (paper background, card radius, hairline ring, image cover) on all five illustration surfaces, with `.frame-inset` (8px inside a card or band, concentric inner radius) and `.frame-fill` (fills its grid cell). Frame tokens live in `tokens.css`. The inner-page hero art gained the edge it lacked; journey cards, the next-stage card and the CTA art now sit inset like trays. Checked at 1440 and 390px; no sideways scroll on all 11 pages.
- One content edge: `.wrap-wide` and `--container-wide` are gone; the header, every section and the footer share `.wrap` (`--container: 1360px`). Measured content edge is now x=40 on every section at 1440px and x=280 at 1920px, the same as the header logo (it used to jump to 120 and 360). Checked with an edge overlay on 9 pages at 1440 and 1920px. No paragraph got wider than its own measure, and no page scrolls sideways at 375, 390, 768, 1440 or 1920px. Column lines still differ between sections; that's the next item.
- 12-column grid: added grid tokens (`--grid-cols`, `--grid-gap`, `--grid`, `--grid-half`, and spans for main, side, topic, aside, doc and footer link columns). Every split (hero, section heads, calendar, depth, service blocks, next stage, FAQ, contact, page hero, CTA band) is now two equal halves on the grid gap, so each one turns at column 7. Card rows (journey, prices, steps, people) use the same gap, so they land on grid lines too. The ledger, privacy and glossary layouts and the footer use explicit spans. All 8 ad-hoc ratios are gone. Checked with a 12-column overlay on home, EOR, privacy and contact at 1440 and 1920px, plus 390 and 768px; no sideways scroll at 375–1920px.
- Hero organisation: each hero now has two groups. An intro (lead and price; crumbs, title and lead on stage pages) sits on top; an action group (need picker and call button; prices and buttons on stage pages) sits at the bottom behind a hairline. On the home page the right column stretches to the headline's height: its first line meets the headline's cap height (0.9px off) and its button row ends on the last baseline (1.5px off), measured from the font metrics. Stage-page copy now spans the art's height, top to top and bottom to bottom. On phones the art comes after the copy, so the breadcrumb stays at the top. The home lead is balanced (3 even lines, no stub) and the hint can't leave one word on its own line. New tokens: `--hero-group-gap`, `--hero-cap-offset`, `--hero-baseline-offset`. At 1440×900 the illustration starts at 510px with both faces above the fold. Checked at 390, 1100, 1440 and 1920px; no sideways scroll at 375–1920px.
- Section scaffold: every section heading is now one `.section-head` block (title, then lead, `--head-gap` between them) in one of two layouts. Stacked: above the content, `--section-head-gap` below it (all nine are 64px at 1440px). Side: the left half of a split, with content in the right half. Removed `.section-head-split` (the title-left, lead-right template on three home sections), `.ink-head` and `.heading-stack`; service blocks, the FAQ, About's "How we work" and the payroll calendar now use the same block. `.section-tight` reads `--section-y-tight`. Also fixed the payroll page's due-date list, which had no styles (bullets outside the content edge, labels running into the text); it now shares the ruled key/value style with the contact details. Checked with overlays at 1440px and screenshots at 390px; no sideways scroll at 375–1920px.
- Journey cards:
  - The thread now leaves the top of each badge's paper ring vertically and arches over the gap (`--badge-ring`, `--thread-rise`, read by Journey.tsx). Measured: endpoints sit on the ring tops and the thread never comes closer than 21px to a badge centre (17px radius + 4px ring). Badge positions now follow the inset frame; they were 8px off.
  - No hover lift or zoom.
  - Each card is an `<article>` with one short link ("More on hire", "How Employer of Record works", …) whose `::after` covers the card. Clicking the card body opens the page, and keyboard focus rings the whole card.
  - Cards render visible on the server and hide only when they start below the fold; checked with JavaScript off (all four visible).
  - Even stagger (1, 2, 3).
  - Also: `.text-link` is now inline and the new `ArrowText` keeps the last word and arrow together, so wrapped links never strand the arrow (journey cards, next-stage card, MoreLink).
  - Checked at 1440 and 390px; no sideways scroll at 375–1920px.
- Comparison table:
  - Fixed layout with a `<colgroup>`; the first three columns each span 3 grid columns and 3 gaps. Tables ignore `calc(% + px)`, so the wrapper is a size container and the widths use `cqw`. Measured: column edges land on grid lines 1, 4, 7 and 10 within 1px at 768, 1100, 1440 and 1920px (they were up to 24px off).
  - Header row is now white with a 2px ink rule; only the Employer of Record header is black.
  - Phone cards have a white title with a rule, so the tinted Employer of Record row no longer merges into it.
  - Rows turn into cards below 860px (was 640px), so no column hides behind a sideways scroll at 641–860px. Checked: no scrolling inside the table at 700–1024px, and no page sideways scroll at 375–1920px.
- Hero rethink (direction chosen by the user: service index):
  - Removed the Hire / Employ / Pay / Grow toggle chips (NeedPicker, its CSS, `needPhrase` and the now-unused `stageIcon`). The contact form already asks the same question.
  - The hero is now: headline (left half), then Book a call with the price line beside it; lead (right half), then a numbered, ruled service index: 01–04, stage name, services separated by a middle dot, and an arrow. Each row links to its stage page.
  - Measured: the lead's first line meets the headline's cap height (0.9px off), and the call-to-action group ends on the index's last rule at 1280, 1440 and 1920px. Hero padding and the crop were tuned so the illustration starts at 551px and both faces sit above the fold at 1440×900.
  - Link names read "Hire: Recruitment, Contract staffing", with hidden commas between services.
  - Phones: one column (headline, lead, index, call to action), with the services under each stage name. No sideways scroll at 375–1920px.
- Home page structure:
  - Audited every section's job and main element. The order already follows the story (what → how a month runs → decide → trust → act), and the bands mark those chapters (mist for the stages, ink for the monthly cycle, white with rules for decide and trust).
  - Stage cards (user's choice: hand-off story): the cards keep their art, badges and thread but no longer repeat the hero index's service names and descriptions. Each card now gives its stage's existing hand-off line ("Once they accept, we can employ them." …), and the details stay on the stage pages. Removed the unused `.stage-svc` styles.
  - The FAQ now has the same content-aligned rule as the three sections above it; this is opt-in via `FaqSection ruled`, because on stage pages it follows a band. The rule spans the FAQ grid, and its margin subtracts the grid row gap, so rule-to-title spacing matches the ledger exactly (131px at 1440px, 81px at 390px).
  - Journey checks re-run: no hover transform, card click opens the page, focus ring on the card, visible without JS. No sideways scroll at 375–1920px.
- Hero slimmed after user feedback ("bloated"): a split hero with headline, one sentence, two buttons and a price line on the left, and the illustration on the right, cropped to the text height, with the time card. The service index and the two example cards are gone; stage cards now show their services. The hero fits in 1440×900 (ends at 755px). Pricing page rebuilt with real EOR prices: plan cards, a ₹50,000 receipt with notes, a two-column coverage checklist, a ruled price list for the other services, and EUR/INR offers in JSON-LD and llms.txt. No sideways scroll at 375–1920px.
- Stage-page template structure: all four stage pages now share the home hero (breadcrumb, title, lead, Book a call and See pricing, then the price line; the art on the right, cropped to the copy's height), so the hairline action group is gone. A content-aligned rule starts the services. Each stage-specific section (how a hire runs, who does what, the comparison, the statutory calendar, training tracks) moved from grey to white with a rule, so the only grey band is the next-stage hand-off and two greys never merge. The section rule is now drawn outside the flow (absolute, at the section's top edge), so grid wraps need no compensation; rule-to-heading is 130px on every ruled section at 1440px. Removed the unused page-hero-grid, page-hero-meta and hero-intro CSS and the `--hero-group-gap` token. No sideways scroll at 375–1920px.
- Inner-page structure:
  - All reading pages now share one template: a plain hero (breadcrumb, title, lead), then white sections that each start with a rule.
  - About: "How we work" comes before "Who you will work with" (placeholders last), and the grey band is gone.
  - Glossary and Pricing: a rule before the first section.
  - Privacy: moved its title out of the sidebar into a hero like the glossary's, and the opening sentence became the lead. The sidebar is labelled "On this page", its link text aligns with the label, and it hides on phones (it used to leave a lone label there).
  - Contact and 404 already do one job each and stay as they are.
  - Removed the unused `.section-after-hero` and its token. No sideways scroll at 375–1920px.
- Pricing cards: the home section now shows the three real Employer of Record packages (shared `eorPlanCards`, the same cards as the pricing page) instead of one real card next to two placeholder cards. Cards are uniform (name, price, rupee price and unit, Get a quote), and the price went up from 28px to 36px. The foot link points to all prices and the monthly cost example. Checked at 1440 and 390px; no sideways scroll.
- FAQ: on opening, the answer fades in and drops 3px (300ms, ease-out, transform and opacity only, none under reduced motion); closing stays instant. The answer stops in line with the end of the question text, clear of the icon column. Mouse users get a hairline underline on hover. Native details/summary is kept; checked open-with-Enter, the focus ring and reduced motion. No sideways scroll.
- CTA band: now text only. The headline sits in the left half, and the sentence plus Book a call and See pricing start exactly on the page's column 7 (measured 736 = 736 at 1440px, 976 = 976 at 1920px). The Hire illustration it used to carry was repeated on every page, including next to the same picture on the home and recruitment pages. The band is 284px tall instead of 577px. The email now comes from `site.email`. Removed the unused `--size-art-max` token and the leftover imports. No sideways scroll at 375–1920px.
- Footer: every link fills a 32px row (new `--link-row` token; was 21px with gaps), and the column headings sit closer to their lists. The visible "llms.txt" link is gone; the file still ships at /llms.txt, the path AI crawlers check. Brand in the left half and link columns from column 7 are unchanged. Checked at 1440 and 390px; no sideways scroll.
- Service blocks and check lists: checklist items went from 15px to body size (17px) with normal leading; they're the block's main content but read like fine print next to a 20px lead. Each tick is centred on its first line of text (measured 854 = 854). The structure was already right: heading and lead on the left, the list from column 7 with its top rule level with the heading, and blocks divided by hairlines. The pricing page's coverage list benefits too. No sideways scroll.
- "Who does what" table:
  - The header now starts on the row labels' left edge (it was 12px in at 1440px and 6px in on phones; now 736 = 736 and 20 = 20).
  - Header cells no longer wrap ("Pavani IT" broke over two lines on phones), and a 2px ink rule sits under the header, as in the comparison table and the cost receipt.
  - Rows went up to body size (17px), matching the checklists. No sideways scroll.
- Next-stage card:
  - It now shares the home stage cards' anatomy: an `<article>` with decorative art and a badge, an h3 stage name, the services once as a middle-dot list, and one short link ("More on pay", from the new shared `stageLinkLabel`) stretched over the card.
  - Its accessible name used to be a 30-word run of alt text, the stage, the services and the page title; it's now just the link. The services line was printed twice and isn't any more.
  - No hover lift. Keyboard focus rings the card, and clicking anywhere on it opens the page. The arrow stays with its last word (ArrowText). No sideways scroll.
- About page: the "How we work" descriptions went from 15px to body size (the training page's tracks list shares that component and benefits too). While a name is still a placeholder, the avatar is an empty dashed circle in the site's placeholder style, not a "?"; initials appear once a real name is in. On phones the person card stacks the avatar above the text instead of squeezing the text into a narrow column. No sideways scroll.
