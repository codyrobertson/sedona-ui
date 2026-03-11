import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { WelcomeSheet } from "@/components/onboarding/WelcomeSheet"

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
    expect(
      screen.getByRole("button", { name: /get started/i })
    ).toBeInTheDocument()
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
