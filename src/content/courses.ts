/**
 * Courses for individuals: the Pavani IT training institute.
 *
 * DRAFT, to confirm: three AI courses (agentic AI engineering, forward deployed engineer,
 * Claude Code and Codex) and three engineering foundations (full-stack, cloud and DevOps,
 * data engineering). The descriptions and syllabi are written as a starting point. Change
 * or replace any of them here and every page, the sitemap, llms.txt and the structured
 * data follow.
 *
 * Facts in square brackets are placeholders, as in site.ts. Until one is replaced with the
 * real value (no brackets), it's hidden: the course page asks visitors to enquire instead,
 * and structured data and llms.txt leave it out. The copy that promises "each course page
 * shows the fee" (or the trainer) switches on once every course has one.
 */

import { real } from "./site";
import type { QA } from "./stages";

export type Track = "ai" | "core";

export type Course = {
  slug: string;
  name: string;
  /** Set when the name starts with a proper noun, so it keeps its capital mid-sentence. */
  properNoun?: boolean;
  track: Track;
  /** One line for course cards and meta descriptions. */
  short: string;
  /** The first paragraph on the course page: what the course is and what you leave with. */
  lead: string;
  forWho: string;
  before: string;
  modules: string[];
  project: string;
  /** Placeholders until supplied. */
  stack: string;
  duration: string;
  schedule: string;
  fee: string;
  nextBatch: string;
  trainer: string;
};

/** Every course runs both ways. */
export const classModes = ["Classroom in Vijayawada", "Live online"] as const;

/** How the catalogue is grouped on /courses/, in this order. */
export const tracks: { id: Track; title: string; lead: string }[] = [
  {
    id: "ai",
    title: "AI courses",
    lead: "Build AI agents, deploy them for customers, and write software with AI coding agents.",
  },
  {
    id: "core",
    title: "Software engineering courses",
    lead: "The foundations those roles build on: web applications, cloud and data.",
  },
];

/** The catalogue in one phrase, for leads. Update it when the course list changes. */
export const catalogueLine =
  "agentic AI, the forward deployed engineer role and coding with Claude Code and Codex, plus full-stack, cloud and data engineering";

export const courses: Course[] = [
  {
    slug: "agentic-ai-engineering",
    name: "Agentic AI engineering",
    track: "ai",
    short: "Build AI agents that use tools and your own data: model APIs, tool use, MCP, retrieval, evals and deployment.",
    lead: "The agentic AI engineering course teaches you to build software on large language models: apps that answer from your own documents, and agents that use tools to finish multi-step tasks. You learn to test them with evals and run them in production, and you finish with an agent deployed online.",
    forWho: "Developers and recent graduates who want to build AI products, and data people moving into AI engineering.",
    before: "You can write code in Python or TypeScript, and you've called a web API before.",
    modules: [
      "How large language models work: tokens, context windows, cost and speed",
      "Calling model APIs: prompts, structured output and streaming",
      "Tool use and the agent loop",
      "Connecting agents to tools and data with MCP (Model Context Protocol)",
      "Retrieval (RAG): embeddings, vector search and answers grounded in your documents",
      "Agent SDKs, including the Claude Agent SDK and the OpenAI Agents SDK",
      "Evals: testing AI output and catching regressions before users do",
      "Guardrails, prompt injection and keeping agents safe",
      "Shipping: caching, cost control, monitoring and deployment",
    ],
    project: "An agent that uses tools and your own data to finish a real task, with an eval suite, deployed online.",
    stack: "[Models and tools, e.g. Claude and OpenAI APIs, Python, a vector database]",
    duration: "[Duration, e.g. 12 weeks]",
    schedule: "[Days and times, e.g. weekday evenings]",
    fee: "[Course fee, e.g. ₹35,000]",
    nextBatch: "[Next batch dates]",
    trainer: "[Trainer, or the partner's name]",
  },
  {
    slug: "forward-deployed-engineer",
    name: "Forward deployed engineer",
    track: "ai",
    short: "The customer-facing engineering role: find the problem, build an AI solution on the customer's systems, and ship it.",
    lead: "The forward deployed engineer course prepares you for a role AI companies now hire for: an engineer who works alongside a customer, finds the problem worth solving, and ships an AI solution on the customer's own data and systems. You finish with a customer project, start to finish, and a case study you can take into interviews.",
    forWho: "Developers who want a customer-facing engineering role, and learners who have finished our agentic AI engineering course.",
    before: "You can build and deploy a small application in Python or TypeScript. Our agentic AI engineering course is a good first step.",
    modules: [
      "What a forward deployed engineer does, and how the role differs from consulting and sales engineering",
      "Discovery: turning a vague customer problem into a technical one you can solve",
      "Prototyping fast with AI coding agents, then making the prototype production-ready",
      "Integrating with a customer's data, APIs and sign-in systems",
      "Agents and retrieval built on customer data",
      "Evals that prove the system works, and show when it stops working",
      "Security, privacy and deploying inside a customer's environment",
      "Demos, written updates and handing over to the customer's team",
      "The interview: case studies, and breaking down a problem out loud",
    ],
    project: "A customer project from a brief: discovery notes, a deployed AI agent on realistic data, an eval report and a handover document.",
    stack: "[Tools, e.g. Python, TypeScript, the Claude and OpenAI APIs, MCP]",
    duration: "[Duration, e.g. 12 weeks]",
    schedule: "[Days and times, e.g. weekends]",
    fee: "[Course fee, e.g. ₹40,000]",
    nextBatch: "[Next batch dates]",
    trainer: "[Trainer, or the partner's name]",
  },
  {
    slug: "claude-code-codex",
    name: "Claude Code and Codex",
    properNoun: true,
    track: "ai",
    short: "Build software with AI coding agents: Claude Code, Codex, and spec-driven development with OpenSpec.",
    lead: "The Claude Code and Codex course teaches you to build real software with AI coding agents, Anthropic's Claude Code and OpenAI's Codex: giving them the right context, agreeing a spec before any code is written, and reviewing and testing what they produce. You finish with a feature an agent built, from spec to merged pull request.",
    forWho: "Developers who want to work faster with AI agents, and learners who have finished one of our other courses.",
    before: "You can write code in at least one language and use Git.",
    modules: [
      "How coding agents work: the agent loop, context and where they go wrong",
      "Claude Code in depth: CLAUDE.md, plan mode, subagents, hooks, skills and MCP servers",
      "Codex in depth: AGENTS.md, the command line, cloud tasks and code review",
      "Spec-driven development with OpenSpec: agree what to build, then build, verify and archive each change",
      "Context engineering: keeping instructions, docs and memory useful as a project grows",
      "Reviewing and testing agent-written code before it ships",
      "Agents in CI, and several agents working in parallel",
      "Permissions, secrets and what leaves your machine",
    ],
    project: "A feature taken from an OpenSpec proposal to a merged pull request with Claude Code or Codex, with the tests and review notes to show it works.",
    stack: "Claude Code, Codex, OpenSpec, Git and GitHub",
    duration: "[Duration, e.g. 6 weeks]",
    schedule: "[Days and times, e.g. weekends]",
    fee: "[Course fee, e.g. ₹20,000]",
    nextBatch: "[Next batch dates]",
    trainer: "[Trainer, or the partner's name]",
  },
  {
    slug: "full-stack-development",
    name: "Full-stack development",
    track: "core",
    short: "Build web applications end to end: the page in the browser, the API behind it and the database under it.",
    lead: "The full-stack development course teaches you to build a web application end to end, from the page in the browser to the API and database behind it. You finish with a working application, online, that you can show in interviews.",
    forWho: "Students, recent graduates, and people moving into software from another field.",
    before: "Comfort using a computer. You don't need any programming experience.",
    modules: [
      "How the web works: HTML, CSS and JavaScript",
      "Building interfaces with a front-end framework",
      "Back-end APIs: routes, validation and logging in",
      "Databases: SQL, data modelling and queries",
      "Git, code review and working in a team",
      "Using AI coding assistants well, and checking what they write",
      "Testing an application and deploying it to the cloud",
    ],
    project: "A working web application, deployed online, that you can walk an interviewer through.",
    stack: "[Stack, e.g. Java and React, or MERN]",
    duration: "[Duration, e.g. 16 weeks]",
    schedule: "[Days and times, e.g. weekday evenings]",
    fee: "[Course fee, e.g. ₹30,000]",
    nextBatch: "[Next batch dates]",
    trainer: "[Trainer, or the partner's name]",
  },
  {
    slug: "cloud-devops",
    name: "Cloud and DevOps",
    track: "core",
    short: "Run software in production: Linux, cloud services, containers and the pipelines that ship code.",
    lead: "The cloud and DevOps course teaches you to run software in production: the servers and cloud services it runs on, the containers it ships in, and the pipelines that take a code change live. You finish with a pipeline you built yourself.",
    forWho: "Graduates and working professionals who want to move into cloud, DevOps or site reliability roles.",
    before: "Basic programming in any language, and some comfort with the command line.",
    modules: [
      "Linux, the command line and networking basics",
      "Core cloud services: compute, storage, networking and access control",
      "Containers with Docker, and an introduction to Kubernetes",
      "CI/CD pipelines that build, test and deploy code",
      "Infrastructure as code",
      "Monitoring, logs and handling incidents",
      "Running AI services in production: model APIs, scaling and cost",
    ],
    project: "A pipeline that takes an application from a code change to a running cloud deployment.",
    stack: "[Cloud platform, e.g. AWS or Azure]",
    duration: "[Duration, e.g. 12 weeks]",
    schedule: "[Days and times, e.g. weekends]",
    fee: "[Course fee, e.g. ₹30,000]",
    nextBatch: "[Next batch dates]",
    trainer: "[Trainer, or the partner's name]",
  },
  {
    slug: "data-engineering",
    name: "Data engineering",
    track: "core",
    short: "Move and shape data at scale: SQL, Python, pipelines and the warehouses analysts query.",
    lead: "The data engineering course teaches you to move and shape data: writing SQL that performs, building pipelines in Python, and modelling the warehouse tables analysts and dashboards depend on. You finish with a pipeline that turns raw data into tables someone can use.",
    forWho: "Graduates, analysts and developers who want to work as data engineers.",
    before: "Basic programming in any language. We teach the SQL from the start.",
    modules: [
      "SQL in depth: joins, window functions and query performance",
      "Python for working with data",
      "Data modelling for warehouses",
      "Batch pipelines: extract, transform and load",
      "Scheduling and orchestrating pipelines",
      "Data quality checks and documentation",
      "Preparing data for AI: documents, embeddings and vector stores",
    ],
    project: "A pipeline that loads raw data, cleans it and serves it as tables an analyst can query.",
    stack: "[Tools, e.g. Python, Airflow and a cloud warehouse]",
    duration: "[Duration, e.g. 12 weeks]",
    schedule: "[Days and times, e.g. weekday evenings]",
    fee: "[Course fee, e.g. ₹30,000]",
    nextBatch: "[Next batch dates]",
    trainer: "[Trainer, or the partner's name]",
  },
];

export const courseHref = (c: Course) => `/courses/${c.slug}/`;
export const enquireHref = (c?: Course) => (c ? `/courses/enquire/?course=${c.slug}` : "/courses/enquire/");

export const courseBySlug = (slug: string): Course => {
  const course = courses.find((c) => c.slug === slug);
  if (!course) throw new Error(`Unknown course ${slug}`);
  return course;
};

/** A course name mid-sentence: "data engineering", but "Claude Code and Codex" keeps its capital. */
export const lowerName = (c: Course): string =>
  c.properNoun || /^[A-Z]{2}/.test(c.name) ? c.name : c.name.charAt(0).toLowerCase() + c.name.slice(1);

export const coursesIn = (track: Track) => courses.filter((c) => c.track === track);

/** True once every course has this fact set, so the copy can promise each course page shows it. */
const everyCourseHas = (fact: "fee" | "trainer") => courses.every((c) => real(c[fact]));

/** What a course page can't show yet, as one phrase ("the fee, dates and timings"), or undefined. */
export const factsToAsk = (c: Course): string | undefined => {
  const parts = [
    !real(c.fee) && "fee",
    (!real(c.nextBatch) || !real(c.duration)) && "dates",
    !real(c.schedule) && "timings",
  ].filter((p): p is string => Boolean(p));
  const last = parts.pop();
  if (!last) return undefined;
  return `the ${parts.length ? `${parts.join(", ")} and ${last}` : last}`;
};

/** Placement help, said plainly: no guarantee, no rates. */
const poolLine =
  "When you finish, you can join our recruitment pool, and we put you forward for roles we're hiring for when your skills match.";
export const placementHelp = `${poolLine} We don't promise jobs, and we don't quote placement rates.`;

export const whyLearn = [
  { k: "Taught for the jobs we recruit for", v: "We recruit engineers in India, so we know what those roles ask for. The courses teach it." },
  { k: "Live classes", v: "Every class is taught live, in our Vijayawada classroom or online, so you can ask questions as you go." },
  { k: "A project at the end", v: "Each course ends with a project you build yourself and can walk an interviewer through." },
  { k: "Placement help, without false promises", v: placementHelp },
  {
    k: "Fees in writing",
    v: everyCourseHas("fee")
      ? "Each course page shows the fee. You get it in writing, with the batch dates, before you join."
      : "You get the fee in writing, with the batch dates, before you join.",
  },
];

export const batchSteps = [
  { k: "Ask about a batch", v: "Tell us the course and how you'd like to attend. We reply within one working day with dates, timings and the fee." },
  { k: "Confirm your seat", v: "We confirm your place in writing, with the fee and the batch dates." },
  { k: "Learn live", v: "Classes are taught live, in the classroom or online, with practical work in every module." },
  { k: "Finish with a project", v: "You build a project you can show employers, and you can join our recruitment pool." },
];

export const learnerFaq: QA[] = [
  {
    q: "Do you guarantee a job after the course?",
    a: `No. Nobody can honestly promise a job, so we don't. ${poolLine}`,
  },
  {
    q: "Can I attend from another city?",
    a: "Yes. Every course runs as live online batches as well as in our Vijayawada classroom. Online classes are taught live, not recorded, so you can ask questions as you go.",
  },
  {
    q: "Who teaches the courses?",
    a: `Our own trainers, and for some topics a specialist trainer from one of our training partners. ${
      everyCourseHas("trainer") ? "Each course page says who teaches it." : "Ask us who teaches the batch you're interested in."
    }`,
  },
  {
    q: "Which course should I start with?",
    a: "If you're new to programming, start with full-stack development: it starts from the basics. If you already code, start with agentic AI engineering, or Claude Code and Codex. The forward deployed engineer course is for people who can already build and deploy an application.",
  },
  {
    q: "Do I need a computer science degree?",
    a: "No. Each course page says what you need to know before you start.",
  },
  {
    q: "Are you partners of Anthropic or OpenAI?",
    a: "No. Claude Code is made by Anthropic and Codex by OpenAI. We teach how to use them well; we aren't affiliated with either company.",
  },
  {
    q: "How much does a course cost?",
    a: `${
      everyCourseHas("fee")
        ? "Each course page shows its fee."
        : "Ask us about a course and we reply within one working day with the fee and the next batch dates."
    } You get the fee and the batch dates in writing before you join.`,
  },
  {
    q: "Do you train company teams too?",
    a: "Yes. Companies can book training for their teams, built around their own stack, on-site or live online. See corporate training under Services.",
  },
];
