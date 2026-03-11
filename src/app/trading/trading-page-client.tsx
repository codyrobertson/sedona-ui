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
import { useAgentLaunch, useOnboardingV2 } from "@/contexts"
import type { AgentWithMetrics } from "@/types/agent"
import { WelcomeSheet } from "@/components/onboarding/WelcomeSheet"
import { SpotlightTour, TOUR_STEPS } from "@/components/onboarding/SpotlightTour"
import { GoalAction } from "@/components/onboarding/GoalAction"
import {
  trackOnboardingStarted,
  trackOnboardingSkipped,
  trackOnboardingTourStarted,
  trackOnboardingTourStepViewed,
  trackOnboardingTourSkipped,
  trackOnboardingTourCompleted,
  trackOnboardingGoalShown,
  trackOnboardingGoalCompleted,
  trackOnboardingFlowCompleted,
  getFeatureFlag,
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
    state: obState,
    isReady: isObReady,
    advance,
    skip,
    complete,
    trackTourStep,
    setGoal,
  } = useOnboardingV2()
  const [sortBy, setSortBy] = React.useState("Highest Market Capitalization")
  const [showHero, setShowHero] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Hero mode state - initialized from route, then state-controlled for animations
  const [isHeroMode, setIsHeroMode] = React.useState(initialHeroMode)

  // Sync URL when hero mode changes (without navigation - just URL update)
  React.useEffect(() => {
    const newUrl = isHeroMode ? "/landing" : "/trading"
    window.history.replaceState({}, "", newUrl)
  }, [isHeroMode])

  // Determine which v2 UI to show based on currentPhase
  const showWelcome = isObReady && !isHeroMode && obState.currentPhase === "welcome"
  const showTour = isObReady && !isHeroMode && obState.currentPhase === "tour"
  const showGoal = isObReady && !isHeroMode && obState.currentPhase === "goal"

  // Get goal variant from PostHog feature flag (with fallback)
  const goalVariant = (getFeatureFlag("onboarding_goal_action") as string) || "trade"

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


  return (
    <LandingPageWrapper
      isHeroMode={isHeroMode}
      onToggle={handleToggleMode}
      onLaunchAgent={openCreateAgent}
    >
      <div className="min-h-screen bg-zeus-surface-default">
      {/* Welcome Sheet */}
      <WelcomeSheet
        open={showWelcome}
        onOpenChange={() => {}}
        onGetStarted={() => {
          trackOnboardingStarted()
          advance("welcome")
          router.push("/onboarding/profile")
        }}
        onSkip={() => {
          trackOnboardingSkipped("welcome")
          skip()
        }}
      />

      {/* Spotlight Tour */}
      <SpotlightTour
        active={showTour}
        onStepViewed={(index) => {
          trackTourStep(index)
          trackOnboardingTourStepViewed(index, TOUR_STEPS[index].name)
          if (index === 0) trackOnboardingTourStarted()
        }}
        onComplete={() => {
          trackOnboardingTourCompleted()
          advance("tour")
          setGoal(goalVariant)
          trackOnboardingGoalShown(goalVariant)
        }}
        onSkip={() => {
          trackOnboardingTourSkipped(obState.tourStepsViewed.length - 1)
          complete()
          trackOnboardingFlowCompleted("partial")
        }}
      />

      {/* Goal Action */}
      <GoalAction
        active={showGoal}
        variant={goalVariant as any}
        onAction={() => {
          trackOnboardingGoalCompleted(goalVariant, goalVariant)
          complete()
          trackOnboardingFlowCompleted("full")
          if (goalVariant === "create_agent") openCreateAgent()
        }}
        onDismiss={() => {
          complete()
          trackOnboardingFlowCompleted("partial")
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
        <section aria-label="Platform Statistics" data-tour="competitions">
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
        <section className="px-6 py-8 pb-20" aria-label="Trending Agents" data-tour="market">
          {/* Trending Agents */}
          <TrendingAgents
            agents={displayAgents}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onSearch={setSearchQuery}

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
