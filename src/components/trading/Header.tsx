"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  onCreateCoin?: () => void
  onConnect?: () => void
  onDisconnect?: () => void
  isAuthenticated?: boolean
  walletAddress?: string
  fullWalletAddress?: string
  balance?: string
  balanceUsd?: string
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({
    className,
    onCreateCoin,
    onConnect,
    onDisconnect,
    isAuthenticated = false,
    walletAddress = "J181...U7Wi",
    fullWalletAddress = "J181xK2Df6672c6d19a2d56fc9d941e86da4f8c2a9b7e3U7Wi",
    balance = "0.00 SOL",
    balanceUsd = "$0.00",
    ...props
  }, ref) => {
    const [showDropdown, setShowDropdown] = React.useState(false)
    const [copied, setCopied] = React.useState(false)
    const [showAddressTooltip, setShowAddressTooltip] = React.useState(false)
    const [showBalanceTooltip, setShowBalanceTooltip] = React.useState(false)

    const handleCopyAddress = async (e: React.MouseEvent) => {
      e.stopPropagation()
      await navigator.clipboard.writeText(fullWalletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

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
          <Link href="/trading" className="hover:opacity-80 transition-opacity">
            <SedonaLogo variant="logo" size="md" className="text-white" />
          </Link>
          <span className="text-zeus-text-secondary text-caption-l">
            Discover the Pareto Frontier of Agents
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/docs"
            className="text-zeus-text-primary underline hover:text-zeus-text-secondary transition-colors text-caption-l font-medium"
          >
            Docs
          </Link>

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

              {/* Unified Wallet Card */}
              <div className="relative">
                <div className="flex items-center bg-zeus-surface-neutral border border-zeus-border-alpha rounded-lg">
                  {/* Address Section - Click to Copy */}
                  <div
                    className="relative flex items-center gap-2 px-3 py-2 border-r border-zeus-border-alpha cursor-pointer hover:bg-zeus-surface-elevated transition-colors"
                    onClick={handleCopyAddress}
                    onMouseEnter={() => setShowAddressTooltip(true)}
                    onMouseLeave={() => setShowAddressTooltip(false)}
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-zeus-text-primary text-caption-l font-medium">
                      {walletAddress}
                    </span>

                    {/* Address Tooltip */}
                    {showAddressTooltip && (
                      <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-black border border-zeus-border-alpha rounded-lg shadow-xl z-[100]">
                        <div className="text-white text-caption-s font-mono mb-1 max-w-[200px] break-all">
                          {fullWalletAddress}
                        </div>
                        <div className="text-zeus-text-tertiary text-[10px]">
                          {copied ? "Copied!" : "Click to copy"}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Balance Section - Hover for USD */}
                  <div
                    className="relative px-3 py-2 border-r border-zeus-border-alpha"
                    onMouseEnter={() => setShowBalanceTooltip(true)}
                    onMouseLeave={() => setShowBalanceTooltip(false)}
                  >
                    <span className="text-zeus-status-success text-caption-l font-medium">
                      {balance}
                    </span>

                    {/* Balance Tooltip */}
                    {showBalanceTooltip && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-black border border-zeus-border-alpha rounded-lg shadow-xl z-[100] whitespace-nowrap">
                        <div className="text-white text-caption-s font-medium">
                          {balanceUsd} USD
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dropdown Toggle */}
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="px-2 py-2 hover:bg-zeus-surface-elevated transition-colors"
                  >
                    <ChevronDown className={cn(
                      "w-4 h-4 text-zeus-text-tertiary transition-transform",
                      showDropdown && "rotate-180"
                    )} />
                  </button>
                </div>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg shadow-lg z-50 overflow-hidden min-w-[140px]">
                    <button
                      onClick={() => {
                        onDisconnect?.()
                        setShowDropdown(false)
                      }}
                      className="w-full px-4 py-2.5 text-left text-zeus-status-destructive text-caption-l font-medium hover:bg-zeus-surface-neutral transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
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
