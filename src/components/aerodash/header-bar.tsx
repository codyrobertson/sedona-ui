"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { Button, type ButtonRootProps } from "./button"
import { colors, fontSize, fontWeight, letterSpacing } from "./tokens"
import "./header-bar.css"

/**
 * HeaderBar — y2k chrome brand strip. Logo + nav + CTA row.
 *
 *   <HeaderBar>
 *     <HeaderBrand icon={<Logo/>}>SEDONA</HeaderBrand>
 *     <HeaderNav>
 *       <HeaderNavLink href="/docs">Docs</HeaderNavLink>
 *     </HeaderNav>
 *     <HeaderActions>
 *       <HeaderCta tone="orange">Enter Competition</HeaderCta>
 *       <HeaderCta tone="primary">Connect</HeaderCta>
 *     </HeaderActions>
 *   </HeaderBar>
 *
 * Pair with StatsBar below for live metrics, or stack TopNav for tabs.
 */

// ─── Root ───────────────────────────────────────────────────────────────────

export interface HeaderBarProps extends React.HTMLAttributes<HTMLElement> {}

export const HeaderBar = React.forwardRef<HTMLElement, HeaderBarProps>(function HeaderBar(
  { className, style, children, ...props },
  ref,
) {
  return (
    <header
      ref={ref}
      data-ad-headerbar=""
      className={cn("relative flex items-center justify-between", className)}
      style={{
        height: 52,
        padding: "0 20px",
        // Tinted ink-cyan rather than pure black — subtle brand cohesion.
        background: "linear-gradient(180deg, #050910 0%, #02050a 100%)",
        color: "#fff",
        // White hairline + cyan rule below for chrome depth.
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 2px 0 rgba(0, 200, 255, 0.08), inset 0 -1px 0 rgba(255, 255, 255, 0.12), inset 0 -3px 0 #00c8ff",
        gap: 24,
        // Header is fixed-height + paint-isolated; no need to compose it
        // with the rest of the page on every scroll tick.
        contain: "layout paint",
        ...style,
      }}
      {...props}
    >
      {children}
    </header>
  )
})

// ─── Brand ──────────────────────────────────────────────────────────────────

export interface HeaderBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Constrains the height of any inline SVG/img placed inside. Default 28. */
  logoHeight?: number
}

export const HeaderBrand = React.forwardRef<HTMLDivElement, HeaderBrandProps>(function HeaderBrand(
  { className, style, logoHeight = 28, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-headerbar-brand=""
      className={cn("inline-flex items-center", className)}
      style={
        {
          gap: 10,
          height: logoHeight,
          ["--ad-logo-h" as string]: `${logoHeight}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
})

// ─── Nav (links group) ──────────────────────────────────────────────────────

export interface HeaderNavProps extends React.HTMLAttributes<HTMLElement> {}

export const HeaderNav = React.forwardRef<HTMLElement, HeaderNavProps>(function HeaderNav(
  { className, style, ...props },
  ref,
) {
  return (
    <nav
      ref={ref}
      data-ad-headerbar-nav=""
      className={cn("flex items-center", className)}
      style={{ gap: 4, ...style }}
      {...props}
    />
  )
})

export interface HeaderNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
}

export const HeaderNavLink = React.forwardRef<HTMLAnchorElement, HeaderNavLinkProps>(
  function HeaderNavLink({ className, style, active, children, ...props }, ref) {
    return (
      <a
        ref={ref}
        data-ad-headerbar-link=""
        data-active={active ? "" : undefined}
        className={cn(
          "relative inline-flex items-center cursor-pointer uppercase transition-colors",
          "hover:text-white",
          className,
        )}
        style={{
          padding: "0 8px",
          height: 24,
          fontSize: fontSize.sm,
          fontWeight: fontWeight.black,
          letterSpacing: letterSpacing.chrome,
          color: active ? colors.cyan : "#9aa3af",
          // Long nav labels (e.g. "DOCUMENTATION") shouldn't wrap into a
          // second line when the header is tight — let CSS `text-overflow`
          // handle it via header-bar.css overflow rules.
          whiteSpace: "nowrap",
          ...style,
        }}
        {...props}
      >
        {children}
        {active ? (
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 8,
              right: 8,
              bottom: -2,
              height: 2,
              background: colors.cyan,
            }}
          />
        ) : null}
      </a>
    )
  },
)

// ─── Actions (CTA group on the right) ───────────────────────────────────────

export interface HeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeaderActions = React.forwardRef<HTMLDivElement, HeaderActionsProps>(
  function HeaderActions({ className, style, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-ad-headerbar-actions=""
        className={cn("flex items-center", className)}
        style={{ gap: 10, ...style }}
        {...props}
      />
    )
  },
)

// ─── CTA — wraps Button. Defaults to chevron well (Sedona pattern). ─────────

export interface HeaderCtaProps extends Omit<ButtonRootProps, "variant" | "size"> {
  /** Button variant. Common in headers: orange, primary (cyan), dark. */
  tone?: ButtonRootProps["variant"]
  size?: ButtonRootProps["size"]
  /** Optional leading icon. */
  icon?: React.ReactNode
  /** Trailing icon — defaults to a clean chevron. Pass `null` to suppress. */
  endIcon?: React.ReactNode
}

const CtaChevron = (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4.5 2.5L8 6L4.5 9.5" />
  </svg>
)

export const HeaderCta = React.forwardRef<HTMLButtonElement, HeaderCtaProps>(function HeaderCta(
  { tone = "primary", size = "md", icon, endIcon = CtaChevron, children, className, ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      data-ad-headerbar-cta=""
      variant={tone}
      size={size}
      icon={icon}
      endIcon={endIcon}
      className={cn("ad-cta-lift", className)}
      {...props}
    >
      {children}
    </Button>
  )
})
