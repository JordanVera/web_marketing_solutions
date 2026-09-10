import {
  BarChart3,
  Compass,
  Gauge,
  LineChart,
  PenTool,
  Radar,
  Rocket,
  Satellite,
  type LucideIcon,
} from 'lucide-react';
import { servicePages } from './services';

/* ---------------------------------------------------------------------------
   Single source of truth for every piece of marketing copy on the page.
   Editing this file is all that is needed to update the live site — no
   component changes required.
   --------------------------------------------------------------------------- */

export const company = {
  name: 'Web Marketing Solutions',
  shortName: 'WMS',
  tagline: 'Houston Digital Agency for Commercial Growth',
  blurb:
    'A Houston digital agency for commercial teams: custom website development, web app development, native app development, and SEO services built to move pipeline — not vanity metrics.',
  city: 'Houston, Texas',
  email: 'verawebdev@protonmail.com',
  phone: '+1 (713) 555-0142',
  address: {
    street: '1200 Space Park Dr, Suite 210',
    locality: 'Houston',
    region: 'TX',
    postalCode: '77058',
    country: 'US',
  },
  coordinates: { lat: 29.5502, lng: -95.097 },
  founded: '2025',
} as const;

/** Primary nav links appended after service links in Navigation. */
export const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const heroStats = [
  { value: '2025', label: 'Houston studio founded' },
  { value: '60+', label: 'Commercial clients served' },
  { value: '148%', label: 'Avg. organic traffic lift' },
] as const;

export type FaqItem = {
  question: string;
  answer: string;
};

export const homePage = {
  metaTitle: 'Houston Digital Agency | Web Dev & SEO Services',
  metaDescription:
    'Houston digital agency for commercial clients. Custom web development, web apps, native apps, and SEO services that grow pipeline — not vanity traffic.',
  keywords: [
    'Houston digital agency',
    'web development Houston',
    'web app development',
    'native app development',
    'SEO services Houston',
    'digital marketing agency Houston',
    'custom web development',
    'enterprise app development',
  ],
  hero: {
    eyebrow: 'Houston Digital Agency — Built for Commercial Teams',
    headline: ['Houston Digital Agency:'] as const,
    headlineAccent: ['Web Development & SEO Services'] as const,
    h1: 'Houston Digital Agency: Web Development & SEO Services',
    lede: 'Custom web development, apps, and SEO built for commercial results—not vanity traffic. Software and search from one team.',
    primaryCta: 'Schedule Your Free Consultation',
    primaryHref: '/contact',
    secondaryCta: 'Learn More',
    secondaryHref: '#services',
  },
  whyUs: {
    eyebrow: '02 — Why choose us',
    title: 'Built for',
    titleAccent: 'business outcomes',
    description:
      'You are not buying pages or sprints. You are buying a shorter path from attention to revenue. We take commercial work because the buyers are sharp, the cycles are long, and the cost of a pretty-but-wrong build shows up in pipeline — not in a design critique.',
  },
  services: {
    eyebrow: '01 — Capabilities',
    title: 'Four services. No filler',
    titleAccent: 'retainers',
    description:
      'A Houston digital agency should be able to say which surface you need. We run four practices — website development Houston teams can edit, web app development for real workflows, native app development for the home screen, and SEO services Houston companies use to stop renting all of their demand.',
    flightCheckTitle: 'Not sure which service you need?',
    flightCheckBody:
      'Schedule a free consultation. We will tell you whether you need custom web development, a web app, a native app, or an SEO campaign — and what to skip. No pitch deck.',
    flightCheckCta: 'Schedule Your Free Consultation',
  },
  houston: {
    eyebrow: '02 — Why choose us',
    title: 'A digital agency',
    titleAccent: 'operators can brief',
    description:
      'Houston does not reward theater. Energy, healthcare, logistics, and professional services buy on proof. We built Web Marketing Solutions the same way this city runs complex work: a written plan, named owners, and a go/no-go before anything public ships.',
    console: {
      callsign: 'HOU',
      station: 'Mission Control',
      coordinates: '29.76° N 95.37° W',
    },
  },
  telemetry: [
    { label: 'Organic sessions', readout: '+148%', fill: 0.92 },
    { label: 'Core Web Vitals', readout: '98/100', fill: 0.98 },
    { label: 'Conversion rate', readout: '+38%', fill: 0.74 },
    { label: 'Client retention', readout: '94%', fill: 0.94 },
  ],
  results: {
    eyebrow: '03 — Results',
    title: "Outcomes we've",
    titleAccent: 'shipped',
    description:
      'The two launches below are live: a cinematic film-and-stills studio and an invite-only event site. Different categories, same rule — the public surface has one job, and we instrument whether it did that job.',
    metrics: [
      { value: '+148%', label: 'Organic sessions' },
      { value: '0.9s', label: 'Median LCP' },
      { value: '+38%', label: 'Conversion rate' },
      { value: '94%', label: 'Client retention' },
    ],
    footerPrompt: 'Want numbers on a program like yours?',
    footerLink: 'Get a custom quote',
  },
  process: {
    eyebrow: '04 — How we work',
    title: 'A flight plan, not a',
    titleAccent: 'guessing game',
    description:
      'Five phases, named deliverables, and a written go/no-go at every gate. You always know what is shipping next — and why it earned a place on the plan.',
  },
  testimonials: {
    eyebrow: '05 — Client signal',
    title: 'What operators',
    titleAccent: 'report back',
  },
  faq: {
    eyebrow: '05 — FAQ',
    title: 'Questions B2B teams ask',
    titleAccent: 'before kickoff',
    description:
      'Straight answers for commercial buyers comparing a Houston digital agency, a freelance shop, and a national retainer.',
  },
  cta: {
    eyebrow: 'Launch window open',
    windowLabel: 'Launch window · Open · Reply ≤ 2 business days',
    title: 'Ready for a',
    titleAccent: 'real plan?',
    lede: 'Tell us the outcome you need in the next twelve months — more qualified inquiries, a portal your clients will use, a store-ready app, or organic demand that is not rented from ads. We reply with recommended service, scope, timeline, and price within two business days.',
    primaryCta: 'Schedule Your Free Consultation',
    secondaryCta: 'Get a Custom Quote',
    trustSignals: [
      'No long-term contracts',
      'Houston-based team',
      'Reply in 2 business days',
    ],
  },
} as const;

export const homeFaqs: FaqItem[] = [
  {
    question:
      'What does a Houston digital agency actually do for a B2B company?',
    answer:
      'For commercial clients, the job is not “more marketing.” It is a public site that converts, software people can log into when the work requires it, and search demand you do not have to rent forever. Web Marketing Solutions scopes website development, web app development, native app development, and SEO services against that job — then tells you which ones you do not need.',
  },
  {
    question: 'Do we need a website, a web app, or a native app?',
    answer:
      'If visitors read and inquire, you need custom website development. If employees or clients sign in to complete work, you need web app development. If the product depends on the camera, offline access, push, or a home-screen habit, you need native app development. We will not sell you the more expensive surface when a faster site would close the gap.',
  },
  {
    question:
      'How is this different from a typical digital marketing agency in Houston?',
    answer:
      'Many agencies rent attention (ads, social) and outsource the build. We engineer the asset — Next.js sites, authenticated web apps, iOS and Android apps — and run SEO campaigns on surfaces that can actually rank. Same studio, so technical SEO recommendations are not a PDF your developer ignores.',
  },
  {
    question: 'How long until we see results from web development or SEO?',
    answer:
      'A focused marketing site typically launches in 6–10 weeks. A web app MVP is usually 8–14 weeks. Native apps track the product scope, not the UI toolkit. SEO services in Houston show technical and on-page movement in weeks; competitive head terms often take two to four quarters. We set leading indicators so you are not waiting a year for a single vanity keyword.',
  },
  {
    question: 'Do you only work with Houston companies?',
    answer:
      'We are based in Houston, Texas, and know Energy Corridor, medical, legal, and Gulf Coast operators well. We also ship for Texas and national B2B teams who want a senior partner without coastal-agency markup. Discovery can be remote; local kickoffs happen in person when it helps.',
  },
  {
    question: 'What happens on the free consultation?',
    answer:
      'Twenty minutes, no pitch deck. You describe the business outcome. We tell you whether the next dollar belongs in website development, a web app, a native app, or an SEO campaign — plus a rough timeline and what we would cut if it were our budget. If we are the wrong studio, we say that too.',
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  capabilities: string[];
  href: string;
};

export const services: Service[] = servicePages.map((service) => ({
  id: service.slug,
  title: service.title,
  description: service.homepageDescription,
  icon: service.icon,
  capabilities: service.capabilities,
  href: `/services/${service.slug}`,
}));

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  /** Swap for an Unsplash/Pexels URL or a local file in /public at any time. */
  image: string;
  imageAlt: string;
  metric: string;
  href: string;
  serviceIds: string[];
};

export const projects: Project[] = [
  {
    id: 'capturing-all-angles',
    title: 'Capturing All Angles',
    category: 'Website',
    description:
      'A cinematic film-and-stills site for a Houston photographer and videographer — mosaic reel, work archives, and a booking flow that matches the work. Built as conversion-first website development, not a template with a contact form taped on.',
    image: '/projects/capturing-all-angles.png',
    imageAlt:
      'Capturing All Angles website homepage — Houston photography and videography studio site by Web Marketing Solutions',
    metric: 'Film & stills',
    href: 'https://www.capturingallangles.com/',
    serviceIds: ['website-development'],
  },
  {
    id: 'legendary-barber-competition',
    title: "Shedeur's Legendary Barber Competition",
    category: 'Website',
    description:
      'Invite-only event site for Shedeur Sanders — story, process, submissions, and partners, designed to feel as sharp as the competition itself. Fast load, clear CTA, zero CMS clutter.',
    image: '/projects/legendary-barber-competition.png',
    imageAlt:
      "Shedeur's Legendary Barber Competition event website — custom web development by a Houston digital agency",
    metric: 'Event launch',
    href: 'https://www.legendarybarbercompetition.com/',
    serviceIds: ['website-development'],
  },
];

export const projectCategories = [
  'All',
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://');
}

export type ProcessStep = {
  id: string;
  phase: string;
  clock: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    phase: 'Phase 01',
    clock: 'T-4',
    title: 'Discovery',
    description:
      'We map the market, audit what you already have, and talk to the people who sell and support your customers — before we recommend a service line.',
    icon: Radar,
  },
  {
    id: 'strategy',
    phase: 'Phase 02',
    clock: 'T-3',
    title: 'Flight Plan',
    description:
      'A written strategy with scope, timeline, success metrics, and the trade-offs we would make if it were our budget.',
    icon: Compass,
  },
  {
    id: 'build',
    phase: 'Phase 03',
    clock: 'T-2',
    title: 'Design & Build',
    description:
      'Design systems and production code in weekly increments, reviewed in a staging environment you can click through.',
    icon: PenTool,
  },
  {
    id: 'launch',
    phase: 'Phase 04',
    clock: 'T-0',
    title: 'Launch',
    description:
      'Redirects, analytics, schema, store listings, and performance budgets verified before anything public flips. Zero-drama go-lives.',
    icon: Rocket,
  },
  {
    id: 'optimize',
    phase: 'Phase 05',
    clock: 'T+1',
    title: 'Optimize',
    description:
      'Monthly experiments against qualified inquiries and revenue. We report on pipeline, not impressions dressed up as a report.',
    icon: Gauge,
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  result: string;
};

/** Placeholder social proof — replace names and quotes when client approvals land. */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'They rebuilt our site in seven weeks and it immediately outperformed the version we spent a year on with our last agency. The difference was strategy — they told us what to cut.',
    name: 'Marisol Reyes',
    role: 'VP Marketing',
    company: 'Orbital Energy Partners',
    result: '+212% qualified leads',
  },
  {
    id: 't2',
    quote:
      'We went from invisible to the top of the map pack in every neighborhood we serve. Six clinics, one system, and a dashboard that finally makes sense to our owners.',
    name: 'Dr. Alan Whitfield',
    role: 'Managing Partner',
    company: 'Bayou Dental Group',
    result: '#1 map pack across 6 clinics',
  },
  {
    id: 't3',
    quote:
      'The most refreshing part was the honesty. They pushed back on half our wishlist, shipped the half that mattered, and our conversion rate went up 38%.',
    name: 'Trey Donovan',
    role: 'Founder',
    company: 'Apex Outfitters',
    result: '+38% conversion rate',
  },
  {
    id: 't4',
    quote:
      'Nine weeks from a blank page to a launch site our investors kept bringing up. They understood the science well enough to write about it credibly.',
    name: 'Dr. Priya Nandakumar',
    role: 'CEO',
    company: 'Meridian Labs',
    result: '9-week brand + site launch',
  },
];

/** Placeholder wordmarks — replace with real client logo files when available. */
export const clientLogos = [
  'ORBITAL',
  'BAYOU DENTAL',
  'APEX',
  'MERIDIAN LABS',
  'GULF COAST',
  'NOVA',
] as const;

export const houstonHighlights = [
  {
    icon: Satellite,
    title: 'One studio, four practices',
    description:
      'Website, web app, native app, and SEO campaign — scoped as separate jobs. You are not paying a digital marketing agency Houston tax for channels we padded onto a menu.',
  },
  {
    icon: LineChart,
    title: 'Pipeline over pageviews',
    description:
      'We instrument qualified inquiries, demo requests, and assisted revenue before launch. If a tactic cannot be tied to a commercial outcome, it does not make the plan.',
  },
  {
    icon: BarChart3,
    title: 'Houston fluency, national-grade builds',
    description:
      'Energy Corridor B2B, medical and legal practices, logistics, and Gulf Coast operators — we know how these buyers decide. The engineering travels; the brief stays honest.',
  },
  {
    icon: Gauge,
    title: 'Written go/no-go, not a vibe',
    description:
      'Since 2025 we have shipped with named checklists, staging you can click, and a hard stop before anything public. That is how commercial teams keep risk off the homepage.',
  },
] as const;

export const aboutPage = {
  metaTitle: 'About',
  metaDescription:
    'Web Marketing Solutions is a Houston digital agency for custom web apps, native apps, websites, and SEO campaigns — built with launch discipline since 2025.',
  h1: 'We build digital products worth launching.',
  lede: 'Web Marketing Solutions is a Houston studio for ambitious brands. We design and ship web apps, native apps, websites, and SEO campaigns — with the same checklist-driven discipline Houston has used for complex launches since 1961.',
  mission:
    'Most agencies sell deliverables. We ship outcomes — products people use every day, sites that convert, and search programs tied to pipeline, not vanity metrics.',
  pillars: [
    {
      title: 'Strategy before pixels',
      description:
        'Every engagement starts with discovery: market mapping, competitive audit, and honest scope. We tell you what to cut before we design anything.',
    },
    {
      title: 'Production code, not prototypes',
      description:
        'Design systems and real Next.js, React Native, and CMS builds in weekly increments — reviewed in staging environments you can click through.',
    },
    {
      title: 'Instrumented from day one',
      description:
        'Analytics, event tracking, and performance budgets wired before launch. Mission control never guesses — neither do we.',
    },
    {
      title: 'Local roots, national reach',
      description:
        'Based in Space City with deep Houston market knowledge — from Energy Corridor B2B to Heights retail — and a playbook that travels well beyond the Beltway.',
    },
  ],
  stats: heroStats,
} as const;

export const contactPage = {
  metaTitle: 'Contact',
  metaDescription:
    'Schedule a free consultation with Web Marketing Solutions. Tell us your goals and get a recommended service, scope, timeline, and price within two business days.',
  h1: 'Schedule your free consultation.',
  lede: 'Whether you need website development, a web app, a native app, or SEO services in Houston — tell us the outcome. We reply with a real plan, not a generic pitch deck.',
  trustSignals: [
    'No long-term contracts',
    'Houston-based team',
    'Reply in 2 business days',
  ],
} as const;

export const footerNav = {
  services: servicePages.map((service) => ({
    label: service.shortTitle,
    href: `/services/${service.slug}`,
  })),
  company: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const socials = [
  // { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" as const },
  // { label: "X", href: "https://x.com/", icon: "x" as const },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/webmarketingsolutions.tx/',
    icon: 'instagram' as const,
  },
  // { label: "GitHub", href: "https://github.com/", icon: "github" as const },
];
