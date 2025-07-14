"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChatInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSend?: (message: string) => void
  isLoading?: boolean
  maxLength?: number
  showCounter?: boolean
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ 
    className, 
    onSend, 
    isLoading = false,
    maxLength = 2000,
    showCounter = true,
    onKeyDown,
    ...props 
  }, ref) => {
    const [value, setValue] = React.useState("")
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    // Auto-resize textarea
    React.useEffect(() => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
      }
    }, [value])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
      onKeyDown?.(e)
    }

    const handleSend = () => {
      const trimmedValue = value.trim()
      if (trimmedValue && !isLoading && onSend) {
        onSend(trimmedValue)
        setValue("")
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (newValue.length <= maxLength) {
        setValue(newValue)
      }
    }

    React.useImperativeHandle(ref, () => textareaRef.current!, [])

    return (
      <div className="p-4 border-t border-zeus-border-alpha bg-zeus-surface-default">
        <div className="flex gap-3 items-end">
          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className={cn(
                "w-full resize-none border border-zeus-border-normal rounded-md",
                "bg-input text-foreground dark:bg-zeus-surface-neutral dark:text-zeus-text-primary",
                "px-3 py-3 text-caption-l leading-5 font-sans font-normal",
                "placeholder:text-zeus-text-tertiary",
                "focus:outline-none focus:border-zeus-border-focused",
                "min-h-[44px] max-h-[120px]",
                className
              )}
              disabled={isLoading}
              {...props}
            />

            {/* Character Counter */}
            {showCounter && (
              <div className="absolute -bottom-5 right-0 text-caption-s text-zeus-text-tertiary font-sans">
                {value.length}/{maxLength}
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!value.trim() || isLoading}
            className={cn(
              "w-11 h-11 rounded-md flex items-center justify-center transition-colors font-sans",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              "disabled:bg-zeus-surface-neutral disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            )}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg 
                className="w-5 h-5 text-current" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    )
  }
)
ChatInput.displayName = "ChatInput"

export { ChatInput }