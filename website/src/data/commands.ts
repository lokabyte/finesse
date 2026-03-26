export type Module = 'scan' | 'refine' | 'reshape' | 'elevate' | 'dial' | 'voice' | 'learn';

export interface Command {
  id: number;
  key: string;
  name: string;
  slash: string;
  module: Module;
  description: string;
  shortDescription: string; // One-liner for mind map cards
  example?: string; // BrowserStack-context example usage
}

export const modules: Record<Module, { label: string; tagline: string }> = {
  scan:    { label: 'Scan',    tagline: 'find what\'s rough' },
  refine:  { label: 'Refine',  tagline: 'smooth it out' },
  reshape: { label: 'Reshape', tagline: 'shift context' },
  elevate: { label: 'Elevate', tagline: 'add finesse' },
  dial:    { label: 'Dial',    tagline: 'turn the knob' },
  voice:   { label: 'Voice',   tagline: 'say it right' },
  learn:   { label: 'Learn',   tagline: 'know the system' },
};

export const commands: Command[] = [
  // Scan
  { id: 1,  key: 'AUD',  name: 'audit',     slash: '/audit',     module: 'scan',
    shortDescription: 'Scan against design system rules.',
    description: 'Full structural scan — checks component usage, token compliance, density propagation, composition patterns, accessibility, and responsive behavior against your design system rules.',
    example: '/audit the Test Management dashboard — Scans the entire dashboard for Design Stack compliance: are the right components used? Are tokens semantic? Does density propagate correctly through tables and cards? Are ARIA roles present?' },
  { id: 2,  key: 'CRT',  name: 'critique',   slash: '/critique',  module: 'scan',
    shortDescription: 'Visual and UX review.',
    description: 'Simulates a senior designer reviewing your UI — evaluates visual hierarchy, spacing rhythm, information density, affordance clarity, and overall UX coherence.',
    example: '/critique the Automate test results page — Reviews the results layout like a design review: Is the pass/fail ratio scannable at a glance? Does the hierarchy guide the eye? Are actions discoverable? Is the information density appropriate?' },

  // Refine
  { id: 3,  key: 'TUNE', name: 'tune',       slash: '/tune',      module: 'refine',
    shortDescription: 'Replace raw values with tokens.',
    description: 'Aligns implementation to system norms — replaces hardcoded values with semantic tokens, fixes component prop usage, normalizes spacing to the design scale.',
    example: '/tune the Observability flaky test panel — Replaces raw hex colors with semantic status tokens, swaps hardcoded 16px margins for spacing-4, fixes a Button variant that should be "minimal" instead of custom-styled.' },
  { id: 4,  key: 'POL',  name: 'polish',     slash: '/polish',    module: 'refine',
    shortDescription: 'Fix spacing and alignment.',
    description: 'Smooths visual surfaces — fixes sub-pixel misalignments, normalizes padding and gaps, ensures consistent border radii, tightens spacing rhythm across a view.',
    example: '/polish the Percy visual diff comparison view — Fixes the 2px misalignment between baseline and new screenshot, normalizes card padding across diff states, aligns the approval action bar with the content grid.' },
  { id: 5,  key: 'TRIM', name: 'trim',       slash: '/trim',      module: 'refine',
    shortDescription: 'Remove redundancy, simplify.',
    description: 'Cuts excess — removes redundant wrapper elements, consolidates near-duplicate components, simplifies conditional rendering, reduces DOM depth.',
    example: '/trim the Live session launcher — Removes 3 unnecessary wrapper divs, consolidates the OS/browser/device pickers into one reusable selector pattern, simplifies the resolution dropdown logic.' },
  { id: 6,  key: 'LOCK', name: 'lock',       slash: '/lock',      module: 'refine',
    shortDescription: 'Harden for a11y and edge cases.',
    description: 'Hardens UI for production — adds keyboard navigation, handles empty and error states, adds loading skeletons, ensures screen reader support, covers edge cases.',
    example: '/lock the Test Management bulk actions toolbar — Adds keyboard shortcuts for select-all, handles the zero-selection state gracefully, adds error recovery for failed bulk status updates, ensures focus returns correctly after modal closes.' },

  // Reshape
  { id: 7,  key: 'CLR',  name: 'clarify',    slash: '/clarify',   module: 'reshape',
    shortDescription: 'Reduce to essence.',
    description: 'Reduces to essence — simplifies complex forms, removes cognitive overhead, introduces progressive disclosure, makes the primary action unmistakable.',
    example: '/clarify the test case creation flow in Test Management — Reduces the 12-field form to 4 essential fields upfront, moves advanced options behind a disclosure, makes "Create & Run" the obvious primary action.' },
  { id: 8,  key: 'DST',  name: 'distill',    slash: '/distill',   module: 'reshape',
    shortDescription: 'Extract a reusable pattern.',
    description: 'Extracts the reusable core pattern from a specific implementation — strips context-specific decoration to create a transferable component or layout pattern.',
    example: '/distill the sortable data table from Test Runs — Extracts the sort/filter/paginate pattern into a reusable table recipe that Observability, Automate, and App Automate can all use.' },
  { id: 9,  key: 'ADP',  name: 'adapt',      slash: '/adapt',     module: 'reshape',
    shortDescription: 'Shift to a new context.',
    description: 'Replatforms a UI pattern to a different context — desktop to mobile, light to dark, dense to comfortable, one product surface to another.',
    example: '/adapt the project picker for App Live mobile — Transforms the desktop dropdown project selector into a mobile-friendly bottom sheet with search, recents, and touch-friendly tap targets.' },

  // Elevate
  { id: 10, key: 'ANM',  name: 'animate',    slash: '/animate',   module: 'elevate',
    shortDescription: 'Add purposeful motion.',
    description: 'Adds purposeful motion — entrance transitions, state changes, progress indicators, loading sequences. Motion that communicates, not decorates.',
    example: '/animate the Automate build progress tracker — Adds smooth progress bar fills, staggered test result reveals as they complete, a subtle pulse on status changes from running to passed/failed.' },
  { id: 11, key: 'SPL',  name: 'splash',     slash: '/splash',    module: 'elevate',
    shortDescription: 'Inject color with intent.',
    description: 'Injects color with semantic intent — maps status to color, adds visual weight to key metrics, uses the token system to create meaningful color relationships.',
    example: '/splash the Observability dashboard metrics — Applies semantic status colors to pass/fail/flaky counts, adds color-coded trend sparklines, uses brand color to highlight the reliability score.' },
  { id: 12, key: 'SPK',  name: 'spark',      slash: '/spark',     module: 'elevate',
    shortDescription: 'Add delight and micro-interactions.',
    description: 'Adds delight moments — micro-interactions on key actions, celebration states, satisfying feedback loops, personality in empty states.',
    example: '/spark the Percy build approval flow — Adds a satisfying checkmark animation on approve, a subtle confetti burst when all diffs are reviewed, a friendly empty state when there are zero visual changes.' },
  { id: 13, key: 'ONB',  name: 'onboard',    slash: '/onboard',   module: 'elevate',
    shortDescription: 'Design the first-time experience.',
    description: 'Designs the first-time experience — empty states that guide, setup wizards, contextual hints, sample data, progressive feature revelation.',
    example: '/onboard new users to Test Management — Designs the empty project state with a clear "Create your first test case" CTA, adds a guided 3-step setup, pre-populates a sample test suite to explore.' },
  { id: 14, key: 'TYP',  name: 'typeset',    slash: '/typeset',   module: 'elevate',
    shortDescription: 'Craft the type hierarchy.',
    description: 'Crafts the typographic hierarchy — establishes clear heading levels, optimizes line heights for readability, sets proper measure, balances type scale across the view.',
    example: '/typeset the Automate session detail page — Fixes the flat heading hierarchy (everything was 14px), establishes H1→H2→body rhythm, improves log readability with monospace and tighter line height.' },
  { id: 15, key: 'GRID', name: 'grid',       slash: '/grid',      module: 'elevate',
    shortDescription: 'Compose responsive layouts.',
    description: 'Arranges content into a purposeful layout — responsive grids, dashboard compositions, card arrangements, sidebar + main patterns.',
    example: '/grid the Observability overview — Lays out the reliability score, flaky test trends, build frequency chart, and recent failures into a responsive 3-column dashboard that collapses cleanly on tablet.' },
  { id: 16, key: 'OVD',  name: 'overdrive',  slash: '/overdrive', module: 'elevate',
    shortDescription: 'Maximum visual impact.',
    description: 'Pushes to maximum visual impact — bold scale contrasts, dramatic whitespace, hero-level type, commanding CTAs. For landing pages and key moments.',
    example: '/overdrive the BrowserStack product landing page — Pushes the hero to full-bleed with 64px bold type, dramatic before/after visual testing demo, high-contrast CTA, cinematic scroll-triggered animations.' },

  // Dial
  { id: 17, key: 'HUSH', name: 'hush',       slash: '/hush',      module: 'dial',
    shortDescription: 'Quieter, subtler, calmer.',
    description: 'Dials it down — reduces visual noise, softens colors, shrinks type, calms animations, lowers contrast. For UI that should recede.',
    example: '/hush the notification system across BrowserStack products — Softens alert banners to muted tones, reduces badge sizes, replaces bouncing animations with gentle fades, makes dismissed notifications truly disappear.' },
  { id: 18, key: 'PNH',  name: 'punch',      slash: '/punch',     module: 'dial',
    shortDescription: 'Bolder, louder, stronger.',
    description: 'Dials it up — bolder type, stronger colors, larger touch targets, more prominent CTAs, higher contrast. For UI that needs to command attention.',
    example: '/punch the empty states across Test Management — Enlarges illustrations, makes CTAs impossible to miss with brand-colored buttons, adds stronger headlines, increases the contrast between empty state and surrounding chrome.' },

  // Voice
  { id: 19, key: 'RWT',  name: 'rewrite',    slash: '/rewrite',   module: 'voice',
    shortDescription: 'Rewrite UI copy for clarity.',
    description: 'Rewrites UI text — error messages, empty states, tooltips, CTAs, labels — for clarity, consistency, and tone alignment with the product voice.',
    example: '/rewrite the Automate error messages — Replaces "Something went wrong" with specific, actionable messages: "Couldn\'t start the session. The selected device is currently unavailable — try another or wait a moment."' },
  { id: 20, key: 'TONE', name: 'tone',       slash: '/tone',      module: 'voice',
    shortDescription: 'Shift the voice.',
    description: 'Adjusts the tonal register of UI copy — formal ↔ casual, technical ↔ plain, urgent ↔ calm — while preserving meaning and intent.',
    example: '/tone casual the onboarding flow in Test Management — Shifts stiff copy like "Initialize your test suite configuration" to warm guidance: "Set up your first test suite — it only takes a minute."' },

  // Learn
  { id: 21, key: 'SCH',  name: 'school',     slash: '/school',    module: 'learn',
    shortDescription: 'Learn your design system.',
    description: 'Interactive learning session — teaches design system concepts through explanation, examples, and exercises. Density, composition, tokens, a11y, and more.',
    example: '/school density system — Interactive lesson: what is density? Default vs compact modes, which components support it, how it propagates through parent→child, when to use each mode in BrowserStack products.' },
  { id: 22, key: 'MINE', name: 'mine',       slash: '/mine',      module: 'learn',
    shortDescription: 'Extract tokens and patterns.',
    description: 'Extracts structured design data — component catalogs, token maps, pattern inventories, icon sets. Outputs machine-readable references.',
    example: '/mine semantic color tokens — Extracts the full color token map: bg-neutral-default, text-brand-strong, border-danger-weak, etc. with usage guidelines, light/dark values, and where each is used in the product.' },
];

export const moduleOrder: Module[] = ['scan', 'refine', 'reshape', 'elevate', 'dial', 'voice', 'learn'];

export function getCommandsByModule(module: Module): Command[] {
  return commands.filter(c => c.module === module);
}

export const moduleColors: Record<Module, string> = {
  scan:    'scan',
  refine:  'refine',
  reshape: 'reshape',
  elevate: 'elevate',
  dial:    'dial',
  voice:   'voice',
  learn:   'learn',
};
