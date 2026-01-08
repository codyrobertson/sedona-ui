"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  createChart,
  ColorType,
  CandlestickSeries,
  LineSeries,
  AreaSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type LineData,
  type Time,
} from "lightweight-charts"
import { CHART_COLORS, type ChartTimeframe } from "@/lib/trading-utils"

// =============================================================================
// TYPES
// =============================================================================

export type ChartType = "candlestick" | "line" | "area"

export interface PriceChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Candlestick OHLC data */
  data?: CandlestickData<Time>[]
  /** Line/Area data (alternative to candlestick) */
  lineData?: LineData<Time>[]
  /** Chart display type */
  chartType?: ChartType
  /** Available timeframes */
  timeframes?: ChartTimeframe[]
  /** Currently active timeframe */
  activeTimeframe?: ChartTimeframe
  /** Callback when timeframe changes */
  onTimeframeChange?: (timeframe: ChartTimeframe) => void
  /** Chart height */
  height?: number
  /** Show timeframe selector */
  showTimeframes?: boolean
  /** Show price scale */
  showPriceScale?: boolean
  /** Show time scale */
  showTimeScale?: boolean
  /** Custom colors (overrides CHART_COLORS) */
  colors?: Partial<typeof CHART_COLORS>
  /** Loading state */
  loading?: boolean
}

// =============================================================================
// COMPONENT
// =============================================================================

const PriceChart = React.forwardRef<HTMLDivElement, PriceChartProps>(
  (
    {
      className,
      data = [],
      lineData,
      chartType = "candlestick",
      timeframes = ["1h", "4h", "1d", "1w"],
      activeTimeframe: controlledTimeframe,
      onTimeframeChange,
      height = 300,
      showTimeframes = true,
      showPriceScale = true,
      showTimeScale = true,
      colors: customColors,
      loading = false,
      ...props
    },
    ref
  ) => {
    const chartContainerRef = React.useRef<HTMLDivElement>(null)
    const chartRef = React.useRef<IChartApi | null>(null)
    const seriesRef = React.useRef<ISeriesApi<"Candlestick" | "Line" | "Area"> | null>(null)
    const [mounted, setMounted] = React.useState(false)
    const [internalTimeframe, setInternalTimeframe] = React.useState<ChartTimeframe>(
      controlledTimeframe || timeframes[0] || "1d"
    )

    const colors = React.useMemo(
      () => ({ ...CHART_COLORS, ...customColors }),
      [customColors]
    )
    const currentTimeframe = controlledTimeframe ?? internalTimeframe

    const handleTimeframeChange = (tf: ChartTimeframe) => {
      if (onTimeframeChange) {
        onTimeframeChange(tf)
      } else {
        setInternalTimeframe(tf)
      }
    }

    // Mount tracking
    React.useEffect(() => {
      setMounted(true)
    }, [])

    // Initialize chart
    React.useEffect(() => {
      if (!mounted || !chartContainerRef.current) return

      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "transparent" },
          textColor: colors.text,
        },
        grid: {
          vertLines: { color: colors.grid },
          horzLines: { color: colors.grid },
        },
        crosshair: {
          vertLine: { color: colors.crosshair, width: 1, style: 2 },
          horzLine: { color: colors.crosshair, width: 1, style: 2 },
        },
        rightPriceScale: {
          borderColor: colors.border,
          visible: showPriceScale,
          scaleMargins: { top: 0.1, bottom: 0.1 },
        },
        timeScale: {
          borderColor: colors.border,
          visible: showTimeScale,
          timeVisible: true,
        },
        handleScroll: { mouseWheel: true, pressedMouseMove: true },
        handleScale: { mouseWheel: true, pinch: true },
        width: chartContainerRef.current.clientWidth,
        height,
      })

      chartRef.current = chart

      // Add series based on chart type
      if (chartType === "candlestick") {
        const series = chart.addSeries(CandlestickSeries, {
          upColor: colors.up,
          downColor: colors.down,
          borderUpColor: colors.up,
          borderDownColor: colors.down,
          wickUpColor: colors.up,
          wickDownColor: colors.down,
        })
        seriesRef.current = series
        if (data.length > 0) {
          series.setData(data)
        }
      } else if (chartType === "line") {
        const series = chart.addSeries(LineSeries, {
          color: colors.up,
          lineWidth: 2,
        })
        seriesRef.current = series
        if (lineData && lineData.length > 0) {
          series.setData(lineData)
        }
      } else if (chartType === "area") {
        const series = chart.addSeries(AreaSeries, {
          topColor: `${colors.up}40`,
          bottomColor: `${colors.up}00`,
          lineColor: colors.up,
          lineWidth: 2,
        })
        seriesRef.current = series
        if (lineData && lineData.length > 0) {
          series.setData(lineData)
        }
      }

      chart.timeScale().fitContent()

      // Resize handler
      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
          })
        }
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        if (chartRef.current) {
          chartRef.current.remove()
          chartRef.current = null
          seriesRef.current = null
        }
      }
    }, [mounted, chartType, height, showPriceScale, showTimeScale, colors])

    // Update data when it changes
    React.useEffect(() => {
      if (!seriesRef.current) return

      if (chartType === "candlestick" && data.length > 0) {
        seriesRef.current.setData(data as CandlestickData<Time>[])
      } else if (lineData && lineData.length > 0) {
        seriesRef.current.setData(lineData as LineData<Time>[])
      }

      chartRef.current?.timeScale().fitContent()
    }, [data, lineData, chartType])

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {/* Timeframe selector */}
          {showTimeframes && (
            <div className="flex items-center gap-1 px-3 py-2 border-b border-border">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => handleTimeframeChange(tf)}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                    currentTimeframe === tf
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {tf.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {/* Chart area */}
          <div className="relative" style={{ height }}>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            )}
            {!mounted ? (
              <div className="flex items-center justify-center h-full">
                <span className="text-muted-foreground text-sm">Loading chart...</span>
              </div>
            ) : (
              <div ref={chartContainerRef} className="w-full h-full" />
            )}
          </div>
        </div>
      </div>
    )
  }
)

PriceChart.displayName = "PriceChart"

export { PriceChart, CHART_COLORS }
