import { chromium } from "playwright"
import { join } from "path"

const OUTPUT_PATH = join(process.cwd(), "public/og-backgrounds/sedona-og-final.png")
const WIDTH = 1200
const HEIGHT = 630
const DEV_URL = process.env.DEV_URL || "http://localhost:3002"

async function generateSedonaOG() {
  console.log("Launching browser...")
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
  })

  const page = await context.newPage()

  console.log("Navigating to OG render page...")
  await page.goto(`${DEV_URL}/og-render`, {
    waitUntil: "networkidle",
  })

  // Wait for shader to initialize and settle
  await page.waitForTimeout(2000)

  console.log("Taking screenshot with paper shader overlay...")
  await page.screenshot({
    path: OUTPUT_PATH,
    type: "png",
  })

  await browser.close()
  console.log(`Done! Generated ${OUTPUT_PATH}`)
}

generateSedonaOG().catch(console.error)
