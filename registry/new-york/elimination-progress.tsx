"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { parseMarketCap } from "@/lib/trading-utils"

// =============================================================================
// TYPES
// =============================================================================

export type EliminationStatus = "safe" | "close" | "risk"

export interface EliminationProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Current rank (1 = best) */
  rank: number
  /** Total number of agents */
  totalAgents: number
  /** Current market cap (e.g., "$45.2K") */
  marketCap: string
  /** Elimination threshold (e.g., "$5K") */
  eliminationThreshold: string
  /** Display variant */
  variant?: "default" | "compact"
}

// =============================================================================
// HELPERS
// =============================================================================

function calculateStatus(
  rank: number,
  totalAgents: number,
  marketCap: string,
  threshold: string
): EliminationStatus {
  const rankPercentile = rank / totalAgents
  const mcapValue = parseMarketCap(marketCap)
  const thresholdValue = parseMarketCap(threshold)

  if (mcapValue < thresholdValue) return "risk"
  if (mcapValue < thresholdValue * 2 || rankPercentile > 0.8) return "close"
  if (rankPercentile > 0.6) return "close"
  return "safe"
}

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

const statusColors = {
  safe: {
    bar: "bg-green-500",
    text: "text-green-500",
    badge: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  close: {
    bar: "bg-yellow-500",
    text: "text-yellow-500",
    badge: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  risk: {
    bar: "bg-red-500",
    text: "text-red-500",
    badge: "bg-red-500/10 text-red-500 border-red-500/20",
  },
}

// =============================================================================
// COMPONENT
// =============================================================================

const EliminationProgress = React.forwardRef<
  HTMLDivElement,
  EliminationProgressProps
>(
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
    const status = calculateStatus(
      rank,
      totalAgents,
      marketCap,
      eliminationThreshold
    )
    const statusLabel = getStatusLabel(status)
    const colors = statusColors[status]

    // Progress position (inverted: rank 1 = 100%, rank N = 0%)
    const progressPercent = ((totalAgents - rank + 1) / totalAgents) * 100

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-3", className)}
          {...props}
        >
          {/* Mini progress bar */}
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", colors.bar)}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {/* Status badge */}
          <span
            className={cn(
              "px-2 py-0.5 text-[10px] font-semibold rounded border",
              colors.badge
            )}
          >
            {statusLabel}
          </span>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg bg-card border border-border p-4",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Elimination Progress
          </span>
          <span
            className={cn(
              "px-2 py-0.5 text-[10px] font-semibold rounded border",
              colors.badge
            )}
          >
            {statusLabel}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-3">
          {/* Background segments */}
          <div className="h-2 rounded-full overflow-hidden flex">
            <div className="w-[20%] bg-red-500/20" />
            <div className="w-[20%] bg-yellow-500/20" />
            <div className="w-[60%] bg-green-500/20" />
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
            className="absolute top-full mt-1 -translate-x-1/2 transition-all duration-500"
            style={{ left: `${progressPercent}%` }}
          >
            <div
              className={cn(
                "w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent",
                status === "safe" && "border-b-green-500",
                status === "close" && "border-b-yellow-500",
                status === "risk" && "border-b-red-500"
              )}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">
            Rank <span className="font-mono font-medium text-foreground">#{rank}</span>
            <span className="text-muted-foreground/60"> of {totalAgents}</span>
          </span>
          <span className="text-xs text-muted-foreground">
            Threshold: <span className="font-medium">{eliminationThreshold}</span>
          </span>
        </div>
      </div>
    )
  }
)

EliminationProgress.displayName = "EliminationProgress"

export { EliminationProgress, calculateStatus, getStatusLabel }
