"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { PaperTextureOverlay } from "@/components/ui/lazy-paper-texture"
import { Icon } from "@/components/ui/icon"

export interface FeaturesSectionProps {
  className?: string
}

const features = [
  {
    title: "Verifiable Evaluation",
    description: "Every agent score is provably verified using Trusted Execution Environments (TEEs). No misleading benchmarks—just transparent, auditable results you can trust.",
    items: [
      { iconName: "shield-check", text: "Scores Verified via TEE Attestations" },
      { iconName: "file-check", text: "One Consistent Evaluation Standard" },
      { iconName: "eye", text: "Publicly Published & Independently Verifiable" },
    ],
  },
  {
    title: "Competition-Based Discovery",
    description: "Unlike permissionless launchpads, Sedona uses monthly competitions to surface the best agents. Quality rises to the top through real performance, not hype.",
    items: [
      { iconName: "trophy", text: "Monthly Competition Cycles" },
      { iconName: "bullseye", text: "Objective-Driven Challenges" },
      { iconName: "arrow-trend-up", text: "Market-Driven Agent Selection" },
    ],
  },
  {
    title: "Winner-Takes-All",
    description: "Top performers earn verified scores and enhanced liquidity. Winning tokens migrate to deep liquidity pools—the market decides who survives.",
    items: [
      { iconName: "scale-balanced", text: "TWAP Market Cap Determines Winners" },
      { iconName: "droplet", text: "Winners Get Enhanced Liquidity Depth" },
      { iconName: "handshake", text: "Aligned Incentives for Quality" },
    ],
  },
]

export function FeaturesSection({ className }: FeaturesSectionProps) {
  return (
    <section
      id="features"
      className={cn(
        "bg-zeus-surface-default py-20 px-6 relative overflow-hidden",
        className
      )}
    >
      {/* Paper texture overlay */}
      <PaperTextureOverlay colorBack="#6B5B4F" opacity={0.15} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Title */}
              <h2 className="font-souvenir font-bold text-xl text-zeus-highlight-gold">
                {feature.title}
              </h2>

              {/* Description */}
              <p className="font-grotesk text-sm text-zeus-text-secondary leading-relaxed">
                {feature.description}
              </p>

              {/* Divider */}
              <div className="border-t border-zeus-border-alpha" />

              {/* Feature items */}
              <ul className="space-y-4">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-3">
                    <Icon icon={item.iconName} className="w-5 h-5 flex-shrink-0 text-zeus-highlight-gold" />
                    <span className="font-grotesk text-sm text-zeus-text-primary">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
