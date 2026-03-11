"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { ONBOARDING_STEPS, type OnboardingStep } from "@/lib/onboarding-storage"
import { cn } from "@/lib/utils"

interface FirstRunSheetProps {
  open: boolean
  completedSteps: OnboardingStep[]
  onOpenChange: (open: boolean) => void
  onExploreAgents: () => void
  onOpenProfile: () => void
  onGiveFeedback: () => void
  onSkip: () => void
}

const STEP_CONTENT: Record<
  typeof ONBOARDING_STEPS[number],
  { icon: string; title: string; description: string }
> = {
  explore_agents: {
    icon: "chart-line",
    title: "Explore agents",
    description: "Scan the leaderboard, sort movers, and open live trading views.",
  },
  open_profile: {
    icon: "user-gear",
    title: "Complete profile",
    description: "Add your identity, socials, and notification preferences for a cleaner setup.",
  },
  give_feedback: {
    icon: "comment-dots",
    title: "Give feedback",
    description: "Tell us what feels sharp, confusing, or missing while the product is still taking shape.",
  },
}

export function FirstRunSheet({
  open,
  completedSteps,
  onOpenChange,
  onExploreAgents,
  onOpenProfile,
  onGiveFeedback,
  onSkip,
}: FirstRunSheetProps) {
  const completedCount = completedSteps.length

  const handleSkip = () => {
    onSkip()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full border-zeus-border-alpha bg-zeus-surface-default p-0 sm:max-w-lg">
        <div className="border-b border-zeus-border-alpha bg-[linear-gradient(160deg,#241d15_0%,#1b1712_65%,#12110f_100%)] px-5 py-6 sm:px-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-caption-s text-white/80">
              <Icon icon="sparkles" className="h-3.5 w-3.5 text-sedona-400" />
              First run checklist
            </div>
            <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-caption-s text-white/70">
              {completedCount}/{ONBOARDING_STEPS.length} done
            </div>
          </div>

          <SheetTitle className="text-heading-xs font-semibold text-zeus-text-primary">
            Welcome to Sedona
          </SheetTitle>
          <SheetDescription className="mt-2 max-w-md text-caption-l text-zeus-text-secondary">
            Start with the core surfaces: explore the market, set up your profile, and send product feedback directly from the app.
          </SheetDescription>
        </div>

        <div className="space-y-3 px-5 py-5 sm:px-6">
          {ONBOARDING_STEPS.map((step) => {
            const details = STEP_CONTENT[step]
            const isComplete = completedSteps.includes(step)

            return (
              <div
                key={step}
                className={cn(
                  "rounded-xl border px-4 py-4",
                  isComplete
                    ? "border-sedona-500/30 bg-sedona-500/10"
                    : "border-zeus-border-alpha bg-zeus-surface-elevated"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                      isComplete
                        ? "bg-sedona-500 text-white"
                        : "bg-zeus-surface-default text-zeus-text-secondary"
                    )}
                  >
                    <Icon icon={isComplete ? "check" : details.icon} className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-body-s font-semibold text-zeus-text-primary">
                        {details.title}
                      </h3>
                      {isComplete && (
                        <span className="rounded-full bg-sedona-500/15 px-2 py-0.5 text-caption-s font-medium text-sedona-400">
                          Done
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-caption-l leading-relaxed text-zeus-text-secondary">
                      {details.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-t border-zeus-border-alpha px-5 py-4 sm:px-6">
          <div className="grid gap-2 sm:grid-cols-2">
            <Button variant="brand" className="w-full" onClick={onExploreAgents}>
              Explore Agents
            </Button>
            <Button variant="secondary" className="w-full" onClick={onOpenProfile}>
              Complete Profile
            </Button>
            <Button variant="outline" className="w-full sm:col-span-2" onClick={onGiveFeedback}>
              Give Feedback
            </Button>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="mt-4 text-caption-m text-zeus-text-tertiary transition-colors hover:text-zeus-text-primary"
          >
            Skip for now
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
