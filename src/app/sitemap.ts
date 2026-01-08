import type { MetadataRoute } from 'next'
import { AGENTS } from '@/fixtures'
import { SEO_CONFIG } from '@/lib/seo-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Static pages (only indexable, non-redirect pages)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SEO_CONFIG.baseUrl}/trading`,
      lastModified,
      changeFrequency: 'hourly',
      priority: 1.0, // Main entry point
    },
    {
      url: `${SEO_CONFIG.baseUrl}/trading/portfolio`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ]

  // Dynamic trading pages from unified AGENTS fixture
  const tradingPages: MetadataRoute.Sitemap = AGENTS.map((agent) => ({
    url: `${SEO_CONFIG.baseUrl}/trading/${agent.ticker.toLowerCase()}`,
    lastModified,
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...tradingPages]
}
