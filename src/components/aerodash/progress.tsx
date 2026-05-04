"use client"

import * as React from "react"
import * as RadixProgress from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./progress.css"

/**
 * Progress — y2k bar + circular variants. Both support determinate (`value`)
 * and indeterminate (`value={null}`) modes.
 *
 *   <ProgressBar value={62} max={100} />
 *   <ProgressBar value={null} />            indeterminate
 *   <ProgressCircle value={75} size={64} />
 */

// ─── Bar ────────────────────────────────────────────────────────────────────

const BAR_SIZE_DIMS = {
  sm: 10,
  md: 14,
  lg: 20,
} as const
type BarSize = keyof typeof BAR_SIZE_DIMS

export interface ProgressBarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixProgress.Root>, "value"> {
  value?: number | null
  max?: number
  size?: BarSize
  /** Visual fill color. Defaults to ink (matches form-control active state). */
  tone?: "ink" | "cyan" | "green" | "warn" | "pink"
  /** Renders the % value inside the well on the right edge. Default false. */
  showValue?: boolean
}

const TONE_FILL: Record<NonNullable<ProgressBarProps["tone"]>, string> = {
  ink: colors.ink,
  cyan: colors.cyan,
  green: colors.green,
  warn: colors.warn,
  pink: colors.pink,
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { className, value, max = 100, size = "md", tone = "ink", showValue = false, style, ...props },
  ref,
) {
  const indeterminate = value == null
  const pct = indeterminate ? 0 : Math.max(0, Math.min(100, (value / max) * 100))
  const height = BAR_SIZE_DIMS[size]
  const innerHeight = height - 4
  return (
    <RadixProgress.Root
      ref={ref}
      data-ad-progress-bar=""
      data-indeterminate={indeterminate ? "" : undefined}
      data-tone={tone}
      value={indeterminate ? null : value}
      max={max}
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        height,
        background: colors.canvas,
        border: `1.5px solid ${colors.ink}`,
        borderRadius: radii.sm,
        boxShadow: `1px 1px 0 ${colors.ink}`,
        padding: 1,
        ...style,
      }}
      {...props}
    >
      <RadixProgress.Indicator
        data-ad-progress-bar-indicator=""
        className="relative"
        style={{
          height: innerHeight,
          background: TONE_FILL[tone],
          borderRadius: 1,
          width: indeterminate ? "40%" : `${pct}%`,
          transition: indeterminate ? undefined : "width 250ms cubic-bezier(.2,.7,.3,1)",
        }}
      />
      {showValue && !indeterminate ? (
        <span
          aria-hidden
          style={{
            position: "absolute",
            right: 6,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 9,
            fontWeight: 950,
            letterSpacing: "0.06em",
            color: pct > 50 ? colors.paper : colors.ink,
            mixBlendMode: "difference",
            pointerEvents: "none",
          }}
        >
          {Math.round(pct)}%
        </span>
      ) : null}
    </RadixProgress.Root>
  )
})

// ─── Circle ─────────────────────────────────────────────────────────────────

const CIRCLE_SIZE_PX = { sm: 44, md: 64, lg: 96 } as const
type CircleSizeKey = keyof typeof CIRCLE_SIZE_PX

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLSpanElement> {
  value?: number | null
  max?: number
  /** Pixel size or named scale (sm=44, md=64, lg=96). */
  size?: number | CircleSizeKey
  strokeWidth?: number
  tone?: NonNullable<ProgressBarProps["tone"]>
  /** Centered label. Pass `false` to suppress; default shows "%" for determinate. */
  label?: React.ReactNode | false
  /** Wraps the ring in a chrome bezel (1.5px ink ring + offset shadow). Default true. */
  bezel?: boolean
}

export const ProgressCircle = React.forwardRef<HTMLSpanElement, ProgressCircleProps>(
  function ProgressCircle(
    {
      className,
      value,
      max = 100,
      size = "md",
      strokeWidth,
      tone = "ink",
      label,
      bezel = true,
      style,
      ...props
    },
    ref,
  ) {
    const indeterminate = value == null
    const pct = indeterminate ? 0 : Math.max(0, Math.min(100, (value / max) * 100))
    const sizePx = typeof size === "number" ? size : CIRCLE_SIZE_PX[size]
    // Beefy stroke — about 1/6 of size — for the y2k mechanical-gauge read.
    const sw = strokeWidth ?? Math.max(6, Math.round(sizePx / 6))
    // Tight inset so the ring nearly kisses the bezel.
    const inset = bezel ? 4 : sw / 2
    const innerSize = sizePx - inset * 2
    const radius = (innerSize - sw) / 2
    const cx = sizePx / 2
    const circumference = 2 * Math.PI * radius
    const dashOffset = indeterminate ? circumference * 0.7 : circumference * (1 - pct / 100)

    const computedLabel =
      label === false
        ? null
        : label != null
          ? label
          : indeterminate
            ? null
            : `${Math.round(pct)}%`

    return (
      <span
        ref={ref}
        data-ad-progress-circle=""
        data-indeterminate={indeterminate ? "" : undefined}
        data-tone={tone}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemax={max}
        className={cn("relative inline-grid place-items-center", className)}
        style={{
          width: sizePx,
          height: sizePx,
          background: colors.paper,
          border: bezel ? `1.5px solid ${colors.ink}` : "none",
          borderRadius: radii.pill,
          boxShadow: bezel ? `1px 1px 0 ${colors.ink}` : undefined,
          ...style,
        }}
        {...props}
      >
        <svg width={sizePx} height={sizePx} viewBox={`0 0 ${sizePx} ${sizePx}`}>
          <circle
            cx={cx}
            cy={cx}
            r={radius}
            fill="none"
            stroke={colors.lineSoft}
            strokeWidth={sw}
          />
          <circle
            data-ad-progress-circle-indicator=""
            cx={cx}
            cy={cx}
            r={radius}
            fill="none"
            stroke={TONE_FILL[tone]}
            strokeWidth={sw}
            strokeLinecap="butt"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${cx} ${cx})`}
            style={{
              transition: indeterminate ? undefined : "stroke-dashoffset 300ms cubic-bezier(.2,.7,.3,1)",
            }}
          />
        </svg>
        {computedLabel != null ? (
          <span
            className="absolute inset-0 grid place-items-center font-[950] uppercase tracking-[0.02em]"
            style={{
              fontSize: Math.max(10, Math.floor(sizePx / 4.5)),
              color: colors.ink,
              lineHeight: 1,
            }}
          >
            {computedLabel}
          </span>
        ) : null}
      </span>
    )
  },
)
