"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { FileText, ChevronLeft, ChevronRight } from "lucide-react"

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

// More mock data for pagination
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", date: "4h ago", trader: "5z6JsFXt...RN9i", type: "BUY", price: "12.868", amountUsd: "19,409.00", amountToken: "19,409.00", amountSol: "19,409.00" },
  { id: "2", date: "2h ago", trader: "8xK2Df66...7e3f", type: "SELL", price: "1.722", amountUsd: "2,354.00", amountToken: "2,354.00", amountSol: "2,354.00" },
  { id: "3", date: "3h ago", trader: "3979797d...9b7e", type: "BUY", price: "11.146", amountUsd: "17,055.00", amountToken: "17,055.00", amountSol: "17,055.00" },
  { id: "4", date: "6h ago", trader: "7zA5908e...8f4h", type: "SELL", price: "6.909", amountUsd: "10,405.00", amountToken: "10,405.00", amountSol: "10,405.00" },
  { id: "5", date: "5d ago", trader: "2bM6Fg88...g5i3", type: "SELL", price: "4.237", amountUsd: "6,650.00", amountToken: "6,650.00", amountSol: "6,650.00" },
  { id: "6", date: "1w ago", trader: "9yL4Ef77...4h2k", type: "BUY", price: "8.521", amountUsd: "3,200.00", amountToken: "3,200.00", amountSol: "3,200.00" },
  { id: "7", date: "1w ago", trader: "4kM8Gh99...5j2l", type: "BUY", price: "7.234", amountUsd: "5,100.00", amountToken: "5,100.00", amountSol: "5,100.00" },
  { id: "8", date: "2w ago", trader: "6pN2Ji00...8m4n", type: "SELL", price: "9.876", amountUsd: "8,750.00", amountToken: "8,750.00", amountSol: "8,750.00" },
  { id: "9", date: "2w ago", trader: "1qO3Kj11...9n5o", type: "BUY", price: "5.432", amountUsd: "4,200.00", amountToken: "4,200.00", amountSol: "4,200.00" },
  { id: "10", date: "3w ago", trader: "2rP4Lk22...0o6p", type: "SELL", price: "3.210", amountUsd: "2,100.00", amountToken: "2,100.00", amountSol: "2,100.00" },
  { id: "11", date: "3w ago", trader: "3sQ5Ml33...1p7q", type: "BUY", price: "6.789", amountUsd: "9,800.00", amountToken: "9,800.00", amountSol: "9,800.00" },
  { id: "12", date: "1m ago", trader: "4tR6Nm44...2q8r", type: "BUY", price: "4.567", amountUsd: "3,450.00", amountToken: "3,450.00", amountSol: "3,450.00" },
  { id: "13", date: "1m ago", trader: "5uS7On55...3r9s", type: "SELL", price: "8.901", amountUsd: "7,600.00", amountToken: "7,600.00", amountSol: "7,600.00" },
  { id: "14", date: "1m ago", trader: "6vT8Po66...4s0t", type: "BUY", price: "2.345", amountUsd: "1,800.00", amountToken: "1,800.00", amountSol: "1,800.00" },
  { id: "15", date: "2m ago", trader: "7wU9Qp77...5t1u", type: "SELL", price: "5.678", amountUsd: "4,900.00", amountToken: "4,900.00", amountSol: "4,900.00" },
]

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
        <div className="bg-zeus-surface-default border border-zeus-border-alpha border-t-0 rounded-b-xl flex flex-col flex-1 min-h-0">
          {/* Table Header */}
          <div className="flex-shrink-0 grid grid-cols-[70px_1fr_60px_80px] sm:grid-cols-[80px_minmax(120px,1fr)_70px_100px_110px] md:grid-cols-[80px_minmax(120px,1fr)_70px_100px_110px_110px] lg:grid-cols-[90px_minmax(140px,1fr)_80px_120px_130px_130px_130px] gap-3 px-4 py-3 border-b border-zeus-border-alpha text-zeus-text-tertiary text-[11px] sm:text-xs lg:text-caption-s font-medium">
            <div>Date</div>
            <div>Trader</div>
            <div>TXN</div>
            <div className="text-right hidden sm:block">Price</div>
            <div className="text-right hidden sm:block">AMT/USD</div>
            <div className="text-right hidden md:block">AMT/{ticker}</div>
            <div className="text-right">AMT</div>
          </div>

          {/* Table Body */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {paginatedTransactions.map((tx) => (
              <div
                key={tx.id}
                className="grid grid-cols-[70px_1fr_60px_80px] sm:grid-cols-[80px_minmax(120px,1fr)_70px_100px_110px] md:grid-cols-[80px_minmax(120px,1fr)_70px_100px_110px_110px] lg:grid-cols-[90px_minmax(140px,1fr)_80px_120px_130px_130px_130px] gap-3 px-4 py-3 border-b border-zeus-border-alpha last:border-b-0 items-center hover:bg-zeus-surface-neutral/30 transition-colors"
              >
                <div className="text-zeus-text-tertiary text-[11px] sm:text-xs lg:text-caption-s font-mono">
                  {tx.date}
                </div>
                <div className="text-zeus-text-secondary text-[11px] sm:text-xs lg:text-caption-s font-mono truncate">
                  {tx.trader}
                </div>
                <div>
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-[10px] sm:text-[11px] lg:text-xs font-semibold",
                      tx.type === "BUY"
                        ? "bg-zeus-status-success/20 text-zeus-status-success"
                        : "bg-zeus-status-destructive/20 text-zeus-status-destructive"
                    )}
                  >
                    {tx.type}
                  </span>
                </div>
                <div className={cn(
                  "text-right text-[11px] sm:text-xs lg:text-caption-s font-mono font-medium hidden sm:block",
                  tx.type === "BUY" ? "text-zeus-status-success" : "text-zeus-status-destructive"
                )}>
                  {tx.price}
                </div>
                <div className="text-right text-[11px] sm:text-xs lg:text-caption-s font-mono text-zeus-text-primary hidden sm:block">
                  {tx.amountUsd}
                </div>
                <div className="text-right text-[11px] sm:text-xs lg:text-caption-s font-mono text-zeus-text-primary hidden md:block">
                  {tx.amountToken}
                </div>
                <div className="text-right text-[11px] sm:text-xs lg:text-caption-s font-mono text-zeus-text-primary">
                  {tx.amountSol}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex-shrink-0 flex items-center justify-between px-3 sm:px-4 py-2.5 border-t border-zeus-border-alpha bg-zeus-surface-default">
            <span className="text-[10px] lg:text-caption-s text-zeus-text-tertiary">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded hover:bg-zeus-surface-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-zeus-text-secondary" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-7 h-7 rounded text-caption-s font-medium transition-colors",
                    currentPage === page
                      ? "bg-sedona-500 text-white"
                      : "text-zeus-text-tertiary hover:bg-zeus-surface-elevated"
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded hover:bg-zeus-surface-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-zeus-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

TransactionsTable.displayName = "TransactionsTable"

export { TransactionsTable }
