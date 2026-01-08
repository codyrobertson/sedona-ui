---
name: quick-review
description: Quick multi-agent code review (security + performance + architecture)
user_invocable: true
allowed_tools:
  - Task
  - TodoWrite
  - Read
  - Glob
  - Grep
---

# Quick Multi-Agent Review

Launch parallel review agents for rapid comprehensive code analysis.

## Target

Reviewing: **$ARGUMENTS**

If no target specified, review recent changes (git diff).

## Execution

Launch three specialized agents in parallel:

```python
# Security Review
Task(
    subagent_type="brutal-code-critic",
    description="Security audit",
    prompt="""
    Security audit of [TARGET]:

    1. OWASP Top 10 vulnerabilities
    2. Auth/authz flaws
    3. Input validation
    4. Injection risks
    5. Data exposure

    For each issue: severity, exploit scenario, fix with code.
    """
)

# Performance Review
Task(
    subagent_type="brutal-code-critic",
    description="Performance analysis",
    prompt="""
    Performance analysis of [TARGET]:

    1. Algorithmic complexity
    2. Database patterns (N+1, indexes)
    3. Memory usage
    4. Blocking I/O
    5. Caching opportunities

    For each issue: impact, optimized solution, expected improvement.
    """
)

# Architecture Review
Task(
    subagent_type="architecture-reviewer",
    description="Architecture review",
    prompt="""
    Architecture review of [TARGET]:

    1. SOLID principles
    2. Coupling/cohesion
    3. Design patterns
    4. Error handling
    5. Testability

    For each issue: violation, recommended fix, migration effort.
    """
)
```

## Output

Synthesize findings into:

| Priority | Category | Issue | Fix |
|----------|----------|-------|-----|
| Critical | Security | ... | ... |
| High | Performance | ... | ... |
| Medium | Architecture | ... | ... |

Recommend which issues to address immediately vs defer.
