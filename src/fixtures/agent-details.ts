/**
 * Agent detail data for trading detail pages
 * Includes full agent info, stats, and elimination status
 */

export interface ModelVersion {
  hash: string
  version?: string
  uploadedAt: Date | string
  isCurrent?: boolean
  benchmarks?: {
    name: string
    score: number
    maxScore?: number
  }[]
  notes?: string
}

export interface AgentDetail {
  ticker: string
  name: string
  price: string
  priceChange: "up" | "down"
  description: string
  huggingFaceUrl?: string
  tokenAddress: string
  creatorAddress: string
  totalSupply: string
  createdAt: string
  modelTypes: string[]
  marketCap: string
  volume24h: string
  tvl: string
  change1h: number
  change24h: number
  change7d: number
  change30d: number
  // Elimination game fields
  rank: number
  totalAgents: number
  eliminationThreshold: string
  // Model versions
  modelVersions?: ModelVersion[]
}

export interface RecentTrade {
  type: "buy" | "sell"
  amount: string
  price: string
  time: string
}

/**
 * Agent details indexed by ticker (lowercase)
 */
export const AGENT_DETAILS: Record<string, AgentDetail> = {
  test: {
    ticker: "TEST",
    name: "Test Agent",
    price: "$0.0074",
    priceChange: "up",
    description: "An experimental trading agent using transformer architecture for market prediction and automated position management.",
    huggingFaceUrl: "https://huggingface.co/test-agent",
    tokenAddress: "3979797df6672c6d19a2d56fc9d941e86da4f8c2a9b7e3",
    creatorAddress: "8xK2Df6672c6d19a2d56fc9d941e86da4f8c2a9b7e3f1",
    totalSupply: "1,000,000",
    createdAt: "Dec 15, 2024",
    modelTypes: ["Transformer", "Trading"],
    marketCap: "$7.4K",
    volume24h: "$1.2K",
    tvl: "$500",
    change1h: 2.3,
    change24h: 5.4,
    change7d: 12.8,
    change30d: 45.2,
    rank: 42,
    totalAgents: 50,
    eliminationThreshold: "$5K",
    modelVersions: [
      {
        hash: "3979797df6672c6d19a2d56fc9d941e86da4f8c2a9b7e3",
        version: "v1.2.0",
        uploadedAt: "2024-12-15T14:30:00Z",
        isCurrent: true,
        benchmarks: [
          { name: "Accuracy", score: 94.2, maxScore: 100 },
          { name: "Latency", score: 12, maxScore: 50 },
          { name: "Sharpe", score: 2.4 },
        ],
        notes: "Improved attention mechanism for better pattern recognition",
      },
      {
        hash: "2868686cf5561b5c08a1c45eb8c830d75c93e7b1a8a6d2",
        version: "v1.1.0",
        uploadedAt: "2024-12-01T10:15:00Z",
        benchmarks: [
          { name: "Accuracy", score: 89.7, maxScore: 100 },
          { name: "Latency", score: 18, maxScore: 50 },
          { name: "Sharpe", score: 1.9 },
        ],
        notes: "Added momentum indicators",
      },
      {
        hash: "1757575be4450a4b97909b4da7b729c64b82d6a097959c1",
        version: "v1.0.0",
        uploadedAt: "2024-11-15T08:00:00Z",
        benchmarks: [
          { name: "Accuracy", score: 82.1, maxScore: 100 },
          { name: "Latency", score: 25, maxScore: 50 },
          { name: "Sharpe", score: 1.2 },
        ],
        notes: "Initial release",
      },
    ],
  },
  alpha: {
    ticker: "ALPHA",
    name: "Alpha Bot",
    price: "$0.0452",
    priceChange: "up",
    description: "High-frequency momentum trading bot leveraging LSTM networks to identify alpha opportunities in volatile markets.",
    huggingFaceUrl: "https://huggingface.co/alpha-bot",
    tokenAddress: "5xF3897df6672c6d19a2d56fc9d941e86da4f8c2a9b7e3",
    creatorAddress: "9yL4Ef7783d7e20b3e67gd0b052f97eb5g9d3b8f4h2",
    totalSupply: "10,000,000",
    createdAt: "Nov 28, 2024",
    modelTypes: ["LSTM", "Momentum", "ML"],
    marketCap: "$45.2K",
    volume24h: "$8.5K",
    tvl: "$12.3K",
    change1h: 2.3,
    change24h: 12.5,
    change7d: 34.2,
    change30d: 156.8,
    rank: 3,
    totalAgents: 50,
    eliminationThreshold: "$5K",
  },
  sigma: {
    ticker: "SIGMA",
    name: "Sigma AI",
    price: "$0.0289",
    priceChange: "down",
    description: "NLP-powered sentiment analysis agent that monitors social signals to predict market movements and trader behavior.",
    huggingFaceUrl: "https://huggingface.co/sigma-ai",
    tokenAddress: "7zA5908ef7783d7e20b3e67gd0b052f97eb5g9d3b8f4",
    creatorAddress: "2bM6Fg8894e8f31c4f78he1c163g08fc6h0e4c9g5i3",
    totalSupply: "5,000,000",
    createdAt: "Dec 1, 2024",
    modelTypes: ["NLP", "Sentiment"],
    marketCap: "$28.9K",
    volume24h: "$3.2K",
    tvl: "$6.8K",
    change1h: -0.8,
    change24h: -3.2,
    change7d: -8.5,
    change30d: 22.4,
    rank: 8,
    totalAgents: 50,
    eliminationThreshold: "$5K",
  },
  elite: {
    ticker: "ELITE",
    name: "Elite V2",
    price: "$0.1245",
    priceChange: "up",
    description: "Advanced multi-strategy trading system combining technical analysis, on-chain metrics, and machine learning for optimal execution.",
    huggingFaceUrl: "https://huggingface.co/elite-v2",
    tokenAddress: "9xB4567ef8894e9f42d5g89hf2d274h19gf7i1d5k6l2",
    creatorAddress: "4cN7Gh9905f9g42d5h89if2d274i19hg7j1e5l6m2",
    totalSupply: "500,000",
    createdAt: "Oct 15, 2024",
    modelTypes: ["Multi-Strategy", "ML", "On-Chain"],
    marketCap: "$4.8M",
    volume24h: "$785.6K",
    tvl: "$1.2M",
    change1h: 1.2,
    change24h: 16.91,
    change7d: 45.3,
    change30d: 234.5,
    rank: 1,
    totalAgents: 50,
    eliminationThreshold: "$5K",
  },
  turbo: {
    ticker: "TURBO",
    name: "Turbo Bot",
    price: "$0.0876",
    priceChange: "down",
    description: "High-speed arbitrage bot designed for cross-DEX opportunities with sub-second execution and MEV protection.",
    huggingFaceUrl: "https://huggingface.co/turbo-bot",
    tokenAddress: "2yC5678fg9905g0h53e6h90ig3e385i20hg8k2f6l7m3",
    creatorAddress: "5dO8Hi0016g0h53e6i90jg3e385j20ih8k2f6m7n3",
    totalSupply: "2,000,000",
    createdAt: "Nov 1, 2024",
    modelTypes: ["Arbitrage", "MEV", "Speed"],
    marketCap: "$2.7M",
    volume24h: "$705.7K",
    tvl: "$890K",
    change1h: -2.1,
    change24h: -10.08,
    change7d: -5.2,
    change30d: 89.3,
    rank: 2,
    totalAgents: 50,
    eliminationThreshold: "$5K",
  },
  delta: {
    ticker: "DELTA",
    name: "Delta Mind",
    price: "$0.0034",
    priceChange: "down",
    description: "Experimental reinforcement learning agent that adapts strategies based on market regime detection.",
    tokenAddress: "6zD6789gh0016h1i64f7i01jh4f496j31ji9l3g7m8n4",
    creatorAddress: "7eP9Ij1127h1i64f7j01kh4f496k31kj9l3g7n8o4",
    totalSupply: "50,000,000",
    createdAt: "Dec 5, 2024",
    modelTypes: ["RL", "Adaptive"],
    marketCap: "$193.2K",
    volume24h: "$28.0K",
    tvl: "$45.2K",
    change1h: -1.5,
    change24h: -16.68,
    change7d: -22.4,
    change30d: -12.8,
    rank: 35,
    totalAgents: 50,
    eliminationThreshold: "$5K",
  },
  omega: {
    ticker: "OMEGA",
    name: "Omega Protocol",
    price: "$0.0008",
    priceChange: "down",
    description: "Community-driven trading collective with decentralized decision making and profit sharing mechanisms.",
    tokenAddress: "8aE7890hi1127i2j75g8j12ki5g507k42kj0m4h8n9o5",
    creatorAddress: "9fQ0Jk2238i2j75g8k12lj5g507l42lk0m4h8o9p5",
    totalSupply: "100,000,000",
    createdAt: "Dec 20, 2024",
    modelTypes: ["DAO", "Collective"],
    marketCap: "$8.2K",
    volume24h: "$1.1K",
    tvl: "$2.5K",
    change1h: -5.2,
    change24h: -28.5,
    change7d: -45.2,
    change30d: -62.1,
    rank: 48,
    totalAgents: 50,
    eliminationThreshold: "$5K",
  },
}

/**
 * Recent trades for the stats marquee
 */
export const RECENT_TRADES: RecentTrade[] = [
  { type: "buy", amount: "$1,250", price: "$0.0074", time: "2s ago" },
  { type: "buy", amount: "$840", price: "$0.0073", time: "5s ago" },
  { type: "sell", amount: "$320", price: "$0.0076", time: "8s ago" },
  { type: "buy", amount: "$2,100", price: "$0.0072", time: "12s ago" },
  { type: "buy", amount: "$450", price: "$0.0071", time: "18s ago" },
  { type: "sell", amount: "$180", price: "$0.0075", time: "25s ago" },
  { type: "buy", amount: "$3,500", price: "$0.0070", time: "32s ago" },
  { type: "buy", amount: "$920", price: "$0.0069", time: "45s ago" },
  { type: "sell", amount: "$275", price: "$0.0074", time: "1m ago" },
  { type: "buy", amount: "$1,800", price: "$0.0068", time: "1m ago" },
  { type: "buy", amount: "$560", price: "$0.0067", time: "2m ago" },
  { type: "sell", amount: "$425", price: "$0.0072", time: "2m ago" },
  { type: "buy", amount: "$2,750", price: "$0.0066", time: "3m ago" },
  { type: "buy", amount: "$680", price: "$0.0065", time: "4m ago" },
  { type: "sell", amount: "$150", price: "$0.0071", time: "5m ago" },
]

/**
 * Get agent by ticker (case-insensitive)
 */
export function getAgentByTicker(ticker: string): AgentDetail | undefined {
  return AGENT_DETAILS[ticker.toLowerCase()]
}

/**
 * Get default agent for unknown tickers
 */
export function getAgentOrDefault(ticker: string): AgentDetail {
  return getAgentByTicker(ticker) || AGENT_DETAILS.test
}
