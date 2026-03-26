---
description: Extract the core pattern from a component — strip decoration, isolate the reusable essence.
argument-hint: "[file path or component name to distill]"
---
# /distill
Extract the reusable core pattern from a specific implementation — strip away context-specific decoration, one-off styling, and hardcoded content to reveal the underlying pattern.

## When to use
- When you want to turn a one-off implementation into a reusable pattern
- When looking for the common structure across similar components
- When simplifying a complex component to its structural essence

## Steps
1. **Identify the core** — What is this component at its most basic? What structure, behavior, and props define it independent of any specific use case?
2. **Strip context** — Remove hardcoded content, specific API calls, one-off styles, and business logic that's not part of the pattern.
3. **Parameterize** — Replace stripped content with props, slots, or render props. Make the pattern configurable.
4. **Validate against system** — Check if the distilled pattern already exists in the design system using `component-catalog` skill. If so, recommend using the existing component instead.
5. **Document** — Describe the pattern: what it is, when to use it, and how it composes with other patterns.

## Output
- The distilled pattern as clean, reusable code
- A description of what was removed and why
- Whether a system component already covers this pattern
