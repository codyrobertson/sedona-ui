"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Clock, Trophy, BarChart3, type LucideIcon } from "lucide-react"
import { Counter, TimeCounter, CurrencyCounter } from "@/components/ui/counter"
import {
  TokenMarquee,
  TradeMarquee,
  type TokenMarqueeData,
  type TradeMarqueeData,
} from "@/components/ui/marquee"
import { cva, type VariantProps } from "class-variance-authority"

/**
 * Stat Badge Component
 * Reusable badge for displaying individual statistics
 */
const statBadgeVariants = cva(
  "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors",
  {
    variants: {
      variant: {
        info: "bg-zeus-surface-info border-zeus-accent-blue/30",
        warning: "bg-zeus-surface-warning border-zeus-accent-orange/30",
        success: "bg-zeus-status-success/10 border-zeus-status-success/30",
        default: "bg-zeus-surface-elevated border-zeus-border-alpha",
      },
      size: {
        sm: "px-2 py-1 text-caption-s",
        md: "px-3 py-1.5 text-caption-m",
        lg: "px-4 py-2 text-caption-l",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "md",
    },
  }
)

export interface StatBadgeProps extends VariantProps<typeof statBadgeVariants> {
  /** Icon component */
  icon?: LucideIcon | React.ReactNode
  /** Stat label */
  label: string
  /** Static string value */
  value?: string
  /** Numeric value for animated counter */
  numericValue?: number
  /** Type of counter animation */
  type?: "time" | "currency" | "number"
  /** Custom class name */
  className?: string
}

const StatBadge = React.forwardRef<HTMLDivElement, StatBadgeProps>(
  (
    {
      icon: IconProp,
      label,
      value,
      numericValue,
      type = "number",
      variant,
      size,
      className,
    },
    ref
  ) => {
    const iconSize = size === "sm" ? "w-3 h-3" : size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5"
    const fontSize = size === "sm" ? 10 : size === "lg" ? 14 : 12

    const Icon = IconProp as LucideIcon

    return (
      <div ref={ref} className={cn(statBadgeVariants({ variant, size }), className)}>
        {IconProp && (
          <span className="text-zeus-text-tertiary">
            {typeof IconProp === "function" ? (
              <Icon className={iconSize} />
            ) : (
              IconProp
            )}
          </span>
        )}
        <span className="text-zeus-text-secondary">{label}</span>
        <span className="text-zeus-text-primary font-semibold">
          {numericValue !== undefined ? (
            type === "time" ? (
              <TimeCounter seconds={numericValue} fontSize={fontSize} textColor="inherit" />
            ) : type === "currency" ? (
              <CurrencyCounter value={numericValue} fontSize={fontSize} textColor="inherit" />
            ) : (
              <Counter value={numericValue} fontSize={fontSize} textColor="inherit" fontWeight={600} />
            )
          ) : (
            value
          )}
        </span>
      </div>
    )
  }
)

StatBadge.displayName = "StatBadge"

/**
 * Platform stat configuration
 */
export interface PlatformStat {
  id: string
  icon: LucideIcon
  label: string
  value?: string
  numericValue?: number
  type?: "time" | "currency" | "number"
  variant?: "info" | "warning" | "success" | "default"
}

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

export interface StatsBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom stats to display */
  stats?: PlatformStat[]
  /** Use default platform stats */
  useDefaultStats?: boolean
  /** Ends in seconds for countdown */
  endsInSeconds?: number
  /** Jackpot value */
  jackpotValue?: number
  /** Token count */
  tokenCount?: number
  /** Top pools for marquee */
  topPools?: TopPoolItem[]
  /** Recent trades for marquee */
  recentTrades?: TradeItem[]
  /** Ticker symbol for trade activity label */
  ticker?: string
  /** Marquee section label */
  marqueeLabel?: string
  /** Marquee fade color (should match background) */
  marqueeFadeColor?: string
  /** Hide marquee section */
  hideMarquee?: boolean
  /** Hide stats section */
  hideStats?: boolean
  /** Stats section label */
  statsLabel?: string
}

const StatsBar = React.forwardRef<HTMLDivElement, StatsBarProps>(
  (
    {
      className,
      stats,
      useDefaultStats = true,
      endsInSeconds = 0,
      jackpotValue = 0,
      tokenCount = 0,
      topPools = [],
      recentTrades = [],
      ticker,
      marqueeLabel,
      marqueeFadeColor = "#1e1c17",
      hideMarquee = false,
      hideStats = false,
      statsLabel = "Platform Stats",
      ...props
    },
    ref
  ) => {
    // Build default stats if not provided
    const displayStats = React.useMemo<PlatformStat[]>(() => {
      if (stats) return stats
      if (!useDefaultStats) return []

      return [
        {
          id: "ends-in",
          icon: Clock,
          label: "Ends In:",
          numericValue: endsInSeconds,
          type: "time" as const,
          variant: "info" as const,
        },
        {
          id: "jackpot",
          icon: Trophy,
          label: "Jackpot:",
          numericValue: jackpotValue,
          type: "currency" as const,
          variant: "warning" as const,
        },
        {
          id: "tokens",
          icon: BarChart3,
          label: "Tokens:",
          numericValue: tokenCount,
          type: "number" as const,
          variant: "info" as const,
        },
      ]
    }, [stats, useDefaultStats, endsInSeconds, jackpotValue, tokenCount])

    const showTrades = recentTrades.length > 0
    const showPools = topPools.length > 0 && !showTrades
    const showMarquee = !hideMarquee && (showTrades || showPools)

    // Determine marquee label
    const resolvedMarqueeLabel = React.useMemo(() => {
      if (marqueeLabel) return marqueeLabel
      if (showTrades) return ticker ? `$${ticker} Activity` : "Recent Trades"
      if (showPools) return "Top Pools"
      return ""
    }, [marqueeLabel, showTrades, showPools, ticker])

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between",
          "bg-zeus-surface-elevated border-b border-zeus-border-alpha overflow-hidden",
          className
        )}
        role="region"
        aria-label="Platform statistics"
        {...props}
      >
        {/* Left: Platform Stats */}
        {!hideStats && displayStats.length > 0 && (
          <div className="flex items-center gap-3 px-6 py-2 flex-shrink-0">
            {statsLabel && (
              <span className="text-zeus-text-secondary text-caption-m">
                {statsLabel}
              </span>
            )}

            {displayStats.map((stat) => (
              <StatBadge
                key={stat.id}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                numericValue={stat.numericValue}
                type={stat.type}
                variant={stat.variant}
              />
            ))}
          </div>
        )}

        {/* Divider */}
        {!hideStats && showMarquee && (
          <div className="w-px h-6 bg-zeus-border-alpha flex-shrink-0" aria-hidden="true" />
        )}

        {/* Right: Marquee section */}
        {showMarquee && (
          <div className="flex items-center flex-1 overflow-hidden">
            {resolvedMarqueeLabel && (
              <span className="text-zeus-text-secondary text-caption-m px-3 flex-shrink-0">
                {resolvedMarqueeLabel}
              </span>
            )}

            {showTrades ? (
              <TradeMarquee
                trades={recentTrades as TradeMarqueeData[]}
                fadeColor={marqueeFadeColor}
                className="flex-1"
              />
            ) : (
              <TokenMarquee
                tokens={topPools as TokenMarqueeData[]}
                fadeColor={marqueeFadeColor}
                className="flex-1"
              />
            )}
          </div>
        )}
      </div>
    )
  }
)

StatsBar.displayName = "StatsBar"

export { StatsBar, StatBadge, statBadgeVariants }
