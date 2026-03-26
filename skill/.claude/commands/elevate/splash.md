---
description: Inject color with intent — enhance color usage for meaning, hierarchy, and emotion.
argument-hint: "[file path or component name to splash]"
---
# /splash
Enhance the target's color usage — add meaningful color to guide attention, communicate status, and create visual hierarchy.

## When to use
- When a UI is too monochromatic and needs visual differentiation
- When color is used inconsistently or without meaning
- When status indicators, categories, or actions need color coding

## Steps
1. **Color audit** — Map all current color usage. Identify: what has color, what doesn't, and whether color carries meaning or is purely decorative.
2. **Semantic color** — Ensure status colors are used correctly (success=green, danger=red, warning=amber, info=blue) using `color-tokens` skill.
3. **Hierarchy through color** — Use color intensity to reinforce visual hierarchy: primary actions get brand color, secondary actions stay neutral, destructive actions get danger color.
4. **Accent placement** — Add strategic color accents to draw attention: active states, selected items, progress indicators, interactive affordances.
5. **Consistency pass** — Ensure the same meaning always uses the same color. No red for success, no green for errors.

## Output
- Updated code with intentional color additions
- Color mapping: what color was added where and why
