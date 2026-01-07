"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  formatNumber,
  formatUSD,
  sanitizeNumericInput,
  parseBalance,
  getSlippageMultiplier,
  getPriceImpactColor,
  type Token,
} from "@/lib/swap-utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icon } from "@/components/ui/icon"
import { TokenAvatar } from "@/components/ui/token-avatar"

// =============================================================================
// TYPES
// =============================================================================

// Token interface imported from swap-utils
export type { Token }

export interface SwapQuote {
  receiveAmount: string
  exchangeRate: number
  priceImpact: number
  minReceived: string
  networkFee?: string
  expiresAt?: number
  metadata?: Record<string, unknown>
}

export interface SwapError {
  code: "QUOTE_FAILED" | "INSUFFICIENT_LIQUIDITY" | "NETWORK_ERROR" | "QUOTE_EXPIRED" | "AMOUNT_TOO_SMALL" | "AMOUNT_TOO_LARGE" | "UNKNOWN"
  message: string
}

export type SwapStatus = "idle" | "quoting" | "ready" | "swapping" | "success" | "error"

export interface SwapWidgetProps {
  payToken: Token
  receiveToken: Token
  slippage?: string
  slippagePresets?: string[]
  nativeGasReserve?: string
  quoteRefreshInterval?: number
  quoteDebounceMs?: number
  disabled?: boolean
  disabledMessage?: string
  onQuoteRequest?: (params: {
    payToken: Token
    receiveToken: Token
    payAmount: string
    slippage: string
  }) => Promise<SwapQuote | null>
  onSwap?: (params: {
    payToken: Token
    receiveToken: Token
    payAmount: string
    receiveAmount: string
    minReceived: string
    slippage: string
    quote: SwapQuote
  }) => Promise<void>
  onFlip?: () => void
  onPayTokenSelect?: () => void
  onReceiveTokenSelect?: () => void
  onError?: (error: SwapError) => void
  className?: string
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

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

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return
    inputRef.current?.focus()
  }

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "rounded-xl border p-3 transition-all cursor-text",
        "focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary",
        hasError
          ? "border-destructive bg-destructive/5 focus-within:ring-destructive/50 focus-within:border-destructive"
          : "border-border bg-card"
      )}
    >
      <div className="flex items-center gap-3">
        <TokenAvatar ticker={token.symbol} size="md" imageUrl={token.imageUrl} />

        {isCalculating ? (
          <div className="flex-1 flex items-center">
            <Icon icon="spinner-third" spin className="w-5 h-5 text-muted-foreground" />
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
            className={cn(
              "flex-1 min-w-0 bg-transparent text-2xl font-semibold",
              "placeholder:text-muted-foreground/50",
              "focus:outline-none",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          />
        )}

        <button
          type="button"
          onClick={onTokenSelect}
          disabled={disabled}
          className="flex items-center gap-1 px-3 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors disabled:opacity-50 flex-shrink-0"
        >
          <span className="text-sm font-semibold">{token.symbol}</span>
          <Icon icon="chevrons-up-down" className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex items-center justify-between mt-2 text-xs">
        <span className={cn(hasError ? "text-destructive" : "text-muted-foreground")}>
          {errorMessage || formatUSD(usdValue)}
        </span>
        <span className="text-muted-foreground">
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
  presets = ["0.5", "1.0", "2.0"],
}: SlippagePopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors text-xs">
          <span className="text-muted-foreground">Slip:</span>
          <span className="text-primary font-medium">
            {value === "Auto" ? "Auto" : `${value}%`}
          </span>
          <Icon icon="gear" className="w-3 h-3 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-2">
        <div className="space-y-2">
          <div className="text-xs font-medium">Slippage Tolerance</div>
          <div className="flex gap-1">
            <button
              onClick={() => onChange("Auto")}
              className={cn(
                "flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors",
                value === "Auto"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              Auto
            </button>
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => onChange(preset)}
                className={cn(
                  "flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors",
                  value === preset
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
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

const QuoteCountdown = ({
  expiresAt,
  onExpire,
}: {
  expiresAt: number
  onExpire: () => void
}) => {
  const [secondsLeft, setSecondsLeft] = React.useState(
    Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
  )

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
    <span className={cn(secondsLeft <= 10 && "text-yellow-500")}>{secondsLeft}s</span>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const SwapWidget = React.forwardRef<HTMLDivElement, SwapWidgetProps>(
  (
    {
      payToken,
      receiveToken,
      slippage: initialSlippage = "Auto",
      slippagePresets,
      nativeGasReserve = "0.01",
      quoteRefreshInterval = 30000,
      quoteDebounceMs = 300,
      disabled = false,
      disabledMessage,
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
    const [payAmount, setPayAmount] = React.useState("")
    const [receiveAmount, setReceiveAmount] = React.useState("")
    const [slippage, setSlippage] = React.useState(initialSlippage)
    const [quote, setQuote] = React.useState<SwapQuote | null>(null)
    const [status, setStatus] = React.useState<SwapStatus>("idle")
    const [error, setError] = React.useState<SwapError | null>(null)

    const abortControllerRef = React.useRef<AbortController | null>(null)
    const quoteIntervalRef = React.useRef<NodeJS.Timeout | null>(null)

    const payAmountNum = parseFloat(payAmount) || 0
    const payBalance = parseBalance(payToken.balance)
    const payUsdValue = payAmountNum * payToken.price
    const receiveAmountNum = parseFloat(receiveAmount) || 0
    const receiveUsdValue = receiveAmountNum * receiveToken.price

    const maxPayAmount = payToken.isNative
      ? Math.max(0, payBalance - parseFloat(nativeGasReserve))
      : payBalance

    const insufficientBalance = payAmountNum > payBalance
    const exceedsMax = payAmountNum > maxPayAmount && payToken.isNative
    const hasValidAmount = payAmountNum > 0
    const isQuoteExpired = quote?.expiresAt ? Date.now() > quote.expiresAt : false

    const hasError = insufficientBalance || exceedsMax
    const canSwap =
      hasValidAmount &&
      !hasError &&
      !disabled &&
      status !== "quoting" &&
      status !== "swapping" &&
      quote !== null &&
      !isQuoteExpired

    const getErrorMessage = (): string | undefined => {
      if (insufficientBalance) return `Insufficient ${payToken.symbol}`
      if (exceedsMax) return `Reserve ${nativeGasReserve} ${payToken.symbol} for gas`
      return undefined
    }

    const getButtonConfig = () => {
      if (disabled) return { text: disabledMessage || "Trading disabled", disabled: true }
      if (status === "swapping") return { text: "Swapping...", disabled: true }
      if (!hasValidAmount) return { text: "Enter amount", disabled: true }
      if (hasError) return { text: getErrorMessage() || "Error", disabled: true }
      if (status === "quoting") return { text: "Getting quote...", disabled: true }
      if (isQuoteExpired) return { text: "Quote expired", disabled: true }
      return { text: "Swap", disabled: false }
    }

    const fetchQuote = React.useCallback(
      async (amount: string) => {
        if (abortControllerRef.current) abortControllerRef.current.abort()

        const amountNum = parseFloat(amount)
        if (!amount || amountNum <= 0 || disabled) {
          setReceiveAmount("")
          setQuote(null)
          setStatus("idle")
          return
        }

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

            if (abortControllerRef.current?.signal.aborted) return

            if (newQuote) {
              setQuote(newQuote)
              setReceiveAmount(newQuote.receiveAmount)
              setStatus("ready")
            } else {
              setReceiveAmount("")
              setQuote(null)
              setStatus("idle")
            }
          } else {
            // Mock quote for development
            const mockRate = receiveToken.price > 0 ? payToken.price / receiveToken.price : 1
            const receive = (amountNum * mockRate).toFixed(6)
            const slippageMultiplier = getSlippageMultiplier(slippage)

            setReceiveAmount(receive)
            setQuote({
              receiveAmount: receive,
              exchangeRate: mockRate,
              priceImpact: amountNum > 10 ? 2.5 : 0.1,
              minReceived: (parseFloat(receive) * slippageMultiplier).toFixed(6),
              expiresAt: Date.now() + 30000,
            })
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
      },
      [payToken, receiveToken, slippage, payBalance, disabled, onQuoteRequest, onError]
    )

    React.useEffect(() => {
      const debounce = setTimeout(() => fetchQuote(payAmount), quoteDebounceMs)
      return () => clearTimeout(debounce)
    }, [payAmount, fetchQuote, quoteDebounceMs])

    React.useEffect(() => {
      setPayAmount("")
      setReceiveAmount("")
      setQuote(null)
      setError(null)
      setStatus("idle")
    }, [payToken.symbol, receiveToken.symbol])

    React.useEffect(() => {
      if (quoteRefreshInterval <= 0 || !hasValidAmount || disabled) {
        if (quoteIntervalRef.current) clearInterval(quoteIntervalRef.current)
        return
      }

      quoteIntervalRef.current = setInterval(() => {
        if (payAmount && status === "ready") fetchQuote(payAmount)
      }, quoteRefreshInterval)

      return () => {
        if (quoteIntervalRef.current) clearInterval(quoteIntervalRef.current)
      }
    }, [quoteRefreshInterval, hasValidAmount, disabled, payAmount, status, fetchQuote])

    React.useEffect(() => {
      return () => {
        if (abortControllerRef.current) abortControllerRef.current.abort()
        if (quoteIntervalRef.current) clearInterval(quoteIntervalRef.current)
      }
    }, [])

    const handleQuickAmount = (percent: number) => {
      if (disabled) return
      const baseAmount = percent === 100 ? maxPayAmount : payBalance
      const amount = (baseAmount * percent) / 100
      setPayAmount(amount.toFixed(Math.min(payToken.decimals || 9, 6)))
    }

    const handleFlip = () => {
      if (disabled) return
      const tempPay = payAmount
      setPayAmount(receiveAmount)
      setReceiveAmount(tempPay)
      setQuote(null)
      setError(null)
      onFlip?.()
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
        {disabled && disabledMessage && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <Icon icon="triangle-exclamation" className="w-4 h-4 text-yellow-500 flex-shrink-0" />
            <span className="text-xs text-yellow-500">{disabledMessage}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold">Pay</span>
            {[25, 50, 100].map((pct) => (
              <button
                key={pct}
                onClick={() => handleQuickAmount(pct)}
                disabled={disabled}
                className="px-2 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                {pct === 100 ? "Max" : `${pct}%`}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {quote && hasValidAmount && (
              <button
                onClick={() => fetchQuote(payAmount)}
                disabled={status === "quoting" || disabled}
                className="p-1 rounded-full hover:bg-muted transition-colors disabled:opacity-50"
              >
                <Icon
                  icon="arrows-rotate"
                  spin={status === "quoting"}
                  className="w-3 h-3 text-muted-foreground"
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

        <div className="relative">
          <SwapCard
            value={payAmount}
            onChange={setPayAmount}
            token={payToken}
            usdValue={payUsdValue}
            onTokenSelect={onPayTokenSelect}
            disabled={disabled}
            hasError={hasError && hasValidAmount}
            errorMessage={hasValidAmount ? getErrorMessage() : undefined}
          />

          <div className="h-3" />

          <SwapCard
            value={receiveAmount}
            onChange={() => {}}
            token={receiveToken}
            usdValue={receiveUsdValue}
            onTokenSelect={onReceiveTokenSelect}
            disabled={true}
            isCalculating={status === "quoting"}
          />

          <button
            onClick={handleFlip}
            disabled={disabled}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-background border border-border hover:bg-muted transition-colors disabled:opacity-50"
          >
            <Icon icon="arrows-up-down" className="w-4 h-4" />
          </button>
        </div>

        <Button
          className="w-full h-11 mt-2"
          onClick={handleSwap}
          disabled={buttonConfig.disabled}
        >
          {status === "swapping" && <Icon icon="spinner-third" spin className="w-4 h-4 mr-2" />}
          {buttonConfig.text}
        </Button>

        {quote && hasValidAmount && !hasError && (
          <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground pt-1">
            <span>
              Min: {formatNumber(quote.minReceived)} {receiveToken.symbol}
            </span>
            <span>·</span>
            <span className={getPriceImpactColor(quote.priceImpact)}>
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

        {error && status === "error" && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-xs text-destructive">
            <Icon icon="triangle-exclamation" className="w-3 h-3 flex-shrink-0" />
            {error.message}
          </div>
        )}
      </div>
    )
  }
)

SwapWidget.displayName = "SwapWidget"

export { SwapWidget }
