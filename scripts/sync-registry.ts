/**
 * Sync script for registry components
 *
 * Copies source files from src/ to registry/new-york/ to keep them in sync.
 * Source of truth: src/ (where devs work)
 * Registry: registry/new-york/ (for publishing)
 *
 * Some components have registry-specific modifications (e.g., using lucide-react
 * instead of Font Awesome) and should NOT be synced from src/.
 *
 * Usage: bun run scripts/sync-registry.ts
 */

import { readFileSync, writeFileSync, existsSync } from "fs"
import { join } from "path"

const ROOT_DIR = process.cwd()
const REGISTRY_PATH = join(ROOT_DIR, "registry/registry.json")

// Components that have registry-specific versions
// These should NOT be synced from src/ - edit registry/new-york/ directly
const EXCLUDE_FROM_SYNC: string[] = [
  // Currently none - all components sync from src/
]

interface RegistryFile {
  path: string
  type: string
  target: string
}

interface RegistryItem {
  name: string
  type: string
  files: RegistryFile[]
}

interface Registry {
  items: RegistryItem[]
}

// Map from target (where devs work) to registry path
function getSourcePath(target: string): string {
  // target is like "lib/trading-utils.ts" or "components/ui/counter.tsx"
  // source is in src/ directory
  return join(ROOT_DIR, "src", target)
}

function getRegistryPath(registryPath: string): string {
  return join(ROOT_DIR, registryPath)
}

function main() {
  console.log("🔄 Syncing src/ → registry/new-york/...")
  console.log("")

  // Read registry manifest
  const registryContent = readFileSync(REGISTRY_PATH, "utf-8")
  const registry: Registry = JSON.parse(registryContent)

  let syncedCount = 0
  let skippedCount = 0
  let excludedCount = 0
  let errorCount = 0

  for (const item of registry.items) {
    // Skip excluded components (they have registry-specific versions)
    if (EXCLUDE_FROM_SYNC.includes(item.name)) {
      console.log(`  ⊘ ${item.name}: Excluded (registry-specific version)`)
      excludedCount++
      continue
    }

    for (const file of item.files) {
      const sourcePath = getSourcePath(file.target)
      const registryPath = getRegistryPath(file.path)

      // Check if source exists
      if (!existsSync(sourcePath)) {
        console.log(`  ⚠️  ${item.name}: Source not found at src/${file.target}`)
        skippedCount++
        continue
      }

      // Read source content
      const sourceContent = readFileSync(sourcePath, "utf-8")

      // Check if registry file exists and compare
      let needsSync = true
      if (existsSync(registryPath)) {
        const registryContent = readFileSync(registryPath, "utf-8")
        if (registryContent === sourceContent) {
          needsSync = false
        }
      }

      if (needsSync) {
        try {
          writeFileSync(registryPath, sourceContent)
          console.log(`  ✓ ${item.name}: Synced src/${file.target} → ${file.path}`)
          syncedCount++
        } catch (err) {
          console.log(`  ❌ ${item.name}: Failed to write ${file.path}`)
          errorCount++
        }
      } else {
        console.log(`  · ${item.name}: Already in sync`)
      }
    }
  }

  console.log("")
  console.log("━".repeat(50))
  console.log(`✅ Synced: ${syncedCount}`)
  console.log(`⊘ Excluded: ${excludedCount}`)
  console.log(`⏭️  Skipped: ${skippedCount}`)
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount}`)
  }
  console.log("")

  if (syncedCount > 0) {
    console.log("💡 Run `bun run build:registry` to rebuild public/r/")
  }
}

main()
