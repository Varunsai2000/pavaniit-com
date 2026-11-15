# pavaniit-site

Website for **Pavani IT**: recruitment, contract staffing, Employer of Record (EOR), payroll and statutory compliance, corporate training and HR advisory in India.

Plain HTML, CSS and JavaScript. No build step and no dependencies.

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173. This server doesn't send the security headers in `_headers`; your host will.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Landing page: hero, services, EOR, training, process, FAQ, contact |
| `privacy.html` | Privacy notice (DPDP Act, 2023) |
| `404.html` | Not-found page, served automatically by Cloudflare Pages and Netlify |
| `styles.css` | Design tokens at the top (`:root`), then one block per section |
| `main.js` | Mobile menu, the live compliance calendar in the hero, and the enquiry form |
| `favicon.svg`, `apple-touch-icon.png` | Browser and home-screen icons |
| `og-image.png` | 1200×630 image shown when the link is shared on LinkedIn, WhatsApp, Slack and so on |
| `robots.txt`, `sitemap.xml` | For search engines |
| `_headers` | Security headers (CSP and others) for Cloudflare Pages and Netlify |
| `tools/` | HTML sources for the two PNGs and `render-images.sh` to regenerate them (needs Google Chrome) |

The hero calendar is generated for the current month in the visitor's browser. It marks the 7th (TDS deposit), the 15th (PF and ESI) and the last working day (salaries), and shows each as done or due.

## Enquiry form

The form sends enquiries through [Web3Forms](https://web3forms.com), which emails each one to you. It's free for up to 250 submissions a month and needs no backend.

1. Go to web3forms.com, enter the inbox that should receive enquiries, and copy the access key they email you.
2. In `index.html`, paste it into `<input type="hidden" name="access_key" value="">`.
3. Deploy, then send a test enquiry.

The access key is meant to be public, so it's fine in the HTML. Until a key is set, the form opens the visitor's email app addressed to `data-mailto` instead, so it never silently drops an enquiry.

If you switch to a different form service, change `data-endpoint` on the form and update `connect-src` in `_headers`. Otherwise the browser will block the request.

## Domain

The site assumes **pavaniit.com**. If the domain is different, search and replace `pavaniit.com` across `index.html`, `privacy.html`, `robots.txt` and `sitemap.xml`. That covers the email addresses, canonical URLs, sharing image URL and sitemap.

## Design

- Colours: indigo ink `#161E4E` on cool paper `#F3F5FA`, marigold `#F4A51C` for actions and due dates, leaf green `#1D7A57` for completed items.
- Type: [Anek Latin](https://fonts.google.com/specimen/Anek+Latin) for headings (variable width, wide for headlines and condensed for numerals) and [Mukta](https://fonts.google.com/specimen/Mukta) for body text. Both are by Ek Type, an Indian foundry. Anek also covers Telugu, Tamil, Kannada and other Indic scripts if you add regional-language pages later.

## Before going live

- [ ] Confirm the domain (see above) and that `hello@` and `careers@` mailboxes exist.
- [ ] Add the Web3Forms access key and send a test enquiry from the live site.
- [ ] Once incorporated, add the registered company name, CIN and registered address to the footer of `index.html` and `privacy.html`, and name the company in the privacy notice.
- [ ] Have the privacy notice reviewed, especially the retention periods (12 months for enquiries and CVs), which are a starting point, not legal advice.
- [ ] Review the copy against what you offer at launch, especially "reply within one working day".
- [ ] After deploying, check the sharing preview with LinkedIn's Post Inspector and submit `sitemap.xml` in Google Search Console.

## Deploying

The repo is private, so GitHub Pages needs a paid GitHub plan. These host private repos on their free tiers and read `_headers` and `404.html`:

- **Cloudflare Pages** (recommended): connect the repo, leave the build command empty, set the output directory to `/`.
- **Netlify**: import the repo with no build command and publish directory `/`.

Point the domain's DNS at the host and turn on HTTPS.
