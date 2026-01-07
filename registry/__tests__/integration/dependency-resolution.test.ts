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
    it("all registryDependencies should reference existing items or external shadcn components", () => {
      // External shadcn dependencies that are expected
      const externalShadcnDeps = ["button", "popover", "input", "label", "avatar"]

      registry.items.forEach((item) => {
        if (item.registryDependencies) {
          item.registryDependencies.forEach((dep) => {
            const isExternal = externalShadcnDeps.includes(dep)
            const isInternal = itemMap.has(dep)
            expect(isExternal || isInternal).toBe(true)
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

      const result = topologicalSort()
      expect(result).not.toBeNull()
      expect(result?.length).toBe(10)
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

    it("components without npm deps should have empty or undefined dependencies", () => {
      const noDeps = ["trading-utils", "swap-utils", "token-avatar", "marquee", "data-table"]
      noDeps.forEach((name) => {
        const item = itemMap.get(name)
        expect(!item?.dependencies || item.dependencies.length === 0).toBe(true)
      })
    })
  })

  describe("Dependency Installation Order", () => {
    it("should compute correct installation order for swap-widget", () => {
      const installOrder: string[] = []
      const installed = new Set<string>()

      function install(name: string) {
        if (installed.has(name)) return

        const item = itemMap.get(name)
        if (item?.registryDependencies) {
          item.registryDependencies
            .filter((dep) => itemMap.has(dep))
            .forEach((dep) => install(dep))
        }

        installOrder.push(name)
        installed.add(name)
      }

      install("swap-widget")

      // swap-utils and token-avatar should be installed before swap-widget
      const swapUtilsIndex = installOrder.indexOf("swap-utils")
      const tokenAvatarIndex = installOrder.indexOf("token-avatar")
      const swapWidgetIndex = installOrder.indexOf("swap-widget")

      expect(swapUtilsIndex).toBeLessThan(swapWidgetIndex)
      expect(tokenAvatarIndex).toBeLessThan(swapWidgetIndex)
    })

    it("should compute correct installation order for sedona-kit", () => {
      const installOrder: string[] = []
      const installed = new Set<string>()

      function install(name: string) {
        if (installed.has(name)) return

        const item = itemMap.get(name)
        if (item?.registryDependencies) {
          item.registryDependencies
            .filter((dep) => itemMap.has(dep))
            .forEach((dep) => install(dep))
        }

        installOrder.push(name)
        installed.add(name)
      }

      install("sedona-kit")

      // trading-utils and swap-utils should be installed before sedona-kit
      const tradingUtilsIndex = installOrder.indexOf("trading-utils")
      const swapUtilsIndex = installOrder.indexOf("swap-utils")
      const sedonaKitIndex = installOrder.indexOf("sedona-kit")

      expect(tradingUtilsIndex).toBeLessThan(sedonaKitIndex)
      expect(swapUtilsIndex).toBeLessThan(sedonaKitIndex)
    })
  })
})
