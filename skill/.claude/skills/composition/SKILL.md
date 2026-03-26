---
name: composition
description: "Compound component composition patterns — which components belong together, required vs optional children, and correct nesting."
---
# Composition Patterns — BrowserStack Design Stack

## What Are Compound Components?

Many Design Stack components are "compound" — they consist of a parent component and several child components that must be used together. The parent provides context; the children provide structure.

## Compound Component Families

### Modal
```jsx
<Modal show={show} onClose={onClose} size="md">
  <ModalHeader title="Dialog Title" description="Optional description" />
  <ModalBody>
    {/* Content */}
  </ModalBody>
  <ModalFooter position="right">
    <Button variant="secondary" onClick={onClose}>Cancel</Button>
    <Button colors="brand" onClick={onConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```
- **Required:** Modal, ModalHeader, ModalBody
- **Optional:** ModalFooter

### Slideover
```jsx
<Slideover show={show} onClose={onClose} position="right">
  <SlideoverHeader title="Panel Title" />
  <SlideoverBody>
    {/* Content */}
  </SlideoverBody>
  <SlideoverFooter>
    <Button onClick={onClose}>Close</Button>
  </SlideoverFooter>
</Slideover>
```
- **Required:** Slideover, SlideoverHeader, SlideoverBody
- **Optional:** SlideoverFooter

### Alert
```jsx
<Alert modifier="warning">
  <AlertTitle>Attention needed</AlertTitle>
  <AlertDescription>Description of the alert.</AlertDescription>
  <AlertFooter>
    <AlertLink href="/docs">Learn more</AlertLink>
    <AlertActionButton onClick={onDismiss}>Dismiss</AlertActionButton>
  </AlertFooter>
</Alert>
```
- **Required:** Alert, AlertTitle
- **Optional:** AlertDescription, AlertFooter, AlertLink, AlertActionButton

### Table
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
      <TableCell>Item 1</TableCell>
      <TableCell><Badge text="Active" modifier="success" /></TableCell>
    </TableRow>
  </TableBody>
</Table>
```
- **Required:** Table, TableHead, TableBody, TableRow, TableCell
- **Optional:** TableFloatingIcon

### Accordion
```jsx
<Accordion>
  <AccordionSimpleHeader title="Section 1" />
  {/* OR <AccordionInteractiveHeader title="Section 1" actions={...} /> */}
  <AccordionPanel>
    {/* Collapsible content */}
  </AccordionPanel>
</Accordion>
```
- **Required:** Accordion, one of AccordionSimpleHeader/AccordionInteractiveHeader, AccordionPanel

### SelectMenu
```jsx
<SelectMenu>
  <SelectMenuTrigger placeholder="Select..." />
  <SelectMenuOptionGroup>
    <SelectMenuOptionItem value="opt1">Option 1</SelectMenuOptionItem>
    <SelectMenuOptionItem value="opt2">Option 2</SelectMenuOptionItem>
  </SelectMenuOptionGroup>
</SelectMenu>
```
- **Required:** SelectMenu, SelectMenuTrigger, SelectMenuOptionGroup, SelectMenuOptionItem
- **Optional:** SelectMenuLabel, SelectMenuStickyItem

### ComboBox
```jsx
<ComboBox>
  <ComboboxLabel>Search users</ComboboxLabel>
  <ComboboxTrigger placeholder="Type to search..." />
  <ComboboxOptionGroup>
    <ComboboxOptionItem value="user1">User 1</ComboboxOptionItem>
  </ComboboxOptionGroup>
</ComboBox>
```
- **Required:** ComboBox, ComboboxTrigger, ComboboxOptionGroup, ComboboxOptionItem
- **Optional:** ComboboxLabel, ComboboxAddNewItem, ComboboxStickyItem

### Dropdown
```jsx
<Dropdown>
  <DropdownTrigger>Actions</DropdownTrigger>
  <DropdownOptionGroup>
    <DropdownOptionItem onClick={handleEdit}>Edit</DropdownOptionItem>
    <DropdownOptionItem onClick={handleDelete}>Delete</DropdownOptionItem>
  </DropdownOptionGroup>
</Dropdown>
```
- **Required:** Dropdown, DropdownTrigger, DropdownOptionGroup, DropdownOptionItem

### EmptyState
```jsx
<EmptyState>
  <EmptyStateIcon icon={MdSearchOff} />
  <EmptyStateTitle>No results found</EmptyStateTitle>
  <EmptyStateDescription>Try adjusting your search criteria.</EmptyStateDescription>
  <EmptyStateAction>
    <Button onClick={onClearSearch}>Clear search</Button>
  </EmptyStateAction>
</EmptyState>
```
- **Required:** EmptyState, EmptyStateTitle
- **Optional:** EmptyStateIcon, EmptyStateDescription, EmptyStateBody, EmptyStateAction, EmptyStateRecommendation

### DataVisualization
```jsx
<DataVisualization>
  <DataVisualizationHeader title="Revenue" />
  <DataVisualizationDescription>Last 30 days</DataVisualizationDescription>
  <DataVisualizationKpi value="$12,345" change="+5.2%" />
  <DataVisualizationAnalytics>{/* Chart */}</DataVisualizationAnalytics>
  <DataVisualizationFooter>{/* Legend */}</DataVisualizationFooter>
</DataVisualization>
```

### Tooltip / Popover
```jsx
<Tooltip content={<TooltipBody>Helpful info</TooltipBody>}>
  <Button>Hover me</Button>
</Tooltip>
```
- Popover uses the same child components (PopoverHeader = TooltipHeader, etc.)

## Anti-Patterns

```jsx
// WRONG — using child without parent
<ModalBody>Content</ModalBody>  // no Modal wrapper!

// WRONG — building custom overlay instead of using Modal
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div className="bg-white rounded-lg shadow-xl p-6">
    <h2>Title</h2>
    <p>Content</p>
  </div>
</div>

// WRONG — partial compound (missing required children)
<Modal show={show} onClose={onClose}>
  <div className="p-4">Content without ModalHeader or ModalBody</div>
</Modal>

// CORRECT — complete compound structure
<Modal show={show} onClose={onClose}>
  <ModalHeader title="Title" />
  <ModalBody>Content</ModalBody>
</Modal>
```
