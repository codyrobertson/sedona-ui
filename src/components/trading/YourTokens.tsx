"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
          <CardTitle className="text-lg text-zeus-text-primary">
            Your Tokens
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!isConnected ? (
            <p className="text-zeus-text-secondary text-caption-l">
              You must connect to see your balance
            </p>
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
            <p className="text-zeus-text-secondary text-caption-l">
              No tokens found
            </p>
          )}
        </CardContent>
      </Card>
    )
  }
)

YourTokens.displayName = "YourTokens"

export { YourTokens }
