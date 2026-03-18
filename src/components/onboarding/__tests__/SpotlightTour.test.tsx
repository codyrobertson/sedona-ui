import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SpotlightTour } from "../SpotlightTour"

// Mock SpotlightOverlay to avoid portal/DOM measurement issues in tests
vi.mock("../SpotlightOverlay", () => ({
  SpotlightOverlay: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="spotlight-overlay">{children}</div>
  ),
}))

describe("SpotlightTour", () => {
  const defaultProps = {
    active: true,
    onStepViewed: vi.fn(),
    onComplete: vi.fn(),
    onSkip: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders the first step title and description", () => {
    render(<SpotlightTour {...defaultProps} />)
    expect(screen.getByText("The Market")).toBeInTheDocument()
    expect(screen.getByText(/AI agents are traded here/)).toBeInTheDocument()
  })

  it("shows step counter", () => {
    render(<SpotlightTour {...defaultProps} />)
    expect(screen.getByText("1 / 5")).toBeInTheDocument()
  })

  it("calls onStepViewed(0) on mount when active", () => {
    render(<SpotlightTour {...defaultProps} />)
    expect(defaultProps.onStepViewed).toHaveBeenCalledWith(0)
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
    for (let i = 0; i < 4; i++) {
      await user.click(screen.getByRole("button", { name: /next/i }))
    }
    expect(
      screen.getByRole("button", { name: /finish/i })
    ).toBeInTheDocument()
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
