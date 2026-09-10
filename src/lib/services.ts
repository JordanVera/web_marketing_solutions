import {
  AppWindow,
  Globe,
  Search,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import type { FaqItem } from './content';

export type ServiceSlug =
  | 'web-app-development'
  | 'native-app-development'
  | 'website-development'
  | 'seo-campaigns';

export type ServiceFaq = FaqItem;

export type ServiceBlock = {
  title: string;
  body: string;
};

export type ServiceSectionHeading = {
  eyebrow: string;
  title: string;
  accent: string;
};

export type ServiceLongformSection = {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro?: string;
  blocks?: ServiceBlock[];
  items?: string[];
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
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
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
  longform: ServiceLongformSection[];
  geo: string;
  faqs: ServiceFaq[];
  relatedSlugs: ServiceSlug[];
  relatedProjectIds: string[];
};

export const servicesHub = {
  metaTitle: 'Houston Web App, Native App, Website & SEO Services',
  metaDescription:
    'Four focused service lines from a Houston digital agency: custom websites, web apps, native iOS and Android apps, and SEO campaigns built to rank and convert.',
  keywords: [
    'Houston digital agency',
    'Houston web app development',
    'Houston native app development',
    'Houston website development',
    'Houston SEO campaigns',
    'web marketing solutions',
  ],
  h1: 'Houston digital services for commercial teams.',
  lede: 'Custom website development, web app development, native app development, and SEO services Houston operators can brief in a budget meeting. Pick a lane — or schedule a free consultation and we will tell you which one you actually need.',
} as const;

const sharedCtas = {
  primaryCta: 'Schedule Your Free Consultation',
  secondaryCta: 'Get a Custom Quote',
  secondaryHref: '/contact',
} as const;

const defaultSectionHeadings = {
  relatedWork: {
    eyebrow: 'Related work',
    title: 'Missions in this',
    accent: 'neighborhood',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions we hear before',
    accent: 'kickoff',
  },
  related: {
    eyebrow: 'Related services',
    title: 'Adjacent work, same',
    accent: 'studio',
  },
} as const;

export const servicePages: ServicePage[] = [
  {
    slug: 'website-development',
    title: 'Website Development',
    shortTitle: 'Websites',
    navLabel: 'Website Development',
    navDescription:
      'Custom website development in Houston — fast, editable, and built to convert commercial visitors.',
    icon: Globe,
    homepageDescription:
      'Custom website development Houston companies use when a template stops converting. We design professional, SEO-friendly business websites — responsive, fast, and editable — then hand a clean surface to an SEO campaign when organic demand is part of the plan.',
    capabilities: [
      'Responsive design',
      'SEO-friendly builds',
      'CMS your team can run',
      'Core Web Vitals',
    ],
    metaTitle: 'Houston Website Development for Businesses',
    metaDescription:
      'Custom website development in Houston for growing businesses. Fast, secure, SEO-friendly sites with a CMS your marketing team can run.',
    keywords: [
      'custom website development Houston',
      'professional web design Houston',
      'business website development',
      'responsive website design',
      'e-commerce website development',
      'website redesign Houston',
      'web development company Houston',
      'SEO-friendly website design',
    ],
    h1: 'Houston Website Development Services for Growing Businesses',
    lede: 'A business website has one job: turn attention into the next conversation. Web Marketing Solutions is a web development company in Houston that designs and ships custom website development for commercial teams — professional web design that loads in a breath, reads like someone who understands the buyer wrote it, and stays editable after we leave. This is not a web app with a login and it is not a theme with your logo swapped in. It is the public face of the brand, engineered for ROI, speed, security, and the next redesign you will not need for years. Busy owners and marketing leads get a written sitemap, a CMS they can run, and SEO-friendly website design baked into the first release — not a “phase two” that never funds.',
    ...sharedCtas,
    sections: {
      audience: {
        eyebrow: 'Industries',
        title: 'Business website development for',
        accent: 'teams who sell',
      },
      problems: {
        eyebrow: 'The problem',
        title: 'What a weak site costs',
        accent: 'a growing business',
      },
      deliverables: {
        eyebrow: 'What you get',
        title: 'Features that show up as',
        accent: 'pipeline',
      },
      delivery: {
        eyebrow: 'Our approach',
        title: 'Discovery through',
        accent: 'support',
      },
      whyUs: {
        eyebrow: 'Results & ROI',
        title: 'What we measure after',
        accent: 'launch',
      },
      ...defaultSectionHeadings,
    },
    whoItsFor: [
      {
        title: 'Energy and industrial B2B',
        body: 'Energy Corridor and Gulf Coast operators need a site that can carry a technical offer without looking like a 2014 brochure. We build information architecture for long consideration cycles — specs, proof, and a path to a real inquiry.',
      },
      {
        title: 'Professional services',
        body: 'Law, accounting, consulting, and specialty practices buy on trust. Professional web design in Houston for these firms means credential-rich pages, fast mobile, and intake that does not leak qualified matters.',
      },
      {
        title: 'Healthcare and clinic groups',
        body: 'Multi-location groups need consistent templates, location pages that can rank, and forms that respect how patients actually book. We treat the site as the front door, not a PDF library.',
      },
      {
        title: 'Retail and e-commerce operators',
        body: 'E-commerce website development here means product truth, speed, and a checkout you can explain to finance — not a theme that collapses the first time you run a campaign.',
      },
      {
        title: 'Companies mid-reposition',
        body: 'New offer, new market, website redesign in Houston that can carry the narrative. We cut the 40-page brochure nobody maintains and keep the pages that earn a place in the nav.',
      },
    ],
    problems: [
      {
        title: 'The site cannot explain the offer',
        body: 'Buyers bounce because the homepage talks about the company instead of the job you do. Custom website development starts with the conversation your sales team already has — then we put that on the page in language a stranger can follow.',
      },
      {
        title: 'Pretty, slow, and uneditable',
        body: 'Agencies love a locked file. You need responsive website design that holds Core Web Vitals after marketing adds a campaign page, plus a CMS that does not require a ticket for a headline. We ship both.',
      },
      {
        title: 'A site that cannot rank',
        body: 'Client-side spaghetti, missing metadata, and blob content make SEO-friendly website design impossible after the fact. We build semantic HTML, sane URLs, and schema into release one so an SEO campaign has a surface that can win.',
      },
    ],
    deliverables: [
      'Positioning and sitemap before pixels',
      'Responsive website design system (type, color, components)',
      'Next.js marketing site with sensible routing',
      'Headless or Git-based CMS your team can run',
      'Core Web Vitals budget — and the work to hit it',
      'SEO-friendly website design: titles, schema, canonicals',
      'Analytics and conversion events wired at launch',
      'Redirect map for website redesign projects',
      'Security defaults: HTTPS, headers, dependency hygiene',
      'Component docs for the next campaign page',
    ],
    process: [
      {
        title: 'Discovery & strategy',
        body: 'We interview sales and operators, audit the current site, and write the one primary conversion plus the pages that earn a nav slot. You leave this phase with a sitemap and a go/no-go on scope — not a mood board.',
      },
      {
        title: 'Design & development',
        body: 'A living design system and key templates, then production-grade Next.js. Accessible HTML, image strategy, metadata, and a CMS hooked to the fields editors will actually touch. You click staging every week.',
      },
      {
        title: 'Testing & launch',
        body: 'Redirects, forms, schema, analytics, and performance budgets verified before DNS flips. Website redesign Houston projects get a cutover checklist so equity is not left on the table.',
      },
      {
        title: 'Support & optimization',
        body: 'The first two weeks we watch conversion data together. Ongoing support covers CMS help, campaign pages, and the technical work an SEO campaign will ask for — without opening a mystery retainer.',
      },
    ],
    differentiators: [
      {
        title: 'ROI is a conversion path, not a vibe',
        body: 'We instrument demo requests, quote forms, and phone taps at launch. Clients who pair the new site with an SEO campaign typically see the compounding traffic; the site is built so that work is not wasted on an unindexable template.',
      },
      {
        title: 'Speed that survives the next campaign',
        body: 'Median load times we ship sit near 0.9s LCP on the templates we control. That is not a lab screenshot — it is a budget we defend when someone wants to drop an unoptimized embed on the homepage.',
      },
      {
        title: 'Security and scale without a science project',
        body: 'Modern hosting, locked-down headers, and a stack your next hire can run. When you add locations, SKUs, or languages, we extend the system instead of bolting on another tool.',
      },
    ],
    longform: [
      {
        id: 'features',
        eyebrow: 'Benefits',
        title: 'What makes a business website',
        accent: 'worth funding',
        intro:
          'Feature lists are cheap. These are the properties commercial buyers actually feel — and the ones that show up in the next quarter’s inquiry quality.',
        blocks: [
          {
            title: 'Mobile-responsive by default',
            body: 'Responsive website design is not a breakpoint checklist. We design for thumbs first because that is how most B2B research starts, then scale up to the boardroom laptop without a second art direction.',
          },
          {
            title: 'Fast loading speeds',
            body: 'Every extra second on a landing page leaks paid and organic traffic. We set a Core Web Vitals budget in the contract and hit it with image strategy, lean JavaScript, and hosting that does not fight the framework.',
          },
          {
            title: 'Security and compliance posture',
            body: 'TLS, secure headers, dependency updates, and form handling that does not dump inquiries into an unmonitored inbox. Healthcare-adjacent and professional-services clients get a build that will not embarrass a security questionnaire.',
          },
          {
            title: 'CMS your team will use',
            body: 'Structured fields for the pages you change often; developers for new templates. Training at handoff so “we need the agency for a headline” is not the operating model.',
          },
          {
            title: 'SEO optimization included',
            body: 'On-page SEO-friendly website design ships with the site: titles, internals, schema, canonicals. Ongoing SEO campaign management is a separate practice — the site will not fight that work.',
          },
          {
            title: 'Scalability for the next offer',
            body: 'A design system and routing model that can absorb a new service line or location without a rebuild. That is how custom website development Houston teams stay out of the three-year redesign cycle.',
          },
        ],
      },
      {
        id: 'stack',
        eyebrow: 'Technology',
        title: 'A stack your next hire',
        accent: 'can run',
        intro:
          'We default to Next.js, a modern design system, and a headless or Git-based CMS. That combination is fast, hireable, and boring in the ways finance likes — no proprietary page builder holding the site hostage. Images are optimized at the edge, forms post to systems you already own, and analytics are first-party events, not a tag soup. We will consider WordPress only when the editorial workflow truly requires it. The point is not the logo on the stack slide. The point is that custom website development should leave you with a codebase a competent engineer can extend, and a CMS a marketer can live in on a Tuesday.',
      },
      {
        id: 'roi',
        eyebrow: 'Proof',
        title: 'Results a business owner',
        accent: 'can brief',
        intro:
          'On marketing-site work we regularly see conversion rate lift in the 30–40% range when we cut pages that cannot earn a job in the funnel — one commercial account moved +38% after we refused half the wishlist. Organic sessions compound when the same studio later runs the SEO campaign; blended accounts have averaged +148% organic sessions after the technical surface was fixed. Live examples: Capturing All Angles, a Houston film-and-stills site built to book work, and an invite-only event launch that had to feel as sharp as the brand in the room. Metrics that matter here are qualified inquiries, time-to-first-meaningful-paint, and whether your team can ship a campaign page without opening a ticket. If you want a custom quote against your current bounce and inquiry data, bring Search Console and we will be specific.',
      },
    ],
    geo: 'Web Marketing Solutions is a Houston website development studio serving Space City brands — Energy Corridor B2B, medical and legal practices, e-commerce, and everyone in between — plus remote commercial clients who want the same standard.',
    faqs: [
      {
        question: 'What makes a website effective for a business?',
        answer:
          'A single primary conversion, copy that matches how buyers already talk, speed that does not punish mobile, and a CMS your team will actually use. Professional web design Houston teams remember is the site that made the next meeting easier — not the one with the most animation.',
      },
      {
        question: 'How long does website development take?',
        answer:
          'A typical custom marketing site is 6–10 weeks from kickoff to launch: discovery, system design, build, content, and cutover. Website redesign Houston projects with years of URLs take longer because redirects and content modeling dominate, not the homepage hero.',
      },
      {
        question: 'What’s included in ongoing support?',
        answer:
          'CMS training, dependency and security updates, campaign landing pages, and the technical fixes an SEO campaign will request. We quote a monthly block or a ticket budget — not an unlimited “retainer” that hides the work.',
      },
      {
        question: 'Do you build e-commerce websites?',
        answer:
          'Yes, when the catalog and checkout are the product. E-commerce website development is scoped as merchandising, speed, and operations — not a theme with a payment plugin. If you need a customer portal after purchase, that may be web app work.',
      },
      {
        question: 'Will the site be SEO-friendly from day one?',
        answer:
          'Yes. Titles, schema, canonicals, internals, and Core Web Vitals ship with the site. Rankings still require an SEO campaign if you want compounding organic demand — we will not pretend a launch day meta tag is a strategy.',
      },
      {
        question: 'How is this different from web app development?',
        answer:
          'Website development is for public marketing and content. Web app development is for authenticated software. If users do not sign in to do work, you want a website. We build both and keep them on the correct architecture.',
      },
    ],
    relatedSlugs: ['seo-campaigns', 'web-app-development'],
    relatedProjectIds: ['capturing-all-angles', 'legendary-barber-competition'],
  },
  {
    slug: 'web-app-development',
    title: 'Web App Development',
    shortTitle: 'Web Apps',
    navLabel: 'Web App Development',
    navDescription:
      'Enterprise web app development — portals, SaaS, and internal tools with real auth, data, and workflows.',
    icon: AppWindow,
    homepageDescription:
      'Web app development Houston operators use when spreadsheets and no-code hit a ceiling. Custom web application development for portals, SaaS, and internal tools — React, APIs, and cloud-based applications your team can run.',
    capabilities: [
      'Auth & roles',
      'SaaS & portals',
      'API integrations',
      'Cloud deployment',
    ],
    metaTitle: 'Houston Web App Development for Enterprise',
    metaDescription:
      'Houston web app development for enterprise teams. Custom portals, SaaS, and cloud apps with security, integrations, and a codebase you own.',
    keywords: [
      'web app development Houston',
      'custom web application development',
      'SaaS development Houston',
      'enterprise web app development',
      'React development Houston',
      'cloud-based applications',
      'web application development company',
      'scalable web solutions',
    ],
    h1: 'Houston Web App Development for Enterprise Solutions',
    lede: 'A website persuades. A web app does the job — logins, roles, records, workflows, and the APIs that keep operations moving. Web Marketing Solutions is a web application development company in Houston for teams that have outgrown spreadsheets, Shopify hacks, and no-code duct tape. We design and engineer custom web application development for enterprise problems: client portals, internal tools, and SaaS products that have to work on a Tuesday when the person who “knows the Airtable” is out. Integration, security, and performance are the brief — not a marketing shell with a fake dashboard. If you need scalable web solutions a VP of Ops can defend, start with the jobs users perform, not a screen gallery.',
    ...sharedCtas,
    sections: {
      audience: {
        eyebrow: 'Use cases',
        title: 'Where enterprise web apps',
        accent: 'earn their keep',
      },
      problems: {
        eyebrow: 'The decision',
        title: 'Why a web app — not',
        accent: 'another website',
      },
      deliverables: {
        eyebrow: 'Included',
        title: 'What a serious build',
        accent: 'actually ships',
      },
      delivery: {
        eyebrow: 'Process',
        title: 'From requirements to',
        accent: 'production',
      },
      whyUs: {
        eyebrow: 'Why this studio',
        title: 'Application engineering,',
        accent: 'not page templates',
      },
      ...defaultSectionHeadings,
    },
    whoItsFor: [
      {
        title: 'Project and work-management tools',
        body: 'When the work is the product — requests, reviews, status, handoffs — a purpose-built web app beats a pile of shared inboxes. We model the jobs and put them behind roles people already understand.',
      },
      {
        title: 'Customer and partner portals',
        body: 'Energy, logistics, and professional services clients who log in to request, review, or track work. That experience is the product. Enterprise web app development treats it that way.',
      },
      {
        title: 'Analytics dashboards',
        body: 'Live operational views, not a Looker tab someone screenshots into Slack. We bind the UI to the data model and the permissions that keep the wrong rows off the screen.',
      },
      {
        title: 'Inventory and operations systems',
        body: 'Counts, locations, exceptions, and the integrations that keep ERP from becoming a second job. Custom web application development pays for itself the quarter you stop babysitting the workaround.',
      },
      {
        title: 'Workflow automation',
        body: 'Approvals, notifications, and audit trails that used to live in email. We replace the Zapier graveyard with a maintainable Next.js and API layer.',
      },
    ],
    problems: [
      {
        title: 'The website is pretending to be software',
        body: 'Marketing sites with a bolted-on login are slow, insecure, and impossible to iterate. Web apps need application architecture: sessions, data models, background jobs, and environments. If visitors do not log in to do work, you want website development. If they do, you are in the right place.',
      },
      {
        title: 'Spreadsheets became the system of record',
        body: 'Version conflicts, no audit trail, and one person who “knows how it works.” We model the real workflow and put it behind auth, roles, and a UI people will actually use — that is when businesses need web apps.',
      },
      {
        title: 'No-code hit a ceiling',
        body: 'When permissions, reporting, or integrations get non-trivial, visual builders collapse. We migrate the logic you already proved into a maintainable codebase — typically React / Next.js with a datastore that fits.',
      },
    ],
    deliverables: [
      'Requirements and jobs-to-be-done map',
      'Architecture, data model, and permission design',
      'UX flows for the work users actually perform',
      'Next.js / React application with typed APIs',
      'Authentication, roles, and audit-friendly logging',
      'Admin and customer-facing surfaces',
      'Third-party and internal API integrations',
      'Cloud deployment (Vercel, AWS, or Azure as the problem dictates)',
      'Staging, QA, and production environments',
      'Analytics, error tracking, and handoff docs',
    ],
    process: [
      {
        title: 'Requirements gathering',
        body: 'We interview the people who will live in the product and write the workflows down before a single screen is designed. Scope is a list of jobs, not a mood board. This is where most “app” projects fail — we refuse to skip it.',
      },
      {
        title: 'Architecture & design',
        body: 'Entities, permissions, and edge cases get a schema. Then UX for the critical path. React development in Houston does not start with a component library theme; it starts with a model that will still make sense in year three.',
      },
      {
        title: 'Agile development',
        body: 'Each sprint delivers a usable path (create → review → complete), not a layer of mock screens. You click a staging build every week. Priorities can move; the data model does not get rewritten for a demo.',
      },
      {
        title: 'Testing & deployment',
        body: 'Auth, observability, backups, and a cloud deploy you can roll back. Cloud-based applications need environments, not a Friday FTP. We treat production as a gated launch, not a hope.',
      },
      {
        title: 'Ongoing support',
        body: 'You own the repo. We stay on for iteration if you want a product partner — patches, new integrations, and the performance work growth will demand. No hostage page builder.',
      },
    ],
    differentiators: [
      {
        title: 'This is not website development',
        body: 'Websites are content destinations. Web apps are authenticated software. Mixing them produces slow marketing sites and fragile products. We keep the surfaces separate and will tell you which one you need — even when the other is cheaper.',
      },
      {
        title: 'Hireable technology',
        body: 'Next.js, typed APIs, Postgres when it fits. We choose boring, documented tools so you are not stuck with us forever. That is how a web application development company should behave.',
      },
      {
        title: 'Gulf Coast product sense',
        body: 'We have built for operators who need reliability more than novelty — energy, clinics, logistics, and B2B services that cannot afford a cute prototype.',
      },
    ],
    longform: [
      {
        id: 'competencies',
        eyebrow: 'Core competencies',
        title: 'The hard parts of',
        accent: 'enterprise apps',
        intro:
          'Enterprise web app development is a pile of unglamorous systems that have to be correct. These are the ones we staff for.',
        blocks: [
          {
            title: 'Real-time data processing',
            body: 'Live status, operational dashboards, and collaborative records need a plan for updates — not a page refresh dressed up as “real time.” We pick sockets, polling, or streams against the actual freshness the job requires.',
          },
          {
            title: 'Multi-user systems',
            body: 'Roles, row-level permissions, and the awkward cases (the contractor who should see one job, not the company). Multi-user is a product surface, not a checkbox on an auth plugin.',
          },
          {
            title: 'Third-party integrations',
            body: 'CRM, billing, identity, ERP, data warehouses. We treat integrations as contracts with failure modes — retries, mapping, and an admin that can see what broke.',
          },
          {
            title: 'API development',
            body: 'Typed boundaries so a native app or partner can land later without a rewrite. Custom web application development that hides the API inside the UI is how you pay twice.',
          },
          {
            title: 'Database optimization',
            body: 'Indexes, query plans, and models that match how people filter. Scalable web solutions fail in the database long before they fail in the CSS.',
          },
          {
            title: 'Cloud deployment',
            body: 'Vercel, AWS, or Azure depending on compliance, data gravity, and who will operate it. We document the path to production so you are not renting a black box.',
          },
        ],
      },
      {
        id: 'security',
        eyebrow: 'Security & compliance',
        title: 'Trust is a',
        accent: 'product feature',
        intro:
          'Enterprise buyers will send a questionnaire. We would rather the answers be boring. Data in transit and at rest is encrypted; secrets never live in the client; sessions are treated as a surface we design, not a plugin we hope. Compliance is scoped to what you actually need — SOC 2 evidence, HIPAA-adjacent patterns, audit logs — not a sticker we bought. Security audits and dependency patches are part of support, not a panic after a headline. Regular updates are how cloud-based applications stay out of the breach slide. If your industry has a real standard, we design to it in architecture, not in a PDF after launch.',
      },
      {
        id: 'scale',
        eyebrow: 'Scale & performance',
        title: 'Growth should not',
        accent: 'require a rewrite',
        intro:
          'Handling growth means knowing which axis will move: users, records, or integrations. We load-balance and cache against that axis, monitor the p95 the humans feel, and keep a performance budget next to the feature backlog. Optimization is continuous — query work, payload size, background jobs — not a heroic week after a sales spike. SaaS development in Houston for multi-tenant products gets tenancy and noisy-neighbor rules in the first schema, because retrofitting that is how roadmaps die. If you are pre-scale, we will not sell you an architecture you cannot operate. If you are mid-scale, we will not pretend a bigger server is a strategy.',
      },
    ],
    geo: 'Web Marketing Solutions designs and builds custom web applications from Houston, Texas, for teams across the Gulf Coast and remote-first companies that want a senior product partner without a coastal agency markup.',
    faqs: [
      {
        question: 'How is a web app different from a website?',
        answer:
          'A website is a content and conversion destination. A web app is software people log into to complete work: dashboards, portals, workflows, and live data. If the primary action is “read and inquire,” build a website. If it is “sign in and operate,” build a web app. We offer both and will not upsell you the wrong one.',
      },
      {
        question: 'What’s the typical timeline for web app development?',
        answer:
          'A focused MVP — one primary workflow, auth, and an admin — usually lands in 8–14 weeks. Multi-role enterprise products with several integrations take a quarter or more. We write the timeline against jobs-to-be-done, not a generic “phase 1.”',
      },
      {
        question: 'How do you ensure security?',
        answer:
          'Auth is a designed surface, data is encrypted in transit and at rest, environments are separated, and dependencies are patched on a cadence. We log access in a way an auditor can follow. Exact controls follow your compliance needs — we do not spray every acronym on the homepage.',
      },
      {
        question: 'Do you do SaaS development in Houston?',
        answer:
          'Yes — including multi-tenant apps with billing states, onboarding, and an admin. We are opinionated about scope: we would rather ship one sharp workflow than a graveyard of half-built modules.',
      },
      {
        question: 'Will we own the code?',
        answer:
          'Yes. The repository, infrastructure accounts, and credentials are yours. We document how to run it. You are never locked into a proprietary builder.',
      },
      {
        question: 'Can you integrate with our existing systems?',
        answer:
          'That is most of the job. CRM, identity, billing, and warehouses are normal. We map the contract and the failure cases before we write the happy path.',
      },
    ],
    relatedSlugs: ['native-app-development', 'website-development'],
    relatedProjectIds: [],
  },
  {
    slug: 'native-app-development',
    title: 'Native App Development',
    shortTitle: 'Native Apps',
    navLabel: 'Native App Development',
    navDescription:
      'Native app development in Houston — iOS and Android apps with real device performance, not a wrapped site.',
    icon: Smartphone,
    homepageDescription:
      'Native app development Houston teams fund when the work happens on a phone. iOS app development and Android app development with native performance, offline capability, and store-ready launch — custom mobile app solutions, not a wrapped website.',
    capabilities: [
      'iOS & Android',
      'Store-ready launch',
      'Offline & device APIs',
      'Push & biometrics',
    ],
    metaTitle: 'Houston Native App Development | iOS & Android',
    metaDescription:
      'Native app development in Houston for iOS and Android. Custom mobile apps with native performance, offline support, and store-ready launch.',
    keywords: [
      'native app development Houston',
      'iOS app development',
      'Android app development',
      'mobile app development Houston',
      'enterprise mobile apps',
      'mobile app company Houston',
      'iOS and Android development',
      'custom mobile app solutions',
    ],
    h1: 'Houston Native App Development: iOS & Android Solutions',
    lede: 'Mobile-first is no longer a slogan. Commercial buyers research on a phone, field teams work on a phone, and customers expect a home-screen habit when the product is part of the week. Native app development in Houston from Web Marketing Solutions means iOS and Android solutions that use the device — push, camera, offline, biometrics, location — and feel instant. We are a mobile app company Houston operators hire when a responsive website will always feel like a compromise. Custom mobile app solutions earn the icon because they do a job a browser tab cannot. If you need enterprise mobile apps with store-ready delivery, we will prove the device is part of the product before we staff a build.',
    ...sharedCtas,
    sections: {
      audience: {
        eyebrow: 'Industries',
        title: 'Where native apps',
        accent: 'pay off',
      },
      problems: {
        eyebrow: 'The choice',
        title: 'Native vs.',
        accent: 'cross-platform',
      },
      deliverables: {
        eyebrow: 'Features',
        title: 'Device capabilities we',
        accent: 'build as first-class',
      },
      delivery: {
        eyebrow: 'Approach',
        title: 'From research to',
        accent: 'the stores',
      },
      whyUs: {
        eyebrow: 'After launch',
        title: 'Support that outlasts',
        accent: 'opening weekend',
      },
      ...defaultSectionHeadings,
    },
    whoItsFor: [
      {
        title: 'Retail and e-commerce',
        body: 'Loyalty, scan-to-shop, and push that is not spam. Native performance keeps merchandising fast; offline-tolerant carts survive the store’s dead zone.',
      },
      {
        title: 'Healthcare and wellness',
        body: 'Enterprise mobile apps for clinicians and patients need biometrics, secure storage, and workflows that work in a hallway with one bar of signal.',
      },
      {
        title: 'Finance and banking-adjacent',
        body: 'Auth, device binding, and audit trails. iOS and Android development here is a security product that happens to have a UI.',
      },
      {
        title: 'Logistics and delivery',
        body: 'Background location, camera for proof of condition, and sync when the truck returns to coverage. This is why native beats a WebView.',
      },
      {
        title: 'Education and training',
        body: 'Offline lessons, progress sync, and notifications that respect attention. Custom mobile app solutions for L&D only make sense if people will open them daily.',
      },
    ],
    problems: [
      {
        title: 'Native wins when the device is the product',
        body: 'Native apps deliver superior performance because they speak the OS: gestures, memory, background work, and sensors. Cross-platform is often the right commercial choice — we default to a shared React Native core so you are not paying two feature teams. We go fully native (Swift or Kotlin modules) when camera pipelines, Bluetooth, or background location would be compromised by a compromise.',
      },
      {
        title: 'Best use cases for native development',
        body: 'Field work, regulated data, high-frequency opens, and anything that must work offline. If the job is “read our brochure on a phone,” you want website development. If the job is “complete the inspection in a basement,” you want native app development Houston teams can support after OS updates.',
      },
      {
        title: 'A wrapped site is not an app',
        body: 'Users can tell. Performance, gestures, and store review all suffer. We build real native shells and only wrap web content where it is genuinely the right surface.',
      },
    ],
    deliverables: [
      'Platform decision (shared core vs. native modules)',
      'UX designed for thumbs, not desktop breakpoints',
      'iOS and Android builds from one product plan',
      'Auth, secure storage, and biometric unlock',
      'Push notifications and deep linking',
      'Offline-tolerant sync where the work requires it',
      'Camera, location, and sensor integrations',
      'TestFlight and internal testing tracks',
      'App Store and Google Play submission support',
      'Crash reporting and product analytics',
    ],
    process: [
      {
        title: 'User research & strategy',
        body: 'We start with the jobs a website cannot do well. If the honest answer is “it doesn’t need to be an app,” we will say so and point you at website or web app work instead. Store presence is expensive to maintain.',
      },
      {
        title: 'UI/UX design',
        body: 'Navigation, permissions, empty states, and offline behavior get designed before pixels are polished. Store screenshots are a byproduct, not the brief.',
      },
      {
        title: 'Native development',
        body: 'Shared product logic where it is honest; Swift and Kotlin modules where the OS demands them. iOS and Android development stay on one backlog so you are not funding two science projects.',
      },
      {
        title: 'Testing & QA',
        body: 'Device matrix, poor-network tests, and the permission flows reviewers will reject if we get cute. Crash-free sessions are a launch gate.',
      },
      {
        title: 'Launch & support',
        body: 'Signing, privacy nutrition labels, review notes, and a rollback plan. After launch we watch the first-week funnel, not vanity download counts.',
      },
    ],
    differentiators: [
      {
        title: 'App store maintenance',
        body: 'OS updates and policy changes are a real cost. We keep listings, signing, and review notes current so a store rejection is not a surprise Friday.',
      },
      {
        title: 'Performance monitoring',
        body: 'Crash-free sessions, cold start, and the screens that drop people. We report those, not download vanity.',
      },
      {
        title: 'Features, fixes, and insight',
        body: 'A backlog for the next release, patches when the OS moves, and analytics that tell you whether the habit formed. That is post-launch support — not a warranty card.',
      },
    ],
    longform: [
      {
        id: 'ios',
        eyebrow: 'iOS',
        title: 'iOS app development',
        accent: 'that ships',
        intro:
          'Swift where the platform requires it, and a product surface that respects Human Interface guidelines without looking like a tutorial. We optimize for iPhone and iPad as distinct contexts when the work needs a larger canvas. App Store optimization is part of delivery: screenshots, privacy labels, review notes, and metadata that match what the app actually does. iOS best practices here mean secure storage, permission timing that does not beg on launch, and TestFlight tracks your stakeholders can actually use. A mobile app company Houston teams hire should be able to explain a rejection before it happens.',
        blocks: [
          {
            title: 'Swift and native modules',
            body: 'Camera, payments, and background work get real native code when a cross-platform bridge would show. Everything else stays on the shared product core.',
          },
          {
            title: 'App Store readiness',
            body: 'Signing, nutrition labels, and listing assets are in the definition of done. We do not hand you a binary and wish you luck.',
          },
        ],
      },
      {
        id: 'android',
        eyebrow: 'Android',
        title: 'Android app development',
        accent: 'for the real device matrix',
        intro:
          'Kotlin for the modules that need it, and a compatibility plan that assumes your users do not all own last year’s flagship. Google Play optimization covers listing, data safety, and the testing tracks enterprises expect. Android-specific features — widgets, share targets, background constraints — get designed, not bolted on after iOS “looks done.” Device compatibility is a QA program: we test the phones your field team actually carries. Custom mobile app solutions fail in fragmentation when nobody owned that list.',
        blocks: [
          {
            title: 'Kotlin and Play Console',
            body: 'Internal testing, staged rollouts, and a data-safety form that matches the code. Play is a delivery pipeline, not a dump at the end.',
          },
          {
            title: 'Device compatibility',
            body: 'We write the device list in discovery. If your drivers use a specific rugged handset, that handset is in the lab — not a footnote.',
          },
        ],
      },
      {
        id: 'features',
        eyebrow: 'Capabilities',
        title: 'Features that justify',
        accent: 'a home-screen icon',
        blocks: [
          {
            title: 'Push notifications',
            body: 'Permissioned, relevant, and tied to a job — not a marketing blast that gets you uninstalled.',
          },
          {
            title: 'Offline functionality',
            body: 'Local writes, conflict rules, and a sync you can explain. Field work dies without this.',
          },
          {
            title: 'Location, camera, sensors',
            body: 'Requested at the moment of need, with a fallback when the user says no. Enterprise mobile apps live or die on this etiquette.',
          },
          {
            title: 'Biometric authentication',
            body: 'Unlock that matches platform norms. Secure storage for tokens. No homemade PIN theater.',
          },
          {
            title: 'In-app purchases',
            body: 'When the commercial model needs them — store-compliant, receipt-validated, and not a surprise in review.',
          },
          {
            title: 'Real-time synchronization',
            body: 'The same API your web app uses. One source of truth, two clients. That is how iOS and Android development stays coherent.',
          },
        ],
      },
    ],
    geo: 'Our native app team is based in Houston, Texas, and ships iOS and Android applications for Gulf Coast operators and national brands that want store-ready mobile without a pure-play mobile agency tax.',
    faqs: [
      {
        question: 'Should we go iOS, Android, or both?',
        answer:
          'Most commercial products should ship both if the habit matters. We default to a shared core so you are not funding two roadmaps. If your buyers are overwhelmingly on one OS — a field Android device, or an iPhone-only executive audience — we will say so and sequence the other store.',
      },
      {
        question: 'What’s the typical development timeline?',
        answer:
          'A focused MVP on both platforms typically tracks a substantial web app: the product work (flows, auth, APIs) dominates cost and calendar, not the UI toolkit. Eight to sixteen weeks is common for a sharp first release. We quote against a written job list after discovery.',
      },
      {
        question: 'How do you ensure app security?',
        answer:
          'Secure storage, transport encryption, biometric unlock, certificate pinning where it is warranted, and a permission model that does not over-ask. Store privacy forms match the code. We treat review as a security conversation, not a marketing one.',
      },
      {
        question: 'Do you build truly native or cross-platform?',
        answer:
          'Shared React Native for the product surface; Swift and Kotlin modules when the device capability demands it. You still get one team and one backlog. We will not fake native with a wrapped marketing site.',
      },
      {
        question: 'Will you maintain the app after launch?',
        answer:
          'OS updates, store policy changes, and crash fixes are a real cost. We offer retainers for that — and we document the pipeline so your team can take it in-house if you prefer.',
      },
      {
        question: 'Do I need an app if I already have a website?',
        answer:
          'Only if the product depends on device capabilities or a home-screen habit. Many businesses are better served by a fast website or a web app. We will recommend the cheaper surface when it is the right one.',
      },
    ],
    relatedSlugs: ['web-app-development', 'website-development'],
    relatedProjectIds: [],
  },
  {
    slug: 'seo-campaigns',
    title: 'SEO Campaigns',
    shortTitle: 'SEO Campaigns',
    navLabel: 'SEO Campaigns',
    navDescription:
      'SEO services in Houston measured against pipeline — technical, local, and content programs, not ranking theater.',
    icon: Search,
    homepageDescription:
      'SEO services Houston companies buy when paid ads are renting all of the demand. Search engine optimization with a written thesis — local SEO Houston, technical work, and content — reported against leads and revenue, not vanity rankings.',
    capabilities: [
      'Technical SEO',
      'Local SEO Houston',
      'Content programs',
      'Revenue reporting',
    ],
    metaTitle: 'Houston SEO Services | Organic Traffic & Rankings',
    metaDescription:
      'Houston SEO services that grow organic traffic without burning the ads budget. Local and national campaigns measured against pipeline.',
    keywords: [
      'SEO services Houston',
      'search engine optimization Houston',
      'local SEO Houston',
      'professional SEO company',
      'SEO campaign management',
      'organic search optimization',
      'SEO strategy Houston',
      'rank higher Google Houston',
    ],
    h1: 'Houston SEO Services: Drive Organic Traffic & Rankings',
    lede: 'Paid advertising works until the day you pause it. SEO services in Houston from Web Marketing Solutions exist for commercial teams who are tired of renting every click. Search engine optimization is the asset: pages that keep compounding after the invoice stops. We run SEO campaign management for local and national demand — local SEO Houston operators need for the map pack, and topical programs for B2B buyers who research for months. The unique value is not a promise to rank higher on Google in Houston overnight. It is a written thesis, a backlog you can audit, and reporting tied to qualified organic inquiries. If you want a professional SEO company that will refuse work the website cannot support, start with an audit — not a keyword list.',
    ...sharedCtas,
    sections: {
      audience: {
        eyebrow: 'Who it’s for',
        title: 'Organic search for',
        accent: 'commercial buyers',
      },
      problems: {
        eyebrow: 'Why SEO',
        title: 'Why organic still',
        accent: 'matters',
      },
      deliverables: {
        eyebrow: 'Included',
        title: 'What an SEO campaign',
        accent: 'actually contains',
      },
      delivery: {
        eyebrow: 'Methodology',
        title: 'How we run',
        accent: 'the program',
      },
      whyUs: {
        eyebrow: 'Results & ROI',
        title: 'What “working” looks',
        accent: 'like in months',
      },
      ...defaultSectionHeadings,
    },
    whoItsFor: [
      {
        title: 'Sites that are fast and still invisible',
        body: 'You launched a decent website and organic is flat. That is usually an IA, content, or authority problem — not “more meta tags.” We diagnose before we write.',
      },
      {
        title: 'Multi-location and service-area businesses',
        body: 'Clinics, firms, trades, and Gulf Coast operators who should own the map pack and the city + service queries. Local SEO Houston work is a campaign, not a GBP bio tweak.',
      },
      {
        title: 'B2B teams with long consideration cycles',
        body: 'Energy, industrial, professional services: the goal is not traffic, it is the short list. We build topical authority around the problems your buyers already search.',
      },
    ],
    problems: [
      {
        title: 'Organic is how serious buyers start',
        body: 'B2B decision makers do not convert from the first ad. They search, compare, and shortlist. Search engine optimization in Houston for those buyers is how you are present when the budget is finally approved — without paying for every impression in between.',
      },
      {
        title: 'Long-term value versus rented clicks',
        body: 'Ads stop when the card does. Organic search optimization compounds: a page that ranks in month nine still works in month eighteen. That is the ROI argument we make to finance — cost per qualified inquiry that falls as the asset ages.',
      },
      {
        title: 'A website that fights the campaign',
        body: 'JS-only rendering, duplicate URLs, and unindexable templates will waste every dollar of content. We either fix the site — we also do website development — or we will not take the SEO work.',
      },
    ],
    deliverables: [
      'Technical audit and indexation plan',
      'Keyword and intent map tied to offers',
      'Information architecture and internal linking model',
      'On-page templates for money and supporting pages',
      'Content program with briefs, not leftover blog ideas',
      'Local SEO: GBP, location pages, citation hygiene',
      'Digital PR / authority roadmap where it is warranted',
      'Dashboard reporting to leads and assisted pipeline',
      'Monthly experiment log and next-sprint backlog',
    ],
    process: [
      {
        title: 'Audit & analysis',
        body: 'Site technical audit, competitor analysis, and keyword research tied to how you sell — not a 400-row spreadsheet. Crawl, Search Console, and sales interviews. The output is a written SEO strategy Houston stakeholders can argue with: where demand is, what the site cannot do yet, and the first 90 days of work.',
      },
      {
        title: 'On-page optimization',
        body: 'Content optimization against intent, meta tags and heading structure a human can read, and an internal linking strategy that makes money pages inevitable. We do not “optimize” by stuffing Houston into every H2.',
      },
      {
        title: 'Technical SEO',
        body: 'Site speed, mobile templates, crawlability, canonicals, and indexation. If the template cannot be crawled, content production is theater. This is where being a studio that also builds websites matters.',
      },
      {
        title: 'Link building',
        body: 'Quality over volume. A backlink strategy aimed at relevant authority, digital PR where the story exists, and relationships that do not look like a link scheme in two years. We will not buy a package of junk.',
      },
      {
        title: 'Content strategy',
        body: 'Blog posts only when they serve a cluster. Long-form pages when the SERP demands them. Topical authority is a system of pages and links — not a cadence of leftover thought leadership.',
      },
    ],
    differentiators: [
      {
        title: 'Average timeline we will actually say out loud',
        body: 'Technical and on-page wins can move in weeks. Competitive head terms usually take two to four quarters. Local pack movement is often faster when the foundation is clean. We set leading indicators — indexation, supporting-page rankings, qualified organic inquiries — so you are not waiting a year for one vanity keyword.',
      },
      {
        title: 'ROI you can calculate',
        body: 'If a qualified inquiry is worth $X and organic starts contributing N extra inquiries a month, the campaign has a payback date. We build the sheet with your close rate, not a national benchmark from a blog.',
      },
      {
        title: 'We also build the website',
        body: 'Most SEO firms cannot (or will not) fix the template. We develop the marketing site in the same studio, so technical recommendations actually ship. That is why blended accounts have seen organic session lifts in the 148% range after the surface was fixed.',
      },
    ],
    longform: [
      {
        id: 'local',
        eyebrow: 'Local SEO',
        title: 'Local SEO Houston',
        accent: 'that owns the map',
        intro:
          'Local SEO in Houston is a system: Google Business Profile, citations, reviews, and on-site location architecture. We optimize GBP categories, services, photos, and Q&A against how people actually search the metro — not a keyword stuffed into the business name. Citation building is hygiene, not a hobby: consistent NAP across the directories that matter. Review operations give your team a cadence so rating is not left to chance. Local keyword targeting pairs city + service pages with the map pack instead of hoping a homepage ranks for every neighborhood. Multi-location brands get one system, not six microsites that cannibalize each other. If you want to rank higher on Google in Houston for service-area work, this is the campaign — not a one-time “SEO setup.”',
        blocks: [
          {
            title: 'Google Business Profile',
            body: 'Categories, services, posts, and photos treated as a product surface. We do not stuff the business name. We do make the profile match the site and the way dispatch actually talks.',
          },
          {
            title: 'Citations and reviews',
            body: 'NAP consistency on the directories that move the pack, plus a review ask that your staff will follow. Fake review schemes are how you get a manual action.',
          },
          {
            title: 'Local keyword targeting',
            body: 'City + service pages and internal links that support the pack. Neighborhood pages only when search demand and a real service area exist.',
          },
        ],
      },
      {
        id: 'reporting',
        eyebrow: 'Transparency',
        title: 'Reporting you can',
        accent: 'take to finance',
        intro:
          'Monthly performance reports cover the work shipped, the queries that moved, and the inquiries those pages created. Key metrics: qualified organic sessions, supporting-page indexation, map actions, and assisted pipeline — rankings in context, not as the headline. Custom dashboards (Looker or the stack you already use) so you are not waiting on a PDF. Regular strategy calls reallocate the backlog: losing queries get killed, winning clusters get more investment. That is SEO campaign management. If a slide cannot show which URL created an opportunity, it does not ship to your inbox.',
      },
      {
        id: 'practices',
        eyebrow: 'Discipline',
        title: 'SEO best practices',
        accent: 'we will not violate',
        intro:
          'Google rewards helpful, crawlable pages with a reason to exist, written for the next click the searcher needs — not a density score. Common mistakes we refuse: doorway location spam, bought links, AI content nobody would send a buyer, and “guaranteed #1” retainers. Algorithm updates are less scary when the thesis is topical authority and a clean technical surface; we watch them, we do not rebuild the strategy every Tuesday. Staying ahead means shipping the next useful page, not chasing a leak. A professional SEO company should be able to explain every tactic in a sentence a counsel would accept.',
        items: [
          'Helpful, unique pages mapped to real intent',
          'Technical hygiene before content volume',
          'No guaranteed rankings — ever',
          'No link schemes or review manipulation',
          'Content a subject-matter expert would sign',
        ],
      },
    ],
    geo: 'We run SEO campaigns from Houston, Texas, with deep local-search experience in the metro (map pack, location architecture, Gulf Coast service areas) and content programs that travel nationally.',
    faqs: [
      {
        question: 'How long until I see SEO results?',
        answer:
          'Technical and on-page wins can move in weeks. Competitive head terms usually take two to four quarters. Local pack movement is often faster when the foundation is clean. We set leading indicators so you are not waiting a year for a single vanity keyword.',
      },
      {
        question: 'What’s included in an SEO campaign?',
        answer:
          'A written thesis, technical and on-page work, a content backlog mapped to clusters, local SEO where it applies, and reporting to qualified demand. Exact mix is in the flight plan. We do not drip random blog posts to “feed the CMS.”',
      },
      {
        question: 'Do you guarantee #1 rankings?',
        answer:
          'No. Anyone who does is selling theater. We guarantee the quality of the diagnosis, the production cadence, and reporting that ties work to demand. Rankings are a means. “Rank higher on Google in Houston” is a direction, not a contract clause.',
      },
      {
        question: 'How much does SEO cost?',
        answer:
          'Campaigns are scoped to the competitive gap and the production the thesis requires — not a menu of “20 citations.” After an audit we quote a monthly production capacity and the first 90-day backlog. If the site cannot win, we will price website work first.',
      },
      {
        question: 'Do you do local SEO for Houston businesses?',
        answer:
          'Yes — Google Business Profile, location pages, review operations, and the on-site architecture multi-location brands need. Several locations, one system is a known pattern for us.',
      },
      {
        question: 'Can you run SEO if you did not build our website?',
        answer:
          'Yes, if the stack is workable. If the site cannot be crawled or edited sanely, we will price a website engagement first. We would rather refuse the SEO work than burn a year on a surface that cannot win.',
      },
      {
        question: 'Is content included?',
        answer:
          'Campaigns include briefs and production capacity agreed in the plan. Every piece maps to a cluster in the thesis. We write; you keep us honest on the facts in your domain.',
      },
    ],
    relatedSlugs: ['website-development', 'web-app-development'],
    relatedProjectIds: [],
  },
];

/** Primary nav service links — order and labels for the header. */
export const serviceNavLinks = [
  { slug: 'website-development', label: 'Websites' },
  { slug: 'native-app-development', label: 'Native Apps' },
  { slug: 'web-app-development', label: 'Web Apps' },
  { slug: 'seo-campaigns', label: 'SEO' },
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
