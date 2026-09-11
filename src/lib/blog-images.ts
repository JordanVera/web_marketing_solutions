/* ---------------------------------------------------------------------------
   Curated stock images for blog posts.
   All entries use Unsplash (free license) — already allowed in next.config.ts.
   Swap photoPath after searching: https://unsplash.com/s/photos/{query}
   --------------------------------------------------------------------------- */

export type BlogImageCredit = {
  photographer: string;
  /** Photographer profile, e.g. https://unsplash.com/@handle */
  profileUrl: string;
  /** Link to the photo page for attribution */
  photoUrl: string;
};

export type BlogImage = {
  /** Stable key — reference from blog.ts */
  id: string;
  /** Unsplash path segment, e.g. photo-1530080862112-274ed9315894 */
  photoPath: string;
  defaultAlt: string;
  credit: BlogImageCredit;
  /** Search terms that surfaced this image — reuse for future posts */
  tags: string[];
};

/** Build an optimized Unsplash CDN URL from a photo path segment. */
export function unsplashImage(
  photoPath: string,
  width: 1600 | 1200 | 800 = 1600,
) {
  return `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=${width}&q=80`;
}

export function blogImageSrc(
  entry: BlogImage,
  width: 1600 | 1200 | 800 = 1600,
) {
  return unsplashImage(entry.photoPath, width);
}

/** Optional caption suffix with photographer credit. */
export function blogImageCreditLine(entry: BlogImage) {
  return `Photo: ${entry.credit.photographer} / Unsplash`;
}

/**
 * Catalog of vetted images. When adding a post, pick by tag or add a new entry
 * here so credits and URLs stay in one place.
 */
export const blogImageCatalog = {
  houstonSkylineDusk: {
    id: 'houstonSkylineDusk',
    photoPath: 'photo-1530080862112-274ed9315894',
    defaultAlt:
      'Downtown Houston Texas skyline at dusk — website development for Houston businesses',
    credit: {
      photographer: 'Houston skyline contributors',
      profileUrl: 'https://unsplash.com/s/photos/houston-skyline',
      photoUrl: 'https://unsplash.com/photos/274ed9315894',
    },
    tags: ['houston', 'skyline', 'local', 'hero', 'texas'],
  },

  houstonSkylineDay: {
    id: 'houstonSkylineDay',
    photoPath: 'photo-1746311528667-1038fe0c8c46',
    defaultAlt:
      'Houston Texas downtown skyline on a clear day — Houston digital agency blog',
    credit: {
      photographer: 'Unsplash',
      profileUrl: 'https://unsplash.com/s/photos/downtown-houston',
      photoUrl: 'https://unsplash.com/photos/9fKKJowOJDM',
    },
    tags: ['houston', 'skyline', 'local', 'hero', 'daytime'],
  },

  wordpressLogo: {
    id: 'wordpressLogo',
    photoPath: 'photo-1705904506592-d8a0d5392c66',
    defaultAlt:
      'WordPress logo — CMS option for Houston small business websites',
    credit: {
      photographer: 'Unsplash',
      profileUrl: 'https://unsplash.com/s/photos/wordpress',
      photoUrl: 'https://unsplash.com/photos/C0I2xzpVJN0',
    },
    tags: ['wordpress', 'cms', 'platform', 'blog'],
  },

  wordpressDashboard: {
    id: 'wordpressDashboard',
    photoPath: 'photo-1560472355-109703aa3edc',
    defaultAlt:
      'Computer monitor showing a website dashboard — WordPress content management',
    credit: {
      photographer: 'Carlos Muza',
      profileUrl: 'https://unsplash.com/@kmuza',
      photoUrl: 'https://unsplash.com/photos/zs98a0DtKL4',
    },
    tags: ['wordpress', 'cms', 'dashboard', 'analytics', 'admin'],
  },

  reactCodeEditor: {
    id: 'reactCodeEditor',
    photoPath: 'photo-1633356122544-f134324a6cee',
    defaultAlt:
      'React JavaScript code on a laptop screen — custom Next.js web development',
    credit: {
      photographer: 'AltumCode',
      profileUrl: 'https://unsplash.com/@altumcode',
      photoUrl: 'https://unsplash.com/photos/f134324a6cee',
    },
    tags: ['react', 'nextjs', 'javascript', 'coding', 'development'],
  },

  developerLaptop: {
    id: 'developerLaptop',
    photoPath: 'photo-1498050108023-c5249f4df085',
    defaultAlt:
      'Developer workspace with laptop showing code — Houston custom website development',
    credit: {
      photographer: 'Christina @ wocintechchat.com',
      profileUrl: 'https://unsplash.com/@wocintechchat',
      photoUrl: 'https://unsplash.com/photos/c5249f4df085',
    },
    tags: ['coding', 'developer', 'laptop', 'nextjs', 'web-development'],
  },

  pairProgramming: {
    id: 'pairProgramming',
    photoPath: 'photo-1555066931-4365d14bab8c',
    defaultAlt:
      'Developer writing code at a desk — custom web application development',
    credit: {
      photographer: 'AltumCode',
      profileUrl: 'https://unsplash.com/@altumcode',
      photoUrl: 'https://unsplash.com/photos/4365d14bab8c',
    },
    tags: ['coding', 'developer', 'nextjs', 'agency', 'build'],
  },

  seoAnalytics: {
    id: 'seoAnalytics',
    photoPath: 'photo-1551288049-bebda4e38f71',
    defaultAlt:
      'Analytics dashboard on a laptop — SEO campaign performance tracking for Houston businesses',
    credit: {
      photographer: 'Luke Chesser',
      profileUrl: 'https://unsplash.com/@lukechesser',
      photoUrl: 'https://unsplash.com/photos/bebda4e38f71',
    },
    tags: ['seo', 'analytics', 'dashboard', 'metrics', 'search-console'],
  },

  teamStrategy: {
    id: 'teamStrategy',
    photoPath: 'photo-1552664730-d307ca884978',
    defaultAlt:
      'Business team reviewing a project plan — Houston digital agency consultation',
    credit: {
      photographer: 'Jason Goodman',
      profileUrl: 'https://unsplash.com/@jasongoodman_youxventures',
      photoUrl: 'https://unsplash.com/photos/d307ca884978',
    },
    tags: ['strategy', 'consultation', 'team', 'planning', 'agency'],
  },

  contentEditor: {
    id: 'contentEditor',
    photoPath: 'flagged/photo-1579888798036-3b823ff1a2f5',
    defaultAlt:
      'Person editing content on a laptop — WordPress publishing workflow',
    credit: {
      photographer: 'Green Chameleon',
      profileUrl: 'https://unsplash.com/@greenchameleon',
      photoUrl: 'https://unsplash.com/photos/MINfsRivuyg',
    },
    tags: ['wordpress', 'content', 'editor', 'cms', 'publishing'],
  },
} satisfies Record<string, BlogImage>;

export type BlogImageKey = keyof typeof blogImageCatalog;

/**
 * Suggested Unsplash search queries by blog topic — use when drafting new posts.
 * Open any URL, pick a photo, copy the photo-… segment into blogImageCatalog.
 */
export const blogImageSearchGuide = {
  houstonLocal: [
    'https://unsplash.com/s/photos/houston-skyline',
    'https://unsplash.com/s/photos/downtown-houston',
    'https://unsplash.com/s/photos/houston-texas',
  ],
  webDevelopment: [
    'https://unsplash.com/s/photos/web-development',
    'https://unsplash.com/s/photos/react',
    'https://unsplash.com/s/photos/javascript-code',
  ],
  wordpress: [
    'https://unsplash.com/s/photos/wordpress',
    'https://unsplash.com/s/photos/cms',
    'https://unsplash.com/s/photos/content-management',
  ],
  seo: [
    'https://unsplash.com/s/photos/seo',
    'https://unsplash.com/s/photos/analytics-dashboard',
    'https://unsplash.com/s/photos/google-search',
  ],
  business: [
    'https://unsplash.com/s/photos/business-meeting',
    'https://unsplash.com/s/photos/startup-team',
    'https://unsplash.com/s/photos/consultation',
  ],
} as const;
