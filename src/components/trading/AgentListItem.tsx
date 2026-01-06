"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

export interface AgentListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  rank: number
  name: string
  ticker: string
  description: string
  avatarUrl?: string
  avatarFallback?: string
  change24h: number
  marketCap: string
  volume?: string
  volumeChange?: number
  onSelect?: () => void
}

const AgentListItem = React.forwardRef<HTMLDivElement, AgentListItemProps>(
  (
    {
      className,
      rank,
      name,
      ticker,
      description,
      avatarUrl,
      avatarFallback,
      change24h,
      marketCap,
      volume,
      volumeChange = 0,
      onSelect,
      ...props
    },
    ref
  ) => {
    const isPositive = change24h >= 0
    const isVolumePositive = volumeChange >= 0
    const changeColor = isPositive ? "text-zeus-status-success" : "text-zeus-status-destructive"
    const volumeColor = volume ? (isVolumePositive ? "text-zeus-status-success" : "text-zeus-status-destructive") : "text-zeus-text-quaternary"
    const changePrefix = isPositive ? "+" : ""

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-[auto_1fr_100px_100px_100px] gap-4 px-4 py-4 hover:bg-zeus-surface-elevated/50 transition-colors cursor-pointer items-center",
          className
        )}
        onClick={onSelect}
        {...props}
      >
        {/* Rank + Avatar */}
        <div className="flex items-center gap-3">
          <span className="text-zeus-text-secondary text-caption-l w-4">{rank}.</span>
          <Avatar className="w-10 h-10 border-2 border-sedona-500/30">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-gradient-to-br from-sedona-500/20 to-sedona-600/30 text-sedona-500 font-semibold text-caption-l">
              {avatarFallback || name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Token Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-zeus-text-primary font-semibold hover:text-sedona-500 transition-colors">
              {name}
            </span>
            <Badge variant="default" className="text-[11px] px-1.5 py-0.5 h-5">
              ${ticker}
            </Badge>
          </div>
          <p className="text-zeus-text-tertiary text-caption-m mt-0.5 truncate">
            {description}
          </p>
        </div>

        {/* Change */}
        <div className={cn("text-right font-semibold", changeColor)}>
          {changePrefix}{change24h.toFixed(2)}%
        </div>

        {/* Market Cap */}
        <div className="text-right text-zeus-text-primary font-semibold">
          {marketCap}
        </div>

        {/* Volume */}
        <div className={cn("text-right font-semibold flex items-center justify-end gap-1", volumeColor)}>
          {volume ? (
            <>
              {volume}
              {isVolumePositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
            </>
          ) : (
            <span className="text-zeus-text-quaternary">---</span>
          )}
        </div>
      </div>
    )
  }
)

AgentListItem.displayName = "AgentListItem"

export { AgentListItem }
