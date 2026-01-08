# Agent Orchestration Patterns

Detailed patterns for coordinating specialized agents in feature development.

## Explorer Agent Prompts

### Pattern: Similar Feature Analysis
```
Find features similar to [FEATURE] and trace through their implementation comprehensively.

Focus on:
1. Entry points (API routes, UI components, CLI commands)
2. Data flow from input to storage
3. Validation and error handling patterns
4. Testing approaches used
5. Integration with other systems

Return:
- 5-10 key files to read
- Pattern summary
- Recommended approach based on existing patterns
```

### Pattern: Architecture Mapping
```
Map the architecture and abstractions for [AREA], tracing through the code comprehensively.

Analyze:
1. Layer structure (API → Service → Repository → DB)
2. Dependency injection patterns
3. Configuration management
4. Error propagation
5. Logging and observability

Return:
- Architecture diagram (ASCII)
- Key abstractions and their responsibilities
- Extension points for new features
```

### Pattern: Integration Point Analysis
```
Identify all integration points and extension mechanisms relevant to [FEATURE].

Look for:
1. Plugin/hook systems
2. Event emitters/subscribers
3. Middleware chains
4. Configuration-driven behavior
5. Feature flags

Return:
- Integration point inventory
- Recommended integration approach
- Potential conflicts or concerns
```

## Architect Agent Prompts

### Pattern: Minimal Change Design
```
Design the smallest change that solves [PROBLEM] while maintaining code quality.

Constraints:
- Minimize files touched
- Reuse existing patterns exactly
- No new abstractions unless absolutely necessary
- Prefer configuration over code changes

Deliver:
- File-by-file change list
- Lines of code estimate
- Risk assessment
```

### Pattern: Clean Architecture Design
```
Design a maintainable, elegant solution for [FEATURE].

Priorities:
1. Clear separation of concerns
2. Testability in isolation
3. Future extensibility
4. Self-documenting code

Deliver:
- Component diagram
- Interface definitions
- Dependency flow
- Test strategy
```

### Pattern: Pragmatic Balance Design
```
Design a balanced solution for [FEATURE] considering timeline and quality.

Balance:
- Implementation speed vs maintainability
- Code reuse vs over-abstraction
- Testing coverage vs diminishing returns
- Documentation vs self-evident code

Deliver:
- Phased implementation plan
- MVP vs full feature scope
- Technical debt acknowledgment
```

## Reviewer Agent Prompts

### Pattern: Security Audit
```
Perform security audit on [FILES/FEATURE] focusing on production risks.

Check for:
1. OWASP Top 10 vulnerabilities
2. Authentication/authorization flaws
3. Input validation gaps
4. Sensitive data exposure
5. Injection vulnerabilities (SQL, XSS, Command)
6. Cryptographic weaknesses

For each finding:
- Severity (Critical/High/Medium/Low)
- Exploit scenario
- Specific fix with code
```

### Pattern: Performance Review
```
Analyze performance characteristics of [CODE].

Evaluate:
1. Algorithmic complexity (Big O)
2. Database query patterns (N+1, missing indexes)
3. Memory allocation patterns
4. I/O blocking operations
5. Caching opportunities
6. Scalability bottlenecks

For each issue:
- Current impact
- Optimized solution
- Expected improvement
```

### Pattern: Architecture Review
```
Review architectural quality of [CODE].

Assess:
1. SOLID principle adherence
2. Coupling and cohesion
3. Design pattern appropriateness
4. Error handling completeness
5. Testability
6. Documentation adequacy

For each issue:
- Pattern violation
- Recommended fix
- Migration effort
```

## Synthesis Patterns

### Pattern: Multi-Agent Finding Consolidation
```
After receiving findings from multiple review agents:

1. Deduplicate overlapping issues
2. Assign unified severity based on:
   - Production impact potential
   - Exploit likelihood
   - Fix complexity
3. Group by category
4. Create prioritized action list
5. Estimate total fix effort
```

### Pattern: Architecture Decision Record
```
After architecture design phase:

# ADR: [Feature Name]

## Context
[Problem being solved]

## Decision
[Chosen approach]

## Alternatives Considered
[Other approaches and why rejected]

## Consequences
- Positive: [Benefits]
- Negative: [Trade-offs]
- Risks: [What could go wrong]

## Implementation Notes
[Key implementation details]
```

## Retrospective Patterns

### Pattern: Sprint Analysis
```
Analyze the feature implementation for [FEATURE]:

1. Goal Alignment
   - What was requested vs delivered
   - Scope changes during implementation
   - Requirements that evolved

2. Code Quality
   - Patterns followed
   - Test coverage achieved
   - Documentation added

3. Architecture
   - Design decisions made
   - Technical debt introduced
   - Future considerations

4. Process
   - What went well
   - What could improve
   - Blockers encountered

5. Recommendations
   - Follow-up tasks
   - Monitoring needs
   - Documentation gaps
```

## Anti-Patterns to Avoid

### Don't: Sequential When Parallel Works
```
# Bad: Waits for each agent
agent1_result = await Task(agent1)
agent2_result = await Task(agent2)

# Good: Parallel execution
results = await gather(Task(agent1), Task(agent2))
```

### Don't: Skip Clarification
```
# Bad: Assume requirements
"I'll implement user authentication using JWT..."

# Good: Clarify first
"Before implementing authentication, I need to clarify:
1. Session-based or token-based?
2. OAuth providers to support?
3. MFA requirements?"
```

### Don't: Monolithic Implementation
```
# Bad: One giant commit
git commit -m "Add entire feature"

# Good: Logical chunks
git commit -m "feat: add user model"
git commit -m "feat: add auth service"
git commit -m "feat: add login endpoint"
git commit -m "test: add auth tests"
```

### Don't: Skip Review Phase
```
# Bad: Ship without review
"Implementation complete, creating PR..."

# Good: Multi-perspective review
"Launching security, performance, and architecture review agents..."
```
