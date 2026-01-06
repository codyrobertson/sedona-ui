import type { Transaction } from "@/components/trading/TransactionsTable"

/**
 * Mock transaction data for development and testing
 * Each transaction represents a trade with realistic variation
 */
export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", date: "4h ago", trader: "5z6JsFXt...RN9i", type: "BUY", price: "12.868", amountUsd: "19,409.00", amountToken: "1,508.12", amountSol: "102.45" },
  { id: "2", date: "2h ago", trader: "8xK2Df66...7e3f", type: "SELL", price: "1.722", amountUsd: "2,354.00", amountToken: "1,367.13", amountSol: "12.42" },
  { id: "3", date: "3h ago", trader: "3979797d...9b7e", type: "BUY", price: "11.146", amountUsd: "17,055.00", amountToken: "1,530.12", amountSol: "90.03" },
  { id: "4", date: "6h ago", trader: "7zA5908e...8f4h", type: "SELL", price: "6.909", amountUsd: "10,405.00", amountToken: "1,506.01", amountSol: "54.89" },
  { id: "5", date: "5d ago", trader: "2bM6Fg88...g5i3", type: "SELL", price: "4.237", amountUsd: "6,650.00", amountToken: "1,569.74", amountSol: "35.10" },
  { id: "6", date: "1w ago", trader: "9yL4Ef77...4h2k", type: "BUY", price: "8.521", amountUsd: "3,200.00", amountToken: "375.54", amountSol: "16.89" },
  { id: "7", date: "1w ago", trader: "4kM8Gh99...5j2l", type: "BUY", price: "7.234", amountUsd: "5,100.00", amountToken: "705.23", amountSol: "26.91" },
  { id: "8", date: "2w ago", trader: "6pN2Ji00...8m4n", type: "SELL", price: "9.876", amountUsd: "8,750.00", amountToken: "885.98", amountSol: "46.18" },
  { id: "9", date: "2w ago", trader: "1qO3Kj11...9n5o", type: "BUY", price: "5.432", amountUsd: "4,200.00", amountToken: "773.24", amountSol: "22.16" },
  { id: "10", date: "3w ago", trader: "2rP4Lk22...0o6p", type: "SELL", price: "3.210", amountUsd: "2,100.00", amountToken: "654.21", amountSol: "11.08" },
  { id: "11", date: "3w ago", trader: "3sQ5Ml33...1p7q", type: "BUY", price: "6.789", amountUsd: "9,800.00", amountToken: "1,443.51", amountSol: "51.73" },
  { id: "12", date: "1m ago", trader: "4tR6Nm44...2q8r", type: "BUY", price: "4.567", amountUsd: "3,450.00", amountToken: "755.41", amountSol: "18.20" },
  { id: "13", date: "1m ago", trader: "5uS7On55...3r9s", type: "SELL", price: "8.901", amountUsd: "7,600.00", amountToken: "853.72", amountSol: "40.10" },
  { id: "14", date: "1m ago", trader: "6vT8Po66...4s0t", type: "BUY", price: "2.345", amountUsd: "1,800.00", amountToken: "767.59", amountSol: "9.50" },
  { id: "15", date: "2m ago", trader: "7wU9Qp77...5t1u", type: "SELL", price: "5.678", amountUsd: "4,900.00", amountToken: "863.16", amountSol: "25.86" },
]

/**
 * Generate mock transactions for testing pagination
 */
export function generateMockTransactions(count: number): Transaction[] {
  const types: Array<"BUY" | "SELL"> = ["BUY", "SELL"]
  const timeAgo = ["1h ago", "2h ago", "4h ago", "6h ago", "1d ago", "2d ago", "1w ago", "2w ago"]

  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    date: timeAgo[Math.floor(Math.random() * timeAgo.length)],
    trader: `${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
    type: types[Math.floor(Math.random() * types.length)],
    price: (Math.random() * 15 + 1).toFixed(3),
    amountUsd: (Math.random() * 20000 + 500).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    amountToken: (Math.random() * 2000 + 100).toFixed(2),
    amountSol: (Math.random() * 100 + 5).toFixed(2),
  }))
}
