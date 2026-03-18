"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

type GoalVariant = "trade" | "create_agent" | "view_agent"

const GOAL_CONFIG: Record<GoalVariant, { title: string; description: string; cta: string }> = {
  trade: {
    title: "Make your first trade",
    description: "Pick an agent you believe in and buy your first tokens.",
    cta: "Let's go",
  },
  create_agent: {
    title: "Launch your first agent",
    description: "Connect a model, set a ticker, and bring your AI agent to market.",
    cta: "Create Agent",
  },
  view_agent: {
    title: "Explore an agent",
    description: "Open an agent's detail page to see its chart, stats, and community.",
    cta: "Browse Agents",
  },
}

interface GoalActionProps {
  active: boolean
  variant: GoalVariant
  onAction: () => void
  onDismiss: () => void
}

export function GoalAction({ active, variant, onAction, onDismiss }: GoalActionProps) {
  if (!active) return null

  const config = GOAL_CONFIG[variant]

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-xl p-6 max-w-sm mx-4 text-center shadow-xl">
        <h3 className="text-heading-xs font-bold text-zeus-text-primary mb-2">
          {config.title}
        </h3>
        <p className="text-body-s text-zeus-text-secondary mb-5">
          {config.description}
        </p>

        <Button variant="brand" size="lg" className="w-full mb-3" onClick={onAction}>
          {config.cta}
        </Button>

        <button
          type="button"
          onClick={onDismiss}
          className="text-caption-m text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
