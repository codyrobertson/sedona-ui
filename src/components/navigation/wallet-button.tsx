"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"

export interface WalletButtonProps {
  /** Whether user is authenticated */
  isAuthenticated?: boolean
  /** Whether wallet is connecting */
  isConnecting?: boolean
  /** Wallet address */
  walletAddress?: string
  /** Balance in SOL */
  balance?: number
  /** Connect callback */
  onConnect?: () => void
  /** Disconnect callback */
  onDisconnect?: () => void
  /** Profile callback */
  onProfile?: () => void
  /** Custom class name */
  className?: string
  /** Size variant */
  size?: "xs" | "sm" | "md" | "lg"
  /** Show full address or truncated */
  showFullAddress?: boolean
}

function truncateAddress(address: string): string {
  if (address.length <= 10) return address
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

function formatBalance(balance: number): string {
  if (balance >= 1000) {
    return `${(balance / 1000).toFixed(1)}K`
  }
  if (balance >= 1) {
    return balance.toFixed(2)
  }
  return balance.toFixed(3)
}

const WalletButton = React.forwardRef<HTMLButtonElement, WalletButtonProps>(
  (
    {
      isAuthenticated = false,
      isConnecting = false,
      walletAddress,
      balance = 0,
      onConnect,
      onDisconnect,
      onProfile,
      className,
      size = "md",
      showFullAddress = false,
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = React.useCallback(() => {
      if (walletAddress) {
        navigator.clipboard.writeText(walletAddress)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }, [walletAddress])

    const handleExplorer = React.useCallback(() => {
      if (walletAddress) {
        window.open(
          `https://solscan.io/account/${walletAddress}`,
          "_blank",
          "noopener,noreferrer"
        )
      }
    }, [walletAddress])

    const sizeClasses = {
      xs: "h-6 text-caption-s px-2",
      sm: "h-7 text-caption-s px-2.5",
      md: "h-8 text-caption-l px-3",
      lg: "h-9 text-body-s px-4",
    }

    const iconSize = size === "xs" ? "w-3 h-3" : "w-4 h-4"
    const iconGap = size === "xs" ? "mr-1.5" : "mr-2"
    const dotSize = size === "xs" ? "w-1.5 h-1.5" : "w-2 h-2"
    const chevronSize = size === "xs" ? "w-3 h-3" : "w-3.5 h-3.5"
    const innerGap = size === "xs" ? "gap-1.5" : "gap-2"

    // Connecting state
    if (isConnecting) {
      return (
        <Button
          ref={ref}
          variant="ghost"
          disabled
          className={cn(
            sizeClasses[size],
            "bg-zeus-surface-elevated border border-zeus-border-alpha",
            className
          )}
        >
          <Icon icon="spinner-third" spin className={cn(iconSize, iconGap)} />
          Connecting...
        </Button>
      )
    }

    // Disconnected state
    if (!isAuthenticated) {
      return (
        <Button
          ref={ref}
          variant="ghost"
          onClick={onConnect}
          className={cn(
            sizeClasses[size],
            "bg-zeus-surface-elevated border border-zeus-border-alpha",
            "hover:bg-zeus-surface-neutral hover:border-zeus-border-alpha",
            "text-zeus-text-primary",
            className
          )}
        >
          <Icon icon="wallet" className={cn(iconSize, iconGap)} />
          Connect
        </Button>
      )
    }

    // Connected state with dropdown
    const displayAddress = showFullAddress
      ? walletAddress
      : truncateAddress(walletAddress || "")

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className={cn(
              sizeClasses[size],
              "bg-zeus-surface-elevated border border-zeus-border-alpha",
              "hover:bg-zeus-surface-neutral",
              "text-zeus-text-primary",
              className
            )}
          >
            <div className={cn("flex items-center", innerGap)}>
              <div className={cn(dotSize, "rounded-full bg-zeus-status-success animate-pulse")} />
              <span className="font-medium">{formatBalance(balance)}</span>
              <span className="text-zeus-text-tertiary">SOL</span>
              <Icon icon="chevron-down" className={cn(chevronSize, "text-zeus-text-tertiary")} />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-zeus-surface-elevated border-zeus-border-alpha"
        >
          {/* Address display */}
          <div className="px-3 py-2">
            <p className="text-caption-s text-zeus-text-tertiary mb-1">
              Connected Wallet
            </p>
            <p className="text-caption-l text-zeus-text-primary font-mono truncate">
              {displayAddress}
            </p>
          </div>
          <DropdownMenuSeparator className="bg-zeus-border-alpha" />

          {/* Profile */}
          <DropdownMenuItem
            onClick={onProfile}
            className="cursor-pointer text-zeus-text-secondary hover:text-zeus-text-primary hover:bg-zeus-surface-neutral"
          >
            <Icon icon="user" className="w-4 h-4 mr-2" />
            My Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-zeus-border-alpha" />

          {/* Actions */}
          <DropdownMenuItem
            onClick={handleCopy}
            className="cursor-pointer text-zeus-text-secondary hover:text-zeus-text-primary hover:bg-zeus-surface-neutral"
          >
            {copied ? (
              <Icon icon="check" className="w-4 h-4 mr-2 text-zeus-status-success" />
            ) : (
              <Icon icon="copy" className="w-4 h-4 mr-2" />
            )}
            {copied ? "Copied!" : "Copy Address"}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleExplorer}
            className="cursor-pointer text-zeus-text-secondary hover:text-zeus-text-primary hover:bg-zeus-surface-neutral"
          >
            <Icon icon="arrow-up-right-from-square" className="w-4 h-4 mr-2" />
            View on Explorer
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-zeus-border-alpha" />

          <DropdownMenuItem
            onClick={onDisconnect}
            className="cursor-pointer text-zeus-status-error hover:text-zeus-status-error hover:bg-zeus-status-error/10"
          >
            <Icon icon="arrow-right-from-bracket" className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

WalletButton.displayName = "WalletButton"

export { WalletButton }
