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

// Profile types
export type {
  SocialPlatform,
  SocialLinks,
  CommunicationPreferences,
  UserProfile,
  UserProfileUpdate,
  ProfileFormData,
  ProfileValidationError,
  ProfileValidationResult,
  ProfileState,
} from "./profile"
export { DEFAULT_COMMUNICATION_PREFERENCES } from "./profile"

// GPU Instance types
export type {
  GPUInstanceStatus,
  PaymentMethod,
  GPUTier,
  GPUPricing,
  GPUInstance,
  DeploymentRequest,
  CodeSnippet,
  ConnectionInfo,
  DeployModalStep,
  GPUDeployState,
  GPUDeployContextValue,
} from "./gpu-instance"
