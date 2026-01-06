"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Search, ChevronDown } from "lucide-react"
import { AgentListItem, AgentListItemProps } from "./AgentListItem"
import { EmptyState } from "@/components/ui/empty-state"

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
          <div className="flex items-center gap-2 mt-2">
            <span className="text-zeus-text-secondary text-caption-l">Sorting by</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-zeus-text-primary text-caption-l font-medium hover:text-sedona-500 transition-colors focus:outline-none">
                  {sortBy}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="min-w-[250px] bg-zeus-surface-neutral border-zeus-border-alpha"
              >
                <DropdownMenuRadioGroup
                  value={sortBy}
                  onValueChange={(value) => onSortChange?.(value)}
                >
                  {SORT_OPTIONS.map((option) => (
                    <DropdownMenuRadioItem
                      key={option}
                      value={option}
                      className={cn(
                        "px-4 py-2 cursor-pointer",
                        option === sortBy
                          ? "text-sedona-500 bg-zeus-surface-neutral-subtle"
                          : "text-zeus-text-primary hover:bg-zeus-surface-neutral-subtle"
                      )}
                    >
                      {option}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
