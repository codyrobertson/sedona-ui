"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { MessageCircle, Terminal } from "lucide-react"

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 hidden sm:flex items-center justify-between px-6 py-3 bg-zeus-surface-elevated border-t border-zeus-border-alpha z-50",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-1">
          <span className="text-zeus-text-primary text-caption-m font-medium">
            Sedona
          </span>
          <a
            href="https://discord.gg/sedona"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-zeus-text-secondary hover:text-zeus-text-primary transition-colors text-caption-m ml-4"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Discord
          </a>
          <a
            href="https://docs.sedona.io/api"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-zeus-text-secondary hover:text-zeus-text-primary transition-colors text-caption-m ml-4"
          >
            <Terminal className="w-3.5 h-3.5" />
            API
          </a>
          <a
            href="https://docs.sedona.io/methodology"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zeus-text-secondary hover:text-zeus-text-primary transition-colors text-caption-m ml-4"
          >
            Methodology
          </a>
        </div>

        <span className="text-zeus-text-tertiary text-caption-s">
          Not affiliated with any third party
        </span>
      </footer>
    )
  }
)

Footer.displayName = "Footer"

export { Footer }
