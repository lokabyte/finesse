---
description: Harden for production — accessibility, edge cases, error states.
argument-hint: "[file path or component name to lock]"
---
# /lock
Harden the target for production use — add missing accessibility attributes, handle edge cases, implement error states, and ensure robustness.

## When to use
- Before shipping a feature to production
- After `/audit` flags accessibility or robustness gaps
- When a component needs to handle real-world conditions

## Steps
1. **Accessibility hardening** — Add missing ARIA attributes, ensure keyboard navigation works, verify focus management, check screen reader announcements using `accessibility` skill.
2. **Error states** — Ensure every data-dependent element has an error state. Check form validation, API failure handling, and timeout scenarios.
3. **Empty states** — Verify empty state designs for lists, tables, search results, and dashboards.
4. **Loading states** — Add skeleton loaders or spinners where data is async. Ensure loading states match the final layout to prevent layout shift.
5. **Edge cases** — Test with: very long text (truncation), very short text, missing optional data, single item vs many items, first-time user vs returning user.
6. **Responsive check** — Verify the component holds up at different viewport sizes if applicable.

## Output
- Hardened code with all additions applied
- Checklist of what was added and what was already covered
- Any remaining gaps that need design decisions
