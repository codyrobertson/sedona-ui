import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { formatDate, formatTimeAgo, formatTime, formatTimestamp } from "../date-utils"

describe("date-utils", () => {
  describe("formatDate", () => {
    it("should format timestamp to localized date string", () => {
      // Use local date to avoid timezone issues
      const date = new Date(2024, 0, 15, 12, 0, 0) // Jan 15, 2024 noon local
      const result = formatDate(date.getTime())
      // Note: exact format depends on locale, but should contain these parts
      expect(result).toContain("Jan")
      expect(result).toContain("15")
      expect(result).toContain("2024")
    })

    it("should handle different months", () => {
      const december = new Date(2024, 11, 25, 12, 0, 0) // Dec 25, 2024 noon local
      const result = formatDate(december.getTime())
      expect(result).toContain("Dec")
      expect(result).toContain("25")
      expect(result).toContain("2024")
    })

    it("should return a valid formatted date string", () => {
      const timestamp = Date.now()
      const result = formatDate(timestamp)
      // Should match pattern like "Jan 15, 2024"
      expect(result).toMatch(/[A-Z][a-z]{2} \d{1,2}, \d{4}/)
    })
  })

  describe("formatTimeAgo", () => {
    beforeEach(() => {
      vi.useFakeTimers()
      // Set a fixed time: Jan 15, 2024 12:00:00 UTC
      vi.setSystemTime(new Date(Date.UTC(2024, 0, 15, 12, 0, 0)))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it("should return 'Today' for timestamps within the same day", () => {
      const now = Date.now()
      expect(formatTimeAgo(now)).toBe("Today")

      // 1 hour ago
      const oneHourAgo = now - 60 * 60 * 1000
      expect(formatTimeAgo(oneHourAgo)).toBe("Today")

      // 23 hours ago (still same day calculation based on diff)
      const almostDay = now - 23 * 60 * 60 * 1000
      expect(formatTimeAgo(almostDay)).toBe("Today")
    })

    it("should return 'Yesterday' for timestamps 1 day ago", () => {
      const now = Date.now()
      const yesterday = now - 24 * 60 * 60 * 1000
      expect(formatTimeAgo(yesterday)).toBe("Yesterday")
    })

    it("should return 'Xd ago' for 2-6 days", () => {
      const now = Date.now()

      const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000
      expect(formatTimeAgo(twoDaysAgo)).toBe("2d ago")

      const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000
      expect(formatTimeAgo(threeDaysAgo)).toBe("3d ago")

      const sixDaysAgo = now - 6 * 24 * 60 * 60 * 1000
      expect(formatTimeAgo(sixDaysAgo)).toBe("6d ago")
    })

    it("should return formatted date for 7+ days", () => {
      const now = Date.now()
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
      const result = formatTimeAgo(sevenDaysAgo)
      // Should fall back to formatDate
      expect(result).toContain("Jan")
      expect(result).toContain("2024")
    })

    it("should return formatted date for very old timestamps", () => {
      const now = Date.now()
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
      const result = formatTimeAgo(thirtyDaysAgo)
      expect(result).toContain("Dec")
      expect(result).toContain("2023")
    })
  })

  describe("formatTime", () => {
    it("should format 0 as 00:00", () => {
      expect(formatTime(0)).toBe("00:00")
    })

    it("should format seconds correctly", () => {
      expect(formatTime(1000)).toBe("00:01")
      expect(formatTime(30000)).toBe("00:30")
      expect(formatTime(59000)).toBe("00:59")
    })

    it("should format minutes correctly", () => {
      expect(formatTime(60000)).toBe("01:00")
      expect(formatTime(120000)).toBe("02:00")
      expect(formatTime(600000)).toBe("10:00")
    })

    it("should format minutes and seconds together", () => {
      expect(formatTime(65000)).toBe("01:05")
      expect(formatTime(125000)).toBe("02:05")
      expect(formatTime(754000)).toBe("12:34")
    })

    it("should pad single digits with zeros", () => {
      expect(formatTime(5000)).toBe("00:05")
      expect(formatTime(65000)).toBe("01:05")
    })

    it("should handle large values", () => {
      // 1 hour = 3600000 ms
      expect(formatTime(3600000)).toBe("60:00")
      expect(formatTime(7200000)).toBe("120:00")
    })

    it("should truncate milliseconds", () => {
      expect(formatTime(1500)).toBe("00:01") // 1.5 seconds
      expect(formatTime(999)).toBe("00:00") // < 1 second
    })
  })

  describe("formatTimestamp", () => {
    it("should format to HH:MM:SS format", () => {
      // Create a date at noon UTC
      const noon = Date.UTC(2024, 0, 15, 12, 30, 45)
      const result = formatTimestamp(noon)
      // Should contain time components (exact format may vary by locale/timezone)
      expect(result).toMatch(/\d{2}:\d{2}:\d{2}/)
    })

    it("should use 24-hour format", () => {
      // 2 PM UTC
      const afternoon = Date.UTC(2024, 0, 15, 14, 0, 0)
      const result = formatTimestamp(afternoon)
      // Should not contain AM/PM
      expect(result).not.toMatch(/[AP]M/i)
    })

    it("should pad single digits", () => {
      const earlyMorning = Date.UTC(2024, 0, 15, 5, 5, 5)
      const result = formatTimestamp(earlyMorning)
      // Each component should be 2 digits
      const parts = result.split(":")
      expect(parts.length).toBe(3)
      parts.forEach(part => {
        expect(part.length).toBe(2)
      })
    })

    it("should handle midnight", () => {
      const midnight = Date.UTC(2024, 0, 15, 0, 0, 0)
      const result = formatTimestamp(midnight)
      expect(result).toMatch(/\d{2}:\d{2}:\d{2}/)
    })
  })
})
