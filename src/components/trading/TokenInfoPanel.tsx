"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useClipboard } from "@/hooks/useClipboard"
import {
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  Check,
  ChevronUp,
  Plus,
  ExternalLink,
} from "lucide-react"

export interface TokenInfoPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  // Core info
  name: string
  ticker: string
  price: string
  priceChange: "up" | "down"
  avatarUrl?: string

  // Links
  huggingFaceUrl?: string
  tokenAddress: string

  // Expandable details
  creatorAddress?: string
  totalSupply?: string
  createdAt?: string

  // Tags
  modelTypes?: string[]
  onSuggestTag?: () => void

  // Stats
  marketCap: string
  volume24h: string
  tvl: string

  // Price changes
  change1h: number
  change24h: number
  change7d: number
  change30d: number
}

const formatChange = (value: number): string => {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(1)}%`
}

const getChangeColor = (value: number): string => {
  return value >= 0 ? "text-zeus-status-success" : "text-zeus-status-destructive"
}

const truncateAddress = (address: string): string => {
  if (address.length <= 16) return address
  return `${address.slice(0, 8)}...${address.slice(-6)}`
}

const TokenInfoPanel = React.forwardRef<HTMLDivElement, TokenInfoPanelProps>(
  (
    {
      className,
      name,
      ticker,
      price,
      priceChange,
      avatarUrl,
      huggingFaceUrl,
      tokenAddress,
      creatorAddress,
      totalSupply,
      createdAt,
      modelTypes = [],
      onSuggestTag,
      marketCap,
      volume24h,
      tvl,
      change1h,
      change24h,
      change7d,
      change30d,
      ...props
    },
    ref
  ) => {
    const [detailsOpen, setDetailsOpen] = React.useState(false)
    const { copy, copied } = useClipboard()

    const isUp = priceChange === "up"

    return (
      <Card
        ref={ref}
        className={cn(
          "bg-zeus-surface-neutral border-zeus-border-alpha",
          className
        )}
        {...props}
      >
        <CardContent className="p-4 space-y-3">
          {/* Header: Avatar + Name/Ticker + Price */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-zeus-surface-elevated border border-zeus-border-alpha flex items-center justify-center text-xl font-bold text-zeus-text-secondary overflow-hidden flex-shrink-0">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                ticker.charAt(0)
              )}
            </div>
            {/* Name / Ticker + Price */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-zeus-text-primary text-body-m font-semibold truncate">
                  {ticker}
                </span>
                <span className="text-zeus-text-tertiary text-caption-l">/SOL</span>
              </div>
              <div className="text-zeus-text-secondary text-caption-s truncate">{name}</div>
            </div>
            {/* Price Badge */}
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-caption-s font-semibold border flex-shrink-0",
                isUp
                  ? "bg-zeus-status-success/10 border-zeus-status-success/40 text-zeus-status-success"
                  : "bg-zeus-status-destructive/10 border-zeus-status-destructive/40 text-zeus-status-destructive"
              )}
            >
              {price}
              {isUp ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
            </div>
          </div>

          {/* HuggingFace Link */}
          {huggingFaceUrl && (
            <a
              href={huggingFaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-caption-l text-zeus-text-secondary hover:text-sedona-500 transition-colors"
            >
              <span className="text-base">🤗</span>
              <span>View on HuggingFace</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {/* Token Address */}
          <div className="space-y-1.5">
            <span className="text-zeus-text-tertiary text-caption-s">Token Address</span>
            <div className="flex items-center gap-2">
              <span className="text-zeus-text-secondary text-caption-l font-mono">
                {truncateAddress(tokenAddress)}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => copy(tokenAddress)}
                      className="p-1 rounded hover:bg-zeus-surface-elevated transition-colors"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-zeus-status-success" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-zeus-text-tertiary" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? "Copied!" : "Copy address"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* View Details Expandable */}
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-zeus-surface-elevated border border-zeus-border-alpha text-caption-s text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
          >
            View Details
            {detailsOpen ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
          </button>

          {detailsOpen && (
            <div className="p-2.5 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha space-y-1.5">
              {creatorAddress && (
                <div className="flex items-center justify-between text-caption-s">
                  <span className="text-zeus-text-tertiary">Creator</span>
                  <span className="text-zeus-text-secondary font-mono text-[10px]">
                    {truncateAddress(creatorAddress)}
                  </span>
                </div>
              )}
              {totalSupply && (
                <div className="flex items-center justify-between text-caption-s">
                  <span className="text-zeus-text-tertiary">Total Supply</span>
                  <span className="text-zeus-text-primary font-medium">{totalSupply}</span>
                </div>
              )}
              {createdAt && (
                <div className="flex items-center justify-between text-caption-s">
                  <span className="text-zeus-text-tertiary">Created</span>
                  <span className="text-zeus-text-secondary">{createdAt}</span>
                </div>
              )}
            </div>
          )}

          {/* Model Types Tags */}
          <div className="space-y-1.5">
            <span className="text-zeus-text-quaternary text-[10px] uppercase tracking-wide">Model Type</span>
            <div className="flex flex-wrap items-center gap-1.5">
              {modelTypes.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-zeus-surface-elevated border border-zeus-border-alpha text-[11px] text-zeus-text-secondary"
                >
                  # {tag}
                </span>
              ))}
              <button
                className="px-2 py-0.5 rounded border border-dashed border-zeus-border-alpha text-[11px] text-zeus-text-tertiary hover:text-zeus-text-secondary hover:border-zeus-border-normal transition-colors"
                onClick={onSuggestTag}
              >
                SUGGEST +
              </button>
            </div>
          </div>

          {/* Stats Grid: MCAP | VOL | TVL */}
          <div className="grid grid-cols-3 gap-1.5">
            <div className="py-2 px-2 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha text-center">
              <div className="text-zeus-text-quaternary text-[10px] uppercase tracking-wide">MCAP</div>
              <div className="text-zeus-text-primary text-caption-l font-semibold">{marketCap}</div>
            </div>
            <div className="py-2 px-2 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha text-center">
              <div className="text-zeus-text-quaternary text-[10px] uppercase tracking-wide">VOL</div>
              <div className="text-zeus-text-primary text-caption-l font-semibold">{volume24h}</div>
            </div>
            <div className="py-2 px-2 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha text-center">
              <div className="text-zeus-text-quaternary text-[10px] uppercase tracking-wide">TVL</div>
              <div className="text-zeus-text-primary text-caption-l font-semibold">{tvl}</div>
            </div>
          </div>

          {/* Price Changes Grid: 1H | 24H | 7D | 30D */}
          <div className="grid grid-cols-4 gap-1.5">
            <div className="py-2 px-1 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha text-center">
              <div className="text-zeus-text-quaternary text-[10px] uppercase tracking-wide">1H</div>
              <div className={cn("text-caption-s font-semibold", getChangeColor(change1h))}>
                {formatChange(change1h)}
              </div>
            </div>
            <div className="py-2 px-1 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha text-center">
              <div className="text-zeus-text-quaternary text-[10px] uppercase tracking-wide">24H</div>
              <div className={cn("text-caption-s font-semibold", getChangeColor(change24h))}>
                {formatChange(change24h)}
              </div>
            </div>
            <div className="py-2 px-1 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha text-center">
              <div className="text-zeus-text-quaternary text-[10px] uppercase tracking-wide">7D</div>
              <div className={cn("text-caption-s font-semibold", getChangeColor(change7d))}>
                {formatChange(change7d)}
              </div>
            </div>
            <div className="py-2 px-1 rounded-lg bg-zeus-surface-elevated border border-zeus-border-alpha text-center">
              <div className="text-zeus-text-quaternary text-[10px] uppercase tracking-wide">30D</div>
              <div className={cn("text-caption-s font-semibold", getChangeColor(change30d))}>
                {formatChange(change30d)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)

TokenInfoPanel.displayName = "TokenInfoPanel"

export { TokenInfoPanel }
