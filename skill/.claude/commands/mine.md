---
description: Extract design data — tokens, patterns, component catalog from a codebase or design system.
argument-hint: "[path to design system source or codebase to mine]"
---
# /mine
Extract structured design data from a codebase — component inventories, token values, usage patterns, and composition relationships. Useful for building or updating design system context.

## When to use
- When setting up Finesse for a new design system
- When auditing what components and tokens exist in a codebase
- When you need to generate a component catalog from source code

## Steps
1. **Discover components** — Scan the target for component definitions: React components, Vue components, Web Components, or any UI primitives. Note names, file locations, and export patterns.
2. **Extract props** — For each component, extract its prop interface: names, types, defaults, required status, and descriptions.
3. **Extract tokens** — Scan for design tokens: CSS custom properties, Tailwind config values, SCSS variables, or JavaScript constants that define colors, spacing, typography, and other design values.
4. **Map composition** — Identify compound component relationships: which components are always used together? What's the parent-child hierarchy?
5. **Detect patterns** — Find recurring patterns: how are forms structured? How are modals composed? What's the standard page layout?
6. **Output catalog** — Generate a structured catalog (JSON or Markdown) that can be used as Finesse skill context.

## Output
- `component-catalog.json` with structured component data
- Token inventory with categories and values
- Composition map showing compound relationships
- Usage statistics: most-used components, most-used tokens
