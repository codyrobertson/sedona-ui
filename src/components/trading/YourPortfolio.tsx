"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface PortfolioHolding {
  ticker: string
  name: string
  value: string
  quantity: string
  change24h: number
}

export interface YourPortfolioProps extends React.HTMLAttributes<HTMLDivElement> {
  holdings?: PortfolioHolding[]
  sortBy?: string
  onSortChange?: (sort: string) => void
  currency?: "USD" | "SOL"
  onCurrencyChange?: (currency: "USD" | "SOL") => void
  portfolioValue?: string
}

const YourPortfolio = React.forwardRef<HTMLDivElement, YourPortfolioProps>(
  ({
    className,
    holdings = [],
    sortBy = "Highest Value",
    onSortChange,
    currency = "USD",
    onCurrencyChange,
    portfolioValue,
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
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-heading-m font-semibold text-zeus-text-primary mb-2">
              Your Portfolio
            </h2>
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-1 text-zeus-text-secondary text-caption-l hover:text-zeus-text-primary transition-colors"
              >
                <span className="text-zeus-text-tertiary">Sorting by</span>
                <span className="font-medium">{sortBy}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showSortMenu && (
                <div className="absolute top-full left-0 mt-1 bg-zeus-surface-elevated border border-zeus-border-alpha rounded shadow-lg z-10 min-w-[160px]">
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

          {/* Currency Toggle */}
          <div className="flex items-center rounded overflow-hidden border border-zeus-border-alpha">
            <button
              onClick={() => onCurrencyChange?.("USD")}
              className={cn(
                "px-4 py-1.5 text-caption-l font-medium transition-colors",
                currency === "USD"
                  ? "bg-sedona-500 text-white"
                  : "bg-transparent text-zeus-text-secondary hover:text-zeus-text-primary"
              )}
            >
              USD
            </button>
            <button
              onClick={() => onCurrencyChange?.("SOL")}
              className={cn(
                "px-4 py-1.5 text-caption-l font-medium transition-colors",
                currency === "SOL"
                  ? "bg-sedona-500 text-white"
                  : "bg-transparent text-zeus-text-secondary hover:text-zeus-text-primary"
              )}
            >
              SOL
            </button>
          </div>
        </div>

        {/* Portfolio Value Stat */}
        <div className="inline-flex items-center gap-3 bg-zeus-surface-neutral border border-zeus-border-alpha rounded px-4 py-3 mb-8">
          <span className="text-zeus-text-secondary text-caption-l">Portfolio Value</span>
          <span className="text-zeus-text-primary text-body-m font-semibold">
            {portfolioValue || "—"}
          </span>
        </div>

        {/* Holdings or Empty State */}
        {holdings.length > 0 ? (
          <div className="space-y-2">
            {holdings.map((holding) => (
              <div
                key={holding.ticker}
                className="flex items-center justify-between p-4 bg-zeus-surface-neutral border border-zeus-border-alpha rounded hover:bg-zeus-surface-elevated transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zeus-surface-elevated flex items-center justify-center text-caption-l font-medium text-zeus-text-primary">
                    {holding.ticker.charAt(0)}
                  </div>
                  <div>
                    <div className="text-zeus-text-primary text-body-s font-medium">
                      {holding.ticker}
                    </div>
                    <div className="text-zeus-text-tertiary text-caption-s">
                      {holding.quantity}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-zeus-text-primary text-body-s font-medium">
                    {holding.value}
                  </div>
                  <div
                    className={cn(
                      "text-caption-s",
                      holding.change24h >= 0
                        ? "text-zeus-status-success"
                        : "text-zeus-status-destructive"
                    )}
                  >
                    {holding.change24h >= 0 ? "+" : ""}
                    {holding.change24h.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-16">
            <p className="text-zeus-text-primary text-body-m font-semibold">
              No portfolio found for the current competition
            </p>
          </div>
        )}
      </div>
    )
  }
)

YourPortfolio.displayName = "YourPortfolio"

export { YourPortfolio }
