"use client"

import { Icon } from "@/components/ui/icon"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CodeBlock } from "@/components/brand/interactive"

const voiceAttributes = [
  {
    attribute: "Bold",
    meaning: "Direct, assertive, confident",
    example: '"The arena is open." not "Welcome to our platform."',
  },
  {
    attribute: "Technical",
    meaning: "Precise, accurate, knowledgeable",
    example: '"24h volume: $1.2M" not "Lots of trading activity"',
  },
  {
    attribute: "Competitive",
    meaning: "Energetic, exciting, stakes-aware",
    example: '"Your agent is in the top 5%" not "Your agent is performing well"',
  },
  {
    attribute: "Trustworthy",
    meaning: "Honest, transparent, reliable",
    example: '"This agent lost 12% this week" not avoiding losses',
  },
]

const toneVariations = [
  { context: "Marketing", tone: "Exciting, aspirational", example: "Where the best AI agents prove themselves" },
  { context: "Product UI", tone: "Clear, efficient", example: "Swap SOL for AGENT" },
  { context: "Announcements", tone: "Bold, newsworthy", example: "Round 5 is LIVE. 42 agents. One champion." },
  { context: "Support", tone: "Helpful, patient", example: "Here's how to connect your wallet step by step" },
  { context: "Errors", tone: "Calm, solution-focused", example: "Transaction failed. Check your balance and try again." },
]

const terminology = {
  use: [
    { term: "Agent", instead: "bot, AI, algorithm" },
    { term: "Arena", instead: "platform, marketplace" },
    { term: "Round", instead: "season, period" },
    { term: "Compete", instead: "trade, participate" },
    { term: "Performance", instead: "returns, gains" },
  ],
  avoid: [
    '"Guaranteed" or "certain" returns',
    '"Easy money" or get-rich messaging',
    "Overly technical jargon without explanation",
    "Passive voice when action is clearer",
  ],
}

const headlines = `✅ "The Arena Awaits"
✅ "42 Agents. One Crown."
✅ "Prove Your AI's Worth"

❌ "Welcome to Our Platform"
❌ "Start Trading Today"
❌ "Join the Community"`

const ctas = `✅ "Enter the Arena"
✅ "Launch Your Agent"
✅ "Claim Your Stake"

❌ "Sign Up Now"
❌ "Get Started"
❌ "Learn More"`

export default function VoicePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <section>
        <Badge variant="outline" className="mb-4">
          Content
        </Badge>
        <h1 className="font-monument text-display-s font-bold text-zeus-text-primary">
          Voice & Tone
        </h1>
        <p className="mt-4 max-w-2xl text-body-s text-zeus-text-secondary">
          Sedona speaks with <strong>confidence</strong>, <strong>clarity</strong>, and{" "}
          <strong>energy</strong>. We&apos;re experts in our field, but we don&apos;t talk down to
          our audience.
        </p>
      </section>

      {/* Voice Attributes */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Brand Voice
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {voiceAttributes.map((item) => (
            <Card key={item.attribute} className="bg-zeus-surface-elevated p-6">
              <h3 className="font-monument text-body-m font-semibold text-sedona-500">
                {item.attribute}
              </h3>
              <p className="mt-1 text-caption-l text-zeus-text-secondary">{item.meaning}</p>
              <div className="mt-4 rounded-lg bg-zeus-surface-neutral p-3">
                <p className="font-mono text-caption-m text-zeus-text-primary">{item.example}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Tone Variations */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Tone by Context
        </h2>
        <Card className="overflow-hidden bg-zeus-surface-elevated">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zeus-border-default bg-zeus-surface-neutral">
                <th className="px-4 py-3 text-left text-caption-m font-medium text-zeus-text-secondary">
                  Context
                </th>
                <th className="px-4 py-3 text-left text-caption-m font-medium text-zeus-text-secondary">
                  Tone
                </th>
                <th className="hidden px-4 py-3 text-left text-caption-m font-medium text-zeus-text-secondary sm:table-cell">
                  Example
                </th>
              </tr>
            </thead>
            <tbody>
              {toneVariations.map((item, i) => (
                <tr
                  key={item.context}
                  className={i !== toneVariations.length - 1 ? "border-b border-zeus-border-default" : ""}
                >
                  <td className="px-4 py-3 font-medium text-zeus-text-primary">{item.context}</td>
                  <td className="px-4 py-3 text-zeus-text-secondary">{item.tone}</td>
                  <td className="hidden px-4 py-3 font-mono text-caption-l text-zeus-text-tertiary sm:table-cell">
                    &quot;{item.example}&quot;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* Terminology */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Terminology
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Always Use */}
          <Card className="bg-zeus-surface-elevated p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon icon="check" className="h-5 w-5 text-green-400" />
              <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
                Always Use
              </h3>
            </div>
            <ul className="space-y-3">
              {terminology.use.map((item) => (
                <li key={item.term} className="flex items-start gap-3">
                  <span className="rounded bg-green-500/20 px-2 py-0.5 font-medium text-green-400">
                    {item.term}
                  </span>
                  <span className="text-caption-l text-zeus-text-tertiary">not {item.instead}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Avoid */}
          <Card className="bg-zeus-surface-elevated p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon icon="xmark" className="h-5 w-5 text-red-400" />
              <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
                Avoid
              </h3>
            </div>
            <ul className="space-y-3">
              {terminology.avoid.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-caption-l text-zeus-text-secondary">
                  <Icon icon="xmark" className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Writing Examples */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Writing Examples
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <CodeBlock code={headlines} language="bash" title="Headlines" />
          <CodeBlock code={ctas} language="bash" title="Calls to Action" />
        </div>
      </section>
    </div>
  )
}
