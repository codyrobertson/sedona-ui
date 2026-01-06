"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Clock, Trophy, BarChart3, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Counter, TimeCounter, CurrencyCounter } from "@/components/ui/counter"

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

const TradeMarqueeItem = ({ type, amount, price, time }: TradeItem) => {
  const isBuy = type === "buy"
  return (
    <div className="inline-flex items-center gap-2 px-4 font-mono text-caption-m">
      <span className={cn(
        "flex items-center gap-1 font-medium",
        isBuy ? "text-zeus-status-success" : "text-zeus-status-destructive"
      )}>
        {isBuy ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {isBuy ? "BUY" : "SELL"}
      </span>
      <span className="text-zeus-text-primary">{amount}</span>
      <span className="text-zeus-text-tertiary">@</span>
      <span className="text-zeus-text-secondary">{price}</span>
      <span className="text-zeus-text-quaternary">{time}</span>
    </div>
  )
}

// Stat badge component with animated counter
interface StatBadgeProps {
  icon: React.ReactNode
  label: string
  value?: string
  numericValue?: number
  type?: "time" | "currency" | "number"
  variant?: "info" | "warning"
}

const StatBadge = ({ icon, label, value, numericValue, type = "number", variant = "info" }: StatBadgeProps) => {
  const variantStyles = {
    info: "bg-zeus-surface-info border-zeus-accent-blue/30",
    warning: "bg-zeus-surface-warning border-zeus-accent-orange/30",
  }

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-lg border",
      variantStyles[variant]
    )}>
      <span className="text-zeus-text-tertiary">{icon}</span>
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
        <div className="flex items-center gap-3 px-6 py-2 flex-shrink-0">
          <span className="text-zeus-text-secondary text-caption-m">
            Platform Stats
          </span>

          <StatBadge
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Ends In:"
            value={endsIn}
            numericValue={endsInSeconds}
            type="time"
            variant="info"
          />

          <StatBadge
            icon={<Trophy className="w-3.5 h-3.5" />}
            label="Jackpot:"
            value={jackpot}
            numericValue={jackpotValue}
            type="currency"
            variant="warning"
          />

          <StatBadge
            icon={<BarChart3 className="w-3.5 h-3.5" />}
            label="Tokens:"
            numericValue={tokens}
            type="number"
            variant="info"
          />
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-zeus-border-alpha flex-shrink-0" />

        {/* Right: Recent Trades for ticker (detail page) */}
        {showTrades && (
          <div className="flex items-center flex-1 overflow-hidden">
            <span className="text-zeus-text-secondary text-caption-m px-3 flex-shrink-0">
              {ticker ? `$${ticker} Activity` : "Recent Trades"}
            </span>

            <div className="flex-1 overflow-hidden relative">
              {/* Left scrim */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zeus-surface-elevated to-transparent z-10" />

              {/* Marquee */}
              <div className="flex items-center animate-marquee whitespace-nowrap py-2">
                {[...recentTrades, ...recentTrades, ...recentTrades].map((trade, i) => (
                  <TradeMarqueeItem key={`${trade.type}-${trade.time}-${i}`} {...trade} />
                ))}
              </div>

              {/* Right scrim */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zeus-surface-elevated to-transparent z-10" />
            </div>
          </div>
        )}

        {/* Right: Top Pools Label + Scrolling Marquee (main page) */}
        {showPools && (
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
