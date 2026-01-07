import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { AGENTS, getAgentByTicker } from "@/fixtures"
import {
  OG_WIDTH,
  OG_HEIGHT,
  CHART_WIDTH,
  CHART_HEIGHT,
  OG_COLORS,
  TINT_COLORS,
  FONT_URLS,
  LOGOMARK_PATH,
  hashTicker,
  formatOGPrice,
  formatOGNumber,
  formatOGHolders,
  generateSparklinePath,
  type OGAgentData,
} from "@/lib/og-constants"

export const runtime = "edge"

/**
 * Load fonts with error handling
 * Returns empty array if fonts fail to load (Satori will use system fallback)
 */
async function loadFonts() {
  try {
    const [semiBold, bold] = await Promise.all([
      fetch(FONT_URLS.interSemiBold).then((res) => {
        if (!res.ok) throw new Error(`Font fetch failed: ${res.status}`)
        return res.arrayBuffer()
      }),
      fetch(FONT_URLS.interBold).then((res) => {
        if (!res.ok) throw new Error(`Font fetch failed: ${res.status}`)
        return res.arrayBuffer()
      }),
    ])
    return [
      { name: "Inter", data: semiBold, weight: 600 as const, style: "normal" as const },
      { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
    ]
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to load fonts for OG image:", error)
    return []
  }
}

/**
 * Get agent data for OG image
 * Uses unified fixtures, falls back to generated placeholder
 */
function getOGAgentData(ticker: string): OGAgentData {
  const agent = getAgentByTicker(ticker)

  if (agent) {
    return {
      name: agent.name,
      ticker: agent.ticker,
      price: agent.price_usd ?? 0,
      change: agent.price_change_percent_in_24_hours,
      mcap: agent.market_cap_usd_latest,
      vol: agent.volume_24h_usd ?? 0,
      holders: agent.holders ?? 0,
    }
  }

  // Fallback for unknown tickers
  return {
    name: `${ticker.toUpperCase()} Agent`,
    ticker: ticker.toUpperCase(),
    price: 0.01,
    change: 0,
    mcap: 10000,
    vol: 1000,
    holders: 50,
  }
}

export async function GET(req: NextRequest) {
  const tickerParam = req.nextUrl.searchParams.get("ticker")

  // Get base URL from request for backgrounds
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : req.nextUrl.origin

  // Load fonts (with error handling)
  const fonts = await loadFonts()

  // Root Sedona OG (no ticker)
  if (!tickerParam) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", width: OG_WIDTH, height: OG_HEIGHT, background: OG_COLORS.surfaceDefault, fontFamily: "Inter", position: "relative" }}>
          {/* Full background image */}
          <img
            src={`${baseUrl}/og-backgrounds/sedona-og-final.png`}
            width={OG_WIDTH}
            height={OG_HEIGHT}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Dark overlay */}
          <div style={{ display: "flex", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(180deg, rgba(20,19,16,0.3) 0%, rgba(20,19,16,0.7) 100%)" }} />

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", zIndex: 10 }}>
            <svg width={80} height={72} viewBox="0 0 20 18" fill="none">
              <path d={LOGOMARK_PATH} fill={OG_COLORS.sedonaOrange} />
            </svg>
            <span style={{ fontSize: 72, fontWeight: 700, color: OG_COLORS.textPrimary, marginTop: 24 }}>Sedona</span>
            <span style={{ fontSize: 28, color: OG_COLORS.textSecondary, marginTop: 12 }}>Trade AI Agents on Solana</span>
          </div>
        </div>
      ),
      {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        fonts,
      }
    )
  }

  // Agent OG image
  const ticker = tickerParam.toUpperCase()
  const agent = getOGAgentData(tickerParam)
  const up = agent.change >= 0
  const col = up ? OG_COLORS.green : OG_COLORS.red
  const bgIndex = hashTicker(ticker)
  const tintColor = TINT_COLORS[bgIndex % TINT_COLORS.length]
  const path = generateSparklinePath(ticker, up, CHART_WIDTH, CHART_HEIGHT)

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: OG_WIDTH, height: OG_HEIGHT, background: OG_COLORS.surfaceDefault, fontFamily: "Inter" }}>
        {/* Left Panel with Terminal Background */}
        <div style={{ display: "flex", flexDirection: "column", width: "50%", height: "100%", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          {/* Terminal Background Image */}
          <img
            src={`${baseUrl}/og-backgrounds/terminal-${bgIndex}.png`}
            width={600}
            height={630}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Dark overlay with color tint */}
          <div style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(180deg, rgba(20,19,16,0.5) 0%, rgba(20,19,16,0.75) 100%)`,
          }} />
          {/* Color tint overlay */}
          <div style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `radial-gradient(circle at 50% 40%, ${tintColor}20 0%, transparent 60%)`,
          }} />

          {/* Avatar Circle */}
          <div style={{ display: "flex", width: 160, height: 160, borderRadius: 80, background: `linear-gradient(135deg, ${tintColor} 0%, #a85000 100%)`, alignItems: "center", justifyContent: "center", boxShadow: `0 16px 48px ${tintColor}80`, zIndex: 10 }}>
            <span style={{ fontSize: 64, fontWeight: 700, color: OG_COLORS.textPrimary }}>{ticker[0]}</span>
          </div>
          <span style={{ fontSize: 48, fontWeight: 700, color: OG_COLORS.textPrimary, marginTop: 24, zIndex: 10 }}>${ticker}</span>
          <span style={{ fontSize: 20, color: OG_COLORS.textSecondary, marginTop: 8, zIndex: 10 }}>{agent.name}</span>
        </div>

        {/* Right Panel */}
        <div style={{ display: "flex", flexDirection: "column", width: "50%", height: "100%", padding: "32px 40px" }}>
          {/* Price Row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 14, color: OG_COLORS.textTertiary }}>Current Price</span>
              <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                <span style={{ fontSize: 44, fontWeight: 700, color: OG_COLORS.textPrimary }}>{formatOGPrice(agent.price)}</span>
                <span style={{ fontSize: 22, fontWeight: 600, color: col, marginLeft: 12 }}>{up ? "+" : ""}{agent.change.toFixed(2)}%</span>
              </div>
            </div>
            <div style={{ display: "flex", background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 14px" }}>
              <span style={{ fontSize: 14, color: OG_COLORS.textSecondary }}>24h</span>
            </div>
          </div>

          {/* Chart Container - Full width, chart aligned to bottom */}
          <div style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            background: OG_COLORS.surfaceElevated,
            borderRadius: 12,
            marginTop: 16,
            marginBottom: 16,
            overflow: "hidden",
            position: "relative",
          }}>
            <svg
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            >
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={col} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={col} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <path d={`${path} L${CHART_WIDTH},${CHART_HEIGHT} L0,${CHART_HEIGHT} Z`} fill="url(#chartFill)" />
              <path d={path} fill="none" stroke={col} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Stats Row */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 12, color: OG_COLORS.textTertiary }}>Market Cap</span>
              <span style={{ fontSize: 18, fontWeight: 600, color: OG_COLORS.textPrimary }}>{formatOGNumber(agent.mcap)}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: OG_COLORS.textTertiary }}>24h Volume</span>
              <span style={{ fontSize: 18, fontWeight: 600, color: OG_COLORS.textPrimary }}>{formatOGNumber(agent.vol)}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: 12, color: OG_COLORS.textTertiary }}>Holders</span>
              <span style={{ fontSize: 18, fontWeight: 600, color: OG_COLORS.textPrimary }}>{formatOGHolders(agent.holders)}</span>
            </div>
          </div>

          {/* Footer with Sedona Logo */}
          <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12 }}>
            <svg width={28} height={25} viewBox="0 0 20 18" fill="none">
              <path d={LOGOMARK_PATH} fill={OG_COLORS.sedonaOrange} />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: OG_COLORS.textPrimary }}>Sedona</span>
              <span style={{ fontSize: 11, color: OG_COLORS.textTertiary }}>Trade AI Agents on Solana</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts,
    }
  )
}
