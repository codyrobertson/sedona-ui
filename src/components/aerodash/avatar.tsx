"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"

/**
 * Avatar — y2k user/entity glyph. Renders an image, a text fallback (initials),
 * or both with image fallback to text on load failure. Optional status dot.
 *
 *   <Avatar src="/u.png" alt="Cody" fallback="CR" />
 *   <Avatar fallback="MR" status="online" />
 *   <Avatar size="lg" shape="square" fallback="A" />
 */

const SIZE_DIMS = {
  xs: { box: 20, fontSize: 8,  dot: 5 },
  sm: { box: 26, fontSize: 9,  dot: 6 },
  md: { box: 32, fontSize: 11, dot: 8 },
  lg: { box: 42, fontSize: 14, dot: 10 },
  xl: { box: 56, fontSize: 18, dot: 12 },
} as const
type SizeKey = keyof typeof SIZE_DIMS

type StatusKey = "online" | "offline" | "busy" | "away"
const STATUS_COLOR: Record<StatusKey, string> = {
  online: colors.green,
  offline: colors.muted,
  busy: colors.pink,
  away: colors.warn,
}

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  src?: string
  alt?: string
  fallback?: string
  size?: SizeKey
  shape?: "circle" | "square"
  status?: StatusKey
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { className, src, alt, fallback, size = "md", shape = "circle", status, style, ...props },
  ref,
) {
  const dim = SIZE_DIMS[size]
  const [errored, setErrored] = React.useState(false)
  const showImage = src && !errored

  return (
    <span
      ref={ref}
      data-ad-avatar=""
      className={cn("relative inline-grid place-items-center overflow-visible", className)}
      style={{
        width: dim.box,
        height: dim.box,
        fontSize: dim.fontSize,
        ...style,
      }}
      {...props}
    >
      <span
        className="block overflow-hidden grid place-items-center font-[950] uppercase"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: shape === "circle" ? radii.pill : radii.sm,
          border: `1.5px solid ${colors.ink}`,
          background: showImage ? colors.paper : colors.ink,
          color: showImage ? colors.ink : colors.paper,
          letterSpacing: "0.02em",
        }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? fallback ?? ""}
            onError={() => setErrored(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          (fallback ?? "?").slice(0, 2)
        )}
      </span>
      {status ? (
        <span
          data-ad-avatar-status=""
          aria-label={status}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: dim.dot,
            height: dim.dot,
            borderRadius: radii.pill,
            background: STATUS_COLOR[status],
            border: `1.5px solid ${colors.paper}`,
          }}
        />
      ) : null}
    </span>
  )
})
