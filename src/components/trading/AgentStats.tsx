"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface AgentStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  marketCap: string
  change1h: number
  change24h: number
}

const AgentStats = React.forwardRef<HTMLDivElement, AgentStatsProps>(
  ({ className, marketCap, change1h, change24h, ...props }, ref) => {
    const formatChange = (value: number) => {
      const prefix = value >= 0 ? "+" : ""
      return `${prefix}${value.toFixed(2)}%`
    }

    const getChangeColor = (value: number) => {
      return value >= 0 ? "text-zeus-status-success" : "text-zeus-status-destructive"
    }

    return (
      <Card
        ref={ref}
        className={cn(
          "bg-zeus-surface-neutral border-zeus-border-alpha",
          className
        )}
        {...props}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-zeus-text-primary">Stats</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-zeus-text-secondary text-caption-l">
              Market Cap
            </span>
            <span className="text-zeus-text-primary font-semibold">
              {marketCap}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zeus-text-secondary text-caption-l">
              Change (1h)
            </span>
            <span className={cn("font-semibold", getChangeColor(change1h))}>
              {formatChange(change1h)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zeus-text-secondary text-caption-l">
              Change (24h)
            </span>
            <span className={cn("font-semibold", getChangeColor(change24h))}>
              {formatChange(change24h)}
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }
)

AgentStats.displayName = "AgentStats"

export { AgentStats }
