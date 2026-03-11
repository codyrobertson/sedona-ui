import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { FirstRunSheet } from "@/components/onboarding/FirstRunSheet"

describe("FirstRunSheet", () => {
  it("shows the first-run sheet content for new users", () => {
    render(
      <FirstRunSheet
        open
        completedSteps={[]}
        onOpenChange={vi.fn()}
        onExploreAgents={vi.fn()}
        onOpenProfile={vi.fn()}
        onGiveFeedback={vi.fn()}
        onSkip={vi.fn()}
      />
    )

    expect(screen.getByText("Welcome to Sedona")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /explore agents/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /complete profile/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /give feedback/i })).toBeInTheDocument()
  })

  it("routes button presses to onboarding callbacks", async () => {
    const user = userEvent.setup()
    const onExploreAgents = vi.fn()
    const onOpenProfile = vi.fn()
    const onGiveFeedback = vi.fn()
    const onSkip = vi.fn()
    const onOpenChange = vi.fn()

    render(
      <FirstRunSheet
        open
        completedSteps={["explore_agents"]}
        onOpenChange={onOpenChange}
        onExploreAgents={onExploreAgents}
        onOpenProfile={onOpenProfile}
        onGiveFeedback={onGiveFeedback}
        onSkip={onSkip}
      />
    )

    await user.click(screen.getByRole("button", { name: /complete profile/i }))
    await user.click(screen.getByRole("button", { name: /give feedback/i }))
    await user.click(screen.getByRole("button", { name: /skip for now/i }))

    expect(onOpenProfile).toHaveBeenCalledTimes(1)
    expect(onGiveFeedback).toHaveBeenCalledTimes(1)
    expect(onSkip).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
