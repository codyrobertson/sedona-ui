import { describe, it, expect } from "vitest"

// Import from the registry source files
import {
  parseMarketCap,
  formatMarketCap,
  formatPrice,
  formatPercentChange,
  getChangeColor,
  formatVolume,
  truncateAddress,
  formatRelativeTime,
  CHART_COLORS,
  LINE_COLORS,
} from "../../new-york/trading-utils"

describe("trading-utils", () => {
  describe("parseMarketCap", () => {
    it("should parse market cap with M suffix", () => {
      expect(parseMarketCap("$1.2M")).toBe(1200000)
      expect(parseMarketCap("$2.4M")).toBe(2400000)
      expect(parseMarketCap("$0.5M")).toBe(500000)
    })

    it("should parse market cap with K suffix", () => {
      expect(parseMarketCap("$45.3K")).toBe(45300)
      expect(parseMarketCap("$100K")).toBe(100000)
      expect(parseMarketCap("$5K")).toBe(5000)
    })

    it("should parse market cap without suffix", () => {
      expect(parseMarketCap("$500")).toBe(500)
      expect(parseMarketCap("$999")).toBe(999)
    })

    it("should handle values without $ prefix", () => {
      expect(parseMarketCap("1.2M")).toBe(1200000)
      expect(parseMarketCap("45K")).toBe(45000)
    })

    it("should handle comma formatting", () => {
      expect(parseMarketCap("$1,000")).toBe(1000)
      expect(parseMarketCap("$1,000,000")).toBe(1000000)
    })

    it("should return 0 for invalid input", () => {
      expect(parseMarketCap("")).toBe(0)
      expect(parseMarketCap("abc")).toBe(0)
      expect(parseMarketCap("$abc")).toBe(0)
    })
  })

  describe("formatMarketCap", () => {
    it("should format millions", () => {
      expect(formatMarketCap(1200000)).toBe("$1.2M")
      expect(formatMarketCap(2400000)).toBe("$2.4M")
      expect(formatMarketCap(10500000)).toBe("$10.5M")
    })

    it("should format thousands", () => {
      expect(formatMarketCap(45000)).toBe("$45.0K")
      expect(formatMarketCap(5000)).toBe("$5.0K")
      expect(formatMarketCap(999000)).toBe("$999.0K")
    })

    it("should format small values without suffix", () => {
      expect(formatMarketCap(500)).toBe("$500")
      expect(formatMarketCap(999)).toBe("$999")
    })

    it("should handle zero", () => {
      expect(formatMarketCap(0)).toBe("$0")
    })
  })

  describe("formatPrice", () => {
    it("should format zero", () => {
      expect(formatPrice(0)).toBe("$0")
    })

    it("should format very small prices with exponential notation", () => {
      const result = formatPrice(0.00000001)
      expect(result).toMatch(/\$.*e/)
    })

    it("should format small prices with many decimals", () => {
      expect(formatPrice(0.00234)).toBe("$0.002340")
    })

    it("should format medium prices", () => {
      expect(formatPrice(1.5)).toBe("$1.50")
      expect(formatPrice(99.99)).toBe("$99.99")
    })

    it("should format large prices with thousand separators", () => {
      const result = formatPrice(1234.56)
      expect(result).toContain("1,234")
    })
  })

  describe("formatPercentChange", () => {
    it("should format positive changes with + sign", () => {
      expect(formatPercentChange(12.5)).toBe("+12.5%")
      expect(formatPercentChange(0.1)).toBe("+0.1%")
    })

    it("should format negative changes with - sign", () => {
      expect(formatPercentChange(-3.2)).toBe("-3.2%")
      expect(formatPercentChange(-0.5)).toBe("-0.5%")
    })

    it("should handle zero", () => {
      expect(formatPercentChange(0)).toBe("+0.0%")
    })
  })

  describe("getChangeColor", () => {
    it("should return green for positive changes", () => {
      expect(getChangeColor(1)).toBe("text-green-500")
      expect(getChangeColor(100)).toBe("text-green-500")
    })

    it("should return red for negative changes", () => {
      expect(getChangeColor(-1)).toBe("text-red-500")
      expect(getChangeColor(-100)).toBe("text-red-500")
    })

    it("should return muted for zero", () => {
      expect(getChangeColor(0)).toBe("text-muted-foreground")
    })
  })

  describe("formatVolume", () => {
    it("should format billions", () => {
      expect(formatVolume(1500000000)).toBe("1.5B")
      expect(formatVolume(10000000000)).toBe("10.0B")
    })

    it("should format millions", () => {
      expect(formatVolume(1500000)).toBe("1.5M")
      expect(formatVolume(999000000)).toBe("999.0M")
    })

    it("should format thousands", () => {
      expect(formatVolume(45000)).toBe("45.0K")
      expect(formatVolume(999000)).toBe("999.0K")
    })

    it("should format small values without suffix", () => {
      expect(formatVolume(500)).toBe("500")
      expect(formatVolume(999)).toBe("999")
    })
  })

  describe("truncateAddress", () => {
    it("should truncate standard Ethereum addresses", () => {
      const addr = "0x1234567890abcdef1234567890abcdef12345678"
      expect(truncateAddress(addr)).toBe("0x1234...5678")
    })

    it("should handle empty string", () => {
      expect(truncateAddress("")).toBe("")
    })

    it("should not truncate short addresses", () => {
      expect(truncateAddress("0x1234")).toBe("0x1234")
    })

    it("should use custom char count", () => {
      const addr = "0x1234567890abcdef1234567890abcdef12345678"
      expect(truncateAddress(addr, 6)).toBe("0x123456...345678")
    })
  })

  describe("formatRelativeTime", () => {
    it("should format seconds", () => {
      const now = Date.now()
      expect(formatRelativeTime(now - 30000)).toBe("30s ago")
    })

    it("should format minutes", () => {
      const now = Date.now()
      expect(formatRelativeTime(now - 5 * 60 * 1000)).toBe("5m ago")
    })

    it("should format hours", () => {
      const now = Date.now()
      expect(formatRelativeTime(now - 3 * 60 * 60 * 1000)).toBe("3h ago")
    })

    it("should format days", () => {
      const now = Date.now()
      expect(formatRelativeTime(now - 2 * 24 * 60 * 60 * 1000)).toBe("2d ago")
    })
  })

  describe("Constants", () => {
    it("CHART_COLORS should have required colors", () => {
      expect(CHART_COLORS.up).toBeDefined()
      expect(CHART_COLORS.down).toBeDefined()
      expect(CHART_COLORS.grid).toBeDefined()
      expect(CHART_COLORS.text).toBeDefined()
      expect(CHART_COLORS.crosshair).toBeDefined()
      expect(CHART_COLORS.border).toBeDefined()
    })

    it("LINE_COLORS should be an array of colors", () => {
      expect(Array.isArray(LINE_COLORS)).toBe(true)
      expect(LINE_COLORS.length).toBeGreaterThan(0)
      LINE_COLORS.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/)
      })
    })
  })
})
