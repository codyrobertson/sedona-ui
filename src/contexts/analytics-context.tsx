"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import {
  initAnalytics,
  isAnalyticsEnabled,
  track,
  identify,
  resetIdentity,
  setUserProperties,
  isFeatureEnabled,
  getFeatureFlag,
  trackPageView,
  trackWalletConnected,
  trackWalletDisconnected,
  trackAgentViewed,
  trackTrade,
  trackExternalLink,
  trackError,
  type AnalyticsEvent,
  type AnalyticsEventName,
} from "@/lib/analytics"

// =============================================================================
// CONTEXT TYPE
// =============================================================================

interface AnalyticsContextType {
  /** Whether analytics is currently enabled */
  isEnabled: boolean

  /** Track an event with type safety */
  track: <T extends AnalyticsEvent>(event: T["event"], properties: T["properties"]) => void

  /** Identify user (call after wallet connect) */
  identify: (userId: string, properties?: Record<string, unknown>) => void

  /** Reset identity (call after wallet disconnect) */
  reset: () => void

  /** Set user properties */
  setProperties: (properties: Record<string, unknown>) => void

  /** Check feature flag */
  isFeatureEnabled: (flag: string) => boolean

  /** Get feature flag value */
  getFeatureFlag: <T = unknown>(flag: string) => T | undefined

  // Convenience methods
  trackWalletConnected: (wallet: string, address?: string) => void
  trackWalletDisconnected: (wallet: string) => void
  trackAgentViewed: (agentId: string, agentName?: string) => void
  trackTrade: (
    agentId: string,
    action: "buy" | "sell",
    status: "initiated" | "completed" | "failed",
    details?: { amount?: number; txHash?: string; error?: string }
  ) => void
  trackExternalLink: (url: string, label?: string) => void
  trackError: (error: string, context?: string) => void
}

// =============================================================================
// CONTEXT
// =============================================================================

const AnalyticsContext = React.createContext<AnalyticsContextType | null>(null)

// =============================================================================
// PROVIDER
// =============================================================================

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [initialized, setInitialized] = React.useState(false)

  // Initialize PostHog on mount
  React.useEffect(() => {
    initAnalytics()
    setInitialized(true)
  }, [])

  // Track page views on route change
  React.useEffect(() => {
    if (!initialized) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    trackPageView(url, document.referrer)
  }, [pathname, searchParams, initialized])

  // Memoize context value
  const value = React.useMemo<AnalyticsContextType>(
    () => ({
      isEnabled: isAnalyticsEnabled(),
      track,
      identify,
      reset: resetIdentity,
      setProperties: setUserProperties,
      isFeatureEnabled,
      getFeatureFlag,
      trackWalletConnected,
      trackWalletDisconnected,
      trackAgentViewed,
      trackTrade,
      trackExternalLink,
      trackError,
    }),
    []
  )

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * Hook to access analytics functions
 *
 * @example
 * ```tsx
 * const { track, trackAgentViewed } = useAnalytics()
 *
 * // Type-safe event tracking
 * track('wallet_connected', { wallet: 'phantom' })
 *
 * // Convenience methods
 * trackAgentViewed('agent-123', 'My Agent')
 * ```
 */
export function useAnalytics(): AnalyticsContextType {
  const context = React.useContext(AnalyticsContext)

  if (!context) {
    // Return no-op functions if used outside provider
    // This allows components to work even without the provider
    return {
      isEnabled: false,
      track: () => {},
      identify: () => {},
      reset: () => {},
      setProperties: () => {},
      isFeatureEnabled: () => false,
      getFeatureFlag: () => undefined,
      trackWalletConnected: () => {},
      trackWalletDisconnected: () => {},
      trackAgentViewed: () => {},
      trackTrade: () => {},
      trackExternalLink: () => {},
      trackError: () => {},
    }
  }

  return context
}

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Track clicks on external links automatically
 *
 * @example
 * ```tsx
 * <TrackedLink href="https://discord.gg/sedona" label="Discord">
 *   Join Discord
 * </TrackedLink>
 * ```
 */
interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label?: string
  children: React.ReactNode
}

export function TrackedLink({ href, label, onClick, children, ...props }: TrackedLinkProps) {
  const { trackExternalLink } = useAnalytics()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href) {
      trackExternalLink(href, label)
    }
    onClick?.(e)
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

/**
 * Track when an element enters the viewport
 *
 * @example
 * ```tsx
 * <TrackImpression event="agent_viewed" properties={{ agent_id: '123' }}>
 *   <AgentCard />
 * </TrackImpression>
 * ```
 */
interface TrackImpressionProps<T extends AnalyticsEvent> {
  event: T["event"]
  properties: T["properties"]
  once?: boolean
  children: React.ReactNode
}

export function TrackImpression<T extends AnalyticsEvent>({
  event,
  properties,
  once = true,
  children,
}: TrackImpressionProps<T>) {
  const { track } = useAnalytics()
  const ref = React.useRef<HTMLDivElement>(null)
  const tracked = React.useRef(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !tracked.current)) {
            track(event, properties)
            tracked.current = true

            if (once) {
              observer.disconnect()
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [event, properties, once, track])

  return <div ref={ref}>{children}</div>
}
