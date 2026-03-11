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
    return JSON.parse(raw) as OnboardingV2State
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

  const currentIndex = ONBOARDING_PHASES.indexOf(fromPhase)
  const nextIndex = currentIndex + 1

  if (nextIndex >= ONBOARDING_PHASES.length) {
    return state
  }

  state.currentPhase = ONBOARDING_PHASES[nextIndex]

  if (fromPhase === "profile") {
    state.profileCompletedAt = new Date().toISOString()
  }

  if (state.currentPhase === "completed") {
    state.completedAt = new Date().toISOString()
  }

  setOnboardingV2State(state)
  return state
}

export function recordTourStep(stepIndex: number): OnboardingV2State {
  const state = getOnboardingV2State()
  if (!state.tourStepsViewed.includes(stepIndex)) {
    state.tourStepsViewed = [...state.tourStepsViewed, stepIndex]
  }
  setOnboardingV2State(state)
  return state
}

export function setGoalVariant(variant: string): OnboardingV2State {
  const state = getOnboardingV2State()
  state.goalVariant = variant
  setOnboardingV2State(state)
  return state
}

export function completeGoal(): OnboardingV2State {
  const state = getOnboardingV2State()
  state.goalCompleted = true
  setOnboardingV2State(state)
  return state
}

export function skipOnboarding(): OnboardingV2State {
  const state = getOnboardingV2State()
  state.skippedAt = new Date().toISOString()
  state.skippedPhase = state.currentPhase
  state.currentPhase = "completed"
  setOnboardingV2State(state)
  return state
}

export function completeOnboarding(): OnboardingV2State {
  const state = getOnboardingV2State()
  state.currentPhase = "completed"
  state.completedAt = new Date().toISOString()
  setOnboardingV2State(state)
  return state
}

export function shouldShowOnboarding(): boolean {
  const state = getOnboardingV2State()
  return state.currentPhase !== "completed"
}

export function resetOnboardingV2State(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
