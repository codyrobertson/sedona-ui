"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, fonts } from "./tokens"

/**
 * TopNav — y2k dark navbar with cyan OS tab + tabs slot + global search.
 * Mirrors aerodash_preview/01-shell.html .top-nav.
 *
 *   <TopNavRoot>
 *     <OsTab>OS</OsTab>
 *     <TopNavTabs>
 *       <TabsRoot defaultValue="shell">
 *         <TabsList>...</TabsList>
 *       </TabsRoot>
 *     </TopNavTabs>
 *     <GlobalSearch placeholder="Search…" shortcut="/" onChange={…} />
 *     <FilterIcon onClick={…} />
 *   </TopNavRoot>
 */

const DISPLAY = fonts.display

// ─── Root ───────────────────────────────────────────────────────────────────

export interface TopNavRootProps extends React.HTMLAttributes<HTMLElement> {}

export const TopNavRoot = React.forwardRef<HTMLElement, TopNavRootProps>(function TopNavRoot(
  { className, style, children, ...props },
  ref,
) {
  return (
    <nav
      ref={ref}
      data-ad-topnav=""
      className={cn("grid items-center", className)}
      style={{
        background: "#020409",
        color: "#fff",
        borderBottom: "2px solid #101722",
        gridTemplateColumns: "auto 1fr 390px 44px",
        height: 42,
        contain: "layout paint",
        ...style,
      }}
      {...props}
    >
      {children}
    </nav>
  )
})

// ─── OsTab (cyan chevron brand chip) ────────────────────────────────────────

export interface OsTabProps extends React.HTMLAttributes<HTMLDivElement> {}

export const OsTab = React.forwardRef<HTMLDivElement, OsTabProps>(function OsTab(
  { className, style, children = "OS", ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-topnav-os=""
      className={cn("grid place-items-center", className)}
      style={{
        marginLeft: 14,
        width: 74,
        height: 30,
        background: colors.cyan,
        color: "#001016",
        font: `900 28px/1 ${DISPLAY}`,
        clipPath: "polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── Tabs slot wrapper ──────────────────────────────────────────────────────

export interface TopNavTabsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TopNavTabs = React.forwardRef<HTMLDivElement, TopNavTabsProps>(function TopNavTabs(
  { className, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-topnav-tabs=""
      className={cn("flex items-stretch h-full", className)}
      style={style}
      {...props}
    />
  )
})

// ─── GlobalSearch ───────────────────────────────────────────────────────────

export interface GlobalSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  shortcut?: React.ReactNode
  /** Wrapper className. Use `className` for the input. */
  rootClassName?: string
  rootStyle?: React.CSSProperties
}

export const GlobalSearch = React.forwardRef<HTMLInputElement, GlobalSearchProps>(
  function GlobalSearch(
    { className, style, shortcut = "/", rootClassName, rootStyle, ...props },
    ref,
  ) {
    return (
      <label
        data-ad-topnav-search=""
        className={cn("flex items-center", rootClassName)}
        style={{
          height: 30,
          border: "1px solid #657082",
          borderRadius: 7,
          background: "#05070b",
          color: "#fff",
          gap: 8,
          padding: "0 10px",
          ...rootStyle,
        }}
      >
        <span aria-hidden style={{ fontSize: 14, color: "#9aa3af" }}>⌕</span>
        <input
          ref={ref}
          type="text"
          className={cn("flex-1 bg-transparent border-0 outline-none", className)}
          style={{ color: "#dbeafe", fontSize: 12, ...style }}
          {...props}
        />
        {shortcut ? (
          <kbd
            style={{
              fontSize: 10,
              border: "1px solid #4b5563",
              borderRadius: 3,
              padding: "1px 4px",
              color: colors.cyan,
            }}
          >
            {shortcut}
          </kbd>
        ) : null}
      </label>
    )
  },
)

// ─── FilterIcon ─────────────────────────────────────────────────────────────

export interface FilterIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const FilterIcon = React.forwardRef<HTMLButtonElement, FilterIconProps>(function FilterIcon(
  { className, style, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      data-ad-topnav-filter=""
      className={cn("grid place-items-center cursor-pointer", className)}
      style={{
        width: 32,
        height: 30,
        border: "1px solid #657082",
        borderRadius: 6,
        background: "#05070b",
        color: "#fff",
        marginLeft: 8,
        ...style,
      }}
      {...props}
    >
      {children ?? (
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
          <path d="M2 4h10M4 7h6M5.5 10h3" />
        </svg>
      )}
    </button>
  )
})
