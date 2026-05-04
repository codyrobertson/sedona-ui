"use client"

import * as React from "react"

import type { DataTableSort } from "./data-table-core"
import { useControllableState } from "./use-controllable-state"

export interface UseDataTableStateProps {
  sort?: DataTableSort | null
  onSortChange?: (sort: DataTableSort | null) => void
  page?: number
  onPageChange?: (page: number) => void
  query?: string
  onQueryChange?: (query: string) => void
  defaultSort?: DataTableSort | null
  defaultPage?: number
  defaultQuery?: string
}

export function useDataTableState({
  sort: controlledSort,
  onSortChange,
  page: controlledPage,
  onPageChange,
  query: controlledQuery,
  onQueryChange,
  defaultSort = null,
  defaultPage = 0,
  defaultQuery = "",
}: UseDataTableStateProps) {
  const [sort, setSortValue] = useControllableState<DataTableSort | null>({
    value: controlledSort,
    defaultValue: defaultSort,
    onChange: onSortChange,
  })
  const [page, setPage] = useControllableState<number>({
    value: controlledPage,
    defaultValue: defaultPage,
    onChange: onPageChange,
  })
  const [query, setQueryValue] = useControllableState<string>({
    value: controlledQuery,
    defaultValue: defaultQuery,
    onChange: onQueryChange,
  })

  const setSort = React.useCallback(
    (nextSort: DataTableSort | null) => {
      setSortValue(nextSort)
      setPage(0)
    },
    [setPage, setSortValue],
  )

  const setQuery = React.useCallback(
    (nextQuery: string) => {
      setQueryValue(nextQuery)
      setPage(0)
    },
    [setPage, setQueryValue],
  )

  return React.useMemo(
    () => ({
      sort,
      page,
      query,
      setSort,
      setPage,
      setQuery,
    }),
    [page, query, setPage, setQuery, setSort, sort],
  )
}
