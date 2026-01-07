"use client"

import * as React from "react"
import {
  Header,
  PlatformStats,
  PriceChart,
  TokenSwapCard,
  TransactionsTable,
} from "@/components/trading"
import {
  getAgentOrDefault,
  AGENTS,
  formatMarketCap,
  formatPrice,
  RECENT_TRADES,
  type ChartTimeframe,
} from "@/fixtures"
import { useAgentLaunch } from "@/contexts"

interface AgentDetailClientProps {
  ticker: string
}

export default function AgentDetailClient({ ticker }: AgentDetailClientProps) {
  const { openCreateAgent } = useAgentLaunch()
  const [timeframe, setTimeframe] = React.useState<ChartTimeframe>("1d")
  const agent = getAgentOrDefault(ticker?.toLowerCase() || "test")

  // Convert RECENT_TRADES to the format expected by PlatformStats
  const recentTrades = RECENT_TRADES.map((trade) => ({
    type: trade.type,
    amount: trade.amount,
    price: trade.price,
    time: trade.time,
  }))

  // Map unified agent fields to TokenSwapCard props
  const tokenSwapProps = {
    name: agent.name,
    ticker: agent.ticker,
    price: formatPrice(agent.price_usd ?? 0),
    priceChange: (agent.price_change_percent_in_24_hours >= 0 ? "up" : "down") as "up" | "down",
    description: agent.description,
    tokenAddress: agent.base_mint,
    huggingFaceUrl: agent.agent_url,
    modelTypes: ["Transformer"], // Placeholder - not in API
    modelVersions: [], // Evaluation data - TBD by dev
    marketCap: formatMarketCap(agent.market_cap_usd_latest),
    volume24h: formatMarketCap(agent.volume_24h_usd ?? 0),
    tvl: formatMarketCap(agent.tvl_usd ?? 0),
    change1h: agent.price_change_percent_1h ?? 0,
    change24h: agent.price_change_percent_in_24_hours,
    change7d: agent.price_change_percent_7d ?? 0,
    change30d: agent.price_change_percent_30d ?? 0,
    rank: AGENTS.findIndex(a => a.pool === agent.pool) + 1,
    totalAgents: AGENTS.length,
    eliminationThreshold: "$50K", // Game-related - hardcoded for now
    payBalance: "200",
    receiveBalance: "0",
    tradingStatus: "active" as const,
    onSwap: async () => {},
  }

  return (
    <div className="h-screen bg-zeus-surface-default flex flex-col overflow-hidden">
      {/* Header */}
      <Header
        onCreateCoin={openCreateAgent}
        onConnect={() => {}}
        onDisconnect={() => {}}
      />

      <main className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <h1 className="sr-only">{agent.name} (${agent.ticker}) - Agent Trading</h1>

        {/* Platform Stats with Recent Trades for this ticker */}
        <section aria-label="Platform Statistics">
          <PlatformStats
            endsInSeconds={754}
            jackpotValue={2450}
            tokens={AGENTS.length}
            ticker={agent.ticker}
            recentTrades={recentTrades}
          />
        </section>

        {/* Main Content - Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-4 px-4 pt-4 pb-16 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
          {/* Left Column - Chart + Transactions Table */}
          <section className="flex-1 min-w-0 flex flex-col gap-4 lg:min-h-0" aria-label="Price Chart and Transactions">
            <PriceChart
              ticker={agent.ticker}
              activeTimeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />

            {/* TokenSwapCard - Mobile only (under chart) */}
            <article className="lg:hidden" aria-label="Token Swap">
              <TokenSwapCard {...tokenSwapProps} />
            </article>

            <TransactionsTable ticker={agent.ticker} className="flex-1" />
          </section>

          {/* Right Column - Combined Token + Swap Card */}
          <aside className="hidden lg:flex lg:flex-col w-[380px] flex-shrink-0" aria-label="Token Swap">
            <TokenSwapCard {...tokenSwapProps} />
          </aside>
        </div>
      </main>
    </div>
  )
}
