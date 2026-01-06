import type { AgentModel } from "@/components/trading/AgentLaunchModal"

/**
 * Default agent models for the launch modal
 */
export const DEFAULT_AGENT_MODELS: AgentModel[] = [
  {
    id: "1",
    name: "Alpha Trader",
    description: "High-frequency trading",
    strategy: "Momentum",
    performance: "+24.5%"
  },
  {
    id: "2",
    name: "Momentum Bot",
    description: "Trend following",
    strategy: "Breakout",
    performance: "+18.2%"
  },
  {
    id: "3",
    name: "Arbitrage AI",
    description: "Cross-DEX arbitrage",
    strategy: "Arbitrage",
    performance: "+12.8%"
  },
  {
    id: "4",
    name: "Sentiment Scout",
    description: "Social sentiment analysis",
    strategy: "Sentiment",
    performance: "+31.4%"
  },
  {
    id: "5",
    name: "Whale Watcher",
    description: "Large wallet tracking",
    strategy: "Copy Trading",
    performance: "+15.6%"
  },
]

/**
 * Agent strategy types
 */
export const AGENT_STRATEGIES = [
  "Momentum",
  "Breakout",
  "Arbitrage",
  "Sentiment",
  "Copy Trading",
  "Grid Trading",
  "DCA",
  "Scalping",
] as const

export type AgentStrategy = typeof AGENT_STRATEGIES[number]
