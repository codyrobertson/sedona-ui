import { describe, expect, it } from "vitest"

import {
  aerodashComponentCategories,
  aerodashComponentIds,
  aerodashComponents,
  aerodashCssEntryPoints,
} from "../manifest"

describe("aerodash manifest", () => {
  it("keeps component ids unique and stable", () => {
    expect(new Set(aerodashComponentIds).size).toBe(aerodashComponentIds.length)
    expect(aerodashComponentIds).toContain("tokens")
    expect(aerodashComponentIds).toContain("button")
    expect(aerodashComponentIds).toContain("header-bar")
    expect(aerodashComponentIds).toContain("stats-bar")
  })

  it("documents every entry with source, category, and public exports", () => {
    for (const component of aerodashComponents) {
      expect(component.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      expect(component.name.length).toBeGreaterThan(1)
      expect(component.source).toMatch(/\.(ts|tsx)$/)
      expect(component.exports.length).toBeGreaterThan(0)
      expect(component.description.length).toBeGreaterThan(20)
    }
  })

  it("exposes category and css inventories for docs and release checks", () => {
    expect(aerodashComponentCategories).toEqual([
      "data",
      "feedback",
      "form",
      "foundation",
      "navigation",
      "overlay",
      "primitive",
      "shell",
      "utility",
    ])
    expect(aerodashCssEntryPoints).toContain("aerodash.css")
    expect(aerodashCssEntryPoints).toContain("menu.css")
    expect(aerodashCssEntryPoints).toContain("stats-bar.css")
  })
})
