import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { getAgentOrDefault, getStaticChartData, formatPrice, formatPercentChange } from "@/fixtures"

export const runtime = "edge"

// OG Image dimensions
const WIDTH = 1200
const HEIGHT = 630

// Sedona brand color
const SEDONA_ORANGE = "#D56B12"
const SURFACE_DEFAULT = "#141310"
const SURFACE_ELEVATED = "#1e1c17"
const TEXT_PRIMARY = "#ffffff"
const TEXT_SECONDARY = "rgba(255,255,255,0.6)"
const TEXT_TERTIARY = "rgba(255,255,255,0.46)"
const GREEN = "#22c55e"
const RED = "#ef4444"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ticker = searchParams.get("ticker")?.toUpperCase() || "TEST"

    // Get agent data
    const agent = getAgentOrDefault(ticker.toLowerCase())

    // Get chart data for sparkline
    const chartData = getStaticChartData(ticker.toLowerCase(), "1d")
    const prices = chartData.slice(-24).map((d) => d.close) // Last 24 points

    // Calculate sparkline path
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice || 1
    const sparklineWidth = 380
    const sparklineHeight = 120
    const sparklinePath = prices
      .map((price, i) => {
        const x = (i / (prices.length - 1)) * sparklineWidth
        const y = sparklineHeight - ((price - minPrice) / priceRange) * sparklineHeight
        return `${i === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")

    const isPositive = agent.price_change_percent_in_24_hours >= 0
    const chartColor = isPositive ? GREEN : RED

    return new ImageResponse(
      (
        <div
          style={{
            width: WIDTH,
            height: HEIGHT,
            display: "flex",
            background: SURFACE_DEFAULT,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {/* Left Panel - Terminal Background with Agent Info */}
          <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              background: `linear-gradient(135deg, ${SURFACE_ELEVATED} 0%, ${SURFACE_DEFAULT} 100%)`,
              borderRight: `1px solid rgba(255,255,255,0.1)`,
            }}
          >
            {/* Terminal Grid Pattern */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.08,
                display: "flex",
                flexWrap: "wrap",
                overflow: "hidden",
              }}
            >
              {Array.from({ length: 200 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "40px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: SEDONA_ORANGE,
                    fontSize: "14px",
                    fontFamily: "monospace",
                  }}
                >
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>

            {/* Avatar Circle */}
            <div
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${SEDONA_ORANGE} 0%, #a85000 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 20px 60px rgba(213, 107, 18, 0.4)`,
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  fontSize: "72px",
                  fontWeight: "bold",
                  color: TEXT_PRIMARY,
                }}
              >
                {ticker[0]}
              </span>
            </div>

            {/* Ticker */}
            <div
              style={{
                fontSize: "56px",
                fontWeight: "bold",
                color: TEXT_PRIMARY,
                marginBottom: "12px",
              }}
            >
              ${ticker}
            </div>

            {/* Agent Name */}
            <div
              style={{
                fontSize: "24px",
                color: TEXT_SECONDARY,
                maxWidth: "400px",
                textAlign: "center",
              }}
            >
              {agent.name}
            </div>
          </div>

          {/* Right Panel - Chart and Stats */}
          <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "48px",
              background: SURFACE_DEFAULT,
            }}
          >
            {/* Price and Change */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  color: TEXT_TERTIARY,
                  marginBottom: "8px",
                }}
              >
                Current Price
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    color: TEXT_PRIMARY,
                  }}
                >
                  {formatPrice(agent.price_usd ?? 0)}
                </span>
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: isPositive ? GREEN : RED,
                  }}
                >
                  {formatPercentChange(agent.price_change_percent_in_24_hours)}
                </span>
              </div>
            </div>

            {/* Sparkline Chart */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: SURFACE_ELEVATED,
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "32px",
              }}
            >
              <svg
                width={sparklineWidth}
                height={sparklineHeight}
                viewBox={`0 0 ${sparklineWidth} ${sparklineHeight}`}
              >
                {/* Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y * sparklineHeight}
                    x2={sparklineWidth}
                    y2={y * sparklineHeight}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                ))}
                {/* Price line */}
                <path
                  d={sparklinePath}
                  fill="none"
                  stroke={chartColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Gradient fill */}
                <path
                  d={`${sparklinePath} L ${sparklineWidth} ${sparklineHeight} L 0 ${sparklineHeight} Z`}
                  fill={`url(#gradient-${isPositive ? "green" : "red"})`}
                />
                <defs>
                  <linearGradient id="gradient-green" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GREEN} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="gradient-red" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={RED} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={RED} stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Sedona Branding */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* Sedona Logomark */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: SEDONA_ORANGE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: TEXT_PRIMARY,
                    }}
                  >
                    S
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: TEXT_PRIMARY,
                    }}
                  >
                    Sedona
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: TEXT_TERTIARY,
                    }}
                  >
                    Trade AI Agents on Solana
                  </span>
                </div>
              </div>

              {/* 24h indicator */}
              <div
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.1)",
                  color: TEXT_SECONDARY,
                  fontSize: "14px",
                }}
              >
                24h
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: WIDTH,
        height: HEIGHT,
      }
    )
  } catch (error) {
    console.error("OG Image generation error:", error)
    return new Response("Failed to generate OG image", { status: 500 })
  }
}
