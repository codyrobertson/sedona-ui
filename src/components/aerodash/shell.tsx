"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, fonts, fontSize, fontWeight, letterSpacing } from "./tokens"

/**
 * AppShell — top-level grid layout that hosts TitleBlock + TopNav + SideRail
 * + content + AppFooter. Mirrors aerodash_preview/01-shell.html .ad-app.
 *
 *   <AppShell>
 *     <TitleBlock … />              row 1, full width
 *     <TopNav>…</TopNav>            row 2, full width
 *     <SideRail>…</SideRail>        row 3, col 1
 *     <AppContent>…</AppContent>    row 3, col 2
 *     <AppFooter>…</AppFooter>      row 4, full width
 *   </AppShell>
 *
 * Children are placed by their own grid-row/col styles — AppShell just defines
 * the grid template. Use the slot helpers below for sane defaults.
 */

const DISPLAY = fonts.display

// ─── Context ────────────────────────────────────────────────────────────────

const ShellContext = React.createContext<{ hasRail: boolean }>({ hasRail: false })

// ─── AppShell ───────────────────────────────────────────────────────────────

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the optional side rail column. Pass `0` or omit to skip the rail. Default 0 (no rail). */
  railWidth?: number
  /** Adds the cyan outer chrome border (decorative, mirrors reference). Default true. */
  bordered?: boolean
  /** Hide the bottom footer row. Default false. */
  noFooter?: boolean
}

export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { className, style, railWidth = 0, bordered = true, noFooter = false, children, ...props },
  ref,
) {
  const hasRail = railWidth > 0
  return (
    <ShellContext.Provider value={{ hasRail }}>
      <div
        ref={ref}
        data-ad-shell=""
        data-has-rail={hasRail ? "" : undefined}
        className={cn("grid", className)}
        style={{
          minHeight: "100vh",
          background: "#05070b",
          gridTemplateColumns: hasRail ? `${railWidth}px minmax(0, 1fr)` : "minmax(0, 1fr)",
          // Header + nav rows auto-size to slot content; content fills, footer auto.
          gridTemplateRows: noFooter
            ? "auto auto minmax(0, 1fr)"
            : "auto auto minmax(0, 1fr) auto",
          border: bordered ? `2px solid ${colors.cyan}` : undefined,
          boxShadow: bordered ? "inset 0 0 0 1px #000" : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </ShellContext.Provider>
  )
})

// ─── Slot helpers — wrap children with the right grid placement ─────────────

export const ShellHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ShellHeader({ className, style, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-ad-shell-header=""
      className={cn(className)}
      style={{ gridColumn: "1 / -1", gridRow: "1", ...style }}
      {...props}
    />
  )
})

export const ShellNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ShellNav({ className, style, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-ad-shell-nav=""
      className={cn(className)}
      style={{ gridColumn: "1 / -1", gridRow: "2", ...style }}
      {...props}
    />
  )
})

export const ShellRail = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function ShellRail({ className, style, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-ad-shell-rail=""
      className={cn(className)}
      style={{ gridColumn: "1", gridRow: "3", ...style }}
      {...props}
    />
  )
})

export interface AppContentProps extends React.HTMLAttributes<HTMLElement> {}

export const AppContent = React.forwardRef<HTMLElement, AppContentProps>(function AppContent(
  { className, style, ...props },
  ref,
) {
  const { hasRail } = React.useContext(ShellContext)
  return (
    <main
      ref={ref}
      data-ad-shell-content=""
      className={cn("overflow-auto", className)}
      style={{
        gridColumn: hasRail ? "2" : "1 / -1",
        gridRow: "3",
        background: colors.paper,
        padding: 14,
        ...style,
      }}
      {...props}
    />
  )
})

// ─── AppFooter ──────────────────────────────────────────────────────────────

export interface AppFooterProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode
  /** Center content (description / breadcrumb). */
  description?: React.ReactNode
  /** Show the cyan diagonal-stripe progress band. Default true. */
  progress?: boolean
  /** Right-side warning stamp. */
  stamp?: React.ReactNode
}

export const AppFooter = React.forwardRef<HTMLElement, AppFooterProps>(function AppFooter(
  { className, style, brand, description, progress = true, stamp, children, ...props },
  ref,
) {
  return (
    <footer
      ref={ref}
      data-ad-shell-footer=""
      className={cn("grid items-center uppercase", className)}
      style={{
        gridColumn: "1 / -1",
        gridRow: "4",
        background: "#000",
        color: "#fff",
        borderTop: "2px solid #101722",
        gridTemplateColumns: "210px 1fr 250px 150px",
        gap: 18,
        padding: "0 18px",
        fontSize: fontSize.xs,
        fontWeight: fontWeight.black,
        letterSpacing: letterSpacing.wider,
        // Footer is paint-isolated and never causes layout shift in the
        // body — keep it out of the page's reflow tree.
        contain: "layout paint",
        ...style,
      }}
      {...props}
    >
      {brand != null ? (
        <div
          className="italic"
          style={{
            color: colors.cyan,
            fontFamily: DISPLAY,
            fontWeight: fontWeight.black,
            fontStyle: "italic",
            fontSize: 22,
            // Long brand strings should ellipsis rather than push the
            // description column to the right.
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            minWidth: 0,
          }}
        >
          {brand}
        </div>
      ) : (
        <span aria-hidden />
      )}
      {description != null ? <div>{description}</div> : <span aria-hidden />}
      {progress ? (
        <div
          aria-hidden
          style={{
            height: 13,
            background: `repeating-linear-gradient(120deg, ${colors.cyan} 0 12px, transparent 12px 19px)`,
            opacity: 0.85,
          }}
        />
      ) : (
        <span aria-hidden />
      )}
      {stamp != null ? (
        <div
          style={{
            color: colors.pink,
            border: "1px solid #6b1230",
            borderRadius: 6,
            padding: 8,
            textAlign: "center",
            lineHeight: 1.25,
            background: "#06080d",
          }}
        >
          {stamp}
        </div>
      ) : (
        <span aria-hidden />
      )}
      {children}
    </footer>
  )
})
