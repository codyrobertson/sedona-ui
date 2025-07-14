"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string
  sender: 'user' | 'agent' | 'system'
  timestamp?: Date
  status?: 'sending' | 'sent' | 'error'
  agentName?: string
  showAvatar?: boolean
  showTimestamp?: boolean
}

const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ 
    className, 
    content, 
    sender, 
    timestamp, 
    status = 'sent',
    agentName = "Assistant",
    showAvatar = true,
    showTimestamp = false,
    ...props 
  }, ref) => {
    const isUser = sender === 'user'
    const isSystem = sender === 'system'
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3 font-sans",
          isUser ? "justify-end" : "justify-start",
          className
        )}
        {...props}
      >
        {/* Avatar for non-user messages */}
        {showAvatar && !isUser && (
          <div className="w-8 h-8 bg-zeus-surface-neutral border border-zeus-border-alpha rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-caption-s font-medium text-zeus-text-primary">
              {isSystem ? "S" : agentName?.slice(0, 1) || "A"}
            </span>
          </div>
        )}

        {/* Message Content */}
        <div className={cn(
          "flex flex-col gap-1",
          isUser ? "items-end" : "items-start",
          "max-w-[70%]"
        )}>
          {/* Agent Name for system messages */}
          {!isUser && showAvatar && agentName && (
            <span className="text-caption-s font-medium text-zeus-text-secondary px-1">
              {agentName}
            </span>
          )}

          {/* Message Bubble - Exact Figma styling */}
          <div className={cn(
            "px-3 py-2 rounded-md font-sans font-normal text-caption-l leading-5 relative",
            // User messages: White background with dark text
            isUser && "bg-primary-foreground text-primary border border-border",
            // System/Agent messages: Dark background with white text  
            !isUser && "bg-zeus-surface-neutral text-zeus-text-primary border border-zeus-border-alpha",
            // Special system message styling
            isSystem && "bg-zeus-surface-neutral-subtle",
            // Status states
            status === 'sending' && "opacity-70",
            status === 'error' && "bg-zeus-status-destructive text-white border-zeus-status-destructive"
          )}>
            <span className="whitespace-pre-wrap break-words">
              {content}
            </span>

            {/* Message Status Indicator */}
            {isUser && status && status !== 'sent' && (
              <div className={cn(
                "absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-zeus-surface-default",
                status === 'sending' && "bg-zeus-text-quaternary animate-pulse",
                status === 'error' && "bg-zeus-status-destructive"
              )} />
            )}
          </div>

          {/* Timestamp */}
          {showTimestamp && timestamp && (
            <span className="text-caption-s text-zeus-text-quaternary px-1 font-sans">
              {timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          )}
        </div>
      </div>
    )
  }
)
MessageBubble.displayName = "MessageBubble"

export { MessageBubble }