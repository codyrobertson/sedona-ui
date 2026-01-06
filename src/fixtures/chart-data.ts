import type { CandlestickData, Time } from "lightweight-charts"

/**
 * Realistic OHLC data - meme coin pump pattern
 * Used for demo charts showing typical price action
 */
export const MEME_COIN_CHART_DATA: CandlestickData<Time>[] = [
  // Early accumulation phase - low volume, sideways
  { time: '2024-11-01' as Time, open: 0.00021, high: 0.00024, low: 0.00019, close: 0.00022 },
  { time: '2024-11-02' as Time, open: 0.00022, high: 0.00023, low: 0.00020, close: 0.00021 },
  { time: '2024-11-03' as Time, open: 0.00021, high: 0.00025, low: 0.00020, close: 0.00024 },
  { time: '2024-11-04' as Time, open: 0.00024, high: 0.00026, low: 0.00022, close: 0.00023 },
  { time: '2024-11-05' as Time, open: 0.00023, high: 0.00024, low: 0.00021, close: 0.00022 },
  { time: '2024-11-06' as Time, open: 0.00022, high: 0.00023, low: 0.00019, close: 0.00020 },
  { time: '2024-11-07' as Time, open: 0.00020, high: 0.00022, low: 0.00018, close: 0.00021 },
  // First pump starts
  { time: '2024-11-08' as Time, open: 0.00021, high: 0.00028, low: 0.00020, close: 0.00027 },
  { time: '2024-11-09' as Time, open: 0.00027, high: 0.00035, low: 0.00025, close: 0.00033 },
  { time: '2024-11-10' as Time, open: 0.00033, high: 0.00042, low: 0.00031, close: 0.00039 },
  { time: '2024-11-11' as Time, open: 0.00039, high: 0.00045, low: 0.00036, close: 0.00041 },
  // Pullback
  { time: '2024-11-12' as Time, open: 0.00041, high: 0.00043, low: 0.00032, close: 0.00034 },
  { time: '2024-11-13' as Time, open: 0.00034, high: 0.00038, low: 0.00030, close: 0.00036 },
  { time: '2024-11-14' as Time, open: 0.00036, high: 0.00039, low: 0.00033, close: 0.00035 },
  // Consolidation
  { time: '2024-11-15' as Time, open: 0.00035, high: 0.00038, low: 0.00034, close: 0.00037 },
  { time: '2024-11-16' as Time, open: 0.00037, high: 0.00040, low: 0.00035, close: 0.00038 },
  { time: '2024-11-17' as Time, open: 0.00038, high: 0.00041, low: 0.00036, close: 0.00039 },
  // Second leg up
  { time: '2024-11-18' as Time, open: 0.00039, high: 0.00048, low: 0.00038, close: 0.00046 },
  { time: '2024-11-19' as Time, open: 0.00046, high: 0.00055, low: 0.00044, close: 0.00052 },
  { time: '2024-11-20' as Time, open: 0.00052, high: 0.00058, low: 0.00049, close: 0.00054 },
  { time: '2024-11-21' as Time, open: 0.00054, high: 0.00062, low: 0.00052, close: 0.00059 },
  { time: '2024-11-22' as Time, open: 0.00059, high: 0.00068, low: 0.00057, close: 0.00065 },
  // Minor dip
  { time: '2024-11-23' as Time, open: 0.00065, high: 0.00067, low: 0.00058, close: 0.00060 },
  { time: '2024-11-24' as Time, open: 0.00060, high: 0.00064, low: 0.00056, close: 0.00062 },
  // Rally continues
  { time: '2024-11-25' as Time, open: 0.00062, high: 0.00072, low: 0.00060, close: 0.00070 },
  { time: '2024-11-26' as Time, open: 0.00070, high: 0.00078, low: 0.00068, close: 0.00075 },
  { time: '2024-11-27' as Time, open: 0.00075, high: 0.00082, low: 0.00073, close: 0.00079 },
  { time: '2024-11-28' as Time, open: 0.00079, high: 0.00088, low: 0.00076, close: 0.00085 },
  { time: '2024-11-29' as Time, open: 0.00085, high: 0.00092, low: 0.00082, close: 0.00089 },
  { time: '2024-11-30' as Time, open: 0.00089, high: 0.00095, low: 0.00086, close: 0.00091 },
  // December - major pump
  { time: '2024-12-01' as Time, open: 0.00091, high: 0.00098, low: 0.00088, close: 0.00096 },
  { time: '2024-12-02' as Time, open: 0.00096, high: 0.00105, low: 0.00094, close: 0.00102 },
  { time: '2024-12-03' as Time, open: 0.00102, high: 0.00112, low: 0.00100, close: 0.00108 },
  { time: '2024-12-04' as Time, open: 0.00108, high: 0.00118, low: 0.00105, close: 0.00115 },
  { time: '2024-12-05' as Time, open: 0.00115, high: 0.00125, low: 0.00112, close: 0.00120 },
  { time: '2024-12-06' as Time, open: 0.00120, high: 0.00128, low: 0.00116, close: 0.00118 },
  { time: '2024-12-07' as Time, open: 0.00118, high: 0.00124, low: 0.00110, close: 0.00114 },
  { time: '2024-12-08' as Time, open: 0.00114, high: 0.00122, low: 0.00112, close: 0.00119 },
  // Parabolic move
  { time: '2024-12-09' as Time, open: 0.00119, high: 0.00135, low: 0.00117, close: 0.00132 },
  { time: '2024-12-10' as Time, open: 0.00132, high: 0.00148, low: 0.00130, close: 0.00145 },
  { time: '2024-12-11' as Time, open: 0.00145, high: 0.00158, low: 0.00142, close: 0.00152 },
  { time: '2024-12-12' as Time, open: 0.00152, high: 0.00165, low: 0.00148, close: 0.00160 },
  { time: '2024-12-13' as Time, open: 0.00160, high: 0.00172, low: 0.00155, close: 0.00168 },
  { time: '2024-12-14' as Time, open: 0.00168, high: 0.00178, low: 0.00162, close: 0.00170 },
  { time: '2024-12-15' as Time, open: 0.00170, high: 0.00175, low: 0.00158, close: 0.00162 },
  { time: '2024-12-16' as Time, open: 0.00162, high: 0.00168, low: 0.00155, close: 0.00165 },
  { time: '2024-12-17' as Time, open: 0.00165, high: 0.00175, low: 0.00162, close: 0.00172 },
  { time: '2024-12-18' as Time, open: 0.00172, high: 0.00185, low: 0.00170, close: 0.00180 },
  { time: '2024-12-19' as Time, open: 0.00180, high: 0.00195, low: 0.00178, close: 0.00188 },
  { time: '2024-12-20' as Time, open: 0.00188, high: 0.00198, low: 0.00182, close: 0.00192 },
  { time: '2024-12-21' as Time, open: 0.00192, high: 0.00205, low: 0.00188, close: 0.00200 },
]

/**
 * Chart color configuration for candlestick charts
 */
export const CHART_COLORS = {
  up: '#26a69a',
  down: '#ef5350',
  grid: 'rgba(255, 255, 255, 0.05)',
  text: 'rgba(255, 255, 255, 0.5)',
  crosshair: 'rgba(255, 255, 255, 0.2)',
  border: 'rgba(255, 255, 255, 0.1)',
} as const

export type ChartTimeframe = "1m" | "5m" | "1h" | "1d"

/**
 * Generate intraday candle data based on daily data
 * Creates realistic minute/5min/hourly candles from daily OHLC
 */
function generateIntradayCandles(
  dailyData: CandlestickData<Time>[],
  candlesPerDay: number,
  lastNCandlesDays: number = 1
): CandlestickData<Time>[] {
  // Take last N days of data
  const recentDays = dailyData.slice(-lastNCandlesDays)
  const candles: CandlestickData<Time>[] = []

  for (const day of recentDays) {
    const dayOpen = day.open
    const dayClose = day.close
    const dayHigh = day.high
    const dayLow = day.low
    const dayRange = dayHigh - dayLow

    // Generate candles for this day
    for (let i = 0; i < candlesPerDay; i++) {
      const progress = i / candlesPerDay
      const nextProgress = (i + 1) / candlesPerDay

      // Interpolate price with some noise
      const basePrice = dayOpen + (dayClose - dayOpen) * progress
      const nextBasePrice = dayOpen + (dayClose - dayOpen) * nextProgress

      // Add volatility
      const noise = () => (Math.random() - 0.5) * dayRange * 0.3
      const open = basePrice + noise()
      const close = nextBasePrice + noise()
      const high = Math.max(open, close) + Math.abs(noise()) * 0.5
      const low = Math.min(open, close) - Math.abs(noise()) * 0.5

      // Create timestamp (use index as time for simplicity)
      const timestamp = candles.length

      candles.push({
        time: timestamp as unknown as Time,
        open: Math.max(open, dayLow),
        high: Math.min(high, dayHigh),
        low: Math.max(low, dayLow),
        close: Math.max(Math.min(close, dayHigh), dayLow),
      })
    }
  }

  return candles.slice(-60) // Return last 60 candles
}

/**
 * Get chart data filtered by timeframe
 *
 * @param timeframe - The chart timeframe
 * @returns Candlestick data appropriate for the timeframe
 *
 * Timeframe mappings:
 * - 1m: ~60 candles representing 1 hour of 1-minute data
 * - 5m: ~60 candles representing 5 hours of 5-minute data
 * - 1h: ~24 candles representing 1 day of hourly data
 * - 1d: Full dataset (~60 days of daily data)
 */
export function getChartDataByTimeframe(
  timeframe: ChartTimeframe
): CandlestickData<Time>[] {
  switch (timeframe) {
    case "1m":
      // Generate 60 one-minute candles from last day's data
      return generateIntradayCandles(MEME_COIN_CHART_DATA, 60, 1)

    case "5m":
      // Generate 60 five-minute candles from last 5 days
      return generateIntradayCandles(MEME_COIN_CHART_DATA, 12, 5)

    case "1h":
      // Generate 24 hourly candles from last few days
      return generateIntradayCandles(MEME_COIN_CHART_DATA, 24, 3).slice(-24)

    case "1d":
    default:
      // Return full daily dataset
      return MEME_COIN_CHART_DATA
  }
}
