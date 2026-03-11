export const ONBOARDING_PHASES = ["welcome", "profile", "tour", "goal", "completed"] as const
export type OnboardingPhase = (typeof ONBOARDING_PHASES)[number]

export interface OnboardingV2State {
  currentPhase: OnboardingPhase
  completedAt: string | null
  skippedAt: string | null
  skippedPhase: OnboardingPhase | null
  profileCompletedAt: string | null
  tourStepsViewed: number[]
  goalVariant: string | null
  goalCompleted: boolean
}

const STORAGE_KEY = "sedona_onboarding_v2"

const DEFAULT_STATE: OnboardingV2State = {
  currentPhase: "welcome",
  completedAt: null,
  skippedAt: null,
  skippedPhase: null,
  profileCompletedAt: null,
  tourStepsViewed: [],
  goalVariant: null,
  goalCompleted: false,
}

export function getOnboardingV2State(): OnboardingV2State {
  if (typeof window === "undefined") return { ...DEFAULT_STATE }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_STATE }
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT_STATE,
      ...parsed,
      tourStepsViewed: Array.isArray(parsed.tourStepsViewed) ? parsed.tourStepsViewed : [],
    }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

export function setOnboardingV2State(state: OnboardingV2State): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function advancePhase(fromPhase: OnboardingPhase): OnboardingV2State {
  const state = getOnboardingV2State()

  if (state.currentPhase === "completed") {
    return state
  }

  if (state.currentPhase !== fromPhase) {
    return state
  }

  const currentIndex = ONBOARDING_PHASES.indexOf(fromPhase)
  const nextIndex = currentIndex + 1

  if (nextIndex >= ONBOARDING_PHASES.length) {
    return state
  }

  const nextPhase = ONBOARDING_PHASES[nextIndex]
  const next: OnboardingV2State = {
    ...state,
    currentPhase: nextPhase,
    ...(fromPhase === "profile" ? { profileCompletedAt: new Date().toISOString() } : {}),
    ...(nextPhase === "completed" ? { completedAt: new Date().toISOString() } : {}),
  }
  setOnboardingV2State(next)
  return next
}

export function recordTourStep(stepIndex: number): OnboardingV2State {
  const state = getOnboardingV2State()
  const next: OnboardingV2State = {
    ...state,
    tourStepsViewed: state.tourStepsViewed.includes(stepIndex)
      ? state.tourStepsViewed
      : [...state.tourStepsViewed, stepIndex],
  }
  setOnboardingV2State(next)
  return next
}

export function setGoalVariant(variant: string): OnboardingV2State {
  const state = getOnboardingV2State()
  const next: OnboardingV2State = {
    ...state,
    goalVariant: variant,
  }
  setOnboardingV2State(next)
  return next
}

export function completeGoal(): OnboardingV2State {
  const state = getOnboardingV2State()
  const next: OnboardingV2State = {
    ...state,
    goalCompleted: true,
  }
  setOnboardingV2State(next)
  return next
}

export function skipOnboarding(): OnboardingV2State {
  const state = getOnboardingV2State()
  const next: OnboardingV2State = {
    ...state,
    skippedAt: new Date().toISOString(),
    skippedPhase: state.currentPhase,
    currentPhase: "completed",
  }
  setOnboardingV2State(next)
  return next
}

export function completeOnboarding(): OnboardingV2State {
  const state = getOnboardingV2State()
  const next: OnboardingV2State = {
    ...state,
    currentPhase: "completed",
    completedAt: new Date().toISOString(),
  }
  setOnboardingV2State(next)
  return next
}

export function shouldShowOnboarding(): boolean {
  const state = getOnboardingV2State()
  return state.currentPhase !== "completed"
}

export function resetOnboardingV2State(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
