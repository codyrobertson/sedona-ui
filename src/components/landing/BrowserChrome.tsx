"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface BrowserChromeProps {
  isVisible: boolean
  showUrlBar?: boolean
  url?: string
  className?: string
}

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
}

const trafficLightColors = [
  { bg: "bg-red-500", delay: 0 },
  { bg: "bg-yellow-500", delay: 0.05 },
  { bg: "bg-green-500", delay: 0.1 },
]

export function BrowserChrome({
  isVisible,
  showUrlBar = true,
  url = "sedona.app/trading",
  className,
}: BrowserChromeProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        height: isVisible ? 40 : 0,
        opacity: isVisible ? 1 : 0,
      }}
      transition={spring}
      className={cn(
        "bg-zeus-surface-elevated border-b border-zeus-border-alpha overflow-hidden rounded-t-xl",
        className
      )}
    >
      <div className="flex items-center h-10 px-4 gap-3">
        {/* Traffic lights */}
        <div className="flex items-center gap-2">
          {trafficLightColors.map((light, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                scale: isVisible ? 1 : 0,
                opacity: isVisible ? 1 : 0,
              }}
              transition={{
                ...spring,
                delay: isVisible ? 0.15 + light.delay : 0,
              }}
              className={cn("w-3 h-3 rounded-full", light.bg)}
            />
          ))}
        </div>

        {/* URL bar */}
        {showUrlBar && (
          <motion.div
            initial={false}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -10,
            }}
            transition={{
              ...spring,
              delay: isVisible ? 0.2 : 0,
            }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="bg-zeus-surface-default border border-zeus-border-alpha rounded-md px-3 py-1 max-w-md w-full">
              <span className="text-zeus-text-tertiary text-caption-s font-mono truncate block text-center">
                {url}
              </span>
            </div>
          </motion.div>
        )}

        {/* Spacer for symmetry when no URL bar */}
        {!showUrlBar && <div className="flex-1" />}
      </div>
    </motion.div>
  )
}
