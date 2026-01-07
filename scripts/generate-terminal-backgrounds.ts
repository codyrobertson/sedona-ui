import { chromium } from "playwright"
import { mkdirSync, existsSync } from "fs"
import { join } from "path"

const OUTPUT_DIR = join(process.cwd(), "public/og-backgrounds")
const NUM_VARIANTS = 20
const WIDTH = 600
const HEIGHT = 630

async function generateBackgrounds() {
  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  console.log("Launching browser...")
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
  })

  for (let i = 0; i < NUM_VARIANTS; i++) {
    console.log(`Generating background ${i + 1}/${NUM_VARIANTS}...`)

    const page = await context.newPage()

    // Navigate to terminal render page with seed
    await page.goto(`http://localhost:3002/terminal-render?seed=${i}`, {
      waitUntil: "networkidle",
    })

    // Wait for canvas to be ready and let shader animate to unique state
    // Random delay between 1-3 seconds to get different animation frames
    const delay = 1000 + (i * 137) % 2000
    await page.waitForTimeout(delay)

    // Take screenshot
    await page.screenshot({
      path: join(OUTPUT_DIR, `terminal-${i}.png`),
      type: "png",
    })

    await page.close()
  }

  await browser.close()
  console.log(`\nDone! Generated ${NUM_VARIANTS} backgrounds in ${OUTPUT_DIR}`)
}

generateBackgrounds().catch(console.error)
