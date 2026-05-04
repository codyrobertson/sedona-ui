"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, radii, fonts, fontSize, fontWeight, letterSpacing } from "./tokens"
import "./stats-bar.css"

/**
 * StatsBar — y2k chrome metrics ticker. Mirrors sedona.fun stats row.
 *
 *   <StatsBar>
 *     <StatsSection label="Platform Stats">
 *       <StatsItem icon={<Clock/>}    label="Ends In"  value="0m 0s" />
 *       <StatsItem icon={<Trophy/>}   label="Jackpot"  value="$750" />
 *       <StatsItem icon={<Bars/>}     label="Tokens"   value="1" />
 *     </StatsSection>
 *     <StatsSection label="Top Pools">
 *       <StatsTicker symbol="$LYON" price="$0.000003" change={0.0024} />
 *     </StatsSection>
 *   </StatsBar>
 *
 * Section labels render as cyan chevron tags. Items separated by ink rules.
 */

// Display = crisp Monument-led chrome voice for tags + KPI numerals.
const DISPLAY = fonts.display

// ─── Root ───────────────────────────────────────────────────────────────────

export interface StatsBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const StatsBar = React.forwardRef<HTMLDivElement, StatsBarProps>(function StatsBar(
  { className, style, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-statsbar=""
      className={cn("relative flex items-stretch overflow-x-auto", className)}
      style={{
        height: 38,
        // Lifted ink so the chevron-tag transition doesn't read as a black wedge.
        background: "#0c1320",
        color: "#cbd5e1",
        borderBottom: `1.5px solid ${colors.ink}`,
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 2px 0 rgba(0, 200, 255, 0.12), inset 0 -1px 0 rgba(0, 0, 0, 0.65)",
        fontSize: fontSize.sm,
        // Isolate paint/scroll work — the bar scrolls horizontally on mobile
        // and shouldn't trigger reflow on the rest of the shell.
        contain: "layout paint",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── Section (cyan chevron tag + items separated by rules) ──────────────────

export interface StatsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
}

export const StatsSection = React.forwardRef<HTMLDivElement, StatsSectionProps>(
  function StatsSection({ className, style, label, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-ad-statsbar-section=""
        className={cn("flex items-stretch", className)}
        style={{
          borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "inset -1px 0 0 rgba(0, 0, 0, 0.55)",
          ...style,
        }}
        {...props}
      >
        {label ? (
          <span
            data-ad-statsbar-section-label=""
            className="grid place-items-center uppercase whitespace-nowrap"
            style={{
              padding: "0 22px 0 14px",
              background: colors.cyan,
              color: "#001016",
              fontFamily: DISPLAY,
              fontWeight: fontWeight.black,
              fontSize: fontSize.sm,
              letterSpacing: letterSpacing.chrome,
              // White hairlines + bottom shadow give the tag dimensionality.
              boxShadow:
                "inset 0 1px 0 rgba(255, 255, 255, 0.68), inset 0 -1px 0 rgba(0, 60, 80, 0.4), inset -1px 0 0 rgba(255, 255, 255, 0.26)",
              clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
            }}
          >
            {label}
          </span>
        ) : null}
        <div className="flex items-center" style={{ gap: 0 }}>
          {React.Children.map(children, (child, i) => (
            <React.Fragment key={i}>
              {i > 0 ? (
                <span
                  aria-hidden
                  style={{
                    width: 1,
                    height: 20,
                    background: "rgba(255, 255, 255, 0.13)",
                    boxShadow: "1px 0 0 rgba(0, 0, 0, 0.58)",
                    margin: "0 16px",
                  }}
                />
              ) : null}
              <div className="flex items-center" style={{ paddingLeft: i === 0 ? 14 : 0, paddingRight: i === React.Children.count(children) - 1 ? 14 : 0 }}>
                {child}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  },
)

// ─── Item (icon + label + value) ────────────────────────────────────────────

export interface StatsItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  label?: React.ReactNode
  value?: React.ReactNode
  /** Color the icon. Default cyan. */
  iconColor?: string
}

export const StatsItem = React.forwardRef<HTMLDivElement, StatsItemProps>(function StatsItem(
  { className, style, icon, label, value, iconColor = colors.cyan, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-statsbar-item=""
      className={cn("flex items-center whitespace-nowrap", className)}
      style={{ gap: 8, ...style }}
      {...props}
    >
      {icon ? (
        <span
          aria-hidden
          className="grid place-items-center [&>svg]:h-[14px] [&>svg]:w-[14px]"
          style={{ color: iconColor }}
        >
          {icon}
        </span>
      ) : null}
      {label ? (
        <span
          className="uppercase"
          style={{
            color: "#b7c2d1",
            fontFamily: DISPLAY,
            fontWeight: fontWeight.black,
            fontSize: fontSize.sm,
            letterSpacing: letterSpacing.wider,
            // Truncate long custom labels gracefully rather than pushing
            // ticker pills off-screen.
            maxWidth: 180,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      ) : null}
      {value ? (
        <span
          className="uppercase"
          style={{
            color: colors.cyan,
            fontFamily: DISPLAY,
            fontWeight: fontWeight.black,
            fontSize: 13,
            letterSpacing: letterSpacing.wide,
            fontVariantNumeric: "tabular-nums",
            // Allow long values to share width gracefully with siblings.
            maxWidth: 220,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </span>
      ) : null}
      {children}
    </div>
  )
})

// ─── Ticker (LED-style symbol + price + change) ─────────────────────────────

export interface StatsTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol: React.ReactNode
  price: React.ReactNode
  /** Numeric change as a fraction (0.024 = 2.4%). Pass `change` OR `changeText`. */
  change?: number
  /** Pre-formatted change string. Overrides `change`. */
  changeText?: React.ReactNode
}

const formatChange = (n: number) => {
  const pct = n * 100
  const sign = pct >= 0 ? "+" : ""
  return `${sign}${pct.toFixed(2)}%`
}

export const StatsTicker = React.forwardRef<HTMLDivElement, StatsTickerProps>(function StatsTicker(
  { className, style, symbol, price, change, changeText, ...props },
  ref,
) {
  const positive = change == null ? true : change >= 0
  const tone = positive ? colors.green : colors.pink
  const arrow = positive ? "↗" : "↘"
  const changeStr = changeText ?? (change != null ? formatChange(change) : null)

  return (
    <div
      ref={ref}
      data-ad-statsbar-ticker=""
      data-direction={positive ? "up" : "down"}
      className={cn("flex items-center whitespace-nowrap", className)}
      style={{ gap: 8, ...style }}
      {...props}
    >
      <span
        className="font-[900] uppercase"
        style={{
          color: "#001016",
          background: colors.cyan,
          padding: "2px 6px",
          borderRadius: radii.xs,
          fontSize: 10,
          letterSpacing: letterSpacing.wider,
          fontFamily: DISPLAY,
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.58)",
        }}
      >
        {symbol}
      </span>
      <span
        className="font-[800]"
        style={{
          color: "#ffffff",
          fontFamily: DISPLAY,
          fontSize: 12,
          letterSpacing: letterSpacing.wide,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {price}
      </span>
      {changeStr != null ? (
        <span
          className="inline-flex items-center font-[900]"
          style={{
            color: tone,
            fontFamily: DISPLAY,
            fontSize: 11,
            gap: 2,
            letterSpacing: letterSpacing.wide,
            fontVariantNumeric: "tabular-nums",
            padding: "1px 6px",
            border: `1px solid ${tone}`,
            borderRadius: radii.xs,
            background: `${tone}1a`,
          }}
        >
          {changeStr}
          <span aria-hidden style={{ fontSize: 10 }}>{arrow}</span>
        </span>
      ) : null}
    </div>
  )
})

// ─── Common stat icons (handy defaults) ─────────────────────────────────────

export const StatsIcons = {
  clock: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
      <path d="M4 3h8v3a4 4 0 0 1-8 0V3z" />
      <path d="M2 4.5h2M12 4.5h2M6.5 11v2H4v1h8v-1H9.5v-2" strokeLinecap="round" />
    </svg>
  ),
  bars: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <path d="M3 13V8M7 13V4M11 13V10M15 13H1" />
    </svg>
  ),
}
