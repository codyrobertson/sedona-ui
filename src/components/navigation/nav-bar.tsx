"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { NavLink } from "./nav-link"
import { WalletButton } from "./wallet-button"
import { Icon } from "@/components/ui/icon"

export interface NavItem {
  /** Link label */
  label: string
  /** Link destination */
  href: string
  /** Whether link is external */
  external?: boolean
  /** Whether link is disabled */
  disabled?: boolean
  /** Match exact path */
  exact?: boolean
}

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Navigation items */
  items?: NavItem[]
  /** Whether user is authenticated */
  isAuthenticated?: boolean
  /** Whether wallet is connecting */
  isConnecting?: boolean
  /** Wallet address */
  walletAddress?: string
  /** Wallet balance */
  balance?: number
  /** Show tagline under logo */
  showTagline?: boolean
  /** Tagline text */
  tagline?: string
  /** Create button callback */
  onCreateAgent?: () => void
  /** Connect callback */
  onConnect?: () => void
  /** Disconnect callback */
  onDisconnect?: () => void
  /** Mobile menu toggle callback */
  onMobileMenuToggle?: () => void
  /** Hide create button */
  hideCreateButton?: boolean
  /** Custom logo element */
  logo?: React.ReactNode
}

const defaultNavItems: NavItem[] = [
  { label: "Explore", href: "/trading" },
  { label: "Docs", href: "https://docs.sedona.ai", external: true },
]

const NavBar = React.forwardRef<HTMLElement, NavBarProps>(
  (
    {
      className,
      items = defaultNavItems,
      isAuthenticated = false,
      isConnecting = false,
      walletAddress,
      balance,
      showTagline = true,
      tagline = "Trade Smarter",
      onCreateAgent,
      onConnect,
      onDisconnect,
      onMobileMenuToggle,
      hideCreateButton = false,
      logo,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "flex items-center justify-between px-4 lg:px-6 py-2",
          "bg-zeus-surface-elevated border-b border-zeus-border-alpha",
          className
        )}
        role="navigation"
        aria-label="Main navigation"
        {...props}
      >
        {/* Left: Logo + Tagline */}
        <div className="flex items-center gap-2">
          <div className="flex items-center flex-shrink-0">
            {logo || (
              <SedonaLogo variant="logo" size="sm" className="text-sedona-500" />
            )}
          </div>
          {showTagline && (
            <span className="hidden sm:block text-caption-s text-zeus-text-tertiary leading-none">
              {tagline}
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-0.5">
          {/* Nav Links as buttons (desktop) */}
          {items.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              asChild
              className="hidden md:inline-flex h-6 px-2 text-caption-s text-zeus-text-secondary hover:text-zeus-text-primary"
            >
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {item.label}
                {item.external && <Icon icon="arrow-up-right-from-square" className="w-2.5 h-2.5 ml-1" />}
              </a>
            </Button>
          ))}

          {/* Create Agent Button (desktop) */}
          {!hideCreateButton && (
            <Button
              variant="default"
              size="sm"
              onClick={onCreateAgent}
              className="hidden sm:inline-flex h-6 px-2 text-caption-s bg-sedona-500 hover:bg-sedona-600 text-white"
            >
              <Icon icon="plus" className="w-2.5 h-2.5 mr-1" />
              Create Agent
            </Button>
          )}

          {/* Wallet Button */}
          <WalletButton
            isAuthenticated={isAuthenticated}
            isConnecting={isConnecting}
            walletAddress={walletAddress}
            balance={balance}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            size="xs"
          />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuToggle}
            className="md:hidden p-1.5"
            aria-label="Toggle mobile menu"
          >
            <Icon icon="bars" className="w-4 h-4" />
          </Button>
        </div>
      </nav>
    )
  }
)

NavBar.displayName = "NavBar"

export { NavBar }
