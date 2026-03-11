import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import TradingPageClient from "../trading-page-client"

// ---------------------------------------------------------------------------
// Hoisted mocks
// ---------------------------------------------------------------------------

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  openCreateAgent: vi.fn(),
  advance: vi.fn(),
  skip: vi.fn(),
  complete: vi.fn(),
  trackTourStep: vi.fn(),
  setGoal: vi.fn(),
  trackOnboardingStarted: vi.fn(),
  trackOnboardingSkipped: vi.fn(),
  trackOnboardingTourStarted: vi.fn(),
  trackOnboardingTourStepViewed: vi.fn(),
  trackOnboardingTourSkipped: vi.fn(),
  trackOnboardingTourCompleted: vi.fn(),
  trackOnboardingGoalShown: vi.fn(),
  trackOnboardingGoalCompleted: vi.fn(),
  trackOnboardingFlowCompleted: vi.fn(),
  getFeatureFlag: vi.fn(),

  // V2 state — overridden per-test via currentPhase setter
  currentPhase: "welcome" as string,
}))

// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mocks.push }),
}))

vi.mock("@/contexts", () => ({
  useAgentLaunch: () => ({ openCreateAgent: mocks.openCreateAgent }),
  useOnboardingV2: () => ({
    state: {
      currentPhase: mocks.currentPhase,
      completedAt: null,
      skippedAt: null,
      skippedPhase: null,
      profileCompletedAt: null,
      tourStepsViewed: [],
      goalVariant: null,
      goalCompleted: false,
    },
    isReady: true,
    advance: mocks.advance,
    skip: mocks.skip,
    complete: mocks.complete,
    trackTourStep: mocks.trackTourStep,
    setGoal: mocks.setGoal,
  }),
}))

vi.mock("@/fixtures", () => ({
  AGENTS: [
    {
      name: "Atlas",
      ticker: "ATL",
      description: "Atlas agent",
      price_change_percent_in_24_hours: 4.2,
      market_cap_usd_latest: 1000000,
      volume_24h_usd: 250000,
      price_usd: 0.42,
    },
  ],
  formatMarketCap: (value: number) => `$${value}`,
  searchAgents: () => [],
}))

vi.mock("@/components/trading", () => ({
  Header: () => <div>Header</div>,
  PlatformStats: () => <div>Platform Stats</div>,
  TrendingAgents: () => <div>Trending Agents</div>,
  AboutSedona: () => <div>About Sedona</div>,
  Footer: () => <div>Footer</div>,
}))

vi.mock("@/components/landing", () => ({
  LandingPageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

vi.mock("@/components/onboarding/WelcomeSheet", () => ({
  WelcomeSheet: ({
    open,
    onGetStarted,
    onSkip,
  }: {
    open: boolean
    onOpenChange: (o: boolean) => void
    onGetStarted: () => void
    onSkip: () => void
  }) =>
    open ? (
      <div data-testid="welcome-sheet">
        <button onClick={onGetStarted}>Get Started</button>
        <button onClick={onSkip}>Skip for now</button>
      </div>
    ) : null,
}))

vi.mock("@/components/onboarding/SpotlightTour", () => ({
  TOUR_STEPS: [
    { name: "market", title: "The Market", description: "", targetSelector: "" },
  ],
  SpotlightTour: ({
    active,
    onStepViewed,
    onComplete,
    onSkip,
  }: {
    active: boolean
    onStepViewed: (i: number) => void
    onComplete: () => void
    onSkip: () => void
  }) =>
    active ? (
      <div data-testid="spotlight-tour">
        <button onClick={() => onStepViewed(0)}>View Step</button>
        <button onClick={onComplete}>Finish Tour</button>
        <button onClick={onSkip}>Skip Tour</button>
      </div>
    ) : null,
}))

vi.mock("@/components/onboarding/GoalAction", () => ({
  GoalAction: ({
    active,
    onAction,
    onDismiss,
  }: {
    active: boolean
    variant: string
    onAction: () => void
    onDismiss: () => void
  }) =>
    active ? (
      <div data-testid="goal-action">
        <button onClick={onAction}>Do Goal</button>
        <button onClick={onDismiss}>Dismiss Goal</button>
      </div>
    ) : null,
}))

vi.mock("@/lib/analytics", () => ({
  trackOnboardingStarted: mocks.trackOnboardingStarted,
  trackOnboardingSkipped: mocks.trackOnboardingSkipped,
  trackOnboardingTourStarted: mocks.trackOnboardingTourStarted,
  trackOnboardingTourStepViewed: mocks.trackOnboardingTourStepViewed,
  trackOnboardingTourSkipped: mocks.trackOnboardingTourSkipped,
  trackOnboardingTourCompleted: mocks.trackOnboardingTourCompleted,
  trackOnboardingGoalShown: mocks.trackOnboardingGoalShown,
  trackOnboardingGoalCompleted: mocks.trackOnboardingGoalCompleted,
  trackOnboardingFlowCompleted: mocks.trackOnboardingFlowCompleted,
  getFeatureFlag: mocks.getFeatureFlag,
}))

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("TradingPageClient", () => {
  beforeEach(() => {
    Object.values(mocks).forEach((m) => {
      if (typeof m === "function" && "mockReset" in m) {
        ;(m as ReturnType<typeof vi.fn>).mockReset()
      }
    })
    mocks.currentPhase = "welcome"
  })

  // -----------------------------------------------------------------------
  // Welcome sheet
  // -----------------------------------------------------------------------

  it("renders the welcome sheet when phase is 'welcome' and not in hero mode", () => {
    mocks.currentPhase = "welcome"
    render(<TradingPageClient initialHeroMode={false} />)
    expect(screen.getByTestId("welcome-sheet")).toBeInTheDocument()
  })

  it("does not render the welcome sheet when phase is 'completed'", () => {
    mocks.currentPhase = "completed"
    render(<TradingPageClient initialHeroMode={false} />)
    expect(screen.queryByTestId("welcome-sheet")).not.toBeInTheDocument()
  })

  it("does not render the welcome sheet in hero mode", () => {
    mocks.currentPhase = "welcome"
    render(<TradingPageClient initialHeroMode={true} />)
    expect(screen.queryByTestId("welcome-sheet")).not.toBeInTheDocument()
  })

  it("calls advance and navigates to profile on Get Started", async () => {
    mocks.currentPhase = "welcome"
    const user = userEvent.setup()
    render(<TradingPageClient initialHeroMode={false} />)

    await user.click(screen.getByRole("button", { name: /get started/i }))

    expect(mocks.trackOnboardingStarted).toHaveBeenCalled()
    expect(mocks.advance).toHaveBeenCalledWith("welcome")
    expect(mocks.push).toHaveBeenCalledWith("/onboarding/profile")
  })

  it("calls skip on welcome skip", async () => {
    mocks.currentPhase = "welcome"
    const user = userEvent.setup()
    render(<TradingPageClient initialHeroMode={false} />)

    await user.click(screen.getByRole("button", { name: /skip for now/i }))

    expect(mocks.trackOnboardingSkipped).toHaveBeenCalledWith("welcome")
    expect(mocks.skip).toHaveBeenCalled()
  })

  // -----------------------------------------------------------------------
  // Spotlight tour
  // -----------------------------------------------------------------------

  it("renders the spotlight tour when phase is 'tour'", () => {
    mocks.currentPhase = "tour"
    render(<TradingPageClient initialHeroMode={false} />)
    expect(screen.getByTestId("spotlight-tour")).toBeInTheDocument()
    expect(screen.queryByTestId("welcome-sheet")).not.toBeInTheDocument()
  })

  // -----------------------------------------------------------------------
  // Goal action
  // -----------------------------------------------------------------------

  it("renders the goal action when phase is 'goal'", () => {
    mocks.currentPhase = "goal"
    render(<TradingPageClient initialHeroMode={false} />)
    expect(screen.getByTestId("goal-action")).toBeInTheDocument()
    expect(screen.queryByTestId("welcome-sheet")).not.toBeInTheDocument()
    expect(screen.queryByTestId("spotlight-tour")).not.toBeInTheDocument()
  })
})
