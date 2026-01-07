"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Cpu,
  Gauge,
  Workflow,
  Bot,
  Key,
  Lock,
  Puzzle,
  Users,
  FileCode
} from "lucide-react"

export interface FeaturesSectionProps {
  className?: string
}

const features = [
  {
    title: "Lightning-Fast Performance",
    description: "Sedona is engineered for speed. Built from scratch to take full advantage of modern hardware, it runs smoothly, loads instantly.",
    items: [
      { icon: Cpu, text: "Optimized for Multicore & GPU Processing" },
      { icon: Gauge, text: "Zero-Latency Editing" },
      { icon: Workflow, text: "Asynchronous Operations" },
    ],
  },
  {
    title: "Private by Design",
    description: "Your code stays yours. No telemetry, no data harvesting—just a powerful editor that works locally, with optional AI agents.",
    items: [
      { icon: Bot, text: "Local-First AI Agents" },
      { icon: Key, text: "Bring Your Own Keys For Cloud Providers" },
      { icon: Lock, text: "End-to-End Encryption for Collaboration" },
    ],
  },
  {
    title: "Open-Source & Extensible",
    description: "Every line of Sedona is open-source. Customize, fork, and extend the editor to fit your exact workflow. Built by developers, for developers.",
    items: [
      { icon: Puzzle, text: "Fully Customizable Plugins & Themes" },
      { icon: Users, text: "Decentralized Development" },
      { icon: FileCode, text: "Transparent & Auditable Codebase" },
    ],
  },
]

export function FeaturesSection({ className }: FeaturesSectionProps) {
  return (
    <section
      id="features"
      className={cn(
        "bg-zeus-surface-default py-20 px-6",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="space-y-6">
              {/* Title */}
              <h3
                className="font-souvenir font-bold text-xl"
                style={{ color: "#ECD89B" }}
              >
                {feature.title}
              </h3>

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
                    <item.icon
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: "#ECD89B" }}
                    />
                    <span className="font-grotesk text-sm text-zeus-text-primary">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
