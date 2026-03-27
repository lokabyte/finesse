---
description: Smooth surfaces — refine spacing, alignment, and visual consistency.
argument-hint: "[file path or component name to polish]"
---
# /polish
Refine the target's visual surfaces — fix inconsistent spacing, align elements, tighten visual rhythm, and bring everything to a consistent level of craft.

## When to use
- When the UI is functionally correct but visually unpolished
- After building a feature, as a finishing pass
- When spacing, alignment, or visual rhythm feels inconsistent

## Steps
1. **Spacing audit** — Check all margin, padding, and gap values. Replace arbitrary values with design system spacing tokens. Ensure consistent vertical rhythm.
2. **Alignment pass** — Verify elements are properly aligned on the grid. Check text alignment, icon alignment with text, and form field alignment.
3. **Consistency sweep** — Look for inconsistencies: mixed border radii, inconsistent shadow usage, varying padding on similar elements.
4. **Micro-details** — Check icon sizes relative to text, avatar proportions, badge placement, divider usage, and empty state styling.
5. **Apply fixes** — Make all refinements, preserving existing behavior.

## Output
- Polished code with all refinements applied
- Summary of what changed and why
