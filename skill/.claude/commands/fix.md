---
description: "Fix design system violations — tokens, spacing, trim, or migrate. Modes: tokens, spacing, trim, migrate."
argument-hint: "[file or component] [mode: tokens | spacing | trim | migrate <target>]"
---
# /fix

Make the target correct. Full pipeline runs all three steps; modes run one.

**Modes:**
- `/fix [file]` → Full pipeline (tokens + spacing + trim)
- `/fix tokens [file]` → Raw values → semantic tokens, custom → system components
- `/fix spacing [file]` → Spacing, alignment, visual consistency
- `/fix trim [file]` → Remove redundancy and excess
- `/fix migrate [file] to [target]` → Replatform to a different design system

---

## Step 1: Tokens
1. **Scan** — Find raw values (hex, px, font sizes) and non-system components.
2. **Map** — Match each to the closest semantic token or system component.
3. **Replace** — Swap in tokens/components. Preserve behavior and visual output.
4. **Flag** — Note cases where no exact token match exists.

## Step 2: Spacing
5. **Spacing** — Replace arbitrary margin/padding/gap with system tokens. Fix vertical rhythm.
6. **Alignment** — Grid alignment, text/icon/form field alignment.
7. **Consistency** — Fix mixed border radii, inconsistent shadows, varying padding.
8. **Details** — Icon sizes relative to text, avatar proportions, badge placement.

## Step 3: Trim
9. **Structure** — Remove unnecessary wrappers, redundant components, over-nesting.
10. **Props** — Remove defaults, unused props, derivable props.
11. **Styles** — Remove overridden styles, duplicated classes, unused CSS.
12. **Noise** — Remove decorative elements that don't serve the user.

## Migrate mode

Replatform from one system to another:
1. Analyze source (components, tokens, behavior, states)
2. Map to target equivalents, document gaps
3. Rebuild with target primitives, preserve intent
4. Flag differences

## Output
- Modified code with fixes applied
- Changelog: old → new for each replacement
- Gaps: values with no token equivalent
- Trim stats: lines/bytes saved
