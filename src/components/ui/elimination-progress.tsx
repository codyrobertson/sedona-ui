"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icon } from "@/components/ui/icon"
import { parseMarketCap } from "@/fixtures"

export type EliminationStatus = "safe" | "close" | "risk"

export interface EliminationProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current rank (1 = best) */
  rank: number
  /** Total number of agents */
  totalAgents: number
  /** Current market cap (e.g., "$45.2K") */
  marketCap: string
  /** Elimination threshold (e.g., "$5K") */
  eliminationThreshold: string
  /** Display variant */
  variant?: "default" | "inline"
}

/**
 * Calculate elimination status based on rank and market cap
 *
 * Rules:
 * - SAFE: rank in top 60% AND market cap above threshold
 * - CLOSE: rank 60-80% OR market cap near threshold (within 2x)
 * - AT RISK: rank bottom 20% OR market cap below threshold
 */
function calculateStatus(
  rank: number,
  totalAgents: number,
  marketCap: string,
  threshold: string
): EliminationStatus {
  // Guard against division by zero
  if (totalAgents <= 0) return "safe"

  const rankPercentile = rank / totalAgents
  const mcapValue = parseMarketCap(marketCap)
  const thresholdValue = parseMarketCap(threshold)

  // Below threshold = AT RISK
  if (mcapValue < thresholdValue) {
    return "risk"
  }

  // Near threshold (within 2x) OR bottom 20% = CLOSE
  if (mcapValue < thresholdValue * 2 || rankPercentile > 0.8) {
    return "close"
  }

  // Mid-range (60-80%) = CLOSE
  if (rankPercentile > 0.6) {
    return "close"
  }

  // Top 60% AND well above threshold = SAFE
  return "safe"
}

/**
 * Get status label text
 */
function getStatusLabel(status: EliminationStatus): string {
  switch (status) {
    case "safe":
      return "SAFE"
    case "close":
      return "CLOSE"
    case "risk":
      return "AT RISK"
  }
}

const EliminationProgress = React.forwardRef<HTMLDivElement, EliminationProgressProps>(
  (
    {
      className,
      rank,
      totalAgents,
      marketCap,
      eliminationThreshold,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const status = calculateStatus(rank, totalAgents, marketCap, eliminationThreshold)
    const statusLabel = getStatusLabel(status)

    // Progress position (inverted: rank 1 = 100%, rank N = 0%)
    // Guard against division by zero
    const progressPercent = totalAgents > 0
      ? ((totalAgents - rank + 1) / totalAgents) * 100
      : 100

    // Status colors
    const statusColors = {
      safe: {
        bar: "bg-zeus-status-success",
        marker: "border-zeus-status-success",
        text: "text-zeus-status-success",
        glow: "shadow-[0_0_8px_rgba(135,214,138,0.5)]",
      },
      close: {
        bar: "bg-zeus-accent-orange",
        marker: "border-zeus-accent-orange",
        text: "text-zeus-accent-orange",
        glow: "shadow-[0_0_8px_rgba(251,151,4,0.5)]",
      },
      risk: {
        bar: "bg-zeus-status-destructive",
        marker: "border-zeus-status-destructive",
        text: "text-zeus-status-destructive",
        glow: "shadow-[0_0_8px_rgba(231,93,87,0.5)]",
      },
    }

    const colors = statusColors[status]

    // Inline variant - arc gauge with text underneath
    if (variant === "inline") {
      // Arc gauge parameters
      const size = 60
      const strokeWidth = 6
      const radius = (size - strokeWidth) / 2
      const circumference = radius * Math.PI // Half circle
      const filledLength = (progressPercent / 100) * circumference

      // Get arc color based on status
      const arcColor = status === "safe"
        ? "#87D68A" // green
        : status === "close"
          ? "#FB9704" // orange
          : "#E75D57" // red

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                ref={ref}
                className={cn("flex flex-col items-center cursor-help", className)}
                {...props}
              >
                {/* Arc gauge */}
                <div className="relative" style={{ width: size, height: size / 2 + 6 }}>
                  <svg
                    width={size}
                    height={size / 2 + 6}
                    viewBox={`0 0 ${size} ${size / 2 + 6}`}
                    className="overflow-visible"
                  >
                    {/* Background arc */}
                    <path
                      d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                    />
                    {/* Filled arc */}
                    <path
                      d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
                      fill="none"
                      stroke={arcColor}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeDasharray={`${filledLength} ${circumference}`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  {/* Percentage inside arc */}
                  <div className="absolute inset-0 flex items-end justify-center pb-1">
                    <span className={cn("text-base font-bold leading-none tabular-nums", colors.text)}>
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                </div>
                {/* Label underneath */}
                <span className="text-[10px] text-zeus-text-tertiary uppercase tracking-wider mt-0.5">
                  from goal
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[200px]">
              <p className="text-xs leading-relaxed">
                <span className="font-semibold">Rank #{rank}</span> of {totalAgents} agents.
                <br />
                Stay above {eliminationThreshold} market cap to avoid elimination.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    // Default variant - full card display
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha p-3",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold tracking-wider text-zeus-text-tertiary uppercase">
            Elim. Progress
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-0.5 rounded hover:bg-zeus-surface-neutral transition-colors">
                  <Icon icon="circle-info" className="w-3.5 h-3.5 text-zeus-text-quaternary" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[200px]">
                <p className="text-xs">
                  Agents are ranked by market cap. Bottom performers risk elimination each round.
                  Stay above {eliminationThreshold} to remain safe.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-2">
          {/* Background track with segments */}
          <div className="h-2 rounded-full overflow-hidden flex">
            {/* Risk zone (0-20%) */}
            <div className="w-[20%] bg-zeus-status-destructive/20" />
            {/* Close zone (20-40%) */}
            <div className="w-[20%] bg-zeus-accent-orange/20" />
            {/* Safe zone (40-100%) */}
            <div className="w-[60%] bg-zeus-status-success/20" />
          </div>

          {/* Filled progress */}
          <div
            className={cn(
              "absolute top-0 left-0 h-2 rounded-full transition-all duration-500",
              colors.bar
            )}
            style={{ width: `${progressPercent}%` }}
          />

          {/* Position marker */}
          <div
            className="absolute top-full mt-0.5 -translate-x-1/2 transition-all duration-500"
            style={{ left: `${progressPercent}%` }}
          >
            <div
              className={cn(
                "w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent",
                colors.marker.replace("border-", "border-b-")
              )}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-caption-s text-zeus-text-secondary font-mono">
            #{rank} <span className="text-zeus-text-quaternary">of {totalAgents}</span>
          </span>
          <Badge variant={status} size="sm">
            {statusLabel}
          </Badge>
        </div>
      </div>
    )
  }
)

EliminationProgress.displayName = "EliminationProgress"

export { EliminationProgress, calculateStatus, getStatusLabel }
