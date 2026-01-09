"use client"

import { ReactNode } from "react"
import { Icon } from "@/components/ui/icon"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DosDontsItem {
  text: string
  detail?: string
}

interface DosDontsProps {
  dos: (string | DosDontsItem)[]
  donts: (string | DosDontsItem)[]
  dosTitle?: string
  dontsTitle?: string
  className?: string
  variant?: "default" | "compact" | "visual"
  dosVisual?: ReactNode
  dontsVisual?: ReactNode
}

/**
 * DosDonts - Reusable component for displaying brand guidelines
 *
 * @example Basic usage
 * ```tsx
 * <DosDonts
 *   dos={["Use official logos", "Maintain clear space"]}
 *   donts={["Stretch the logo", "Change colors"]}
 * />
 * ```
 *
 * @example With details
 * ```tsx
 * <DosDonts
 *   dos={[
 *     { text: "Use official logos", detail: "Download from press kit" },
 *   ]}
 *   donts={[
 *     { text: "Stretch the logo", detail: "Maintain aspect ratio" },
 *   ]}
 * />
 * ```
 *
 * @example With visual examples
 * ```tsx
 * <DosDonts
 *   variant="visual"
 *   dosVisual={<img src="/correct.png" />}
 *   dontsVisual={<img src="/incorrect.png" />}
 *   dos={["Clear space maintained"]}
 *   donts={["Logo too close to edge"]}
 * />
 * ```
 */
export function DosDonts({
  dos,
  donts,
  dosTitle = "Do",
  dontsTitle = "Don't",
  className,
  variant = "default",
  dosVisual,
  dontsVisual,
}: DosDontsProps) {
  const normalizeItem = (item: string | DosDontsItem): DosDontsItem => {
    if (typeof item === "string") {
      return { text: item }
    }
    return item
  }

  if (variant === "compact") {
    return (
      <div className={cn("grid gap-4 md:grid-cols-2", className)}>
        {/* Do Column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
              <Icon icon="check" className="h-3 w-3 text-green-400" />
            </div>
            <span className="text-caption-m font-medium text-green-400">{dosTitle}</span>
          </div>
          <ul className="space-y-1.5 pl-7">
            {dos.map((item, i) => {
              const normalized = normalizeItem(item)
              return (
                <li key={i} className="text-caption-l text-zeus-text-secondary">
                  {normalized.text}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Don't Column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20">
              <Icon icon="xmark" className="h-3 w-3 text-red-400" />
            </div>
            <span className="text-caption-m font-medium text-red-400">{dontsTitle}</span>
          </div>
          <ul className="space-y-1.5 pl-7">
            {donts.map((item, i) => {
              const normalized = normalizeItem(item)
              return (
                <li key={i} className="text-caption-l text-zeus-text-secondary">
                  {normalized.text}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  if (variant === "visual") {
    return (
      <div className={cn("grid gap-6 md:grid-cols-2", className)}>
        {/* Do Card */}
        <Card className="overflow-hidden bg-zeus-surface-elevated">
          {dosVisual && (
            <div className="border-b border-zeus-border-default bg-zeus-surface-neutral p-4">
              {dosVisual}
            </div>
          )}
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                <Icon icon="check" className="h-3.5 w-3.5 text-green-400" />
              </div>
              <span className="font-monument text-body-m font-semibold text-zeus-text-primary">
                {dosTitle}
              </span>
            </div>
            <ul className="space-y-2">
              {dos.map((item, i) => {
                const normalized = normalizeItem(item)
                return (
                  <li key={i} className="flex items-start gap-2">
                    <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                    <div>
                      <span className="text-caption-l text-zeus-text-secondary">
                        {normalized.text}
                      </span>
                      {normalized.detail && (
                        <p className="mt-0.5 text-caption-m text-zeus-text-tertiary">
                          {normalized.detail}
                        </p>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </Card>

        {/* Don't Card */}
        <Card className="overflow-hidden bg-zeus-surface-elevated">
          {dontsVisual && (
            <div className="border-b border-zeus-border-default bg-zeus-surface-neutral p-4">
              {dontsVisual}
            </div>
          )}
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20">
                <Icon icon="xmark" className="h-3.5 w-3.5 text-red-400" />
              </div>
              <span className="font-monument text-body-m font-semibold text-zeus-text-primary">
                {dontsTitle}
              </span>
            </div>
            <ul className="space-y-2">
              {donts.map((item, i) => {
                const normalized = normalizeItem(item)
                return (
                  <li key={i} className="flex items-start gap-2">
                    <Icon icon="xmark" className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    <div>
                      <span className="text-caption-l text-zeus-text-secondary">
                        {normalized.text}
                      </span>
                      {normalized.detail && (
                        <p className="mt-0.5 text-caption-m text-zeus-text-tertiary">
                          {normalized.detail}
                        </p>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </Card>
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {/* Do Card */}
      <Card className="bg-zeus-surface-elevated p-6">
        <div className="mb-4 flex items-center gap-2">
          <Icon icon="check" className="h-5 w-5 text-green-400" />
          <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
            {dosTitle}
          </h3>
        </div>
        <ul className="space-y-3">
          {dos.map((item, i) => {
            const normalized = normalizeItem(item)
            return (
              <li key={i} className="flex items-start gap-3">
                <Icon icon="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                <div>
                  <span className="text-caption-l text-zeus-text-secondary">{normalized.text}</span>
                  {normalized.detail && (
                    <p className="mt-1 text-caption-m text-zeus-text-tertiary">
                      {normalized.detail}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </Card>

      {/* Don't Card */}
      <Card className="bg-zeus-surface-elevated p-6">
        <div className="mb-4 flex items-center gap-2">
          <Icon icon="xmark" className="h-5 w-5 text-red-400" />
          <h3 className="font-monument text-body-m font-semibold text-zeus-text-primary">
            {dontsTitle}
          </h3>
        </div>
        <ul className="space-y-3">
          {donts.map((item, i) => {
            const normalized = normalizeItem(item)
            return (
              <li key={i} className="flex items-start gap-3">
                <Icon icon="xmark" className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                <div>
                  <span className="text-caption-l text-zeus-text-secondary">{normalized.text}</span>
                  {normalized.detail && (
                    <p className="mt-1 text-caption-m text-zeus-text-tertiary">
                      {normalized.detail}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
