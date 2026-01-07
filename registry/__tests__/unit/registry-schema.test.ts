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

    it("should have items array with 10 components", () => {
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
