import { describe, it, expect, beforeEach } from "vitest"
import {
  type OnboardingV2State,
  type OnboardingPhase,
  ONBOARDING_PHASES,
  getOnboardingV2State,
  setOnboardingV2State,
  advancePhase,
  skipOnboarding,
  completeOnboarding,
  shouldShowOnboarding,
  resetOnboardingV2State,
} from "../onboarding-storage-v2"

beforeEach(() => {
  localStorage.clear()
})

describe("onboarding-storage-v2", () => {
  describe("getOnboardingV2State", () => {
    it("returns default state when nothing stored", () => {
      const state = getOnboardingV2State()
      expect(state.currentPhase).toBe("welcome")
      expect(state.completedAt).toBeNull()
      expect(state.skippedAt).toBeNull()
      expect(state.skippedPhase).toBeNull()
      expect(state.profileCompletedAt).toBeNull()
      expect(state.tourStepsViewed).toEqual([])
      expect(state.goalVariant).toBeNull()
      expect(state.goalCompleted).toBe(false)
    })

    it("reads stored state from localStorage", () => {
      const stored: OnboardingV2State = {
        currentPhase: "tour",
        completedAt: null,
        skippedAt: null,
        skippedPhase: null,
        profileCompletedAt: "2026-03-11T00:00:00Z",
        tourStepsViewed: [0, 1],
        goalVariant: null,
        goalCompleted: false,
      }
      localStorage.setItem("sedona_onboarding_v2", JSON.stringify(stored))
      expect(getOnboardingV2State()).toEqual(stored)
    })

    it("returns default state for corrupted JSON", () => {
      localStorage.setItem("sedona_onboarding_v2", "not-json")
      const state = getOnboardingV2State()
      expect(state.currentPhase).toBe("welcome")
    })
  })

  describe("advancePhase", () => {
    it("advances welcome -> profile", () => {
      const state = advancePhase("welcome")
      expect(state.currentPhase).toBe("profile")
    })

    it("advances profile -> tour and sets profileCompletedAt", () => {
      const state = advancePhase("profile")
      expect(state.currentPhase).toBe("tour")
      expect(state.profileCompletedAt).toBeTruthy()
    })

    it("advances tour -> goal", () => {
      const state = advancePhase("tour")
      expect(state.currentPhase).toBe("goal")
    })

    it("advances goal -> completed and sets completedAt", () => {
      const state = advancePhase("goal")
      expect(state.currentPhase).toBe("completed")
      expect(state.completedAt).toBeTruthy()
    })

    it("does nothing if already completed", () => {
      advancePhase("goal") // -> completed
      const state = advancePhase("completed")
      expect(state.currentPhase).toBe("completed")
    })
  })

  describe("skipOnboarding", () => {
    it("marks skipped with current phase and sets completed", () => {
      advancePhase("welcome") // -> profile
      const state = skipOnboarding()
      expect(state.currentPhase).toBe("completed")
      expect(state.skippedAt).toBeTruthy()
      expect(state.skippedPhase).toBe("profile")
    })
  })

  describe("completeOnboarding", () => {
    it("sets completed state", () => {
      const state = completeOnboarding()
      expect(state.currentPhase).toBe("completed")
      expect(state.completedAt).toBeTruthy()
    })
  })

  describe("shouldShowOnboarding", () => {
    it("returns true for fresh state", () => {
      expect(shouldShowOnboarding()).toBe(true)
    })

    it("returns false when completed", () => {
      completeOnboarding()
      expect(shouldShowOnboarding()).toBe(false)
    })

    it("returns false when skipped", () => {
      skipOnboarding()
      expect(shouldShowOnboarding()).toBe(false)
    })
  })

  describe("resetOnboardingV2State", () => {
    it("clears state back to defaults", () => {
      advancePhase("welcome")
      advancePhase("profile")
      resetOnboardingV2State()
      expect(getOnboardingV2State().currentPhase).toBe("welcome")
    })
  })
})
