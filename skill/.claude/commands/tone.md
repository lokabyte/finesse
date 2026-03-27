---
description: Shift the tonal register of UI copy while preserving meaning.
argument-hint: "[file path or component] [direction: formal, casual, technical, plain, urgent, calm]"
---
# /tone
Adjust the tonal register of UI copy — formal ↔ casual, technical ↔ plain, urgent ↔ calm — while preserving meaning and intent.

## When to use
- A feature targets a different audience than the default (e.g., enterprise admin vs. individual dev)
- Copy feels too stiff for an onboarding flow or too casual for a billing error
- Migrating copy from one product surface to another with different voice expectations
- Standardizing tone after multiple authors have contributed copy

## Steps
1. **Read the room** — Identify the context: What product surface? What user state (first visit, error, success, routine task)? What's the emotional register?
2. **Reference voice** — Load the `voice` skill to understand the product's baseline tone and where this specific context sits on the tone spectrum.
3. **Map current register** — Characterize the existing copy along three axes:
   - Formal ↔ Casual
   - Technical ↔ Plain
   - Urgent ↔ Calm
4. **Identify target** — Based on the user's direction or the context, determine the target register on each axis.
5. **Shift copy** — Rewrite each piece of user-facing text to match the target register. Preserve meaning, adjust delivery.
6. **Consistency check** — Ensure the shifted copy is internally consistent. A casual heading shouldn't lead into a formal body.
7. **Boundary check** — Verify the shift doesn't cross product voice boundaries. Even casual BS copy shouldn't use slang. Even formal copy shouldn't be cold.

## Output
- **Context** — Where this copy lives and who reads it
- **Tone shift** — From [current register] → To [target register] on each axis
- **Rewrites** — Before/after for each piece of text with the tonal shift highlighted
- **Voice notes** — Any places where the shift bumps against product voice boundaries
