---
name: anti-patterns
description: "Curated anti-patterns for Design Stack — what NOT to do, organized by domain. The most impactful skill for catching violations."
---
# Anti-Patterns — BrowserStack Design Stack

## 1. Library Misuse

**Don't use third-party UI libraries when Design Stack has the equivalent.**

| Don't use | Use instead |
|-----------|-------------|
| `@mui/material` Button | `@browserstack/design-stack` Button |
| `antd` Modal | `@browserstack/design-stack` Modal + ModalHeader + ModalBody + ModalFooter |
| `@chakra-ui/react` components | `@browserstack/design-stack` equivalents |
| `react-select` | `@browserstack/design-stack` SelectMenu or ComboBox |
| `react-modal` | `@browserstack/design-stack` Modal |
| `react-tooltip` | `@browserstack/design-stack` Tooltip |
| `react-table` (for UI) | `@browserstack/design-stack` Table + TableHead + TableBody + TableRow + TableCell |
| Custom `<button>` with styling | `@browserstack/design-stack` Button |

## 2. Token Violations

**Don't use raw values when semantic tokens exist.**

```jsx
// ANTI-PATTERN: Raw hex codes
className="bg-[#2563eb] text-[#ffffff] border-[#e5e7eb]"

// CORRECT: Semantic tokens
className="bg-brand-default text-neutral-inverse-default border-neutral-default"

// ANTI-PATTERN: Tailwind defaults instead of DS tokens
className="bg-blue-600 text-gray-900 border-gray-200"

// CORRECT: DS semantic tokens
className="bg-brand-default text-neutral-default border-neutral-default"

// ANTI-PATTERN: Old base tokens
style={{ color: 'var(--colors-brand-600)' }}

// CORRECT: Semantic tokens
className="text-brand-default"

// ANTI-PATTERN: Inline styles for colors
style={{ backgroundColor: '#ef4444', color: 'white' }}

// CORRECT: Semantic tokens via Tailwind
className="bg-danger-default text-neutral-inverse-default"
```

## 3. Density Neglect

**Don't ignore density on components that support it.**

```jsx
// ANTI-PATTERN: No density in a compact context
// (parent uses compact, child doesn't pass it)
<div className="toolbar">
  <InputField label="Search" />  // missing density="compact"
  <Button>Filter</Button>         // missing density="compact"
</div>

// ANTI-PATTERN: Mixed densities in same visual group
<div>
  <InputField density="compact" />
  <Button density="default" />  // visual mismatch!
</div>

// CORRECT: Consistent density
<div className="toolbar">
  <InputField density="compact" label="Search" />
  <Button density="compact">Filter</Button>
</div>
```

## 4. Composition Errors

**Don't build custom containers when compound components exist.**

```jsx
// ANTI-PATTERN: Custom modal
<div className="fixed inset-0 bg-black/50 z-50">
  <div className="bg-white rounded-lg p-6 mx-auto mt-20 max-w-md">
    <h2 className="text-lg font-semibold">Title</h2>
    <p>Content</p>
    <div className="flex justify-end gap-2 mt-4">
      <button onClick={onClose}>Cancel</button>
      <button onClick={onConfirm}>OK</button>
    </div>
  </div>
</div>

// CORRECT: Design Stack Modal compound
<Modal show={show} onClose={onClose}>
  <ModalHeader title="Title" />
  <ModalBody><p>Content</p></ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={onClose}>Cancel</Button>
    <Button colors="brand" onClick={onConfirm}>OK</Button>
  </ModalFooter>
</Modal>

// ANTI-PATTERN: Partial compound usage
<Modal show={show} onClose={onClose}>
  <div className="p-4">
    <h2>Title</h2>    {/* should be ModalHeader */}
    <p>Content</p>     {/* should be ModalBody */}
  </div>
</Modal>

// ANTI-PATTERN: Custom dropdown
<div className="relative">
  <button onClick={toggle}>Actions</button>
  {open && (
    <div className="absolute top-full right-0 bg-white shadow-lg rounded-md">
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )}
</div>

// CORRECT: Design Stack Dropdown compound
<Dropdown>
  <DropdownTrigger>Actions</DropdownTrigger>
  <DropdownOptionGroup>
    <DropdownOptionItem onClick={handleEdit}>Edit</DropdownOptionItem>
    <DropdownOptionItem onClick={handleDelete}>Delete</DropdownOptionItem>
  </DropdownOptionGroup>
</Dropdown>
```

## 5. Import Errors

```jsx
// ANTI-PATTERN: Deep import path
import Button from '@browserstack/design-stack/modules/Button';

// CORRECT: Barrel import
import { Button } from '@browserstack/design-stack';

// ANTI-PATTERN: Importing from wrong package
import { Button } from '@browserstack/design-stack-lab';  // only for experimental components

// CORRECT: Use main package for stable components
import { Button } from '@browserstack/design-stack';
```

## 6. Accessibility Violations

```jsx
// ANTI-PATTERN: Icon-only button without aria-label
<Button isIconOnlyButton icon={<MdClose />} />

// CORRECT
<Button isIconOnlyButton icon={<MdClose />} ariaLabel="Close dialog" />

// ANTI-PATTERN: Using div/span for interactive elements
<div onClick={handleClick} className="cursor-pointer">Click me</div>

// CORRECT
<Button variant="minimal" onClick={handleClick}>Click me</Button>

// ANTI-PATTERN: Missing form labels
<InputField value={value} onChange={onChange} />

// CORRECT
<InputField label="Email address" value={value} onChange={onChange} />
```

## 7. Notification Misuse

```jsx
// ANTI-PATTERN: Custom toast implementation
const [showToast, setShowToast] = useState(false);
{showToast && <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded">Success!</div>}

// CORRECT: Use Design Stack notify utility
import { notify, NotificationsContainer } from '@browserstack/design-stack';

// In app root:
<NotificationsContainer />

// When triggering:
notify({ title: 'Success!', modifier: 'success' });
```
