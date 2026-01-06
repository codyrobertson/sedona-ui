"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ============================================================================
// DATA TABLE PRIMITIVES - Composable table building blocks
// ============================================================================

export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="table"
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DataTable.displayName = "DataTable"

// ============================================================================
// TABLE HEADER
// ============================================================================

export interface DataTableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  sticky?: boolean
}

const DataTableHeader = React.forwardRef<HTMLDivElement, DataTableHeaderProps>(
  ({ className, children, sticky = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="rowgroup"
        className={cn(
          "border-b border-zeus-border-alpha",
          sticky && "sticky top-0 z-10 bg-zeus-surface-default",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DataTableHeader.displayName = "DataTableHeader"

// ============================================================================
// TABLE BODY
// ============================================================================

export interface DataTableBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DataTableBody = React.forwardRef<HTMLDivElement, DataTableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="rowgroup"
        className={cn("divide-y divide-zeus-border-alpha", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DataTableBody.displayName = "DataTableBody"

// ============================================================================
// TABLE ROW
// ============================================================================

export interface DataTableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  interactive?: boolean
  selected?: boolean
}

const DataTableRow = React.forwardRef<HTMLDivElement, DataTableRowProps>(
  ({ className, children, interactive = true, selected = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="row"
        className={cn(
          "flex items-center gap-4 px-4 py-3",
          interactive && "hover:bg-zeus-surface-elevated transition-colors cursor-pointer",
          selected && "bg-zeus-surface-elevated",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DataTableRow.displayName = "DataTableRow"

// ============================================================================
// TABLE HEAD CELL
// ============================================================================

export interface DataTableHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  sortable?: boolean
  sortDirection?: "asc" | "desc" | null
  onSort?: () => void
  width?: string | number
  align?: "left" | "center" | "right"
}

const DataTableHead = React.forwardRef<HTMLDivElement, DataTableHeadProps>(
  ({
    className,
    children,
    sortable = false,
    sortDirection,
    onSort,
    width,
    align = "left",
    ...props
  }, ref) => {
    const alignClasses = {
      left: "justify-start text-left",
      center: "justify-center text-center",
      right: "justify-end text-right",
    }

    return (
      <div
        ref={ref}
        role="columnheader"
        className={cn(
          "flex items-center gap-1 px-2 py-2",
          "text-caption-s font-medium text-zeus-text-quaternary uppercase tracking-wider",
          alignClasses[align],
          sortable && "cursor-pointer hover:text-zeus-text-secondary transition-colors select-none",
          className
        )}
        style={{ width, minWidth: width, flexGrow: width ? 0 : 1, flexShrink: width ? 0 : 1 }}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        {children}
        {sortable && sortDirection && (
          <span className="text-zeus-text-tertiary">
            {sortDirection === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    )
  }
)
DataTableHead.displayName = "DataTableHead"

// ============================================================================
// TABLE CELL
// ============================================================================

export interface DataTableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  width?: string | number
  align?: "left" | "center" | "right"
}

const DataTableCell = React.forwardRef<HTMLDivElement, DataTableCellProps>(
  ({ className, children, width, align = "left", ...props }, ref) => {
    const alignClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    }

    return (
      <div
        ref={ref}
        role="cell"
        className={cn(
          "flex items-center",
          alignClasses[align],
          className
        )}
        style={{ width, minWidth: width, flexGrow: width ? 0 : 1, flexShrink: width ? 0 : 1 }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DataTableCell.displayName = "DataTableCell"

// ============================================================================
// EMPTY STATE
// ============================================================================

export interface DataTableEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title?: string
  description?: string
}

const DataTableEmpty = React.forwardRef<HTMLDivElement, DataTableEmptyProps>(
  ({ className, icon, title = "No data", description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-12 px-4 text-center",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="mb-3 text-zeus-text-quaternary">
            {icon}
          </div>
        )}
        <p className="text-body-s font-medium text-zeus-text-secondary">{title}</p>
        {description && (
          <p className="mt-1 text-caption-l text-zeus-text-tertiary">{description}</p>
        )}
      </div>
    )
  }
)
DataTableEmpty.displayName = "DataTableEmpty"

// ============================================================================
// LOADING STATE
// ============================================================================

export interface DataTableLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number
}

const DataTableLoading = React.forwardRef<HTMLDivElement, DataTableLoadingProps>(
  ({ className, rows = 5, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("divide-y divide-zeus-border-alpha", className)} {...props}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3 animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-zeus-surface-neutral" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-zeus-surface-neutral" />
              <div className="h-3 w-1/4 rounded bg-zeus-surface-neutral-subtle" />
            </div>
            <div className="h-4 w-16 rounded bg-zeus-surface-neutral" />
            <div className="h-4 w-20 rounded bg-zeus-surface-neutral" />
          </div>
        ))}
      </div>
    )
  }
)
DataTableLoading.displayName = "DataTableLoading"

export {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableHead,
  DataTableCell,
  DataTableEmpty,
  DataTableLoading,
}
