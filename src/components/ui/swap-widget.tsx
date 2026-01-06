"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  formatNumber,
  formatUSD,
  sanitizeNumericInput,
  parseBalance,
  getSlippageMultiplier,
} from "@/lib/swap-utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ChevronsUpDown,
  Settings,
  ArrowDownUp,
  Loader2,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"
import { TokenAvatar } from "@/components/ui/token-avatar"

// ============================================================================
// Types - Designed for API flexibility
// ============================================================================

export interface Token {
  /** Token ticker symbol (e.g., "SOL", "USDC") */
  symbol: string
  /** Full token name */
  name: string
  /** Optional image URL for token avatar */
  imageUrl?: string
  /** Token decimals for input precision (default: 9) */
  decimals?: number
  /** User's balance of this token (as string to preserve precision) */
  balance: string
  /** Current price in USD */
  price: number
  /** Whether this is a native token (for gas reservation) */
  isNative?: boolean
  /** Minimum trade amount (optional, for validation) */
  minAmount?: string
  /** Maximum trade amount (optional, for validation) */
  maxAmount?: string
}

export interface SwapQuote {
  /** Amount user will receive */
  receiveAmount: string
  /** Exchange rate (1 pay token = X receive tokens) */
  exchangeRate: number
  /** Price impact percentage */
  priceImpact: number
  /** Minimum received after slippage */
  minReceived: string
  /** Network/gas fee estimate (optional) */
  networkFee?: string
  /** Quote expiry timestamp in ms (optional) */
  expiresAt?: number
  /** Any additional data from your API */
  metadata?: Record<string, unknown>
}

export interface SwapError {
  /** Error code for programmatic handling */
  code: "QUOTE_FAILED" | "INSUFFICIENT_LIQUIDITY" | "NETWORK_ERROR" | "QUOTE_EXPIRED" | "AMOUNT_TOO_SMALL" | "AMOUNT_TOO_LARGE" | "UNKNOWN"
  /** Human-readable message */
  message: string
}

export type SwapStatus =
  | "idle"           // Ready to swap
  | "quoting"        // Fetching quote
  | "ready"          // Quote received, ready to execute
  | "swapping"       // Swap in progress
  | "success"        // Swap completed
  | "error"          // Error occurred

export type TradingStatus =
  | "active"         // Trading enabled
  | "inactive"       // Game/trading not active
  | "maintenance"    // System maintenance
  | "restricted"     // User restricted from trading

export interface SwapWidgetProps {
  /** Pay token configuration */
  payToken: Token
  /** Receive token configuration */
  receiveToken: Token

  // === Status & State ===
  /** Overall trading status - controls if swaps are allowed */
  tradingStatus?: TradingStatus
  /** Custom message when trading is not active */
  tradingStatusMessage?: string
  /** Initial slippage setting */
  slippage?: string
  /** Available slippage presets */
  slippagePresets?: string[]
  /** Gas reserve for native token (default: 0.01) */
  nativeGasReserve?: string

  // === Quote Settings ===
  /** Quote refresh interval in ms (0 = no auto refresh) */
  quoteRefreshInterval?: number
  /** Debounce delay for quote requests in ms */
  quoteDebounceMs?: number

  // === Callbacks - Design for your API ===
  /**
   * Fetch a swap quote from your API
   * Return null to indicate no quote available
   * Throw SwapError for error handling
   */
  onQuoteRequest?: (params: {
    payToken: Token
    receiveToken: Token
    payAmount: string
    slippage: string
  }) => Promise<SwapQuote | null>

  /**
   * Execute the swap
   * Called with all relevant data for your API
   */
  onSwap?: (params: {
    payToken: Token
    receiveToken: Token
    payAmount: string
    receiveAmount: string
    minReceived: string
    slippage: string
    quote: SwapQuote
  }) => Promise<void>

  /** Called when user flips pay/receive tokens */
  onFlip?: () => void
  /** Called when user clicks pay token selector */
  onPayTokenSelect?: () => void
  /** Called when user clicks receive token selector */
  onReceiveTokenSelect?: () => void
  /** Called on any error */
  onError?: (error: SwapError) => void

  className?: string
}

// ============================================================================
// Sub-components
// ============================================================================

interface SwapCardProps {
  value: string
  onChange: (value: string) => void
  token: Token
  usdValue: number
  onTokenSelect?: () => void
  disabled?: boolean
  isCalculating?: boolean
  hasError?: boolean
  errorMessage?: string
}

const SwapCard = ({
  value,
  onChange,
  token,
  usdValue,
  onTokenSelect,
  disabled = false,
  isCalculating = false,
  hasError = false,
  errorMessage,
}: SwapCardProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeNumericInput(e.target.value, token.decimals || 9)
    onChange(sanitized)
  }

  // Click anywhere on card to focus input
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't focus if clicking on token selector button
    if ((e.target as HTMLElement).closest('button')) return
    inputRef.current?.focus()
  }

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "rounded-xl border p-3 transition-all cursor-text",
        "focus-within:ring-2 focus-within:ring-sedona-500/50 focus-within:border-sedona-500",
        hasError
          ? "border-zeus-status-destructive bg-zeus-status-destructive/5 focus-within:ring-zeus-status-destructive/50 focus-within:border-zeus-status-destructive"
          : "border-zeus-border-alpha bg-zeus-surface-default"
      )}
      role="group"
      aria-label={`${token.symbol} amount input`}
    >
      {/* Input Row */}
      <div className="flex items-center gap-3">
        <TokenAvatar ticker={token.symbol} size="md" imageUrl={token.imageUrl} />

        {isCalculating ? (
          <div className="flex-1 flex items-center" aria-live="polite" aria-busy="true">
            <Loader2 className="w-5 h-5 text-zeus-text-tertiary animate-spin" />
            <span className="sr-only">Calculating...</span>
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            aria-label={`Enter ${token.symbol} amount`}
            aria-invalid={hasError}
            aria-describedby={hasError ? "swap-error" : undefined}
            className={cn(
              "flex-1 min-w-0 bg-transparent text-2xl font-semibold text-zeus-text-primary",
              "placeholder:text-zeus-text-quaternary",
              "focus:outline-none focus:ring-0",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          />
        )}

        <button
          type="button"
          onClick={onTokenSelect}
          disabled={disabled}
          aria-label={`Select ${token.symbol} token`}
          className="flex items-center gap-1 px-3 py-2 rounded-full bg-zeus-surface-elevated hover:bg-zeus-surface-neutral-subtle transition-colors disabled:opacity-50 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-sedona-500/50"
        >
          <span className="text-zeus-text-primary text-sm font-semibold">
            {token.symbol}
          </span>
          <ChevronsUpDown className="w-4 h-4 text-zeus-text-tertiary" />
        </button>
      </div>

      {/* Info Row */}
      <div className="flex items-center justify-between mt-2 text-[11px]">
        <span
          className={cn(
            hasError ? "text-zeus-status-destructive" : "text-zeus-text-tertiary"
          )}
          id={hasError ? "swap-error" : undefined}
        >
          {errorMessage || formatUSD(usdValue)}
        </span>
        <span className="text-zeus-text-tertiary">
          {formatNumber(token.balance)} {token.symbol}
        </span>
      </div>
    </div>
  )
}

interface SlippagePopoverProps {
  value: string
  onChange: (value: string) => void
  presets?: string[]
}

const SlippagePopover = ({
  value,
  onChange,
  presets = ["0.5", "1.0", "2.0"]
}: SlippagePopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label={`Slippage tolerance: ${value === "Auto" ? "Auto" : `${value}%`}`}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zeus-surface-elevated hover:bg-zeus-surface-neutral-subtle transition-colors text-[11px] focus:outline-none focus:ring-2 focus:ring-sedona-500/50"
        >
          <span className="text-zeus-text-tertiary">Slip:</span>
          <span className="text-sedona-500 font-medium">
            {value === "Auto" ? "Auto" : `${value}%`}
          </span>
          <Settings className="w-3 h-3 text-zeus-text-tertiary" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-48 p-2 bg-zeus-surface-neutral border-zeus-border-alpha"
      >
        <div className="space-y-2" role="radiogroup" aria-label="Slippage tolerance">
          <div className="text-[11px] font-medium text-zeus-text-secondary">Slippage Tolerance</div>
          <div className="flex gap-1">
            <button
              onClick={() => onChange("Auto")}
              role="radio"
              aria-checked={value === "Auto"}
              className={cn(
                "flex-1 px-2 py-1.5 rounded text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sedona-500/50",
                value === "Auto"
                  ? "bg-sedona-500 text-white"
                  : "bg-zeus-surface-elevated text-zeus-text-secondary hover:text-zeus-text-primary"
              )}
            >
              Auto
            </button>
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => onChange(preset)}
                role="radio"
                aria-checked={value === preset}
                className={cn(
                  "flex-1 px-2 py-1.5 rounded text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sedona-500/50",
                  value === preset
                    ? "bg-sedona-500 text-white"
                    : "bg-zeus-surface-elevated text-zeus-text-secondary hover:text-zeus-text-primary"
                )}
              >
                {preset}%
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ============================================================================
// Main Component
// ============================================================================

const SwapWidget = React.forwardRef<HTMLDivElement, SwapWidgetProps>(
  (
    {
      payToken,
      receiveToken,
      tradingStatus = "active",
      tradingStatusMessage,
      slippage: initialSlippage = "Auto",
      slippagePresets,
      nativeGasReserve = "0.01",
      quoteRefreshInterval = 30000,
      quoteDebounceMs = 300,
      onQuoteRequest,
      onSwap,
      onFlip,
      onPayTokenSelect,
      onReceiveTokenSelect,
      onError,
      className,
    },
    ref
  ) => {
    // === State ===
    const [payAmount, setPayAmount] = React.useState("")
    const [receiveAmount, setReceiveAmount] = React.useState("")
    const [slippage, setSlippage] = React.useState(initialSlippage)
    const [quote, setQuote] = React.useState<SwapQuote | null>(null)
    const [status, setStatus] = React.useState<SwapStatus>("idle")
    const [error, setError] = React.useState<SwapError | null>(null)
    const [quoteTimestamp, setQuoteTimestamp] = React.useState<number | null>(null)

    // Refs for cleanup
    const abortControllerRef = React.useRef<AbortController | null>(null)
    const quoteIntervalRef = React.useRef<NodeJS.Timeout | null>(null)

    // === Derived Values ===
    const payAmountNum = parseFloat(payAmount) || 0
    const payBalance = parseBalance(payToken.balance)
    const payUsdValue = payAmountNum * payToken.price
    const receiveAmountNum = parseFloat(receiveAmount) || 0
    const receiveUsdValue = receiveAmountNum * receiveToken.price

    // Calculate max amount (reserve gas for native tokens)
    const maxPayAmount = payToken.isNative
      ? Math.max(0, payBalance - parseFloat(nativeGasReserve))
      : payBalance

    // === Validation ===
    const isTradingDisabled = tradingStatus !== "active"
    const insufficientBalance = payAmountNum > payBalance
    const exceedsMax = payAmountNum > maxPayAmount && payToken.isNative
    const belowMinimum = payToken.minAmount && payAmountNum > 0 && payAmountNum < parseFloat(payToken.minAmount)
    const aboveMaximum = payToken.maxAmount && payAmountNum > parseFloat(payToken.maxAmount)
    const hasValidAmount = payAmountNum > 0
    const isQuoteExpired = quote?.expiresAt ? Date.now() > quote.expiresAt : false

    const hasError = insufficientBalance || exceedsMax || belowMinimum || aboveMaximum
    const canSwap = hasValidAmount &&
                    !hasError &&
                    !isTradingDisabled &&
                    status !== "quoting" &&
                    status !== "swapping" &&
                    quote !== null &&
                    !isQuoteExpired

    // === Error Message ===
    const getErrorMessage = (): string | undefined => {
      if (insufficientBalance) return `Insufficient ${payToken.symbol}`
      if (exceedsMax) return `Reserve ${nativeGasReserve} ${payToken.symbol} for gas`
      if (belowMinimum) return `Min: ${payToken.minAmount} ${payToken.symbol}`
      if (aboveMaximum) return `Max: ${payToken.maxAmount} ${payToken.symbol}`
      return undefined
    }

    // === Button State ===
    const getButtonConfig = (): { text: string; disabled: boolean; variant: "light" | "destructive" | "ghost" } => {
      if (isTradingDisabled) {
        return {
          text: tradingStatusMessage || getTradingStatusMessage(tradingStatus),
          disabled: true,
          variant: "ghost"
        }
      }
      if (status === "swapping") return { text: "Swapping...", disabled: true, variant: "light" }
      if (!hasValidAmount) return { text: "Enter amount", disabled: true, variant: "light" }
      if (hasError) return { text: getErrorMessage() || "Error", disabled: true, variant: "destructive" }
      if (status === "quoting") return { text: "Getting quote...", disabled: true, variant: "light" }
      if (isQuoteExpired) return { text: "Quote expired - refresh", disabled: true, variant: "ghost" }
      if (error) return { text: "Retry", disabled: false, variant: "light" }
      return { text: "Swap Tokens", disabled: false, variant: "light" }
    }

    function getTradingStatusMessage(s: TradingStatus): string {
      switch (s) {
        case "inactive": return "Trading not active"
        case "maintenance": return "Under maintenance"
        case "restricted": return "Trading restricted"
        default: return "Trading unavailable"
      }
    }

    // === Quote Fetching ===
    const fetchQuote = React.useCallback(async (amount: string) => {
      // Cancel any pending request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const amountNum = parseFloat(amount)
      if (!amount || amountNum <= 0 || isTradingDisabled) {
        setReceiveAmount("")
        setQuote(null)
        setStatus("idle")
        setError(null)
        return
      }

      // Validate before fetching
      if (amountNum > payBalance) {
        setReceiveAmount("")
        setQuote(null)
        return
      }

      abortControllerRef.current = new AbortController()
      setStatus("quoting")
      setError(null)

      try {
        if (onQuoteRequest) {
          const newQuote = await onQuoteRequest({
            payToken,
            receiveToken,
            payAmount: amount,
            slippage,
          })

          // Check if request was aborted
          if (abortControllerRef.current?.signal.aborted) return

          if (newQuote) {
            setQuote(newQuote)
            setReceiveAmount(newQuote.receiveAmount)
            setQuoteTimestamp(Date.now())
            setStatus("ready")
          } else {
            setReceiveAmount("")
            setQuote(null)
            setStatus("idle")
          }
        } else {
          // Mock for development - remove in production
          const mockRate = receiveToken.price > 0 ? payToken.price / receiveToken.price : 1
          const receive = (amountNum * mockRate).toFixed(6)
          const slippageMultiplier = getSlippageMultiplier(slippage)

          setReceiveAmount(receive)
          setQuote({
            receiveAmount: receive,
            exchangeRate: mockRate,
            priceImpact: amountNum > 10 ? 2.5 : 0.1,
            minReceived: (parseFloat(receive) * slippageMultiplier).toFixed(6),
            expiresAt: Date.now() + 30000, // 30s expiry
          })
          setQuoteTimestamp(Date.now())
          setStatus("ready")
        }
      } catch (err) {
        if (abortControllerRef.current?.signal.aborted) return

        const swapError: SwapError = {
          code: "QUOTE_FAILED",
          message: err instanceof Error ? err.message : "Failed to get quote",
        }
        setError(swapError)
        setStatus("error")
        onError?.(swapError)
      }
    }, [payToken, receiveToken, slippage, payBalance, isTradingDisabled, onQuoteRequest, onError])

    // === Effects ===

    // Debounced quote fetch on amount change
    React.useEffect(() => {
      const debounce = setTimeout(() => {
        fetchQuote(payAmount)
      }, quoteDebounceMs)

      return () => clearTimeout(debounce)
    }, [payAmount, fetchQuote, quoteDebounceMs])

    // Reset state when tokens change
    React.useEffect(() => {
      setPayAmount("")
      setReceiveAmount("")
      setQuote(null)
      setError(null)
      setStatus("idle")
    }, [payToken.symbol, receiveToken.symbol])

    // Auto-refresh quote
    React.useEffect(() => {
      if (quoteRefreshInterval <= 0 || !hasValidAmount || isTradingDisabled) {
        if (quoteIntervalRef.current) {
          clearInterval(quoteIntervalRef.current)
          quoteIntervalRef.current = null
        }
        return
      }

      quoteIntervalRef.current = setInterval(() => {
        if (payAmount && status === "ready") {
          fetchQuote(payAmount)
        }
      }, quoteRefreshInterval)

      return () => {
        if (quoteIntervalRef.current) {
          clearInterval(quoteIntervalRef.current)
        }
      }
    }, [quoteRefreshInterval, hasValidAmount, isTradingDisabled, payAmount, status, fetchQuote])

    // Cleanup on unmount
    React.useEffect(() => {
      return () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
        }
        if (quoteIntervalRef.current) {
          clearInterval(quoteIntervalRef.current)
        }
      }
    }, [])

    // === Handlers ===
    const handleQuickAmount = (percent: number) => {
      if (isTradingDisabled) return
      const baseAmount = percent === 100 ? maxPayAmount : payBalance
      const amount = (baseAmount * percent / 100)
      // Use token decimals for precision
      const decimals = payToken.decimals || 9
      setPayAmount(amount.toFixed(Math.min(decimals, 6)))
    }

    const handleFlip = () => {
      if (isTradingDisabled) return

      // Swap the amounts
      const tempPay = payAmount
      const tempReceive = receiveAmount

      setPayAmount(tempReceive)
      setReceiveAmount(tempPay)
      setQuote(null)
      setError(null)

      // Notify parent to swap tokens
      // Parent should swap payToken <-> receiveToken props
      onFlip?.()
    }

    const handleRefresh = () => {
      if (payAmount) {
        fetchQuote(payAmount)
      }
    }

    const handleSwap = async () => {
      if (!canSwap || !quote) return

      setStatus("swapping")
      setError(null)

      try {
        await onSwap?.({
          payToken,
          receiveToken,
          payAmount,
          receiveAmount,
          minReceived: quote.minReceived,
          slippage,
          quote,
        })
        setStatus("success")
        // Reset after successful swap
        setPayAmount("")
        setReceiveAmount("")
        setQuote(null)
        setTimeout(() => setStatus("idle"), 2000)
      } catch (err) {
        const swapError: SwapError = {
          code: "UNKNOWN",
          message: err instanceof Error ? err.message : "Swap failed",
        }
        setError(swapError)
        setStatus("error")
        onError?.(swapError)
      }
    }

    const buttonConfig = getButtonConfig()

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {/* Trading Status Banner */}
        {isTradingDisabled && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zeus-status-warning/10 border border-zeus-status-warning/20">
            <AlertTriangle className="w-4 h-4 text-zeus-status-warning flex-shrink-0" />
            <span className="text-caption-s text-zeus-status-warning">
              {tradingStatusMessage || getTradingStatusMessage(tradingStatus)}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5" role="group" aria-label="Quick amount selection">
            <span className="text-zeus-text-primary text-caption-s font-semibold" id="pay-label">Pay</span>
            {[25, 50, 100].map((pct) => (
              <button
                key={pct}
                onClick={() => handleQuickAmount(pct)}
                disabled={isTradingDisabled}
                aria-label={pct === 100 ? "Use maximum balance" : `Use ${pct}% of balance`}
                className="px-2 py-0.5 rounded-full bg-zeus-surface-elevated text-[10px] text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-sedona-500/50"
              >
                {pct === 100 ? "Max" : `${pct}%`}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {quote && hasValidAmount && (
              <button
                onClick={handleRefresh}
                disabled={status === "quoting" || isTradingDisabled}
                aria-label="Refresh quote"
                className="p-1 rounded-full hover:bg-zeus-surface-elevated transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-sedona-500/50"
              >
                <RefreshCw
                  className={cn(
                    "w-3 h-3 text-zeus-text-tertiary",
                    status === "quoting" && "animate-spin"
                  )}
                  aria-hidden="true"
                />
              </button>
            )}
            <SlippagePopover
              value={slippage}
              onChange={setSlippage}
              presets={slippagePresets}
            />
          </div>
        </div>

        {/* Cards with overlapping toggle */}
        <div className="relative">
          <SwapCard
            value={payAmount}
            onChange={setPayAmount}
            token={payToken}
            usdValue={payUsdValue}
            onTokenSelect={onPayTokenSelect}
            disabled={isTradingDisabled}
            hasError={hasError && hasValidAmount ? true : false}
            errorMessage={hasValidAmount ? getErrorMessage() : undefined}
          />

          <div className="h-3" />

          <SwapCard
            value={receiveAmount}
            onChange={() => {}} // Read-only
            token={receiveToken}
            usdValue={receiveUsdValue}
            onTokenSelect={onReceiveTokenSelect}
            disabled={true}
            isCalculating={status === "quoting"}
          />

          <button
            onClick={handleFlip}
            disabled={isTradingDisabled}
            aria-label="Swap pay and receive tokens"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-zeus-surface-elevated border border-zeus-border-alpha hover:bg-zeus-surface-neutral-subtle transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-sedona-500/50"
          >
            <ArrowDownUp className="w-4 h-4 text-zeus-text-secondary" aria-hidden="true" />
          </button>
        </div>

        {/* Swap Button */}
        <Button
          variant={buttonConfig.variant}
          className="w-full h-11 mt-2"
          onClick={handleSwap}
          disabled={buttonConfig.disabled}
        >
          {status === "swapping" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {buttonConfig.text}
        </Button>

        {/* Quote Info Footer */}
        {quote && hasValidAmount && !hasError && (
          <div className="flex items-center justify-center gap-2 text-[10px] text-zeus-text-tertiary pt-1">
            <span>Min: {formatNumber(quote.minReceived)} {receiveToken.symbol}</span>
            <span>·</span>
            <span className={cn(
              quote.priceImpact < 1 && "text-zeus-status-success",
              quote.priceImpact >= 1 && quote.priceImpact < 5 && "text-zeus-status-warning",
              quote.priceImpact >= 5 && "text-zeus-status-destructive"
            )}>
              Impact: {quote.priceImpact < 0.01 ? "<0.01" : quote.priceImpact.toFixed(2)}%
            </span>
            {quote.expiresAt && (
              <>
                <span>·</span>
                <QuoteCountdown expiresAt={quote.expiresAt} onExpire={() => setStatus("idle")} />
              </>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && status === "error" && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zeus-status-destructive/10 text-caption-s text-zeus-status-destructive">
            <AlertTriangle className="w-3 h-3 flex-shrink-0" />
            {error.message}
          </div>
        )}
      </div>
    )
  }
)

// Quote countdown component
const QuoteCountdown = ({ expiresAt, onExpire }: { expiresAt: number; onExpire: () => void }) => {
  const [secondsLeft, setSecondsLeft] = React.useState(Math.max(0, Math.floor((expiresAt - Date.now()) / 1000)))

  React.useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining === 0) {
        onExpire()
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [expiresAt, onExpire])

  if (secondsLeft <= 0) return null

  return (
    <span className={cn(secondsLeft <= 10 && "text-zeus-status-warning")}>
      {secondsLeft}s
    </span>
  )
}

SwapWidget.displayName = "SwapWidget"

export { SwapWidget }
