import { beforeEach, describe, expect, it, vi } from "vitest"
import posthog from "posthog-js"
import {
  ANALYTICS_CONFIG,
  trackEmptyStateAction,
  trackFeedbackSubmitted,
  trackFirstRunStepCompleted,
  trackFirstRunViewed,
  trackOnboardingStarted,
  trackOnboardingSkipped,
  trackOnboardingProfileCompleted,
  trackOnboardingTourStarted,
  trackOnboardingTourStepViewed,
  trackOnboardingTourSkipped,
  trackOnboardingTourCompleted,
  trackOnboardingGoalShown,
  trackOnboardingGoalCompleted,
  trackOnboardingFlowCompleted,
} from "@/lib/analytics"

vi.mock("posthog-js", () => ({
  default: {
    init: vi.fn(),
    capture: vi.fn(),
    identify: vi.fn(),
    reset: vi.fn(),
    people: {
      set: vi.fn(),
    },
    isFeatureEnabled: vi.fn(),
    getFeatureFlag: vi.fn(),
  },
}))

describe("analytics helpers", () => {
  beforeEach(() => {
    ANALYTICS_CONFIG.apiKey = "ph_test"
    ANALYTICS_CONFIG.enabled = true
    ANALYTICS_CONFIG.debug = false
    vi.clearAllMocks()
  })

  it("captures first-run, feedback, and recovery CTA events", () => {
    trackFirstRunViewed("trading", 1, null)
    trackFirstRunStepCompleted(
      "profile",
      "give_feedback",
      ["explore_agents", "open_profile", "give_feedback"],
      true
    )
    trackFeedbackSubmitted({
      source: "trading_onboarding",
      category: "UX",
      hasEmail: true,
      messageLength: 144,
    })
    trackEmptyStateAction("trending_agents", "search_empty", "give_feedback")

    expect(posthog.capture).toHaveBeenNthCalledWith(1, "first_run_viewed", {
      surface: "trading",
      completed_steps: 1,
      dismissed_at: null,
    })
    expect(posthog.capture).toHaveBeenNthCalledWith(2, "first_run_step_completed", {
      surface: "profile",
      step: "give_feedback",
      completed_steps: ["explore_agents", "open_profile", "give_feedback"],
      has_completed_onboarding: true,
    })
    expect(posthog.capture).toHaveBeenNthCalledWith(3, "feedback_submitted", {
      source: "trading_onboarding",
      category: "UX",
      has_email: true,
      message_length: 144,
    })
    expect(posthog.capture).toHaveBeenNthCalledWith(4, "empty_state_cta_clicked", {
      surface: "trending_agents",
      variant: "search_empty",
      action: "give_feedback",
    })
  })
})

describe("onboarding v2 analytics", () => {
  beforeEach(() => {
    ANALYTICS_CONFIG.apiKey = "ph_test"
    ANALYTICS_CONFIG.enabled = true
    ANALYTICS_CONFIG.debug = false
    vi.clearAllMocks()
  })

  it("tracks onboarding_started", () => {
    trackOnboardingStarted()
    expect(posthog.capture).toHaveBeenCalledWith("onboarding_started", {})
  })

  it("tracks onboarding_skipped with phase", () => {
    trackOnboardingSkipped("profile")
    expect(posthog.capture).toHaveBeenCalledWith("onboarding_skipped", { phase: "profile" })
  })

  it("tracks onboarding_profile_completed", () => {
    trackOnboardingProfileCompleted()
    expect(posthog.capture).toHaveBeenCalledWith("onboarding_profile_completed", {})
  })

  it("tracks onboarding_tour_started", () => {
    trackOnboardingTourStarted()
    expect(posthog.capture).toHaveBeenCalledWith("onboarding_tour_started", {})
  })

  it("tracks onboarding_tour_step_viewed", () => {
    trackOnboardingTourStepViewed(2, "competitions")
    expect(posthog.capture).toHaveBeenCalledWith("onboarding_tour_step_viewed", {
      step_index: 2,
      step_name: "competitions",
    })
  })

  it("tracks onboarding_tour_skipped", () => {
    trackOnboardingTourSkipped(1)
    expect(posthog.capture).toHaveBeenCalledWith("onboarding_tour_skipped", {
      last_step_index: 1,
    })
  })

  it("tracks onboarding_tour_completed", () => {
    trackOnboardingTourCompleted()
    expect(posthog.capture).toHaveBeenCalledWith("onboarding_tour_completed", {})
  })

  it("tracks onboarding_goal_shown", () => {
    trackOnboardingGoalShown("trade")
    expect(posthog.capture).toHaveBeenCalledWith("onboarding_goal_shown", { variant: "trade" })
  })

  it("tracks onboarding_goal_completed", () => {
    trackOnboardingGoalCompleted("trade", "buy_agent")
    expect(posthog.capture).toHaveBeenCalledWith("onboarding_goal_completed", {
      variant: "trade",
      action: "buy_agent",
    })
  })

  it("tracks onboarding_completed with path", () => {
    trackOnboardingFlowCompleted("full")
    expect(posthog.capture).toHaveBeenCalledWith("onboarding_completed", { path: "full" })
  })
})
