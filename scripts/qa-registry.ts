#!/usr/bin/env bun
/**
 * Registry QA Script
 *
 * Comprehensive quality assurance for the Sedona component registry.
 * Validates sync status, schema compliance, security, and production readiness.
 *
 * Usage: bun run scripts/qa-registry.ts [--fix] [--verbose]
 *
 * @package @sedona/qa
 */

import { readFileSync, existsSync, readdirSync } from "fs"
import { join, dirname, resolve } from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"

// =============================================================================
// CONFIGURATION
// =============================================================================

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT_DIR = resolve(__dirname, "..")

const args = process.argv.slice(2)
const VERBOSE = args.includes("--verbose") || args.includes("-v")
const FIX = args.includes("--fix")

// ANSI colors
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
}

const icons = {
  pass: `${colors.green}✓${colors.reset}`,
  fail: `${colors.red}✗${colors.reset}`,
  warn: `${colors.yellow}⚠${colors.reset}`,
  info: `${colors.blue}ℹ${colors.reset}`,
  run: `${colors.cyan}→${colors.reset}`,
}

// =============================================================================
// TYPES
// =============================================================================

interface QAResult {
  name: string
  status: "pass" | "fail" | "warn"
  message: string
  details?: string[]
}

interface QASection {
  title: string
  results: QAResult[]
}

// =============================================================================
// UTILITIES
// =============================================================================

function log(message: string) {
  console.log(message)
}

function verbose(message: string) {
  if (VERBOSE) console.log(`${colors.dim}  ${message}${colors.reset}`)
}

function runCommand(cmd: string): { success: boolean; output: string } {
  try {
    const output = execSync(cmd, { cwd: ROOT_DIR, encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] })
    return { success: true, output: output.trim() }
  } catch (err: any) {
    return { success: false, output: err.stdout?.toString() || err.message }
  }
}

function readJSON(path: string): any {
  try {
    return JSON.parse(readFileSync(join(ROOT_DIR, path), "utf-8"))
  } catch {
    return null
  }
}

// =============================================================================
// QA CHECKS
// =============================================================================

function checkTypeScript(): QAResult {
  verbose("Running TypeScript compiler...")
  const { success, output } = runCommand("npm run type-check 2>&1")

  if (success && !output.includes("error")) {
    return { name: "TypeScript", status: "pass", message: "No type errors" }
  }

  const errors = output.split("\n").filter(l => l.includes("error TS"))
  return {
    name: "TypeScript",
    status: "fail",
    message: `${errors.length} type error(s)`,
    details: errors.slice(0, 5),
  }
}

function checkLint(): QAResult {
  verbose("Running ESLint...")
  const { output } = runCommand("npm run lint 2>&1")

  const errorMatch = output.match(/(\d+) error/)
  const warnMatch = output.match(/(\d+) warning/)

  const errors = errorMatch ? parseInt(errorMatch[1]) : 0
  const warnings = warnMatch ? parseInt(warnMatch[1]) : 0

  if (errors > 0) {
    return { name: "ESLint", status: "fail", message: `${errors} error(s), ${warnings} warning(s)` }
  }
  if (warnings > 0) {
    return { name: "ESLint", status: "warn", message: `${warnings} warning(s)` }
  }
  return { name: "ESLint", status: "pass", message: "No issues" }
}

function checkBuild(): QAResult {
  verbose("Running production build...")
  const { success, output } = runCommand("npm run build 2>&1")

  if (success && output.includes("Generating static pages")) {
    return { name: "Build", status: "pass", message: "Production build successful" }
  }

  return {
    name: "Build",
    status: "fail",
    message: "Build failed",
    details: output.split("\n").filter(l => l.includes("error")).slice(0, 5),
  }
}

function checkRegistrySync(): QAResult {
  verbose("Checking registry sync status...")
  const { success, output } = runCommand("npm run registry:sync 2>&1")

  const syncedMatch = output.match(/Synced: (\d+)/)
  const excludedMatch = output.match(/Excluded: (\d+)/)
  const skippedMatch = output.match(/Skipped: (\d+)/)

  const synced = syncedMatch ? parseInt(syncedMatch[1]) : 0
  const excluded = excludedMatch ? parseInt(excludedMatch[1]) : 0
  const skipped = skippedMatch ? parseInt(skippedMatch[1]) : 0

  if (skipped > 0) {
    return {
      name: "Registry Sync",
      status: "warn",
      message: `${skipped} component(s) skipped (missing source)`,
      details: output.split("\n").filter(l => l.includes("[SKIP]")),
    }
  }

  if (synced > 0) {
    return {
      name: "Registry Sync",
      status: "warn",
      message: `${synced} component(s) out of sync`,
      details: output.split("\n").filter(l => l.includes("[SYNCED]")),
    }
  }

  return {
    name: "Registry Sync",
    status: "pass",
    message: `All synced (${excluded} excluded)`,
  }
}

function checkRegistryBuild(): QAResult {
  verbose("Building registry...")
  const { success, output } = runCommand("npm run registry:build 2>&1")

  const countMatch = output.match(/(\d+) components/)
  const count = countMatch ? parseInt(countMatch[1]) : 0

  if (success && count > 0) {
    return { name: "Registry Build", status: "pass", message: `${count} components built` }
  }

  return { name: "Registry Build", status: "fail", message: "Registry build failed" }
}

function checkRegistrySchema(): QAResult {
  verbose("Validating registry schema...")
  const registry = readJSON("registry/registry.json")

  if (!registry) {
    return { name: "Registry Schema", status: "fail", message: "Cannot read registry.json" }
  }

  const issues: string[] = []

  // Check required fields
  if (!registry.$schema) issues.push("Missing $schema reference")
  if (!registry.name) issues.push("Missing name")
  if (!Array.isArray(registry.items)) issues.push("Missing items array")

  // Check each item
  const validTypes = ["registry:ui", "registry:lib", "registry:hook", "registry:block"]
  for (const item of registry.items || []) {
    if (!item.name) issues.push(`Item missing name`)
    if (!item.type) issues.push(`${item.name}: missing type`)
    if (item.type && !validTypes.includes(item.type)) {
      issues.push(`${item.name}: invalid type "${item.type}"`)
    }
    if (!item.files || !Array.isArray(item.files)) {
      issues.push(`${item.name}: missing files array`)
    }
  }

  if (issues.length > 0) {
    return {
      name: "Registry Schema",
      status: "fail",
      message: `${issues.length} schema issue(s)`,
      details: issues.slice(0, 5),
    }
  }

  return { name: "Registry Schema", status: "pass", message: `${registry.items.length} items valid` }
}

function checkOutputFiles(): QAResult {
  verbose("Checking public/r/ output files...")
  const registry = readJSON("registry/registry.json")

  if (!registry?.items) {
    return { name: "Output Files", status: "fail", message: "Cannot read registry" }
  }

  const missing: string[] = []
  for (const item of registry.items) {
    const outputPath = join(ROOT_DIR, "public/r", `${item.name}.json`)
    if (!existsSync(outputPath)) {
      missing.push(item.name)
    }
  }

  if (missing.length > 0) {
    return {
      name: "Output Files",
      status: "fail",
      message: `${missing.length} missing output file(s)`,
      details: missing,
    }
  }

  // Check index.json
  const index = readJSON("public/r/index.json")
  if (!index) {
    return { name: "Output Files", status: "fail", message: "Missing index.json" }
  }

  return { name: "Output Files", status: "pass", message: `${registry.items.length} files + index` }
}

function checkDependencies(): QAResult {
  verbose("Validating dependencies...")
  const registry = readJSON("registry/registry.json")
  const pkg = readJSON("package.json")

  if (!registry || !pkg) {
    return { name: "Dependencies", status: "fail", message: "Cannot read files" }
  }

  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }
  const missing: string[] = []

  for (const item of registry.items) {
    for (const dep of item.dependencies || []) {
      if (!allDeps[dep]) {
        missing.push(`${item.name}: ${dep}`)
      }
    }
  }

  if (missing.length > 0) {
    return {
      name: "Dependencies",
      status: "fail",
      message: `${missing.length} missing from package.json`,
      details: missing,
    }
  }

  return { name: "Dependencies", status: "pass", message: "All dependencies present" }
}

function checkSecurityPatterns(): QAResult {
  verbose("Scanning for security issues...")
  const filesToCheck = [
    "scripts/sync-registry.ts",
    "scripts/build-registry.ts",
  ]

  const dangerousPatterns = [
    { pattern: /eval\s*\(/, name: "eval()" },
    { pattern: /new Function\s*\(/, name: "new Function()" },
    { pattern: /execSync\s*\([^)]*\$\{/, name: "command injection risk" },
    // Note: ../../ in comments is OK - we check for isPathSafe() function instead
  ]

  const issues: string[] = []

  for (const file of filesToCheck) {
    const fullPath = join(ROOT_DIR, file)
    if (!existsSync(fullPath)) continue

    const content = readFileSync(fullPath, "utf-8")
    for (const { pattern, name } of dangerousPatterns) {
      if (pattern.test(content)) {
        issues.push(`${file}: ${name}`)
      }
    }
  }

  // Check for path safety function (should exist)
  const syncScript = readFileSync(join(ROOT_DIR, "scripts/sync-registry.ts"), "utf-8")
  if (!syncScript.includes("isPathSafe")) {
    issues.push("sync-registry.ts: missing path traversal protection")
  }

  if (issues.length > 0) {
    return {
      name: "Security",
      status: "fail",
      message: `${issues.length} potential issue(s)`,
      details: issues,
    }
  }

  return { name: "Security", status: "pass", message: "No dangerous patterns detected" }
}

function checkGitStatus(): QAResult {
  verbose("Checking git status...")
  const { output } = runCommand("git status --porcelain")

  const lines = output.split("\n").filter(Boolean)
  const untracked = lines.filter(l => l.startsWith("??")).length
  const modified = lines.filter(l => l.startsWith(" M") || l.startsWith("M ")).length

  if (lines.length === 0) {
    return { name: "Git Status", status: "pass", message: "Working tree clean" }
  }

  return {
    name: "Git Status",
    status: "warn",
    message: `${modified} modified, ${untracked} untracked`,
    details: lines.slice(0, 5),
  }
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  console.log()
  console.log(`${colors.bold}${colors.cyan}╔══════════════════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.bold}${colors.cyan}║           SEDONA REGISTRY QA REPORT                      ║${colors.reset}`)
  console.log(`${colors.bold}${colors.cyan}╚══════════════════════════════════════════════════════════╝${colors.reset}`)
  console.log()

  const sections: QASection[] = [
    {
      title: "Build Pipeline",
      results: [
        checkTypeScript(),
        checkLint(),
        checkBuild(),
      ],
    },
    {
      title: "Registry Integrity",
      results: [
        checkRegistrySync(),
        checkRegistryBuild(),
        checkRegistrySchema(),
        checkOutputFiles(),
        checkDependencies(),
      ],
    },
    {
      title: "Quality & Security",
      results: [
        checkSecurityPatterns(),
        checkGitStatus(),
      ],
    },
  ]

  let totalPass = 0
  let totalFail = 0
  let totalWarn = 0

  for (const section of sections) {
    console.log(`${colors.bold}${section.title}${colors.reset}`)
    console.log("─".repeat(50))

    for (const result of section.results) {
      const icon = result.status === "pass" ? icons.pass
                 : result.status === "fail" ? icons.fail
                 : icons.warn

      console.log(`  ${icon} ${result.name}: ${result.message}`)

      if (result.details && (VERBOSE || result.status === "fail")) {
        for (const detail of result.details) {
          console.log(`${colors.dim}      ${detail}${colors.reset}`)
        }
      }

      if (result.status === "pass") totalPass++
      else if (result.status === "fail") totalFail++
      else totalWarn++
    }
    console.log()
  }

  // Summary
  console.log(`${colors.bold}Summary${colors.reset}`)
  console.log("─".repeat(50))
  console.log(`  ${icons.pass} Passed:   ${totalPass}`)
  console.log(`  ${icons.warn} Warnings: ${totalWarn}`)
  console.log(`  ${icons.fail} Failed:   ${totalFail}`)
  console.log()

  if (totalFail > 0) {
    console.log(`${colors.red}${colors.bold}QA FAILED${colors.reset} - ${totalFail} check(s) need attention`)
    process.exit(1)
  } else if (totalWarn > 0) {
    console.log(`${colors.yellow}${colors.bold}QA PASSED WITH WARNINGS${colors.reset}`)
    process.exit(0)
  } else {
    console.log(`${colors.green}${colors.bold}QA PASSED${colors.reset} - All checks passed!`)
    process.exit(0)
  }
}

main().catch(err => {
  console.error(`${icons.fail} QA script error:`, err.message)
  process.exit(1)
})
