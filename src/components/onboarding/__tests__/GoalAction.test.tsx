import { describe, it, expect, vi, beforeEach } from "vitest"
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

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders goal prompt for trade variant", () => {
    render(<GoalAction {...defaultProps} />)
    expect(screen.getByText(/make your first trade/i)).toBeInTheDocument()
  })

  it("renders goal prompt for create_agent variant", () => {
    render(<GoalAction {...defaultProps} variant="create_agent" />)
    expect(screen.getByText(/launch your first agent/i)).toBeInTheDocument()
  })

  it("renders goal prompt for view_agent variant", () => {
    render(<GoalAction {...defaultProps} variant="view_agent" />)
    expect(screen.getByText(/explore an agent/i)).toBeInTheDocument()
  })

  it("calls onAction when CTA clicked", async () => {
    const user = userEvent.setup()
    render(<GoalAction {...defaultProps} />)
    await user.click(screen.getByRole("button", { name: /let.*go/i }))
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
