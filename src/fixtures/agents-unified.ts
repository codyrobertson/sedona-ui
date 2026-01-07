/**
 * Unified agents fixture matching production API structure
 * All agent data flows through this single source
 */

import type { AgentWithMetrics, PricePattern } from "@/types/agent"

// =============================================================================
// Constants
// =============================================================================

/** Default SOL quote mint */
const SOL_MINT = "So11111111111111111111111111111111111111112"

/** Current game ID */
const CURRENT_GAME_ID = "7xZAApBQGqkGNKLATaz3PJQxtRtyHP3GGGKiiXzaKo9y"

/** Sample creator wallets for "my agents" filtering */
export const MY_WALLET = "J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w"

// =============================================================================
// Mock Agents Data
// =============================================================================

export const AGENTS: AgentWithMetrics[] = [
  {
    pool: "4jtx9PnrV86Cd8pVhcAmhsiDoq2YbKqU1Kt3cAvoMv5M",
    config: "2A2YC4r6AFWLEFhY2p1fy4pBF1u9Cvrhhe8yUY25XiTf",
    creator: "2A2YC4r6AFWLEFhY2p1fy4pBF1u9Cvrhhe8yUY25XiTf",
    base_mint: "Cbxmia1BquL9J4TxK4Dhcg2VWfP5UKG8jwnHnD3wFJfB",
    quote_mint: SOL_MINT,
    name: "Test Agent",
    ticker: "TEST",
    description: "An experimental trading agent using transformer architecture for market prediction and automated position management.",
    agent_url: "https://huggingface.co/skylerwastaken/test",
    uri: "https://pub-74d06e872c714e34bc4a5ae9561fbe70.r2.dev/metadata/Cbxmia1BquL9J4TxK4Dhcg2VWfP5UKG8jwnHnD3wFJfB.json",
    game_id: CURRENT_GAME_ID,
    game_id_parsed: "game-1756527852486-cke5g8",
    market_cap_usd_latest: 7438.67,
    price_change_percent_in_24_hours: 5.4,
    price_change_percent_1h: 2.3,
    price_change_percent_7d: 12.8,
    price_change_percent_30d: 45.2,
    volume_24h_usd: 1200,
    tvl_usd: 500,
    holders: 47,
    price_usd: 0.0074,
    pricePattern: "pump",
  },
  {
    pool: "5kMx8PqrW97De9pVhcBnhtDoq3YcLrS2Kt4dBwpNw6N",
    config: "3B3ZD5s7BGXMFGhZ3q2gBG2v0Dwsuve9eLbtnCVjUh0X",
    creator: MY_WALLET, // This is "my" agent
    base_mint: "Dcynie2BquM9K5UxL4Eig3WRfQ6VKG9jxoIHoE4xGJgC",
    quote_mint: SOL_MINT,
    name: "Research Agent",
    ticker: "RESEARCH",
    description: "AI agent specialized in research synthesis and knowledge extraction from academic papers and technical documentation.",
    agent_url: "https://huggingface.co/research-labs/research-agent-v3",
    uri: "https://pub-74d06e872c714e34bc4a5ae9561fbe70.r2.dev/metadata/research.json",
    game_id: CURRENT_GAME_ID,
    game_id_parsed: "game-1756527852486-cke5g8",
    market_cap_usd_latest: 847000,
    price_change_percent_in_24_hours: 3.2,
    price_change_percent_1h: 0.8,
    price_change_percent_7d: 15.4,
    price_change_percent_30d: 89.3,
    volume_24h_usd: 124500,
    tvl_usd: 45000,
    holders: 1247,
    price_usd: 0.0847,
    pricePattern: "volatile",
  },
  {
    pool: "6lNy9QrsX08Ef0qWhcCohsEr4ZdMsT3Lu5eCyqPx7P0",
    config: "4C4AE6t8CHYNGIiA4r3hCH3w1ExtvfgFMcuoCWkVi1Y",
    creator: "7D5BF7u9DIZOHJjB5s4iDI4x2Fywvwh0gNdvpDXlWj2Z",
    base_mint: "Edziof3CruN0L6VxM5Fjh4XSfR7WLH0kyzpJoF5yHKhD",
    quote_mint: SOL_MINT,
    name: "Alpha Trader",
    ticker: "ALPHA",
    description: "Advanced algorithmic trading agent specializing in momentum strategies and cross-market arbitrage opportunities.",
    agent_url: "https://huggingface.co/alpha-labs/alpha-trader-v2",
    uri: "https://pub-74d06e872c714e34bc4a5ae9561fbe70.r2.dev/metadata/alpha.json",
    game_id: CURRENT_GAME_ID,
    game_id_parsed: "game-1756527852486-cke5g8",
    market_cap_usd_latest: 2450000,
    price_change_percent_in_24_hours: -2.1,
    price_change_percent_1h: -0.5,
    price_change_percent_7d: 8.9,
    price_change_percent_30d: 124.5,
    volume_24h_usd: 890000,
    tvl_usd: 125000,
    holders: 3892,
    price_usd: 0.245,
    pricePattern: "pump",
  },
  {
    pool: "7mOz0RstY19Fg1rXidDpiuFs5AeNtU4Mv6fDzqQy8Q1",
    config: "5D5BG7v0EJaPIKjC6t5jEJ5y3Gzxwih1hOevqEYmXk3A",
    creator: "8E6CG8w1FKbQKLkD7u6kFK6z4Hzywjj2iPfwrFZnYl4B",
    base_mint: "Fezjpg4DsuO1M7WxN6Gki5YTfS8XSI1lzqKpG6zILiE",
    quote_mint: SOL_MINT,
    name: "Sigma Protocol",
    ticker: "SIGMA",
    description: "Statistical arbitrage agent using advanced volatility modeling and mean reversion strategies.",
    agent_url: "https://huggingface.co/sigma-finance/sigma-protocol",
    uri: "https://pub-74d06e872c714e34bc4a5ae9561fbe70.r2.dev/metadata/sigma.json",
    game_id: CURRENT_GAME_ID,
    game_id_parsed: "game-1756527852486-cke5g8",
    market_cap_usd_latest: 1890000,
    price_change_percent_in_24_hours: 7.8,
    price_change_percent_1h: 1.2,
    price_change_percent_7d: -3.4,
    price_change_percent_30d: 67.2,
    volume_24h_usd: 456000,
    tvl_usd: 89000,
    holders: 2156,
    price_usd: 0.189,
    pricePattern: "sideways",
  },
  {
    pool: "8nPa1StuZ20Gh2sYjeEqjvGt6BeOuV5Nw7gEsRz9R2",
    config: "6E6CH8x2GKcRLMlE8v7lGL7a5Iayzki3jQgxsFaoZm5C",
    creator: MY_WALLET, // This is "my" agent
    base_mint: "Gfakqh5EtuP2N8YxO7Hlj6ZUgT9YTJ2mzrLqH7aJMjF",
    quote_mint: SOL_MINT,
    name: "Wordle Master",
    ticker: "WORDLE",
    description: "Specialized language model fine-tuned for word puzzles and linguistic pattern recognition games.",
    agent_url: "https://huggingface.co/puzzle-ai/wordle-master-v1",
    uri: "https://pub-74d06e872c714e34bc4a5ae9561fbe70.r2.dev/metadata/wordle.json",
    game_id: CURRENT_GAME_ID,
    game_id_parsed: "game-1756527852486-cke5g8",
    market_cap_usd_latest: 125000,
    price_change_percent_in_24_hours: 12.4,
    price_change_percent_1h: 3.1,
    price_change_percent_7d: 28.9,
    price_change_percent_30d: 156.7,
    volume_24h_usd: 34500,
    tvl_usd: 12000,
    holders: 523,
    price_usd: 0.0125,
    pricePattern: "pump",
  },
  {
    pool: "9oPb2TuvA31Hi3tZkfFrhvHu7CfPvW6Ox8hFtSa0S3",
    config: "7F7DI9y3HLdSMNmF9w8mHM8b6Jbzalj4kRhytGbpAn6D",
    creator: "9F7DI9y3HLdSMNmF9w8mHM8b6Jbzalj4kRhytGbpAn6D",
    base_mint: "Hgblri6FuvQ3O9ZyI8Wmk7aAVuU0YUK3nsrMqI8bNkG",
    quote_mint: SOL_MINT,
    name: "Elite Quant",
    ticker: "ELITE",
    description: "Quantitative trading agent with multi-factor alpha generation and dynamic portfolio optimization.",
    agent_url: "https://huggingface.co/elite-quant/elite-v4",
    uri: "https://pub-74d06e872c714e34bc4a5ae9561fbe70.r2.dev/metadata/elite.json",
    game_id: CURRENT_GAME_ID,
    game_id_parsed: "game-1756527852486-cke5g8",
    market_cap_usd_latest: 3200000,
    price_change_percent_in_24_hours: -1.3,
    price_change_percent_1h: 0.2,
    price_change_percent_7d: 5.6,
    price_change_percent_30d: 98.4,
    volume_24h_usd: 1250000,
    tvl_usd: 340000,
    holders: 5672,
    price_usd: 0.32,
    pricePattern: "sideways",
  },
  {
    pool: "ApQc3UvwB42Ij4uAlgGsiuIw8DgQwX7Py9iFuTb1T4",
    config: "8G8EJ0z4IMeTNOnG0x9nIN9c7Kcbmk5lSizvHcqBo7E",
    creator: "AG9EKAa5JNfTOPnH1y0oJO0d8Ldcnm6mTjawIdrCp8F",
    base_mint: "Ihcmsj7GvwR4P0aZJ9Xnl8bZWvV1ZVL4otsOqJ9cOlH",
    quote_mint: SOL_MINT,
    name: "Turbo Scalper",
    ticker: "TURBO",
    description: "High-frequency trading agent optimized for micro-second execution and order flow prediction.",
    agent_url: "https://huggingface.co/turbo-hft/turbo-scalper",
    uri: "https://pub-74d06e872c714e34bc4a5ae9561fbe70.r2.dev/metadata/turbo.json",
    game_id: CURRENT_GAME_ID,
    game_id_parsed: "game-1756527852486-cke5g8",
    market_cap_usd_latest: 890000,
    price_change_percent_in_24_hours: 15.6,
    price_change_percent_1h: 4.2,
    price_change_percent_7d: 34.5,
    price_change_percent_30d: 234.8,
    volume_24h_usd: 567000,
    tvl_usd: 78000,
    holders: 1834,
    price_usd: 0.089,
    pricePattern: "volatile",
  },
  {
    pool: "BqRd4VxwC53Kk5vBmhHtjxJw9ErRxY8Qz0jGvUc2U5",
    config: "9H9FK1a5JOfUOPpI2z1pKP0e9Mddom7nUkbxJesDs8F",
    creator: "BH0FLBb6KPgVQQqJ3z2qLQ1f0Nednp8oVlcyKftEq9G",
    base_mint: "Jidntk8HwxS5Q1bAK0Yom9cAXwW2aWM5pvuPrK0dPmI",
    quote_mint: SOL_MINT,
    name: "Delta Neutral",
    ticker: "DELTA",
    description: "Market-neutral agent specializing in options strategies and volatility surface arbitrage.",
    agent_url: "https://huggingface.co/delta-strategies/delta-neutral-v2",
    uri: "https://pub-74d06e872c714e34bc4a5ae9561fbe70.r2.dev/metadata/delta.json",
    game_id: CURRENT_GAME_ID,
    game_id_parsed: "game-1756527852486-cke5g8",
    market_cap_usd_latest: 1450000,
    price_change_percent_in_24_hours: 2.1,
    price_change_percent_1h: 0.4,
    price_change_percent_7d: 11.2,
    price_change_percent_30d: 78.9,
    volume_24h_usd: 234000,
    tvl_usd: 156000,
    holders: 2789,
    price_usd: 0.145,
    pricePattern: "recovery",
  },
  {
    pool: "CrSe5WywD64Ll6wCniIukzJ0FsRyZ9Rz1kHwWd3V6",
    config: "AJ0GL2b6KQgWPQrK4a2rMQ2g1Ofepn9pWmdaLguFt0H",
    creator: "CI1GMCc7LQhXRRsL5b3sMR2h2Pgfpq9rXneaLhvGs0I",
    base_mint: "Kjeoul9IxyT6R2cBL1Zpn0dBYxX3bXN6qwvQsL1eQnJ",
    quote_mint: SOL_MINT,
    name: "Omega Oracle",
    ticker: "OMEGA",
    description: "Predictive analytics agent combining on-chain data analysis with sentiment modeling for market forecasting.",
    agent_url: "https://huggingface.co/omega-ai/omega-oracle-v3",
    uri: "https://pub-74d06e872c714e34bc4a5ae9561fbe70.r2.dev/metadata/omega.json",
    game_id: CURRENT_GAME_ID,
    game_id_parsed: "game-1756527852486-cke5g8",
    market_cap_usd_latest: 2100000,
    price_change_percent_in_24_hours: -4.5,
    price_change_percent_1h: -1.2,
    price_change_percent_7d: 6.7,
    price_change_percent_30d: 112.3,
    volume_24h_usd: 678000,
    tvl_usd: 234000,
    holders: 4123,
    price_usd: 0.21,
    pricePattern: "volatile",
  },
]

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get all agents
 */
export function getAllAgents(): AgentWithMetrics[] {
  return AGENTS
}

/**
 * Get agents created by a specific wallet (for "My Agents")
 */
export function getMyAgents(walletAddress: string = MY_WALLET): AgentWithMetrics[] {
  return AGENTS.filter(agent => agent.creator === walletAddress)
}

/**
 * Get agent by pool ID
 */
export function getAgentByPool(poolId: string): AgentWithMetrics | undefined {
  if (!poolId || typeof poolId !== "string") return undefined
  return AGENTS.find(agent => agent.pool === poolId)
}

/**
 * Get agent by ticker (case-insensitive)
 */
export function getAgentByTicker(ticker: string): AgentWithMetrics | undefined {
  if (!ticker || typeof ticker !== "string") return undefined
  const normalizedTicker = ticker.toUpperCase().trim()
  return AGENTS.find(agent => agent.ticker === normalizedTicker)
}

/**
 * Get agent by ticker or return a default (for pages that need fallback)
 */
export function getAgentOrDefault(ticker: string): AgentWithMetrics {
  return getAgentByTicker(ticker) ?? AGENTS[0]
}

/**
 * Get agents sorted by market cap (descending)
 */
export function getAgentsByMarketCap(): AgentWithMetrics[] {
  return [...AGENTS].sort((a, b) => b.market_cap_usd_latest - a.market_cap_usd_latest)
}

/**
 * Get agents sorted by 24h volume (descending)
 */
export function getAgentsByVolume(): AgentWithMetrics[] {
  return [...AGENTS].sort((a, b) => (b.volume_24h_usd ?? 0) - (a.volume_24h_usd ?? 0))
}

/**
 * Get agents sorted by 24h price change (descending)
 */
export function getAgentsByPriceChange(): AgentWithMetrics[] {
  return [...AGENTS].sort((a, b) => b.price_change_percent_in_24_hours - a.price_change_percent_in_24_hours)
}

/**
 * Search agents by name or ticker
 */
export function searchAgents(query: string): AgentWithMetrics[] {
  if (!query || typeof query !== "string") return AGENTS
  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return AGENTS
  return AGENTS.filter(
    agent =>
      agent.name.toLowerCase().includes(normalizedQuery) ||
      agent.ticker.toLowerCase().includes(normalizedQuery)
  )
}

// =============================================================================
// Format Helpers
// =============================================================================

/**
 * Format market cap for display
 */
export function formatMarketCap(value: number): string {
  if (typeof value !== "number" || isNaN(value)) return "$0"
  if (value < 0) return "$0"
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`
  }
  return `$${value.toFixed(0)}`
}

/**
 * Format price for display
 */
export function formatPrice(value: number): string {
  if (typeof value !== "number" || isNaN(value)) return "$0.00"
  if (value < 0) return "$0.00"
  if (value < 0.0001) {
    return `$${value.toFixed(8)}`
  }
  if (value < 0.01) {
    return `$${value.toFixed(6)}`
  }
  if (value < 1) {
    return `$${value.toFixed(4)}`
  }
  return `$${value.toFixed(2)}`
}

/**
 * Format percentage change
 */
export function formatPercentChange(value: number): string {
  if (typeof value !== "number" || isNaN(value)) return "+0.0%"
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(1)}%`
}
