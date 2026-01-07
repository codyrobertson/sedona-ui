"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { createChart, ColorType, CandlestickSeries, IChartApi, ISeriesApi, PriceScaleMode } from "lightweight-charts"
import { Icon } from "@/components/ui/icon"
import { getChartDataForTicker, CHART_COLORS, type TickResolution } from "@/fixtures"

// Re-export for compatibility
type ChartTimeframe = TickResolution
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

type DateRange = "7d" | "30d" | "90d" | "1y" | "all"

const DATE_RANGE_LABELS: Record<DateRange, string> = {
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
  "90d": "Last 90 Days",
  "1y": "Last Year",
  "all": "All Time",
}

export interface PriceChartProps extends React.HTMLAttributes<HTMLDivElement> {
  ticker: string
  timeframes?: ChartTimeframe[]
  activeTimeframe?: ChartTimeframe
  onTimeframeChange?: (timeframe: ChartTimeframe) => void
}

const PriceChart = React.forwardRef<HTMLDivElement, PriceChartProps>(
  (
    {
      className,
      ticker,
      timeframes = ["1m", "5m", "1h", "1d"],
      activeTimeframe = "1d",
      onTimeframeChange,
      ...props
    },
    ref
  ) => {
    const chartContainerRef = React.useRef<HTMLDivElement>(null)
    const chartRef = React.useRef<IChartApi | null>(null)
    const seriesRef = React.useRef<ISeriesApi<"Candlestick"> | null>(null)
    const [mounted, setMounted] = React.useState(false)
    const [internalTimeframe, setInternalTimeframe] = React.useState<ChartTimeframe>(activeTimeframe)
    const [scaleMode, setScaleMode] = React.useState<"normal" | "percent" | "log">("normal")
    const [dateRange, setDateRange] = React.useState<DateRange>("all")

    // Use controlled or uncontrolled timeframe
    const currentTimeframe = onTimeframeChange ? activeTimeframe : internalTimeframe

    const handleTimeframeChange = (tf: ChartTimeframe) => {
      if (onTimeframeChange) {
        onTimeframeChange(tf)
      } else {
        setInternalTimeframe(tf)
      }
    }

    const handleScaleModeChange = (mode: "normal" | "percent" | "log") => {
      setScaleMode(mode)
      if (chartRef.current) {
        const priceScaleMode = mode === "log"
          ? PriceScaleMode.Logarithmic
          : mode === "percent"
            ? PriceScaleMode.Percentage
            : PriceScaleMode.Normal
        chartRef.current.applyOptions({
          rightPriceScale: {
            mode: priceScaleMode,
          },
        })
      }
    }

    const handleAutoFit = () => {
      if (chartRef.current) {
        chartRef.current.timeScale().fitContent()
      }
    }

    // Track mount state
    React.useEffect(() => {
      setMounted(true)
    }, [])

    // Initialize chart
    React.useEffect(() => {
      if (!mounted || !chartContainerRef.current) return

      // Create chart
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: CHART_COLORS.text,
        },
        grid: {
          vertLines: { color: CHART_COLORS.grid },
          horzLines: { color: CHART_COLORS.grid },
        },
        crosshair: {
          vertLine: {
            color: CHART_COLORS.crosshair,
            width: 1,
            style: 2,
          },
          horzLine: {
            color: CHART_COLORS.crosshair,
            width: 1,
            style: 2,
          },
        },
        rightPriceScale: {
          borderColor: CHART_COLORS.border,
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        timeScale: {
          borderColor: CHART_COLORS.border,
          timeVisible: currentTimeframe === "1d",
          secondsVisible: false,
        },
        handleScroll: {
          mouseWheel: true,
          pressedMouseMove: true,
        },
        handleScale: {
          mouseWheel: true,
          pinch: true,
        },
      })

      chartRef.current = chart

      // Add candlestick series
      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: CHART_COLORS.up,
        downColor: CHART_COLORS.down,
        borderUpColor: CHART_COLORS.up,
        borderDownColor: CHART_COLORS.down,
        wickUpColor: CHART_COLORS.up,
        wickDownColor: CHART_COLORS.down,
      })

      seriesRef.current = candlestickSeries

      // Set initial data for this agent
      const data = getChartDataForTicker(ticker, currentTimeframe)
      candlestickSeries.setData(data)

      // Fit content
      chart.timeScale().fitContent()

      // Handle resize
      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
          })
        }
      }

      handleResize()
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (chartRef.current) {
          chartRef.current.remove()
          chartRef.current = null
          seriesRef.current = null
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted]) // Only recreate chart on mount - data updates handled separately

    // Update data when timeframe or ticker changes
    React.useEffect(() => {
      if (!mounted || !seriesRef.current || !chartRef.current) return

      const data = getChartDataForTicker(ticker, currentTimeframe)
      seriesRef.current.setData(data)

      // Update time scale visibility based on timeframe
      chartRef.current.applyOptions({
        timeScale: {
          timeVisible: currentTimeframe === "1d",
        },
      })

      chartRef.current.timeScale().fitContent()
    }, [ticker, currentTimeframe, mounted])

    return (
      <div
        ref={ref}
        className={cn(className)}
        {...props}
      >
        {/* Chart Container */}
        <div className="relative rounded-xl overflow-hidden bg-zeus-surface-default border border-zeus-border-alpha">
          {/* Chart Header with Timeframes */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-zeus-border-alpha">
            <div className="flex items-center gap-1">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => handleTimeframeChange(tf)}
                  className={cn(
                    "px-2.5 py-1 rounded text-caption-s font-medium transition-colors",
                    currentTimeframe === tf
                      ? "bg-sedona-500 text-white"
                      : "text-zeus-text-tertiary hover:text-zeus-text-secondary hover:bg-zeus-surface-elevated"
                  )}
                >
                  {tf.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-caption-s">
              <span className="text-zeus-text-tertiary">${ticker}</span>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-[200px] sm:h-[260px] md:h-[320px]">
            {!mounted ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-zeus-text-tertiary">Loading chart...</span>
              </div>
            ) : (
              <div ref={chartContainerRef} className="w-full h-full" />
            )}
          </div>

          {/* Chart Footer Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-zeus-border-alpha">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-zeus-text-tertiary text-caption-s hover:text-zeus-text-secondary transition-colors">
                  {DATE_RANGE_LABELS[dateRange]}
                  <Icon icon="chevron-down" className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="min-w-[140px] bg-zeus-surface-neutral border-zeus-border-alpha"
              >
                <DropdownMenuRadioGroup
                  value={dateRange}
                  onValueChange={(value) => setDateRange(value as DateRange)}
                >
                  {(Object.keys(DATE_RANGE_LABELS) as DateRange[]).map((range) => (
                    <DropdownMenuRadioItem
                      key={range}
                      value={range}
                      className={cn(
                        "px-3 py-1.5 cursor-pointer text-caption-s",
                        range === dateRange
                          ? "text-sedona-500 bg-zeus-surface-neutral-subtle"
                          : "text-zeus-text-primary hover:bg-zeus-surface-neutral-subtle"
                      )}
                    >
                      {DATE_RANGE_LABELS[range]}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-3 text-caption-s">
              <span className="text-zeus-text-tertiary" suppressHydrationWarning>
                {new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' })} (UTC)
              </span>
              <span className="text-zeus-text-quaternary">|</span>
              <button
                onClick={() => handleScaleModeChange(scaleMode === "percent" ? "normal" : "percent")}
                className={cn(
                  "transition-colors hover:text-zeus-text-secondary",
                  scaleMode === "percent" ? "text-sedona-500 font-medium" : "text-zeus-text-tertiary"
                )}
              >
                %
              </button>
              <button
                onClick={() => handleScaleModeChange(scaleMode === "log" ? "normal" : "log")}
                className={cn(
                  "transition-colors hover:text-zeus-text-secondary",
                  scaleMode === "log" ? "text-sedona-500 font-medium" : "text-zeus-text-tertiary"
                )}
              >
                log
              </button>
              <button
                onClick={handleAutoFit}
                className="text-sedona-500 font-medium hover:text-sedona-400 transition-colors"
              >
                auto
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

PriceChart.displayName = "PriceChart"

export { PriceChart }
