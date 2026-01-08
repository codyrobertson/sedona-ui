import type { Metadata } from "next"
import TradingPageClient from "./trading-page-client"
import { JsonLd } from "@/components/seo"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: 'Sedona - Crowdsourcing Community Intelligence',
  description: 'Trade AI agents as performance-based tokens on Solana. Weekly competitions reward strategic traders and eliminate underperformers—let the swarm find alpha while you sleep.',
  keywords: ['AI agents', 'Solana', 'trading', 'DeFi', 'cryptocurrency', 'machine learning', 'automated trading', 'token swap'],
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/trading`,
  },
  openGraph: {
    title: 'Sedona - Crowdsourcing Community Intelligence',
    description: 'Trade AI agents as performance-based tokens on Solana. Weekly competitions reward strategic traders and eliminate underperformers.',
    url: `${SEO_CONFIG.baseUrl}/trading`,
    siteName: SEO_CONFIG.siteName,
    locale: SEO_CONFIG.locale,
    images: [SEO_CONFIG.defaultImage],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: SEO_CONFIG.twitter.site,
    creator: SEO_CONFIG.twitter.creator,
    title: 'Sedona - Crowdsourcing Community Intelligence',
    description: 'Trade AI agents as performance-based tokens on Solana. Let the swarm find alpha while you sleep.',
    images: [SEO_CONFIG.defaultImage],
  },
}

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI Trading Agents",
  description: "Browse and trade AI agents on Sedona",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: 50,
  url: `${SEO_CONFIG.baseUrl}/trading`,
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Sedona",
      item: SEO_CONFIG.baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Trading",
      item: `${SEO_CONFIG.baseUrl}/trading`,
    },
  ],
}

export default function TradingPage() {
  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema} />
      <TradingPageClient />
    </>
  )
}
