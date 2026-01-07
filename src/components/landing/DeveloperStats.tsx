"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { DollarSign, Clock, Sparkles } from "lucide-react"

export interface DeveloperStatsProps {
  className?: string
}

const stats = [
  {
    icon: DollarSign,
    value: "~$35",
    label: "Training Cost",
    description: "Full agent training",
  },
  {
    icon: Clock,
    value: "Hours",
    label: "to Deploy",
    description: "Not months",
  },
  {
    icon: Sparkles,
    value: "Zero",
    label: "ML Required",
    description: "No prerequisites",
  },
]

export function DeveloperStats({ className }: DeveloperStatsProps) {
  return (
    <section
      className={cn(
        "py-12 px-6 bg-zeus-surface-elevated border-y border-white/5",
        className
      )}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.p
          className="font-grotesk text-xs uppercase tracking-wider text-zeus-text-tertiary text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Built for developers
        </motion.p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <stat.icon className="w-5 h-5 mx-auto mb-3 text-zeus-highlight-gold" />
              <div className="font-souvenir font-bold text-2xl md:text-3xl text-white mb-1">
                {stat.value}
              </div>
              <div className="font-grotesk text-sm text-zeus-text-secondary">
                {stat.label}
              </div>
              <div className="font-grotesk text-xs text-zeus-text-tertiary mt-1">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
