# Polish checklist

Pure monochrome system (white, neutral greys, black; status by shape, not colour). Manrope only.
Each loop round takes the first unchecked item, then: screenshot it at 1440px and 390px, critique it against the rules below, fix it, rebuild, re-check both widths, tick it, and note what changed.

Rules for every item:
- Emil Kowalski's motion rules: animate transform and opacity only, ease-out, interface transitions under 300ms, `:active` press feedback, hover only on `(hover: hover) and (pointer: fine)`, nothing moves under reduced motion.
- Anti-slop: no decorative gradients or glows, no hover-lift-and-zoom, fewer radius sizes, no template "heading left, text right" on every section, real alignment.
- Accessibility: AA contrast, visible focus, tap targets of at least 44px, short link names, correct heading order.
- No sideways scroll at 375, 768, 1440 or 1920px.
- One source of truth: every colour, font, size, weight, line height, letter spacing, space, width, radius, border, shadow and duration comes from `src/app/tokens.css`. No raw px/rem/hex/rgba/ms values in `globals.css` or components, and no inline `style` in TSX. The only exceptions are media-query breakpoints (480, 640, 860, 1100px; CSS can't use variables there) and 1px hairlines inside tokens.
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
- [ ] Section scaffold: one `.section` / `.section-head` pattern (title then lead, the same max-width and spacing) used by every section on every page. Remove one-off heading wrappers.

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
- [ ] Journey cards: the thread hangs from the badge rings instead of crossing the numerals. No hover-lift or zoom. Short link names: link only the "More on…" text, stretched over the card. Reveal must not hide content without JS.
- [x] Monthly calendar section: make it the page's centrepiece, full-bleed black band.
- [ ] Comparison table
- [ ] Pricing cards
- [x] "We only work in India" list: a numbered full-width ledger.
- [ ] FAQ
- [ ] CTA band: art panel framed inside the black band.
- [ ] Footer: 32px link rows, drop "llms.txt" from the visible links (keep the file).

## Components (inner pages)
- [ ] Stage page hero (all four)
- [ ] Service blocks and check lists
- [ ] "Who does what" table: align the header with the row labels.
- [ ] Next-stage card: the arrow detaches and shrinks (`.text-link svg { flex: none }`).
- [ ] Pricing page
- [ ] About page
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
