import { describe, it, expect } from "vitest"
import { readFileSync } from "fs"
import { join } from "path"

const ROOT_DIR = process.cwd()

describe("Cross-Project Compatibility", () => {
  describe("Import Path Validation", () => {
    const components = [
      "counter.tsx",
      "token-avatar.tsx",
      "marquee.tsx",
      "data-table.tsx",
      "elimination-progress.tsx",
      "price-chart.tsx",
      "swap-widget.tsx",
    ]

    components.forEach((component) => {
      it(`${component} should use standard alias imports`, () => {
        const content = readFileSync(
          join(ROOT_DIR, "registry/new-york", component),
          "utf-8"
        )

        // Check for @/ alias imports
        const importMatches = content.match(/from ["']@\/[^"']+["']/g) || []

        importMatches.forEach((match) => {
          // Should use @/lib or @/components patterns
          expect(match).toMatch(/from ["']@\/(lib|components)\//)
        })

        // Should not have relative imports that go up multiple directories
        expect(content).not.toMatch(/from ["']\.\.\/\.\.\/\.\.\//)
      })
    })
  })

  describe("CSS Class Compatibility", () => {
    const components = [
      "counter.tsx",
      "token-avatar.tsx",
      "marquee.tsx",
      "data-table.tsx",
      "elimination-progress.tsx",
      "swap-widget.tsx",
    ]

    components.forEach((component) => {
      it(`${component} should use standard Tailwind classes`, () => {
        const content = readFileSync(
          join(ROOT_DIR, "registry/new-york", component),
          "utf-8"
        )

        // Check for cn() usage (should use shadcn's cn utility)
        if (content.includes("className=")) {
          expect(content).toContain("cn(")
          expect(content).toContain('from "@/lib/utils"')
        }

        // Should not use hardcoded hex colors in className
        expect(content).not.toMatch(/className=["'][^"']*#[0-9a-fA-F]{3,6}/)
      })
    })
  })

  describe("React Version Compatibility", () => {
    const components = [
      "counter.tsx",
      "token-avatar.tsx",
      "marquee.tsx",
      "data-table.tsx",
      "elimination-progress.tsx",
      "swap-widget.tsx",
    ]

    components.forEach((component) => {
      it(`${component} should be compatible with React 18+`, () => {
        const content = readFileSync(
          join(ROOT_DIR, "registry/new-york", component),
          "utf-8"
        )

        // Should use React.forwardRef for components that forward refs
        if (content.includes("ref,") || content.includes("ref}")) {
          expect(content).toMatch(/React\.forwardRef|forwardRef/)
        }

        // Should not use deprecated lifecycle methods
        expect(content).not.toMatch(
          /componentWillMount|componentWillReceiveProps|componentWillUpdate/
        )

        // Should use "use client" directive for client components
        if (
          content.includes("useState") ||
          content.includes("useEffect") ||
          content.includes("useRef")
        ) {
          expect(content.trim().startsWith('"use client"')).toBe(true)
        }
      })
    })
  })

  describe("External Dependency Compatibility", () => {
    it("motion dependency should be from 'motion' package (not framer-motion)", () => {
      const content = readFileSync(
        join(ROOT_DIR, "registry/new-york/counter.tsx"),
        "utf-8"
      )

      // Should import from "motion/react" (motion v12+) not "framer-motion"
      expect(content).toMatch(/from ["']motion\/react["']/)
      expect(content).not.toContain('from "framer-motion"')
    })

    it("lightweight-charts imports should be present in price-chart", () => {
      const content = readFileSync(
        join(ROOT_DIR, "registry/new-york/price-chart.tsx"),
        "utf-8"
      )

      // Should import from lightweight-charts (multiline import)
      expect(content).toContain('from "lightweight-charts"')
    })

    it("lucide-react imports should use named exports", () => {
      const content = readFileSync(
        join(ROOT_DIR, "registry/new-york/swap-widget.tsx"),
        "utf-8"
      )

      // Should use named imports
      expect(content).toMatch(
        /import \{[^}]+\} from ["']lucide-react["']/
      )
    })
  })

  describe("Type Export Validation", () => {
    it("trading-utils should export types correctly", () => {
      const content = readFileSync(
        join(ROOT_DIR, "registry/new-york/trading-utils.ts"),
        "utf-8"
      )

      // Should export types
      expect(content).toMatch(/export (type|interface)/)
      expect(content).toContain("ChartTimeframe")
      expect(content).toContain("PricePoint")
      expect(content).toContain("CandlestickPoint")
    })

    it("swap-utils should export types correctly", () => {
      const content = readFileSync(
        join(ROOT_DIR, "registry/new-york/swap-utils.ts"),
        "utf-8"
      )

      // Should export types
      expect(content).toMatch(/export (type|interface)/)
      expect(content).toContain("ValidationResult")
      expect(content).toContain("Token")
    })

    it("UI components should export their prop types", () => {
      const swapWidget = readFileSync(
        join(ROOT_DIR, "registry/new-york/swap-widget.tsx"),
        "utf-8"
      )
      expect(swapWidget).toContain("export interface")
      expect(swapWidget).toContain("SwapWidgetProps")

      const eliminationProgress = readFileSync(
        join(ROOT_DIR, "registry/new-york/elimination-progress.tsx"),
        "utf-8"
      )
      expect(eliminationProgress).toContain("export interface")
      expect(eliminationProgress).toContain("EliminationProgressProps")
    })
  })

  describe("Consistent Export Patterns", () => {
    const uiComponents = [
      { file: "counter.tsx", export: "Counter" },
      { file: "token-avatar.tsx", export: "TokenAvatar" },
      { file: "marquee.tsx", export: "Marquee" },
      { file: "data-table.tsx", export: "DataTable" },
      { file: "elimination-progress.tsx", export: "EliminationProgress" },
      { file: "price-chart.tsx", export: "PriceChart" },
      { file: "swap-widget.tsx", export: "SwapWidget" },
    ]

    uiComponents.forEach(({ file, export: exportName }) => {
      it(`${file} should export ${exportName}`, () => {
        const content = readFileSync(
          join(ROOT_DIR, "registry/new-york", file),
          "utf-8"
        )

        // Should have named export - check if export statement contains the name
        // Handle multiline exports by checking if file has export { and contains the name
        const hasExportBlock = content.includes("export {")
        const hasExportName = content.includes(exportName)

        // Component should be defined and exported
        expect(hasExportBlock && hasExportName).toBe(true)
      })
    })

    const libFiles = [
      { file: "trading-utils.ts", exports: ["parseMarketCap", "formatMarketCap", "formatPrice"] },
      { file: "swap-utils.ts", exports: ["formatNumber", "formatUSD", "sanitizeNumericInput"] },
      { file: "sedona-kit.ts", exports: ["DEMO_AGENTS", "DEMO_TOKENS", "generateCandlesticks"] },
    ]

    libFiles.forEach(({ file, exports: exportNames }) => {
      it(`${file} should export expected items`, () => {
        const content = readFileSync(
          join(ROOT_DIR, "registry/new-york", file),
          "utf-8"
        )

        exportNames.forEach((exp) => {
          // Can be export function, export const, or re-export
          const hasExport =
            content.includes(`export function ${exp}`) ||
            content.includes(`export const ${exp}`) ||
            content.includes(`export { ${exp}`) ||
            content.includes(`, ${exp},`) ||
            content.includes(`, ${exp} }`)
          expect(hasExport).toBe(true)
        })
      })
    })
  })
})
