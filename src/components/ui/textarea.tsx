"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-caption-l text-foreground shadow-sm transition-colors font-sans",
          "dark:bg-zeus-surface-elevated dark:border-zeus-border-alpha dark:text-zeus-text-primary",
          "placeholder:text-muted-foreground dark:placeholder:text-zeus-text-tertiary",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:focus-visible:ring-sedona-500/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-vertical",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }