/**
 * AgentLens - Hero Section & Landing View Module
 */

window.LandingView = {
  render: function (container) {
    container.innerHTML = `
      <div class="min-h-screen w-full hero-pillars-bg text-slate-900 dark:text-white font-sans flex flex-col justify-between selection:bg-blue-400 selection:text-black">
        <!-- Transparent Top Navigation Header -->
        <header class="w-full bg-transparent border-b border-slate-200/60 dark:border-white/10 sticky top-0 z-50 px-6 py-5">
          <div class="max-w-7xl mx-auto flex items-center justify-between">
            <!-- Brand Logo -->
            <a href="#/landing" class="flex items-center gap-3 group">
              <div class="brand-logo-badge w-9 h-9 rounded-xl p-2 shadow-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="brand-logo-svg w-full h-full">
                  <path d="M 50 23.5 C 57.5 23.5, 63.5 28.5, 68 38 L 84 70 C 88.5 79, 83.5 86.5, 73.5 86.5 L 61.5 74.5 L 57.5 62.5 C 55.5 56.5, 53 53, 50 53 C 47 53, 44.5 56.5, 42.5 62.5 L 38.5 74.5 L 26.5 86.5 C 16.5 86.5, 11.5 79, 16 70 L 32 38 C 36.5 28.5, 42.5 23.5, 50 23.5 Z" />
                </svg>
              </div>
              <span class="font-display font-extrabold text-lg tracking-wider text-slate-900 dark:text-white">AGENTLENS</span>
            </a>

            <!-- Nav Links (Desktop) -->
            <nav class="hidden md:flex items-center gap-6 text-xs font-medium text-slate-700 dark:text-white/80">
              <a href="#/dashboard" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Features</a>
              <a href="#/live" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Live Telemetry</a>
              <a href="#/costs" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">FinOps Cost</a>
              <a href="#/graph" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Execution DAG</a>
              <a href="#/traces" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">OTLP Traces</a>
            </nav>

            <!-- Top Right Action Controls: Theme Toggle, Log In Button & Get Started CTA -->
            <div class="flex items-center gap-3">
              <!-- Theme Toggle Button -->
              <button onclick="window.ThemeService.toggle()" class="p-2 rounded-lg border border-slate-300/80 dark:border-white/20 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/15 backdrop-blur-sm text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-sm" title="Toggle Light/Dark Theme">
                <i data-lucide="sun-moon" class="w-4 h-4"></i>
              </button>

              <!-- Log In Button (Top Right Corner) -->
              <a href="#/signin" class="px-4 py-2 rounded-lg border border-slate-300/80 dark:border-white/20 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/15 backdrop-blur-sm text-xs font-semibold text-slate-900 dark:text-white transition-all flex items-center gap-1.5 shadow-sm">
                <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
                <span>Log In</span>
              </a>

              <!-- Get Started Button (Direct to Dashboard) -->
              <a href="#/dashboard" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-blue-300 text-white dark:text-black font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Get Started</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        </header>

        <!-- Main Hero Section Content -->
        <main class="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center space-y-10 relative">
          <!-- Background Ambient Glow -->
          <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/10 dark:bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Hero Badge Pill -->
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-white/10 border border-blue-200 dark:border-white/20 shadow-md text-xs font-mono">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span class="text-slate-800 dark:text-zinc-200">OpenTelemetry-Native AI Agent Observability Platform</span>
          </div>

          <!-- Giant Hero Title -->
          <div class="space-y-4 max-w-4xl mx-auto">
            <h1 class="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Understand every decision your AI agents make.
            </h1>
            <p class="text-base sm:text-lg text-slate-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Trace multi-agent reasoning loops, diagnose slow tool & sandbox failures, eliminate LLM token cost spikes, and stream real-time OpenTelemetry traces from one unified platform.
            </p>
          </div>

          <!-- Action Buttons Group (Get Started -> Dashboard) -->
          <div class="flex items-center justify-center pt-2">
            <!-- Primary Get Started Button -> Dashboard -->
            <a 
              href="#/dashboard" 
              class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-blue-300 text-white dark:text-black font-extrabold text-sm shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Get Started Free</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

          <!-- Social Proof & Infrastructure Trust Strip -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-left">
            <div class="p-4 rounded-xl bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-blue-200/80 dark:border-white/15 font-mono space-y-1 text-slate-900 dark:text-white shadow-lg">
              <div class="text-[10px] text-blue-600 dark:text-blue-300 font-sans uppercase font-bold">Telemetry Throughput</div>
              <div class="text-xl font-bold">2.4k+ spans/s</div>
              <div class="text-[10px] text-slate-500 dark:text-white/70">Zero drop rate</div>
            </div>
            <div class="p-4 rounded-xl bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-blue-200/80 dark:border-white/15 font-mono space-y-1 text-slate-900 dark:text-white shadow-lg">
              <div class="text-[10px] text-blue-600 dark:text-blue-300 font-sans uppercase font-bold">Collector Overhead</div>
              <div class="text-xl font-bold">&lt; 1.8ms</div>
              <div class="text-[10px] text-slate-500 dark:text-white/70">Non-blocking async</div>
            </div>
            <div class="p-4 rounded-xl bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-blue-200/80 dark:border-white/15 font-mono space-y-1 text-slate-900 dark:text-white shadow-lg">
              <div class="text-[10px] text-blue-600 dark:text-blue-300 font-sans uppercase font-bold">Standard Protocols</div>
              <div class="text-xl font-bold">OTLP / OTel</div>
              <div class="text-[10px] text-slate-500 dark:text-white/70">W3C TraceContext</div>
            </div>
            <div class="p-4 rounded-xl bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-blue-200/80 dark:border-white/15 font-mono space-y-1 text-slate-900 dark:text-white shadow-lg">
              <div class="text-[10px] text-blue-600 dark:text-blue-300 font-sans uppercase font-bold">Enterprise Security</div>
              <div class="text-xl font-bold">SOC2 Type II</div>
              <div class="text-[10px] text-slate-500 dark:text-white/70">End-to-end encrypted</div>
            </div>
          </div>

          <!-- Interactive Dashboard Preview Card -->
          <div class="pt-8">
            <div class="bg-white/90 dark:bg-black/50 backdrop-blur-2xl border border-blue-200 dark:border-white/20 rounded-2xl p-6 shadow-2xl space-y-6 text-left overflow-hidden">
              <div class="flex items-center justify-between border-b border-slate-200 dark:border-white/15 pb-4">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-red-400"></span>
                  <span class="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span class="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span class="text-xs font-mono text-blue-600 dark:text-blue-200 ml-2">agentlens-console://production/telemetry</span>
                </div>
                <a href="#/dashboard" class="text-xs font-bold text-blue-600 dark:text-white hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1">
                  Open Interactive Console →
                </a>
              </div>

              <!-- Interactive Feature Grid -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="#/traces" class="p-4 rounded-xl bg-blue-50/60 dark:bg-black/40 backdrop-blur-md border border-blue-100 dark:border-white/15 hover:border-blue-400/60 transition-all space-y-2 group">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <i data-lucide="list-filter" class="w-4 h-4 text-blue-600 dark:text-blue-400"></i> Distributed Tracing
                    </span>
                    <span class="text-[10px] font-mono text-blue-600 dark:text-blue-300 font-semibold">OTLP</span>
                  </div>
                  <p class="text-xs text-slate-600 dark:text-white/80 leading-relaxed">
                    Capture multi-step agent reasoning, tool call inputs/outputs, and token costs in an interactive Gantt waterfall.
                  </p>
                </a>

                <a href="#/graph" class="p-4 rounded-xl bg-blue-50/60 dark:bg-black/40 backdrop-blur-md border border-blue-100 dark:border-white/15 hover:border-blue-400/60 transition-all space-y-2 group">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <i data-lucide="network" class="w-4 h-4 text-blue-600 dark:text-blue-400"></i> Execution DAG Graph
                    </span>
                    <span class="text-[10px] font-mono text-blue-600 dark:text-blue-300 font-semibold">Visual</span>
                  </div>
                  <p class="text-xs text-slate-600 dark:text-white/80 leading-relaxed">
                    Map agent branches, sandbox containers, database lookups, and LLM syntheses visually to eliminate bottlenecks.
                  </p>
                </a>

                <a href="#/costs" class="p-4 rounded-xl bg-blue-50/60 dark:bg-black/40 backdrop-blur-md border border-blue-100 dark:border-white/15 hover:border-blue-400/60 transition-all space-y-2 group">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <i data-lucide="dollar-sign" class="w-4 h-4 text-blue-600 dark:text-blue-400"></i> FinOps Cost Control
                    </span>
                    <span class="text-[10px] font-mono text-blue-600 dark:text-blue-300 font-semibold">FinOps</span>
                  </div>
                  <p class="text-xs text-slate-600 dark:text-white/80 leading-relaxed">
                    Real-time cost intelligence across GPT-4o, Claude 3.5 Sonnet, and Gemini with automated anomaly spike alerts.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </main>

        <!-- Footer -->
        <footer class="w-full border-t border-slate-200/80 dark:border-white/10 py-8 px-6 bg-white/70 dark:bg-black/60 backdrop-blur-xl text-center text-xs text-slate-600 dark:text-white/70 space-y-3 z-10">
          <div class="flex items-center justify-center gap-6 font-medium">
            <a href="#/dashboard" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Dashboard</a>
            <a href="#/signin" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Sign In</a>
            <a href="#/signup" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Sign Up</a>
            <a href="#/settings" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">API Keys</a>
          </div>
          <div>© 2026 AgentLens AI Inc. All rights reserved. OpenTelemetry™ Compatible.</div>
        </footer>
      </div>
    `;

    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
    }, 50);
  }
};
