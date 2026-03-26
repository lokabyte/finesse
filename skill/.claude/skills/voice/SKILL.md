---
name: voice
description: "Product voice and tone guide — tone spectrum, terminology map, and product-specific vocabulary for BrowserStack. Works alongside the ux-writing skill."
---
# Voice & Tone

This skill defines *how* BrowserStack sounds. The `ux-writing` skill defines *what* to write (patterns, formats, rules). This skill defines *how* it should feel.

## Tone Spectrum

BrowserStack's voice sits here on three axes:

| Axis | Position | Notes |
|------|----------|-------|
| Formal ↔ Casual | **65% formal** | Professional but not stiff. No "Dear User", but no "Hey!" either. |
| Technical ↔ Plain | **60% technical** | Users are developers and QA engineers. They know what a "flaky test" is. Don't over-simplify, but don't assume everyone knows CI/CD internals. |
| Urgent ↔ Calm | **Context-dependent** | Errors lean urgent. Success states lean calm. Onboarding leans warm. |

## Tone by Context

| Context | Register | Example |
|---------|----------|---------|
| Onboarding | Warm, encouraging | "You're all set. Run your first test to see it in action." |
| Success | Brief, confident | "Build passed. 142 tests, 0 failures." |
| Error (user fixable) | Direct, helpful | "Couldn't connect to the device. Check your network and try again." |
| Error (system) | Honest, reassuring | "Something went wrong on our end. We're looking into it." |
| Warning | Clear, no alarm | "This project has no active members. Tests won't run until someone is added." |
| Destructive action | Specific, consequential | "Delete 'Regression Suite'? This removes 47 test cases permanently." |
| Empty state | Guiding, not apologetic | "No test runs yet. Create a test case to get started." |
| Loading | Quiet, informational | "Running tests..." / "Setting up your environment..." |
| Billing/Account | Formal, precise | "Your plan includes 5 parallel tests. Upgrade for more." |

## Terminology Map

Preferred terms for consistency across products:

| Use this | Not this | Notes |
|----------|----------|-------|
| test run | test execution | "Run" is the verb and noun |
| test case | test script | "Case" for the definition, "run" for the instance |
| flaky | unstable, intermittent | Industry-standard term, users know it |
| build | job, pipeline | BS uses "build" for a group of test runs |
| session | test session | "Session" when context is clear |
| project | workspace, repository | BS's organizational unit |
| device | target, endpoint | Physical or virtual device |
| parallel | concurrent | "Parallel tests" not "concurrent executions" |
| dashboard | overview, home | The main view of a product |
| settings | configuration, preferences | Always "Settings" |
| integration | connector, plugin | Third-party connections |

## Product-Specific Voice

### Test Management
- Speaks to QA leads and manual testers
- Slightly more formal than Automate — these users manage process, not just run code
- Key objects: test cases, test runs, test plans, milestones, tags

### Automate / App Automate
- Speaks to developers and SDETs
- More technical register — code snippets are natural here
- Key objects: builds, sessions, tests, capabilities, logs

### Observability
- Speaks to engineering leads and QA managers
- Data-forward — numbers and trends lead
- Key objects: flaky tests, build health, failure categories, insights

### Live / App Live
- Speaks to developers and QA doing manual testing
- Most casual register — quick interactive sessions
- Key objects: sessions, devices, browsers, resolutions

### Percy
- Speaks to front-end developers and designers
- Visual-first language — "snapshot", "diff", "baseline", "approval"
- Key objects: builds, snapshots, visual diffs, approvals

## Voice Principles

1. **Say less.** If 3 words work, don't use 7.
2. **Be specific.** "Delete 3 test cases" not "Delete selected items."
3. **Respect expertise.** Users are professionals. Don't explain what they already know.
4. **Guide, don't lecture.** Show the next step, not a paragraph of context.
5. **Name the thing.** Use the actual project name, test case title, or count. Never "this item."
