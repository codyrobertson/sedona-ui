/**
 * Mock data for My Agents feature
 * Used for development and testing
 */

import type {
  MyAgent,
  AgentVersion,
  EvaluationResult,
  EvaluationProgress,
  EvaluationLogEntry,
  Competition,
  CompetitionEntry,
  ScoreCategory,
} from "@/types/evaluation"

// ============================================================================
// Helper Functions
// ============================================================================

const daysAgo = (days: number): number =>
  Date.now() - days * 24 * 60 * 60 * 1000

const hoursAgo = (hours: number): number =>
  Date.now() - hours * 60 * 60 * 1000

const minutesAgo = (minutes: number): number =>
  Date.now() - minutes * 60 * 1000

// ============================================================================
// Mock Competitions
// ============================================================================

export const MOCK_COMPETITIONS: Competition[] = [
  {
    id: "comp-jan-2025",
    name: "Best Research Agent - January 2025",
    objective: "What is the best AI Agent at researching new leads and synthesizing information from multiple sources?",
    startDate: daysAgo(30),
    endDate: daysAgo(2),
    status: "completed",
    benchmarkId: "research-v1",
    prizePool: "$50,000",
    participantCount: 47,
  },
  {
    id: "comp-feb-2025",
    name: "Code Generation Challenge - February 2025",
    objective: "Build the most capable AI Agent for generating production-ready code across multiple languages.",
    startDate: daysAgo(5),
    endDate: daysAgo(-25),
    status: "active",
    benchmarkId: "coding-v2",
    prizePool: "$75,000",
    participantCount: 63,
  },
  {
    id: "comp-mar-2025",
    name: "Reasoning Olympics - March 2025",
    objective: "Create an AI Agent that excels at complex multi-step reasoning tasks.",
    startDate: daysAgo(-20),
    endDate: daysAgo(-50),
    status: "upcoming",
    benchmarkId: "reasoning-v1",
    prizePool: "$100,000",
    participantCount: 0,
  },
]

// ============================================================================
// Mock Score Breakdowns
// ============================================================================

const createScoreBreakdown = (
  scores: { name: string; score: number; weight: number }[]
): ScoreCategory[] =>
  scores.map((s) => ({ ...s, maxScore: 100 }))

// ============================================================================
// Mock Evaluation Results
// ============================================================================

const MOCK_EVAL_RESULT_V3: EvaluationResult = {
  id: "eval-v3-001",
  versionId: "version-3",
  score: {
    overall: 87.4,
    breakdown: createScoreBreakdown([
      { name: "Reasoning", score: 92.1, weight: 0.3 },
      { name: "Coding", score: 85.3, weight: 0.25 },
      { name: "Research", score: 88.7, weight: 0.25 },
      { name: "Communication", score: 81.2, weight: 0.2 },
    ]),
    percentile: 94,
    rank: 3,
  },
  attestation: {
    hash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    teeType: "sgx",
    timestamp: daysAgo(1),
    verificationUrl: "https://verify.sedona.io/attestation/eval-v3-001",
  },
  benchmarkId: "coding-v2",
  benchmarkName: "Code Generation Challenge",
  completedAt: daysAgo(1),
  durationMs: 45 * 60 * 1000, // 45 minutes
}

const MOCK_EVAL_RESULT_V2: EvaluationResult = {
  id: "eval-v2-001",
  versionId: "version-2",
  score: {
    overall: 82.1,
    breakdown: createScoreBreakdown([
      { name: "Reasoning", score: 85.4, weight: 0.3 },
      { name: "Coding", score: 79.8, weight: 0.25 },
      { name: "Research", score: 84.2, weight: 0.25 },
      { name: "Communication", score: 78.5, weight: 0.2 },
    ]),
    percentile: 87,
    rank: 8,
  },
  attestation: {
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    teeType: "sgx",
    timestamp: daysAgo(15),
    verificationUrl: "https://verify.sedona.io/attestation/eval-v2-001",
  },
  benchmarkId: "research-v1",
  benchmarkName: "Research Agent Benchmark",
  completedAt: daysAgo(15),
  durationMs: 38 * 60 * 1000,
}

const MOCK_EVAL_RESULT_V1: EvaluationResult = {
  id: "eval-v1-001",
  versionId: "version-1",
  score: {
    overall: 74.6,
    breakdown: createScoreBreakdown([
      { name: "Reasoning", score: 78.2, weight: 0.3 },
      { name: "Coding", score: 71.5, weight: 0.25 },
      { name: "Research", score: 76.8, weight: 0.25 },
      { name: "Communication", score: 70.1, weight: 0.2 },
    ]),
    percentile: 72,
    rank: 15,
  },
  attestation: {
    hash: "0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d",
    teeType: "tdx",
    timestamp: daysAgo(35),
    verificationUrl: "https://verify.sedona.io/attestation/eval-v1-001",
  },
  benchmarkId: "research-v1",
  benchmarkName: "Research Agent Benchmark",
  completedAt: daysAgo(35),
  durationMs: 42 * 60 * 1000,
}

// ============================================================================
// Mock Agent Versions
// ============================================================================

export const MOCK_VERSIONS: AgentVersion[] = [
  {
    id: "version-3",
    versionNumber: 3,
    huggingFace: {
      repoId: "sedona-user/research-agent",
      commitHash: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
      commitHashShort: "a1b2c3d",
      branch: "main",
      url: "https://huggingface.co/sedona-user/research-agent/commit/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
    },
    status: "active",
    evaluation: MOCK_EVAL_RESULT_V3,
    createdAt: daysAgo(1),
    createdBy: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21",
    notes: "Improved reasoning with GRPO training",
  },
  {
    id: "version-2",
    versionNumber: 2,
    huggingFace: {
      repoId: "sedona-user/research-agent",
      commitHash: "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1",
      commitHashShort: "b2c3d4e",
      branch: "main",
      url: "https://huggingface.co/sedona-user/research-agent/commit/b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1",
    },
    status: "historical",
    evaluation: MOCK_EVAL_RESULT_V2,
    createdAt: daysAgo(15),
    createdBy: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21",
    notes: "Added SFT warmup phase",
  },
  {
    id: "version-1",
    versionNumber: 1,
    huggingFace: {
      repoId: "sedona-user/research-agent",
      commitHash: "c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
      commitHashShort: "c3d4e5f",
      branch: "main",
      url: "https://huggingface.co/sedona-user/research-agent/commit/c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    },
    status: "historical",
    evaluation: MOCK_EVAL_RESULT_V1,
    createdAt: daysAgo(35),
    createdBy: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21",
    notes: "Initial version - base Qwen3-4B",
  },
]

// ============================================================================
// Mock Evaluation In Progress
// ============================================================================

export const MOCK_EVAL_LOGS: EvaluationLogEntry[] = [
  { timestamp: minutesAgo(12), level: "info", message: "Evaluation queued" },
  { timestamp: minutesAgo(11), level: "info", message: "Starting model download from HuggingFace..." },
  { timestamp: minutesAgo(10), level: "info", message: "Model downloaded: sedona-user/research-agent@d4e5f6a" },
  { timestamp: minutesAgo(9), level: "info", message: "Loading model into TEE environment..." },
  { timestamp: minutesAgo(8), level: "info", message: "Model loaded successfully (4x H200 GPUs)" },
  { timestamp: minutesAgo(7), level: "info", message: "Initializing benchmark: coding-v2" },
  { timestamp: minutesAgo(6), level: "info", message: "Running task 1/25: Code completion..." },
  { timestamp: minutesAgo(5), level: "info", message: "Task 1/25 complete: 94.2/100" },
  { timestamp: minutesAgo(4), level: "info", message: "Running task 2/25: Bug detection..." },
  { timestamp: minutesAgo(3), level: "info", message: "Task 2/25 complete: 87.5/100" },
  { timestamp: minutesAgo(2), level: "info", message: "Running task 3/25: Code review..." },
  { timestamp: minutesAgo(1), level: "debug", message: "Memory usage: 67.2GB / 80GB" },
]

export const MOCK_EVAL_IN_PROGRESS: EvaluationProgress = {
  status: "running",
  currentStep: "running_benchmark",
  progress: 32,
  elapsedTimeMs: 12 * 60 * 1000, // 12 minutes
  estimatedRemainingMs: 25 * 60 * 1000, // 25 minutes remaining
  logs: MOCK_EVAL_LOGS,
}

export const MOCK_VERSION_EVALUATING: AgentVersion = {
  id: "version-4",
  versionNumber: 4,
  huggingFace: {
    repoId: "sedona-user/research-agent",
    commitHash: "d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3",
    commitHashShort: "d4e5f6a",
    branch: "main",
    url: "https://huggingface.co/sedona-user/research-agent/commit/d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3",
  },
  status: "evaluating",
  evaluationProgress: MOCK_EVAL_IN_PROGRESS,
  createdAt: minutesAgo(12),
  createdBy: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21",
  notes: "Testing new dataset augmentation",
}

// ============================================================================
// Mock Competition Entries
// ============================================================================

export const MOCK_COMPETITION_ENTRIES: CompetitionEntry[] = [
  {
    competitionId: "comp-jan-2025",
    competition: MOCK_COMPETITIONS[0],
    agentId: "agent-1",
    versionId: "version-2",
    enteredAt: daysAgo(28),
    finalRank: 3,
    finalScore: 82.1,
    twapMarketCap: "$1.2M",
    prize: "$5,000",
  },
  {
    competitionId: "comp-feb-2025",
    competition: MOCK_COMPETITIONS[1],
    agentId: "agent-1",
    versionId: "version-3",
    enteredAt: daysAgo(4),
    // Active competition - no final results yet
  },
]

// ============================================================================
// Mock My Agents
// ============================================================================

export const MOCK_MY_AGENTS: MyAgent[] = [
  {
    id: "agent-1",
    name: "Research Agent",
    description: "AI agent specialized in research synthesis, lead generation, and information aggregation from multiple sources.",
    ticker: "RESEARCH",
    imageUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=research",

    creatorAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21",
    createdAt: daysAgo(40),

    activeVersion: MOCK_VERSIONS[0],
    versions: [MOCK_VERSION_EVALUATING, ...MOCK_VERSIONS],

    token: {
      address: "0x1234567890abcdef1234567890abcdef12345678",
      symbol: "RESEARCH",
      name: "Research Agent Token",
      decimals: 18,
      totalSupply: "1000000000",
      price: "$0.0847",
      priceChange24h: 12.4,
      marketCap: "$847,000",
      volume24h: "$124,500",
      holders: 1247,
      liquidityPool: {
        address: "0xabcdef1234567890abcdef1234567890abcdef12",
        tvl: "$423,500",
        dex: "uniswap_v2",
      },
    },

    competitionHistory: MOCK_COMPETITION_ENTRIES,
    currentCompetition: MOCK_COMPETITION_ENTRIES[1],

    analytics: {
      totalEvaluations: 4,
      averageScore: 81.0,
      bestScore: 87.4,
      competitionsEntered: 2,
      competitionsWon: 0,
      totalPrizeEarnings: "$5,000",
    },
  },
  {
    id: "agent-2",
    name: "Wordle Master",
    description: "Specialized AI agent trained to play Wordle using GRPO reinforcement learning.",
    ticker: "WORDLE",
    imageUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=wordle",

    creatorAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21",
    createdAt: daysAgo(60),

    activeVersion: {
      id: "wordle-v2",
      versionNumber: 2,
      huggingFace: {
        repoId: "sedona-user/wordle-agent",
        commitHash: "e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
        commitHashShort: "e5f6a7b",
        branch: "main",
        url: "https://huggingface.co/sedona-user/wordle-agent/commit/e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
      },
      status: "active",
      evaluation: {
        id: "eval-wordle-v2",
        versionId: "wordle-v2",
        score: {
          overall: 91.2,
          breakdown: createScoreBreakdown([
            { name: "Win Rate", score: 94.5, weight: 0.4 },
            { name: "Avg Guesses", score: 88.3, weight: 0.3 },
            { name: "Strategy", score: 89.7, weight: 0.3 },
          ]),
          percentile: 98,
          rank: 1,
        },
        attestation: {
          hash: "0xf6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7",
          teeType: "sgx",
          timestamp: daysAgo(10),
        },
        benchmarkId: "wordle-v1",
        benchmarkName: "Wordle Challenge",
        completedAt: daysAgo(10),
        durationMs: 22 * 60 * 1000,
      },
      createdAt: daysAgo(10),
      createdBy: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21",
    },
    versions: [
      {
        id: "wordle-v2",
        versionNumber: 2,
        huggingFace: {
          repoId: "sedona-user/wordle-agent",
          commitHash: "e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
          commitHashShort: "e5f6a7b",
          branch: "main",
          url: "https://huggingface.co/sedona-user/wordle-agent/commit/e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
        },
        status: "active",
        createdAt: daysAgo(10),
        createdBy: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21",
      },
      {
        id: "wordle-v1",
        versionNumber: 1,
        huggingFace: {
          repoId: "sedona-user/wordle-agent",
          commitHash: "f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5",
          commitHashShort: "f6a7b8c",
          branch: "main",
          url: "https://huggingface.co/sedona-user/wordle-agent/commit/f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5",
        },
        status: "historical",
        createdAt: daysAgo(45),
        createdBy: "0x742d35Cc6634C0532925a3b844Bc9e7595f8fE21",
      },
    ],

    token: {
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      symbol: "WORDLE",
      name: "Wordle Master Token",
      decimals: 18,
      totalSupply: "500000000",
      price: "$0.1234",
      priceChange24h: -3.2,
      marketCap: "$1,234,000",
      volume24h: "$89,000",
      holders: 892,
    },

    competitionHistory: [],

    analytics: {
      totalEvaluations: 2,
      averageScore: 87.5,
      bestScore: 91.2,
      competitionsEntered: 0,
      competitionsWon: 0,
    },
  },
]

// ============================================================================
// Export helper to get agent by ID
// ============================================================================

export function getMockAgent(agentId: string): MyAgent | undefined {
  return MOCK_MY_AGENTS.find((a) => a.id === agentId)
}

export function getMockAgentVersions(agentId: string): AgentVersion[] {
  const agent = getMockAgent(agentId)
  return agent?.versions ?? []
}
