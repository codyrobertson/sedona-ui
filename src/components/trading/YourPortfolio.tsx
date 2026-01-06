"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { TokenAvatar } from "@/components/ui/token-avatar"
import { EmptyState } from "@/components/ui/empty-state"

export interface PortfolioHolding {
  ticker: string
  name: string
  amount: string
  value: string
  price: string
  change24h: number
}

export interface PortfolioSummary {
  totalValue: string
  pnl24h: string
  pnl24hPercent: number
  pnl7d: string
  pnl7dPercent: number
  tokenCount: number
}

export interface YourPortfolioProps extends React.HTMLAttributes<HTMLDivElement> {
  holdings?: PortfolioHolding[]
  summary?: PortfolioSummary
  sortBy?: string
  onSortChange?: (sort: string) => void
  currency?: "USD" | "SOL"
  onCurrencyChange?: (currency: "USD" | "SOL") => void
}

const YourPortfolio = React.forwardRef<HTMLDivElement, YourPortfolioProps>(
  ({
    className,
    holdings = [],
    summary,
    sortBy = "Highest Value",
    onSortChange,
    currency = "USD",
    onCurrencyChange,
    ...props
  }, ref) => {
    const sortOptions = [
      "Highest Value",
      "Lowest Value",
      "Highest Gain",
      "Highest Loss",
      "Alphabetical",
    ]

    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-zeus-text-primary">
              Your Portfolio
            </h2>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger
                className="h-auto w-auto gap-1 border-0 bg-transparent px-0 py-0 text-caption-l text-zeus-text-tertiary shadow-none hover:text-zeus-text-secondary focus:ring-0"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zeus-surface-elevated border-zeus-border-alpha min-w-[140px]">
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className={cn(
                      "text-caption-l hover:bg-zeus-surface-neutral cursor-pointer",
                      option === sortBy
                        ? "text-sedona-500"
                        : "text-zeus-text-primary"
                    )}
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary Stats */}
          <div className="flex items-center gap-3">
            <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg px-4 py-2">
              <span className="text-zeus-text-tertiary text-caption-l">Value</span>
              <span className="text-zeus-text-primary text-body-m font-bold ml-2">
                {summary?.totalValue || "—"}
              </span>
            </div>
            <div className="bg-zeus-surface-elevated border border-zeus-border-alpha rounded-lg px-4 py-2">
              <span className="text-zeus-text-tertiary text-caption-l">Tokens</span>
              <span className="text-zeus-text-primary text-body-m font-bold ml-2">
                {summary?.tokenCount ?? "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Holdings Table or Empty State */}
        {holdings.length > 0 ? (
          <div className="rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-zeus-surface-elevated border border-zeus-border-alpha border-b-0 rounded-t-xl">
              <span className="text-body-m font-bold text-zeus-text-primary">Holdings</span>
              <ToggleGroup
                type="single"
                value={currency}
                onValueChange={(value) => {
                  if (value) onCurrencyChange?.(value as "USD" | "SOL")
                }}
                className="gap-0 rounded overflow-hidden border border-zeus-border-alpha"
              >
                <ToggleGroupItem
                  value="USD"
                  className={cn(
                    "h-auto rounded-none px-2.5 py-1 text-caption-s font-medium transition-colors",
                    currency === "USD"
                      ? "bg-sedona-500 text-white hover:bg-sedona-500 hover:text-white data-[state=on]:bg-sedona-500 data-[state=on]:text-white"
                      : "bg-transparent text-zeus-text-tertiary hover:bg-transparent hover:text-zeus-text-primary data-[state=off]:bg-transparent"
                  )}
                >
                  USD
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="SOL"
                  className={cn(
                    "h-auto rounded-none px-2.5 py-1 text-caption-s font-medium transition-colors",
                    currency === "SOL"
                      ? "bg-sedona-500 text-white hover:bg-sedona-500 hover:text-white data-[state=on]:bg-sedona-500 data-[state=on]:text-white"
                      : "bg-transparent text-zeus-text-tertiary hover:bg-transparent hover:text-zeus-text-primary data-[state=off]:bg-transparent"
                  )}
                >
                  SOL
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Table */}
            <div className="bg-zeus-surface-elevated border border-zeus-border-alpha border-t-0 rounded-b-xl">
              {/* Table Header Row */}
              <div className="grid grid-cols-[1fr_100px_100px_80px_80px] gap-3 px-4 py-3 border-b border-zeus-border-alpha text-zeus-text-secondary text-body-s font-semibold">
                <div>Token</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Value</div>
                <div className="text-right">24H</div>
                <div className="text-right">Action</div>
              </div>

              {/* Table Body */}
              {holdings.map((holding) => (
                <div
                  key={holding.ticker}
                  className="grid grid-cols-[1fr_100px_100px_80px_80px] gap-3 px-4 py-3 border-b border-zeus-border-alpha last:border-b-0 items-center hover:bg-zeus-surface-neutral/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <TokenAvatar ticker={holding.ticker} size="md" />
                    <div>
                      <div className="text-zeus-text-primary text-body-s font-semibold">
                        {holding.ticker}
                      </div>
                      <div className="text-zeus-text-tertiary text-caption-s">
                        {holding.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-zeus-text-primary text-body-s font-mono">
                    {holding.amount}
                  </div>
                  <div className="text-right text-zeus-text-primary text-body-s font-semibold">
                    {holding.value}
                  </div>
                  <div className={cn(
                    "text-right text-body-s font-semibold",
                    holding.change24h >= 0
                      ? "text-zeus-status-success"
                      : "text-zeus-status-destructive"
                  )}>
                    {holding.change24h >= 0 ? "+" : ""}{holding.change24h.toFixed(1)}%
                  </div>
                  <div className="text-right">
                    <Link
                      href={`/trading/${holding.ticker.toLowerCase()}`}
                      className="inline-flex px-3 py-1.5 rounded-md bg-zeus-surface-neutral border border-zeus-border-alpha text-zeus-text-primary text-caption-s font-medium hover:bg-zeus-surface-default transition-colors"
                    >
                      Trade
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            icon="📊"
            title="No holdings yet"
            description="Start trading to build your portfolio"
          />
        )}
      </div>
    )
  }
)

YourPortfolio.displayName = "YourPortfolio"

export { YourPortfolio }
