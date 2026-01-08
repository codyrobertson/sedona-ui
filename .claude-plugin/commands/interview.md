---
name: interview
description: Start a structured interview to gather requirements or make decisions
user_invocable: true
allowed_tools:
  - AskUserQuestion
  - Read
  - Glob
  - Grep
---

# Structured Interview Session

Conduct a focused interview for: **$ARGUMENTS**

## Interview Mode Selection

If no specific topic provided, ask the user:

```python
AskUserQuestion(questions=[
    {
        "question": "What type of interview do you need?",
        "header": "Interview Type",
        "options": [
            {"label": "Feature Discovery", "description": "Define requirements for a new feature"},
            {"label": "Technical Decision", "description": "Choose between technical approaches"},
            {"label": "Scope Clarification", "description": "Define boundaries of existing work"},
            {"label": "Bug Investigation", "description": "Gather context about an issue"},
        ],
        "multiSelect": False
    }
])
```

## Interview Execution

Based on the topic, conduct a structured interview:

### For Feature Discovery:
1. **Problem Statement** - What are we solving and for whom?
2. **Success Criteria** - How do we measure success?
3. **Scope Definition** - What's in and out?
4. **Technical Context** - Constraints and integrations?
5. **Edge Cases** - Error handling and boundaries?

### For Technical Decisions:
1. **Context** - Why does this decision matter?
2. **Options** - What are the choices?
3. **Trade-offs** - Pros/cons of each?
4. **Recommendation** - What do I suggest and why?
5. **Confirmation** - Get user's choice

### For Scope Clarification:
1. **Current Understanding** - What I think we're building
2. **Include List** - Explicitly in scope
3. **Exclude List** - Explicitly out of scope
4. **Gray Areas** - Need clarification
5. **Confirmation** - Validate with user

### For Bug Investigation:
1. **Symptoms** - What's the observed behavior?
2. **Expected** - What should happen?
3. **Reproduction** - Steps to reproduce?
4. **Context** - When did it start? Recent changes?
5. **Impact** - Severity and affected users?

## Interview Best Practices

1. **Ask 3-5 questions at a time** - Don't overwhelm
2. **Provide options when possible** - Easier to choose than open-ended
3. **Explain why you're asking** - Context helps get better answers
4. **Summarize before proceeding** - Confirm understanding

## Output

End the interview with:

```markdown
## Interview Summary

### Decisions Made
- [Decision 1]
- [Decision 2]

### Open Items
- [Still need to clarify X]

### Next Steps
- [What happens next]

Ready to proceed? Or any adjustments needed?
```

## Begin Interview

Start the interview for: **$ARGUMENTS**

If no topic specified, ask what the user needs help clarifying.
