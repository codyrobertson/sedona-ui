import { describe, it, expect } from "vitest"
import {
  parseMarketCap,
  formatMarketCap,
  formatPrice,
  formatVolume,
  truncateAddress,
  formatRelativeTime,
} from "../../new-york/trading-utils"

import {
  formatNumber,
  formatUSD,
  sanitizeNumericInput,
  parseBalance,
  validateTradeAmount,
  getSlippageMultiplier,
  calculateMinReceived,
  getPriceImpactColor,
  formatPriceImpact,
} from "../../new-york/swap-utils"

describe("Trading Utils Edge Cases", () => {
  describe("parseMarketCap", () => {
    it("should handle empty string", () => {
      expect(parseMarketCap("")).toBe(0)
    })

    it("should handle invalid input", () => {
      expect(parseMarketCap("abc")).toBe(0)
      expect(parseMarketCap("$abc")).toBe(0)
    })

    it("should handle decimal values", () => {
      expect(parseMarketCap("$0.5K")).toBe(500)
      expect(parseMarketCap("$0.001M")).toBe(1000)
    })

    it("should handle values without $ prefix", () => {
      expect(parseMarketCap("1.2M")).toBe(1200000)
      expect(parseMarketCap("45K")).toBe(45000)
    })

    it("should handle extra whitespace", () => {
      expect(parseMarketCap("  $1.2M  ")).toBe(1200000)
    })
  })

  describe("formatPrice", () => {
    it("should handle zero", () => {
      expect(formatPrice(0)).toBe("$0")
    })

    it("should handle very small prices", () => {
      expect(formatPrice(0.00000001)).toMatch(/\$.*e/)
    })

    it("should handle very large prices", () => {
      expect(formatPrice(1000000)).toContain("1,000,000")
    })
  })

  describe("truncateAddress", () => {
    it("should handle empty string", () => {
      expect(truncateAddress("")).toBe("")
    })

    it("should handle short addresses", () => {
      expect(truncateAddress("0x1234")).toBe("0x1234")
    })

    it("should handle standard Ethereum addresses", () => {
      const addr = "0x1234567890abcdef1234567890abcdef12345678"
      expect(truncateAddress(addr)).toBe("0x1234...5678")
    })

    it("should handle custom char counts", () => {
      const addr = "0x1234567890abcdef1234567890abcdef12345678"
      expect(truncateAddress(addr, 6)).toBe("0x123456...345678")
    })
  })

  describe("formatRelativeTime", () => {
    it("should handle just now", () => {
      expect(formatRelativeTime(Date.now())).toBe("0s ago")
    })

    it("should handle very old timestamps", () => {
      const oldTime = Date.now() - 365 * 24 * 60 * 60 * 1000 // 1 year
      expect(formatRelativeTime(oldTime)).toMatch(/\d+d ago/)
    })
  })
})

describe("Swap Utils Edge Cases", () => {
  describe("sanitizeNumericInput", () => {
    it("should handle empty input", () => {
      expect(sanitizeNumericInput("")).toBe("")
    })

    it("should handle only decimal point", () => {
      expect(sanitizeNumericInput(".")).toBe(".")
    })

    it("should handle multiple leading zeros", () => {
      expect(sanitizeNumericInput("000000")).toBe("0")
      expect(sanitizeNumericInput("000.5")).toBe("0.5")
    })

    it("should handle scientific notation input", () => {
      // Should strip non-numeric chars including 'e'
      expect(sanitizeNumericInput("1e5")).toBe("15")
    })

    it("should handle negative sign", () => {
      expect(sanitizeNumericInput("-123")).toBe("123")
    })

    it("should handle comma separators", () => {
      expect(sanitizeNumericInput("1,000,000")).toBe("1000000")
    })

    it("should handle multiple decimal points", () => {
      expect(sanitizeNumericInput("1.2.3.4")).toBe("1.234")
    })

    it("should enforce max decimals", () => {
      expect(sanitizeNumericInput("1.123456789012345", 9)).toBe("1.123456789")
    })
  })

  describe("validateTradeAmount", () => {
    it("should handle zero amount", () => {
      const result = validateTradeAmount(0, 100)
      expect(result.valid).toBe(false)
      expect(result.error).toContain("Enter an amount")
    })

    it("should handle negative amount", () => {
      const result = validateTradeAmount(-10, 100)
      expect(result.valid).toBe(false)
    })

    it("should handle zero balance", () => {
      const result = validateTradeAmount(0.01, 0)
      expect(result.valid).toBe(false)
    })

    it("should handle amount exceeding balance", () => {
      const result = validateTradeAmount(150, 100)
      expect(result.valid).toBe(false)
      expect(result.error).toContain("Insufficient")
    })

    it("should validate gas reserve for native tokens", () => {
      const result = validateTradeAmount(99.995, 100, {
        isNative: true,
        gasReserve: 0.01,
      })
      expect(result.valid).toBe(false)
      expect(result.error).toContain("gas")
    })

    it("should not apply gas reserve to non-native tokens", () => {
      const result = validateTradeAmount(100, 100, {
        isNative: false,
        gasReserve: 0.01,
      })
      expect(result.valid).toBe(true)
    })

    it("should validate minimum amount", () => {
      const result = validateTradeAmount(0.5, 100, { minAmount: 1 })
      expect(result.valid).toBe(false)
      expect(result.error).toContain("Minimum")
    })

    it("should validate maximum amount", () => {
      const result = validateTradeAmount(150, 200, { maxAmount: 100 })
      expect(result.valid).toBe(false)
      expect(result.error).toContain("Maximum")
    })

    it("should pass for valid amounts", () => {
      expect(validateTradeAmount(50, 100).valid).toBe(true)
      expect(validateTradeAmount(50, 100, { minAmount: 10, maxAmount: 100 }).valid).toBe(true)
    })
  })

  describe("formatUSD", () => {
    it("should handle zero", () => {
      expect(formatUSD(0)).toBe("$0")
    })

    it("should handle NaN", () => {
      expect(formatUSD(NaN)).toBe("$0")
    })

    it("should handle very small values", () => {
      expect(formatUSD(0.001)).toBe("<$0.01")
      expect(formatUSD(0.009)).toBe("<$0.01")
    })

    it("should handle boundary values", () => {
      expect(formatUSD(999.99)).not.toContain("K")
      expect(formatUSD(1000)).toContain("K")
      expect(formatUSD(999999.99)).toContain("K")
      expect(formatUSD(1000000)).toContain("M")
    })
  })

  describe("formatNumber", () => {
    it("should handle empty string", () => {
      expect(formatNumber("")).toBe("")
    })

    it("should handle invalid input", () => {
      expect(formatNumber("abc")).toBe("")
    })

    it("should format with thousand separators", () => {
      expect(formatNumber("1000000")).toBe("1,000,000")
    })

    it("should truncate trailing zeros", () => {
      expect(formatNumber("1.100000")).toBe("1.1")
      expect(formatNumber("1.000000")).toBe("1")
    })

    it("should handle very small numbers with exponential", () => {
      expect(formatNumber("0.0000001")).toMatch(/e/)
    })

    it("should respect maxDecimals parameter", () => {
      expect(formatNumber("1.123456789", 4)).toBe("1.1235")
    })
  })

  describe("parseBalance", () => {
    it("should parse clean numbers", () => {
      expect(parseBalance("100")).toBe(100)
      expect(parseBalance("100.5")).toBe(100.5)
    })

    it("should handle formatted numbers with commas", () => {
      expect(parseBalance("1,000")).toBe(1000)
      expect(parseBalance("1,000,000.50")).toBe(1000000.5)
    })

    it("should handle whitespace", () => {
      expect(parseBalance(" 100 ")).toBe(100)
      expect(parseBalance("1 000")).toBe(1000)
    })

    it("should return 0 for invalid input", () => {
      expect(parseBalance("")).toBe(0)
      expect(parseBalance("abc")).toBe(0)
    })
  })

  describe("getSlippageMultiplier", () => {
    it('should return 0.995 for "Auto"', () => {
      expect(getSlippageMultiplier("Auto")).toBe(0.995)
    })

    it("should calculate multiplier from percentage", () => {
      expect(getSlippageMultiplier("1.0")).toBe(0.99)
      expect(getSlippageMultiplier("2.0")).toBe(0.98)
      expect(getSlippageMultiplier("0.5")).toBe(0.995)
    })

    it("should handle invalid slippage", () => {
      expect(getSlippageMultiplier("invalid")).toBe(0.995)
      expect(getSlippageMultiplier("")).toBe(0.995)
    })
  })

  describe("calculateMinReceived", () => {
    it("should calculate minimum with Auto slippage", () => {
      const result = calculateMinReceived("1000", "Auto")
      expect(parseFloat(result)).toBeCloseTo(995, 0)
    })

    it("should calculate minimum with custom slippage", () => {
      const result = calculateMinReceived("1000", "1.0")
      expect(parseFloat(result)).toBeCloseTo(990, 0)
    })

    it("should handle number input", () => {
      const result = calculateMinReceived(1000, "2.0")
      expect(parseFloat(result)).toBeCloseTo(980, 0)
    })

    it("should return 0 for invalid amount", () => {
      expect(calculateMinReceived("abc", "Auto")).toBe("0")
      expect(calculateMinReceived("", "Auto")).toBe("0")
    })
  })

  describe("getPriceImpactColor", () => {
    it("should return success color for low impact", () => {
      expect(getPriceImpactColor(0.1)).toBe("text-green-500")
      expect(getPriceImpactColor(0.99)).toBe("text-green-500")
    })

    it("should return warning color for medium impact", () => {
      expect(getPriceImpactColor(1)).toBe("text-yellow-500")
      expect(getPriceImpactColor(4.99)).toBe("text-yellow-500")
    })

    it("should return destructive color for high impact", () => {
      expect(getPriceImpactColor(5)).toBe("text-red-500")
      expect(getPriceImpactColor(10)).toBe("text-red-500")
    })
  })

  describe("formatPriceImpact", () => {
    it("should format very small impacts", () => {
      expect(formatPriceImpact(0.001)).toBe("<0.01%")
      expect(formatPriceImpact(0.009)).toBe("<0.01%")
    })

    it("should format normal impacts with two decimals", () => {
      expect(formatPriceImpact(0.1)).toBe("0.10%")
      expect(formatPriceImpact(1.5)).toBe("1.50%")
      expect(formatPriceImpact(5.55)).toBe("5.55%")
    })
  })
})
