---
description: Deep structural scan of a file or component against design system rules.
argument-hint: "[file path or component name to audit]"
---
# /audit
Run a comprehensive design system compliance audit on the target file or component.

## When to use
- Before shipping a feature to catch design system violations
- When reviewing a PR for design consistency
- When onboarding to a codebase to understand its design health

## Steps
1. **Inventory** — List all UI components, tokens, and patterns used in the target using `component-catalog` skill.
2. **System compliance** — Check every component against the design system. Flag any non-system components, raw values, or custom implementations that have system equivalents.
3. **Token audit** — Verify all color, spacing, and typography values use semantic tokens. Flag raw hex, arbitrary pixel values, or hardcoded strings using `color-tokens` skill.
4. **Density check** — Verify density prop propagation on all components that support it using `density-system` skill.
5. **Composition check** — Verify compound components are used correctly (not partially) using `composition` skill.
6. **Accessibility scan** — Check for missing ARIA attributes, keyboard navigation gaps, and focus management issues using `accessibility` skill.
7. **Anti-pattern scan** — Cross-reference against known anti-patterns using `anti-patterns` skill.
8. **UX copy review** — Check labels, CTAs, error messages, and empty states against `ux-writing` skill. Verify state-aware copy (coming-from, current, going-to).
9. **Brownfield pattern check** — If working in an existing codebase, verify the component follows established patterns using `brownfield-patterns` skill.
10. **Visual synthesis** (if screenshot available) — Take a screenshot of the rendered UI and analyze for: alignment issues, spacing inconsistencies, visual hierarchy problems, affordance gaps (can the user tell what's clickable?), cleanliness, and clarity. Flag specific coordinates/areas where visual issues are detected.

## Output
A structured audit report with:
- **Score** — Overall compliance percentage
- **Violations** — Grouped by severity (critical, warning, info) with file location, what's wrong, and how to fix it
- **Passing checks** — What's already correct (keep it up)
- **UX copy issues** — Vague labels, missing error messages, generic CTAs
- **Visual issues** — (if screenshot was analyzed) Alignment, spacing, affordance, and clarity problems with annotated locations
- **Suggested next commands** — e.g., `/tune` to fix token issues, `/lock` to harden a11y, `/clarify` to fix copy
