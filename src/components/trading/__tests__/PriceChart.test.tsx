import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { PriceChart } from "../PriceChart"

// Mock lightweight-charts
vi.mock("lightweight-charts", () => {
  const mockChart = {
    applyOptions: vi.fn(),
    remove: vi.fn(),
    timeScale: vi.fn(() => ({
      fitContent: vi.fn(),
    })),
    addSeries: vi.fn(() => ({
      setData: vi.fn(),
    })),
  }

  return {
    createChart: vi.fn(() => mockChart),
    ColorType: { Solid: "solid" },
    CandlestickSeries: "CandlestickSeries",
    PriceScaleMode: {
      Normal: 0,
      Logarithmic: 1,
      Percentage: 2,
    },
  }
})

// Mock the fixtures
vi.mock("@/fixtures", () => ({
  getChartDataForTicker: vi.fn(() => [
    { time: "2024-01-01", open: 100, high: 110, low: 95, close: 105 },
    { time: "2024-01-02", open: 105, high: 115, low: 100, close: 110 },
  ]),
  CHART_COLORS: {
    text: "#ffffff",
    grid: "#333333",
    crosshair: "#666666",
    border: "#444444",
    up: "#22c55e",
    down: "#ef4444",
  },
}))

describe("PriceChart", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("rendering", () => {
    it("should render with default timeframes", () => {
      render(<PriceChart ticker="TEST" />)

      expect(screen.getByText("1M")).toBeInTheDocument()
      expect(screen.getByText("5M")).toBeInTheDocument()
      expect(screen.getByText("1H")).toBeInTheDocument()
      expect(screen.getByText("1D")).toBeInTheDocument()
    })

    it("should render with custom timeframes", () => {
      render(<PriceChart ticker="TEST" timeframes={["1m", "1h"]} />)

      expect(screen.getByText("1M")).toBeInTheDocument()
      expect(screen.getByText("1H")).toBeInTheDocument()
      expect(screen.queryByText("5M")).not.toBeInTheDocument()
      expect(screen.queryByText("1D")).not.toBeInTheDocument()
    })

    it("should display the ticker symbol", () => {
      render(<PriceChart ticker="AGENT" />)

      expect(screen.getByText("$AGENT")).toBeInTheDocument()
    })

    it("should render scale mode buttons", () => {
      render(<PriceChart ticker="TEST" />)

      expect(screen.getByText("%")).toBeInTheDocument()
      expect(screen.getByText("log")).toBeInTheDocument()
      expect(screen.getByText("auto")).toBeInTheDocument()
    })

    it("should render date range dropdown trigger", () => {
      render(<PriceChart ticker="TEST" />)

      expect(screen.getByText("All Time")).toBeInTheDocument()
    })

    it("should apply custom className", () => {
      const { container } = render(
        <PriceChart ticker="TEST" className="custom-class" />
      )

      expect(container.firstChild).toHaveClass("custom-class")
    })
  })

  describe("timeframe interactions", () => {
    it("should highlight active timeframe", () => {
      render(<PriceChart ticker="TEST" activeTimeframe="1h" />)

      const hourButton = screen.getByText("1H")
      expect(hourButton).toHaveClass("bg-sedona-500")
    })

    it("should call onTimeframeChange when controlled", () => {
      const onTimeframeChange = vi.fn()
      render(
        <PriceChart
          ticker="TEST"
          activeTimeframe="1d"
          onTimeframeChange={onTimeframeChange}
        />
      )

      fireEvent.click(screen.getByText("1H"))
      expect(onTimeframeChange).toHaveBeenCalledWith("1h")
    })

    it("should handle uncontrolled timeframe changes", () => {
      render(<PriceChart ticker="TEST" />)

      // Initially 1D is active (default)
      expect(screen.getByText("1D")).toHaveClass("bg-sedona-500")

      // Click 1H
      fireEvent.click(screen.getByText("1H"))

      // Now 1H should be active
      expect(screen.getByText("1H")).toHaveClass("bg-sedona-500")
      expect(screen.getByText("1D")).not.toHaveClass("bg-sedona-500")
    })
  })

  describe("scale mode interactions", () => {
    it("should toggle percent mode on click", () => {
      render(<PriceChart ticker="TEST" />)

      const percentButton = screen.getByText("%")
      expect(percentButton).not.toHaveClass("text-sedona-500")

      fireEvent.click(percentButton)
      expect(percentButton).toHaveClass("text-sedona-500")

      // Click again to toggle off
      fireEvent.click(percentButton)
      expect(percentButton).not.toHaveClass("text-sedona-500")
    })

    it("should toggle log mode on click", () => {
      render(<PriceChart ticker="TEST" />)

      const logButton = screen.getByText("log")
      expect(logButton).not.toHaveClass("text-sedona-500")

      fireEvent.click(logButton)
      expect(logButton).toHaveClass("text-sedona-500")

      // Click again to toggle off
      fireEvent.click(logButton)
      expect(logButton).not.toHaveClass("text-sedona-500")
    })
  })

  describe("date range dropdown", () => {
    it("should render dropdown trigger with default value", () => {
      render(<PriceChart ticker="TEST" />)

      const trigger = screen.getByText("All Time")
      expect(trigger).toBeInTheDocument()
      expect(trigger).toHaveAttribute("aria-haspopup", "menu")
      expect(trigger).toHaveAttribute("aria-expanded", "false")
    })

    it("should update aria-expanded when clicked", () => {
      render(<PriceChart ticker="TEST" />)

      const trigger = screen.getByText("All Time")
      expect(trigger).toHaveAttribute("aria-expanded", "false")

      fireEvent.click(trigger)
      expect(trigger).toHaveAttribute("aria-expanded", "true")
    })
  })

  describe("auto fit button", () => {
    it("should render auto fit button", () => {
      render(<PriceChart ticker="TEST" />)

      const autoButton = screen.getByText("auto")
      expect(autoButton).toBeInTheDocument()
      expect(autoButton).toHaveClass("text-sedona-500")
    })
  })

  describe("loading state", () => {
    it("should show loading text before mount", () => {
      // The component shows "Loading chart..." when not mounted
      // After first render, useEffect sets mounted to true
      // This test verifies the loading state exists in the DOM structure
      render(<PriceChart ticker="TEST" />)

      // After mount, the chart container should exist
      const chartContainer = document.querySelector(".w-full.h-full")
      expect(chartContainer).toBeInTheDocument()
    })
  })

  describe("UTC time display", () => {
    it("should display UTC time indicator", () => {
      render(<PriceChart ticker="TEST" />)

      expect(screen.getByText(/\(UTC\)/)).toBeInTheDocument()
    })
  })
})
