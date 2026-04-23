---
description: "Describe what you need in plain language — gets routed to the right Finesse command, or teaches you directly."
argument-hint: "[what you want to do]"
---
# /finesse

Read the user's intent and route to the right command. Execute directly if unambiguous, otherwise recommend with a one-line rationale.

| User says something like... | Route to |
|---|---|
| "check this", "what's wrong", "audit", "review" | `/review` |
| "fix tokens", "align to system", "clean up" | `/fix` |
| "production ready", "accessibility", "handle errors" | `/ship` |
| "make it bolder", "add motion", "fix typography", "layout" | `/style [direction]` |
| "fix the copy", "rewrite errors", "more casual" | `/words [direction]` |
| "teach me", "what is", "how does" | Teach directly using design system knowledge |
| "extract pattern", "distill this component" | Extract the reusable core pattern from the implementation |

If unclear, ask: "I can review, fix, harden, style, or rewrite words. I can also teach you about the design system. What are you trying to do?"
