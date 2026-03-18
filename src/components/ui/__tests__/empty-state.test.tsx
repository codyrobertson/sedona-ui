import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { EmptyState } from "../empty-state"

const analyticsMocks = vi.hoisted(() => ({
  trackEmptyStateViewed: vi.fn(),
  trackEmptyStateAction: vi.fn(),
}))

vi.mock("@/lib/analytics", () => ({
  trackEmptyStateViewed: analyticsMocks.trackEmptyStateViewed,
  trackEmptyStateAction: analyticsMocks.trackEmptyStateAction,
}))

describe("EmptyState", () => {
  beforeEach(() => {
    analyticsMocks.trackEmptyStateViewed.mockReset()
    analyticsMocks.trackEmptyStateAction.mockReset()
  })

  it("tracks impressions when analytics metadata is provided", () => {
    render(
      <EmptyState
        title="No agents found"
        description="Try a different search."
        analytics={{
          surface: "trending_agents",
          variant: "search_empty",
        }}
      />
    )

    expect(analyticsMocks.trackEmptyStateViewed).toHaveBeenCalledWith(
      "trending_agents",
      "search_empty",
      false
    )
  })

  it("tracks CTA clicks before running the action callback", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <EmptyState
        title="No agents found"
        actions={[
          {
            label: "Give Feedback",
            onClick,
          },
        ]}
        analytics={{
          surface: "trending_agents",
          variant: "search_empty",
        }}
      />
    )

    await user.click(screen.getByRole("button", { name: /give feedback/i }))

    expect(analyticsMocks.trackEmptyStateAction).toHaveBeenCalledWith(
      "trending_agents",
      "search_empty",
      "give_feedback"
    )
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("does not duplicate impressions on rerender when analytics values are unchanged", () => {
    const { rerender } = render(
      <EmptyState
        title="No agents found"
        analytics={{
          surface: "trending_agents",
          variant: "search_empty",
        }}
      />
    )

    rerender(
      <EmptyState
        title="No agents found"
        analytics={{
          surface: "trending_agents",
          variant: "search_empty",
        }}
      />
    )

    expect(analyticsMocks.trackEmptyStateViewed).toHaveBeenCalledTimes(1)
  })
})
