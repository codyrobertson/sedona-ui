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
import { cn } from "@/lib/utils"

const CONTACT_EMAIL = "admin@sedona.fun"

interface ContactFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactForm({ open, onOpenChange }: ContactFormProps) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create mailto link with form data
    const mailtoSubject = encodeURIComponent(subject || "Contact from Sedona")
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`

    // Open mail client
    window.location.href = mailtoLink

    // Show success state briefly
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        onOpenChange(false)
        // Reset form after close animation
        setTimeout(() => {
          setName("")
          setEmail("")
          setSubject("")
          setMessage("")
          setSubmitted(false)
        }, 200)
      }, 1500)
    }, 500)
  }

  const isValid = name.trim() && email.trim() && message.trim()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon icon="envelope" className="w-4 h-4 text-sedona-500" />
            Contact Us
          </DialogTitle>
          <DialogDescription>
            Send us a message and we&apos;ll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Icon icon="check" className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-zeus-text-primary font-medium">Opening your email client...</p>
            <p className="text-zeus-text-secondary text-caption-m">
              Complete sending in your mail app
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-caption-m font-medium text-zeus-text-primary"
              >
                Name
              </label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-caption-m font-medium text-zeus-text-primary"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-caption-m font-medium text-zeus-text-primary"
              >
                Subject{" "}
                <span className="text-zeus-text-tertiary font-normal">(optional)</span>
              </label>
              <Input
                id="subject"
                placeholder="What's this about?"
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
                placeholder="Tell us what's on your mind..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
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
                    Sending...
                  </>
                ) : (
                  <>
                    <Icon icon="paper-plane" className="w-4 h-4 mr-2" />
                    Send Message
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
