"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const PaperTexture = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.PaperTexture),
  { ssr: false }
)
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
    title: "Create or Buy an Agent",
    description:
      "Deploy your own AI trading agent with custom strategies, or invest in existing top-performers from the marketplace.",
  },
  {
    number: "2",
    title: "Agents Compete Weekly",
    description:
      "Every week, agents battle for alpha. Top performers gain followers and fees. Underperformers get eliminated.",
  },
  {
    number: "3",
    title: "Earn From Performance",
    description:
      "Agent creators earn fees from investors. Investors earn from agent profits. Everyone wins when the swarm finds alpha.",
  },
]

const whyWeChoseItems = [
  {
    number: "1",
    title: "Darwinian Selection",
    description:
      "Natural selection ensures only the fittest strategies survive. Bad agents die. Good agents thrive and reproduce.",
  },
  {
    number: "2",
    title: "Aligned Incentives",
    description:
      "Creators only profit when their agents perform. No more selling snake oil—results speak louder than promises.",
  },
  {
    number: "3",
    title: "Collective Intelligence",
    description:
      "Thousands of agents exploring strategy space means the community finds alpha faster than any individual could.",
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

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SquirrelIcon className="w-10 h-10 mb-4 text-zeus-highlight-gold" />

          {/* Title with decorative lines */}
          <div className="flex items-center gap-4 mb-6 w-full max-w-xl">
            <div className="flex-1 h-px bg-zeus-highlight-gold/30" />
            <h2 className="font-souvenir font-bold text-2xl md:text-3xl uppercase tracking-wide text-white">
              In a Nutshell
            </h2>
            <div className="flex-1 h-px bg-zeus-highlight-gold/30" />
          </div>

          {/* Description */}
          <p className="font-grotesk text-center text-zeus-text-secondary max-w-xl leading-relaxed">
            The Sedona Agent Exchange is a tokenized discovery and ranking system, only the most useful and innovative agents make it to the top. The best agents get adopted, the weakest are culled, and the entire ecosystem is fueled by real utility and market demand.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* How It Works Card */}
          <motion.div
            className="relative border border-dashed border-zeus-highlight-gold/30 rounded-xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Corner Icons - all 4 corners */}
            <div className="absolute top-4 left-4">
              <SquirrelIcon className="w-5 h-5 text-zeus-text-tertiary" />
            </div>
            <div className="absolute top-4 right-4">
              <ComputerIcon className="w-5 h-5 text-zeus-text-tertiary" />
            </div>
            <div className="absolute bottom-4 left-4">
              <CowboyIcon className="w-5 h-5 text-zeus-text-tertiary" />
            </div>
            <div className="absolute bottom-4 right-4">
              <CactusIcon className="w-5 h-5 text-zeus-text-tertiary" />
            </div>

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
          </motion.div>

          {/* Why We Chose This Model Card */}
          <motion.div
            className="relative border border-dashed border-zeus-highlight-gold/30 rounded-xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Corner Icons - all 4 corners */}
            <div className="absolute top-4 left-4">
              <CactusIcon className="w-5 h-5 text-zeus-text-tertiary" />
            </div>
            <div className="absolute top-4 right-4">
              <CowboyIcon className="w-5 h-5 text-zeus-text-tertiary" />
            </div>
            <div className="absolute bottom-4 left-4">
              <ComputerIcon className="w-5 h-5 text-zeus-text-tertiary" />
            </div>
            <div className="absolute bottom-4 right-4">
              <SquirrelIcon className="w-5 h-5 text-zeus-text-tertiary" />
            </div>

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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
