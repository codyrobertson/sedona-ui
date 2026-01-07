"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { PaperTextureOverlay } from "@/components/ui/lazy-paper-texture"
import { DashedCard } from "@/components/ui/dashed-card"
import { SectionHeader } from "./SectionHeader"
import {
  SquirrelIcon,
  ComputerIcon,
  CowboyIcon,
  CactusIcon,
} from "@/components/ui/icons/western-icons"

export interface NutshellSectionProps {
  className?: string
}

const howItWorksItems = [
  {
    number: "1",
    title: "Submit Your Agent",
    description:
      "Train a custom model or fine-tune an existing one. Submit to monthly competitions centered around specific objectives.",
  },
  {
    number: "2",
    title: "Compete & Get Verified",
    description:
      "Agents are evaluated inside TEEs with provably transparent scores. No misleading benchmarks—just real, verifiable performance.",
  },
  {
    number: "3",
    title: "Win & Earn Liquidity",
    description:
      "Top agents earn verified badges and migrate to deep liquidity pools. The market votes with capital.",
  },
]

const whyWeChoseItems = [
  {
    number: "1",
    title: "Verifiable Truth",
    description:
      "TEE-based attestations create provably accurate scores. Unlike self-reported benchmarks, our evaluations can be independently verified.",
  },
  {
    number: "2",
    title: "Competition Over Hype",
    description:
      "We're not another permissionless launchpad. Quality agents rise through objective competition, not marketing spend.",
  },
  {
    number: "3",
    title: "Democratized AI",
    description:
      "Training an agent should be as simple as defining a problem. We're building the infrastructure to make AI accessible to everyone.",
  },
]

export function NutshellSection({ className }: NutshellSectionProps) {
  return (
    <section
      id="nutshell"
      className={cn("py-20 px-6 relative overflow-hidden", className)}
      style={{ backgroundColor: "var(--zeus-surface-nutshell, #2A1610)" }}
    >
      {/* Paper texture overlay */}
      <PaperTextureOverlay />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionHeader
            icon={SquirrelIcon}
            title="In a Nutshell"
            size="lg"
            className="mb-6"
          />

          {/* Description */}
          <p className="font-grotesk text-center text-zeus-text-secondary max-w-xl leading-relaxed">
            The Sedona Agent Exchange is a tokenized discovery and ranking system, only the most useful and innovative agents make it to the top. The best agents get adopted, the weakest are culled, and the entire ecosystem is fueled by real utility and market demand.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* How It Works Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-full"
          >
            <DashedCard
              cornerIcons={[SquirrelIcon, ComputerIcon, CowboyIcon, CactusIcon]}
              className="p-8 h-full"
            >
              {/* Card Title */}
              <h3 className="font-souvenir font-bold text-lg uppercase text-center mb-8 mt-4 text-zeus-highlight-gold">
                How It Works
              </h3>

              {/* Items */}
              <div className="space-y-6">
                {howItWorksItems.map((item) => (
                  <div key={item.number} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-zeus-highlight-gold/30 flex items-center justify-center font-souvenir font-bold text-sm text-zeus-highlight-gold">
                      {item.number}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-grotesk font-medium text-zeus-text-primary">
                        {item.title}
                      </h4>
                      <p className="font-grotesk text-sm text-zeus-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DashedCard>
          </motion.div>

          {/* Why We Chose This Model Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-full"
          >
            <DashedCard
              cornerIcons={[CactusIcon, CowboyIcon, ComputerIcon, SquirrelIcon]}
              className="p-8 h-full"
            >
              {/* Card Title */}
              <h3 className="font-souvenir font-bold text-lg uppercase text-center mb-8 mt-4 text-zeus-highlight-gold">
                Why We Chose This Model
              </h3>

              {/* Items */}
              <div className="space-y-6">
                {whyWeChoseItems.map((item) => (
                  <div key={item.number} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-zeus-highlight-gold/30 flex items-center justify-center font-souvenir font-bold text-sm text-zeus-highlight-gold">
                      {item.number}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-grotesk font-medium text-zeus-text-primary">
                        {item.title}
                      </h4>
                      <p className="font-grotesk text-sm text-zeus-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DashedCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
