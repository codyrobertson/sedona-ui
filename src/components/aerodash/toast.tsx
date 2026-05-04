"use client"

import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./toast.css"

/**
 * Toast — y2k notification queue.
 *
 *   <ToastProvider position="top-right">
 *     <App />
 *   </ToastProvider>
 *
 *   const toast = useToast()
 *   toast.show({ tone: "success", title: "Saved", description: "All set." })
 *   toast.show({ tone: "danger", description: "Failed to save", duration: 6000 })
 *
 * Tones: info, success, warn, danger. Auto-dismiss after `duration` ms
 * (default 4000). Pass `duration={Infinity}` for sticky.
 */

type Tone = "info" | "success" | "warn" | "danger"

type Position =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center"

const TONE_TOKENS: Record<
  Tone,
  { well: string; ink: string; badgeBg: string; badgeFg: string }
> = {
  info:    { well: colors.cyanSoft,  ink: "#0a3a48", badgeBg: colors.cyan,  badgeFg: colors.ink },
  success: { well: colors.greenSoft, ink: "#0c4924", badgeBg: colors.green, badgeFg: colors.ink },
  warn:    { well: colors.warnSoft,  ink: "#5a4400", badgeBg: colors.warn,  badgeFg: colors.ink },
  danger:  { well: colors.pinkSoft,  ink: "#71132a", badgeBg: colors.pink,  badgeFg: colors.paper },
}

const TONE_ICONS: Record<Tone, React.ReactNode> = {
  info: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 7v4.5M8 4.5v.01" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5 8l2.2 2.2L11 6.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warn: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M8 1.5L15 14H1L8 1.5Z" strokeLinejoin="round" />
      <path d="M8 6.5v3.5M8 12v.01" strokeLinecap="round" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" strokeLinecap="round" />
    </svg>
  ),
}

export interface ToastOptions {
  id?: string
  tone?: Tone
  title?: React.ReactNode
  description?: React.ReactNode
  /** ms; pass Infinity for sticky. Default 4000. */
  duration?: number
  action?: { label: string; onClick: () => void }
}

interface ToastRecord extends Required<Pick<ToastOptions, "id" | "tone" | "duration">> {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastOptions["action"]
  state: "open" | "closed"
}

interface ToastContextValue {
  show: (opts: ToastOptions) => string
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>")
  }
  return ctx
}

export interface ToastProviderProps {
  children: React.ReactNode
  position?: Position
  /** Max simultaneous toasts. Older ones are dropped. Default 5. */
  limit?: number
}

let idCounter = 0
const nextId = () => `t${++idCounter}`

export function ToastProvider({
  children,
  position = "top-right",
  limit = 5,
}: ToastProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  const [toasts, setToasts] = React.useState<ToastRecord[]>([])
  const timersRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  React.useEffect(() => {
    setMounted(true)
    const timers = timersRef.current
    return () => {
      timers.forEach((t) => clearTimeout(t))
      timers.clear()
    }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, state: "closed" } : t)))
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 200)
  }, [])

  const show = React.useCallback(
    (opts: ToastOptions) => {
      const id = opts.id ?? nextId()
      const duration = opts.duration ?? 4000
      const record: ToastRecord = {
        id,
        tone: opts.tone ?? "info",
        duration,
        title: opts.title,
        description: opts.description,
        action: opts.action,
        state: "open",
      }
      setToasts((prev) => {
        const next = [...prev.filter((t) => t.id !== id), record]
        return next.length > limit ? next.slice(next.length - limit) : next
      })
      if (Number.isFinite(duration)) {
        const timer = setTimeout(() => dismiss(id), duration)
        timersRef.current.set(id, timer)
      }
      return id
    },
    [dismiss, limit],
  )

  const value = React.useMemo<ToastContextValue>(() => ({ show, dismiss }), [show, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted
        ? createPortal(<ToastViewport position={position} toasts={toasts} onDismiss={dismiss} />, document.body)
        : null}
    </ToastContext.Provider>
  )
}

interface ToastViewportProps {
  position: Position
  toasts: ToastRecord[]
  onDismiss: (id: string) => void
}

function ToastViewport({ position, toasts, onDismiss }: ToastViewportProps) {
  return (
    <div data-ad-toast-viewport="" data-position={position} role="region" aria-label="Notifications">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: ToastRecord
  onDismiss: (id: string) => void
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const tokens = TONE_TOKENS[toast.tone]
  return (
    <div
      data-ad-toast=""
      data-tone={toast.tone}
      data-state={toast.state}
      role="status"
      aria-live="polite"
      className="overflow-hidden"
      style={{
        background: tokens.well,
        color: tokens.ink,
        border: `1.5px solid ${colors.ink}`,
        borderRadius: radii.md,
        boxShadow: `1px 1px 0 ${colors.ink}`,
        fontSize: 12,
        lineHeight: 1.45,
        minWidth: 300,
      }}
    >
      <div className="grid items-stretch" style={{ gridTemplateColumns: "auto 1fr auto" }}>
        <span
          aria-hidden
          className="relative grid place-items-center [&>svg]:h-[18px] [&>svg]:w-[18px] self-stretch"
          style={{
            width: 46,
            paddingRight: 8,
            background: tokens.badgeBg,
            color: tokens.badgeFg,
            clipPath: "polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)",
          }}
        >
          {TONE_ICONS[toast.tone]}
        </span>
        <div className="min-w-0" style={{ padding: "10px 14px 10px 8px" }}>
          {toast.title ? (
            <div
              className="font-[950] uppercase tracking-[0.08em] flex items-center gap-2"
              style={{ fontSize: 10, marginBottom: 2 }}
            >
              <span>{toast.title}</span>
            </div>
          ) : null}
          {toast.description ? <div>{toast.description}</div> : null}
          {toast.action ? (
            <button
              type="button"
              onClick={() => {
                toast.action?.onClick()
                onDismiss(toast.id)
              }}
              className="mt-2 cursor-pointer border-0 bg-transparent p-0 underline font-[700] uppercase tracking-[0.06em]"
              style={{ color: tokens.ink, fontSize: 10 }}
            >
              {toast.action.label}
            </button>
          ) : null}
        </div>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => onDismiss(toast.id)}
          className="grid place-items-center cursor-pointer border-0 bg-transparent p-0 opacity-60 hover:opacity-100 self-start"
          style={{ width: 28, height: 28, color: tokens.ink, margin: 4 }}
        >
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Optional: declarative <Toast> for inline usage outside the queue ───────

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: Tone
  title?: React.ReactNode
  onDismiss?: () => void
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { tone = "info", title, onDismiss, children, className, style, ...props },
  ref,
) {
  const tokens = TONE_TOKENS[tone]
  return (
    <div
      ref={ref}
      data-ad-toast=""
      data-tone={tone}
      data-state="open"
      role="status"
      className={cn("overflow-hidden", className)}
      style={{
        background: tokens.well,
        color: tokens.ink,
        border: `1.5px solid ${colors.ink}`,
        borderRadius: radii.md,
        boxShadow: `1px 1px 0 ${colors.ink}`,
        fontSize: 12,
        lineHeight: 1.45,
        ...style,
      }}
      {...props}
    >
      <div
        className="grid items-stretch"
        style={{
          gridTemplateColumns: `auto 1fr ${onDismiss ? "auto" : ""}`.trim(),
        }}
      >
        <span
          aria-hidden
          className="relative grid place-items-center [&>svg]:h-[18px] [&>svg]:w-[18px] self-stretch"
          style={{
            width: 46,
            paddingRight: 8,
            background: tokens.badgeBg,
            color: tokens.badgeFg,
            clipPath: "polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)",
          }}
        >
          {TONE_ICONS[tone]}
        </span>
        <div className="min-w-0" style={{ padding: "10px 14px 10px 8px" }}>
          {title ? (
            <div
              className="font-[950] uppercase tracking-[0.08em] flex items-center gap-2"
              style={{ fontSize: 10, marginBottom: 2 }}
            >
              <span>{title}</span>
            </div>
          ) : null}
          <div>{children}</div>
        </div>
        {onDismiss ? (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={onDismiss}
            className="grid place-items-center cursor-pointer border-0 bg-transparent p-0 opacity-60 hover:opacity-100 self-start"
            style={{ width: 28, height: 28, color: tokens.ink, margin: 4 }}
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  )
})
