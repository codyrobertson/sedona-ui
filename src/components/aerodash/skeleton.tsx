"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { radii } from "./tokens"
import "./skeleton.css"

/**
 * Skeleton — y2k loading placeholder.
 *
 *   <Skeleton className="h-4 w-32" />
 *   <Skeleton variant="circle" size={42} />
 *   <Skeleton width="80%" height={20} />
 *   <Skeleton variant="text" lines={3} />
 *
 * The shimmer keyframes live in skeleton.css.
 */

type Variant = "rect" | "circle" | "text"

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "width" | "height"> {
  variant?: Variant
  /** Square size for circle/rect. Sets width=height. */
  size?: number
  /** Width override (px or CSS unit). */
  width?: number | string
  /** Height override (px or CSS unit). */
  height?: number | string
  /** For text variant: number of stacked lines. */
  lines?: number
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, variant = "rect", size, width, height, lines = 1, style, ...props },
  ref,
) {
  if (variant === "text") {
    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)} style={style} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            data-ad-skeleton=""
            data-variant="text"
            className="block"
            style={{
              height: 12,
              width: i === lines - 1 ? "60%" : "100%",
              borderRadius: radii.xs,
            }}
          />
        ))}
      </div>
    )
  }

  const sizeFallback = size ?? (variant === "circle" ? 32 : undefined)
  return (
    <div
      ref={ref}
      data-ad-skeleton=""
      data-variant={variant}
      className={cn("block", className)}
      style={{
        width: width ?? sizeFallback,
        height: height ?? sizeFallback,
        borderRadius: variant === "circle" ? radii.pill : radii.sm,
        ...style,
      }}
      {...props}
    />
  )
})
