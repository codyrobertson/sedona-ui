# Onboarding Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the 3-step pick-any onboarding checklist with a linear flow: Welcome Sheet → Profile Page → Spotlight Tour → Goal Action → Done.

**Architecture:** New onboarding state model tracks a single `currentPhase` instead of individual steps. A dedicated `/onboarding/profile` route handles profile setup. A custom spotlight tour component overlays the live trading page. PostHog tracks every transition. Admin-configurable goal action at the end.

**Tech Stack:** Next.js 14 App Router, React Context, localStorage, PostHog (`posthog-js`), Radix Sheet, Tailwind (Zeus/Sedona tokens), Vitest + Testing Library.

---

## Task 1: Onboarding Storage V2

Replace the step-based storage model with a linear phase model.

**Files:**
- Create: `src/lib/onboarding-storage-v2.ts`
- Create: `src/lib/__tests__/onboarding-storage-v2.test.ts`

**Step 1: Write the failing tests**

```typescript
// src/lib/__tests__/onboarding-storage-v2.test.ts
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
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/__tests__/onboarding-storage-v2.test.ts`
Expected: FAIL — module not found

**Step 3: Write the implementation**

```typescript
// src/lib/onboarding-storage-v2.ts

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
  const currentIndex = ONBOARDING_PHASES.indexOf(fromPhase)
  const nextIndex = currentIndex + 1

  if (nextIndex >= ONBOARDING_PHASES.length) {
    setOnboardingV2State(state)
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
```

**Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/__tests__/onboarding-storage-v2.test.ts`
Expected: All PASS

**Step 5: Commit**

```bash
git add src/lib/onboarding-storage-v2.ts src/lib/__tests__/onboarding-storage-v2.test.ts
git commit -m "feat(onboarding): add v2 storage with linear phase model"
```

---

## Task 2: Onboarding V2 Context

New React context wrapping the v2 storage with phase-aware state management.

**Files:**
- Create: `src/contexts/onboarding-v2-context.tsx`

**Step 1: Write the context**

```typescript
// src/contexts/onboarding-v2-context.tsx
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
```

**Step 2: Export from contexts barrel**

Add to `src/contexts/index.ts`:
```typescript
export { OnboardingV2Provider, useOnboardingV2 } from "./onboarding-v2-context"
```

**Step 3: Add provider to root layout**

Modify `src/app/layout.tsx` — wrap children with `<OnboardingV2Provider>` alongside existing providers. Keep old `OnboardingProvider` for now to avoid breaking anything during migration.

**Step 4: Commit**

```bash
git add src/contexts/onboarding-v2-context.tsx src/contexts/index.ts src/app/layout.tsx
git commit -m "feat(onboarding): add v2 context with linear phase management"
```

---

## Task 3: Analytics Events for V2

Add new PostHog tracking functions for the redesigned flow.

**Files:**
- Modify: `src/lib/analytics.ts`
- Modify: `src/lib/__tests__/analytics-events.test.ts`

**Step 1: Write failing tests**

Add to `src/lib/__tests__/analytics-events.test.ts`:

```typescript
describe("onboarding v2 analytics", () => {
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
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/__tests__/analytics-events.test.ts`
Expected: FAIL — functions not exported

**Step 3: Add event types and tracking functions to `src/lib/analytics.ts`**

Add to the `AnalyticsEvent` union type:
```typescript
| "onboarding_started"
| "onboarding_skipped"
| "onboarding_profile_completed"
| "onboarding_tour_started"
| "onboarding_tour_step_viewed"
| "onboarding_tour_skipped"
| "onboarding_tour_completed"
| "onboarding_goal_shown"
| "onboarding_goal_completed"
| "onboarding_completed"
```

Add convenience functions:
```typescript
export function trackOnboardingStarted() {
  track("onboarding_started", {})
}

export function trackOnboardingSkipped(phase: string) {
  track("onboarding_skipped", { phase })
}

export function trackOnboardingProfileCompleted() {
  track("onboarding_profile_completed", {})
}

export function trackOnboardingTourStarted() {
  track("onboarding_tour_started", {})
}

export function trackOnboardingTourStepViewed(stepIndex: number, stepName: string) {
  track("onboarding_tour_step_viewed", { step_index: stepIndex, step_name: stepName })
}

export function trackOnboardingTourSkipped(lastStepIndex: number) {
  track("onboarding_tour_skipped", { last_step_index: lastStepIndex })
}

export function trackOnboardingTourCompleted() {
  track("onboarding_tour_completed", {})
}

export function trackOnboardingGoalShown(variant: string) {
  track("onboarding_goal_shown", { variant })
}

export function trackOnboardingGoalCompleted(variant: string, action: string) {
  track("onboarding_goal_completed", { variant, action })
}

export function trackOnboardingFlowCompleted(path: "full" | "skipped" | "partial") {
  track("onboarding_completed", { path })
}
```

**Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/__tests__/analytics-events.test.ts`
Expected: All PASS

**Step 5: Commit**

```bash
git add src/lib/analytics.ts src/lib/__tests__/analytics-events.test.ts
git commit -m "feat(analytics): add PostHog events for onboarding v2 flow"
```

---

## Task 4: Revised Welcome Sheet

Simplify `FirstRunSheet` to a single welcome message with one "Get Started" CTA.

**Files:**
- Create: `src/components/onboarding/WelcomeSheet.tsx`
- Create: `src/components/onboarding/__tests__/WelcomeSheet.test.tsx`

**Step 1: Write failing tests**

```typescript
// src/components/onboarding/__tests__/WelcomeSheet.test.tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { WelcomeSheet } from "../WelcomeSheet"

describe("WelcomeSheet", () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
    onGetStarted: vi.fn(),
    onSkip: vi.fn(),
  }

  it("renders welcome heading", () => {
    render(<WelcomeSheet {...defaultProps} />)
    expect(screen.getByText("Welcome to Sedona")).toBeInTheDocument()
  })

  it("renders Get Started button", () => {
    render(<WelcomeSheet {...defaultProps} />)
    expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument()
  })

  it("calls onGetStarted when button clicked", async () => {
    const user = userEvent.setup()
    render(<WelcomeSheet {...defaultProps} />)
    await user.click(screen.getByRole("button", { name: /get started/i }))
    expect(defaultProps.onGetStarted).toHaveBeenCalledOnce()
  })

  it("renders skip link", () => {
    render(<WelcomeSheet {...defaultProps} />)
    expect(screen.getByText(/skip for now/i)).toBeInTheDocument()
  })

  it("calls onSkip when skip clicked", async () => {
    const user = userEvent.setup()
    render(<WelcomeSheet {...defaultProps} />)
    await user.click(screen.getByText(/skip for now/i))
    expect(defaultProps.onSkip).toHaveBeenCalledOnce()
  })
})
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/onboarding/__tests__/WelcomeSheet.test.tsx`
Expected: FAIL

**Step 3: Write the component**

```typescript
// src/components/onboarding/WelcomeSheet.tsx
"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface WelcomeSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGetStarted: () => void
  onSkip: () => void
}

export function WelcomeSheet({ open, onOpenChange, onGetStarted, onSkip }: WelcomeSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md border-l border-zeus-border-alpha bg-zeus-surface-neutral p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader
          className="px-5 pt-6 pb-5"
          style={{
            background: "linear-gradient(160deg, #241d15 0%, #1b1712 65%, #12110f 100%)",
          }}
        >
          <SheetTitle className="text-heading-md font-bold text-zeus-text-primary">
            Welcome to Sedona
          </SheetTitle>
          <SheetDescription className="text-body-s text-zeus-text-secondary mt-2">
            The marketplace where AI agents are created, traded, and compete.
            Let&apos;s get you set up in under a minute.
          </SheetDescription>
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 px-5 py-6 flex flex-col justify-center gap-6">
          <div className="space-y-3 text-center">
            <p className="text-body-m text-zeus-text-secondary">
              We&apos;ll walk you through setting up your profile and
              show you around the platform.
            </p>
          </div>

          <Button
            variant="brand"
            size="lg"
            className="w-full"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 text-center">
          <button
            type="button"
            onClick={onSkip}
            className="text-caption-m text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
          >
            Skip for now
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

**Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/onboarding/__tests__/WelcomeSheet.test.tsx`
Expected: All PASS

**Step 5: Commit**

```bash
git add src/components/onboarding/WelcomeSheet.tsx src/components/onboarding/__tests__/WelcomeSheet.test.tsx
git commit -m "feat(onboarding): add simplified WelcomeSheet component"
```

---

## Task 5: Onboarding Profile Page

Dedicated `/onboarding/profile` route — mirrors profile fields without Header, PlatformStats, or GPU section.

**Files:**
- Create: `src/app/onboarding/profile/page.tsx`
- Create: `src/app/onboarding/profile/onboarding-profile-client.tsx`
- Create: `src/app/onboarding/profile/__tests__/onboarding-profile-client.test.tsx`

**Step 1: Write failing tests**

```typescript
// src/app/onboarding/profile/__tests__/onboarding-profile-client.test.tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// Mock dependencies
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock("@/contexts", () => ({
  useProfile: () => ({
    profile: null,
    isLoading: false,
    isSaving: false,
    error: null,
    validationErrors: [],
    loadProfile: vi.fn(),
    saveProfile: vi.fn().mockResolvedValue(true),
    getFormData: () => ({
      displayName: "",
      email: "",
      bio: "",
      socials: { twitter: "", discord: "", telegram: "", github: "" },
      preferences: {
        emailNotifications: true,
        agentAlerts: true,
        weeklyDigest: true,
        marketingEmails: false,
      },
    }),
    clearErrors: vi.fn(),
  }),
  useAgentLaunch: () => ({
    openCreateAgent: vi.fn(),
    isHFAuthenticated: false,
    hfUsername: null,
    signOutHF: vi.fn(),
  }),
  useOnboardingV2: () => ({
    state: { currentPhase: "profile" },
    advance: vi.fn(),
    skip: vi.fn(),
  }),
}))

vi.mock("@/lib/analytics", () => ({
  trackOnboardingProfileCompleted: vi.fn(),
  trackOnboardingSkipped: vi.fn(),
}))

import OnboardingProfileClient from "../onboarding-profile-client"

describe("OnboardingProfileClient", () => {
  it("renders profile setup heading", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByText(/set up your profile/i)).toBeInTheDocument()
  })

  it("renders display name, email, and bio fields", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByPlaceholderText(/how you want to be known/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/tell us about yourself/i)).toBeInTheDocument()
  })

  it("renders social link fields", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByPlaceholderText("@username")).toBeInTheDocument()
  })

  it("renders Hugging Face connection section", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByText(/hugging face/i)).toBeInTheDocument()
  })

  it("renders save and continue button", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByRole("button", { name: /save.*continue/i })).toBeInTheDocument()
  })

  it("renders skip link", () => {
    render(<OnboardingProfileClient />)
    expect(screen.getByText(/skip for now/i)).toBeInTheDocument()
  })

  it("does NOT render GPU instances", () => {
    render(<OnboardingProfileClient />)
    expect(screen.queryByText(/gpu instances/i)).not.toBeInTheDocument()
  })

  it("does NOT render platform stats or header nav", () => {
    render(<OnboardingProfileClient />)
    expect(screen.queryByText(/platform stats/i)).not.toBeInTheDocument()
  })
})
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/app/onboarding/profile/__tests__/onboarding-profile-client.test.tsx`
Expected: FAIL

**Step 3: Write the server page**

```typescript
// src/app/onboarding/profile/page.tsx
import OnboardingProfileClient from "./onboarding-profile-client"

export const metadata = {
  title: "Set Up Your Profile | Sedona",
  description: "Complete your profile to get started on Sedona.",
}

export default function OnboardingProfilePage() {
  return <OnboardingProfileClient />
}
```

**Step 4: Write the client component**

Mirror the profile fields from `profile-client.tsx` but in a focused, distraction-free layout. Key differences:
- No `<Header>`, no `<PlatformStats>`, no `<GPUInstancesSection>`
- Progress indicator ("Step 1 of 2")
- "Save & Continue" button (not "Save Changes")
- "Skip for now" link
- On save success → `advance("profile")` + `router.push("/trading")` (tour starts there)
- On skip → `skip()` + `router.push("/trading")`

The component should include:
- Sedona logo at top
- "Set Up Your Profile" heading with step indicator
- Basic Information card (Display Name, Email, Bio)
- Social Links card (Twitter, Discord, Telegram, GitHub)
- Hugging Face connection card
- Communication Preferences card
- "Save & Continue" brand button + "Skip for now" link

Reference `src/app/trading/profile/profile-client.tsx` for the exact field markup, form state management, validation, and social config. Copy the form logic but strip the page chrome.

**Step 5: Run tests to verify they pass**

Run: `npx vitest run src/app/onboarding/profile/__tests__/onboarding-profile-client.test.tsx`
Expected: All PASS

**Step 6: Commit**

```bash
git add src/app/onboarding/profile/
git commit -m "feat(onboarding): add dedicated profile setup page at /onboarding/profile"
```

---

## Task 6: Spotlight Tour Component

Custom overlay/tooltip system that highlights elements on the trading page.

**Files:**
- Create: `src/components/onboarding/SpotlightTour.tsx`
- Create: `src/components/onboarding/SpotlightOverlay.tsx`
- Create: `src/components/onboarding/__tests__/SpotlightTour.test.tsx`

**Step 1: Define tour step data**

```typescript
// Tour step configuration — will live inside SpotlightTour.tsx
export const TOUR_STEPS = [
  {
    name: "market",
    title: "The Market",
    description: "AI agents are traded here. Each has a live price driven by supply and demand.",
    targetSelector: "[data-tour='market']",
  },
  {
    name: "agent_economics",
    title: "Agent Economics",
    description: "Every agent is a token. Buy in when you believe in its potential — price rises with demand.",
    targetSelector: "[data-tour='agent-economics']",
  },
  {
    name: "competitions",
    title: "Competitions",
    description: "Agents compete in timed rounds. Winners earn jackpots, and their holders profit.",
    targetSelector: "[data-tour='competitions']",
  },
  {
    name: "launching_agents",
    title: "Launching Agents",
    description: "Create your own AI agent — connect a model, set a ticker, and go live.",
    targetSelector: "[data-tour='launch-agent']",
  },
  {
    name: "portfolio",
    title: "Your Portfolio",
    description: "Track your holdings, P&L, and launched agents in one place.",
    targetSelector: "[data-tour='portfolio']",
  },
] as const
```

**Step 2: Write failing tests**

```typescript
// src/components/onboarding/__tests__/SpotlightTour.test.tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SpotlightTour } from "../SpotlightTour"

describe("SpotlightTour", () => {
  const defaultProps = {
    active: true,
    onStepViewed: vi.fn(),
    onComplete: vi.fn(),
    onSkip: vi.fn(),
  }

  it("renders the first step title and description", () => {
    render(<SpotlightTour {...defaultProps} />)
    expect(screen.getByText("The Market")).toBeInTheDocument()
    expect(screen.getByText(/AI agents are traded here/)).toBeInTheDocument()
  })

  it("shows step counter", () => {
    render(<SpotlightTour {...defaultProps} />)
    expect(screen.getByText("1 / 5")).toBeInTheDocument()
  })

  it("advances to next step on Next click", async () => {
    const user = userEvent.setup()
    render(<SpotlightTour {...defaultProps} />)
    await user.click(screen.getByRole("button", { name: /next/i }))
    expect(screen.getByText("Agent Economics")).toBeInTheDocument()
    expect(screen.getByText("2 / 5")).toBeInTheDocument()
    expect(defaultProps.onStepViewed).toHaveBeenCalledWith(1)
  })

  it("shows Finish on last step", async () => {
    const user = userEvent.setup()
    render(<SpotlightTour {...defaultProps} />)
    // Click through all steps
    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByRole("button", { name: /next/i }))
    }
    expect(screen.getByRole("button", { name: /finish/i })).toBeInTheDocument()
  })

  it("calls onComplete on Finish click", async () => {
    const user = userEvent.setup()
    render(<SpotlightTour {...defaultProps} />)
    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByRole("button", { name: /next/i }))
    }
    await user.click(screen.getByRole("button", { name: /finish/i }))
    expect(defaultProps.onComplete).toHaveBeenCalledOnce()
  })

  it("calls onSkip when Skip tour clicked", async () => {
    const user = userEvent.setup()
    render(<SpotlightTour {...defaultProps} />)
    await user.click(screen.getByText(/skip tour/i))
    expect(defaultProps.onSkip).toHaveBeenCalledOnce()
  })

  it("does not render when active is false", () => {
    render(<SpotlightTour {...defaultProps} active={false} />)
    expect(screen.queryByText("The Market")).not.toBeInTheDocument()
  })
})
```

**Step 3: Run tests to verify they fail**

Run: `npx vitest run src/components/onboarding/__tests__/SpotlightTour.test.tsx`
Expected: FAIL

**Step 4: Write SpotlightOverlay**

```typescript
// src/components/onboarding/SpotlightOverlay.tsx
"use client"

import * as React from "react"
import { createPortal } from "react-dom"

interface SpotlightOverlayProps {
  targetSelector: string
  children: React.ReactNode
}

// Renders a dark overlay with a cutout around the target element,
// positioning the tooltip (children) below or above the target.
export function SpotlightOverlay({ targetSelector, children }: SpotlightOverlayProps) {
  const [rect, setRect] = React.useState<DOMRect | null>(null)
  const [tooltipPosition, setTooltipPosition] = React.useState<"below" | "above">("below")

  React.useEffect(() => {
    const el = document.querySelector(targetSelector)
    if (!el) return

    const update = () => {
      const r = el.getBoundingClientRect()
      setRect(r)
      // Position tooltip above if target is in lower half of viewport
      setTooltipPosition(r.bottom > window.innerHeight * 0.6 ? "above" : "below")
    }

    update()
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    }
  }, [targetSelector])

  if (!rect) return null

  const padding = 8

  return createPortal(
    <div className="fixed inset-0 z-[9999]" aria-live="polite">
      {/* Overlay with cutout via clip-path */}
      <div
        className="absolute inset-0 bg-black/70 transition-all duration-300"
        style={{
          clipPath: `polygon(
            0% 0%, 0% 100%, 100% 100%, 100% 0%,
            ${rect.left - padding}px 0%,
            ${rect.left - padding}px ${rect.top - padding}px,
            ${rect.right + padding}px ${rect.top - padding}px,
            ${rect.right + padding}px ${rect.bottom + padding}px,
            ${rect.left - padding}px ${rect.bottom + padding}px,
            ${rect.left - padding}px 0%
          )`,
        }}
      />

      {/* Highlight border */}
      <div
        className="absolute border-2 border-sedona-500 rounded-lg pointer-events-none transition-all duration-300"
        style={{
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        }}
      />

      {/* Tooltip */}
      <div
        className="absolute"
        style={{
          left: Math.max(16, Math.min(rect.left, window.innerWidth - 360)),
          ...(tooltipPosition === "below"
            ? { top: rect.bottom + padding + 12 }
            : { bottom: window.innerHeight - rect.top + padding + 12 }),
          maxWidth: 340,
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
```

**Step 5: Write SpotlightTour**

```typescript
// src/components/onboarding/SpotlightTour.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { SpotlightOverlay } from "./SpotlightOverlay"

export const TOUR_STEPS = [
  {
    name: "market",
    title: "The Market",
    description: "AI agents are traded here. Each has a live price driven by supply and demand.",
    targetSelector: "[data-tour='market']",
  },
  {
    name: "agent_economics",
    title: "Agent Economics",
    description: "Every agent is a token. Buy in when you believe in its potential — price rises with demand.",
    targetSelector: "[data-tour='agent-economics']",
  },
  {
    name: "competitions",
    title: "Competitions",
    description: "Agents compete in timed rounds. Winners earn jackpots, and their holders profit.",
    targetSelector: "[data-tour='competitions']",
  },
  {
    name: "launching_agents",
    title: "Launching Agents",
    description: "Create your own AI agent — connect a model, set a ticker, and go live.",
    targetSelector: "[data-tour='launch-agent']",
  },
  {
    name: "portfolio",
    title: "Your Portfolio",
    description: "Track your holdings, P&L, and launched agents in one place.",
    targetSelector: "[data-tour='portfolio']",
  },
] as const

interface SpotlightTourProps {
  active: boolean
  onStepViewed: (stepIndex: number) => void
  onComplete: () => void
  onSkip: () => void
}

export function SpotlightTour({ active, onStepViewed, onComplete, onSkip }: SpotlightTourProps) {
  const [currentStep, setCurrentStep] = React.useState(0)

  React.useEffect(() => {
    if (active) onStepViewed(0)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!active) return null

  const step = TOUR_STEPS[currentStep]
  const isLast = currentStep === TOUR_STEPS.length - 1

  const handleNext = () => {
    if (isLast) {
      onComplete()
    } else {
      const nextIndex = currentStep + 1
      setCurrentStep(nextIndex)
      onStepViewed(nextIndex)

      // Scroll target into view
      const el = document.querySelector(TOUR_STEPS[nextIndex].targetSelector)
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <SpotlightOverlay targetSelector={step.targetSelector}>
      <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption-s text-zeus-text-tertiary">
            {currentStep + 1} / {TOUR_STEPS.length}
          </span>
          <button
            type="button"
            onClick={onSkip}
            className="text-caption-s text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
          >
            Skip tour
          </button>
        </div>

        <h3 className="text-body-m font-bold text-zeus-text-primary mb-1">
          {step.title}
        </h3>
        <p className="text-body-s text-zeus-text-secondary mb-4">
          {step.description}
        </p>

        <Button variant="brand" size="sm" className="w-full" onClick={handleNext}>
          {isLast ? "Finish" : "Next"}
        </Button>
      </div>
    </SpotlightOverlay>
  )
}
```

**Step 6: Run tests to verify they pass**

Run: `npx vitest run src/components/onboarding/__tests__/SpotlightTour.test.tsx`
Expected: All PASS (note: SpotlightOverlay portal may need `document.body` mocking — if tests fail on portal, render with a wrapper or mock createPortal)

**Step 7: Commit**

```bash
git add src/components/onboarding/SpotlightOverlay.tsx src/components/onboarding/SpotlightTour.tsx src/components/onboarding/__tests__/SpotlightTour.test.tsx
git commit -m "feat(onboarding): add spotlight tour with overlay and tooltip system"
```

---

## Task 7: Goal Action Prompt

Configurable goal action shown after the tour completes.

**Files:**
- Create: `src/components/onboarding/GoalAction.tsx`
- Create: `src/components/onboarding/__tests__/GoalAction.test.tsx`

**Step 1: Write failing tests**

```typescript
// src/components/onboarding/__tests__/GoalAction.test.tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { GoalAction } from "../GoalAction"

describe("GoalAction", () => {
  const defaultProps = {
    active: true,
    variant: "trade" as const,
    onAction: vi.fn(),
    onDismiss: vi.fn(),
  }

  it("renders goal prompt for trade variant", () => {
    render(<GoalAction {...defaultProps} />)
    expect(screen.getByText(/make your first trade/i)).toBeInTheDocument()
  })

  it("renders goal prompt for create_agent variant", () => {
    render(<GoalAction {...defaultProps} variant="create_agent" />)
    expect(screen.getByText(/launch your first agent/i)).toBeInTheDocument()
  })

  it("calls onAction when CTA clicked", async () => {
    const user = userEvent.setup()
    render(<GoalAction {...defaultProps} />)
    await user.click(screen.getByRole("button", { name: /let.*go|trade|launch/i }))
    expect(defaultProps.onAction).toHaveBeenCalledOnce()
  })

  it("calls onDismiss when dismiss clicked", async () => {
    const user = userEvent.setup()
    render(<GoalAction {...defaultProps} />)
    await user.click(screen.getByText(/maybe later/i))
    expect(defaultProps.onDismiss).toHaveBeenCalledOnce()
  })

  it("does not render when active is false", () => {
    render(<GoalAction {...defaultProps} active={false} />)
    expect(screen.queryByText(/make your first trade/i)).not.toBeInTheDocument()
  })
})
```

**Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/onboarding/__tests__/GoalAction.test.tsx`
Expected: FAIL

**Step 3: Write the component**

```typescript
// src/components/onboarding/GoalAction.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

type GoalVariant = "trade" | "create_agent" | "view_agent"

const GOAL_CONFIG: Record<GoalVariant, { title: string; description: string; cta: string }> = {
  trade: {
    title: "Make your first trade",
    description: "Pick an agent you believe in and buy your first tokens.",
    cta: "Let's go",
  },
  create_agent: {
    title: "Launch your first agent",
    description: "Connect a model, set a ticker, and bring your AI agent to market.",
    cta: "Create Agent",
  },
  view_agent: {
    title: "Explore an agent",
    description: "Open an agent's detail page to see its chart, stats, and community.",
    cta: "Browse Agents",
  },
}

interface GoalActionProps {
  active: boolean
  variant: GoalVariant
  onAction: () => void
  onDismiss: () => void
}

export function GoalAction({ active, variant, onAction, onDismiss }: GoalActionProps) {
  if (!active) return null

  const config = GOAL_CONFIG[variant]

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-xl p-6 max-w-sm mx-4 text-center shadow-xl">
        <h3 className="text-heading-xs font-bold text-zeus-text-primary mb-2">
          {config.title}
        </h3>
        <p className="text-body-s text-zeus-text-secondary mb-5">
          {config.description}
        </p>

        <Button variant="brand" size="lg" className="w-full mb-3" onClick={onAction}>
          {config.cta}
        </Button>

        <button
          type="button"
          onClick={onDismiss}
          className="text-caption-m text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
```

**Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/onboarding/__tests__/GoalAction.test.tsx`
Expected: All PASS

**Step 5: Commit**

```bash
git add src/components/onboarding/GoalAction.tsx src/components/onboarding/__tests__/GoalAction.test.tsx
git commit -m "feat(onboarding): add configurable goal action prompt"
```

---

## Task 8: Add data-tour Attributes to Trading Page

The spotlight tour needs `data-tour` attributes on target elements for targeting.

**Files:**
- Modify: `src/app/trading/trading-page-client.tsx` — or whichever component renders the leaderboard, agent rows, competitions section, Create Agent button, and portfolio nav link
- Modify: `src/components/trading/Header.tsx` — for Create Agent button and portfolio link

**Step 1: Identify target elements**

Search the codebase for where these render:
- Agent table / leaderboard container → add `data-tour="market"`
- First agent card/row → add `data-tour="agent-economics"`
- Competition/jackpot section (likely `PlatformStats` or a dedicated section) → add `data-tour="competitions"`
- "Create Agent" button in Header → add `data-tour="launch-agent"`
- Portfolio nav link in Header → add `data-tour="portfolio"`

**Step 2: Add attributes**

This is a search-and-modify task. For each target:
1. Read the component file
2. Find the outermost wrapper of the target element
3. Add the `data-tour="..."` attribute

These are non-breaking, zero-visual-impact changes.

**Step 3: Verify visually**

Run dev server, open trading page, inspect elements to confirm `data-tour` attributes are present.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat(onboarding): add data-tour attributes for spotlight tour targets"
```

---

## Task 9: Wire V2 Flow into Trading Page

Connect all the new components into the trading page, replacing the old onboarding integration.

**Files:**
- Modify: `src/app/trading/trading-page-client.tsx`

**Step 1: Replace old onboarding with v2**

In `trading-page-client.tsx`:

1. Replace `useOnboarding()` import with `useOnboardingV2()`
2. Remove `FirstRunSheet` import, add `WelcomeSheet`, `SpotlightTour`, `GoalAction` imports
3. Add analytics imports for new v2 tracking functions

**Step 2: Update the component logic**

```typescript
// Inside the component:
const { state: obState, isReady, advance, skip, trackTourStep, setGoal, complete } = useOnboardingV2()

// Determine which v2 UI to show based on currentPhase
const showWelcome = isReady && obState.currentPhase === "welcome"
const showTour = isReady && obState.currentPhase === "tour"
const showGoal = isReady && obState.currentPhase === "goal"

// Get goal variant from PostHog feature flag (with fallback)
const goalVariant = (getFeatureFlag("onboarding_goal_action") as string) || "trade"
```

**Step 3: Update JSX**

Replace `<FirstRunSheet ... />` with:

```tsx
{/* Welcome Sheet */}
<WelcomeSheet
  open={showWelcome}
  onOpenChange={() => {}}
  onGetStarted={() => {
    trackOnboardingStarted()
    advance("welcome")
    router.push("/onboarding/profile")
  }}
  onSkip={() => {
    trackOnboardingSkipped("welcome")
    skip()
  }}
/>

{/* Spotlight Tour */}
<SpotlightTour
  active={showTour}
  onStepViewed={(index) => {
    trackTourStep(index)
    const step = TOUR_STEPS[index]
    trackOnboardingTourStepViewed(index, step.name)
    if (index === 0) trackOnboardingTourStarted()
  }}
  onComplete={() => {
    trackOnboardingTourCompleted()
    advance("tour")
    setGoal(goalVariant)
    trackOnboardingGoalShown(goalVariant)
  }}
  onSkip={() => {
    trackOnboardingTourSkipped(obState.tourStepsViewed.length - 1)
    complete() // one-shot: done
    trackOnboardingFlowCompleted("partial")
  }}
/>

{/* Goal Action */}
<GoalAction
  active={showGoal}
  variant={goalVariant as any}
  onAction={() => {
    trackOnboardingGoalCompleted(goalVariant, goalVariant)
    complete()
    trackOnboardingFlowCompleted("full")
    // Navigate based on variant
    if (goalVariant === "create_agent") openCreateAgent()
    // "trade" and "view_agent" stay on trading page — user picks an agent
  }}
  onDismiss={() => {
    complete() // one-shot: no nagging
    trackOnboardingFlowCompleted("partial")
  }}
/>
```

**Step 4: Remove old onboarding sheet handlers**

Delete the old `onExploreAgents`, `onOpenProfile`, `onGiveFeedback`, `onSkip` handlers and the old `FirstRunSheet` JSX.

**Step 5: Update tests**

Modify `src/app/trading/__tests__/trading-page-client.test.tsx`:
- Update mocks to use `useOnboardingV2` instead of `useOnboarding`
- Test new flow: welcome sheet → get started → navigates to /onboarding/profile
- Test skip → marks completed
- Test tour phase renders SpotlightTour
- Test goal phase renders GoalAction

**Step 6: Run tests**

Run: `npx vitest run src/app/trading/__tests__/trading-page-client.test.tsx`
Expected: All PASS

**Step 7: Commit**

```bash
git add src/app/trading/trading-page-client.tsx src/app/trading/__tests__/trading-page-client.test.tsx
git commit -m "feat(onboarding): wire v2 linear flow into trading page"
```

---

## Task 10: Remove Old Onboarding Artifacts

Clean up the v1 onboarding code that's no longer used.

**Files:**
- Remove: `src/components/onboarding/FirstRunSheet.tsx`
- Remove: `src/components/onboarding/__tests__/FirstRunSheet.test.tsx`
- Modify: `src/app/trading/portfolio/portfolio-client.tsx` — remove onboarding banner
- Modify: `src/app/trading/profile/profile-client.tsx` — remove onboarding EmptyState and conditional GPU hiding based on old steps
- Modify: `src/contexts/index.ts` — remove old `OnboardingProvider` export (keep v2)
- Modify: `src/app/layout.tsx` — remove old `OnboardingProvider`, keep `OnboardingV2Provider`

**Step 1: Remove FirstRunSheet files**

Delete `src/components/onboarding/FirstRunSheet.tsx` and its test file.

**Step 2: Clean portfolio-client.tsx**

Remove the `!onboardingState.hasCompletedOnboarding` banner block (lines ~132-162 area). Remove `useOnboarding` import if no longer needed.

**Step 3: Clean profile-client.tsx**

- Remove the onboarding EmptyState block (the "Complete your profile before you disappear" prompt)
- Change the GPU section condition: show GPUInstancesSection unconditionally (or based on whether instances exist, which GPUInstancesSection already handles internally)
- Remove `useOnboarding` import and related state if no longer needed
- Keep the profile page functional — it's still used after onboarding

**Step 4: Update context barrel**

In `src/contexts/index.ts`, replace:
```typescript
export { OnboardingProvider, useOnboarding } from "./onboarding-context"
```
with:
```typescript
export { OnboardingV2Provider, useOnboardingV2 } from "./onboarding-v2-context"
```

**Step 5: Update layout.tsx**

Replace `<OnboardingProvider>` with `<OnboardingV2Provider>` in the provider tree.

**Step 6: Verify no remaining imports of old onboarding**

Search for `useOnboarding` (not `useOnboardingV2`), `OnboardingProvider` (not V2), `FirstRunSheet`, `onboarding-context` (not v2), `onboarding-storage` (not v2) across the codebase. Fix any remaining references.

**Step 7: Run full test suite**

Run: `npx vitest run`
Expected: All PASS (some old tests will have been deleted, remaining tests should pass)

**Step 8: Commit**

```bash
git add -A
git commit -m "refactor(onboarding): remove v1 checklist artifacts, migrate to v2 linear flow"
```

---

## Task 11: Verify End-to-End Flow

Manual verification of the complete onboarding flow.

**Step 1: Reset onboarding state**

Open browser console on dev server:
```javascript
localStorage.removeItem("sedona_onboarding_v2")
localStorage.removeItem("sedona_onboarding_state")
```

**Step 2: Walk through flow**

1. Navigate to `/trading` → Welcome Sheet should appear
2. Click "Get Started" → Should route to `/onboarding/profile`
3. Fill in profile fields → Click "Save & Continue"
4. Should auto-advance to `/trading` with spotlight tour active
5. Click through all 5 tour stops → Goal action prompt appears
6. Click CTA or "Maybe later" → Onboarding complete, no further prompts
7. Refresh page → No onboarding UI appears
8. Navigate to profile → GPU section visible, no onboarding banner
9. Navigate to portfolio → No onboarding banner

**Step 3: Test skip paths**

1. Reset state, navigate to `/trading`
2. Click "Skip for now" on Welcome Sheet → No further onboarding
3. Reset state, go through profile, skip during tour → No further prompts
4. Reset state, go through profile + tour, dismiss goal → No further prompts

**Step 4: Verify PostHog events**

Check browser network tab or PostHog debug mode for:
- `onboarding_started` on Get Started
- `onboarding_profile_completed` on profile save
- `onboarding_tour_started` on first tour step
- `onboarding_tour_step_viewed` for each step
- `onboarding_completed` at the end

**Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix(onboarding): address issues from end-to-end verification"
```

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Storage v2 (linear phases) | `onboarding-storage-v2.ts` + tests |
| 2 | Context v2 | `onboarding-v2-context.tsx` + barrel export + layout |
| 3 | Analytics events | `analytics.ts` + tests |
| 4 | Welcome Sheet | `WelcomeSheet.tsx` + tests |
| 5 | Onboarding Profile page | `/onboarding/profile/` route + client component + tests |
| 6 | Spotlight Tour | `SpotlightTour.tsx` + `SpotlightOverlay.tsx` + tests |
| 7 | Goal Action | `GoalAction.tsx` + tests |
| 8 | data-tour attributes | Trading page + Header modifications |
| 9 | Wire into trading page | `trading-page-client.tsx` + tests |
| 10 | Remove v1 artifacts | Delete old files, clean imports |
| 11 | E2E verification | Manual testing |
