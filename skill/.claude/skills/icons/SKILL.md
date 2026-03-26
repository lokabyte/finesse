---
name: icons
description: "Icon system for Design Stack — @browserstack/design-stack-icons usage, common icons by category, sizing conventions."
---
# Icon System — BrowserStack Design Stack

## Package

```jsx
import { IconName } from '@browserstack/design-stack-icons';
```

Package: `@browserstack/design-stack-icons` (v2.7.1)

## Icon Sources

Design Stack Icons bundles icons from multiple sources:
- **Material Design Icons** — Prefix: `Md` (e.g., `MdClose`, `MdSearch`)
- **Material Design Outlined** — Prefix: `MdOutline` (e.g., `MdOutlinePushPin`, `MdOutlineFilterAlt`)
- **Heroicons** — via `@heroicons/react` (solid and outline variants)

## Common Icons by Category

### Actions
| Icon | Name | Use for |
|------|------|---------|
| ✕ | `MdClose` | Close dialogs, dismiss, remove |
| + | `MdAdd` | Create new, add item |
| ✎ | `MdEdit` | Edit, modify |
| 🗑 | `MdDelete` | Delete, remove permanently |
| ↓ | `MdFileDownload` | Download |
| ↑ | `MdFileUpload` | Upload |
| ⋮ | `MdOutlineMoreVert` | More actions (vertical) |
| ⋯ | `MdOutlineMoreHoriz` | More actions (horizontal) |
| ✓ | `MdCheck` | Confirm, success, done |

### Navigation
| Icon | Name | Use for |
|------|------|---------|
| ← | `MdArrowBack` | Go back |
| → | `MdArrowForward` | Go forward |
| ↗ | `MdOpenInNew` | External link |
| ▾ | `MdExpandMore` | Expand/dropdown |
| ▸ | `MdChevronRight` | Navigate forward, expand |
| 🔍 | `MdSearch` | Search |

### Status
| Icon | Name | Use for |
|------|------|---------|
| ℹ | `MdInfo` | Information |
| ⚠ | `MdWarning` | Warning |
| ✗ | `MdError` | Error |
| ✓ | `MdCheckCircle` | Success |

### Content
| Icon | Name | Use for |
|------|------|---------|
| 📋 | `MdContentCopy` | Copy to clipboard |
| 📎 | `MdAttachFile` | Attachment |
| 📁 | `MdFolder` | Folder, category |
| 📄 | `MdDescription` | Document, file |
| 📌 | `MdPushPin` / `MdOutlinePushPin` | Pin/unpin |
| ⚙ | `MdSettings` | Settings |
| 🔒 | `MdLock` | Locked, secure |

## Sizing Convention

| Context | Size class | Pixel size |
|---------|-----------|------------|
| Default density | `h-5 w-5` | 20×20 |
| Compact density | `h-4 w-4` | 16×16 |
| Small buttons | `h-4 w-4` | 16×16 |
| Large headings | `h-6 w-6` | 24×24 |
| Hero/empty state | `h-8 w-8` or larger | 32×32+ |

## Usage Pattern

```jsx
import { MdClose, MdSearch, MdOutlineFilterAlt } from '@browserstack/design-stack-icons';

// In a Button
<Button icon={<MdSearch className="h-5 w-5" />}>Search</Button>

// Icon-only button (always needs ariaLabel)
<Button
  isIconOnlyButton
  icon={<MdClose className="h-5 w-5" />}
  ariaLabel="Close"
/>

// Standalone icon
<MdOutlineFilterAlt className="h-5 w-5 icon-neutral-default" />
```

## Anti-Patterns

```jsx
// WRONG — importing from react-icons directly
import { MdClose } from 'react-icons/md';

// CORRECT — import from design-stack-icons
import { MdClose } from '@browserstack/design-stack-icons';

// WRONG — inconsistent sizing
<MdClose className="h-6 w-6" />  // in a compact context expecting h-4 w-4

// WRONG — no accessible label on icon-only interactive elements
<span onClick={onClick}><MdDelete /></span>

// CORRECT — use Button with ariaLabel
<Button isIconOnlyButton icon={<MdDelete className="h-5 w-5" />} ariaLabel="Delete item" />
```
