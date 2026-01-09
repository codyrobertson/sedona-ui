"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ColorSwatch } from "@/components/brand/showcase"
import { CodeBlock } from "@/components/brand/interactive"
import { ContrastChecker } from "@/components/brand/tools"

const sedonaColors = [
  { name: "sedona-50", hex: "#fef6ed", usage: "Lightest tint, subtle backgrounds" },
  { name: "sedona-100", hex: "#fde8d6", usage: "Light backgrounds" },
  { name: "sedona-200", hex: "#fbcdab", usage: "Hover states (light mode)" },
  { name: "sedona-300", hex: "#f8aa76", usage: "Decorative elements" },
  { name: "sedona-400", hex: "#f4803e", usage: "Secondary accent" },
  { name: "sedona-500", hex: "#D56B12", usage: "PRIMARY - buttons, links, key UI" },
  { name: "sedona-600", hex: "#c26012", usage: "Hover states (dark mode)" },
  { name: "sedona-700", hex: "#a24d10", usage: "Active/pressed states" },
  { name: "sedona-800", hex: "#833f0e", usage: "Dark accents" },
  { name: "sedona-900", hex: "#6b340c", usage: "Darkest shade" },
]

const zeusSurfaces = [
  { name: "surface-default", hex: "#141310", usage: "Page background" },
  { name: "surface-elevated", hex: "#1e1c17", usage: "Cards, modals" },
  { name: "surface-neutral", hex: "#2e2b24", usage: "Secondary surfaces" },
  { name: "surface-neutral-subtle", hex: "#3e3a31", usage: "Hover states" },
]

const zeusText = [
  { name: "text-primary", hex: "#ffffff", usage: "Primary content" },
  { name: "text-secondary", hex: "#a6a396", usage: "Secondary content" },
  { name: "text-tertiary", hex: "#716d63", usage: "Muted content" },
]

const statusColors = [
  { name: "success", hex: "#22c55e", usage: "Success states, positive" },
  { name: "warning", hex: "#f59e0b", usage: "Warning states, caution" },
  { name: "destructive", hex: "#ef4444", usage: "Error states, destructive" },
  { name: "info", hex: "#3b82f6", usage: "Info states, neutral" },
]

const cssVars = `/* CSS Custom Properties */
:root {
  --sedona-50: #fef6ed;
  --sedona-100: #fde8d6;
  --sedona-200: #fbcdab;
  --sedona-300: #f8aa76;
  --sedona-400: #f4803e;
  --sedona-500: #D56B12;  /* PRIMARY */
  --sedona-600: #c26012;
  --sedona-700: #a24d10;
  --sedona-800: #833f0e;
  --sedona-900: #6b340c;
}`

const sassVars = `/* Sass Variables */
$sedona-primary: #D56B12;
$sedona-50: #fef6ed;
$sedona-100: #fde8d6;
$sedona-200: #fbcdab;
$sedona-300: #f8aa76;
$sedona-400: #f4803e;
$sedona-500: #D56B12;
$sedona-600: #c26012;
$sedona-700: #a24d10;
$sedona-800: #833f0e;
$sedona-900: #6b340c;`

const tailwindUsage = `// Tailwind Classes
<div className="bg-sedona-500">Primary bg</div>
<div className="text-sedona-500">Primary text</div>
<div className="border-sedona-500">Primary border</div>
<div className="hover:bg-sedona-600">Hover state</div>`

export default function ColorsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <section>
        <Badge variant="outline" className="mb-4">
          Design System
        </Badge>
        <h1 className="font-monument text-display-s font-bold text-zeus-text-primary">
          Color System
        </h1>
        <p className="mt-4 max-w-2xl text-body-s text-zeus-text-secondary">
          Our color palette combines the warmth of Sedona Orange with the sophisticated dark theme
          of the Zeus design system.
        </p>
      </section>

      {/* Primary Color Hero */}
      <section>
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex h-40 flex-1 items-center justify-center bg-sedona-500 md:h-auto">
              <span className="font-monument text-display-m font-bold text-white">#D56B12</span>
            </div>
            <div className="flex-1 p-6">
              <h2 className="font-monument text-heading-s font-semibold text-zeus-text-primary">
                Sedona Orange
              </h2>
              <p className="mt-2 text-body-s text-zeus-text-secondary">
                Our signature color represents energy, innovation, and the warmth of the Arizona
                desert that inspired our name. Use it for primary buttons, links, and key UI
                elements.
              </p>
              <div className="mt-4 flex gap-2">
                <Badge>Primary Brand</Badge>
                <Badge variant="outline">sedona-500</Badge>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Sedona Orange Scale */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Sedona Orange Scale
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {sedonaColors.map((color) => (
            <ColorSwatch
              key={color.name}
              name={color.name}
              hex={color.hex}
              tailwindClass={`bg-${color.name}`}
              cssVar={`--${color.name}`}
              description={color.usage}
              size="lg"
            />
          ))}
        </div>
      </section>

      {/* Zeus Surfaces */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Zeus Dark Theme - Surfaces
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {zeusSurfaces.map((color) => (
            <ColorSwatch
              key={color.name}
              name={color.name}
              hex={color.hex}
              tailwindClass={`bg-zeus-${color.name}`}
              cssVar={`--zeus-${color.name}`}
              description={color.usage}
              size="lg"
            />
          ))}
        </div>
      </section>

      {/* Zeus Text */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Zeus Dark Theme - Text
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {zeusText.map((color) => (
            <ColorSwatch
              key={color.name}
              name={color.name}
              hex={color.hex}
              tailwindClass={`text-zeus-${color.name}`}
              cssVar={`--zeus-${color.name}`}
              description={color.usage}
              size="lg"
            />
          ))}
        </div>
      </section>

      {/* Status Colors */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Status Colors
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {statusColors.map((color) => (
            <ColorSwatch
              key={color.name}
              name={color.name}
              hex={color.hex}
              tailwindClass={`bg-${color.name}`}
              description={color.usage}
              size="lg"
            />
          ))}
        </div>
      </section>

      {/* Code Snippets */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Copy-Paste Code
        </h2>
        <div className="space-y-4">
          <CodeBlock code={cssVars} language="css" title="CSS Variables" />
          <CodeBlock code={sassVars} language="scss" title="Sass Variables" />
          <CodeBlock code={tailwindUsage} language="tsx" title="Tailwind Usage" />
        </div>
      </section>

      {/* Contrast Checker */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Accessibility
        </h2>
        <ContrastChecker />
      </section>
    </div>
  )
}
