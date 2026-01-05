"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RefreshCw, Settings, ChevronDown, ArrowUpDown, Wallet, Copy, Check } from "lucide-react"

export interface TokenSwapCardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Token info
  name: string
  ticker: string
  price: string
  priceChange: "up" | "down"
  tokenAddress: string
  description?: string
  huggingFaceUrl?: string
  modelTypes?: string[]

  // Stats
  marketCap: string
  volume24h: string
  tvl: string
  change1h: number
  change24h: number
  change7d: number
  change30d: number

  // Swap
  payToken?: string
  payBalance?: string
  receiveBalance?: string
  slippage?: string
  isActive?: boolean
  onRefresh?: () => void
  onSlippageSettings?: () => void
  onSwap?: (payAmount: string, receiveAmount: string) => void
}

const TokenSwapCard = React.forwardRef<HTMLDivElement, TokenSwapCardProps>(
  (
    {
      className,
      name,
      ticker,
      price,
      priceChange,
      tokenAddress,
      description,
      huggingFaceUrl,
      modelTypes = [],
      marketCap,
      volume24h,
      tvl,
      change1h,
      change24h,
      change7d,
      change30d,
      payToken = "SOL",
      payBalance = "200",
      receiveBalance = "0",
      slippage = "Auto",
      isActive = true,
      onRefresh,
      onSlippageSettings,
      onSwap,
      ...props
    },
    ref
  ) => {
    const [payAmount, setPayAmount] = React.useState("")
    const [receiveAmount, setReceiveAmount] = React.useState("")
    const [copied, setCopied] = React.useState(false)

    const handleQuickAmount = (percent: number) => {
      const balance = parseFloat(payBalance.replace(/,/g, ""))
      if (!isNaN(balance)) {
        const amount = (balance * percent / 100).toFixed(2)
        setPayAmount(amount)
      }
    }

    const handleFlip = () => {
      const temp = payAmount
      setPayAmount(receiveAmount)
      setReceiveAmount(temp)
    }

    const handleCopy = async () => {
      await navigator.clipboard.writeText(tokenAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    const truncatedAddress = `${tokenAddress.slice(0, 6)}...${tokenAddress.slice(-4)}`

    return (
      <Card
        ref={ref}
        className={cn(
          "bg-zeus-surface-neutral border-zeus-border-alpha",
          className
        )}
        {...props}
      >
        <CardContent className="p-4 space-y-4">
          {/* Token Header */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-zeus-surface-elevated border border-zeus-border-alpha flex items-center justify-center text-lg font-bold text-zeus-text-secondary flex-shrink-0">
              {ticker.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-zeus-text-primary font-semibold text-body-s">{ticker}</span>
                <span className="text-zeus-text-tertiary text-caption-s">/SOL</span>
              </div>
              <div className="text-caption-s">
                <span className="text-zeus-text-secondary">{name}</span>
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-md text-body-s font-bold ${
              priceChange === "up"
                ? "bg-zeus-status-success text-white"
                : "bg-zeus-status-destructive text-white"
            }`}>
              {price} {priceChange === "up" ? "▲" : "▼"}
            </div>
          </div>

          {/* Token Address + HuggingFace Row */}
          <div className="flex items-stretch gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha flex-1">
              <span className="text-zeus-text-tertiary text-[10px] uppercase">CA:</span>
              <span className="text-zeus-text-secondary text-caption-s font-mono flex-1">{truncatedAddress}</span>
              <button
                onClick={handleCopy}
                className="text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-zeus-status-success" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {huggingFaceUrl && (
              <a
                href={huggingFaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zeus-surface-neutral border border-zeus-border-alpha hover:bg-zeus-surface-elevated text-zeus-text-primary text-caption-s font-medium transition-colors"
              >
                <span>🤗</span>
                <span className="whitespace-nowrap">View Model</span>
              </a>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-zeus-text-secondary text-caption-l leading-relaxed">{description}</p>
          )}

          {/* Stats Grid - 3 cols top, 4 cols bottom */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: "MCAP", value: marketCap },
                { label: "VOL", value: volume24h },
                { label: "TVL", value: tvl },
              ].map(({ label, value }) => (
                <div key={label} className="py-2 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha text-center">
                  <div className="text-zeus-text-quaternary text-[9px] uppercase">{label}</div>
                  <div className="text-zeus-text-primary text-caption-s font-semibold">{value}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: "1H", value: change1h },
                { label: "24H", value: change24h },
                { label: "7D", value: change7d },
                { label: "30D", value: change30d },
              ].map(({ label, value }) => (
                <div key={label} className="py-2 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha text-center">
                  <div className="text-zeus-text-quaternary text-[9px] uppercase">{label}</div>
                  <div className={`text-caption-s font-semibold ${value >= 0 ? "text-zeus-status-success" : "text-zeus-status-destructive"}`}>
                    {value >= 0 ? "+" : ""}{value.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-zeus-border-alpha" />

          {/* Swap Section */}
          <div className="space-y-2.5">
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={onRefresh} className="p-1 rounded hover:bg-zeus-surface-elevated transition-colors">
                  <RefreshCw className="w-3.5 h-3.5 text-zeus-text-tertiary" />
                </button>
                <span className="text-zeus-text-primary text-caption-s font-medium">Pay With</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[25, 50].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => handleQuickAmount(pct)}
                    className="px-2 py-0.5 rounded bg-zeus-surface-elevated border border-zeus-border-alpha text-[10px] text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
                  >
                    {pct}%
                  </button>
                ))}
                <button
                  onClick={() => handleQuickAmount(100)}
                  className="px-2 py-0.5 rounded bg-zeus-surface-elevated border border-zeus-border-alpha text-[10px] text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
                >
                  🚀 Full
                </button>
                <button onClick={onSlippageSettings} className="flex items-center gap-1 px-2 py-0.5 rounded bg-zeus-surface-elevated text-[10px]">
                  <span className="text-zeus-text-tertiary">Slip:</span>
                  <span className="text-sedona-500 font-medium">{slippage}</span>
                  <Settings className="w-3 h-3 text-zeus-text-tertiary" />
                </button>
              </div>
            </div>

            {/* Pay Input */}
            <div className="relative">
              <Input
                type="text"
                placeholder="0.00"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="bg-zeus-surface-default border-zeus-border-alpha text-zeus-text-primary text-body-s h-11 pr-24"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zeus-surface-elevated">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">◎</span>
                </div>
                <span className="text-zeus-text-primary text-caption-s font-medium">{payToken}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zeus-text-tertiary" />
              </button>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-zeus-text-tertiary">
              <Wallet className="w-3 h-3" />
              <span>Balance: {payBalance} {payToken}</span>
            </div>

            {/* Swap Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-zeus-border-alpha" />
              <button onClick={handleFlip} className="p-2 rounded-full bg-zeus-surface-elevated border border-zeus-border-alpha hover:bg-zeus-surface-neutral-subtle transition-colors">
                <ArrowUpDown className="w-4 h-4 text-zeus-text-secondary" />
              </button>
              <div className="flex-1 h-px bg-zeus-border-alpha" />
            </div>

            {/* To Receive */}
            <span className="text-zeus-text-primary text-caption-s font-medium">To Receive</span>
            <div className="relative">
              <Input
                type="text"
                placeholder="0.00"
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(e.target.value)}
                className="bg-zeus-surface-default border-zeus-border-alpha text-zeus-text-primary text-body-s h-11 pr-24"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zeus-surface-elevated">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sedona-500 to-sedona-600 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">{ticker.charAt(0)}</span>
                </div>
                <span className="text-zeus-text-primary text-caption-s font-medium">{ticker}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zeus-text-tertiary" />
              </button>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-zeus-text-tertiary">
              <Wallet className="w-3 h-3" />
              <span>Balance: {receiveBalance} {ticker}</span>
            </div>
          </div>

          {/* Swap Button */}
          <button
            className="w-full h-11 bg-white hover:bg-gray-50 text-gray-900 text-sm font-semibold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => onSwap?.(payAmount, receiveAmount)}
            disabled={!isActive || !payAmount}
          >
            Swap Tokens
          </button>

          {/* Min Received */}
          {payAmount && !isNaN(parseFloat(payAmount)) && (
            <div className="text-center text-[11px] text-zeus-text-tertiary">
              ⊕ Min Received: {(parseFloat(payAmount) * 1000).toFixed(0)} {ticker}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)

TokenSwapCard.displayName = "TokenSwapCard"

export { TokenSwapCard }
