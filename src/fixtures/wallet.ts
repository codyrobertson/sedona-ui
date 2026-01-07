import type {
  AuthState,
  AuthSession,
  ConnectedWallet,
  WalletBalance,
  TokenBalance,
  WalletTransaction,
  WalletProvider,
  SignMessageRequest,
  AuthNonceResponse,
} from "@/types/wallet"
import { AGENTS, MY_WALLET } from "./agents-unified"

// =============================================================================
// Mock wallet addresses
// =============================================================================

/**
 * Connected user's wallet (matches MY_WALLET from agents-unified)
 */
export const MOCK_USER_WALLET = MY_WALLET

/**
 * Additional mock wallet addresses for transactions
 */
export const MOCK_WALLETS = {
  user: MY_WALLET,
  trader1: "2A2YC4r6AFWLEFhY2p1fy4pBF1u9Cvrhhe8yUY25XiTf",
  trader2: "8QfB4vZQEfgZDKyVJMzP1qLZd5CjvJ3LxZEGvEV3Kmwp",
  exchange: "ExChNgE1111111111111111111111111111111111111",
  treasury: "TrEaSuRy11111111111111111111111111111111111",
}

// =============================================================================
// Mock connected wallet state
// =============================================================================

/**
 * Default disconnected auth state
 */
export const INITIAL_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  status: "disconnected",
  wallet: null,
  balances: null,
  error: null,
}

/**
 * Mock connected wallet for demo
 */
export const MOCK_CONNECTED_WALLET: ConnectedWallet = {
  address: MOCK_USER_WALLET,
  displayName: `${MOCK_USER_WALLET.slice(0, 4)}...${MOCK_USER_WALLET.slice(-4)}`,
  provider: "phantom",
  connectedAt: Date.now() - 3600000, // 1 hour ago
}

/**
 * Generate token balances from AGENTS fixture
 * User holds tokens for agents they created
 */
function generateTokenBalances(): TokenBalance[] {
  const myAgents = AGENTS.filter((a) => a.creator === MY_WALLET)

  return myAgents.map((agent) => ({
    mint: agent.base_mint,
    ticker: agent.ticker,
    name: agent.name,
    amount: String(Math.floor(Math.random() * 1000000000000)), // Raw amount
    decimals: 9,
    balance: 50000 + Math.random() * 450000, // 50K - 500K tokens
    usdValue: (agent.price_usd || 0.001) * (50000 + Math.random() * 450000),
  }))
}

/**
 * Mock wallet balances
 */
export const MOCK_WALLET_BALANCES: WalletBalance = {
  sol: 12.5,
  solFormatted: "12.5 SOL",
  solUsd: 12.5 * 150, // Assuming $150/SOL
  tokens: generateTokenBalances(),
}

/**
 * Mock authenticated state
 */
export const MOCK_AUTHENTICATED_STATE: AuthState = {
  isAuthenticated: true,
  status: "connected",
  wallet: MOCK_CONNECTED_WALLET,
  balances: MOCK_WALLET_BALANCES,
  error: null,
}

// =============================================================================
// Mock auth API responses
// =============================================================================

/**
 * Generate a nonce response (matches GET /auth/nonce)
 */
export function generateNonceResponse(): AuthNonceResponse {
  const nonce = Math.random().toString(36).substring(2, 15)
  const timestamp = Date.now()

  return {
    nonce,
    message: `Sign this message to authenticate with Sedona.\n\nNonce: ${nonce}\nTimestamp: ${timestamp}`,
    expiresAt: timestamp + 300000, // 5 minutes
  }
}

/**
 * Mock session token (matches POST /auth/verify response)
 */
export function generateMockSession(address: string): AuthSession {
  const now = Date.now()
  return {
    token: `mock_session_${Math.random().toString(36).substring(2, 20)}`,
    expiresAt: now + 86400000, // 24 hours
    address,
    createdAt: now,
  }
}

/**
 * Generate a sign message request
 */
export function generateSignMessageRequest(): SignMessageRequest {
  const nonce = Math.random().toString(36).substring(2, 15)
  const timestamp = Date.now()

  return {
    message: `Sign this message to authenticate with Sedona.\n\nNonce: ${nonce}\nTimestamp: ${timestamp}`,
    nonce,
    timestamp,
  }
}

// =============================================================================
// Mock transactions
// =============================================================================

/**
 * Generate mock wallet transactions
 */
export function generateMockTransactions(
  count: number = 10,
  wallet: string = MOCK_USER_WALLET
): WalletTransaction[] {
  const transactions: WalletTransaction[] = []
  const now = Date.now()

  const transactionTypes: WalletTransaction["type"][] = [
    "swap",
    "swap",
    "swap",
    "transfer",
    "launch",
  ]

  for (let i = 0; i < count; i++) {
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
    const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)]
    const isSuccess = Math.random() > 0.1 // 90% success rate

    transactions.push({
      signature: `${Math.random().toString(36).substring(2, 20)}${Math.random().toString(36).substring(2, 20)}`,
      type,
      status: isSuccess ? "confirmed" : "failed",
      timestamp: now - i * 3600000 * (1 + Math.random()), // Spread over time
      amount: type === "swap" ? `${(100 + Math.random() * 10000).toFixed(2)}` : undefined,
      token: type !== "transfer" ? agent.ticker : undefined,
      from: type === "transfer" ? MOCK_WALLETS.trader1 : wallet,
      to: type === "transfer" ? wallet : undefined,
      fee: 0.000005 + Math.random() * 0.00001,
      slot: 200000000 + Math.floor(Math.random() * 1000000),
    })
  }

  return transactions.sort((a, b) => b.timestamp - a.timestamp)
}

/**
 * Pre-generated mock transactions
 */
export const MOCK_WALLET_TRANSACTIONS = generateMockTransactions(20)

// =============================================================================
// Wallet provider utilities
// =============================================================================

/**
 * Supported wallet providers with metadata
 */
export const WALLET_PROVIDERS: Record<
  WalletProvider,
  { name: string; icon: string; url: string }
> = {
  phantom: {
    name: "Phantom",
    icon: "/wallets/phantom.svg",
    url: "https://phantom.app/",
  },
  solflare: {
    name: "Solflare",
    icon: "/wallets/solflare.svg",
    url: "https://solflare.com/",
  },
  backpack: {
    name: "Backpack",
    icon: "/wallets/backpack.svg",
    url: "https://backpack.app/",
  },
  ledger: {
    name: "Ledger",
    icon: "/wallets/ledger.svg",
    url: "https://www.ledger.com/",
  },
  torus: {
    name: "Torus",
    icon: "/wallets/torus.svg",
    url: "https://tor.us/",
  },
  walletconnect: {
    name: "WalletConnect",
    icon: "/wallets/walletconnect.svg",
    url: "https://walletconnect.com/",
  },
}

// =============================================================================
// Utility functions
// =============================================================================

/**
 * Format wallet address for display
 */
export function formatAddress(address: string, chars: number = 4): string {
  if (!address || address.length < chars * 2) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

/**
 * Check if address matches user wallet
 */
export function isUserWallet(address: string): boolean {
  return address === MOCK_USER_WALLET
}

/**
 * Get balance for a specific token
 */
export function getTokenBalance(
  balances: WalletBalance | null,
  mint: string
): TokenBalance | null {
  if (!balances) return null
  return balances.tokens.find((t) => t.mint === mint) || null
}

/**
 * Calculate total portfolio value in USD
 */
export function calculatePortfolioValue(balances: WalletBalance | null): number {
  if (!balances) return 0
  const tokenValue = balances.tokens.reduce((sum, t) => sum + t.usdValue, 0)
  return balances.solUsd + tokenValue
}
