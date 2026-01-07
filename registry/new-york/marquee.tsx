"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ============================================================================
// MARQUEE - GPU-accelerated infinite scroll component
// ============================================================================

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Speed in pixels per second */
  speed?: number
  /** Direction of scroll */
  direction?: "left" | "right"
  /** Pause animation on hover */
  pauseOnHover?: boolean
  /** Gap between repeated content */
  gap?: number
  /** Number of content clones for seamless loop */
  repeat?: number
  /** Start paused */
  paused?: boolean
  /** Fade edges with gradient */
  fade?: boolean
  /** Fade width in pixels */
  fadeWidth?: number
  /** Gradient color (should match background) */
  fadeColor?: string
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({
    children,
    speed = 50,
    direction = "left",
    pauseOnHover = true,
    gap = 24,
    repeat = 3,
    paused = false,
    fade = true,
    fadeWidth = 32,
    fadeColor = "hsl(var(--background))",
    className,
    style,
    ...props
  }, ref) => {
    const scrollerRef = React.useRef<HTMLDivElement>(null)
    const [contentWidth, setContentWidth] = React.useState(0)
    const [isHovered, setIsHovered] = React.useState(false)
    const animationRef = React.useRef<number>(0)
    const positionRef = React.useRef(0)
    const lastTimeRef = React.useRef(0)

    React.useEffect(() => {
      const scroller = scrollerRef.current
      if (!scroller) return

      const measureWidth = () => {
        const firstChild = scroller.children[0] as HTMLElement
        if (firstChild) {
          setContentWidth(firstChild.scrollWidth + gap)
        }
      }

      requestAnimationFrame(measureWidth)

      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(measureWidth)
      })
      resizeObserver.observe(scroller)

      return () => resizeObserver.disconnect()
    }, [gap, children])

    React.useEffect(() => {
      if (!contentWidth || paused || (pauseOnHover && isHovered)) {
        lastTimeRef.current = 0
        return
      }

      const animate = (timestamp: number) => {
        if (!lastTimeRef.current) {
          lastTimeRef.current = timestamp
        }

        const deltaTime = timestamp - lastTimeRef.current
        lastTimeRef.current = timestamp

        const cappedDelta = Math.min(deltaTime, 100)
        const movement = (speed * cappedDelta) / 1000

        if (direction === "left") {
          positionRef.current -= movement
          while (positionRef.current <= -contentWidth) {
            positionRef.current += contentWidth
          }
        } else {
          positionRef.current += movement
          while (positionRef.current >= 0) {
            positionRef.current -= contentWidth
          }
        }

        if (scrollerRef.current) {
          scrollerRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`
        }

        animationRef.current = requestAnimationFrame(animate)
      }

      if (direction === "right" && positionRef.current === 0) {
        positionRef.current = -contentWidth
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [contentWidth, speed, direction, paused, pauseOnHover, isHovered])

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {fade && (
          <div
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: fadeWidth,
              background: `linear-gradient(to right, ${fadeColor}, transparent)`,
            }}
          />
        )}

        <div
          ref={scrollerRef}
          className="flex will-change-transform"
          style={{
            gap,
            transform: "translate3d(0, 0, 0)",
          }}
        >
          {Array.from({ length: repeat }).map((_, i) => (
            <div
              key={i}
              className="flex shrink-0"
              style={{ gap }}
              aria-hidden={i > 0}
            >
              {children}
            </div>
          ))}
        </div>

        {fade && (
          <div
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: fadeWidth,
              background: `linear-gradient(to left, ${fadeColor}, transparent)`,
            }}
          />
        )}
      </div>
    )
  }
)
Marquee.displayName = "Marquee"

// ============================================================================
// MARQUEE ITEM
// ============================================================================

export interface MarqueeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const MarqueeItem = React.forwardRef<HTMLDivElement, MarqueeItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-shrink-0", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
MarqueeItem.displayName = "MarqueeItem"

// ============================================================================
// VERTICAL MARQUEE
// ============================================================================

export interface VerticalMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  speed?: number
  direction?: "up" | "down"
  pauseOnHover?: boolean
  gap?: number
  repeat?: number
  paused?: boolean
  fade?: boolean
  fadeHeight?: number
  fadeColor?: string
}

const VerticalMarquee = React.forwardRef<HTMLDivElement, VerticalMarqueeProps>(
  ({
    children,
    speed = 30,
    direction = "up",
    pauseOnHover = true,
    gap = 16,
    repeat = 3,
    paused = false,
    fade = true,
    fadeHeight = 24,
    fadeColor = "hsl(var(--background))",
    className,
    style,
    ...props
  }, ref) => {
    const scrollerRef = React.useRef<HTMLDivElement>(null)
    const [contentHeight, setContentHeight] = React.useState(0)
    const [isHovered, setIsHovered] = React.useState(false)
    const animationRef = React.useRef<number>(0)
    const positionRef = React.useRef(0)
    const lastTimeRef = React.useRef(0)

    React.useEffect(() => {
      const scroller = scrollerRef.current
      if (!scroller) return

      const measureHeight = () => {
        const firstChild = scroller.children[0] as HTMLElement
        if (firstChild) {
          setContentHeight(firstChild.offsetHeight + gap)
        }
      }

      measureHeight()

      const resizeObserver = new ResizeObserver(measureHeight)
      resizeObserver.observe(scroller)

      return () => resizeObserver.disconnect()
    }, [gap, children])

    React.useEffect(() => {
      if (!contentHeight || paused || (pauseOnHover && isHovered)) {
        lastTimeRef.current = 0
        return
      }

      const animate = (timestamp: number) => {
        if (!lastTimeRef.current) {
          lastTimeRef.current = timestamp
        }

        const deltaTime = timestamp - lastTimeRef.current
        lastTimeRef.current = timestamp

        const movement = (speed * deltaTime) / 1000
        const directionMultiplier = direction === "up" ? -1 : 1

        positionRef.current += movement * directionMultiplier

        if (direction === "up" && positionRef.current <= -contentHeight) {
          positionRef.current += contentHeight
        } else if (direction === "down" && positionRef.current >= contentHeight) {
          positionRef.current -= contentHeight
        }

        if (scrollerRef.current) {
          scrollerRef.current.style.transform = `translate3d(0, ${positionRef.current}px, 0)`
        }

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [contentHeight, speed, direction, paused, pauseOnHover, isHovered])

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {fade && (
          <div
            className="absolute left-0 right-0 top-0 z-10 pointer-events-none"
            style={{
              height: fadeHeight,
              background: `linear-gradient(to bottom, ${fadeColor}, transparent)`,
            }}
          />
        )}

        <div
          ref={scrollerRef}
          className="flex flex-col will-change-transform"
          style={{
            gap,
            transform: "translate3d(0, 0, 0)",
          }}
        >
          {Array.from({ length: repeat }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col shrink-0"
              style={{ gap }}
              aria-hidden={i > 0}
            >
              {children}
            </div>
          ))}
        </div>

        {fade && (
          <div
            className="absolute left-0 right-0 bottom-0 z-10 pointer-events-none"
            style={{
              height: fadeHeight,
              background: `linear-gradient(to top, ${fadeColor}, transparent)`,
            }}
          />
        )}
      </div>
    )
  }
)
VerticalMarquee.displayName = "VerticalMarquee"

export { Marquee, MarqueeItem, VerticalMarquee }
