import type { PriceTick, PricePattern } from "@/types/agent"
import type { CandlestickData, Time } from "lightweight-charts"
import { AGENTS, getAgentByPool, getAgentByTicker } from "./agents-unified"

/**
 * Price tick resolution options matching API
 * Based on: GET /pool/price_ticks?pool=...&resolution=...
 */
export type TickResolution = "1m" | "5m" | "1h" | "1d"

/**
 * API request params for price ticks
 */
export interface PriceTicksRequest {
  pool: string
  resolution: TickResolution
  from?: number // Unix timestamp
  to?: number   // Unix timestamp
  limit?: number
}

/**
 * API response structure for price ticks
 */
export interface PriceTicksResponse {
  pool: string
  resolution: TickResolution
  ticks: PriceTick[]
}

// =============================================================================
// Base price data for generating agent-specific ticks
// =============================================================================

/**
 * Base price patterns for generating realistic price action
 * Each pattern represents different market conditions
 */
const PRICE_PATTERNS: Record<PricePattern, number[]> = {
  pump: [1, 1.05, 1.12, 1.25, 1.45, 1.52, 1.48, 1.55, 1.65, 1.58],
  dump: [1, 0.98, 0.95, 0.88, 0.82, 0.78, 0.75, 0.72, 0.70, 0.68],
  sideways: [1, 1.02, 0.98, 1.01, 0.99, 1.03, 0.97, 1.02, 0.98, 1.01],
  volatile: [1, 1.15, 0.95, 1.25, 0.85, 1.20, 0.90, 1.18, 0.92, 1.10],
  recovery: [0.5, 0.52, 0.48, 0.55, 0.60, 0.58, 0.65, 0.72, 0.80, 0.85],
}

// =============================================================================
// Price tick generation
// =============================================================================

/**
 * Generate a single price tick with realistic OHLC values
 */
function generateTick(
  time: number,
  basePrice: number,
  volatility: number = 0.03
): PriceTick {
  const noise = () => (Math.random() - 0.5) * 2 * volatility * basePrice
  const open = basePrice + noise()
  const close = basePrice + noise()
  const high = Math.max(open, close) * (1 + Math.abs(noise() / basePrice) * 0.5)
  const low = Math.min(open, close) * (1 - Math.abs(noise() / basePrice) * 0.5)
  const volume = Math.floor(10000 + Math.random() * 100000)

  return {
    time,
    open: Number(open.toFixed(6)),
    high: Number(high.toFixed(6)),
    low: Number(low.toFixed(6)),
    close: Number(close.toFixed(6)),
    volume,
  }
}

/**
 * Generate price ticks for a specific agent and resolution
 */
function generatePriceTicks(
  basePrice: number,
  pattern: PricePattern,
  resolution: TickResolution,
  count: number = 60
): PriceTick[] {
  const ticks: PriceTick[] = []
  const patternValues = PRICE_PATTERNS[pattern]
  const now = Date.now()

  // Time interval in milliseconds based on resolution
  const intervals: Record<TickResolution, number> = {
    "1m": 60 * 1000,
    "5m": 5 * 60 * 1000,
    "1h": 60 * 60 * 1000,
    "1d": 24 * 60 * 60 * 1000,
  }

  const interval = intervals[resolution]

  // Higher volatility for shorter timeframes
  const volatility: Record<TickResolution, number> = {
    "1m": 0.02,
    "5m": 0.025,
    "1h": 0.035,
    "1d": 0.05,
  }

  for (let i = 0; i < count; i++) {
    // Determine position in pattern cycle
    const patternIndex = i % patternValues.length
    const patternMultiplier = patternValues[patternIndex]

    // Add some drift over time
    const drift = 1 + (i / count) * 0.1 * (Math.random() > 0.5 ? 1 : -1)

    const price = basePrice * patternMultiplier * drift
    const time = now - (count - i) * interval

    ticks.push(generateTick(time, price, volatility[resolution]))
  }

  return ticks
}

/**
 * Get price ticks for an agent
 * Main function matching API: GET /pool/price_ticks
 */
export function getPriceTicks(request: PriceTicksRequest): PriceTicksResponse {
  const agent = getAgentByPool(request.pool)

  if (!agent) {
    return {
      pool: request.pool,
      resolution: request.resolution,
      ticks: [],
    }
  }

  const pattern = agent.pricePattern || "sideways"
  const basePrice = agent.price_usd || 0.001
  const count = request.limit || 60

  const ticks = generatePriceTicks(
    basePrice,
    pattern,
    request.resolution,
    count
  )

  return {
    pool: request.pool,
    resolution: request.resolution,
    ticks,
  }
}

/**
 * Get price ticks by ticker (convenience function)
 */
export function getPriceTicksByTicker(
  ticker: string,
  resolution: TickResolution,
  limit: number = 60
): PriceTick[] {
  const agent = getAgentByTicker(ticker)

  if (!agent) return []

  const pattern = agent.pricePattern || "sideways"
  const basePrice = agent.price_usd || 0.001

  return generatePriceTicks(basePrice, pattern, resolution, limit)
}

// =============================================================================
// Conversion utilities for lightweight-charts
// =============================================================================

/**
 * Convert PriceTick array to lightweight-charts CandlestickData
 * For use with existing chart components
 */
export function toChartData(ticks: PriceTick[]): CandlestickData<Time>[] {
  return ticks.map((tick) => ({
    time: Math.floor(tick.time / 1000) as unknown as Time, // Convert ms to seconds
    open: tick.open,
    high: tick.high,
    low: tick.low,
    close: tick.close,
  }))
}

/**
 * Get chart-ready data for a ticker
 * Combines getPriceTicksByTicker + toChartData
 */
export function getChartDataForTicker(
  ticker: string,
  resolution: TickResolution,
  limit: number = 60
): CandlestickData<Time>[] {
  const ticks = getPriceTicksByTicker(ticker, resolution, limit)
  return toChartData(ticks)
}

// =============================================================================
// Pre-generated datasets for static rendering
// =============================================================================

/**
 * Static tick data for SSG/ISR pages
 * Pre-generates data to avoid hydration mismatches
 */
export const STATIC_PRICE_TICKS: Record<string, Record<TickResolution, PriceTick[]>> = {}

/**
 * Initialize static price ticks for all agents
 * Call this once at build time or app startup
 */
export function initializeStaticTicks() {
  for (const agent of AGENTS) {
    const pattern = agent.pricePattern || "sideways"
    const basePrice = agent.price_usd || 0.001

    STATIC_PRICE_TICKS[agent.ticker] = {
      "1m": generatePriceTicks(basePrice, pattern, "1m", 60),
      "5m": generatePriceTicks(basePrice, pattern, "5m", 60),
      "1h": generatePriceTicks(basePrice, pattern, "1h", 24),
      "1d": generatePriceTicks(basePrice, pattern, "1d", 60),
    }
  }
}

/**
 * Get static ticks (deterministic, pre-generated)
 * Use this for SSG pages to avoid hydration issues
 */
export function getStaticTicks(
  ticker: string,
  resolution: TickResolution
): PriceTick[] {
  // Initialize if needed
  if (Object.keys(STATIC_PRICE_TICKS).length === 0) {
    initializeStaticTicks()
  }

  return STATIC_PRICE_TICKS[ticker.toUpperCase()]?.[resolution] || []
}

/**
 * Get static chart data (deterministic, pre-generated)
 */
export function getStaticChartData(
  ticker: string,
  resolution: TickResolution
): CandlestickData<Time>[] {
  return toChartData(getStaticTicks(ticker, resolution))
}
