"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"

// ============================================================================
// RANK CELL - Position with crown for #1
// ============================================================================

export interface RankCellProps extends React.HTMLAttributes<HTMLDivElement> {
  rank: number
  showCrown?: boolean
  crownColor?: string
}

const RankCell = React.forwardRef<HTMLDivElement, RankCellProps>(
  ({ rank, showCrown = true, crownColor = "#FFD700", className, ...props }, ref) => {
    const isFirst = rank === 1

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-1 min-w-[48px] font-mono",
          className
        )}
        {...props}
      >
        {isFirst && showCrown ? (
          <Icon
            icon="crown"
            className="w-4 h-4"
            style={{ color: crownColor }}
          />
        ) : (
          <span className="text-caption-l font-semibold text-zeus-text-secondary tabular-nums">
            {rank}.
          </span>
        )}
      </div>
    )
  }
)
RankCell.displayName = "RankCell"

// ============================================================================
// TOKEN CELL - Avatar + Name + Ticker badge + optional description
// ============================================================================

export interface TokenCellProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  ticker?: string
  description?: string
  avatarUrl?: string
  avatarFallback?: string
  size?: "sm" | "md" | "lg"
}

const TokenCell = React.forwardRef<HTMLDivElement, TokenCellProps>(
  ({
    name,
    ticker,
    description,
    avatarUrl,
    avatarFallback,
    size = "md",
    className,
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: { avatar: "w-8 h-8", name: "text-caption-m", desc: "text-caption-s" },
      md: { avatar: "w-10 h-10", name: "text-caption-l", desc: "text-caption-m" },
      lg: { avatar: "w-12 h-12", name: "text-body-s", desc: "text-caption-l" },
    }

    const fallback = avatarFallback || name.slice(0, 2).toUpperCase()

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3 min-w-0", className)}
        {...props}
      >
        {/* Avatar */}
        <div className={cn(
          "relative flex-shrink-0 rounded-lg overflow-hidden border border-zeus-border-alpha bg-zeus-surface-neutral",
          sizeClasses[size].avatar
        )}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-zeus-text-secondary font-medium text-caption-m">
                {fallback}
              </span>
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-col min-w-0 gap-0.5">
          <div className="flex items-center gap-2">
            <span className={cn(
              "font-semibold text-zeus-text-primary truncate",
              sizeClasses[size].name
            )}>
              {name}
            </span>
            {ticker && (
              <Badge variant="default" size="sm" className="flex-shrink-0">
                ${ticker}
              </Badge>
            )}
          </div>
          {description && (
            <span className={cn(
              "text-zeus-text-tertiary truncate",
              sizeClasses[size].desc
            )}>
              {description}
            </span>
          )}
        </div>
      </div>
    )
  }
)
TokenCell.displayName = "TokenCell"

// ============================================================================
// PERCENT CELL - Percentage with color coding and optional icon
// ============================================================================

export interface PercentCellProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  showIcon?: boolean
  showSign?: boolean
  decimals?: number
}

const PercentCell = React.forwardRef<HTMLDivElement, PercentCellProps>(
  ({ value, showIcon = true, showSign = true, decimals = 2, className, ...props }, ref) => {
    const isPositive = value >= 0
    const formattedValue = Math.abs(value).toFixed(decimals)

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1 font-mono tabular-nums",
          isPositive ? "text-zeus-status-success" : "text-zeus-status-destructive",
          className
        )}
        {...props}
      >
        {showIcon && (
          isPositive ? (
            <Icon icon="arrow-trend-up" className="w-3.5 h-3.5" />
          ) : (
            <Icon icon="arrow-trend-down" className="w-3.5 h-3.5" />
          )
        )}
        <span className="font-semibold text-caption-l">
          {showSign && (isPositive ? "+" : "-")}{formattedValue}%
        </span>
      </div>
    )
  }
)
PercentCell.displayName = "PercentCell"

// ============================================================================
// CURRENCY CELL - Formatted currency value
// ============================================================================

export interface CurrencyCellProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number | string
  currency?: string
  label?: string
  compact?: boolean
}

const CurrencyCell = React.forwardRef<HTMLDivElement, CurrencyCellProps>(
  ({ value, currency = "$", label, compact = true, className, ...props }, ref) => {
    const formatValue = (val: number | string): string => {
      const num = typeof val === "string" ? parseFloat(val.replace(/[^0-9.-]/g, "")) : val
      if (isNaN(num)) return String(val)

      if (compact) {
        if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`
        if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
        if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
      }

      return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-end", className)}
        {...props}
      >
        {label && (
          <span className="text-caption-s text-zeus-text-quaternary uppercase tracking-wide">
            {label}
          </span>
        )}
        <span className="font-semibold text-caption-l text-zeus-text-primary font-mono tabular-nums">
          {currency}{formatValue(value)}
        </span>
      </div>
    )
  }
)
CurrencyCell.displayName = "CurrencyCell"

// ============================================================================
// VOLUME CELL - Volume with mini trend indicator
// ============================================================================

export interface VolumeCellProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number | string
  trend?: "up" | "down" | "neutral"
  label?: string
}

const VolumeCell = React.forwardRef<HTMLDivElement, VolumeCellProps>(
  ({ value, trend = "neutral", label, className, ...props }, ref) => {
    const formatVolume = (val: number | string): string => {
      const num = typeof val === "string" ? parseFloat(val.replace(/[^0-9.-]/g, "")) : val
      if (isNaN(num)) return String(val)

      if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`
      if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`
      if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`
      return `$${num.toFixed(2)}`
    }

    const trendColors = {
      up: "text-zeus-status-success",
      down: "text-zeus-status-destructive",
      neutral: "text-zeus-text-tertiary",
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <div className="flex flex-col items-end">
          {label && (
            <span className="text-caption-s text-zeus-text-quaternary uppercase tracking-wide">
              {label}
            </span>
          )}
          <span className="font-semibold text-caption-l text-zeus-text-primary font-mono tabular-nums">
            {formatVolume(value)}
          </span>
        </div>
        {trend !== "neutral" && (
          <div className={cn("flex items-center", trendColors[trend])}>
            {trend === "up" ? (
              <Icon icon="arrow-trend-up" className="w-3 h-3" />
            ) : (
              <Icon icon="arrow-trend-down" className="w-3 h-3" />
            )}
          </div>
        )}
      </div>
    )
  }
)
VolumeCell.displayName = "VolumeCell"

// ============================================================================
// SPARKLINE CELL - Mini chart visualization
// ============================================================================

export interface SparklineCellProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[]
  width?: number
  height?: number
  color?: "green" | "red" | "blue" | "orange" | "neutral"
  showArea?: boolean
}

const SparklineCell = React.forwardRef<HTMLDivElement, SparklineCellProps>(
  ({ data, width = 60, height = 24, color = "green", showArea = true, className, ...props }, ref) => {
    const colorMap = {
      green: { stroke: "#87d68a", fill: "rgba(135, 214, 138, 0.2)" },
      red: { stroke: "#e75d57", fill: "rgba(231, 93, 87, 0.2)" },
      blue: { stroke: "#6b9dd0", fill: "rgba(107, 157, 208, 0.2)" },
      orange: { stroke: "#ffa55b", fill: "rgba(255, 165, 91, 0.2)" },
      neutral: { stroke: "#ffffff75", fill: "rgba(255, 255, 255, 0.1)" },
    }

    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((val - min) / range) * height
      return `${x},${y}`
    }).join(" ")

    const areaPoints = `0,${height} ${points} ${width},${height}`

    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        <svg width={width} height={height} className="overflow-visible">
          {showArea && (
            <polygon
              points={areaPoints}
              fill={colorMap[color].fill}
            />
          )}
          <polyline
            points={points}
            fill="none"
            stroke={colorMap[color].stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }
)
SparklineCell.displayName = "SparklineCell"

export { RankCell, TokenCell, PercentCell, CurrencyCell, VolumeCell, SparklineCell }
