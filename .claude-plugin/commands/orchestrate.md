---
name: orchestrate
description: Orchestrate complete feature development with specialized agents
user_invocable: true
allowed_tools:
  - Task
  - TodoWrite
  - AskUserQuestion
  - Skill
  - Read
  - Glob
  - Grep
  - Edit
  - Write
  - Bash
---

# Feature Development Orchestrator

You are orchestrating a complete feature development lifecycle using specialized agents.

## Your Mission

Coordinate the following phases for: **$ARGUMENTS**

## Phase 1: Discovery

First, understand what needs to be built:

1. Parse the user's request to identify:
   - Core functionality needed
   - Implicit requirements
   - Success criteria
   - Constraints

2. If anything is unclear, use AskUserQuestion to clarify:
   - Scope boundaries
   - Technical preferences
   - Priority trade-offs

3. Create the phase tracking todo list:

```
TodoWrite(todos=[
    {"content": "Phase 1: Discovery - Clarify requirements", "status": "in_progress", "activeForm": "Clarifying requirements"},
    {"content": "Phase 2: Exploration - Understand codebase", "status": "pending", "activeForm": "Exploring codebase"},
    {"content": "Phase 3: Architecture - Design approaches", "status": "pending", "activeForm": "Designing architecture"},
    {"content": "Phase 4: Implementation - Build feature", "status": "pending", "activeForm": "Building feature"},
    {"content": "Phase 5: Review - Quality assurance", "status": "pending", "activeForm": "Reviewing quality"},
    {"content": "Phase 6: Retrospective - Evaluate delivery", "status": "pending", "activeForm": "Running retrospective"},
])
```

## Phase 2: Codebase Exploration

Launch parallel explorer agents:

```python
Task(
    subagent_type="feature-dev:code-explorer",
    description="Explore similar features",
    prompt="Find features similar to [FEATURE] and trace implementation patterns. Return 5-10 key files."
)

Task(
    subagent_type="feature-dev:code-explorer",
    description="Map architecture",
    prompt="Map the architecture for [RELEVANT AREA]. Return key abstractions and extension points."
)
```

After agents complete:
1. Read all identified key files
2. Summarize patterns discovered
3. Update todo status

## Phase 3: Architecture Design

Launch competing architect agents:

```python
Task(
    subagent_type="feature-dev:code-architect",
    description="Minimal approach",
    prompt="Design smallest change that solves the problem..."
)

Task(
    subagent_type="feature-dev:code-architect",
    description="Clean architecture",
    prompt="Design for maximum maintainability..."
)
```

Present approaches to user:
- Summary of each approach
- Trade-offs table
- Your recommendation
- **Ask which to proceed with**

## Phase 4: Implementation

Only after user approves architecture:

1. Break down into subtasks using TodoWrite
2. Read all files before modifying
3. Implement following chosen approach
4. Follow codebase conventions
5. Commit logical chunks

## Phase 5: Quality Review

Launch parallel review agents:

```python
Task(
    subagent_type="brutal-code-critic",
    description="Security review",
    prompt="Audit for security vulnerabilities..."
)

Task(
    subagent_type="brutal-code-critic",
    description="Performance review",
    prompt="Analyze performance characteristics..."
)

Task(
    subagent_type="architecture-reviewer",
    description="Architecture review",
    prompt="Review architectural quality..."
)
```

Also invoke progressive analysis skill:
```python
Skill(skill="progressive-analysis")
```

Consolidate findings by severity and present to user.

## Phase 6: Retrospective

Launch sprint retrospective:

```python
Task(
    subagent_type="sprint-retrospective-analyst",
    description="Sprint retrospective",
    prompt="Analyze the feature implementation: goal alignment, code quality, architecture, testing gaps, technical debt, recommendations..."
)
```

## Output Requirements

At each phase transition:
1. **Summary**: What was accomplished
2. **Findings**: Key discoveries or decisions
3. **Next**: Clear next steps
4. **Questions**: Any blockers needing user input

## Begin Now

Start with Phase 1: Discovery for the feature: **$ARGUMENTS**

If no feature was specified, ask the user what they'd like to build.
