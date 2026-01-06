"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { Button } from "@/components/ui/button"

interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  walletAddress?: string
  onWalletConnect?: () => void
  onWalletDisconnect?: () => void
}

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ className, walletAddress, onWalletConnect, onWalletDisconnect, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "flex items-center justify-between w-full px-6 py-4 bg-background border-b border-border dark:bg-zeus-surface-default dark:border-zeus-border-divider",
          className
        )}
        {...props}
      >
        {/* Left side - Logo and tagline */}
        <div className="flex items-center gap-4">
          <SedonaLogo variant="logo" size="sm" />
          <span className="text-caption-m text-muted-foreground font-sans dark:text-zeus-text-secondary">
            Discover, Launch & Trade AI Agents On Sedona
          </span>
        </div>

        {/* Right side - Wallet connection */}
        <div className="flex items-center gap-4">
          {/* SOL Balance and Market info */}
          <div className="flex items-center gap-2 text-caption-m">
            <span className="text-zeus-status-success font-mono">1000 SOL</span>
            <span className="text-muted-foreground dark:text-zeus-text-tertiary">/</span>
            <span className="text-zeus-status-destructive font-mono">Disconnect</span>
          </div>

          {/* Wallet Address or Connect Button */}
          {walletAddress ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full dark:bg-zeus-surface-neutral">
                <div className="w-2 h-2 bg-zeus-accent-purple rounded-full"></div>
                <span className="text-caption-m text-foreground font-mono dark:text-zeus-text-primary">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onWalletDisconnect}
                className="text-caption-m"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              variant="brand" 
              size="sm" 
              onClick={onWalletConnect}
              className="text-caption-m"
            >
              Connect
            </Button>
          )}
        </div>
      </nav>
    )
  }
)
Navigation.displayName = "Navigation"

export { Navigation }