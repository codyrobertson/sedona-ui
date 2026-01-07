import type { Metadata } from "next"
import PortfolioClient from "./portfolio-client"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: 'Portfolio - Track Your Holdings',
  description: 'Track your AI agent portfolio on Sedona. Monitor holdings, view performance metrics, and analyze your trading history on Solana.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/trading/portfolio`,
  },
  openGraph: {
    title: 'Portfolio - Track Your Holdings | Sedona',
    description: 'Track your AI agent portfolio on Sedona. Monitor holdings, view performance metrics, and analyze your trading history.',
    url: `${SEO_CONFIG.baseUrl}/trading/portfolio`,
    siteName: SEO_CONFIG.siteName,
    images: [SEO_CONFIG.defaultImage],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Track Your Holdings | Sedona',
    description: 'Track your AI agent portfolio on Sedona. Monitor holdings and view performance metrics.',
    images: [SEO_CONFIG.defaultImage],
  },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
