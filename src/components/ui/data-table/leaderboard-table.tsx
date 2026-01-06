"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableHead,
  DataTableCell,
  DataTableEmpty,
  DataTableLoading,
} from "./data-table"
import {
  RankCell,
  TokenCell,
  PercentCell,
  CurrencyCell,
  VolumeCell,
  SparklineCell,
} from "./cells"
import { BarChart3 } from "lucide-react"

// ============================================================================
// LEADERBOARD TABLE - Composed table for token/agent rankings
// ============================================================================

export interface LeaderboardItem {
  id: string
  rank: number
  name: string
  ticker?: string
  description?: string
  avatarUrl?: string
  change: number
  marketCap: number
  volume: number
  volumeTrend?: "up" | "down" | "neutral"
  sparklineData?: number[]
  onClick?: () => void
}

export interface LeaderboardTableProps extends React.HTMLAttributes<HTMLDivElement> {
  items: LeaderboardItem[]
  isLoading?: boolean
  showSparkline?: boolean
  showVolume?: boolean
  showMarketCap?: boolean
  showChange?: boolean
  stickyHeader?: boolean
  emptyTitle?: string
  emptyDescription?: string
  onItemClick?: (item: LeaderboardItem) => void
  sortColumn?: "rank" | "change" | "marketCap" | "volume"
  sortDirection?: "asc" | "desc"
  onSort?: (column: "rank" | "change" | "marketCap" | "volume") => void
}

const LeaderboardTable = React.forwardRef<HTMLDivElement, LeaderboardTableProps>(
  ({
    className,
    items,
    isLoading = false,
    showSparkline = true,
    showVolume = true,
    showMarketCap = true,
    showChange = true,
    stickyHeader = false,
    emptyTitle = "No tokens found",
    emptyDescription = "Check back later for updates",
    onItemClick,
    sortColumn,
    sortDirection,
    onSort,
    ...props
  }, ref) => {
    const handleSort = (column: "rank" | "change" | "marketCap" | "volume") => {
      onSort?.(column)
    }

    if (isLoading) {
      return (
        <DataTable ref={ref} className={className} {...props}>
          <DataTableHeader sticky={stickyHeader}>
            <DataTableRow interactive={false} className="py-2">
              <DataTableHead width={48} align="center">#</DataTableHead>
              <DataTableHead>Token</DataTableHead>
              {showChange && <DataTableHead width={100} align="right">Change</DataTableHead>}
              {showMarketCap && <DataTableHead width={100} align="right">MCap</DataTableHead>}
              {showVolume && <DataTableHead width={100} align="right">Volume</DataTableHead>}
              {showSparkline && <DataTableHead width={70} align="right">7D</DataTableHead>}
            </DataTableRow>
          </DataTableHeader>
          <DataTableLoading rows={5} />
        </DataTable>
      )
    }

    if (items.length === 0) {
      return (
        <DataTable ref={ref} className={className} {...props}>
          <DataTableEmpty
            icon={<BarChart3 className="w-10 h-10" />}
            title={emptyTitle}
            description={emptyDescription}
          />
        </DataTable>
      )
    }

    return (
      <DataTable ref={ref} className={className} {...props}>
        <DataTableHeader sticky={stickyHeader}>
          <DataTableRow interactive={false} className="py-2">
            <DataTableHead
              width={48}
              align="center"
              sortable={!!onSort}
              sortDirection={sortColumn === "rank" ? sortDirection : null}
              onSort={() => handleSort("rank")}
            >
              #
            </DataTableHead>
            <DataTableHead>Token</DataTableHead>
            {showChange && (
              <DataTableHead
                width={100}
                align="right"
                sortable={!!onSort}
                sortDirection={sortColumn === "change" ? sortDirection : null}
                onSort={() => handleSort("change")}
              >
                Change
              </DataTableHead>
            )}
            {showMarketCap && (
              <DataTableHead
                width={100}
                align="right"
                sortable={!!onSort}
                sortDirection={sortColumn === "marketCap" ? sortDirection : null}
                onSort={() => handleSort("marketCap")}
              >
                MCap
              </DataTableHead>
            )}
            {showVolume && (
              <DataTableHead
                width={100}
                align="right"
                sortable={!!onSort}
                sortDirection={sortColumn === "volume" ? sortDirection : null}
                onSort={() => handleSort("volume")}
              >
                Volume
              </DataTableHead>
            )}
            {showSparkline && (
              <DataTableHead width={70} align="right">
                7D
              </DataTableHead>
            )}
          </DataTableRow>
        </DataTableHeader>

        <DataTableBody>
          {items.map((item) => (
            <DataTableRow
              key={item.id}
              onClick={() => {
                item.onClick?.()
                onItemClick?.(item)
              }}
              className="group"
            >
              <DataTableCell width={48} align="center">
                <RankCell rank={item.rank} />
              </DataTableCell>

              <DataTableCell>
                <TokenCell
                  name={item.name}
                  ticker={item.ticker}
                  description={item.description}
                  avatarUrl={item.avatarUrl}
                  size="md"
                />
              </DataTableCell>

              {showChange && (
                <DataTableCell width={100} align="right">
                  <PercentCell value={item.change} showIcon={false} />
                </DataTableCell>
              )}

              {showMarketCap && (
                <DataTableCell width={100} align="right">
                  <CurrencyCell value={item.marketCap} />
                </DataTableCell>
              )}

              {showVolume && (
                <DataTableCell width={100} align="right">
                  <VolumeCell value={item.volume} trend={item.volumeTrend} />
                </DataTableCell>
              )}

              {showSparkline && (
                <DataTableCell width={70} align="right">
                  {item.sparklineData && item.sparklineData.length > 0 ? (
                    <SparklineCell
                      data={item.sparklineData}
                      color={item.change >= 0 ? "green" : "red"}
                      width={60}
                      height={24}
                    />
                  ) : (
                    <span className="text-zeus-text-quaternary text-caption-s">—</span>
                  )}
                </DataTableCell>
              )}
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTable>
    )
  }
)
LeaderboardTable.displayName = "LeaderboardTable"

// ============================================================================
// COMPACT LEADERBOARD - Smaller variant for sidebars
// ============================================================================

export interface CompactLeaderboardProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Pick<LeaderboardItem, "id" | "rank" | "name" | "ticker" | "avatarUrl" | "change">[]
  onItemClick?: (id: string) => void
  maxItems?: number
}

const CompactLeaderboard = React.forwardRef<HTMLDivElement, CompactLeaderboardProps>(
  ({ className, items, onItemClick, maxItems = 5, ...props }, ref) => {
    const displayItems = items.slice(0, maxItems)

    return (
      <div
        ref={ref}
        className={cn("space-y-1", className)}
        {...props}
      >
        {displayItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg",
              "hover:bg-zeus-surface-elevated transition-colors cursor-pointer"
            )}
            onClick={() => onItemClick?.(item.id)}
          >
            <RankCell rank={item.rank} className="min-w-[32px]" />
            <TokenCell
              name={item.name}
              ticker={item.ticker}
              avatarUrl={item.avatarUrl}
              size="sm"
              className="flex-1 min-w-0"
            />
            <PercentCell value={item.change} showIcon={false} className="flex-shrink-0" />
          </div>
        ))}
      </div>
    )
  }
)
CompactLeaderboard.displayName = "CompactLeaderboard"

export { LeaderboardTable, CompactLeaderboard }
