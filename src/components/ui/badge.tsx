"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Default badge - theme-aware background, proper contrast, mono for tokens only
        default:
          "bg-muted border border-border text-muted-foreground font-mono font-bold",
        // Success badge - theme-aware backgrounds with status colors
        success:
          "bg-muted border border-border text-emerald-600 font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal dark:text-zeus-status-success",
        // Danger badge - theme-aware with destructive colors
        danger:
          "bg-muted border border-border text-red-600 font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal dark:text-zeus-status-destructive",
        // Info badge - theme-aware with info colors
        info:
          "bg-muted border border-border text-blue-600 font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal dark:text-zeus-accent-blue",
        // Warning badge - theme-aware with warning colors
        warning:
          "bg-muted border border-border text-orange-600 font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal dark:text-zeus-accent-orange",
        // Standard shadcn variants for compatibility
        secondary:
          "bg-secondary border border-transparent text-secondary-foreground font-sans hover:bg-secondary/80",
        destructive:
          "bg-destructive border border-transparent text-destructive-foreground font-sans shadow hover:bg-destructive/80",
        outline: 
          "text-foreground border border-border bg-transparent font-sans",
        // Status badges - using theme-aware status colors
        safe:
          "bg-muted border border-border text-emerald-600 font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal dark:text-zeus-status-success",
        close:
          "bg-muted border border-border text-orange-600 font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal dark:text-zeus-accent-orange", 
        risk:
          "bg-muted border border-border text-red-600 font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal dark:text-zeus-status-destructive",
        // Brand badge - using Sedona brand colors
        brand:
          "bg-muted border border-border text-sedona-600 font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal dark:text-sedona-500",
      },
      size: {
        default: "px-1 py-0.5 text-[12px] leading-4 h-6",
        sm: "px-1 py-0.5 text-[10px] leading-[14px] h-5",
        lg: "px-2 py-1 text-[12px] leading-4 h-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

// Enhanced Badge Group component for complex badges with icons and multiple text sections
export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  label?: string
  value?: string
  variant?: 'info' | 'success' | 'warning' | 'danger'
}

function BadgeGroup({ className, icon, label, value, variant = 'info', ...props }: BadgeGroupProps) {
  const variantStyles = {
    info: 'text-zeus-accent-blue',
    success: 'text-zeus-status-success', 
    warning: 'text-zeus-accent-orange',
    danger: 'text-zeus-status-destructive'
  }

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-[5px] px-1 py-0.5 rounded text-[12px] leading-4 h-6",
        // Theme-aware backgrounds using proper semantic colors
        "bg-background border border-border dark:bg-zeus-surface-default dark:border-zeus-border-alpha",
        className
      )} 
      {...props}
    >
      {icon && (
        <div className={cn("flex items-center justify-center w-5 h-[14px] text-[14px] leading-[14px]", variantStyles[variant])}>
          {icon}
        </div>
      )}
      {label && (
        <span className="font-medium text-muted-foreground dark:text-zeus-text-secondary font-sans">
          {label}
        </span>
      )}
      {value && (
        <span className="font-medium text-foreground dark:text-zeus-text-primary font-sans">
          {value}
        </span>
      )}
    </div>
  )
}

export { Badge, BadgeGroup, badgeVariants }