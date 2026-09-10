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
  tagline: 'Web Marketing Solutions for Ambitious Brands',
  blurb:
    'A Houston studio for web apps, native apps, websites, and SEO campaigns — for brands that would rather build something worth launching than ship another template.',
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
  founded: '2016',
} as const;

/** Primary nav links appended after service links in Navigation. */
export const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const heroStats = [
  { value: '148%', label: 'Avg. organic traffic lift' },
  { value: '0.9s', label: 'Median load time shipped' },
  { value: '60+', label: 'Brands launched since 2016' },
] as const;

export const homePage = {
  metaTitle: 'Houston Web Apps, Websites & SEO Agency',
  metaDescription:
    'Web Marketing Solutions designs and ships custom web apps, native iOS and Android apps, conversion-first websites, and SEO campaigns from Houston, Texas.',
  hero: {
    eyebrow: 'Houston, Texas — Mission Control for Growth',
    headline: ['Web', 'Marketing', 'Solutions', 'for'] as const,
    headlineAccent: ['Ambitious', 'Brands'] as const,
    lede: 'Custom web apps, native iOS and Android, conversion-first websites, and SEO campaigns — designed and engineered in Space City. Same discipline that launches rockets down the road: a written plan, telemetry, and a hard go/no-go before anything ships.',
    primaryCta: 'Start Your Launch',
    primaryHref: '#contact',
    secondaryCta: 'Explore services',
    secondaryHref: '#services',
  },
  services: {
    eyebrow: '01 — Capabilities',
    title: 'Four services. No filler',
    titleAccent: 'retainers',
    description:
      'Web apps, native apps, websites, and SEO campaigns. Each is a dedicated practice with its own process — not a channel we padded onto a menu to look complete.',
    flightCheckTitle: 'Not sure which service you need?',
    flightCheckBody:
      'Book a 20-minute flight check. We will tell you whether you need a website, a web app, a native app, or an SEO campaign — and what to skip. No pitch deck.',
    flightCheckCta: 'Book a flight check',
  },
  houston: {
    eyebrow: '02 — Why Houston',
    title: 'Built in',
    titleAccent: 'Space City',
    description:
      'Houston does not do incremental. It is the city that put people on the moon and still runs every mission from a room full of screens. We build digital products and search programs the same way.',
  },
  telemetry: [
    { label: 'Organic sessions', readout: '+148%', fill: 0.92 },
    { label: 'Core Web Vitals', readout: '98/100', fill: 0.98 },
    { label: 'Conversion rate', readout: '+38%', fill: 0.74 },
    { label: 'Client retention', readout: '94%', fill: 0.94 },
  ],
  projects: {
    eyebrow: '03 — Selected work',
    title: "Missions we've",
    titleAccent: 'flown',
    description:
      'Live websites we designed and shipped — a cinematic film-and-stills studio and an invite-only event for Shedeur Sanders. Each card opens the real site.',
    footerPrompt: 'Building the next one?',
    footerLink: 'Tell us about the launch',
  },
  process: {
    eyebrow: '04 — How we work',
    title: 'A flight plan, not a',
    titleAccent: 'guessing game',
    description:
      'Five phases, named deliverables, and a written go/no-go at every gate. You always know what is shipping next — and why it earned a place on the plan.',
  },
  cta: {
    eyebrow: 'Launch window open',
    title: 'Ready for',
    titleAccent: 'liftoff?',
    lede: 'Tell us where you want to be twelve months from now. We will send back a real flight plan — recommended service, scope, timeline, and price — within two business days.',
    primaryCta: 'Start Your Launch',
    trustSignals: [
      'No long-term contracts',
      'Houston-based team',
      'Reply in 2 business days',
    ],
  },
} as const;

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
      'A cinematic film-and-stills site for a Houston photographer and videographer — mosaic reel, work archives, and a booking flow that matches the work.',
    image: '/projects/capturing-all-angles.png',
    metric: 'Film & stills',
    href: 'https://www.capturingallangles.com/',
    serviceIds: ['website-development'],
  },
  {
    id: 'legendary-barber-competition',
    title: "Shedeur's Legendary Barber Competition",
    category: 'Website',
    description:
      'Invite-only event site for Shedeur Sanders — story, process, submissions, and partners, designed to feel as sharp as the competition itself.',
    image: '/projects/legendary-barber-competition.png',
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
  title: string;
  description: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    phase: 'Phase 01',
    title: 'Discovery',
    description:
      'We map the market, audit what you already have, and talk to the people who sell and support your customers — before we recommend a service line.',
    icon: Radar,
  },
  {
    id: 'strategy',
    phase: 'Phase 02',
    title: 'Flight Plan',
    description:
      'A written strategy with scope, timeline, success metrics, and the trade-offs we would make if it were our budget.',
    icon: Compass,
  },
  {
    id: 'build',
    phase: 'Phase 03',
    title: 'Design & Build',
    description:
      'Design systems and production code in weekly increments, reviewed in a staging environment you can click through.',
    icon: PenTool,
  },
  {
    id: 'launch',
    phase: 'Phase 04',
    title: 'Launch',
    description:
      'Redirects, analytics, schema, store listings, and performance budgets verified before anything public flips. Zero-drama go-lives.',
    icon: Rocket,
  },
  {
    id: 'optimize',
    phase: 'Phase 05',
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
    title: 'Built where missions launch',
    description:
      'Houston has been running complex launches since 1961. We borrowed the discipline: named checklists, telemetry on day one, and a written go/no-go before anything ships.',
  },
  {
    icon: LineChart,
    title: 'Instrumented from day one',
    description:
      'Mission control never guesses. Neither do we — every build lands with analytics, event tracking, and dashboards wired before launch.',
  },
  {
    icon: BarChart3,
    title: 'Local knowledge, national reach',
    description:
      'Energy Corridor B2B, medical and legal practices, Heights retail, and Gulf Coast operators — we know this market, and the playbook travels well beyond the Beltway.',
  },
] as const;

export const aboutPage = {
  metaTitle: 'About',
  metaDescription:
    'Web Marketing Solutions is a Houston studio for custom web apps, native apps, websites, and SEO campaigns — built with launch discipline since 2016.',
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
    'Start a project with Web Marketing Solutions. Tell us your goals and get a recommended service, scope, timeline, and price within two business days.',
  h1: 'Let\u2019s chart your flight plan.',
  lede: 'Whether you need a web app, native app, website, or SEO campaign — tell us where you want to land. We will reply with a real plan, not a generic pitch deck.',
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
