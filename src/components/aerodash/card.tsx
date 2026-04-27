"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./card.css"

/**
 * Card — y2k container surface. Anatomy mirrors aerodash_preview/04-cards.html:
 *
 *   ┌──────────────────────────────────────┐
 *   │ [01╲ HEADER CAP        [LIVE]        │  ← CardHeader (dark bg, cyan ID badge)
 *   │      ╲                                │
 *   ├───────────────────────────────────────┤
 *   │  123.4M                                │  ← CardBody (.value, .meta)
 *   │  Content well + metadata              │
 *   ├───────────────────────────────────────┤
 *   │  ACTION FOOTER          [Open ›]     │  ← CardFooter (light bg, top divider)
 *   └───────────────────────────────────────┘
 *
 * Compound primitives:
 *   <CardRoot>
 *     <CardHeader>
 *       <CardHeaderId>01</CardHeaderId>     cyan chevron-clipped badge
 *       <CardHeaderTitle>Header Cap</CardHeaderTitle>
 *       <CardHeaderStatus tone="live">Live</CardHeaderStatus>
 *     </CardHeader>
 *     <CardBody>
 *       <CardValue>123.4M</CardValue>
 *       <CardMeta>Content well + metadata</CardMeta>
 *     </CardBody>
 *     <CardFooter>…</CardFooter>
 *   </CardRoot>
 */

type VariantTokens = { bg: string; fg: string; border: string; borderStyle: string }
const VARIANT_COLORS: Record<string, VariantTokens> = {
  solid:  { bg: colors.paper,   fg: colors.ink, border: colors.ink, borderStyle: "solid" },
  dashed: { bg: "transparent",  fg: colors.ink, border: colors.ink, borderStyle: "dashed" },
  dark:   { bg: colors.ink,     fg: colors.paper, border: colors.ink, borderStyle: "solid" },
}
type VariantKey = keyof typeof VARIANT_COLORS

type StateKey = "default" | "selected" | "disabled" | "loading"

const CardContext = React.createContext<{ variant: VariantKey; state: StateKey } | null>(null)
function useCardCtx() {
  const ctx = React.useContext(CardContext)
  if (!ctx) throw new Error("Card.* must be used inside <CardRoot>")
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantKey
  state?: StateKey
  /** Adds an offset 3px black underlay slab matching Button language. */
  elevated?: boolean
}

export const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(function CardRoot(
  { className, variant = "solid", state = "default", elevated = false, style, children, ...props },
  ref,
) {
  const tokens = VARIANT_COLORS[variant]

  let boxShadow = "none"
  if (state === "selected") boxShadow = `0 0 0 2px ${colors.cyan}`
  else if (elevated) boxShadow = `3px 3px 0 ${colors.ink}`

  return (
    <CardContext.Provider value={{ variant, state }}>
      <div
        ref={ref}
        data-ad-card=""
        data-state={state}
        className={cn("relative", className)}
        style={{
          background: tokens.bg,
          color: tokens.fg,
          border: `2px solid ${tokens.border}`,
          borderStyle: tokens.borderStyle,
          borderRadius: radii.lg,
          overflow: "hidden",
          opacity: state === "disabled" ? 0.45 : 1,
          boxShadow,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </CardContext.Provider>
  )
})

// ─── Header ─────────────────────────────────────────────────────────────────

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, style, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-card-header=""
      className={cn("relative grid items-center", className)}
      style={{
        gridTemplateColumns: "auto 1fr auto",
        minHeight: 32,
        background: colors.ink,
        color: colors.paper,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── HeaderId (cyan chevron-clipped index badge) ────────────────────────────

export interface CardHeaderIdProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "cyan" | "pink" | "warn" | "green" | "white"
}

const ID_TONES: Record<NonNullable<CardHeaderIdProps["tone"]>, { bg: string; fg: string }> = {
  cyan:  { bg: colors.cyan,  fg: "#001016" },
  pink:  { bg: colors.pink,  fg: "#090b10" },
  warn:  { bg: colors.warn,  fg: "#090b10" },
  green: { bg: colors.green, fg: "#06100a" },
  white: { bg: colors.paper, fg: colors.ink },
}

export const CardHeaderId = React.forwardRef<HTMLSpanElement, CardHeaderIdProps>(
  function CardHeaderId({ className, style, children, tone = "cyan", ...props }, ref) {
    const t = ID_TONES[tone]
    return (
      <span
        ref={ref}
        data-ad-card-header-id=""
        className={cn(
          "grid place-items-center font-[950] text-[11px] tracking-[0.04em]",
          className,
        )}
        style={{
          minWidth: 42,
          padding: "0 14px 0 8px",
          height: "100%",
          background: t.bg,
          color: t.fg,
          clipPath: "polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%)",
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    )
  },
)

// ─── HeaderTitle ────────────────────────────────────────────────────────────

export interface CardHeaderTitleProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const CardHeaderTitle = React.forwardRef<HTMLSpanElement, CardHeaderTitleProps>(
  function CardHeaderTitle({ className, style, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-ad-card-header-title=""
        className={cn("font-[950] uppercase", className)}
        style={{
          padding: "0 9px",
          fontSize: 11,
          letterSpacing: "0.04em",
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    )
  },
)

// ─── HeaderStatus (pill on right of header) ─────────────────────────────────

export interface CardHeaderStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "green" | "cyan" | "pink" | "warn" | "muted"
}

const STATUS_TONES: Record<NonNullable<CardHeaderStatusProps["tone"]>, { bg: string; fg: string }> = {
  green: { bg: colors.green, fg: "#06100a" },
  cyan:  { bg: colors.cyan,  fg: "#001016" },
  pink:  { bg: colors.pink,  fg: colors.paper },
  warn:  { bg: colors.warn,  fg: "#090b10" },
  muted: { bg: "#1e2532",    fg: "#9aa3af" },
}

export const CardHeaderStatus = React.forwardRef<HTMLSpanElement, CardHeaderStatusProps>(
  function CardHeaderStatus({ className, style, children, tone = "green", ...props }, ref) {
    const t = STATUS_TONES[tone]
    return (
      <span
        ref={ref}
        data-ad-card-header-status=""
        className={cn("font-[950] uppercase", className)}
        style={{
          marginRight: 8,
          fontSize: 9,
          letterSpacing: "0.06em",
          padding: "3px 8px",
          borderRadius: radii.pill,
          background: t.bg,
          color: t.fg,
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    )
  },
)

// ─── Body ───────────────────────────────────────────────────────────────────

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { className, style, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-card-body=""
      className={className}
      style={{ padding: 12, ...style }}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── Value (large numeric body content) ─────────────────────────────────────

export interface CardValueProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardValue = React.forwardRef<HTMLDivElement, CardValueProps>(function CardValue(
  { className, style, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-card-value=""
      className={cn("font-[900] leading-none", className)}
      style={{ fontSize: 28, ...style }}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── Meta (small caption under value) ───────────────────────────────────────

export interface CardMetaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardMeta = React.forwardRef<HTMLDivElement, CardMetaProps>(function CardMeta(
  { className, style, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-card-meta=""
      className={className}
      style={{ fontSize: 11, color: colors.muted, marginTop: 4, ...style }}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── Footer ─────────────────────────────────────────────────────────────────

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, style, children, ...props },
  ref,
) {
  const { variant } = useCardCtx()
  const isDark = variant === "dark"
  return (
    <div
      ref={ref}
      data-ad-card-footer=""
      className={cn("flex items-center justify-between gap-2", className)}
      style={{
        padding: "8px 12px",
        background: isDark ? "#0d1218" : "#f5f7fa",
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : colors.line}`,
        fontSize: 11,
        textTransform: "uppercase",
        fontWeight: 950,
        letterSpacing: "0.06em",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── Convenience: <Card> ────────────────────────────────────────────────────

export interface CardProps extends Omit<CardRootProps, "title" | "id"> {
  /** Index badge (e.g., "01", "#128", "U"). */
  id?: React.ReactNode
  idTone?: CardHeaderIdProps["tone"]
  title?: React.ReactNode
  /** Status pill content. */
  status?: React.ReactNode
  statusTone?: CardHeaderStatusProps["tone"]
  /** Footer content (typically a button + label). */
  footer?: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { id, idTone, title, status, statusTone, footer, children, ...rootProps },
  ref,
) {
  const hasHeader = id || title || status
  return (
    <CardRoot ref={ref} {...rootProps}>
      {hasHeader ? (
        <CardHeader>
          {id ? <CardHeaderId tone={idTone}>{id}</CardHeaderId> : <span aria-hidden />}
          {title ? <CardHeaderTitle>{title}</CardHeaderTitle> : <span aria-hidden />}
          {status ? (
            <CardHeaderStatus tone={statusTone}>{status}</CardHeaderStatus>
          ) : (
            <span aria-hidden />
          )}
        </CardHeader>
      ) : null}
      <CardBody>{children}</CardBody>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </CardRoot>
  )
})
