"use client"

import dynamic from "next/dynamic"
import type { PriceChartProps } from "./PriceChart"

/**
 * Lazy-loaded PriceChart component
 *
 * Uses dynamic import to avoid loading lightweight-charts (~2.8MB)
 * until the chart is actually needed.
 */
export const PriceChartLazy = dynamic<PriceChartProps>(
  () => import("./PriceChart").then((mod) => mod.PriceChart),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl overflow-hidden bg-zeus-surface-default border border-zeus-border-alpha">
        <div className="flex items-center justify-between px-4 py-2 border-b border-zeus-border-alpha">
          <div className="flex items-center gap-1">
            {["1M", "5M", "1H", "1D"].map((tf) => (
              <div
                key={tf}
                className="px-2.5 py-1 rounded bg-zeus-surface-elevated animate-pulse w-8 h-6"
              />
            ))}
          </div>
        </div>
        <div className="h-[200px] sm:h-[260px] md:h-[320px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-sedona-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-zeus-text-tertiary text-sm">Loading chart...</span>
          </div>
        </div>
        <div className="px-4 py-2 border-t border-zeus-border-alpha">
          <div className="h-4 w-24 bg-zeus-surface-elevated animate-pulse rounded" />
        </div>
      </div>
    ),
  }
)
