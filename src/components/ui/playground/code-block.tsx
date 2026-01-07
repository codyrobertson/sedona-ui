"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

export interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  language = "tsx",
  className,
  showLineNumbers = false
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.trim().split('\n')

  return (
    <div className={cn("relative group", className)}>
      <button
        onClick={handleCopy}
        className={cn(
          "absolute right-2 top-2 p-2 rounded-md transition-all",
          "opacity-0 group-hover:opacity-100",
          "bg-zeus-surface-neutral hover:bg-zeus-surface-neutral-subtle",
          "text-zeus-text-secondary hover:text-zeus-text-primary"
        )}
        aria-label="Copy code"
      >
        {copied ? (
          <Icon icon="check" className="h-4 w-4 text-zeus-status-success" />
        ) : (
          <Icon icon="copy" className="h-4 w-4" />
        )}
      </button>
      <pre className={cn(
        "p-4 rounded-lg overflow-x-auto",
        "bg-zeus-surface-default border border-zeus-border-alpha",
        "text-caption-l font-mono text-zeus-text-secondary"
      )}>
        <code>
          {showLineNumbers ? (
            lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="select-none text-zeus-text-quaternary w-8 shrink-0">
                  {i + 1}
                </span>
                <span>{line}</span>
              </div>
            ))
          ) : (
            code.trim()
          )}
        </code>
      </pre>
      {language && (
        <span className="absolute top-2 left-3 text-caption-s text-zeus-text-quaternary uppercase">
          {language}
        </span>
      )}
    </div>
  )
}
