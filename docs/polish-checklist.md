# Polish checklist

Pure monochrome system (white, neutral greys, black; status by shape, not colour). Manrope only.
Each loop round takes the first unchecked item, then: screenshot it at 1440px and 390px, critique it against the rules below, fix it, rebuild, re-check both widths, tick it, and note what changed.

Rules for every item:
- Emil Kowalski's motion rules: animate transform and opacity only, ease-out, interface transitions under 300ms, `:active` press feedback, hover only on `(hover: hover) and (pointer: fine)`, nothing moves under reduced motion.
- Anti-slop: no decorative gradients or glows, no hover-lift-and-zoom, fewer radius sizes, no template "heading left, text right" on every section, real alignment.
- Accessibility: AA contrast, visible focus, tap targets of at least 44px, short link names, correct heading order.
- No sideways scroll at 375, 768, 1440 or 1920px.

## Illustrations (black ink line art, redrawn in ChatGPT)
Chat: https://chatgpt.com/c/6af98cde-1580-83ec-a95e-ce6010283eff, same compositions, "identical black ink line style: fine technical pen, light cross-hatching, pure black on white, no colour, no grey washes, no text". Download each from a fresh Chrome tab (Chrome blocks repeat downloads per tab), move it out of Downloads, then `cwebp -q 80 -resize` to `public/illustrations/<name>-<w>.webp` (hero 1536 and 960; others 1200 and 600).
- [x] hero
- [x] hire
- [x] employ
- [x] pay
- [x] grow

## Global
- [x] Mobile menu is a 40px strip: `backdrop-filter` on `.site-header` traps the fixed `.mobile-menu`. Move background and blur to `.site-header::before`.
- [x] Type scale: cut about 13 text sizes to 6 steps. Merge `--ink-2` and `--ink-3` if they're indistinguishable.
- [x] Radius scale: reduce to 3 values (cards, controls, pills).
- [x] Section rhythm: replace alternating mist bands with rules where it helps, and break the repeated split-heading pattern in at least two sections.
- [x] Prefetch: `prefetch={false}` on header, footer and card links so other pages' hero images don't load. Services-menu thumbnails at about 160px wide.
- [x] Hover and press on chips: move `:hover`/`:active` to the chip wrapper (the input covers the label).

## Components (home)
- [ ] Header and services menu
- [ ] Hero: headline, lead and price line
- [ ] Hero: need picker. 2×2 on phones; checked state in monochrome.
- [ ] Hero scene: crop the art so faces sit above the fold at 1440×900. Put "Example" on each floating card. Float-ins at 500ms, transform and opacity only.
- [ ] Live clock card: reduced motion means no rotating text. Pause while off-screen. Compositor-only pulse.
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
