"use client"

import { useState } from "react"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: "css" | "tsx" | "bash" | "json" | "scss"
  title?: string
  showLineNumbers?: boolean
  className?: string
}

// Simple syntax highlighting without external dependencies
function highlightCode(code: string, language: string): string {
  // Basic token patterns
  const patterns: Record<string, Array<{ pattern: RegExp; class: string }>> = {
    css: [
      { pattern: /(\/\*[\s\S]*?\*\/)/g, class: "text-zeus-text-tertiary" },
      { pattern: /([.#][\w-]+)/g, class: "text-sedona-400" },
      { pattern: /(:\s*)([\w-]+)/g, class: "text-zeus-accent-cyan" },
      { pattern: /(@[\w-]+)/g, class: "text-zeus-accent-purple" },
      { pattern: /(--[\w-]+)/g, class: "text-sedona-300" },
    ],
    tsx: [
      { pattern: /(\/\/.*$)/gm, class: "text-zeus-text-tertiary" },
      { pattern: /('.*?'|".*?")/g, class: "text-zeus-accent-green" },
      { pattern: /\b(const|let|var|function|return|export|import|from|if|else)\b/g, class: "text-zeus-accent-purple" },
      { pattern: /\b(true|false|null|undefined)\b/g, class: "text-sedona-400" },
      { pattern: /(&lt;\/?\w+)/g, class: "text-zeus-accent-cyan" },
    ],
    bash: [
      { pattern: /(#.*$)/gm, class: "text-zeus-text-tertiary" },
      { pattern: /('.*?'|".*?")/g, class: "text-zeus-accent-green" },
      { pattern: /\b(npm|npx|yarn|bun|git|cd|mkdir)\b/g, class: "text-zeus-accent-cyan" },
    ],
    json: [
      { pattern: /("[\w-]+")\s*:/g, class: "text-sedona-400" },
      { pattern: /:\s*(".*?")/g, class: "text-zeus-accent-green" },
      { pattern: /:\s*(\d+)/g, class: "text-zeus-accent-cyan" },
      { pattern: /:\s*(true|false|null)/g, class: "text-zeus-accent-purple" },
    ],
    scss: [
      { pattern: /(\/\/.*$)/gm, class: "text-zeus-text-tertiary" },
      { pattern: /(\$[\w-]+)/g, class: "text-sedona-400" },
      { pattern: /(@[\w-]+)/g, class: "text-zeus-accent-purple" },
      { pattern: /([.#&][\w-]+)/g, class: "text-zeus-accent-cyan" },
    ],
  }

  // Escape HTML
  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  // Apply patterns for the language
  const langPatterns = patterns[language] || []
  for (const { pattern, class: className } of langPatterns) {
    escaped = escaped.replace(pattern, (match) => {
      return `<span class="${className}">${match}</span>`
    })
  }

  return escaped
}

export function CodeBlock({
  code,
  language = "tsx",
  title,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")
  const highlightedCode = highlightCode(code, language)

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-zeus-border-default bg-zeus-surface-default",
        className
      )}
    >
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between border-b border-zeus-border-default bg-zeus-surface-elevated px-4 py-2">
          <span className="text-caption-m font-medium text-zeus-text-secondary">{title}</span>
          <span className="rounded bg-zeus-surface-neutral px-2 py-0.5 text-caption-s text-zeus-text-tertiary">
            {language}
          </span>
        </div>
      )}

      {/* Code Container */}
      <div className="relative">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={cn(
            "absolute right-3 top-3 rounded-md p-2 transition-colors",
            copied
              ? "bg-green-500/20 text-green-400"
              : "bg-zeus-surface-elevated text-zeus-text-tertiary hover:bg-zeus-surface-neutral hover:text-zeus-text-secondary"
          )}
          aria-label="Copy code"
        >
          <Icon icon={copied ? "check" : "copy"} className="h-4 w-4" />
        </button>

        {/* Code */}
        <div className="overflow-x-auto p-4 pr-14">
          <pre className="font-mono text-caption-l leading-relaxed">
            {showLineNumbers ? (
              <code className="flex">
                <span className="mr-4 flex flex-col text-right text-zeus-text-tertiary select-none">
                  {lines.map((_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </span>
                <span
                  className="text-zeus-text-primary"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </code>
            ) : (
              <code
                className="text-zeus-text-primary"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            )}
          </pre>
        </div>
      </div>
    </div>
  )
}
