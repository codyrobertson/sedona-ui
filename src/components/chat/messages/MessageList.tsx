"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { MessageBubble } from "./MessageBubble"
import { TypingIndicator } from "./TypingIndicator"

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
  status?: 'sending' | 'sent' | 'error'
  agentName?: string
  agentAvatar?: string
}

export interface MessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: Message[]
  isTyping?: boolean
  autoScroll?: boolean
  showAvatars?: boolean
  showTimestamps?: boolean
}

const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  ({ 
    className, 
    messages, 
    isTyping = false,
    autoScroll = true,
    showAvatars = true,
    showTimestamps = true,
    ...props 
  }, ref) => {
    const scrollAreaRef = React.useRef<HTMLDivElement>(null)
    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when new messages arrive
    React.useEffect(() => {
      if (autoScroll && messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'end'
        })
      }
    }, [messages, isTyping, autoScroll])

    // Group consecutive messages from the same sender
    const groupedMessages = React.useMemo(() => {
      const groups: Message[][] = []
      let currentGroup: Message[] = []

      messages.forEach((message, index) => {
        const prevMessage = messages[index - 1]
        const isSameSender = prevMessage && prevMessage.sender === message.sender
        const isWithinTimeLimit = prevMessage && 
          (message.timestamp.getTime() - prevMessage.timestamp.getTime()) < 60000 // 1 minute

        if (isSameSender && isWithinTimeLimit) {
          currentGroup.push(message)
        } else {
          if (currentGroup.length > 0) {
            groups.push([...currentGroup])
          }
          currentGroup = [message]
        }
      })

      if (currentGroup.length > 0) {
        groups.push(currentGroup)
      }

      return groups
    }, [messages])

    React.useImperativeHandle(ref, () => scrollAreaRef.current!, [])

    return (
      <div
        ref={scrollAreaRef}
        className={cn(
          "flex-1 overflow-y-auto px-4 py-4 space-y-4 font-sans",
          "scrollbar-thin scrollbar-thumb-zeus-surface-neutral scrollbar-track-transparent",
          className
        )}
        {...props}
      >
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-zeus-surface-neutral rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-zeus-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-caption-l text-zeus-text-secondary font-sans">
                Start a conversation with your AI agent
              </p>
            </div>
          </div>
        )}

        {/* Message Groups */}
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-1">
            {group.map((message, messageIndex) => (
              <MessageBubble
                key={message.id}
                content={message.content}
                sender={message.sender}
                timestamp={message.timestamp}
                status={message.status}
                agentName={message.agentName}
                showAvatar={showAvatars && messageIndex === 0} // Only show avatar for first message in group
                showTimestamp={showTimestamps && messageIndex === group.length - 1} // Only show timestamp for last message in group
              />
            ))}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="w-8 h-8 bg-zeus-surface-neutral-subtle rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-caption-s font-medium text-zeus-text-secondary font-sans">AI</span>
            </div>
            <TypingIndicator />
          </div>
        )}

        {/* Scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>
    )
  }
)
MessageList.displayName = "MessageList"

export { MessageList }
export type { Message }