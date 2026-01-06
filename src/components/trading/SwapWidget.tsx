"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RefreshCw, Settings, ChevronDown, ArrowUpDown, Wallet } from "lucide-react"
import { useSwapLogic } from "@/hooks/useSwapLogic"

export interface SwapWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  ticker: string
  payToken?: string
  payBalance?: string
  receiveBalance?: string
  slippage?: string
  fee?: string
  isActive?: boolean
  onRefresh?: () => void
  onSlippageSettings?: () => void
  onSwap?: (payAmount: string, receiveAmount: string) => void
}

const SwapWidget = React.forwardRef<HTMLDivElement, SwapWidgetProps>(
  (
    {
      className,
      ticker,
      payToken = "SOL",
      payBalance = "200",
      receiveBalance = "0",
      slippage = "Auto",
      fee = "0.5%",
      isActive = true,
      onRefresh,
      onSlippageSettings,
      onSwap,
      ...props
    },
    ref
  ) => {
    const {
      payAmount,
      receiveAmount,
      setPayAmount,
      setReceiveAmount,
      handleQuickAmount,
      handleFlip,
    } = useSwapLogic({ balance: payBalance })

    return (
      <Card
        ref={ref}
        className={cn(
          "bg-zeus-surface-neutral border-zeus-border-alpha",
          className
        )}
        {...props}
      >
        <CardContent className="p-3 space-y-2.5">
          {/* Header Row: Refresh + Slippage */}
          <div className="flex items-center justify-between">
            <button
              onClick={onRefresh}
              className="p-1 rounded-lg hover:bg-zeus-surface-elevated transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-zeus-text-tertiary" />
            </button>
            <button
              onClick={onSlippageSettings}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zeus-surface-elevated text-[10px] transition-colors"
            >
              <span className="text-zeus-text-tertiary">Slippage:</span>
              <span className="text-sedona-500 font-medium">{slippage}</span>
              <Settings className="w-3 h-3 text-zeus-text-tertiary" />
            </button>
          </div>

          {/* Pay With Section */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-zeus-text-primary text-caption-s font-medium">Pay With</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleQuickAmount(25)}
                  className="px-1.5 py-0.5 rounded bg-zeus-surface-elevated border border-zeus-border-alpha text-[10px] text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
                >
                  25%
                </button>
                <button
                  onClick={() => handleQuickAmount(50)}
                  className="px-1.5 py-0.5 rounded bg-zeus-surface-elevated border border-zeus-border-alpha text-[10px] text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors"
                >
                  50%
                </button>
                <button
                  onClick={() => handleQuickAmount(100)}
                  className="px-1.5 py-0.5 rounded bg-zeus-surface-elevated border border-zeus-border-alpha text-[10px] text-zeus-text-tertiary hover:text-zeus-text-secondary transition-colors flex items-center gap-0.5"
                >
                  <span>🚀</span> Full Stack
                </button>
              </div>
            </div>

            {/* Pay Input with Token Selector */}
            <div className="relative">
              <Input
                type="text"
                placeholder="0.00"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="bg-zeus-surface-default border-zeus-border-alpha text-zeus-text-primary text-body-s h-10 pr-20"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-1 rounded-lg bg-zeus-surface-elevated transition-colors">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center">
                  <span className="text-[7px] font-bold text-white">◎</span>
                </div>
                <span className="text-zeus-text-primary text-caption-s font-medium">{payToken}</span>
                <ChevronDown className="w-3 h-3 text-zeus-text-tertiary" />
              </button>
            </div>

            {/* Balance */}
            <div className="flex items-center gap-1 text-[10px] text-zeus-text-tertiary">
              <Wallet className="w-3 h-3" />
              <span>Balance: {payBalance} {payToken}</span>
            </div>
          </div>

          {/* Swap Direction Toggle with lines */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-zeus-border-alpha" />
            <button
              onClick={handleFlip}
              className="p-1.5 rounded-full bg-zeus-surface-elevated border border-zeus-border-alpha hover:bg-zeus-surface-neutral-subtle transition-all"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-zeus-text-secondary" />
            </button>
            <div className="flex-1 h-px bg-zeus-border-alpha" />
          </div>

          {/* To Receive Section */}
          <div className="space-y-1.5">
            <span className="text-zeus-text-primary text-caption-s font-medium">To Receive</span>

            {/* Receive Input with Token Selector */}
            <div className="relative">
              <Input
                type="text"
                placeholder="0.00"
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(e.target.value)}
                className="bg-zeus-surface-default border-zeus-border-alpha text-zeus-text-primary text-body-s h-10 pr-20"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-1 rounded-lg bg-zeus-surface-elevated transition-colors">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-sedona-500 to-sedona-600 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-white">{ticker.charAt(0)}</span>
                </div>
                <span className="text-zeus-text-primary text-caption-s font-medium">{ticker}</span>
                <ChevronDown className="w-3 h-3 text-zeus-text-tertiary" />
              </button>
            </div>

            {/* Balance */}
            <div className="flex items-center gap-1 text-[10px] text-zeus-text-tertiary">
              <Wallet className="w-3 h-3" />
              <span>Balance: {receiveBalance} {ticker}</span>
            </div>
          </div>

          {/* Swap Button */}
          <Button
            variant="outline"
            size="default"
            className="w-full h-10 !bg-white hover:!bg-gray-100 !text-black !text-sm font-semibold"
            onClick={() => onSwap?.(payAmount, receiveAmount)}
            disabled={!isActive || !payAmount}
          >
            Swap Tokens
          </Button>

          {/* Minimum Received */}
          {payAmount && !isNaN(parseFloat(payAmount)) && (
            <div className="flex items-center justify-center gap-1 text-[10px] text-zeus-text-tertiary">
              <span>⊕</span>
              <span>Minimum Received: {(parseFloat(payAmount) * 1000).toFixed(0)} {ticker}</span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)

SwapWidget.displayName = "SwapWidget"

export { SwapWidget }
