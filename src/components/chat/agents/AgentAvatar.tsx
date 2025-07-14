"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface AgentAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  name: string
  status?: 'online' | 'offline' | 'typing'
  size?: 'sm' | 'md' | 'lg'
}

const AgentAvatar = React.forwardRef<HTMLDivElement, AgentAvatarProps>(
  ({ className, src, name, status = 'offline', size = 'md', ...props }, ref) => {
    const sizes = {
      sm: "w-6 h-6 text-caption-s",
      md: "w-8 h-8 text-caption-m", 
      lg: "w-12 h-12 text-body-s"
    }

    const statusColors = {
      online: "bg-zeus-status-success",
      offline: "bg-zeus-accent-gray",
      typing: "bg-zeus-accent-orange"
    }

    const initials = name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

    return (
      <div
        ref={ref}
        className={cn("relative flex-shrink-0", className)}
        {...props}
      >
        {/* Avatar */}
        <div className={cn(
          "rounded-full bg-zeus-surface-neutral-subtle border border-zeus-border-alpha flex items-center justify-center overflow-hidden",
          sizes[size]
        )}>
          {src ? (
            <img 
              src={src} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-medium text-zeus-text-primary font-sans">
              {initials}
            </span>
          )}
        </div>

        {/* Status Indicator */}
        <div className={cn(
          "absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-zeus-surface-default",
          statusColors[status],
          size === 'sm' ? "w-2 h-2" : size === 'md' ? "w-3 h-3" : "w-4 h-4"
        )} />

        {/* Typing Animation */}
        {status === 'typing' && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-zeus-accent-orange rounded-full flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-0.5 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <div className="w-0.5 h-0.5 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <div className="w-0.5 h-0.5 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
    )
  }
)
AgentAvatar.displayName = "AgentAvatar"

export { AgentAvatar }