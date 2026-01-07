/**
 * Sedona Trading Utilities
 * Core utilities for trading components
 *
 * @package @sedona/trading-utils
 */

// =============================================================================
// CHART COLORS
// =============================================================================

/** Chart color configuration for candlestick/trading charts */
export const CHART_COLORS = {
  up: "#26a69a",
  down: "#ef5350",
  grid: "rgba(255, 255, 255, 0.05)",
  text: "rgba(255, 255, 255, 0.5)",
  crosshair: "rgba(255, 255, 255, 0.2)",
  border: "rgba(255, 255, 255, 0.1)",
} as const

/** Line colors for multi-line charts */
export const LINE_COLORS = [
  "#f97316", // Orange (accent)
  "#22c55e", // Green
  "#3b82f6", // Blue
  "#a855f7", // Purple
  "#ec4899", // Pink
] as const

// =============================================================================
// MARKET CAP UTILITIES
// =============================================================================

/**
 * Parse market cap string to number
 * @example parseMarketCap("$1.2M") // 1200000
 * @example parseMarketCap("$45.3K") // 45300
 * @example parseMarketCap("$500") // 500
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
 * @example formatMarketCap(1200000) // "$1.2M"
 * @example formatMarketCap(45300) // "$45.3K"
 * @example formatMarketCap(500) // "$500"
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

// =============================================================================
// PRICE UTILITIES
// =============================================================================

/**
 * Format price with appropriate precision
 * @example formatPrice(0.00234) // "$0.00234"
 * @example formatPrice(1.50) // "$1.50"
 * @example formatPrice(1234.56) // "$1,234.56"
 */
export function formatPrice(price: number): string {
  if (price === 0) return "$0"
  if (price < 0.0001) return `$${price.toExponential(2)}`
  if (price < 0.01) return `$${price.toFixed(6)}`
  if (price < 1) return `$${price.toFixed(4)}`
  if (price >= 1000) {
    return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return `$${price.toFixed(2)}`
}

/**
 * Format percentage change with sign
 * @example formatPercentChange(12.5) // "+12.5%"
 * @example formatPercentChange(-3.2) // "-3.2%"
 */
export function formatPercentChange(change: number): string {
  const sign = change >= 0 ? "+" : ""
  return `${sign}${change.toFixed(1)}%`
}

/**
 * Get color class for percentage change
 */
export function getChangeColor(change: number): string {
  if (change > 0) return "text-green-500"
  if (change < 0) return "text-red-500"
  return "text-muted-foreground"
}

// =============================================================================
// VOLUME UTILITIES
// =============================================================================

/**
 * Format volume with abbreviations
 * @example formatVolume(1500000) // "1.5M"
 * @example formatVolume(45000) // "45K"
 */
export function formatVolume(volume: number): string {
  if (volume >= 1_000_000_000) {
    return `${(volume / 1_000_000_000).toFixed(1)}B`
  }
  if (volume >= 1_000_000) {
    return `${(volume / 1_000_000).toFixed(1)}M`
  }
  if (volume >= 1_000) {
    return `${(volume / 1_000).toFixed(1)}K`
  }
  return volume.toFixed(0)
}

// =============================================================================
// ADDRESS UTILITIES
// =============================================================================

/**
 * Truncate wallet/contract address for display
 * @example truncateAddress("0x1234567890abcdef1234567890abcdef12345678") // "0x1234...5678"
 */
export function truncateAddress(address: string, chars = 4): string {
  if (!address) return ""
  if (address.length <= chars * 2 + 3) return address
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

// =============================================================================
// TIME UTILITIES
// =============================================================================

/**
 * Format timestamp as relative time
 * @example formatRelativeTime(Date.now() - 60000) // "1m ago"
 */
export function formatRelativeTime(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)

  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

// =============================================================================
// TYPES
// =============================================================================

export type ChartTimeframe = "1m" | "5m" | "15m" | "1h" | "4h" | "1d" | "1w"

export interface PricePoint {
  time: number
  price: number
}

export interface CandlestickPoint {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume?: number
}
