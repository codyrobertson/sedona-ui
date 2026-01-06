"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { TokenAvatar } from "@/components/ui/token-avatar"
import { StatsGrid } from "@/components/ui/stats-grid"
import { Copy, Check } from "lucide-react"
import { useClipboard } from "@/hooks/useClipboard"
import { EliminationProgress } from "@/components/ui/elimination-progress"
import { ModelHash, type ModelVersion } from "@/components/ui/model-hash"
import { SwapWidget, type Token } from "@/components/ui/swap-widget"

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
  /** Model version history for the sheet */
  modelVersions?: ModelVersion[]

  // Stats
  marketCap: string
  volume24h: string
  tvl: string
  change1h: number
  change24h: number
  change7d: number
  change30d: number

  // Elimination game
  rank?: number
  totalAgents?: number
  eliminationThreshold?: string

  // Swap
  /** Pay token symbol */
  payTokenSymbol?: string
  /** Pay token balance */
  payBalance?: string
  /** Pay token price in USD */
  payTokenPrice?: number
  /** Receive token balance */
  receiveBalance?: string
  /** Receive token price in USD */
  receiveTokenPrice?: number
  /** Whether swap is active/enabled */
  isActive?: boolean
  /** Callback when refresh is clicked */
  onRefresh?: () => void
  /** Callback when swap is executed */
  onSwap?: (payAmount: string, receiveAmount: string, minReceived: string) => void
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
      modelVersions,
      marketCap,
      volume24h,
      tvl,
      change1h,
      change24h,
      change7d,
      change30d,
      rank,
      totalAgents,
      eliminationThreshold,
      payTokenSymbol = "SOL",
      payBalance = "200",
      payTokenPrice = 100, // Default SOL price
      receiveBalance = "0",
      receiveTokenPrice = 0.007, // Default token price
      isActive = true,
      onRefresh,
      onSwap,
      ...props
    },
    ref
  ) => {
    const { copy, copied } = useClipboard()
    const handleCopy = () => copy(tokenAddress)

    // Build token objects for SwapWidget
    const payToken: Token = {
      symbol: payTokenSymbol,
      name: payTokenSymbol === "SOL" ? "Solana" : payTokenSymbol,
      balance: payBalance,
      price: payTokenPrice,
    }

    const receiveToken: Token = {
      symbol: ticker,
      name: name,
      balance: receiveBalance,
      price: receiveTokenPrice,
    }

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
            <div className="relative">
              <TokenAvatar ticker={ticker} size="lg" />
              {/* CA copy button */}
              <button
                onClick={handleCopy}
                className="absolute -bottom-1 -right-1 p-1 rounded-full bg-zeus-surface-elevated border border-zeus-border-alpha hover:bg-zeus-surface-neutral transition-colors"
                title={copied ? "Copied!" : "Copy contract address"}
              >
                {copied ? (
                  <Check className="w-3 h-3 text-zeus-status-success" />
                ) : (
                  <Copy className="w-3 h-3 text-zeus-text-tertiary" />
                )}
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-zeus-text-primary font-semibold text-body-s">{ticker}</span>
              <div className="text-caption-s truncate">
                <span className="text-zeus-text-secondary">{name}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Price badge */}
              <div className={`px-3 py-1.5 rounded-lg text-caption-l font-bold text-white ${
                priceChange === "up"
                  ? "bg-zeus-accent-green"
                  : "bg-zeus-accent-red"
              }`}>
                {price} {priceChange === "up" ? "▲" : "▼"}
              </div>
              {/* Inline Elimination Progress */}
              {rank !== undefined && totalAgents !== undefined && eliminationThreshold && (
                <EliminationProgress
                  rank={rank}
                  totalAgents={totalAgents}
                  marketCap={marketCap}
                  eliminationThreshold={eliminationThreshold}
                  variant="inline"
                />
              )}
            </div>
          </div>

          {/* Model Hash + View Model Row */}
          <ModelHash
            hash={tokenAddress}
            versions={modelVersions}
            modelName={name}
            modelUrl={huggingFaceUrl}
          />

          {/* Description */}
          {description && (
            <p className="text-zeus-text-secondary text-caption-l leading-relaxed">{description}</p>
          )}

          {/* Stats Grid - 3 cols top, 4 cols bottom */}
          <div className="space-y-1.5">
            <StatsGrid
              items={[
                { label: "MCAP", value: marketCap },
                { label: "VOL", value: volume24h },
                { label: "TVL", value: tvl },
              ]}
              columns={3}
            />
            <StatsGrid
              items={[
                { label: "1H", value: change1h, change: change1h },
                { label: "24H", value: change24h, change: change24h },
                { label: "7D", value: change7d, change: change7d },
                { label: "30D", value: change30d, change: change30d },
              ]}
              columns={4}
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-zeus-border-alpha" />

          {/* Swap Widget */}
          <SwapWidget
            payToken={payToken}
            receiveToken={receiveToken}
            isLoading={false}
            isSwapping={!isActive}
            onRefresh={onRefresh}
            onSwap={onSwap}
          />
        </CardContent>
      </Card>
    )
  }
)

TokenSwapCard.displayName = "TokenSwapCard"

export { TokenSwapCard }
