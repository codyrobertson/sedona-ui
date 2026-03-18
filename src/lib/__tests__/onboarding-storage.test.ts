import { beforeEach, describe, expect, it } from "vitest"
import {
  ONBOARDING_STEPS,
  completeOnboardingStep,
  getOnboardingState,
  getOnboardingStorageKey,
  markOnboardingDismissed,
  markOnboardingViewed,
  migrateOnboardingState,
  resetOnboardingState,
  setOnboardingState,
  shouldShowFirstRun,
} from "../onboarding-storage"

describe("onboarding-storage", () => {
  beforeEach(() => {
    localStorage.clear()
    resetOnboardingState()
  })

  it("defaults to a new first-run state when nothing is stored", () => {
    expect(getOnboardingState()).toEqual({
      completedSteps: [],
      hasCompletedOnboarding: false,
      dismissedAt: null,
      viewedAt: null,
    })
    expect(shouldShowFirstRun()).toBe(true)
  })

  it("persists manual state updates", () => {
    const nextState = setOnboardingState({
      completedSteps: ["explore_agents"],
      hasCompletedOnboarding: false,
      viewedAt: "2026-03-11T12:00:00.000Z",
      dismissedAt: "2026-03-11T12:05:00.000Z",
    })

    expect(nextState).toEqual({
      completedSteps: ["explore_agents"],
      hasCompletedOnboarding: false,
      viewedAt: "2026-03-11T12:00:00.000Z",
      dismissedAt: "2026-03-11T12:05:00.000Z",
    })

    expect(getOnboardingState()).toEqual(nextState)
    expect(shouldShowFirstRun()).toBe(false)
  })

  it("marks onboarding viewed without completing it", () => {
    const viewedState = markOnboardingViewed("2026-03-11T12:10:00.000Z")

    expect(viewedState).toEqual({
      completedSteps: [],
      hasCompletedOnboarding: false,
      dismissedAt: null,
      viewedAt: "2026-03-11T12:10:00.000Z",
    })

    expect(shouldShowFirstRun()).toBe(true)
  })

  it("marks onboarding complete after every required step is finished", () => {
    for (const step of ONBOARDING_STEPS) {
      completeOnboardingStep(step)
    }

    expect(getOnboardingState()).toEqual({
      completedSteps: [...ONBOARDING_STEPS],
      hasCompletedOnboarding: true,
      dismissedAt: null,
      viewedAt: null,
    })

    expect(shouldShowFirstRun()).toBe(false)
  })

  it("marks onboarding dismissed and keeps the dismissal timestamp", () => {
    const dismissedState = markOnboardingDismissed("2026-03-11T12:15:00.000Z")

    expect(dismissedState).toEqual({
      completedSteps: [],
      hasCompletedOnboarding: false,
      dismissedAt: "2026-03-11T12:15:00.000Z",
      viewedAt: null,
    })

    expect(shouldShowFirstRun()).toBe(false)
  })

  it("falls back to the default state for malformed localStorage data", () => {
    localStorage.setItem("sedona_onboarding_state", "{not-json")

    expect(getOnboardingState()).toEqual({
      completedSteps: [],
      hasCompletedOnboarding: false,
      dismissedAt: null,
      viewedAt: null,
    })
  })

  it("stores onboarding state by scope without leaking between identities", () => {
    completeOnboardingStep("explore_agents", "guest")
    completeOnboardingStep("open_profile", "wallet:abc123")

    expect(getOnboardingState("guest").completedSteps).toEqual(["explore_agents"])
    expect(getOnboardingState("wallet:abc123").completedSteps).toEqual(["open_profile"])
    expect(getOnboardingState("wallet:missing")).toEqual({
      completedSteps: [],
      hasCompletedOnboarding: false,
      dismissedAt: null,
      viewedAt: null,
    })
  })

  it("migrates anonymous onboarding progress into a wallet scope", () => {
    completeOnboardingStep("explore_agents", "guest")
    markOnboardingViewed("2026-03-11T12:20:00.000Z", "guest")

    const migrated = migrateOnboardingState("guest", "wallet:J181")

    expect(migrated).toEqual({
      completedSteps: ["explore_agents"],
      hasCompletedOnboarding: false,
      dismissedAt: null,
      viewedAt: "2026-03-11T12:20:00.000Z",
    })
    expect(getOnboardingState("wallet:J181")).toEqual(migrated)
    expect(localStorage.getItem(getOnboardingStorageKey("wallet:J181"))).not.toBeNull()
  })
})
