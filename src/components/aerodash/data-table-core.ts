import type * as React from "react"

export interface DataTableColumn<T> {
  key: string
  header: React.ReactNode
  /** Pull a primitive sortable/filterable value from a row. Defaults to `row[key]`. */
  accessor?: (row: T) => string | number | null | undefined
  /** Custom cell renderer. Defaults to a string of the accessor value. */
  cell?: (row: T, index: number) => React.ReactNode
  sortable?: boolean
  numeric?: boolean
  align?: "left" | "right" | "center"
  width?: number | string
  /** When false, this column is excluded from the global text filter. Default true. */
  filterable?: boolean
}

export interface DataTableSort {
  key: string
  direction: "asc" | "desc"
}

export interface DataTableState {
  sort: DataTableSort | null
  page: number
  query: string
}

export function defaultAccessor<T>(row: T, key: string): string | number | null | undefined {
  const value = (row as Record<string, unknown>)[key]
  if (value == null) return value as null | undefined
  if (typeof value === "string" || typeof value === "number") return value
  return String(value)
}

export function defaultFilter<T>(
  row: T,
  query: string,
  columns: DataTableColumn<T>[],
): boolean {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return true

  for (const column of columns) {
    if (column.filterable === false) continue

    const accessor = column.accessor ?? ((currentRow: T) => defaultAccessor(currentRow, column.key))
    const value = accessor(row)
    if (value != null && String(value).toLowerCase().includes(normalizedQuery)) {
      return true
    }
  }

  return false
}

export function filterDataTableRows<T>(
  data: T[],
  columns: DataTableColumn<T>[],
  query: string,
  filterFn: (row: T, query: string, columns: DataTableColumn<T>[]) => boolean = defaultFilter,
): T[] {
  if (!query) return data
  return data.filter((row) => filterFn(row, query, columns))
}

export function sortDataTableRows<T>(
  rows: T[],
  columns: DataTableColumn<T>[],
  sort: DataTableSort | null,
): T[] {
  if (!sort) return rows

  const column = columns.find((candidate) => candidate.key === sort.key)
  if (!column) return rows

  const accessor = column.accessor ?? ((row: T) => defaultAccessor(row, column.key))
  const direction = sort.direction === "asc" ? 1 : -1

  return [...rows].sort((a, b) => {
    const aValue = accessor(a)
    const bValue = accessor(b)

    if (aValue == null && bValue == null) return 0
    if (aValue == null) return 1
    if (bValue == null) return -1
    if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * direction
    }

    return String(aValue).localeCompare(String(bValue)) * direction
  })
}

export function paginateDataTableRows<T>(
  rows: T[],
  page: number,
  pageSize: number,
): { pageRows: T[]; totalPages: number; safePage: number } {
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))
  const safePage = Math.min(Math.max(0, page), totalPages - 1)

  return {
    pageRows: rows.slice(safePage * pageSize, safePage * pageSize + pageSize),
    totalPages,
    safePage,
  }
}

export function getNextDataTableSort<T>(
  sort: DataTableSort | null,
  column: DataTableColumn<T>,
): DataTableSort | null {
  if (!column.sortable) return null
  if (!sort || sort.key !== column.key) return { key: column.key, direction: "asc" }
  if (sort.direction === "asc") return { key: column.key, direction: "desc" }
  return null
}
