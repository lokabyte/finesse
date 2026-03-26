---
name: brownfield-patterns
description: "Guidelines for working in brownfield/existing codebases — discover and follow existing design patterns, component conventions, and UI structures before introducing new ones."
---
# Brownfield Patterns — Working in Existing Codebases

## Principle

In a brownfield project, **the codebase is the source of truth for patterns.** Before building anything new, discover what already exists. Match the existing conventions unless you have an explicit mandate to change them.

## Discovery Protocol

Before writing any new UI code in an existing codebase, run this discovery:

### 1. Component Inventory
Search the codebase for existing implementations of what you're about to build:

```
What to search for:
- Similar components (building a filter? search for existing filters)
- Shared/common components (look in shared/, common/, components/ directories)
- Page-level patterns (how are other pages in this app structured?)
- Form patterns (how do other forms handle validation, submission, layout?)
- Table patterns (how are other tables configured, sorted, paginated?)
- Modal patterns (how do other modals handle confirmation, forms, detail views?)
```

### 2. Convention Detection
Identify the conventions already in use:

| Convention | What to look for |
|-----------|-----------------|
| **File structure** | How are components organized? Flat files, folders with index, barrel exports? |
| **Naming** | camelCase, PascalCase, kebab-case? Prefix patterns? |
| **State management** | Local state, context, Redux, Zustand, React Query? |
| **Data fetching** | Custom hooks, direct API calls, SWR pattern? |
| **Styling approach** | Tailwind utilities, CSS modules, styled-components, inline styles? |
| **Props pattern** | Destructured in signature, or props object? Default values via defaultProps or default params? |
| **Error handling** | Error boundaries, try-catch, toast notifications? |
| **Test patterns** | What testing library? What's the assertion style? What gets mocked? |

### 3. Reuse Over Reinvent
Before creating a new component, check if:

- [ ] An existing component does 80%+ of what you need (extend it)
- [ ] A shared utility exists for this pattern (use it)
- [ ] Another page/feature solved the same problem (follow that pattern)
- [ ] The design system component covers this (use the DS component)

## Pattern Matching Rules

### Follow the existing pattern, even if you'd do it differently
```jsx
// If the codebase uses this pattern for filters:
const [filters, setFilters] = useState(initialFilters);
const handleFilterChange = (key, value) => {
  setFilters(prev => ({ ...prev, [key]: value }));
};

// Then YOUR new filter should use the same pattern.
// Don't introduce a reducer, or a form library, or a different state shape
// just because you prefer it.
```

### Match the abstraction level
```jsx
// If existing pages use a flat component structure:
function SettingsPage() {
  return (
    <PageHeadings title="Settings" />
    <div className="grid grid-cols-2 gap-6">
      <InputField label="Name" ... />
      <InputField label="Email" ... />
    </div>
  );
}

// Don't introduce a FormBuilder abstraction for your page.
// Match the flat structure.
```

### Match the naming convention
```
// If existing components are named like:
TestCaseFilters.jsx
TestCaseTable.jsx
TestCaseModal.jsx

// Name yours:
TestCaseAuditTrail.jsx  // Not: AuditTrailForTestCase.jsx
```

### Match the data flow
```
// If the app passes data through props (prop drilling):
// → Don't introduce a new context provider
// If the app uses React Query for data fetching:
// → Don't use useEffect + fetch for your feature
// If the app uses the notify() utility for toasts:
// → Don't build a custom notification system
```

## When to Break the Pattern

Only deviate from existing patterns when:
1. **Explicitly instructed** — The user/brief says to change the pattern
2. **The existing pattern is a known anti-pattern** — And you document why you're deviating
3. **The design system provides a better solution** — DS components override custom implementations

When you deviate, document it:
```
// NOTE: Deviating from the existing filter pattern (useState + handleChange)
// because the new filter system requires complex state with dependent filters.
// Using useReducer here. See discussion in project brief.
```

## Audit Checklist for Brownfield Changes

Before shipping new UI code in an existing codebase:

- [ ] Searched for existing implementations of similar UI patterns
- [ ] Identified and followed the existing component structure convention
- [ ] Reused existing shared components where available
- [ ] Matched the naming convention of adjacent files
- [ ] Matched the state management pattern of the feature area
- [ ] Matched the data fetching pattern of the app
- [ ] Used design system components (not custom) where available
- [ ] Documented any intentional pattern deviations
