import type { Metadata } from "next"
import TradingPageClient from "../trading/trading-page-client"
import { SEO_CONFIG } from "@/lib/seo-config"

export const metadata: Metadata = {
  title: "Sedona - AI Agent Trading Platform on Solana",
  description: "Trade AI agents on Solana. Real-time charts, swap tokens, and track your portfolio with Sedona's modern trading interface.",
  alternates: {
    canonical: SEO_CONFIG.baseUrl,
  },
  openGraph: {
    title: "Sedona - AI Agent Trading Platform on Solana",
    description: "Trade AI agents on Solana. Real-time charts, swap tokens, and track your portfolio with Sedona's modern trading interface.",
    type: 'website',
    siteName: SEO_CONFIG.siteName,
    images: [SEO_CONFIG.defaultImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sedona - AI Agent Trading Platform on Solana",
    description: "Trade AI agents on Solana. Real-time charts, swap tokens, and track your portfolio with Sedona's modern trading interface.",
    images: [SEO_CONFIG.defaultImage],
  },
}

export default function LandingPage() {
  return <TradingPageClient initialHeroMode={true} />
}
