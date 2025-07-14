"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'widget' | 'panel' | 'fullscreen'
  theme?: 'light' | 'dark'
  children: React.ReactNode
}

const ChatContainer = React.forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ className, variant = 'panel', theme = 'dark', children, ...props }, ref) => {
    const variants = {
      widget: "w-80 h-96 rounded-md shadow-lg border border-zeus-border-alpha",
      panel: "w-full h-full max-w-md",
      fullscreen: "w-full h-full"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "bg-zeus-surface-default flex flex-col font-sans border border-zeus-border-alpha rounded-md overflow-hidden",
          variants[variant],
          theme === 'light' && "bg-background border-border",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ChatContainer.displayName = "ChatContainer"

export { ChatContainer }