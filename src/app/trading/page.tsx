import type { Metadata } from "next"
import TradingPageClient from "./trading-page-client"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: 'Trading - AI Agent Marketplace',
  description: 'Discover and trade AI agents on Solana. Browse trending agents, track market performance, and swap tokens in real-time on the Sedona AI agent marketplace.',
  alternates: {
    canonical: `${SEO_CONFIG.baseUrl}/trading`,
  },
}

export default function TradingPage() {
  return <TradingPageClient />
}
