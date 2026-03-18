"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { queueFeedbackSubmission } from "@/lib/feedback-submissions"
import { cn } from "@/lib/utils"
import {
  isAnalyticsEnabled,
  trackFeedbackCancelled,
  trackFeedbackMailtoOpened,
  trackFeedbackOpened,
  trackFeedbackSubmitted,
} from "@/lib/analytics"

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "admin@sedona.fun"
const FEEDBACK_CATEGORIES = ["Bug", "Feature Request", "UX", "General"] as const
type FormMode = "contact" | "feedback"

interface ContactFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode?: FormMode
  source?: string
  onSubmitted?: () => void
}

export function ContactForm({
  open,
  onOpenChange,
  mode = "contact",
  source = "unknown",
  onSubmitted,
}: ContactFormProps) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [category, setCategory] = React.useState<(typeof FEEDBACK_CATEGORIES)[number]>("General")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [submissionDelivery, setSubmissionDelivery] = React.useState<"posthog" | "mailto_fallback" | "contact_mailto" | null>(null)
  const trackedOpen = React.useRef(false)

  const resetForm = React.useCallback(() => {
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setCategory("General")
    setSubmitted(false)
    setSubmissionDelivery(null)
    setIsSubmitting(false)
  }, [])

  React.useEffect(() => {
    if (open && mode === "feedback" && !trackedOpen.current) {
      trackFeedbackOpened(source, "dialog")
      trackedOpen.current = true
    }

    if (!open) {
      trackedOpen.current = false
    }
  }, [open, mode, source])

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && open && isFeedbackMode && !submitted) {
      trackFeedbackCancelled(source, "dialog")
    }

    onOpenChange(nextOpen)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const trimmedName = name.trim() || undefined
    const trimmedEmail = email.trim() || undefined
    const trimmedSubject = subject.trim() || undefined
    const trimmedMessage = message.trim()

    const mailtoBody = encodeURIComponent(
      [
        isFeedbackMode ? `Feedback Type: ${category}` : null,
        `Source: ${source}`,
        `Name: ${trimmedName || "Anonymous"}`,
        `Email: ${trimmedEmail || "Not provided"}`,
        "",
        trimmedMessage,
      ]
        .filter(Boolean)
        .join("\n")
    )
    const mailtoSubject = encodeURIComponent(
      trimmedSubject || (isFeedbackMode ? `Sedona feedback: ${category}` : "Contact from Sedona")
    )
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`

    if (isFeedbackMode) {
      queueFeedbackSubmission({
        mode,
        source,
        category,
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
      })

      const analyticsAvailable = isAnalyticsEnabled()

      trackFeedbackSubmitted({
        source,
        category,
        delivery: analyticsAvailable ? "posthog" : "mailto_fallback",
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        hasEmail: Boolean(trimmedEmail),
        messageLength: trimmedMessage.length,
      })

      if (!analyticsAvailable) {
        trackFeedbackMailtoOpened(source, category)
        window.open(mailtoLink, "_self")
        setSubmissionDelivery("mailto_fallback")
      } else {
        setSubmissionDelivery("posthog")
      }
    } else {
      window.open(`mailto:${CONTACT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`, "_self")
      setSubmissionDelivery("contact_mailto")
    }

    setIsSubmitting(false)
    setSubmitted(true)
    onSubmitted?.()

    window.setTimeout(() => {
      onOpenChange(false)
      window.setTimeout(() => {
        resetForm()
      }, 200)
    }, 1400)
  }

  const isFeedbackMode = mode === "feedback"
  const isValid = isFeedbackMode ? message.trim() : name.trim() && email.trim() && message.trim()

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon icon="envelope" className="w-4 h-4 text-sedona-500" />
            {isFeedbackMode ? "Send Feedback" : "Contact Us"}
          </DialogTitle>
          <DialogDescription>
            {isFeedbackMode
              ? "Tell us what feels sharp, broken, or missing. Feedback is saved directly in the app so you can send it without leaving the flow."
              : "Send us a message and we&apos;ll open your email client with a drafted note so nothing gets dropped."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Icon icon="check" className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-zeus-text-primary font-medium">
              {submissionDelivery === "posthog"
                ? "Feedback captured."
                : "Opening your email client..."}
            </p>
            <p className="text-zeus-text-secondary text-caption-m">
              {submissionDelivery === "posthog"
                ? "Thanks. Your note was sent through Sedona's in-app feedback channel."
                : isFeedbackMode
                  ? "Direct delivery fallback is open in your mail app."
                  : "Finish sending the drafted message in your mail app."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {isFeedbackMode && (
              <div className="space-y-2">
                <label className="text-caption-m font-medium text-zeus-text-primary">
                  Feedback Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {FEEDBACK_CATEGORIES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-caption-m transition-colors",
                        category === item
                          ? "border-sedona-500 bg-sedona-500 text-white"
                          : "border-zeus-border-alpha bg-zeus-surface-default text-zeus-text-secondary hover:text-zeus-text-primary"
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-caption-m font-medium text-zeus-text-primary"
              >
                Name {isFeedbackMode && <span className="text-zeus-text-tertiary font-normal">(optional)</span>}
              </label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isFeedbackMode}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-caption-m font-medium text-zeus-text-primary"
              >
                Email {isFeedbackMode && <span className="text-zeus-text-tertiary font-normal">(optional)</span>}
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!isFeedbackMode}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-caption-m font-medium text-zeus-text-primary"
              >
                {isFeedbackMode ? "Summary" : "Subject"}{" "}
                <span className="text-zeus-text-tertiary font-normal">(optional)</span>
              </label>
              <Input
                id="subject"
                placeholder={isFeedbackMode ? "Short summary" : "What's this about?"}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-caption-m font-medium text-zeus-text-primary"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder={isFeedbackMode ? "What should we improve or investigate?" : "Tell us what's on your mind..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
              />
            </div>

            {isFeedbackMode && (
              <p className="text-caption-s text-zeus-text-tertiary">
                Want a follow-up? Leave an email, or reach us directly at{" "}
                <span className="font-medium text-zeus-text-secondary">{CONTACT_EMAIL}</span>.
              </p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleDialogOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={cn(
                  "bg-sedona-500 hover:bg-sedona-600 text-white",
                  isSubmitting && "opacity-70"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="spinner" className="w-4 h-4 mr-2 animate-spin" />
                    {isFeedbackMode ? "Saving..." : "Submitting..."}
                  </>
                ) : (
                  <>
                    <Icon icon="paper-plane" className="w-4 h-4 mr-2" />
                    {isFeedbackMode ? "Send Feedback" : "Send Message"}
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { CONTACT_EMAIL }
