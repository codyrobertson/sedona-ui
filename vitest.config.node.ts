import { defineConfig } from "vitest/config"
import path from "path"

/**
 * Vitest config for Node.js environment tests (registry tests)
 * These tests use fs, child_process, and other Node APIs
 *
 * Run with: npm run test:registry
 */
export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["registry/**/*.{test,spec}.ts"],
    testTimeout: 30000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
