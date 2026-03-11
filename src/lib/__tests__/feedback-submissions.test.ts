import { beforeEach, describe, expect, it } from "vitest"
import {
  FEEDBACK_SUBMISSIONS_STORAGE_KEY,
  clearFeedbackSubmissions,
  getFeedbackSubmissions,
  queueFeedbackSubmission,
} from "@/lib/feedback-submissions"

describe("feedback submissions", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("stores feedback submissions in reverse chronological order", () => {
    const first = queueFeedbackSubmission({
      mode: "feedback",
      source: "trading_onboarding",
      category: "UX",
      subject: "Filters",
      message: "Need stronger sorting controls.",
      email: "pilot@sedona.fun",
    })

    const second = queueFeedbackSubmission({
      mode: "feedback",
      source: "profile",
      category: "Bug",
      message: "Profile save should be clearer.",
    })

    const stored = getFeedbackSubmissions()

    expect(stored).toHaveLength(2)
    expect(stored[0]).toMatchObject({
      id: second.id,
      source: "profile",
      category: "Bug",
      message: "Profile save should be clearer.",
    })
    expect(stored[1]).toMatchObject({
      id: first.id,
      source: "trading_onboarding",
      email: "pilot@sedona.fun",
    })
  })

  it("clears queued submissions", () => {
    queueFeedbackSubmission({
      mode: "feedback",
      source: "footer",
      message: "Keep the footer feedback shortcut.",
    })

    clearFeedbackSubmissions()

    expect(getFeedbackSubmissions()).toEqual([])
    expect(localStorage.getItem(FEEDBACK_SUBMISSIONS_STORAGE_KEY)).toBeNull()
  })
})
