---
description: "Harden for production — accessibility, states, edge cases, clarity. Modes: a11y, states, clarity."
argument-hint: "[file or component] [mode: a11y | states | clarity]"
---
# /ship

Make the target production-ready. Full run covers all four areas; modes run one.

**Modes:**
- `/ship [file]` → Full hardening
- `/ship a11y [file]` → Accessibility only
- `/ship states [file]` → Error/empty/loading states only
- `/ship clarity [file]` → Information architecture only

---

## Accessibility
1. **ARIA** — Add missing labels, roles, descriptions.
2. **Keyboard** — All interactive elements reachable via Tab. Enter/Space triggers buttons, Escape closes overlays.
3. **Focus** — Correct focus movement on open/close, transitions, dynamic content. Focus trapping in modals.
4. **Screen reader** — Announcements for dynamic updates, status changes, form errors.

## States
5. **Error** — Every data-dependent element has an error state. Form validation, API failure, timeouts.
6. **Empty** — Lists, tables, search results have empty state designs (headline + description + CTA). No blank panels.
7. **Loading** — Skeleton or spinner for async content. Layout matches final to prevent shift.

## Edge cases
8. **Text** — Long text truncates. Short text doesn't break layout.
9. **Data** — Missing optional data handled. Single vs many items renders correctly.
10. **Users** — First-time vs returning both have appropriate experiences.
11. **Responsive** — Holds up across viewport sizes.

## Clarity
12. **Audit** — What's essential, secondary, or noise?
13. **Labels** — Replace vague ("Submit") with clear ("Save changes").
14. **Hierarchy** — Most important content most prominent.
15. **Flow** — User's path obvious. Breadcrumbs, progress, contextual help where needed.

## Output
- Hardened code with additions applied
- Checklist: what was added, what was already covered
- Gaps needing design decisions
