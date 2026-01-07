"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Icon } from "@/components/ui/icon"
import { AgentListItem, AgentListItemProps } from "./AgentListItem"
import { EmptyState } from "@/components/ui/empty-state"
import { TopAgentsChart } from "./TopAgentsChart"
import { getTopAgentsWithHistory } from "@/fixtures"

export interface TrendingAgentsProps extends React.HTMLAttributes<HTMLDivElement> {
  agents?: Omit<AgentListItemProps, "onSelect" | "rank">[]
  sortBy?: string
  onSortChange?: (sort: string) => void
  onSearch?: (query: string) => void
  onAgentSelect?: (ticker: string) => void
}

const SORT_OPTIONS = [
  "Highest Market Capitalization",
  "Lowest Market Capitalization",
  "Highest Volume",
  "Recently Created",
  "Highest 24h Change",
]

const TrendingAgents = React.forwardRef<HTMLDivElement, TrendingAgentsProps>(
  (
    {
      className,
      agents = [],
      sortBy = "Highest Market Capitalization",
      onSortChange,
      onSearch,
      onAgentSelect,
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [chartTimeframe, setChartTimeframe] = React.useState<"7d" | "30d">("30d")

    // Get top 5 agents with historical data for chart
    const topAgentsHistory = React.useMemo(() => {
      return getTopAgentsWithHistory(agents, 5)
    }, [agents])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
      onSearch?.(e.target.value)
    }

    return (
      <div ref={ref} className={cn("flex-1", className)} {...props}>
        {/* Top 5 Market Cap Chart with Title & Sorting */}
        {topAgentsHistory.length > 0 && (
          <TopAgentsChart
            agents={topAgentsHistory}
            timeframe={chartTimeframe}
            onTimeframeChange={setChartTimeframe}
            sortBy={sortBy}
            sortOptions={SORT_OPTIONS}
            onSortChange={onSortChange}
            className="mb-6"
          />
        )}

        {/* Search */}
        <div className="relative w-full mb-6">
          <Input
            placeholder="Search Agents"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-4 pr-10 bg-zeus-surface-elevated border-zeus-border-alpha text-zeus-text-primary placeholder:text-zeus-text-tertiary"
          />
          <Icon icon="magnifying-glass" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zeus-text-tertiary" />
        </div>

        {/* Agent Table */}
        <div className="rounded-lg border border-zeus-border-alpha overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_80px_80px] lg:grid-cols-[auto_1fr_100px_100px_100px] gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 bg-zeus-surface-elevated border-b border-zeus-border-alpha text-zeus-text-tertiary text-caption-s uppercase tracking-wider">
            <div className="w-8 sm:w-10">#</div>
            <div>Token</div>
            <div className="text-right">Change</div>
            <div className="text-right hidden sm:block">MCap</div>
            <div className="text-right hidden lg:block">Volume</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-zeus-border-alpha">
            {agents.map((agent, index) => (
              <AgentListItem
                key={agent.ticker}
                {...agent}
                rank={index + 1}
                onSelect={() => onAgentSelect?.(agent.ticker)}
              />
            ))}
          </div>

          {agents.length === 0 && (
            <EmptyState
              title="No agents found"
              description="Try adjusting your search or filters"
            />
          )}
        </div>
      </div>
    )
  }
)

TrendingAgents.displayName = "TrendingAgents"

export { TrendingAgents }
