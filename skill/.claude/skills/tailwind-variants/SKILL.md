---
name: tailwind-variants
description: "twClassNames utility from @browserstack/utils for conditional Tailwind class merging in product code."
---
# Class Merging — twClassNames

## Overview

Product teams use `twClassNames` from `@browserstack/utils` for conditional Tailwind class composition. It merges classes intelligently (like `clsx` + `tailwind-merge`) so conflicting utilities resolve correctly.

## Usage

```jsx
import { twClassNames } from '@browserstack/utils';

<div className={twClassNames(
  'rounded border px-3 py-2 text-sm',
  density === 'compact' && 'px-2 py-1 text-xs rounded-[3px]',
  hasError && 'border-danger-default',
  isDisabled && 'opacity-50 pointer-events-none',
  wrapperClassName  // allow consumer overrides
)} />
```

## Common Patterns

### Conditional styling based on state
```jsx
<span className={twClassNames(
  'text-sm',
  isActive ? 'text-brand-default font-semibold' : 'text-neutral-weak',
)} />
```

### Density-aware components
```jsx
<div className={twClassNames(
  'flex items-center gap-2',
  density === 'compact' ? 'h-7 px-2 text-xs' : 'h-9 px-3 text-sm',
)} />
```

### Merging with consumer overrides
```jsx
function Card({ className, children }) {
  return (
    <div className={twClassNames(
      'rounded-lg border border-neutral-default bg-raised p-4',
      className  // consumer can override
    )}>
      {children}
    </div>
  );
}
```

## Rules

1. **Always use `twClassNames`** for conditional classes — not `clsx`, `classnames`, or template literals
2. **Import from `@browserstack/utils`** — not from any other package
3. **Place consumer overrides last** — so they win over base styles
4. **Use semantic tokens in class strings** — never raw hex or Tailwind defaults
