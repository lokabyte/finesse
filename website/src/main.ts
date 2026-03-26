import './style.css';
import { renderConsoleMindmap, initMindmapInteractions } from './components/console-mindmap';
import { renderConsoleGrid, initConsoleInteractions } from './components/console-grid';

const app = document.getElementById('app')!;

// ─── Theme ────────────────────────────────────────────────────
function getTheme(): 'light' | 'dark' {
  return localStorage.getItem('finesse-theme') as 'light' | 'dark' || 'light';
}

function setTheme(theme: 'light' | 'dark') {
  localStorage.setItem('finesse-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

// Apply saved theme on load
setTheme(getTheme());

function themeToggle(): string {
  const isDark = getTheme() === 'dark';
  return `
    <button class="theme-toggle text-ink-faint hover:text-ink transition-colors" aria-label="Toggle theme">
      ${isDark
        ? '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
        : '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>'
      }
    </button>
  `;
}

function initThemeToggle() {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = getTheme() === 'light' ? 'dark' : 'light';
      setTheme(next);
      render();
    });
  });
}

// ─── Simple hash router ──────────────────────────────────────
function getRoute(): string {
  const hash = window.location.hash.replace('#', '').split('?')[0];
  return hash || 'home';
}

function render() {
  const route = getRoute();
  if (route === 'cheatsheet') {
    renderCheatSheet();
  } else {
    renderHome();
  }
}

// ─── Nav (shared) ─────────────────────────────────────────────
function nav(active: string): string {
  const link = (href: string, label: string, key: string) =>
    `<a href="${href}" class="${key === active ? 'text-ink' : 'text-ink-muted'} hover:text-ink transition-colors">${label}</a>`;

  return `
    <nav class="fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-b border-ink-faint/10">
      <div class="max-w-6xl mx-auto px-6">
        <div class="min-h-[3rem] py-2 flex items-center justify-between gap-4 flex-wrap">
          <a href="#home" class="text-sm font-semibold tracking-tight text-ink shrink-0">finesse<span class="text-ink-faint">_</span></a>
          <div class="flex items-center gap-4 sm:gap-6 text-xs">
            ${link('#home', 'Console', 'home')}
            ${link('#cheatsheet', 'Cheat Sheet', 'cheatsheet')}
            ${link('#install', 'Install', 'install')}
            <a href="https://github.com/lokabyte/finesse" class="text-ink-muted hover:text-ink transition-colors" target="_blank" rel="noopener">GitHub</a>
            ${themeToggle()}
          </div>
        </div>
      </div>
    </nav>
  `;
}

// ─── Home page ────────────────────────────────────────────────
function renderHome() {
  app.innerHTML = `
    ${nav('home')}

    <!-- Hero -->
    <section class="pt-28 md:pt-32 pb-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl font-sans font-bold tracking-tight text-ink leading-[1.1] mb-4">
            Ship with<br/>finesse<span class="text-ink-faint">.</span>
          </h1>
          <p class="text-base text-ink-muted leading-relaxed mb-8 max-w-lg">
            A design vocabulary for AI assistants — 7 modules that teach your tools
            to build with your design system's language.
          </p>

          <!-- Install snippet -->
          <div class="inline-flex items-center gap-3 bg-surface-raised border border-ink-faint/15 rounded-lg px-4 py-3 group cursor-pointer max-w-full overflow-x-auto" id="install-snippet">
            <span class="text-ink-faint text-sm shrink-0">$</span>
            <code class="text-sm text-ink whitespace-nowrap">git clone git@github.com:lokabyte/finesse.git</code>
            <button class="text-ink-faint hover:text-ink transition-colors" aria-label="Copy to clipboard" id="copy-btn">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            </button>
          </div>

          <p class="mt-5 text-xs text-ink-muted">Works with Claude Code, Cursor, and more.</p>
        </div>
      </div>
    </section>

    <!-- Console — mind map on canvas -->
    <section class="pb-24 px-6" id="console">
      <div class="max-w-6xl mx-auto">
        <div class="mb-6">
          <h2 class="text-lg font-sans font-semibold text-ink">The Console</h2>
          <span class="text-xs text-ink-muted">7 modules · explore the vocabulary</span>
        </div>
        ${renderConsoleMindmap()}
      </div>
    </section>

    <!-- How it works -->
    <section class="pb-20 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-lg font-sans font-semibold text-ink mb-8">How it works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-surface-raised rounded-lg border border-ink-faint/10 p-6">
            <div class="text-2xl font-bold text-ink-faint mb-3">01</div>
            <h3 class="text-sm font-sans font-semibold text-ink mb-2">Install the skill</h3>
            <p class="text-xs text-ink-muted leading-relaxed">
              Clone the repo and add Finesse to your AI assistant's skill configuration. Works with Claude Code out of the box.
            </p>
          </div>
          <div class="bg-surface-raised rounded-lg border border-ink-faint/10 p-6">
            <div class="text-2xl font-bold text-ink-faint mb-3">02</div>
            <h3 class="text-sm font-sans font-semibold text-ink mb-2">Load your design system</h3>
            <p class="text-xs text-ink-muted leading-relaxed">
              Finesse ships with design system context. Swap the skills directory to plug in any design system.
            </p>
          </div>
          <div class="bg-surface-raised rounded-lg border border-ink-faint/10 p-6">
            <div class="text-2xl font-bold text-ink-faint mb-3">03</div>
            <h3 class="text-sm font-sans font-semibold text-ink mb-2">Run commands</h3>
            <p class="text-xs text-ink-muted leading-relaxed">
              Use /audit to scan, /polish to refine, /punch to amplify — a vocabulary that speaks your design system's language.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Install section -->
    <section class="pb-20 px-6" id="install">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-lg font-sans font-semibold text-ink mb-8">Install</h2>
        <div class="bg-surface-raised rounded-lg border border-ink-faint/10 p-6 max-w-2xl">
          <div class="space-y-4">
            <div>
              <div class="text-xs text-ink-faint mb-2 uppercase tracking-wider">1. Clone</div>
              <div class="bg-surface rounded-lg p-3 border border-ink-faint/10">
                <code class="text-sm text-ink">git clone git@github.com:lokabyte/finesse.git ~/finesse</code>
              </div>
            </div>
            <div>
              <div class="text-xs text-ink-faint mb-2 uppercase tracking-wider">2. Add to Claude Code</div>
              <div class="bg-surface rounded-lg p-3 border border-ink-faint/10">
                <code class="text-sm text-ink">/add-dir ~/finesse/skill</code>
              </div>
              <p class="text-[11px] text-ink-faint mt-2 leading-relaxed">Or pass <code class="text-ink-muted">--add-dir ~/finesse/skill</code> when launching Claude Code.</p>
            </div>
            <div>
              <div class="text-xs text-ink-faint mb-2 uppercase tracking-wider">3. Verify</div>
              <div class="bg-surface rounded-lg p-3 border border-ink-faint/10">
                <code class="text-sm text-ink">/audit your-component.tsx</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${footer()}
  `;

  initMindmapInteractions();
  initCopyButton();
  initThemeToggle();
}

// ─── Cheat Sheet page ─────────────────────────────────────────
function renderCheatSheet() {
  app.innerHTML = `
    ${nav('cheatsheet')}

    <section class="pt-24 md:pt-20 pb-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-baseline gap-3 mb-8">
          <h1 class="text-2xl font-sans font-bold text-ink">Cheat Sheet</h1>
          <span class="text-xs text-ink-muted">The full vocabulary at a glance</span>
        </div>
        ${renderConsoleGrid()}
      </div>
    </section>

    ${footer()}
  `;

  initThemeToggle();
}

// ─── Footer ───────────────────────────────────────────────────
function footer(): string {
  return `
    <footer class="border-t border-ink-faint/10 py-8 px-6">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs text-ink-muted italic">May the finesse be with you.</span>
      </div>
    </footer>
  `;
}

// ─── Copy to clipboard ───────────────────────────────────────
function initCopyButton() {
  document.getElementById('copy-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText('git clone git@github.com:lokabyte/finesse.git');
    const btn = document.getElementById('copy-btn');
    if (btn) {
      btn.innerHTML = '<svg class="w-4 h-4 text-refine" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>';
      setTimeout(() => {
        btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>';
      }, 2000);
    }
  });
}

// ─── Boot ─────────────────────────────────────────────────────
render();
window.addEventListener('hashchange', render);
