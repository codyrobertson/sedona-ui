import { describe, it, expect } from "vitest"
import {
  formatNumber,
  formatUSD,
  sanitizeNumericInput,
  parseBalance,
  getSlippageMultiplier,
  calculateMinReceived,
  validateTradeAmount,
  getPriceImpactColor,
  formatPriceImpact,
} from "../swap-utils"

describe("formatNumber", () => {
  it("should format integers with thousand separators", () => {
    expect(formatNumber("1000")).toBe("1,000")
    expect(formatNumber("1000000")).toBe("1,000,000")
    expect(formatNumber(1000000)).toBe("1,000,000")
  })

  it("should truncate trailing zeros after decimal", () => {
    expect(formatNumber("1.100000")).toBe("1.1")
    expect(formatNumber("1.000000")).toBe("1")
    expect(formatNumber("123.456000")).toBe("123.456")
  })

  it("should handle very small numbers with exponential notation", () => {
    expect(formatNumber("0.0000001")).toMatch(/e/)
    expect(formatNumber(0.0000001)).toMatch(/e/)
  })

  it("should return empty string for invalid input", () => {
    expect(formatNumber("")).toBe("")
    expect(formatNumber("abc")).toBe("")
  })

  it("should respect maxDecimals parameter", () => {
    expect(formatNumber("1.123456789", 4)).toBe("1.1235")
    expect(formatNumber("1.123456789", 2)).toBe("1.12")
  })

  it("should handle zero correctly", () => {
    expect(formatNumber("0")).toBe("0")
    expect(formatNumber(0)).toBe("0")
  })
})

describe("formatUSD", () => {
  it("should format zero correctly", () => {
    expect(formatUSD(0)).toBe("$0")
  })

  it('should show "<$0.01" for small positive values', () => {
    expect(formatUSD(0.001)).toBe("<$0.01")
    expect(formatUSD(0.009)).toBe("<$0.01")
    expect(formatUSD(0.0099)).toBe("<$0.01")
  })

  it("should format values under 1000 with two decimals", () => {
    expect(formatUSD(1.5)).toBe("$1.50")
    expect(formatUSD(99.99)).toBe("$99.99")
    expect(formatUSD(999.99)).toBe("$999.99")
  })

  it("should abbreviate thousands with K", () => {
    expect(formatUSD(1000)).toBe("$1.00K")
    expect(formatUSD(75000)).toBe("$75.00K")
    expect(formatUSD(999999)).toBe("$1000.00K")
  })

  it("should abbreviate millions with M", () => {
    expect(formatUSD(1000000)).toBe("$1.00M")
    expect(formatUSD(1500000)).toBe("$1.50M")
    expect(formatUSD(999000000)).toBe("$999.00M")
  })

  it("should handle NaN", () => {
    expect(formatUSD(NaN)).toBe("$0")
  })
})

describe("sanitizeNumericInput", () => {
  it("should remove non-numeric characters", () => {
    expect(sanitizeNumericInput("1abc23")).toBe("123")
    expect(sanitizeNumericInput("$100.50")).toBe("100.50")
    expect(sanitizeNumericInput("1,000")).toBe("1000")
  })

  it("should allow only one decimal point", () => {
    expect(sanitizeNumericInput("1.2.3")).toBe("1.23")
    expect(sanitizeNumericInput("..5")).toBe(".5")
    expect(sanitizeNumericInput("1.2.3.4")).toBe("1.234")
  })

  it("should enforce maxDecimals", () => {
    expect(sanitizeNumericInput("1.123456789012", 9)).toBe("1.123456789")
    expect(sanitizeNumericInput("1.12", 6)).toBe("1.12")
    expect(sanitizeNumericInput("1.123456", 3)).toBe("1.123")
  })

  it("should strip leading zeros except for decimal numbers", () => {
    expect(sanitizeNumericInput("007")).toBe("7")
    expect(sanitizeNumericInput("0.5")).toBe("0.5")
    expect(sanitizeNumericInput("00.5")).toBe("0.5")
    expect(sanitizeNumericInput("000")).toBe("0")
  })

  it("should handle empty string", () => {
    expect(sanitizeNumericInput("")).toBe("")
  })

  it("should handle only decimal point", () => {
    expect(sanitizeNumericInput(".")).toBe(".")
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
    expect(getSlippageMultiplier("5")).toBe(0.95)
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

describe("validateTradeAmount", () => {
  it("should return invalid for zero or negative amounts", () => {
    expect(validateTradeAmount(0, 100)).toEqual({
      valid: false,
      error: "Enter an amount",
    })
    expect(validateTradeAmount(-5, 100)).toEqual({
      valid: false,
      error: "Enter an amount",
    })
  })

  it("should return invalid for insufficient balance", () => {
    expect(validateTradeAmount(150, 100)).toEqual({
      valid: false,
      error: "Insufficient balance",
    })
  })

  it("should validate gas reserve for native tokens", () => {
    // 99.995 exceeds the max of 99.99 (100 - 0.01 gas reserve)
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

  it("should return valid for good amounts", () => {
    expect(validateTradeAmount(50, 100)).toEqual({ valid: true })
    expect(validateTradeAmount(50, 100, { minAmount: 10, maxAmount: 100 })).toEqual({
      valid: true,
    })
  })
})

describe("getPriceImpactColor", () => {
  it("should return success color for low impact", () => {
    expect(getPriceImpactColor(0.1)).toBe("text-zeus-status-success")
    expect(getPriceImpactColor(0.99)).toBe("text-zeus-status-success")
  })

  it("should return warning color for medium impact", () => {
    expect(getPriceImpactColor(1)).toBe("text-zeus-status-warning")
    expect(getPriceImpactColor(4.99)).toBe("text-zeus-status-warning")
  })

  it("should return destructive color for high impact", () => {
    expect(getPriceImpactColor(5)).toBe("text-zeus-status-destructive")
    expect(getPriceImpactColor(10)).toBe("text-zeus-status-destructive")
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
