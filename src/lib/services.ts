import {
  AppWindow,
  Globe,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type ServiceSlug =
  | "web-app-development"
  | "native-app-development"
  | "website-development"
  | "seo-campaigns";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceBlock = {
  title: string;
  body: string;
};

export type ServiceSectionHeading = {
  eyebrow: string;
  title: string;
  accent: string;
};

export type ServicePage = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  navLabel: string;
  navDescription: string;
  icon: LucideIcon;
  homepageDescription: string;
  capabilities: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  lede: string;
  sections: {
    audience: ServiceSectionHeading;
    problems: ServiceSectionHeading;
    deliverables: ServiceSectionHeading;
    delivery: ServiceSectionHeading;
    whyUs: ServiceSectionHeading;
    relatedWork: ServiceSectionHeading;
    faq: ServiceSectionHeading;
    related: ServiceSectionHeading;
  };
  whoItsFor: ServiceBlock[];
  problems: ServiceBlock[];
  deliverables: string[];
  process: ServiceBlock[];
  differentiators: ServiceBlock[];
  geo: string;
  faqs: ServiceFaq[];
  relatedSlugs: ServiceSlug[];
  relatedProjectIds: string[];
};

export const servicesHub = {
  metaTitle: "Houston Web App, Native App, Website & SEO Services",
  metaDescription:
    "Four focused service lines from a Houston studio: custom web apps, native iOS and Android apps, conversion-first websites, and SEO campaigns built to rank and convert.",
  keywords: [
    "Houston web app development",
    "Houston native app development",
    "Houston website development",
    "Houston SEO campaigns",
    "web marketing solutions",
  ],
  h1: "Four services. No filler retainers.",
  lede: "We build products people use every day and search programs that move pipeline. Pick a lane — or start with a 20-minute flight check and we will tell you which one you actually need.",
} as const;

export const servicePages: ServicePage[] = [
  {
    slug: "web-app-development",
    title: "Web App Development",
    shortTitle: "Web Apps",
    navLabel: "Web App Development",
    navDescription: "Authenticated products, dashboards, and SaaS — not a brochure with a login.",
    icon: AppWindow,
    homepageDescription:
      "Custom web applications: client portals, internal tools, and SaaS products with real auth, data, and workflows. Built in Next.js, instrumented from day one.",
    capabilities: ["Auth & roles", "Dashboards", "SaaS workflows", "API integrations"],
    metaTitle: "Web App Development in Houston",
    metaDescription:
      "Custom web app development in Houston. We design and ship authenticated portals, dashboards, and SaaS products in Next.js — with analytics, access control, and a codebase your team can run.",
    keywords: [
      "web app development Houston",
      "custom web application development",
      "SaaS development Houston",
      "Next.js web app agency",
      "client portal development",
      "dashboard development Houston",
    ],
    h1: "Web app development for products that have to work every day",
    lede: "A website persuades. A web app does the job — logins, roles, records, workflows, and the APIs that keep operations moving. We design and engineer custom web applications in Houston for teams that have outgrown spreadsheets, Shopify hacks, and no-code duct tape.",
    whoItsFor: [
      {
        title: "Operators replacing internal tools",
        body: "If your team lives in Airtable, shared inboxes, and a graveyard of Zapier zaps, a purpose-built web app usually pays for itself in the first quarter you stop babysitting the workaround.",
      },
      {
        title: "Founders shipping a SaaS or portal",
        body: "You need a product surface — onboarding, billing states, permissions, and an admin that is not an afterthought. We build the application, not a marketing shell with a fake dashboard.",
      },
      {
        title: "B2B teams with client-facing workflows",
        body: "Energy, healthcare-adjacent, logistics, professional services: if customers log in to request, review, or track work, that experience is the product. We treat it that way.",
      },
    ],
    problems: [
      {
        title: "The spreadsheet became the system of record",
        body: "Version conflicts, no audit trail, and one person who “knows how it works.” We model the real workflow and put it behind auth, roles, and a UI people will actually use.",
      },
      {
        title: "A website pretending to be a product",
        body: "Marketing sites with a bolted-on login are slow, insecure, and impossible to iterate. Web apps need application architecture: sessions, data models, background jobs, and environments.",
      },
      {
        title: "No-code hitting a ceiling",
        body: "When permissions, reporting, or integrations get non-trivial, visual builders collapse. We migrate the logic you already proved into a maintainable Next.js codebase.",
      },
    ],
    deliverables: [
      "Product discovery and information architecture",
      "UX flows for the jobs users actually perform",
      "Next.js application with typed APIs",
      "Authentication, roles, and permission model",
      "Admin and customer-facing surfaces",
      "Integrations (CRM, billing, identity, data warehouses)",
      "Staging, QA, and production environments",
      "Analytics, error tracking, and audit-friendly logging",
      "Handoff docs and a CMS only where content belongs",
    ],
    process: [
      {
        title: "Map the jobs",
        body: "We interview the people who will live in the product and write the workflows down before a single screen is designed. Scope is a list of jobs, not a mood board.",
      },
      {
        title: "Model the data",
        body: "Entities, permissions, and edge cases get a schema. This is where most “app” projects fail — we refuse to paint a UI on top of a fuzzy spreadsheet.",
      },
      {
        title: "Ship in vertical slices",
        body: "Each sprint delivers a usable path (create → review → complete), not a layer of mock screens. You click a staging build every week.",
      },
      {
        title: "Harden and hand off",
        body: "Auth, observability, backups, and runbooks before launch. You own the repo. We stay on for iteration if you want a product partner, not a hostage situation.",
      },
    ],
    differentiators: [
      {
        title: "This is not website development",
        body: "Websites are content destinations: pages, CMS, SEO, conversion paths. Web apps are authenticated software: sessions, roles, mutable data, and workflows. If visitors do not log in to do work, you probably want a website. If they do, you are in the right place. We will tell you which — even when the other one is cheaper.",
      },
      {
        title: "Application engineering, not page templates",
        body: "We ship Next.js apps with typed boundaries, real environments, and instrumentation. No page-builder runtime masquerading as a product.",
      },
      {
        title: "Houston product sense",
        body: "We have built for Gulf Coast operators who need reliability more than novelty — energy, clinics, logistics, and B2B services that cannot afford a cute prototype.",
      },
    ],
    geo: "Web Marketing Solutions designs and builds custom web applications from Houston, Texas, for teams across the Gulf Coast and remote-first companies that want a senior product partner without a coastal agency markup.",
    faqs: [
      {
        question: "What is the difference between a web app and a website?",
        answer:
          "A website is a content and conversion destination — pages, a CMS, and search visibility. A web app is software people log into to complete work: dashboards, portals, multi-step workflows, and live data. If the primary action is “read and inquire,” build a website. If the primary action is “sign in and operate,” build a web app. We offer both and will not upsell you the wrong one.",
      },
      {
        question: "What stack do you use for web app development?",
        answer:
          "Next.js on the front, typed APIs, and a datastore that fits the problem (typically Postgres). Auth is treated as a product surface, not a plugin. We choose boring, hireable technology so you are not stuck with us forever.",
      },
      {
        question: "How long does a custom web app take to build?",
        answer:
          "A focused MVP — one primary workflow, auth, and an admin — usually lands in 8–14 weeks. Multi-role products with several integrations take a quarter or more. We write the timeline against jobs-to-be-done, not a generic “phase 1.”",
      },
      {
        question: "Can you rebuild an existing internal tool?",
        answer:
          "Yes. Most of our web app work is replacing spreadsheets, Access databases, or a no-code stack that hit its ceiling. We map current workarounds first so the new app inherits the logic people already trust.",
      },
      {
        question: "Do you build SaaS products for startups?",
        answer:
          "Yes — including multi-tenant apps with billing states, onboarding, and an admin. We are opinionated about scope: we would rather ship one sharp workflow than a graveyard of half-built modules.",
      },
      {
        question: "Will we own the code?",
        answer:
          "Yes. The repository, infrastructure accounts, and credentials are yours. We document how to run it and can stay on for retainers, but you are never locked into a proprietary builder.",
      },
      {
        question: "Do you work with Houston companies only?",
        answer:
          "We are Houston-based and know this market well, but we build for clients across Texas and nationally. Discovery can be remote; kickoffs and workshops often happen in person when you are local.",
      },
    ],
    relatedSlugs: ["native-app-development", "website-development"],
    relatedProjectIds: [],
  },
  {
    slug: "native-app-development",
    title: "Native App Development",
    shortTitle: "Native Apps",
    navLabel: "Native App Development",
    navDescription: "iOS and Android apps that feel native — with React Native as the default path.",
    icon: Smartphone,
    homepageDescription:
      "iOS and Android applications with native performance, store-ready delivery, and a shared React Native codebase when that is the honest choice.",
    capabilities: ["iOS & Android", "React Native", "App Store launch", "Push & device APIs"],
    metaTitle: "Native App Development in Houston",
    metaDescription:
      "Native iOS and Android app development in Houston. We ship store-ready mobile apps with React Native by default — and true native modules when the device capabilities demand it.",
    keywords: [
      "native app development Houston",
      "iOS app development Houston",
      "Android app development Houston",
      "React Native agency Houston",
      "mobile app developers Houston",
      "App Store development Texas",
    ],
    h1: "Native app development for iOS and Android that ships to the stores",
    lede: "Mobile is not a shrunken website. Native apps earn a home screen icon because they use the device — push, camera, offline, biometrics, background location — and they feel instant. From Houston, we design and build iOS and Android apps with React Native as the default shared codebase, and native modules when the platform requires it.",
    whoItsFor: [
      {
        title: "Products that need a home-screen habit",
        body: "If retention depends on notifications, offline access, or a daily open, a responsive website will always feel like a compromise. That is when a native app is justified.",
      },
      {
        title: "Operators with field or on-the-go workflows",
        body: "Inspectors, clinicians, drivers, membership businesses: the work happens away from a desk. We build apps that survive bad networks and gloved thumbs.",
      },
      {
        title: "Teams graduating from a web-only product",
        body: "You already have a web app or website. We extend the same product into the stores without forking the business logic into two science projects.",
      },
    ],
    problems: [
      {
        title: "A “mobile app” that is just a WebView",
        body: "Users can tell. Performance, gestures, and store review all suffer. We build real native shells and only wrap web content where it is genuinely the right surface.",
      },
      {
        title: "Two codebases, twice the backlog",
        body: "Separate Swift and Kotlin teams double every feature. React Native is our default so product logic lives once — with native modules for camera, payments, or Bluetooth when needed.",
      },
      {
        title: "Store rejection and launch chaos",
        body: "Privacy nutrition labels, signing, review notes, and crash-free sessions are part of the build, not a Friday surprise. We treat App Store and Play Console as a delivery pipeline.",
      },
    ],
    deliverables: [
      "Platform decision (React Native vs. native modules)",
      "UX designed for thumbs, not desktop breakpoints",
      "iOS and Android builds from one product codebase",
      "Auth, secure storage, and biometric unlock",
      "Push notifications and deep linking",
      "Offline-tolerant data sync where the work requires it",
      "TestFlight / internal testing tracks",
      "App Store and Google Play submission support",
      "Crash reporting and product analytics",
    ],
    process: [
      {
        title: "Prove it belongs on a phone",
        body: "We start with the jobs that a website cannot do well. If the honest answer is “it doesn’t need to be an app,” we will say so and point you at website or web app work instead.",
      },
      {
        title: "Design the device experience",
        body: "Navigation, permissions, empty states, and offline behavior get designed before pixels are polished. Store screenshots are a byproduct, not the brief.",
      },
      {
        title: "Build on a shared core",
        body: "React Native for the product surface; native modules only where the OS demands them. You get iOS and Android without maintaining two feature teams.",
      },
      {
        title: "Ship through the stores",
        body: "Signing, privacy disclosures, review, and a rollback plan. After launch we watch crash-free sessions and the first-week funnel, not vanity download counts.",
      },
    ],
    differentiators: [
      {
        title: "Native means native behavior",
        body: "We use React Native so you are not paying for two apps — but we will not fake device features with a wrapped marketing site. Push, biometrics, and offline are first-class.",
      },
      {
        title: "Same studio as your web product",
        body: "Most mobile apps have a web counterpart. We already build web apps and websites, so APIs, auth, and design systems stay coherent instead of becoming a vendor pile-up.",
      },
      {
        title: "Honest about when you do not need an app",
        body: "If a well-built website or PWA covers the jobs, we will tell you. Store presence is expensive to maintain; we only recommend it when the device is part of the product.",
      },
    ],
    geo: "Our native app team is based in Houston, Texas, and ships iOS and Android applications for Gulf Coast operators and national brands that want store-ready mobile without a pure-play mobile agency tax.",
    faqs: [
      {
        question: "Do you build truly native apps or cross-platform?",
        answer:
          "React Native is the default so iOS and Android share one product codebase. When a feature needs a true native module — camera pipelines, Bluetooth, payments, background location — we write that module instead of compromising the experience. You still get one team and one backlog.",
      },
      {
        question: "Can you publish to both the App Store and Google Play?",
        answer:
          "Yes. Signing, privacy nutrition labels, review notes, TestFlight / internal testing, and store listing assets are part of delivery. We do not hand you a binary and wish you luck.",
      },
      {
        question: "How much does native app development cost in Houston?",
        answer:
          "A focused MVP on both platforms typically starts in the same range as a substantial web app, because the product work — flows, auth, APIs — dominates cost, not the UI toolkit. We quote against a written job list after discovery, not a per-screen menu.",
      },
      {
        question: "Do I need a native app if I already have a website?",
        answer:
          "Only if the product depends on device capabilities or a home-screen habit. Many businesses are better served by a fast website or a web app. We will recommend the cheaper surface when it is the right one.",
      },
      {
        question: "Will you maintain the app after launch?",
        answer:
          "OS updates, store policy changes, and crash fixes are a real cost. We offer retainers for that — and we document the pipeline so your team can take it in-house if you prefer.",
      },
      {
        question: "Can the app share a backend with our web app?",
        answer:
          "That is the preferred setup. One API, one auth model, two clients. If you do not have a backend yet, we design it so a web app or admin console can land later without a rewrite.",
      },
      {
        question: "Do you work with existing iOS or Android codebases?",
        answer:
          "We can extend or wrap existing native modules, but we are candid when a rewrite in React Native is cheaper than maintaining two legacy apps. Discovery includes a go/no-go on that trade-off.",
      },
    ],
    relatedSlugs: ["web-app-development", "website-development"],
    relatedProjectIds: [],
  },
  {
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Websites",
    navLabel: "Website Development",
    navDescription: "Marketing sites that load fast, convert, and your team can actually edit.",
    icon: Globe,
    homepageDescription:
      "Conversion-first marketing websites — not web apps. Design systems, Next.js builds, a CMS your team can run, and Core Web Vitals that hold up after launch.",
    capabilities: ["Design systems", "Next.js builds", "Headless CMS", "Core Web Vitals"],
    metaTitle: "Website Development in Houston",
    metaDescription:
      "Houston website development for ambitious brands. We design and ship conversion-first marketing sites in Next.js — fast, editable, and built to rank. Distinct from web app work.",
    keywords: [
      "website development Houston",
      "Houston web design",
      "Next.js website agency",
      "conversion-focused websites",
      "headless CMS Houston",
      "custom website development Texas",
    ],
    h1: "Website development that treats your homepage like a product",
    lede: "A website has one job: turn attention into the next conversation. We design and develop marketing websites in Houston that load in a breath, read like they were written by someone who understands the buyer, and stay editable after we leave. This is not a web app with a login — it is the public face of the brand, engineered in Next.js.",
    whoItsFor: [
      {
        title: "Brands replacing a template that plateaued",
        body: "Squarespace and page builders are fine until you care about speed, structured content, or a design system. That is the point we usually get the call.",
      },
      {
        title: "Teams launching or repositioning",
        body: "New offer, new market, new investor story. You need a site that can carry the narrative and collect the right leads — not a 40-page brochure nobody maintains.",
      },
      {
        title: "Companies that also need to rank",
        body: "If organic search is part of the plan, the website is the asset. We build information architecture, metadata, and Core Web Vitals as part of the site, then hand a clean surface to an SEO campaign.",
      },
    ],
    problems: [
      {
        title: "Pretty, slow, and uneditable",
        body: "Agencies love a locked Figma. We ship a design system plus a CMS your marketing team can run without opening a ticket for every headline change.",
      },
      {
        title: "A site that cannot rank",
        body: "Client-side spaghetti, missing metadata, and blob content are expensive to unwind. We build semantic HTML, sane URLs, and schema into the first release.",
      },
      {
        title: "Confusing a website with a web app",
        body: "If you need dashboards, roles, and workflows, that is our web app practice. Forcing those into a marketing site makes both worse. We will split the work correctly.",
      },
    ],
    deliverables: [
      "Positioning and sitemap before pixels",
      "Design system (type, color, components)",
      "Next.js marketing site with sensible routing",
      "Headless or Git-based CMS your team can run",
      "Core Web Vitals budget (and the work to hit it)",
      "On-page SEO foundations: titles, schema, canonicals",
      "Analytics and conversion events wired at launch",
      "Redirect map and zero-drama cutover",
      "Component documentation for the next campaign page",
    ],
    process: [
      {
        title: "Decide what the site is for",
        body: "One primary conversion, a short list of supporting jobs, and the pages that earn a place in the nav. Everything else is a later campaign, not the launch.",
      },
      {
        title: "Design the system, not a pile of mockups",
        body: "You review a living design system and key templates. That is how a 12-page site does not become 12 unrelated artboards.",
      },
      {
        title: "Build in production-grade Next.js",
        body: "Accessible HTML, image strategy, metadata, and a CMS hooked to the components your editors will actually touch.",
      },
      {
        title: "Launch against a checklist",
        body: "Redirects, analytics, schema, forms, and performance budgets verified before DNS flips. Then we watch the first two weeks of conversion data together.",
      },
    ],
    differentiators: [
      {
        title: "Website ≠ web app",
        body: "Websites persuade and convert anonymous visitors. Web apps authenticate users and mutate data. Mixing them produces slow marketing sites and fragile products. We keep the surfaces separate and link them cleanly when you need both.",
      },
      {
        title: "Built to be ranked, not just admired",
        body: "IA, copy structure, metadata, and Core Web Vitals ship with the site. Pair it with our SEO campaigns when you want the compounding traffic — the site will not fight the work.",
      },
      {
        title: "Houston craft, national-grade engineering",
        body: "We are not a theme shop. Next.js, a real design system, and a CMS your staff will use. The stack is the same caliber we use for product work, tuned for content instead of sessions.",
      },
    ],
    geo: "Web Marketing Solutions is a Houston website development studio serving Space City brands — Energy Corridor B2B, medical and legal practices, consumer, and everyone in between — plus remote clients who want the same standard.",
    faqs: [
      {
        question: "How is website development different from web app development?",
        answer:
          "Website development is for public marketing and content destinations: pages, CMS, SEO, and conversion. Web app development is for authenticated software: logins, roles, dashboards, and workflows. If users do not sign in to do work, you want a website. If they do, you want a web app. We build both and keep them on the correct architecture.",
      },
      {
        question: "What does a custom website cost in Houston?",
        answer:
          "A focused marketing site with a design system and CMS typically lands below a custom web app, because there is no application data model to invent. Exact range depends on page count, integrations, and whether we are migrating years of content. We quote after a written sitemap, not a per-page guess.",
      },
      {
        question: "Do you use WordPress or Next.js?",
        answer:
          "Next.js is the default for performance, security, and flexibility. Content can live in a headless CMS your editors already understand. We will consider WordPress only when the editorial workflow truly requires it — not as a default.",
      },
      {
        question: "Will we be able to edit the site ourselves?",
        answer:
          "Yes. Structured fields for the pages you change often; developers for new templates. We train your team at handoff so “we need the agency for a headline” is not the operating model.",
      },
      {
        question: "Do you also do SEO?",
        answer:
          "Every site we ship includes technical and on-page foundations. Ongoing SEO campaigns — content, digital PR, local, and measurement — are a separate service. Most clients who care about organic traffic run both.",
      },
      {
        question: "How long does a website project take?",
        answer:
          "A typical marketing site is 6–10 weeks from kickoff to launch: discovery, system design, build, content, and cutover. Larger migrations take longer because redirects and content modeling dominate, not the homepage hero.",
      },
      {
        question: "Can you redesign our site without changing the URL structure?",
        answer:
          "Often yes — and when we cannot, we ship a redirect map so equity is preserved. URL decisions are made in discovery, not on launch week.",
      },
    ],
    relatedSlugs: ["seo-campaigns", "web-app-development"],
    relatedProjectIds: ["capturing-all-angles", "legendary-barber-competition"],
  },
  {
    slug: "seo-campaigns",
    title: "SEO Campaigns",
    shortTitle: "SEO Campaigns",
    navLabel: "SEO Campaigns",
    navDescription: "Technical, local, and content programs measured against pipeline — not rankings theater.",
    icon: Search,
    homepageDescription:
      "SEO campaigns with a written thesis: technical foundations, topical authority, and Houston local search — reported against leads and revenue, not vanity rankings.",
    capabilities: ["Technical SEO", "Content programs", "Local & map pack", "Revenue reporting"],
    metaTitle: "SEO Campaigns in Houston",
    metaDescription:
      "Houston SEO campaigns built like products: technical audits, topical authority, and local search with a measurement plan tied to pipeline. No ranking reports without revenue context.",
    keywords: [
      "SEO campaigns Houston",
      "Houston SEO agency",
      "local SEO Houston",
      "technical SEO Texas",
      "content SEO program",
      "map pack SEO Houston",
    ],
    h1: "SEO campaigns that compound — measured against pipeline, not vanity rankings",
    lede: "Search is a system, not a monthly PDF. We run SEO campaigns from Houston that start with a technical and market thesis, then ship the work: architecture, content, local presence, and the measurement to prove it. If a tactic cannot be tied to qualified demand, it does not make the flight plan.",
    whoItsFor: [
      {
        title: "Sites that are fast and still invisible",
        body: "You launched a decent website and organic is flat. That is usually an IA, content, or authority problem — not “more meta tags.” We diagnose before we write.",
      },
      {
        title: "Multi-location and service-area businesses",
        body: "Clinics, firms, trades, and Gulf Coast operators who should own the map pack and the city + service queries. Local SEO is a campaign, not a GBP bio tweak.",
      },
      {
        title: "B2B teams with long consideration cycles",
        body: "Energy, industrial, professional services: the goal is not traffic, it is the short list. We build topical authority around the problems your buyers already search.",
      },
    ],
    problems: [
      {
        title: "Retainers that report impressions",
        body: "If the deck cannot show which pages created opportunities, it is theater. Our campaigns have a thesis, a work backlog, and reporting that follows the funnel.",
      },
      {
        title: "Content without architecture",
        body: "Blogging into a void does not rank. We design the topic map, internal links, and page types first — then write to that system.",
      },
      {
        title: "A website that fights the campaign",
        body: "JS-only rendering, duplicate URLs, and unindexable templates will waste every dollar of content. We either fix the site or we will not take the SEO work.",
      },
    ],
    deliverables: [
      "Technical audit and indexation plan",
      "Keyword and intent map tied to offers",
      "Information architecture and internal linking model",
      "On-page templates for money and supporting pages",
      "Content program with briefs, not leftover blog ideas",
      "Local SEO: GBP, location pages, citation hygiene",
      "Digital PR / authority roadmap where it is warranted",
      "Looker- or dashboard-ready reporting to leads",
      "Monthly experiment log and next-sprint backlog",
    ],
    process: [
      {
        title: "Audit like we are going to be wrong",
        body: "Crawl, logs if we can get them, competitors, and sales interviews. The output is a written thesis: where demand is, what the site cannot do yet, and the first 90 days of work.",
      },
      {
        title: "Fix the surface",
        body: "Indexation, canonicals, speed, templates, and the page types money queries need. Content on a broken template is how campaigns stall in month four.",
      },
      {
        title: "Ship the program",
        body: "Supporting pages, location or service clusters, and the links that make them a system. Cadence is weekly production, not a quarterly “content dump.”",
      },
      {
        title: "Measure and reallocate",
        body: "We report rankings in context of qualified inquiries and assisted pipeline. Losing queries get killed. Winning clusters get more investment.",
      },
    ],
    differentiators: [
      {
        title: "Campaign, not a chore list",
        body: "An SEO campaign has a thesis, a finite set of bets, and criteria for doubling down or quitting. That is different from a retainer that “does SEO” forever.",
      },
      {
        title: "We also build the website",
        body: "Most SEO firms cannot (or will not) fix the template. We develop the marketing site in the same studio, so technical recommendations actually ship.",
      },
      {
        title: "Houston local, without being only local",
        body: "Map pack and city-service work is a specialty because we live here. National topical campaigns use the same discipline — just a different SERP.",
      },
    ],
    geo: "We run SEO campaigns from Houston, Texas, with deep local-search experience in the metro (map pack, location architecture, Gulf Coast service areas) and content programs that travel nationally.",
    faqs: [
      {
        question: "What is an SEO campaign versus ongoing SEO?",
        answer:
          "A campaign has a written thesis, a scoped backlog, and a time box for proving it (typically 90-day sprints inside a longer engagement). Ongoing SEO without a campaign plan becomes a chore list. We run campaigns on a retainer so production stays continuous — but the work is always aimed at a bet we can evaluate.",
      },
      {
        question: "How long until we see results from an SEO campaign?",
        answer:
          "Technical and on-page wins can move in weeks. Competitive head terms usually take two to four quarters. Local pack movement is often faster when the foundation is clean. We set leading indicators (indexation, rankings on supporting pages, qualified organic inquiries) so you are not waiting a year for a single vanity keyword.",
      },
      {
        question: "Do you guarantee #1 rankings?",
        answer:
          "No. Anyone who does is selling theater. We guarantee the quality of the diagnosis, the production cadence, and reporting that ties work to demand. Rankings are a means.",
      },
      {
        question: "Can you run SEO if you did not build our website?",
        answer:
          "Yes, if the stack is workable. If the site cannot be crawled or edited sanely, we will price a website engagement first. We would rather refuse the SEO work than burn a year on a surface that cannot win.",
      },
      {
        question: "Do you do local SEO for Houston businesses?",
        answer:
          "Yes — Google Business Profile, location pages, review operations, and the on-site architecture multi-location brands need. Several locations, one system is a known pattern for us.",
      },
      {
        question: "What do you need from our team?",
        answer:
          "Access to analytics and Search Console, a sales or intake perspective on what a qualified lead is, and a reviewer for content in your domain. We write; you keep us honest on the facts.",
      },
      {
        question: "Is content included?",
        answer:
          "Campaigns include briefs and production capacity agreed in the flight plan. We do not drip random blog posts to “feed the CMS.” Every piece maps to a cluster in the thesis.",
      },
    ],
    relatedSlugs: ["website-development", "web-app-development"],
    relatedProjectIds: [],
  },
];

/** Primary nav service links — order and labels for the header. */
export const serviceNavLinks = [
  { slug: "web-app-development", label: "Web Apps" },
  { slug: "website-development", label: "Websites" },
  { slug: "native-app-development", label: "Native Apps" },
  { slug: "seo-campaigns", label: "SEO" },
] as const satisfies ReadonlyArray<{ slug: ServiceSlug; label: string }>;

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return servicePages.find((service) => service.slug === slug);
}

export function servicePath(slug: ServiceSlug): `/services/${ServiceSlug}` {
  return `/services/${slug}`;
}

export function getRelatedServices(service: ServicePage): ServicePage[] {
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((related): related is ServicePage => Boolean(related));
}
