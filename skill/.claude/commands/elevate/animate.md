---
description: Add motion and life to a component or page.
argument-hint: "[file path or component name to animate]"
---
# /animate
Add purposeful motion to the target — transitions, micro-animations, and state changes that make the UI feel alive and responsive.

## When to use
- When a UI feels static or unresponsive
- When state transitions are jarring (appear/disappear without animation)
- When you want to add polish through subtle motion

## Steps
1. **Identify opportunities** — Find state changes (show/hide, expand/collapse, enter/exit), user interactions (hover, click, drag), and data transitions (loading → loaded, empty → populated).
2. **Choose motion type** — For each opportunity: fade, slide, scale, or a combination. Match the motion to the semantic meaning (expand = scale up, dismiss = fade + slide out).
3. **Set timing** — Use appropriate durations: micro-interactions (100-200ms), state transitions (200-300ms), page transitions (300-500ms). Use easing curves that feel natural (ease-out for entrances, ease-in for exits).
4. **Implement** — Add CSS transitions, keyframe animations, or the design system's motion utilities. Respect `prefers-reduced-motion` for accessibility.
5. **Restrain** — Remove any animation that doesn't serve a purpose. Motion should guide, not distract.

## Output
- Animated code with motion additions
- List of animations added with their purpose and timing
- Note on reduced-motion handling
