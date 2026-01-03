"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { Button } from "@/components/ui/button"

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  onCreateCoin?: () => void
  onConnect?: () => void
  onDisconnect?: () => void
  onDocs?: () => void
  isAuthenticated?: boolean
  walletAddress?: string
  balance?: string
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({
    className,
    onCreateCoin,
    onConnect,
    onDisconnect,
    onDocs,
    isAuthenticated = false,
    walletAddress = "J181...U7Wi",
    balance = "0.00 SOL",
    ...props
  }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "flex items-center justify-between px-6 py-4 bg-zeus-surface-elevated border-b border-zeus-border-alpha",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          <SedonaLogo variant="logo" size="md" className="text-white" />
          <span className="text-zeus-text-secondary text-caption-l">
            Discover the Pareto Frontier of Agents
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onDocs}
            className="text-zeus-text-primary underline hover:text-zeus-text-secondary transition-colors text-caption-l font-medium"
          >
            Docs
          </button>

          {isAuthenticated ? (
            <>
              <Button
                variant="brand"
                size="default"
                onClick={onCreateCoin}
                className="px-4"
              >
                Create Agent
              </Button>
              <span className="text-zeus-status-success text-caption-l font-medium">
                {balance}
              </span>
              <span className="text-zeus-text-tertiary">/</span>
              <button
                onClick={onDisconnect}
                className="text-zeus-status-destructive hover:text-zeus-status-destructive/80 transition-colors text-caption-l font-medium"
              >
                Disconnect
              </button>
              <div className="flex items-center gap-2 bg-zeus-surface-neutral px-3 py-1.5 rounded">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-zeus-text-primary text-caption-l font-medium">
                  {walletAddress}
                </span>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                size="default"
                onClick={onCreateCoin}
                className="px-4"
              >
                Create Agent
              </Button>
              <Button
                variant="brand"
                size="default"
                onClick={onConnect}
                className="px-4"
              >
                Connect
              </Button>
            </>
          )}
        </div>
      </header>
    )
  }
)

Header.displayName = "Header"

export { Header }
