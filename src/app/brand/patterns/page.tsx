"use client"

import { useState } from "react"
import { Metadata } from "next"
import { Icon } from "@/components/ui/icon"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/brand/interactive"

const gradients = [
  {
    name: "Sedona Sunset",
    description: "Primary brand gradient for hero sections and CTAs",
    css: "linear-gradient(135deg, #D56B12 0%, #FF8C42 50%, #FFA366 100%)",
    tailwind: "bg-gradient-to-br from-sedona-500 via-sedona-400 to-sedona-300",
  },
  {
    name: "Warm Glow",
    description: "Subtle warmth for card hovers and accents",
    css: "linear-gradient(180deg, rgba(213, 107, 18, 0.1) 0%, rgba(213, 107, 18, 0) 100%)",
    tailwind: "bg-gradient-to-b from-sedona-500/10 to-transparent",
  },
  {
    name: "Dark Surface",
    description: "Elevated surface gradient for depth",
    css: "linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%)",
    tailwind: "bg-gradient-to-b from-zeus-surface-elevated to-zeus-surface-default",
  },
  {
    name: "Spark Radial",
    description: "Radial glow for focal points and highlights",
    css: "radial-gradient(circle at center, rgba(213, 107, 18, 0.3) 0%, transparent 70%)",
    tailwind: "bg-[radial-gradient(circle_at_center,rgba(213,107,18,0.3)_0%,transparent_70%)]",
  },
]

const glowEffects = [
  {
    name: "Primary Glow",
    description: "Button and interactive element glow",
    css: "box-shadow: 0 0 20px rgba(213, 107, 18, 0.4), 0 0 40px rgba(213, 107, 18, 0.2);",
    tailwind: "shadow-[0_0_20px_rgba(213,107,18,0.4),0_0_40px_rgba(213,107,18,0.2)]",
  },
  {
    name: "Subtle Glow",
    description: "Cards and containers on hover",
    css: "box-shadow: 0 0 30px rgba(213, 107, 18, 0.15);",
    tailwind: "shadow-[0_0_30px_rgba(213,107,18,0.15)]",
  },
  {
    name: "Text Glow",
    description: "Emphasized text and headings",
    css: "text-shadow: 0 0 20px rgba(213, 107, 18, 0.5);",
    tailwind: "[text-shadow:0_0_20px_rgba(213,107,18,0.5)]",
  },
  {
    name: "Border Glow",
    description: "Active/focused state borders",
    css: "box-shadow: 0 0 0 1px rgba(213, 107, 18, 0.5), 0 0 15px rgba(213, 107, 18, 0.3);",
    tailwind: "shadow-[0_0_0_1px_rgba(213,107,18,0.5),0_0_15px_rgba(213,107,18,0.3)]",
  },
]

const paperTextureCSS = `/* Paper Texture Overlay */
.paper-texture {
  position: relative;
}

.paper-texture::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/textures/paper-grain.png');
  background-repeat: repeat;
  opacity: 0.03;
  pointer-events: none;
  mix-blend-mode: overlay;
}`

const noiseOverlayCSS = `/* Noise Grain Overlay */
.noise-overlay {
  position: relative;
}

.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.02;
  pointer-events: none;
  mix-blend-mode: overlay;
}`

const animationCSS = `/* Sedona Pulse Animation */
@keyframes sedona-pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(213, 107, 18, 0.4);
  }
  50% {
    box-shadow: 0 0 40px rgba(213, 107, 18, 0.6);
  }
}

.animate-sedona-pulse {
  animation: sedona-pulse 2s ease-in-out infinite;
}

/* Glow Breathe Animation */
@keyframes glow-breathe {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.animate-glow-breathe {
  animation: glow-breathe 3s ease-in-out infinite;
}`

export default function PatternsPage() {
  const [copiedGradient, setCopiedGradient] = useState<string | null>(null)
  const [copiedGlow, setCopiedGlow] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: "gradient" | "glow", name: string) => {
    navigator.clipboard.writeText(text)
    if (type === "gradient") {
      setCopiedGradient(name)
      setTimeout(() => setCopiedGradient(null), 2000)
    } else {
      setCopiedGlow(name)
      setTimeout(() => setCopiedGlow(null), 2000)
    }
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <section>
        <Badge variant="outline" className="mb-4">
          Visual
        </Badge>
        <h1 className="font-monument text-display-s font-bold text-zeus-text-primary">
          Visual Patterns
        </h1>
        <p className="mt-4 max-w-2xl text-body-s text-zeus-text-secondary">
          Gradients, textures, and effects that create the warm, premium aesthetic of Sedona.
          Copy CSS or Tailwind classes directly.
        </p>
      </section>

      {/* Gradients */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Gradients
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {gradients.map((gradient) => (
            <Card key={gradient.name} className="overflow-hidden bg-zeus-surface-elevated">
              {/* Preview */}
              <div
                className="h-32 w-full"
                style={{ background: gradient.css }}
              />
              {/* Info */}
              <div className="p-4">
                <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
                  {gradient.name}
                </h3>
                <p className="mt-1 text-caption-l text-zeus-text-secondary">
                  {gradient.description}
                </p>
                {/* Copy Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => copyToClipboard(gradient.css, "gradient", `${gradient.name}-css`)}
                    className="flex items-center gap-2 rounded-md bg-zeus-surface-neutral px-3 py-1.5 text-caption-m text-zeus-text-secondary transition-colors hover:bg-zeus-surface-default hover:text-zeus-text-primary"
                  >
                    <Icon
                      icon={copiedGradient === `${gradient.name}-css` ? "check" : "copy"}
                      className="h-3.5 w-3.5"
                    />
                    CSS
                  </button>
                  <button
                    onClick={() => copyToClipboard(gradient.tailwind, "gradient", `${gradient.name}-tw`)}
                    className="flex items-center gap-2 rounded-md bg-zeus-surface-neutral px-3 py-1.5 text-caption-m text-zeus-text-secondary transition-colors hover:bg-zeus-surface-default hover:text-zeus-text-primary"
                  >
                    <Icon
                      icon={copiedGradient === `${gradient.name}-tw` ? "check" : "copy"}
                      className="h-3.5 w-3.5"
                    />
                    Tailwind
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Glow Effects */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Glow Effects
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {glowEffects.map((effect) => (
            <Card key={effect.name} className="bg-zeus-surface-elevated p-6">
              {/* Preview */}
              <div className="mb-4 flex justify-center">
                {effect.name === "Text Glow" ? (
                  <span
                    className="font-monument text-heading-m font-bold text-sedona-500"
                    style={{ textShadow: "0 0 20px rgba(213, 107, 18, 0.5)" }}
                  >
                    SEDONA
                  </span>
                ) : (
                  <div
                    className="h-16 w-16 rounded-lg bg-sedona-500"
                    style={{
                      boxShadow: effect.css.replace("box-shadow: ", "").replace(";", ""),
                    }}
                  />
                )}
              </div>
              {/* Info */}
              <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
                {effect.name}
              </h3>
              <p className="mt-1 text-caption-l text-zeus-text-secondary">
                {effect.description}
              </p>
              {/* Copy Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => copyToClipboard(effect.css, "glow", `${effect.name}-css`)}
                  className="flex items-center gap-2 rounded-md bg-zeus-surface-neutral px-3 py-1.5 text-caption-m text-zeus-text-secondary transition-colors hover:bg-zeus-surface-default hover:text-zeus-text-primary"
                >
                  <Icon
                    icon={copiedGlow === `${effect.name}-css` ? "check" : "copy"}
                    className="h-3.5 w-3.5"
                  />
                  CSS
                </button>
                <button
                  onClick={() => copyToClipboard(effect.tailwind, "glow", `${effect.name}-tw`)}
                  className="flex items-center gap-2 rounded-md bg-zeus-surface-neutral px-3 py-1.5 text-caption-m text-zeus-text-secondary transition-colors hover:bg-zeus-surface-default hover:text-zeus-text-primary"
                >
                  <Icon
                    icon={copiedGlow === `${effect.name}-tw` ? "check" : "copy"}
                    className="h-3.5 w-3.5"
                  />
                  Tailwind
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Paper Texture */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Paper Texture
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden bg-zeus-surface-elevated">
            <div className="relative h-48 bg-gradient-to-br from-sedona-500 via-sedona-400 to-sedona-300">
              {/* Simulated paper texture */}
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-monument text-heading-l font-bold text-white">
                  With Texture
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-caption-l text-zeus-text-secondary">
                Subtle paper grain adds warmth and depth to solid colors and gradients.
              </p>
            </div>
          </Card>
          <CodeBlock code={paperTextureCSS} language="css" title="Paper Texture CSS" />
        </div>
      </section>

      {/* Noise Overlay */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Noise Overlay
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden bg-zeus-surface-elevated">
            <div className="relative h-48 bg-zeus-surface-neutral">
              {/* Simulated noise */}
              <div
                className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-monument text-heading-l font-bold text-zeus-text-primary">
                  With Noise
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-caption-l text-zeus-text-secondary">
                Film grain effect for dark surfaces, adding subtle visual interest.
              </p>
            </div>
          </Card>
          <CodeBlock code={noiseOverlayCSS} language="css" title="Noise Overlay CSS" />
        </div>
      </section>

      {/* Animations */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Animations
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-zeus-surface-elevated p-6">
            <div className="mb-6 flex justify-center gap-8">
              {/* Pulsing glow */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 rounded-lg bg-sedona-500"
                  style={{
                    animation: "sedona-pulse 2s ease-in-out infinite",
                  }}
                />
                <span className="text-caption-m text-zeus-text-tertiary">Pulse</span>
              </div>
              {/* Breathing glow */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-lg bg-sedona-500" />
                  <div
                    className="absolute inset-0 rounded-lg bg-sedona-500/50 blur-xl"
                    style={{
                      animation: "glow-breathe 3s ease-in-out infinite",
                    }}
                  />
                </div>
                <span className="text-caption-m text-zeus-text-tertiary">Breathe</span>
              </div>
            </div>
            <p className="text-center text-caption-l text-zeus-text-secondary">
              Use animations sparingly to draw attention to key interactive elements.
            </p>
          </Card>
          <CodeBlock code={animationCSS} language="css" title="Animation CSS" />
        </div>
        <style jsx global>{`
          @keyframes sedona-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(213, 107, 18, 0.4); }
            50% { box-shadow: 0 0 40px rgba(213, 107, 18, 0.6); }
          }
          @keyframes glow-breathe {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
        `}</style>
      </section>

      {/* Usage Guidelines */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Usage Guidelines
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-zeus-surface-elevated p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon icon="check" className="h-5 w-5 text-green-400" />
              <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
                Do
              </h3>
            </div>
            <ul className="space-y-2 text-caption-l text-zeus-text-secondary">
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Use gradients for hero sections and primary CTAs
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Apply subtle glow on hover states
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Use paper texture at very low opacity (2-5%)
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                Animate sparingly for emphasis
              </li>
            </ul>
          </Card>

          <Card className="bg-zeus-surface-elevated p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon icon="xmark" className="h-5 w-5 text-red-400" />
              <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
                Don&apos;t
              </h3>
            </div>
            <ul className="space-y-2 text-caption-l text-zeus-text-secondary">
              <li className="flex items-start gap-2">
                <Icon icon="xmark" className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                Layer multiple gradients on one element
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="xmark" className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                Use glow on every interactive element
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="xmark" className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                Make textures visible (should be barely perceptible)
              </li>
              <li className="flex items-start gap-2">
                <Icon icon="xmark" className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                Animate elements that don&apos;t need attention
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  )
}
