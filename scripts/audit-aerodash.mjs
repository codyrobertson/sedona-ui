import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import ts from "typescript"

const root = process.cwd()
const systemDir = path.join(root, "src/components/aerodash")
const manifestPath = path.join(systemDir, "manifest.ts")
const barrelPath = path.join(systemDir, "index.ts")

function readSource(filePath) {
  return fs.readFileSync(filePath, "utf8")
}

function parseSource(filePath) {
  return ts.createSourceFile(filePath, readSource(filePath), ts.ScriptTarget.Latest, true)
}

function unwrapExpression(expression) {
  let current = expression
  while (
    ts.isAsExpression(current) ||
    ts.isParenthesizedExpression(current) ||
    (ts.isSatisfiesExpression?.(current) ?? false)
  ) {
    current = current.expression
  }
  return current
}

function propName(property) {
  if (!property.name) return null
  if (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) return property.name.text
  return null
}

function getProperty(objectLiteral, name) {
  return objectLiteral.properties.find(
    (property) => ts.isPropertyAssignment(property) && propName(property) === name,
  )
}

function stringValue(objectLiteral, name) {
  const property = getProperty(objectLiteral, name)
  if (!property || !ts.isStringLiteral(property.initializer)) {
    throw new Error(`Manifest entry is missing string property "${name}"`)
  }
  return property.initializer.text
}

function stringArrayValue(objectLiteral, name) {
  const property = getProperty(objectLiteral, name)
  if (!property || !ts.isArrayLiteralExpression(property.initializer)) {
    throw new Error(`Manifest entry is missing string array property "${name}"`)
  }

  return property.initializer.elements.map((element) => {
    if (!ts.isStringLiteral(element)) {
      throw new Error(`Manifest property "${name}" must contain string literals only`)
    }
    return element.text
  })
}

function loadManifestEntries() {
  const sourceFile = parseSource(manifestPath)
  let arrayLiteral = null

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return

    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name)) continue
      if (declaration.name.text !== "aerodashComponents") continue
      if (!declaration.initializer) continue

      const initializer = unwrapExpression(declaration.initializer)
      if (!ts.isArrayLiteralExpression(initializer)) {
        throw new Error("aerodashComponents must be an array literal")
      }
      arrayLiteral = initializer
    }
  })

  if (!arrayLiteral) throw new Error("Could not find aerodashComponents in manifest.ts")

  return arrayLiteral.elements.map((element) => {
    if (!ts.isObjectLiteralExpression(element)) {
      throw new Error("Every aerodashComponents entry must be an object literal")
    }

    return {
      id: stringValue(element, "id"),
      source: stringValue(element, "source"),
      css: stringArrayValue(element, "css"),
      exports: stringArrayValue(element, "exports"),
    }
  })
}

function loadBarrelExports() {
  const sourceFile = parseSource(barrelPath)
  const exports = new Set()

  sourceFile.forEachChild((node) => {
    if (!ts.isExportDeclaration(node)) return
    if (!node.exportClause || !ts.isNamedExports(node.exportClause)) return

    for (const element of node.exportClause.elements) {
      exports.add(element.name.text)
    }
  })

  return exports
}

function cssImportsFor(sourceFileName) {
  const sourceFile = parseSource(path.join(systemDir, sourceFileName))
  const imports = []

  sourceFile.forEachChild((node) => {
    if (!ts.isImportDeclaration(node)) return
    const specifier = node.moduleSpecifier
    if (!ts.isStringLiteral(specifier)) return
    const match = specifier.text.match(/^\.\/(.+\.css)$/)
    if (match) imports.push(match[1])
  })

  return imports.sort()
}

function sortedUnique(values) {
  return Array.from(new Set(values)).sort()
}

function sameArray(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

const failures = []
const entries = loadManifestEntries()
const barrelExports = loadBarrelExports()

const ids = entries.map((entry) => entry.id)
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
if (duplicateIds.length) failures.push(`Duplicate manifest ids: ${sortedUnique(duplicateIds).join(", ")}`)

const manifestSources = new Set(entries.map((entry) => entry.source))
const sourceFiles = fs
  .readdirSync(systemDir)
  .filter((fileName) => /\.(ts|tsx)$/.test(fileName))
  .filter((fileName) => !["index.ts", "manifest.ts"].includes(fileName))
  .sort()

for (const sourceFile of sourceFiles) {
  if (!manifestSources.has(sourceFile)) failures.push(`Missing manifest entry for ${sourceFile}`)
}

for (const entry of entries) {
  const sourcePath = path.join(systemDir, entry.source)
  if (!fs.existsSync(sourcePath)) {
    failures.push(`Manifest source does not exist: ${entry.source}`)
    continue
  }

  const declaredCss = [...entry.css].sort()
  const importedCss = cssImportsFor(entry.source)
  if (!sameArray(declaredCss, importedCss)) {
    failures.push(
      `${entry.source} css mismatch: manifest=[${declaredCss.join(", ")}] imports=[${importedCss.join(", ")}]`,
    )
  }

  for (const exportName of entry.exports) {
    if (!barrelExports.has(exportName)) {
      failures.push(`${entry.source} export "${exportName}" is not re-exported from index.ts`)
    }
  }
}

const manifestCss = sortedUnique(entries.flatMap((entry) => entry.css))
const cssFiles = fs
  .readdirSync(systemDir)
  .filter((fileName) => fileName.endsWith(".css"))
  .sort()

for (const cssFile of cssFiles) {
  if (!manifestCss.includes(cssFile)) failures.push(`CSS file is not referenced by manifest: ${cssFile}`)
}

if (failures.length) {
  console.error("AeroDash audit failed:")
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(
  `AeroDash audit passed: ${entries.length} entries, ${sourceFiles.length} source files, ${cssFiles.length} CSS files.`,
)
