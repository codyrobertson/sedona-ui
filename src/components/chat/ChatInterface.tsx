"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChatContainer } from "./base/ChatContainer"
import { ChatHeader, type Agent } from "./base/ChatHeader"
import { MessageList, type Message } from "./messages/MessageList"
import { ChatInput } from "./input/ChatInput"

interface ChatInterfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  agent: Agent
  messages?: Message[]
  onMessageSend?: (message: string) => void
  onAgentSwitch?: (agentId: string) => void
  variant?: 'widget' | 'panel' | 'fullscreen'
  theme?: 'light' | 'dark'
  isTyping?: boolean
  isLoading?: boolean
  showHeader?: boolean
  autoScroll?: boolean
}

const ChatInterface = React.forwardRef<HTMLDivElement, ChatInterfaceProps>(
  ({ 
    className,
    agent,
    messages = [],
    onMessageSend,
    onAgentSwitch,
    variant = 'panel',
    theme = 'dark',
    isTyping = false,
    isLoading = false,
    showHeader = true,
    autoScroll = true,
    ...props 
  }, ref) => {
    const [isMinimized, setIsMinimized] = React.useState(false)

    const handleSend = (message: string) => {
      if (onMessageSend) {
        onMessageSend(message)
      }
    }

    const handleMinimize = () => {
      setIsMinimized(!isMinimized)
    }

    const handleClose = () => {
      // Handle close functionality
      console.log('Chat closed')
    }

    const handleSettings = () => {
      // Handle settings functionality
      console.log('Settings opened')
    }

    if (isMinimized && variant === 'widget') {
      return (
        <div
          ref={ref}
          className={cn(
            "w-80 h-14 bg-zeus-surface-default border border-zeus-border-alpha rounded-lg shadow-lg",
            "flex items-center justify-between px-4 cursor-pointer hover:bg-zeus-surface-neutral transition-colors",
            theme === 'light' && "bg-background border-border",
            className
          )}
          onClick={handleMinimize}
          {...props}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zeus-surface-neutral-subtle rounded-full flex items-center justify-center">
              <span className="text-caption-s font-medium text-zeus-text-primary font-sans">
                {agent.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <span className="text-caption-l font-medium text-zeus-text-primary font-sans">
              {agent.name}
            </span>
          </div>
          <div className="w-3 h-3 bg-zeus-status-success rounded-full" />
        </div>
      )
    }

    return (
      <ChatContainer
        ref={ref}
        variant={variant}
        theme={theme}
        className={className}
        {...props}
      >
        {/* Header */}
        {showHeader && (
          <ChatHeader
            agent={agent}
            onMinimize={variant === 'widget' ? handleMinimize : undefined}
            onClose={variant !== 'fullscreen' ? handleClose : undefined}
            onSettings={handleSettings}
          />
        )}

        {/* Messages */}
        <MessageList
          messages={messages}
          isTyping={isTyping}
          autoScroll={autoScroll}
        />

        {/* Input */}
        <ChatInput
          onSend={handleSend}
          isLoading={isLoading}
          placeholder={`Message ${agent.name}...`}
        />
      </ChatContainer>
    )
  }
)
ChatInterface.displayName = "ChatInterface"

export { ChatInterface }
export type { ChatInterfaceProps }