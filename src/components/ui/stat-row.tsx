import * as React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

export interface StatRowProps {
  /** Label text displayed on the left */
  label: string
  /** Value displayed on the right */
  value: string | number
  /** Optional color class for the value */
  valueColor?: string
  /** Optional additional class names for the value */
  valueClassName?: string
  /** Optional icon to display before the label */
  labelIcon?: React.ReactNode
  /** Optional percentage change to display */
  change?: number
  /** Whether to show the bottom border */
  bordered?: boolean
  /** Size variant */
  size?: "sm" | "md"
  /** Additional class names */
  className?: string
}

/**
 * A row component for displaying label-value pairs with consistent styling.
 * Commonly used in detail cards and stat panels.
 */
export function StatRow({
  label,
  value,
  valueColor = "text-zeus-text-primary",
  valueClassName,
  labelIcon,
  change,
  bordered = true,
  size = "md",
  className
}: StatRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        size === "sm" ? "py-2" : "py-3",
        bordered && "border-b border-zeus-border-alpha last:border-b-0",
        className
      )}
    >
      <span
        className={cn(
          "text-zeus-text-tertiary flex items-center gap-1.5",
          size === "sm" ? "text-caption-s" : "text-caption-l"
        )}
      >
        {labelIcon}
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "font-medium tabular-nums",
            size === "sm" ? "text-caption-l" : "text-body-s",
            valueColor,
            valueClassName
          )}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {change !== undefined && (
          <span
            className={cn(
              "text-caption-s flex items-center gap-0.5",
              change >= 0 ? "text-zeus-status-success" : "text-zeus-status-destructive"
            )}
          >
            {change >= 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  )
}
