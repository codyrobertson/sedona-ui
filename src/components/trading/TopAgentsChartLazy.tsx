"use client"

import dynamic from "next/dynamic"
import type { TopAgentsChartProps } from "./TopAgentsChart"

/**
 * Lazy-loaded TopAgentsChart component
 *
 * Uses dynamic import to avoid loading lightweight-charts (~2.8MB)
 * until the chart is actually needed.
 */
export const TopAgentsChartLazy = dynamic<TopAgentsChartProps>(
  () => import("./TopAgentsChart").then((mod) => mod.TopAgentsChart),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl overflow-hidden bg-zeus-surface-default border border-zeus-border-alpha">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zeus-border-alpha">
          <div className="h-5 w-32 bg-zeus-surface-elevated animate-pulse rounded" />
          <div className="h-6 w-20 bg-zeus-surface-elevated animate-pulse rounded" />
        </div>
        <div className="h-[280px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-sedona-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-zeus-text-tertiary text-sm">Loading chart...</span>
          </div>
        </div>
      </div>
    ),
  }
)
