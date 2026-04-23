---
description: "Visual enhancement with a direction — intensity, color, motion, typography, layout, onboarding."
argument-hint: "[file or component] [direction: louder | quieter | max | color | motion | delight | type | layout | onboarding]"
---
# /style

Make the target look or feel different. Takes a direction argument.

**Directions:**
- `/style [file]` → Assess and pick highest-impact visual improvement
- `/style louder` / `quieter` / `max` → Intensity dial
- `/style color` / `motion` / `delight` → Add visual layers
- `/style type` / `layout` / `onboarding` → Structure and flow

---

## louder
1. Identify what needs emphasis — CTAs, metrics, status, headings.
2. Color up — weak → stronger variants. Add color where it adds meaning.
3. Weight up — regular → semibold. Medium → bold.
4. Contrast up — interactive elements pop against context.
5. Tighten spacing — group related elements closer.
6. Sharpen interactions — distinct hover, visible focus rings, pronounced active states.

## quieter
1. Identify loudest elements — bold colors, heavy weights, dense information.
2. Color down — strong → weaker variants.
3. Weight down — semibold → regular. Bold → medium.
4. Space up — increase padding/margins, let elements breathe.
5. Simplify interactions — softer hovers, lighter focus rings.
6. Mute decorations — lighten borders, reduce shadows, remove unnecessary separators.

## max
1. Identify the hero — single most important thing. Everything else serves it.
2. Scale up — largest type sizes. Generous whitespace.
3. Maximum contrast — dark/light, full saturation accents against neutral.
4. Simplify ruthlessly — remove anything that doesn't amplify the core message.
5. Motion with purpose — entrance animations, scroll reveals. Build anticipation.
6. Stay in system — bold ≠ breaking tokens/components.

## color
1. Audit current color — what has it, what doesn't, does it carry meaning?
2. Semantic correctness — success=green, danger=red, warning=amber, info=blue.
3. Hierarchy — brand for primary actions, neutral for secondary, danger for destructive.
4. Accents — strategic color for active states, selections, progress, affordances.
5. Consistency — same meaning, same color, everywhere.

## motion
1. Opportunities — state changes, interactions, data transitions.
2. Match motion to meaning — expand=scale, dismiss=fade+slide.
3. Timing — micro 100-200ms, state 200-300ms, page 300-500ms. Natural easing.
4. Implement — CSS transitions or keyframes.
5. Restrain — no purposeless animation. Respect `prefers-reduced-motion`.

## delight
1. Spark moments — task completion, milestones, first-time actions, empty→populated.
2. Match delight to moment — confetti for celebration, smooth check for completion.
3. Proportional — form submit = subtle. Major milestone = bigger. Never interrupt flow.
4. Respect `prefers-reduced-motion`.

## type
1. Inventory — all text styles vs system type scale.
2. Hierarchy — heading → body → caption. Max 3-4 levels per view.
3. Readability — 45-75 char line length, 1.4-1.6 line height, 4.5:1 contrast.
4. Rhythm — consistent baseline grid. More space above headings than below.
5. Details — orphans/widows, capitalization, truncation on overflow.

## layout
1. Audit — current structure, grid, alignment, responsive behavior.
2. Grid — column count, gutters, margins.
3. Content zones — header, nav, main, sidebar, footer with clear purpose.
4. Flow — F-pattern for text, Z-pattern for landing. Primary actions in attention hotspots.
5. Responsive — stack mobile, expand desktop.
6. White space — generous around primary content, tight in data views.

## onboarding
1. Map journey — user's goal, steps, friction points.
2. Choose pattern — tooltips, inline hints, empty state guidance, progressive disclosure, walkthrough.
3. Copy — short, actionable. Benefit first.
4. Flow — logical sequence, allow skipping, remember dismissed states, don't block UI.
5. Returning users — don't re-show dismissed. Provide re-access to help.

## Output
- Modified code with changes applied
- Summary of what changed and why
- System compliance notes if any
