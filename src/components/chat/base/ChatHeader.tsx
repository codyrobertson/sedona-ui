"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { AgentAvatar } from "../agents/AgentAvatar"

interface Agent {
  id: string
  name: string
  avatar?: string
  status: 'online' | 'offline' | 'typing'
  description?: string
}

export interface ChatHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  agent: Agent
  onMinimize?: () => void
  onClose?: () => void
  onSettings?: () => void
  showActions?: boolean
}

const ChatHeader = React.forwardRef<HTMLDivElement, ChatHeaderProps>(
  ({ 
    className, 
    agent, 
    onMinimize, 
    onClose, 
    onSettings,
    showActions = true,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between px-4 py-3 border-b border-zeus-border-alpha bg-zeus-surface-default font-sans",
          className
        )}
        {...props}
      >
        {/* Agent Info */}
        <div className="flex items-center gap-3">
          <AgentAvatar
            src={agent.avatar}
            name={agent.name}
            status={agent.status}
            size="md"
          />
          <div className="flex flex-col">
            <h3 className="text-caption-l font-semibold text-zeus-text-primary">
              {agent.name}
            </h3>
            {agent.description && (
              <p className="text-caption-s text-zeus-text-secondary">
                {agent.description}
              </p>
            )}
            <div className="flex items-center gap-1">
              <div className={cn(
                "w-2 h-2 rounded-full",
                agent.status === 'online' && "bg-zeus-status-success",
                agent.status === 'offline' && "bg-zeus-accent-gray",
                agent.status === 'typing' && "bg-zeus-accent-orange"
              )} />
              <span className="text-caption-s text-zeus-text-tertiary capitalize">
                {agent.status === 'typing' ? 'Typing...' : agent.status}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center gap-2">
            {onSettings && (
              <button
                onClick={onSettings}
                className="w-8 h-8 rounded-lg hover:bg-zeus-surface-neutral transition-colors flex items-center justify-center"
                title="Settings"
              >
                <svg className="w-4 h-4 text-zeus-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
            
            {onMinimize && (
              <button
                onClick={onMinimize}
                className="w-8 h-8 rounded-lg hover:bg-zeus-surface-neutral transition-colors flex items-center justify-center"
                title="Minimize"
              >
                <svg className="w-4 h-4 text-zeus-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            )}
            
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-zeus-surface-neutral transition-colors flex items-center justify-center"
                title="Close"
              >
                <svg className="w-4 h-4 text-zeus-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    )
  }
)
ChatHeader.displayName = "ChatHeader"

export { ChatHeader }
export type { Agent }