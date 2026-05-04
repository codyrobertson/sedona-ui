"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { colors, fonts, fontSize, fontWeight, letterSpacing, lineHeight } from "./tokens"

/**
 * TitleBlock — y2k page header strip. Mirrors aerodash_preview .top-shell.
 *
 *   <TitleBlockRoot>
 *     <BoardNum>01</BoardNum>
 *     <TitleBlockBody title="Shell, Navigation & Layout" subtitle="Board 01 of 10" />
 *     <BrandBlock build="internal build v0.9.7">AeroDash OS</BrandBlock>
 *     <StatusBlock online user="DASHER_01" />
 *   </TitleBlockRoot>
 *
 * Or shorthand:
 *   <TitleBlock board="01" title="Tables" subtitle="Board 05 of 10" brand="AeroDash OS" />
 */

const DISPLAY = fonts.display

// ─── Root ───────────────────────────────────────────────────────────────────

export interface TitleBlockRootProps extends React.HTMLAttributes<HTMLElement> {}

export const TitleBlockRoot = React.forwardRef<HTMLElement, TitleBlockRootProps>(
  function TitleBlockRoot({ className, style, children, ...props }, ref) {
    return (
      <header
        ref={ref}
        data-ad-titleblock=""
        className={cn("grid items-stretch", className)}
        style={{
          // Tighter columns: board (auto), title (flex), brand (auto), status (auto).
          gridTemplateColumns: "auto minmax(320px, 1fr) auto auto",
          height: 64,
          background: "#000",
          color: "#fff",
          borderBottom: "1px solid #1b2532",
          ...style,
        }}
        {...props}
      >
        {children}
      </header>
    )
  },
)

// ─── BoardNum ───────────────────────────────────────────────────────────────

export interface BoardNumProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BoardNum = React.forwardRef<HTMLDivElement, BoardNumProps>(function BoardNum(
  { className, style, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-titleblock-num=""
      className={cn("grid place-items-center", className)}
      style={{
        width: 64,
        borderRight: "1px solid #273342",
        fontFamily: DISPLAY,
        fontWeight: fontWeight.black,
        fontSize: 28,
        lineHeight: lineHeight.tight,
        letterSpacing: letterSpacing.wide,
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
})

// ─── Body (chevron-clipped title slab) ──────────────────────────────────────

export interface TitleBlockBodyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  subtitle?: React.ReactNode
}

export const TitleBlockBody = React.forwardRef<HTMLDivElement, TitleBlockBodyProps>(
  function TitleBlockBody({ className, style, title, subtitle, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-ad-titleblock-body=""
        className={cn("relative flex flex-col justify-center", className)}
        style={{
          padding: "0 28px 0 22px",
          background: "#06080d",
          clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)",
          ...style,
        }}
        {...props}
      >
        {title ? (
          <h1
            className="m-0 uppercase"
            style={{
              fontFamily: DISPLAY,
              fontWeight: fontWeight.black,
              fontSize: fontSize.xl,
              lineHeight: lineHeight.tight,
              letterSpacing: letterSpacing.wide,
              // Long board titles truncate before they punch through the
              // chevron clip-path on the right edge.
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </h1>
        ) : null}
        {subtitle ? (
          <div
            className="uppercase"
            style={{
              marginTop: 5,
              color: colors.cyan,
              fontSize: fontSize.xs,
              fontWeight: fontWeight.black,
              letterSpacing: letterSpacing.wider,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {subtitle}
          </div>
        ) : null}
        {children}
      </div>
    )
  },
)

// ─── BrandBlock ─────────────────────────────────────────────────────────────

export interface BrandBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  build?: React.ReactNode
  /** Renders the cyan ornamental hood. Default false (clean look). */
  ornate?: boolean
}

export const BrandBlock = React.forwardRef<HTMLDivElement, BrandBlockProps>(function BrandBlock(
  { className, style, build, ornate = false, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-titleblock-brand=""
      className={cn("relative flex flex-col justify-center", className)}
      style={{
        minWidth: 220,
        padding: "0 18px",
        borderLeft: "1px solid #1f2937",
        ...style,
      }}
      {...props}
    >
      {ornate ? (
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: "6px 10px auto 34px",
            height: 32,
            border: `1px solid ${colors.cyan}`,
            borderBottom: 0,
            opacity: 0.45,
            clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
      ) : null}
      <div
        className="relative italic"
        style={{
          color: colors.cyan,
          fontFamily: DISPLAY,
          fontWeight: fontWeight.black,
          fontStyle: "italic",
          fontSize: fontSize.xl,
          lineHeight: 0.9,
          // Brand can be long ("AeroDash Operations") — let it elide.
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </div>
      {build ? (
        <div
          className="relative"
          style={{
            color: "#9aa3af",
            fontSize: fontSize.micro,
            marginTop: 4,
            letterSpacing: "0.02em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {build}
        </div>
      ) : null}
    </div>
  )
})

// ─── StatusBlock ────────────────────────────────────────────────────────────

export interface StatusBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  online?: boolean
  user?: React.ReactNode
}

export const StatusBlock = React.forwardRef<HTMLDivElement, StatusBlockProps>(function StatusBlock(
  { className, style, online = true, user, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-ad-titleblock-status=""
      className={cn("flex items-center uppercase", className)}
      style={{
        padding: "0 16px",
        borderLeft: "1px solid #273342",
        gap: 12,
        fontSize: fontSize.xs,
        ...style,
      }}
      {...props}
    >
      {children ?? (
        <>
          <span
            aria-hidden
            title={online ? "Online" : "Offline"}
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: online ? colors.green : colors.muted,
              boxShadow: online ? "0 0 0 1px rgba(34, 214, 111, 0.22)" : undefined,
              flexShrink: 0,
            }}
          />
          {user ? (
            <div
              className="flex items-center font-[800]"
              style={{
                height: 28,
                border: "1px solid #687385",
                borderRadius: 5,
                padding: "0 10px",
                gap: 8,
                color: "#e5e7eb",
                background: "#06080d",
              }}
            >
              <span style={{ color: "#9aa3af", fontWeight: 700 }}>USR</span>
              <span>{user}</span>
              <span style={{ color: "#9aa3af" }}>⌄</span>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
})

// ─── Convenience: <TitleBlock> ──────────────────────────────────────────────

export interface TitleBlockProps extends Omit<TitleBlockRootProps, "title"> {
  board?: React.ReactNode
  title?: React.ReactNode
  subtitle?: React.ReactNode
  brand?: React.ReactNode
  build?: React.ReactNode
  user?: React.ReactNode
  online?: boolean
}

export const TitleBlock = React.forwardRef<HTMLElement, TitleBlockProps>(function TitleBlock(
  { board, title, subtitle, brand, build, user, online = true, children, ...rootProps },
  ref,
) {
  return (
    <TitleBlockRoot ref={ref} {...rootProps}>
      {board != null ? <BoardNum>{board}</BoardNum> : <span aria-hidden />}
      <TitleBlockBody title={title} subtitle={subtitle} />
      {brand != null ? <BrandBlock build={build}>{brand}</BrandBlock> : <span aria-hidden />}
      {user != null ? <StatusBlock online={online} user={user} /> : <span aria-hidden />}
      {children}
    </TitleBlockRoot>
  )
})
