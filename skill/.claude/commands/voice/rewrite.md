---
description: Rewrite UI copy for clarity, consistency, and tone alignment.
argument-hint: "[file path, component, or specific UI text to rewrite]"
---
# /rewrite
Rewrite UI text — error messages, empty states, tooltips, CTAs, labels — for clarity, consistency, and tone alignment with the product voice.

## When to use
- Error messages are vague or technical ("Something went wrong", "Error 500")
- Empty states are generic or unhelpful ("No data")
- CTAs are unclear about what happens next ("Submit", "Click here")
- Labels don't match the product's terminology
- Tooltips explain the obvious or are missing where needed

## Steps
1. **Inventory** — List all user-facing text in the target: headings, labels, buttons, tooltips, error messages, empty states, loading text, confirmations, and placeholder text.
2. **Voice check** — Reference the `voice` skill for tone principles and terminology. Is the copy consistent with the product's voice?
3. **Clarity pass** — For each piece of text, ask: Does the user know where they are, what happened, and what to do next? Rewrite anything that fails this test.
4. **Action audit** — Check every CTA and button label. Does it describe the outcome, not the action? ("Save changes" not "Submit", "Create test case" not "Add")
5. **Error messages** — Rewrite errors to follow the pattern: What happened → Why → What to do. No blame, no jargon.
6. **Empty states** — Rewrite empty states to guide: What this area shows → Why it's empty → How to populate it.
7. **Terminology alignment** — Cross-reference with the `voice` skill terminology map. Replace any non-standard terms with the product's preferred vocabulary.
8. **Brevity pass** — Cut every word that doesn't earn its place. UI copy should be scannable, not readable.

## Output
A before/after comparison for each rewritten piece of text:
- **Location** — Where the text appears (component, state, context)
- **Before** — Original text
- **After** — Rewritten text
- **Why** — Brief rationale for the change
- **Tone note** — Any shift in voice/register
