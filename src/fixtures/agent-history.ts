import type { Time } from "lightweight-charts"

/**
 * Minimal agent data required for chart generation
 */
export interface AgentChartInput {
  ticker: string
  name: string
  marketCap: string
}

/**
 * Historical market cap data point
 */
export interface AgentHistoryPoint {
  time: Time
  value: number
}

/**
 * Agent with historical market cap data for charts
 */
export interface AgentHistory {
  ticker: string
  name: string
  color: string
  currentMarketCap: number
  history: AgentHistoryPoint[]
}

/**
 * Line colors for top agents chart
 * Distinct, accessible colors that work on dark backgrounds
 */
export const AGENT_LINE_COLORS = [
  "#f97316", // Orange (Sedona accent)
  "#22c55e", // Green
  "#3b82f6", // Blue
  "#a855f7", // Purple
  "#ec4899", // Pink
] as const

/**
 * Parse market cap string to number
 * "$1.2M" -> 1200000, "$45.3K" -> 45300
 */
export function parseMarketCap(mcap: string): number {
  const cleaned = mcap.replace(/[$,]/g, "")
  const num = parseFloat(cleaned)
  if (isNaN(num)) return 0
  if (mcap.includes("M")) return num * 1_000_000
  if (mcap.includes("K")) return num * 1_000
  return num
}

/**
 * Format number as market cap string
 * 1200000 -> "$1.2M", 45300 -> "$45.3K"
 */
export function formatMarketCap(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`
  }
  return `$${value.toFixed(0)}`
}

/**
 * Deterministic hash for consistent random values
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

/**
 * Generate realistic historical market cap data
 * Works backwards from current value with configurable volatility
 */
export function generateMarketCapHistory(
  finalValue: number,
  days: number = 30,
  seed: number = 0,
  volatility: number = 0.08,
  trend: number = 0.02
): AgentHistoryPoint[] {
  const history: AgentHistoryPoint[] = []
  const today = new Date()

  // Work backwards from final value
  let currentValue = finalValue
  const values: number[] = [currentValue]

  for (let i = 1; i < days; i++) {
    // Random daily change with trend
    const random = seededRandom(seed + i * 1000) - 0.5
    const change = 1 + (random * volatility * 2) - trend
    currentValue = currentValue / change

    // Ensure minimum value
    currentValue = Math.max(currentValue, finalValue * 0.1)
    values.unshift(currentValue)
  }

  // Create data points with dates
  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - (days - 1 - i))

    history.push({
      time: date.toISOString().split("T")[0] as Time,
      value: Math.round(values[i]),
    })
  }

  return history
}

/**
 * Generate history for a single agent
 */
export function generateAgentHistory(
  ticker: string,
  name: string,
  color: string,
  finalMarketCap: number,
  days: number = 30,
  seed: number = 0
): AgentHistory {
  // Determine trend direction based on seed
  const trendSeed = seededRandom(seed * 7)
  const trend = trendSeed > 0.6 ? 0.025 : trendSeed > 0.3 ? 0.01 : -0.01

  // Vary volatility per agent
  const volatility = 0.05 + seededRandom(seed * 13) * 0.1

  return {
    ticker,
    name,
    color,
    currentMarketCap: finalMarketCap,
    history: generateMarketCapHistory(finalMarketCap, days, seed, volatility, trend),
  }
}

/**
 * Get top N agents by market cap with generated historical data
 */
export function getTopAgentsWithHistory(
  agents: AgentChartInput[],
  count: number = 5
): AgentHistory[] {
  // Sort by market cap (highest first)
  const sorted = [...agents].sort((a, b) =>
    parseMarketCap(b.marketCap) - parseMarketCap(a.marketCap)
  )

  // Take top N and generate history
  return sorted.slice(0, count).map((agent, index) => {
    const mcap = parseMarketCap(agent.marketCap)
    // Use ticker hash as seed for consistent data
    const seed = agent.ticker.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)

    return generateAgentHistory(
      agent.ticker,
      agent.name,
      AGENT_LINE_COLORS[index % AGENT_LINE_COLORS.length],
      mcap,
      30,
      seed
    )
  })
}

/**
 * Filter history to specific timeframe
 */
export function filterHistoryByTimeframe(
  history: AgentHistoryPoint[],
  timeframe: "7d" | "30d"
): AgentHistoryPoint[] {
  if (timeframe === "30d") return history
  return history.slice(-7)
}
