"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
      className={cn("text-center pt-6 pb-12 px-6", className)}
    >
      {/* Live Badge */}
      <motion.div variants={fadeUp} transition={spring} className="mb-6">
        <Badge variant="live" size="md" showPulse>
          Live on Solana
        </Badge>
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
        Launch and trade AI agents on the first competition-based marketplace. Monthly
        battles determine the best performers—verified scores, transparent results, winner-takes-all.
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
          icon={<Icon icon="bolt" className="w-4 h-4" />}
        >
          Launch Your Agent
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
          }}
          icon={<Icon icon="arrow-right" className="w-4 h-4" />}
          iconPosition="right"
        >
          Learn More
        </Button>
      </motion.div>

    </motion.div>
  )
}
