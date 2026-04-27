"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Chrome — the AeroDash signature shape: rounded left cap, flat top/bottom,
 * triangular tip on the right. Sized to its parent via ResizeObserver so the
 * stroke stays a clean 1.5px regardless of width. Variants drive fill/stroke/dash.
 *
 * Render Chrome inside a `position: relative` parent. It absolutely positions
 * itself to the parent's box and projects the tip past `right: 0` by `tipLen`.
 */

export const chromeVariants = cva("pointer-events-none absolute left-0 top-0 z-0 overflow-visible", {
  variants: {
    variant: {
      default: "[--ad-fill:#fff] [--ad-stroke:#05070b] [--ad-dash:0]",
      active: "[--ad-fill:#00c8ff] [--ad-stroke:#05070b] [--ad-dash:0]",
      dark: "[--ad-fill:#05070b] [--ad-stroke:#05070b] [--ad-dash:0]",
      dotted: "[--ad-fill:#fff] [--ad-stroke:#05070b] [--ad-dash:5_4]",
    },
  },
  defaultVariants: { variant: "default" },
})

export interface ChromeProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "viewBox" | "preserveAspectRatio">,
    VariantProps<typeof chromeVariants> {
  /** Element whose box dictates Chrome's size. */
  targetRef: React.RefObject<HTMLElement | null>

  /** Length of the triangular tip past the parent's right edge. */
  tipLen?: number
  /** Stroke width in CSS px (kept consistent via vectorEffect). */
  strokeWidth?: number
}

export const Chrome = React.forwardRef<SVGSVGElement, ChromeProps>(function Chrome(
  { targetRef, tipLen = 18, strokeWidth = 1.5, variant, className, ...props },
  ref,
) {
  const [size, setSize] = React.useState({ w: 0, h: 0 })

  React.useLayoutEffect(() => {
    const el = targetRef.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [targetRef])

  if (!size.w || !size.h) return null

  const r = size.h / 2
  const mid = size.h / 2
  const tipBase = size.w
  const tipPoint = size.w + tipLen
  const fullW = tipPoint + 2

  const d = [
    `M ${r} 0`,
    `H ${tipBase}`,
    `L ${tipPoint} ${mid}`,
    `L ${tipBase} ${size.h}`,
    `H ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    "Z",
  ].join(" ")

  return (
    <svg
      ref={ref}
      aria-hidden
      className={cn(chromeVariants({ variant }), className)}
      style={{ width: fullW, height: size.h }}
      viewBox={`0 0 ${fullW} ${size.h}`}
      preserveAspectRatio="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path
        d={d}
        fill="var(--ad-fill)"
        stroke="var(--ad-stroke)"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
        strokeDasharray="var(--ad-dash)"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
})
