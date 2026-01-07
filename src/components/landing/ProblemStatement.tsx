"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

export interface ProblemStatementProps {
  className?: string
}

export function ProblemStatement({ className }: ProblemStatementProps) {
  return (
    <section
      className={cn(
        "py-16 px-6 bg-zeus-surface-elevated border-y border-white/5",
        className
      )}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Icon */}
          <Icon icon="bolt" className="w-8 h-8 mx-auto mb-6 text-zeus-highlight-gold" />

          {/* Problem */}
          <p className="font-grotesk text-lg md:text-xl text-zeus-text-secondary leading-relaxed mb-8">
            Advanced AI models excel in specific domains but struggle with others.
            Organizations face an &ldquo;adopt AI or die&rdquo; imperative—yet existing
            solutions are overspecialized and inaccessible to non-experts.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-zeus-highlight-gold/30" />
            <span className="text-zeus-highlight-gold">✦</span>
            <div className="w-12 h-px bg-zeus-highlight-gold/30" />
          </div>

          {/* Thesis quote */}
          <p className="font-souvenir text-xl md:text-2xl text-white leading-relaxed italic">
            &ldquo;Something must change so future progress will widen opportunity
            instead of shrinking competition.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
