"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./table.css"

/**
 * Table — y2k structured data table.
 *
 *   <TableRoot>
 *     <TableHead>
 *       <TableRow>
 *         <TableHeader>Name</TableHeader>
 *         <TableHeader sortable direction="asc" onSort={…}>Score</TableHeader>
 *         <TableHeader align="right">Actions</TableHeader>
 *       </TableRow>
 *     </TableHead>
 *     <TableBody>
 *       <TableRow interactive selected onClick={…}>
 *         <TableCell>Cody</TableCell>
 *         <TableCell numeric>1,200</TableCell>
 *         <TableCell align="right">…</TableCell>
 *       </TableRow>
 *     </TableBody>
 *   </TableRoot>
 *
 * For client-side sort/filter/pagination state, use DataTable instead.
 */

// ─── Root ───────────────────────────────────────────────────────────────────

export interface TableRootProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Wrap in a bordered container with overflow-x scroll. Default true. */
  bordered?: boolean
  /** Stretch table to container width. Default true. */
  full?: boolean
}

export const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>(function TableRoot(
  { className, style, bordered = true, full = true, children, ...props },
  ref,
) {
  const table = (
    <table
      ref={ref}
      data-ad-table=""
      className={cn("border-collapse", full && "w-full", className)}
      style={{
        fontSize: 12,
        color: colors.ink,
        background: colors.paper,
        ...style,
      }}
      {...props}
    >
      {children}
    </table>
  )

  if (!bordered) return table

  return (
    <div
      data-ad-table-wrap=""
      style={{
        border: `1.5px solid ${colors.ink}`,
        borderRadius: radii.md,
        boxShadow: `1px 1px 0 ${colors.ink}`,
        overflow: "hidden",
        background: colors.paper,
      }}
    >
      <div style={{ overflowX: "auto" }}>{table}</div>
    </div>
  )
})

// ─── Head / Body / Foot ─────────────────────────────────────────────────────

export const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableHead({ className, style, ...props }, ref) {
  return (
    <thead
      ref={ref}
      data-ad-table-head=""
      className={cn(className)}
      style={{
        background: colors.canvas,
        borderBottom: `1.5px solid ${colors.ink}`,
        ...style,
      }}
      {...props}
    />
  )
})

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableBody({ className, ...props }, ref) {
  return <tbody ref={ref} data-ad-table-body="" className={cn(className)} {...props} />
})

export const TableFoot = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TableFoot({ className, style, ...props }, ref) {
  return (
    <tfoot
      ref={ref}
      data-ad-table-foot=""
      className={cn(className)}
      style={{
        background: colors.canvas,
        borderTop: `1.5px solid ${colors.ink}`,
        fontWeight: 700,
        ...style,
      }}
      {...props}
    />
  )
})

// ─── Row ────────────────────────────────────────────────────────────────────

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Adds hover styling + cursor-pointer. */
  interactive?: boolean
  /** Highlights row as selected. */
  selected?: boolean
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, interactive, selected, style, ...props },
  ref,
) {
  return (
    <tr
      ref={ref}
      data-ad-table-row=""
      data-interactive={interactive ? "" : undefined}
      data-selected={selected ? "true" : undefined}
      className={cn(interactive && "cursor-pointer", className)}
      style={{
        borderBottom: `1px solid ${colors.line}`,
        transition: "background 120ms ease",
        ...style,
      }}
      {...props}
    />
  )
})

// ─── Header cell ────────────────────────────────────────────────────────────

type Align = "left" | "right" | "center"
type SortDirection = "asc" | "desc" | null

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: Align
  /** Right-align by default (matches numeric cells). */
  numeric?: boolean
  sortable?: boolean
  direction?: SortDirection
  onSort?: () => void
}

export const TableHeader = React.forwardRef<HTMLTableCellElement, TableHeaderProps>(
  function TableHeader(
    { className, align, numeric, sortable, direction = null, onSort, style, children, ...props },
    ref,
  ) {
    const effectiveAlign: Align = align ?? (numeric ? "right" : "left")
    const aria = direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"
    return (
      <th
        ref={ref}
        data-ad-table-header=""
        scope="col"
        aria-sort={sortable ? aria : undefined}
        className={cn(
          "uppercase font-[950] tracking-[0.08em] whitespace-nowrap",
          effectiveAlign === "right" && "text-right",
          effectiveAlign === "center" && "text-center",
          className,
        )}
        style={{
          padding: "10px 12px",
          fontSize: 9,
          color: colors.muted,
          ...style,
        }}
        {...props}
      >
        {sortable ? (
          <button
            type="button"
            data-ad-table-sort=""
            data-direction={direction ?? undefined}
            onClick={onSort}
            className={cn(effectiveAlign === "right" && "ml-auto", effectiveAlign === "center" && "mx-auto")}
          >
            <span>{children}</span>
            <svg
              data-ad-table-sort-icon=""
              width={8}
              height={8}
              viewBox="0 0 8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M2 5L4 3L6 5" />
            </svg>
          </button>
        ) : (
          children
        )}
      </th>
    )
  },
)

// ─── Cell ───────────────────────────────────────────────────────────────────

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: Align
  /** Right-align + tabular-nums + monospace digits. */
  numeric?: boolean
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, align, numeric, style, ...props },
  ref,
) {
  const effectiveAlign = align ?? (numeric ? "right" : "left")
  return (
    <td
      ref={ref}
      data-ad-table-cell=""
      className={cn(
        "whitespace-nowrap",
        effectiveAlign === "right" && "text-right",
        effectiveAlign === "center" && "text-center",
        className,
      )}
      style={{
        padding: "10px 12px",
        fontVariantNumeric: numeric ? "tabular-nums" : undefined,
        ...style,
      }}
      {...props}
    />
  )
})

// ─── Caption ────────────────────────────────────────────────────────────────

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(function TableCaption({ className, style, ...props }, ref) {
  return (
    <caption
      ref={ref}
      data-ad-table-caption=""
      className={cn("uppercase font-[950] tracking-[0.08em] text-left", className)}
      style={{
        captionSide: "top",
        padding: "10px 12px",
        fontSize: 10,
        color: colors.muted,
        ...style,
      }}
      {...props}
    />
  )
})
