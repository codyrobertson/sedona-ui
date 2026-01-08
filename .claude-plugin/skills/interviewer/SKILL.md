---
name: interviewer
description: This skill conducts structured interviews to gather requirements. Auto-triggers when requirements are unclear, ambiguous, underspecified, when multiple valid approaches exist, when scope is undefined, or when Claude needs user input before proceeding. Use for discovery, clarification, decision-making, and stakeholder alignment.
version: 1.0.0
---

# Structured Interviewer

Conduct focused interviews to gather complete requirements before implementation. Never assume - always clarify.

## When to Interview

Trigger this skill when:
- Requirements are vague or incomplete
- Multiple valid interpretations exist
- Technical decisions need user input
- Scope boundaries are unclear
- Trade-offs require user preference
- Edge cases need definition
- Success criteria are missing

## Interview Principles

### 1. Never Assume
```
Bad:  "I'll implement this using PostgreSQL..."
Good: "What database should this use? Options: PostgreSQL, MySQL, SQLite..."
```

### 2. Ask Specific Questions
```
Bad:  "What do you want the feature to do?"
Good: "Should users be able to edit after submission? If yes, for how long?"
```

### 3. Provide Options When Possible
```
Bad:  "How should authentication work?"
Good: "Authentication approach:
       A) Session-based (simpler, server-stateful)
       B) JWT tokens (stateless, better for APIs)
       C) OAuth only (delegate to providers)
       Which fits your needs?"
```

### 4. Group Related Questions
```
Good: "User Management Questions:
       1. Can users delete their accounts?
       2. Is email verification required?
       3. Support multiple auth methods?"
```

### 5. Explain Why You're Asking
```
Good: "I need to understand the data retention policy because it affects:
       - Database schema (soft delete vs hard delete)
       - GDPR compliance approach
       - Backup strategy"
```

## Interview Framework

### Discovery Interview (New Features)

Use when starting a new feature to understand scope:

```
## Feature: [NAME]

### Core Purpose
1. What problem does this solve?
2. Who is the primary user?
3. What's the success metric?

### Scope
4. What's explicitly IN scope?
5. What's explicitly OUT of scope?
6. Any hard deadlines or constraints?

### Technical Context
7. Are there existing patterns to follow?
8. Integration points with other systems?
9. Performance requirements?

### Edge Cases
10. What happens when [error case]?
11. How should [boundary condition] behave?
```

### Clarification Interview (Ambiguous Requirements)

Use when a requirement has multiple interpretations:

```
## Clarifying: [REQUIREMENT]

I understand this could mean:

**Interpretation A:** [description]
- Implies: [consequences]
- Effort: [estimate]

**Interpretation B:** [description]
- Implies: [consequences]
- Effort: [estimate]

Which interpretation is correct? Or is it something else?
```

### Decision Interview (Trade-offs)

Use when technical decisions need user input:

```
## Decision Needed: [TOPIC]

### Context
[Why this decision matters]

### Options

| Option | Pros | Cons | Effort |
|--------|------|------|--------|
| A: [name] | [pros] | [cons] | [effort] |
| B: [name] | [pros] | [cons] | [effort] |
| C: [name] | [pros] | [cons] | [effort] |

### My Recommendation
[Option X] because [reasoning]

### What's your preference?
```

### Validation Interview (Confirm Understanding)

Use before implementation to confirm understanding:

```
## Confirming Requirements for: [FEATURE]

Before I implement, please confirm:

### I Will Build:
- [specific deliverable 1]
- [specific deliverable 2]
- [specific deliverable 3]

### I Will NOT Build:
- [explicit exclusion 1]
- [explicit exclusion 2]

### Assumptions I'm Making:
- [assumption 1] - correct?
- [assumption 2] - correct?

### Questions Remaining:
- [open question 1]
- [open question 2]

Does this match your expectations?
```

## Using AskUserQuestion Tool

Structure questions effectively:

```python
AskUserQuestion(questions=[
    {
        "question": "Which authentication approach should we use?",
        "header": "Auth Method",
        "options": [
            {"label": "JWT Tokens (Recommended)", "description": "Stateless, scales well, good for APIs"},
            {"label": "Session-based", "description": "Simpler, requires session store"},
            {"label": "OAuth only", "description": "Delegate auth to Google/GitHub"},
        ],
        "multiSelect": False
    },
    {
        "question": "Which features are must-haves for v1?",
        "header": "MVP Scope",
        "options": [
            {"label": "User registration", "description": "Email/password signup"},
            {"label": "Social login", "description": "Google/GitHub OAuth"},
            {"label": "Password reset", "description": "Email-based recovery"},
            {"label": "MFA", "description": "Two-factor authentication"},
        ],
        "multiSelect": True
    }
])
```

## Question Categories

### Functional Requirements
- What should it do?
- What inputs does it accept?
- What outputs does it produce?
- What are the business rules?

### Non-Functional Requirements
- Performance targets?
- Scalability needs?
- Security requirements?
- Availability expectations?

### Constraints
- Technology restrictions?
- Timeline pressures?
- Budget limitations?
- Team expertise?

### Integration
- What systems does it connect to?
- What APIs does it consume/expose?
- Data synchronization needs?

### User Experience
- Who are the users?
- What's their technical level?
- Error handling expectations?
- Accessibility requirements?

### Edge Cases
- What if input is invalid?
- What if external service fails?
- What about concurrent access?
- Data migration needs?

## Interview Anti-Patterns

### Don't: Ask Everything at Once
```
Bad: 20 questions in one message
Good: 3-5 focused questions, then follow up
```

### Don't: Ask Without Context
```
Bad: "SQL or NoSQL?"
Good: "For storing user sessions that need fast reads and
      automatic expiry, should we use Redis (fast, TTL support)
      or PostgreSQL (consistent, familiar)?"
```

### Don't: Binary Questions for Complex Topics
```
Bad: "Should we add caching?"
Good: "Caching strategy:
      A) None (simpler, always fresh)
      B) Application-level (Redis, ~100ms reads)
      C) CDN (for static assets)
      D) All of the above
      What fits the performance needs?"
```

### Don't: Assume Silence Means Agreement
```
Bad: *proceeds without confirmation*
Good: "I'll proceed with Option A unless you prefer otherwise.
       Please confirm or suggest changes."
```

## Quick Interview Templates

### API Design
```
For the [RESOURCE] API:
1. REST or GraphQL?
2. Authentication: API key, JWT, or OAuth?
3. Rate limiting needed?
4. Versioning strategy: URL path, header, or query param?
```

### Database Schema
```
For [TABLE/COLLECTION]:
1. Soft delete or hard delete?
2. Audit fields needed (created_at, updated_by)?
3. Expected row count (thousands, millions, billions)?
4. Query patterns: read-heavy, write-heavy, or balanced?
```

### UI Component
```
For [COMPONENT]:
1. Responsive breakpoints to support?
2. Accessibility level: WCAG A, AA, or AAA?
3. Loading/error states needed?
4. Animation preferences?
```

### Error Handling
```
When [ERROR_CONDITION] occurs:
1. User-facing message: technical or friendly?
2. Retry automatically or require user action?
3. Log level: error, warning, or info?
4. Alert/notify anyone?
```

## Closing the Interview

After gathering requirements:

1. **Summarize** what was decided
2. **List** any remaining open items
3. **Confirm** ready to proceed
4. **Set expectations** for next steps

```
## Summary

Based on our discussion:
- [Decision 1]
- [Decision 2]
- [Decision 3]

Open items for later:
- [Deferred item 1]
- [Deferred item 2]

I'm ready to proceed with implementation.
Shall I start, or do you have additional input?
```
