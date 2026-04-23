# Finesse — DesignStack Skill · v0.1

You have deep knowledge of DesignStack (@browserstack/design-stack). Use it to guide implementation, catch violations, and improve UI quality. This skill is always-on — reference it whenever building, modifying, or reviewing UI.

---

## 0. Before you build — Discovery first

Before writing any new UI, understand what already exists. The codebase is the living style guide.

### Find the nearest sibling

Search the codebase for the most similar existing screen, component, or pattern to what you're about to build. Read it. Match its patterns.


Search for:

Similar components (building a filter? search for existing filters)
Shared/common directories (shared/, common/, components/, ui/)
Page-level patterns (how are other pages structured?)
Form patterns (how do other forms handle validation, submission, layout?)
Table patterns (how are tables configured, sorted, paginated?)
Modal patterns (how do modals handle confirmation, forms, detail views?)

### Detect conventions already in use

| Convention | What to look for |
|-----------|-----------------|
| File structure | Flat files, folders with index, barrel exports? |
| Naming | camelCase, PascalCase, kebab-case? Prefix patterns? |
| State management | Local state, Context, Redux, Zustand, React Query? |
| Data fetching | Custom hooks, direct API calls, SWR pattern? |
| Styling | Tailwind utilities, CSS modules, styled-components? |
| Props pattern | Destructured in signature or props object? |
| Error handling | Error boundaries, try-catch, toast notifications? |

### Reuse over reinvent

Before creating a new component:
- [ ] Does an existing component do 80%+ of what you need? → Extend it
- [ ] Does a shared utility exist for this pattern? → Use it
- [ ] Did another page/feature solve the same problem? → Follow that pattern
- [ ] Does DesignStack have a component for this? → Use the DS component

### Justify custom components

If a DesignStack component cannot fulfill the requirement, state:
1. Which DesignStack component was considered
2. Why it was insufficient
3. What the custom component does differently

No custom component should exist without this justification.

### Match existing patterns — even if you'd do it differently

```jsx
// If the codebase uses this filter pattern:
const [filters, setFilters] = useState(initialFilters);
const handleFilterChange = (key, value) => {
  setFilters(prev => ({ ...prev, [key]: value }));
};

// Your new filter should use the same pattern.
// Don't introduce a reducer or form library just because you prefer it.
```

Match the naming convention, abstraction level, state management, and data flow of the surrounding code. Only deviate when:

1. Explicitly instructed to change the pattern
2. The existing pattern is a known anti-pattern (document why)
3. DesignStack provides a better solution (DS components override custom)

When you deviate, leave a comment explaining why.

---

## 1. Tokens — Semantic only, never raw

Colors: Always semantic tokens. Never hex, never Tailwind defaults, never base tokens.

Scale: `weakest → weaker → weak → default → strong → stronger → strongest`
States: append `-hover`, `-disabled`

| Category | Pattern | Example |
|----------|---------|---------|
| Background | `bg-{palette}-{scale}` | `bg-neutral-default`, `bg-brand-default`, `bg-danger-weakest` |
| Text | `text-{palette}-{scale}` | `text-neutral-default`, `text-neutral-weak`, `text-brand-default` |
| Border | `border-{palette}-{scale}` | `border-neutral-default`, `border-neutral-strong` |
| Icon | `icon-{palette}-{scale}` | `icon-neutral-default`, `icon-danger-default` |
| Surface | `bg-raised`, `bg-default` | Layering: default → raised → overlay |

Palettes: `neutral`, `brand`, `danger`, `success`, `attention`, `information`

```jsx
// WRONG — raw hex
className="bg-[#2563eb] text-[#ffffff] border-[#e5e7eb]"

// WRONG — Tailwind default palette
className="bg-blue-600 text-gray-900 border-gray-200"

// WRONG — deprecated base token
style={{ color: 'var(--colors-brand-600)' }}

// WRONG — inline style
style={{ backgroundColor: '#ef4444', color: 'white' }}

// CORRECT — semantic tokens
className="bg-brand-default text-neutral-inverse-default border-neutral-default"
```

---

## 2. Density — Two modes, propagate from container

| Mode | When | Spacing | Icons | Radius |
|------|------|---------|-------|--------|
| `default` | Forms, modals, onboarding, landing pages | Comfortable | 20px (`h-5 w-5`) | `rounded` |
| `compact` | Tables, toolbars, sidebars, dense dashboards | Tight | 16px (`h-4 w-4`) | `rounded-[3px]` |

Components with density: Button, InputField, TextArea, SelectMenu, ComboBox, MultiSelect, Pagination, Table

Rules:
- Set density at the container level, propagate to all children
- Never mix densities in the same visual group

```jsx
// WRONG — mixed densities
<div className="toolbar">
  <InputField density="compact" label="Search" />
  <Button density="default">Filter</Button>  {/* visual mismatch */}
</div>

// CORRECT — consistent density from container
<div className="toolbar">
  <InputField density="compact" label="Search" />
  <Button density="compact">Filter</Button>
</div>
```

---

## 3. Components — Use DesignStack, always

Import: Always from `@browserstack/design-stack` barrel. Never deep paths, never third-party UI.

```jsx
// WRONG
import Button from '@browserstack/design-stack/modules/Button';
import { Modal } from 'antd';
import { FiSearch } from 'react-icons';

// CORRECT
import { Button, Modal, ModalHeader, ModalBody } from '@browserstack/design-stack';
import { MdSearch } from '@browserstack/design-stack-icons';
```

Icons: From `@browserstack/design-stack-icons`. Common: MdClose, MdAdd, MdEdit, MdDelete, MdSearch, MdOutlineFilterAlt, MdOutlineMoreVert.
Sizing: default = `h-5 w-5`, compact = `h-4 w-4`, large heading = `h-6 w-6`.

### Compound components — Required children matter

**Modal:**
```jsx
<Modal show={show} onClose={onClose} size="md">
  <ModalHeader title="Confirm deletion" description="This action cannot be undone." />
  <ModalBody>
    <p>Are you sure you want to delete this project?</p>
  </ModalBody>
  <ModalFooter position="right">
    <Button variant="secondary" onClick={onClose}>Cancel</Button>
    <Button colors="danger" onClick={onDelete}>Delete project</Button>
  </ModalFooter>
</Modal>
// Required: Modal + ModalHeader + ModalBody. Optional: ModalFooter.
```

**Dropdown:**
```jsx
<Dropdown>
  <DropdownTrigger>Actions</DropdownTrigger>
  <DropdownOptionGroup>
    <DropdownOptionItem onClick={handleEdit}>Edit</DropdownOptionItem>
    <DropdownOptionItem onClick={handleDelete}>Delete</DropdownOptionItem>
  </DropdownOptionGroup>
</Dropdown>
// Required: Dropdown + DropdownTrigger + DropdownOptionGroup + DropdownOptionItem.
```

**EmptyState:**
```jsx
<EmptyState>
  <EmptyStateIcon icon={MdSearchOff} />
  <EmptyStateTitle>No results found</EmptyStateTitle>
  <EmptyStateDescription>Try adjusting your search criteria.</EmptyStateDescription>
  <EmptyStateAction>
    <Button onClick={onClearSearch}>Clear search</Button>
  </EmptyStateAction>
</EmptyState>
// Required: EmptyState + EmptyStateTitle. Optional: Icon, Description, Action.
```

**Table:**
```jsx
<Table>
  <TableHead>
    <TableRow>
      <TableCell header>Name</TableCell>
      <TableCell header>Status</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Project Alpha</TableCell>
      <TableCell><Badge text="Active" modifier="success" /></TableCell>
    </TableRow>
  </TableBody>
</Table>
// Required: Table + TableHead + TableBody + TableRow + TableCell.
```

Other compound families: Slideover (SlideoverHeader + SlideoverBody), Alert (AlertTitle), Accordion (AccordionSimpleHeader + AccordionPanel), SelectMenu (SelectMenuTrigger + SelectMenuOptionGroup + SelectMenuOptionItem), ComboBox (ComboboxTrigger + ComboboxOptionGroup + ComboboxOptionItem).

### Anti-pattern — building custom when compound exists

```jsx
// WRONG — custom modal from scratch
<div className="fixed inset-0 bg-black/50 z-50">
  <div className="bg-white rounded-lg p-6 mx-auto mt-20 max-w-md">
    <h2>Title</h2>
    <p>Content</p>
    <button onClick={onClose}>Cancel</button>
  </div>
</div>

// WRONG — partial compound (missing required children)
<Modal show={show} onClose={onClose}>
  <div className="p-4">
    <h2>Title</h2>       {/* should be ModalHeader */}
    <p>Content</p>        {/* should be ModalBody */}
  </div>
</Modal>

// WRONG — custom dropdown
<div className="relative">
  <button onClick={toggle}>Actions</button>
  {open && (
    <div className="absolute top-full right-0 bg-white shadow-lg rounded-md">
      <button onClick={handleEdit}>Edit</button>
    </div>
  )}
</div>
```

### Notifications — use the utility, not custom toasts

```jsx
// WRONG
const [showToast, setShowToast] = useState(false);
{showToast && <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4">Success!</div>}

// CORRECT
import { notify, NotificationsContainer } from '@browserstack/design-stack';

// In app root: <NotificationsContainer />
// When triggering:
notify({ title: 'Project created', modifier: 'success' });
```

---

## 4. Accessibility — What's automatic vs what you provide

**DesignStack handles:**
- ARIA roles (Modal=dialog, Alert=alert, Tooltip=tooltip)
- Focus trapping (Modal, Slideover, CommandPalette)
- Focus restoration on close
- Keyboard navigation (Tabs=arrows, Dropdown=arrows+enter, Modal=Escape)

**You must provide:**

```jsx
// ariaLabel on every icon-only button
<Button isIconOnlyButton icon={<MdClose />} ariaLabel="Close dialog" />

// Labels on every form input
<InputField label="Email address" value={value} onChange={onChange} />

// Never use div as button
// WRONG: <div onClick={handleClick} className="cursor-pointer">Click me</div>
// CORRECT: <Button variant="minimal" onClick={handleClick}>Click me</Button>
```

- Alt text on images
- Semantic heading hierarchy (h1 → h2 → h3, don't skip levels)
- Contrast: 4.5:1 for normal text, 3:1 for large text and interactive elements

---

## 5. Class merging — twClassNames

Use `twClassNames` from `@browserstack/utils` for conditional Tailwind classes. Not `clsx`, not `classnames`, not template literals.

```jsx
import { twClassNames } from '@browserstack/utils';

<div className={twClassNames(
  'rounded border px-3 py-2',
  density === 'compact' && 'px-2 py-1 text-sm rounded-[3px]',
  hasError && 'border-danger-default',
  wrapperClassName  // allow consumer overrides
)} />
```

---

## 6. UX writing — State-aware copy

Every piece of text exists at the intersection of: where the user came from, where they are now, where they're going.

**Labels:** Sentence case. Specific ("Email address" not "Input"). No colons.

**CTAs:** Start with verb. Name the outcome. Destructive actions name the thing.

```
Good: "Save changes", "Delete project", "Create integration"
Bad:  "Submit", "OK", "Yes", "Confirm"
```

**System feedback patterns:**

| State | Pattern | Example |
|-------|---------|---------|
| Success | `[Thing] [past tense].` | "Project created." "Settings saved." |
| Error (fixable) | `Couldn't [verb] [thing]. [Fix].` | "Couldn't save changes. Check your connection and try again." |
| Error (system) | `[Thing] isn't available right now. We're looking into it.` | Honest, no blame |
| Loading | `[Verb]ing [thing]...` | "Loading projects..." |
| Empty state | Headline + Description + CTA | "No projects yet" + "Create your first project to get started." + [Create project] |

**Confirmation dialogs:**
- Title as question: "Delete this project?"
- Body states consequence: "This will permanently delete 12 test cases and all associated data."
- Primary CTA repeats the verb: "Delete project"
- Secondary CTA is the safe exit: "Cancel"

**Never:** "Something went wrong", "Oops!", "An error occurred", "Invalid input", "No data"

**Tone:** Professional but approachable. Users are technical — respect their expertise. Say less. Be specific. Name the actual thing (project name, not "this item").

---

## 7. Data display — Charts, numbers, tables

**Chart type selection:**
- Single metric → Stat card / big number
- Trend over time → Line chart
- Comparison (few items) → Horizontal bar
- Comparison (many items) → Table with visual bars
- Part of whole → Stacked bar or donut
- Pass/fail ratio → Stacked bar or stat cards

**Number formatting:**
- Counts: no decimals, commas for thousands (1,234)
- Percentages: 1 decimal max (85.3%)
- Durations: human-readable ("2m 34s")
- Large numbers: abbreviate 1k+ with tooltip for exact value
- Zero: show "0", not "—"
- Null/missing: show "—" with tooltip explaining why

**Table vs chart:** Use table when users need to look up specific values, sort, filter, or compare many attributes. Use chart when showing trends, big picture, or spatial relationships.

---

## 8. Review checklist — Before shipping

Scan every file you've changed:

**System compliance:**
- [ ] All components from `@browserstack/design-stack`? No third-party UI libs?
- [ ] All imports via barrel (`import { X } from '@browserstack/design-stack'`)? No deep paths?
- [ ] All icons from `@browserstack/design-stack-icons`? No react-icons?
- [ ] Custom component justified? (What DS component was considered, why insufficient?)

**Tokens:**
- [ ] No raw hex, no Tailwind defaults, no base tokens? All semantic?
- [ ] Colors match the semantic palette? (neutral, brand, danger, success, attention, information)

**Density:**
- [ ] Components in compact context have `density="compact"`?
- [ ] No mixed densities in the same visual group?

**Composition:**
- [ ] Compound components using all required children? (Modal needs ModalHeader + ModalBody)
- [ ] No custom modals, dropdowns, tooltips, or toasts? Using DS compounds + notify()?

**Accessibility:**
- [ ] Icon-only buttons have `ariaLabel`?
- [ ] All form inputs have labels?
- [ ] No `<div>` or `<span>` used as interactive elements?
- [ ] Heading hierarchy correct (no skipped levels)?

**Copy:**
- [ ] Error messages specific and actionable? (Not "Something went wrong")
- [ ] Empty states have headline + description + CTA? (Not blank panels)
- [ ] Loading states show feedback?
- [ ] CTAs start with verbs and name the outcome?

**Brownfield:**
- [ ] Searched for existing similar implementations?
- [ ] Matched naming convention of adjacent files?
- [ ] Matched state management and data fetching patterns?
- [ ] Documented any intentional pattern deviations?
