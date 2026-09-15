import type { MetadataRoute } from 'next';
import { blogPath, getSortedBlogPosts } from '@/lib/blog';
import { servicePages, servicePath } from '@/lib/services';
import { SITE_URL } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const serviceRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...servicePages.map((service) => ({
      url: `${SITE_URL}${servicePath(service.slug)}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  return [
    { url: SITE_URL, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...serviceRoutes,
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...getSortedBlogPosts().map((post) => ({
      url: `${SITE_URL}${blogPath(post.slug)}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
