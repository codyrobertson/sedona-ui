"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Clock, Trophy, BarChart3, TrendingUp, TrendingDown } from "lucide-react"
import { BadgeGroup } from "@/components/ui/badge"

export interface TopPoolItem {
  ticker: string
  price: string
  change: number
}

export interface PlatformStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  endsIn?: string
  jackpot?: string
  tokens?: number
  topPools?: TopPoolItem[]
}

const MarqueeItem = ({ ticker, price, change }: TopPoolItem) => {
  const isPositive = change >= 0
  return (
    <div className="inline-flex items-center gap-2 px-4 font-mono text-caption-m">
      <span className="text-zeus-text-primary font-medium">${ticker}</span>
      <span className="text-zeus-text-secondary">{price}</span>
      <span className={cn(
        "flex items-center gap-0.5",
        isPositive ? "text-zeus-status-success" : "text-zeus-status-destructive"
      )}>
        {isPositive ? "+" : ""}{change.toFixed(2)}%
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      </span>
    </div>
  )
}

const PlatformStats = React.forwardRef<HTMLDivElement, PlatformStatsProps>(
  ({ className, endsIn = "0m 0s", jackpot = "$201", tokens = 1, topPools = [], ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between bg-zeus-surface-elevated border-b border-zeus-border-alpha overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Left: Platform Stats */}
        <div className="flex items-center gap-3 px-6 py-2 flex-shrink-0">
          <span className="text-zeus-text-secondary text-caption-m">
            Platform Stats
          </span>

          <BadgeGroup
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Ends In:"
            value={endsIn}
            variant="info"
          />

          <BadgeGroup
            icon={<Trophy className="w-3.5 h-3.5" />}
            label="Jackpot:"
            value={jackpot}
            variant="warning"
          />

          <BadgeGroup
            icon={<BarChart3 className="w-3.5 h-3.5" />}
            label="Tokens:"
            value={String(tokens)}
            variant="info"
          />
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-zeus-border-alpha flex-shrink-0" />

        {/* Right: Top Pools Label + Scrolling Marquee */}
        {topPools.length > 0 && (
          <div className="flex items-center flex-1 overflow-hidden">
            <span className="text-zeus-text-secondary text-caption-m px-3 flex-shrink-0">
              Top Pools
            </span>

            <div className="flex-1 overflow-hidden relative">
              {/* Left scrim */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zeus-surface-elevated to-transparent z-10" />

              {/* Marquee */}
              <div className="flex items-center animate-marquee whitespace-nowrap py-2">
                {[...topPools, ...topPools, ...topPools].map((pool, i) => (
                  <MarqueeItem key={`${pool.ticker}-${i}`} {...pool} />
                ))}
              </div>

              {/* Right scrim */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zeus-surface-elevated to-transparent z-10" />
            </div>
          </div>
        )}
      </div>
    )
  }
)

PlatformStats.displayName = "PlatformStats"

export { PlatformStats }
