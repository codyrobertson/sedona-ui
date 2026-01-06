"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Elevated surface variants using Zeus design tokens
 * Use these for consistent elevated UI elements throughout the app
 */
export const elevatedVariants = cva(
  "bg-zeus-surface-elevated border border-zeus-border-alpha",
  {
    variants: {
      rounded: {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      rounded: "md",
    },
  }
)

export interface ElevatedBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof elevatedVariants> {}

/**
 * Generic elevated container component
 */
const ElevatedBox = React.forwardRef<HTMLDivElement, ElevatedBoxProps>(
  ({ className, rounded, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(elevatedVariants({ rounded }), className)}
      {...props}
    />
  )
)
ElevatedBox.displayName = "ElevatedBox"

/**
 * Quick action button variants - used for percentage buttons, small actions
 */
export const quickButtonVariants = cva(
  "bg-zeus-surface-elevated border border-zeus-border-alpha text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors cursor-pointer",
  {
    variants: {
      size: {
        xs: "px-1.5 py-0.5 text-[10px] rounded",
        sm: "px-2 py-0.5 text-[10px] rounded",
        md: "px-2 py-1 text-caption-s rounded-md",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
)

export interface QuickButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof quickButtonVariants> {}

/**
 * Small quick action button for percentages, toggles, etc.
 */
const QuickButton = React.forwardRef<HTMLButtonElement, QuickButtonProps>(
  ({ className, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(quickButtonVariants({ size }), className)}
      {...props}
    />
  )
)
QuickButton.displayName = "QuickButton"

/**
 * Slippage button with special styling
 */
export interface SlippageButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  slippage: string
}

const SlippageButton = React.forwardRef<HTMLButtonElement, SlippageButtonProps>(
  ({ className, slippage, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex items-center gap-1 px-2 py-0.5 rounded bg-zeus-surface-elevated text-[10px]",
        className
      )}
      {...props}
    >
      <span className="text-zeus-text-tertiary">Slip:</span>
      <span className="text-sedona-500 font-medium">{slippage}</span>
    </button>
  )
)
SlippageButton.displayName = "SlippageButton"

export { ElevatedBox, QuickButton, SlippageButton }
