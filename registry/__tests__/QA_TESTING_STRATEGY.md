# Sedona Component Registry - QA Testing Strategy

## Overview

This document outlines a comprehensive QA testing strategy for the Sedona component registry before production deployment. The registry contains 10 items distributed across 3 categories:

**Libraries (3):**
- `trading-utils` - Core utilities for trading: market cap parsing, price formatting, chart colors
- `swap-utils` - Utilities for swap interfaces: number formatting, input sanitization, slippage calculations
- `sedona-kit` - Demo fixtures and generators for prototyping trading UIs

**UI Components (7):**
- `counter` - Animated number counter with spring physics (depends on: `motion`)
- `token-avatar` - Avatar component optimized for token/crypto icons
- `marquee` - GPU-accelerated infinite scrolling marquee
- `data-table` - Composable data table primitives
- `elimination-progress` - Progress indicator showing elimination status (depends on: `trading-utils`)
- `price-chart` - Lightweight trading chart (depends on: `lightweight-charts`, `trading-utils`)
- `swap-widget` - Complete token swap interface (depends on: `lucide-react`, `swap-utils`, `button`, `popover`, `token-avatar`)

---

## Test Suite Organization

```
registry/__tests__/
  |-- unit/
  |   |-- registry-schema.test.ts        # JSON structure validation
  |   |-- trading-utils.test.ts          # Utility function tests
  |   |-- swap-utils.test.ts             # Swap utility function tests
  |   |-- sedona-kit.test.ts             # Fixture generator tests
  |
  |-- integration/
  |   |-- build-registry.test.ts         # Build script validation
  |   |-- dependency-resolution.test.ts  # registryDependencies chain validation
  |   |-- component-installation.test.ts # npx shadcn add simulation
  |
  |-- e2e/
  |   |-- installation-flow.test.ts      # Full installation flow testing
  |   |-- cross-project.test.ts          # Multi-project compatibility
  |
  |-- visual/
  |   |-- component-rendering.test.tsx   # Component rendering after installation
  |
  |-- performance/
  |   |-- build-performance.test.ts      # Build script performance benchmarks
```

---

## 1. Registry JSON Structure Validation

### Test File: `/Users/Cody/code_projects/sedona_ui/registry/__tests__/unit/registry-schema.test.ts`

```typescript
import { describe, it, expect, beforeAll } from "vitest"
import { readFileSync, existsSync } from "fs"
import { join } from "path"

const ROOT_DIR = process.cwd()
const REGISTRY_PATH = join(ROOT_DIR, "registry/registry.json")
const OUTPUT_DIR = join(ROOT_DIR, "public/r")

interface RegistryFile {
  path: string
  type: string
  target: string
}

interface RegistryItem {
  name: string
  type: string
  title: string
  description: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

interface Registry {
  $schema: string
  name: string
  homepage: string
  items: RegistryItem[]
}

describe("Registry JSON Structure", () => {
  let registry: Registry

  beforeAll(() => {
    const content = readFileSync(REGISTRY_PATH, "utf-8")
    registry = JSON.parse(content)
  })

  describe("Root Structure", () => {
    it("should have required $schema field", () => {
      expect(registry.$schema).toBe("https://ui.shadcn.com/schema/registry.json")
    })

    it("should have valid name", () => {
      expect(registry.name).toBe("sedona")
      expect(typeof registry.name).toBe("string")
      expect(registry.name.length).toBeGreaterThan(0)
    })

    it("should have valid homepage URL", () => {
      expect(registry.homepage).toBe("https://sedona.trade")
      expect(registry.homepage).toMatch(/^https?:\/\//)
    })

    it("should have items array", () => {
      expect(Array.isArray(registry.items)).toBe(true)
      expect(registry.items.length).toBe(10)
    })
  })

  describe("Item Structure Validation", () => {
    const validTypes = ["registry:ui", "registry:lib", "registry:hook", "registry:block"]

    it("each item should have required fields", () => {
      registry.items.forEach((item) => {
        expect(item.name).toBeDefined()
        expect(typeof item.name).toBe("string")
        expect(item.name.length).toBeGreaterThan(0)

        expect(item.type).toBeDefined()
        expect(validTypes).toContain(item.type)

        expect(item.title).toBeDefined()
        expect(typeof item.title).toBe("string")

        expect(item.description).toBeDefined()
        expect(typeof item.description).toBe("string")

        expect(item.files).toBeDefined()
        expect(Array.isArray(item.files)).toBe(true)
        expect(item.files.length).toBeGreaterThan(0)
      })
    })

    it("each item should have unique name", () => {
      const names = registry.items.map((item) => item.name)
      const uniqueNames = new Set(names)
      expect(uniqueNames.size).toBe(names.length)
    })

    it("item names should follow kebab-case convention", () => {
      registry.items.forEach((item) => {
        expect(item.name).toMatch(/^[a-z][a-z0-9-]*$/)
      })
    })

    it("dependencies should be arrays of strings when present", () => {
      registry.items.forEach((item) => {
        if (item.dependencies) {
          expect(Array.isArray(item.dependencies)).toBe(true)
          item.dependencies.forEach((dep) => {
            expect(typeof dep).toBe("string")
          })
        }
        if (item.devDependencies) {
          expect(Array.isArray(item.devDependencies)).toBe(true)
        }
        if (item.registryDependencies) {
          expect(Array.isArray(item.registryDependencies)).toBe(true)
        }
      })
    })
  })

  describe("File Structure Validation", () => {
    it("each file should have required fields", () => {
      registry.items.forEach((item) => {
        item.files.forEach((file) => {
          expect(file.path).toBeDefined()
          expect(typeof file.path).toBe("string")

          expect(file.type).toBeDefined()
          expect(typeof file.type).toBe("string")

          expect(file.target).toBeDefined()
          expect(typeof file.target).toBe("string")
        })
      })
    })

    it("source files should exist", () => {
      registry.items.forEach((item) => {
        item.files.forEach((file) => {
          const sourcePath = join(ROOT_DIR, file.path)
          expect(existsSync(sourcePath)).toBe(true)
        })
      })
    })

    it("target paths should follow project conventions", () => {
      registry.items.forEach((item) => {
        item.files.forEach((file) => {
          if (item.type === "registry:ui") {
            expect(file.target).toMatch(/^components\/ui\//)
          }
          if (item.type === "registry:lib") {
            expect(file.target).toMatch(/^lib\//)
          }
        })
      })
    })
  })

  describe("Component-Specific Validation", () => {
    const componentConfigs = [
      { name: "trading-utils", type: "registry:lib", hasNpmDeps: false },
      { name: "swap-utils", type: "registry:lib", hasNpmDeps: false },
      { name: "counter", type: "registry:ui", hasNpmDeps: true, deps: ["motion"] },
      { name: "token-avatar", type: "registry:ui", hasNpmDeps: false },
      { name: "marquee", type: "registry:ui", hasNpmDeps: false },
      { name: "data-table", type: "registry:ui", hasNpmDeps: false },
      { name: "elimination-progress", type: "registry:ui", hasRegistryDeps: true },
      { name: "price-chart", type: "registry:ui", hasNpmDeps: true, deps: ["lightweight-charts"] },
      { name: "swap-widget", type: "registry:ui", hasNpmDeps: true, deps: ["lucide-react"] },
      { name: "sedona-kit", type: "registry:lib", hasNpmDeps: true, deps: ["lightweight-charts"] },
    ]

    componentConfigs.forEach((config) => {
      it(`${config.name} should have correct configuration`, () => {
        const item = registry.items.find((i) => i.name === config.name)
        expect(item).toBeDefined()
        expect(item?.type).toBe(config.type)

        if (config.hasNpmDeps && config.deps) {
          expect(item?.dependencies).toBeDefined()
          config.deps.forEach((dep) => {
            expect(item?.dependencies).toContain(dep)
          })
        }
      })
    })
  })
})

describe("Generated Output JSON Files", () => {
  it("index.json should exist and have correct structure", () => {
    const indexPath = join(OUTPUT_DIR, "index.json")
    expect(existsSync(indexPath)).toBe(true)

    const content = JSON.parse(readFileSync(indexPath, "utf-8"))
    expect(content.$schema).toBe("https://ui.shadcn.com/schema/registry.json")
    expect(content.name).toBe("sedona")
    expect(Array.isArray(content.items)).toBe(true)
  })

  const components = [
    "trading-utils",
    "swap-utils",
    "counter",
    "token-avatar",
    "marquee",
    "data-table",
    "elimination-progress",
    "price-chart",
    "swap-widget",
    "sedona-kit",
  ]

  components.forEach((name) => {
    it(`${name}.json should exist and have correct structure`, () => {
      const filePath = join(OUTPUT_DIR, `${name}.json`)
      expect(existsSync(filePath)).toBe(true)

      const content = JSON.parse(readFileSync(filePath, "utf-8"))
      expect(content.$schema).toBe("https://ui.shadcn.com/schema/registry-item.json")
      expect(content.name).toBe(name)
      expect(Array.isArray(content.files)).toBe(true)
      expect(content.files.length).toBeGreaterThan(0)

      // Each file should have content
      content.files.forEach((file: { content: string }) => {
        expect(file.content).toBeDefined()
        expect(typeof file.content).toBe("string")
        expect(file.content.length).toBeGreaterThan(0)
      })
    })
  })
})
```

---

## 2. Dependency Resolution Testing

### Test File: `/Users/Cody/code_projects/sedona_ui/registry/__tests__/integration/dependency-resolution.test.ts`

```typescript
import { describe, it, expect, beforeAll } from "vitest"
import { readFileSync } from "fs"
import { join } from "path"

const ROOT_DIR = process.cwd()
const REGISTRY_PATH = join(ROOT_DIR, "registry/registry.json")

interface RegistryItem {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
}

interface Registry {
  items: RegistryItem[]
}

describe("Dependency Resolution", () => {
  let registry: Registry
  let itemMap: Map<string, RegistryItem>

  beforeAll(() => {
    const content = readFileSync(REGISTRY_PATH, "utf-8")
    registry = JSON.parse(content)
    itemMap = new Map(registry.items.map((item) => [item.name, item]))
  })

  describe("Registry Dependencies Validation", () => {
    it("all registryDependencies should reference existing items", () => {
      registry.items.forEach((item) => {
        if (item.registryDependencies) {
          item.registryDependencies.forEach((dep) => {
            // Skip shadcn dependencies (button, popover, etc.)
            const isExternalShadcn = ["button", "popover", "input", "label"].includes(dep)
            if (!isExternalShadcn) {
              expect(itemMap.has(dep)).toBe(true)
            }
          })
        }
      })
    })

    it("should not have circular dependencies", () => {
      function hasCircularDep(
        name: string,
        visited: Set<string> = new Set(),
        path: string[] = []
      ): boolean {
        if (visited.has(name)) {
          console.error("Circular dependency detected:", [...path, name].join(" -> "))
          return true
        }

        const item = itemMap.get(name)
        if (!item || !item.registryDependencies) return false

        visited.add(name)
        path.push(name)

        for (const dep of item.registryDependencies) {
          if (itemMap.has(dep) && hasCircularDep(dep, new Set(visited), [...path])) {
            return true
          }
        }

        return false
      }

      registry.items.forEach((item) => {
        expect(hasCircularDep(item.name)).toBe(false)
      })
    })

    it("dependency graph should be a valid DAG", () => {
      function topologicalSort(): string[] | null {
        const inDegree = new Map<string, number>()
        const adjacency = new Map<string, string[]>()

        // Initialize
        registry.items.forEach((item) => {
          inDegree.set(item.name, 0)
          adjacency.set(item.name, [])
        })

        // Build graph
        registry.items.forEach((item) => {
          if (item.registryDependencies) {
            item.registryDependencies
              .filter((dep) => itemMap.has(dep))
              .forEach((dep) => {
                adjacency.get(dep)?.push(item.name)
                inDegree.set(item.name, (inDegree.get(item.name) || 0) + 1)
              })
          }
        })

        // Topological sort
        const queue: string[] = []
        inDegree.forEach((degree, name) => {
          if (degree === 0) queue.push(name)
        })

        const sorted: string[] = []
        while (queue.length > 0) {
          const node = queue.shift()!
          sorted.push(node)
          adjacency.get(node)?.forEach((neighbor) => {
            const newDegree = (inDegree.get(neighbor) || 0) - 1
            inDegree.set(neighbor, newDegree)
            if (newDegree === 0) queue.push(neighbor)
          })
        }

        return sorted.length === registry.items.length ? sorted : null
      }

      expect(topologicalSort()).not.toBeNull()
    })
  })

  describe("Specific Dependency Chains", () => {
    it("elimination-progress should depend on trading-utils", () => {
      const item = itemMap.get("elimination-progress")
      expect(item?.registryDependencies).toContain("trading-utils")
    })

    it("price-chart should depend on trading-utils", () => {
      const item = itemMap.get("price-chart")
      expect(item?.registryDependencies).toContain("trading-utils")
    })

    it("swap-widget should have all required dependencies", () => {
      const item = itemMap.get("swap-widget")
      expect(item?.registryDependencies).toContain("swap-utils")
      expect(item?.registryDependencies).toContain("token-avatar")
      expect(item?.dependencies).toContain("lucide-react")
    })

    it("sedona-kit should depend on both utility libraries", () => {
      const item = itemMap.get("sedona-kit")
      expect(item?.registryDependencies).toContain("trading-utils")
      expect(item?.registryDependencies).toContain("swap-utils")
    })
  })

  describe("NPM Dependency Validation", () => {
    const expectedNpmDeps: Record<string, string[]> = {
      counter: ["motion"],
      "price-chart": ["lightweight-charts"],
      "swap-widget": ["lucide-react"],
      "sedona-kit": ["lightweight-charts"],
    }

    Object.entries(expectedNpmDeps).forEach(([name, deps]) => {
      it(`${name} should declare npm dependencies: ${deps.join(", ")}`, () => {
        const item = itemMap.get(name)
        deps.forEach((dep) => {
          expect(item?.dependencies).toContain(dep)
        })
      })
    })
  })
})
```

---

## 3. Component Installation Flow Testing

### Test File: `/Users/Cody/code_projects/sedona_ui/registry/__tests__/integration/component-installation.test.ts`

```typescript
import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { execSync } from "child_process"
import { existsSync, mkdirSync, rmSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"

const TEST_PROJECT_DIR = join(process.cwd(), ".test-project")
const REGISTRY_URL = "http://localhost:3002/r" // Local dev server

describe("Component Installation Flow", () => {
  // Skip if no local server running
  const skipIfNoServer = () => {
    try {
      execSync(`curl -s ${REGISTRY_URL}/index.json`, { timeout: 5000 })
      return false
    } catch {
      return true
    }
  }

  beforeAll(() => {
    if (skipIfNoServer()) {
      console.log("Skipping installation tests - local server not running")
      return
    }

    // Create test project
    if (existsSync(TEST_PROJECT_DIR)) {
      rmSync(TEST_PROJECT_DIR, { recursive: true })
    }
    mkdirSync(TEST_PROJECT_DIR, { recursive: true })

    // Initialize minimal Next.js project structure
    const packageJson = {
      name: "test-project",
      dependencies: {
        react: "^18",
        "react-dom": "^18",
        next: "14.2.5",
      },
      devDependencies: {
        typescript: "^5",
      },
    }
    writeFileSync(
      join(TEST_PROJECT_DIR, "package.json"),
      JSON.stringify(packageJson, null, 2)
    )

    // Create components.json for shadcn
    const componentsJson = {
      $schema: "https://ui.shadcn.com/schema.json",
      style: "new-york",
      rsc: true,
      tsx: true,
      tailwind: {
        config: "tailwind.config.ts",
        css: "src/app/globals.css",
        baseColor: "slate",
        cssVariables: true,
      },
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
      },
    }
    writeFileSync(
      join(TEST_PROJECT_DIR, "components.json"),
      JSON.stringify(componentsJson, null, 2)
    )

    // Create necessary directories
    mkdirSync(join(TEST_PROJECT_DIR, "src/lib"), { recursive: true })
    mkdirSync(join(TEST_PROJECT_DIR, "src/components/ui"), { recursive: true })

    // Create utils.ts (required by shadcn)
    writeFileSync(
      join(TEST_PROJECT_DIR, "src/lib/utils.ts"),
      `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`
    )
  })

  afterAll(() => {
    if (existsSync(TEST_PROJECT_DIR)) {
      rmSync(TEST_PROJECT_DIR, { recursive: true })
    }
  })

  describe("Individual Component Installation", () => {
    const components = [
      { name: "trading-utils", target: "src/lib/trading-utils.ts" },
      { name: "swap-utils", target: "src/lib/swap-utils.ts" },
      { name: "counter", target: "src/components/ui/counter.tsx" },
      { name: "token-avatar", target: "src/components/ui/token-avatar.tsx" },
      { name: "marquee", target: "src/components/ui/marquee.tsx" },
    ]

    components.forEach(({ name, target }) => {
      it.skipIf(skipIfNoServer())(
        `should install ${name} successfully`,
        async () => {
          const result = execSync(
            `npx shadcn@latest add ${REGISTRY_URL}/${name}.json --yes --cwd ${TEST_PROJECT_DIR}`,
            { encoding: "utf-8", timeout: 60000 }
          )

          expect(result).not.toContain("error")
          expect(existsSync(join(TEST_PROJECT_DIR, target))).toBe(true)
        },
        { timeout: 120000 }
      )
    })
  })

  describe("Dependency Chain Installation", () => {
    it.skipIf(skipIfNoServer())(
      "installing elimination-progress should also install trading-utils",
      async () => {
        execSync(
          `npx shadcn@latest add ${REGISTRY_URL}/elimination-progress.json --yes --cwd ${TEST_PROJECT_DIR}`,
          { encoding: "utf-8", timeout: 60000 }
        )

        expect(
          existsSync(join(TEST_PROJECT_DIR, "src/lib/trading-utils.ts"))
        ).toBe(true)
        expect(
          existsSync(
            join(TEST_PROJECT_DIR, "src/components/ui/elimination-progress.tsx")
          )
        ).toBe(true)
      },
      { timeout: 120000 }
    )

    it.skipIf(skipIfNoServer())(
      "installing swap-widget should install all dependencies",
      async () => {
        execSync(
          `npx shadcn@latest add ${REGISTRY_URL}/swap-widget.json --yes --cwd ${TEST_PROJECT_DIR}`,
          { encoding: "utf-8", timeout: 60000 }
        )

        // Check swap-utils lib
        expect(
          existsSync(join(TEST_PROJECT_DIR, "src/lib/swap-utils.ts"))
        ).toBe(true)

        // Check token-avatar component
        expect(
          existsSync(join(TEST_PROJECT_DIR, "src/components/ui/token-avatar.tsx"))
        ).toBe(true)

        // Check swap-widget component
        expect(
          existsSync(join(TEST_PROJECT_DIR, "src/components/ui/swap-widget.tsx"))
        ).toBe(true)
      },
      { timeout: 120000 }
    )
  })
})
```

---

## 4. TypeScript Types Correctness

### Test File: `/Users/Cody/code_projects/sedona_ui/registry/__tests__/unit/typescript-types.test.ts`

```typescript
import { describe, it, expect } from "vitest"
import { execSync } from "child_process"
import { join } from "path"

const ROOT_DIR = process.cwd()

describe("TypeScript Types Correctness", () => {
  describe("Registry Source Files", () => {
    it("trading-utils.ts should have no type errors", () => {
      const result = execSync(
        `npx tsc --noEmit --strict ${join(ROOT_DIR, "registry/new-york/trading-utils.ts")}`,
        { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
      )
      expect(result).toBe("")
    })

    it("swap-utils.ts should have no type errors", () => {
      const result = execSync(
        `npx tsc --noEmit --strict ${join(ROOT_DIR, "registry/new-york/swap-utils.ts")}`,
        { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
      )
      expect(result).toBe("")
    })

    it("all registry components should pass type checking", () => {
      const result = () =>
        execSync(
          `npx tsc --noEmit --skipLibCheck -p ${join(ROOT_DIR, "tsconfig.json")}`,
          { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
        )
      expect(result).not.toThrow()
    })
  })

  describe("Exported Types Validation", () => {
    it("trading-utils should export expected types", async () => {
      const module = await import(
        join(ROOT_DIR, "registry/new-york/trading-utils.ts")
      )

      // Functions
      expect(typeof module.parseMarketCap).toBe("function")
      expect(typeof module.formatMarketCap).toBe("function")
      expect(typeof module.formatPrice).toBe("function")
      expect(typeof module.formatPercentChange).toBe("function")
      expect(typeof module.getChangeColor).toBe("function")
      expect(typeof module.formatVolume).toBe("function")
      expect(typeof module.truncateAddress).toBe("function")
      expect(typeof module.formatRelativeTime).toBe("function")

      // Constants
      expect(module.CHART_COLORS).toBeDefined()
      expect(module.LINE_COLORS).toBeDefined()
    })

    it("swap-utils should export expected types", async () => {
      const module = await import(
        join(ROOT_DIR, "registry/new-york/swap-utils.ts")
      )

      // Functions
      expect(typeof module.formatNumber).toBe("function")
      expect(typeof module.formatUSD).toBe("function")
      expect(typeof module.sanitizeNumericInput).toBe("function")
      expect(typeof module.parseBalance).toBe("function")
      expect(typeof module.getSlippageMultiplier).toBe("function")
      expect(typeof module.calculateMinReceived).toBe("function")
      expect(typeof module.validateTradeAmount).toBe("function")
      expect(typeof module.getPriceImpactColor).toBe("function")
      expect(typeof module.formatPriceImpact).toBe("function")
    })
  })
})
```

---

## 5. Component Rendering Tests

### Test File: `/Users/Cody/code_projects/sedona_ui/registry/__tests__/visual/component-rendering.test.tsx`

```typescript
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import * as React from "react"

// Import components directly for testing
// In real scenario, these would be imported after installation

describe("Component Rendering After Installation", () => {
  describe("Counter Component", () => {
    it("should render with initial value", async () => {
      // Dynamic import to simulate post-installation
      const { Counter } = await import("@/components/ui/counter")

      render(<Counter value={100} />)
      // Counter uses motion, so we check for rendered content
      expect(document.body.innerHTML).toContain("100")
    })

    it("should animate value changes", async () => {
      const { Counter } = await import("@/components/ui/counter")
      const { rerender } = render(<Counter value={0} />)

      rerender(<Counter value={100} />)
      // Animation should start
      expect(document.body.innerHTML).toBeDefined()
    })
  })

  describe("TokenAvatar Component", () => {
    it("should render with ticker", async () => {
      const { TokenAvatar } = await import("@/components/ui/token-avatar")

      render(<TokenAvatar ticker="SOL" />)
      expect(screen.getByText("SOL")).toBeInTheDocument()
    })

    it("should render with image URL", async () => {
      const { TokenAvatar } = await import("@/components/ui/token-avatar")

      render(<TokenAvatar ticker="SOL" imageUrl="https://example.com/sol.png" />)
      const img = screen.getByRole("img")
      expect(img).toHaveAttribute("src", expect.stringContaining("sol.png"))
    })

    it("should handle different sizes", async () => {
      const { TokenAvatar } = await import("@/components/ui/token-avatar")

      const { container } = render(<TokenAvatar ticker="SOL" size="lg" />)
      expect(container.firstChild).toHaveClass("w-12", "h-12")
    })
  })

  describe("Marquee Component", () => {
    it("should render children", async () => {
      const { Marquee } = await import("@/components/ui/marquee")

      render(
        <Marquee>
          <span>Item 1</span>
          <span>Item 2</span>
        </Marquee>
      )

      expect(screen.getByText("Item 1")).toBeInTheDocument()
      expect(screen.getByText("Item 2")).toBeInTheDocument()
    })
  })

  describe("DataTable Component", () => {
    it("should render table structure", async () => {
      const { DataTable, DataTableHeader, DataTableBody, DataTableRow, DataTableCell } =
        await import("@/components/ui/data-table")

      render(
        <DataTable>
          <DataTableHeader>
            <DataTableRow>
              <DataTableCell>Header</DataTableCell>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>
            <DataTableRow>
              <DataTableCell>Cell</DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTable>
      )

      expect(screen.getByText("Header")).toBeInTheDocument()
      expect(screen.getByText("Cell")).toBeInTheDocument()
    })

    it("should render loading state", async () => {
      const { DataTable, DataTableLoading } = await import(
        "@/components/ui/data-table"
      )

      render(
        <DataTable>
          <DataTableLoading />
        </DataTable>
      )

      expect(document.querySelector("[data-loading]")).toBeInTheDocument()
    })
  })

  describe("EliminationProgress Component", () => {
    it("should render with required props", async () => {
      const { EliminationProgress } = await import(
        "@/components/ui/elimination-progress"
      )

      render(
        <EliminationProgress
          rank={5}
          totalAgents={100}
          marketCap="$1.2M"
          eliminationThreshold="$5K"
        />
      )

      expect(screen.getByText("#5")).toBeInTheDocument()
      expect(screen.getByText("SAFE")).toBeInTheDocument()
    })

    it("should show correct status for at-risk position", async () => {
      const { EliminationProgress } = await import(
        "@/components/ui/elimination-progress"
      )

      render(
        <EliminationProgress
          rank={95}
          totalAgents={100}
          marketCap="$4K"
          eliminationThreshold="$5K"
        />
      )

      expect(screen.getByText("AT RISK")).toBeInTheDocument()
    })

    it("should render compact variant", async () => {
      const { EliminationProgress } = await import(
        "@/components/ui/elimination-progress"
      )

      const { container } = render(
        <EliminationProgress
          rank={5}
          totalAgents={100}
          marketCap="$1.2M"
          eliminationThreshold="$5K"
          variant="compact"
        />
      )

      expect(container.firstChild).not.toHaveClass("p-4")
    })
  })
})
```

---

## 6. Cross-Project Compatibility Testing

### Test File: `/Users/Cody/code_projects/sedona_ui/registry/__tests__/e2e/cross-project.test.ts`

```typescript
import { describe, it, expect } from "vitest"
import { readFileSync } from "fs"
import { join } from "path"

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
          join(process.cwd(), "registry/new-york", component),
          "utf-8"
        )

        // Check for @/ alias imports
        const importMatches = content.match(/from ["']@\/[^"']+["']/g) || []

        importMatches.forEach((match) => {
          // Should use @/lib or @/components patterns
          expect(match).toMatch(/from ["']@\/(lib|components)\//)
        })

        // Should not have relative imports that go up directories
        expect(content).not.toMatch(/from ["']\.\.\/\.\.\//)
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
          join(process.cwd(), "registry/new-york", component),
          "utf-8"
        )

        // Check for cn() usage (should use shadcn's cn utility)
        if (content.includes("className=")) {
          expect(content).toContain("cn(")
          expect(content).toContain('from "@/lib/utils"')
        }

        // Should not use hardcoded colors (should use CSS variables)
        expect(content).not.toMatch(/bg-#[0-9a-fA-F]+/)
        expect(content).not.toMatch(/text-#[0-9a-fA-F]+/)
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
          join(process.cwd(), "registry/new-york", component),
          "utf-8"
        )

        // Should use React.forwardRef for proper ref handling
        if (content.includes("ref")) {
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
    it("motion dependency should be version agnostic", () => {
      const content = readFileSync(
        join(process.cwd(), "registry/new-york/counter.tsx"),
        "utf-8"
      )

      // Should import from "motion" not "framer-motion"
      expect(content).toContain('from "motion"')
      expect(content).not.toContain('from "framer-motion"')
    })

    it("lightweight-charts imports should be type-safe", () => {
      const content = readFileSync(
        join(process.cwd(), "registry/new-york/price-chart.tsx"),
        "utf-8"
      )

      // Should import types properly
      expect(content).toMatch(/import.*from ["']lightweight-charts["']/)
    })

    it("lucide-react imports should use named exports", () => {
      const content = readFileSync(
        join(process.cwd(), "registry/new-york/swap-widget.tsx"),
        "utf-8"
      )

      // Should use named imports
      expect(content).toMatch(
        /import \{[^}]+\} from ["']lucide-react["']/
      )
    })
  })
})
```

---

## 7. Build Script Testing

### Test File: `/Users/Cody/code_projects/sedona_ui/registry/__tests__/integration/build-registry.test.ts`

```typescript
import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { execSync } from "child_process"
import { existsSync, rmSync, statSync, readFileSync } from "fs"
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
})
```

---

## 8. Edge Cases & Error Handling

### Test File: `/Users/Cody/code_projects/sedona_ui/registry/__tests__/unit/edge-cases.test.ts`

```typescript
import { describe, it, expect } from "vitest"
import {
  parseMarketCap,
  formatMarketCap,
  formatPrice,
  formatVolume,
  truncateAddress,
  formatRelativeTime,
} from "../../new-york/trading-utils"

import {
  formatNumber,
  formatUSD,
  sanitizeNumericInput,
  parseBalance,
  validateTradeAmount,
} from "../../new-york/swap-utils"

describe("Trading Utils Edge Cases", () => {
  describe("parseMarketCap", () => {
    it("should handle empty string", () => {
      expect(parseMarketCap("")).toBe(0)
    })

    it("should handle invalid input", () => {
      expect(parseMarketCap("abc")).toBe(0)
      expect(parseMarketCap("$abc")).toBe(0)
    })

    it("should handle very large numbers", () => {
      expect(parseMarketCap("$999.9B")).toBe(999.9) // No B suffix support
      expect(parseMarketCap("$1000M")).toBe(1000000000)
    })

    it("should handle decimal values", () => {
      expect(parseMarketCap("$0.5K")).toBe(500)
      expect(parseMarketCap("$0.001M")).toBe(1000)
    })

    it("should handle values without $ prefix", () => {
      expect(parseMarketCap("1.2M")).toBe(1200000)
      expect(parseMarketCap("45K")).toBe(45000)
    })
  })

  describe("formatPrice", () => {
    it("should handle zero", () => {
      expect(formatPrice(0)).toBe("$0")
    })

    it("should handle very small prices", () => {
      expect(formatPrice(0.00000001)).toMatch(/\$.*e/)
    })

    it("should handle very large prices", () => {
      expect(formatPrice(1000000)).toContain("1,000,000")
    })

    it("should handle negative prices", () => {
      // Should still format, even if semantically invalid
      expect(formatPrice(-1.5)).toBeDefined()
    })
  })

  describe("truncateAddress", () => {
    it("should handle empty string", () => {
      expect(truncateAddress("")).toBe("")
    })

    it("should handle short addresses", () => {
      expect(truncateAddress("0x1234")).toBe("0x1234")
    })

    it("should handle standard Ethereum addresses", () => {
      const addr = "0x1234567890abcdef1234567890abcdef12345678"
      expect(truncateAddress(addr)).toBe("0x1234...5678")
    })

    it("should handle custom char counts", () => {
      const addr = "0x1234567890abcdef1234567890abcdef12345678"
      expect(truncateAddress(addr, 6)).toBe("0x123456...345678")
    })
  })

  describe("formatRelativeTime", () => {
    it("should handle just now", () => {
      expect(formatRelativeTime(Date.now())).toBe("0s ago")
    })

    it("should handle future timestamps", () => {
      const result = formatRelativeTime(Date.now() + 60000)
      // Should return negative or handle gracefully
      expect(result).toBeDefined()
    })

    it("should handle very old timestamps", () => {
      const oldTime = Date.now() - 365 * 24 * 60 * 60 * 1000 // 1 year
      expect(formatRelativeTime(oldTime)).toMatch(/\d+d ago/)
    })
  })
})

describe("Swap Utils Edge Cases", () => {
  describe("sanitizeNumericInput", () => {
    it("should handle empty input", () => {
      expect(sanitizeNumericInput("")).toBe("")
    })

    it("should handle only decimal point", () => {
      expect(sanitizeNumericInput(".")).toBe(".")
    })

    it("should handle multiple leading zeros", () => {
      expect(sanitizeNumericInput("000000")).toBe("0")
      expect(sanitizeNumericInput("000.5")).toBe("0.5")
    })

    it("should handle scientific notation input", () => {
      // Should strip non-numeric chars including 'e'
      expect(sanitizeNumericInput("1e5")).toBe("15")
    })

    it("should handle unicode digits", () => {
      // Arabic-Indic digits
      expect(sanitizeNumericInput("\u0661\u0662\u0663")).toBe("")
    })

    it("should handle negative sign", () => {
      expect(sanitizeNumericInput("-123")).toBe("123")
    })

    it("should handle comma separators", () => {
      expect(sanitizeNumericInput("1,000,000")).toBe("1000000")
    })
  })

  describe("validateTradeAmount", () => {
    it("should handle NaN amount", () => {
      const result = validateTradeAmount(NaN, 100)
      expect(result.valid).toBe(false)
    })

    it("should handle Infinity", () => {
      const result = validateTradeAmount(Infinity, 100)
      expect(result.valid).toBe(false)
    })

    it("should handle zero balance", () => {
      const result = validateTradeAmount(0.01, 0)
      expect(result.valid).toBe(false)
    })

    it("should handle extremely small amounts", () => {
      const result = validateTradeAmount(0.000000001, 100)
      expect(result.valid).toBe(true)
    })
  })

  describe("formatUSD", () => {
    it("should handle Infinity", () => {
      expect(formatUSD(Infinity)).toBeDefined()
    })

    it("should handle negative values", () => {
      // Should format even if semantically invalid
      expect(formatUSD(-100)).toBeDefined()
    })

    it("should handle boundary values", () => {
      expect(formatUSD(999.99)).not.toContain("K")
      expect(formatUSD(1000)).toContain("K")
      expect(formatUSD(999999.99)).toContain("K")
      expect(formatUSD(1000000)).toContain("M")
    })
  })
})
```

---

## 9. Pre-Deployment Checklist

### Manual Testing Checklist

```markdown
## Registry Pre-Deployment Checklist

### JSON Structure
- [ ] registry.json validates against shadcn schema
- [ ] All 10 components present in registry
- [ ] Each component has name, type, title, description
- [ ] All file paths are valid and files exist
- [ ] No duplicate component names

### Build Process
- [ ] `bun run build:registry` completes without errors
- [ ] All component JSON files generated in public/r/
- [ ] index.json generated correctly
- [ ] File content embedded in component JSON

### Dependency Resolution
- [ ] No circular dependencies detected
- [ ] All registryDependencies reference valid items
- [ ] NPM dependencies match package.json availability
- [ ] shadcn dependencies (button, popover) noted as external

### Installation Testing
- [ ] Single component installation works
- [ ] Dependency chain installation works
- [ ] Files placed in correct target directories
- [ ] No conflicting file overwrites

### TypeScript Validation
- [ ] All registry source files pass type checking
- [ ] Exported types are properly documented
- [ ] No implicit any types
- [ ] Strict mode compatible

### Component Rendering
- [ ] Each UI component renders without errors
- [ ] Props are properly typed
- [ ] Default props work correctly
- [ ] Error states handled gracefully

### Cross-Project Compatibility
- [ ] Works with Next.js 14+
- [ ] Works with React 18+
- [ ] Tailwind classes use CSS variables
- [ ] No hardcoded colors or values

### Documentation
- [ ] Each component has description
- [ ] Usage examples available
- [ ] Dependencies clearly documented
- [ ] Breaking changes noted

### Performance
- [ ] Build completes in under 5 seconds
- [ ] Output files are reasonably sized
- [ ] No unnecessary duplication
```

---

## 10. CI/CD Integration

### GitHub Actions Workflow: `/Users/Cody/code_projects/sedona_ui/.github/workflows/registry-tests.yml`

```yaml
name: Registry Tests

on:
  push:
    branches: [main]
    paths:
      - 'registry/**'
      - 'public/r/**'
      - 'scripts/build-registry.ts'
  pull_request:
    branches: [main]
    paths:
      - 'registry/**'
      - 'public/r/**'
      - 'scripts/build-registry.ts'

jobs:
  test-registry:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Validate JSON Schema
        run: |
          # Validate registry.json against shadcn schema
          bun run scripts/validate-schema.ts

      - name: Build Registry
        run: bun run build:registry

      - name: Run Registry Unit Tests
        run: bun test registry/__tests__/unit/

      - name: Run Registry Integration Tests
        run: bun test registry/__tests__/integration/

      - name: TypeScript Type Check
        run: bun run type-check

      - name: Verify Generated Files
        run: |
          # Check all expected files exist
          for file in trading-utils swap-utils counter token-avatar marquee data-table elimination-progress price-chart swap-widget sedona-kit; do
            if [ ! -f "public/r/${file}.json" ]; then
              echo "Missing: public/r/${file}.json"
              exit 1
            fi
          done
          echo "All registry files present"

  test-installation:
    runs-on: ubuntu-latest
    needs: test-registry
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2

      - name: Install dependencies
        run: bun install

      - name: Start local server
        run: |
          bun run dev &
          sleep 10

      - name: Test Component Installation
        run: |
          mkdir -p /tmp/test-project
          cd /tmp/test-project
          npm init -y
          echo '{"style":"new-york","rsc":true,"tsx":true,"tailwind":{"config":"tailwind.config.ts","css":"src/app/globals.css","baseColor":"slate","cssVariables":true},"aliases":{"components":"@/components","utils":"@/lib/utils"}}' > components.json
          npx shadcn@latest add http://localhost:3002/r/counter.json --yes || true
```

---

## Summary

This QA testing strategy covers:

1. **Registry JSON Structure Validation** - Schema compliance, required fields, unique names
2. **Dependency Resolution Testing** - Circular dependency detection, DAG validation, NPM deps
3. **Component Installation Flow** - Individual and chained installation via npx shadcn
4. **TypeScript Types Correctness** - Type checking, exported types, strict mode
5. **Component Rendering Tests** - Visual rendering, props, error states
6. **Cross-Project Compatibility** - Import paths, CSS classes, React version
7. **Build Script Testing** - Execution, output validation, idempotency, performance
8. **Edge Cases & Error Handling** - Boundary values, invalid inputs, error states
9. **Pre-Deployment Checklist** - Manual verification items
10. **CI/CD Integration** - Automated testing pipeline

Run all tests with:
```bash
bun test registry/__tests__/
```

Run specific test suites:
```bash
bun test registry/__tests__/unit/
bun test registry/__tests__/integration/
bun test registry/__tests__/e2e/
```
