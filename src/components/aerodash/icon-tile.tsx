"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * IconTile — the inset rounded-square icon container used inside Buttons,
 * SectionHeaders, and ListItems. Inverts the surrounding chrome's color so the
 * tile reads as a notched-in punch-out (dark tile on light pill, etc.).
 *
 * Inherits color from the parent's `--ad-fill` / `--ad-stroke` CSS variables
 * (set by Chrome). Override with `tone="custom"` + className when needed.
 */

export const iconTileVariants = cva(
  "relative z-10 grid place-items-center rounded-[6px] [&>svg]:block",
  {
    variants: {
      size: {
        sm: "h-[22px] w-[22px] [&>svg]:h-[12px] [&>svg]:w-[12px]",
        md: "h-[28px] w-[28px] [&>svg]:h-[15px] [&>svg]:w-[15px]",
        lg: "h-[34px] w-[34px] [&>svg]:h-[18px] [&>svg]:w-[18px]",
      },
      tone: {
        // Inverts the parent chrome (dark tile on light bg, light tile on dark bg)
        invert: "bg-[var(--ad-stroke)] text-[var(--ad-fill)]",
        // Same color as parent chrome
        match: "bg-[var(--ad-fill)] text-[var(--ad-stroke)]",
        // Outline only
        outline: "border-[1.5px] border-[var(--ad-stroke)] bg-transparent text-[var(--ad-stroke)]",
      },
    },
    defaultVariants: { size: "md", tone: "invert" },
  },
)

export interface IconTileProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconTileVariants> {}

export const IconTile = React.forwardRef<HTMLSpanElement, IconTileProps>(function IconTile(
  { className, size, tone, children, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn(iconTileVariants({ size, tone }), className)} {...props}>
      {children}
    </span>
  )
})
