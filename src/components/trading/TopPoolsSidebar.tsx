"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TopPoolItem {
  rank: number
  ticker: string
  marketCap: string
  change24h: number
}

export interface InfoCard {
  title: string
  value: string
  change?: number
}

export interface TopPoolsSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  topPools?: TopPoolItem[]
  infoCards?: InfoCard[]
}

const TopPoolsSidebar = React.forwardRef<HTMLDivElement, TopPoolsSidebarProps>(
  ({ className, topPools = [], infoCards = [], ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-[260px] flex-shrink-0 space-y-4", className)} {...props}>
        {/* Platform Stats */}
        {infoCards.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-zeus-text-primary text-body-s font-semibold">
              Platform Stats
            </h3>
            <div className="border border-zeus-border-alpha rounded p-3 space-y-2">
              {infoCards.map((card) => (
                <div
                  key={card.title}
                  className="flex items-center justify-between"
                >
                  <span className="text-zeus-text-secondary text-caption-m">
                    {card.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-zeus-text-primary font-semibold text-caption-m font-mono">
                      {card.value}
                    </span>
                    {card.change !== undefined && (
                      <span
                        className={cn(
                          "text-caption-m font-mono",
                          card.change >= 0
                            ? "text-zeus-status-success"
                            : "text-zeus-status-destructive"
                        )}
                      >
                        {card.change >= 0 ? "+" : ""}
                        {Math.abs(card.change).toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Pools */}
        {topPools.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-zeus-text-primary text-body-s font-semibold">
              Top Pools
            </h3>
            <div className="border border-zeus-border-alpha rounded p-3 space-y-2">
              {topPools.map((pool) => (
                <div
                  key={pool.ticker}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-zeus-text-tertiary text-caption-m w-4 font-mono">
                      {pool.rank}
                    </span>
                    <span className="text-zeus-text-primary group-hover:text-sedona-500 transition-colors text-caption-m font-mono font-medium">
                      ${pool.ticker}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-zeus-text-tertiary font-mono text-caption-m">
                      {pool.marketCap}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-caption-m font-medium w-16 text-right",
                        pool.change24h >= 0
                          ? "text-zeus-status-success"
                          : "text-zeus-status-destructive"
                      )}
                    >
                      {pool.change24h >= 0 ? "+" : ""}
                      {pool.change24h.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

TopPoolsSidebar.displayName = "TopPoolsSidebar"

export { TopPoolsSidebar }
