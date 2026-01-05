"use client"

import * as React from "react"
import {
  Header,
  PlatformStats,
  YourPortfolio,
} from "@/components/trading"
import { getDummyPools } from "@/lib/dummy-data"

// Get pools for marquee
const MARQUEE_POOLS = getDummyPools(30)

// Sample portfolio data
const SAMPLE_HOLDINGS = [
  {
    ticker: "TEST",
    name: "Test Agent",
    amount: "10,000",
    value: "$74.00",
    price: "$0.0074",
    change24h: 5.4,
  },
  {
    ticker: "ALPHA",
    name: "Alpha Bot",
    amount: "2,500",
    value: "$113.00",
    price: "$0.0452",
    change24h: 12.5,
  },
  {
    ticker: "SIGMA",
    name: "Sigma AI",
    amount: "5,000",
    value: "$144.50",
    price: "$0.0289",
    change24h: -3.2,
  },
]

const SAMPLE_SUMMARY = {
  totalValue: "$331.50",
  pnl24h: "+$45.20",
  pnl24hPercent: 15.8,
  pnl7d: "+$123.50",
  pnl7dPercent: 59.4,
  tokenCount: 3,
}

export default function PortfolioPage() {
  const [sortBy, setSortBy] = React.useState("Highest Value")
  const [currency, setCurrency] = React.useState<"USD" | "SOL">("USD")

  const handleDisconnect = () => {
    window.location.href = "/trading"
  }

  return (
    <div className="min-h-screen bg-zeus-surface-default">
      {/* Header - Authenticated State */}
      <Header
        isAuthenticated={true}
        walletAddress="J181...U7Wi"
        balance="0.00 SOL"
        onCreateCoin={() => console.log("Create Agent clicked")}
        onDisconnect={handleDisconnect}
      />

      {/* Platform Stats */}
      <PlatformStats endsIn="0m 0s" jackpot="$201" tokens={1} topPools={MARQUEE_POOLS} />

      {/* Portfolio Content */}
      <div className="px-6 pt-4 pb-20">
        <YourPortfolio
          holdings={SAMPLE_HOLDINGS}
          summary={SAMPLE_SUMMARY}
          sortBy={sortBy}
          onSortChange={setSortBy}
          currency={currency}
          onCurrencyChange={setCurrency}
        />
      </div>
    </div>
  )
}
