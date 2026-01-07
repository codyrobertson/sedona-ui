"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ArrowRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zeus-status-success opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-zeus-status-success" />
        </span>
        <span className="font-grotesk text-caption-m text-white font-medium">
          Live on Solana
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeUp}
        transition={spring}
        className="font-souvenir font-bold text-[40px] md:text-[64px] leading-[105%] uppercase mb-6 max-w-4xl mx-auto text-zeus-highlight-gold"
        style={{
          textShadow: "4px 4px 0px #181F21",
        }}
      >
        Crowdsourcing Community Intelligence
      </motion.h1>

      {/* Subheadline - Expands on AboutSedona's content */}
      <motion.p
        variants={fadeUp}
        transition={spring}
        className="font-grotesk text-lg md:text-xl text-zeus-text-secondary mb-8 max-w-2xl mx-auto font-medium"
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
        <Button
          variant="tertiary"
          size="lg"
          onClick={onEnterApp}
          icon={<Zap className="w-4 h-4" />}
        >
          Launch Your Agent
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
          }}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          Learn More
        </Button>
      </motion.div>

    </motion.div>
  )
}
