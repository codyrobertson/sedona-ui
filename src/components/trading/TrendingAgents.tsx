"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown } from "lucide-react"
import { AgentListItem, AgentListItemProps } from "./AgentListItem"

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
    const [showSortDropdown, setShowSortDropdown] = React.useState(false)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
      onSearch?.(e.target.value)
    }

    return (
      <div ref={ref} className={cn("flex-1", className)} {...props}>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-[28px] font-bold text-zeus-text-primary">
            Trending Agents
          </h2>
          <div className="flex items-center gap-2 mt-2 relative">
            <span className="text-zeus-text-secondary text-caption-l">Sorting by</span>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-1 text-zeus-text-primary text-caption-l font-medium hover:text-sedona-500 transition-colors"
            >
              {sortBy}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showSortDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-zeus-surface-neutral border border-zeus-border-alpha rounded-lg shadow-lg z-10 min-w-[250px]">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onSortChange?.(option)
                      setShowSortDropdown(false)
                    }}
                    className={cn(
                      "w-full px-4 py-2 text-left text-caption-l hover:bg-zeus-surface-neutral-subtle transition-colors",
                      option === sortBy
                        ? "text-sedona-500 bg-zeus-surface-neutral-subtle"
                        : "text-zeus-text-primary"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full mb-6">
          <Input
            placeholder="Search Agents"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-4 pr-10 bg-zeus-surface-elevated border-zeus-border-alpha text-zeus-text-primary placeholder:text-zeus-text-tertiary"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zeus-text-tertiary" />
        </div>

        {/* Agent Table */}
        <div className="rounded-lg border border-zeus-border-alpha overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[auto_1fr_100px_100px_100px] gap-4 px-4 py-3 bg-zeus-surface-elevated border-b border-zeus-border-alpha text-zeus-text-tertiary text-caption-s uppercase tracking-wider">
            <div className="w-10">#</div>
            <div>Token</div>
            <div className="text-right">Change</div>
            <div className="text-right">MCap</div>
            <div className="text-right">Volume</div>
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
            <div className="text-center py-12 text-zeus-text-tertiary">
              No agents found
            </div>
          )}
        </div>
      </div>
    )
  }
)

TrendingAgents.displayName = "TrendingAgents"

export { TrendingAgents }
