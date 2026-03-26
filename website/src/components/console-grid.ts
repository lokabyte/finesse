import { commands, modules, moduleOrder, getCommandsByModule, type Module } from '../data/commands';

/**
 * Cheat sheet — single scrollable page, no modals.
 * Each module is a section with a table of commands showing
 * key, slash, short description, full description, and example.
 */

function renderCommandRow(cmd: ReturnType<typeof getCommandsByModule>[number]): string {
  return `
    <div class="border-b border-ink-faint/8 hover:bg-surface-raised/50 transition-colors py-4 px-2 rounded-sm">
      <div class="flex flex-col md:flex-row md:items-start gap-2 md:gap-0">
        <div class="flex items-center gap-2 md:w-20 shrink-0">
          <span class="text-[10px] text-ink-faint tabular-nums">${String(cmd.id).padStart(2, '0')}</span>
          <span class="text-sm font-semibold text-ink tracking-wider">${cmd.key}</span>
          <code class="text-sm text-ink md:hidden ml-1">${cmd.slash}</code>
        </div>
        <div class="hidden md:block md:w-28 shrink-0">
          <code class="text-sm text-ink">${cmd.slash}</code>
        </div>
        <div class="flex-1">
          <p class="text-xs text-ink-muted leading-relaxed">${cmd.description}</p>
          ${cmd.example ? `<p class="text-[11px] text-ink-faint leading-relaxed mt-2"><span class="text-ink-faint/60">e.g.</span> ${cmd.example}</p>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderModuleSection(mod: Module): string {
  const cmds = getCommandsByModule(mod);
  const info = modules[mod];

  return `
    <div class="mb-16">
      <div class="flex items-center gap-3 mb-5 pb-3 border-b-2 border-ink-faint/20">
        <span class="w-2 h-2 rounded-full bg-${mod}"></span>
        <span class="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-ink">${info.label}</span>
        <span class="text-[10px] text-ink-faint tabular-nums ml-auto">${cmds.length} command${cmds.length > 1 ? 's' : ''}</span>
      </div>
      <div>
        ${cmds.map(renderCommandRow).join('')}
      </div>
    </div>
  `;
}

export function renderConsoleGrid(): string {
  return `
    <div class="cheatsheet">
      ${moduleOrder.map(renderModuleSection).join('')}

      <!-- Footer stats -->
      <div class="flex items-center justify-between pt-6 mt-4 border-t border-ink-faint/10">
        <div class="flex items-center gap-6">
          <span class="text-[10px] text-ink-faint uppercase tracking-widest">Total</span>
          <span class="text-xs text-ink tabular-nums">${commands.length} commands</span>
          <span class="text-[10px] text-ink-faint">·</span>
          <span class="text-xs text-ink tabular-nums">${moduleOrder.length} modules</span>
        </div>
        <span class="text-[10px] text-ink-faint uppercase tracking-widest">v0.1.0</span>
      </div>
    </div>
  `;
}

// No interactions needed — pure static content
export function initConsoleInteractions(): void {}
