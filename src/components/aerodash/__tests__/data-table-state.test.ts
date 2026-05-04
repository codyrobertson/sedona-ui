import { describe, expect, it, vi } from "vitest"

import {
  filterDataTableRows,
  getNextDataTableSort,
  paginateDataTableRows,
  sortDataTableRows,
  type DataTableColumn,
  type DataTableSort,
} from "../data-table-core"

interface Row {
  id: string
  name: string
  score: number
  hidden?: string
}

const rows: Row[] = [
  { id: "b", name: "Beta", score: 10, hidden: "private" },
  { id: "a", name: "Alpha", score: 30, hidden: "secret" },
  { id: "c", name: "Gamma", score: 20, hidden: "quiet" },
]

const columns: DataTableColumn<Row>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "score", header: "Score", sortable: true, numeric: true },
  { key: "hidden", header: "Hidden", filterable: false },
]

describe("data-table-state", () => {
  it("filters rows through searchable columns only", () => {
    expect(filterDataTableRows(rows, columns, "alp")).toEqual([rows[1]])
    expect(filterDataTableRows(rows, columns, "secret")).toEqual([])
  })

  it("allows a custom filter without coupling it to render state", () => {
    const filterFn = vi.fn((row: Row, query: string) => row.id === query)

    expect(filterDataTableRows(rows, columns, "c", filterFn)).toEqual([rows[2]])
    expect(filterFn).toHaveBeenCalledWith(rows[0], "c", columns)
  })

  it("sorts immutably by the configured accessor", () => {
    const sort: DataTableSort = { key: "score", direction: "desc" }
    const sorted = sortDataTableRows(rows, columns, sort)

    expect(sorted.map((row) => row.id)).toEqual(["a", "c", "b"])
    expect(rows.map((row) => row.id)).toEqual(["b", "a", "c"])
  })

  it("cycles sort state through ascending, descending, and cleared", () => {
    expect(getNextDataTableSort(null, columns[0])).toEqual({ key: "name", direction: "asc" })
    expect(getNextDataTableSort({ key: "name", direction: "asc" }, columns[0])).toEqual({
      key: "name",
      direction: "desc",
    })
    expect(getNextDataTableSort({ key: "name", direction: "desc" }, columns[0])).toBeNull()
    expect(getNextDataTableSort(null, { key: "name", header: "Name" })).toBeNull()
  })

  it("clamps pagination and returns the visible slice", () => {
    expect(paginateDataTableRows(rows, 4, 2)).toEqual({
      pageRows: [rows[2]],
      totalPages: 2,
      safePage: 1,
    })
  })
})
