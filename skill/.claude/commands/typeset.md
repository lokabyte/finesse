---
description: Typography craft — refine hierarchy, rhythm, readability, and type composition.
argument-hint: "[file path or component name to typeset]"
---
# /typeset
Refine the target's typography — establish clear hierarchy, improve readability, tighten line heights, and bring typographic craft to the UI.

## When to use
- When text-heavy pages feel flat or hard to scan
- When headings, body text, and labels lack clear hierarchy
- When readability needs improvement (line length, spacing, contrast)

## Steps
1. **Type inventory** — Catalog all text styles in use: sizes, weights, line heights, letter spacing. Check against the design system's type scale.
2. **Hierarchy** — Ensure a clear progression from heading to body to caption. No more than 3-4 distinct levels on a single view. Each level should be visually distinct.
3. **Readability** — Check line lengths (45-75 characters for body text), line heights (1.4-1.6 for body), and contrast ratios (4.5:1 minimum for normal text, 3:1 for large text).
4. **Rhythm** — Verify vertical rhythm: spacing between text elements should follow a consistent baseline grid. Headings need more space above than below.
5. **Details** — Check for: orphans/widows, inconsistent capitalization, missing text truncation on overflow, font loading behavior (FOUT/FOIT).

## Output
- Typeset code with all refinements applied
- Type scale summary showing before/after
