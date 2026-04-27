"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Chrome } from "./chrome"
import { IconTile } from "./icon-tile"

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
type VariantTokens = { fg: string; tile: { tone: "invert" | "match" | "outline" } }
const VARIANT_FG: Record<VariantKey, VariantTokens> = {
  default: { fg: "#05070b", tile: { tone: "invert" } },
  active:  { fg: "#05070b", tile: { tone: "invert" } },
  dark:    { fg: "#ffffff", tile: { tone: "invert" } },
  dotted:  { fg: "#5a5a5a", tile: { tone: "outline" } },
}

const SIZE_DIMS = {
  sm: { h: 32, tipLen: 14, fontSize: 10, tile: "sm" as const, padL: 8, padR: 18 },
  md: { h: 40, tipLen: 18, fontSize: 11.5, tile: "md" as const, padL: 10, padR: 22 },
  lg: { h: 48, tipLen: 22, fontSize: 13, tile: "lg" as const, padL: 12, padR: 26 },
}
type SizeKey = keyof typeof SIZE_DIMS

// ─── Context (Root → children) ──────────────────────────────────────────────

interface SectionHeaderCtx {
  variant: VariantKey
  size: SizeKey
  rootRef: React.MutableRefObject<HTMLElement | null>
}
const SectionHeaderContext = React.createContext<SectionHeaderCtx | null>(null)
const useSectionHeaderCtx = () => {
  const ctx = React.useContext(SectionHeaderContext)
  if (!ctx) throw new Error("SectionHeader.* must be used inside <SectionHeaderRoot>")
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────────────────

const rootVariants = cva(
  "relative isolate inline-grid items-center cursor-default select-none font-[950] uppercase leading-none",
)

export interface SectionHeaderRootProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children">,
    VariantProps<typeof rootVariants> {
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
    React.useImperativeHandle(ref, () => localRef.current as HTMLElement, [])
    const setRefs = (node: HTMLElement | null) => {
      localRef.current = node
    }

    const dim = SIZE_DIMS[size]
    const tokens = VARIANT_FG[variant]

    return (
      <SectionHeaderContext.Provider value={{ variant, size, rootRef: localRef }}>
        <Comp
          ref={setRefs}
          data-ad-section-header=""
          className={cn(rootVariants(), className)}
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
        className={cn(className)}
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
        tone={VARIANT_FG[variant].tile.tone}
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
      {icon !== null && icon !== undefined ? (
        <SectionHeaderIcon>{icon}</SectionHeaderIcon>
      ) : (
        <span aria-hidden />
      )}
      <SectionHeaderLabel>{children}</SectionHeaderLabel>
      {end !== null && end !== undefined ? (
        <SectionHeaderEnd>{end}</SectionHeaderEnd>
      ) : (
        <span aria-hidden />
      )}
    </SectionHeaderRoot>
  )
})
