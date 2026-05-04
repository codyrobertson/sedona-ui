"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"

/**
 * Alert — y2k inline notification.
 *
 *   <Alert tone="info" title="Heads up">Body text</Alert>
 *   <Alert tone="danger" onDismiss={() => …}>Action failed</Alert>
 *
 * Tones: info (cyan), success (green), warn (yellow), danger (pink).
 * Auto-renders a tone-appropriate icon unless `icon` is provided (or `null`).
 */

type Tone = "info" | "success" | "warn" | "danger"

const TONE_TOKENS: Record<
  Tone,
  { well: string; ink: string; badgeBg: string; badgeFg: string; tag: string }
> = {
  info:    { well: colors.cyanSoft,  ink: "#0a3a48", badgeBg: colors.cyan,  badgeFg: colors.ink,   tag: "INFO"    },
  success: { well: colors.greenSoft, ink: "#0c4924", badgeBg: colors.green, badgeFg: colors.ink,   tag: "SUCCESS" },
  warn:    { well: colors.warnSoft,  ink: "#5a4400", badgeBg: colors.warn,  badgeFg: colors.ink,   tag: "WARN"    },
  danger:  { well: colors.pinkSoft,  ink: "#71132a", badgeBg: colors.pink,  badgeFg: colors.paper, tag: "ALERT"   },
}

const DEFAULT_ICONS: Record<Tone, React.ReactNode> = {
  info: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 7v4.5M8 4.5v.01" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5 8l2.2 2.2L11 6.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warn: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M8 1.5L15 14H1L8 1.5Z" strokeLinejoin="round" />
      <path d="M8 6.5v3.5M8 12v.01" strokeLinecap="round" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" strokeLinecap="round" />
    </svg>
  ),
}

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: Tone
  title?: React.ReactNode
  icon?: React.ReactNode
  onDismiss?: () => void
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, tone = "info", title, icon, onDismiss, children, style, ...props },
  ref,
) {
  const tokens = TONE_TOKENS[tone]
  const renderIcon = icon !== null && (icon ?? DEFAULT_ICONS[tone])

  return (
    <div
      ref={ref}
      data-ad-alert=""
      data-tone={tone}
      role="alert"
      className={cn("relative overflow-hidden", className)}
      style={{
        background: tokens.well,
        color: tokens.ink,
        border: `1.5px solid ${colors.ink}`,
        borderRadius: radii.md,
        boxShadow: `1px 1px 0 ${colors.ink}`,
        fontSize: 12,
        lineHeight: 1.45,
        ...style,
      }}
      {...props}
    >
      <div
        className="grid items-stretch"
        style={{
          gridTemplateColumns: `${renderIcon ? "auto " : ""}1fr ${onDismiss ? "auto" : ""}`.trim(),
        }}
      >
        {renderIcon ? (
          <span
            aria-hidden
            className="relative grid place-items-center [&>svg]:h-[18px] [&>svg]:w-[18px] self-stretch"
            style={{
              width: 46,
              paddingRight: 8,
              background: tokens.badgeBg,
              color: tokens.badgeFg,
              clipPath: "polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)",
            }}
          >
            {renderIcon}
          </span>
        ) : null}
        <div className="min-w-0" style={{ padding: "10px 14px 10px 8px" }}>
          {title ? (
            <div
              className="font-[950] uppercase tracking-[0.08em] flex items-center gap-2"
              style={{ fontSize: 10, marginBottom: 2 }}
            >
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  padding: "1px 5px",
                  background: colors.ink,
                  color: colors.paper,
                  borderRadius: radii.xs,
                  fontSize: 8,
                  letterSpacing: "0.1em",
                }}
              >
                {tokens.tag}
              </span>
              <span>{title}</span>
            </div>
          ) : null}
          <div>{children}</div>
        </div>
        {onDismiss ? (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={onDismiss}
            className="grid place-items-center cursor-pointer border-0 bg-transparent p-0 opacity-60 hover:opacity-100 self-start"
            style={{ width: 28, height: 28, color: tokens.ink, margin: 4 }}
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  )
})
