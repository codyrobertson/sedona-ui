import type { MetadataRoute } from 'next'
import { AGENT_DETAILS } from '@/fixtures'
import { SEO_CONFIG } from '@/lib/seo-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Static pages (only indexable pages)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SEO_CONFIG.baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SEO_CONFIG.baseUrl}/trading`,
      lastModified,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${SEO_CONFIG.baseUrl}/trading/portfolio`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Dynamic trading pages from AGENT_DETAILS fixture
  const agentTickers = Object.keys(AGENT_DETAILS)
  const tradingPages: MetadataRoute.Sitemap = agentTickers.map((ticker) => ({
    url: `${SEO_CONFIG.baseUrl}/trading/${ticker}`,
    lastModified,
    changeFrequency: 'hourly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...tradingPages]
}
