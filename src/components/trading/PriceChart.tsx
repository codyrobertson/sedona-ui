"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { createChart, ColorType, CandlestickData, Time, CandlestickSeries } from "lightweight-charts"
import { ChevronDown } from "lucide-react"

export interface PriceChartProps extends React.HTMLAttributes<HTMLDivElement> {
  ticker: string
  timeframes?: string[]
  activeTimeframe?: string
  onTimeframeChange?: (timeframe: string) => void
}

// Realistic OHLC data - meme coin pump pattern
const CHART_DATA: CandlestickData<Time>[] = [
  // Early accumulation phase - low volume, sideways
  { time: '2024-11-01' as Time, open: 0.00021, high: 0.00024, low: 0.00019, close: 0.00022 },
  { time: '2024-11-02' as Time, open: 0.00022, high: 0.00023, low: 0.00020, close: 0.00021 },
  { time: '2024-11-03' as Time, open: 0.00021, high: 0.00025, low: 0.00020, close: 0.00024 },
  { time: '2024-11-04' as Time, open: 0.00024, high: 0.00026, low: 0.00022, close: 0.00023 },
  { time: '2024-11-05' as Time, open: 0.00023, high: 0.00024, low: 0.00021, close: 0.00022 },
  { time: '2024-11-06' as Time, open: 0.00022, high: 0.00023, low: 0.00019, close: 0.00020 },
  { time: '2024-11-07' as Time, open: 0.00020, high: 0.00022, low: 0.00018, close: 0.00021 },
  // First pump starts
  { time: '2024-11-08' as Time, open: 0.00021, high: 0.00028, low: 0.00020, close: 0.00027 },
  { time: '2024-11-09' as Time, open: 0.00027, high: 0.00035, low: 0.00025, close: 0.00033 },
  { time: '2024-11-10' as Time, open: 0.00033, high: 0.00042, low: 0.00031, close: 0.00039 },
  { time: '2024-11-11' as Time, open: 0.00039, high: 0.00045, low: 0.00036, close: 0.00041 },
  // Pullback
  { time: '2024-11-12' as Time, open: 0.00041, high: 0.00043, low: 0.00032, close: 0.00034 },
  { time: '2024-11-13' as Time, open: 0.00034, high: 0.00038, low: 0.00030, close: 0.00036 },
  { time: '2024-11-14' as Time, open: 0.00036, high: 0.00039, low: 0.00033, close: 0.00035 },
  // Consolidation
  { time: '2024-11-15' as Time, open: 0.00035, high: 0.00038, low: 0.00034, close: 0.00037 },
  { time: '2024-11-16' as Time, open: 0.00037, high: 0.00040, low: 0.00035, close: 0.00038 },
  { time: '2024-11-17' as Time, open: 0.00038, high: 0.00041, low: 0.00036, close: 0.00039 },
  // Second leg up
  { time: '2024-11-18' as Time, open: 0.00039, high: 0.00048, low: 0.00038, close: 0.00046 },
  { time: '2024-11-19' as Time, open: 0.00046, high: 0.00055, low: 0.00044, close: 0.00052 },
  { time: '2024-11-20' as Time, open: 0.00052, high: 0.00058, low: 0.00049, close: 0.00054 },
  { time: '2024-11-21' as Time, open: 0.00054, high: 0.00062, low: 0.00052, close: 0.00059 },
  { time: '2024-11-22' as Time, open: 0.00059, high: 0.00068, low: 0.00057, close: 0.00065 },
  // Minor dip
  { time: '2024-11-23' as Time, open: 0.00065, high: 0.00067, low: 0.00058, close: 0.00060 },
  { time: '2024-11-24' as Time, open: 0.00060, high: 0.00064, low: 0.00056, close: 0.00062 },
  // Rally continues
  { time: '2024-11-25' as Time, open: 0.00062, high: 0.00072, low: 0.00060, close: 0.00070 },
  { time: '2024-11-26' as Time, open: 0.00070, high: 0.00078, low: 0.00068, close: 0.00075 },
  { time: '2024-11-27' as Time, open: 0.00075, high: 0.00082, low: 0.00073, close: 0.00079 },
  { time: '2024-11-28' as Time, open: 0.00079, high: 0.00088, low: 0.00076, close: 0.00085 },
  { time: '2024-11-29' as Time, open: 0.00085, high: 0.00092, low: 0.00082, close: 0.00089 },
  { time: '2024-11-30' as Time, open: 0.00089, high: 0.00095, low: 0.00086, close: 0.00091 },
  // December - major pump
  { time: '2024-12-01' as Time, open: 0.00091, high: 0.00098, low: 0.00088, close: 0.00096 },
  { time: '2024-12-02' as Time, open: 0.00096, high: 0.00105, low: 0.00094, close: 0.00102 },
  { time: '2024-12-03' as Time, open: 0.00102, high: 0.00112, low: 0.00100, close: 0.00108 },
  { time: '2024-12-04' as Time, open: 0.00108, high: 0.00118, low: 0.00105, close: 0.00115 },
  { time: '2024-12-05' as Time, open: 0.00115, high: 0.00125, low: 0.00112, close: 0.00120 },
  { time: '2024-12-06' as Time, open: 0.00120, high: 0.00128, low: 0.00116, close: 0.00118 },
  { time: '2024-12-07' as Time, open: 0.00118, high: 0.00124, low: 0.00110, close: 0.00114 },
  { time: '2024-12-08' as Time, open: 0.00114, high: 0.00122, low: 0.00112, close: 0.00119 },
  // Parabolic move
  { time: '2024-12-09' as Time, open: 0.00119, high: 0.00135, low: 0.00117, close: 0.00132 },
  { time: '2024-12-10' as Time, open: 0.00132, high: 0.00148, low: 0.00130, close: 0.00145 },
  { time: '2024-12-11' as Time, open: 0.00145, high: 0.00158, low: 0.00142, close: 0.00152 },
  { time: '2024-12-12' as Time, open: 0.00152, high: 0.00165, low: 0.00148, close: 0.00160 },
  { time: '2024-12-13' as Time, open: 0.00160, high: 0.00172, low: 0.00155, close: 0.00168 },
  { time: '2024-12-14' as Time, open: 0.00168, high: 0.00178, low: 0.00162, close: 0.00170 },
  { time: '2024-12-15' as Time, open: 0.00170, high: 0.00175, low: 0.00158, close: 0.00162 },
  { time: '2024-12-16' as Time, open: 0.00162, high: 0.00168, low: 0.00155, close: 0.00165 },
  { time: '2024-12-17' as Time, open: 0.00165, high: 0.00175, low: 0.00162, close: 0.00172 },
  { time: '2024-12-18' as Time, open: 0.00172, high: 0.00185, low: 0.00170, close: 0.00180 },
  { time: '2024-12-19' as Time, open: 0.00180, high: 0.00195, low: 0.00178, close: 0.00188 },
  { time: '2024-12-20' as Time, open: 0.00188, high: 0.00198, low: 0.00182, close: 0.00192 },
  { time: '2024-12-21' as Time, open: 0.00192, high: 0.00205, low: 0.00188, close: 0.00200 },
]

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
          textColor: 'rgba(255, 255, 255, 0.5)',
        },
        grid: {
          vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
          horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
        },
        crosshair: {
          vertLine: {
            color: 'rgba(255, 255, 255, 0.2)',
            width: 1,
            style: 2,
          },
          horzLine: {
            color: 'rgba(255, 255, 255, 0.2)',
            width: 1,
            style: 2,
          },
        },
        rightPriceScale: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        timeScale: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
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
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderUpColor: '#26a69a',
        borderDownColor: '#ef5350',
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      })

      candlestickSeries.setData(CHART_DATA)

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
