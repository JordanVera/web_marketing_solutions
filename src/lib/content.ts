import {
  BarChart3,
  Compass,
  Gauge,
  LineChart,
  Megaphone,
  PenTool,
  Radar,
  Rocket,
  Search,
  Satellite,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------------------------------------------------
   Single source of truth for every piece of marketing copy on the page.
   Editing this file is all that is needed to update the live site — no
   component changes required.
   --------------------------------------------------------------------------- */

export const company = {
  name: "Web Marketing Solutions",
  shortName: "WMS",
  tagline: "Web Marketing Solutions for Ambitious Brands",
  city: "Houston, Texas",
  email: "hello@webmarketingsolutions.com",
  phone: "+1 (713) 555-0142",
  address: {
    street: "1200 Space Park Dr, Suite 210",
    locality: "Houston",
    region: "TX",
    postalCode: "77058",
    country: "US",
  },
  coordinates: { lat: 29.5502, lng: -95.097 },
  founded: "2016",
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Houston", href: "#houston" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Clients", href: "#testimonials" },
] as const;

export const heroStats = [
  { value: "148%", label: "Avg. organic traffic lift" },
  { value: "0.9s", label: "Median load time shipped" },
  { value: "60+", label: "Brands launched since 2016" },
] as const;

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  capabilities: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "web-design",
    title: "Web Design & Development",
    description:
      "Conversion-first websites engineered in Next.js. Every build ships with a design system, sub-second load times, and a CMS your team can actually run without us.",
    icon: PenTool,
    capabilities: ["Design systems", "Next.js builds", "Headless CMS", "Core Web Vitals"],
    featured: true,
  },
  {
    id: "seo",
    title: "SEO & Local Search",
    description:
      "Technical audits, topical authority, and Houston-area local search that puts you in the map pack and keeps you there.",
    icon: Search,
    capabilities: ["Technical SEO", "Local & map pack", "Content strategy"],
  },
  {
    id: "strategy",
    title: "Digital Strategy",
    description:
      "Positioning, funnel architecture, and a measurement plan so every dollar you spend is traceable to pipeline.",
    icon: Compass,
    capabilities: ["Positioning", "Funnel design", "Analytics & attribution"],
  },
  {
    id: "growth",
    title: "Paid Media & Growth",
    description:
      "Paid search, social, and lifecycle campaigns tuned weekly against real revenue — not vanity impressions.",
    icon: Megaphone,
    capabilities: ["Paid search & social", "Landing page testing", "Lifecycle email"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  /** Swap for an Unsplash/Pexels URL or a local file in /public at any time. */
  image: string;
  metric: string;
  href: string;
};

export const projectCategories = ["All", "Web Design", "SEO", "E-commerce", "Brand"] as const;

export const projects: Project[] = [
  {
    id: "orbital-energy",
    title: "Orbital Energy Partners",
    category: "Web Design",
    description:
      "A full rebuild for an energy consultancy on the Gulf Coast — new design system, headless CMS, and a 3x faster site.",
    image: "/projects/orbital-energy.svg",
    metric: "+212% qualified leads",
    href: "#work",
  },
  {
    id: "bayou-dental",
    title: "Bayou Dental Group",
    category: "SEO",
    description:
      "Local SEO program across six Houston clinics, from map pack rankings to a location-page architecture that scales.",
    image: "/projects/bayou-dental.svg",
    metric: "#1 map pack, 6 clinics",
    href: "#work",
  },
  {
    id: "apex-outfitters",
    title: "Apex Outfitters",
    category: "E-commerce",
    description:
      "Headless Shopify storefront with a rebuilt checkout flow and merchandising that finally matches the brand.",
    image: "/projects/apex-outfitters.svg",
    metric: "+38% conversion rate",
    href: "#work",
  },
  {
    id: "meridian-labs",
    title: "Meridian Labs",
    category: "Brand",
    description:
      "Identity system and launch site for a biotech spin-out, delivered from first sketch to production in nine weeks.",
    image: "/projects/meridian-labs.svg",
    metric: "9-week launch",
    href: "#work",
  },
  {
    id: "gulf-coast-legal",
    title: "Gulf Coast Legal",
    category: "SEO",
    description:
      "Content and technical SEO overhaul that moved 40+ practice-area pages onto page one in a brutal market.",
    image: "/projects/gulf-coast-legal.svg",
    metric: "40+ page-one terms",
    href: "#work",
  },
  {
    id: "nova-fitness",
    title: "Nova Fitness Collective",
    category: "Web Design",
    description:
      "Membership platform and marketing site for a studio group, with booking, billing, and a members' portal.",
    image: "/projects/nova-fitness.svg",
    metric: "+64% trial signups",
    href: "#work",
  },
];

export type ProcessStep = {
  id: string;
  phase: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    phase: "Phase 01",
    title: "Discovery",
    description:
      "We map your market, audit what exists, and interview the people who actually talk to your customers.",
    icon: Radar,
  },
  {
    id: "strategy",
    phase: "Phase 02",
    title: "Flight Plan",
    description:
      "A written strategy with scope, timeline, success metrics, and the trade-offs we recommend making.",
    icon: Compass,
  },
  {
    id: "build",
    phase: "Phase 03",
    title: "Design & Build",
    description:
      "Design systems and production code in weekly increments, reviewed in a staging environment you can click through.",
    icon: PenTool,
  },
  {
    id: "launch",
    phase: "Phase 04",
    title: "Launch",
    description:
      "Redirects, analytics, schema, and performance budgets verified before we ever flip DNS. Zero-drama go-lives.",
    icon: Rocket,
  },
  {
    id: "optimize",
    phase: "Phase 05",
    title: "Optimize",
    description:
      "Monthly experiments against real revenue data. We report on pipeline, not impressions.",
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
    id: "t1",
    quote:
      "They rebuilt our site in seven weeks and it immediately outperformed the version we spent a year on with our last agency. The difference was strategy — they told us what to cut.",
    name: "Marisol Reyes",
    role: "VP Marketing",
    company: "Orbital Energy Partners",
    result: "+212% qualified leads",
  },
  {
    id: "t2",
    quote:
      "We went from invisible to the top of the map pack in every neighborhood we serve. Six clinics, one system, and a dashboard that finally makes sense to our owners.",
    name: "Dr. Alan Whitfield",
    role: "Managing Partner",
    company: "Bayou Dental Group",
    result: "#1 map pack across 6 clinics",
  },
  {
    id: "t3",
    quote:
      "The most refreshing part was the honesty. They pushed back on half our wishlist, shipped the half that mattered, and our conversion rate went up 38%.",
    name: "Trey Donovan",
    role: "Founder",
    company: "Apex Outfitters",
    result: "+38% conversion rate",
  },
  {
    id: "t4",
    quote:
      "Nine weeks from a blank page to a launch site our investors kept bringing up. They understood the science well enough to write about it credibly.",
    name: "Dr. Priya Nandakumar",
    role: "CEO",
    company: "Meridian Labs",
    result: "9-week brand + site launch",
  },
];

/** Placeholder wordmarks — replace with real client logo files when available. */
export const clientLogos = [
  "ORBITAL",
  "BAYOU DENTAL",
  "APEX",
  "MERIDIAN LABS",
  "GULF COAST",
  "NOVA",
] as const;

export const houstonHighlights = [
  {
    icon: Satellite,
    title: "Built where missions launch",
    description:
      "Houston has been running complex launches since 1961. We borrowed the discipline: checklists, telemetry, and a go/no-go before anything ships.",
  },
  {
    icon: LineChart,
    title: "Instrumented from day one",
    description:
      "Mission control never guesses. Neither do we — every build lands with analytics, event tracking, and dashboards wired before launch.",
  },
  {
    icon: BarChart3,
    title: "Local knowledge, national reach",
    description:
      "We know the Houston market cold, from Energy Corridor B2B to Heights retail — and the playbook travels well beyond the Beltway.",
  },
] as const;

export const footerNav = {
  services: [
    { label: "Web Design", href: "#services" },
    { label: "SEO & Local Search", href: "#services" },
    { label: "Digital Strategy", href: "#services" },
    { label: "Paid Media", href: "#services" },
  ],
  company: [
    { label: "Our Process", href: "#process" },
    { label: "Case Studies", href: "#work" },
    { label: "Why Houston", href: "#houston" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" as const },
  { label: "X", href: "https://x.com/", icon: "x" as const },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" as const },
  { label: "GitHub", href: "https://github.com/", icon: "github" as const },
];
