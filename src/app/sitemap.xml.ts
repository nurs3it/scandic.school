import { MetadataRoute } from "next";
import { fetchNewsList } from "@/lib/news-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://scandic.school";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/application`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    const list = await fetchNewsList({ page: 1, pageSize: 100 });
    newsEntries = list.items.map((n) => ({
      url: `${baseUrl}/news/${n.slug}`,
      lastModified: new Date(n.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // If the backend is unreachable during build, skip dynamic entries.
  }

  return [...staticRoutes, ...newsEntries];
}
