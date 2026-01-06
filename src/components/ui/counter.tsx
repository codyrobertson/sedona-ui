"use client"

import { MotionValue, motion, useSpring, useTransform } from "motion/react"
import * as React from "react"
import { cn } from "@/lib/utils"

type PlaceValue = number | "."

interface NumberProps {
  mv: MotionValue<number>
  number: number
  height: number
}

function AnimatedNumber({ mv, number, height }: NumberProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10
    const offset = (10 + number - placeValue) % 10
    let memo = offset * height
    if (offset > 5) {
      memo -= 10 * height
    }
    return memo
  })

  return (
    <motion.span
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        y,
      }}
    >
      {number}
    </motion.span>
  )
}

interface DigitProps {
  place: PlaceValue
  value: number
  height: number
  digitClassName?: string
}

// Static character component (no hooks needed)
function StaticChar({ char, height, digitClassName }: { char: string; height: number; digitClassName?: string }) {
  return (
    <span
      className={cn("relative inline-flex items-center justify-center", digitClassName)}
      style={{ height, width: "fit-content" }}
    >
      {char}
    </span>
  )
}

// Animated digit component (uses hooks)
function AnimatedDigit({ place, value, height, digitClassName }: { place: number; value: number; height: number; digitClassName?: string }) {
  const valueRoundedToPlace = Math.floor(value / place)
  const animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  })

  React.useEffect(() => {
    animatedValue.set(valueRoundedToPlace)
  }, [animatedValue, valueRoundedToPlace])

  return (
    <span
      className={cn("relative inline-flex overflow-hidden", digitClassName)}
      style={{
        height,
        position: "relative",
        width: "1ch",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <AnimatedNumber key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </span>
  )
}

function Digit({ place, value, height, digitClassName }: DigitProps) {
  // Decimal or special character - render static component
  if (place === ".") {
    return <StaticChar char="." height={height} digitClassName={digitClassName} />
  }

  // Number - render animated component
  return <AnimatedDigit place={place} value={value} height={height} digitClassName={digitClassName} />
}

export interface CounterProps {
  value: number
  fontSize?: number
  padding?: number
  places?: PlaceValue[]
  gap?: number
  textColor?: string
  fontWeight?: React.CSSProperties["fontWeight"]
  className?: string
  digitClassName?: string
  prefix?: string
  suffix?: string
  showGradient?: boolean
  gradientColor?: string
}

export function Counter({
  value,
  fontSize = 16,
  padding = 0,
  places,
  gap = 0,
  textColor = "inherit",
  fontWeight = "inherit",
  className,
  digitClassName,
  prefix,
  suffix,
  showGradient = false,
  gradientColor = "black",
}: CounterProps) {
  // Auto-detect places if not provided
  const computedPlaces = React.useMemo(() => {
    if (places) return places
    const valueStr = value.toString()
    return Array.from(valueStr).map((ch, i, a) => {
      if (ch === ".") return "."
      const dotIndex = a.indexOf(".")
      const isInteger = dotIndex === -1
      const exponent = isInteger
        ? a.length - i - 1
        : i < dotIndex
          ? dotIndex - i - 1
          : -(i - dotIndex)
      return Math.pow(10, exponent)
    }) as PlaceValue[]
  }, [places, value])

  const height = fontSize + padding

  return (
    <span className={cn("relative inline-flex items-center", className)}>
      {prefix && (
        <span style={{ fontSize, color: textColor, fontWeight }}>{prefix}</span>
      )}
      <span
        className="relative inline-block"
        style={{
          fontSize,
          display: "flex",
          gap,
          overflow: "hidden",
          lineHeight: 1,
          color: textColor,
          fontWeight,
        }}
      >
        <span className="flex" style={{ gap }}>
          {computedPlaces.map((place, index) => (
            <Digit
              key={`${place}-${index}`}
              place={place}
              value={value}
              height={height}
              digitClassName={digitClassName}
            />
          ))}
        </span>
        {showGradient && (
          <span
            className="pointer-events-none absolute inset-0 flex flex-col justify-between"
            aria-hidden
          >
            <span
              style={{
                height: 8,
                background: `linear-gradient(to bottom, ${gradientColor}, transparent)`,
              }}
            />
            <span
              style={{
                height: 8,
                background: `linear-gradient(to top, ${gradientColor}, transparent)`,
              }}
            />
          </span>
        )}
      </span>
      {suffix && (
        <span style={{ fontSize, color: textColor, fontWeight }}>{suffix}</span>
      )}
    </span>
  )
}

// Specialized variants for common use cases
export interface TimeCounterProps {
  seconds: number
  fontSize?: number
  className?: string
  textColor?: string
}

export function TimeCounter({
  seconds,
  fontSize = 16,
  className,
  textColor = "inherit",
}: TimeCounterProps) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <span className={cn("inline-flex items-center font-mono", className)}>
      <Counter
        value={minutes}
        fontSize={fontSize}
        textColor={textColor}
        places={minutes >= 10 ? [10, 1] : [1]}
        fontWeight={600}
      />
      <span style={{ fontSize, color: textColor, fontWeight: 600 }}>m </span>
      <Counter
        value={secs}
        fontSize={fontSize}
        textColor={textColor}
        places={[10, 1]}
        fontWeight={600}
      />
      <span style={{ fontSize, color: textColor, fontWeight: 600 }}>s</span>
    </span>
  )
}

export interface CurrencyCounterProps {
  value: number
  fontSize?: number
  className?: string
  textColor?: string
  currency?: string
}

export function CurrencyCounter({
  value,
  fontSize = 16,
  className,
  textColor = "inherit",
  currency = "$",
}: CurrencyCounterProps) {
  return (
    <span className={cn("inline-flex items-center font-semibold", className)}>
      <span style={{ fontSize, color: textColor }}>{currency}</span>
      <Counter
        value={value}
        fontSize={fontSize}
        textColor={textColor}
        fontWeight={600}
      />
    </span>
  )
}
