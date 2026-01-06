"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
import { ExternalLink, X } from "lucide-react"

const FaultyTerminal = dynamic(() => import("@/components/ui/faulty-terminal"), {
  ssr: false,
})

export interface TopPool {
  rank: number
  ticker: string
  marketCap: string
  change24h: number
}

export interface InfoCard {
  title: string
  value: string
  change?: number
}

export interface AboutSedonaProps extends React.HTMLAttributes<HTMLDivElement> {
  topPools?: TopPool[]
  infoCards?: InfoCard[]
  onDismiss?: () => void
}

const AboutSedona = React.forwardRef<HTMLDivElement, AboutSedonaProps>(
  ({ className, topPools = [], infoCards = [], onDismiss, ...props }, ref) => {
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
        <div className="relative px-8 py-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-body-l font-semibold text-zeus-text-primary">
              About Sedona
            </h2>
            <p className="text-zeus-text-secondary text-caption-l leading-relaxed">
              Trade AI agents as performance-based tokens on Solana. Our weekly market
              competitions reward strategic traders and eliminate underperformers—creating
              continuous opportunities for profit.
            </p>

            {/* Links */}
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://docs.sedona.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sedona-500 hover:text-sedona-400 text-caption-m font-medium transition-colors"
              >
                View Docs
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://sedona.io/about"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sedona-500 hover:text-sedona-400 text-caption-m font-medium transition-colors"
              >
                Learn More
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Dismiss Button */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 p-1.5 text-zeus-text-tertiary hover:text-zeus-text-secondary hover:bg-zeus-surface-neutral rounded-md transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }
)

AboutSedona.displayName = "AboutSedona"

export { AboutSedona }
