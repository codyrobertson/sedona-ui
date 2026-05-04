"use client"

import * as React from "react"
import * as RadixPopover from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

import { colors, radii } from "./tokens"
import "./menu.css"

/**
 * Combobox — search-filtered single-select. Composite of Popover + Input + list.
 *
 *   <Combobox
 *     options={[{ value: "a", label: "Apple" }, …]}
 *     value={v}
 *     onChange={setV}
 *     placeholder="Pick a fruit…"
 *   />
 *
 * For multi-select, pass an array as value with `multiple`. Filtering is
 * substring + case-insensitive on `label` by default; pass `filter` to override.
 */

export interface ComboboxOption {
  value: string
  label: string
  /** Optional secondary text shown after the label. */
  hint?: React.ReactNode
  /** Optional leading icon. */
  icon?: React.ReactNode
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string | string[] | null
  onChange?: (value: string | string[] | null) => void
  multiple?: boolean
  placeholder?: string
  emptyText?: string
  size?: "sm" | "md" | "lg"
  invalid?: boolean
  disabled?: boolean
  /** Override default filter. Return true to keep the option. */
  filter?: (option: ComboboxOption, query: string) => boolean
  className?: string
}

const SIZE_HEIGHT: Record<NonNullable<ComboboxProps["size"]>, number> = {
  sm: 28,
  md: 34,
  lg: 40,
}

const defaultFilter = (option: ComboboxOption, query: string) =>
  option.label.toLowerCase().includes(query.toLowerCase())

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(function Combobox(
  {
    options,
    value,
    onChange,
    multiple = false,
    placeholder = "Select…",
    emptyText = "No matches",
    size = "md",
    invalid = false,
    disabled = false,
    filter = defaultFilter,
    className,
  },
  ref,
) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const selectedValues = React.useMemo<string[]>(() => {
    if (value == null) return []
    return Array.isArray(value) ? value : [value]
  }, [value])

  const filtered = React.useMemo(
    () => (query ? options.filter((o) => filter(o, query)) : options),
    [options, query, filter],
  )

  const triggerLabel = React.useMemo(() => {
    if (selectedValues.length === 0) return null
    if (multiple) {
      if (selectedValues.length === 1) {
        return options.find((o) => o.value === selectedValues[0])?.label ?? selectedValues[0]
      }
      return `${selectedValues.length} selected`
    }
    return options.find((o) => o.value === selectedValues[0])?.label ?? selectedValues[0]
  }, [multiple, options, selectedValues])

  const handleSelect = (option: ComboboxOption) => {
    if (option.disabled) return
    if (multiple) {
      const exists = selectedValues.includes(option.value)
      const next = exists
        ? selectedValues.filter((v) => v !== option.value)
        : [...selectedValues, option.value]
      onChange?.(next)
      setQuery("")
      inputRef.current?.focus()
    } else {
      onChange?.(option.value)
      setQuery("")
      setOpen(false)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.(multiple ? [] : null)
    setQuery("")
  }

  const height = SIZE_HEIGHT[size]
  const hasValue = selectedValues.length > 0

  return (
    <RadixPopover.Root open={open} onOpenChange={setOpen}>
      <RadixPopover.Trigger asChild>
        <button
          ref={ref}
          type="button"
          data-ad-combobox-trigger=""
          data-invalid={invalid ? "" : undefined}
          disabled={disabled}
          className={cn(
            "inline-flex items-center justify-between gap-2 cursor-pointer select-none",
            "outline-none whitespace-nowrap text-left disabled:opacity-50 disabled:cursor-not-allowed",
            className,
          )}
          style={{
            height,
            padding: "0 8px 0 12px",
            fontSize: 12,
            fontWeight: 600,
            background: colors.paper,
            color: hasValue ? colors.ink : colors.muted,
            border: `1.5px solid ${invalid ? "#71132a" : colors.ink}`,
            borderRadius: radii.md,
            boxShadow: `1px 1px 0 ${invalid ? "#71132a" : colors.ink}`,
            minWidth: 180,
          }}
        >
          <span className="flex-1 truncate">{triggerLabel ?? placeholder}</span>
          <span className="grid place-items-center gap-1" style={{ display: "inline-flex" }}>
            {hasValue ? (
              <span
                role="button"
                aria-label="Clear"
                onClick={handleClear}
                onPointerDown={(e) => e.stopPropagation()}
                className="grid place-items-center cursor-pointer opacity-60 hover:opacity-100"
                style={{ width: 16, height: 16 }}
              >
                <svg width={10} height={10} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M3 3l6 6M9 3l-6 6" />
                </svg>
              </span>
            ) : null}
            <svg
              width={10}
              height={10}
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              style={{ flexShrink: 0, opacity: 0.7 }}
            >
              <path d="M2 3.5L5 6.5L8 3.5" />
            </svg>
          </span>
        </button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          align="start"
          sideOffset={4}
          data-ad-combobox-content=""
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            inputRef.current?.focus()
          }}
          style={{
            background: colors.paper,
            color: colors.ink,
            border: `1.5px solid ${colors.ink}`,
            borderRadius: radii.md,
            boxShadow: `1px 1px 0 ${colors.ink}`,
            minWidth: "var(--radix-popover-trigger-width)",
            zIndex: 50,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              borderBottom: `1.5px solid ${colors.line}`,
              padding: 4,
              background: colors.canvas,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filtered[0]) {
                  e.preventDefault()
                  handleSelect(filtered[0])
                } else if (e.key === "Escape") {
                  setOpen(false)
                }
              }}
              placeholder="Search…"
              className="w-full border-0 bg-transparent outline-none"
              style={{
                padding: "6px 8px",
                fontSize: 12,
                fontWeight: 600,
                color: colors.ink,
                outline: "none",
                boxShadow: "none",
              }}
            />
          </div>
          <div
            role="listbox"
            style={{ padding: 4, maxHeight: 280, overflowY: "auto" }}
          >
            {filtered.length === 0 ? (
              <div
                style={{
                  padding: "10px 12px",
                  fontSize: 11,
                  color: colors.muted,
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                {emptyText}
              </div>
            ) : (
              filtered.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    data-ad-menu-item=""
                    data-disabled={option.disabled ? "" : undefined}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      handleSelect(option)
                    }}
                    className="relative flex items-center gap-2 cursor-pointer select-none outline-none whitespace-nowrap"
                    style={{
                      padding: "6px 28px 6px 10px",
                      fontSize: 12,
                      borderRadius: radii.xs,
                      color: colors.ink,
                      fontWeight: 600,
                    }}
                  >
                    {option.icon ? (
                      <span className="grid place-items-center [&>svg]:h-[14px] [&>svg]:w-[14px] opacity-70">
                        {option.icon}
                      </span>
                    ) : null}
                    <span className="flex-1 truncate">{option.label}</span>
                    {option.hint ? (
                      <span className="text-[10px] uppercase tracking-[0.06em] opacity-50">
                        {option.hint}
                      </span>
                    ) : null}
                    {isSelected ? (
                      <span
                        style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <svg
                          width={12}
                          height={12}
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 6.5L5 9.5L10 4" />
                        </svg>
                      </span>
                    ) : null}
                  </div>
                )
              })
            )}
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
})
