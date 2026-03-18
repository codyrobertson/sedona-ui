# Risograph Chart.js Plugin — Clean Rewrite

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete rewrite of the risograph halftone Chart.js plugin — all rendering is riso-treated (halftone, line, grid, text), all animated from a single print head, hyper-optimized.

**Architecture:** Single-file plugin with clean internal sections. One global `printHeadX` drives ALL animation. Every visual element (dots, line, grid, border, text) uses the same stippled micro-dot renderer. Paper texture is pre-cached. All rendering goes through offscreen canvases for multiply compositing. 20 performance optimizations preserved.

**Tech Stack:** Vanilla JS, Chart.js 4.x, Canvas 2D, Perlin noise

---

## What's Proven (keep from current impl)

- AM halftone: tone lookup table, brick pattern, unified density curve
- Paper texture: 75% res + smooth upscale, fiber/tooth/grain/specks/warmShift, cached
- Multiply compositing: offscreen canvas per layer, white bg, multiply blend
- Performance: curve Y lookup, sqrt/tone tables, canvas pooling, inlined PRNG, precomputed reciprocals
- Config UI: slider panel with rAF debouncing

## What's Broken (rewrite from scratch)

- Animation: stalls, jumps, features not synced to print head
- Riso line: not animating, not wired to config, too uniform
- Grid/text: half-wired, breaks Chart.js native rendering
- Edge bleed: hard cutoffs, no noise-based irregularity
- Ink interaction: removed due to animation pops

## Architecture: Single Print Head

```
printHeadX = left + progress * (chartWidth + margin)

Everything clips/fades to printHeadX:
  ├── Halftone dots: skip cells past printHeadX, emergence behind it
  ├── Riso line: skip dots past printHeadX
  ├── Riso grid: skip dots past printHeadX (horizontal), skip lines past printHeadX (vertical)
  ├── Riso border: animate left→right
  ├── Riso text (x-axis): fade in as printHeadX passes
  └── Riso text (y-axis, title): always visible (outside sweep direction)
```

## File Structure

```
src/experiments/risograph-chart/
  perlin.js              — KEEP (unchanged, 75 lines)
  risograph-plugin.js    — REWRITE (target ~600 lines, down from 949)
  index.html             — REWRITE config panel (target ~400 lines, down from 496)
```

---

## Chunk 1: Core + Paper + Halftone

### Task 1: Scaffold the rewrite

**Files:**
- Rewrite: `src/experiments/risograph-chart/risograph-plugin.js`

- [ ] **Step 1:** Create the plugin shell with DEFAULTS, merge(), hexToRgb(), makeRng(), canvas pool, tone table, sqrt table, curve lookup — all proven optimizations from current impl. Include animation state object.

- [ ] **Step 2:** Port paper texture generator (generatePaperTexture) — unchanged from current impl. 75% res, cached, conditional noise skip.

- [ ] **Step 3:** Port halftone renderer (renderHalftoneLayer) with these fixes:
  - Single `printHeadX` parameter (not layerProgress)
  - Edge bleed: add Perlin noise to the baseline boundary: `bottomEdge = bottom + noise2d(cx * 0.05, 0) * 2.5` so the fill edge is irregular, not a straight line
  - Emergence always applied (no isAnimating branch)
  - Print head set on chart object for other renderers to read

- [ ] **Step 4:** Port drawHalftoneDirect + drawHalftoneMultiply with diffuse during animation (blur halo under dots).

- [ ] **Step 5:** Verify halftone renders correctly with animation. Test: play animation, dots sweep left→right, no stall, no jump at end.

- [ ] **Step 6:** Commit: `feat(riso): rewrite core + paper + halftone`

### Task 2: Riso line renderer

**Files:**
- Modify: `src/experiments/risograph-chart/risograph-plugin.js`

- [ ] **Step 1:** Write `drawRisoLine(ctx, chart, dsIdx, color, width, phx)`:
  - Walk dataset points, place micro-dots every 0.9px
  - Perlin noise for ink pressure along the line (slow undulation of stroke width)
  - Perlin noise for perpendicular waviness (organic path)
  - Random grain on top of waviness
  - 3% ink gap chance in low-pressure zones
  - Variable dot size: `r = baseWidth * 0.4 * pressure * sizeNoise`
  - Clip to `printHeadX` — dots past it are skipped

- [ ] **Step 2:** Wire into plugin: in `beforeDatasetsDraw`, set `borderWidth=0` on datasets. In `afterDatasetsDraw`, call `drawRisoLine` with `chart._risoPrintHeadX`.

- [ ] **Step 3:** Line color: if multiply layers active, use `mixColors(layer1, layer2)`. Otherwise use halftone color (darker variant).

- [ ] **Step 4:** Verify: line animates with print head, has visible pressure variation, organic waviness.

- [ ] **Step 5:** Commit: `feat(riso): add stippled line renderer`

### Task 3: Riso grid + border

**Files:**
- Modify: `src/experiments/risograph-chart/risograph-plugin.js`

- [ ] **Step 1:** Write `drawRisoGrid(ctx, chart, phx)`:
  - Read tick positions from `chart.scales.x.ticks` and `chart.scales.y.ticks`
  - For each grid line, place micro-dots every 1.4px with jitter + variable size
  - Horizontal lines: clip dots to `printHeadX`
  - Vertical lines: skip entire line if its x > `printHeadX`
  - 5% gap chance for organic feel

- [ ] **Step 2:** Write `drawRisoBorder(ctx, chart, phx)`:
  - Same micro-dot approach for the chart area rectangle border
  - Animate: top/bottom borders clip to printHeadX, left always visible, right appears when printHeadX reaches it

- [ ] **Step 3:** Hide Chart.js native grid: set grid colors to `'transparent'` in the chart config (HTML), NOT dynamically in the plugin. This avoids the beforeDraw/afterDraw color toggle that broke things.

- [ ] **Step 4:** Draw riso grid + border in `afterDraw`, using `chart._risoPrintHeadX`.

- [ ] **Step 5:** Verify: grid lines are stippled micro-dots, animate left→right. No native grid visible.

- [ ] **Step 6:** Commit: `feat(riso): add stippled grid + border`

### Task 4: Riso dot-matrix text

**Files:**
- Modify: `src/experiments/risograph-chart/risograph-plugin.js`

- [ ] **Step 1:** Write `drawRisoText(ctx, text, x, y, font, color, spacing, phx)`:
  - Draw each character using Canvas fillText as normal (we need the glyph shapes)
  - THEN draw a subtle ink trapping layer: same text at +0.3px size and +0.2px offset at 12% opacity
  - Per-character: slight position jitter (±0.3px), slight alpha variation (88-100%)
  - If `phx` defined and character center > phx: skip (animation)
  - For a more riso feel: draw at reduced globalAlpha (0.92) so paper texture shows through slightly

- [ ] **Step 2:** Write tick label rendering:
  - Y-axis labels: always visible (left of chart, outside sweep)
  - X-axis labels: animate with printHeadX (skip labels past it)
  - Read tick values from chart scales, format with callback

- [ ] **Step 3:** Wire into `afterDraw`: draw title, axis titles, tick labels using `drawRisoText`.

- [ ] **Step 4:** Hide Chart.js native tick labels: set tick `color: 'transparent'` in chart config (HTML).

- [ ] **Step 5:** Verify: text has ink trapping effect, x-axis labels animate, y-axis labels always visible.

- [ ] **Step 6:** Commit: `feat(riso): add riso text with ink trapping`

---

## Chunk 2: Animation + Config + Polish

### Task 5: Animation system

**Files:**
- Modify: `src/experiments/risograph-chart/risograph-plugin.js`

- [ ] **Step 1:** Animation state: `{ active, progress, startTime, duration, chart }`.
  - `startAnimation(chart, duration)`: pre-generates paper texture, sets progress=0, starts rAF loop
  - `_animLoop()`: updates progress linearly (no easing), calls `chart.update('none')`, stops when progress >= 1.0
  - NO special final render — the last animation frame IS the final frame (emergence reaches 1.0 naturally because print head extends 40% past right edge)

- [ ] **Step 2:** Wire `chart._risoPrintHeadX`:
  - Set in `renderHalftoneLayer` (from progress)
  - Read in: drawRisoLine, drawRisoGrid, drawRisoBorder, drawRisoText
  - Clear at end of `afterDraw`

- [ ] **Step 3:** Expose: `RisographAnim.play(chart, duration)`, `RisographAnim.reset(chart)`

- [ ] **Step 4:** Verify: Play animation. ALL elements (dots, line, grid, border, x-axis text) sweep left→right together. No stalls, no jumps.

- [ ] **Step 5:** Commit: `feat(riso): unified animation system`

### Task 6: Config UI rewrite

**Files:**
- Rewrite: `src/experiments/risograph-chart/index.html`

- [ ] **Step 1:** Chart config: set native grid/tick/border colors to `'transparent'` (not hidden dynamically).

- [ ] **Step 2:** Config panel sections: Halftone, Paper, Layer 2, Animation. Each with rAF-debounced live updates.

- [ ] **Step 3:** Wire `applyConfig()` to update all plugin options + layer config.

- [ ] **Step 4:** Play/Reset buttons for animation.

- [ ] **Step 5:** Verify: all sliders work, live updates, animation plays.

- [ ] **Step 6:** Commit: `feat(riso): clean config UI`

### Task 7: Performance audit

- [ ] **Step 1:** Add `performance.now()` timing to every render phase. Log to console.
- [ ] **Step 2:** Profile with Chrome DevTools: identify any frame > 16ms during animation.
- [ ] **Step 3:** Optimize any hot spots found. Target: <12ms per animation frame for single layer, <20ms for multiply.
- [ ] **Step 4:** Remove all `console.log` timing statements (keep behind a `DEBUG` flag).
- [ ] **Step 5:** Commit: `perf(riso): optimization pass`

### Task 8: Push to gist

- [ ] **Step 1:** `gh gist edit e3102a671c9d993033289a59cca95bba` with all three files
- [ ] **Step 2:** Verify gist renders correctly
