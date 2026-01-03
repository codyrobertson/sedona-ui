"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  Header,
  PlatformStats,
  PriceChart,
  SwapWidget,
  YourTokens,
  AgentStats,
  AboutAgent,
} from "@/components/trading"

// Dummy agent data
const AGENT_DATA: Record<string, {
  name: string
  ticker: string
  description: string
  marketCap: string
  change1h: number
  change24h: number
  huggingFaceUrl?: string
}> = {
  test: {
    name: "Test Agent",
    ticker: "TEST",
    description: "This is a silly test",
    marketCap: "$7.4K",
    change1h: 0.0,
    change24h: 0.0,
    huggingFaceUrl: "https://huggingface.co/test-agent",
  },
  alpha: {
    name: "Alpha Bot",
    ticker: "ALPHA",
    description: "High-performance trading agent with ML predictions",
    marketCap: "$45.2K",
    change1h: 2.3,
    change24h: 12.5,
    huggingFaceUrl: "https://huggingface.co/alpha-bot",
  },
  sigma: {
    name: "Sigma AI",
    ticker: "SIGMA",
    description: "Advanced sentiment analysis and market timing",
    marketCap: "$28.9K",
    change1h: -0.8,
    change24h: -3.2,
    huggingFaceUrl: "https://huggingface.co/sigma-ai",
  },
}

export default function AgentDetailPage() {
  const params = useParams()
  const ticker = (params.ticker as string)?.toLowerCase() || "test"
  const [timeframe, setTimeframe] = React.useState("1m")

  const agent = AGENT_DATA[ticker] || AGENT_DATA.test

  return (
    <div className="min-h-screen bg-zeus-surface-default">
      {/* Header */}
      <Header
        onDocs={() => console.log("Docs clicked")}
        onCreateCoin={() => console.log("Create Coin clicked")}
        onConnect={() => console.log("Connect clicked")}
      />

      {/* Platform Stats */}
      <PlatformStats endsIn="0m 0s" jackpot="$201" tokens={1} />

      {/* Main Content */}
      <div className="flex gap-6 p-6">
        {/* Left Column - Chart and About */}
        <div className="flex-1 space-y-4">
          <PriceChart
            ticker={agent.ticker}
            activeTimeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />

          <AboutAgent
            name={agent.name}
            description={agent.description}
            huggingFaceUrl={agent.huggingFaceUrl}
          />
        </div>

        {/* Right Column - Swap and Stats */}
        <div className="w-[320px] space-y-4">
          <SwapWidget
            ticker={agent.ticker}
            isActive={false}
            fee="0.5%"
            onBuy={(amount) => console.log("Buy:", amount)}
            onSell={(amount) => console.log("Sell:", amount)}
            onSetMaxSlippage={() => console.log("Set max slippage")}
          />

          <YourTokens isConnected={false} />

          <AgentStats
            marketCap={agent.marketCap}
            change1h={agent.change1h}
            change24h={agent.change24h}
          />
        </div>
      </div>
    </div>
  )
}
