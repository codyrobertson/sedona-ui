"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import {
  defaultAccessor,
  defaultFilter,
  filterDataTableRows,
  getNextDataTableSort,
  paginateDataTableRows,
  sortDataTableRows,
  type DataTableColumn,
  type DataTableSort,
} from "./data-table-core"
import { useDataTableState } from "./data-table-state"
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "./table"

/**
 * DataTable — Table primitive + client-side sort, filter, pagination.
 *
 *   <DataTable
 *     data={rows}
 *     columns={[
 *       { key: "name", header: "Name", sortable: true },
 *       { key: "score", header: "Score", numeric: true, sortable: true },
 *       { key: "actions", header: "", cell: (row) => <Button>Edit</Button> },
 *     ]}
 *     pageSize={10}
 *     filterable
 *     getRowKey={(row) => row.id}
 *   />
 *
 * For uncontrolled use, pass nothing else. For controlled state, pass
 * `sort`, `onSortChange`, `page`, `onPageChange`, `query`, `onQueryChange`.
 */

export interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  /** Stable id; defaults to array index. */
  getRowKey?: (row: T, index: number) => React.Key
  pageSize?: number
  /** Show a search input above the table. */
  filterable?: boolean
  /** Override which columns are searched. By default, all `filterable !== false`. */
  filterFn?: (row: T, query: string, columns: DataTableColumn<T>[]) => boolean
  /** Empty-state row count fallback. */
  emptyText?: React.ReactNode
  onRowClick?: (row: T) => void
  isRowSelected?: (row: T) => boolean
  // Controlled state (optional)
  sort?: DataTableSort | null
  onSortChange?: (sort: DataTableSort | null) => void
  page?: number
  onPageChange?: (page: number) => void
  query?: string
  onQueryChange?: (query: string) => void
  className?: string
}

export function DataTable<T>({
  data,
  columns,
  getRowKey,
  pageSize = 10,
  filterable = false,
  filterFn = defaultFilter,
  emptyText = "No results",
  onRowClick,
  isRowSelected,
  sort: sortProp,
  onSortChange,
  page: pageProp,
  onPageChange,
  query: queryProp,
  onQueryChange,
  className,
}: DataTableProps<T>) {
  const { sort, page, query, setSort, setPage, setQuery } = useDataTableState({
    sort: sortProp,
    onSortChange,
    page: pageProp,
    onPageChange,
    query: queryProp,
    onQueryChange,
  })

  const filtered = React.useMemo(() => {
    return filterDataTableRows(data, columns, query, filterFn)
  }, [data, query, columns, filterFn])

  const sorted = React.useMemo(() => {
    return sortDataTableRows(filtered, columns, sort)
  }, [filtered, sort, columns])

  const { pageRows, totalPages, safePage } = React.useMemo(
    () => paginateDataTableRows(sorted, page, pageSize),
    [page, pageSize, sorted],
  )

  const handleSort = (col: DataTableColumn<T>) => {
    if (!col.sortable) return
    setSort(getNextDataTableSort(sort, col))
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {filterable ? (
        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            data-ad-data-table-search=""
            className="outline-none"
            style={{
              height: 32,
              padding: "0 12px",
              fontSize: 12,
              fontWeight: 600,
              color: colors.ink,
              background: colors.paper,
              border: `1.5px solid ${colors.ink}`,
              borderRadius: radii.md,
              boxShadow: `1px 1px 0 ${colors.ink}`,
              minWidth: 220,
            }}
          />
          <span style={{ fontSize: 10, color: colors.muted, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {sorted.length} {sorted.length === 1 ? "row" : "rows"}
          </span>
        </div>
      ) : null}

      <TableRoot>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableHeader
                key={col.key}
                align={col.align ?? (col.numeric ? "right" : "left")}
                sortable={col.sortable}
                direction={sort?.key === col.key ? sort.direction : null}
                onSort={() => handleSort(col)}
                style={col.width != null ? { width: col.width } : undefined}
              >
                {col.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {pageRows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                align="center"
                style={{ padding: "24px 12px", color: colors.muted, fontStyle: "italic" }}
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            pageRows.map((row, i) => {
              const idx = safePage * pageSize + i
              const key = getRowKey ? getRowKey(row, idx) : idx
              return (
                <TableRow
                  key={key}
                  interactive={!!onRowClick}
                  selected={isRowSelected?.(row)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((col) => {
                    const acc = col.accessor ?? ((r: T) => defaultAccessor(r, col.key))
                    const content = col.cell ? col.cell(row, idx) : (acc(row) ?? "")
                    return (
                      <TableCell
                        key={col.key}
                        align={col.align}
                        numeric={col.numeric}
                      >
                        {content as React.ReactNode}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })
          )}
        </TableBody>
      </TableRoot>

      {totalPages > 1 ? (
        <div
          className="flex items-center justify-between"
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: colors.muted,
          }}
        >
          <span>
            Page {safePage + 1} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <PagerButton
              disabled={safePage === 0}
              onClick={() => setPage(Math.max(0, safePage - 1))}
              aria-label="Previous page"
            >
              <svg width={10} height={10} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.5 2L3.5 5L6.5 8" />
              </svg>
            </PagerButton>
            <PagerButton
              disabled={safePage >= totalPages - 1}
              onClick={() => setPage(Math.min(totalPages - 1, safePage + 1))}
              aria-label="Next page"
            >
              <svg width={10} height={10} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.5 2L6.5 5L3.5 8" />
              </svg>
            </PagerButton>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export type { DataTableColumn, DataTableSort } from "./data-table-core"

function PagerButton({
  disabled,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="grid place-items-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
      style={{
        width: 26,
        height: 26,
        background: colors.paper,
        color: colors.ink,
        border: `1.5px solid ${colors.ink}`,
        borderRadius: radii.sm,
        boxShadow: disabled ? "none" : `1px 1px 0 ${colors.ink}`,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
