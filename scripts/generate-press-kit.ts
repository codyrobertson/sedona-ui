#!/usr/bin/env npx ts-node
/**
 * Press Kit ZIP Generator
 *
 * Generates a downloadable ZIP archive of all brand assets.
 * Run with: npx ts-node scripts/generate-press-kit.ts
 *
 * Requires: npm install archiver @types/archiver --save-dev
 */

import * as fs from 'fs'
import * as path from 'path'
import archiver from 'archiver'

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const OUTPUT_PATH = path.join(PUBLIC_DIR, 'brand', 'sedona-press-kit.zip')

// Assets to include in the press kit
const ASSETS = {
  logos: [
    'brand/logos/sedona-logomark.svg',
    'brand/logos/sedona-logomark-white.svg',
    'brand/logos/sedona-logomark-orange.svg',
    'brand/logos/sedona-wordmark.svg',
    'brand/logos/sedona-logo-full.svg',
  ],
  icons: [
    'icon.svg',
    'favicon.svg',
    'apple-icon.svg',
  ],
}

// README content for the ZIP
const README_CONTENT = `# Sedona Press Kit

## Contents

### Logos
- sedona-logomark.svg - Icon with currentColor (inherits parent color)
- sedona-logomark-white.svg - White icon for dark backgrounds
- sedona-logomark-orange.svg - Orange icon (#D56B12) for light backgrounds
- sedona-wordmark.svg - "SEDONA" text wordmark
- sedona-logo-full.svg - Icon + wordmark horizontal combination

### Icons
- icon.svg - App icon (192×192)
- favicon.svg - Browser favicon (32×32)
- apple-icon.svg - Apple touch icon

## Brand Colors

| Name           | Hex       | Usage                    |
|----------------|-----------|--------------------------|
| Sedona Orange  | #D56B12   | Primary brand color      |
| Sedona 400     | #E87F2A   | Hover states             |
| Sedona 300     | #F49A50   | Highlights               |
| Zeus Dark      | #0D0D0D   | Background               |
| Zeus Elevated  | #1A1A1A   | Cards, elevated surfaces |
| White          | #FFFFFF   | Text, icons on dark      |

## Typography

- **Monument Grotesk** - Headlines, brand text (weight: 700, 600)
- **Souvenir** - Special display text
- **Geist Sans** - Body text, UI (weight: 400, 500, 600)
- **JetBrains Mono** - Code, monospace

## Usage Guidelines

### Do
- Use official logo files provided here
- Maintain clear space around logo (25% of height)
- Use approved color variants only
- Link to sedona.ai when referencing Sedona

### Don't
- Modify, rotate, or distort the logo
- Use unapproved colors or effects
- Imply endorsement without permission
- Use logo smaller than 32px

## Contact

- Press: press@sedona.ai
- Partnerships: partners@sedona.ai
- General: hello@sedona.ai

## Links

- Website: https://sedona.ai
- Brand Guidelines: https://sedona.ai/brand
- Documentation: https://docs.sedona.ai

---
© ${new Date().getFullYear()} Sedona. All rights reserved.
`

async function generatePressKit() {
  console.log('🎨 Generating Sedona Press Kit...\n')

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Create output stream
  const output = fs.createWriteStream(OUTPUT_PATH)
  const archive = archiver('zip', { zlib: { level: 9 } })

  // Handle events
  output.on('close', () => {
    const sizeKB = (archive.pointer() / 1024).toFixed(2)
    console.log(`\n✅ Press kit generated: ${OUTPUT_PATH}`)
    console.log(`   Size: ${sizeKB} KB`)
  })

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn('⚠️ Warning:', err.message)
    } else {
      throw err
    }
  })

  archive.on('error', (err) => {
    throw err
  })

  // Pipe archive to output
  archive.pipe(output)

  // Add README
  archive.append(README_CONTENT, { name: 'README.md' })
  console.log('📄 Added README.md')

  // Add logos
  console.log('\n📁 Adding logos...')
  for (const logo of ASSETS.logos) {
    const filePath = path.join(PUBLIC_DIR, logo)
    if (fs.existsSync(filePath)) {
      const fileName = path.basename(logo)
      archive.file(filePath, { name: `logos/${fileName}` })
      console.log(`   ✓ ${fileName}`)
    } else {
      console.log(`   ⚠️ Missing: ${logo}`)
    }
  }

  // Add icons
  console.log('\n📁 Adding icons...')
  for (const icon of ASSETS.icons) {
    const filePath = path.join(PUBLIC_DIR, icon)
    if (fs.existsSync(filePath)) {
      const fileName = path.basename(icon)
      archive.file(filePath, { name: `icons/${fileName}` })
      console.log(`   ✓ ${fileName}`)
    } else {
      console.log(`   ⚠️ Missing: ${icon}`)
    }
  }

  // Finalize archive
  await archive.finalize()
}

// Run
generatePressKit().catch((err) => {
  console.error('❌ Error generating press kit:', err)
  process.exit(1)
})
