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
import { getAgentOrDefault, RECENT_TRADES, type ChartTimeframe } from "@/fixtures"

export default function AgentDetailPage() {
  const params = useParams()
  const ticker = (params.ticker as string)?.toLowerCase() || "test"
  const [timeframe, setTimeframe] = React.useState<ChartTimeframe>("1d")

  const agent = getAgentOrDefault(ticker)

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
        onCreateCoin={() => console.log("Create Agent clicked")}
        onConnect={() => console.log("Connect clicked")}
        onDisconnect={() => console.log("Disconnect clicked")}
      />

      {/* Platform Stats with Recent Trades for this ticker */}
      <PlatformStats
        endsInSeconds={754}
        jackpotValue={2450}
        tokens={47}
        ticker={agent.ticker}
        recentTrades={recentTrades}
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
              onSwap={async (params) => console.log("Swap:", params)}
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
            onSwap={async (params) => console.log("Swap:", params)}
          />
        </div>
      </div>
    </div>
  )
}
