import type { Metadata } from "next"
import { AGENT_DETAILS, getAgentOrDefault } from "@/fixtures"
import { JsonLd } from "@/components/seo"
import AgentDetailClient from "./agent-detail-client"
import { SEO_CONFIG } from "@/lib/seo-config"

type Props = {
  params: Promise<{ ticker: string }>
}

export async function generateStaticParams() {
  return Object.keys(AGENT_DETAILS).map((ticker) => ({
    ticker,
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

  // Parse price string to get numeric value (e.g., "$0.0074" -> 0.0074)
  const priceValue = parseFloat(agent.price.replace(/[^0-9.]/g, ""))

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
      price: priceValue,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SEO_CONFIG.baseUrl}/trading/${agent.ticker.toLowerCase()}`,
    },
    category: "AI Trading Agent",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Market Cap",
        value: agent.marketCap,
      },
      {
        "@type": "PropertyValue",
        name: "24h Volume",
        value: agent.volume24h,
      },
      {
        "@type": "PropertyValue",
        name: "Model Types",
        value: agent.modelTypes.join(", "),
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
