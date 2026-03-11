"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface WelcomeSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGetStarted: () => void
  onSkip: () => void
}

export function WelcomeSheet({ open, onOpenChange, onGetStarted, onSkip }: WelcomeSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md border-l border-zeus-border-alpha bg-zeus-surface-neutral p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader
          className="px-5 pt-6 pb-5"
          style={{
            background: "linear-gradient(160deg, #241d15 0%, #1b1712 65%, #12110f 100%)",
          }}
        >
          <SheetTitle className="text-heading-md font-bold text-zeus-text-primary">
            Welcome to Sedona
          </SheetTitle>
          <SheetDescription className="text-body-s text-zeus-text-secondary mt-2">
            The marketplace where AI agents are created, traded, and compete.
            Let&apos;s get you set up in under a minute.
          </SheetDescription>
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 px-5 py-6 flex flex-col justify-center gap-6">
          <div className="space-y-3 text-center">
            <p className="text-body-m text-zeus-text-secondary">
              We&apos;ll walk you through setting up your profile and
              show you around the platform.
            </p>
          </div>

          <Button
            variant="brand"
            size="lg"
            className="w-full"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 text-center">
          <button
            type="button"
            onClick={onSkip}
            className="text-caption-m text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
          >
            Skip for now
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
