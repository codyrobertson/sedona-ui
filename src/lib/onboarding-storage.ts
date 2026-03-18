import { isStorageAvailable } from "@/lib/profile-storage"

export const ONBOARDING_STEPS = [
  "explore_agents",
  "open_profile",
  "give_feedback",
] as const

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number]

export const DEFAULT_ONBOARDING_SCOPE = "guest"
export const ONBOARDING_SCOPE_STORAGE_KEY = "sedona_onboarding_scope"

export interface OnboardingState {
  completedSteps: OnboardingStep[]
  hasCompletedOnboarding: boolean
  dismissedAt: string | null
  viewedAt: string | null
}

const ONBOARDING_STORAGE_KEY = "sedona_onboarding_state"

export function getOnboardingStorageKey(scope = DEFAULT_ONBOARDING_SCOPE): string {
  return scope === DEFAULT_ONBOARDING_SCOPE
    ? ONBOARDING_STORAGE_KEY
    : `${ONBOARDING_STORAGE_KEY}:${scope}`
}

export function getWalletOnboardingScope(walletAddress?: string | null): string {
  const normalizedWallet = walletAddress?.trim()

  return normalizedWallet
    ? `wallet:${normalizedWallet}`
    : DEFAULT_ONBOARDING_SCOPE
}

function getDefaultOnboardingState(): OnboardingState {
  return {
    completedSteps: [],
    hasCompletedOnboarding: false,
    dismissedAt: null,
    viewedAt: null,
  }
}

function normalizeOnboardingState(value: unknown): OnboardingState {
  if (!value || typeof value !== "object") {
    return getDefaultOnboardingState()
  }

  const parsed = value as Partial<OnboardingState>
  const completedSteps = Array.isArray(parsed.completedSteps)
    ? parsed.completedSteps.filter((step): step is OnboardingStep =>
        ONBOARDING_STEPS.includes(step as OnboardingStep)
      )
    : []

  return {
    completedSteps,
    hasCompletedOnboarding: ONBOARDING_STEPS.every((step) => completedSteps.includes(step)),
    dismissedAt: typeof parsed.dismissedAt === "string" ? parsed.dismissedAt : null,
    viewedAt: typeof parsed.viewedAt === "string" ? parsed.viewedAt : null,
  }
}

function saveOnboardingState(state: OnboardingState, scope = DEFAULT_ONBOARDING_SCOPE): void {
  if (!isStorageAvailable()) return

  localStorage.setItem(getOnboardingStorageKey(scope), JSON.stringify(state))
}

export function getOnboardingState(scope = DEFAULT_ONBOARDING_SCOPE): OnboardingState {
  if (!isStorageAvailable()) return getDefaultOnboardingState()

  try {
    const rawState = localStorage.getItem(getOnboardingStorageKey(scope))

    if (!rawState) {
      return getDefaultOnboardingState()
    }

    return normalizeOnboardingState(JSON.parse(rawState))
  } catch {
    return getDefaultOnboardingState()
  }
}

export function setOnboardingState(
  state: Partial<OnboardingState>,
  scope = DEFAULT_ONBOARDING_SCOPE
): OnboardingState {
  const currentState = getOnboardingState(scope)
  const nextState = normalizeOnboardingState({
    ...currentState,
    ...state,
  })

  saveOnboardingState(nextState, scope)

  return nextState
}

export function completeOnboardingStep(
  step: OnboardingStep,
  scope = DEFAULT_ONBOARDING_SCOPE
): OnboardingState {
  const currentState = getOnboardingState(scope)
  const completedSteps = currentState.completedSteps.includes(step)
    ? currentState.completedSteps
    : [...currentState.completedSteps, step]

  return setOnboardingState({
    completedSteps,
  }, scope)
}

export function markOnboardingViewed(
  viewedAt = new Date().toISOString(),
  scope = DEFAULT_ONBOARDING_SCOPE
): OnboardingState {
  return setOnboardingState({
    viewedAt,
  }, scope)
}

export function markOnboardingDismissed(
  dismissedAt = new Date().toISOString(),
  scope = DEFAULT_ONBOARDING_SCOPE
): OnboardingState {
  return setOnboardingState({
    dismissedAt,
  }, scope)
}

export function shouldShowFirstRun(
  state = getOnboardingState()
): boolean {
  return !state.hasCompletedOnboarding && !state.dismissedAt
}

export function hasOnboardingProgress(scope = DEFAULT_ONBOARDING_SCOPE): boolean {
  const state = getOnboardingState(scope)

  return Boolean(
    state.completedSteps.length ||
      state.dismissedAt ||
      state.viewedAt
  )
}

export function migrateOnboardingState(
  fromScope = DEFAULT_ONBOARDING_SCOPE,
  toScope: string
): OnboardingState {
  const sourceState = getOnboardingState(fromScope)
  const targetState = getOnboardingState(toScope)

  const nextState = normalizeOnboardingState({
    completedSteps: Array.from(
      new Set([...sourceState.completedSteps, ...targetState.completedSteps])
    ),
    dismissedAt: targetState.dismissedAt ?? sourceState.dismissedAt,
    viewedAt: targetState.viewedAt ?? sourceState.viewedAt,
  })

  saveOnboardingState(nextState, toScope)

  return nextState
}

export function getActiveOnboardingScope(): string {
  if (!isStorageAvailable()) return DEFAULT_ONBOARDING_SCOPE

  return localStorage.getItem(ONBOARDING_SCOPE_STORAGE_KEY) || DEFAULT_ONBOARDING_SCOPE
}

export function setActiveOnboardingScope(scope: string): string {
  if (!isStorageAvailable()) return scope

  localStorage.setItem(ONBOARDING_SCOPE_STORAGE_KEY, scope)
  return scope
}

export function resetOnboardingState(scope = DEFAULT_ONBOARDING_SCOPE): void {
  if (!isStorageAvailable()) return

  localStorage.removeItem(getOnboardingStorageKey(scope))
}
