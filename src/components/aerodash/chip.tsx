"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

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
  default: { bg: "#ffffff", fg: "#05070b", border: "#05070b" },
  cyan:    { bg: "#d9f7ff", fg: "#0a3a48", border: "#0a3a48" },
  pink:    { bg: "#ffd8e2", fg: "#71132a", border: "#71132a" },
  warn:    { bg: "#fff3b8", fg: "#5a4400", border: "#5a4400" },
  green:   { bg: "#dffdec", fg: "#0c4924", border: "#0c4924" },
  dark:    { bg: "#05070b", fg: "#ffffff", border: "#05070b" },
}
type VariantKey = keyof typeof VARIANT_COLORS

const SIZE_DIMS = {
  sm: { h: 20, fontSize: 9, padX: 7, gap: 5 },
  md: { h: 24, fontSize: 10, padX: 9, gap: 6 },
  lg: { h: 28, fontSize: 11, padX: 11, gap: 7 },
} as const
type SizeKey = keyof typeof SIZE_DIMS

const ChipContext = React.createContext<{ size: SizeKey; variant: VariantKey } | null>(null)
const useChipCtx = () => {
  const ctx = React.useContext(ChipContext)
  if (!ctx) throw new Error("Chip.* must be used inside <ChipRoot>")
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

const rootVariants = cva(
  "inline-flex items-center font-[950] uppercase leading-none tracking-[0.06em] cursor-default select-none",
)

export interface ChipRootProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof rootVariants> {
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
        className={cn(rootVariants(), className)}
        style={{
          height: dim.h,
          fontSize: dim.fontSize,
          padding: `0 ${dim.padX}px`,
          gap: dim.gap,
          background: tokens.bg,
          color: tokens.fg,
          border: `1.5px solid ${tokens.border}`,
          borderRadius: 999,
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
    const sz = size === "sm" ? 12 : size === "lg" ? 16 : 14
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
