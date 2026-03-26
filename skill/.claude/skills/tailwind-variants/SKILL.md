---
name: tailwind-variants
description: "Tailwind Variants (tv()) pattern used in Design Stack for composable, type-safe component styling with compound variants and density support."
---
# Tailwind Variants — BrowserStack Design Stack

## Overview

Design Stack uses `tv()` from `@browserstack/utils` (which re-exports Tailwind Variants) for composable, type-safe styling. This is the standard pattern for conditional class composition.

## Basic Usage

```jsx
import { tv, twClassNames } from '@browserstack/utils';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-md font-medium',
  variants: {
    size: {
      small: 'px-3 py-1.5 text-sm',
      default: 'px-4 py-2 text-sm',
      large: 'px-5 py-2.5 text-base',
    },
    color: {
      brand: 'bg-brand-default text-neutral-inverse-default',
      danger: 'bg-danger-default text-neutral-inverse-default',
      neutral: 'bg-neutral-strong text-neutral-default',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'brand',
  },
});

// Usage
<button className={buttonVariants({ size: 'small', color: 'danger' })}>
  Delete
</button>
```

## Compound Variants

Compound variants apply styles when multiple variant conditions are met simultaneously:

```jsx
const inputVariants = tv({
  base: 'border rounded-md',
  variants: {
    density: {
      default: 'px-3 py-2',
      compact: 'px-2 py-1 text-sm',
    },
    state: {
      default: 'border-neutral-default',
      error: 'border-danger-default',
      focused: 'border-brand-default ring-2 ring-brand-weakest',
    },
  },
  compoundVariants: [
    // Compact + error gets a thinner ring
    {
      density: 'compact',
      state: 'error',
      class: 'ring-1 ring-danger-weakest',
    },
  ],
});
```

## twClassNames Utility

`twClassNames` is a class merging utility (like `clsx` + `tailwind-merge`). Use it to combine variant classes with custom overrides:

```jsx
import { twClassNames } from '@browserstack/utils';

<div className={twClassNames(
  buttonVariants({ size: 'small' }),
  fullWidth && 'w-full',
  wrapperClassName  // user override
)}>
```

## Design Stack Component Pattern

Every Design Stack component follows this structure:

```jsx
// 1. Define variants with tv()
const componentVariants = tv({
  base: '...',
  variants: {
    density: { default: '...', compact: '...' },
    // other variants
  },
  compoundVariants: [/* density-specific overrides */],
});

// 2. Component uses forwardRef
const Component = forwardRef(({ density, ...props }, ref) => {
  // 3. Hook for logic
  const { computed } = useComponent({ density, ...props });

  // 4. Apply variants
  return (
    <div
      ref={ref}
      className={twClassNames(
        componentVariants({ density }),
        props.wrapperClassName
      )}
    >
      {/* content */}
    </div>
  );
});
```

## Rules

1. **Always use `tv()` for conditional styles** — don't use ternaries or string concatenation for Tailwind classes
2. **Always use `twClassNames`** for merging classes — not `clsx` or template literals
3. **Import from `@browserstack/utils`** — not directly from `tailwind-variants`
4. **Use `defaultVariants`** in tv() definitions to avoid undefined states
5. **Use `compoundVariants`** for density-specific style overrides
