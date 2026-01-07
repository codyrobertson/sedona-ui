/**
 * Wallet and Auth types matching production API structure
 * Based on typical Solana wallet authentication patterns
 */

/**
 * Wallet connection status
 */
export type WalletStatus = "disconnected" | "connecting" | "connected" | "error"

/**
 * Connected wallet information
 */
export interface ConnectedWallet {
  /** Public key / address */
  address: string
  /** Display name (truncated address or ENS-like name) */
  displayName: string
  /** Wallet provider name */
  provider: WalletProvider
  /** Connection timestamp */
  connectedAt: number
}

/**
 * Supported wallet providers
 */
export type WalletProvider =
  | "phantom"
  | "solflare"
  | "backpack"
  | "ledger"
  | "torus"
  | "walletconnect"

/**
 * Wallet balance information
 */
export interface WalletBalance {
  /** SOL balance */
  sol: number
  /** SOL balance formatted (e.g., "12.5 SOL") */
  solFormatted: string
  /** USD value of SOL balance */
  solUsd: number
  /** Token balances by mint address */
  tokens: TokenBalance[]
}

/**
 * Individual token balance
 */
export interface TokenBalance {
  /** Token mint address */
  mint: string
  /** Token ticker/symbol */
  ticker: string
  /** Token name */
  name: string
  /** Raw balance (in smallest unit) */
  amount: string
  /** Decimals for token */
  decimals: number
  /** Human-readable balance */
  balance: number
  /** USD value */
  usdValue: number
  /** Token logo URL */
  logoUrl?: string
}

/**
 * Authentication state
 */
export interface AuthState {
  /** Whether user is authenticated */
  isAuthenticated: boolean
  /** Current wallet status */
  status: WalletStatus
  /** Connected wallet info (null if disconnected) */
  wallet: ConnectedWallet | null
  /** Wallet balances (null if not loaded) */
  balances: WalletBalance | null
  /** Last error message */
  error: string | null
}

/**
 * Auth session from API
 */
export interface AuthSession {
  /** Session token */
  token: string
  /** Token expiration timestamp */
  expiresAt: number
  /** User/wallet address */
  address: string
  /** Session creation timestamp */
  createdAt: number
}

/**
 * Sign message request for wallet auth
 */
export interface SignMessageRequest {
  /** Message to sign (typically includes nonce) */
  message: string
  /** Nonce for replay protection */
  nonce: string
  /** Timestamp when message was generated */
  timestamp: number
}

/**
 * Sign message response after wallet signs
 */
export interface SignMessageResponse {
  /** The original message */
  message: string
  /** Signature from wallet */
  signature: string
  /** Public key that signed */
  publicKey: string
}

/**
 * API auth endpoints response types
 */
export interface AuthNonceResponse {
  nonce: string
  message: string
  expiresAt: number
}

export interface AuthVerifyRequest {
  address: string
  signature: string
  message: string
}

export interface AuthVerifyResponse {
  token: string
  expiresAt: number
}

/**
 * Transaction types for history
 */
export type TransactionType = "swap" | "transfer" | "stake" | "unstake" | "launch"

/**
 * Transaction status
 */
export type TransactionStatus = "pending" | "confirmed" | "failed"

/**
 * Wallet transaction record
 */
export interface WalletTransaction {
  /** Transaction signature */
  signature: string
  /** Transaction type */
  type: TransactionType
  /** Transaction status */
  status: TransactionStatus
  /** Timestamp */
  timestamp: number
  /** Amount (for transfers/swaps) */
  amount?: string
  /** Token involved */
  token?: string
  /** From address */
  from?: string
  /** To address */
  to?: string
  /** Transaction fee in SOL */
  fee: number
  /** Block number */
  slot?: number
}
