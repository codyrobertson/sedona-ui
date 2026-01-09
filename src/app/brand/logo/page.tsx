import { Metadata } from "next"
import Image from "next/image"
import { Icon } from "@/components/ui/icon"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DownloadButton } from "@/components/brand/download"

export const metadata: Metadata = {
  title: "Logo & Identity",
  description: "Sedona logo guidelines, variants, and downloadable assets.",
}

const logoVariants = [
  {
    name: "Primary",
    description: "Orange background with white icon - PREFERRED",
    bg: "bg-sedona-500",
    icon: "text-white",
    border: false,
  },
  {
    name: "Inverted",
    description: "White background with orange icon",
    bg: "bg-white",
    icon: "text-sedona-500",
    border: true,
  },
  {
    name: "Mono White",
    description: "White icon on dark surfaces",
    bg: "bg-zeus-surface-default",
    icon: "text-white",
    border: true,
  },
  {
    name: "Mono Dark",
    description: "Dark icon on light surfaces",
    bg: "bg-white",
    icon: "text-zeus-surface-default",
    border: true,
  },
]

const logoSizes = [
  { size: "16×16", useCase: "Favicon (simplified)" },
  { size: "32×32", useCase: "Standard favicon" },
  { size: "64×64", useCase: "Small UI elements" },
  { size: "128×128", useCase: "Medium displays" },
  { size: "192×192", useCase: "App icons, PWA" },
  { size: "512×512", useCase: "Large displays" },
]

const logoDonts = [
  "Rotate the logo",
  "Stretch or distort proportions",
  "Add effects (shadows, glows, gradients)",
  "Place on busy backgrounds without contrast",
  "Change colors outside approved variants",
  "Recreate or modify the artwork",
]

export default function LogoPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <section>
        <Badge variant="outline" className="mb-4">
          Identity
        </Badge>
        <h1 className="font-monument text-display-s font-bold text-zeus-text-primary">
          Logo & Identity
        </h1>
        <p className="mt-4 max-w-2xl text-body-s text-zeus-text-secondary">
          The Sedona logo features a stylized infinity loop motif with a central spark,
          representing continuous AI evolution and the spark of intelligence.
        </p>
      </section>

      {/* Logo Preview */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Primary Logo
        </h2>
        <Card className="flex items-center justify-center bg-sedona-500 p-12">
          <div className="relative h-32 w-32">
            <Image
              src="/icon.svg"
              alt="Sedona Logo"
              fill
              className="object-contain"
            />
          </div>
        </Card>
        <p className="mt-4 text-caption-l text-zeus-text-tertiary">
          Download: /public/icon.svg (192×192)
        </p>
      </section>

      {/* Logo Variants */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Logo Variants
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {logoVariants.map((variant) => (
            <Card
              key={variant.name}
              className={`flex flex-col items-center p-6 ${
                variant.border ? "border border-zeus-border-default" : ""
              }`}
            >
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-lg ${variant.bg} ${
                  variant.border ? "border border-zeus-border-default" : ""
                }`}
              >
                <div className="relative h-16 w-16">
                  <Image
                    src="/icon.svg"
                    alt={`${variant.name} variant`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="mt-4 font-medium text-zeus-text-primary">{variant.name}</h3>
              <p className="mt-1 text-center text-caption-m text-zeus-text-tertiary">
                {variant.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Clear Space */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Clear Space
        </h2>
        <Card className="bg-zeus-surface-elevated p-6">
          <p className="mb-4 text-body-s text-zeus-text-secondary">
            Maintain minimum clear space equal to 25% of logo height on all sides.
          </p>
          <div className="flex justify-center">
            <div className="relative border-2 border-dashed border-sedona-500/50 p-8">
              <div className="relative h-20 w-20 bg-sedona-500 p-2">
                <Image src="/icon.svg" alt="Logo with clear space" fill className="object-contain" />
              </div>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-caption-s text-sedona-500">
                25%
              </span>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-caption-s text-sedona-500">
                25%
              </span>
              <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-caption-s text-sedona-500">
                25%
              </span>
              <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-caption-s text-sedona-500">
                25%
              </span>
            </div>
          </div>
        </Card>
      </section>

      {/* Size Guidelines */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Size Guidelines
        </h2>
        <Card className="overflow-hidden bg-zeus-surface-elevated">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zeus-border-default bg-zeus-surface-neutral">
                <th className="px-4 py-3 text-left text-caption-m font-medium text-zeus-text-secondary">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-caption-m font-medium text-zeus-text-secondary">
                  Use Case
                </th>
              </tr>
            </thead>
            <tbody>
              {logoSizes.map((item, i) => (
                <tr
                  key={item.size}
                  className={i !== logoSizes.length - 1 ? "border-b border-zeus-border-default" : ""}
                >
                  <td className="px-4 py-3 font-mono text-caption-l text-zeus-text-primary">
                    {item.size}
                  </td>
                  <td className="px-4 py-3 text-caption-l text-zeus-text-secondary">
                    {item.useCase}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* Logo Don'ts */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Logo Don&apos;ts
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {logoDonts.map((item) => (
            <Card key={item} className="flex items-start gap-3 bg-zeus-surface-elevated p-4">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20">
                <Icon icon="xmark" className="h-3 w-3 text-red-400" />
              </div>
              <p className="text-caption-l text-zeus-text-secondary">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Logo Assets */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          Logo Assets
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-zeus-surface-elevated p-4">
            <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-zeus-surface-neutral">
              <Image src="/brand/logos/sedona-logomark.svg" alt="Logomark" width={48} height={48} className="text-zeus-text-primary" />
            </div>
            <h3 className="text-caption-l font-medium text-zeus-text-primary">Logomark</h3>
            <p className="text-caption-m text-zeus-text-tertiary">Icon only, inherits color</p>
            <DownloadButton href="/brand/logos/sedona-logomark.svg" filename="sedona-logomark.svg" label="Download" fileType="svg" className="mt-3 w-full" />
          </Card>

          <Card className="bg-zeus-surface-elevated p-4">
            <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-sedona-500">
              <Image src="/brand/logos/sedona-logomark-white.svg" alt="Logomark White" width={48} height={48} />
            </div>
            <h3 className="text-caption-l font-medium text-zeus-text-primary">Logomark White</h3>
            <p className="text-caption-m text-zeus-text-tertiary">For dark/colored backgrounds</p>
            <DownloadButton href="/brand/logos/sedona-logomark-white.svg" filename="sedona-logomark-white.svg" label="Download" fileType="svg" className="mt-3 w-full" />
          </Card>

          <Card className="bg-zeus-surface-elevated p-4">
            <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-white">
              <Image src="/brand/logos/sedona-logomark-orange.svg" alt="Logomark Orange" width={48} height={48} />
            </div>
            <h3 className="text-caption-l font-medium text-zeus-text-primary">Logomark Orange</h3>
            <p className="text-caption-m text-zeus-text-tertiary">For light backgrounds</p>
            <DownloadButton href="/brand/logos/sedona-logomark-orange.svg" filename="sedona-logomark-orange.svg" label="Download" fileType="svg" className="mt-3 w-full" />
          </Card>

          <Card className="bg-zeus-surface-elevated p-4">
            <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-zeus-surface-neutral">
              <Image src="/brand/logos/sedona-wordmark.svg" alt="Wordmark" width={120} height={24} className="text-zeus-text-primary" />
            </div>
            <h3 className="text-caption-l font-medium text-zeus-text-primary">Wordmark</h3>
            <p className="text-caption-m text-zeus-text-tertiary">Text only, inherits color</p>
            <DownloadButton href="/brand/logos/sedona-wordmark.svg" filename="sedona-wordmark.svg" label="Download" fileType="svg" className="mt-3 w-full" />
          </Card>

          <Card className="bg-zeus-surface-elevated p-4 sm:col-span-2">
            <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-zeus-surface-neutral">
              <Image src="/brand/logos/sedona-logo-full.svg" alt="Full Logo" width={200} height={36} className="text-zeus-text-primary" />
            </div>
            <h3 className="text-caption-l font-medium text-zeus-text-primary">Full Logo</h3>
            <p className="text-caption-m text-zeus-text-tertiary">Logomark + wordmark horizontal</p>
            <DownloadButton href="/brand/logos/sedona-logo-full.svg" filename="sedona-logo-full.svg" label="Download" fileType="svg" className="mt-3 w-full" />
          </Card>
        </div>
      </section>

      {/* App Icons */}
      <section>
        <h2 className="mb-6 font-monument text-heading-m font-semibold text-zeus-text-primary">
          App Icons
        </h2>
        <div className="flex flex-wrap gap-4">
          <DownloadButton href="/icon.svg" filename="sedona-icon.svg" label="App Icon (192×192)" fileType="svg" />
          <DownloadButton href="/favicon.svg" filename="sedona-favicon.svg" label="Favicon (32×32)" fileType="svg" />
          <DownloadButton href="/apple-icon.svg" filename="sedona-apple-icon.svg" label="Apple Icon" fileType="svg" />
        </div>
      </section>
    </div>
  )
}
