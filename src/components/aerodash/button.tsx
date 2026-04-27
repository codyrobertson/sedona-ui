"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import "./button.css"

/**
 * Button — y2k chrome bar. Mirrors the static HTML 1:1 with named primitives:
 *
 *   <ButtonRoot>                       outer wrapper, owns variant CSS vars
 *     <ButtonUnderlay />               solid black slab, offset bottom-right
 *     <ButtonInner>                    bordered + filled body, 6px radius
 *       <ButtonCap>{icon}</ButtonCap>  left icon slot
 *       <ButtonLabel>EXECUTE</ButtonLabel>
 *       <ButtonWell>{endIcon}</ButtonWell>  right slanted action well
 *     </ButtonInner>
 *   </ButtonRoot>
 *
 * `<Button icon endIcon variant size>label</Button>` is the convenience shorthand.
 *
 * Variant CSS vars (set on Root, consumed by all children):
 *   --ad-bg    body fill
 *   --ad-fg    text/icon color
 *   --ad-well  right-well fill
 *
 * Named exports (RSC-safe — no dot-notation across server/client boundary):
 *   Button, ButtonRoot, ButtonUnderlay, ButtonInner, ButtonCap, ButtonLabel, ButtonWell
 */

// ─── Variant tokens (mirrors aerodash_preview/02-buttons.html) ──────────────

type VariantTokens = { bg: string; fg: string; well: string; divider: string; border: string }

// Light variants use a black divider; dark variant uses semi-transparent white
// so the cap/well separators stay legible against the dark body.
const LIGHT_DIVIDER = "rgba(0,0,0,0.25)"
const DARK_DIVIDER = "rgba(255,255,255,0.18)"

const VARIANT_COLORS: Record<string, VariantTokens> = {
  primary:   { bg: "#00c8ff", fg: "#001016", well: "#00a2d6", divider: LIGHT_DIVIDER, border: "#05070b" },
  secondary: { bg: "#ffffff", fg: "#080c12", well: "#e5eaf0", divider: LIGHT_DIVIDER, border: "#05070b" },
  dark:      { bg: "#05070b", fg: "#00c8ff", well: "#1a2332", divider: DARK_DIVIDER, border: "#1f2937" },
  danger:    { bg: "#ff4d72", fg: "#090b10", well: "#db2e55", divider: LIGHT_DIVIDER, border: "#05070b" },
  warn:      { bg: "#ffd51d", fg: "#090b10", well: "#e7bd00", divider: LIGHT_DIVIDER, border: "#05070b" },
  success:   { bg: "#22d66f", fg: "#06100a", well: "#19b85b", divider: LIGHT_DIVIDER, border: "#05070b" },
}

const SIZE_DIMS = {
  sm: { minH: 28, cap: 26, well: 28, fontSize: 10, padX: 12 },
  md: { minH: 34, cap: 32, well: 34, fontSize: 11, padX: 14 },
  lg: { minH: 40, cap: 38, well: 40, fontSize: 12, padX: 16 },
} as const

type SizeKey = keyof typeof SIZE_DIMS
type VariantKey = keyof typeof VARIANT_COLORS

// ─── Internal context (Root → children) ─────────────────────────────────────

interface ButtonCtx {
  variant: VariantKey
  size: SizeKey
  pressed: boolean
}
const ButtonContext = React.createContext<ButtonCtx | null>(null)
const useButtonCtx = () => {
  const ctx = React.useContext(ButtonContext)
  if (!ctx) throw new Error("Button.* must be used inside <ButtonRoot>")
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

const rootVariants = cva(
  [
    "relative inline-grid cursor-pointer select-none border-0 bg-transparent p-0",
    "font-[950] uppercase leading-none tracking-[0.02em]",
    "disabled:pointer-events-none disabled:opacity-[0.45]",
  ].join(" "),
)

export interface ButtonRootProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">,
    VariantProps<typeof rootVariants> {
  variant?: VariantKey
  size?: SizeKey
  asChild?: boolean
}

export const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(function ButtonRoot(
  { className, variant = "primary", size = "md", asChild = false, style, children, ...props },
  ref,
) {
  const Comp: React.ElementType = asChild ? Slot : "button"
  const [pressed, setPressed] = React.useState(false)
  const tokens = VARIANT_COLORS[variant] ?? VARIANT_COLORS.primary
  const dim = SIZE_DIMS[size]

  return (
    <ButtonContext.Provider value={{ variant, size, pressed }}>
      <Comp
        ref={ref}
        data-ad-root=""
        className={cn(rootVariants(), className)}
        style={{
          minHeight: dim.minH,
          fontSize: dim.fontSize,
          color: tokens.fg,
          ["--ad-bg" as string]: tokens.bg,
          ["--ad-fg" as string]: tokens.fg,
          ["--ad-well" as string]: tokens.well,
          ["--ad-divider" as string]: tokens.divider,
          ["--ad-border" as string]: tokens.border,
          ...style,
        }}
        onPointerDown={(e) => {
          setPressed(true)
          props.onPointerDown?.(e)
        }}
        onPointerUp={(e) => {
          setPressed(false)
          props.onPointerUp?.(e)
        }}
        onPointerLeave={(e) => {
          setPressed(false)
          props.onPointerLeave?.(e)
        }}
        {...props}
      >
        {children}
      </Comp>
    </ButtonContext.Provider>
  )
})

// ─── Underlay ───────────────────────────────────────────────────────────────

export interface ButtonUnderlayProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const ButtonUnderlay = React.forwardRef<HTMLSpanElement, ButtonUnderlayProps>(
  function ButtonUnderlay({ style, ...props }, ref) {
    const { pressed } = useButtonCtx()
    return (
      <span
        ref={ref}
        data-ad-underlay=""
        aria-hidden
        style={{
          position: "absolute",
          top: pressed ? 1 : 3,
          right: pressed ? -1 : -2,
          bottom: pressed ? -1 : -2,
          left: pressed ? 1 : 2,
          background: "#05070b",
          borderRadius: 6,
          pointerEvents: "none",
          transition:
            "top 100ms ease, right 100ms ease, bottom 100ms ease, left 100ms ease",
          ...style,
        }}
        {...props}
      />
    )
  },
)

// ─── Inner (the bordered, colored body) ─────────────────────────────────────

export interface ButtonInnerProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const ButtonInner = React.forwardRef<HTMLSpanElement, ButtonInnerProps>(function ButtonInner(
  { className, style, children, ...props },
  ref,
) {
  const { size } = useButtonCtx()
  const dim = SIZE_DIMS[size]
  return (
    <span
      ref={ref}
      data-ad-inner=""
      className={cn("grid", className)}
      style={{
        position: "relative",
        zIndex: 1,
        gridTemplateColumns: `${dim.cap}px 1fr ${dim.well}px`,
        minHeight: dim.minH,
        background: "var(--ad-bg)",
        border: "2px solid var(--ad-border, #05070b)",
        borderRadius: 6,
        overflow: "hidden",
        transition: "filter 100ms ease, box-shadow 100ms ease",
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
})

// ─── Cap (left icon slot) ───────────────────────────────────────────────────

export interface ButtonCapProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const ButtonCap = React.forwardRef<HTMLSpanElement, ButtonCapProps>(function ButtonCap(
  { className, style, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-ad-cap=""
      className={cn("[&>svg]:h-[14px] [&>svg]:w-[14px]", className)}
      style={{
        display: "grid",
        placeItems: "center",
        borderRight: "1px solid var(--ad-divider, rgba(0,0,0,0.25))",
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
})

// ─── Label (middle text) ────────────────────────────────────────────────────

export interface ButtonLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const ButtonLabel = React.forwardRef<HTMLSpanElement, ButtonLabelProps>(function ButtonLabel(
  { className, style, children, ...props },
  ref,
) {
  const { size } = useButtonCtx()
  const padX = SIZE_DIMS[size].padX
  return (
    <span
      ref={ref}
      data-ad-label=""
      className={cn("whitespace-nowrap", className)}
      style={{
        display: "grid",
        placeItems: "center",
        paddingLeft: padX,
        paddingRight: padX,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
})

// ─── Well (right slanted action) ────────────────────────────────────────────

export interface ButtonWellProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const ButtonWell = React.forwardRef<HTMLSpanElement, ButtonWellProps>(function ButtonWell(
  { className, style, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-ad-well=""
      className={cn("[&>svg]:h-[12px] [&>svg]:w-[12px]", className)}
      style={{
        display: "grid",
        placeItems: "center",
        background: "var(--ad-well)",
        borderLeft: "1px solid var(--ad-divider, rgba(0,0,0,0.28))",
        clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0 100%)",
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
})

// ─── Convenience: <Button> renders the full anatomy in one prop call ────────

export interface ButtonProps extends ButtonRootProps {
  /** Left cap icon. Pass `null` to omit. */
  icon?: React.ReactNode
  /** Right well content. Defaults to a chevron. Pass `null` to omit. */
  endIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { icon, endIcon = <Chevron />, children, ...rootProps },
  ref,
) {
  return (
    <ButtonRoot ref={ref} {...rootProps}>
      <ButtonUnderlay />
      <ButtonInner>
        {icon !== null && icon !== undefined ? <ButtonCap>{icon}</ButtonCap> : <span aria-hidden />}
        <ButtonLabel>{children}</ButtonLabel>
        {endIcon !== null && endIcon !== undefined ? (
          <ButtonWell>{endIcon}</ButtonWell>
        ) : (
          <span aria-hidden />
        )}
      </ButtonInner>
    </ButtonRoot>
  )
})

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square">
      <path d="M4 2l4 4-4 4" />
    </svg>
  )
}
