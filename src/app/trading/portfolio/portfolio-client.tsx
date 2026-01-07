"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Trophy, Coins, Bot } from "lucide-react"
import {
  Header,
  PlatformStats,
} from "@/components/trading"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { TokenAvatar } from "@/components/ui/token-avatar"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { MOCK_MY_AGENTS, AGENTS, formatMarketCap } from "@/fixtures"
import { useAgentLaunch } from "@/contexts"
import type { MyAgent } from "@/types/evaluation"

// Build marquee pools from unified agents
const MARQUEE_POOLS = AGENTS.map((agent) => ({
  name: agent.name,
  ticker: agent.ticker,
  price: `$${(agent.price_usd ?? 0).toFixed(4)}`,
  change: agent.price_change_percent_in_24_hours,
  volume: formatMarketCap(agent.volume_24h_usd ?? 0),
  marketCap: formatMarketCap(agent.market_cap_usd_latest),
}))

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

// Calculate agent stats
const agentStats = {
  totalAgents: MOCK_MY_AGENTS.length,
  bestScore: Math.max(...MOCK_MY_AGENTS.map(a => a.analytics.bestScore)),
  totalCompetitions: MOCK_MY_AGENTS.reduce((sum, a) => sum + a.analytics.competitionsEntered, 0),
  totalEarnings: MOCK_MY_AGENTS.reduce((sum, a) => {
    const earnings = a.analytics.totalPrizeEarnings
    if (!earnings) return sum
    return sum + parseFloat(earnings.replace(/[$,]/g, ""))
  }, 0),
}

export default function PortfolioClient() {
  const router = useRouter()
  const { openCreateAgent } = useAgentLaunch()
  const [sortBy, setSortBy] = React.useState("Highest Value")
  const [agentSortBy, setAgentSortBy] = React.useState("Best Score")
  const [currency, setCurrency] = React.useState<"USD" | "SOL">("USD")
  const [activeTab, setActiveTab] = React.useState<"holdings" | "my-agents">("holdings")

  const sortOptions = ["Highest Value", "Lowest Value", "Highest Gain", "Highest Loss", "Alphabetical"]
  const agentSortOptions = ["Best Score", "Most Recent", "Market Cap", "Alphabetical"]

  const handleDisconnect = () => {
    router.push("/trading")
  }

  const handleViewAgentDetails = (agent: MyAgent) => {
    router.push(`/trading/agents/${agent.id}`)
  }

  const handleTradeAgent = (agent: MyAgent) => {
    router.push(`/trading/${agent.ticker}`)
  }

  return (
    <div className="min-h-screen bg-zeus-surface-default">
      {/* Header - Authenticated State */}
      <Header
        isAuthenticated={true}
        walletAddress="J181...U7Wi"
        balance="0.00 SOL"
        onCreateCoin={openCreateAgent}
        onDisconnect={handleDisconnect}
      />

      <main>
        <h1 className="sr-only">Your Portfolio</h1>

        {/* Platform Stats */}
        <section aria-label="Platform Statistics">
          <PlatformStats endsIn="0m 0s" jackpot="$201" tokens={1} topPools={MARQUEE_POOLS} />
        </section>

        {/* Portfolio Content */}
        <section className="px-6 pt-4 pb-20" aria-label="Portfolio">
          {/* Unified Header */}
          <div className="flex items-center justify-between mb-6">
            {/* Tab Navigation + Sort */}
            <div className="flex items-center gap-6">
              {/* Tabs as text buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("holdings")}
                  className={cn(
                    "text-heading-md font-bold transition-colors",
                    activeTab === "holdings"
                      ? "text-zeus-text-primary"
                      : "text-zeus-text-tertiary hover:text-zeus-text-secondary"
                  )}
                >
                  Holdings
                </button>
                <span className="text-zeus-text-tertiary text-heading-md font-bold mx-2">/</span>
                <button
                  onClick={() => setActiveTab("my-agents")}
                  className={cn(
                    "text-heading-md font-bold transition-colors",
                    activeTab === "my-agents"
                      ? "text-zeus-text-primary"
                      : "text-zeus-text-tertiary hover:text-zeus-text-secondary"
                  )}
                >
                  My Agents
                </button>
              </div>

              {/* Sort Dropdown */}
              <Select
                value={activeTab === "holdings" ? sortBy : agentSortBy}
                onValueChange={activeTab === "holdings" ? setSortBy : setAgentSortBy}
              >
                <SelectTrigger className="h-auto w-auto gap-1 border-0 bg-transparent px-0 py-0 text-caption-l text-zeus-text-tertiary shadow-none hover:text-zeus-text-secondary focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zeus-surface-elevated border-zeus-border-alpha min-w-[140px]">
                  {(activeTab === "holdings" ? sortOptions : agentSortOptions).map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className={cn(
                        "text-caption-l hover:bg-zeus-surface-neutral cursor-pointer",
                        option === (activeTab === "holdings" ? sortBy : agentSortBy)
                          ? "text-sedona-500"
                          : "text-zeus-text-primary"
                      )}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stats Pills - change based on tab */}
            <div className="flex items-center gap-3">
              {activeTab === "holdings" ? (
                <>
                  <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg px-4 py-2">
                    <span className="text-zeus-text-tertiary text-caption-l">Value</span>
                    <span className="text-zeus-text-primary text-body-m font-bold ml-2">
                      {SAMPLE_SUMMARY.totalValue}
                    </span>
                  </div>
                  <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg px-4 py-2">
                    <span className="text-zeus-text-tertiary text-caption-l">Tokens</span>
                    <span className="text-zeus-text-primary text-body-m font-bold ml-2">
                      {SAMPLE_SUMMARY.tokenCount}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg px-4 py-2">
                    <span className="text-zeus-text-tertiary text-caption-l">Agents</span>
                    <span className="text-zeus-text-primary text-body-m font-bold ml-2">
                      {agentStats.totalAgents}
                    </span>
                  </div>
                  <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg px-4 py-2">
                    <span className="text-zeus-text-tertiary text-caption-l">Best Score</span>
                    <span className="text-zeus-status-success text-body-m font-bold ml-2">
                      {agentStats.bestScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg px-4 py-2">
                    <span className="text-zeus-text-tertiary text-caption-l">Earnings</span>
                    <span className="text-zeus-highlight-gold text-body-m font-bold ml-2">
                      ${agentStats.totalEarnings.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Holdings Tab Content */}
          {activeTab === "holdings" && (
            <>
              {SAMPLE_HOLDINGS.length > 0 ? (
                <div className="rounded-xl overflow-hidden">
                  {/* Table Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-zeus-surface-elevated border border-zeus-border-alpha border-b-0 rounded-t-xl">
                    <span className="text-body-m font-bold text-zeus-text-primary">Holdings</span>
                    <ToggleGroup
                      type="single"
                      value={currency}
                      onValueChange={(value) => {
                        if (value) setCurrency(value as "USD" | "SOL")
                      }}
                      className="gap-0 rounded overflow-hidden border border-zeus-border-alpha"
                    >
                      <ToggleGroupItem
                        value="USD"
                        className={cn(
                          "h-auto rounded-none px-2.5 py-1 text-caption-s font-medium transition-colors",
                          currency === "USD"
                            ? "bg-sedona-500 text-white hover:bg-sedona-500 hover:text-white data-[state=on]:bg-sedona-500 data-[state=on]:text-white"
                            : "bg-transparent text-zeus-text-tertiary hover:bg-transparent hover:text-zeus-text-primary data-[state=off]:bg-transparent"
                        )}
                      >
                        USD
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="SOL"
                        className={cn(
                          "h-auto rounded-none px-2.5 py-1 text-caption-s font-medium transition-colors",
                          currency === "SOL"
                            ? "bg-sedona-500 text-white hover:bg-sedona-500 hover:text-white data-[state=on]:bg-sedona-500 data-[state=on]:text-white"
                            : "bg-transparent text-zeus-text-tertiary hover:bg-transparent hover:text-zeus-text-primary data-[state=off]:bg-transparent"
                        )}
                      >
                        SOL
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  {/* Table */}
                  <div className="bg-zeus-surface-elevated border border-zeus-border-alpha border-t-0 rounded-b-xl">
                    {/* Table Header Row */}
                    <div className="grid grid-cols-[1fr_100px_100px_80px_80px] gap-3 px-4 py-3 border-b border-zeus-border-alpha text-zeus-text-secondary text-body-s font-semibold">
                      <div>Token</div>
                      <div className="text-right">Amount</div>
                      <div className="text-right">Value</div>
                      <div className="text-right">24H</div>
                      <div className="text-right">Action</div>
                    </div>

                    {/* Table Body */}
                    {SAMPLE_HOLDINGS.map((holding) => (
                      <div
                        key={holding.ticker}
                        className="grid grid-cols-[1fr_100px_100px_80px_80px] gap-3 px-4 py-3 border-b border-zeus-border-alpha last:border-b-0 items-center hover:bg-zeus-surface-neutral/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <TokenAvatar ticker={holding.ticker} size="md" />
                          <div>
                            <div className="text-zeus-text-primary text-body-s font-semibold">
                              {holding.ticker}
                            </div>
                            <div className="text-zeus-text-tertiary text-caption-s">
                              {holding.name}
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-zeus-text-primary text-body-s font-mono">
                          {holding.amount}
                        </div>
                        <div className="text-right text-zeus-text-primary text-body-s font-semibold">
                          {holding.value}
                        </div>
                        <div className={cn(
                          "text-right text-body-s font-semibold",
                          holding.change24h >= 0 ? "text-zeus-status-success" : "text-zeus-status-destructive"
                        )}>
                          {holding.change24h >= 0 ? "+" : ""}{holding.change24h.toFixed(1)}%
                        </div>
                        <div className="text-right">
                          <Link
                            href={`/trading/${holding.ticker.toLowerCase()}`}
                            className="inline-flex px-3 py-1.5 rounded-md bg-zeus-surface-neutral border border-zeus-border-alpha text-zeus-text-primary text-caption-s font-medium hover:bg-zeus-surface-default transition-colors"
                          >
                            Trade
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon="📊"
                  title="No holdings yet"
                  description="Start trading to build your portfolio"
                />
              )}
            </>
          )}

          {/* My Agents Tab Content */}
          {activeTab === "my-agents" && (
            <>
              {MOCK_MY_AGENTS.length > 0 ? (
                <div className="rounded-xl overflow-hidden">
                  {/* Table Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-zeus-surface-elevated border border-zeus-border-alpha border-b-0 rounded-t-xl">
                    <span className="text-body-m font-bold text-zeus-text-primary">My Agents</span>
                    <Button variant="default" size="sm">
                      + New Agent
                    </Button>
                  </div>

                  {/* Table */}
                  <div className="bg-zeus-surface-elevated border border-zeus-border-alpha border-t-0 rounded-b-xl">
                    {/* Table Header Row */}
                    <div className="grid grid-cols-[minmax(200px,1fr)_80px_120px_80px_120px_140px] gap-6 px-5 py-3 border-b border-zeus-border-alpha text-zeus-text-secondary text-caption-l font-medium">
                      <div>Agent</div>
                      <div className="text-right">Score</div>
                      <div className="text-right">Market Cap</div>
                      <div className="text-right">24H</div>
                      <div className="text-center">Status</div>
                      <div className="text-right">Action</div>
                    </div>

                    {/* Table Body */}
                    {MOCK_MY_AGENTS.map((agent) => {
                      const isEvaluating = agent.versions.some(v => v.status === "evaluating")
                      const hasCompetition = !!agent.currentCompetition

                      return (
                        <div
                          key={agent.id}
                          className="grid grid-cols-[minmax(200px,1fr)_80px_120px_80px_120px_140px] gap-6 px-5 py-4 border-b border-zeus-border-alpha last:border-b-0 items-center hover:bg-zeus-surface-neutral/30 transition-colors"
                        >
                          {/* Agent Info */}
                          <div className="flex items-center gap-3">
                            {agent.imageUrl ? (
                              <img
                                src={agent.imageUrl}
                                alt={agent.name}
                                className="w-10 h-10 rounded-lg bg-zeus-surface-default shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-zeus-surface-default flex items-center justify-center shrink-0">
                                <Bot className="w-5 h-5 text-zeus-text-tertiary" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="text-zeus-text-primary text-body-s font-semibold truncate">
                                {agent.name}
                              </div>
                              <div className="text-zeus-text-tertiary text-caption-s">
                                ${agent.ticker}
                              </div>
                            </div>
                          </div>

                          {/* Score */}
                          <div className="text-right">
                            <span className="text-zeus-status-success text-body-s font-bold tabular-nums">
                              {agent.analytics.bestScore.toFixed(1)}
                            </span>
                          </div>

                          {/* Market Cap */}
                          <div className="text-right text-zeus-text-primary text-body-s font-medium tabular-nums">
                            {agent.token?.marketCap || "—"}
                          </div>

                          {/* 24H Change */}
                          <div className={cn(
                            "text-right text-body-s font-medium tabular-nums",
                            agent.token
                              ? agent.token.priceChange24h >= 0
                                ? "text-zeus-status-success"
                                : "text-zeus-status-destructive"
                              : "text-zeus-text-tertiary"
                          )}>
                            {agent.token
                              ? `${agent.token.priceChange24h >= 0 ? "+" : ""}${agent.token.priceChange24h.toFixed(1)}%`
                              : "—"
                            }
                          </div>

                          {/* Status */}
                          <div className="flex justify-center">
                            {isEvaluating ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zeus-accent-orange/10 text-zeus-accent-orange text-caption-s font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-zeus-accent-orange animate-pulse" />
                                Evaluating
                              </span>
                            ) : hasCompetition ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sedona-500/10 text-sedona-400 text-caption-s font-medium">
                                <Trophy className="w-3 h-3" />
                                Competing
                              </span>
                            ) : (
                              <span className="text-zeus-text-tertiary text-caption-s">
                                Active
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-end gap-2">
                            {agent.token && (
                              <button
                                onClick={() => handleTradeAgent(agent)}
                                className="px-3 py-1.5 rounded-md bg-sedona-500 text-white text-caption-s font-medium hover:bg-sedona-600 transition-colors"
                              >
                                Trade
                              </button>
                            )}
                            <button
                              onClick={() => handleViewAgentDetails(agent)}
                              className="px-3 py-1.5 rounded-md bg-zeus-surface-neutral border border-zeus-border-alpha text-zeus-text-primary text-caption-s font-medium hover:bg-zeus-surface-default transition-colors"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon="🤖"
                  title="No agents yet"
                  description="Create your first AI agent to get started"
                  action={{
                    label: "Create Agent",
                    onClick: () => router.push("/trading/create")
                  }}
                />
              )}
            </>
          )}
        </section>
      </main>
    </div>
  )
}
