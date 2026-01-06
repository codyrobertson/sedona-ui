"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { AnnouncementBar, type AnnouncementBarProps } from "./announcement-bar"
import { NavBar, type NavBarProps, type NavItem } from "./nav-bar"
import { StatsBar, type StatsBarProps, type TopPoolItem, type TradeItem } from "./stats-bar"
import { MobileMenu, type MobileNavItem } from "./mobile-menu"
import {
  NavigationProvider,
  useNavigation,
  type NavigationProviderProps,
} from "./use-navigation"

export interface AnnouncementConfig extends Omit<AnnouncementBarProps, "onDismiss" | "isDismissed"> {}

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Navigation items */
  navItems?: NavItem[]
  /** Announcement bar configuration */
  announcement?: AnnouncementConfig
  /** Whether to show announcement bar */
  showAnnouncement?: boolean
  /** Whether to show stats bar */
  showStatsBar?: boolean
  /** Stats bar props */
  statsBarProps?: Omit<StatsBarProps, "ref">
  /** Nav bar props */
  navBarProps?: Omit<NavBarProps, "ref" | "items" | "isAuthenticated" | "isConnecting" | "walletAddress" | "balance" | "onConnect" | "onDisconnect" | "onMobileMenuToggle">
  /** Create agent callback */
  onCreateAgent?: () => void
  /** Connect callback */
  onConnect?: () => void | Promise<void>
  /** Disconnect callback */
  onDisconnect?: () => void | Promise<void>
  /** Initial auth state */
  isAuthenticated?: boolean
  /** Wallet address */
  walletAddress?: string
  /** Balance */
  balance?: number
  /** Header variant */
  variant?: "full" | "compact" | "minimal"
}

const defaultNavItems: NavItem[] = [
  { label: "Explore", href: "/trading" },
  { label: "Docs", href: "https://docs.sedona.ai", external: true },
]

const defaultAnnouncement: AnnouncementConfig = {
  message: "Season 2 is live! Check out the new features.",
  href: "/announcements/season-2",
  linkText: "Learn more",
  icon: "flame",
  variant: "accent",
}

/**
 * Inner component that uses the navigation context
 */
function AppHeaderInner({
  className,
  navItems = defaultNavItems,
  announcement = defaultAnnouncement,
  showAnnouncement = true,
  showStatsBar = true,
  statsBarProps,
  navBarProps,
  onCreateAgent,
  variant = "full",
  ...props
}: Omit<AppHeaderProps, "onConnect" | "onDisconnect" | "isAuthenticated" | "walletAddress" | "balance">) {
  const {
    isAuthenticated,
    walletAddress,
    balance,
    isConnecting,
    announcementDismissed,
    mobileMenuOpen,
    connect,
    disconnect,
    dismissAnnouncement,
    toggleMobileMenu,
    closeMobileMenu,
  } = useNavigation()

  const showAnnouncementBar = showAnnouncement && !announcementDismissed && announcement

  // Convert nav items to mobile nav items
  const mobileNavItems: MobileNavItem[] = navItems.map((item) => ({
    label: item.label,
    href: item.href,
    external: item.external,
    disabled: item.disabled,
    exact: item.exact,
  }))

  return (
    <>
      <header
        className={cn("sticky top-0 z-30 w-full", className)}
        role="banner"
        {...props}
      >
        {/* Announcement Bar */}
        {showAnnouncementBar && (
          <AnnouncementBar
            {...announcement}
            isDismissed={announcementDismissed}
            onDismiss={dismissAnnouncement}
          />
        )}

        {/* Navigation Bar */}
        <NavBar
          items={navItems}
          isAuthenticated={isAuthenticated}
          isConnecting={isConnecting}
          walletAddress={walletAddress}
          balance={balance}
          onCreateAgent={onCreateAgent}
          onConnect={connect}
          onDisconnect={disconnect}
          onMobileMenuToggle={toggleMobileMenu}
          {...navBarProps}
        />

        {/* Stats Bar (full variant only) */}
        {showStatsBar && variant === "full" && (
          <StatsBar {...statsBarProps} />
        )}
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        items={mobileNavItems}
        isAuthenticated={isAuthenticated}
        isConnecting={isConnecting}
        walletAddress={walletAddress}
        balance={balance}
        onCreateAgent={onCreateAgent}
        onConnect={connect}
        onDisconnect={disconnect}
      />
    </>
  )
}

/**
 * AppHeader - Composed navigation header
 *
 * Includes:
 * - Announcement bar (dismissible)
 * - Navigation bar (logo, links, actions)
 * - Stats bar (platform metrics + marquee)
 * - Mobile menu (slide-out drawer)
 *
 * Variants:
 * - full: All sections visible (landing/main pages)
 * - compact: No stats bar (detail pages)
 * - minimal: Only nav bar (auth pages)
 */
function AppHeader({
  onConnect,
  onDisconnect,
  isAuthenticated = false,
  walletAddress,
  balance,
  ...props
}: AppHeaderProps) {
  return (
    <NavigationProvider
      initialAuthenticated={isAuthenticated}
      initialWalletAddress={walletAddress}
      initialBalance={balance}
      onConnect={onConnect}
      onDisconnect={onDisconnect}
    >
      <AppHeaderInner {...props} />
    </NavigationProvider>
  )
}

export { AppHeader }
export type { NavItem, TopPoolItem, TradeItem }
