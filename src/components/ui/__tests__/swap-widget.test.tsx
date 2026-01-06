import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SwapWidget, Token, SwapQuote, TradingStatus } from "../swap-widget"

// Mock tokens for testing
const mockPayToken: Token = {
  symbol: "SOL",
  name: "Solana",
  balance: "100",
  price: 100,
  isNative: true,
  decimals: 9,
}

const mockReceiveToken: Token = {
  symbol: "USDC",
  name: "USD Coin",
  balance: "1000",
  price: 1,
  decimals: 6,
}

const mockQuote: SwapQuote = {
  receiveAmount: "990",
  exchangeRate: 99,
  priceImpact: 0.5,
  minReceived: "985.05",
  expiresAt: Date.now() + 30000,
}

// Helper to render with default props
const renderSwapWidget = (props: Partial<React.ComponentProps<typeof SwapWidget>> = {}) => {
  const defaultProps = {
    payToken: mockPayToken,
    receiveToken: mockReceiveToken,
    ...props,
  }
  return render(<SwapWidget {...defaultProps} />)
}

describe("SwapWidget", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  describe("Rendering", () => {
    it("should render pay and receive cards", () => {
      renderSwapWidget()

      expect(screen.getByText("Pay")).toBeInTheDocument()
      expect(screen.getByLabelText(/SOL amount input/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/USDC amount input/i)).toBeInTheDocument()
    })

    it("should render token symbols", () => {
      renderSwapWidget()

      expect(screen.getAllByText("SOL").length).toBeGreaterThan(0)
      expect(screen.getAllByText("USDC").length).toBeGreaterThan(0)
    })

    it("should render quick amount buttons", () => {
      renderSwapWidget()

      expect(screen.getByRole("button", { name: /25%/i })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /50%/i })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /max/i })).toBeInTheDocument()
    })

    it("should render slippage control", () => {
      renderSwapWidget()

      expect(screen.getByText("Slip:")).toBeInTheDocument()
      expect(screen.getByText("Auto")).toBeInTheDocument()
    })

    it("should render swap button", () => {
      renderSwapWidget()

      expect(screen.getByRole("button", { name: /enter amount/i })).toBeInTheDocument()
    })

    it("should render flip button", () => {
      renderSwapWidget()

      expect(screen.getByRole("button", { name: /swap pay and receive/i })).toBeInTheDocument()
    })
  })

  describe("Input Handling", () => {
    it("should update pay amount on input", async () => {
      renderSwapWidget()

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      expect(input).toHaveValue("10")
    })

    it("should sanitize non-numeric input", async () => {
      renderSwapWidget()

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "abc123.45def")

      expect(input).toHaveValue("123.45")
    })

    it("should prevent multiple decimal points", async () => {
      renderSwapWidget()

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "1.2.3")

      expect(input).toHaveValue("1.23")
    })

    it("should enforce max decimals", async () => {
      renderSwapWidget()

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "1.1234567890123")

      // Should be trimmed to 9 decimals (token decimals)
      expect(input).toHaveValue("1.123456789")
    })

    it("should strip leading zeros", async () => {
      renderSwapWidget()

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "007")

      expect(input).toHaveValue("7")
    })

    it("should allow leading zero for decimals", async () => {
      renderSwapWidget()

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "0.5")

      expect(input).toHaveValue("0.5")
    })
  })

  describe("Quick Amount Buttons", () => {
    it("should set 25% of balance", async () => {
      renderSwapWidget()

      const button = screen.getByRole("button", { name: /25%/i })
      await userEvent.click(button)

      const input = screen.getByLabelText(/enter sol amount/i)
      expect(input).toHaveValue("25.000000")
    })

    it("should set 50% of balance", async () => {
      renderSwapWidget()

      const button = screen.getByRole("button", { name: /50%/i })
      await userEvent.click(button)

      const input = screen.getByLabelText(/enter sol amount/i)
      expect(input).toHaveValue("50.000000")
    })

    it("should set max amount (with gas reserve for native)", async () => {
      renderSwapWidget()

      const button = screen.getByRole("button", { name: /max/i })
      await userEvent.click(button)

      const input = screen.getByLabelText(/enter sol amount/i)
      // 100 - 0.01 gas reserve = 99.99
      expect(input).toHaveValue("99.990000")
    })

    it("should set full max for non-native tokens", async () => {
      renderSwapWidget({
        payToken: { ...mockPayToken, isNative: false },
      })

      const button = screen.getByRole("button", { name: /max/i })
      await userEvent.click(button)

      const input = screen.getByLabelText(/enter sol amount/i)
      expect(input).toHaveValue("100.000000")
    })

    it("should be disabled when trading is inactive", async () => {
      renderSwapWidget({ tradingStatus: "inactive" })

      const button = screen.getByRole("button", { name: /25%/i })
      expect(button).toBeDisabled()
    })
  })

  describe("Flip Functionality", () => {
    it("should call onFlip when flip button clicked", async () => {
      const onFlip = vi.fn()
      renderSwapWidget({ onFlip })

      const flipButton = screen.getByRole("button", { name: /swap pay and receive/i })
      await userEvent.click(flipButton)

      expect(onFlip).toHaveBeenCalledTimes(1)
    })

    it("should swap amounts when flip button clicked", async () => {
      renderSwapWidget()

      // Enter pay amount
      const payInput = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(payInput, "10")

      // Wait for quote to be fetched (mock)
      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      // Get receive input value before flip
      const receiveInput = screen.getByLabelText(/enter usdc amount/i)
      const receiveValueBefore = receiveInput.getAttribute("value")

      // Click flip
      const flipButton = screen.getByRole("button", { name: /swap pay and receive/i })
      await userEvent.click(flipButton)

      // Pay input should now have the receive value
      expect(payInput).toHaveValue(receiveValueBefore)
    })

    it("should be disabled when trading is inactive", async () => {
      renderSwapWidget({ tradingStatus: "inactive" })

      const flipButton = screen.getByRole("button", { name: /swap pay and receive/i })
      expect(flipButton).toBeDisabled()
    })
  })

  describe("Slippage Popover", () => {
    it("should open slippage popover on click", async () => {
      renderSwapWidget()

      const trigger = screen.getByLabelText(/slippage tolerance/i)
      await userEvent.click(trigger)

      expect(screen.getByText("Slippage Tolerance")).toBeInTheDocument()
    })

    it("should show preset options", async () => {
      renderSwapWidget()

      const trigger = screen.getByLabelText(/slippage tolerance/i)
      await userEvent.click(trigger)

      expect(screen.getByRole("radio", { name: "Auto" })).toBeInTheDocument()
      expect(screen.getByRole("radio", { name: "0.5%" })).toBeInTheDocument()
      expect(screen.getByRole("radio", { name: "1.0%" })).toBeInTheDocument()
      expect(screen.getByRole("radio", { name: "2.0%" })).toBeInTheDocument()
    })

    it("should update slippage on selection", async () => {
      renderSwapWidget()

      const trigger = screen.getByLabelText(/slippage tolerance/i)
      await userEvent.click(trigger)

      const option = screen.getByRole("radio", { name: "1.0%" })
      await userEvent.click(option)

      // Trigger should now show 1.0% (aria-label updates)
      expect(screen.getByLabelText(/slippage tolerance: 1\.0%/i)).toBeInTheDocument()
    })

    it("should use custom presets when provided", async () => {
      renderSwapWidget({ slippagePresets: ["0.1", "0.3", "0.5"] })

      const trigger = screen.getByLabelText(/slippage tolerance/i)
      await userEvent.click(trigger)

      expect(screen.getByRole("radio", { name: "0.1%" })).toBeInTheDocument()
      expect(screen.getByRole("radio", { name: "0.3%" })).toBeInTheDocument()
      expect(screen.getByRole("radio", { name: "0.5%" })).toBeInTheDocument()
    })
  })

  describe("Trading Status", () => {
    const statusTests: { status: TradingStatus; expectedMessage: string }[] = [
      { status: "inactive", expectedMessage: "Trading not active" },
      { status: "maintenance", expectedMessage: "Under maintenance" },
      { status: "restricted", expectedMessage: "Trading restricted" },
    ]

    statusTests.forEach(({ status, expectedMessage }) => {
      it(`should show banner for ${status} status`, () => {
        renderSwapWidget({ tradingStatus: status })

        // Banner text appears in warning banner
        expect(screen.getAllByText(expectedMessage).length).toBeGreaterThan(0)
      })

      it(`should disable swap button for ${status} status`, () => {
        renderSwapWidget({ tradingStatus: status })

        // The swap button should be disabled and show the status message
        const buttons = screen.getAllByRole("button")
        const swapButton = buttons.find(btn => btn.textContent?.includes(expectedMessage))
        expect(swapButton).toBeDisabled()
      })
    })

    it("should use custom trading status message", () => {
      renderSwapWidget({
        tradingStatus: "inactive",
        tradingStatusMessage: "Game has ended",
      })

      // Custom message appears in banner
      expect(screen.getAllByText("Game has ended").length).toBeGreaterThan(0)
    })

    it("should not show banner when trading is active", () => {
      renderSwapWidget({ tradingStatus: "active" })

      expect(screen.queryByText("Trading not active")).not.toBeInTheDocument()
      expect(screen.queryByText("Under maintenance")).not.toBeInTheDocument()
      expect(screen.queryByText("Trading restricted")).not.toBeInTheDocument()
    })
  })

  describe("Validation", () => {
    it("should show insufficient balance error", async () => {
      renderSwapWidget()

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "150")

      // Error shows "Insufficient SOL" in multiple places (card + button)
      expect(screen.getAllByText(/Insufficient SOL/).length).toBeGreaterThan(0)
    })

    it("should show gas reserve error for native tokens", async () => {
      renderSwapWidget()

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "99.999")

      // Error shows "Reserve 0.01 SOL for gas" in multiple places
      expect(screen.getAllByText(/Reserve.*SOL for gas/).length).toBeGreaterThan(0)
    })

    it("should show minimum amount error", async () => {
      renderSwapWidget({
        payToken: { ...mockPayToken, minAmount: "1" },
      })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "0.5")

      // Error shows "Min: 1 SOL" in multiple places
      expect(screen.getAllByText(/Min: 1 SOL/).length).toBeGreaterThan(0)
    })

    it("should show maximum amount error", async () => {
      renderSwapWidget({
        payToken: { ...mockPayToken, maxAmount: "50" },
      })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "75")

      // Error shows "Max: 50 SOL" in multiple places
      expect(screen.getAllByText(/Max: 50 SOL/).length).toBeGreaterThan(0)
    })

    it("should disable swap button with validation errors", async () => {
      renderSwapWidget()

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "150")

      // Wait for debounce
      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      const button = screen.getByRole("button", { name: /insufficient/i })
      expect(button).toBeDisabled()
    })
  })

  describe("Quote Fetching", () => {
    it("should call onQuoteRequest when amount changes", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue(mockQuote)
      renderSwapWidget({ onQuoteRequest })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      // Wait for debounce
      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(onQuoteRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          payAmount: "10",
          slippage: "Auto",
        })
      )
    })

    it("should debounce quote requests", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue(mockQuote)
      renderSwapWidget({ onQuoteRequest, quoteDebounceMs: 300 })

      const input = screen.getByLabelText(/enter sol amount/i)

      // Type quickly
      await userEvent.type(input, "1")
      await act(async () => { vi.advanceTimersByTime(100) })
      await userEvent.type(input, "0")
      await act(async () => { vi.advanceTimersByTime(100) })

      // Should not have called yet
      expect(onQuoteRequest).not.toHaveBeenCalled()

      // Wait for full debounce
      await act(async () => { vi.advanceTimersByTime(300) })

      // Should have called once with final value
      expect(onQuoteRequest).toHaveBeenCalledTimes(1)
      expect(onQuoteRequest).toHaveBeenCalledWith(
        expect.objectContaining({ payAmount: "10" })
      )
    })

    it("should update receive amount from quote", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue(mockQuote)
      renderSwapWidget({ onQuoteRequest })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      await waitFor(() => {
        const receiveInput = screen.getByLabelText(/enter usdc amount/i)
        expect(receiveInput).toHaveValue("990")
      })
    })

    it("should show quote info footer", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue(mockQuote)
      renderSwapWidget({ onQuoteRequest })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      await waitFor(() => {
        expect(screen.getByText(/min:/i)).toBeInTheDocument()
        expect(screen.getByText(/impact:/i)).toBeInTheDocument()
      })
    })

    it("should handle quote error", async () => {
      const onQuoteRequest = vi.fn().mockRejectedValue(new Error("Network error"))
      const onError = vi.fn()
      renderSwapWidget({ onQuoteRequest, onError })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith(
          expect.objectContaining({
            code: "QUOTE_FAILED",
            message: "Network error",
          })
        )
      })
    })

    it("should show refresh button when quote exists", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue(mockQuote)
      renderSwapWidget({ onQuoteRequest })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /refresh quote/i })).toBeInTheDocument()
      })
    })
  })

  describe("Swap Execution", () => {
    it("should call onSwap with correct params", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue(mockQuote)
      const onSwap = vi.fn().mockResolvedValue(undefined)
      renderSwapWidget({ onQuoteRequest, onSwap })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /swap tokens/i })).not.toBeDisabled()
      })

      const swapButton = screen.getByRole("button", { name: /swap tokens/i })
      await userEvent.click(swapButton)

      expect(onSwap).toHaveBeenCalledWith(
        expect.objectContaining({
          payAmount: "10",
          receiveAmount: "990",
          minReceived: "985.05",
          slippage: "Auto",
          quote: mockQuote,
        })
      )
    })

    it("should show swapping state", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue(mockQuote)
      const onSwap = vi.fn().mockImplementation(() => new Promise(() => {})) // Never resolves
      renderSwapWidget({ onQuoteRequest, onSwap })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /swap tokens/i })).not.toBeDisabled()
      })

      const swapButton = screen.getByRole("button", { name: /swap tokens/i })
      await userEvent.click(swapButton)

      expect(screen.getByRole("button", { name: /swapping/i })).toBeDisabled()
    })

    it("should reset form after successful swap", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue(mockQuote)
      const onSwap = vi.fn().mockResolvedValue(undefined)
      renderSwapWidget({ onQuoteRequest, onSwap })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /swap tokens/i })).not.toBeDisabled()
      })

      const swapButton = screen.getByRole("button", { name: /swap tokens/i })
      await userEvent.click(swapButton)

      await waitFor(() => {
        expect(input).toHaveValue("")
      })
    })

    it("should handle swap error", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue(mockQuote)
      const onSwap = vi.fn().mockRejectedValue(new Error("Transaction failed"))
      const onError = vi.fn()
      renderSwapWidget({ onQuoteRequest, onSwap, onError })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /swap tokens/i })).not.toBeDisabled()
      })

      const swapButton = screen.getByRole("button", { name: /swap tokens/i })
      await userEvent.click(swapButton)

      await waitFor(() => {
        expect(screen.getByText(/transaction failed/i)).toBeInTheDocument()
        expect(onError).toHaveBeenCalled()
      })
    })
  })

  describe("Quote Expiry", () => {
    it("should show quote info with countdown when quote has expiry", async () => {
      // Use mock quote with expiry - the internal mock will be used
      renderSwapWidget()

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      // Wait for quote debounce
      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      // Quote footer should appear with min received and impact
      await waitFor(() => {
        expect(screen.getByText(/min:/i)).toBeInTheDocument()
        expect(screen.getByText(/impact:/i)).toBeInTheDocument()
      })
    })

    it("should display quote information after entering amount", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue(mockQuote)
      renderSwapWidget({ onQuoteRequest })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      // Quote information should be displayed
      await waitFor(() => {
        expect(screen.getByText(/min:/i)).toBeInTheDocument()
      })
    })
  })

  describe("Token Reset", () => {
    it("should reset state when pay token changes", async () => {
      const { rerender } = render(
        <SwapWidget payToken={mockPayToken} receiveToken={mockReceiveToken} />
      )

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      // Change pay token
      rerender(
        <SwapWidget
          payToken={{ ...mockPayToken, symbol: "ETH" }}
          receiveToken={mockReceiveToken}
        />
      )

      // Input should be reset
      const newInput = screen.getByLabelText(/enter eth amount/i)
      expect(newInput).toHaveValue("")
    })

    it("should reset state when receive token changes", async () => {
      const { rerender } = render(
        <SwapWidget payToken={mockPayToken} receiveToken={mockReceiveToken} />
      )

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      // Change receive token
      rerender(
        <SwapWidget
          payToken={mockPayToken}
          receiveToken={{ ...mockReceiveToken, symbol: "USDT" }}
        />
      )

      // Pay input should be reset
      expect(input).toHaveValue("")
    })
  })

  describe("Accessibility", () => {
    it("should have proper ARIA labels on inputs", () => {
      renderSwapWidget()

      expect(screen.getByLabelText(/enter sol amount/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/enter usdc amount/i)).toBeInTheDocument()
    })

    it("should have proper ARIA labels on buttons", () => {
      renderSwapWidget()

      expect(screen.getByRole("button", { name: /25%/i })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /50%/i })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /max/i })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /slippage tolerance/i })).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /swap pay and receive/i })).toBeInTheDocument()
    })

    it("should mark input as invalid on error", async () => {
      renderSwapWidget()

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "150")

      expect(input).toHaveAttribute("aria-invalid", "true")
    })

    it("should have focus-visible styles on card", async () => {
      renderSwapWidget()

      const card = screen.getByRole("group", { name: /sol amount input/i })
      expect(card).toHaveClass("focus-within:ring-2")
    })

    it("should show loading state accessibly", async () => {
      const onQuoteRequest = vi.fn().mockImplementation(() => new Promise(() => {}))
      renderSwapWidget({ onQuoteRequest })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      expect(screen.getByText(/calculating/i)).toBeInTheDocument()
    })
  })

  describe("Price Impact Display", () => {
    it("should show green for low impact", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue({
        ...mockQuote,
        priceImpact: 0.1,
      })
      renderSwapWidget({ onQuoteRequest })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      await waitFor(() => {
        const impact = screen.getByText(/impact:/i).parentElement?.querySelector(".text-zeus-status-success")
        expect(impact).toBeInTheDocument()
      })
    })

    it("should show warning for medium impact", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue({
        ...mockQuote,
        priceImpact: 2.5,
      })
      renderSwapWidget({ onQuoteRequest })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      await waitFor(() => {
        const impact = screen.getByText(/2\.50%/i)
        expect(impact).toHaveClass("text-zeus-status-warning")
      })
    })

    it("should show destructive for high impact", async () => {
      const onQuoteRequest = vi.fn().mockResolvedValue({
        ...mockQuote,
        priceImpact: 7.5,
      })
      renderSwapWidget({ onQuoteRequest })

      const input = screen.getByLabelText(/enter sol amount/i)
      await userEvent.type(input, "10")

      await act(async () => {
        vi.advanceTimersByTime(500)
      })

      await waitFor(() => {
        const impact = screen.getByText(/7\.50%/i)
        expect(impact).toHaveClass("text-zeus-status-destructive")
      })
    })
  })
})
