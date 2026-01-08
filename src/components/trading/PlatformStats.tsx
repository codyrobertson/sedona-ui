"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Counter, TimeCounter, CurrencyCounter } from "@/components/ui/counter"
import { TokenMarquee, TradeMarquee, type TokenMarqueeData, type TradeMarqueeData } from "@/components/ui/marquee"

export interface TopPoolItem {
  ticker: string
  price: string
  change: number
}

export interface TradeItem {
  type: "buy" | "sell"
  amount: string
  price: string
  time: string
}

export interface PlatformStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  endsIn?: string
  endsInSeconds?: number
  jackpot?: string
  jackpotValue?: number
  tokens?: number
  topPools?: TopPoolItem[]
  recentTrades?: TradeItem[]
  ticker?: string
}

// Stat item component with animated counter
interface StatItemProps {
  icon: React.ReactNode
  label: string
  value?: string
  numericValue?: number
  type?: "time" | "currency" | "number"
}

const StatItem = ({ icon, label, value, numericValue, type = "number" }: StatItemProps) => {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span className="text-zeus-text-secondary text-caption-m">{label}</span>
      <span className="text-zeus-text-primary text-caption-m font-semibold">
        {numericValue !== undefined ? (
          type === "time" ? (
            <TimeCounter seconds={numericValue} fontSize={12} textColor="inherit" />
          ) : type === "currency" ? (
            <CurrencyCounter value={numericValue} fontSize={12} textColor="inherit" />
          ) : (
            <Counter value={numericValue} fontSize={12} textColor="inherit" fontWeight={600} />
          )
        ) : (
          value
        )}
      </span>
    </div>
  )
}

const PlatformStats = React.forwardRef<HTMLDivElement, PlatformStatsProps>(
  ({ className, endsIn = "0m 0s", endsInSeconds, jackpot = "$201", jackpotValue, tokens = 1, topPools = [], recentTrades = [], ticker, ...props }, ref) => {
    const showTrades = recentTrades.length > 0
    const showPools = topPools.length > 0 && !showTrades

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
        <div className="flex items-center justify-around sm:justify-start gap-2 sm:gap-4 px-3 sm:px-6 py-2 flex-shrink-0 flex-1 md:flex-none">
          <h2 className="text-zeus-text-secondary text-caption-m hidden sm:block">
            Platform Stats
          </h2>

          <StatItem
            icon={<Icon icon="clock" className="w-3.5 h-3.5 text-zeus-accent-blue" />}
            label="Ends In:"
            value={endsIn}
            numericValue={endsInSeconds}
            type="time"
          />

          <StatItem
            icon={<Icon icon="trophy" className="w-3.5 h-3.5 text-zeus-accent-orange" />}
            label="Jackpot:"
            value={jackpot}
            numericValue={jackpotValue}
            type="currency"
          />

          <StatItem
            icon={<Icon icon="chart-simple" className="w-3.5 h-3.5 text-zeus-accent-purple" />}
            label="Tokens:"
            numericValue={tokens}
            type="number"
          />
        </div>

        {/* Divider - hidden on mobile */}
        <div className="w-px h-6 bg-zeus-border-alpha flex-shrink-0 hidden md:block" />

        {/* Right: Recent Trades for ticker (detail page) - hidden on mobile */}
        {showTrades && (
          <div className="hidden md:flex items-center flex-1 overflow-hidden">
            <span className="text-zeus-text-secondary text-caption-m px-3 flex-shrink-0">
              {ticker ? `$${ticker} Activity` : "Recent Trades"}
            </span>
            <TradeMarquee
              trades={recentTrades as TradeMarqueeData[]}
              fadeColor="#1e1c17"
              className="flex-1"
            />
          </div>
        )}

        {/* Right: Top Pools Label + Scrolling Marquee (main page) - hidden on mobile */}
        {showPools && (
          <div className="hidden md:flex items-center flex-1 overflow-hidden">
            <span className="text-zeus-text-secondary text-caption-m px-3 flex-shrink-0">
              Top Pools
            </span>
            <TokenMarquee
              tokens={topPools as TokenMarqueeData[]}
              fadeColor="#1e1c17"
              className="flex-1"
            />
          </div>
        )}
      </div>
    )
  }
)

PlatformStats.displayName = "PlatformStats"

export { PlatformStats }
