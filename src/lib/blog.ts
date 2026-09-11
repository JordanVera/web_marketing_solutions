import {
  blogImageCatalog,
  blogImageCreditLine,
  blogImageSrc,
} from '@/lib/blog-images';
import { SITE_URL } from '@/lib/utils';

/* ---------------------------------------------------------------------------
   Blog content — add posts to the blogPosts array below.
   --------------------------------------------------------------------------- */

export type BlogCategory = 'SEO' | 'Web Development' | 'Strategy' | 'Apps';

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'list'; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  heroImage: string;
  heroImageAlt: string;
  heroOverlay: string;
  callsign: string;
  blocks: BlogBlock[];
};

/** Absolute URL for schema and OG — supports local paths and remote hosts. */
export function blogImageAbsoluteUrl(src: string) {
  return src.startsWith('http') ? src : `${SITE_URL}${src}`;
}

export const blogHub = {
  metaTitle: 'Blog',
  metaDescription:
    'Practical guides from a Houston digital agency — website development, SEO, apps, and the decisions commercial teams in Houston actually face.',
  h1: 'Field notes for Houston teams.',
  lede: 'No fluff, no pitch decks — just the tradeoffs we walk clients through before we write a line of code or flip DNS. Starting with the platform question every Houston business eventually asks.',
} as const;

const IMG = {
  houstonHero: blogImageCatalog.houstonSkylineDusk,
  wordpressCms: blogImageCatalog.contentEditor,
  nextjsCode: blogImageCatalog.reactCodeEditor,
  seoDashboard: blogImageCatalog.seoAnalytics,
} as const;

export const blogPosts: BlogPost[] = [
  {
    slug: 'nextjs-vs-wordpress-houston',
    title: 'Next.js vs WordPress: Which Platform Fits Your Houston Business?',
    excerpt:
      'A Houston digital agency breaks down when custom Next.js website development beats WordPress — and when a CMS still makes sense for local teams that need to ship fast, rank in Google, and convert traffic into pipeline.',
    metaTitle: 'Next.js vs WordPress for Houston Businesses',
    metaDescription:
      'Compare Next.js and WordPress for Houston website development. A Houston digital agency explains speed, SEO, security, and cost — so you pick the right platform before you rebuild.',
    category: 'Web Development',
    tags: [
      'Next.js',
      'WordPress',
      'Houston website development',
      'Houston digital agency',
      'custom website development Houston',
      'SEO services Houston',
    ],
    author: 'Web Marketing Solutions',
    publishedAt: '2026-09-10',
    updatedAt: '2026-09-10',
    readTimeMinutes: 9,
    heroImage: blogImageSrc(IMG.houstonHero),
    heroImageAlt: IMG.houstonHero.defaultAlt,
    heroOverlay: 'bg-linear-to-br from-void/88 via-void/72 to-void/58',
    callsign: 'WMS-WEB-01',
    blocks: [
      {
        type: 'paragraph',
        text: 'If you are a Houston business owner comparing Next.js and WordPress, you are already past the “we need a website” stage. You are asking whether your platform can keep up with how you sell — in the Energy Corridor, the Medical Center, Katy, The Heights, or anywhere buyers search before they call. That is the right question. The wrong answer is whichever platform your cousin’s friend used in 2019.',
      },
      {
        type: 'paragraph',
        text: 'At Web Marketing Solutions, we build custom websites and web apps in Next.js for commercial teams across Houston. We also inherit WordPress installs every month — bloated plugins, slow Core Web Vitals, SEO campaigns fighting the stack instead of compounding. This guide is the conversation we have in the first consultation: when WordPress is the honest recommendation, when Houston website development should mean a modern React framework, and what it costs either way.',
      },
      {
        type: 'heading',
        text: 'WordPress in one minute',
      },
      {
        type: 'paragraph',
        text: 'WordPress powers a huge share of the web for a reason. It is a content management system first: editors log in, publish pages and blog posts, swap images, and manage menus without opening a repo. Themes and plugins extend it into ecommerce, booking, memberships, and more. For a Houston law firm that publishes weekly updates, a restaurant group with seasonal menus, or a nonprofit that needs ten volunteers posting events, that self-serve editing model is real value.',
      },
      {
        type: 'paragraph',
        text: 'The tradeoff shows up on performance, security, and long-term SEO. Every plugin is another dependency. Page builders add markup weight. Updates break layouts. Hosting matters more. A WordPress site can rank — we have seen it — but ranking in competitive Houston local search often means fighting the theme, not refining the strategy.',
      },
      {
        type: 'image',
        src: blogImageSrc(IMG.wordpressCms, 1200),
        alt: IMG.wordpressCms.defaultAlt,
        caption: `WordPress wins when Houston teams need daily publishing without a developer. ${blogImageCreditLine(IMG.wordpressCms)}`,
      },
      {
        type: 'heading',
        text: 'Next.js in one minute',
      },
      {
        type: 'paragraph',
        text: 'Next.js is a React framework for building websites and web applications. Content can still come from a headless CMS (Sanity, Contentful, WordPress itself as a headless backend) but the public site is compiled, optimized, and served as fast static or server-rendered pages. That architecture is why Houston digital agency teams reach for it when the site is a revenue tool — not a brochure that gets refreshed once a year.',
      },
      {
        type: 'paragraph',
        text: 'Custom website development in Next.js means semantic HTML, clean URLs, image optimization, and Core Web Vitals baked in from launch — not patched in after a PageSpeed red flag. It also means integrations (CRM, scheduling, custom calculators, client portals) live in the same codebase instead of a plugin marketplace gamble.',
      },
      {
        type: 'image',
        src: blogImageSrc(IMG.nextjsCode, 1200),
        alt: IMG.nextjsCode.defaultAlt,
        caption: `Custom Next.js builds trade plugin sprawl for a codebase your Houston team can measure, secure, and extend. ${blogImageCreditLine(IMG.nextjsCode)}`,
      },
      {
        type: 'heading',
        text: 'Side-by-side: what Houston buyers actually feel',
      },
      {
        type: 'list',
        items: [
          'Speed — Next.js sites typically win on Largest Contentful Paint and Time to Interactive because there is less runtime baggage. WordPress can be fast with disciplined hosting, caching, and a minimal plugin set; most Houston small-business installs are not configured that way.',
          'SEO — Both can rank. Next.js makes technical SEO easier: metadata per route, structured data in components, canonical URLs, and sitemaps without SEO plugin conflicts. WordPress relies on Yoast or Rank Math — fine until the theme fights the plugin.',
          'Editing — WordPress wins for non-technical teams that publish daily without a developer. Next.js wins when changes are campaign-driven and you want staging, review, and deploy discipline — common for B2B website development Houston buyers expect from a serious vendor.',
          'Security — WordPress’s attack surface is the login screen plus every outdated plugin. Next.js shifts risk to your hosting and API layers; there is no wp-admin for bots to hammer.',
          'Cost — WordPress often looks cheaper upfront (theme + hosting + plugins). Total cost of ownership rises with break-fix, speed audits, and website redesign Houston projects that strip dead weight. Next.js costs more to build initially and less to keep performant if you planned content workflows upfront.',
        ],
      },
      {
        type: 'quote',
        text: 'The platform is not the strategy. It is the surface your SEO campaign and your sales team share — if it is slow or fragile, Houston buyers bounce before your copy can work.',
        attribution: 'Web Marketing Solutions — Houston digital agency',
      },
      {
        type: 'heading',
        text: 'When WordPress is the right call in Houston',
      },
      {
        type: 'paragraph',
        text: 'Choose WordPress when your team will own day-to-day publishing, your functionality fits well-supported plugins, and your SEO services Houston partner can keep the install lean. Strong fits: local service businesses with straightforward service-area pages, content-heavy publishers, membership sites where a mature plugin ecosystem saves months, and budget-conscious launches that need to go live in weeks with a proven theme.',
      },
      {
        type: 'paragraph',
        text: 'If you go this route, invest in managed WordPress hosting, a minimal plugin policy, and a developer who will not install a page builder “just for flexibility.” Your future website redesign in Houston will thank you.',
      },
      {
        type: 'heading',
        text: 'When Next.js is the right call in Houston',
      },
      {
        type: 'paragraph',
        text: 'Choose Next.js when performance and conversion matter as much as content, when you need custom workflows (quotes, configurators, logged-in client areas), or when organic search is a primary channel and you refuse to fight the CMS for every technical fix. We recommend custom website development Houston teams pursue with Next.js for: B2B industrial and energy suppliers, medical and legal practices competing on trust and speed, multi-location brands that need templated landing pages without clone bloat, and marketing sites tied to a product roadmap — not a one-off launch.',
      },
      {
        type: 'paragraph',
        text: 'Headless WordPress is a hybrid worth naming: editors keep a familiar admin; visitors get a Next.js front end. That split works when content volume is high and performance non-negotiable. It is not free — you are running two systems — but it ends the “fast or editable” false choice.',
      },
      {
        type: 'image',
        src: blogImageSrc(IMG.seoDashboard, 1200),
        alt: IMG.seoDashboard.defaultAlt,
        caption: `Pair the platform choice with Search Console, analytics, and a written SEO strategy — not hope. ${blogImageCreditLine(IMG.seoDashboard)}`,
      },
      {
        type: 'heading',
        text: 'SEO in Houston: the platform effect',
      },
      {
        type: 'paragraph',
        text: 'Local SEO in Houston is not only Google Business Profile and citations — though those matter. It is also whether your service pages load fast on mobile downtown, whether your schema is correct on every location page, and whether your blog posts support internal links without duplicate template noise. An SEO campaign Houston businesses run on a sluggish WordPress install spends the first ninety days on technical debt instead of content and links.',
      },
      {
        type: 'paragraph',
        text: 'Next.js does not auto-rank you. No platform does. What it does is remove excuses: clean Core Web Vitals, predictable metadata, and a site architecture your SEO partner can extend without asking permission from a theme vendor. For competitive terms — “Houston web development,” “custom website development Houston,” industry-specific long-tail queries — that head start compounds.',
      },
      {
        type: 'list',
        items: [
          'Ship semantic HTML and one H1 per page from day one — not after a plugin audit.',
          'Wire LocalBusiness and Service schema in code, matched to your real NAP in Houston.',
          'Build service and location pages as first-class routes, not duplicate WordPress templates.',
          'Pair the rebuild with Search Console, analytics, and a content calendar — platform plus program.',
        ],
      },
      {
        type: 'heading',
        text: 'Migration and the website redesign Houston trap',
      },
      {
        type: 'paragraph',
        text: 'Moving WordPress to Next.js is a website redesign Houston project whether you call it that or not. URLs change, redirects must map, forms and tracking revalidate, and content models get rebuilt. Skipping that work is how businesses lose years of equity in a weekend cutover. We treat migrations like launches: staging, checklist, rollback path, and performance budget signed before DNS flips.',
      },
      {
        type: 'paragraph',
        text: 'Staying on WordPress but “rebuilding the theme” can work — if you delete plugins aggressively and accept that some editor flexibility goes away. Replacing a page builder with a custom theme is often half the cost of a Next.js rewrite and half the upside. Be honest about which half you need.',
      },
      {
        type: 'heading',
        text: 'A simple decision framework',
      },
      {
        type: 'list',
        items: [
          'Publish more than twice a week without developer help? Lean WordPress (or headless WordPress).',
          'Need custom apps, portals, or integrations? Lean Next.js.',
          'Failed Core Web Vitals or mobile speed costing leads? Audit WordPress lean-ness; if the plugin list is long, model a Next.js rebuild.',
          'SEO services Houston is your growth bet for the next 12 months? Prioritize a platform your SEO team controls.',
          'Budget under $8k and launch in 30 days? WordPress with discipline beats a rushed custom build.',
          'Budget for a revenue asset and 8–12 week timeline? Custom website development Houston teams deliver in Next.js pays back on conversion and maintainability.',
        ],
      },
      {
        type: 'quote',
        text: 'We will tell you to keep WordPress if that is the honest answer. We will also show you the PageSpeed score and the plugin list so you are not guessing.',
      },
      {
        type: 'heading',
        text: 'What we recommend for Houston commercial teams',
      },
      {
        type: 'paragraph',
        text: 'Most Houston businesses we talk to do not have a CMS problem — they have a fit problem. WordPress was chosen because it was familiar, not because anyone mapped workflows, SEO goals, or integration needs. Next.js was never on the table because it sounded like “app development” and they thought they only needed a site.',
      },
      {
        type: 'paragraph',
        text: 'If you are deciding between Next.js and WordPress right now, bring three things to a consultation: your last ninety days of Search Console or analytics, a list of who publishes content and how often, and the one workflow your current site cannot support (quotes, booking, client login, multi-step forms). Web Marketing Solutions is a Houston digital agency that ships both stacks — we will recommend the one that matches pipeline, not our favorite repo template.',
      },
      {
        type: 'paragraph',
        text: 'Schedule a free consultation. We will tell you whether you need custom website development in Next.js, a lean WordPress rebuild, or an SEO campaign on what you already have — and what to skip.',
      },
    ],
  },
];

export function blogPath(slug: string) {
  return `/blog/${slug}`;
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategory) {
  return blogPosts.filter((post) => post.category === category);
}

/** Newest first — used by the hub and sitemap. */
export function getSortedBlogPosts() {
  return [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function formatBlogDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T12:00:00Z`));
}
