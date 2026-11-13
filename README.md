# pavaniit-site

Landing page for **Pavani IT**: recruitment, contract staffing, Employer of Record (EOR), payroll and statutory compliance, corporate training and HR advisory in India.

Plain HTML, CSS and JavaScript. No build step and no dependencies.

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole page: hero, services, EOR, training, process, FAQ, contact |
| `styles.css` | Design tokens at the top (`:root`), then one block per section |
| `main.js` | Mobile menu, the live compliance calendar in the hero, and the enquiry form |
| `favicon.svg` | Monogram mark |

The hero calendar is generated for the current month in the visitor's browser. It marks the 7th (TDS deposit), the 15th (PF and ESI) and the last working day (salaries), and shows each as done or due.

## Design

- Colours: indigo ink `#161E4E` on cool paper `#F3F5FA`, marigold `#F4A51C` for actions and due dates, leaf green `#1D7A57` for completed items.
- Type: [Anek Latin](https://fonts.google.com/specimen/Anek+Latin) for headings (variable width, wide for headlines and condensed for step numbers) and [Mukta](https://fonts.google.com/specimen/Mukta) for body text. Both are by Ek Type, an Indian foundry. Anek also covers Telugu, Tamil, Kannada and other Indic scripts if you add regional-language pages later.

## Before going live

- [ ] Confirm the domain and the two email addresses (`hello@pavaniit.com`, `careers@pavaniit.com`) in `index.html`. The form's recipient is the `data-mailto` attribute on the form.
- [ ] Replace the `mailto:` form with a real form backend (Formspree, Web3Forms, or a Cloudflare Worker) so enquiries don't depend on the visitor's email app.
- [ ] Add the registered company name, CIN and registered address to the footer once incorporated.
- [ ] Add a privacy notice. The form collects personal data, so it falls under the DPDP Act.
- [ ] Review the copy against what you actually offer at launch, especially the "reply within one working day" promise and the list of services.
- [ ] Add an Open Graph image (`og:image`) and analytics.

## Deploying

The repo is private, so GitHub Pages needs a paid GitHub plan. These host private repos on their free tiers:

- **Cloudflare Pages**: connect the repo, leave the build command empty, set the output directory to `/`.
- **Netlify** or **Vercel**: import the repo as a static site with no build command.

Point the domain's DNS at whichever host you choose.
