import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import TradingPageClient from "../trading-page-client"

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  openCreateAgent: vi.fn(),
  setSheetOpen: vi.fn(),
  completeStep: vi.fn(),
  dismissOnboarding: vi.fn(),
  trackFirstRunViewed: vi.fn(),
  trackFirstRunDismissed: vi.fn(),
  trackFirstRunCompleted: vi.fn(),
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mocks.push,
  }),
}))

vi.mock("@/contexts", () => ({
  useAgentLaunch: () => ({
    openCreateAgent: mocks.openCreateAgent,
  }),
  useOnboarding: () => ({
    state: {
      completedSteps: [],
      hasCompletedOnboarding: false,
      dismissedAt: null,
      viewedAt: null,
    },
    isReady: true,
    isSheetOpen: true,
    setSheetOpen: mocks.setSheetOpen,
    completeStep: mocks.completeStep,
    dismissOnboarding: mocks.dismissOnboarding,
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
  LandingPageWrapper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock("@/components/onboarding/FirstRunSheet", () => ({
  FirstRunSheet: ({
    open,
    onOpenChange,
    onExploreAgents,
    onOpenProfile,
    onGiveFeedback,
    onSkip,
  }: {
    open: boolean
    onOpenChange: (open: boolean) => void
    onExploreAgents: () => void
    onOpenProfile: () => void
    onGiveFeedback: () => void
    onSkip: () => void
  }) =>
    open ? (
      <div>
        <button onClick={onExploreAgents}>Explore Agents</button>
        <button onClick={onOpenProfile}>Complete Profile</button>
        <button onClick={onGiveFeedback}>Give Feedback</button>
        <button
          onClick={() => {
            onSkip()
            onOpenChange(false)
          }}
        >
          Skip for now
        </button>
      </div>
    ) : null,
}))

vi.mock("@/components/contact/ContactForm", () => ({
  ContactForm: ({
    open,
    onSubmitted,
  }: {
    open: boolean
    onSubmitted?: () => void
  }) =>
    open ? (
      <div data-testid="contact-form">
        <button onClick={onSubmitted}>Submit Feedback</button>
      </div>
    ) : null,
}))

vi.mock("@/lib/analytics", () => ({
  trackFirstRunViewed: mocks.trackFirstRunViewed,
  trackFirstRunDismissed: mocks.trackFirstRunDismissed,
  trackFirstRunCompleted: mocks.trackFirstRunCompleted,
}))

describe("TradingPageClient", () => {
  beforeEach(() => {
    mocks.push.mockReset()
    mocks.openCreateAgent.mockReset()
    mocks.setSheetOpen.mockReset()
    mocks.completeStep.mockReset()
    mocks.dismissOnboarding.mockReset()
    mocks.trackFirstRunViewed.mockReset()
    mocks.trackFirstRunDismissed.mockReset()
    mocks.trackFirstRunCompleted.mockReset()
    mocks.completeStep.mockReturnValue({
      completedSteps: ["give_feedback"],
      hasCompletedOnboarding: false,
      dismissedAt: null,
    })
  })

  it("routes onboarding actions to profile and feedback flows", async () => {
    const user = userEvent.setup()

    render(<TradingPageClient initialHeroMode={false} />)

    expect(mocks.trackFirstRunViewed).toHaveBeenCalledWith("trading", 0, null)

    await user.click(screen.getByRole("button", { name: /complete profile/i }))

    expect(mocks.push).toHaveBeenCalledWith("/trading/profile")

    await user.click(screen.getByRole("button", { name: /give feedback/i }))

    expect(screen.getByTestId("contact-form")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /submit feedback/i }))

    expect(mocks.completeStep).toHaveBeenCalledWith("give_feedback", "trading")

    await user.click(screen.getByRole("button", { name: /skip for now/i }))

    expect(mocks.trackFirstRunDismissed).toHaveBeenCalledWith("trading", [])
    expect(mocks.dismissOnboarding).toHaveBeenCalledTimes(1)
  })
})
