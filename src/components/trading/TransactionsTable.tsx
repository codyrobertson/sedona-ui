"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { FileText, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { MOCK_TRANSACTIONS } from "@/fixtures/transactions"

export interface Transaction {
  id: string
  date: string
  trader: string
  type: "BUY" | "SELL"
  price: string
  amountUsd: string
  amountToken: string
  amountSol: string
}

export interface TransactionsTableProps extends React.HTMLAttributes<HTMLDivElement> {
  ticker: string
  transactions?: Transaction[]
  pageSize?: number
}

const TransactionsTable = React.forwardRef<HTMLDivElement, TransactionsTableProps>(
  (
    {
      className,
      ticker,
      transactions = MOCK_TRANSACTIONS,
      pageSize = 8,
      ...props
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = React.useState(1)
    const totalPages = Math.ceil(transactions.length / pageSize)

    const paginatedTransactions = transactions.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    )

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden flex flex-col flex-1 min-h-0",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-zeus-surface-neutral border border-zeus-border-alpha border-b-0 rounded-t-xl">
          <FileText className="w-4 h-4 text-zeus-text-secondary" />
          <span className="text-caption-l font-semibold text-zeus-text-primary">Transactions</span>
        </div>

        {/* Table */}
        <div className="bg-zeus-surface-default border border-zeus-border-alpha border-t-0 rounded-b-xl flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Scrollable table area */}
          <div className="flex-1 min-h-0 overflow-auto">
            <table className="w-full min-w-[500px]">
              {/* Table Header */}
              <thead className="sticky top-0 bg-zeus-surface-default z-10">
                <tr className="border-b border-zeus-border-alpha text-zeus-text-tertiary text-caption-l font-medium">
                  <th className="text-left px-4 py-3 whitespace-nowrap">Date</th>
                  <th className="text-left px-3 py-3">Trader</th>
                  <th className="text-left px-3 py-3 whitespace-nowrap">TXN</th>
                  <th className="text-right px-3 py-3 whitespace-nowrap">Price</th>
                  <th className="text-right px-3 py-3 whitespace-nowrap">AMT/USD</th>
                  <th className="text-right px-4 py-3 whitespace-nowrap">AMT/{ticker}</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {paginatedTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-zeus-border-alpha last:border-b-0 hover:bg-zeus-surface-neutral/30 transition-colors"
                  >
                    <td className="text-zeus-text-tertiary text-caption-l font-mono px-4 py-3 whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="text-zeus-text-secondary text-caption-l font-mono px-3 py-3">
                      <span className="truncate block max-w-[180px]">{tx.trader}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded text-caption-s font-semibold inline-block",
                          tx.type === "BUY"
                            ? "bg-zeus-status-success/20 text-zeus-status-success"
                            : "bg-zeus-status-destructive/20 text-zeus-status-destructive"
                        )}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className={cn(
                      "text-right text-caption-l font-mono font-medium px-3 py-3 whitespace-nowrap",
                      tx.type === "BUY" ? "text-zeus-status-success" : "text-zeus-status-destructive"
                    )}>
                      {tx.price}
                    </td>
                    <td className="text-right text-caption-l font-mono text-zeus-text-primary px-3 py-3 whitespace-nowrap">
                      {tx.amountUsd}
                    </td>
                    <td className="text-right text-caption-l font-mono text-zeus-text-primary px-4 py-3 whitespace-nowrap">
                      {tx.amountToken}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-t border-zeus-border-alpha bg-zeus-surface-default">
            <span className="text-caption-l text-zeus-text-tertiary">
              Page {currentPage} of {totalPages}
            </span>
            <Pagination className="mx-0 w-auto justify-end">
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    aria-label="Go to previous page"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(p => Math.max(1, p - 1))
                    }}
                    className={cn(
                      "h-7 w-7 hover:bg-zeus-surface-elevated",
                      currentPage === 1 && "pointer-events-none opacity-30"
                    )}
                    aria-disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 text-zeus-text-secondary" />
                  </PaginationLink>
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page)
                      }}
                      isActive={currentPage === page}
                      className={cn(
                        "w-8 h-8 text-caption-l font-medium transition-colors",
                        currentPage === page
                          ? "bg-sedona-500 text-white border-sedona-500 hover:bg-sedona-600 hover:text-white"
                          : "text-zeus-text-tertiary hover:bg-zeus-surface-elevated border-transparent"
                      )}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    aria-label="Go to next page"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(p => Math.min(totalPages, p + 1))
                    }}
                    className={cn(
                      "h-7 w-7 hover:bg-zeus-surface-elevated",
                      currentPage === totalPages && "pointer-events-none opacity-30"
                    )}
                    aria-disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4 text-zeus-text-secondary" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    )
  }
)

TransactionsTable.displayName = "TransactionsTable"

export { TransactionsTable }
