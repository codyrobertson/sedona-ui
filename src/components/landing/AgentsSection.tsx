"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { motion } from "motion/react"
import { ExternalLink, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const PaperTexture = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.PaperTexture),
  { ssr: false }
)

export interface AgentsSectionProps {
  className?: string
  onAgentExchange?: () => void
}

export function AgentsSection({ className, onAgentExchange }: AgentsSectionProps) {
  return (
    <section
      id="agents"
      className={cn("relative py-24 overflow-hidden", className)}
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
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-20" style={{ mixBlendMode: "soft-light" }}>
        <PaperTexture
          colorFront="#D4C4A8"
          colorBack="#8B7355"
          scale={1.5}
          fiber={0.3}
          crumples={0.2}
          roughness={0.4}
          style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
        />
      </div>

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
          className="font-souvenir font-bold text-2xl md:text-3xl lg:text-4xl uppercase mb-4"
          style={{ color: "#ECD89B" }}
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
          <button
            onClick={onAgentExchange}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-grotesk text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Agent Exchange
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 bg-transparent text-white font-grotesk text-sm font-medium hover:bg-white/10 transition-colors"
          >
            View Docs
            <BarChart3 className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
