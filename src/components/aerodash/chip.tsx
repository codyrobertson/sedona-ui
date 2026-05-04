"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./aerodash.css"
import "./chip.css"

/**
 * Chip — small uppercase pill. Used for filters, tags, statuses.
 *
 *   <Chip>Active</Chip>
 *   <Chip variant="cyan" onDismiss={() => …}>Treasury</Chip>
 *   <Chip variant="warn">High Impact</Chip>
 *
 * Compound: <ChipRoot> + <ChipLabel> + <ChipDismiss>.
 */

type VariantTokens = { bg: string; fg: string; border: string }
const VARIANT_COLORS: Record<string, VariantTokens> = {
  default: { bg: colors.paper,    fg: colors.ink, border: colors.ink },
  cyan:    { bg: colors.cyanSoft, fg: "#0a3a48",  border: "#0a3a48" },
  pink:    { bg: colors.pinkSoft, fg: "#71132a",  border: "#71132a" },
  warn:    { bg: colors.warnSoft, fg: "#5a4400",  border: "#5a4400" },
  green:   { bg: colors.greenSoft, fg: "#0c4924", border: "#0c4924" },
  dark:    { bg: colors.ink,      fg: colors.paper, border: colors.ink },
}
type VariantKey = keyof typeof VARIANT_COLORS

const SIZE_DIMS = {
  sm: { h: 20, fontSize: 9,  padX: 7,  gap: 5, dismiss: 12 },
  md: { h: 24, fontSize: 10, padX: 9,  gap: 6, dismiss: 14 },
  lg: { h: 28, fontSize: 11, padX: 11, gap: 7, dismiss: 16 },
} as const
type SizeKey = keyof typeof SIZE_DIMS

const ChipContext = React.createContext<{ size: SizeKey; variant: VariantKey } | null>(null)
function useChipCtx() {
  const ctx = React.useContext(ChipContext)
  if (!ctx) throw new Error("Chip.* must be used inside <ChipRoot>")
  return ctx
}

const ROOT_CLASS =
  "inline-flex items-center font-[950] uppercase leading-none tracking-[0.06em] cursor-default select-none"

// ─── Root ───────────────────────────────────────────────────────────────────

export interface ChipRootProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  variant?: VariantKey
  size?: SizeKey
  children?: React.ReactNode
}

export const ChipRoot = React.forwardRef<HTMLSpanElement, ChipRootProps>(function ChipRoot(
  { className, variant = "default", size = "md", children, style, ...props },
  ref,
) {
  const dim = SIZE_DIMS[size]
  const tokens = VARIANT_COLORS[variant]
  return (
    <ChipContext.Provider value={{ size, variant }}>
      <span
        ref={ref}
        data-ad-chip=""
        className={cn(ROOT_CLASS, className)}
        style={{
          height: dim.h,
          fontSize: dim.fontSize,
          padding: `0 ${dim.padX}px`,
          gap: dim.gap,
          background: tokens.bg,
          color: tokens.fg,
          border: `1.5px solid ${tokens.border}`,
          borderRadius: radii.pill,
          ...style,
        }}
        {...props}
      >
        {children}
      </span>
    </ChipContext.Provider>
  )
})

// ─── Label ──────────────────────────────────────────────────────────────────

export interface ChipLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const ChipLabel = React.forwardRef<HTMLSpanElement, ChipLabelProps>(function ChipLabel(
  { className, children, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn("whitespace-nowrap", className)} {...props}>
      {children}
    </span>
  )
})

// ─── Dismiss (X button) ─────────────────────────────────────────────────────

export interface ChipDismissProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ChipDismiss = React.forwardRef<HTMLButtonElement, ChipDismissProps>(
  function ChipDismiss({ className, style, children, ...props }, ref) {
    const { size } = useChipCtx()
    const sz = SIZE_DIMS[size].dismiss
    return (
      <button
        ref={ref}
        type="button"
        data-ad-chip-dismiss=""
        className={cn(
          "inline-grid place-items-center rounded-full border-0 bg-transparent p-0",
          "cursor-pointer text-current opacity-60 hover:opacity-100",
          className,
        )}
        style={{ width: sz, height: sz, ...style }}
        {...props}
      >
        {children ?? (
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
          </svg>
        )}
      </button>
    )
  },
)

// ─── Convenience: <Chip> ────────────────────────────────────────────────────

export interface ChipProps extends ChipRootProps {
  /** Show a dismiss × button on the right. */
  onDismiss?: () => void
  /** Optional leading icon. */
  leadingIcon?: React.ReactNode
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  { onDismiss, leadingIcon, children, ...rootProps },
  ref,
) {
  return (
    <ChipRoot ref={ref} {...rootProps}>
      {leadingIcon}
      <ChipLabel>{children}</ChipLabel>
      {onDismiss ? <ChipDismiss onClick={onDismiss} /> : null}
    </ChipRoot>
  )
})
