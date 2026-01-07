/**
 * Agent type matching the production API structure
 * Based on: GET /pools?include_metrics=true
 */

export interface Agent {
  /** Pool ID (Solana address) - PRIMARY KEY */
  pool: string
  /** Config address */
  config: string
  /** Creator wallet address */
  creator: string
  /** Token mint address */
  base_mint: string
  /** Quote mint (SOL) */
  quote_mint: string
  /** Display name */
  name: string
  /** Ticker symbol (e.g., "TEST") */
  ticker: string
  /** Agent description */
  description: string
  /** HuggingFace model URL */
  agent_url: string
  /** Metadata JSON URL */
  uri: string
  /** Game/competition ID */
  game_id: string
  /** Human-readable game ID */
  game_id_parsed: string
  /** Current market cap in USD */
  market_cap_usd_latest: number
  /** 24h price change percentage */
  price_change_percent_in_24_hours: number
}

/**
 * Price pattern types for chart generation
 */
export type PricePattern = "pump" | "dump" | "sideways" | "volatile" | "recovery"

/**
 * Extended agent with additional UI-computed fields
 * Used after fetching from API
 */
export interface AgentWithMetrics extends Agent {
  /** 1 hour price change (computed) */
  price_change_percent_1h?: number
  /** 7 day price change (computed) */
  price_change_percent_7d?: number
  /** 30 day price change (computed) */
  price_change_percent_30d?: number
  /** 24h trading volume in USD */
  volume_24h_usd?: number
  /** Total value locked */
  tvl_usd?: number
  /** Number of token holders */
  holders?: number
  /** Current token price in USD */
  price_usd?: number
  /** Price pattern for chart generation (UI-only) */
  pricePattern?: PricePattern
}

/**
 * API response structure for pools endpoint
 */
export interface PoolsApiResponse {
  data: Agent[]
  next_cursor: string | null
  has_more: boolean
}

/**
 * Price tick data for charts
 * Based on: GET /pool/price_ticks
 */
export interface PriceTick {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

// =============================================================================
// Evaluation types (structure TBD - dev will define)
// =============================================================================

/**
 * Placeholder for evaluation data
 * Structure to be defined by backend dev
 */
export interface AgentEvaluation {
  agent_pool: string
  // TODO: Dev to define evaluation fields
  [key: string]: unknown
}
