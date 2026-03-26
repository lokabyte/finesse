---
description: Human-eye visual and UX critique of a UI component or page.
argument-hint: "[file path, component name, or screenshot]"
---
# /critique
Provide a designer's-eye critique of the target UI — not just system compliance, but visual quality, UX flow, and craft.

## When to use
- When you want a design review beyond technical compliance
- When something "feels off" but you can't pinpoint why
- When evaluating visual hierarchy, rhythm, and balance

## Steps
1. **Screenshot first** — If the component is renderable, take a screenshot to ground the critique in what the user actually sees. If a screenshot is provided, use it as the primary input.
2. **First impression** — Describe what you see at a glance. What draws the eye? What feels off?
3. **Visual hierarchy** — Evaluate the information hierarchy. Is the most important content the most prominent? Are there competing focal points?
4. **Spacing & rhythm** — Check vertical and horizontal rhythm. Are spacing values consistent? Is there breathing room where needed? Flag specific areas with misalignment.
5. **Typography** — Evaluate type choices: size progression, weight contrast, line height, readability.
6. **Color & contrast** — Assess color usage: does it guide attention? Are interactive elements clearly distinguishable? Check contrast ratios.
7. **Affordance** — Can the user tell what's interactive? Do buttons look like buttons? Do links look like links? Are clickable areas obvious?
8. **Cleanliness & clarity** — Is the UI visually clean? Is there unnecessary noise? Is information presented clearly without cognitive overload?
9. **UX copy** — Review all text on screen using `ux-writing` skill. Are labels clear? Are CTAs specific? Do error/empty states guide the user?
10. **Interaction design** — Consider hover, focus, active, disabled, loading, empty, and error states. What's missing?
11. **Edge cases** — Long text, missing data, slow connections, first-time vs returning user. How does the UI hold up?

## Output
A candid design critique with:
- **What works** — Strengths to preserve
- **What needs work** — Specific issues ranked by impact
- **Suggestions** — Concrete improvements, not vague advice
- **Suggested next commands** — e.g., `/polish` to refine, `/typeset` to fix type hierarchy
