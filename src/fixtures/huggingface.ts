/**
 * HuggingFace Fixtures
 *
 * Mock data for HuggingFace integration - repos, commits, and user data.
 * Simulates what we'd get from HF API after OAuth sign-in.
 */

// ============================================================================
// Types
// ============================================================================

export interface HFCommit {
  hash: string
  hashShort: string
  message: string
  author: string
  date: number // Unix timestamp
}

export interface HFRepo {
  id: string
  name: string
  fullName: string // e.g., "username/repo-name"
  description: string
  url: string
  isPrivate: boolean
  modelType: "transformer" | "diffusion" | "rl" | "other"
  downloads: number
  likes: number
  lastModified: number
  commits: HFCommit[]
}

export interface HFUser {
  id: string
  username: string
  fullName: string
  avatarUrl: string
  repos: HFRepo[]
}

// ============================================================================
// Mock Commits
// ============================================================================

const createCommits = (repoName: string): HFCommit[] => {
  const now = Date.now()
  const day = 24 * 60 * 60 * 1000

  return [
    {
      hash: "a1b2c3d4e5f6789012345678901234567890abcd",
      hashShort: "a1b2c3d",
      message: "Improve inference speed by 15%",
      author: "developer",
      date: now - day * 2,
    },
    {
      hash: "b2c3d4e5f67890123456789012345678901bcde",
      hashShort: "b2c3d4e",
      message: "Add batch processing support",
      author: "developer",
      date: now - day * 5,
    },
    {
      hash: "c3d4e5f678901234567890123456789012cdef",
      hashShort: "c3d4e5f",
      message: "Fix memory leak in attention layer",
      author: "developer",
      date: now - day * 8,
    },
    {
      hash: "d4e5f6789012345678901234567890123def01",
      hashShort: "d4e5f67",
      message: "Initial model upload",
      author: "developer",
      date: now - day * 14,
    },
  ]
}

// ============================================================================
// Mock User Repos (shown after HF sign-in)
// ============================================================================

export const MOCK_HF_USER: HFUser = {
  id: "user_123",
  username: "tradingdev",
  fullName: "Trading Developer",
  avatarUrl: "https://huggingface.co/avatars/default.png",
  repos: [
    {
      id: "repo_1",
      name: "wordle-solver-7b",
      fullName: "tradingdev/wordle-solver-7b",
      description: "Fine-tuned LLaMA for solving Wordle puzzles with 98% accuracy",
      url: "https://huggingface.co/tradingdev/wordle-solver-7b",
      isPrivate: false,
      modelType: "transformer",
      downloads: 1250,
      likes: 89,
      lastModified: Date.now() - 2 * 24 * 60 * 60 * 1000,
      commits: createCommits("wordle-solver-7b"),
    },
    {
      id: "repo_2",
      name: "market-predictor-3b",
      fullName: "tradingdev/market-predictor-3b",
      description: "Transformer model for short-term market movement prediction",
      url: "https://huggingface.co/tradingdev/market-predictor-3b",
      isPrivate: false,
      modelType: "transformer",
      downloads: 3420,
      likes: 156,
      lastModified: Date.now() - 5 * 24 * 60 * 60 * 1000,
      commits: createCommits("market-predictor-3b"),
    },
    {
      id: "repo_3",
      name: "code-review-agent",
      fullName: "tradingdev/code-review-agent",
      description: "AI agent specialized in code review and suggestions",
      url: "https://huggingface.co/tradingdev/code-review-agent",
      isPrivate: false,
      modelType: "transformer",
      downloads: 890,
      likes: 67,
      lastModified: Date.now() - 10 * 24 * 60 * 60 * 1000,
      commits: createCommits("code-review-agent"),
    },
    {
      id: "repo_4",
      name: "sentiment-analyzer-v2",
      fullName: "tradingdev/sentiment-analyzer-v2",
      description: "Multi-language sentiment analysis with financial focus",
      url: "https://huggingface.co/tradingdev/sentiment-analyzer-v2",
      isPrivate: true,
      modelType: "transformer",
      downloads: 0,
      likes: 12,
      lastModified: Date.now() - 1 * 24 * 60 * 60 * 1000,
      commits: createCommits("sentiment-analyzer-v2"),
    },
    {
      id: "repo_5",
      name: "research-assistant-13b",
      fullName: "tradingdev/research-assistant-13b",
      description: "Large model fine-tuned for research paper analysis",
      url: "https://huggingface.co/tradingdev/research-assistant-13b",
      isPrivate: false,
      modelType: "transformer",
      downloads: 5670,
      likes: 234,
      lastModified: Date.now() - 7 * 24 * 60 * 60 * 1000,
      commits: createCommits("research-assistant-13b"),
    },
  ],
}

// ============================================================================
// Helper Functions
// ============================================================================

export function getHFUser(): HFUser {
  return MOCK_HF_USER
}

export function getHFRepos(): HFRepo[] {
  return MOCK_HF_USER.repos
}

export function getHFRepoById(repoId: string): HFRepo | undefined {
  return MOCK_HF_USER.repos.find(r => r.id === repoId)
}

export function getHFRepoByName(fullName: string): HFRepo | undefined {
  return MOCK_HF_USER.repos.find(r => r.fullName === fullName)
}

export function formatHFDate(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))

  if (days === 0) return "today"
  if (days === 1) return "yesterday"
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  return `${Math.floor(days / 30)} months ago`
}
