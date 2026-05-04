# AeroDash Design System Formalization Implementation Plan

> **Required execution skill:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make AeroDash the explicit, enforceable Sedona design-system surface before PRs land in `main`.

**Architecture:** Treat `src/components/aerodash/manifest.ts` as the inventory contract, `src/components/aerodash/index.ts` as the public API, and `scripts/audit-aerodash.mjs` as the consistency gate. Documentation explains the current split between legacy `components/ui` and active AeroDash surfaces.

**Tech Stack:** Next.js 14, React 18, TypeScript, Radix UI, Vitest, Node.js audit script.

---

### Task 1: Establish The AeroDash Manifest

**Files:**
- Create: `src/components/aerodash/manifest.ts`
- Modify: `src/components/aerodash/index.ts`
- Test: `src/components/aerodash/__tests__/manifest.test.ts`

**Step 1: Write the manifest test**

Create tests that assert component ids are unique, required flagship ids exist, every entry has a source and public exports, and category/CSS inventories are exported.

**Step 2: Add the manifest**

Create `aerodashComponents` with one entry for every source file under `src/components/aerodash`, excluding `index.ts` and `manifest.ts`. Each entry includes `id`, `name`, `category`, `kind`, `source`, `css`, `exports`, and `description`.

**Step 3: Export the manifest**

Re-export `aerodashComponents`, `aerodashComponentIds`, `aerodashComponentCategories`, and `aerodashCssEntryPoints` from `src/components/aerodash/index.ts`.

**Step 4: Run the test**

Run:

```bash
npm run test:run -- src/components/aerodash/__tests__/manifest.test.ts
```

Expected: PASS.

### Task 2: Add An Enforceable Audit

**Files:**
- Create: `scripts/audit-aerodash.mjs`
- Modify: `package.json`

**Step 1: Write the audit script**

Use the TypeScript compiler API to parse `manifest.ts` and `index.ts`. Verify:

- Every source file has one manifest entry.
- Every manifest source file exists.
- Every declared CSS file matches the component's actual CSS imports.
- Every declared public export is re-exported by `index.ts`.
- Every CSS file is referenced by at least one manifest entry.

**Step 2: Add the package script**

Add:

```json
"design-system:audit": "node scripts/audit-aerodash.mjs"
```

**Step 3: Run the audit**

Run:

```bash
npm run design-system:audit
```

Expected: PASS with entry, source, and CSS counts.

### Task 3: Document The System Contract

**Files:**
- Create: `docs/AERODASH_DESIGN_SYSTEM.md`
- Modify as needed: `README.md`, `docs/COMPONENTS.md`, `docs/DESIGN_TOKENS.md`

**Step 1: Write the design-system guide**

Document the active AeroDash source of truth, legacy surface boundary, foundations, component inventory, API rules, styling rules, and PR readiness expectations.

**Step 2: Keep old docs from lying**

Any older Zeus/shadcn docs should either be updated, explicitly marked as legacy, or linked to the AeroDash guide so reviewers do not treat them as the active system.

**Step 3: Verify docs point to real commands**

Run the listed commands or revise the docs if a command is not currently available.

### Task 4: Prepare PR Slices

**Files:**
- Docs only unless code gaps are discovered.

**Step 1: Define PR boundaries**

Use these slices:

- PR 1: manifest, audit, docs, and tests.
- PR 2: component-level API cleanup and missing tests.
- PR 3: playground and visual QA hardening.
- PR 4: route migrations from legacy `components/ui` to AeroDash.

**Step 2: Final verification**

Run:

```bash
npm run design-system:audit
npm run test:run -- src/components/aerodash
npm run type-check
```

Expected: all pass before opening PR 1.
