import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SedonaLogo } from "../sedona-logo"

describe("SedonaLogo", () => {
  it("renders the 151 by 28 Sedona full-logo SVG as the default component", () => {
    render(<SedonaLogo aria-label="Sedona" />)

    const logo = screen.getByLabelText("Sedona")
    const svg = logo.tagName.toLowerCase() === "svg" ? logo : logo.querySelector("svg")

    expect(svg).toHaveAttribute("width", "151")
    expect(svg).toHaveAttribute("height", "28")
    expect(svg).toHaveAttribute("viewBox", "0 0 151 28")
    expect(svg?.querySelector("linearGradient")).toHaveAttribute("data-sedona-logo-gradient", "diamond")
  })

  it("keeps the mark and wordmark variants available", () => {
    const { rerender } = render(<SedonaLogo aria-label="Sedona mark" variant="logomark" />)

    expect(screen.getByLabelText("Sedona mark").querySelector("svg")).toHaveAttribute("viewBox", "0 0 20 18")

    rerender(<SedonaLogo aria-label="Sedona wordmark" variant="wordmark" />)

    expect(screen.getByLabelText("Sedona wordmark").querySelector("svg")).toHaveAttribute("viewBox", "0 0 79 14")
  })
})
