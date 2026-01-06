/**
 * Swap Widget Utilities
 * Extracted from swap-widget.tsx for reusability and testability
 */

/**
 * Format a number with thousand separators and optional decimal truncation
 * @param value - Number or string to format
 * @param maxDecimals - Maximum decimal places (default: 6)
 * @returns Formatted string
 */
export function formatNumber(value: string | number, maxDecimals = 6): string {
  if (value === "" || value === undefined) return ""
  const num = typeof value === "string" ? parseFloat(value) : value
  if (isNaN(num)) return ""
  if (num > 0 && num < 0.000001) return num.toExponential(2)

  const parts = num.toFixed(maxDecimals).split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if (parts[1]) {
    parts[1] = parts[1].replace(/0+$/, "")
    if (parts[1] === "") return parts[0]
  }
  return parts.join(".")
}

/**
 * Format a number as USD currency
 * @param value - Number to format
 * @returns Formatted USD string
 */
export function formatUSD(value: number): string {
  if (isNaN(value)) return "$0"
  if (value < 0.01 && value > 0) return "<$0.01"
  if (value === 0) return "$0"
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`
  return `$${value.toFixed(2)}`
}

/**
 * Sanitize user input for numeric fields
 * - Removes non-numeric characters (except decimal point)
 * - Handles multiple decimal points
 * - Enforces max decimal places
 * - Strips leading zeros
 *
 * @param value - Raw input string
 * @param maxDecimals - Maximum decimal places allowed (default: 9)
 * @returns Sanitized numeric string
 */
export function sanitizeNumericInput(value: string, maxDecimals = 9): string {
  let sanitized = value.replace(/[^0-9.]/g, "")
  const parts = sanitized.split(".")
  if (parts.length > 2) sanitized = parts[0] + "." + parts.slice(1).join("")
  if (parts.length === 2 && parts[1].length > maxDecimals) {
    sanitized = parts[0] + "." + parts[1].slice(0, maxDecimals)
  }
  if (sanitized.length > 1 && sanitized[0] === "0" && sanitized[1] !== ".") {
    sanitized = sanitized.replace(/^0+/, "") || "0"
    // Prepend 0 if result starts with decimal
    if (sanitized[0] === ".") {
      sanitized = "0" + sanitized
    }
  }
  return sanitized
}

/**
 * Parse a balance string that may contain formatting (commas, spaces)
 * @param balance - Formatted balance string
 * @returns Numeric value
 */
export function parseBalance(balance: string): number {
  const cleaned = balance.replace(/[,\s]/g, "")
  return parseFloat(cleaned) || 0
}

/**
 * Calculate slippage multiplier from slippage string
 * @param slippage - Slippage value ("Auto" or percentage like "1.0")
 * @returns Multiplier (e.g., 0.99 for 1% slippage)
 */
export function getSlippageMultiplier(slippage: string): number {
  if (slippage === "Auto") return 0.995 // Default 0.5% for auto
  const pct = parseFloat(slippage)
  if (isNaN(pct)) return 0.995
  return 1 - (pct / 100)
}

/**
 * Calculate minimum received amount after slippage
 * @param amount - Expected receive amount
 * @param slippage - Slippage setting
 * @returns Minimum amount after slippage
 */
export function calculateMinReceived(amount: string | number, slippage: string): string {
  const amountNum = typeof amount === "string" ? parseFloat(amount) : amount
  if (isNaN(amountNum)) return "0"
  const multiplier = getSlippageMultiplier(slippage)
  return (amountNum * multiplier).toFixed(6)
}

/**
 * Validate trade amount against constraints
 * @param amount - Amount to validate
 * @param balance - Available balance
 * @param options - Validation options
 * @returns Validation result with error message if invalid
 */
export function validateTradeAmount(
  amount: number,
  balance: number,
  options: {
    isNative?: boolean
    gasReserve?: number
    minAmount?: number
    maxAmount?: number
  } = {}
): { valid: boolean; error?: string } {
  const { isNative = false, gasReserve = 0.01, minAmount, maxAmount } = options

  if (amount <= 0) {
    return { valid: false, error: "Enter an amount" }
  }

  if (amount > balance) {
    return { valid: false, error: "Insufficient balance" }
  }

  if (isNative && amount > balance - gasReserve) {
    return { valid: false, error: `Reserve ${gasReserve} for gas` }
  }

  if (minAmount !== undefined && amount < minAmount) {
    return { valid: false, error: `Minimum amount is ${minAmount}` }
  }

  if (maxAmount !== undefined && amount > maxAmount) {
    return { valid: false, error: `Maximum amount is ${maxAmount}` }
  }

  return { valid: true }
}

/**
 * Calculate price impact color based on percentage
 * @param impact - Price impact percentage
 * @returns Tailwind color class
 */
export function getPriceImpactColor(impact: number): string {
  if (impact < 1) return "text-zeus-status-success"
  if (impact < 5) return "text-zeus-status-warning"
  return "text-zeus-status-destructive"
}

/**
 * Format price impact for display
 * @param impact - Price impact percentage
 * @returns Formatted string
 */
export function formatPriceImpact(impact: number): string {
  if (impact < 0.01) return "<0.01%"
  return `${impact.toFixed(2)}%`
}
