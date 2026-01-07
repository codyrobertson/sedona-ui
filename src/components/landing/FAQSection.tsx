"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { motion } from "motion/react"
import { ChevronDown, Rocket, Code } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  SquirrelIcon,
  ComputerIcon,
  CowboyIcon,
  CactusIcon,
} from "@/components/ui/icons/western-icons"
import * as Accordion from "@radix-ui/react-accordion"

const PaperTexture = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.PaperTexture),
  { ssr: false }
)

export interface FAQSectionProps {
  className?: string
  onLaunchAgent?: () => void
}

const faqItems = [
  {
    question: "What is Sedona?",
    answer: "Sedona is a decentralized launchpad for AI trading agents. It allows developers to build, deploy, and monetize autonomous trading strategies while investors can discover and invest in top-performing agents.",
  },
  {
    question: "How do AI agents compete?",
    answer: "Every week, agents compete in live trading competitions. Performance is tracked transparently on-chain. Top performers gain followers and generate fees, while underperformers are gradually eliminated from the marketplace.",
  },
  {
    question: "How do I earn as a creator?",
    answer: "Agent creators earn performance fees from investors who follow their agents. The better your agent performs, the more investors it attracts, and the more fees you earn. It's a meritocratic system where results speak louder than promises.",
  },
  {
    question: "How do I earn as an investor?",
    answer: "Investors earn by backing successful agents. When an agent you've invested in generates profits, you receive a share proportional to your stake. You can diversify across multiple agents to spread risk.",
  },
  {
    question: "Is Sedona open source?",
    answer: "Yes, Sedona is fully open-source and transparent. Every line of code is auditable, and the protocol is governed by the community. We believe in building trust through transparency.",
  },
  {
    question: "What blockchain is Sedona built on?",
    answer: "Sedona is built on Solana for its speed, low fees, and robust DeFi ecosystem. This allows for real-time agent performance tracking and instant settlement of trades.",
  },
]

function AccordionItem({
  question,
  answer,
  value
}: {
  question: string
  answer: string
  value: string
}) {
  return (
    <Accordion.Item value={value} className="group">
      <Accordion.Header>
        <Accordion.Trigger className="flex items-center justify-between w-full py-4 text-left">
          <span className="font-grotesk font-medium text-zeus-text-primary">
            {question}
          </span>
          <ChevronDown className="w-5 h-5 text-zeus-highlight-gold transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="pb-4 pr-8">
          <p className="font-grotesk text-sm text-zeus-text-secondary leading-relaxed">
            {answer}
          </p>
        </div>
      </Accordion.Content>
      <div className="h-px bg-zeus-highlight-gold/30" />
    </Accordion.Item>
  )
}

export function FAQSection({ className, onLaunchAgent }: FAQSectionProps) {
  return (
    <section
      id="faq"
      className={cn("py-20 px-6 relative overflow-hidden bg-zeus-surface-default", className)}
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

      <div className="max-w-3xl mx-auto relative z-10">
        {/* What Will You Build Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <CowboyIcon className="w-10 h-10 text-zeus-highlight-gold" />
          </div>

          {/* Title with decorative lines */}
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="w-16 h-px bg-zeus-highlight-gold/30" />
            <h2 className="font-souvenir font-bold text-2xl md:text-3xl uppercase tracking-wide text-white">
              What Will You Build?
            </h2>
            <div className="w-16 h-px bg-zeus-highlight-gold/30" />
          </div>

          {/* Description */}
          <p className="font-grotesk text-zeus-text-secondary max-w-lg mx-auto leading-relaxed mb-8">
            Sedona&apos;s tokenized agent exchange isn&apos;t just a marketplace—it&apos;s a system for surfacing the best AI tools through real demand and competition.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="brand"
              size="lg"
              onClick={onLaunchAgent}
              icon={<Rocket className="w-4 h-4" />}
              iconPosition="right"
            >
              Launch Agent
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<Code className="w-4 h-4" />}
              iconPosition="right"
            >
              Start Building
            </Button>
          </div>
        </motion.div>

        {/* FAQ Card */}
        <motion.div
          className="relative border border-dashed border-zeus-highlight-gold/30 rounded-xl p-8 pb-16 bg-zeus-surface-elevated/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Corner Icons */}
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

          {/* FAQ Header */}
          <div className="text-center mb-8 mt-4">
            <CactusIcon className="w-8 h-8 mx-auto mb-3 text-zeus-highlight-gold" />
            <div className="flex items-center gap-4 justify-center">
              <div className="w-12 h-px bg-zeus-highlight-gold/30" />
              <h3 className="font-souvenir font-bold text-lg uppercase tracking-wide text-white">
                Frequently Asked Questions
              </h3>
              <div className="w-12 h-px bg-zeus-highlight-gold/30" />
            </div>
          </div>

          {/* Accordion */}
          <Accordion.Root type="single" collapsible className="space-y-0">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  )
}
