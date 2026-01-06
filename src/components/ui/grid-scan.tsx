"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface GridScanProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Color for the grid lines and scan effect */
  color?: string
  /** Number of grid cells per row/column */
  gridSize?: number
}

/**
 * Animated grid scanning effect overlay
 * Requires @keyframes scan-x and scan-y to be defined in CSS
 */
const GridScan = React.forwardRef<HTMLDivElement, GridScanProps>(
  ({ className, color = "#f97316", gridSize = 12, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
        {...props}
      >
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: gridSize + 1 }).map((_, i) => (
            <React.Fragment key={i}>
              <line
                x1={`${(i / gridSize) * 100}%`}
                y1="0%"
                x2={`${(i / gridSize) * 100}%`}
                y2="100%"
                stroke={color}
                strokeOpacity={0.15}
                strokeWidth={1}
              />
              <line
                x1="0%"
                y1={`${(i / gridSize) * 100}%`}
                x2="100%"
                y2={`${(i / gridSize) * 100}%`}
                stroke={color}
                strokeOpacity={0.15}
                strokeWidth={1}
              />
            </React.Fragment>
          ))}
        </svg>

        {/* Scanning line - horizontal */}
        <div
          className="absolute left-0 right-0 h-[2px] animate-scan-y"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
          }}
        />

        {/* Scanning line - vertical */}
        <div
          className="absolute top-0 bottom-0 w-[2px] animate-scan-x"
          style={{
            background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
          }}
        />

        {/* Corner accents */}
        <div
          className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2"
          style={{ borderColor: color }}
        />
        <div
          className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2"
          style={{ borderColor: color }}
        />
        <div
          className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2"
          style={{ borderColor: color }}
        />
        <div
          className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2"
          style={{ borderColor: color }}
        />
      </div>
    )
  }
)

GridScan.displayName = "GridScan"

export { GridScan }
