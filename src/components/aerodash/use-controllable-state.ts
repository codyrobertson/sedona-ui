"use client"

import * as React from "react"

export interface UseControllableStateProps<T> {
  value?: T
  defaultValue: T | (() => T)
  onChange?: (value: T) => void
}

export type ControllableStateSetter<T> = React.Dispatch<React.SetStateAction<T>>

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>): [T, ControllableStateSetter<T>] {
  const [internalValue, setInternalValue] = React.useState<T>(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const setValue = React.useCallback<ControllableStateSetter<T>>(
    (nextValue) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (previousValue: T) => T)(currentValue)
          : nextValue

      if (!Object.is(currentValue, resolvedValue)) {
        if (!isControlled) {
          setInternalValue(resolvedValue)
        }
        onChange?.(resolvedValue)
      }
    },
    [currentValue, isControlled, onChange],
  )

  return [currentValue, setValue]
}
