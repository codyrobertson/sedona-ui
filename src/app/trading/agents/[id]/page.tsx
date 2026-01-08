import type { Metadata } from "next"
import AgentDetailClient from "./agent-detail-client"
import { getMockAgent } from "@/fixtures/my-agents"
import { SEO_CONFIG } from "@/lib/seo-config"

interface AgentDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: AgentDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const agent = getMockAgent(id)

  if (!agent) {
    return {
      title: "Agent Not Found",
      description: "The requested agent could not be found.",
      robots: { index: false, follow: true },
    }
  }

  const title = `${agent.name} ($${agent.ticker}) - Agent Management`
  const description = agent.description
    ? `${agent.description.slice(0, 140)}... Manage versions, view evaluation scores, and track performance.`
    : `Manage ${agent.name} on Sedona. View evaluation history, scores, and version management for your AI agent.`

  return {
    title,
    description,
    robots: {
      index: false, // User-specific content
      follow: true,
    },
    openGraph: {
      title: `${agent.name} | Sedona`,
      description,
      type: 'website',
      siteName: SEO_CONFIG.siteName,
      images: agent.imageUrl ? [{ url: agent.imageUrl, alt: agent.name }] : [SEO_CONFIG.defaultImage],
    },
    twitter: {
      card: 'summary',
      title: `${agent.name} | Sedona`,
      description,
    },
  }
}

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const { id } = await params
  return <AgentDetailClient agentId={id} />
}
