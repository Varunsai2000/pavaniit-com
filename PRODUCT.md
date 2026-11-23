# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (React) with static export: every route prerendered to HTML so search engines and AI crawlers read full content without running JavaScript. Hosting target: Cloudflare Pages (free tier, private repo). Chosen by the user over Astro and plain HTML.

## Users

Primary: companies outside India (startups and scale-ups, often US/UK/EU) that want to hire people in India without setting up an Indian entity. A founder, head of people or finance lead evaluating Employer of Record providers, usually comparing several and checking price, compliance coverage and how fast someone can start.

Secondary: Indian startups and SMEs that need recruitment, contract staffing, payroll and statutory compliance (including the move to the new labour codes). Served lower on the home page and on service pages.

Learners (added 22 Nov 2026, the training institute): students, recent graduates and career-switchers in and around Vijayawada, and online across India, looking for a software course with placement help. Served on their own section (`/courses/`), with one band on the home page, so the company pages stay led for buyers.

Tertiary: job seekers sending CVs.

## Product Purpose

Pavani IT is a new Indian HR services company and training institute. It lets a company hire, employ, pay and train people in India through one partner, and runs software courses for individuals. Success: a qualified buyer books a call or sends an enquiry; a learner asks about a batch.

## Positioning

India-only and hands-on. Unlike global EOR platforms that cover 150+ countries through partners, Pavani IT is an Indian company running Indian payroll and compliance itself, and can also recruit and train the people it employs. One partner from offer letter to appraisal. Its own courses teach the skills it recruits for, and learners who finish can join its recruitment pool.

## Operating Context

Buyers compare EOR providers side by side, read pricing pages, and increasingly ask AI assistants (ChatGPT, Perplexity, Claude, Gemini) which provider to use. Indian employment runs on a monthly statutory cycle: TDS by the 7th, PF and ESI by the 15th, salaries by month end, plus state-specific professional tax and labour welfare fund. Candidates in India typically serve 30–90 day notice periods. The four labour codes took effect on 21 November 2025; central rules were notified in May 2026 and states are still issuing theirs.

## Capabilities and Constraints

Services, fixed by the user as four stages with two services each:
- Hire: Recruitment; Contract staffing
- Employ: Employer of Record; Onboarding
- Pay: Payroll; Statutory compliance
- Grow: Corporate training; Hire, train, deploy

Plus HR advisory (handbooks, policies, POSH Internal Committee, labour-code transition) as a supporting service.

Training institute (user's direction, 22 Nov 2026): courses for individuals, taught live in the Vijayawada classroom and online, by Pavani IT's own trainers with specialist partner trainers for some topics. Placement help without a guarantee: finished learners can join the recruitment pool; no placement rates or job promises. Courses, syllabi and every course fact live in `src/content/courses.ts`; the six courses (three AI courses first: agentic AI engineering, forward deployed engineer, Claude Code and Codex; then full-stack, cloud and DevOps, data engineering) and their syllabi are drafts awaiting the user's confirmation, and fees, durations, schedules, batch dates, stacks and trainers are placeholders.

Undecided or not yet supplied (must not be invented; kept in one content file with visible TODO markers):
- Published prices (user confirmed prices exist and can be published; values not yet provided)
- City, office address, phone (user confirmed these exist; values not yet provided)
- Named expert(s) for authorship and About page (user confirmed; names and credentials not yet provided)
- Mailboxes hello@ and careers@ (to be created), legal entity name, CIN, GSTIN
- Web3Forms access key for the enquiry form

## Brand Commitments

- Name: Pavani IT is both the legal name and the trade name for now (confirmed by the user, 15 Nov 2026). Domain pavaniit.com is owned by the user.

- Deel (deel.com) is the user's reference for polish only. The site must not look like a copy of Deel or any EOR platform: original layout, Pavani IT's own forest-and-marigold identity, and a matching set of two-ink risograph illustrations.
- Typeface fixed by the user: Manrope for all text. The logo is a text-only wordmark in Young Serif (user asked for a text logo in a good font). Palette: pure monochrome (user rejected accent palettes as looking AI-generated).
- Anti-slop is a hard requirement: the site must read as designed by a person, not generated. No indigo/violet primary, no cream-and-serif look, no invented stats, logos or testimonials.
- Voice: plain, specific, sentence case. Copy for the four stages was approved by the user and stays as written.

## Evidence on Hand

- Approved service copy for the four stages (see Capabilities).
- Factual statutory calendar (7th TDS, 15th PF/ESI, month-end salaries).
- No customers, testimonials, logos, case studies, team photos or ratings exist yet. Do not fabricate any of them, and do not add Review or AggregateRating schema.

## Product Principles

1. Prove, don't claim: show the monthly mechanics of employing someone in India instead of adjectives.
2. Answer the buyer's question in the first sentence of every section; detail follows.
3. Price and process in plain text, because buyers and AI assistants skip "contact sales".
4. India depth over global breadth: every page should contain something a 150-country platform would not know or say.

## Accessibility & Inclusion

WCAG 2.2 AA: contrast, visible focus, keyboard navigation, reduced-motion respected, forms with clear labels and errors.
