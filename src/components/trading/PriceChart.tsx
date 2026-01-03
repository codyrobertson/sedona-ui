"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface PriceChartProps extends React.HTMLAttributes<HTMLDivElement> {
  ticker: string
  timeframes?: string[]
  activeTimeframe?: string
  onTimeframeChange?: (timeframe: string) => void
}

const PriceChart = React.forwardRef<HTMLDivElement, PriceChartProps>(
  (
    {
      className,
      ticker,
      timeframes = ["1m", "5m", "1h", "1d"],
      activeTimeframe = "1m",
      onTimeframeChange,
      ...props
    },
    ref
  ) => {
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
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-zeus-text-primary">
              ${ticker} Price
            </CardTitle>
          </div>
          {/* Timeframe buttons */}
          <div className="flex items-center gap-1 mt-2">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange?.(tf)}
                className={cn(
                  "px-2 py-1 rounded text-caption-m font-medium transition-colors",
                  tf === activeTimeframe
                    ? "bg-zeus-surface-neutral-subtle text-zeus-text-primary"
                    : "text-zeus-text-secondary hover:text-zeus-text-primary hover:bg-zeus-surface-neutral-subtle/50"
                )}
              >
                {tf}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {/* Chart placeholder - TradingView style */}
          <div className="relative h-[300px] bg-zeus-surface-default rounded-lg overflow-hidden">
            {/* Simulated chart bars */}
            <div className="absolute bottom-0 left-4 flex items-end gap-1 h-full pt-8">
              {/* Single bar representing price action */}
              <div
                className="w-24 bg-[#26a69a] rounded-t"
                style={{ height: '70%' }}
              />
            </div>

            {/* TradingView logo placeholder */}
            <div className="absolute bottom-4 left-4">
              <span className="text-zeus-text-tertiary font-bold text-lg">TV</span>
            </div>

            {/* Time label */}
            <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center px-4 border-t border-zeus-border-alpha">
              <span className="text-zeus-text-tertiary text-caption-s">16:53</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)

PriceChart.displayName = "PriceChart"

export { PriceChart }
