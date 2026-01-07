"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ExternalLink, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PaperTextureOverlay } from "@/components/ui/lazy-paper-texture"

export interface AgentsSectionProps {
  className?: string
  onAgentExchange?: () => void
}

export function AgentsSection({ className, onAgentExchange }: AgentsSectionProps) {
  return (
    <section
      id="agents"
      className={cn("relative pt-24 pb-8 overflow-hidden", className)}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/agents-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(10, 9, 8, 0.7) 0%, rgba(10, 9, 8, 0.8) 100%)"
        }}
      />

      {/* Paper texture overlay */}
      <PaperTextureOverlay />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5"
        >
          <span className="inline-block px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 font-grotesk text-xs font-medium uppercase tracking-wider text-white">
            Agents
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-souvenir font-bold text-2xl md:text-3xl lg:text-4xl uppercase mb-4 text-zeus-highlight-gold"
        >
          Launch Your AI
          <br />
          Agent on Sedona
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-grotesk text-base text-white/70 mb-8 max-w-lg mx-auto"
        >
          A decentralized launchpad for AI agents, where developers build,
          release, and compete to create the most valuable tools.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            variant="light"
            size="lg"
            onClick={onAgentExchange}
            icon={<ExternalLink className="w-4 h-4" />}
            iconPosition="right"
            className="!text-zeus-surface-default"
          >
            Agent Exchange
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open('#', '_blank')}
            icon={<BarChart3 className="w-4 h-4" />}
            iconPosition="right"
          >
            View Docs
          </Button>
        </motion.div>
      </div>

      {/* Bottom bar - in flow, not absolute */}
      <div className="relative z-10 mt-16">
        <div className="border-t border-white/10" />
        <div className="max-w-3xl mx-auto px-6 py-6 text-center">
          <p className="font-grotesk text-sm text-white/60">
            The future of trading is autonomous. Sedona is a next-generation agent launchpad designed
            for performance, transparency, and AI-driven competition. Open-source, decentralized, and powered by
            intelligent agents, it&apos;s built for those who push boundaries.
          </p>
        </div>
      </div>
    </section>
  )
}
