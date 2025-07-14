import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary button - Dark bg with white text in light, light bg with dark text in dark
        default:
          "bg-primary shadow-sm rounded-full hover:bg-primary/90 text-white dark:text-black !text-white dark:!text-black",
        // Brand button - Sedona orange with proper contrast
        brand:
          "bg-sedona-500 text-white shadow-sm rounded-full hover:bg-sedona-600",
        // Secondary button - Light gray 200 with dark text in light mode
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm rounded-full hover:bg-secondary/80 dark:bg-zeus-surface-neutral dark:text-zeus-text-primary dark:hover:bg-zeus-surface-neutral/80",
        // Danger button - Using Zeus destructive colors
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm rounded-full hover:bg-destructive/90 dark:bg-zeus-status-destructive dark:text-primary-foreground dark:hover:bg-zeus-status-destructive/90",
        // SAFE status - Using Zeus success colors
        safe:
          "bg-zeus-status-success text-primary-foreground shadow-sm rounded-full hover:bg-zeus-status-success/90 dark:bg-zeus-status-success dark:text-primary-foreground dark:hover:bg-zeus-status-success/90",
        // CLOSE status - Using Zeus warning colors
        close:
          "bg-zeus-accent-orange text-primary-foreground shadow-sm rounded-full hover:bg-zeus-accent-orange/90 dark:bg-zeus-accent-orange dark:text-primary-foreground dark:hover:bg-zeus-accent-orange/90",
        // AT RISK status - Using Zeus destructive colors
        risk:
          "bg-zeus-status-destructive text-primary-foreground shadow-sm rounded-full hover:bg-zeus-status-destructive/90 dark:bg-zeus-status-destructive dark:text-primary-foreground dark:hover:bg-zeus-status-destructive/90",
        // Outline variant - Theme-aware border and text colors
        outline:
          "border border-input bg-transparent text-foreground shadow-sm rounded-full hover:bg-accent hover:text-accent-foreground dark:border-zeus-border-normal dark:text-zeus-text-primary dark:hover:bg-zeus-surface-neutral",
        // Ghost variant - Theme-aware colors
        ghost: "bg-transparent text-foreground rounded-full hover:bg-accent hover:text-accent-foreground dark:text-zeus-text-primary dark:hover:bg-zeus-surface-neutral",
        // Link variant - Sedona with Zeus fallback
        link: "!text-sedona-500 underline-offset-4 hover:underline bg-transparent dark:!text-sedona-400",
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