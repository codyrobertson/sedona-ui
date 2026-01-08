import type { Metadata } from "next"
import PortfolioClient from "./portfolio-client"
import { JsonLd } from "@/components/seo"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: 'Portfolio - Track Your Holdings',
  description: 'Track your AI agent portfolio on Sedona. Monitor holdings, view performance metrics, and analyze your trading history on Solana.',
  keywords: ['portfolio', 'holdings', 'AI agents', 'trading', 'Solana', 'performance'],
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/trading/portfolio`,
  },
  openGraph: {
    title: 'Portfolio - Track Your Holdings | Sedona',
    description: 'Track your AI agent portfolio on Sedona. Monitor holdings, view performance metrics, and analyze your trading history.',
    url: `${SEO_CONFIG.baseUrl}/trading/portfolio`,
    siteName: SEO_CONFIG.siteName,
    locale: SEO_CONFIG.locale,
    images: [SEO_CONFIG.defaultImage],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: SEO_CONFIG.twitter.site,
    title: 'Portfolio - Track Your Holdings | Sedona',
    description: 'Track your AI agent portfolio on Sedona. Monitor holdings and view performance metrics.',
    images: [SEO_CONFIG.defaultImage],
  },
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
    {
      "@type": "ListItem",
      position: 3,
      name: "Portfolio",
      item: `${SEO_CONFIG.baseUrl}/trading/portfolio`,
    },
  ],
}

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <PortfolioClient />
    </>
  )
}
