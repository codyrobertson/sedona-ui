/**
 * GPU Instance Fixtures
 *
 * Mock data and helpers for GPU deployment feature
 */

import type {
  GPUInstance,
  GPUPricing,
  CodeSnippet,
  ConnectionInfo,
  GPUTier,
} from "@/types/gpu-instance"

// ============================================================================
// PRICING CONFIGURATION
// ============================================================================

export const GPU_PRICING: Record<GPUTier, GPUPricing> = {
  h200: {
    tier: "h200",
    name: "NVIDIA H200",
    hourlyRate: 3.33,
    minimumHours: 24,
    minimumCost: 80,
    description: "Latest generation GPU with 141GB HBM3e memory. Ideal for large models.",
  },
  h100: {
    tier: "h100",
    name: "NVIDIA H100",
    hourlyRate: 2.50,
    minimumHours: 24,
    minimumCost: 60,
    description: "High-performance GPU with 80GB HBM3 memory. Great for most models.",
  },
  a100: {
    tier: "a100",
    name: "NVIDIA A100",
    hourlyRate: 1.50,
    minimumHours: 24,
    minimumCost: 36,
    description: "Reliable GPU with 80GB HBM2e memory. Cost-effective option.",
  },
}

export const DEFAULT_GPU_TIER: GPUTier = "h200"

// ============================================================================
// MOCK INSTANCES
// ============================================================================

const now = new Date()
const hourAgo = new Date(now.getTime() - 60 * 60 * 1000)
const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

export const MOCK_GPU_INSTANCES: GPUInstance[] = [
  {
    id: "inst_abc123",
    modelId: "agent_001",
    modelName: "Llama-3.1-70B-Instruct",
    modelTicker: "LLAMA",
    status: "running",
    startedAt: hourAgo.toISOString(),
    expiresAt: new Date(hourAgo.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    baseUrl: "https://inference.sedona.fun/v1/inst_abc123",
    apiKey: "sk-sedona-abc123xyz789",
    totalSpend: 3.33,
    paymentMethod: "solana",
    tier: "h200",
  },
  {
    id: "inst_def456",
    modelId: "agent_002",
    modelName: "Mixtral-8x7B-Instruct",
    modelTicker: "MIX",
    status: "running",
    startedAt: dayAgo.toISOString(),
    expiresAt: new Date(dayAgo.getTime() + 48 * 60 * 60 * 1000).toISOString(),
    baseUrl: "https://inference.sedona.fun/v1/inst_def456",
    apiKey: "sk-sedona-def456uvw321",
    totalSpend: 60.00,
    paymentMethod: "stripe",
    tier: "h100",
  },
  {
    id: "inst_ghi789",
    modelId: "agent_003",
    modelName: "CodeLlama-34B",
    status: "provisioning",
    startedAt: new Date().toISOString(),
    expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    baseUrl: "https://inference.sedona.fun/v1/inst_ghi789",
    apiKey: "sk-sedona-ghi789rst654",
    totalSpend: 0,
    paymentMethod: "solana",
    tier: "a100",
  },
]

// ============================================================================
// CODE SNIPPET GENERATORS
// ============================================================================

export function generateCodeSnippets(info: ConnectionInfo): CodeSnippet[] {
  return [
    {
      language: "python",
      label: "Python (OpenAI SDK)",
      code: `from openai import OpenAI

client = OpenAI(
    base_url="${info.baseUrl}",
    api_key="${info.apiKey}"
)

response = client.chat.completions.create(
    model="${info.modelName}",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)`,
    },
    {
      language: "typescript",
      label: "TypeScript (OpenAI SDK)",
      code: `import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: '${info.baseUrl}',
  apiKey: '${info.apiKey}',
});

const response = await client.chat.completions.create({
  model: '${info.modelName}',
  messages: [{ role: 'user', content: 'Hello!' }],
});
console.log(response.choices[0].message.content);`,
    },
    {
      language: "curl",
      label: "cURL",
      code: `curl ${info.baseUrl}/chat/completions \\
  -H "Authorization: Bearer ${info.apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${info.modelName}",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`,
    },
  ]
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function generateInstanceId(): string {
  return `inst_${Math.random().toString(36).substring(2, 10)}`
}

export function generateApiKey(): string {
  return `sk-sedona-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
}

export function calculateCost(startedAt: string, tier: GPUTier): number {
  const start = new Date(startedAt)
  const now = new Date()
  const hoursElapsed = (now.getTime() - start.getTime()) / (1000 * 60 * 60)
  const pricing = GPU_PRICING[tier]
  return Math.max(hoursElapsed * pricing.hourlyRate, 0)
}

export function formatDuration(startedAt: string): string {
  const start = new Date(startedAt)
  const now = new Date()
  const diff = now.getTime() - start.getTime()

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

export function formatTimeRemaining(expiresAt: string): string {
  const expires = new Date(expiresAt)
  const now = new Date()
  const diff = expires.getTime() - now.getTime()

  if (diff <= 0) return "Expired"

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`
  }
  return `${minutes}m remaining`
}

export function getStatusColor(status: GPUInstance["status"]): string {
  switch (status) {
    case "running":
      return "text-zeus-status-success"
    case "provisioning":
      return "text-zeus-accent-blue"
    case "terminating":
      return "text-zeus-accent-orange"
    case "terminated":
      return "text-zeus-text-tertiary"
    case "error":
      return "text-zeus-status-destructive"
    default:
      return "text-zeus-text-secondary"
  }
}

export function getStatusLabel(status: GPUInstance["status"]): string {
  switch (status) {
    case "running":
      return "Running"
    case "provisioning":
      return "Provisioning..."
    case "terminating":
      return "Terminating..."
    case "terminated":
      return "Terminated"
    case "error":
      return "Error"
    default:
      return status
  }
}
