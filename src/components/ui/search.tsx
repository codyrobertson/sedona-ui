"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, onSearch, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const form = e.target as HTMLFormElement
      const input = form.elements.namedItem('search') as HTMLInputElement
      if (input && onSearch) {
        onSearch(input.value)
      }
    }

    return (
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={ref}
          name="search"
          type="text"
          placeholder="Search Agents"
          className={cn(
            "w-full bg-background border border-input rounded-lg px-4 py-2.5 pr-10 dark:bg-zeus-surface-neutral dark:border-zeus-border-normal",
            "text-caption-m text-foreground placeholder:text-muted-foreground dark:text-zeus-text-primary dark:placeholder:text-zeus-text-tertiary",
            "focus:outline-none focus:ring-1 focus:ring-sedona-500 focus:border-sedona-500",
            "transition-colors",
            className
          )}
          {...props}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors dark:text-zeus-text-tertiary dark:hover:text-zeus-text-secondary"
          aria-label="Search"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" 
              stroke="currentColor" 
              strokeWidth="1.33333" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M14 14L11.1 11.1" 
              stroke="currentColor" 
              strokeWidth="1.33333" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    )
  }
)
Search.displayName = "Search"

export { Search }