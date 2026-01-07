/**
 * Build script for generating shadcn registry JSON files
 *
 * Reads registry/registry.json and outputs individual component JSON files
 * to public/r/ for serving via the API.
 *
 * Usage: bun run scripts/build-registry.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs"
import { join, dirname } from "path"

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

function main() {
  console.log("🔨 Building Sedona registry...")

  // Read registry manifest
  const registryContent = readFileSync(REGISTRY_PATH, "utf-8")
  const registry: Registry = JSON.parse(registryContent)

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Process each component
  let hasErrors = false
  for (const item of registry.items) {
    console.log(`  📦 Processing ${item.name}...`)

    // Read component file content
    const files = item.files.map((file) => {
      const filePath = join(ROOT_DIR, file.path)

      if (!existsSync(filePath)) {
        console.error(`     ❌ File not found: ${file.path}`)
        hasErrors = true
        return null
      }

      const content = readFileSync(filePath, "utf-8")

      return {
        path: file.target,
        type: file.type,
        content,
      }
    }).filter((f): f is NonNullable<typeof f> => f !== null)

    if (files.length !== item.files.length) {
      console.error(`     ⚠️ Skipping ${item.name} due to missing files`)
      continue
    }

    // Build component JSON
    const componentJson = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies || [],
      devDependencies: item.devDependencies || [],
      registryDependencies: item.registryDependencies || [],
      files,
    }

    // Write component JSON
    const outputPath = join(OUTPUT_DIR, `${item.name}.json`)
    writeFileSync(outputPath, JSON.stringify(componentJson, null, 2))
    console.log(`     ✓ Written to ${outputPath}`)
  }

  // Write index.json with all components
  const indexJson = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: registry.name,
    homepage: registry.homepage,
    items: registry.items.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies || [],
      devDependencies: item.devDependencies || [],
      registryDependencies: item.registryDependencies || [],
    })),
  }

  writeFileSync(join(OUTPUT_DIR, "index.json"), JSON.stringify(indexJson, null, 2))
  console.log(`  📋 Written registry index to ${OUTPUT_DIR}/index.json`)

  if (hasErrors) {
    console.log(`\n⚠️  Registry built with warnings - some components were skipped`)
  } else {
    console.log(`\n✅ Registry built successfully! ${registry.items.length} components`)
  }
  console.log(`\nComponents can be installed via:`)
  console.log(`  npx shadcn add https://sedona.trade/r/counter.json`)
  console.log(`  npx shadcn add https://sedona.trade/r/marquee.json`)
}

main()
