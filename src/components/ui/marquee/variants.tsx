"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Marquee, type MarqueeProps } from "./marquee"
import { TokenItem, TradeItem, type TokenItemProps, type TradeItemProps } from "./items"

// ============================================================================
// TOKEN MARQUEE - Pre-composed marquee for token listings
// ============================================================================

export interface TokenMarqueeData {
  ticker: string
  price: string
  change: number
}

export interface TokenMarqueeProps extends Omit<MarqueeProps, "children"> {
  tokens: TokenMarqueeData[]
  showIcon?: boolean
}

const TokenMarquee = React.forwardRef<HTMLDivElement, TokenMarqueeProps>(
  ({ tokens, showIcon = true, className, ...props }, ref) => {
    if (tokens.length === 0) return null

    return (
      <Marquee
        ref={ref}
        className={cn("py-2", className)}
        speed={40}
        gap={0}
        {...props}
      >
        {tokens.map((token, i) => (
          <TokenItem
            key={`${token.ticker}-${i}`}
            ticker={token.ticker}
            price={token.price}
            change={token.change}
            showIcon={showIcon}
          />
        ))}
      </Marquee>
    )
  }
)
TokenMarquee.displayName = "TokenMarquee"

// ============================================================================
// TRADE MARQUEE - Pre-composed marquee for recent trades
// ============================================================================

export interface TradeMarqueeData {
  type: "buy" | "sell"
  amount: string
  price: string
  time: string
}

export interface TradeMarqueeProps extends Omit<MarqueeProps, "children"> {
  trades: TradeMarqueeData[]
  showIcon?: boolean
}

const TradeMarquee = React.forwardRef<HTMLDivElement, TradeMarqueeProps>(
  ({ trades, showIcon = true, className, ...props }, ref) => {
    if (trades.length === 0) return null

    return (
      <Marquee
        ref={ref}
        className={cn("py-2", className)}
        speed={35}
        gap={0}
        {...props}
      >
        {trades.map((trade, i) => (
          <TradeItem
            key={`${trade.type}-${trade.time}-${i}`}
            type={trade.type}
            amount={trade.amount}
            price={trade.price}
            time={trade.time}
            showIcon={showIcon}
          />
        ))}
      </Marquee>
    )
  }
)
TradeMarquee.displayName = "TradeMarquee"

// ============================================================================
// ANNOUNCEMENT BAR - Full-width announcement banner with marquee
// ============================================================================

export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "info" | "warning" | "success" | "destructive"
  speed?: number
  pauseOnHover?: boolean
}

const AnnouncementBar = React.forwardRef<HTMLDivElement, AnnouncementBarProps>(
  ({
    children,
    variant = "info",
    speed = 50,
    pauseOnHover = true,
    className,
    ...props
  }, ref) => {
    const variantStyles = {
      info: "bg-zeus-surface-info border-zeus-accent-blue/30",
      warning: "bg-zeus-surface-warning border-zeus-accent-orange/30",
      success: "bg-zeus-surface-success border-zeus-accent-green/30",
      destructive: "bg-zeus-surface-destructive border-zeus-accent-red/30",
    }

    const fadeColors = {
      info: "rgb(30, 34, 40)",
      warning: "rgb(46, 35, 25)",
      success: "rgb(30, 40, 33)",
      destructive: "rgb(46, 27, 25)",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full border-y",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <Marquee
          speed={speed}
          pauseOnHover={pauseOnHover}
          fadeColor={fadeColors[variant]}
          className="py-2"
        >
          {children}
        </Marquee>
      </div>
    )
  }
)
AnnouncementBar.displayName = "AnnouncementBar"

// ============================================================================
// TICKER TAPE - Classic stock ticker style
// ============================================================================

export interface TickerTapeItem {
  symbol: string
  value: string
  change?: number
}

export interface TickerTapeProps extends Omit<MarqueeProps, "children"> {
  items: TickerTapeItem[]
  separator?: string
}

const TickerTape = React.forwardRef<HTMLDivElement, TickerTapeProps>(
  ({ items, separator = "|", className, ...props }, ref) => {
    if (items.length === 0) return null

    return (
      <Marquee
        ref={ref}
        className={cn("py-1.5 font-mono text-caption-s", className)}
        speed={30}
        gap={0}
        {...props}
      >
        {items.map((item, i) => (
          <div
            key={`${item.symbol}-${i}`}
            className="inline-flex items-center gap-3 px-3"
          >
            <span className="text-zeus-text-primary font-semibold">{item.symbol}</span>
            <span className="text-zeus-text-secondary">{item.value}</span>
            {item.change !== undefined && (
              <span
                className={cn(
                  "font-medium",
                  item.change >= 0 ? "text-zeus-status-success" : "text-zeus-status-destructive"
                )}
              >
                {item.change >= 0 ? "▲" : "▼"} {Math.abs(item.change).toFixed(2)}%
              </span>
            )}
            <span className="text-zeus-text-quaternary">{separator}</span>
          </div>
        ))}
      </Marquee>
    )
  }
)
TickerTape.displayName = "TickerTape"

// ============================================================================
// LOGO CAROUSEL - For partner/sponsor logos
// ============================================================================

export interface LogoCarouselItem {
  src: string
  alt: string
  href?: string
}

export interface LogoCarouselProps extends Omit<MarqueeProps, "children"> {
  logos: LogoCarouselItem[]
  logoWidth?: number
  logoHeight?: number
  grayscale?: boolean
}

const LogoCarousel = React.forwardRef<HTMLDivElement, LogoCarouselProps>(
  ({
    logos,
    logoWidth = 100,
    logoHeight = 40,
    grayscale = true,
    className,
    ...props
  }, ref) => {
    if (logos.length === 0) return null

    return (
      <Marquee
        ref={ref}
        className={cn("py-4", className)}
        speed={25}
        gap={48}
        pauseOnHover
        {...props}
      >
        {logos.map((logo, i) => {
          const content = (
            <img
              src={logo.src}
              alt={logo.alt}
              width={logoWidth}
              height={logoHeight}
              className={cn(
                "object-contain transition-all",
                grayscale && "grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
              )}
            />
          )

          return logo.href ? (
            <a
              key={`${logo.alt}-${i}`}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              {content}
            </a>
          ) : (
            <div key={`${logo.alt}-${i}`} className="flex items-center">
              {content}
            </div>
          )
        })}
      </Marquee>
    )
  }
)
LogoCarousel.displayName = "LogoCarousel"

export { TokenMarquee, TradeMarquee, AnnouncementBar, TickerTape, LogoCarousel }
