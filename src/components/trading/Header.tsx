"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { Button } from "@/components/ui/button"
import { WalletCard } from "@/components/ui/wallet-card"

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
    return (
      <header
        ref={ref}
        className={cn(
          "flex items-center justify-between px-6 py-2.5 bg-zeus-surface-elevated border-b border-zeus-border-alpha",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <Link href="/trading" className="hover:opacity-80 transition-opacity">
            <SedonaLogo variant="logo" size="sm" className="text-white" />
          </Link>
          <span className="text-zeus-text-secondary text-caption-s hidden sm:block">
            Discover the Pareto Frontier of Agents
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/docs"
            className="text-zeus-text-primary underline hover:text-zeus-text-secondary transition-colors text-caption-s font-medium px-2"
          >
            Docs
          </Link>

          {isAuthenticated ? (
            <>
              <Button
                variant="brand"
                size="sm"
                onClick={onCreateCoin}
              >
                Create Agent
              </Button>

              <WalletCard
                address={walletAddress}
                fullAddress={fullWalletAddress}
                balance={balance}
                balanceUsd={balanceUsd}
                onDisconnect={onDisconnect}
              />
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={onCreateCoin}
              >
                Create Agent
              </Button>
              <Button
                variant="brand"
                size="sm"
                onClick={onConnect}
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
