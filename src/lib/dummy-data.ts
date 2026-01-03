// Dummy data factory for Sedona trading UI
// Uses index-based deterministic generation for consistent server/client rendering

const AGENT_PREFIXES = [
  "Alpha", "Beta", "Gamma", "Delta", "Omega", "Sigma", "Theta", "Zeta", "Nova", "Apex",
  "Prime", "Ultra", "Hyper", "Mega", "Neo", "Quantum", "Cyber", "Neural", "Synth", "Auto",
  "Deep", "Smart", "Fast", "Swift", "Rapid", "Turbo", "Max", "Pro", "Elite", "Super",
]

const AGENT_SUFFIXES = [
  "Bot", "AI", "Agent", "Trader", "Mind", "Brain", "Core", "Net", "Hub", "Pro",
  "X", "Plus", "Max", "One", "Zero", "Prime", "Alpha", "Beta", "V2", "V3",
]

const DESCRIPTIONS = [
  "High-performance trading agent with ML predictions",
  "Advanced sentiment analysis and market timing",
  "Momentum-based trading with risk management",
  "Arbitrage detection across multiple DEXs",
  "Pattern recognition for swing trading",
  "News-driven event trading specialist",
  "Liquidity provision optimizer",
  "Mean reversion strategy implementation",
  "Breakout detection and execution",
  "Multi-timeframe trend following",
  "Volume profile analysis agent",
  "Order flow imbalance detector",
  "Smart money tracking algorithm",
  "Whale wallet movement tracker",
  "Social sentiment aggregator",
  "On-chain metrics analyzer",
  "Cross-chain bridge optimizer",
  "Gas price prediction model",
  "MEV protection specialist",
  "Yield farming optimizer",
]

// Deterministic hash function based on index
function hash(n: number): number {
  let x = n
  x = ((x >> 16) ^ x) * 0x45d9f3b
  x = ((x >> 16) ^ x) * 0x45d9f3b
  x = (x >> 16) ^ x
  return (x & 0x7fffffff) / 0x7fffffff
}

function indexedFromArray<T>(arr: T[], index: number, offset: number = 0): T {
  return arr[Math.floor(hash(index + offset * 1000) * arr.length)]
}

function indexedBetween(min: number, max: number, index: number, offset: number = 0): number {
  return hash(index + offset * 1000) * (max - min) + min
}

function generateTicker(index: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const length = hash(index) > 0.5 ? 4 : 5
  let ticker = ""
  for (let i = 0; i < length; i++) {
    ticker += chars[Math.floor(hash(index * 10 + i) * chars.length)]
  }
  return ticker
}

function formatMarketCap(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`
  return `$${value.toFixed(0)}`
}

function formatVolume(value: number | null): string | undefined {
  if (value === null) return undefined
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`
  return `$${value.toFixed(0)}`
}

function formatPrice(marketCap: number, index: number): string {
  const divisor = hash(index + 9000) * (10_000_000 - 100_000) + 100_000
  const price = marketCap / divisor
  if (price < 0.0001) return `$${price.toFixed(6)}`
  if (price < 0.01) return `$${price.toFixed(4)}`
  if (price < 1) return `$${price.toFixed(3)}`
  return `$${price.toFixed(2)}`
}

export interface DummyAgent {
  name: string
  ticker: string
  description: string
  avatarFallback: string
  change24h: number
  marketCap: string
  volume?: string
  volumeChange: number
}

export interface DummyPoolItem {
  ticker: string
  price: string
  change: number
}

export function generateDummyAgent(index: number): DummyAgent {
  const prefix = indexedFromArray(AGENT_PREFIXES, index, 1)
  const suffix = indexedFromArray(AGENT_SUFFIXES, index, 2)
  const name = `${prefix} ${suffix}`
  const ticker = generateTicker(index)

  const marketCapValue = indexedBetween(1_000, 5_000_000, index, 3)
  const hasVolume = hash(index + 4000) > 0.2
  const volumeValue = hasVolume ? indexedBetween(100, marketCapValue * 0.3, index, 5) : null

  const change24h = indexedBetween(-25, 50, index, 6)
  const volumeChange = indexedBetween(-30, 60, index, 7)

  return {
    name,
    ticker,
    description: indexedFromArray(DESCRIPTIONS, index, 8),
    avatarFallback: name.charAt(0),
    change24h,
    marketCap: formatMarketCap(marketCapValue),
    volume: formatVolume(volumeValue),
    volumeChange,
  }
}

export function generateDummyAgents(count: number): DummyAgent[] {
  return Array.from({ length: count }, (_, i) => generateDummyAgent(i))
}

export function generateDummyPoolItem(agent: DummyAgent, index: number): DummyPoolItem {
  const marketCapNum = parseFloat(agent.marketCap.replace(/[$KM]/g, "")) *
    (agent.marketCap.includes("M") ? 1_000_000 : agent.marketCap.includes("K") ? 1_000 : 1)

  return {
    ticker: agent.ticker,
    price: formatPrice(marketCapNum, index + 1000),
    change: agent.change24h,
  }
}

export function generateDummyPools(agents: DummyAgent[], count?: number): DummyPoolItem[] {
  const sorted = [...agents].sort((a, b) => {
    const aVal = parseFloat(a.marketCap.replace(/[$KM]/g, ""))
    const bVal = parseFloat(b.marketCap.replace(/[$KM]/g, ""))
    return bVal - aVal
  })

  const slice = count ? sorted.slice(0, count) : sorted
  return slice.map((agent, i) => generateDummyPoolItem(agent, i))
}

// Pre-generated data for consistent rendering
let cachedAgents: DummyAgent[] | null = null

export function getDummyAgents(count: number = 300): DummyAgent[] {
  if (!cachedAgents || cachedAgents.length !== count) {
    cachedAgents = generateDummyAgents(count)
  }
  return cachedAgents
}

export function getDummyPools(count: number = 20): DummyPoolItem[] {
  const agents = getDummyAgents()
  return generateDummyPools(agents, count)
}
