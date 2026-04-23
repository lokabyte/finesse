---
description: "Fix UI copy — rewrite for clarity and consistency, or shift tonal register."
argument-hint: "[file or component] [tone: formal | casual | technical | plain | urgent | calm]"
---
# /words

Fix the words — rewrite UI text for clarity, consistency, and tone alignment.

**Modes:**
- `/words [file]` → Full rewrite (clarity, consistency, terminology, brevity)
- `/words casual` / `formal` / `technical` / `plain` / `urgent` / `calm` → Tone shift

---

## Full rewrite (default)

1. **Inventory** — List all user-facing text: headings, labels, buttons, tooltips, errors, empty states, loading text, confirmations, placeholders.
2. **Voice check** — Is the copy consistent with the product's established voice and terminology?
3. **Clarity pass** — Does the user know where they are, what happened, and what to do next? Rewrite anything that fails.
4. **Action audit** — CTAs describe the outcome, not the action. "Save changes" not "Submit". "Create project" not "Add".
5. **Error messages** — What happened → Why → What to do. No blame, no jargon. Never "Something went wrong."
6. **Empty states** — What this area shows → Why it's empty → How to populate it. Never blank panels.
7. **Terminology** — Replace non-standard terms with the product's preferred vocabulary.
8. **Brevity pass** — Cut every word that doesn't earn its place. UI copy should be scannable, not readable.

---

## Tone shift (when direction specified)

1. **Read the room** — What surface? What user state (first visit, error, success, routine)?
2. **Map current register** — Formal ↔ Casual, Technical ↔ Plain, Urgent ↔ Calm.
3. **Shift copy** — Rewrite each piece of user-facing text to match target register. Preserve meaning, adjust delivery.
4. **Consistency check** — A casual heading shouldn't lead into a formal body.
5. **Boundary check** — Even casual avoids slang. Even formal avoids coldness.

## Output
- Before/after for each rewrite with location and rationale
- Tone shift noted where register changed
- Gaps where copy needs design decisions
