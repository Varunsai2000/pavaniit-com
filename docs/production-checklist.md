# Production checklist

What it takes to run pavaniit.com as a working business site: enquiries that arrive, someone who answers them, real details, and checks that keep it healthy. Written 22 November 2026.

**Where things stand.** The site is live on Netlify at https://pavaniit.com. HTTPS works, www and http redirect to it, HSTS and the security headers are on, and email runs on Google Workspace. All 18 pages are live, `/courses/` and the six course pages included, and the sitemap lists 18 URLs. Both enquiry forms deliver by email through Web3Forms, tested end to end. What's missing is the content: the real course facts, the phone number, the company registration details and the legal pages.

**How the site deploys.** Netlify builds from the Git repository on every push to `main`. Until 23 November it built from nothing at all: the project had no repository linked and the live site was a single manual upload ("Netlify Drop") made on 17 November. That's why `/courses/` returned 404 for six days after the courses work was already on `main` — nobody had dropped a new folder. If the live site ever looks older than the code again, check the Deploys tab before anything else.

**Which repository it builds from.** Netlify builds from `Varunsai2000/pavaniit-com`, a copy, not from `niteshballa/pavaniit-site`. Linking the original needs the Netlify GitHub App installed on that account, which needs admin on it. Until that happens, work pushed to the original does not reach the live site: it has to be carried over with `git pull origin main` then `git push mine main`. That manual step is the same kind of gap that left the site six days stale, so getting the app installed on the original and relinking is worth doing, after which this copy can go.

Owner: **You** means only Pavani IT can do it (accounts, facts, decisions). **Claude** means it can be done in the code.

## 1. Before the next deploy

- [x] **Next.js security upgrade** (Claude). Done 23 November on the branch `courses-and-production`: 16.4.3 → 16.4.6, `npm audit` clean, build no longer warns.
- [x] **No placeholder outlines on course pages** (Claude). Done 23 November: each course fact stays hidden until it's set in `src/content/courses.ts`, and the course page says "Ask us for the fee, dates and timings". Filling in the real facts is still yours (section 4).
- [x] **Ship the courses work** (Claude, then You). Done 23 November, though not the way this said. The courses work was already on `main`: pull request #1 (`courses-and-production`) held the same files, so there was nothing left to merge. Netlify reported no deploy preview because the project had no repository linked at all. Linking it published `main`, and all 18 pages went live.
- [ ] **Deploy previews** (You). Still off. Netlify → Site configuration → Build & deploy → Branches and deploy contexts → Deploy previews: any pull request against `main`. Worth turning on before the next change, so nothing goes straight to `main` again.

## 2. Enquiries that actually arrive

- [x] **Web3Forms access key** (You, then Claude). Done 23 November: the key is set in `site.ts`, both forms post directly, and the privacy notice names Web3Forms.
- [x] **End-to-end test** (Claude and You). Done 23 November on the live site. Two enquiries arrived in the inbox, not spam, with the right subject and every field. DKIM signs them (`Signed by: web3forms.com`) and they travel over TLS.
- [x] **Reply-to** (Claude). Found during that test and fixed 23 November. Web3Forms sends from its own address, so with no `replyto` field, pressing Reply answered Web3Forms instead of the person who wrote in. Both forms name the visitor's address `email`, so `useEnquirySend` in `src/components/formParts.tsx` now sets `replyto` from it. Verified in the message headers.
- [ ] **IP addresses in enquiry emails** (You decide, Claude words it). Web3Forms records the IP address an enquiry was sent from and includes it in the email. The privacy notice says the host keeps IP addresses in server logs, but not that submitting a form sends one to us. Worth stating plainly, and worth raising in the legal review below.
- [ ] **Sorting in Gmail** (You). Add filters and labels on the subject: company enquiries, course enquiries, job applications ("Job application"). Optionally add free Workspace aliases (courses@, careers@) and point the forms at them.
- [ ] **Spam** (Claude, if needed). Both forms already have a hidden honeypot field. If spam gets through, add Web3Forms' hCaptcha, which needs a security-policy update.
- [ ] **Enquiry tracker** (You). A simple Google Sheet: date, name, company or course, source page, status, next step. This is enough until volume justifies a CRM (HubSpot's free tier, for example).
- [ ] **Acknowledgement email** (You decide). Optional automatic "we got your enquiry" reply. Check whether your Web3Forms plan includes an autoresponder. Without one, the reply within one working day is the acknowledgement.

## 3. Support: who answers, and how fast

- [ ] **Owner for the one-working-day promise** (You). The site promises a reply within one working day on every form. Name who answers, who covers when they're away, and your working hours.
- [ ] **Phone and WhatsApp** (You, then Claude). Set the real number in `site.ts`; it shows on the contact page, in the footer and in structured data. Learners in India expect WhatsApp, so use WhatsApp Business on that number, and Claude adds a "Chat on WhatsApp" link to the contact and course-enquiry pages.
- [ ] **Reply templates** (You; Claude can draft). Templates for:
  - a company enquiry (call times and next steps);
  - a course enquiry (batch dates, timings, fee, how to confirm a seat);
  - a job application acknowledgement;
  - a privacy request (access, correction or deletion under the DPDP Act; reply within the time the Rules set).
- [ ] **Booking a call** (You decide). "Book a call" goes to the contact form today. If you'd rather buyers pick a slot, use a Google Calendar appointment schedule (if your Workspace plan includes it) or Cal.com. Claude links to it; no embed is needed.
- [ ] **Learner support after joining** (You). Decide how learners reach you between classes, for example one WhatsApp group per batch. Online classes need a home (Google Meet comes with Workspace), and assignments a place (such as Google Classroom). Also write down the policies the course pages will need: missed classes, certificates, instalments and teaching language.

## 4. Real details and legal pages

- [ ] **Company facts** (You). Registered name, CIN, GSTIN, street address, phone and LinkedIn URL, plus the founder's and advisor's names and backgrounds. Each is one line in `src/content/site.ts`, and each page shows it once set.
- [ ] **Course facts** (You). Fee, duration, days and times, next batch dates and trainer for each course. Also confirm the six courses and their syllabi, which are drafts.
- [ ] **GST on course fees** (You decide). Company prices say they exclude GST. For individual learners, it's clearer to show the total they pay. Decide which, and Claude words it.
- [ ] **Terms of use, and a refund and cancellation policy** (You decide, Claude drafts, a professional reviews). Needed before taking course fees online. Payment gateways such as Razorpay ask for these pages, plus a contact page with address and phone. The refund policy should cover a learner who leaves after the first week.
- [ ] **Legal review** (You, with someone qualified). Have the privacy notice reviewed against the DPDP Act 2023 and Rules 2025. It now covers learners and under-18s. Also check whether the Consumer Protection (E-Commerce) Rules 2020 apply once fees are paid online; if they do, the site must name a grievance officer.

## 5. Taking fees (when you're ready)

- [ ] **Payments** (You, then Claude). The course pages say the fee and batch dates are confirmed in writing before a learner joins, so bank transfer works for now. When you want online payment, set up a payment page or link per batch (Razorpay or similar), issue GST invoices, and follow the refund policy. Claude adds a "Pay for your seat" link to the confirmation step. The payment provider's own page takes the payment, never the site.

## 6. Being found

- [ ] **Google Search Console and Bing Webmaster Tools** (You). Verify the domain and submit https://pavaniit.com/sitemap.xml again once the courses are live (18 URLs).
- [ ] **Google Business Profile** (You). List the Vijayawada classroom. This is where most "software course in Vijayawada" searches end up. It needs the real address and Google's verification.
- [ ] **LinkedIn company page** (You). Create it, then set the URL in `site.ts`.
- [ ] **Analytics** (You decide). The site has no analytics today, which the privacy notice says. Search Console alone shows search traffic. To see which pages lead to enquiries, add a cookieless tool (for example Cloudflare Web Analytics or Plausible). Claude would then update the security policy and the privacy notice.

## 7. Checks on the new pages

- [ ] **Launch checks on the eight new pages** (Claude). Done 23 November, except load time:
  - axe-core 4.10 at 1440 and 390px on all 18 pages: no violations;
  - keyboard pass on `/courses/`, a course page and the enquiry form: every stop shows a focus ring, and the skip link comes first;
  - all 1,492 internal links and anchors resolve, and the new pages reuse the illustrations already checked at launch.
  - Still to do: load time on a throttled phone, on the deploy preview or the live site.
- [x] **320px overflow** (Claude). Done 23 November: no sideways scroll on any of the 18 pages at 320, 375 or 414px.

## 8. Keeping it running

- [ ] **Uptime monitor** (You). A free monitor (UptimeRobot or similar) on the home page and `/contact/`, alerting biz@.
- [ ] **Deploy notifications** (You). In Netlify, email on a failed deploy. On GitHub, protect `main` so changes go through a pull request and a deploy preview.
- [x] **Dependency updates** (Claude, then You). `.github/dependabot.yml` added 23 November: a monthly pull request for minor and patch updates. Dependabot alerts and security updates were turned on the same day, so fixes arrive as soon as an advisory is published. Three update pull requests are already open, one of them a major TypeScript bump worth reviewing rather than merging blind.
- [ ] **Monthly upkeep** (You).
  - Update batch dates, and remove past ones.
  - Send one test enquiry from each form.
  - Delete enquiries 12 months after the last contact, unless the person became a client (the privacy notice promises this).
  - Bump the sitemap date only when content really changes.

## Done log

- 23 November 2026: Next.js 16.4.6, course facts hidden until set, 320px header fix, Dependabot config, accessibility, keyboard and link checks.
- 23 November 2026, later: found the live site was a manual upload from 17 November with no repository linked, which is why `/courses/` was 404. Linked the project to Git, so every push to `main` now builds and publishes. All 18 pages live, sitemap back to 18 URLs, redirects and security headers checked on the new pages. Web3Forms key set and both forms tested end to end; reply-to fixed so Reply answers the visitor. Dependabot alerts and security updates on.
