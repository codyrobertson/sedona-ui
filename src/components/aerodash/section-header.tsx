"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

import { Chrome } from "./chrome"
import { IconTile } from "./icon-tile"
import { colors } from "./tokens"

/**
 * SectionHeader — y2k arrow-pill bar. Used as a panel/section header.
 *
 *   ┌──────┬─────────────────╲
 *   │ ▦  │ OVERVIEW          ╲
 *   └──────┴─────────────────╱
 *
 * Anatomy: rounded-left pill body with a triangular tip on the right (drawn via
 * the Chrome SVG primitive), an inset rounded-square IconTile on the left, and
 * an uppercase label.
 *
 * Compound primitives mirror the structure 1:1:
 *   <SectionHeaderRoot variant size>
 *     <SectionHeaderChrome />        background SVG arrow-pill
 *     <SectionHeaderIcon>{icon}</SectionHeaderIcon>
 *     <SectionHeaderLabel>OVERVIEW</SectionHeaderLabel>
 *     <SectionHeaderEnd>{meta}</SectionHeaderEnd>  optional trailing slot
 *   </SectionHeaderRoot>
 *
 * Or use the convenience shorthand:
 *   <SectionHeader variant="active" icon={<Shell/>}>Overview</SectionHeader>
 */

// ─── Variant tokens ─────────────────────────────────────────────────────────

type VariantKey = "default" | "active" | "dark" | "dotted"
type TileTone = "invert" | "match" | "outline"
type VariantTokens = { fg: string; tileTone: TileTone }

const VARIANT_TOKENS: Record<VariantKey, VariantTokens> = {
  default: { fg: colors.ink,   tileTone: "invert" },
  active:  { fg: colors.ink,   tileTone: "invert" },
  dark:    { fg: colors.paper, tileTone: "invert" },
  dotted:  { fg: "#5a5a5a",    tileTone: "outline" },
}

const SIZE_DIMS = {
  sm: { h: 32, tipLen: 14, fontSize: 10,   tile: "sm" as const, padL: 8,  padR: 18 },
  md: { h: 40, tipLen: 18, fontSize: 11.5, tile: "md" as const, padL: 10, padR: 22 },
  lg: { h: 48, tipLen: 22, fontSize: 13,   tile: "lg" as const, padL: 12, padR: 26 },
}
type SizeKey = keyof typeof SIZE_DIMS

// ─── Context (Root → children) ──────────────────────────────────────────────

interface SectionHeaderCtx {
  variant: VariantKey
  size: SizeKey
  rootRef: React.MutableRefObject<HTMLElement | null>
}
const SectionHeaderContext = React.createContext<SectionHeaderCtx | null>(null)
function useSectionHeaderCtx() {
  const ctx = React.useContext(SectionHeaderContext)
  if (!ctx) throw new Error("SectionHeader.* must be used inside <SectionHeaderRoot>")
  return ctx
}

const ROOT_CLASS =
  "relative isolate inline-grid items-center cursor-default select-none font-[950] uppercase leading-none"

// ─── Root ───────────────────────────────────────────────────────────────────

export interface SectionHeaderRootProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  variant?: VariantKey
  size?: SizeKey
  /** Render as a different element via Radix Slot (default: div). */
  asChild?: boolean
  children?: React.ReactNode
}

export const SectionHeaderRoot = React.forwardRef<HTMLElement, SectionHeaderRootProps>(
  function SectionHeaderRoot(
    { className, variant = "default", size = "md", asChild = false, children, style, ...props },
    ref,
  ) {
    const Comp: React.ElementType = asChild ? Slot : "div"
    const localRef = React.useRef<HTMLElement | null>(null)

    // Single callback ref forwards the node to both the local ref (for Chrome's
    // ResizeObserver) and the consumer's forwarded ref.
    const setRefs = React.useCallback(
      (node: HTMLElement | null) => {
        localRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [ref],
    )

    const dim = SIZE_DIMS[size]
    const tokens = VARIANT_TOKENS[variant]

    return (
      <SectionHeaderContext.Provider value={{ variant, size, rootRef: localRef }}>
        <Comp
          ref={setRefs}
          data-ad-section-header=""
          className={cn(ROOT_CLASS, className)}
          style={{
            height: dim.h,
            fontSize: dim.fontSize,
            letterSpacing: "0.06em",
            color: tokens.fg,
            gridTemplateColumns: "auto 1fr auto",
            paddingLeft: dim.padL,
            paddingRight: dim.padR,
            marginRight: dim.tipLen + 2, // reserve space for the triangular tip
            ...style,
          }}
          {...props}
        >
          {children}
        </Comp>
      </SectionHeaderContext.Provider>
    )
  },
)

// ─── Chrome (background SVG arrow-pill) ─────────────────────────────────────

export interface SectionHeaderChromeProps {
  className?: string
}

export const SectionHeaderChrome = React.forwardRef<SVGSVGElement, SectionHeaderChromeProps>(
  function SectionHeaderChrome({ className }, ref) {
    const { variant, size, rootRef } = useSectionHeaderCtx()
    return (
      <Chrome
        ref={ref}
        targetRef={rootRef}
        variant={variant}
        tipLen={SIZE_DIMS[size].tipLen}
        className={className}
      />
    )
  },
)

// ─── Icon (inset rounded-square tile) ───────────────────────────────────────

export interface SectionHeaderIconProps {
  className?: string
  children: React.ReactNode
}

export const SectionHeaderIcon = React.forwardRef<HTMLSpanElement, SectionHeaderIconProps>(
  function SectionHeaderIcon({ className, children }, ref) {
    const { variant, size } = useSectionHeaderCtx()
    return (
      <IconTile
        ref={ref}
        size={SIZE_DIMS[size].tile}
        tone={VARIANT_TOKENS[variant].tileTone}
        className={cn("relative z-10", className)}
      >
        {children}
      </IconTile>
    )
  },
)

// ─── Label (middle uppercase text) ──────────────────────────────────────────

export interface SectionHeaderLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const SectionHeaderLabel = React.forwardRef<HTMLSpanElement, SectionHeaderLabelProps>(
  function SectionHeaderLabel({ className, style, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-ad-section-header-label=""
        className={cn(
          "relative z-10 flex min-w-0 items-center whitespace-nowrap pl-[12px]",
          className,
        )}
        style={style}
        {...props}
      >
        {children}
      </span>
    )
  },
)

// ─── End (optional trailing meta slot) ──────────────────────────────────────

export interface SectionHeaderEndProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const SectionHeaderEnd = React.forwardRef<HTMLSpanElement, SectionHeaderEndProps>(
  function SectionHeaderEnd({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-ad-section-header-end=""
        className={cn(
          "relative z-10 flex items-center pl-[10px] text-[10px] opacity-70",
          className,
        )}
        {...props}
      >
        {children}
      </span>
    )
  },
)

// ─── Convenience: <SectionHeader> ───────────────────────────────────────────

export interface SectionHeaderProps extends SectionHeaderRootProps {
  icon?: React.ReactNode
  end?: React.ReactNode
}

export const SectionHeader = React.forwardRef<HTMLElement, SectionHeaderProps>(function SectionHeader(
  { icon, end, children, ...rootProps },
  ref,
) {
  return (
    <SectionHeaderRoot ref={ref} {...rootProps}>
      <SectionHeaderChrome />
      {icon != null ? <SectionHeaderIcon>{icon}</SectionHeaderIcon> : <span aria-hidden />}
      <SectionHeaderLabel>{children}</SectionHeaderLabel>
      {end != null ? <SectionHeaderEnd>{end}</SectionHeaderEnd> : <span aria-hidden />}
    </SectionHeaderRoot>
  )
})
