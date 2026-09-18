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
  houstonHero: blogImageCatalog.houstonSkylineNight,
  floristHero: blogImageCatalog.floristShopArrangement,
  wordpressCms: blogImageCatalog.wordpressTyping,
  nextjsCode: blogImageCatalog.nextjsCodeLaptop,
  seoDashboard: blogImageCatalog.seoAnalyticsDesk,
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
  {
    slug: 'houston-florist-website-design',
    title:
      'Houston Florist Website Design: Turn Floral Portfolios Into Orders and Inquiries',
    excerpt:
      'A practical website design guide for floral companies in Houston, covering portfolios, local SEO, delivery details, online orders, and wedding inquiries.',
    metaTitle: 'Houston Florist Web Design',
    metaDescription:
      'Website design for floral companies in Houston: build a stronger portfolio, clarify delivery areas, and make flower orders and wedding inquiries easier.',
    category: 'Web Development',
    tags: [
      'Houston florist website design',
      'web design for floral companies in Houston',
      'florist website development',
      'Houston florist SEO',
      'flower shop website design',
    ],
    author: 'Web Marketing Solutions',
    publishedAt: '2026-09-18',
    updatedAt: '2026-09-18',
    readTimeMinutes: 8,
    heroImage: blogImageSrc(IMG.floristHero),
    heroImageAlt: IMG.floristHero.defaultAlt,
    heroOverlay: 'bg-linear-to-br from-void/88 via-void/72 to-void/58',
    callsign: 'WMS-WEB-02',
    blocks: [
      {
        type: 'paragraph',
        text: 'Your arrangements may stop someone mid-scroll. Your website needs to help that person take the next step. For floral companies in Houston, that could mean ordering birthday flowers, checking wedding availability, or requesting weekly arrangements for an office. Each customer needs a clear path from admiring your work to doing business with you.',
      },
      {
        type: 'paragraph',
        text: 'Houston florist website design starts with how your floral business actually operates. A wedding studio needs a portfolio and qualified inquiries. A neighborhood flower shop needs accurate delivery information and a dependable ordering experience. A company offering both needs a website that makes those choices obvious. This guide explains what to build, what to prioritize for local SEO, and what to ask before investing in a redesign.',
      },
      {
        type: 'heading',
        text: 'Start with the floral work you want to book',
      },
      {
        type: 'paragraph',
        text: 'Before choosing colors or a homepage layout, decide which services the website should grow. If weddings are your priority, lead with installations, bridal flowers, and a consultation button. If daily deliveries support your business, make arrangements, prices, and delivery availability easy to find. Corporate floral work deserves its own explanation of recurring service, installation, and maintenance where applicable.',
      },
      {
        type: 'list',
        items: [
          'Wedding and event florists: Help couples and planners evaluate your style, service scope, investment expectations, and availability.',
          'Retail flower shops: Help customers choose an arrangement, confirm the delivery area, and complete an order.',
          'Corporate floral companies: Explain recurring arrangements, service frequency, and how a business requests a proposal.',
        ],
      },
      {
        type: 'paragraph',
        text: 'A homepage can support more than one audience. Use specific choices such as Shop Flowers, Explore Wedding Florals, and Request Corporate Flowers instead of sending everyone to the same general contact form.',
      },
      {
        type: 'heading',
        text: 'Build service pages around real customer questions',
      },
      {
        type: 'paragraph',
        text: 'A gallery shows what you can create. Service pages explain what someone can hire you to do. For a Houston floral company, those pages should connect your designs with the practical details customers need before they reach out.',
      },
      {
        type: 'list',
        items: [
          'Wedding flowers: Show bouquets, ceremony pieces, and reception designs alongside your planning process and any minimum investment.',
          'Flower delivery: Explain available areas, ordering deadlines, delivery charges, substitutions, and pickup options.',
          'Corporate flowers: Describe the types of spaces you serve, recurring options, and how consultations work.',
          'Sympathy flowers: If offered, explain arrangement options, timing, and the information needed to coordinate delivery.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Only create pages for services you provide. A smaller website with useful, specific content gives customers a clearer decision than a long menu of thin pages. Keep each page focused on its own service and give it an appropriate next step.',
      },
      {
        type: 'heading',
        text: 'Make Houston service areas useful, not decorative',
      },
      {
        type: 'paragraph',
        text: 'Serving Houston can mean very different things to a florist in the Heights and a studio based in Katy. Your website should explain where you deliver, where you provide event installation, and whether those boundaries differ. A customer should not have to complete checkout to discover that an address is outside your delivery zone.',
      },
      {
        type: 'paragraph',
        text: 'Start with one accurate delivery or service-area page. List the neighborhoods or ZIP codes you actually cover, explain any distance-based charges, and show how customers can confirm eligibility. If you create a separate Katy or Sugar Land page, include useful details specific to that service area, such as delivery availability or examples of completed work you have permission to share.',
      },
      {
        type: 'paragraph',
        text: 'Avoid publishing near-identical pages with only the city name changed. Google identifies substantially similar regional pages that funnel visitors to another destination as an example of doorway abuse. Build a location page because it helps customers understand a real service, not simply because another place name can be added to a headline.',
      },
      {
        type: 'heading',
        text: 'Turn your floral portfolio into a decision tool',
      },
      {
        type: 'paragraph',
        text: 'Organize your portfolio around the work you want to sell. Couples may want to compare ceremony installations and reception tables. An office manager may care about arrangements suited to a reception desk. Separate categories help each visitor find relevant examples without scrolling through every project.',
      },
      {
        type: 'paragraph',
        text: 'Add short descriptions to selected projects: the occasion, design direction, floral elements, and services you provided. Name a Houston venue only when you worked there and can accurately describe the project. Use photography you own or have permission to publish, and provide required photographer credits.',
      },
      {
        type: 'quote',
        text: 'A floral website should make three things clear: your style, your service area, and the next step to working with you.',
        attribution: 'Web Marketing Solutions',
      },
      {
        type: 'heading',
        text: 'Design the mobile experience around ordering and inquiries',
      },
      {
        type: 'paragraph',
        text: 'Test your website the way a customer uses it: on a phone, while comparing options and trying to make a decision. Can someone read your delivery policy, view arrangement details, and submit a form comfortably? Large photographs should support that experience without pushing every useful detail several screens down the page.',
      },
      {
        type: 'list',
        items: [
          'Keep the main action visible and specific: Order Flowers or Request Wedding Availability.',
          'Use appropriately sized images and readable text so the portfolio remains comfortable to browse.',
          'For delivery orders, collect the date, recipient address, card message, and essential delivery instructions.',
          'For wedding inquiries, ask for the date, venue or location, approximate floral budget, and contact details.',
          'Show a clear confirmation after submission and explain when the customer should expect a response.',
        ],
      },
      {
        type: 'paragraph',
        text: 'A submitted wedding inquiry should not imply that a date is reserved. Likewise, an online flower order should not promise same-day delivery unless your availability, cutoff times, and fulfillment process support it. Accurate expectations protect both the customer experience and your team.',
      },
      {
        type: 'heading',
        text: 'Connect your website with your local presence',
      },
      {
        type: 'paragraph',
        text: 'Keep your business name, contact information, hours, and service details accurate wherever customers find you. Review your Google Business Profile alongside the website so visitors are not seeing conflicting opening times or outdated links. Represent a private studio accurately rather than implying that customers can walk into a retail shop.',
      },
      {
        type: 'paragraph',
        text: 'Write page titles and headings that clearly describe each service. For example, a wedding floral page should introduce your Houston wedding services, explain your process, and show relevant work. Use natural descriptions in image alt text. Repeating Houston florist in every sentence or image description makes the content less useful.',
      },
      {
        type: 'paragraph',
        text: 'Ask customers for honest reviews and feature testimonials with permission. Match testimonials to the service being discussed when possible: wedding feedback belongs near wedding work, while delivery feedback helps someone deciding whether to order flowers.',
      },
      {
        type: 'heading',
        text: 'Choose technology your team can maintain',
      },
      {
        type: 'paragraph',
        text: 'Florist web design includes what happens after launch. Who changes holiday hours? Who removes an unavailable arrangement? How do you close delivery dates when the schedule fills? Decide how those updates will work before choosing the platform.',
      },
      {
        type: 'paragraph',
        text: 'An established ecommerce system may fit a shop that needs a familiar catalog and checkout. A custom website or web app may make sense when the business needs tailored inquiry forms, delivery rules, or connections to existing tools. A Next.js front end can be part of that approach, but the editing system, payment flow, and order management still need to be planned. No framework guarantees search rankings or sales.',
      },
      {
        type: 'paragraph',
        text: 'If your existing ordering system works, evaluate whether a better branded website can connect to it before replacing everything. The goal is a site your customers understand and your staff can keep accurate during busy holidays.',
      },
      {
        type: 'heading',
        text: 'Measure orders and qualified leads after launch',
      },
      {
        type: 'paragraph',
        text: 'Agree on the outcomes before the redesign begins. A wedding studio might track consultation requests with a suitable date and budget. A retail florist might track completed purchases and checkout problems. A corporate florist might track recurring-service inquiries.',
      },
      {
        type: 'list',
        items: [
          'Review which search queries bring visitors to your service pages.',
          'Track successful form submissions separately from clicks on a contact button.',
          'For online orders, measure completed purchases and revenue where the commerce system supports it.',
          'Check forms, order notifications, and delivery settings before major seasonal promotions.',
        ],
      },
      {
        type: 'paragraph',
        text: 'These checks help distinguish a visibility problem from a website problem. If the right people arrive but cannot confirm delivery or complete an inquiry, more traffic alone will not solve the issue.',
      },
      {
        type: 'heading',
        text: 'Questions Houston florists should ask before a redesign',
      },
      {
        type: 'list',
        items: [
          'Will we be able to update arrangements, prices, photos, and holiday hours ourselves?',
          'How will the website handle delivery zones, unavailable dates, and ordering deadlines?',
          'Will wedding inquiries include the details we need to respond with a useful next step?',
          'How will existing page URLs be preserved or redirected if they change?',
          'What is included in ongoing hosting, maintenance, support, and measurement?',
        ],
      },
      {
        type: 'heading',
        text: 'Does a Houston florist need a website if Instagram is active?',
      },
      {
        type: 'paragraph',
        text: 'Instagram can introduce people to your style. A website gives those visitors a consistent place to compare services, check delivery details, and order or inquire. Use your social profile to send people to the page that matches the offer instead of making every customer request basic information through messages.',
      },
      {
        type: 'heading',
        text: 'How much does a florist website cost?',
      },
      {
        type: 'paragraph',
        text: 'The scope matters more than the number of pages. A portfolio and inquiry website requires different work from a store with delivery scheduling, payments, product options, and order-system connections. Ask for an itemized proposal that covers content, photography needs, integrations, editing access, launch work, and ongoing costs.',
      },
      {
        type: 'heading',
        text: 'Build a website that supports your Houston floral business',
      },
      {
        type: 'paragraph',
        text: 'At Web Marketing Solutions, we help businesses plan websites around the customers they want to reach and the actions those customers need to take. For a Houston floral company, that starts with your arrangements, your service area, and your process for accepting orders or booking events.',
      },
      {
        type: 'paragraph',
        text: 'Ready to discuss your florist website? Contact Web Marketing Solutions with your current website, the floral services you want to grow, and the part of ordering or inquiries that creates the most extra work. Let’s plan a website that makes your work easy to explore and your business easy to contact.',
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
