"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
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
} from "lucide-react"
import { TokenAvatar } from "@/components/ui/token-avatar"

// ============================================================================
// Types
// ============================================================================

export interface Token {
  symbol: string
  name: string
  imageUrl?: string
  decimals?: number
  balance: string
  price: number
}

export interface SwapQuote {
  receiveAmount: string
  exchangeRate: number
  priceImpact: number
  minReceived: string
  networkFee?: string
}

export interface SwapWidgetProps {
  payToken: Token
  receiveToken: Token
  slippage?: string
  isLoading?: boolean
  isSwapping?: boolean
  onQuoteRequest?: (payAmount: string) => Promise<SwapQuote | null>
  onSwap?: (payAmount: string, receiveAmount: string, minReceived: string) => void
  onRefresh?: () => void
  onFlip?: () => void
  onPayTokenSelect?: () => void
  onReceiveTokenSelect?: () => void
  className?: string
}

// ============================================================================
// Utilities
// ============================================================================

function formatNumber(value: string | number, maxDecimals = 6): string {
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

function formatUSD(value: number): string {
  if (value < 0.01 && value > 0) return "<$0.01"
  if (value === 0) return "$0"
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`
  return `$${value.toFixed(2)}`
}

function sanitizeNumericInput(value: string, maxDecimals = 9): string {
  let sanitized = value.replace(/[^0-9.]/g, "")
  const parts = sanitized.split(".")
  if (parts.length > 2) sanitized = parts[0] + "." + parts.slice(1).join("")
  if (parts.length === 2 && parts[1].length > maxDecimals) {
    sanitized = parts[0] + "." + parts[1].slice(0, maxDecimals)
  }
  if (sanitized.length > 1 && sanitized[0] === "0" && sanitized[1] !== ".") {
    sanitized = sanitized.replace(/^0+/, "") || "0"
  }
  return sanitized
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
  variant?: "pay" | "receive"
  hasError?: boolean
}

const SwapCard = ({
  value,
  onChange,
  token,
  usdValue,
  onTokenSelect,
  disabled = false,
  isCalculating = false,
  variant = "pay",
  hasError = false,
}: SwapCardProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeNumericInput(e.target.value, token.decimals || 9)
    onChange(sanitized)
  }

  return (
    <div className={cn(
      "rounded-xl border p-3 transition-colors",
      hasError
        ? "border-zeus-status-destructive bg-zeus-status-destructive/5"
        : "border-zeus-border-alpha bg-zeus-surface-default"
    )}>
      {/* Input Row */}
      <div className="flex items-center gap-3">
        {/* Token icon */}
        <TokenAvatar ticker={token.symbol} size="md" imageUrl={token.imageUrl} />

        {/* Input */}
        {isCalculating ? (
          <div className="flex-1 flex items-center">
            <Loader2 className="w-5 h-5 text-zeus-text-tertiary animate-spin" />
          </div>
        ) : (
          <input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              "flex-1 min-w-0 bg-transparent text-2xl font-semibold text-zeus-text-primary",
              "placeholder:text-zeus-text-quaternary focus:outline-none",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          />
        )}

        {/* Token selector */}
        <button
          type="button"
          onClick={onTokenSelect}
          disabled={disabled}
          className="flex items-center gap-1 px-3 py-2 rounded-full bg-zeus-surface-elevated hover:bg-zeus-surface-neutral-subtle transition-colors disabled:opacity-50 flex-shrink-0"
        >
          <span className="text-zeus-text-primary text-sm font-semibold">
            {token.symbol}
          </span>
          <ChevronsUpDown className="w-4 h-4 text-zeus-text-tertiary" />
        </button>
      </div>

      {/* Info Row */}
      <div className="flex items-center justify-between mt-2 text-[11px]">
        <span className={cn(
          hasError ? "text-zeus-status-destructive" : "text-zeus-text-tertiary"
        )}>
          {formatUSD(usdValue)}
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
}

const SlippagePopover = ({ value, onChange }: SlippagePopoverProps) => {
  const presets = ["0.5", "1.0", "2.0"]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zeus-surface-elevated hover:bg-zeus-surface-neutral-subtle transition-colors text-[11px]">
          <span className="text-zeus-text-tertiary">Slip:</span>
          <span className="text-sedona-500 font-medium">
            {value === "Auto" ? "Auto" : `${value}%`}
          </span>
          <Settings className="w-3 h-3 text-zeus-text-tertiary" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-48 p-2 bg-zeus-surface-neutral border-zeus-border-alpha"
      >
        <div className="space-y-2">
          <div className="text-[11px] font-medium text-zeus-text-secondary">Slippage</div>
          <div className="flex gap-1">
            <button
              onClick={() => onChange("Auto")}
              className={cn(
                "flex-1 px-2 py-1.5 rounded text-[11px] font-medium transition-colors",
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
                className={cn(
                  "flex-1 px-2 py-1.5 rounded text-[11px] font-medium transition-colors",
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
      slippage: initialSlippage = "Auto",
      isLoading = false,
      isSwapping = false,
      onQuoteRequest,
      onSwap,
      onRefresh,
      onFlip,
      onPayTokenSelect,
      onReceiveTokenSelect,
      className,
    },
    ref
  ) => {
    const [payAmount, setPayAmount] = React.useState("")
    const [receiveAmount, setReceiveAmount] = React.useState("")
    const [slippage, setSlippage] = React.useState(initialSlippage)
    const [quote, setQuote] = React.useState<SwapQuote | null>(null)
    const [isQuoting, setIsQuoting] = React.useState(false)

    // Derived values
    const payAmountNum = parseFloat(payAmount) || 0
    const payBalance = parseFloat(payToken.balance.replace(/,/g, "")) || 0
    const payUsdValue = payAmountNum * payToken.price
    const receiveAmountNum = parseFloat(receiveAmount) || 0
    const receiveUsdValue = receiveAmountNum * receiveToken.price

    // Validation
    const insufficientBalance = payAmountNum > payBalance
    const hasValidAmount = payAmountNum > 0
    const canSwap = hasValidAmount && !insufficientBalance && !isQuoting && !isSwapping

    // Button state
    const getButtonText = () => {
      if (isSwapping) return "Swapping..."
      if (!hasValidAmount) return "Enter amount"
      if (insufficientBalance) return `Insufficient ${payToken.symbol}`
      return "Swap Tokens"
    }

    // Fetch quote
    React.useEffect(() => {
      const fetchQuote = async () => {
        if (!payAmount || payAmountNum <= 0) {
          setReceiveAmount("")
          setQuote(null)
          return
        }

        if (onQuoteRequest) {
          setIsQuoting(true)
          try {
            const newQuote = await onQuoteRequest(payAmount)
            if (newQuote) {
              setQuote(newQuote)
              setReceiveAmount(newQuote.receiveAmount)
            }
          } finally {
            setIsQuoting(false)
          }
        } else {
          // Mock calculation
          const mockRate = 14285.71
          const receive = (payAmountNum * mockRate).toFixed(2)
          setReceiveAmount(receive)
          setQuote({
            receiveAmount: receive,
            exchangeRate: mockRate,
            priceImpact: payAmountNum > 10 ? 2.5 : 0.1,
            minReceived: (parseFloat(receive) * 0.995).toFixed(2),
          })
        }
      }

      const debounce = setTimeout(fetchQuote, 300)
      return () => clearTimeout(debounce)
    }, [payAmount, onQuoteRequest])

    // Handlers
    const handleQuickAmount = (percent: number) => {
      const amount = (payBalance * percent / 100).toFixed(6)
      setPayAmount(amount)
    }

    const handleFlip = () => {
      onFlip?.()
      const tempPay = payAmount
      setPayAmount(receiveAmount)
      setReceiveAmount(tempPay)
    }

    const handleSwap = () => {
      if (canSwap && quote) {
        onSwap?.(payAmount, receiveAmount, quote.minReceived)
      }
    }

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-zeus-text-primary text-caption-s font-semibold">Pay</span>
            {[25, 50, 100].map((pct) => (
              <button
                key={pct}
                onClick={() => handleQuickAmount(pct)}
                className="px-2 py-0.5 rounded-full bg-zeus-surface-elevated text-[10px] text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
              >
                {pct === 100 ? "Max" : `${pct}%`}
              </button>
            ))}
          </div>
          <SlippagePopover value={slippage} onChange={setSlippage} />
        </div>

        {/* Cards with overlapping toggle */}
        <div className="relative">
          {/* Pay Card */}
          <SwapCard
            value={payAmount}
            onChange={setPayAmount}
            token={payToken}
            usdValue={payUsdValue}
            onTokenSelect={onPayTokenSelect}
            variant="pay"
            hasError={insufficientBalance}
          />

          {/* Spacer for toggle */}
          <div className="h-3" />

          {/* Receive Card */}
          <SwapCard
            value={receiveAmount}
            onChange={setReceiveAmount}
            token={receiveToken}
            usdValue={receiveUsdValue}
            onTokenSelect={onReceiveTokenSelect}
            variant="receive"
            disabled
            isCalculating={isQuoting}
          />

          {/* Swap Toggle - overlaps card borders only */}
          <button
            onClick={handleFlip}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-zeus-surface-elevated border border-zeus-border-alpha hover:bg-zeus-surface-neutral-subtle transition-colors"
          >
            <ArrowDownUp className="w-4 h-4 text-zeus-text-secondary" />
          </button>
        </div>

        {/* Swap Button */}
        <Button
          variant={insufficientBalance ? "destructive" : "light"}
          className="w-full h-11 mt-2"
          onClick={handleSwap}
          disabled={!canSwap}
        >
          {isSwapping && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {getButtonText()}
        </Button>

        {/* Footer */}
        {quote && hasValidAmount && (
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
          </div>
        )}
      </div>
    )
  }
)

SwapWidget.displayName = "SwapWidget"

export { SwapWidget }
