"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

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
    const [showSortMenu, setShowSortMenu] = React.useState(false)

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
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-1 text-zeus-text-tertiary text-caption-l hover:text-zeus-text-secondary transition-colors"
              >
                <span>{sortBy}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showSortMenu && (
                <div className="absolute top-full left-0 mt-1 bg-zeus-surface-elevated border border-zeus-border-alpha rounded shadow-lg z-10 min-w-[140px]">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        onSortChange?.(option)
                        setShowSortMenu(false)
                      }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-caption-l hover:bg-zeus-surface-neutral transition-colors",
                        option === sortBy
                          ? "text-sedona-500"
                          : "text-zeus-text-primary"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
              <div className="flex items-center rounded overflow-hidden border border-zeus-border-alpha">
                <button
                  onClick={() => onCurrencyChange?.("USD")}
                  className={cn(
                    "px-2.5 py-1 text-caption-s font-medium transition-colors",
                    currency === "USD"
                      ? "bg-sedona-500 text-white"
                      : "bg-transparent text-zeus-text-tertiary hover:text-zeus-text-primary"
                  )}
                >
                  USD
                </button>
                <button
                  onClick={() => onCurrencyChange?.("SOL")}
                  className={cn(
                    "px-2.5 py-1 text-caption-s font-medium transition-colors",
                    currency === "SOL"
                      ? "bg-sedona-500 text-white"
                      : "bg-transparent text-zeus-text-tertiary hover:text-zeus-text-primary"
                  )}
                >
                  SOL
                </button>
              </div>
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
                    <div className="w-8 h-8 rounded-full bg-zeus-surface-neutral border border-zeus-border-alpha flex items-center justify-center text-caption-l font-bold text-zeus-text-secondary">
                      {holding.ticker.charAt(0)}
                    </div>
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
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-zeus-text-primary text-body-m font-semibold mb-1">
              No holdings yet
            </h3>
            <p className="text-zeus-text-tertiary text-caption-l">
              Start trading to build your portfolio
            </p>
          </div>
        )}
      </div>
    )
  }
)

YourPortfolio.displayName = "YourPortfolio"

export { YourPortfolio }
