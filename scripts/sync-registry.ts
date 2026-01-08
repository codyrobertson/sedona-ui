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
 * Usage: bun run scripts/sync-registry.ts [--dry-run]
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import { join, dirname, resolve, relative } from "path"
import { fileURLToPath } from "url"

// Resolve ROOT_DIR from script location, not cwd
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT_DIR = resolve(__dirname, "..")
const REGISTRY_PATH = join(ROOT_DIR, "registry/registry.json")

// Parse command line arguments
const args = process.argv.slice(2)
const DRY_RUN = args.includes("--dry-run")

// Components that have registry-specific versions
// These should NOT be synced from src/ - edit registry/new-york/ directly
const EXCLUDE_FROM_SYNC: string[] = [
  "marquee",     // src/ has folder with variants (TokenMarquee, TradeMarquee), registry has simplified generic version
  "data-table",  // src/ has folder with specialized tables, registry has generic primitives
]

interface RegistryFile {
  path: string
  type: string
  target: string
}

interface RegistryItem {
  name: string
  type: string
  files?: RegistryFile[]
  title?: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
}

interface Registry {
  $schema?: string
  name?: string
  homepage?: string
  items: RegistryItem[]
}

/**
 * Validates that a resolved path is safely within the allowed base directory.
 * Prevents path traversal attacks (e.g., ../../../etc/passwd).
 */
function isPathSafe(resolvedPath: string, allowedBase: string): boolean {
  const normalizedPath = resolve(resolvedPath)
  const normalizedBase = resolve(allowedBase)
  return normalizedPath.startsWith(normalizedBase + "/") || normalizedPath === normalizedBase
}

/**
 * Validates the structure of the registry JSON at runtime.
 * TypeScript types are erased at runtime, so we must validate manually.
 */
function validateRegistry(data: unknown): Registry {
  if (typeof data !== "object" || data === null) {
    throw new Error("Registry must be an object")
  }

  const obj = data as Record<string, unknown>

  if (!Array.isArray(obj.items)) {
    throw new Error("Registry must have an 'items' array")
  }

  for (let i = 0; i < obj.items.length; i++) {
    const item = obj.items[i] as Record<string, unknown>

    if (typeof item !== "object" || item === null) {
      throw new Error(`Registry item at index ${i} must be an object`)
    }

    if (typeof item.name !== "string" || item.name.trim() === "") {
      throw new Error(`Registry item at index ${i} must have a non-empty 'name' string`)
    }

    if (typeof item.type !== "string") {
      throw new Error(`Registry item '${item.name}' must have a 'type' string`)
    }

    if (item.files !== undefined) {
      if (!Array.isArray(item.files)) {
        throw new Error(`Registry item '${item.name}' files must be an array`)
      }

      for (let j = 0; j < item.files.length; j++) {
        const file = item.files[j] as Record<string, unknown>

        if (typeof file !== "object" || file === null) {
          throw new Error(`File at index ${j} in '${item.name}' must be an object`)
        }

        if (typeof file.path !== "string" || file.path.trim() === "") {
          throw new Error(`File at index ${j} in '${item.name}' must have a non-empty 'path' string`)
        }

        if (typeof file.target !== "string" || file.target.trim() === "") {
          throw new Error(`File at index ${j} in '${item.name}' must have a non-empty 'target' string`)
        }

        if (typeof file.type !== "string") {
          throw new Error(`File at index ${j} in '${item.name}' must have a 'type' string`)
        }
      }
    }
  }

  return obj as unknown as Registry
}

// Allowed base directories for path safety validation
const ALLOWED_SOURCE_BASE = join(ROOT_DIR, "src")
const ALLOWED_REGISTRY_BASE = join(ROOT_DIR, "registry")

// Map from target (where devs work) to registry path
function getSourcePath(target: string): string {
  // target is like "lib/trading-utils.ts" or "components/ui/counter.tsx"
  // source is in src/ directory
  const fullPath = resolve(ROOT_DIR, "src", target)

  if (!isPathSafe(fullPath, ALLOWED_SOURCE_BASE)) {
    throw new Error(
      `Path traversal detected: target "${target}" resolves outside allowed source directory`
    )
  }

  return fullPath
}

function getRegistryPath(registryPath: string): string {
  const fullPath = resolve(ROOT_DIR, registryPath)

  if (!isPathSafe(fullPath, ALLOWED_REGISTRY_BASE)) {
    throw new Error(
      `Path traversal detected: path "${registryPath}" resolves outside allowed registry directory`
    )
  }

  return fullPath
}

/**
 * Ensures the parent directory exists for a given file path.
 */
function ensureDirectoryExists(filePath: string): void {
  const dir = dirname(filePath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

/**
 * Safely reads a file, returning null if it doesn't exist or throws on other errors.
 */
function safeReadFile(path: string): string | null {
  try {
    return readFileSync(path, "utf-8")
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      return null
    }
    throw err
  }
}

function main(): number {
  if (DRY_RUN) {
    console.log("[DRY RUN] Syncing src/ -> registry/new-york/ (no files will be modified)")
  } else {
    console.log("Syncing src/ -> registry/new-york/...")
  }
  console.log("")

  // Validate registry file exists
  if (!existsSync(REGISTRY_PATH)) {
    console.error(`ERROR: Registry manifest not found at ${REGISTRY_PATH}`)
    console.error("Make sure you're running this script from the project root.")
    return 1
  }

  // Read and parse registry manifest with proper error handling
  let registryContent: string
  try {
    registryContent = readFileSync(REGISTRY_PATH, "utf-8")
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`ERROR: Failed to read registry manifest: ${message}`)
    return 1
  }

  let rawRegistry: unknown
  try {
    rawRegistry = JSON.parse(registryContent)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`ERROR: Failed to parse registry.json as JSON: ${message}`)
    return 1
  }

  // Validate registry structure at runtime
  let registry: Registry
  try {
    registry = validateRegistry(rawRegistry)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`ERROR: Invalid registry.json structure: ${message}`)
    return 1
  }

  let syncedCount = 0
  let skippedCount = 0
  let excludedCount = 0
  let errorCount = 0
  const errors: string[] = []

  for (const item of registry.items) {
    // Skip excluded components (they have registry-specific versions)
    if (EXCLUDE_FROM_SYNC.includes(item.name)) {
      console.log(`  [EXCLUDED] ${item.name}: Registry-specific version`)
      excludedCount++
      continue
    }

    // Skip items without files array
    if (!item.files || item.files.length === 0) {
      continue
    }

    for (const file of item.files) {
      let sourcePath: string
      let registryPath: string

      // Validate paths (catches path traversal attempts)
      try {
        sourcePath = getSourcePath(file.target)
        registryPath = getRegistryPath(file.path)
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        console.log(`  [ERROR] ${item.name}: ${message}`)
        errors.push(`${item.name}: ${message}`)
        errorCount++
        continue
      }

      // Check if source exists using safe read
      const sourceContent = safeReadFile(sourcePath)
      if (sourceContent === null) {
        console.log(`  [SKIP] ${item.name}: Source not found at src/${file.target}`)
        skippedCount++
        continue
      }

      // Check if registry file exists and compare
      const existingContent = safeReadFile(registryPath)
      const needsSync = existingContent !== sourceContent

      if (needsSync) {
        if (DRY_RUN) {
          if (existingContent === null) {
            console.log(`  [DRY RUN] Would create: ${file.path}`)
          } else {
            console.log(`  [DRY RUN] Would update: ${file.path}`)
          }
          syncedCount++
        } else {
          try {
            // Ensure parent directory exists before writing
            ensureDirectoryExists(registryPath)
            writeFileSync(registryPath, sourceContent)
            console.log(`  [SYNCED] ${item.name}: src/${file.target} -> ${file.path}`)
            syncedCount++
          } catch (err) {
            const message = err instanceof Error ? err.message : String(err)
            console.log(`  [ERROR] ${item.name}: Failed to write ${file.path} - ${message}`)
            errors.push(`${item.name}: Failed to write ${file.path} - ${message}`)
            errorCount++
          }
        }
      } else {
        console.log(`  [OK] ${item.name}: Already in sync`)
      }
    }
  }

  console.log("")
  console.log("=".repeat(50))
  console.log(`Synced: ${syncedCount}`)
  console.log(`Excluded: ${excludedCount}`)
  console.log(`Skipped: ${skippedCount}`)

  if (errorCount > 0) {
    console.log(`Errors: ${errorCount}`)
    console.log("")
    console.log("Error details:")
    for (const error of errors) {
      console.log(`  - ${error}`)
    }
  }

  console.log("")

  if (syncedCount > 0 && !DRY_RUN) {
    console.log("Run `bun run build:registry` to rebuild public/r/")
  }

  // Return non-zero exit code if there were errors
  return errorCount > 0 ? 1 : 0
}

// Run main and exit with appropriate code
const exitCode = main()
process.exit(exitCode)
