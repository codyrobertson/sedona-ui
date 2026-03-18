"use client"

import * as React from "react"
import {
  type OnboardingPhase,
  type OnboardingV2State,
  getOnboardingV2State,
  advancePhase,
  skipOnboarding,
  completeOnboarding,
  recordTourStep,
  setGoalVariant,
  completeGoal,
  resetOnboardingV2State,
  shouldShowOnboarding,
} from "@/lib/onboarding-storage-v2"

interface OnboardingV2ContextValue {
  state: OnboardingV2State
  isReady: boolean
  advance: (fromPhase: OnboardingPhase) => OnboardingV2State
  skip: () => OnboardingV2State
  complete: () => OnboardingV2State
  trackTourStep: (index: number) => void
  setGoal: (variant: string) => void
  markGoalCompleted: () => void
  reset: () => void
  shouldShow: boolean
}

const OnboardingV2Context = React.createContext<OnboardingV2ContextValue | null>(null)

export function OnboardingV2Provider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<OnboardingV2State>(() => ({
    currentPhase: "welcome",
    completedAt: null,
    skippedAt: null,
    skippedPhase: null,
    profileCompletedAt: null,
    tourStepsViewed: [],
    goalVariant: null,
    goalCompleted: false,
  }))
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    setState(getOnboardingV2State())
    setIsReady(true)
  }, [])

  const advance = React.useCallback((fromPhase: OnboardingPhase) => {
    const next = advancePhase(fromPhase)
    setState(next)
    return next
  }, [])

  const skip = React.useCallback(() => {
    const next = skipOnboarding()
    setState(next)
    return next
  }, [])

  const completeFlow = React.useCallback(() => {
    const next = completeOnboarding()
    setState(next)
    return next
  }, [])

  const trackTourStep = React.useCallback((index: number) => {
    const next = recordTourStep(index)
    setState(next)
  }, [])

  const setGoal = React.useCallback((variant: string) => {
    const next = setGoalVariant(variant)
    setState(next)
  }, [])

  const markGoalCompleted = React.useCallback(() => {
    const next = completeGoal()
    setState(next)
  }, [])

  const reset = React.useCallback(() => {
    resetOnboardingV2State()
    setState(getOnboardingV2State())
  }, [])

  const value = React.useMemo<OnboardingV2ContextValue>(
    () => ({
      state,
      isReady,
      advance,
      skip,
      complete: completeFlow,
      trackTourStep,
      setGoal,
      markGoalCompleted,
      reset,
      shouldShow: isReady && shouldShowOnboarding(),
    }),
    [state, isReady, advance, skip, completeFlow, trackTourStep, setGoal, markGoalCompleted, reset],
  )

  return (
    <OnboardingV2Context.Provider value={value}>
      {children}
    </OnboardingV2Context.Provider>
  )
}

export function useOnboardingV2() {
  const ctx = React.useContext(OnboardingV2Context)
  if (!ctx) throw new Error("useOnboardingV2 must be used within OnboardingV2Provider")
  return ctx
}
