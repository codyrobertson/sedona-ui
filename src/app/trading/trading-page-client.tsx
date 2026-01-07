"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Header,
  PlatformStats,
  TrendingAgents,
  AboutSedona,
  AgentLaunchModal,
  Footer,
} from "@/components/trading"
import { LandingPageWrapper } from "@/components/landing"
import { getDummyAgents, getDummyPools, generateDummyPools } from "@/lib/dummy-data"

// Generate 300 dummy agents
const DUMMY_AGENTS = getDummyAgents(300)

// Get top pools for sidebar
const DUMMY_TOP_POOLS = generateDummyPools(DUMMY_AGENTS, 5).map((p, i) => ({
  rank: i + 1,
  ticker: p.ticker,
  marketCap: DUMMY_AGENTS.find(a => a.ticker === p.ticker)?.marketCap || "$0",
  change24h: p.change,
}))

// Get pools for marquee
const MARQUEE_POOLS = getDummyPools(30)

// Info cards data
const INFO_CARDS = [
  { title: "Total Volume", value: "$1.2M", change: 15.3 },
  { title: "Active Agents", value: "156", change: 8.2 },
  { title: "Avg. Return", value: "+12.4%", change: 3.1 },
  { title: "Top Gain", value: "+47.3%", change: 47.3 },
]

interface TradingPageClientProps {
  initialHeroMode?: boolean
}

export default function TradingPageClient({ initialHeroMode = false }: TradingPageClientProps) {
  const router = useRouter()
  const [showModal, setShowModal] = React.useState(false)
  const [sortBy, setSortBy] = React.useState("Highest Market Capitalization")
  const [showHero, setShowHero] = React.useState(true)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  // Hero mode state - initialized from route, then state-controlled for animations
  const [isHeroMode, setIsHeroMode] = React.useState(initialHeroMode)

  // Sync URL when hero mode changes (without navigation - just URL update)
  React.useEffect(() => {
    const newUrl = isHeroMode ? "/landing" : "/trading"
    window.history.replaceState({}, "", newUrl)
  }, [isHeroMode])

  const handleToggleMode = () => {
    if (isHeroMode) {
      // Exiting hero mode
      localStorage.setItem("sedona_visited", "true")
    }
    setIsHeroMode(!isHeroMode)
  }

  const handleLearnMore = () => {
    setIsHeroMode(true)
  }

  return (
    <LandingPageWrapper
      isHeroMode={isHeroMode}
      onToggle={handleToggleMode}
      onLaunchAgent={() => setShowModal(true)}
    >
      <div className="min-h-screen bg-zeus-surface-default">
      {/* Header */}
      <Header
        onCreateCoin={() => setShowModal(true)}
        onConnect={() => {
          router.push("/trading/portfolio")
        }}
      />

      <main>
        <h1 className="sr-only">AI Agent Trading</h1>

        {/* Platform Stats */}
        <section aria-label="Platform Statistics">
          <PlatformStats endsIn="0m 0s" jackpot="$201" tokens={1} topPools={MARQUEE_POOLS} />
        </section>

        {/* Hero: About Sedona */}
        {showHero && (
          <section aria-label="About Sedona">
            <AboutSedona
              onDismiss={() => setShowHero(false)}
              onLearnMore={handleLearnMore}
            />
          </section>
        )}

        {/* Main Content */}
        <section className="px-6 py-8 pb-20" aria-label="Trending Agents">
          {/* Trending Agents */}
          <TrendingAgents
            agents={DUMMY_AGENTS}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onSearch={() => {}}
            onAgentSelect={(ticker) => {
              router.push(`/trading/${ticker.toLowerCase()}`)
            }}
          />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Agent Launch Modal */}
      <AgentLaunchModal
        open={showModal}
        onOpenChange={setShowModal}
        isAuthenticated={isAuthenticated}
        onSignIn={() => {
          setIsAuthenticated(true)
        }}
        onSelectModel={() => {}}
        onCreateAgent={() => {}}
        onLaunch={() => {
          setShowModal(false)
        }}
      />

    </div>
    </LandingPageWrapper>
  )
}
