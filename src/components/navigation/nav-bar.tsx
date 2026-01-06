"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SedonaLogo } from "@/components/sedona/sedona-logo"
import { NavLink } from "./nav-link"
import { WalletButton } from "./wallet-button"
import { Menu, Plus } from "lucide-react"

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
          "flex items-center justify-between px-4 lg:px-6 py-3",
          "bg-zeus-surface-elevated border-b border-zeus-border-alpha",
          className
        )}
        role="navigation"
        aria-label="Main navigation"
        {...props}
      >
        {/* Left: Logo + Tagline */}
        <div className="flex items-center gap-3">
          {logo || (
            <SedonaLogo variant="logo" size="md" className="text-sedona-500" />
          )}
          {showTagline && (
            <span className="hidden sm:block text-caption-l text-zeus-text-tertiary">
              {tagline}
            </span>
          )}
        </div>

        {/* Center: Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              external={item.external}
              disabled={item.disabled}
              exact={item.exact}
              variant="default"
              size="md"
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Create Agent Button (desktop) */}
          {!hideCreateButton && (
            <Button
              variant="default"
              size="sm"
              onClick={onCreateAgent}
              className="hidden sm:inline-flex bg-sedona-500 hover:bg-sedona-600 text-white"
            >
              <Plus className="w-4 h-4 mr-1.5" />
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
            size="sm"
          />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuToggle}
            className="md:hidden p-2"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>
    )
  }
)

NavBar.displayName = "NavBar"

export { NavBar }
