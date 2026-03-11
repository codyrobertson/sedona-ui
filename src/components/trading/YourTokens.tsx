"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"

export interface TokenBalance {
  ticker: string
  balance: string
  value?: string
}

export interface YourTokensProps extends React.HTMLAttributes<HTMLDivElement> {
  tokens?: TokenBalance[]
  isConnected?: boolean
}

const YourTokens = React.forwardRef<HTMLDivElement, YourTokensProps>(
  ({ className, tokens = [], isConnected = false, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "bg-zeus-surface-neutral border-zeus-border-alpha",
          className
        )}
        {...props}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-heading-xs text-zeus-text-primary">
            Your Tokens
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!isConnected ? (
            <EmptyState
              className="border-0 bg-transparent px-0 py-6"
              eyebrow="Wallet"
              icon={<Icon icon="wallet" className="h-6 w-6" />}
              title="Connect wallet to load balances"
              description="Attach a wallet to inspect balances, buying power, and agent token exposure in one place."
              analytics={{
                surface: "your_tokens",
                variant: "wallet_disconnected",
              }}
            />
          ) : tokens.length > 0 ? (
            <div className="space-y-3">
              {tokens.map((token) => (
                <div
                  key={token.ticker}
                  className="flex items-center justify-between"
                >
                  <span className="text-zeus-text-primary font-medium">
                    ${token.ticker}
                  </span>
                  <div className="text-right">
                    <div className="text-zeus-text-primary font-semibold">
                      {token.balance}
                    </div>
                    {token.value && (
                      <div className="text-zeus-text-tertiary text-caption-s">
                        {token.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              className="border-0 bg-transparent px-0 py-6"
              eyebrow="Balances"
              icon={<Icon icon="coins" className="h-6 w-6" />}
              title="No tokens in this wallet yet"
              description="Once you buy agent tokens or settle trades, they will show up here with balances and value."
              analytics={{
                surface: "your_tokens",
                variant: "wallet_empty",
              }}
            />
          )}
        </CardContent>
      </Card>
    )
  }
)

YourTokens.displayName = "YourTokens"

export { YourTokens }
