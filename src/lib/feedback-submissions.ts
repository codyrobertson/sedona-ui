import { isStorageAvailable } from "@/lib/profile-storage"

export const FEEDBACK_SUBMISSIONS_STORAGE_KEY = "sedona_feedback_submissions"

export type FeedbackSubmissionMode = "contact" | "feedback"

export interface FeedbackSubmission {
  id: string
  createdAt: string
  mode: FeedbackSubmissionMode
  source: string
  category?: string
  name?: string
  email?: string
  subject?: string
  message: string
}

interface QueueFeedbackSubmissionInput {
  mode: FeedbackSubmissionMode
  source: string
  category?: string
  name?: string
  email?: string
  subject?: string
  message: string
}

function normalizeValue(value?: string): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

function normalizeStoredSubmissions(value: unknown): FeedbackSubmission[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter((item): item is FeedbackSubmission => Boolean(item && typeof item === "object"))
    .map((item) => ({
      id: typeof item.id === "string" ? item.id : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
      mode: (item.mode === "contact" ? "contact" : "feedback") as FeedbackSubmissionMode,
      source: typeof item.source === "string" ? item.source : "unknown",
      category: normalizeValue(item.category),
      name: normalizeValue(item.name),
      email: normalizeValue(item.email),
      subject: normalizeValue(item.subject),
      message: typeof item.message === "string" ? item.message : "",
    }))
    .filter((item) => item.message.length > 0)
}

export function getFeedbackSubmissions(): FeedbackSubmission[] {
  if (!isStorageAvailable()) return []

  try {
    const rawValue = localStorage.getItem(FEEDBACK_SUBMISSIONS_STORAGE_KEY)

    if (!rawValue) {
      return []
    }

    return normalizeStoredSubmissions(JSON.parse(rawValue))
  } catch {
    return []
  }
}

export function queueFeedbackSubmission(
  input: QueueFeedbackSubmissionInput
): FeedbackSubmission {
  const submission: FeedbackSubmission = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    createdAt: new Date().toISOString(),
    mode: input.mode,
    source: input.source,
    category: normalizeValue(input.category),
    name: normalizeValue(input.name),
    email: normalizeValue(input.email),
    subject: normalizeValue(input.subject),
    message: input.message.trim(),
  }

  if (!isStorageAvailable()) {
    return submission
  }

  const existing = getFeedbackSubmissions()
  localStorage.setItem(
    FEEDBACK_SUBMISSIONS_STORAGE_KEY,
    JSON.stringify([submission, ...existing])
  )

  return submission
}

export function clearFeedbackSubmissions(): void {
  if (!isStorageAvailable()) return

  localStorage.removeItem(FEEDBACK_SUBMISSIONS_STORAGE_KEY)
}
