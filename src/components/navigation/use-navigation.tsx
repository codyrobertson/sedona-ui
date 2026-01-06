"use client"

import * as React from "react"

export interface NavigationState {
  /** Whether user is authenticated */
  isAuthenticated: boolean
  /** Connected wallet address */
  walletAddress?: string
  /** Wallet balance in SOL */
  balance?: number
  /** Whether wallet is currently connecting */
  isConnecting: boolean
  /** Whether announcement banner is dismissed */
  announcementDismissed: boolean
  /** Whether mobile menu is open */
  mobileMenuOpen: boolean
}

export interface NavigationActions {
  /** Connect wallet */
  connect: () => void
  /** Disconnect wallet */
  disconnect: () => void
  /** Dismiss announcement banner */
  dismissAnnouncement: () => void
  /** Toggle mobile menu */
  toggleMobileMenu: () => void
  /** Close mobile menu */
  closeMobileMenu: () => void
}

export interface NavigationContextValue extends NavigationState, NavigationActions {}

const NavigationContext = React.createContext<NavigationContextValue | null>(null)

export interface NavigationProviderProps {
  children: React.ReactNode
  /** Initial authentication state */
  initialAuthenticated?: boolean
  /** Initial wallet address */
  initialWalletAddress?: string
  /** Initial balance */
  initialBalance?: number
  /** Callback when connect is triggered */
  onConnect?: () => void | Promise<void>
  /** Callback when disconnect is triggered */
  onDisconnect?: () => void | Promise<void>
}

export function NavigationProvider({
  children,
  initialAuthenticated = false,
  initialWalletAddress,
  initialBalance,
  onConnect,
  onDisconnect,
}: NavigationProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(initialAuthenticated)
  const [walletAddress, setWalletAddress] = React.useState(initialWalletAddress)
  const [balance, setBalance] = React.useState(initialBalance)
  const [isConnecting, setIsConnecting] = React.useState(false)
  const [announcementDismissed, setAnnouncementDismissed] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  // Sync with external state changes
  React.useEffect(() => {
    setIsAuthenticated(initialAuthenticated)
    setWalletAddress(initialWalletAddress)
    setBalance(initialBalance)
  }, [initialAuthenticated, initialWalletAddress, initialBalance])

  const connect = React.useCallback(async () => {
    setIsConnecting(true)
    try {
      await onConnect?.()
      // Note: actual auth state should be set by parent via initialAuthenticated
    } finally {
      setIsConnecting(false)
    }
  }, [onConnect])

  const disconnect = React.useCallback(async () => {
    await onDisconnect?.()
    // Note: actual auth state should be set by parent via initialAuthenticated
  }, [onDisconnect])

  const dismissAnnouncement = React.useCallback(() => {
    setAnnouncementDismissed(true)
    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("announcement-dismissed", "true")
    }
  }, [])

  const toggleMobileMenu = React.useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = React.useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  // Check localStorage for announcement dismissal on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("announcement-dismissed")
      if (dismissed === "true") {
        setAnnouncementDismissed(true)
      }
    }
  }, [])

  // Close mobile menu on route change (escape key)
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  const value = React.useMemo<NavigationContextValue>(
    () => ({
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
    }),
    [
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
    ]
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation(): NavigationContextValue {
  const context = React.useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}

/** Optional hook that returns null if outside provider (for optional usage) */
export function useNavigationOptional(): NavigationContextValue | null {
  return React.useContext(NavigationContext)
}
