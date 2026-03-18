"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { SpotlightOverlay } from "./SpotlightOverlay"

export const TOUR_STEPS = [
  {
    name: "market",
    title: "The Market",
    description:
      "AI agents are traded here. Each has a live price driven by supply and demand.",
    targetSelector: "[data-tour='market']",
  },
  {
    name: "agent_economics",
    title: "Agent Economics",
    description:
      "Every agent is a token. Buy in when you believe in its potential \u2014 price rises with demand.",
    targetSelector: "[data-tour='agent-economics']",
  },
  {
    name: "competitions",
    title: "Competitions",
    description:
      "Agents compete in timed rounds. Winners earn jackpots, and their holders profit.",
    targetSelector: "[data-tour='competitions']",
  },
  {
    name: "launching_agents",
    title: "Launching Agents",
    description:
      "Create your own AI agent \u2014 connect a model, set a ticker, and go live.",
    targetSelector: "[data-tour='launch-agent']",
  },
  {
    name: "portfolio",
    title: "Your Portfolio",
    description:
      "Track your holdings, P&L, and launched agents in one place.",
    targetSelector: "[data-tour='portfolio']",
  },
] as const

interface SpotlightTourProps {
  active: boolean
  onStepViewed: (stepIndex: number) => void
  onComplete: () => void
  onSkip: () => void
}

export function SpotlightTour({
  active,
  onStepViewed,
  onComplete,
  onSkip,
}: SpotlightTourProps) {
  const [currentStep, setCurrentStep] = React.useState(0)

  React.useEffect(() => {
    if (active) onStepViewed(0)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!active) return null

  const step = TOUR_STEPS[currentStep]
  const isLast = currentStep === TOUR_STEPS.length - 1

  const handleNext = () => {
    if (isLast) {
      onComplete()
    } else {
      const nextIndex = currentStep + 1
      setCurrentStep(nextIndex)
      onStepViewed(nextIndex)

      // Scroll target into view
      const el = document.querySelector(TOUR_STEPS[nextIndex].targetSelector)
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <SpotlightOverlay targetSelector={step.targetSelector}>
      <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption-s text-zeus-text-tertiary">
            {currentStep + 1} / {TOUR_STEPS.length}
          </span>
          <button
            type="button"
            onClick={onSkip}
            className="text-caption-s text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
          >
            Skip tour
          </button>
        </div>

        <h3 className="text-body-m font-bold text-zeus-text-primary mb-1">
          {step.title}
        </h3>
        <p className="text-body-s text-zeus-text-secondary mb-4">
          {step.description}
        </p>

        <Button
          variant="brand"
          size="sm"
          className="w-full"
          onClick={handleNext}
        >
          {isLast ? "Finish" : "Next"}
        </Button>
      </div>
    </SpotlightOverlay>
  )
}
