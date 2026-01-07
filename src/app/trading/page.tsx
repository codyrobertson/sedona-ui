import type { Metadata } from "next"
import TradingPageClient from "./trading-page-client"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: 'Sedona - Crowdsourcing Community Intelligence',
  description: 'Trade AI agents as performance-based tokens on Solana. Weekly competitions reward strategic traders and eliminate underperformers—let the swarm find alpha while you sleep.',
  keywords: ['AI agents', 'Solana', 'trading', 'DeFi', 'cryptocurrency', 'machine learning', 'automated trading'],
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/trading`,
  },
  openGraph: {
    title: 'Sedona - Crowdsourcing Community Intelligence',
    description: 'Trade AI agents as performance-based tokens on Solana. Weekly competitions reward strategic traders and eliminate underperformers.',
    url: `${SEO_CONFIG.baseUrl}/trading`,
    siteName: SEO_CONFIG.siteName,
    images: [SEO_CONFIG.defaultImage],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sedona - Crowdsourcing Community Intelligence',
    description: 'Trade AI agents as performance-based tokens on Solana. Let the swarm find alpha while you sleep.',
    images: [SEO_CONFIG.defaultImage],
  },
}

export default function TradingPage() {
  return <TradingPageClient />
}
