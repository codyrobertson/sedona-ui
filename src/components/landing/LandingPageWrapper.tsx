"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { BrowserChrome } from "./BrowserChrome"
import { LandingHero } from "./LandingHero"

const FaultyTerminal = dynamic(() => import("@/components/ui/faulty-terminal"), {
  ssr: false,
})

export interface LandingPageWrapperProps {
  children: React.ReactNode
  isHeroMode: boolean
  onToggle?: () => void
  onLaunchAgent?: () => void
  className?: string
}

// ===========================================
// SYMMETRIC ANIMATION
// Exit is exact reverse of entrance
// ===========================================

const ease = [0.32, 0.72, 0, 1]

// Same transition for enter AND exit - symmetric
const transition = {
  duration: 0.6,
  ease,
}

// Scale for hero mockup
const SCALE = 0.85

export function LandingPageWrapper({
  children,
  isHeroMode,
  onToggle,
  onLaunchAgent,
  className,
}: LandingPageWrapperProps) {
  return (
    <div className={cn("relative", className)}>
      {/* FaultyTerminal background for hero mode */}
      <AnimatePresence>
        {isHeroMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="fixed inset-0 z-0"
            style={{
              background: "linear-gradient(180deg, #141311 0%, #1a1816 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-[0.10]">
              <FaultyTerminal
                scale={1.8}
                gridMul={[3, 2]}
                digitSize={1.4}
                timeScale={0.6}
                pause={false}
                scanlineIntensity={0.25}
                glitchAmount={0.6}
                flickerAmount={0.4}
                noiseAmp={1.2}
                curvature={0}
                tint="#f97316"
                mouseReact={false}
                pageLoadAnimation={false}
                brightness={1}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content container */}
      <div className="relative">
        {/* Hero content - absolute so it doesn't affect document flow */}
        <AnimatePresence>
          {isHeroMode && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={transition}
              className="absolute inset-x-0 top-0 z-20 pt-8"
            >
              <LandingHero
                onEnterApp={onToggle || (() => {})}
                onLaunchAgent={onLaunchAgent || (() => {})}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer for hero content - animates height */}
        <motion.div
          initial={false}
          animate={{
            height: isHeroMode ? 580 : 0,
          }}
          transition={transition}
        />

        {/* Dashboard with browser frame - everything scales together */}
        <div className="relative z-10">
          <motion.div
            initial={false}
            animate={{
              scale: isHeroMode ? SCALE : 1,
            }}
            transition={transition}
            style={{
              transformOrigin: "top center",
            }}
            className="relative"
          >
            {/* Browser chrome - absolute so it doesn't affect layout during exit */}
            <AnimatePresence>
              {isHeroMode && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                  className="absolute top-0 left-0 right-0 z-10"
                >
                  <BrowserChrome isVisible={true} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Spacer for browser chrome height */}
            <motion.div
              initial={false}
              animate={{ height: isHeroMode ? 40 : 0 }}
              transition={transition}
            />

            {/* Mockup container */}
            <div className="relative">
              {/* Frame border - wraps dashboard */}
              <AnimatePresence>
                {isHeroMode && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={transition}
                    className="absolute inset-0 rounded-b-xl border border-zeus-border-alpha pointer-events-none z-20"
                    style={{
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Dashboard content */}
              <div
                className="min-h-screen bg-zeus-surface-default"
                style={{
                  pointerEvents: isHeroMode ? "none" : "auto",
                }}
              >
                {children}
              </div>

              {/* Bottom scrim - gradient fade */}
              <AnimatePresence>
                {isHeroMode && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={transition}
                    className="absolute bottom-0 left-0 right-0 h-48 z-30 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, #1e1c17 0%, #1e1c17 30%, transparent 100%)",
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
