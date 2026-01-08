/**
 * Analytics wrapper for PostHog
 *
 * Provides type-safe event tracking with automatic no-op when PostHog isn't configured.
 * Just add NEXT_PUBLIC_POSTHOG_KEY to your .env to enable.
 */

import posthog from 'posthog-js'

// =============================================================================
// CONFIGURATION
// =============================================================================

export const ANALYTICS_CONFIG = {
  // PostHog API key - when empty, analytics is disabled
  apiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || '',

  // PostHog API host
  apiHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',

  // Feature flag: explicitly disable even if key is set
  enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false',

  // Debug mode: logs events to console instead of sending
  debug: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true',
}

// Check if analytics should be active
export const isAnalyticsEnabled = (): boolean => {
  return Boolean(ANALYTICS_CONFIG.apiKey) && ANALYTICS_CONFIG.enabled
}

// =============================================================================
// EVENT TYPES - Type-safe event definitions
// =============================================================================

/**
 * All trackable events in Sedona
 * Add new events here for type safety
 */
export type AnalyticsEvent =
  // Page views
  | { event: 'page_view'; properties: { path: string; referrer?: string } }

  // Wallet events
  | { event: 'wallet_connected'; properties: { wallet: string; address?: string } }
  | { event: 'wallet_disconnected'; properties: { wallet: string } }

  // Competition events
  | { event: 'competition_viewed'; properties: { competition_id: string; competition_name?: string } }
  | { event: 'competition_entered'; properties: { competition_id: string } }

  // Agent events
  | { event: 'agent_viewed'; properties: { agent_id: string; agent_name?: string } }
  | { event: 'agent_submitted'; properties: { agent_id: string; agent_name: string } }
  | { event: 'agent_favorited'; properties: { agent_id: string } }

  // Trading events
  | { event: 'trade_initiated'; properties: { agent_id: string; action: 'buy' | 'sell'; amount?: number } }
  | { event: 'trade_completed'; properties: { agent_id: string; action: 'buy' | 'sell'; amount: number; tx_hash?: string } }
  | { event: 'trade_failed'; properties: { agent_id: string; action: 'buy' | 'sell'; error: string } }

  // Navigation events
  | { event: 'nav_clicked'; properties: { item: string; location: 'header' | 'footer' | 'sidebar' } }
  | { event: 'external_link_clicked'; properties: { url: string; label?: string } }
  | { event: 'docs_clicked'; properties: { section?: string } }
  | { event: 'discord_clicked'; properties: { source: string } }
  | { event: 'twitter_clicked'; properties: { source: string } }

  // Signup/conversion events
  | { event: 'email_signup_started'; properties: { location: string } }
  | { event: 'email_signup_completed'; properties: { location: string } }

  // Feature usage
  | { event: 'feature_used'; properties: { feature: string; details?: Record<string, unknown> } }

  // Errors (for debugging)
  | { event: 'error_occurred'; properties: { error: string; context?: string; stack?: string } }

  // Generic custom event (escape hatch)
  | { event: 'custom'; properties: { name: string; [key: string]: unknown } }

// Extract event names for convenience
export type AnalyticsEventName = AnalyticsEvent['event']

// =============================================================================
// CORE TRACKING FUNCTIONS
// =============================================================================

/**
 * Initialize PostHog
 * Call once in AnalyticsProvider
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return

  if (!isAnalyticsEnabled()) {
    if (ANALYTICS_CONFIG.debug) {
      console.log('[Analytics] Disabled - no API key or explicitly disabled')
    }
    return
  }

  posthog.init(ANALYTICS_CONFIG.apiKey, {
    api_host: ANALYTICS_CONFIG.apiHost,

    // Capture pageviews automatically
    capture_pageview: true,

    // Capture pageleaves for session duration
    capture_pageleave: true,

    // Session recording (enable when ready)
    disable_session_recording: true, // Set to false when you want recordings

    // Privacy settings
    mask_all_text: false,
    mask_all_element_attributes: false,

    // Performance
    autocapture: false, // We'll track specific events

    // Debug
    debug: ANALYTICS_CONFIG.debug,

    // Persistence
    persistence: 'localStorage+cookie',

    // Load lazily
    loaded: (posthog) => {
      if (ANALYTICS_CONFIG.debug) {
        console.log('[Analytics] PostHog initialized')
      }
    },
  })
}

/**
 * Track an event with type safety
 */
export function track<T extends AnalyticsEvent>(
  event: T['event'],
  properties: T['properties']
): void {
  if (ANALYTICS_CONFIG.debug) {
    console.log('[Analytics] Track:', event, properties)
  }

  if (!isAnalyticsEnabled()) return

  posthog.capture(event, properties)
}

/**
 * Identify a user (call after wallet connect)
 */
export function identify(
  userId: string,
  properties?: Record<string, unknown>
): void {
  if (ANALYTICS_CONFIG.debug) {
    console.log('[Analytics] Identify:', userId, properties)
  }

  if (!isAnalyticsEnabled()) return

  posthog.identify(userId, properties)
}

/**
 * Reset user identity (call after wallet disconnect)
 */
export function resetIdentity(): void {
  if (ANALYTICS_CONFIG.debug) {
    console.log('[Analytics] Reset identity')
  }

  if (!isAnalyticsEnabled()) return

  posthog.reset()
}

/**
 * Set user properties without identifying
 */
export function setUserProperties(properties: Record<string, unknown>): void {
  if (ANALYTICS_CONFIG.debug) {
    console.log('[Analytics] Set properties:', properties)
  }

  if (!isAnalyticsEnabled()) return

  posthog.people.set(properties)
}

/**
 * Check if a feature flag is enabled
 */
export function isFeatureEnabled(flag: string): boolean {
  if (!isAnalyticsEnabled()) return false

  return posthog.isFeatureEnabled(flag) ?? false
}

/**
 * Get feature flag value
 */
export function getFeatureFlag<T = unknown>(flag: string): T | undefined {
  if (!isAnalyticsEnabled()) return undefined

  return posthog.getFeatureFlag(flag) as T | undefined
}

// =============================================================================
// CONVENIENCE HELPERS
// =============================================================================

/**
 * Track page view (usually automatic, but can call manually)
 */
export function trackPageView(path: string, referrer?: string): void {
  track('page_view', { path, referrer })
}

/**
 * Track wallet connection
 */
export function trackWalletConnected(wallet: string, address?: string): void {
  track('wallet_connected', { wallet, address })

  // Also identify the user by wallet address
  if (address) {
    identify(address, { wallet })
  }
}

/**
 * Track wallet disconnection
 */
export function trackWalletDisconnected(wallet: string): void {
  track('wallet_disconnected', { wallet })
  resetIdentity()
}

/**
 * Track agent view
 */
export function trackAgentViewed(agentId: string, agentName?: string): void {
  track('agent_viewed', { agent_id: agentId, agent_name: agentName })
}

/**
 * Track trade
 */
export function trackTrade(
  agentId: string,
  action: 'buy' | 'sell',
  status: 'initiated' | 'completed' | 'failed',
  details?: { amount?: number; txHash?: string; error?: string }
): void {
  if (status === 'initiated') {
    track('trade_initiated', { agent_id: agentId, action, amount: details?.amount })
  } else if (status === 'completed') {
    track('trade_completed', {
      agent_id: agentId,
      action,
      amount: details?.amount ?? 0,
      tx_hash: details?.txHash
    })
  } else {
    track('trade_failed', {
      agent_id: agentId,
      action,
      error: details?.error ?? 'Unknown error'
    })
  }
}

/**
 * Track external link click
 */
export function trackExternalLink(url: string, label?: string): void {
  track('external_link_clicked', { url, label })
}

/**
 * Track error
 */
export function trackError(error: string, context?: string): void {
  track('error_occurred', { error, context })
}
