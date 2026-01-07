"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NavLink, type NavLinkProps } from "./nav-link"
import { WalletButton } from "./wallet-button"
import { Icon } from "@/components/ui/icon"

export interface MobileNavItem {
  label: string
  href: string
  external?: boolean
  disabled?: boolean
  exact?: boolean
  icon?: React.ReactNode
}

export interface MobileMenuProps {
  /** Whether menu is open */
  isOpen: boolean
  /** Close menu callback */
  onClose: () => void
  /** Navigation items */
  items?: MobileNavItem[]
  /** Whether user is authenticated */
  isAuthenticated?: boolean
  /** Whether wallet is connecting */
  isConnecting?: boolean
  /** Wallet address */
  walletAddress?: string
  /** Wallet balance */
  balance?: number
  /** Create agent callback */
  onCreateAgent?: () => void
  /** Connect callback */
  onConnect?: () => void
  /** Disconnect callback */
  onDisconnect?: () => void
  /** Custom class name */
  className?: string
}

const MobileMenu = React.forwardRef<HTMLDivElement, MobileMenuProps>(
  (
    {
      isOpen,
      onClose,
      items = [],
      isAuthenticated = false,
      isConnecting = false,
      walletAddress,
      balance,
      onCreateAgent,
      onConnect,
      onDisconnect,
      className,
    },
    ref
  ) => {
    // Lock body scroll when open
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
      return () => {
        document.body.style.overflow = ""
      }
    }, [isOpen])

    // Handle escape key
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          onClose()
        }
      }
      window.addEventListener("keydown", handleEscape)
      return () => window.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    const handleNavClick = () => {
      onClose()
    }

    const handleCreateAgent = () => {
      onClose()
      onCreateAgent?.()
    }

    return (
      <>
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 bg-black/60 z-40 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          ref={ref}
          className={cn(
            "fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50",
            "bg-zeus-surface-default border-l border-zeus-border-alpha",
            "transform transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full",
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zeus-border-alpha">
            <span className="text-body-s font-semibold text-zeus-text-primary">
              Menu
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
              aria-label="Close menu"
            >
              <Icon icon="xmark" className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {items.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                external={item.external}
                disabled={item.disabled}
                exact={item.exact}
                variant="pill"
                size="lg"
                onClick={handleNavClick}
                className="w-full justify-start py-3"
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zeus-border-alpha bg-zeus-surface-default">
            <div className="space-y-3">
              {/* Create Agent Button */}
              <Button
                variant="default"
                onClick={handleCreateAgent}
                className="w-full bg-sedona-500 hover:bg-sedona-600 text-white"
              >
                <Icon icon="plus" className="w-4 h-4 mr-2" />
                Create Agent
              </Button>

              {/* Wallet */}
              <div className="flex justify-center">
                <WalletButton
                  isAuthenticated={isAuthenticated}
                  isConnecting={isConnecting}
                  walletAddress={walletAddress}
                  balance={balance}
                  onConnect={onConnect}
                  onDisconnect={onDisconnect}
                  size="md"
                  className="w-full justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
)

MobileMenu.displayName = "MobileMenu"

export { MobileMenu }
