"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed rounded",
  {
    variants: {
      variant: {
        // Primary button - Sedona orange with full state handling
        default:
          "bg-sedona-500 text-white shadow-sm hover:bg-sedona-600 active:bg-sedona-700 focus-visible:ring-sedona-500/50 disabled:bg-sedona-500/50 disabled:text-white/70",
        // Brand button - Alias for default
        brand:
          "bg-sedona-500 text-white shadow-sm hover:bg-sedona-600 active:bg-sedona-700 focus-visible:ring-sedona-500/50 disabled:bg-sedona-500/50 disabled:text-white/70",
        // Secondary button - Visible raised surface (significantly lighter than bg)
        secondary:
          "bg-zeus-surface-neutral-subtle text-white border border-white/20 hover:bg-zeus-surface-neutral active:bg-zeus-surface-elevated focus-visible:ring-white/20 disabled:bg-zeus-surface-neutral-subtle/50 disabled:text-white/50 disabled:border-white/10",
        // Tertiary button - Frosted glass effect (clearly visible overlay)
        tertiary:
          "bg-white/[0.15] text-white hover:bg-white/[0.22] active:bg-white/[0.28] focus-visible:ring-white/20 disabled:bg-white/[0.08] disabled:text-white/40",
        // Ghost button - Truly invisible until hover
        ghost:
          "bg-transparent text-white/70 hover:text-white hover:bg-white/[0.10] active:bg-white/[0.15] focus-visible:ring-white/20 disabled:text-white/40 disabled:hover:bg-transparent",
        // Outline variant - Border only
        outline:
          "bg-transparent border border-white/[0.18] text-white hover:bg-white/[0.08] active:bg-white/[0.12] focus-visible:ring-white/20 disabled:border-white/[0.08] disabled:text-white/40",
        // Destructive button - Error red
        destructive:
          "bg-error-500 text-white shadow-sm hover:bg-error-700 active:bg-error-900 focus-visible:ring-error-500/50 disabled:bg-error-500/50 disabled:text-white/70",
        // Success status button
        safe:
          "bg-success-500 text-white shadow-sm hover:bg-success-700 active:bg-success-900 focus-visible:ring-success-500/50 disabled:bg-success-500/50 disabled:text-white/70",
        // Warning status button (yellow - needs dark text)
        close:
          "bg-warning-500 text-warning-900 shadow-sm hover:bg-warning-700 hover:text-white active:bg-warning-900 active:text-white focus-visible:ring-warning-500/50 disabled:bg-warning-500/50 disabled:text-warning-900/50",
        // Risk status button (alias for destructive)
        risk:
          "bg-error-500 text-white shadow-sm hover:bg-error-700 active:bg-error-900 focus-visible:ring-error-500/50 disabled:bg-error-500/50 disabled:text-white/70",
        // Link variant - Text only
        link:
          "bg-transparent text-sedona-500 underline-offset-4 hover:underline hover:text-sedona-600 active:text-sedona-700 disabled:text-sedona-500/50 disabled:no-underline",
        // Light variant - White button for dark backgrounds (swap CTAs)
        light:
          "bg-white text-zeus-surface-default shadow-sm hover:bg-white/90 active:bg-white/80 focus-visible:ring-white/50 disabled:bg-white/50 disabled:text-zeus-surface-default/50",
      },
      size: {
        default: "h-10 px-2.5 py-1.5 text-caption-l gap-0.5",
        sm: "h-8 px-2 py-1 text-caption-m gap-1", 
        lg: "h-12 px-6 py-3 text-body-s gap-2",
        icon: "h-10 w-10",
        xs: "h-6 px-2 py-1 text-caption-s gap-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  iconOnly?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon, iconPosition = "left", iconOnly = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // For icon-only buttons, use the icon size variant
    const buttonSize = iconOnly ? "icon" : size
    
    const content = iconOnly ? (
      icon
    ) : icon ? (
      iconPosition === "left" ? (
        <>
          {icon}
          {children}
        </>
      ) : (
        <>
          {children}
          {icon}
        </>
      )
    ) : (
      children
    )
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size: buttonSize, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }