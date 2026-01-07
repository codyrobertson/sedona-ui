"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface TrustedByMarqueeProps {
  className?: string
}

const trustedBy = [
  "Uniswap",
  "Flashbots",
  "Jito",
  "Phala Network",
  "Intel SGX",
  "Intel TDX",
]

export function TrustedByMarquee({ className }: TrustedByMarqueeProps) {
  return (
    <section
      className={cn(
        "py-8 bg-zeus-surface-default border-y border-white/5 overflow-hidden",
        className
      )}
    >
      {/* Label */}
      <p className="font-grotesk text-xs uppercase tracking-wider text-zeus-text-tertiary text-center mb-4">
        TEE verification trusted by industry leaders
      </p>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zeus-surface-default to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zeus-surface-default to-transparent z-10 pointer-events-none" />

        {/* Scrolling content */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* Double the items for seamless loop */}
            {[...trustedBy, ...trustedBy, ...trustedBy, ...trustedBy].map((name, index) => (
              <span
                key={index}
                className="font-grotesk text-sm text-zeus-text-tertiary whitespace-nowrap flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zeus-highlight-gold/50" />
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
