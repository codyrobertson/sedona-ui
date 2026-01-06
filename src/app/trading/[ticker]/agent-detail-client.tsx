"use client"

import * as React from "react"
import {
  Header,
  PlatformStats,
  PriceChart,
  TokenSwapCard,
  TransactionsTable,
} from "@/components/trading"
import { getAgentOrDefault, RECENT_TRADES, type ChartTimeframe } from "@/fixtures"

interface AgentDetailClientProps {
  ticker: string
}

export default function AgentDetailClient({ ticker }: AgentDetailClientProps) {
  const [timeframe, setTimeframe] = React.useState<ChartTimeframe>("1d")
  const agent = getAgentOrDefault(ticker?.toLowerCase() || "test")

  // Convert RECENT_TRADES to the format expected by PlatformStats
  const recentTrades = RECENT_TRADES.map((trade) => ({
    type: trade.type,
    amount: trade.amount,
    price: trade.price,
    time: trade.time,
  }))

  return (
    <div className="h-screen bg-zeus-surface-default flex flex-col overflow-hidden">
      {/* Header */}
      <Header
        onCreateCoin={() => {}}
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
            tokens={47}
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
              <TokenSwapCard
                name={agent.name}
                ticker={agent.ticker}
                price={agent.price}
                priceChange={agent.priceChange}
                description={agent.description}
                tokenAddress={agent.tokenAddress}
                huggingFaceUrl={agent.huggingFaceUrl}
                modelTypes={agent.modelTypes}
                modelVersions={agent.modelVersions}
                marketCap={agent.marketCap}
                volume24h={agent.volume24h}
                tvl={agent.tvl}
                change1h={agent.change1h}
                change24h={agent.change24h}
                change7d={agent.change7d}
                change30d={agent.change30d}
                rank={agent.rank}
                totalAgents={agent.totalAgents}
                eliminationThreshold={agent.eliminationThreshold}
                payBalance="200"
                receiveBalance="0"
                tradingStatus="active"
                onSwap={async () => {}}
              />
            </article>

            <TransactionsTable ticker={agent.ticker} className="flex-1" />
          </section>

          {/* Right Column - Combined Token + Swap Card */}
          <aside className="hidden lg:flex lg:flex-col w-[380px] flex-shrink-0" aria-label="Token Swap">
            <TokenSwapCard
              name={agent.name}
              ticker={agent.ticker}
              price={agent.price}
              priceChange={agent.priceChange}
              description={agent.description}
              tokenAddress={agent.tokenAddress}
              huggingFaceUrl={agent.huggingFaceUrl}
              modelTypes={agent.modelTypes}
              modelVersions={agent.modelVersions}
              marketCap={agent.marketCap}
              volume24h={agent.volume24h}
              tvl={agent.tvl}
              change1h={agent.change1h}
              change24h={agent.change24h}
              change7d={agent.change7d}
              change30d={agent.change30d}
              rank={agent.rank}
              totalAgents={agent.totalAgents}
              eliminationThreshold={agent.eliminationThreshold}
              payBalance="200"
              receiveBalance="0"
              tradingStatus="active"
              onSwap={async () => {}}
            />
          </aside>
        </div>
      </main>
    </div>
  )
}
