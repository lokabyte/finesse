import { commands, commandMeta, commandOrder, getCommand, type Command, type CommandKey } from '../data/commands';

/**
 * FigJam-style mind map canvas.
 * - Command nodes on the left, mode nodes branch right
 * - Dashed SVG connectors
 * - Command nodes are draggable
 * - Click a mode → detail view
 * - One command expanded at a time
 */

const accents: Record<CommandKey, { solid: string; faded: string; bg: string }> = {
  review: { solid: 'rgb(var(--c-review))',  faded: 'rgb(var(--c-review) / 0.3)',  bg: 'var(--c-review-dim)' },
  fix:    { solid: 'rgb(var(--c-fix))',     faded: 'rgb(var(--c-fix) / 0.3)',     bg: 'var(--c-fix-dim)' },
  ship:   { solid: 'rgb(var(--c-ship))',    faded: 'rgb(var(--c-ship) / 0.3)',    bg: 'var(--c-ship-dim)' },
  style:  { solid: 'rgb(var(--c-style))',   faded: 'rgb(var(--c-style) / 0.3)',   bg: 'var(--c-style-dim)' },
  words:  { solid: 'rgb(var(--c-words))',   faded: 'rgb(var(--c-words) / 0.3)',   bg: 'var(--c-words-dim)' },
};

// ─── Track drag offsets per node ──────────────────────────────
const dragOffsets: Map<string, { dx: number; dy: number }> = new Map();
const staggerOffsets: Map<string, { dx: number; dy: number }> = new Map();
let activeCommand: CommandKey = 'review';

// Pre-compute stagger offsets for mode nodes
function initStaggerOffsets(): void {
  commandOrder.forEach(cmdKey => {
    const cmd = getCommand(cmdKey);
    cmd.modes.forEach((mode, i) => {
      const nodeId = `mode-${cmdKey}-${mode.flag}`;
      if (staggerOffsets.has(nodeId)) return;
      const dx = i * 18 + (Math.random() - 0.5) * 12;
      const dy = (Math.random() - 0.5) * 6;
      staggerOffsets.set(nodeId, { dx, dy });
    });
  });
}
initStaggerOffsets();

function getStaggerOffset(nodeId: string): { dx: number; dy: number } {
  return staggerOffsets.get(nodeId) || { dx: 0, dy: 0 };
}

// ─── Render ───────────────────────────────────────────────────

export function renderConsoleMindmap(): string {
  return `
    <div class="mindmap-canvas relative rounded-xl border border-ink-faint/15 bg-canvas overflow-x-auto overflow-y-hidden select-none" id="console-map">
      <!-- Dot grid -->
      <div class="canvas-grid absolute inset-0 pointer-events-none"></div>

      <!-- SVG connectors -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none" id="connector-svg" style="z-index: 1;"></svg>

      <!-- Nodes layer -->
      <div class="relative p-6 md:p-8 flex items-start gap-10 md:gap-16" style="z-index: 2; min-width: 640px;">

        <!-- Command nodes (left rail) -->
        <div class="flex flex-col gap-3 shrink-0 pt-2" id="command-rail">
          ${commandOrder.map((cmdKey, i) => {
            const meta = commandMeta[cmdKey];
            const a = accents[cmdKey];
            const cmd = getCommand(cmdKey);
            const isActive = i === 0;
            return `
              <div
                class="command-rail-node group relative rounded-xl border-2 transition-all duration-200 cursor-pointer bg-surface"
                data-node-id="cmd-${cmdKey}"
                data-command="${cmdKey}"
                style="border-color: ${isActive ? a.solid : 'rgb(var(--ink-faint) / 0.15)'}; ${isActive ? `background: ${a.bg};` : ''}"
              >
                <button class="command-btn flex items-center gap-2.5 px-5 py-3 text-left w-full" data-command="${cmdKey}">
                  <span class="command-dot w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-200" style="background: ${isActive ? a.solid : 'rgb(var(--ink-faint) / 0.3)'};"></span>
                  <div class="flex flex-col">
                    <span class="command-label text-[13px] font-semibold transition-colors duration-200" style="color: ${isActive ? a.solid : 'rgb(var(--ink-muted))'};">${cmd.slash}</span>
                    <span class="text-[10px] text-ink-faint leading-tight mt-0.5">${meta.tagline}</span>
                  </div>
                  <span class="text-[10px] tabular-nums text-ink-muted ml-auto">${cmd.modes.length}</span>
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Mode nodes (branch area) -->
        <div class="flex-1 flex items-start relative" style="max-width: 420px;" id="branch-area">
          ${commandOrder.map((cmdKey, i) => renderModeSet(cmdKey, i === 0)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderModeSet(cmdKey: CommandKey, active: boolean): string {
  const cmd = getCommand(cmdKey);
  const a = accents[cmdKey];
  const gap = cmd.modes.length > 6 ? 'gap-1.5' : cmd.modes.length > 4 ? 'gap-2' : 'gap-3';

  return `
    <div
      class="mode-set flex flex-col pt-2 ${gap} w-full ${active ? '' : 'hidden'}"
      data-modes="${cmdKey}"
    >
      ${cmd.modes.map(mode => {
        const nodeId = `mode-${cmdKey}-${mode.flag}`;
        if (!dragOffsets.has(nodeId)) {
          const s = getStaggerOffset(nodeId);
          dragOffsets.set(nodeId, { dx: s.dx, dy: s.dy });
        }
        const offset = dragOffsets.get(nodeId)!;
        return `
        <div
          class="mode-node group relative rounded-xl border border-ink-faint/15 bg-surface shadow-sm hover:shadow-md transition-shadow duration-150 cursor-grab active:cursor-grabbing"
          data-node-id="${nodeId}"
          data-mode="${mode.flag}"
          data-command="${cmdKey}"
          style="transform: translate(${offset.dx}px, ${offset.dy}px);"
        >
          <div class="flex items-start gap-3 px-4 py-2.5">
            <span class="w-2.5 h-2.5 rounded-full shrink-0 mt-1" style="background: ${a.solid};"></span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-[13px] text-ink font-semibold">${cmd.slash} ${mode.flag}</span>
              </div>
              <span class="text-[11px] text-ink-muted leading-relaxed">${mode.description}</span>
            </div>
          </div>
        </div>
      `}).join('')}
    </div>
  `;
}

// ─── Command detail modal ─────────────────────────────────────

function showCommandModal(cmd: Command, activeMode: string = ''): void {
  const a = accents[cmd.commandKey];
  const meta = commandMeta[cmd.commandKey];

  // Find the active mode object
  const activeModeObj = cmd.modes.find(m => m.flag === activeMode);
  const displayTitle = activeMode ? `${cmd.slash} ${activeMode}` : cmd.slash;
  const displayDescription = activeModeObj ? activeModeObj.description : cmd.description;

  const modal = document.createElement('div');
  modal.id = 'command-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-ink/10 backdrop-blur-sm" id="modal-backdrop"></div>

    <!-- Card -->
    <div class="relative bg-surface rounded-2xl border border-ink-faint/15 shadow-xl w-full max-w-lg overflow-hidden max-h-[85vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center gap-3 px-6 py-4 border-b border-ink-faint/10">
        <span class="w-3 h-3 rounded-full" style="background: ${a.solid};"></span>
        <span class="text-lg font-bold text-ink">${displayTitle}</span>
        <span class="flex-1"></span>
        <button class="ml-3 text-ink-faint hover:text-ink transition-colors" id="modal-close">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-5">
        <p class="text-xs text-ink leading-relaxed mb-5">${displayDescription}</p>

        <div class="text-[10px] text-ink-faint uppercase tracking-widest mb-3">${activeMode ? 'All modes' : 'Modes'}</div>
        <div class="space-y-2.5">
          ${cmd.modes.map(m => {
            const isActive = m.flag === activeMode;
            return `
            <div class="flex items-start gap-3 rounded-lg px-2 py-1.5 -mx-2 ${isActive ? 'bg-surface-raised' : ''}" data-modal-mode="${m.flag}">
              <code class="text-[11px] font-semibold shrink-0 px-2 py-0.5 rounded border whitespace-nowrap ${isActive ? 'border-current text-ink' : 'bg-surface-raised border-ink-faint/10 text-ink'}" style="${isActive ? `border-color: ${a.solid}; color: ${a.solid};` : ''}">${m.flag}</code>
              <span class="text-[11px] leading-relaxed ${isActive ? 'text-ink' : 'text-ink-muted'}">${m.description}</span>
            </div>
          `}).join('')}
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(modal);

  const close = () => { modal.remove(); document.removeEventListener('keydown', onKey); };
  document.getElementById('modal-backdrop')?.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  document.getElementById('modal-close')?.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
  };
  document.addEventListener('keydown', onKey);

  // Click a mode row to switch context within the modal
  modal.querySelectorAll<HTMLElement>('[data-modal-mode]').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', (e) => {
      e.stopPropagation();
      const flag = row.dataset.modalMode!;
      if (flag === activeMode) return;
      close();
      showCommandModal(cmd, flag);
    });
  });
}

// ─── SVG Connectors ──────────────────────────────────────────

function drawConnectors(): void {
  const svg = document.getElementById('connector-svg');
  const canvas = document.getElementById('console-map');
  if (!svg || !canvas) return;

  const rect = canvas.getBoundingClientRect();
  const cmdKey = activeCommand;
  const a = accents[cmdKey];

  const commandEl = canvas.querySelector(`.command-rail-node[data-command="${cmdKey}"]`) as HTMLElement;
  if (!commandEl) return;

  const mBox = commandEl.getBoundingClientRect();
  const mRightX = mBox.right - rect.left;
  const mCenterY = mBox.top + mBox.height / 2 - rect.top;

  const modeEls = canvas.querySelectorAll<HTMLElement>(`.mode-set[data-modes="${cmdKey}"] .mode-node`);
  if (!modeEls.length) { svg.innerHTML = ''; return; }

  const modePositions: { x: number; y: number }[] = [];
  modeEls.forEach(el => {
    const b = el.getBoundingClientRect();
    if (b.width === 0) return;
    modePositions.push({
      x: b.left - rect.left,
      y: b.top + b.height / 2 - rect.top,
    });
  });

  if (!modePositions.length) { svg.innerHTML = ''; return; }

  const midX = mRightX + 32;
  let paths = '';

  modePositions.forEach(cp => {
    paths += `<path
      d="M ${mRightX + 2} ${mCenterY} L ${midX} ${mCenterY} L ${midX} ${cp.y} L ${cp.x - 6} ${cp.y}"
      fill="none"
      stroke="rgb(var(--ink-faint) / 0.35)"
      stroke-width="1"
    />`;
    paths += `<circle cx="${cp.x - 6}" cy="${cp.y}" r="3" fill="${a.solid}" opacity="0.45" />`;
  });

  svg.innerHTML = paths;
}

// ─── Drag handling ────────────────────────────────────────────

function initDraggable(el: HTMLElement): void {
  const nodeId = el.dataset.nodeId!;
  let startX = 0, startY = 0;
  let offsetX = 0, offsetY = 0;
  const existing = dragOffsets.get(nodeId);
  if (existing) {
    offsetX = existing.dx;
    offsetY = existing.dy;
    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }

  let isPointerDown = false;
  let hasDragged = false;
  let originX = 0, originY = 0;
  const DRAG_THRESHOLD = 8;

  const onDown = (e: MouseEvent | TouchEvent) => {
    isPointerDown = true;
    hasDragged = false;
    const point = 'touches' in e ? e.touches[0] : e;
    originX = point.clientX;
    originY = point.clientY;
    startX = point.clientX - offsetX;
    startY = point.clientY - offsetY;
  };

  const onMove = (e: MouseEvent | TouchEvent) => {
    if (!isPointerDown) return;
    const point = 'touches' in e ? e.touches[0] : e;
    const dx = point.clientX - originX;
    const dy = point.clientY - originY;

    if (!hasDragged && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;

    if (!hasDragged) {
      hasDragged = true;
      el.style.zIndex = '10';
      el.style.transition = 'none';
      el.style.cursor = 'grabbing';
    }

    offsetX = point.clientX - startX;
    offsetY = point.clientY - startY;
    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    dragOffsets.set(nodeId, { dx: offsetX, dy: offsetY });
    drawConnectors();
  };

  const onUp = () => {
    if (!isPointerDown) return;
    isPointerDown = false;
    el.style.zIndex = '';
    el.style.transition = '';
    el.style.cursor = '';
  };

  el.addEventListener('mousedown', onDown);
  el.addEventListener('touchstart', onDown, { passive: true });
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove, { passive: true });
  document.addEventListener('mouseup', onUp);
  document.addEventListener('touchend', onUp);

  el.addEventListener('click', (e) => {
    if (hasDragged) {
      e.stopPropagation();
      e.preventDefault();
      hasDragged = false;
    }
  }, true);
}

// ─── Init ─────────────────────────────────────────────────────

export function initMindmapInteractions(): void {
  const commandBtns = document.querySelectorAll<HTMLButtonElement>('.command-btn');
  const modeSets = document.querySelectorAll<HTMLElement>('.mode-set');

  // Init drag on mode nodes for active command
  const initModeDrag = () => {
    document.querySelectorAll<HTMLElement>(`.mode-set[data-modes="${activeCommand}"] .mode-node`).forEach(el => {
      const nodeId = el.dataset.nodeId!;
      if (!dragOffsets.has(nodeId)) {
        const s = getStaggerOffset(nodeId);
        dragOffsets.set(nodeId, { dx: s.dx, dy: s.dy });
      }
      initDraggable(el);
    });
  };
  initModeDrag();

  // Draw initial connectors
  requestAnimationFrame(() => setTimeout(drawConnectors, 100));

  // Command click → switch active
  commandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmdKey = btn.getAttribute('data-command') as CommandKey;
      if (cmdKey === activeCommand) return;
      activeCommand = cmdKey;

      // Update command rail styles
      document.querySelectorAll<HTMLElement>('.command-rail-node').forEach(node => {
        const key = node.dataset.command as CommandKey;
        const a = accents[key];
        const active = key === cmdKey;

        node.style.borderColor = active ? a.solid : 'rgb(var(--ink-faint) / 0.15)';
        node.style.background = active ? a.bg : 'rgb(var(--surface))';

        const dot = node.querySelector('.command-dot') as HTMLElement;
        const label = node.querySelector('.command-label') as HTMLElement;
        if (dot) dot.style.background = active ? a.solid : 'rgb(var(--ink-faint) / 0.3)';
        if (label) label.style.color = active ? a.solid : 'rgb(var(--ink-muted))';
      });

      // Apply saved positions to incoming mode nodes before making visible
      document.querySelectorAll<HTMLElement>(`.mode-set[data-modes="${cmdKey}"] .mode-node`).forEach(el => {
        const nodeId = el.dataset.nodeId!;
        if (!dragOffsets.has(nodeId)) {
          const s = getStaggerOffset(nodeId);
          dragOffsets.set(nodeId, { dx: s.dx, dy: s.dy });
        }
        const saved = dragOffsets.get(nodeId)!;
        el.style.transform = `translate(${saved.dx}px, ${saved.dy}px)`;
      });

      // Switch mode sets
      modeSets.forEach(s => {
        const isThis = s.getAttribute('data-modes') === cmdKey;
        s.classList.toggle('hidden', !isThis);
      });

      // Clear then redraw connectors
      const svg = document.getElementById('connector-svg');
      if (svg) svg.innerHTML = '';

      setTimeout(() => {
        initModeDrag();
        drawConnectors();
      }, 320);
    });
  });

  // Mode node click → show command detail modal with active mode
  document.addEventListener('click', (e) => {
    if (document.getElementById('command-modal')) return;
    const node = (e.target as HTMLElement).closest('.mode-node') as HTMLElement;
    if (!node) return;
    const cmdKey = node.dataset.command as CommandKey;
    const modeFlag = node.dataset.mode || '';
    const cmd = commands.find(c => c.commandKey === cmdKey);
    if (cmd) showCommandModal(cmd, modeFlag);
  });

  // Redraw on resize
  let timer: number;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = window.setTimeout(drawConnectors, 100);
  });
}
