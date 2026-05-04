"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, fonts } from "./tokens"
import "./side-rail.css"

/**
 * SideRail — y2k dark navigation rail with cyan-active items.
 * Mirrors aerodash_preview/01-shell.html .side-rail family.
 *
 * Anatomy:
 *   <SideRail>
 *     <RailKicker>Navigation</RailKicker>
 *     <RailCard>
 *       <RailLogo>AeroDash<br/>OS</RailLogo>
 *       <RailLabel>Default / Expanded</RailLabel>
 *       <RailItem icon={ShellIcon} active>Shell</RailItem>
 *       <RailItem icon={DiamondIcon}>Buttons</RailItem>
 *     </RailCard>
 *
 *     <RailLabel>Collapsed / Icons</RailLabel>
 *     <IconRail>
 *       <IconRailItem icon={ShellIcon} active aria-label="Shell" />
 *       <IconRailItem icon={DiamondIcon} aria-label="Buttons" />
 *     </IconRail>
 *   </SideRail>
 */

const DISPLAY = fonts.display

// ─── Root ───────────────────────────────────────────────────────────────────

export interface SideRailProps extends React.HTMLAttributes<HTMLElement> {}

export const SideRail = React.forwardRef<HTMLElement, SideRailProps>(function SideRail(
  { className, style, children, ...props },
  ref,
) {
  return (
    <aside
      ref={ref}
      data-ad-rail=""
      className={cn("overflow-auto", className)}
      style={{
        background: "#030509",
        color: "#fff",
        borderRight: "2px solid #111827",
        padding: 12,
        ...style,
      }}
      {...props}
    >
      {children}
    </aside>
  )
})

// ─── RailKicker (top label) ─────────────────────────────────────────────────

export interface RailKickerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RailKicker = React.forwardRef<HTMLDivElement, RailKickerProps>(function RailKicker(
  { className, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-rail-kicker=""
      className={cn("uppercase font-[900]", className)}
      style={{
        color: colors.cyan,
        fontSize: 11,
        letterSpacing: "0.08em",
        marginBottom: 8,
        ...style,
      }}
      {...props}
    />
  )
})

// ─── RailCard (grouping container) ──────────────────────────────────────────

export interface RailCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RailCard = React.forwardRef<HTMLDivElement, RailCardProps>(function RailCard(
  { className, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-rail-card=""
      className={cn(className)}
      style={{
        border: "1px solid #344153",
        borderRadius: 9,
        background: "#05070b",
        padding: 11,
        marginBottom: 14,
        ...style,
      }}
      {...props}
    />
  )
})

// ─── RailLogo ───────────────────────────────────────────────────────────────

export interface RailLogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RailLogo = React.forwardRef<HTMLDivElement, RailLogoProps>(function RailLogo(
  { className, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-rail-logo=""
      className={cn("italic", className)}
      style={{
        color: colors.cyan,
        font: `900 italic 20px/0.95 ${DISPLAY}`,
        margin: "2px 0 13px",
        ...style,
      }}
      {...props}
    />
  )
})

// ─── RailLabel (small section caption) ──────────────────────────────────────

export interface RailLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RailLabel = React.forwardRef<HTMLDivElement, RailLabelProps>(function RailLabel(
  { className, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-rail-label=""
      className={cn("uppercase font-[900]", className)}
      style={{
        fontSize: 10,
        color: "#dbe5ef",
        marginBottom: 8,
        ...style,
      }}
      {...props}
    />
  )
})

// ─── RailItem (expanded row) ────────────────────────────────────────────────

export interface RailItemProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  icon?: React.ReactNode
  active?: boolean
  disabled?: boolean
  children?: React.ReactNode
}

export const RailItem = React.forwardRef<HTMLAnchorElement, RailItemProps>(function RailItem(
  { className, style, icon, active, disabled, children, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      data-ad-rail-item=""
      data-active={active ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "grid items-center cursor-pointer uppercase font-[900]",
        className,
      )}
      style={{
        gridTemplateColumns: "24px 1fr",
        alignItems: "center",
        gap: 8,
        minHeight: 34,
        padding: "0 8px",
        borderRadius: 5,
        marginBottom: 4,
        fontSize: 11,
        color: "#f8fafc",
        ...style,
      }}
      {...props}
    >
      <span
        aria-hidden
        className="grid place-items-center [&>svg]:h-[16px] [&>svg]:w-[16px]"
        style={{ color: active ? "#001016" : colors.cyan }}
      >
        {icon}
      </span>
      <span className="truncate">{children}</span>
    </a>
  )
})

// ─── IconRail (collapsed icon-only column) ──────────────────────────────────

export interface IconRailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** layout: "column" stacks vertically (collapsed rail), "row" wraps for compact mode */
  layout?: "column" | "row"
}

export const IconRail = React.forwardRef<HTMLDivElement, IconRailProps>(function IconRail(
  { className, style, layout = "column", children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-rail-icon-grid=""
      data-layout={layout}
      className={cn(layout === "row" ? "flex flex-wrap" : "grid", className)}
      style={{
        border: "1px solid #344153",
        borderRadius: 9,
        padding: 8,
        background: "#05070b",
        marginBottom: 14,
        gap: layout === "row" ? 5 : 6,
        width: layout === "column" ? 42 : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── IconRailItem ───────────────────────────────────────────────────────────

export interface IconRailItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  active?: boolean
}

export const IconRailItem = React.forwardRef<HTMLButtonElement, IconRailItemProps>(
  function IconRailItem({ className, style, icon, active, children, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        data-ad-rail-icon-cell=""
        data-active={active ? "" : undefined}
        className={cn(
          "grid place-items-center cursor-pointer border-0",
          "[&>svg]:h-[14px] [&>svg]:w-[14px]",
          className,
        )}
        style={{
          width: 26,
          height: 26,
          borderRadius: 4,
          background: active ? colors.cyan : "transparent",
          color: active ? "#001016" : "#fff",
          ...style,
        }}
        {...props}
      >
        {icon ?? children}
      </button>
    )
  },
)
