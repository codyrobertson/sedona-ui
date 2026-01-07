"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { createChart, LineSeries, ColorType, PriceScaleMode } from "lightweight-charts"
import type { IChartApi, ISeriesApi, LineData, Time } from "lightweight-charts"
import {
  type AgentHistory,
  filterHistoryByTimeframe,
  formatMarketCap,
} from "@/fixtures"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"

export interface TopAgentsChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Agent data with historical market cap */
  agents: AgentHistory[]
  /** Selected timeframe */
  timeframe?: "7d" | "30d"
  /** Callback when timeframe changes */
  onTimeframeChange?: (timeframe: "7d" | "30d") => void
  /** Current sort option */
  sortBy?: string
  /** Available sort options */
  sortOptions?: string[]
  /** Callback when sort changes */
  onSortChange?: (sort: string) => void
}

const TopAgentsChart = React.forwardRef<HTMLDivElement, TopAgentsChartProps>(
  (
    {
      className,
      agents,
      timeframe = "30d",
      onTimeframeChange,
      sortBy = "Highest Market Capitalization",
      sortOptions = [],
      onSortChange,
      ...props
    },
    ref
  ) => {
    const chartContainerRef = React.useRef<HTMLDivElement>(null)
    const chartRef = React.useRef<IChartApi | null>(null)
    const seriesRef = React.useRef<Map<string, ISeriesApi<"Line">>>(new Map())
    const [mounted, setMounted] = React.useState(false)

    // Mount state for SSR
    React.useEffect(() => {
      setMounted(true)
    }, [])

    // Initialize chart
    React.useEffect(() => {
      if (!mounted || !chartContainerRef.current) return

      // Create chart
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "transparent" },
          textColor: "rgba(255, 255, 255, 0.5)",
        },
        grid: {
          vertLines: { color: "rgba(255, 255, 255, 0.05)" },
          horzLines: { color: "rgba(255, 255, 255, 0.05)" },
        },
        crosshair: {
          vertLine: {
            color: "rgba(255, 255, 255, 0.2)",
            width: 1,
            style: 2,
          },
          horzLine: {
            color: "rgba(255, 255, 255, 0.2)",
            width: 1,
            style: 2,
          },
        },
        rightPriceScale: {
          borderColor: "rgba(255, 255, 255, 0.1)",
          mode: PriceScaleMode.Logarithmic,
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        timeScale: {
          borderColor: "rgba(255, 255, 255, 0.1)",
          timeVisible: false,
        },
        handleScroll: {
          mouseWheel: false,
          pressedMouseMove: false,
        },
        handleScale: {
          mouseWheel: false,
          pinch: false,
        },
      })

      chartRef.current = chart

      // Add line series for each agent
      agents.forEach((agent) => {
        const series = chart.addSeries(LineSeries, {
          color: agent.color,
          lineWidth: 2,
          priceFormat: {
            type: "custom",
            formatter: (price: number) => formatMarketCap(price),
          },
        })

        const filteredHistory = filterHistoryByTimeframe(agent.history, timeframe)
        series.setData(filteredHistory as LineData<Time>[])
        seriesRef.current.set(agent.ticker, series)
      })

      // Fit content
      chart.timeScale().fitContent()

      // Handle resize with ResizeObserver
      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          const { clientWidth, clientHeight } = chartContainerRef.current
          chartRef.current.applyOptions({
            width: clientWidth,
            height: clientHeight,
          })
          chartRef.current.timeScale().fitContent()
        }
      }

      handleResize()

      const resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(chartContainerRef.current)

      return () => {
        resizeObserver.disconnect()
        seriesRef.current.clear()
        if (chartRef.current) {
          chartRef.current.remove()
          chartRef.current = null
        }
      }
    }, [mounted, agents, timeframe])

    // Update data when timeframe changes
    React.useEffect(() => {
      if (!chartRef.current) return

      agents.forEach((agent) => {
        const series = seriesRef.current.get(agent.ticker)
        if (series) {
          const filteredHistory = filterHistoryByTimeframe(agent.history, timeframe)
          series.setData(filteredHistory as LineData<Time>[])
        }
      })

      chartRef.current.timeScale().fitContent()
    }, [agents, timeframe])

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden bg-zeus-surface-default border border-zeus-border-alpha min-w-0",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-zeus-border-alpha">
          {/* Title */}
          <h2 className="text-heading-lg font-bold text-zeus-text-primary mb-2">
            Trending Agents
          </h2>
          {/* Sorting + Timeframe Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-zeus-text-secondary text-caption-l">Sorting by</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-zeus-text-primary text-caption-l font-medium hover:text-sedona-500 transition-colors focus:outline-none">
                    {sortBy}
                    <Icon icon="chevron-down" className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[250px]">
                  <DropdownMenuRadioGroup
                    value={sortBy}
                    onValueChange={(value) => onSortChange?.(value)}
                  >
                    {sortOptions.map((option) => (
                      <DropdownMenuRadioItem
                        key={option}
                        value={option}
                      >
                        {option}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <ToggleGroup
              type="single"
              value={timeframe}
              onValueChange={(value) => {
                if (value) onTimeframeChange?.(value as "7d" | "30d")
              }}
              className="gap-1"
            >
              <ToggleGroupItem
                value="7d"
                size="sm"
                className={cn(
                  "h-7 px-2.5 text-caption-s font-medium rounded-md",
                  timeframe === "7d"
                    ? "bg-sedona-500 text-white"
                    : "bg-zeus-surface-elevated text-zeus-text-tertiary hover:text-zeus-text-secondary"
                )}
              >
                7D
              </ToggleGroupItem>
              <ToggleGroupItem
                value="30d"
                size="sm"
                className={cn(
                  "h-7 px-2.5 text-caption-s font-medium rounded-md",
                  timeframe === "30d"
                    ? "bg-sedona-500 text-white"
                    : "bg-zeus-surface-elevated text-zeus-text-tertiary hover:text-zeus-text-secondary"
                )}
              >
                30D
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[250px] px-2 overflow-hidden">
          {!mounted ? (
            <div className="h-full flex items-center justify-center">
              <span className="text-zeus-text-tertiary text-caption-s">Loading chart...</span>
            </div>
          ) : (
            <div ref={chartContainerRef} className="w-full h-full max-w-full" />
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-3 border-t border-zeus-border-alpha">
          {agents.map((agent) => (
            <div key={agent.ticker} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: agent.color }}
              />
              <span className="text-zeus-text-secondary text-caption-s font-medium">
                {agent.ticker}
              </span>
              <span className="text-zeus-text-quaternary text-caption-s">
                {formatMarketCap(agent.currentMarketCap)}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

TopAgentsChart.displayName = "TopAgentsChart"

export { TopAgentsChart }
