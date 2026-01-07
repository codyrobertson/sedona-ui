// Barrel exports for types

// Agent types (production API structure)
export type {
  Agent,
  AgentWithMetrics,
  PoolsApiResponse,
  PriceTick,
  AgentEvaluation,
} from "./agent"

// Wallet & Auth types
export type {
  WalletStatus,
  ConnectedWallet,
  WalletProvider,
  WalletBalance,
  TokenBalance,
  AuthState,
  AuthSession,
  SignMessageRequest,
  SignMessageResponse,
  AuthNonceResponse,
  AuthVerifyRequest,
  AuthVerifyResponse,
  TransactionType,
  TransactionStatus,
  WalletTransaction,
} from "./wallet"
