---
name: component-catalog
description: "Reference catalog of all Design Stack components — names, categories, key props, composition relationships, and density support. Used by commands to identify correct components."
---
# Component Catalog — BrowserStack Design Stack

This skill provides the complete component reference for `@browserstack/design-stack` (v8.20.0).

## Import Pattern
```jsx
import { ComponentName } from '@browserstack/design-stack';
import { IconName } from '@browserstack/design-stack-icons';
```

## Component Categories

### Core
| Component | Key Props | Density | Notes |
|-----------|-----------|---------|-------|
| Button | colors(brand/success/attention/danger/white), variant(primary/secondary/rounded/minimal), size(extra-small/small/default/large/extra-large), icon, iconPlacement, loading, fullWidth, disabled | Yes | Most used component. Always pass density. |
| Badge | text, modifier(base/success/error/warn), size(default/large), hasRemoveButton | No | Status indicators. |
| Tag | text, modifier, icon, closable, size | No | Categorization labels. |
| Avatar | src, name, size(xs/sm/md/lg/xl/2xl), shape(circle/square) | No | User/entity representation. |
| Hyperlink | href, children, wrapperClassName | No | Text links. |
| TruncateText | text, maxLength, tooltipProps | No | Text overflow handling. |
| HighlightText | text, query | No | Search result highlighting. |

### Navigation
| Component | Key Props | Density | Compound Children |
|-----------|-----------|---------|-------------------|
| Tabs | children, defaultIndex, onChange | No | — |
| BreadcrumbContainer | children | No | BreadcrumbContents, BreadcrumbText |
| SidebarNavigation | children | No | SidebarHeader, SidebarItem |
| SidebarNavigationWCollapse | children, isCollapsed | No | SidebarHeader, SidebarItem |
| Pagination | count, pageSize, currentPage, onChange | Yes | — |
| Steps | steps, currentStep | No | — |

### Data Input
| Component | Key Props | Density | Notes |
|-----------|-----------|---------|-------|
| InputField | label, value, onChange, type, placeholder, description, errorText, disabled, addOnBefore, addOnAfter | Yes | Primary text input. |
| TextArea | label, value, onChange, rows, description, errorText | Yes | Multi-line text input. |
| Checkbox | label, checked, onChange, indeterminate, disabled, description | No | Boolean toggle. |
| RadioGroup | children, value, onChange | No | Use with RadioItem. |
| RadioItem | label, value, description, disabled | No | Child of RadioGroup. |
| Switch | label, checked, onChange, disabled, description | No | Toggle switch. |
| SelectMenu | children | Yes | SelectMenuTrigger + SelectMenuOptionGroup + SelectMenuOptionItem |
| ComboBox | children | Yes | ComboboxTrigger + ComboboxOptionGroup + ComboboxOptionItem + ComboboxLabel |
| MultiSelect | children | Yes | MultiSelectTrigger + MultiSelectOptionsGroup |
| DateRangepicker | startDate, endDate, onChange | No | Date range selection. |
| SingleDatepicker | value, onChange | No | Single date selection. |
| TimePicker | value, onChange | No | Time selection. |
| FileUpload | onUpload, accept, maxSize | No | File upload with drag-and-drop. |
| Slider | min, max, value, onChange | No | SliderLabel, SliderFooter |
| EditableText | value, onChange, isEditing | No | Inline text editing. |
| TagComboBox | children | No | TagComboBoxTrigger |

### Data Display
| Component | Key Props | Density | Compound Children |
|-----------|-----------|---------|-------------------|
| Table | children | Yes | TableHead, TableBody, TableRow, TableCell, TableFloatingIcon |
| StackedList | children | No | StackedListGroup, StackedListItem, StackedListCommon |
| DescriptionList | children | No | DescriptionListHeader, DescriptionListBody |
| ListTree | children | No | ListTreeRootWrapper, ListTreeNode, ListTreeNodeContents |
| KeyValue | label, value | No | Key-value display. |
| Metadata | items | No | Metadata display. |
| Stats | title, value, change, trend | No | Metric display. |
| DataVisualization | children | No | DataVisualizationHeader, DataVisualizationDescription, DataVisualizationAnalytics, DataVisualizationKpi, DataVisualizationFooter |

### Feedback
| Component | Key Props | Density | Compound Children |
|-----------|-----------|---------|-------------------|
| Alert | children, modifier(success/error/warning/info) | No | AlertTitle, AlertDescription, AlertFooter, AlertLink, AlertActionButton |
| Banner | children, modifier, dismissible | No | Full-width notification. |
| Notifications | — | No | Use with NotificationsContainer + notify() utility |
| ProgressBar | value, max, label | No | Progress indicator. |
| Tooltip | children, content | No | TooltipHeader, TooltipBody, TooltipFooter |
| Popover | children, content | No | PopoverHeader (=TooltipHeader), PopoverBody (=TooltipBody), PopoverFooter (=TooltipFooter) |
| Loader | size | No | Spinning loader. |
| LoaderV2 | size | No | Updated loader variant. |
| SkeletonLoader | shape, width, height | No | Content placeholder. |

### Overlays
| Component | Key Props | Density | Compound Children |
|-----------|-----------|---------|-------------------|
| Modal | show, onClose, size | No | ModalHeader, ModalBody, ModalFooter |
| Slideover | show, onClose, position | No | SlideoverHeader, SlideoverBody, SlideoverFooter |
| Dropdown | children | No | DropdownTrigger, DropdownOptionGroup, DropdownOptionItem |
| CommandPalette | open, onClose, commands | No | Keyboard-driven command interface. |

### Layout
| Component | Key Props | Density | Compound Children |
|-----------|-----------|---------|-------------------|
| Accordion | children | No | AccordionSimpleHeader/AccordionInteractiveHeader, AccordionPanel |
| ActionPanel | children | No | Sticky action bar. |
| EmptyState | children | No | EmptyStateIcon, EmptyStateTitle, EmptyStateDescription, EmptyStateBody, EmptyStateAction, EmptyStateRecommendation |
| PageHeadings | title, description, actions | No | Page-level heading. |
| SectionHeadings | title, description | No | Section-level heading. |
| Gallery | children | No | GalleryMedia, GalleryMediaActionbar, GalleryMediaFooterButton, GalleryPreview, GalleryPreviewImage, GalleryPreviewPdf, GalleryZoomInOut |
| CTACard | children | No | CTACardContent, CTACardActions, CTACardMedia |

### Utility
| Component | Purpose |
|-----------|---------|
| ErrorBoundary | React error boundary (also: useErrorBoundary, withErrorBoundary) |
| SkipToContent | Accessibility skip link |
| Resizable | Resizable container |
| Draggable | Drag-and-drop wrapper |
| PannableContainer | Pan/zoom container |
| CodeEditor | Monaco-based code editor |
| CodeSnippet | Syntax-highlighted code display (with CodeSnippetToolbar) |
| RichTextEditorV2 | Lexical-based rich text editor (with rteAPI) |
| MediaPlayer | Video/audio player (with MediaPlayerLeftControls, MediaPlayerRightControls, MediaPlayerSeekbar, MediaPlayerStates) |

## Compound Component Rules

Always use compound components together. Never use a child component without its parent:

```jsx
// CORRECT
<Modal show={show} onClose={onClose}>
  <ModalHeader title="Confirm" />
  <ModalBody>Content here</ModalBody>
  <ModalFooter>
    <Button onClick={onClose}>Cancel</Button>
    <Button colors="brand" onClick={onConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>

// WRONG — building a custom modal container
<div className="fixed inset-0 bg-black/50">
  <div className="bg-white rounded-lg p-6">...</div>
</div>
```

## Icon Usage
Icons come from `@browserstack/design-stack-icons`. Common icons:
- Material Design: `MdClose`, `MdSearch`, `MdAdd`, `MdEdit`, `MdDelete`, `MdCheck`
- Material Outlined: `MdOutlinePushPin`, `MdOutlineFilterAlt`, `MdOutlineMoreVert`
- Heroicons: via `@heroicons/react` re-exports

Always size icons to match the component context. Use `className="h-5 w-5"` for default density, `className="h-4 w-4"` for compact.
