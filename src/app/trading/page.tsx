"use client"

import * as React from "react"
import {
  Header,
  PlatformStats,
  TrendingAgents,
  AboutSedona,
  AgentLaunchModal,
  Footer,
} from "@/components/trading"
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

export default function TradingDemoPage() {
  const [showModal, setShowModal] = React.useState(false)
  const [sortBy, setSortBy] = React.useState("Highest Market Capitalization")
  const [showHero, setShowHero] = React.useState(true)

  return (
    <div className="min-h-screen bg-zeus-surface-default">
      {/* Header */}
      <Header
        onDocs={() => console.log("Docs clicked")}
        onCreateCoin={() => setShowModal(true)}
        onConnect={() => {
          window.location.href = "/trading/portfolio"
        }}
      />

      {/* Platform Stats */}
      <PlatformStats endsIn="0m 0s" jackpot="$201" tokens={1} topPools={MARQUEE_POOLS} />

      {/* Hero: About Sedona */}
      {showHero && (
        <AboutSedona onDismiss={() => setShowHero(false)} />
      )}

      {/* Main Content */}
      <div className="px-6 py-8 pb-20">
        {/* Trending Agents */}
        <TrendingAgents
          agents={DUMMY_AGENTS}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onSearch={(query) => console.log("Search:", query)}
          onAgentSelect={(ticker) => {
            window.location.href = `/trading/${ticker.toLowerCase()}`
          }}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Agent Launch Modal */}
      <AgentLaunchModal
        open={showModal}
        onOpenChange={setShowModal}
        isAuthenticated={false}
        onSignIn={() => console.log("Sign in with Hugging Face")}
        onSelectModel={(id) => console.log("Selected:", id)}
        onLaunch={(id) => {
          setShowModal(false)
          console.log("Launching agent:", id)
        }}
      />
    </div>
  )
}
