import type { Metadata } from "next"
import { AGENTS, getAgentOrDefault, formatMarketCap } from "@/fixtures"
import { JsonLd } from "@/components/seo"
import AgentDetailClient from "./agent-detail-client"
import { SEO_CONFIG } from "@/lib/seo-config"

type Props = {
  params: Promise<{ ticker: string }>
}

export async function generateStaticParams() {
  return AGENTS.map((agent) => ({
    ticker: agent.ticker.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ticker } = await params
  const tickerUpper = ticker.toUpperCase()
  const tickerLower = ticker.toLowerCase()

  return {
    title: `$${tickerUpper} - Trade on Sedona`,
    description: `Trade $${tickerUpper} AI agent on Sedona. View real-time charts, price history, and swap tokens instantly on Solana.`,
    alternates: {
      canonical: `${SEO_CONFIG.baseUrl}/trading/${tickerLower}`,
    },
    openGraph: {
      title: `$${tickerUpper} - Trade on Sedona`,
      description: `Trade $${tickerUpper} AI agent on Sedona. View real-time charts, price history, and swap tokens instantly on Solana.`,
      type: 'website',
    },
  }
}

export default async function AgentDetailPage({ params }: Props) {
  const { ticker } = await params
  const normalizedTicker = ticker?.toLowerCase() || "test"
  const agent = getAgentOrDefault(normalizedTicker)

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: agent.name,
    description: agent.description,
    sku: agent.ticker,
    brand: {
      "@type": "Brand",
      name: "Sedona",
    },
    offers: {
      "@type": "Offer",
      price: agent.price_usd ?? 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SEO_CONFIG.baseUrl}/trading/${agent.ticker.toLowerCase()}`,
    },
    category: "AI Trading Agent",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Market Cap",
        value: formatMarketCap(agent.market_cap_usd_latest),
      },
      {
        "@type": "PropertyValue",
        name: "24h Volume",
        value: formatMarketCap(agent.volume_24h_usd ?? 0),
      },
      {
        "@type": "PropertyValue",
        name: "HuggingFace Model",
        value: agent.agent_url,
      },
    ],
  }

  return (
    <>
      <JsonLd data={productSchema} />
      <AgentDetailClient ticker={ticker} />
    </>
  )
}
