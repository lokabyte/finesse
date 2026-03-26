---
description: Replatform a component or page to a different design system or context.
argument-hint: "[file path] to [target system or context]"
---
# /adapt
Adapt the target from one design system, framework, or context to another — preserving behavior and visual intent while using the target system's components and tokens.

## When to use
- When migrating from one design system to another (e.g., MUI → Design Stack)
- When adapting a component for a different product context (e.g., desktop → mobile)
- When porting a design from a prototype to production code

## Steps
1. **Analyze source** — Understand what the current implementation does: components used, tokens referenced, behavior, states, and composition.
2. **Map components** — Find equivalent components in the target system using `component-catalog` skill. Document gaps where no equivalent exists.
3. **Map tokens** — Translate color, spacing, and typography tokens to the target system using `color-tokens` skill.
4. **Rewrite** — Rebuild the component using the target system's primitives. Preserve the original's behavior and visual intent.
5. **Verify** — Compare the adapted output against the original. Flag any visual or behavioral differences.

## Output
- Adapted code using the target system
- Mapping table: source component/token → target component/token
- Gap list: what couldn't be directly mapped and how it was handled
