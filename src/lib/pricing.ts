import type { ServiceSlug } from './services';

export type PricingPeriod =
  | 'one-time'
  | 'monthly'
  | 'starting-at'
  | 'custom';

export type PricingBadge =
  | 'most-popular'
  | 'popular'
  | 'best-value'
  | 'advanced'
  | 'mvp';

export type PricingPackage = {
  id: string;
  name: string;
  /** Numeric price in USD. Null for custom/quote-based packages. */
  price: number | null;
  period: PricingPeriod;
  features: string[];
  badge?: PricingBadge;
  highlighted?: boolean;
  serviceSlug: ServiceSlug;
};

export type PricingCategory = {
  id: string;
  label: string;
  serviceSlug: ServiceSlug;
  packages: PricingPackage[];
};

export const pricingHub = {
  metaTitle: 'Pricing | Web Development & SEO Packages',
  metaDescription:
    'Transparent pricing for Houston website development, web apps, native apps, and SEO campaigns. Choose a starting package or request a custom quote.',
  h1: 'Simple pricing.',
  h1Accent: 'Real results.',
  lede: 'Choose the package that fits your next move. Every plan can be adjusted around your business goals, timeline, and growth needs.',
  trustSignals: [
    'No hidden fees',
    'Dedicated support',
    'Revision rounds included',
    'Proven track record',
  ],
} as const;

const BADGE_LABELS: Record<PricingBadge, string> = {
  'most-popular': 'Most Popular',
  popular: 'Popular',
  'best-value': 'Best Value',
  advanced: 'Advanced',
  mvp: 'MVP',
};

export function getBadgeLabel(badge: PricingBadge) {
  return BADGE_LABELS[badge];
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export function getPeriodLabel(period: PricingPeriod) {
  switch (period) {
    case 'one-time':
      return 'One Time';
    case 'monthly':
      return 'Monthly';
    case 'starting-at':
      return 'Starting At';
    case 'custom':
      return 'Quote Based';
  }
}

export const pricingCategories: PricingCategory[] = [
  {
    id: 'website-development',
    label: 'Websites',
    serviceSlug: 'website-development',
    packages: [
      {
        id: 'site-starter',
        name: 'Starter Website',
        price: 1299,
        period: 'one-time',
        serviceSlug: 'website-development',
        features: [
          '5-page custom website',
          'Mobile-responsive layout',
          'Contact & inquiry forms',
          'Basic SEO setup',
          'Cross-browser compatible',
          'Performance-optimized build',
        ],
      },
      {
        id: 'site-business',
        name: 'Business Website',
        price: 2199,
        period: 'one-time',
        serviceSlug: 'website-development',
        badge: 'most-popular',
        highlighted: true,
        features: [
          '10-page custom website',
          'CMS integration',
          'Conversion-focused UX',
          'Mobile-responsive design',
          'On-page SEO setup',
          'Analytics & tracking setup',
        ],
      },
      {
        id: 'site-enterprise',
        name: 'Enterprise Website',
        price: 3299,
        period: 'one-time',
        serviceSlug: 'website-development',
        features: [
          'Unlimited pages',
          'Advanced CMS setup',
          'Conversion-focused UX',
          'Technical SEO foundation',
          'Analytics & reporting setup',
          'Complete deployment support',
        ],
      },
    ],
  },
  {
    id: 'web-app-development',
    label: 'Web Apps',
    serviceSlug: 'web-app-development',
    packages: [
      {
        id: 'webapp-starter',
        name: 'Platform Starter',
        price: 2799,
        period: 'starting-at',
        serviceSlug: 'web-app-development',
        features: [
          'Custom UI screens',
          'User login system',
          'Admin dashboard',
          'Database architecture',
          'Responsive web application',
          'Core workflow development',
        ],
      },
      {
        id: 'webapp-business',
        name: 'Business Platform',
        price: 5499,
        period: 'starting-at',
        serviceSlug: 'web-app-development',
        badge: 'popular',
        highlighted: true,
        features: [
          'Custom web application',
          'Role-based user accounts',
          'Admin & client panels',
          'API integrations',
          'Reporting dashboard',
          'QA testing & deployment support',
        ],
      },
    ],
  },
  {
    id: 'native-app-development',
    label: 'Native Apps',
    serviceSlug: 'native-app-development',
    packages: [
      {
        id: 'native-prototype',
        name: 'App Prototype',
        price: 2199,
        period: 'starting-at',
        serviceSlug: 'native-app-development',
        features: [
          'App UX wireframes',
          'Clickable prototype',
          'Core screen design',
          'User flow mapping',
          'Technical scope document',
          'Launch estimate',
        ],
      },
      {
        id: 'native-mvp',
        name: 'MVP Mobile App',
        price: 7499,
        period: 'starting-at',
        serviceSlug: 'native-app-development',
        badge: 'mvp',
        highlighted: true,
        features: [
          'iOS & Android planning',
          'Core app screens',
          'User authentication',
          'API-ready architecture',
          'Admin support panel',
          'Testing & deployment guidance',
        ],
      },
    ],
  },
  {
    id: 'seo-campaigns',
    label: 'SEO',
    serviceSlug: 'seo-campaigns',
    packages: [
      {
        id: 'seo-starter',
        name: 'SEO Starter',
        price: 449,
        period: 'monthly',
        serviceSlug: 'seo-campaigns',
        features: [
          'Technical website audit',
          'Keyword research',
          'On-page SEO setup',
          'Google Business Profile review',
          'Monthly performance report',
          '90-day action plan',
        ],
      },
      {
        id: 'seo-growth',
        name: 'SEO Growth',
        price: 1099,
        period: 'monthly',
        serviceSlug: 'seo-campaigns',
        badge: 'popular',
        highlighted: true,
        features: [
          'SEO content plan',
          'Landing page recommendations',
          'Conversion tracking setup',
          'Google Business Profile growth',
          'Monthly reporting',
          'Campaign optimization',
        ],
      },
      {
        id: 'seo-enterprise',
        name: 'Growth Marketing',
        price: 1499,
        period: 'monthly',
        serviceSlug: 'seo-campaigns',
        badge: 'best-value',
        features: [
          'Full-funnel SEO strategy',
          'Content & link building plan',
          'Competitor monitoring',
          'Local & national targeting',
          'Weekly optimization',
          'Executive performance reporting',
        ],
      },
    ],
  },
];

export const customProjectPackage: PricingPackage = {
  id: 'custom-project',
  name: 'Custom Project',
  price: null,
  period: 'custom',
  serviceSlug: 'website-development',
  features: [
    'Discovery call',
    'Scope definition',
    'Technical recommendation',
    'Timeline estimate',
    'Clear proposal',
    'Flexible delivery options',
  ],
};

export function getPackagesByServiceSlug(slug: ServiceSlug) {
  const category = pricingCategories.find((item) => item.serviceSlug === slug);
  return category?.packages ?? [];
}

export function getAllPackages() {
  return pricingCategories.flatMap((category) => category.packages);
}
