---
name: color-tokens
description: "Semantic color token system for Design Stack — backgrounds, text, borders, icons, and surfaces with their modifier scales."
---
# Color Tokens — BrowserStack Design Stack

## Token Architecture

Design Stack uses a **two-layer** token system:
1. **Base tokens** (OLD — avoid): `--colors-brand-500`, `--colors-danger-600` — raw color values by scale number
2. **Semantic tokens** (USE THESE): `--bg-brand-default`, `--text-danger-default` — purpose-driven names

Always use semantic tokens. Never reference base tokens or raw hex values in component code.

## Semantic Token Categories

### Background (`bg-`)
Used via Tailwind: `bg-brand-default`, `bg-neutral-strong`, etc.

| Scale | Purpose | Example |
|-------|---------|---------|
| `weakest` | Subtlest tint, barely visible | `bg-brand-weakest` for selected row background |
| `weaker` | Light tint | `bg-danger-weaker` for error banner background |
| `weak` | Medium tint | `bg-attention-weak` for warning indicator |
| `default` | Full color | `bg-brand-default` for primary button |
| `strong` | Slightly darker | `bg-success-strong` for emphasis |
| `stronger` | Much darker | `bg-brand-stronger` for hover on dark bg |

**Neutral backgrounds:**
- `bg-neutral-default` — White (page background)
- `bg-neutral-strong` — Light gray (card/section background)
- `bg-neutral-stronger` — Medium gray (nested sections)
- `bg-neutral-strongest` — Dark gray (high contrast areas)
- `bg-neutral-inverse-default` — Near-black (dark mode / inverse sections)

**State variants:**
- `*-hover` — Hover state (e.g., `bg-brand-default-hover`)
- `*-disabled` — Disabled state (e.g., `bg-brand-default-disabled`)

### Text (`text-`)
| Token | Use for |
|-------|---------|
| `text-neutral-default` | Primary body text |
| `text-neutral-weak` | Secondary/helper text |
| `text-neutral-weakest` | Placeholder text |
| `text-neutral-inverse-default` | Text on dark backgrounds |
| `text-brand-default` | Brand-colored text, links |
| `text-brand-weaker` | Subtle brand text |
| `text-danger-default` | Error messages |
| `text-success-default` | Success messages |
| `text-attention-default` | Warning messages |

### Border (`border-`)
| Token | Use for |
|-------|---------|
| `border-neutral-default` | Default borders (inputs, cards) |
| `border-neutral-strong` | Stronger borders (dividers) |
| `border-neutral-strongest` | Heaviest borders |
| `border-brand-default` | Focus rings, active states |
| `border-danger-default` | Error state borders |

### Icon (`icon-`)
| Token | Use for |
|-------|---------|
| `icon-neutral-default` | Default icon color |
| `icon-neutral-weak` | Secondary icons |
| `icon-neutral-inverse-default` | Icons on dark backgrounds |
| `icon-brand-default` | Brand-colored icons |
| `icon-danger-default` | Error/destructive action icons |
| `icon-success-default` | Success state icons |

### Surface
Applied via utility classes: `surface-default`, `surface-strong`

| Token | Use for |
|-------|---------|
| `surface-default` | Default surface (white) |
| `surface-strong` | Elevated surface |

## Color Palettes

| Palette | Semantic meaning | Tailwind prefix |
|---------|-----------------|-----------------|
| **neutral** | Default, non-semantic UI | `*-neutral-*` |
| **brand** | Primary brand actions, links, focus | `*-brand-*` |
| **danger** | Errors, destructive actions, critical states | `*-danger-*` |
| **success** | Success states, positive actions | `*-success-*` |
| **attention** | Warnings, caution states | `*-attention-*` |
| **information** | Informational states | `*-info-*` |

## Common Anti-Patterns

```jsx
// WRONG — raw hex
<div className="bg-[#2563eb] text-[#ffffff]">

// CORRECT — semantic token
<div className="bg-brand-default text-neutral-inverse-default">

// WRONG — base token reference
<div style={{ color: 'var(--colors-brand-600)' }}>

// CORRECT — semantic token
<div className="text-brand-default">

// WRONG — Tailwind arbitrary color
<div className="bg-blue-600">

// CORRECT — design system token
<div className="bg-brand-default">
```
