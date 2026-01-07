"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { BrowserChrome } from "./BrowserChrome"
import { LandingHero } from "./LandingHero"
import { LandingNav } from "./LandingNav"
import { FeaturesSection } from "./FeaturesSection"
import { NutshellSection } from "./NutshellSection"
import { AgentsSection } from "./AgentsSection"

const PaperTexture = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.PaperTexture),
  { ssr: false }
)

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

const ease = [0.32, 0.72, 0, 1] as const

// Same transition for enter AND exit - symmetric
const transition = {
  duration: 0.6,
  ease: ease as unknown as [number, number, number, number],
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
      {/* Hero section - fixed height container */}
      <AnimatePresence>
        {isHeroMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="fixed inset-0 z-0 h-screen overflow-hidden"
          >
            {/* Background image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url(/sedona-bg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(10, 9, 8, 0.5) 0%, rgba(10, 9, 8, 0.65) 100%)"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation - rendered at root level, handles its own positioning */}
      {isHeroMode && <LandingNav onLaunchAgent={onLaunchAgent} />}

      {/* Content container - hero section is 100vh but page scrolls */}
      <div
        className="relative"
        style={{
          minHeight: isHeroMode ? "100vh" : "auto",
        }}
      >
        {/* Clip container for mockup only */}
        <div
          style={{
            height: isHeroMode ? "100vh" : "auto",
            overflow: isHeroMode ? "hidden" : "visible",
            position: "relative",
          }}
        >

        {/* Hero content - absolute positioned below nav */}
        <AnimatePresence>
          {isHeroMode && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={transition}
              className="absolute inset-x-0 top-16 z-20"
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
            height: isHeroMode ? 600 : 0,
          }}
          transition={transition}
        />

        {/* Dashboard with browser frame */}
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
            {/* Browser chrome */}
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
              {/* Frame border */}
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
            </div>
          </motion.div>
        </div>

        {/* Bottom scrim - gradient fade at bottom of hero */}
        <AnimatePresence>
          {isHeroMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="absolute bottom-0 left-0 right-0 h-64 z-30 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(10, 9, 8, 1) 0%, rgba(10, 9, 8, 1) 20%, rgba(10, 9, 8, 0.6) 60%, transparent 100%)",
              }}
            />
          )}
        </AnimatePresence>
        </div>

        {/* Features section - below the hero fold */}
        {isHeroMode && <FeaturesSection />}

        {/* In a Nutshell section */}
        {isHeroMode && <NutshellSection />}

        {/* Agents section */}
        {isHeroMode && <AgentsSection onAgentExchange={onToggle} />}
      </div>
    </div>
  )
}
