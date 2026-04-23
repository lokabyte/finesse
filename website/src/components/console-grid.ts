import { commands, commandMeta, commandOrder, type CommandKey } from '../data/commands';

/**
 * Cheat sheet — single scrollable page.
 * Each command is a section with its modes listed.
 */

function renderCommandSection(cmdKey: CommandKey): string {
  const cmd = commands.find(c => c.commandKey === cmdKey)!;
  const meta = commandMeta[cmdKey];

  return `
    <div class="mb-16">
      <div class="flex items-center gap-3 mb-5 pb-3 border-b-2 border-ink-faint/20">
        <span class="w-2 h-2 rounded-full bg-${cmdKey}"></span>
        <span class="text-sm font-sans font-semibold text-ink">${cmd.slash}</span>
        <span class="text-[10px] text-ink-muted">${meta.tagline}</span>
        <span class="text-[10px] text-ink-faint tabular-nums ml-auto">${cmd.modes.length} mode${cmd.modes.length > 1 ? 's' : ''}</span>
      </div>

      <!-- Description -->
      <p class="text-xs text-ink-muted leading-relaxed mb-4 max-w-xl">${cmd.description}</p>

      <!-- Modes -->
      <div>
        ${cmd.modes.map(mode => `
          <div class="border-b border-ink-faint/8 hover:bg-surface-raised/50 transition-colors py-3 px-2 rounded-sm">
            <div class="flex flex-col md:flex-row md:items-start gap-1 md:gap-0">
              <div class="md:w-48 shrink-0">
                <code class="text-sm text-ink font-semibold">${cmd.slash} ${mode.flag}</code>
              </div>
              <div class="flex-1">
                <p class="text-xs text-ink-muted leading-relaxed">${mode.description}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

export function renderConsoleGrid(): string {
  const totalModes = commands.reduce((sum, c) => sum + c.modes.length, 0);

  return `
    <div class="cheatsheet">
      <!-- Router note -->
      <div class="mb-10 rounded-xl border-2 border-ink/10 bg-gradient-to-r from-review/5 via-ship/5 to-style/5 px-5 py-4">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="w-2 h-2 rounded-full bg-ink/30"></span>
          <span class="text-sm font-semibold text-ink">/finesse</span>
          <span class="text-[10px] text-ink-muted tracking-wider">router</span>
        </div>
        <p class="text-xs text-ink-muted leading-relaxed">
          Describe what you need in plain language — <code class="text-ink">/finesse make this look better</code> or <code class="text-ink">/finesse teach me about density</code> — and it routes to the right command or teaches you directly.
        </p>
      </div>

      ${commandOrder.map(renderCommandSection).join('')}

      <!-- Footer stats -->
      <div class="flex items-center justify-between pt-6 mt-4 border-t border-ink-faint/10">
        <div class="flex items-center gap-6">
          <span class="text-[10px] text-ink-faint uppercase tracking-widest">Total</span>
          <span class="text-xs text-ink tabular-nums">${commands.length} commands</span>
          <span class="text-[10px] text-ink-faint">·</span>
          <span class="text-xs text-ink tabular-nums">${totalModes} modes</span>
        </div>
        <span class="text-[10px] text-ink-faint uppercase tracking-widest">v0.2.0</span>
      </div>
    </div>
  `;
}

// No interactions needed — pure static content
export function initConsoleInteractions(): void {}
