/**
 * Sedona Evaluation System Types
 *
 * Strict type definitions for model evaluation, agent versioning,
 * and competition tracking. Designed for WebSocket integration
 * and backend flexibility.
 */

// ============================================================================
// Evaluation Status & Progress
// ============================================================================

export type EvaluationStatus =
  | "pending"      // Queued, waiting to start
  | "running"      // Currently evaluating
  | "completed"    // Successfully finished
  | "failed"       // Error occurred

export type EvaluationStep =
  | "queued"                 // In queue
  | "loading_model"          // Downloading/loading model weights
  | "initializing"           // Setting up evaluation environment
  | "running_benchmark"      // Executing benchmark tasks
  | "generating_attestation" // Creating TEE attestation proof
  | "publishing_results"     // Publishing scores on-chain
  | "completed"              // Done
  | "failed"                 // Error state

export interface EvaluationLogEntry {
  timestamp: number           // Unix timestamp ms
  level: "info" | "warn" | "error" | "debug"
  message: string
  metadata?: Record<string, unknown>
}

export interface EvaluationProgress {
  status: EvaluationStatus
  currentStep: EvaluationStep
  progress: number            // 0-100
  elapsedTimeMs: number       // Milliseconds since start
  estimatedRemainingMs?: number
  logs: EvaluationLogEntry[]
  error?: EvaluationError
}

export interface EvaluationError {
  code: string                // e.g., "MODEL_LOAD_FAILED", "BENCHMARK_TIMEOUT"
  message: string
  details?: string
  recoverable: boolean
}

// WebSocket message types for real-time updates
export type EvaluationWebSocketMessage =
  | { type: "progress"; payload: EvaluationProgress }
  | { type: "log"; payload: EvaluationLogEntry }
  | { type: "complete"; payload: EvaluationResult }
  | { type: "error"; payload: EvaluationError }

// ============================================================================
// Scores & Results
// ============================================================================

export interface ScoreCategory {
  name: string                // e.g., "reasoning", "coding", "research"
  score: number               // 0-100
  weight: number              // Weight in overall calculation (0-1)
  maxScore: number            // Maximum possible (usually 100)
}

export interface EvaluationScore {
  overall: number             // Weighted overall score 0-100
  breakdown: ScoreCategory[]
  percentile?: number         // Percentile rank among all submissions
  rank?: number               // Absolute rank in competition
}

export interface AttestationProof {
  hash: string                // Attestation hash
  teeType: "sgx" | "tdx" | "sev"  // TEE type used
  timestamp: number           // When attestation was generated
  verificationUrl?: string    // URL to verify attestation
}

export interface EvaluationResult {
  id: string                  // Unique evaluation ID
  versionId: string           // Agent version this is for
  score: EvaluationScore
  attestation: AttestationProof
  benchmarkId: string         // Which benchmark was used
  benchmarkName: string
  completedAt: number         // Unix timestamp
  durationMs: number          // Total evaluation time
}

// ============================================================================
// Agent Versions
// ============================================================================

export interface HuggingFaceReference {
  repoId: string              // e.g., "sedona/wordle-agent-v1"
  commitHash: string          // Full commit hash
  commitHashShort: string     // First 7 chars
  branch?: string
  url: string                 // Direct link to HF
}

export type VersionStatus =
  | "evaluating"    // Currently being evaluated
  | "active"        // Current active version for the agent
  | "historical"    // Previous version, not active
  | "failed"        // Evaluation failed

export interface AgentVersion {
  id: string
  versionNumber: number       // Sequential version number (1, 2, 3...)
  huggingFace: HuggingFaceReference
  status: VersionStatus
  evaluation?: EvaluationResult
  evaluationProgress?: EvaluationProgress  // Only present if evaluating
  createdAt: number           // Unix timestamp
  createdBy: string           // Wallet address
  notes?: string              // Optional version notes
}

// ============================================================================
// Competition & Standings
// ============================================================================

export interface Competition {
  id: string
  name: string                // e.g., "Best Research Agent - January 2025"
  objective: string           // Full description of competition goal
  startDate: number
  endDate: number
  status: "upcoming" | "active" | "completed"
  benchmarkId: string
  prizePool?: string          // e.g., "$50,000"
  participantCount: number
}

export interface CompetitionEntry {
  competitionId: string
  competition: Competition
  agentId: string
  versionId: string           // Which version was entered
  enteredAt: number
  finalRank?: number          // Only set after competition ends
  finalScore?: number
  twapMarketCap?: string      // TWAP market cap at end
  prize?: string              // Prize won if any
}

export type CompetitionPlacement =
  | { status: "winner"; rank: 1; prize: string }
  | { status: "placed"; rank: number; prize?: string }
  | { status: "participated"; rank: number }
  | { status: "disqualified"; reason: string }

// ============================================================================
// My Agent (User's Agent Dashboard)
// ============================================================================

export interface AgentToken {
  address: string             // Token contract address
  symbol: string              // e.g., "WORDLE"
  name: string                // e.g., "Wordle Agent"
  decimals: number
  totalSupply: string
  price: string               // Current price in USD
  priceChange24h: number      // Percentage
  marketCap: string
  volume24h: string
  holders: number
  liquidityPool?: {
    address: string
    tvl: string
    dex: "uniswap_v2" | "raydium" | "other"
  }
}

export interface AgentAnalytics {
  totalEvaluations: number
  averageScore: number
  bestScore: number
  competitionsEntered: number
  competitionsWon: number
  totalPrizeEarnings?: string
}

export interface MyAgent {
  id: string
  name: string
  description: string
  ticker: string
  imageUrl?: string

  // Ownership
  creatorAddress: string      // Wallet that created
  createdAt: number

  // Current state
  activeVersion: AgentVersion
  versions: AgentVersion[]

  // Token (only if launched)
  token?: AgentToken

  // Competition history
  competitionHistory: CompetitionEntry[]
  currentCompetition?: CompetitionEntry

  // Analytics
  analytics: AgentAnalytics
}

// ============================================================================
// Model Configuration (Stubs for CLI integration)
// ============================================================================

export type InferenceBackend = "sglang" | "vllm"

export interface SGLangConfig {
  backend: "sglang"
  modelPath: string           // HuggingFace model path
  tensorParallelSize?: number
  dtype?: "float16" | "bfloat16" | "float32" | "int8" | "fp8"
  maxModelLen?: number
  trustRemoteCode?: boolean
  quantization?: "awq" | "gptq" | "squeezellm" | null
  // Extensible for future options
  additionalArgs?: Record<string, unknown>
}

export interface VLLMConfig {
  backend: "vllm"
  modelPath: string
  tensorParallelSize?: number
  dtype?: "float16" | "bfloat16" | "float32" | "int8"
  maxModelLen?: number
  trustRemoteCode?: boolean
  quantization?: "awq" | "gptq" | "squeezellm" | null
  gpuMemoryUtilization?: number  // 0-1
  // Extensible for future options
  additionalArgs?: Record<string, unknown>
}

export type ModelConfig = SGLangConfig | VLLMConfig

// ============================================================================
// API/WebSocket Connection Types (Stubs)
// ============================================================================

export interface EvaluationRequest {
  agentId: string
  huggingFaceRepo: string
  commitHash: string
  config: ModelConfig
  competitionId?: string      // Optional: enter into competition
}

export interface EvaluationSubscription {
  evaluationId: string
  subscribe: () => void
  unsubscribe: () => void
  onProgress: (callback: (progress: EvaluationProgress) => void) => void
  onComplete: (callback: (result: EvaluationResult) => void) => void
  onError: (callback: (error: EvaluationError) => void) => void
}

// Stub interface for backend integration
export interface EvaluationService {
  startEvaluation: (request: EvaluationRequest) => Promise<{ evaluationId: string }>
  getEvaluationStatus: (evaluationId: string) => Promise<EvaluationProgress>
  subscribeToEvaluation: (evaluationId: string) => EvaluationSubscription
  cancelEvaluation?: never    // Cannot cancel - evaluations run to completion or failure
}

// Stub interface for agent management
export interface AgentService {
  getMyAgents: (walletAddress: string) => Promise<MyAgent[]>
  getAgent: (agentId: string) => Promise<MyAgent>
  getAgentVersions: (agentId: string) => Promise<AgentVersion[]>
  addNewVersion: (agentId: string, huggingFaceRepo: string, commitHash: string) => Promise<AgentVersion>
}
