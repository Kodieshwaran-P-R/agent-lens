/**
 * AgentLens - Master Application Controller & Hash Router
 */

window.AgentLensApp = {
  currentRoute: '/dashboard',
  sidebarCollapsed: false,

  init: function() {
    window.ThemeService.init();
    this.setupRouter();
    this.setupSidebarNav();
    this.setupEventListeners();
    this.setupLensAi();
    this.setupCommandPalette();
    this.setupShortcutsModal();
    this.setupSpanInspector();
    this.setupNotificationCenter();
    this.setupUserProfile();
  },

  // 1. Setup Client-Side Hash Router with Authentication Guard
  setupRouter: function() {
    const handleRoute = () => {
      let hash = window.location.hash || '#/landing';
      if (hash === '#' || hash === '#/' || hash === '') hash = '#/landing';
      const routePath = hash.replace('#', '');
      this.currentRoute = routePath.split('?')[0];

      const isAuthenticated = window.AuthService.isAuthenticated();

      // If accessing dashboard directly without auth, auto-create guest session
      if (!isAuthenticated && this.currentRoute !== '/signin' && this.currentRoute !== '/signup' && this.currentRoute !== '/landing') {
        window.AuthService.signInDemo();
      }

      const sidebar = document.getElementById('sidebar');
      const topbar = document.getElementById('topbar');
      const mainContent = document.getElementById('main-content');

      // Toggle Shell Visibility for Pre-Auth vs Application Views
      const isAuthView = (this.currentRoute === '/signin' || this.currentRoute === '/signup' || this.currentRoute === '/landing');

      if (sidebar && topbar) {
        if (isAuthView) {
          sidebar.classList.add('hidden');
          topbar.classList.add('hidden');
          if (mainContent) {
            mainContent.classList.remove('p-6');
            mainContent.classList.add('p-0');
          }
        } else {
          sidebar.classList.remove('hidden');
          topbar.classList.remove('hidden');
          if (mainContent) {
            mainContent.classList.remove('p-0');
            mainContent.classList.add('p-6');
          }
        }
      }

      // Theme handling: Respect user's saved theme preference or default to dark
      const savedTheme = localStorage.getItem('agentlens_theme') || 'dark';
      if (this.currentRoute === '/signin' || this.currentRoute === '/signup') {
        window.ThemeService.setTheme('dark', false);
      } else {
        window.ThemeService.setTheme(savedTheme, false);
      }

      // Update Sidebar Active Highlight
      document.querySelectorAll('.nav-link').forEach(el => {
        const route = el.getAttribute('data-route');
        if (route === this.currentRoute) {
          el.className = 'nav-link flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all group nav-item-active shadow-md';
        } else {
          el.className = 'nav-link flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group nav-item-inactive hover:bg-surfaceElevated/70';
        }
      });

      if (!mainContent) return;

      // Dispatch route view rendering
      if (this.currentRoute.startsWith('/agents/')) {
        const agentId = this.currentRoute.replace('/agents/', '');
        window.AgentsView.render(mainContent, agentId);
      } else if (this.currentRoute.startsWith('/traces/')) {
        const traceId = this.currentRoute.replace('/traces/', '');
        window.TraceDetailView.render(mainContent, traceId);
      } else {
        switch (this.currentRoute) {
          case '/signin': window.SigninView.render(mainContent); break;
          case '/signup': window.SignupView.render(mainContent); break;
          case '/landing': window.LandingView.render(mainContent); break;
          case '/dashboard': window.DashboardView.render(mainContent); break;
          case '/live': window.LiveMonitorView.render(mainContent); break;
          case '/agents': window.AgentsView.render(mainContent); break;
          case '/traces': window.TracesView.render(mainContent); break;
          case '/graph': window.ExecutionGraphView.render(mainContent); break;
          case '/llm': window.LlmAnalyticsView.render(mainContent); break;
          case '/prompts': window.PromptsView.render(mainContent); break;
          case '/tokens': window.TokenAnalyticsView.render(mainContent); break;
          case '/costs': window.CostAnalyticsView.render(mainContent); break;
          case '/tools': window.ToolsView.render(mainContent); break;
          case '/workflows': window.WorkflowsView.render(mainContent); break;
          case '/sessions': window.SessionsView.render(mainContent); break;
          case '/errors': window.ErrorsView.render(mainContent); break;
          case '/anomalies': window.AnomaliesView.render(mainContent); break;
          case '/alerts': window.AlertsView.render(mainContent); break;
          case '/evaluations': window.EvaluationsView.render(mainContent); break;
          case '/experiments': window.ExperimentsView.render(mainContent); break;
          case '/feedback': window.FeedbackView.render(mainContent); break;
          case '/logs': window.LogsView.render(mainContent); break;
          case '/opentelemetry': window.OpenTelemetryView.render(mainContent); break;
          case '/integrations': window.IntegrationsView.render(mainContent); break;
          case '/services': window.ServicesView.render(mainContent); break;
          case '/api': window.ApiView.render(mainContent); break;
          case '/settings': window.SettingsView.render(mainContent); break;
          default: window.DashboardView.render(mainContent); break;
        }
      }

      mainContent.scrollTop = 0;
    };

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  },

  // 2. Render Sidebar Navigation Categories
  setupSidebarNav: function() {
    const navContainer = document.getElementById('sidebar-nav');
    if (!navContainer) return;

    const sections = [
      {
        title: 'OVERVIEW',
        items: [
          { label: 'Dashboard', icon: 'layout-dashboard', route: '/dashboard' },
          { label: 'Live Monitor', icon: 'radio', route: '/live', badge: 'LIVE' }
        ]
      },
      {
        title: 'OBSERVABILITY',
        items: [
          { label: 'Agents', icon: 'bot', route: '/agents' },
          { label: 'Traces', icon: 'list-filter', route: '/traces' },
          { label: 'Execution Graph', icon: 'network', route: '/graph' },
          { label: 'Sessions', icon: 'users', route: '/sessions' },
          { label: 'Tool Calls', icon: 'wrench', route: '/tools' },
          { label: 'Workflows', icon: 'git-merge', route: '/workflows' }
        ]
      },
      {
        title: 'INTELLIGENCE',
        items: [
          { label: 'LLM Analytics', icon: 'cpu', route: '/llm' },
          { label: 'Token Analytics', icon: 'coins', route: '/tokens' },
          { label: 'Cost Analytics', icon: 'dollar-sign', route: '/costs' },
          { label: 'Evaluations', icon: 'check-check', route: '/evaluations' },
          { label: 'Experiments', icon: 'flask-conical', route: '/experiments' },
          { label: 'Prompt Versions', icon: 'file-text', route: '/prompts' }
        ]
      },
      {
        title: 'RELIABILITY',
        items: [
          { label: 'Error Diagnostics', icon: 'alert-triangle', route: '/errors', badge: '3' },
          { label: 'Anomalies', icon: 'zap', route: '/anomalies', badge: '2' },
          { label: 'Alerts & Incidents', icon: 'bell-ring', route: '/alerts' },
          { label: 'User Feedback', icon: 'thumbs-up', route: '/feedback' }
        ]
      },
      {
        title: 'INFRASTRUCTURE',
        items: [
          { label: 'Services Health', icon: 'server', route: '/services' },
          { label: 'Integrations', icon: 'layers', route: '/integrations' },
          { label: 'OpenTelemetry', icon: 'activity', route: '/opentelemetry' },
          { label: 'API Usage', icon: 'code-2', route: '/api' },
          { label: 'Logs Explorer', icon: 'terminal', route: '/logs' }
        ]
      },
      {
        title: 'SYSTEM',
        items: [
          { label: 'Settings & Keys', icon: 'settings', route: '/settings' }
        ]
      }
    ];

    navContainer.innerHTML = sections.map(section => `
      <div class="space-y-1">
        <div class="px-3 text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase sidebar-group-title pb-1">
          ${section.title}
        </div>
        ${section.items.map(item => `
          <a 
            href="#${item.route}" 
            class="nav-link flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${this.currentRoute === item.route ? 'nav-item-active shadow-md font-semibold' : 'nav-item-inactive hover:bg-surfaceElevated/70'}"
            data-route="${item.route}"
          >
            <div class="flex items-center gap-2.5">
              <i data-lucide="${item.icon}" class="w-4 h-4 transition-colors"></i>
              <span class="sidebar-text truncate">${item.label}</span>
            </div>
            ${item.badge ? `
              <span class="sidebar-text text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${item.badge === 'LIVE' ? 'bg-brandBlue/10 text-brandBlue border border-brandBlue/20 animate-pulse' : 'bg-surfaceElevated text-zinc-300 border border-surfaceBorder'}">
                ${item.badge}
              </span>
            ` : ''}
          </a>
        `).join('')}
      </div>
    `).join('');

    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
    }, 20);
  },

  // 3. Setup Shell Event Listeners
  setupEventListeners: function() {
    const toggleBtn = document.getElementById('toggle-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.onclick = () => {
        this.sidebarCollapsed = !this.sidebarCollapsed;
        sidebar.classList.toggle('collapsed', this.sidebarCollapsed);
      };
    }

    const closeDiffBtn = document.getElementById('close-prompt-diff-btn');
    const diffModal = document.getElementById('prompt-diff-modal');
    if (closeDiffBtn && diffModal) {
      closeDiffBtn.onclick = () => diffModal.classList.add('hidden');
    }
  },

  openPromptDiffModal: function() {
    const diffModal = document.getElementById('prompt-diff-modal');
    if (diffModal) {
      diffModal.classList.remove('hidden');
      lucide.createIcons();
    }
  },

  // 4. Lens AI Assistant Engine (Powered by Google Gemini Streaming & Multi-Turn Memory)
  setupLensAi: function() {
    const openBtn = document.getElementById('open-lens-ai-btn');
    const closeBtn = document.getElementById('close-lens-ai-btn');
    const clearBtn = document.getElementById('clear-lens-ai-btn');
    const drawer = document.getElementById('lens-ai-drawer');
    const form = document.getElementById('lens-ai-form');
    const input = document.getElementById('lens-ai-input');
    const messages = document.getElementById('lens-ai-messages');
    const badge = document.getElementById('gemini-status-badge');

    const updateBadge = () => {
      if (!badge) return;
      const isConfigured = window.GeminiService && window.GeminiService.isConfigured();
      if (isConfigured) {
        badge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1';
        badge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Gemini 1.5 Active';
      } else {
        badge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1 cursor-pointer';
        badge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Gemini Key Needed';
        badge.onclick = () => {
          window.location.hash = '#/settings';
          if (drawer) drawer.classList.add('translate-x-full');
        };
      }
    };

    if (openBtn && drawer) {
      openBtn.onclick = () => {
        drawer.classList.remove('translate-x-full');
        updateBadge();
        if (input) setTimeout(() => input.focus(), 100);
      };
    }
    if (closeBtn && drawer) {
      closeBtn.onclick = () => drawer.classList.add('translate-x-full');
    }

    // Global Keyboard Shortcut (Ctrl+J or Cmd+J) to toggle Lens AI drawer
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        if (drawer) {
          const isClosed = drawer.classList.contains('translate-x-full');
          if (isClosed) {
            drawer.classList.remove('translate-x-full');
            updateBadge();
            if (input) setTimeout(() => input.focus(), 100);
          } else {
            drawer.classList.add('translate-x-full');
          }
        }
      }
    });

    // Helper to format markdown text safely
    const formatAiResponse = (raw) => {
      if (!raw) return '';
      let formatted = raw
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/### (.*?)\n/g, '<h4 class="font-bold text-white text-xs mt-2 mb-1 font-sans">$1</h4>')
        .replace(/## (.*?)\n/g, '<h3 class="font-bold text-white text-sm mt-2 mb-1 font-sans">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="text-zinc-300">$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-black/60 text-sky-300 px-1.5 py-0.5 rounded font-mono text-[11px] border border-surfaceBorder">$1</code>')
        .replace(/#([0-9a-fA-F]{8,16})/g, '<a href="#/traces/$1" class="text-brandBlue hover:underline font-mono font-bold">#$1</a>')
        .replace(/\n\n/g, '</p><p class="mt-2 text-zinc-300 leading-relaxed font-normal">')
        .replace(/\n- /g, '<li class="ml-4 list-disc text-zinc-300 my-0.5">')
        .replace(/\n\d+\. /g, '<li class="ml-4 list-decimal text-zinc-300 my-0.5">');

      return `<p class="text-zinc-300 leading-relaxed font-normal">${formatted}</p>`;
    };

    // Wire up prompt chips
    const wireChips = () => {
      document.querySelectorAll('.ai-prompt-chip').forEach(chip => {
        chip.onclick = () => {
          const text = chip.innerText.replace(/^[^"]*"|"[^"]*$/g, '').trim();
          handleQuery(text);
        };
      });
    };

    // "New Chat" button to reset memory
    if (clearBtn) {
      clearBtn.onclick = () => {
        if (window.GeminiService) window.GeminiService.clearHistory();
        if (messages) {
          messages.innerHTML = `
            <div class="flex gap-3">
              <div class="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                <i data-lucide="bot" class="w-4 h-4 text-blue-400"></i>
              </div>
              <div class="bg-surfaceElevated p-3.5 rounded-xl border border-surfaceBorder max-w-md space-y-2">
                <p class="text-zinc-200 leading-relaxed font-normal">
                  Conversation reset. I'm ready to analyze your agent telemetry, execution graphs, and LLM costs.
                </p>
                <p class="text-zinc-400">Try these quick options:</p>
                <div class="flex flex-col gap-1.5 pt-1">
                  <button class="ai-prompt-chip text-left p-2 rounded-lg bg-surfaceDark border border-surfaceBorder hover:border-brandBlue text-zinc-300 hover:text-white transition-all cursor-pointer">
                    🔍 "Why did ResearchAgent latency spike in the last hour?"
                  </button>
                  <button class="ai-prompt-chip text-left p-2 rounded-lg bg-surfaceDark border border-surfaceBorder hover:border-brandBlue text-zinc-300 hover:text-white transition-all cursor-pointer">
                    ⚡ "Show me the top 3 slowest tool calls"
                  </button>
                  <button class="ai-prompt-chip text-left p-2 rounded-lg bg-surfaceDark border border-surfaceBorder hover:border-brandBlue text-zinc-300 hover:text-white transition-all cursor-pointer">
                    💡 "How can I reduce ResearchAgent execution cost?"
                  </button>
                </div>
              </div>
            </div>
          `;
          if (window.lucide) lucide.createIcons();
          wireChips();
        }
        if (window.AgentLensApp && window.AgentLensApp.showToast) {
          window.AgentLensApp.showToast('New Chat started. Memory cleared.', 'info');
        }
      };
    }

    // Process user question with live SSE streaming
    const handleQuery = async (queryText) => {
      const text = (queryText || '').trim();
      if (!text || !messages) return;

      // Add user message
      messages.innerHTML += `
        <div class="flex gap-3 justify-end">
          <div class="bg-brandBlue text-white font-normal p-3 rounded-xl max-w-md font-sans text-xs shadow-md">
            ${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </div>
        </div>
      `;
      messages.scrollTop = messages.scrollHeight;

      // Check if Gemini API key is missing
      if (!window.GeminiService || !window.GeminiService.isConfigured()) {
        messages.innerHTML += `
          <div class="flex gap-3">
            <div class="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              <i data-lucide="key" class="w-4 h-4 text-amber-400"></i>
            </div>
            <div class="bg-surfaceElevated p-4 rounded-xl border border-surfaceBorder max-w-md space-y-3 text-xs">
              <div class="font-bold text-white flex items-center justify-between">
                <span>Connect Google Gemini API</span>
                <span class="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Setup Required</span>
              </div>
              <p class="text-zinc-300 font-normal leading-relaxed">
                To enable live AI telemetry reasoning, enter your Google Gemini API Key from Google AI Studio:
              </p>
              <div class="space-y-2">
                <div class="flex gap-2">
                  <input id="inline-gemini-key" type="password" placeholder="Paste AIzaSy... key here" class="flex-1 bg-surfaceDark border border-surfaceBorder rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-brandBlue" />
                  <button id="inline-save-gemini-btn" class="px-3 py-2 rounded-lg bg-brandBlue hover:bg-brandBlueHover text-white text-xs font-semibold whitespace-nowrap cursor-pointer">
                    Save Key
                  </button>
                </div>
                <div class="flex items-center justify-between text-[11px]">
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-blue-400 hover:underline flex items-center gap-1 font-mono">
                    Get Free API Key →
                  </a>
                  <a href="#/settings" class="text-zinc-400 hover:text-white underline">
                    Open Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
        messages.scrollTop = messages.scrollHeight;
        if (window.lucide) lucide.createIcons();

        const saveBtn = document.getElementById('inline-save-gemini-btn');
        const keyInput = document.getElementById('inline-gemini-key');
        if (saveBtn && keyInput) {
          saveBtn.onclick = async () => {
            const entered = keyInput.value.trim();
            if (!entered) return;
            window.GeminiService.setApiKey(entered);
            updateBadge();
            if (window.AgentLensApp && window.AgentLensApp.showToast) {
              window.AgentLensApp.showToast('Gemini API Key Saved!', 'success');
            }
            handleQuery(text);
          };
        }
        return;
      }

      // Create streaming response bubble
      const streamId = 'stream-' + Date.now();
      const contentId = 'content-' + streamId;
      messages.innerHTML += `
        <div id="${streamId}" class="flex gap-3">
          <div class="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            <i data-lucide="sparkles" class="w-4 h-4 text-blue-400"></i>
          </div>
          <div class="bg-surfaceElevated p-3.5 rounded-xl border border-surfaceBorder max-w-md space-y-2 text-xs">
            <div class="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-b border-surfaceBorder pb-1 mb-1">
              <span class="flex items-center gap-1 text-emerald-400">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Gemini 1.5 Flash (Streaming)
              </span>
              <span>Telemetry Ingested</span>
            </div>
            <div id="${contentId}" class="space-y-2 text-zinc-200 min-h-[20px]">
              <span class="inline-flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                <span class="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                Analyzing telemetry...
              </span>
            </div>
          </div>
        </div>
      `;
      messages.scrollTop = messages.scrollHeight;
      if (window.lucide) lucide.createIcons();

      const contentElem = document.getElementById(contentId);

      // Start streaming from Gemini
      await window.GeminiService.askGeminiStream(
        text,
        (chunk, accumulated) => {
          if (contentElem) {
            contentElem.innerHTML = formatAiResponse(accumulated) + '<span class="inline-block w-1.5 h-3.5 bg-blue-400 animate-pulse ml-0.5 align-middle"></span>';
            messages.scrollTop = messages.scrollHeight;
          }
        },
        (finalText) => {
          if (contentElem) {
            contentElem.innerHTML = formatAiResponse(finalText);
            messages.scrollTop = messages.scrollHeight;
            if (window.lucide) lucide.createIcons();
          }
        },
        (err) => {
          const streamCard = document.getElementById(streamId);
          if (streamCard) streamCard.remove();

          messages.innerHTML += `
            <div class="flex gap-3">
              <div class="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center flex-shrink-0">
                <i data-lucide="alert-circle" class="w-4 h-4 text-rose-400"></i>
              </div>
              <div class="bg-surfaceElevated p-3.5 rounded-xl border border-rose-500/30 max-w-md space-y-1.5 text-xs">
                <div class="font-bold text-rose-400">Gemini Error</div>
                <p class="text-zinc-300 font-normal">${err}</p>
                <div class="pt-1 text-[11px]">
                  <a href="#/settings" class="text-blue-400 hover:underline">Update Gemini API Key in Settings →</a>
                </div>
              </div>
            </div>
          `;
          messages.scrollTop = messages.scrollHeight;
          if (window.lucide) lucide.createIcons();
        }
      );
    };

    // Wire up chat form
    if (form && input) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const query = input.value;
        input.value = '';
        handleQuery(query);
      };
    }

    wireChips();
    updateBadge();
  },

  // 5. Command Palette (Ctrl+K)
  setupCommandPalette: function() {
    const openBtn = document.getElementById('open-cmd-palette');
    const modal = document.getElementById('cmd-palette-modal');
    const input = document.getElementById('cmd-input');

    if (openBtn && modal) {
      openBtn.onclick = () => {
        modal.classList.remove('hidden');
        if (input) input.focus();
        this.renderCmdResults('');
      };
    }

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (modal) {
          modal.classList.toggle('hidden');
          if (!modal.classList.contains('hidden') && input) {
            input.focus();
            this.renderCmdResults('');
          }
        }
      }
      if (e.key === 'Escape') {
        if (modal && !modal.classList.contains('hidden')) modal.classList.add('hidden');
        const shortcutsModal = document.getElementById('shortcuts-modal');
        if (shortcutsModal && !shortcutsModal.classList.contains('hidden')) shortcutsModal.classList.add('hidden');
        const notifDrawer = document.getElementById('notification-drawer');
        if (notifDrawer) notifDrawer.classList.add('translate-x-full');
        const lensDrawer = document.getElementById('lens-ai-drawer');
        if (lensDrawer) lensDrawer.classList.add('translate-x-full');
        const spanDrawer = document.getElementById('span-inspector-drawer');
        if (spanDrawer) spanDrawer.classList.add('translate-x-full');
        const menu = document.getElementById('user-profile-menu');
        if (menu) menu.classList.add('hidden');
      }
    });

    if (input) {
      input.oninput = (e) => this.renderCmdResults(e.target.value);
    }
  },

  // 5b. Keyboard Shortcuts Helper Modal (?)
  setupShortcutsModal: function() {
    const openBtn = document.getElementById('open-shortcuts-btn');
    const closeBtn = document.getElementById('close-shortcuts-btn');
    const modal = document.getElementById('shortcuts-modal');

    const toggle = () => {
      if (modal) {
        modal.classList.toggle('hidden');
        if (window.lucide) lucide.createIcons();
      }
    };

    if (openBtn) openBtn.onclick = toggle;
    if (closeBtn) closeBtn.onclick = () => { if (modal) modal.classList.add('hidden'); };

    window.addEventListener('keydown', (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (['input', 'textarea', 'select'].includes(activeTag)) return;
      if (e.key === '?') {
        e.preventDefault();
        toggle();
      }
    });
  },

  renderCmdResults: function(query) {
    const results = document.getElementById('cmd-results');
    if (!results) return;

    const items = [
      { type: 'TRACE', label: 'Trace #8fa21c90e4a7 — ResearchAgent (1.82s, $0.041)', route: '/traces/8fa21c90e4a7' },
      { type: 'TRACE', label: 'Trace #3bf94d12c8e1 — CodeAgent (ERROR Timeout)', route: '/traces/3bf94d12c8e1' },
      { type: 'AGENT', label: 'ResearchAgent (v2.4.1 Production)', route: '/agents/agent-01' },
      { type: 'AGENT', label: 'SupportAgent (v3.1.0 Production)', route: '/agents/agent-02' },
      { type: 'PAGE', label: 'Live Agent Monitor Stream', route: '/live' },
      { type: 'PAGE', label: 'FinOps AI Cost Analytics', route: '/costs' },
      { type: 'PAGE', label: 'Error Diagnostics', route: '/errors' }
    ].filter(i => i.label.toLowerCase().includes(query.toLowerCase()));

    results.innerHTML = items.map(item => `
      <div 
        class="p-2.5 rounded-xl hover:bg-surfaceElevated cursor-pointer flex items-center justify-between text-xs transition-colors"
        onclick="window.location.hash='#${item.route}'; document.getElementById('cmd-palette-modal').classList.add('hidden');"
      >
        <div class="flex items-center gap-2.5 font-mono">
          <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${item.type === 'TRACE' ? 'bg-brandCyan/10 text-brandCyan border border-brandCyan/30' : item.type === 'AGENT' ? 'bg-brandViolet/10 text-brandViolet border border-brandViolet/30' : 'bg-surfaceElevated text-textMuted border border-surfaceBorder'}">${item.type}</span>
          <span class="text-slate-200 font-sans font-medium">${item.label}</span>
        </div>
        <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-textMuted"></i>
      </div>
    `).join('');

    lucide.createIcons();
  },

  // 6. Span Inspector Side Drawer
  setupSpanInspector: function() {
    const closeBtn = document.getElementById('close-span-inspector-btn');
    const drawer = document.getElementById('span-inspector-drawer');
    if (closeBtn && drawer) {
      closeBtn.onclick = () => drawer.classList.add('translate-x-full');
    }
  },

  openSpanInspector: function(spanId) {
    const drawer = document.getElementById('span-inspector-drawer');
    const content = document.getElementById('span-inspector-content');
    if (!drawer || !content) return;

    content.innerHTML = `
      <div class="space-y-4 font-mono text-xs">
        <div class="p-3 bg-surfaceElevated rounded-xl border border-surfaceBorder space-y-1">
          <div class="text-textMuted text-[10px] font-sans">SPAN METRICS</div>
          <div class="flex justify-between"><span>Span ID:</span><span class="text-brandCyan font-bold">${spanId}</span></div>
          <div class="flex justify-between"><span>Duration:</span><span class="text-slate-200">540ms</span></div>
          <div class="flex justify-between"><span>Tokens:</span><span class="text-brandViolet font-semibold">1,233 input / 180 output</span></div>
          <div class="flex justify-between"><span>Cost:</span><span class="text-statusSuccess font-semibold">$0.018</span></div>
        </div>

        <div class="space-y-1">
          <div class="text-textMuted font-sans text-xs font-semibold">Prompt Payload (Input):</div>
          <pre class="bg-bgSpace p-3 rounded-xl border border-surfaceBorder text-slate-300 whitespace-pre-wrap leading-relaxed">You are an expert autonomous AI research assistant. Query: "Latest papers on Transformer KV-cache compression". Extract key search terms.</pre>
        </div>

        <div class="space-y-1">
          <div class="text-textMuted font-sans text-xs font-semibold">Model Response (Output):</div>
          <pre class="bg-bgSpace p-3 rounded-xl border border-surfaceBorder text-emerald-300 whitespace-pre-wrap leading-relaxed">{"search_query": "Transformer KV cache compression 2025 2026", "filters": ["arxiv"]}</pre>
        </div>
      </div>
    `;

    drawer.classList.remove('translate-x-full');
  },

  // 7. Notification Center Drawer
  setupNotificationCenter: function() {
    const notifBtn = document.getElementById('notifications-btn');
    const closeBtn = document.getElementById('close-notification-btn');
    const drawer = document.getElementById('notification-drawer');

    if (notifBtn && drawer) {
      notifBtn.onclick = () => drawer.classList.remove('translate-x-full');
    }
    if (closeBtn && drawer) {
      closeBtn.onclick = () => drawer.classList.add('translate-x-full');
    }
  },

  // 8. User Profile Dropdown Menu
  setupUserProfile: function() {
    const avatarBtn = document.getElementById('user-avatar-btn');
    const menu = document.getElementById('user-profile-menu');

    if (avatarBtn && menu) {
      avatarBtn.onclick = (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
        this.updateProfileMenuText();
      };

      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !avatarBtn.contains(e.target)) {
          menu.classList.add('hidden');
        }
      });
    }
  },

  updateProfileMenuText: function() {
    const user = window.AuthService.getCurrentUser();
    const nameEl = document.getElementById('user-profile-name');
    const emailEl = document.getElementById('user-profile-email');
    const wsEl = document.getElementById('user-profile-ws');
    const circleEl = document.getElementById('user-avatar-circle');

    if (nameEl) nameEl.innerText = user.name;
    if (emailEl) emailEl.innerText = user.email;
    if (wsEl) wsEl.innerText = user.workspace;
    if (circleEl) circleEl.innerText = user.avatar;
  },

  // 9. Toast Notification System
  showToast: function(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `p-3.5 rounded-xl border text-xs font-semibold shadow-2xl flex items-center gap-2.5 pointer-events-auto animate-in slide-in-from-bottom-5 duration-200 ${
      type === 'success' ? 'bg-surfaceDark text-white border-brandBlue/30 shadow-md' : 'bg-surfaceDark text-zinc-200 border-surfaceBorder shadow-md'
    }`;
    toast.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle-2' : 'info'}" class="w-4 h-4 text-brandBlue"></i><span>${message}</span>`;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => toast.remove(), 3000);
  }
};

// Global Theme Service for Dark / Light Mode Switching
window.ThemeService = {
  init: function() {
    const saved = localStorage.getItem('agentlens_theme') || 'dark';
    this.setTheme(saved, false);
  },

  toggle: function() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    this.setTheme(newTheme, true);
  },

  setTheme: function(theme, showToastNotification = false) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('agentlens_theme', theme);
    this.updateUI(theme);

    if (showToastNotification && window.AgentLensApp && window.AgentLensApp.showToast) {
      window.AgentLensApp.showToast(`Switched to ${theme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    }

    // Refresh charts if on chart views
    setTimeout(() => {
      if (window.AgentLensApp && window.AgentLensApp.currentRoute) {
        if (window.AgentLensApp.currentRoute === '/dashboard' && window.DashboardView && window.DashboardView.initCharts) {
          window.DashboardView.initCharts();
        } else if (window.AgentLensApp.currentRoute === '/tokens' && window.TokenAnalyticsView && window.TokenAnalyticsView.initCharts) {
          window.TokenAnalyticsView.initCharts();
        } else if (window.AgentLensApp.currentRoute === '/costs' && window.CostAnalyticsView && window.CostAnalyticsView.initCharts) {
          window.CostAnalyticsView.initCharts();
        }
      }
    }, 60);
  },

  updateUI: function(theme) {
    const btn = document.getElementById('theme-toggle-btn');
    const label = document.getElementById('theme-mode-label');
    const isDark = theme === 'dark';

    if (btn) {
      btn.innerHTML = `<i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-4 h-4 text-zinc-400 hover:text-brandBlue transition-colors"></i>`;
      btn.title = `Switch to ${isDark ? 'Light' : 'Dark'} Mode`;
    }

    if (label) {
      label.innerText = isDark ? 'DARK' : 'LIGHT';
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }
};

// Initialize App when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.AgentLensApp.init();
});
