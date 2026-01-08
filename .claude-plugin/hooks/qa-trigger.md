# QA Trigger Hook

When the user requests QA/review/audit/check on a target, execute comprehensive quality assurance.

## Detection

This hook triggers on prompts matching:
- "qa on <target>"
- "QA the <target>"
- "review <target>"
- "audit <target>"
- "check <target>"
- "analyze <target>"
- "quality check for <target>"

## Execution

1. Extract the target from the user's prompt (the thing they want QA'd)

2. Run the QA prose program:
   ```
   /prose-run .claude-plugin/qa.prose --target="${target}"
   ```

   OR if prose isn't available, execute manually:

3. Execute this QA workflow:

   ### Phase 1: Discovery
   - Find all files related to the target
   - Check git history for recent changes
   - Identify tests, configs, dependencies

   ### Phase 2: Quality Gates (parallel)
   - TypeScript: `npm run type-check`
   - ESLint: `npm run lint`
   - Build: `npm run build`

   ### Phase 3: Deep Analysis (parallel agents)
   Launch these agents simultaneously:
   - **brutal-code-critic**: Security-focused review
   - **production-code-validator**: Production readiness check
   - **data-architecture-specialist**: Data flow and architecture review

   ### Phase 4: Test Analysis
   - Find tests for the target
   - Run relevant tests
   - Report coverage gaps

   ### Phase 5: Report
   Compile and present:
   ```
   ## QA Report: <target>

   ### Status: [PASS/WARN/FAIL]

   ### Quality Gates
   - TypeScript: [status]
   - Lint: [status]
   - Build: [status]

   ### Critical Issues
   [blocking issues]

   ### Warnings
   [non-blocking concerns]

   ### Recommendations
   [prioritized actions]
   ```

## Context Awareness

- If target is "registry" → also run `npm run registry:qa`
- If target is a component → focus on that component's files
- If target is "all" or "everything" → full codebase QA
- Check for related test files: `*.test.ts`, `*.test.tsx`, `*.spec.ts`

## Success Criteria

QA passes if:
- TypeScript has no errors
- No lint errors (warnings OK)
- Build succeeds
- No critical security issues
- No blocking production issues
