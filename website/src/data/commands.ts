export type CommandKey = 'review' | 'fix' | 'ship' | 'style' | 'words';

export interface Mode {
  flag: string;       // e.g. "compliance", "tokens", "louder"
  description: string;
}

export interface Command {
  id: number;
  key: string;        // 3-letter code for cheat sheet
  name: string;
  slash: string;
  commandKey: CommandKey;
  tagline: string;
  description: string;
  modes: Mode[];
  example?: string;
}

export const commandMeta: Record<CommandKey, { label: string; tagline: string }> = {
  review: { label: 'Review',  tagline: 'what\'s wrong?' },
  fix:    { label: 'Fix',     tagline: 'make it correct' },
  ship:   { label: 'Ship',    tagline: 'make it real' },
  style:  { label: 'Style',   tagline: 'make it feel right' },
  words:  { label: 'Words',   tagline: 'fix the text' },
};

export const commands: Command[] = [
  {
    id: 1, key: 'REV', name: 'review', slash: '/review', commandKey: 'review',
    tagline: 'Diagnose compliance and visual quality.',
    description: 'Full structural scan — checks component usage, token compliance, density propagation, composition patterns, accessibility, and visual/UX coherence against your design system.',
    modes: [
      { flag: 'compliance', description: 'Structural scan — tokens, components, density, a11y' },
      { flag: 'design', description: 'Visual/UX critique — hierarchy, spacing, affordance' },
      { flag: 'extract', description: 'Extract design data from codebase as structured catalog' },
    ],
    example: '/review compliance dashboard.tsx — Scans for DesignStack compliance: correct components, semantic tokens, density propagation, ARIA roles.'
  },
  {
    id: 2, key: 'FIX', name: 'fix', slash: '/fix', commandKey: 'fix',
    tagline: 'Align to the design system.',
    description: 'Replaces raw values with semantic tokens, fixes spacing and alignment, removes redundant wrappers and unused props. Full pipeline or targeted mode.',
    modes: [
      { flag: 'tokens', description: 'Raw values → semantic tokens, custom → system components' },
      { flag: 'spacing', description: 'Spacing, alignment, visual consistency' },
      { flag: 'trim', description: 'Remove redundancy — wrappers, props, styles, noise' },
      { flag: 'migrate <target>', description: 'Replatform to a different design system' },
    ],
    example: '/fix tokens panel.tsx — Replaces hex colors with semantic tokens, swaps hardcoded margins for spacing scale.'
  },
  {
    id: 3, key: 'SHP', name: 'ship', slash: '/ship', commandKey: 'ship',
    tagline: 'Harden for production.',
    description: 'Makes UI production-ready — accessibility, error/empty/loading states, edge cases, and information clarity. Full run or targeted mode.',
    modes: [
      { flag: 'a11y', description: 'ARIA, keyboard, focus management, screen reader' },
      { flag: 'states', description: 'Error, empty, and loading states for every data path' },
      { flag: 'clarity', description: 'Simplify IA — labels, hierarchy, flow' },
    ],
    example: '/ship a11y modal.tsx — Adds keyboard navigation, focus trapping, ARIA labels, screen reader announcements.'
  },
  {
    id: 4, key: 'STY', name: 'style', slash: '/style', commandKey: 'style',
    tagline: 'Visual enhancement with a direction.',
    description: 'Adjusts the visual intensity, adds color/motion/delight, or reshapes typography/layout/onboarding — all within the design system.',
    modes: [
      { flag: 'louder', description: 'More emphasis — stronger colors, heavier weights, tighter spacing' },
      { flag: 'quieter', description: 'Less noise — softer colors, lighter weights, more breathing room' },
      { flag: 'max', description: 'Maximum impact — hero scale, dramatic contrast, purposeful motion' },
      { flag: 'color', description: 'Semantic color — status, hierarchy, accents' },
      { flag: 'motion', description: 'Purposeful animation — transitions, state changes, reveals' },
      { flag: 'delight', description: 'Spark moments — completion, milestones, celebrations' },
      { flag: 'type', description: 'Typography — hierarchy, readability, rhythm' },
      { flag: 'layout', description: 'Grid, content zones, responsive flow' },
      { flag: 'onboarding', description: 'First-time experience — tooltips, hints, progressive disclosure' },
    ],
    example: '/style louder dashboard.tsx — Emphasizes CTAs, weights up headings, tightens related groups, sharpens hover states.'
  },
  {
    id: 5, key: 'WRD', name: 'words', slash: '/words', commandKey: 'words',
    tagline: 'Rewrite UI text for clarity.',
    description: 'Rewrites UI copy — labels, CTAs, errors, empty states, tooltips — for clarity, consistency, and tone. Full rewrite or tonal shift.',
    modes: [
      { flag: 'casual', description: 'Shift toward casual register' },
      { flag: 'formal', description: 'Shift toward formal register' },
      { flag: 'technical', description: 'Shift toward technical register' },
      { flag: 'plain', description: 'Shift toward plain language' },
      { flag: 'urgent', description: 'Shift toward urgency' },
      { flag: 'calm', description: 'Shift toward calm' },
    ],
    example: '/words form.tsx — Rewrites "Submit" to "Save changes", fixes "Something went wrong" to a specific actionable message.'
  },
];

export const commandOrder: CommandKey[] = ['review', 'fix', 'ship', 'style', 'words'];

export function getCommand(key: CommandKey): Command {
  return commands.find(c => c.commandKey === key)!;
}

export const commandColors: Record<CommandKey, string> = {
  review:  'review',
  fix:     'fix',
  ship:    'ship',
  style:   'style',
  words:   'words',
};
