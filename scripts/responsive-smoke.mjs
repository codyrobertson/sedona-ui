import { spawn } from "node:child_process"
import process from "node:process"
import { setTimeout as delay } from "node:timers/promises"
import { chromium } from "playwright"

const PORT = Number(process.env.QA_PORT || 3010)
const BASE_URL = process.env.QA_BASE_URL || `http://127.0.0.1:${PORT}`
const SERVER_MODE = process.env.QA_SERVER_MODE || "dev"
const ONBOARDING_STORAGE_KEY = "sedona_onboarding_state"
const ONBOARDING_SCOPE_STORAGE_KEY = "sedona_onboarding_scope"
const WALLET_SCOPE = "wallet:J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w"
const COMPLETE_ONBOARDING_STATE = JSON.stringify({
  completedSteps: ["explore_agents", "open_profile", "give_feedback"],
  dismissedAt: null,
  viewedAt: "2026-03-11T00:00:00.000Z",
})

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
]

const ROUTES = [
  {
    name: "landing",
    path: "/landing",
    marker: "Crowdsourcing Community Intelligence",
    markerMode: "html",
  },
  {
    name: "trading-onboarding",
    path: "/trading",
    marker: "Welcome to Sedona",
  },
  {
    name: "trading-market",
    path: "/trading",
    marker: "Trending Agents",
    storage: {
      [ONBOARDING_STORAGE_KEY]: COMPLETE_ONBOARDING_STATE,
    },
  },
  {
    name: "profile",
    path: "/trading/profile",
    marker: "Profile Settings",
    storage: {
      [ONBOARDING_SCOPE_STORAGE_KEY]: WALLET_SCOPE,
      [`${ONBOARDING_STORAGE_KEY}:${WALLET_SCOPE}`]: COMPLETE_ONBOARDING_STATE,
    },
  },
  {
    name: "portfolio",
    path: "/trading/portfolio",
    marker: "Holdings",
    storage: {
      [ONBOARDING_SCOPE_STORAGE_KEY]: WALLET_SCOPE,
      [`${ONBOARDING_STORAGE_KEY}:${WALLET_SCOPE}`]: COMPLETE_ONBOARDING_STATE,
    },
  },
  {
    name: "not-found",
    path: "/missing-trail",
    marker: "This trail does not lead anywhere",
  },
]

async function waitForServer(url, timeoutMs = 60000) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url)

      if (response.ok || response.status === 404) {
        return
      }
    } catch {
      // Keep polling until timeout.
    }

    await delay(500)
  }

  throw new Error(`Timed out waiting for ${url}`)
}

function startServer() {
  const command =
    SERVER_MODE === "start"
      ? ["npm", ["run", "start", "--", "-p", String(PORT)]]
      : ["npx", ["next", "dev", "-p", String(PORT)]]

  const server = spawn(command[0], command[1], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PORT: String(PORT),
    },
    stdio: ["ignore", "pipe", "pipe"],
  })

  let output = ""
  server.stdout.on("data", (chunk) => {
    output += chunk.toString()
  })
  server.stderr.on("data", (chunk) => {
    output += chunk.toString()
  })

  return { server, getOutput: () => output }
}

async function assertRoute(viewport, route) {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: {
      width: viewport.width,
      height: viewport.height,
    },
  })

  await context.addInitScript((storage) => {
    window.localStorage.clear()

    for (const [key, value] of Object.entries(storage)) {
      window.localStorage.setItem(key, value)
    }
  }, route.storage ?? {})

  const page = await context.newPage()
  await page.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle" })
  if (route.markerMode === "html") {
    const content = await page.content()

    if (!content.includes(route.marker)) {
      throw new Error(`${viewport.name} ${route.name} missing marker "${route.marker}" in page HTML`)
    }
  } else {
    await page.getByText(route.marker, { exact: false }).first().waitFor({
      state: route.markerState ?? "visible",
      timeout: 10000,
    })
  }

  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: Math.max(
      document.documentElement.scrollWidth,
      document.body?.scrollWidth ?? 0
    ),
  }))

  if (metrics.scrollWidth > metrics.clientWidth + 1) {
    throw new Error(
      `${viewport.name} ${route.name} overflowed: scrollWidth=${metrics.scrollWidth}, clientWidth=${metrics.clientWidth}, innerWidth=${metrics.innerWidth}`
    )
  }

  await context.close()
  await browser.close()
}

async function main() {
  let serverHandle = null

  if (!process.env.QA_BASE_URL) {
    serverHandle = startServer()

    try {
      await waitForServer(`${BASE_URL}/landing`)
    } catch (error) {
      serverHandle.server.kill("SIGTERM")
      throw new Error(`${error.message}\n\nServer output:\n${serverHandle.getOutput()}`)
    }
  }

  try {
    for (const viewport of VIEWPORTS) {
      for (const route of ROUTES) {
        await assertRoute(viewport, route)
        console.log(`[qa:responsive] ${viewport.name} ${route.name} ok`)
      }
    }
  } finally {
    if (serverHandle) {
      serverHandle.server.kill("SIGTERM")
    }
  }
}

main().catch((error) => {
  console.error(`[qa:responsive] ${error.message}`)
  process.exit(1)
})
