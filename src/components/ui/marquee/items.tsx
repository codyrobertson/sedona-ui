"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"

// ============================================================================
// TOKEN ITEM - For displaying token/pool info in marquee
// ============================================================================

export interface TokenItemProps extends React.HTMLAttributes<HTMLDivElement> {
  ticker: string
  price: string
  change: number
  showIcon?: boolean
}

const TokenItem = React.forwardRef<HTMLDivElement, TokenItemProps>(
  ({ ticker, price, change, showIcon = true, className, ...props }, ref) => {
    const isPositive = change >= 0

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-4 font-mono text-caption-m",
          className
        )}
        {...props}
      >
        <span className="text-zeus-text-primary font-medium">${ticker}</span>
        <span className="text-zeus-text-secondary">{price}</span>
        <span
          className={cn(
            "flex items-center gap-0.5",
            isPositive ? "text-zeus-status-success" : "text-zeus-status-destructive"
          )}
        >
          {isPositive ? "+" : ""}
          {change.toFixed(2)}%
          {showIcon && (
            isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )
          )}
        </span>
      </div>
    )
  }
)
TokenItem.displayName = "TokenItem"

// ============================================================================
// TRADE ITEM - For displaying recent trades in marquee
// ============================================================================

export interface TradeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "buy" | "sell"
  amount: string
  price: string
  time: string
  showIcon?: boolean
}

const TradeItem = React.forwardRef<HTMLDivElement, TradeItemProps>(
  ({ type, amount, price, time, showIcon = true, className, ...props }, ref) => {
    const isBuy = type === "buy"

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-4 font-mono text-caption-m",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "flex items-center gap-1 font-medium",
            isBuy ? "text-zeus-status-success" : "text-zeus-status-destructive"
          )}
        >
          {showIcon && (
            isBuy ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )
          )}
          {isBuy ? "BUY" : "SELL"}
        </span>
        <span className="text-zeus-text-primary">{amount}</span>
        <span className="text-zeus-text-tertiary">@</span>
        <span className="text-zeus-text-secondary">{price}</span>
        <span className="text-zeus-text-quaternary">{time}</span>
      </div>
    )
  }
)
TradeItem.displayName = "TradeItem"

// ============================================================================
// NEWS ITEM - For displaying news/announcements
// ============================================================================

export interface NewsItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  labelColor?: "info" | "warning" | "success" | "destructive"
  text: string
}

const NewsItem = React.forwardRef<HTMLDivElement, NewsItemProps>(
  ({ label, labelColor = "info", text, className, ...props }, ref) => {
    const labelColors = {
      info: "bg-zeus-accent-blue text-white",
      warning: "bg-zeus-accent-orange text-white",
      success: "bg-zeus-accent-green text-white",
      destructive: "bg-zeus-accent-red text-white",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-3 px-4",
          className
        )}
        {...props}
      >
        {label && (
          <span
            className={cn(
              "px-2 py-0.5 rounded text-caption-s font-semibold uppercase",
              labelColors[labelColor]
            )}
          >
            {label}
          </span>
        )}
        <span className="text-zeus-text-primary text-caption-m">{text}</span>
      </div>
    )
  }
)
NewsItem.displayName = "NewsItem"

// ============================================================================
// STAT ITEM - For displaying stats/metrics
// ============================================================================

export interface StatItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  icon?: React.ReactNode
}

const StatItem = React.forwardRef<HTMLDivElement, StatItemProps>(
  ({ label, value, icon, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 px-4",
          className
        )}
        {...props}
      >
        {icon && (
          <span className="text-zeus-text-tertiary">{icon}</span>
        )}
        <span className="text-zeus-text-tertiary text-caption-m">{label}</span>
        <span className="text-zeus-text-primary text-caption-m font-semibold">{value}</span>
      </div>
    )
  }
)
StatItem.displayName = "StatItem"

// ============================================================================
// LOGO ITEM - For displaying partner/sponsor logos
// ============================================================================

export interface LogoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  width?: number
  height?: number
  grayscale?: boolean
}

const LogoItem = React.forwardRef<HTMLDivElement, LogoItemProps>(
  ({ src, alt, width = 80, height = 32, grayscale = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-6",
          grayscale && "opacity-60 hover:opacity-100 transition-opacity",
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "object-contain",
            grayscale && "grayscale hover:grayscale-0 transition-all"
          )}
        />
      </div>
    )
  }
)
LogoItem.displayName = "LogoItem"

// ============================================================================
// TEXT ITEM - Simple text with optional separator
// ============================================================================

export interface TextItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  separator?: string
  showSeparator?: boolean
}

const TextItem = React.forwardRef<HTMLDivElement, TextItemProps>(
  ({ children, separator = "•", showSeparator = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-4 px-4 text-caption-m text-zeus-text-primary",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {showSeparator && (
          <span className="text-zeus-text-quaternary">{separator}</span>
        )}
      </div>
    )
  }
)
TextItem.displayName = "TextItem"

export { TokenItem, TradeItem, NewsItem, StatItem, LogoItem, TextItem }
