---
description: Align a component or page to design system norms and tokens.
argument-hint: "[file path or component name to tune]"
---
# /tune
Bring the target into alignment with the design system — replace raw values with tokens, swap custom components for system equivalents, normalize patterns.

## When to use
- After `/audit` flags token violations or non-system components
- When migrating code that was written before the design system existed
- When cleaning up tech debt in UI code

## Steps
1. **Scan** — Identify all raw values (hex colors, pixel spacing, font sizes) and non-system components.
2. **Map** — For each raw value, find the closest semantic token using `color-tokens` skill. For each custom component, find the system equivalent using `component-catalog` skill.
3. **Replace** — Swap raw values for tokens. Replace custom components with system components. Preserve behavior and visual output.
4. **Verify** — Confirm the tuned output matches the original visually. Flag any cases where the closest token doesn't match exactly.

## Output
- Modified code with all replacements applied
- A changelog of what was tuned: old value → new token/component
- Any unresolvable gaps (no token exists for this value)
