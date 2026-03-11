import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ContactForm } from "../ContactForm"

const mocks = vi.hoisted(() => ({
  queueFeedbackSubmission: vi.fn(),
  trackFeedbackOpened: vi.fn(),
  trackFeedbackCancelled: vi.fn(),
  trackFeedbackMailtoOpened: vi.fn(),
  trackFeedbackSubmitted: vi.fn(),
  isAnalyticsEnabled: vi.fn(),
  windowOpen: vi.fn(),
}))

vi.mock("@/lib/feedback-submissions", () => ({
  queueFeedbackSubmission: mocks.queueFeedbackSubmission,
}))

vi.mock("@/lib/analytics", () => ({
  isAnalyticsEnabled: mocks.isAnalyticsEnabled,
  trackFeedbackOpened: mocks.trackFeedbackOpened,
  trackFeedbackCancelled: mocks.trackFeedbackCancelled,
  trackFeedbackMailtoOpened: mocks.trackFeedbackMailtoOpened,
  trackFeedbackSubmitted: mocks.trackFeedbackSubmitted,
}))

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    mocks.queueFeedbackSubmission.mockReset()
    mocks.isAnalyticsEnabled.mockReset()
    mocks.trackFeedbackOpened.mockReset()
    mocks.trackFeedbackCancelled.mockReset()
    mocks.trackFeedbackMailtoOpened.mockReset()
    mocks.trackFeedbackSubmitted.mockReset()
    mocks.windowOpen.mockReset()
    mocks.isAnalyticsEnabled.mockReturnValue(true)
    vi.spyOn(window, "open").mockImplementation(mocks.windowOpen)
  })

  it("queues in-app feedback submissions instead of relying on mailto", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const onSubmitted = vi.fn()
    const message = "Wallet-scoped onboarding should carry across trading and profile."

    render(
      <ContactForm
        open
        onOpenChange={onOpenChange}
        mode="feedback"
        source="trading_onboarding"
        onSubmitted={onSubmitted}
      />
    )

    await user.type(
      screen.getByLabelText(/message/i),
      message
    )
    await user.click(screen.getByRole("button", { name: /send feedback/i }))

    expect(mocks.queueFeedbackSubmission).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "feedback",
        source: "trading_onboarding",
        message,
      })
    )
    expect(mocks.trackFeedbackSubmitted).toHaveBeenCalledWith({
      source: "trading_onboarding",
      category: "General",
      delivery: "posthog",
      email: undefined,
      hasEmail: false,
      messageLength: message.length,
      message,
      name: undefined,
      subject: undefined,
    })

    await waitFor(() => {
      expect(onSubmitted).toHaveBeenCalledTimes(1)
    })

    expect(mocks.windowOpen).not.toHaveBeenCalled()
    expect(onOpenChange).not.toHaveBeenCalledWith(false)
  })

  it("falls back to mailto when analytics is unavailable in feedback mode", async () => {
    const user = userEvent.setup()
    const message = "Need a no-wallet way to resume onboarding."

    mocks.isAnalyticsEnabled.mockReturnValue(false)

    render(
      <ContactForm
        open
        onOpenChange={vi.fn()}
        mode="feedback"
        source="footer"
      />
    )

    await user.type(screen.getByLabelText(/message/i), message)
    await user.click(screen.getByRole("button", { name: /send feedback/i }))

    expect(mocks.queueFeedbackSubmission).toHaveBeenCalled()
    expect(mocks.trackFeedbackMailtoOpened).toHaveBeenCalledWith("footer", "General")
    expect(mocks.windowOpen).toHaveBeenCalledWith(
      expect.stringContaining("mailto:admin@sedona.fun"),
      "_self"
    )
  })

  it("keeps contact mode wired to mailto delivery", async () => {
    const user = userEvent.setup()

    render(
      <ContactForm
        open
        onOpenChange={vi.fn()}
        mode="contact"
        source="support"
      />
    )

    await user.type(screen.getByLabelText(/^name/i), "Pilot")
    await user.type(screen.getByLabelText(/^email/i), "pilot@sedona.fun")
    await user.type(screen.getByLabelText(/message/i), "Need help with a deployment issue.")
    await user.click(screen.getByRole("button", { name: /send message/i }))

    expect(mocks.queueFeedbackSubmission).not.toHaveBeenCalled()
    expect(mocks.windowOpen).toHaveBeenCalledWith(
      expect.stringContaining("mailto:admin@sedona.fun"),
      "_self"
    )
  })

  it("tracks feedback cancellation when the dialog closes via Escape", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    render(
      <ContactForm
        open
        onOpenChange={onOpenChange}
        mode="feedback"
        source="profile"
      />
    )

    await user.keyboard("{Escape}")

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    expect(mocks.trackFeedbackCancelled).toHaveBeenCalledWith("profile", "dialog")
  })
})
