"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { createChart, ColorType, CandlestickSeries } from "lightweight-charts"
import { ChevronDown } from "lucide-react"
import { MEME_COIN_CHART_DATA, CHART_COLORS } from "@/fixtures/chart-data"

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
    const chartContainerRef = React.useRef<HTMLDivElement>(null)
    const chartRef = React.useRef<ReturnType<typeof createChart> | null>(null)
    const [mounted, setMounted] = React.useState(false)

    // Track mount state
    React.useEffect(() => {
      setMounted(true)
    }, [])

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
          timeVisible: true,
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

      candlestickSeries.setData(MEME_COIN_CHART_DATA)

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
        }
      }
    }, [mounted])

    return (
      <div
        ref={ref}
        className={cn(className)}
        {...props}
      >
        {/* Chart Container */}
        <div className="relative rounded-xl overflow-hidden bg-zeus-surface-default border border-zeus-border-alpha">
          {/* Chart Area */}
          <div className="h-[320px]">
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
            <button className="flex items-center gap-1 text-zeus-text-tertiary text-caption-s hover:text-zeus-text-secondary transition-colors">
              Date Range
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-3 text-caption-s">
              <span className="text-zeus-text-tertiary">09:27:02 (UTC)</span>
              <span className="text-zeus-text-quaternary">|</span>
              <span className="text-zeus-text-tertiary">%</span>
              <span className="text-zeus-text-tertiary">log</span>
              <span className="text-sedona-500 font-medium">auto</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

PriceChart.displayName = "PriceChart"

export { PriceChart }
