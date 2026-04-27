"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./aerodash.css"
import "./segmented.css"

/**
 * SegmentedControl — y2k tab row. Single-select strip.
 *
 *   <SegmentedRoot value={tab} onChange={setTab}>
 *     <SegmentedItem value="all">All</SegmentedItem>
 *     <SegmentedItem value="active">Active</SegmentedItem>
 *   </SegmentedRoot>
 *
 * Variants:
 *   - "pill"    : rounded-pill row, items separated by 1px dividers (default)
 *   - "slanted" : same row, active item is a clip-path parallelogram
 *
 * The row owns the bg + border + radius + overflow:hidden so individual items
 * can be borderless and the slanted clip-path blends seamlessly into siblings.
 */

const SIZE_DIMS = {
  sm: { h: 26, fontSize: 9,  padX: 11, slant: 8 },
  md: { h: 30, fontSize: 10, padX: 14, slant: 10 },
  lg: { h: 36, fontSize: 11, padX: 18, slant: 12 },
} as const
type SizeKey = keyof typeof SIZE_DIMS

type Variant = "pill" | "slanted"

interface SegmentedCtx {
  value: string
  setValue: (v: string) => void
  size: SizeKey
  variant: Variant
}
const SegmentedContext = React.createContext<SegmentedCtx | null>(null)
function useSegmentedCtx() {
  const ctx = React.useContext(SegmentedContext)
  if (!ctx) throw new Error("Segmented.* must be used inside <SegmentedRoot>")
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

export interface SegmentedRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  size?: SizeKey
  variant?: Variant
}

export const SegmentedRoot = React.forwardRef<HTMLDivElement, SegmentedRootProps>(
  function SegmentedRoot(
    {
      className,
      value: controlledValue,
      defaultValue = "",
      onChange,
      size = "md",
      variant = "pill",
      children,
      style,
      ...props
    },
    ref,
  ) {
    const [internal, setInternal] = React.useState(defaultValue)
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internal
    const setValue = (v: string) => {
      if (!isControlled) setInternal(v)
      onChange?.(v)
    }

    const dim = SIZE_DIMS[size]
    return (
      <SegmentedContext.Provider value={{ value, setValue, size, variant }}>
        <div
          ref={ref}
          data-ad-segmented=""
          data-variant={variant}
          role="tablist"
          className={cn("inline-flex items-stretch", className)}
          style={{
            height: dim.h,
            background: colors.paper,
            border: `1.5px solid ${colors.ink}`,
            borderRadius: variant === "pill" ? radii.pill : radii.md,
            overflow: "hidden",
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </SegmentedContext.Provider>
    )
  },
)

// ─── Item ───────────────────────────────────────────────────────────────────

export interface SegmentedItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string
}

export const SegmentedItem = React.forwardRef<HTMLButtonElement, SegmentedItemProps>(
  function SegmentedItem({ className, style, value, children, onClick, ...props }, ref) {
    const ctx = useSegmentedCtx()
    const dim = SIZE_DIMS[ctx.size]
    const active = ctx.value === value
    const slanted = ctx.variant === "slanted"
    const slantedActive = slanted && active

    const slantClipPath = slantedActive
      ? `polygon(${dim.slant}px 0, 100% 0, calc(100% - ${dim.slant}px) 100%, 0 100%)`
      : undefined

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        data-ad-segmented-item=""
        data-active={active ? "" : undefined}
        aria-selected={active}
        className={cn(
          "relative inline-flex items-center justify-center cursor-pointer border-0",
          "font-[950] uppercase tracking-[0.06em] leading-none whitespace-nowrap",
          "transition-[background,color] duration-150",
          className,
        )}
        style={{
          height: "100%",
          // Extend padding when slanted to compensate for the clipped corners
          padding: `0 ${dim.padX + (slantedActive ? dim.slant : 0)}px`,
          fontSize: dim.fontSize,
          background: active ? colors.cyan : "transparent",
          color: active ? "#001016" : colors.muted,
          // 1px divider between items via inset shadow on the LEFT (skipped on first)
          boxShadow: "inset 1px 0 0 rgba(5,7,11,0.20)",
          clipPath: slantClipPath,
          ...style,
        }}
        onClick={(e) => {
          ctx.setValue(value)
          onClick?.(e)
        }}
        {...props}
      >
        {children}
      </button>
    )
  },
)
