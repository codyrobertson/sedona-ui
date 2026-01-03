"use client"

import * as React from "react"
import {
  Header,
  PlatformStats,
  YourPortfolio,
  Footer,
} from "@/components/trading"
import { getDummyPools } from "@/lib/dummy-data"

// Get pools for marquee
const MARQUEE_POOLS = getDummyPools(30)

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
        onDocs={() => console.log("Docs clicked")}
        onCreateCoin={() => console.log("Create Agent clicked")}
        onDisconnect={handleDisconnect}
      />

      {/* Platform Stats */}
      <PlatformStats endsIn="0m 0s" jackpot="$201" tokens={1} topPools={MARQUEE_POOLS} />

      {/* Portfolio Content */}
      <div className="p-6 pb-16">
        <YourPortfolio
          holdings={[]}
          sortBy={sortBy}
          onSortChange={setSortBy}
          currency={currency}
          onCurrencyChange={setCurrency}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
