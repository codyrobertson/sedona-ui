"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dots' | 'text'
  agentName?: string
}

const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  ({ className, variant = 'dots', agentName = "AI Agent", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center font-sans",
          className
        )}
        {...props}
      >
        {variant === 'text' ? (
          // Text variant with agent name
          <div className="flex items-center gap-2 text-caption-l text-zeus-text-secondary">
            <span>{agentName} is typing</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-zeus-text-secondary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-1 bg-zeus-text-secondary rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
              <div className="w-1 h-1 bg-zeus-text-secondary rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
            </div>
          </div>
        ) : (
          // Dots variant in message bubble - Exact Figma styling
          <div className="bg-zeus-surface-neutral border border-zeus-border-alpha rounded-md px-3 py-2">
            <div className="flex gap-1 items-center">
              <div 
                className="w-1.5 h-1.5 bg-zeus-text-secondary rounded-full animate-bounce" 
                style={{ animationDelay: '0ms', animationDuration: '1.4s' }}
              />
              <div 
                className="w-1.5 h-1.5 bg-zeus-text-secondary rounded-full animate-bounce" 
                style={{ animationDelay: '200ms', animationDuration: '1.4s' }}
              />
              <div 
                className="w-1.5 h-1.5 bg-zeus-text-secondary rounded-full animate-bounce" 
                style={{ animationDelay: '400ms', animationDuration: '1.4s' }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
)
TypingIndicator.displayName = "TypingIndicator"

export { TypingIndicator }