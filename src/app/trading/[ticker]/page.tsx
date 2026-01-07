import type { Metadata } from "next"
import { AGENTS, getAgentOrDefault, formatMarketCap, formatPrice } from "@/fixtures"
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
  const agent = getAgentOrDefault(tickerLower)

  const title = `$${tickerUpper} - ${agent.name} | Trade on Sedona`
  const description = agent.description
    ? `${agent.description.slice(0, 120)}... Trade $${tickerUpper} on Sedona - the AI agent trading platform on Solana.`
    : `Trade $${tickerUpper} AI agent on Sedona. Current price: ${formatPrice(agent.price_usd ?? 0)}. View real-time charts and swap tokens instantly.`

  const ogImageUrl = `${SEO_CONFIG.baseUrl}/api/og?ticker=${tickerLower}`

  return {
    title,
    description,
    keywords: [
      agent.name,
      tickerUpper,
      'AI agent',
      'trading',
      'Solana',
      'DeFi',
      'token',
      'Sedona',
    ],
    alternates: {
      canonical: `${SEO_CONFIG.baseUrl}/trading/${tickerLower}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: SEO_CONFIG.siteName,
      url: `${SEO_CONFIG.baseUrl}/trading/${tickerLower}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `$${tickerUpper} - ${agent.name} on Sedona`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function AgentDetailPage({ params }: Props) {
  const { ticker } = await params
  const normalizedTicker = ticker?.toLowerCase() || "test"
  const tickerUpper = ticker.toUpperCase()
  const agent = getAgentOrDefault(normalizedTicker)
  const agentUrl = `${SEO_CONFIG.baseUrl}/trading/${normalizedTicker}`
  const ogImageUrl = `${SEO_CONFIG.baseUrl}/api/og?ticker=${normalizedTicker}`

  // Product schema for the AI agent/token
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `$${tickerUpper} - ${agent.name}`,
    description: agent.description,
    image: ogImageUrl,
    sku: agent.ticker,
    brand: {
      "@type": "Brand",
      name: "Sedona",
      logo: `${SEO_CONFIG.baseUrl}/icon.svg`,
    },
    offers: {
      "@type": "Offer",
      price: agent.price_usd ?? 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: agentUrl,
      priceValidUntil: new Date(Date.now() + 3600000).toISOString(), // 1 hour validity
    },
    category: "AI Trading Agent",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Ticker Symbol",
        value: tickerUpper,
      },
      {
        "@type": "PropertyValue",
        name: "Market Cap",
        value: formatMarketCap(agent.market_cap_usd_latest),
      },
      {
        "@type": "PropertyValue",
        name: "24h Price Change",
        value: `${agent.price_change_percent_in_24_hours >= 0 ? '+' : ''}${agent.price_change_percent_in_24_hours.toFixed(2)}%`,
      },
      {
        "@type": "PropertyValue",
        name: "24h Volume",
        value: formatMarketCap(agent.volume_24h_usd ?? 0),
      },
      {
        "@type": "PropertyValue",
        name: "Blockchain",
        value: "Solana",
      },
      {
        "@type": "PropertyValue",
        name: "HuggingFace Model",
        value: agent.agent_url,
      },
    ],
  }

  // Breadcrumb schema for navigation
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
        name: `$${tickerUpper}`,
        item: agentUrl,
      },
    ],
  }

  // FAQPage schema with common questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is $${tickerUpper}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: agent.description || `$${tickerUpper} (${agent.name}) is an AI agent token tradeable on the Sedona platform on Solana.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I trade $${tickerUpper}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can trade $${tickerUpper} on Sedona by connecting your Solana wallet and using the swap interface. View real-time charts and execute trades instantly.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the current price of $${tickerUpper}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The current price of $${tickerUpper} is ${formatPrice(agent.price_usd ?? 0)} with a 24h change of ${agent.price_change_percent_in_24_hours >= 0 ? '+' : ''}${agent.price_change_percent_in_24_hours.toFixed(2)}%.`,
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <AgentDetailClient ticker={ticker} />
    </>
  )
}
