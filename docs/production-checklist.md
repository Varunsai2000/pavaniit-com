# Production checklist

What it takes to run pavaniit.com as a working business site: enquiries that arrive, someone who answers them, real details, and checks that keep it healthy. Written 22 November 2026.

**Where things stand.** The site is live on Netlify at https://pavaniit.com. HTTPS works, www and http redirect to it, HSTS and the security headers are on, and email runs on Google Workspace. The courses work (training institute and AI courses) isn't committed yet, so `/courses/` returns 404 on the live site. Enquiry forms don't post anywhere yet: with no Web3Forms key, they open the visitor's email app.

Owner: **You** means only Pavani IT can do it (accounts, facts, decisions). **Claude** means it can be done in the code.

## 1. Before the next deploy

- [x] **Next.js security upgrade** (Claude). Done 23 November on the branch `courses-and-production`: 16.4.3 → 16.4.6, `npm audit` clean, build no longer warns.
- [x] **No placeholder outlines on course pages** (Claude). Done 23 November: each course fact stays hidden until it's set in `src/content/courses.ts`, and the course page says "Ask us for the fee, dates and timings". Filling in the real facts is still yours (section 4).
- [ ] **Ship the courses work through a deploy preview** (Claude, then You). Pull request #1 (`courses-and-production`) opened 23 November. Netlify hasn't reported a deploy preview on it: no status, check or comment appeared on GitHub. Check that deploy previews are on in Netlify (Site configuration → Build & deploy → Branches and deploy contexts → Deploy previews: any pull request against `main`). Then look at the preview and merge. From now on, nothing goes straight to `main`.

## 2. Enquiries that actually arrive

- [ ] **Web3Forms access key** (You). Create a free account at web3forms.com with biz@pavaniit.com and send the key. Claude puts it in `site.ts`. Both forms then post directly, and the privacy notice names Web3Forms automatically. The site's security policy already allows it.
- [ ] **End-to-end test** (Claude and You). On the preview and then live, send each form from a phone and a laptop. Check that the email lands in the inbox (not spam), the subject is right ("Enquiry: …" or "Course enquiry: …"), and pressing Reply goes to the visitor, not to Web3Forms.
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
- [ ] **Dependency updates** (Claude, then You). `.github/dependabot.yml` added 23 November: a monthly pull request for minor and patch updates. You turn on security updates in GitHub under Settings → Code security, which sends fixes as soon as an advisory is published.
- [ ] **Monthly upkeep** (You).
  - Update batch dates, and remove past ones.
  - Send one test enquiry from each form.
  - Delete enquiries 12 months after the last contact, unless the person became a client (the privacy notice promises this).
  - Bump the sitemap date only when content really changes.

## Done log

- 23 November 2026: Next.js 16.4.6, course facts hidden until set, 320px header fix, Dependabot config, accessibility, keyboard and link checks. All on pull request #1, not yet merged.
