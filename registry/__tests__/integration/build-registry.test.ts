import { describe, it, expect, beforeAll } from "vitest"
import { execSync } from "child_process"
import { existsSync, statSync, readFileSync } from "fs"
import { join } from "path"

const ROOT_DIR = process.cwd()
const OUTPUT_DIR = join(ROOT_DIR, "public/r")

describe("Build Registry Script", () => {
  describe("Script Execution", () => {
    it("should execute without errors", () => {
      const result = () =>
        execSync("bun run scripts/build-registry.ts", {
          encoding: "utf-8",
          cwd: ROOT_DIR,
        })
      expect(result).not.toThrow()
    })

    it("should report correct number of components", () => {
      const output = execSync("bun run scripts/build-registry.ts", {
        encoding: "utf-8",
        cwd: ROOT_DIR,
      })
      expect(output).toContain("10 components")
    })
  })

  describe("Output Validation", () => {
    beforeAll(() => {
      execSync("bun run scripts/build-registry.ts", { cwd: ROOT_DIR })
    })

    it("should create output directory", () => {
      expect(existsSync(OUTPUT_DIR)).toBe(true)
    })

    it("should create index.json", () => {
      expect(existsSync(join(OUTPUT_DIR, "index.json"))).toBe(true)
    })

    it("should create individual component files", () => {
      const expectedFiles = [
        "trading-utils.json",
        "swap-utils.json",
        "counter.json",
        "token-avatar.json",
        "marquee.json",
        "data-table.json",
        "elimination-progress.json",
        "price-chart.json",
        "swap-widget.json",
        "sedona-kit.json",
      ]

      expectedFiles.forEach((file) => {
        expect(existsSync(join(OUTPUT_DIR, file))).toBe(true)
      })
    })

    it("should include file content in component JSON", () => {
      const counterJson = JSON.parse(
        readFileSync(join(OUTPUT_DIR, "counter.json"), "utf-8")
      )

      expect(counterJson.files[0].content).toBeDefined()
      expect(counterJson.files[0].content.length).toBeGreaterThan(0)
      expect(counterJson.files[0].content).toContain("use client")
    })

    it("should include correct schema in component JSON", () => {
      const components = [
        "counter",
        "token-avatar",
        "swap-widget",
        "trading-utils",
      ]

      components.forEach((name) => {
        const content = JSON.parse(
          readFileSync(join(OUTPUT_DIR, `${name}.json`), "utf-8")
        )
        expect(content.$schema).toBe("https://ui.shadcn.com/schema/registry-item.json")
      })
    })
  })

  describe("Idempotency", () => {
    it("running build twice should produce identical output", () => {
      execSync("bun run scripts/build-registry.ts", { cwd: ROOT_DIR })
      const firstRun = readFileSync(join(OUTPUT_DIR, "index.json"), "utf-8")

      execSync("bun run scripts/build-registry.ts", { cwd: ROOT_DIR })
      const secondRun = readFileSync(join(OUTPUT_DIR, "index.json"), "utf-8")

      expect(firstRun).toBe(secondRun)
    })
  })

  describe("Performance", () => {
    it("should complete build in under 5 seconds", () => {
      const start = Date.now()
      execSync("bun run scripts/build-registry.ts", { cwd: ROOT_DIR })
      const duration = Date.now() - start

      expect(duration).toBeLessThan(5000)
    })

    it("should produce reasonably sized output files", () => {
      const indexStats = statSync(join(OUTPUT_DIR, "index.json"))
      expect(indexStats.size).toBeLessThan(50 * 1024) // < 50KB

      // Individual component files
      const swapWidgetStats = statSync(join(OUTPUT_DIR, "swap-widget.json"))
      expect(swapWidgetStats.size).toBeLessThan(100 * 1024) // < 100KB
    })
  })

  describe("Content Integrity", () => {
    it("index.json should have all component metadata", () => {
      const indexContent = JSON.parse(
        readFileSync(join(OUTPUT_DIR, "index.json"), "utf-8")
      )

      expect(indexContent.items.length).toBe(10)

      indexContent.items.forEach((item: { name: string; type: string; title: string }) => {
        expect(item.name).toBeDefined()
        expect(item.type).toBeDefined()
        expect(item.title).toBeDefined()
      })
    })

    it("component files should have correct target paths", () => {
      const swapWidget = JSON.parse(
        readFileSync(join(OUTPUT_DIR, "swap-widget.json"), "utf-8")
      )
      expect(swapWidget.files[0].path).toBe("components/ui/swap-widget.tsx")

      const tradingUtils = JSON.parse(
        readFileSync(join(OUTPUT_DIR, "trading-utils.json"), "utf-8")
      )
      expect(tradingUtils.files[0].path).toBe("lib/trading-utils.ts")
    })

    it("component files should preserve dependencies", () => {
      const swapWidget = JSON.parse(
        readFileSync(join(OUTPUT_DIR, "swap-widget.json"), "utf-8")
      )
      expect(swapWidget.dependencies).toContain("lucide-react")
      expect(swapWidget.registryDependencies).toContain("swap-utils")
      expect(swapWidget.registryDependencies).toContain("token-avatar")

      const counter = JSON.parse(
        readFileSync(join(OUTPUT_DIR, "counter.json"), "utf-8")
      )
      expect(counter.dependencies).toContain("motion")
    })
  })
})
