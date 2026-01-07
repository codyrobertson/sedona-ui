import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

const WIDTH = 1200
const HEIGHT = 630
const SEDONA_ORANGE = "#D56B12"
const SURFACE_DEFAULT = "#141310"
const SURFACE_ELEVATED = "#1e1c17"
const TEXT_PRIMARY = "#ffffff"
const TEXT_SECONDARY = "rgba(255,255,255,0.6)"
const TEXT_TERTIARY = "rgba(255,255,255,0.46)"
const GREEN = "#22c55e"
const RED = "#ef4444"

// Theme color tints for variety
const TINT_COLORS = [
  "#D56B12", // Sedona orange
  "#D56B12",
  "#c76a1a", // Darker orange
  "#e07820", // Lighter orange
  "#b85d10", // Deep orange
  "#d4710f",
  "#c26515",
  "#da7018",
  "#bf5f12",
  "#e67d1c",
]

const AGENTS: Record<string, { name: string; price: number; change: number; mcap: number; vol: number; holders: number }> = {
  test: { name: "Test Agent", price: 0.0074, change: 5.4, mcap: 7438, vol: 1200, holders: 47 },
  research: { name: "Research Agent", price: 0.0847, change: 3.2, mcap: 847000, vol: 124500, holders: 1247 },
  alpha: { name: "Alpha Trader", price: 0.245, change: -2.1, mcap: 2450000, vol: 890000, holders: 3892 },
  sigma: { name: "Sigma Protocol", price: 0.189, change: 7.8, mcap: 1890000, vol: 456000, holders: 2156 },
  wordle: { name: "Wordle Master", price: 0.0125, change: 12.4, mcap: 125000, vol: 34500, holders: 523 },
  neuro: { name: "NeuroNet", price: 0.412, change: -0.8, mcap: 3240000, vol: 567000, holders: 4521 },
  quantum: { name: "Quantum AI", price: 0.0089, change: 15.2, mcap: 89000, vol: 12300, holders: 234 },
  pulse: { name: "Pulse Analytics", price: 0.156, change: -4.3, mcap: 1560000, vol: 234000, holders: 1876 },
  nexus: { name: "Nexus Mind", price: 0.0234, change: 8.7, mcap: 234000, vol: 45600, holders: 678 },
  oracle: { name: "Oracle Prime", price: 0.678, change: 1.9, mcap: 6780000, vol: 1230000, holders: 7654 },
  cipher: { name: "Cipher AI", price: 0.0456, change: -6.2, mcap: 456000, vol: 78900, holders: 892 },
  apex: { name: "Apex Network", price: 0.892, change: 4.5, mcap: 8920000, vol: 2340000, holders: 9123 },
}

function fmt(n: number): string {
  if (n >= 1) return `$${n.toFixed(2)}`
  if (n >= 0.01) return `$${n.toFixed(4)}`
  return `$${n.toFixed(6)}`
}

function fmtNum(n: number): string {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`
  return `$${n.toFixed(0)}`
}

function fmtHolders(n: number): string {
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return n.toString()
}

// Hash ticker to get consistent background index
function hashTicker(ticker: string): number {
  let hash = 0
  for (const c of ticker) {
    hash = ((hash << 5) - hash) + c.charCodeAt(0)
    hash = hash & hash
  }
  return Math.abs(hash) % 20
}

// Generate sparkline path - fills full width
function genSparkline(ticker: string, up: boolean, W: number, H: number): string {
  let seed = 0
  for (const c of ticker) seed += c.charCodeAt(0)

  const pts: number[] = []
  let p = 100
  for (let i = 0; i < 40; i++) {
    const r = Math.sin(seed * (i + 1)) * 10000
    p *= 1 + (r - Math.floor(r) - 0.5) * 0.1
    pts.push(p)
  }

  if ((up && pts[pts.length - 1] < pts[0]) || (!up && pts[pts.length - 1] > pts[0])) pts.reverse()

  const min = Math.min(...pts)
  const max = Math.max(...pts)
  const range = max - min || 1

  // Scale to use 70% of height, leaving room at top
  const chartH = H * 0.85
  const offsetY = H * 0.05

  return pts.map((v, i) => {
    const x = (i / (pts.length - 1)) * W
    const y = offsetY + chartH - ((v - min) / range) * chartH
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
  }).join(" ")
}

// Sedona logomark SVG path
const LOGOMARK_PATH = `M1.88865 9.85046C1.98205 9.75031 2.01298 9.61357 2.02288 9.47864C2.03278 9.24836 2.02845 9.01927 2.04329 8.78839C2.32722 4.759 5.9273 1.71492 10.0835 1.99018C11.2334 2.06635 12.3054 2.38839 13.2487 2.90053C13.5351 3.05525 13.5549 3.44686 13.2846 3.62677L12.1396 4.38599L12.1279 4.39378L16.3564 6.09033C16.3533 6.08434 16.3502 6.07834 16.3465 6.07234L18.6173 6.98209C18.7194 7.02287 18.827 6.93951 18.8103 6.83456C18.8103 6.83336 18.8097 6.83156 18.8097 6.83037L18.8078 6.82197L17.6697 0.949705C17.6505 0.852553 17.5354 0.806376 17.4513 0.862148L16.0286 1.80608C15.7873 1.9668 15.4675 1.962 15.2312 1.79468C13.8178 0.788385 12.1019 0.146706 10.2227 0.0219683C4.94439 -0.327657 0.373768 3.53741 0.0131406 8.65405C0.000769167 8.93831 -0.0685109 9.3593 0.244486 9.49903C0.499338 9.61357 0.785737 9.71792 1.04925 9.82707C1.40431 9.9686 1.62452 10.0891 1.88865 9.85046Z M18.8771 8.50083C18.6223 8.38629 18.3359 8.28194 18.0723 8.1728C17.7173 8.03127 17.4971 7.91073 17.2329 8.14941C17.1395 8.24956 17.1086 8.38629 17.0987 8.52122C17.0888 8.75151 17.0931 8.98059 17.0783 9.21148C16.7944 13.2409 13.1943 16.2849 9.03811 16.0097C7.88818 15.9335 6.8162 15.6115 5.87287 15.0993C5.58647 14.9446 5.56668 14.553 5.837 14.3731L6.98197 13.6139L6.99372 13.6061L2.76517 11.9095C2.76826 11.9155 2.77135 11.9215 2.77507 11.9275L0.504289 11.0178C0.402225 10.977 0.294593 11.0604 0.311295 11.1653C0.311295 11.1665 0.311913 11.1683 0.311913 11.1695L0.313769 11.1779L1.45194 17.0502C1.47112 17.1473 1.58617 17.1935 1.6703 17.1377L3.09301 16.1938C3.33425 16.0331 3.65406 16.0379 3.89035 16.2052C5.30379 17.2115 7.01971 17.8532 8.89893 17.9779C14.1772 18.3275 18.7478 14.4625 19.1085 9.34581C19.1208 9.06155 19.1901 8.64056 18.8771 8.50083Z M9.63859 4.41472C9.23714 6.58623 7.77298 8.4525 5.75087 8.86029C5.7286 8.86689 5.70077 8.87289 5.67046 8.87888C5.5721 8.89748 5.56839 9.03361 5.66613 9.0558C7.81381 9.53736 9.42271 11.427 9.67633 13.8564C9.70416 14.0693 9.71777 14.1449 9.73509 14.0831C9.75241 14.1449 9.76602 14.0693 9.79385 13.8564C10.0475 11.427 11.6564 9.53736 13.8041 9.0558C13.9018 9.03361 13.8981 8.89748 13.7997 8.87888C13.7694 8.87289 13.7416 8.86689 13.7193 8.86029C11.6972 8.4525 10.233 6.58623 9.83159 4.41472C9.82169 4.36314 9.77839 4.33855 9.73571 4.34155C9.69241 4.33855 9.64911 4.36314 9.63983 4.41472H9.63859Z`

export async function GET(req: NextRequest) {
  const tickerParam = req.nextUrl.searchParams.get("ticker")

  // Get base URL from request for backgrounds
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : req.nextUrl.origin

  // Load Inter font from Google Fonts
  const interSemiBold = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjp-Ek-_0ew.woff"
  ).then((res) => res.arrayBuffer())

  const interBold = await fetch(
    "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjp-Ek-_0ew.woff"
  ).then((res) => res.arrayBuffer())

  // Root Sedona OG (no ticker)
  if (!tickerParam) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", width: WIDTH, height: HEIGHT, background: SURFACE_DEFAULT, fontFamily: "Inter", position: "relative" }}>
          {/* Full background image */}
          <img
            src={`${baseUrl}/og-backgrounds/sedona-og-final.png`}
            width={WIDTH}
            height={HEIGHT}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Dark overlay */}
          <div style={{ display: "flex", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(180deg, rgba(20,19,16,0.3) 0%, rgba(20,19,16,0.7) 100%)" }} />

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", zIndex: 10 }}>
            <svg width={80} height={72} viewBox="0 0 20 18" fill="none">
              <path d={LOGOMARK_PATH} fill={SEDONA_ORANGE} />
            </svg>
            <span style={{ fontSize: 72, fontWeight: 700, color: TEXT_PRIMARY, marginTop: 24 }}>Sedona</span>
            <span style={{ fontSize: 28, color: TEXT_SECONDARY, marginTop: 12 }}>Trade AI Agents on Solana</span>
          </div>
        </div>
      ),
      {
        width: WIDTH,
        height: HEIGHT,
        fonts: [
          { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
          { name: "Inter", data: interBold, weight: 700, style: "normal" },
        ],
      }
    )
  }

  // Agent OG image
  const ticker = tickerParam.toUpperCase()
  const agent = AGENTS[ticker.toLowerCase()] || { name: `${ticker} Agent`, price: 0.01, change: 0, mcap: 10000, vol: 1000, holders: 50 }
  const up = agent.change >= 0
  const col = up ? GREEN : RED
  const bgIndex = hashTicker(ticker)
  const tintColor = TINT_COLORS[bgIndex % TINT_COLORS.length]

  // Chart dimensions - full width of right panel minus padding
  const chartW = 520
  const chartH = 280
  const path = genSparkline(ticker, up, chartW, chartH)

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: WIDTH, height: HEIGHT, background: SURFACE_DEFAULT, fontFamily: "Inter" }}>
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
            <span style={{ fontSize: 64, fontWeight: 700, color: TEXT_PRIMARY }}>{ticker[0]}</span>
          </div>
          <span style={{ fontSize: 48, fontWeight: 700, color: TEXT_PRIMARY, marginTop: 24, zIndex: 10 }}>${ticker}</span>
          <span style={{ fontSize: 20, color: TEXT_SECONDARY, marginTop: 8, zIndex: 10 }}>{agent.name}</span>
        </div>

        {/* Right Panel */}
        <div style={{ display: "flex", flexDirection: "column", width: "50%", height: "100%", padding: "32px 40px" }}>
          {/* Price Row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 14, color: TEXT_TERTIARY }}>Current Price</span>
              <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                <span style={{ fontSize: 44, fontWeight: 700, color: TEXT_PRIMARY }}>{fmt(agent.price)}</span>
                <span style={{ fontSize: 22, fontWeight: 600, color: col, marginLeft: 12 }}>{up ? "+" : ""}{agent.change.toFixed(2)}%</span>
              </div>
            </div>
            <div style={{ display: "flex", background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 14px" }}>
              <span style={{ fontSize: 14, color: TEXT_SECONDARY }}>24h</span>
            </div>
          </div>

          {/* Chart Container - Full width, chart aligned to bottom */}
          <div style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            background: SURFACE_ELEVATED,
            borderRadius: 12,
            marginTop: 16,
            marginBottom: 16,
            overflow: "hidden",
            position: "relative",
          }}>
            <svg
              width={chartW}
              height={chartH}
              viewBox={`0 0 ${chartW} ${chartH}`}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            >
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={col} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={col} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <path d={`${path} L${chartW},${chartH} L0,${chartH} Z`} fill="url(#chartFill)" />
              <path d={path} fill="none" stroke={col} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Stats Row */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 12, color: TEXT_TERTIARY }}>Market Cap</span>
              <span style={{ fontSize: 18, fontWeight: 600, color: TEXT_PRIMARY }}>{fmtNum(agent.mcap)}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: TEXT_TERTIARY }}>24h Volume</span>
              <span style={{ fontSize: 18, fontWeight: 600, color: TEXT_PRIMARY }}>{fmtNum(agent.vol)}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: 12, color: TEXT_TERTIARY }}>Holders</span>
              <span style={{ fontSize: 18, fontWeight: 600, color: TEXT_PRIMARY }}>{fmtHolders(agent.holders)}</span>
            </div>
          </div>

          {/* Footer with Sedona Logo */}
          <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12 }}>
            <svg width={28} height={25} viewBox="0 0 20 18" fill="none">
              <path d={LOGOMARK_PATH} fill={SEDONA_ORANGE} />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: TEXT_PRIMARY }}>Sedona</span>
              <span style={{ fontSize: 11, color: TEXT_TERTIARY }}>Trade AI Agents on Solana</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
    }
  )
}
