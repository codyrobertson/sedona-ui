/**
 * Sedona Trading Kit - Demo Fixtures & Generators
 *
 * Use for prototyping, demos, and development.
 * Replace with real API calls in production.
 *
 * @package @sedona/sedona-kit
 */

import type { CandlestickData, LineData, Time } from "lightweight-charts"

// =============================================================================
// TYPES
// =============================================================================

export interface Agent {
  id: string
  ticker: string
  name: string
  description?: string
  imageUrl?: string
  marketCap: string
  price: number
  priceChange24h: number
  volume24h: string
  holders?: number
  createdAt?: string
}

export interface Token {
  symbol: string
  name: string
  imageUrl?: string
  decimals?: number
  balance: string
  price: number
  isNative?: boolean
}

export interface Transaction {
  id: string
  type: "buy" | "sell"
  ticker: string
  amount: string
  price: string
  total: string
  timestamp: number
  wallet: string
}

export type TickResolution = "1m" | "5m" | "15m" | "1h" | "4h" | "1d" | "1w"

// =============================================================================
// DEMO AGENTS
// =============================================================================

export const DEMO_AGENTS: Agent[] = [
  {
    id: "agent-zeus",
    ticker: "ZEUS",
    name: "Zeus AI",
    description: "Lightning-fast trading decisions powered by ML",
    marketCap: "$2.4M",
    price: 0.00234,
    priceChange24h: 12.5,
    volume24h: "$124K",
    holders: 1243,
  },
  {
    id: "agent-athena",
    ticker: "ATHENA",
    name: "Athena Bot",
    description: "Strategic long-term portfolio optimization",
    marketCap: "$1.8M",
    price: 0.00189,
    priceChange24h: -3.2,
    volume24h: "$89K",
    holders: 892,
  },
  {
    id: "agent-hermes",
    ticker: "HERMES",
    name: "Hermes Trade",
    description: "High-frequency arbitrage specialist",
    marketCap: "$950K",
    price: 0.00095,
    priceChange24h: 28.7,
    volume24h: "$234K",
    holders: 567,
  },
  {
    id: "agent-apollo",
    ticker: "APOLLO",
    name: "Apollo Vision",
    description: "Sentiment analysis and trend prediction",
    marketCap: "$720K",
    price: 0.00072,
    priceChange24h: -8.1,
    volume24h: "$45K",
    holders: 423,
  },
  {
    id: "agent-artemis",
    ticker: "ARTEMIS",
    name: "Artemis Hunt",
    description: "Meme coin sniper with early detection",
    marketCap: "$1.1M",
    price: 0.00112,
    priceChange24h: 45.2,
    volume24h: "$312K",
    holders: 1089,
  },
]

// =============================================================================
// DEMO TOKENS
// =============================================================================

export const DEMO_TOKENS: Token[] = [
  {
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    balance: "12.5",
    price: 185.5,
    isNative: true,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    balance: "1,250.00",
    price: 1.0,
  },
  {
    symbol: "ZEUS",
    name: "Zeus AI",
    decimals: 9,
    balance: "50,000",
    price: 0.00234,
  },
]

// =============================================================================
// CHART DATA GENERATORS
// =============================================================================

/**
 * Seeded random for consistent data generation
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

/**
 * Generate realistic OHLC candlestick data
 */
export function generateCandlesticks(
  basePrice: number,
  count: number = 60,
  options: {
    volatility?: number
    trend?: "up" | "down" | "sideways"
    seed?: number
  } = {}
): CandlestickData<Time>[] {
  const { volatility = 0.03, trend = "sideways", seed = Date.now() } = options
  const candles: CandlestickData<Time>[] = []
  let price = basePrice

  // Trend bias
  const trendBias = trend === "up" ? 0.001 : trend === "down" ? -0.001 : 0

  for (let i = 0; i < count; i++) {
    const random = seededRandom(seed + i) - 0.5
    const change = random * volatility * price + trendBias * price

    const open = price
    const close = price + change
    const high = Math.max(open, close) * (1 + seededRandom(seed + i + 1000) * 0.01)
    const low = Math.min(open, close) * (1 - seededRandom(seed + i + 2000) * 0.01)

    // Generate timestamp (daily candles going back from today)
    const date = new Date()
    date.setDate(date.getDate() - (count - i - 1))
    const timestamp = date.toISOString().split("T")[0]

    candles.push({
      time: timestamp as Time,
      open: Number(open.toFixed(6)),
      high: Number(high.toFixed(6)),
      low: Number(low.toFixed(6)),
      close: Number(close.toFixed(6)),
    })

    price = close
  }

  return candles
}

/**
 * Generate line chart data from candlesticks
 */
export function generateLineData(
  basePrice: number,
  count: number = 60,
  options?: Parameters<typeof generateCandlesticks>[2]
): LineData<Time>[] {
  const candles = generateCandlesticks(basePrice, count, options)
  return candles.map((c) => ({
    time: c.time,
    value: c.close,
  }))
}

/**
 * Generate intraday candles for a specific resolution
 */
export function generateIntradayCandles(
  basePrice: number,
  resolution: TickResolution,
  hours: number = 24
): CandlestickData<Time>[] {
  const candlesPerHour: Record<TickResolution, number> = {
    "1m": 60,
    "5m": 12,
    "15m": 4,
    "1h": 1,
    "4h": 0.25,
    "1d": 1 / 24,
    "1w": 1 / 168,
  }

  const count = Math.floor(hours * candlesPerHour[resolution])
  const candles: CandlestickData<Time>[] = []
  let price = basePrice

  const now = Date.now()
  const msPerCandle: Record<TickResolution, number> = {
    "1m": 60 * 1000,
    "5m": 5 * 60 * 1000,
    "15m": 15 * 60 * 1000,
    "1h": 60 * 60 * 1000,
    "4h": 4 * 60 * 60 * 1000,
    "1d": 24 * 60 * 60 * 1000,
    "1w": 7 * 24 * 60 * 60 * 1000,
  }

  for (let i = 0; i < count; i++) {
    const random = Math.random() - 0.5
    const volatility = resolution === "1m" ? 0.005 : resolution === "5m" ? 0.008 : 0.015
    const change = random * volatility * price

    const open = price
    const close = price + change
    const high = Math.max(open, close) * (1 + Math.random() * 0.003)
    const low = Math.min(open, close) * (1 - Math.random() * 0.003)

    const timestamp = Math.floor((now - (count - i) * msPerCandle[resolution]) / 1000)

    candles.push({
      time: timestamp as Time,
      open: Number(open.toFixed(6)),
      high: Number(high.toFixed(6)),
      low: Number(low.toFixed(6)),
      close: Number(close.toFixed(6)),
    })

    price = close
  }

  return candles
}

// =============================================================================
// TRANSACTION GENERATORS
// =============================================================================

/**
 * Generate mock transactions
 */
export function generateTransactions(
  count: number = 20,
  options: {
    ticker?: string
    seed?: number
  } = {}
): Transaction[] {
  const { ticker = "ZEUS", seed = Date.now() } = options
  const transactions: Transaction[] = []

  for (let i = 0; i < count; i++) {
    const isBuy = seededRandom(seed + i) > 0.5
    const amount = (seededRandom(seed + i + 100) * 10000 + 100).toFixed(2)
    const price = (0.001 + seededRandom(seed + i + 200) * 0.005).toFixed(6)
    const total = (parseFloat(amount) * parseFloat(price)).toFixed(2)

    transactions.push({
      id: `tx-${seed}-${i}`,
      type: isBuy ? "buy" : "sell",
      ticker,
      amount,
      price,
      total,
      timestamp: Date.now() - i * 60000 * (1 + seededRandom(seed + i + 300) * 5),
      wallet: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
    })
  }

  return transactions.sort((a, b) => b.timestamp - a.timestamp)
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get agent by ticker
 */
export function getAgentByTicker(ticker: string): Agent | undefined {
  return DEMO_AGENTS.find((a) => a.ticker.toLowerCase() === ticker.toLowerCase())
}

/**
 * Get token by symbol
 */
export function getTokenBySymbol(symbol: string): Token | undefined {
  return DEMO_TOKENS.find((t) => t.symbol.toLowerCase() === symbol.toLowerCase())
}

/**
 * Get chart data for a specific agent
 */
export function getAgentChartData(
  ticker: string,
  resolution: TickResolution = "1d"
): CandlestickData<Time>[] {
  const agent = getAgentByTicker(ticker)
  const basePrice = agent?.price || 0.001

  if (["1m", "5m", "15m", "1h", "4h"].includes(resolution)) {
    return generateIntradayCandles(basePrice, resolution, 24)
  }

  return generateCandlesticks(basePrice, 60, {
    seed: ticker.charCodeAt(0) * 1000,
    trend: agent && agent.priceChange24h > 0 ? "up" : "down",
  })
}

// =============================================================================
// NOTE: For production use, import utilities directly from their source libs:
//
// Trading utilities (formatting, colors):
//   import { formatMarketCap, CHART_COLORS } from "@/lib/trading-utils"
//
// Swap utilities (input handling, validation):
//   import { formatNumber, sanitizeNumericInput } from "@/lib/swap-utils"
//
// These libs are auto-installed as registryDependencies when you install sedona-kit.
// =============================================================================
