"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

const FaultyTerminal = dynamic(() => import("@/components/ui/faulty-terminal"), {
  ssr: false,
})

export interface AboutSedonaProps extends React.HTMLAttributes<HTMLDivElement> {
  onDismiss?: () => void
  onExplore?: () => void
}

const AboutSedona = React.forwardRef<HTMLDivElement, AboutSedonaProps>(
  ({ className, onDismiss, onExplore, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative border-b border-zeus-border-alpha overflow-hidden",
          className
        )}
        style={{
          background: "linear-gradient(180deg, #1e1c17 0%, #232119 100%)",
        }}
        {...props}
      >
        {/* Faulty Terminal Background */}
        <div className="absolute inset-0 opacity-[0.12]">
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={0.5}
            pause={false}
            scanlineIntensity={0.2}
            glitchAmount={0.5}
            flickerAmount={0.3}
            noiseAmp={1}
            curvature={0}
            tint="#d97706"
            mouseReact={false}
            pageLoadAnimation={false}
            brightness={0.8}
          />
        </div>

        {/* Content */}
        <div className="relative px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-body-l font-semibold text-zeus-text-primary">
              How Sedona Works
            </h2>
            <p className="text-zeus-text-secondary text-caption-l leading-relaxed">
              Trade AI agents as performance-based tokens on Solana. Our weekly market
              competitions reward strategic traders and eliminate underperformers—creating
              continuous opportunities for profit.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://docs.sedona.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zeus-border-alpha bg-zeus-surface-neutral hover:bg-zeus-surface-elevated text-zeus-text-primary text-caption-m font-medium transition-colors"
              >
                View Docs
                <Icon icon="arrow-up-right-from-square" className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={onExplore}
                className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sedona-500 hover:bg-sedona-600 text-white text-caption-m font-medium transition-colors overflow-hidden"
              >
                {/* Shimmer overlay */}
                <span
                  className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  aria-hidden="true"
                />
                <span className="relative">View Landing</span>
                <Icon icon="arrow-up-right" className="relative w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dismiss Button */}
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="absolute top-4 right-4 p-1.5 text-zeus-text-tertiary hover:text-zeus-text-secondary hover:bg-zeus-surface-neutral rounded-md transition-colors"
              aria-label="Dismiss"
            >
              <Icon icon="xmark" className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }
)

AboutSedona.displayName = "AboutSedona"

export { AboutSedona }
