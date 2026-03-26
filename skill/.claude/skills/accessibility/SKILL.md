---
name: accessibility
description: "Accessibility patterns built into Design Stack — ARIA roles, keyboard navigation, focus management, and screen reader support."
---
# Accessibility — BrowserStack Design Stack

## Built-in Accessibility

Design Stack components have accessibility built in. Your job is to not break it and to fill in the context-specific parts.

## What's Handled Automatically

| Feature | Components |
|---------|-----------|
| ARIA roles | Modal (dialog), Alert (alert), Tooltip (tooltip), Tabs (tablist/tab/tabpanel) |
| Focus trapping | Modal, Slideover, CommandPalette |
| Focus restoration | Modal (returns focus to trigger on close), Dropdown, Popover |
| Keyboard navigation | Tabs (arrow keys), Dropdown (arrow keys + enter), ComboBox (arrow keys + type-ahead) |
| Screen reader announcements | Alert (live region), Notifications (aria-live), ProgressBar (aria-valuenow) |
| SkipToContent | SkipToContent component for page-level skip links |

## What You Must Provide

### 1. Labels for icon-only buttons
```jsx
// REQUIRED — ariaLabel on icon-only buttons
<Button isIconOnlyButton icon={<MdClose />} ariaLabel="Close dialog" />
<Button isIconOnlyButton icon={<MdDelete />} ariaLabel="Delete item" />
<Button isIconOnlyButton icon={<MdEdit />} ariaLabel="Edit name" />
```

### 2. Labels for form inputs
```jsx
// Always provide a label prop
<InputField label="Email address" />
<TextArea label="Description" />
<SelectMenu><SelectMenuTrigger label="Country" /></SelectMenu>

// If visual label is hidden, use aria-label
<InputField aria-label="Search" placeholder="Search..." />
```

### 3. Descriptions and error messages
```jsx
<InputField
  label="Password"
  description="Must be at least 8 characters"
  errorText={error ? "Password is too short" : undefined}
/>
```

### 4. Alt text for images
```jsx
<Avatar src={user.avatar} name={user.name} />  // name serves as alt text
<img src={chart} alt="Revenue chart showing 15% growth" />  // descriptive alt
```

### 5. Semantic heading hierarchy
```jsx
// Use PageHeadings for h1, SectionHeadings for h2
<PageHeadings title="Settings" />
<SectionHeadings title="Profile" />
// Don't skip levels (h1 → h3 without h2)
```

## Keyboard Navigation Patterns

| Component | Keys |
|-----------|------|
| Button | Enter/Space to activate |
| Tabs | Arrow keys to navigate, Enter to select |
| Modal | Escape to close, Tab to cycle focus within |
| Dropdown | Arrow keys to navigate options, Enter to select, Escape to close |
| ComboBox | Type to filter, Arrow keys to navigate, Enter to select |
| Accordion | Enter/Space to toggle |
| Switch | Space to toggle |
| Checkbox | Space to toggle |

## Color Contrast Requirements

| Element | Minimum ratio | Tokens that meet this |
|---------|--------------|----------------------|
| Normal text (< 18px) | 4.5:1 | `text-neutral-default` on `bg-neutral-default` |
| Large text (≥ 18px or 14px bold) | 3:1 | Most heading + background combos |
| Interactive elements | 3:1 | All Button color variants meet this |
| Non-text elements (icons, borders) | 3:1 | `icon-neutral-default`, `border-neutral-default` |

## Common A11y Anti-Patterns

```jsx
// WRONG — div as button
<div onClick={handleClick} className="cursor-pointer hover:bg-gray-100 px-4 py-2">
  Click me
</div>

// CORRECT — actual Button
<Button variant="minimal" onClick={handleClick}>Click me</Button>

// WRONG — hiding content visually but not from screen readers
<span className="hidden">Secret text still read by screen readers</span>

// WRONG — color as only indicator
<span className="text-danger-default">Error occurred</span>

// CORRECT — color + text/icon indicator
<span className="text-danger-default flex items-center gap-1">
  <MdError className="h-4 w-4" /> Error occurred
</span>
```
