import type { Metadata } from "next"
import TradingPageClient from "./trading-page-client"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: 'Trading - AI Agent Marketplace',
  description: 'Discover and trade AI agents on Solana. Browse trending agents, track market performance, and swap tokens in real-time on the Sedona AI agent marketplace.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/trading`,
  },
  openGraph: {
    title: 'Trading - AI Agent Marketplace | Sedona',
    description: 'Discover and trade AI agents on Solana. Browse trending agents, track market performance, and swap tokens in real-time.',
    url: `${SEO_CONFIG.baseUrl}/trading`,
    siteName: SEO_CONFIG.siteName,
    images: [SEO_CONFIG.defaultImage],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trading - AI Agent Marketplace | Sedona',
    description: 'Discover and trade AI agents on Solana. Browse trending agents and swap tokens in real-time.',
    images: [SEO_CONFIG.defaultImage],
  },
}

export default function TradingPage() {
  return <TradingPageClient />
}
