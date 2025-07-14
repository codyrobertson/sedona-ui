"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-zeus-border-alpha bg-zeus-surface-default shadow-sm transition-colors font-sans",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zeus-border-focused",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-zeus-status-success data-[state=checked]:border-zeus-status-success data-[state=checked]:text-primary-foreground",
      "dark:border-zeus-border-normal dark:bg-zeus-surface-neutral dark:data-[state=checked]:bg-zeus-status-success",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }