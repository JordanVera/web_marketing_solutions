import type { MetadataRoute } from "next";
import { servicePages, servicePath } from "@/lib/services";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const serviceRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages.map((service) => ({
      url: `${SITE_URL}${servicePath(service.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    ...serviceRoutes,
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
