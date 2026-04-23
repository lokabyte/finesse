---
description: "Review UI for design system compliance and visual quality. Modes: compliance, design, extract."
argument-hint: "[file or component] [mode: compliance | design | extract]"
---
# /review

Diagnose what's wrong — structural compliance, visual quality, or both.

**Modes:**
- `/review [file]` → Full review (compliance + design)
- `/review compliance [file]` → Structural scan only
- `/review design [file]` → Visual/UX critique only
- `/review extract [path]` → Extract design data from a codebase

---

## Compliance scan

1. **Inventory** — List all UI components, tokens, and patterns in the target.
2. **System compliance** — Flag non-system components, raw values, custom implementations with system equivalents.
3. **Token audit** — All color, spacing, typography must use semantic tokens. Flag raw hex, arbitrary pixels.
4. **Density check** — Verify density prop propagation on supporting components.
5. **Composition check** — Compound components used correctly, not partially.
6. **Accessibility** — Missing ARIA attributes, keyboard navigation gaps, focus management.
7. **Anti-patterns** — Cross-reference against known violations.
8. **UX copy** — Labels, CTAs, error messages, empty states are clear and state-aware.
9. **Brownfield** — Component follows established codebase patterns.

## Visual/UX critique

1. **Screenshot first** — Ground the critique in rendered UI when possible.
2. **First impression** — What draws the eye? What feels off?
3. **Hierarchy** — Most important content most prominent? Competing focal points?
4. **Spacing & rhythm** — Consistent rhythm? Breathing room where needed?
5. **Typography** — Size progression, weight contrast, readability.
6. **Color & contrast** — Guides attention? Interactive elements distinguishable?
7. **Affordance** — Can the user tell what's interactive?
8. **States** — Hover, focus, active, disabled, loading, empty, error — what's missing?
9. **Edge cases** — Long text, missing data, first-time vs returning user.

## Extract mode

Scan a codebase and output structured design data: component definitions with props, design tokens, compound component relationships, recurring UI patterns. Output as JSON or Markdown catalog.

## Output

- **Score** — Compliance percentage
- **Violations** — By severity (critical/warning/info) with location and fix
- **Visual issues** — Hierarchy, spacing, affordance problems
- **What works** — Strengths to preserve
- **Next** — Suggested follow-up commands (`/fix`, `/ship`, `/words`)
