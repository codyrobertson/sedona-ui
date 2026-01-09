import { Metadata } from "next"
import Link from "next/link"
import { Icon } from "@/components/ui/icon"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Overview",
  description: "Sedona brand overview - mission, pillars, and personality.",
}

const brandPillars = [
  {
    icon: "trophy",
    title: "Competition",
    description:
      "Trading is a competition. Every interaction should feel like entering an arena where skill and strategy matter.",
  },
  {
    icon: "eye",
    title: "Transparency",
    description:
      "Clear, honest communication about performance, risks, and results. No hidden information or misleading metrics.",
  },
  {
    icon: "lightbulb",
    title: "Innovation",
    description:
      "Pushing the boundaries of what's possible with AI-powered trading while maintaining responsible practices.",
  },
  {
    icon: "users",
    title: "Community",
    description:
      "Building a community of traders who learn from each other and celebrate collective success.",
  },
]

const brandEssence = [
  { label: "Mission", value: "Democratize AI-powered trading through transparent competition" },
  { label: "Personality", value: "Bold, Technical, Competitive, Trustworthy" },
  { label: "Feeling", value: "Excitement meets confidence" },
  { label: "Promise", value: "Fair competition, real results, proven strategies" },
]

const quickLinks = [
  { href: "/brand/logo", label: "Logo Guidelines", description: "Usage rules and downloads" },
  { href: "/brand/colors", label: "Color System", description: "Sedona & Zeus palettes" },
  { href: "/brand/typography", label: "Typography", description: "Fonts and type scale" },
  { href: "/brand/press-kit", label: "Press Kit", description: "Download brand assets" },
]

export default function BrandOverviewPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sedona-600 via-sedona-500 to-sedona-400 p-8 md:p-12">
        <div className="relative z-10">
          <Badge variant="outline" className="mb-4 border-white/30 bg-white/10 text-white">
            Brand Guidelines v1.0
          </Badge>
          <h1 className="font-monument text-display-m font-bold text-white md:text-display-l">
            Sedona Brand Guide
          </h1>
          <p className="mt-4 max-w-2xl text-body-m text-white/90">
            Welcome to the official Sedona brand guidelines. This resource provides everything you
            need to represent Sedona consistently across all touchpoints.
          </p>
        </div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
      </section>

      {/* Brand Essence */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Brand Essence
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {brandEssence.map((item) => (
            <Card key={item.label} className="bg-zeus-surface-elevated p-4">
              <span className="text-caption-m font-medium uppercase tracking-wide text-zeus-text-tertiary">
                {item.label}
              </span>
              <p className="mt-1 text-body-s font-medium text-zeus-text-primary">{item.value}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Brand Pillars */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Brand Pillars
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {brandPillars.map((pillar) => (
            <Card key={pillar.title} className="bg-zeus-surface-elevated p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sedona-500/10">
                <Icon icon={pillar.icon} className="h-6 w-6 text-sedona-500" />
              </div>
              <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
                {pillar.title}
              </h3>
              <p className="mt-2 text-caption-l text-zeus-text-secondary">{pillar.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Quick Links
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="group bg-zeus-surface-elevated p-4 transition-colors hover:bg-zeus-surface-neutral">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-zeus-text-primary">{link.label}</h3>
                    <p className="text-caption-m text-zeus-text-tertiary">{link.description}</p>
                  </div>
                  <Icon icon="arrow-right" className="h-5 w-5 text-zeus-text-tertiary transition-transform group-hover:translate-x-1 group-hover:text-sedona-500" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
