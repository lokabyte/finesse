---
description: Cut excess — remove redundancy, simplify structure, reduce noise.
argument-hint: "[file path or component name to trim]"
---
# /trim
Strip the target down to its essentials — remove redundant wrappers, unnecessary props, dead code, and visual noise.

## When to use
- When a component has accumulated cruft over time
- When the UI feels cluttered or overbuilt
- After feature iterations that left behind unused code

## Steps
1. **Structural scan** — Identify unnecessary wrapper divs, redundant components, and over-nested structures.
2. **Prop audit** — Find props set to their default values (remove them), unused props, and props that could be derived.
3. **Style trim** — Remove overridden styles, duplicated class names, and unused CSS.
4. **Visual noise** — Identify visual elements that don't serve the user: decorative borders, excessive labels, redundant icons, unnecessary dividers.
5. **Simplify** — Apply all reductions while preserving behavior and visual output.

## Output
- Trimmed code with a diff summary
- Lines removed / bytes saved
- Any structural simplifications made
