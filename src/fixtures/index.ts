// Barrel exports for fixtures
export { MOCK_TRANSACTIONS, generateMockTransactions } from "./transactions"
export {
  MEME_COIN_CHART_DATA,
  CHART_COLORS,
  getChartDataByTimeframe,
} from "./chart-data"
export type { ChartTimeframe } from "./chart-data"
export { DEFAULT_AGENT_MODELS, AGENT_STRATEGIES } from "./agents"
export type { AgentStrategy } from "./agents"

// Agent history for charts
export {
  AGENT_LINE_COLORS,
  parseMarketCap,
  formatMarketCap,
  generateMarketCapHistory,
  generateAgentHistory,
  getTopAgentsWithHistory,
  filterHistoryByTimeframe,
} from "./agent-history"
export type { AgentHistoryPoint, AgentHistory, AgentChartInput } from "./agent-history"

// Agent details for detail pages
export {
  AGENT_DETAILS,
  RECENT_TRADES,
  getAgentByTicker,
  getAgentOrDefault,
} from "./agent-details"
export type { AgentDetail, RecentTrade, ModelVersion } from "./agent-details"
