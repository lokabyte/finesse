---
description: Add delight moments and micro-interactions that make the UI memorable.
argument-hint: "[file path or component name to spark]"
---
# /spark
Add moments of delight — micro-interactions, clever transitions, and thoughtful details that elevate the experience from functional to memorable.

## When to use
- When a feature works correctly but feels bland
- When you want to reward user actions with feedback
- When onboarding or success moments need celebration

## Steps
1. **Identify spark moments** — Find high-value interaction points: completing a task, achieving a milestone, first-time actions, empty-to-populated transitions, successful submissions.
2. **Choose the spark** — Match the delight to the moment: confetti for celebration, smooth check animation for completion, playful bounce for encouragement, satisfying haptic for confirmation.
3. **Keep it proportional** — A form submission needs subtle feedback, not fireworks. A major milestone can be bigger. Never interrupt the user's flow.
4. **Implement with restraint** — Add the spark using CSS animations, SVG animations, or lightweight libraries. Ensure it doesn't add significant bundle size.
5. **Respect preferences** — Honor `prefers-reduced-motion`. Make sparks enhancing, never required for understanding.

## Output
- Code with delight moments added
- List of sparks: what, where, why, and their motion-reduced fallback
