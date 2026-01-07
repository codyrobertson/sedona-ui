import { Metadata } from "next"
import AgentDetailClient from "./agent-detail-client"

export const metadata: Metadata = {
  title: "Agent Details | Sedona",
  description: "View your agent's evaluation history, scores, and version management",
}

interface AgentDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const { id } = await params
  return <AgentDetailClient agentId={id} />
}
