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

  // Onboarding / first-run events
  | {
      event: 'first_run_step_completed'
      properties: {
        surface: string
        step: string
        completed_steps: string[]
        has_completed_onboarding: boolean
      }
    }
  | {
      event: 'first_run_viewed'
      properties: {
        surface: string
        completed_steps: number
        dismissed_at?: string | null
      }
    }
  | {
      event: 'first_run_completed'
      properties: {
        surface: string
        completed_steps: string[]
      }
    }
  | {
      event: 'first_run_dismissed'
      properties: {
        surface: string
        completed_steps: string[]
      }
    }

  // Empty and error state analytics
  | {
      event: 'empty_state_viewed'
      properties: {
        surface: string
        variant: string
        has_action?: boolean
      }
    }
  | {
      event: 'empty_state_cta_clicked'
      properties: {
        surface: string
        variant: string
        action: string
      }
    }
  | {
      event: 'error_state_viewed'
      properties: {
        surface: string
        error_code?: string
        recoverable?: boolean
      }
    }
  | {
      event: 'error_state_recovery_clicked'
      properties: {
        surface: string
        action: string
        error_code?: string
      }
    }

  // Feedback collection
  | {
      event: 'feedback_opened'
      properties: {
        source: string
        mode: 'dialog' | 'survey'
      }
    }
  | {
      event: 'feedback_submitted'
      properties: {
        source: string
        category?: string
        delivery?: 'posthog' | 'mailto_fallback'
        rating?: number
        name?: string
        email?: string
        subject?: string
        message?: string
        has_email?: boolean
        message_length?: number
      }
    }
  | {
      event: 'feedback_cancelled'
      properties: {
        source: string
        mode: 'dialog' | 'survey'
      }
    }
  | {
      event: 'feedback_mailto_opened'
      properties: {
        source: string
        category?: string
      }
    }

  // Onboarding v2 events
  | { event: 'onboarding_started'; properties: Record<string, never> }
  | { event: 'onboarding_skipped'; properties: { phase: string } }
  | { event: 'onboarding_profile_completed'; properties: Record<string, never> }
  | { event: 'onboarding_tour_started'; properties: Record<string, never> }
  | { event: 'onboarding_tour_step_viewed'; properties: { step_index: number; step_name: string } }
  | { event: 'onboarding_tour_skipped'; properties: { last_step_index: number } }
  | { event: 'onboarding_tour_completed'; properties: Record<string, never> }
  | { event: 'onboarding_goal_shown'; properties: { variant: string } }
  | { event: 'onboarding_goal_completed'; properties: { variant: string; action: string } }
  | { event: 'onboarding_completed'; properties: { path: 'full' | 'skipped' | 'partial' } }

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
  if (typeof window === 'undefined') return

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
  if (typeof window === 'undefined') return

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
  if (typeof window === 'undefined') return

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
  if (typeof window === 'undefined') return

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
  if (typeof window === 'undefined') return false
  if (!isAnalyticsEnabled()) return false

  return posthog.isFeatureEnabled(flag) ?? false
}

/**
 * Get feature flag value
 */
export function getFeatureFlag<T = unknown>(flag: string): T | undefined {
  if (typeof window === 'undefined') return undefined
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

export function trackFirstRunViewed(
  surface: string,
  completedSteps: number,
  dismissedAt?: string | null
): void {
  track('first_run_viewed', {
    surface,
    completed_steps: completedSteps,
    dismissed_at: dismissedAt,
  })
}

export function trackFirstRunStepCompleted(
  surface: string,
  step: string,
  completedSteps: string[],
  hasCompletedOnboarding: boolean
): void {
  track('first_run_step_completed', {
    surface,
    step,
    completed_steps: completedSteps,
    has_completed_onboarding: hasCompletedOnboarding,
  })
}

export function trackFirstRunCompleted(
  surface: string,
  completedSteps: string[]
): void {
  track('first_run_completed', {
    surface,
    completed_steps: completedSteps,
  })
}

export function trackFirstRunDismissed(
  surface: string,
  completedSteps: string[]
): void {
  track('first_run_dismissed', {
    surface,
    completed_steps: completedSteps,
  })
}

export function trackEmptyStateViewed(
  surface: string,
  variant: string,
  hasAction = false
): void {
  track('empty_state_viewed', {
    surface,
    variant,
    has_action: hasAction,
  })
}

export function trackEmptyStateAction(
  surface: string,
  variant: string,
  action: string
): void {
  track('empty_state_cta_clicked', {
    surface,
    variant,
    action,
  })
}

export function trackErrorStateViewed(
  surface: string,
  errorCode?: string,
  recoverable?: boolean
): void {
  track('error_state_viewed', {
    surface,
    error_code: errorCode,
    recoverable,
  })
}

export function trackErrorStateRecovery(
  surface: string,
  action: string,
  errorCode?: string
): void {
  track('error_state_recovery_clicked', {
    surface,
    action,
    error_code: errorCode,
  })
}

export function trackFeedbackOpened(source: string, mode: 'dialog' | 'survey' = 'dialog'): void {
  track('feedback_opened', { source, mode })
}

export function trackFeedbackCancelled(source: string, mode: 'dialog' | 'survey' = 'dialog'): void {
  track('feedback_cancelled', { source, mode })
}

export function trackFeedbackSubmitted({
  source,
  category,
  delivery,
  rating,
  name,
  email,
  subject,
  message,
  hasEmail,
  messageLength,
}: {
  source: string
  category?: string
  delivery?: 'posthog' | 'mailto_fallback'
  rating?: number
  name?: string
  email?: string
  subject?: string
  message?: string
  hasEmail?: boolean
  messageLength?: number
}): void {
  track('feedback_submitted', {
    source,
    category,
    delivery,
    rating,
    name,
    email,
    subject,
    message,
    has_email: hasEmail,
    message_length: messageLength,
  })
}

export function trackFeedbackMailtoOpened(source: string, category?: string): void {
  track('feedback_mailto_opened', {
    source,
    category,
  })
}

// =============================================================================
// ONBOARDING V2 HELPERS
// =============================================================================

export function trackOnboardingStarted(): void {
  track('onboarding_started', {})
}

export function trackOnboardingSkipped(phase: string): void {
  track('onboarding_skipped', { phase })
}

export function trackOnboardingProfileCompleted(): void {
  track('onboarding_profile_completed', {})
}

export function trackOnboardingTourStarted(): void {
  track('onboarding_tour_started', {})
}

export function trackOnboardingTourStepViewed(stepIndex: number, stepName: string): void {
  track('onboarding_tour_step_viewed', { step_index: stepIndex, step_name: stepName })
}

export function trackOnboardingTourSkipped(lastStepIndex: number): void {
  track('onboarding_tour_skipped', { last_step_index: lastStepIndex })
}

export function trackOnboardingTourCompleted(): void {
  track('onboarding_tour_completed', {})
}

export function trackOnboardingGoalShown(variant: string): void {
  track('onboarding_goal_shown', { variant })
}

export function trackOnboardingGoalCompleted(variant: string, action: string): void {
  track('onboarding_goal_completed', { variant, action })
}

export function trackOnboardingFlowCompleted(path: 'full' | 'skipped' | 'partial'): void {
  track('onboarding_completed', { path })
}

/**
 * Track error
 */
export function trackError(error: string, context?: string): void {
  track('error_occurred', { error, context })
}
