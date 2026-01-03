"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface SwapWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  ticker: string
  isActive?: boolean
  fee?: string
  onBuy?: (amount: string) => void
  onSell?: (amount: string) => void
  onSetMaxSlippage?: () => void
}

const SwapWidget = React.forwardRef<HTMLDivElement, SwapWidgetProps>(
  (
    {
      className,
      ticker,
      isActive = false,
      fee = "0.5%",
      onBuy,
      onSell,
      onSetMaxSlippage,
      ...props
    },
    ref
  ) => {
    const [mode, setMode] = React.useState<"buy" | "sell">("buy")
    const [payAmount, setPayAmount] = React.useState("")
    const [receiveAmount, setReceiveAmount] = React.useState("")

    const handleSubmit = () => {
      if (mode === "buy") {
        onBuy?.(payAmount)
      } else {
        onSell?.(receiveAmount)
      }
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
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-zeus-text-primary">Swap</CardTitle>
            <div className="flex items-center gap-1 bg-zeus-surface-default rounded-full p-1">
              <button
                onClick={() => setMode("buy")}
                className={cn(
                  "px-4 py-1.5 rounded-full text-caption-l font-medium transition-colors",
                  mode === "buy"
                    ? "bg-sedona-500 text-white"
                    : "text-zeus-text-secondary hover:text-zeus-text-primary"
                )}
              >
                Buy
              </button>
              <button
                onClick={() => setMode("sell")}
                className={cn(
                  "px-4 py-1.5 rounded-full text-caption-l font-medium transition-colors",
                  mode === "sell"
                    ? "bg-zeus-surface-neutral-subtle text-zeus-text-primary"
                    : "text-zeus-text-secondary hover:text-zeus-text-primary"
                )}
              >
                Sell
              </button>
            </div>
          </div>

          {/* Warning message when not active */}
          {!isActive && (
            <p className="text-zeus-status-warning text-caption-m mt-2">
              Game is no longer active. Trades will fail.
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Pay Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-zeus-text-secondary text-caption-m">
                You Pay (SOL)
              </label>
              <button
                onClick={onSetMaxSlippage}
                className="text-zeus-text-secondary text-caption-s underline hover:text-zeus-text-primary transition-colors"
              >
                Set Max Slippage
              </button>
            </div>
            <Input
              type="text"
              placeholder="0.00"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              className="bg-zeus-surface-default border-zeus-border-alpha text-zeus-text-primary text-body-s"
            />
          </div>

          {/* Receive Input */}
          <div>
            <label className="text-zeus-text-secondary text-caption-m block mb-1">
              You Receive ({ticker})
            </label>
            <Input
              type="text"
              placeholder="Enter an amount"
              value={receiveAmount}
              onChange={(e) => setReceiveAmount(e.target.value)}
              className="bg-zeus-surface-default border-zeus-border-alpha text-zeus-text-primary text-body-s"
            />
          </div>

          {/* Buy/Sell Button */}
          <Button
            variant="brand"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={!isActive}
          >
            {mode === "buy" ? "Buy" : "Sell"}
          </Button>

          {/* Fee */}
          <p className="text-zeus-text-tertiary text-caption-m">
            Fee: {fee}
          </p>
        </CardContent>
      </Card>
    )
  }
)

SwapWidget.displayName = "SwapWidget"

export { SwapWidget }
