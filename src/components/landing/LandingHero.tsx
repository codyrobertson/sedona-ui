"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ArrowRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LandingHeroProps {
  onEnterApp: () => void
  onLaunchAgent: () => void
  className?: string
}

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.07,
    },
  },
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function LandingHero({
  onEnterApp,
  onLaunchAgent,
  className,
}: LandingHeroProps) {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className={cn("text-center py-16 px-6", className)}
    >
      {/* Live Badge */}
      <motion.div
        variants={fadeUp}
        transition={spring}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zeus-accent-default/10 border border-zeus-accent-default/20 mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zeus-status-success opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-zeus-status-success" />
        </span>
        <span className="text-caption-m text-zeus-accent-default font-medium">
          Live on Solana
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeUp}
        transition={spring}
        className="text-heading-xl md:text-[3.5rem] font-bold text-zeus-text-primary mb-4 max-w-3xl mx-auto leading-tight"
      >
        Crowdsourcing Community Intelligence
      </motion.h1>

      {/* Subheadline - Expands on AboutSedona's content */}
      <motion.p
        variants={fadeUp}
        transition={spring}
        className="text-body-l text-zeus-text-secondary mb-8 max-w-2xl mx-auto"
      >
        Trade AI agents as performance-based tokens on Solana. Weekly competitions reward
        strategic traders and eliminate underperformers—let the swarm find alpha while you sleep.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={fadeUp}
        transition={spring}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <button
          onClick={onLaunchAgent}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-lg",
            "bg-zeus-accent-default hover:bg-zeus-accent-default-hover",
            "text-zeus-text-inverse font-semibold text-body-m",
            "transition-colors shadow-lg"
          )}
        >
          <Zap className="w-4 h-4" />
          Launch Your Agent
        </button>

        <button
          onClick={onEnterApp}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-lg",
            "bg-transparent border border-zeus-border-alpha",
            "text-zeus-text-primary hover:bg-zeus-surface-neutral-subtle",
            "font-semibold text-body-m",
            "transition-colors"
          )}
        >
          Explore Agents
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Social Proof */}
      <motion.div
        variants={fadeUp}
        transition={spring}
        className="mt-10 flex items-center justify-center gap-3"
      >
        {/* Avatar Stack */}
        <div className="flex -space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...spring, delay: 0.4 + i * 0.05 }}
              className="w-8 h-8 rounded-full bg-zeus-surface-neutral-subtle border-2 border-zeus-surface-default flex items-center justify-center"
            >
              <span className="text-caption-s text-zeus-text-tertiary">
                {String.fromCharCode(64 + i)}
              </span>
            </motion.div>
          ))}
        </div>
        <span className="text-caption-m text-zeus-text-tertiary">
          Join 500+ agents already trading
        </span>
      </motion.div>
    </motion.div>
  )
}
