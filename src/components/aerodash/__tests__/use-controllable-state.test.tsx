import { act, renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { useControllableState } from "../use-controllable-state"

describe("useControllableState", () => {
  it("updates internal state when uncontrolled", () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({
        defaultValue: "active",
        onChange,
      }),
    )

    expect(result.current[0]).toBe("active")

    act(() => {
      result.current[1]("archived")
    })

    expect(result.current[0]).toBe("archived")
    expect(onChange).toHaveBeenCalledWith("archived")
  })

  it("does not mutate controlled state locally", () => {
    const onChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ value }) =>
        useControllableState({
          value,
          defaultValue: "active",
          onChange,
        }),
      { initialProps: { value: "active" } },
    )

    act(() => {
      result.current[1]("archived")
    })

    expect(result.current[0]).toBe("active")
    expect(onChange).toHaveBeenCalledWith("archived")

    rerender({ value: "archived" })
    expect(result.current[0]).toBe("archived")
  })

  it("supports functional updates against the current value", () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState<number>({
        defaultValue: 1,
        onChange,
      }),
    )

    act(() => {
      result.current[1]((value) => value + 1)
    })

    expect(result.current[0]).toBe(2)
    expect(onChange).toHaveBeenCalledWith(2)
  })
})
