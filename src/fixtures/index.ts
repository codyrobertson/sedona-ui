// Barrel exports for fixtures
export { MOCK_TRANSACTIONS, generateMockTransactions } from "./transactions"
export {
  MEME_COIN_CHART_DATA,
  CHART_COLORS,
  getChartDataByTimeframe, // Legacy - use getChartDataForTicker instead
} from "./chart-data"
// ChartTimeframe now exported from price-ticks
export { DEFAULT_AGENT_MODELS, AGENT_STRATEGIES } from "./agents"
export type { AgentStrategy } from "./agents"

// =============================================================================
// UNIFIED AGENTS (new - matches production API)
// =============================================================================
export {
  AGENTS,
  MY_WALLET,
  getAllAgents,
  getMyAgents,
  getAgentByPool,
  getAgentByTicker,
  getAgentOrDefault,
  getAgentsByMarketCap,
  getAgentsByVolume,
  getAgentsByPriceChange,
  searchAgents,
  formatMarketCap,
  formatPrice,
  formatPercentChange,
} from "./agents-unified"

// Agent history for charts
export {
  AGENT_LINE_COLORS,
  parseMarketCap,
  generateMarketCapHistory,
  generateAgentHistory,
  getTopAgentsWithHistory,
  filterHistoryByTimeframe,
} from "./agent-history"
export type { AgentHistoryPoint, AgentHistory, AgentChartInput } from "./agent-history"

// =============================================================================
// PRICE TICKS (matches production API: /pool/price_ticks)
// =============================================================================
export {
  getPriceTicks,
  getPriceTicksByTicker,
  toChartData,
  getChartDataForTicker,
  getStaticTicks,
  getStaticChartData,
  initializeStaticTicks,
  STATIC_PRICE_TICKS,
} from "./price-ticks"
export type {
  TickResolution,
  TickResolution as ChartTimeframe, // Alias for backward compatibility
  PriceTicksRequest,
  PriceTicksResponse,
} from "./price-ticks"

// =============================================================================
// WALLET & AUTH (matches production auth flow)
// =============================================================================
export {
  MOCK_USER_WALLET,
  MOCK_WALLETS,
  INITIAL_AUTH_STATE,
  MOCK_CONNECTED_WALLET,
  MOCK_WALLET_BALANCES,
  MOCK_AUTHENTICATED_STATE,
  MOCK_WALLET_TRANSACTIONS,
  WALLET_PROVIDERS,
  generateNonceResponse,
  generateMockSession,
  generateSignMessageRequest,
  generateMockTransactions as generateWalletTransactions,
  formatAddress,
  isUserWallet,
  getTokenBalance,
  calculatePortfolioValue,
} from "./wallet"

// =============================================================================
// RECENT TRADES (for detail page stats)
// =============================================================================
export { RECENT_TRADES } from "./agent-details"
export type { RecentTrade } from "./agent-details"

// =============================================================================
// MY AGENTS / EVALUATION (structure TBD by backend dev)
// =============================================================================
export {
  MOCK_MY_AGENTS,
  MOCK_VERSIONS,
  MOCK_COMPETITIONS,
  MOCK_EVAL_LOGS,
  MOCK_EVAL_IN_PROGRESS,
  MOCK_VERSION_EVALUATING,
  MOCK_COMPETITION_ENTRIES,
  getMockAgent,
  getMockAgentVersions,
} from "./my-agents"
