import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { OnboardingProvider, useOnboarding } from "../onboarding-context"

const analyticsMocks = vi.hoisted(() => ({
  trackFirstRunCompleted: vi.fn(),
  trackFirstRunStepCompleted: vi.fn(),
}))

vi.mock("@/lib/analytics", () => ({
  trackFirstRunCompleted: analyticsMocks.trackFirstRunCompleted,
  trackFirstRunStepCompleted: analyticsMocks.trackFirstRunStepCompleted,
}))

function Harness() {
  const { state, completeStep } = useOnboarding()

  return (
    <div>
      <span data-testid="completed-steps">{state.completedSteps.join(",")}</span>
      <button onClick={() => completeStep("give_feedback", "profile")}>
        Complete feedback
      </button>
    </div>
  )
}

describe("OnboardingProvider", () => {
  beforeEach(() => {
    localStorage.clear()
    analyticsMocks.trackFirstRunCompleted.mockReset()
    analyticsMocks.trackFirstRunStepCompleted.mockReset()
  })

  it("tracks the final onboarding step and completion only once", async () => {
    localStorage.setItem(
      "sedona_onboarding_state",
      JSON.stringify({
        completedSteps: ["explore_agents", "open_profile"],
        dismissedAt: null,
        viewedAt: null,
      })
    )

    const user = userEvent.setup()

    render(
      <OnboardingProvider>
        <Harness />
      </OnboardingProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId("completed-steps")).toHaveTextContent(
        "explore_agents,open_profile"
      )
    })

    await user.click(screen.getByRole("button", { name: /complete feedback/i }))
    await user.click(screen.getByRole("button", { name: /complete feedback/i }))

    expect(analyticsMocks.trackFirstRunStepCompleted).toHaveBeenCalledTimes(1)
    expect(analyticsMocks.trackFirstRunStepCompleted).toHaveBeenCalledWith(
      "profile",
      "give_feedback",
      ["explore_agents", "open_profile", "give_feedback"],
      true
    )
    expect(analyticsMocks.trackFirstRunCompleted).toHaveBeenCalledTimes(1)
    expect(analyticsMocks.trackFirstRunCompleted).toHaveBeenCalledWith(
      "profile",
      ["explore_agents", "open_profile", "give_feedback"]
    )
  })
})
