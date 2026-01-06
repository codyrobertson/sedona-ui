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
          "bg-muted border border-border text-muted-foreground font-mono font-bold dark:bg-zeus-surface-neutral dark:border-zeus-border-alpha dark:text-zeus-text-secondary",
        // Success badge - theme-aware backgrounds with status colors
        success:
          "bg-muted border border-border text-zeus-status-success font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal",
        // Danger badge - theme-aware with destructive colors
        danger:
          "bg-muted border border-border text-zeus-status-destructive font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal",
        // Info badge - theme-aware with info colors
        info:
          "bg-muted border border-border text-zeus-accent-blue font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal",
        // Warning badge - theme-aware with warning colors
        warning:
          "bg-muted border border-border text-zeus-accent-orange font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal",
        // Standard shadcn variants for compatibility
        secondary:
          "bg-secondary border border-transparent text-secondary-foreground font-sans hover:bg-secondary/80 dark:bg-zeus-surface-neutral dark:text-zeus-text-primary",
        destructive:
          "bg-destructive border border-transparent text-destructive-foreground font-sans shadow hover:bg-destructive/80 dark:bg-zeus-status-destructive",
        outline:
          "text-foreground border border-border bg-transparent font-sans dark:text-zeus-text-primary dark:border-zeus-border-alpha",
        // Status badges - using theme-aware status colors
        safe:
          "bg-muted border border-border text-zeus-status-success font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal",
        close:
          "bg-muted border border-border text-zeus-accent-orange font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal",
        risk:
          "bg-muted border border-border text-zeus-status-destructive font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal",
        // Brand badge - using Sedona brand colors
        brand:
          "bg-muted border border-border text-sedona-500 font-sans font-semibold dark:bg-zeus-surface-default dark:border-zeus-border-normal",
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
        "inline-flex items-center gap-[5px] px-2 py-1 rounded text-[12px] leading-4",
        "bg-zeus-surface-neutral border border-zeus-border-alpha",
        className
      )}
      {...props}
    >
      {icon && (
        <div className={cn("flex items-center justify-center", variantStyles[variant])}>
          {icon}
        </div>
      )}
      {label && (
        <span className="font-medium text-zeus-text-secondary font-sans">
          {label}
        </span>
      )}
      {value && (
        <span className="font-medium text-zeus-text-primary font-sans">
          {value}
        </span>
      )}
    </div>
  )
}

export { Badge, BadgeGroup, badgeVariants }