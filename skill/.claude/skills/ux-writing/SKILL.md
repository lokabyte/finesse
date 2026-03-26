---
name: ux-writing
description: "State-aware UX writing guidance — labels, CTAs, system feedback, empty states, errors, and microcopy. Considers the state the user is coming from, the state they're in, and the state they're going to."
---
# UX Writing — State-Aware Copy Craft

## The State Trinity

Every piece of UI text exists at an intersection of three states:

1. **Where the user is coming from** — What did they just do? What's their mental model right now?
2. **Where the user is** — What are they looking at? What decision are they making?
3. **Where the user is going** — What happens next? What's the outcome of their action?

Good UX writing bridges all three.

## Copy Categories

### Labels
Static identifiers for UI elements. They name things.

| Rule | Example |
|------|---------|
| Use nouns or noun phrases | "Project name", "Due date", "Status" |
| Be specific, not generic | "Email address" not "Input" |
| Match the user's language | "Tests" not "Test Execution Entities" |
| Consistent capitalization | Sentence case for labels: "Test case name" |
| No colons in form labels | "Email address" not "Email address:" |

### General Text (Body, Descriptions, Help)
Explanatory text that provides context.

| Rule | Example |
|------|---------|
| Lead with the benefit | "Keep your team aligned" not "This feature enables..." |
| One idea per sentence | Short, scannable sentences |
| Use "you" and "your" | "Your changes were saved" not "Changes have been saved" |
| Present tense | "This deletes the project" not "This will delete the project" |
| Avoid jargon | "Remove" not "Purge", "Settings" not "Configuration" |

### CTAs (Buttons, Links, Actions)
Text that invites action. The most critical copy in the UI.

| Rule | Example |
|------|---------|
| Start with a verb | "Save changes", "Create project", "Download report" |
| Be specific about the outcome | "Delete project" not "Delete", "Save draft" not "Save" |
| Match the triggering context | If heading says "Create a test case", CTA says "Create test case" not "Submit" |
| Destructive actions name the thing | "Delete 3 test cases" not "Delete" |
| Primary CTA = most likely next step | "Save and continue" as primary, "Cancel" as secondary |
| Avoid "Submit" | Almost always replaceable with something specific |

### System Feedback (Toasts, Alerts, Status)
Messages from the system about what happened or what's happening.

| State transition | Pattern | Example |
|-----------------|---------|---------|
| Action → Success | "[Thing] [past tense verb]" | "Project created", "Changes saved", "3 test cases deleted" |
| Action → Error | "Couldn't [verb] [thing]. [Reason/fix]." | "Couldn't save changes. Check your connection and try again." |
| Action → Loading | "[Verb]ing [thing]..." | "Creating project...", "Saving changes..." |
| Idle → Warning | "[Consequence]. [Action to take]." | "This project has no test cases. Create one to get started." |
| System → Info | "[What happened]. [What to do if relevant]." | "2 test cases were moved to the archive." |

### Empty States
When there's nothing to show. Critical for first-run experience.

| Element | Purpose | Example |
|---------|---------|---------|
| **Headline** | Name what's missing | "No test cases yet" |
| **Description** | Explain why or what to do | "Create your first test case to start organizing your tests." |
| **CTA** | The obvious next step | "Create test case" |
| **Illustration** | Optional, adds warmth | Relevant icon or illustration |

### Error Messages
The most important copy in the product. Users read these when frustrated.

| Rule | Example |
|------|---------|
| Say what went wrong | "Email address is not valid" not "Invalid input" |
| Say how to fix it | "Enter an email like name@example.com" |
| Don't blame the user | "We couldn't find that page" not "You entered a wrong URL" |
| Be specific | "Password must be at least 8 characters" not "Invalid password" |
| Use the field label in the error | "Project name is required" not "This field is required" |

### Confirmation Dialogs
When asking users to confirm a destructive or important action.

| Element | Rule | Example |
|---------|------|---------|
| **Title** | State the action as a question | "Delete this project?" |
| **Body** | State the consequence | "This will permanently delete 'My Project' and all its test cases. This can't be undone." |
| **Primary CTA** | Repeat the action verb | "Delete project" |
| **Secondary CTA** | Offer the safe exit | "Cancel" |

## State-Aware Writing Checklist

When writing or reviewing any UI text, ask:

- [ ] **Does it tell the user what just happened?** (coming from)
- [ ] **Does it tell the user what they're looking at?** (current state)
- [ ] **Does it tell the user what to do next?** (going to)
- [ ] **Is the CTA specific about the outcome?**
- [ ] **Does the error message say how to fix it?**
- [ ] **Is the tone appropriate for the emotional state?** (frustrated user gets empathy, successful user gets celebration)
- [ ] **Is it consistent with adjacent copy?** (same terms, same capitalization, same tone)

## Common Anti-Patterns

```jsx
// WRONG — generic CTA
<Button>Submit</Button>

// CORRECT — specific CTA
<Button>Create test case</Button>

// WRONG — generic error
<Alert modifier="error">Something went wrong</Alert>

// CORRECT — specific error with fix
<Alert modifier="error">
  <AlertTitle>Couldn't save changes</AlertTitle>
  <AlertDescription>
    The project name is already taken. Try a different name.
  </AlertDescription>
</Alert>

// WRONG — empty state without guidance
<EmptyState>
  <EmptyStateTitle>No data</EmptyStateTitle>
</EmptyState>

// CORRECT — empty state with context and action
<EmptyState>
  <EmptyStateIcon icon={MdFolderOpen} />
  <EmptyStateTitle>No test cases yet</EmptyStateTitle>
  <EmptyStateDescription>
    Create your first test case to start organizing your tests.
  </EmptyStateDescription>
  <EmptyStateAction>
    <Button colors="brand">Create test case</Button>
  </EmptyStateAction>
</EmptyState>

// WRONG — confirmation without consequence
<ModalHeader title="Are you sure?" />

// CORRECT — confirmation with consequence
<ModalHeader title="Delete this project?" />
<ModalBody>
  This will permanently delete "My Project" and all 24 test cases. This can't be undone.
</ModalBody>
```
