"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CodeBlock } from "@/components/brand/interactive"

const fontFamilies = [
  {
    name: "Souvenir",
    variable: "font-souvenir",
    usage: "Display, marketing headlines",
    weights: ["Light", "Regular", "Medium", "Demi Bold"],
    sample: "The quick brown fox jumps over the lazy dog",
    className: "font-souvenir",
  },
  {
    name: "Monument Grotesk",
    variable: "font-monument",
    usage: "UI headlines, navigation",
    weights: ["Regular", "Medium", "Bold"],
    sample: "The quick brown fox jumps over the lazy dog",
    className: "font-monument",
  },
  {
    name: "Geist Sans",
    variable: "font-geist-sans",
    usage: "Body text, UI elements",
    weights: ["Regular", "Medium", "Semi Bold", "Bold"],
    sample: "The quick brown fox jumps over the lazy dog",
    className: "font-geist-sans",
  },
  {
    name: "JetBrains Mono",
    variable: "font-mono",
    usage: "Code, technical content",
    weights: ["Regular", "Medium", "Bold"],
    sample: "const agent = new SedonaAgent()",
    className: "font-mono",
  },
]

const typeScale = [
  { name: "display-l", size: "48px", line: "52px", weight: "700", use: "Hero headlines" },
  { name: "display-m", size: "36px", line: "40px", weight: "700", use: "Page titles" },
  { name: "display-s", size: "30px", line: "36px", weight: "700", use: "Section titles" },
  { name: "heading-l", size: "24px", line: "32px", weight: "600", use: "Major headings" },
  { name: "heading-m", size: "20px", line: "28px", weight: "600", use: "Card titles" },
  { name: "heading-s", size: "18px", line: "24px", weight: "600", use: "Subsections" },
  { name: "body-m", size: "18px", line: "26px", weight: "400", use: "Large body text" },
  { name: "body-s", size: "16px", line: "24px", weight: "400", use: "Default body" },
  { name: "caption-l", size: "14px", line: "20px", weight: "500", use: "Large captions" },
  { name: "caption-m", size: "12px", line: "16px", weight: "500", use: "Default captions" },
  { name: "caption-s", size: "10px", line: "14px", weight: "600", use: "Tiny labels" },
]

const fontStackCode = `/* Font Stacks */
--font-souvenir: 'Souvenir', Georgia, serif;
--font-monument: 'Monument Grotesk', system-ui, sans-serif;
--font-geist: 'Geist Sans', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;`

const tailwindConfig = `// tailwind.config.ts
fontFamily: {
  souvenir: ['var(--font-souvenir)', 'Georgia', 'serif'],
  monument: ['var(--font-monument)', 'system-ui', 'sans-serif'],
  'geist-sans': ['var(--font-geist-sans)', '-apple-system', 'sans-serif'],
  mono: ['var(--font-jetbrains-mono)', 'Fira Code', 'monospace'],
}`

export default function TypographyPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <section>
        <Badge variant="outline" className="mb-4">
          Design System
        </Badge>
        <h1 className="font-monument text-display-s font-bold text-zeus-text-primary">
          Typography
        </h1>
        <p className="mt-4 max-w-2xl text-body-s text-zeus-text-secondary">
          Our type system combines four distinct font families, each serving a specific purpose in
          the hierarchy.
        </p>
      </section>

      {/* Font Families */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Font Families
        </h2>
        <div className="space-y-6">
          {fontFamilies.map((font) => (
            <Card key={font.name} className="bg-zeus-surface-elevated p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-monument text-heading-s font-semibold text-zeus-text-primary">
                      {font.name}
                    </h3>
                    <Badge variant="outline" className="font-mono">
                      {font.variable}
                    </Badge>
                  </div>
                  <p className="mt-1 text-caption-l text-zeus-text-secondary">{font.usage}</p>
                  <p className="mt-2 text-caption-m text-zeus-text-tertiary">
                    Weights: {font.weights.join(", ")}
                  </p>
                </div>
              </div>
              <div className="mt-6 rounded-lg bg-zeus-surface-neutral p-4">
                <p className={`text-heading-l text-zeus-text-primary ${font.className}`}>
                  {font.sample}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Type Scale */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Type Scale
        </h2>
        <Card className="overflow-hidden bg-zeus-surface-elevated">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zeus-border-default bg-zeus-surface-neutral">
                <th className="px-4 py-3 text-left text-caption-m font-medium text-zeus-text-secondary">
                  Token
                </th>
                <th className="px-4 py-3 text-left text-caption-m font-medium text-zeus-text-secondary">
                  Size / Line
                </th>
                <th className="px-4 py-3 text-left text-caption-m font-medium text-zeus-text-secondary">
                  Weight
                </th>
                <th className="hidden px-4 py-3 text-left text-caption-m font-medium text-zeus-text-secondary sm:table-cell">
                  Usage
                </th>
                <th className="px-4 py-3 text-left text-caption-m font-medium text-zeus-text-secondary">
                  Preview
                </th>
              </tr>
            </thead>
            <tbody>
              {typeScale.map((item, i) => (
                <tr
                  key={item.name}
                  className={i !== typeScale.length - 1 ? "border-b border-zeus-border-default" : ""}
                >
                  <td className="px-4 py-3 font-mono text-caption-l text-sedona-500">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-caption-l text-zeus-text-secondary">
                    {item.size} / {item.line}
                  </td>
                  <td className="px-4 py-3 font-mono text-caption-l text-zeus-text-secondary">
                    {item.weight}
                  </td>
                  <td className="hidden px-4 py-3 text-caption-l text-zeus-text-tertiary sm:table-cell">
                    {item.use}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-zeus-text-primary"
                      style={{
                        fontSize: item.size,
                        lineHeight: item.line,
                        fontWeight: item.weight,
                      }}
                    >
                      Aa
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Live Examples
        </h2>
        <Card className="space-y-6 bg-zeus-surface-elevated p-6">
          <div>
            <span className="mb-2 block text-caption-s uppercase tracking-wide text-zeus-text-tertiary">
              Display Large
            </span>
            <p className="text-display-l font-bold text-zeus-text-primary">
              The AI Trading Arena
            </p>
          </div>
          <div>
            <span className="mb-2 block text-caption-s uppercase tracking-wide text-zeus-text-tertiary">
              Heading Medium
            </span>
            <p className="text-heading-m font-semibold text-zeus-text-primary">
              Agent Leaderboard Rankings
            </p>
          </div>
          <div>
            <span className="mb-2 block text-caption-s uppercase tracking-wide text-zeus-text-tertiary">
              Body Small
            </span>
            <p className="text-body-s text-zeus-text-secondary">
              Track your AI agent's performance in real-time. Compare results against other traders
              and climb the leaderboard through consistent returns.
            </p>
          </div>
          <div>
            <span className="mb-2 block text-caption-s uppercase tracking-wide text-zeus-text-tertiary">
              Code
            </span>
            <p className="font-mono text-caption-l text-zeus-text-primary">
              const agent = await sedona.deploy(strategy)
            </p>
          </div>
        </Card>
      </section>

      {/* Code Snippets */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Implementation
        </h2>
        <div className="space-y-4">
          <CodeBlock code={fontStackCode} language="css" title="Font Stacks" />
          <CodeBlock code={tailwindConfig} language="tsx" title="Tailwind Config" />
        </div>
      </section>
    </div>
  )
}
