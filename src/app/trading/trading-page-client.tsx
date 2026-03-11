"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Header,
  PlatformStats,
  TrendingAgents,
  AboutSedona,
} from "@/components/trading"
import { LandingPageWrapper } from "@/components/landing"
import {
  AGENTS,
  formatMarketCap,
  searchAgents,
} from "@/fixtures"
import { useAgentLaunch, useOnboarding } from "@/contexts"
import type { OnboardingStep } from "@/lib/onboarding-storage"
import type { AgentWithMetrics } from "@/types/agent"
import { FirstRunSheet } from "@/components/onboarding/FirstRunSheet"
import { ContactForm } from "@/components/contact/ContactForm"
import {
  trackFirstRunDismissed,
  trackFirstRunViewed,
} from "@/lib/analytics"

// Map unified Agent to TrendingAgents format
function mapAgentToListItem(agent: AgentWithMetrics) {
  return {
    name: agent.name,
    ticker: agent.ticker,
    description: agent.description,
    avatarUrl: undefined, // Could use agent.uri for metadata image
    avatarFallback: agent.ticker[0],
    change24h: agent.price_change_percent_in_24_hours,
    marketCap: formatMarketCap(agent.market_cap_usd_latest),
    volume: formatMarketCap(agent.volume_24h_usd ?? 0),
    volumeChange: 0,
  }
}

// Get agents mapped for the list
const MAPPED_AGENTS = AGENTS.map(mapAgentToListItem)

// Build marquee pools from agents
const MARQUEE_POOLS = AGENTS.slice(0, 30).map((agent) => ({
  name: agent.name,
  ticker: agent.ticker,
  price: `$${(agent.price_usd ?? 0).toFixed(4)}`,
  change: agent.price_change_percent_in_24_hours,
  volume: formatMarketCap(agent.volume_24h_usd ?? 0),
  marketCap: formatMarketCap(agent.market_cap_usd_latest),
}))

interface TradingPageClientProps {
  initialHeroMode?: boolean
}

export default function TradingPageClient({ initialHeroMode = false }: TradingPageClientProps) {
  const router = useRouter()
  const { openCreateAgent } = useAgentLaunch()
  const {
    state: onboardingState,
    isReady: isOnboardingReady,
    isSheetOpen,
    setSheetOpen,
    completeStep,
    dismissOnboarding,
  } = useOnboarding()
  const [sortBy, setSortBy] = React.useState("Highest Market Capitalization")
  const [showHero, setShowHero] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [feedbackOpen, setFeedbackOpen] = React.useState(false)

  // Hero mode state - initialized from route, then state-controlled for animations
  const [isHeroMode, setIsHeroMode] = React.useState(initialHeroMode)

  // Sync URL when hero mode changes (without navigation - just URL update)
  React.useEffect(() => {
    const newUrl = isHeroMode ? "/landing" : "/trading"
    window.history.replaceState({}, "", newUrl)
  }, [isHeroMode])

  React.useEffect(() => {
    if (!isOnboardingReady || isHeroMode) return
    if (onboardingState.hasCompletedOnboarding || onboardingState.dismissedAt) return

    setSheetOpen(true)
  }, [
    isHeroMode,
    isOnboardingReady,
    onboardingState.dismissedAt,
    onboardingState.hasCompletedOnboarding,
    setSheetOpen,
  ])

  React.useEffect(() => {
    if (!isSheetOpen) return

    trackFirstRunViewed(
      "trading",
      onboardingState.completedSteps.length,
      onboardingState.dismissedAt
    )
  }, [isSheetOpen, onboardingState.completedSteps.length, onboardingState.dismissedAt])

  // Sort and filter agents
  const displayAgents = React.useMemo(() => {
    let agents = [...AGENTS]

    // Apply search filter
    if (searchQuery) {
      agents = searchAgents(searchQuery)
    }

    // Apply sort
    switch (sortBy) {
      case "Highest Market Capitalization":
        agents = [...agents].sort((a, b) => b.market_cap_usd_latest - a.market_cap_usd_latest)
        break
      case "Lowest Market Capitalization":
        agents = [...agents].sort((a, b) => a.market_cap_usd_latest - b.market_cap_usd_latest)
        break
      case "Highest Volume":
        agents = [...agents].sort((a, b) => (b.volume_24h_usd ?? 0) - (a.volume_24h_usd ?? 0))
        break
      case "Highest 24h Change":
        agents = [...agents].sort((a, b) => b.price_change_percent_in_24_hours - a.price_change_percent_in_24_hours)
        break
      case "Recently Created":
        // For now, reverse order (newest first) - would need createdAt field
        agents = [...agents].reverse()
        break
    }

    return agents.map(mapAgentToListItem)
  }, [sortBy, searchQuery])

  const handleToggleMode = () => {
    setIsHeroMode(!isHeroMode)
  }

  const handleOnboardingOpenChange = (open: boolean) => {
    if (!open) {
      trackFirstRunDismissed("trading", onboardingState.completedSteps)
      dismissOnboarding()
      return
    }

    setSheetOpen(true)
  }

  const handleCompleteStep = (step: OnboardingStep) => {
    return completeStep(step, "trading")
  }


  return (
    <LandingPageWrapper
      isHeroMode={isHeroMode}
      onToggle={handleToggleMode}
      onLaunchAgent={openCreateAgent}
    >
      <div className="min-h-screen bg-zeus-surface-default">
      <FirstRunSheet
        open={isSheetOpen}
        completedSteps={onboardingState.completedSteps}
        onOpenChange={handleOnboardingOpenChange}
        onExploreAgents={() => {
          handleCompleteStep("explore_agents")
          setSheetOpen(false)
        }}
        onOpenProfile={() => {
          setSheetOpen(false)
          router.push("/trading/profile")
        }}
        onGiveFeedback={() => {
          setSheetOpen(false)
          setFeedbackOpen(true)
        }}
        onSkip={() => {}}
      />
      <ContactForm
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        mode="feedback"
        source="trading_onboarding"
        onSubmitted={() => {
          handleCompleteStep("give_feedback")
        }}
      />
      {/* Header - hidden in hero mode (landing nav takes over) */}
      {!isHeroMode && (
        <Header
          onCreateCoin={openCreateAgent}
          onConnect={() => {
            router.push("/trading/portfolio")
          }}
          onProfile={() => {
            router.push("/trading/profile")
          }}
        />
      )}

      <main>
        <h1 className="sr-only">AI Agent Trading</h1>

        {/* Platform Stats */}
        <section aria-label="Platform Statistics">
          <PlatformStats
            endsInSeconds={754}
            jackpotValue={2450}
            tokens={AGENTS.length}
            topPools={MARQUEE_POOLS}
          />
        </section>

        {/* Hero: About Sedona */}
        {showHero && (
          <section aria-label="About Sedona">
            <AboutSedona
              onDismiss={() => setShowHero(false)}
              onExplore={() => setIsHeroMode(true)}
            />
          </section>
        )}

        {/* Main Content */}
        <section className="px-6 py-8 pb-20" aria-label="Trending Agents">
          {/* Trending Agents */}
          <TrendingAgents
            agents={displayAgents}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onSearch={setSearchQuery}
            onOpenFeedback={() => setFeedbackOpen(true)}
            onAgentSelect={(ticker) => {
              router.push(`/trading/${ticker.toLowerCase()}`)
            }}
          />
        </section>
      </main>
    </div>
    </LandingPageWrapper>
  )
}
