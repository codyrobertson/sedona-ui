# Interview Templates by Domain

Detailed templates for common interview scenarios.

## Feature Development Interviews

### New Feature Discovery

```markdown
# Feature Discovery: [FEATURE NAME]

## Problem Statement
- What problem are we solving?
- Who experiences this problem?
- How are they solving it today?
- What's the cost of not solving it?

## Success Criteria
- How do we know this feature is successful?
- Key metrics to track?
- Target values for those metrics?

## User Stories
Please validate these user stories:

1. As a [user type], I want to [action] so that [benefit]
   - Acceptance criteria: [specific conditions]

2. As a [user type], I want to [action] so that [benefit]
   - Acceptance criteria: [specific conditions]

Are there additional user stories I'm missing?

## Scope Definition

### Must Have (P0)
- [ ] [Core functionality 1]
- [ ] [Core functionality 2]

### Should Have (P1)
- [ ] [Important but not critical 1]
- [ ] [Important but not critical 2]

### Nice to Have (P2)
- [ ] [Enhancement 1]
- [ ] [Enhancement 2]

### Explicitly Out of Scope
- [ ] [What we're NOT building]

Please adjust priorities as needed.

## Technical Questions
1. Existing code/patterns to leverage?
2. External dependencies or integrations?
3. Performance requirements (latency, throughput)?
4. Data volume expectations?
5. Security/compliance requirements?

## Timeline
- Target completion date?
- Any intermediate milestones?
- Flexibility on scope vs date?
```

### API Design Interview

```markdown
# API Design: [ENDPOINT/SERVICE NAME]

## Purpose
What does this API enable?

## Consumers
- Who will call this API?
- Internal services, external clients, or both?
- Expected request volume?

## Authentication & Authorization
| Option | Description | Recommendation |
|--------|-------------|----------------|
| API Key | Simple, good for server-to-server | Backend services |
| JWT | Stateless, user context | User-facing apps |
| OAuth 2.0 | Delegated auth, scopes | Third-party integrations |

Your preference?

## Resource Design

### Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | /resources | List resources |
| GET | /resources/:id | Get single resource |
| POST | /resources | Create resource |
| PUT | /resources/:id | Update resource |
| DELETE | /resources/:id | Delete resource |

Adjustments needed?

### Request/Response Format
```json
{
  "id": "uuid",
  "created_at": "ISO8601",
  "updated_at": "ISO8601",
  // ... fields
}
```

What fields are required?

## Error Handling
- Standard HTTP status codes?
- Error response format preference?
- Include stack traces in dev?

## Pagination
| Option | Pros | Cons |
|--------|------|------|
| Offset/Limit | Simple, familiar | Slow on large datasets |
| Cursor-based | Fast, consistent | More complex |
| Keyset | Very fast | Requires ordered field |

## Rate Limiting
- Requests per minute/hour?
- By IP, API key, or user?
- Graceful degradation or hard cutoff?

## Versioning Strategy
| Option | Example | When to Use |
|--------|---------|-------------|
| URL Path | /v1/resources | Breaking changes expected |
| Header | Accept-Version: 1 | Cleaner URLs |
| Query Param | ?version=1 | Simple clients |
```

### Database Schema Interview

```markdown
# Database Schema: [TABLE/ENTITY NAME]

## Entity Description
What does this entity represent?

## Fields

| Field | Type | Nullable | Default | Description |
|-------|------|----------|---------|-------------|
| id | UUID/SERIAL | No | auto | Primary key |
| created_at | TIMESTAMP | No | NOW() | Creation time |
| updated_at | TIMESTAMP | No | NOW() | Last update |
| ... | ... | ... | ... | ... |

## Relationships
- Belongs to: [parent entity]?
- Has many: [child entities]?
- Many-to-many with: [related entities]?

## Indexes Needed

| Columns | Type | Reason |
|---------|------|--------|
| (field1) | B-tree | Frequent lookups |
| (field1, field2) | Composite | Common filter combo |
| (field3) | GIN | Full-text search |

## Query Patterns
- Most common queries?
- Expected query frequency?
- Acceptable query latency?

## Data Volume
- Initial row count?
- Growth rate (rows/day)?
- Retention policy?

## Constraints
- Unique constraints?
- Check constraints?
- Foreign key behavior (CASCADE, RESTRICT)?

## Soft Delete vs Hard Delete
| Option | Pros | Cons |
|--------|------|------|
| Soft delete | Audit trail, recovery | Query complexity |
| Hard delete | Simpler, less storage | No recovery |

Your preference?
```

### UI Component Interview

```markdown
# UI Component: [COMPONENT NAME]

## Purpose
What user interaction does this enable?

## Variants
- [ ] Default state
- [ ] Hover state
- [ ] Active/pressed state
- [ ] Disabled state
- [ ] Loading state
- [ ] Error state
- [ ] Empty state

Which states are needed?

## Responsive Behavior
| Breakpoint | Behavior |
|------------|----------|
| Mobile (<640px) | [behavior] |
| Tablet (640-1024px) | [behavior] |
| Desktop (>1024px) | [behavior] |

## Accessibility
- Keyboard navigable?
- Screen reader support?
- ARIA labels needed?
- Focus management?
- Color contrast requirements?

## Interactivity
- Click/tap actions?
- Drag and drop?
- Keyboard shortcuts?
- Touch gestures?

## Animation
| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Hover | [effect] | 150ms |
| Click | [effect] | 200ms |
| Load | [effect] | 300ms |

## Props/Configuration
```typescript
interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  // What else?
}
```

## Integration
- Controlled or uncontrolled?
- Form library integration?
- Event callbacks needed?
```

## Technical Decision Interviews

### Technology Selection

```markdown
# Technology Decision: [CATEGORY]

## Context
[Why we need to make this decision]

## Requirements
- Must support: [requirement 1]
- Must support: [requirement 2]
- Nice to have: [optional requirement]

## Options Evaluated

### Option A: [Technology Name]
**Pros:**
- [advantage 1]
- [advantage 2]

**Cons:**
- [disadvantage 1]
- [disadvantage 2]

**Effort:** [Low/Medium/High]
**Risk:** [Low/Medium/High]

### Option B: [Technology Name]
**Pros:**
- [advantage 1]
- [advantage 2]

**Cons:**
- [disadvantage 1]
- [disadvantage 2]

**Effort:** [Low/Medium/High]
**Risk:** [Low/Medium/High]

### Option C: [Technology Name]
[Same format]

## Comparison Matrix

| Criteria | Weight | Option A | Option B | Option C |
|----------|--------|----------|----------|----------|
| Performance | 3 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Ease of use | 2 | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Community | 2 | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Cost | 1 | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| **Total** | | **X** | **Y** | **Z** |

## Recommendation
[Option X] because [reasoning]

## Your Input
- Agree with recommendation?
- Additional criteria to consider?
- Concerns about any option?
```

### Architecture Decision

```markdown
# Architecture Decision Record: [TOPIC]

## Status
Proposed / Accepted / Deprecated / Superseded

## Context
[What is the issue we're addressing?]

## Decision Drivers
- [Driver 1: e.g., scalability needs]
- [Driver 2: e.g., team expertise]
- [Driver 3: e.g., time constraints]

## Considered Options
1. [Option 1]
2. [Option 2]
3. [Option 3]

## Decision Outcome
Chosen option: [Option X]

### Positive Consequences
- [Benefit 1]
- [Benefit 2]

### Negative Consequences
- [Drawback 1]
- [Drawback 2]

### Risks
- [Risk 1]: Mitigation: [approach]
- [Risk 2]: Mitigation: [approach]

## Questions for You
1. Do you agree with this direction?
2. Are there constraints I'm not aware of?
3. Who else should weigh in on this decision?
```

## Quick Decision Templates

### Binary Choice
```markdown
## Quick Decision: [TOPIC]

**Option A:** [description]
- Good for: [use case]
- Trade-off: [downside]

**Option B:** [description]
- Good for: [use case]
- Trade-off: [downside]

**My lean:** [Option X] because [brief reason]

Which do you prefer?
```

### Priority Call
```markdown
## Priority Check: [FEATURE/TASK]

Given current constraints, should we:

A) **Do it now** - Important enough to prioritize
B) **Do it later** - Add to backlog for future sprint
C) **Don't do it** - Not worth the investment
D) **Need more info** - Can't decide yet because [what's missing]

Your call?
```

### Scope Confirmation
```markdown
## Scope Confirmation

For [FEATURE], I plan to:

✅ **Include:**
- [Item 1]
- [Item 2]
- [Item 3]

❌ **Exclude:**
- [Item 4] - reason: [why excluded]
- [Item 5] - reason: [why excluded]

⏳ **Defer to later:**
- [Item 6]
- [Item 7]

Does this match your expectations?
```
