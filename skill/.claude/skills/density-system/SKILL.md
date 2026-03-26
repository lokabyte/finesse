---
name: density-system
description: "Density system for Design Stack — default vs compact modes, which components support it, and how to propagate density through component trees."
---
# Density System — BrowserStack Design Stack

## Overview

Design Stack supports two density modes:
- **`default`** — Standard spacing, comfortable for general use
- **`compact`** — Reduced spacing, tighter padding, smaller icons — for data-dense views like tables, dashboards, and admin panels

## How Density Works

Components that support density accept a `density` prop:

```jsx
<Button density="compact" colors="brand">Save</Button>
<InputField density="compact" label="Name" />
<Pagination density="compact" count={100} pageSize={10} />
```

When `density="compact"`:
- Padding is reduced
- Font sizes may decrease
- Icon sizes shrink (20px → 16px)
- Border radius may change (e.g., Button: rounded → rounded-[3px])
- Overall component height decreases

## Components with Density Support

| Component | Default Height | Compact Height | Notes |
|-----------|---------------|----------------|-------|
| Button | 36px | 28px | All variants support density |
| InputField | 38px | 30px | Includes addons |
| TextArea | Auto | Auto | Reduced padding |
| SelectMenu | 38px | 30px | Via SelectMenuTrigger |
| ComboBox | 38px | 30px | Via ComboboxTrigger |
| MultiSelect | 38px | 30px | Via MultiSelectTrigger |
| Pagination | 36px | 28px | Nav buttons shrink |
| Table | Auto | Auto | Row height reduces |

## Propagation Rules

1. **Set density at the container level**, not on individual components:
```jsx
// GOOD — set once at form level
const MyForm = ({ density = 'default' }) => (
  <form>
    <InputField density={density} label="Name" />
    <InputField density={density} label="Email" />
    <Button density={density}>Submit</Button>
  </form>
);

// BAD — inconsistent density
<form>
  <InputField density="compact" label="Name" />
  <InputField label="Email" />  {/* defaults to 'default' — mismatch! */}
  <Button>Submit</Button>
</form>
```

2. **All components in a section must share the same density.** Mixing `default` and `compact` in the same visual group looks broken.

3. **Use compact density for:**
   - Table toolbars and filters
   - Sidebars and navigation
   - Dense data views (dashboards, admin panels)
   - Inline editing forms

4. **Use default density for:**
   - Main forms (settings, profile, creation flows)
   - Landing pages
   - Dialog/modal content
   - Onboarding flows

## Anti-Patterns

```jsx
// WRONG — not passing density to a component that supports it
<Button colors="brand">Save</Button>  // in a compact context

// CORRECT
<Button density="compact" colors="brand">Save</Button>

// WRONG — mixing densities in the same visual group
<div>
  <InputField density="compact" />
  <Button density="default" />  // visual mismatch
</div>

// CORRECT — consistent density
<div>
  <InputField density="compact" />
  <Button density="compact" />
</div>
```
