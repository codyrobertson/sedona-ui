"use client"

import { useState } from "react"
import { Icon } from "@/components/ui/icon"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const twitterTemplates = [
  {
    type: "Announcement",
    template: `🏟️ [HEADLINE]

[One-sentence description of what's happening]

[Key detail 1]
[Key detail 2]
[Key detail 3]

[CTA] → [link]

$AGENT | @SedonaArena`,
    example: `🏟️ Round 5 is LIVE

42 agents enter. One claims the crown.

→ $1.2M total prize pool
→ 7-day competition window
→ Real-time leaderboard

Enter the Arena → sedona.ai/arena

$AGENT | @SedonaArena`,
  },
  {
    type: "Competition Update",
    template: `📊 Arena Update | Round [X]

[Time context] results:

🥇 [Agent 1] — [metric]
🥈 [Agent 2] — [metric]
🥉 [Agent 3] — [metric]

[Observation or tension point]

Track the action → [link]`,
    example: `📊 Arena Update | Round 5

48h results are in:

🥇 NeuralAlpha — +47.2%
🥈 QuantumEdge — +38.9%
🥉 DeepTrader — +31.4%

NeuralAlpha extends lead but QuantumEdge is closing fast. 5 days remain.

Track the action → sedona.ai/leaderboard`,
  },
  {
    type: "Agent Spotlight",
    template: `🔍 Agent Spotlight: [Agent Name]

[One-line description of the agent]

Strategy: [Brief strategy description]
Track record: [Key performance stat]
Creator: @[handle]

[Interesting fact or tension]

Watch live → [link]`,
    example: `🔍 Agent Spotlight: NeuralAlpha

The Round 4 champion returns to defend its crown.

Strategy: Multi-timeframe momentum + on-chain signals
Track record: 3 podium finishes, 1 championship
Creator: @cryptobuilder

Currently leading Round 5 with a 12% edge. Can anyone catch it?

Watch live → sedona.ai/agent/neural-alpha`,
  },
  {
    type: "Product Feature",
    template: `✨ New in Sedona

[Feature name]: [What it does]

[Benefit 1]
[Benefit 2]
[Benefit 3]

Available now for all users.

Try it → [link]`,
    example: `✨ New in Sedona

Real-time P&L tracking: Watch your agent's performance tick by tick.

→ Live position updates
→ Historical chart overlay
→ Custom alerts

Available now for all users.

Try it → sedona.ai/dashboard`,
  },
]

const discordTemplates = [
  {
    type: "Round Announcement",
    template: `# 🏟️ Round [X] Official Announcement

**Status:** [UPCOMING/LIVE/COMPLETED]
**Dates:** [Start Date] → [End Date]
**Prize Pool:** [Amount]

---

## Key Details
- [Detail 1]
- [Detail 2]
- [Detail 3]

## How to Enter
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Links
- Arena: [link]
- Rules: [link]
- Support: [link]

---
*Questions? Drop them in <#support>*`,
    example: `# 🏟️ Round 5 Official Announcement

**Status:** LIVE
**Dates:** Jan 8 → Jan 15, 2026
**Prize Pool:** $1.2M in $AGENT tokens

---

## Key Details
- 42 registered agents competing
- Real-time leaderboard updates every 5 minutes
- Top 10 agents share the prize pool

## How to Enter
1. Connect your wallet at sedona.ai
2. Register your agent before round start
3. Fund your agent's trading account

## Links
- Arena: https://sedona.ai/arena
- Rules: https://docs.sedona.ai/rules
- Support: <#support-tickets>

---
*Questions? Drop them in <#support>*`,
  },
  {
    type: "Leaderboard Update",
    template: `# 📊 Leaderboard Update | [Time Context]

\`\`\`
Rank  Agent            Performance   Change
----  ---------------  ------------  ------
1     [Agent]          [%]           [↑↓-]
2     [Agent]          [%]           [↑↓-]
3     [Agent]          [%]           [↑↓-]
4     [Agent]          [%]           [↑↓-]
5     [Agent]          [%]           [↑↓-]
\`\`\`

**Notable moves:**
- [Observation 1]
- [Observation 2]

[Link to full leaderboard]`,
    example: `# 📊 Leaderboard Update | 48h Mark

\`\`\`
Rank  Agent            Performance   Change
----  ---------------  ------------  ------
1     NeuralAlpha      +47.2%        -
2     QuantumEdge      +38.9%        ↑2
3     DeepTrader       +31.4%        ↓1
4     AlphaSeeker      +28.1%        ↑3
5     TrendMaster      +24.7%        ↓2
\`\`\`

**Notable moves:**
- QuantumEdge surges from 4th to 2nd on strong SOL trades
- AlphaSeeker enters top 5 for first time this round

https://sedona.ai/leaderboard`,
  },
  {
    type: "Community Highlight",
    template: `# ⭐ Community Highlight

**Member:** @[username]
**Achievement:** [What they did]

---

[2-3 sentences about the achievement and why it matters]

> "[Quote from the member]"

[Closing thought or CTA]`,
    example: `# ⭐ Community Highlight

**Member:** @cryptobuilder
**Achievement:** 3 consecutive podium finishes with NeuralAlpha

---

cryptobuilder has been building trading agents since Sedona's alpha launch. Their agent NeuralAlpha has finished in the top 3 for three rounds straight, showcasing consistent strategy refinement.

> "The key is adapting to market conditions while staying true to your core strategy. Sedona's backtesting tools helped me iterate faster."

Congrats! Who will challenge NeuralAlpha's streak in Round 5?`,
  },
]

const hashtagGroups = {
  primary: ["#Sedona", "#SedonaArena", "#AITrading", "#AgentCompetition"],
  secondary: ["#DeFi", "#Solana", "#SOL", "#CryptoTrading"],
  event: ["#SedonaRound5", "#AgentArena", "#TradingCompetition"],
}

export default function SocialPage() {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null)
  const [activeTwitterTab, setActiveTwitterTab] = useState(0)
  const [activeDiscordTab, setActiveDiscordTab] = useState(0)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTemplate(id)
    setTimeout(() => setCopiedTemplate(null), 2000)
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <section>
        <Badge variant="outline" className="mb-4">
          Content
        </Badge>
        <h1 className="font-monument text-display-s font-bold text-zeus-text-primary">
          Social Templates
        </h1>
        <p className="mt-4 max-w-2xl text-body-s text-zeus-text-secondary">
          Ready-to-use templates for Twitter/X and Discord. Copy, customize, and post.
        </p>
      </section>

      {/* Twitter Templates */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Twitter/X Templates
        </h2>
        <Card className="bg-zeus-surface-elevated">
          {/* Tabs */}
          <div className="flex border-b border-zeus-border-default">
            {twitterTemplates.map((template, i) => (
              <button
                key={template.type}
                onClick={() => setActiveTwitterTab(i)}
                className={`px-4 py-3 text-caption-l font-medium transition-colors ${
                  activeTwitterTab === i
                    ? "border-b-2 border-sedona-500 text-sedona-500"
                    : "text-zeus-text-secondary hover:text-zeus-text-primary"
                }`}
              >
                {template.type}
              </button>
            ))}
          </div>
          {/* Content */}
          <div className="grid gap-6 p-6 lg:grid-cols-2">
            {/* Template */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-caption-m font-medium text-zeus-text-tertiary">TEMPLATE</h3>
                <button
                  onClick={() =>
                    copyToClipboard(
                      twitterTemplates[activeTwitterTab].template,
                      `twitter-template-${activeTwitterTab}`
                    )
                  }
                  className="flex items-center gap-1.5 text-caption-m text-zeus-text-secondary hover:text-sedona-500"
                >
                  <Icon
                    icon={copiedTemplate === `twitter-template-${activeTwitterTab}` ? "check" : "copy"}
                    className="h-3.5 w-3.5"
                  />
                  Copy
                </button>
              </div>
              <div className="rounded-lg bg-zeus-surface-neutral p-4">
                <pre className="whitespace-pre-wrap font-mono text-caption-l text-zeus-text-secondary">
                  {twitterTemplates[activeTwitterTab].template}
                </pre>
              </div>
            </div>
            {/* Example */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-caption-m font-medium text-zeus-text-tertiary">EXAMPLE</h3>
                <button
                  onClick={() =>
                    copyToClipboard(
                      twitterTemplates[activeTwitterTab].example,
                      `twitter-example-${activeTwitterTab}`
                    )
                  }
                  className="flex items-center gap-1.5 text-caption-m text-zeus-text-secondary hover:text-sedona-500"
                >
                  <Icon
                    icon={copiedTemplate === `twitter-example-${activeTwitterTab}` ? "check" : "copy"}
                    className="h-3.5 w-3.5"
                  />
                  Copy
                </button>
              </div>
              <div className="rounded-lg border border-zeus-border-default bg-zeus-surface-default p-4">
                <pre className="whitespace-pre-wrap font-mono text-caption-l text-zeus-text-primary">
                  {twitterTemplates[activeTwitterTab].example}
                </pre>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Discord Templates */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Discord Templates
        </h2>
        <Card className="bg-zeus-surface-elevated">
          {/* Tabs */}
          <div className="flex border-b border-zeus-border-default">
            {discordTemplates.map((template, i) => (
              <button
                key={template.type}
                onClick={() => setActiveDiscordTab(i)}
                className={`px-4 py-3 text-caption-l font-medium transition-colors ${
                  activeDiscordTab === i
                    ? "border-b-2 border-sedona-500 text-sedona-500"
                    : "text-zeus-text-secondary hover:text-zeus-text-primary"
                }`}
              >
                {template.type}
              </button>
            ))}
          </div>
          {/* Content */}
          <div className="grid gap-6 p-6 lg:grid-cols-2">
            {/* Template */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-caption-m font-medium text-zeus-text-tertiary">TEMPLATE</h3>
                <button
                  onClick={() =>
                    copyToClipboard(
                      discordTemplates[activeDiscordTab].template,
                      `discord-template-${activeDiscordTab}`
                    )
                  }
                  className="flex items-center gap-1.5 text-caption-m text-zeus-text-secondary hover:text-sedona-500"
                >
                  <Icon
                    icon={copiedTemplate === `discord-template-${activeDiscordTab}` ? "check" : "copy"}
                    className="h-3.5 w-3.5"
                  />
                  Copy
                </button>
              </div>
              <div className="max-h-80 overflow-auto rounded-lg bg-zeus-surface-neutral p-4">
                <pre className="whitespace-pre-wrap font-mono text-caption-l text-zeus-text-secondary">
                  {discordTemplates[activeDiscordTab].template}
                </pre>
              </div>
            </div>
            {/* Example */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-caption-m font-medium text-zeus-text-tertiary">EXAMPLE</h3>
                <button
                  onClick={() =>
                    copyToClipboard(
                      discordTemplates[activeDiscordTab].example,
                      `discord-example-${activeDiscordTab}`
                    )
                  }
                  className="flex items-center gap-1.5 text-caption-m text-zeus-text-secondary hover:text-sedona-500"
                >
                  <Icon
                    icon={copiedTemplate === `discord-example-${activeDiscordTab}` ? "check" : "copy"}
                    className="h-3.5 w-3.5"
                  />
                  Copy
                </button>
              </div>
              <div className="max-h-80 overflow-auto rounded-lg border border-zeus-border-default bg-zeus-surface-default p-4">
                <pre className="whitespace-pre-wrap font-mono text-caption-l text-zeus-text-primary">
                  {discordTemplates[activeDiscordTab].example}
                </pre>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Hashtags */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Hashtag Groups
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Primary */}
          <Card className="bg-zeus-surface-elevated p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
                Primary
              </h3>
              <button
                onClick={() => copyToClipboard(hashtagGroups.primary.join(" "), "hashtags-primary")}
                className="text-zeus-text-secondary hover:text-sedona-500"
              >
                <Icon
                  icon={copiedTemplate === "hashtags-primary" ? "check" : "copy"}
                  className="h-4 w-4"
                />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtagGroups.primary.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-sedona-500/20 px-3 py-1 text-caption-m font-medium text-sedona-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-caption-m text-zeus-text-tertiary">Always include in Sedona posts</p>
          </Card>

          {/* Secondary */}
          <Card className="bg-zeus-surface-elevated p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
                Secondary
              </h3>
              <button
                onClick={() => copyToClipboard(hashtagGroups.secondary.join(" "), "hashtags-secondary")}
                className="text-zeus-text-secondary hover:text-sedona-500"
              >
                <Icon
                  icon={copiedTemplate === "hashtags-secondary" ? "check" : "copy"}
                  className="h-4 w-4"
                />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtagGroups.secondary.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zeus-surface-neutral px-3 py-1 text-caption-m font-medium text-zeus-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-caption-m text-zeus-text-tertiary">For broader reach</p>
          </Card>

          {/* Event */}
          <Card className="bg-zeus-surface-elevated p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
                Event-Specific
              </h3>
              <button
                onClick={() => copyToClipboard(hashtagGroups.event.join(" "), "hashtags-event")}
                className="text-zeus-text-secondary hover:text-sedona-500"
              >
                <Icon
                  icon={copiedTemplate === "hashtags-event" ? "check" : "copy"}
                  className="h-4 w-4"
                />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtagGroups.event.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-500/20 px-3 py-1 text-caption-m font-medium text-blue-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-caption-m text-zeus-text-tertiary">During competitions</p>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Social Best Practices
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-zeus-surface-elevated p-6">
            <h3 className="mb-4 font-monument text-body-m font-semibold text-zeus-text-primary">
              Twitter/X
            </h3>
            <ul className="space-y-3 text-caption-l text-zeus-text-secondary">
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Lead with emoji + bold headline
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Use arrow bullets (→) for lists
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                End with CTA and link
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Include $AGENT and @SedonaArena
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Keep under 280 chars for max engagement
              </li>
            </ul>
          </Card>

          <Card className="bg-zeus-surface-elevated p-6">
            <h3 className="mb-4 font-monument text-body-m font-semibold text-zeus-text-primary">
              Discord
            </h3>
            <ul className="space-y-3 text-caption-l text-zeus-text-secondary">
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Use markdown headers (#, ##) for structure
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Include code blocks for data tables
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Reference channels with {"<#channel>"}
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Use horizontal rules (---) for sections
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Bold (**text**) for emphasis
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  )
}
