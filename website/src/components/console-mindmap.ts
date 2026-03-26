import { commands, modules, moduleOrder, getCommandsByModule, type Command, type Module } from '../data/commands';

/**
 * FigJam-style mind map canvas.
 * - Module nodes on the left, command nodes branch right
 * - Dashed SVG connectors with arrowheads
 * - All nodes are draggable on the canvas
 * - Click a command → detail modal (not navigation)
 * - One module expanded at a time
 */

const accents: Record<Module, { solid: string; faded: string; bg: string }> = {
  scan:    { solid: 'rgb(var(--c-scan))',    faded: 'rgb(var(--c-scan) / 0.3)',    bg: 'var(--c-scan-dim)' },
  refine:  { solid: 'rgb(var(--c-refine))',  faded: 'rgb(var(--c-refine) / 0.3)',  bg: 'var(--c-refine-dim)' },
  reshape: { solid: 'rgb(var(--c-reshape))', faded: 'rgb(var(--c-reshape) / 0.3)', bg: 'var(--c-reshape-dim)' },
  elevate: { solid: 'rgb(var(--c-elevate))', faded: 'rgb(var(--c-elevate) / 0.3)', bg: 'var(--c-elevate-dim)' },
  dial:    { solid: 'rgb(var(--c-dial))',    faded: 'rgb(var(--c-dial) / 0.3)',    bg: 'var(--c-dial-dim)' },
  voice:   { solid: 'rgb(var(--c-voice))',   faded: 'rgb(var(--c-voice) / 0.3)',   bg: 'var(--c-voice-dim)' },
  learn:   { solid: 'rgb(var(--c-learn))',   faded: 'rgb(var(--c-learn) / 0.3)',   bg: 'var(--c-learn-dim)' },
};

// ─── Track drag offsets per node (persisted across tab switches) ──
const dragOffsets: Map<string, { dx: number; dy: number }> = new Map();
// Stagger offsets per command node — seeded once per page load
const staggerOffsets: Map<string, { dx: number; dy: number }> = new Map();
let activeModule: Module = 'scan';

// Pre-compute stagger offsets for all modules so layout is deterministic
function initStaggerOffsets(): void {
  moduleOrder.forEach(mod => {
    const cmds = getCommandsByModule(mod);
    cmds.forEach((cmd, i) => {
      const nodeId = `cmd-${cmd.name}`;
      if (staggerOffsets.has(nodeId)) return;
      // Cascade: each card shifts right progressively, with small vertical jitter
      const dx = i * 22 + (Math.random() - 0.5) * 14;
      const dy = (Math.random() - 0.5) * 8;
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

        <!-- Module nodes -->
        <div class="flex flex-col gap-3 shrink-0 pt-2" id="module-rail">
          ${moduleOrder.map((mod, i) => {
            const info = modules[mod];
            const a = accents[mod];
            const count = getCommandsByModule(mod).length;
            const isActive = i === 0;
            return `
              <div
                class="module-node group relative rounded-xl border-2 transition-all duration-200 cursor-grab active:cursor-grabbing bg-surface"
                data-node-id="mod-${mod}"
                data-module="${mod}"
                style="border-color: ${isActive ? a.solid : 'rgb(var(--ink-faint) / 0.15)'}; ${isActive ? `background: ${a.bg};` : ''}"
              >
                <button class="module-btn flex items-center gap-2.5 px-5 py-3 text-left w-full" data-module="${mod}">
                  <span class="module-dot w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-200" style="background: ${isActive ? a.solid : 'rgb(var(--ink-faint) / 0.3)'};"></span>
                  <span class="module-label text-[12px] uppercase tracking-[0.12em] font-semibold transition-colors duration-200" style="color: ${isActive ? a.solid : 'rgb(var(--ink-muted))'};">${info.label}</span>
                  <span class="text-[10px] tabular-nums text-ink-muted ml-auto">${count}</span>
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Command nodes -->
        <div class="flex-1 flex items-start relative" style="min-height: 480px; max-width: 420px;" id="branch-area">
          ${moduleOrder.map((mod, i) => renderCommandSet(mod, i === 0)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderCommandSet(mod: Module, active: boolean): string {
  const cmds = getCommandsByModule(mod);
  const a = accents[mod];
  // Tighter gap for modules with many commands
  const gap = cmds.length > 5 ? 'gap-1.5' : cmds.length > 3 ? 'gap-2' : 'gap-3';

  return `
    <div
      class="command-set absolute inset-0 flex flex-col pt-2 ${gap} transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
      data-commands="${mod}"
    >
      ${cmds.map(cmd => {
        const nodeId = `cmd-${cmd.name}`;
        // Use stagger offset, or preserved drag offset if user moved it
        if (!dragOffsets.has(nodeId)) {
          const s = getStaggerOffset(nodeId);
          dragOffsets.set(nodeId, { dx: s.dx, dy: s.dy });
        }
        const offset = dragOffsets.get(nodeId)!;
        return `
        <div
          class="command-node group relative rounded-xl border border-ink-faint/15 bg-surface shadow-sm hover:shadow-md transition-shadow duration-150 cursor-grab active:cursor-grabbing"
          data-node-id="${nodeId}"
          data-command="${cmd.name}"
          data-module="${mod}"
          style="transform: translate(${offset.dx}px, ${offset.dy}px);"
        >
          <div class="flex items-start gap-3 px-4 py-2.5">
            <span class="w-2.5 h-2.5 rounded-full shrink-0 mt-1" style="background: ${a.solid};"></span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-[11px] font-bold tracking-[0.1em]" style="color: ${a.solid};">${cmd.key}</span>
                <span class="text-[13px] text-ink font-semibold">${cmd.slash}</span>
              </div>
              <span class="text-[11px] text-ink-muted leading-relaxed">${cmd.shortDescription || cmd.description}</span>
            </div>
          </div>
        </div>
      `}).join('')}
    </div>
  `;
}

// ─── Command detail modal ─────────────────────────────────────

function showCommandModal(cmd: Command): void {
  const a = accents[cmd.module];
  const info = modules[cmd.module];

  // Parse example into command + description
  const exParts = cmd.example?.split(' — ') || [];
  const exCmd = exParts[0] || `${cmd.slash} ./src/components/Example.tsx`;
  const exDesc = exParts[1] || cmd.description;

  const modal = document.createElement('div');
  modal.id = 'command-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-ink/10 backdrop-blur-sm" id="modal-backdrop"></div>

    <!-- Card -->
    <div class="relative bg-surface rounded-2xl border border-ink-faint/15 shadow-xl w-full max-w-lg overflow-hidden">
      <!-- Header -->
      <div class="flex items-center gap-3 px-6 py-4 border-b border-ink-faint/10">
        <span class="w-3 h-3 rounded-full" style="background: ${a.solid};"></span>
        <span class="text-lg font-bold tracking-wider text-ink">${cmd.key}</span>
        <span class="text-sm text-ink font-semibold">${cmd.slash}</span>
        <span class="flex-1"></span>
        <span class="text-[10px] text-ink-faint uppercase tracking-[0.15em]">${info.label}</span>
        <button class="ml-3 text-ink-faint hover:text-ink transition-colors" id="modal-close">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-5">
        <div class="text-[10px] text-ink-faint uppercase tracking-widest mb-1.5">About</div>
        <p class="text-sm text-ink leading-relaxed">${cmd.description}</p>
      </div>

      <!-- Example -->
      <div class="mx-6 mb-6 rounded-lg border border-ink-faint/10 bg-canvas overflow-hidden">
        <div class="px-4 py-2 border-b border-ink-faint/10">
          <span class="text-[9px] text-ink-faint uppercase tracking-widest">Example workflow</span>
        </div>
        <div class="px-4 py-3 space-y-2">
          <code class="text-[12px] text-ink block">
            <span class="text-ink-faint">$</span> <span style="color: ${a.solid};">${exCmd}</span>
          </code>
          <p class="text-[11px] text-ink-muted leading-relaxed">${exDesc}</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close handlers
  const close = () => modal.remove();
  document.getElementById('modal-backdrop')?.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  document.getElementById('modal-close')?.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
  };
  document.addEventListener('keydown', onKey);
}

// ─── SVG Connectors (dashed + arrowheads) ─────────────────────

function drawConnectors(): void {
  const svg = document.getElementById('connector-svg');
  const canvas = document.getElementById('console-map');
  if (!svg || !canvas) return;

  const rect = canvas.getBoundingClientRect();
  const mod = activeModule;
  const a = accents[mod];

  // Find the active module node
  const moduleEl = canvas.querySelector(`.module-node[data-module="${mod}"]`) as HTMLElement;
  if (!moduleEl) return;

  const mBox = moduleEl.getBoundingClientRect();
  const mRightX = mBox.right - rect.left;
  const mCenterY = mBox.top + mBox.height / 2 - rect.top;

  // Find visible command nodes
  const cmdEls = canvas.querySelectorAll<HTMLElement>(`.command-set[data-commands="${mod}"] .command-node`);
  if (!cmdEls.length) { svg.innerHTML = ''; return; }

  // Collect command positions
  const cmdPositions: { x: number; y: number }[] = [];
  cmdEls.forEach(el => {
    const b = el.getBoundingClientRect();
    // Skip if not laid out (opacity 0 sets still have dimensions in DOM)
    if (b.width === 0) return;
    cmdPositions.push({
      x: b.left - rect.left,
      y: b.top + b.height / 2 - rect.top,
    });
  });

  if (!cmdPositions.length) { svg.innerHTML = ''; return; }

  const midX = mRightX + 32;
  let paths = '';

  // For each command: right-angle path, circle only at command end
  cmdPositions.forEach(cp => {
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
  const DRAG_THRESHOLD = 8; // px before a click becomes a drag

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

    // Only start dragging after threshold
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

  // Prevent click propagation after a real drag
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
  const moduleBtns = document.querySelectorAll<HTMLButtonElement>('.module-btn');
  const commandSets = document.querySelectorAll<HTMLElement>('.command-set');

  // Command nodes only are draggable — module tabs stay fixed
  // Command nodes — apply random offsets then init drag
  const initCommandDrag = () => {
    document.querySelectorAll<HTMLElement>(`.command-set[data-commands="${activeModule}"] .command-node`).forEach(el => {
      const nodeId = el.dataset.nodeId!;
      // Apply random offset if no user drag has been recorded
      if (!dragOffsets.has(nodeId)) {
        const s = getStaggerOffset(nodeId);
        dragOffsets.set(nodeId, { dx: s.dx, dy: s.dy });
      }
      initDraggable(el);
    });
  };
  initCommandDrag();

  // Draw initial connectors (after layout settles)
  requestAnimationFrame(() => setTimeout(drawConnectors, 100));

  // Module click → switch active
  moduleBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const mod = btn.getAttribute('data-module') as Module;
      if (mod === activeModule) return;
      activeModule = mod;

      // Preserve command positions — don't clear drag offsets

      // Update module node styles
      document.querySelectorAll<HTMLElement>('.module-node').forEach((node, ni) => {
        const m = moduleOrder[ni];
        const ma = accents[m];
        const active = m === mod;

        node.style.borderColor = active ? ma.solid : 'rgb(var(--ink-faint) / 0.15)';
        node.style.background = active ? ma.bg : 'rgb(var(--surface))';

        const dot = node.querySelector('.module-dot') as HTMLElement;
        const label = node.querySelector('.module-label') as HTMLElement;
        if (dot) dot.style.background = active ? ma.solid : 'rgb(var(--ink-faint) / 0.3)';
        if (label) label.style.color = active ? ma.solid : 'rgb(var(--ink-muted))';
      });

      // Apply saved positions to incoming command nodes BEFORE making visible
      document.querySelectorAll<HTMLElement>(`.command-set[data-commands="${mod}"] .command-node`).forEach(el => {
        const nodeId = el.dataset.nodeId!;
        if (!dragOffsets.has(nodeId)) {
          const r = getRandomOffset(nodeId);
          dragOffsets.set(nodeId, { dx: r.dx, dy: r.dy });
        }
        const saved = dragOffsets.get(nodeId)!;
        el.style.transform = `translate(${saved.dx}px, ${saved.dy}px)`;
      });

      // Switch command sets (opacity only, no scale to avoid jank)
      commandSets.forEach(s => {
        const isThis = s.getAttribute('data-commands') === mod;
        s.classList.toggle('opacity-100', isThis);
        s.classList.toggle('opacity-0', !isThis);
        s.classList.toggle('pointer-events-none', !isThis);
      });

      // Clear connectors, then redraw after fade completes
      const svg = document.getElementById('connector-svg');
      if (svg) svg.innerHTML = '';

      setTimeout(() => {
        initCommandDrag();
        drawConnectors();
      }, 320);
    });
  });

  // Command click → modal
  document.addEventListener('click', (e) => {
    // Don't open if modal is already showing
    if (document.getElementById('command-modal')) return;
    const node = (e.target as HTMLElement).closest('.command-node') as HTMLElement;
    if (!node) return;
    const name = node.dataset.command;
    const cmd = commands.find(c => c.name === name);
    if (cmd) showCommandModal(cmd);
  });

  // Redraw on resize
  let timer: number;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = window.setTimeout(drawConnectors, 100);
  });
}
