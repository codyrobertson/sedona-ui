"use client"

import * as React from "react"
import {
  trackFirstRunCompleted,
  trackFirstRunStepCompleted,
} from "@/lib/analytics"
import {
  completeOnboardingStep,
  DEFAULT_ONBOARDING_SCOPE,
  getActiveOnboardingScope,
  getOnboardingState,
  hasOnboardingProgress,
  migrateOnboardingState,
  resetOnboardingState,
  markOnboardingDismissed,
  markOnboardingViewed,
  setActiveOnboardingScope,
  type OnboardingState,
  type OnboardingStep,
} from "@/lib/onboarding-storage"

interface OnboardingContextValue {
  state: OnboardingState
  isReady: boolean
  isSheetOpen: boolean
  scope: string
  setScope: (scope: string) => void
  setSheetOpen: (open: boolean) => void
  completeStep: (step: OnboardingStep, surface?: string) => OnboardingState
  dismissOnboarding: () => OnboardingState
  markViewed: () => OnboardingState
  reset: () => void
  isStepCompleted: (step: OnboardingStep) => boolean
}

const defaultState = getOnboardingState()

const OnboardingContext = React.createContext<OnboardingContextValue | null>(null)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<OnboardingState>(defaultState)
  const [isReady, setIsReady] = React.useState(false)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [scope, setScopeState] = React.useState(DEFAULT_ONBOARDING_SCOPE)

  React.useEffect(() => {
    const activeScope = getActiveOnboardingScope()
    setScopeState(activeScope)
    setState(getOnboardingState(activeScope))
    setIsReady(true)
  }, [])

  const completeStep = React.useCallback((step: OnboardingStep, surface = "unknown") => {
    const previousState = getOnboardingState(scope)
    const nextState = completeOnboardingStep(step, scope)
    setState(nextState)

    const didCompleteStep =
      !previousState.completedSteps.includes(step) &&
      nextState.completedSteps.includes(step)

    if (didCompleteStep) {
      trackFirstRunStepCompleted(
        surface,
        step,
        nextState.completedSteps,
        nextState.hasCompletedOnboarding
      )
    }

    if (!previousState.hasCompletedOnboarding && nextState.hasCompletedOnboarding) {
      trackFirstRunCompleted(surface, nextState.completedSteps)
    }

    return nextState
  }, [scope])

  const dismissOnboarding = React.useCallback(() => {
    const nextState = markOnboardingDismissed(new Date().toISOString(), scope)
    setState(nextState)
    setIsSheetOpen(false)
    return nextState
  }, [scope])

  const markViewed = React.useCallback(() => {
    const nextState = markOnboardingViewed(new Date().toISOString(), scope)
    setState(nextState)
    return nextState
  }, [scope])

  const setScope = React.useCallback((nextScope: string) => {
    if (!nextScope || nextScope === scope) return

    const resolvedState =
      scope === DEFAULT_ONBOARDING_SCOPE &&
      !hasOnboardingProgress(nextScope) &&
      hasOnboardingProgress(scope)
        ? migrateOnboardingState(scope, nextScope)
        : getOnboardingState(nextScope)

    setActiveOnboardingScope(nextScope)
    setScopeState(nextScope)
    setState(resolvedState)
  }, [scope])

  const reset = React.useCallback(() => {
    resetOnboardingState(scope)
    setState(getOnboardingState(scope))
    setIsSheetOpen(false)
  }, [scope])

  const isStepCompleted = React.useCallback(
    (step: OnboardingStep) => state.completedSteps.includes(step),
    [state.completedSteps]
  )

  const value = React.useMemo<OnboardingContextValue>(
    () => ({
      state,
      isReady,
      isSheetOpen,
      scope,
      setScope,
      setSheetOpen: setIsSheetOpen,
      completeStep,
      dismissOnboarding,
      markViewed,
      reset,
      isStepCompleted,
    }),
    [state, isReady, isSheetOpen, scope, setScope, completeStep, dismissOnboarding, markViewed, reset, isStepCompleted]
  )

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = React.useContext(OnboardingContext)

  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider")
  }

  return context
}
