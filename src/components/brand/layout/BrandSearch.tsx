"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

// Searchable content index
const searchIndex = [
  // Logo
  { title: "Primary Logo", section: "Logo", href: "/brand/logo", keywords: ["logomark", "icon", "identity", "branding"] },
  { title: "Logo Variants", section: "Logo", href: "/brand/logo", keywords: ["white", "orange", "mono", "inverted"] },
  { title: "Clear Space", section: "Logo", href: "/brand/logo", keywords: ["spacing", "margin", "padding", "guidelines"] },
  { title: "Logo Downloads", section: "Logo", href: "/brand/logo", keywords: ["svg", "png", "download", "assets"] },

  // Colors
  { title: "Sedona Orange", section: "Colors", href: "/brand/colors", keywords: ["primary", "brand", "#D56B12", "hex"] },
  { title: "Zeus Surfaces", section: "Colors", href: "/brand/colors", keywords: ["dark", "background", "elevated", "neutral"] },
  { title: "Text Colors", section: "Colors", href: "/brand/colors", keywords: ["primary", "secondary", "tertiary"] },
  { title: "Status Colors", section: "Colors", href: "/brand/colors", keywords: ["success", "warning", "error", "info"] },
  { title: "Contrast Checker", section: "Colors", href: "/brand/colors", keywords: ["accessibility", "wcag", "a11y"] },

  // Typography
  { title: "Monument Grotesk", section: "Typography", href: "/brand/typography", keywords: ["headline", "display", "font", "bold"] },
  { title: "Souvenir", section: "Typography", href: "/brand/typography", keywords: ["display", "special", "font"] },
  { title: "Geist Sans", section: "Typography", href: "/brand/typography", keywords: ["body", "ui", "font", "sans-serif"] },
  { title: "JetBrains Mono", section: "Typography", href: "/brand/typography", keywords: ["code", "monospace", "font"] },
  { title: "Type Scale", section: "Typography", href: "/brand/typography", keywords: ["sizes", "hierarchy", "display", "heading", "body", "caption"] },

  // Voice
  { title: "Brand Voice", section: "Voice & Tone", href: "/brand/voice", keywords: ["bold", "technical", "competitive", "trustworthy"] },
  { title: "Tone Variations", section: "Voice & Tone", href: "/brand/voice", keywords: ["marketing", "product", "support", "announcements"] },
  { title: "Terminology", section: "Voice & Tone", href: "/brand/voice", keywords: ["agent", "arena", "round", "compete"] },
  { title: "Writing Examples", section: "Voice & Tone", href: "/brand/voice", keywords: ["headlines", "cta", "copy"] },

  // Patterns
  { title: "Gradients", section: "Patterns", href: "/brand/patterns", keywords: ["sunset", "glow", "radial", "css"] },
  { title: "Glow Effects", section: "Patterns", href: "/brand/patterns", keywords: ["shadow", "box-shadow", "text-shadow"] },
  { title: "Paper Texture", section: "Patterns", href: "/brand/patterns", keywords: ["grain", "overlay", "texture"] },
  { title: "Animations", section: "Patterns", href: "/brand/patterns", keywords: ["pulse", "breathe", "keyframes"] },

  // Social
  { title: "Twitter Templates", section: "Social", href: "/brand/social", keywords: ["x", "tweet", "announcement", "post"] },
  { title: "Discord Templates", section: "Social", href: "/brand/social", keywords: ["server", "announcement", "leaderboard"] },
  { title: "Hashtags", section: "Social", href: "/brand/social", keywords: ["tags", "#sedona", "#sedonaarena"] },

  // Press Kit
  { title: "Press Kit Download", section: "Press Kit", href: "/brand/press-kit", keywords: ["zip", "download", "assets", "media"] },
  { title: "Boilerplate Text", section: "Press Kit", href: "/brand/press-kit", keywords: ["about", "description", "copy"] },
  { title: "Brand Facts", section: "Press Kit", href: "/brand/press-kit", keywords: ["company", "info", "founded"] },
  { title: "Contact", section: "Press Kit", href: "/brand/press-kit", keywords: ["email", "press", "partnerships"] },
]

interface BrandSearchProps {
  className?: string
}

export function BrandSearch({ className }: BrandSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const lowerQuery = query.toLowerCase()
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.section.toLowerCase().includes(lowerQuery) ||
        item.keywords.some((k) => k.toLowerCase().includes(lowerQuery))
    )
  }, [query])

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSelect = (href: string) => {
    router.push(href)
    setIsOpen(false)
    setQuery("")
  }

  // Group results by section
  const groupedResults = useMemo(() => {
    const groups: Record<string, typeof results> = {}
    results.forEach((item) => {
      if (!groups[item.section]) {
        groups[item.section] = []
      }
      groups[item.section].push(item)
    })
    return groups
  }, [results])

  return (
    <>
      {/* Search Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border border-zeus-border-default bg-zeus-surface-neutral px-3 py-2 text-left text-caption-l text-zeus-text-tertiary transition-colors hover:border-zeus-border-hover hover:bg-zeus-surface-default",
          className
        )}
      >
        <Icon icon="magnifying-glass" className="h-4 w-4" />
        <span className="flex-1">Search brand...</span>
        <kbd className="hidden rounded border border-zeus-border-default bg-zeus-surface-default px-1.5 py-0.5 text-caption-s font-medium text-zeus-text-quaternary sm:inline">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border border-zeus-border-default bg-zeus-surface-elevated shadow-2xl">
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-zeus-border-default px-4 py-3">
              <Icon icon="magnifying-glass" className="h-5 w-5 text-zeus-text-tertiary" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search colors, logos, typography..."
                className="flex-1 bg-transparent text-body-s text-zeus-text-primary outline-none placeholder:text-zeus-text-tertiary"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-zeus-text-tertiary hover:text-zeus-text-secondary"
                >
                  <Icon icon="xmark" className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-auto p-2">
              {query && results.length === 0 && (
                <div className="px-3 py-8 text-center">
                  <Icon icon="magnifying-glass" className="mx-auto mb-2 h-8 w-8 text-zeus-text-quaternary" />
                  <p className="text-caption-l text-zeus-text-tertiary">No results for "{query}"</p>
                </div>
              )}

              {Object.entries(groupedResults).map(([section, items]) => (
                <div key={section} className="mb-2">
                  <div className="px-3 py-1.5 text-caption-s font-medium text-zeus-text-tertiary">
                    {section}
                  </div>
                  {items.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => handleSelect(item.href)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-zeus-surface-neutral"
                    >
                      <Icon icon="arrow-right" className="h-3 w-3 text-zeus-text-quaternary" />
                      <span className="text-caption-l text-zeus-text-primary">{item.title}</span>
                    </button>
                  ))}
                </div>
              ))}

              {!query && (
                <div className="px-3 py-4 text-center">
                  <p className="text-caption-l text-zeus-text-tertiary">
                    Start typing to search brand guidelines
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-zeus-border-default px-4 py-2 text-caption-s text-zeus-text-quaternary">
              <div className="flex items-center gap-2">
                <kbd className="rounded border border-zeus-border-default bg-zeus-surface-neutral px-1">↵</kbd>
                <span>to select</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="rounded border border-zeus-border-default bg-zeus-surface-neutral px-1">esc</kbd>
                <span>to close</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
