"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatsGridItem {
  label: string
  value: string | number
  change?: number
}

export interface StatsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: StatsGridItem[]
  columns: number
  size?: "sm" | "md"
}

const StatsGrid = React.forwardRef<HTMLDivElement, StatsGridProps>(
  ({ className, items, columns, size = "md", ...props }, ref) => {
    const gridColsClass = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    }[columns] || "grid-cols-3"

    const sizeStyles = {
      sm: {
        container: "py-1.5",
        label: "text-[8px]",
        value: "text-[11px]",
      },
      md: {
        container: "py-2",
        label: "text-[9px]",
        value: "text-caption-s",
      },
    }

    const styles = sizeStyles[size]

    return (
      <div
        ref={ref}
        className={cn("grid gap-1.5", gridColsClass, className)}
        {...props}
      >
        {items.map(({ label, value, change }) => {
          const isChangeValue = change !== undefined
          const displayValue = isChangeValue
            ? `${change >= 0 ? "+" : ""}${typeof change === "number" ? change.toFixed(1) : change}%`
            : value

          const valueColor = isChangeValue
            ? change >= 0
              ? "text-zeus-status-success"
              : "text-zeus-status-destructive"
            : "text-zeus-text-primary"

          return (
            <div
              key={label}
              className={cn(
                "rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha text-center",
                styles.container
              )}
            >
              <div className={cn("text-zeus-text-quaternary uppercase", styles.label)}>
                {label}
              </div>
              <div className={cn("font-semibold", styles.value, valueColor)}>
                {displayValue}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)

StatsGrid.displayName = "StatsGrid"

export { StatsGrid }
