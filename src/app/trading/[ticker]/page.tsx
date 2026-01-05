"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  Header,
  PlatformStats,
  PriceChart,
  TokenSwapCard,
  TransactionsTable,
} from "@/components/trading"
// Static recent trades data (avoids hydration mismatch from Math.random)
const RECENT_TRADES = [
  { type: "buy" as const, amount: "$1,250", price: "$0.0074", time: "2s ago" },
  { type: "buy" as const, amount: "$840", price: "$0.0073", time: "5s ago" },
  { type: "sell" as const, amount: "$320", price: "$0.0076", time: "8s ago" },
  { type: "buy" as const, amount: "$2,100", price: "$0.0072", time: "12s ago" },
  { type: "buy" as const, amount: "$450", price: "$0.0071", time: "18s ago" },
  { type: "sell" as const, amount: "$180", price: "$0.0075", time: "25s ago" },
  { type: "buy" as const, amount: "$3,500", price: "$0.0070", time: "32s ago" },
  { type: "buy" as const, amount: "$920", price: "$0.0069", time: "45s ago" },
  { type: "sell" as const, amount: "$275", price: "$0.0074", time: "1m ago" },
  { type: "buy" as const, amount: "$1,800", price: "$0.0068", time: "1m ago" },
  { type: "buy" as const, amount: "$560", price: "$0.0067", time: "2m ago" },
  { type: "sell" as const, amount: "$425", price: "$0.0072", time: "2m ago" },
  { type: "buy" as const, amount: "$2,750", price: "$0.0066", time: "3m ago" },
  { type: "buy" as const, amount: "$680", price: "$0.0065", time: "4m ago" },
  { type: "sell" as const, amount: "$150", price: "$0.0071", time: "5m ago" },
]

// Dummy agent data
const AGENT_DATA: Record<string, {
  name: string
  ticker: string
  price: string
  priceChange: "up" | "down"
  description: string
  huggingFaceUrl?: string
  tokenAddress: string
  creatorAddress: string
  totalSupply: string
  createdAt: string
  modelTypes: string[]
  marketCap: string
  volume24h: string
  tvl: string
  change1h: number
  change24h: number
  change7d: number
  change30d: number
}> = {
  test: {
    name: "Test Agent",
    ticker: "TEST",
    price: "$0.0074",
    priceChange: "up",
    description: "An experimental trading agent using transformer architecture for market prediction and automated position management.",
    huggingFaceUrl: "https://huggingface.co/test-agent",
    tokenAddress: "3979797df6672c6d19a2d56fc9d941e86da4f8c2a9b7e3",
    creatorAddress: "8xK2Df6672c6d19a2d56fc9d941e86da4f8c2a9b7e3f1",
    totalSupply: "1,000,000",
    createdAt: "Dec 15, 2024",
    modelTypes: ["Transformer", "Trading"],
    marketCap: "$7.4K",
    volume24h: "$1.2K",
    tvl: "$500",
    change1h: 2.3,
    change24h: 5.4,
    change7d: 12.8,
    change30d: 45.2,
  },
  alpha: {
    name: "Alpha Bot",
    ticker: "ALPHA",
    price: "$0.0452",
    priceChange: "up",
    description: "High-frequency momentum trading bot leveraging LSTM networks to identify alpha opportunities in volatile markets.",
    huggingFaceUrl: "https://huggingface.co/alpha-bot",
    tokenAddress: "5xF3897df6672c6d19a2d56fc9d941e86da4f8c2a9b7e3",
    creatorAddress: "9yL4Ef7783d7e20b3e67gd0b052f97eb5g9d3b8f4h2",
    totalSupply: "10,000,000",
    createdAt: "Nov 28, 2024",
    modelTypes: ["LSTM", "Momentum", "ML"],
    marketCap: "$45.2K",
    volume24h: "$8.5K",
    tvl: "$12.3K",
    change1h: 2.3,
    change24h: 12.5,
    change7d: 34.2,
    change30d: 156.8,
  },
  sigma: {
    name: "Sigma AI",
    ticker: "SIGMA",
    price: "$0.0289",
    priceChange: "down",
    description: "NLP-powered sentiment analysis agent that monitors social signals to predict market movements and trader behavior.",
    huggingFaceUrl: "https://huggingface.co/sigma-ai",
    tokenAddress: "7zA5908ef7783d7e20b3e67gd0b052f97eb5g9d3b8f4",
    creatorAddress: "2bM6Fg8894e8f31c4f78he1c163g08fc6h0e4c9g5i3",
    totalSupply: "5,000,000",
    createdAt: "Dec 1, 2024",
    modelTypes: ["NLP", "Sentiment"],
    marketCap: "$28.9K",
    volume24h: "$3.2K",
    tvl: "$6.8K",
    change1h: -0.8,
    change24h: -3.2,
    change7d: -8.5,
    change30d: 22.4,
  },
}

export default function AgentDetailPage() {
  const params = useParams()
  const ticker = (params.ticker as string)?.toLowerCase() || "test"
  const [timeframe, setTimeframe] = React.useState("1m")

  const agent = AGENT_DATA[ticker] || AGENT_DATA.test

  return (
    <div className="h-screen bg-zeus-surface-default flex flex-col overflow-hidden">
      {/* Header */}
      <Header
        onCreateCoin={() => console.log("Create Coin clicked")}
        onConnect={() => console.log("Connect clicked")}
      />

      {/* Platform Stats */}
      <PlatformStats
        endsIn="0m 0s"
        jackpot="$201"
        tokens={1}
        recentTrades={RECENT_TRADES}
        ticker={agent.ticker}
      />

      {/* Main Content - Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-4 px-4 pt-4 pb-16 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
        {/* Left Column - Chart + Transactions Table */}
        <div className="flex-1 min-w-0 flex flex-col gap-4 lg:min-h-0">
          <PriceChart
            ticker={agent.ticker}
            activeTimeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />

          {/* TokenSwapCard - Mobile only (under chart) */}
          <div className="lg:hidden">
            <TokenSwapCard
              name={agent.name}
              ticker={agent.ticker}
              price={agent.price}
              priceChange={agent.priceChange}
              description={agent.description}
              tokenAddress={agent.tokenAddress}
              huggingFaceUrl={agent.huggingFaceUrl}
              modelTypes={agent.modelTypes}
              marketCap={agent.marketCap}
              volume24h={agent.volume24h}
              tvl={agent.tvl}
              change1h={agent.change1h}
              change24h={agent.change24h}
              change7d={agent.change7d}
              change30d={agent.change30d}
              payBalance="200"
              receiveBalance="0"
              slippage="Auto"
              isActive={true}
              onRefresh={() => console.log("Refresh")}
              onSlippageSettings={() => console.log("Slippage settings")}
              onSwap={(pay, receive) => console.log("Swap:", pay, receive)}
            />
          </div>

          <TransactionsTable ticker={agent.ticker} className="flex-1" />
        </div>

        {/* Right Column - Combined Token + Swap Card */}
        <div className="hidden lg:flex lg:flex-col w-[380px] flex-shrink-0">
          <TokenSwapCard
            name={agent.name}
            ticker={agent.ticker}
            price={agent.price}
            priceChange={agent.priceChange}
            description={agent.description}
            tokenAddress={agent.tokenAddress}
            huggingFaceUrl={agent.huggingFaceUrl}
            modelTypes={agent.modelTypes}
            marketCap={agent.marketCap}
            volume24h={agent.volume24h}
            tvl={agent.tvl}
            change1h={agent.change1h}
            change24h={agent.change24h}
            change7d={agent.change7d}
            change30d={agent.change30d}
            payBalance="200"
            receiveBalance="0"
            slippage="Auto"
            isActive={true}
            onRefresh={() => console.log("Refresh")}
            onSlippageSettings={() => console.log("Slippage settings")}
            onSwap={(pay, receive) => console.log("Swap:", pay, receive)}
          />
        </div>
      </div>
    </div>
  )
}
