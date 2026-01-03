import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded",
  {
    variants: {
      variant: {
        // Primary button - Sedona orange
        default:
          "bg-sedona-500 text-white shadow-sm hover:bg-sedona-600",
        // Brand button - Sedona orange (alias for default)
        brand:
          "bg-sedona-500 text-white shadow-sm hover:bg-sedona-600",
        // Secondary button - Muted style with white text
        secondary:
          "bg-zeus-surface-neutral-subtle text-white border border-zeus-border-alpha hover:bg-zeus-surface-neutral",
        // Danger button - Using Zeus destructive colors
        destructive:
          "bg-zeus-status-destructive text-white shadow-sm hover:bg-zeus-status-destructive/90",
        // SAFE status - Using Zeus success colors
        safe:
          "bg-zeus-status-success text-white shadow-sm hover:bg-zeus-status-success/90",
        // CLOSE status - Using Zeus warning colors
        close:
          "bg-zeus-accent-orange text-white shadow-sm hover:bg-zeus-accent-orange/90",
        // AT RISK status - Using Zeus destructive colors
        risk:
          "bg-zeus-status-destructive text-white shadow-sm hover:bg-zeus-status-destructive/90",
        // Outline variant - Border only
        outline:
          "border border-zeus-border-normal bg-transparent text-zeus-text-primary shadow-sm hover:bg-zeus-surface-neutral",
        // Ghost variant - No background
        ghost:
          "bg-transparent text-zeus-text-primary hover:bg-zeus-surface-neutral",
        // Link variant - Text only
        link:
          "text-sedona-500 underline-offset-4 hover:underline bg-transparent",
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