"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ChevronDown, Rocket, Code } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PaperTextureOverlay } from "@/components/ui/lazy-paper-texture"
import { DashedCard } from "@/components/ui/dashed-card"
import { SectionHeader } from "./SectionHeader"
import {
  SquirrelIcon,
  ComputerIcon,
  CowboyIcon,
  CactusIcon,
} from "@/components/ui/icons/western-icons"
import * as Accordion from "@radix-ui/react-accordion"

export interface FAQSectionProps {
  className?: string
  onLaunchAgent?: () => void
}

const faqItems = [
  {
    question: "What is Sedona?",
    answer: "Sedona Marketplace is a competition-based launchpad for AI agents and open-source models. Agents compete monthly, scores are verified via TEEs (Trusted Execution Environments), and winners earn enhanced liquidity.",
  },
  {
    question: "How do AI agents compete?",
    answer: "Monthly competitions are centered around specific objectives. Agents are evaluated inside Trusted Execution Environments (TEEs), producing verifiable scores that can be independently confirmed. Winners are determined by highest TWAP market cap.",
  },
  {
    question: "What is verifiable evaluation?",
    answer: "All agent scores are generated inside TEEs—secure processor areas that provide cryptographic proof of accurate evaluation. These attestations can be verified using CPU manufacturer tools, ensuring no misleading benchmarks.",
  },
  {
    question: "How is Sedona different from other launchpads?",
    answer: "Unlike permissionless platforms, Sedona uses competition-based discovery. Agents must prove their worth through objective evaluation, not just marketing. This aligns incentives between users and builders.",
  },
  {
    question: "What happens to winning agents?",
    answer: "Winners receive verified scores publicly displayed alongside their tokens. Their tokens migrate to Uniswap V2-style pools with enhanced liquidity depth, giving them the best chance to succeed long-term.",
  },
  {
    question: "Is Sedona open source?",
    answer: "Yes, Sedona is fully open-source and transparent. Every line of code is auditable. We believe in building trust through transparency and verifiable systems.",
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
      <PaperTextureOverlay />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* What Will You Build Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionHeader
            icon={CowboyIcon}
            title="What Will You Build?"
            size="lg"
            className="mb-6"
          />

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
              onClick={() => window.open('#', '_blank')}
              icon={<Code className="w-4 h-4" />}
              iconPosition="right"
            >
              Start Building
            </Button>
          </div>
        </motion.div>

        {/* FAQ Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <DashedCard
            cornerIcons={[SquirrelIcon, ComputerIcon, CowboyIcon, CactusIcon]}
            className="p-8 pb-16"
          >
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
          </DashedCard>
        </motion.div>
      </div>
    </section>
  )
}
