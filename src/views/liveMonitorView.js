/**
 * AgentLens - Live Agent Monitor View Module
 */

window.LiveMonitorView = {
  isPaused: false,
  streamInterval: null,

  render: function(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <!-- Live Header Bar -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <div class="flex items-center gap-3">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandBlue opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-brandBlue"></span>
              </span>
              <h1 class="text-xl font-bold text-white tracking-tight">LIVE AGENT ACTIVITY MONITOR</h1>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white border border-white/20 font-semibold">STREAMING ACTIVE</span>
            </div>
            <p class="text-xs text-zinc-400 mt-1">Real-time pipeline view of agent reasoning loops, tool calls, and LLM completions</p>
          </div>

          <div class="flex items-center gap-3">
            <!-- Pause / Resume Control -->
            <button id="live-pause-btn" class="px-3.5 py-1.5 rounded-lg bg-surfaceElevated border border-surfaceBorder hover:border-zinc-500 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all">
              <i data-lucide="pause" class="w-4 h-4 text-zinc-400"></i>
              <span id="live-pause-label">Pause Stream</span>
            </button>

            <!-- Filter By Agent -->
            <select id="live-agent-filter" class="bg-surfaceElevated text-xs font-medium text-zinc-200 border border-surfaceBorder rounded-lg px-3 py-1.5 focus:outline-none focus:border-brandBlue cursor-pointer">
              <option value="all">All Agents</option>
              <option value="ResearchAgent">ResearchAgent</option>
              <option value="SupportAgent">SupportAgent</option>
              <option value="PlannerAgent">PlannerAgent</option>
              <option value="CodeAgent">CodeAgent</option>
            </select>

            <button onclick="window.location.hash='#/traces'" class="px-3.5 py-1.5 rounded-lg bg-brandBlue text-black hover:bg-brandBlueHover text-xs font-semibold flex items-center gap-2 shadow-md transition-all">
              <i data-lucide="external-link" class="w-4 h-4 text-black"></i>
              <span>Open Trace Debugger</span>
            </button>
          </div>
        </div>

        <!-- Live Execution Pipeline Stream Cards Container -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Active Execution Pipelines Stream (Left 2 cols) -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>LIVE EXECUTION PIPELINES</span>
              <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-white animate-pulse"></span> 4 EXECUTING NOW</span>
            </div>

            <div id="live-stream-list" class="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin">
              <!-- Item 1: ResearchAgent Execution Chain -->
              <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-4 space-y-3 shadow-md">
                <div class="flex items-center justify-between border-b border-surfaceBorder pb-2">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                      <i data-lucide="bot" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <span class="font-bold text-sm text-white">ResearchAgent</span>
                      <span class="text-[10px] font-mono text-zinc-400 ml-2">Trace ID: <a href="#/traces/8fa21c90e4a7" class="text-white hover:underline font-bold">8fa21c90e4a7</a></span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-mono text-white animate-pulse">● Running (2.41s)</span>
                    <span class="text-xs font-mono px-2 py-0.5 rounded bg-surfaceElevated text-zinc-300 border border-surfaceBorder">1,840 tokens</span>
                  </div>
                </div>

                <!-- Execution Pipeline Step Chain Visualization -->
                <div class="flex items-center gap-2 overflow-x-auto py-2 text-xs font-mono scrollbar-thin">
                  <div class="px-2.5 py-1.5 rounded-lg bg-white/10 text-white border border-white/20 flex items-center gap-1.5 flex-shrink-0">
                    <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
                    <span>gpt-4o (Intent)</span>
                    <span class="text-[10px] opacity-75">540ms</span>
                  </div>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-zinc-500 flex-shrink-0"></i>

                  <div class="px-2.5 py-1.5 rounded-lg bg-surfaceElevated text-white border border-surfaceBorder flex items-center gap-1.5 flex-shrink-0">
                    <i data-lucide="search" class="w-3.5 h-3.5"></i>
                    <span>WebSearch API</span>
                    <span class="text-[10px] opacity-75">420ms</span>
                  </div>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-zinc-500 flex-shrink-0"></i>

                  <div class="px-2.5 py-1.5 rounded-lg bg-white text-black font-semibold border border-white flex items-center gap-1.5 flex-shrink-0 animate-pulse">
                    <i data-lucide="cpu" class="w-3.5 h-3.5 text-black"></i>
                    <span>gpt-4o (Synthesis)</span>
                    <span class="text-[10px] opacity-90">Executing...</span>
                  </div>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-zinc-600 flex-shrink-0"></i>

                  <div class="px-2.5 py-1.5 rounded-lg bg-surfaceElevated text-zinc-400 border border-surfaceBorder flex items-center gap-1.5 flex-shrink-0">
                    <i data-lucide="database" class="w-3.5 h-3.5"></i>
                    <span>Cache Storage</span>
                  </div>
                </div>

                <div class="text-[11px] text-zinc-400 font-mono bg-bgDark p-2 rounded border border-surfaceBorder truncate">
                  <span class="text-white font-semibold">&gt; System Prompt:</span> Extracting key paper citations for "Transformer KV cache compression 2026"...
                </div>
              </div>

              <!-- Item 2: SupportAgent -->
                  <div class="px-2.5 py-1.5 rounded-lg bg-brandPurple/20 text-brandPurple border border-brandPurple/30 flex items-center gap-1.5 flex-shrink-0">
                    <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
                    <span>claude-3-5-sonnet</span>
                    <span class="text-[10px] opacity-75">650ms</span>
                  </div>
                </div>
              </div>

              <!-- Item 3: CodeAgent (Warning / Retry) -->
              <div class="bg-surfaceDark border border-statusError/40 rounded-xl p-4 space-y-3 shadow-glow-error">
                <div class="flex items-center justify-between border-b border-surfaceBorder pb-2">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-lg bg-statusError/20 border border-statusError/40 flex items-center justify-center text-statusError">
                      <i data-lucide="code" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <span class="font-bold text-sm text-slate-100">CodeAgent</span>
                      <span class="text-[10px] font-mono text-slate-400 ml-2">Trace ID: <a href="#/traces/3bf94d12c8e1" class="text-brandBlue hover:underline">3bf94d12c8e1</a></span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-mono text-statusError">✖ Failed: Tool Timeout</span>
                    <span class="text-xs font-mono px-2 py-0.5 rounded bg-statusError/10 text-statusError border border-statusError/30">5,000ms limit</span>
                  </div>
                </div>

                <div class="flex items-center gap-2 overflow-x-auto py-2 text-xs font-mono scrollbar-thin">
                  <div class="px-2.5 py-1.5 rounded-lg bg-brandPurple/20 text-brandPurple border border-brandPurple/30 flex items-center gap-1.5 flex-shrink-0">
                    <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
                    <span>claude-3-5-sonnet</span>
                    <span class="text-[10px] opacity-75">380ms</span>
                  </div>
                  <i data-lucide="arrow-right" class="w-4 h-4 text-slate-500 flex-shrink-0"></i>

                  <div class="px-2.5 py-1.5 rounded-lg bg-statusError/20 text-statusError border border-statusError/40 flex items-center gap-1.5 flex-shrink-0">
                    <i data-lucide="alert-octagon" class="w-3.5 h-3.5"></i>
                    <span>CodeInterpreter (Docker Sandbox)</span>
                    <span class="text-[10px] opacity-75">5000ms TIMEOUT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Real-Time Metrics & Agent Worker Activity (Right 1 col) -->
          <div class="space-y-4">
            <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-4 space-y-4">
              <h3 class="font-bold text-sm text-slate-100 flex items-center justify-between">
                <span>Active Agent Workers</span>
                <span class="text-xs font-mono text-brandBlue">4 Active</span>
              </h3>

              <div class="space-y-3 text-xs">
                <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-1">
                  <div class="flex items-center justify-between font-semibold">
                    <span class="text-slate-200">ResearchAgent</span>
                    <span class="text-statusSuccess font-mono">● Running</span>
                  </div>
                  <div class="w-full bg-bgDark h-1.5 rounded-full overflow-hidden">
                    <div class="bg-brandBlue h-full rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  <div class="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Task: Arxiv paper query</span>
                    <span>2.41s</span>
                  </div>
                </div>

                <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-1">
                  <div class="flex items-center justify-between font-semibold">
                    <span class="text-slate-200">SupportAgent</span>
                    <span class="text-statusSuccess font-mono">● Running</span>
                  </div>
                  <div class="w-full bg-bgDark h-1.5 rounded-full overflow-hidden">
                    <div class="bg-statusSuccess h-full rounded-full w-1/2 animate-pulse"></div>
                  </div>
                  <div class="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Task: KB vector search</span>
                    <span>0.81s</span>
                  </div>
                </div>

                <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-1">
                  <div class="flex items-center justify-between font-semibold">
                    <span class="text-slate-200">PlannerAgent</span>
                    <span class="text-statusWarning font-mono">● Waiting for tool</span>
                  </div>
                  <div class="w-full bg-bgDark h-1.5 rounded-full overflow-hidden">
                    <div class="bg-statusWarning h-full rounded-full w-2/3"></div>
                  </div>
                  <div class="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Task: Multi-agent DAG split</span>
                    <span>2.10s</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Live Streaming Stats Card -->
            <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-4 space-y-3 font-mono text-xs">
              <h4 class="font-bold text-slate-200 text-sans">Telemetry Ingestion Rate</h4>
              <div class="flex justify-between text-slate-400 border-b border-surfaceBorder pb-2">
                <span>Spans Ingested:</span>
                <span class="text-brandBlue font-semibold">2,410 / sec</span>
              </div>
              <div class="flex justify-between text-slate-400 border-b border-surfaceBorder pb-2">
                <span>LLM Tokens Streamed:</span>
                <span class="text-brandPurple font-semibold">14,200 / sec</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>Active Traces:</span>
                <span class="text-statusSuccess font-semibold">18 concurrent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Pause/Resume Logic Setup
    setTimeout(() => {
      lucide.createIcons();
      const pauseBtn = document.getElementById('live-pause-btn');
      if (pauseBtn) {
        pauseBtn.onclick = () => {
          this.isPaused = !this.isPaused;
          const label = document.getElementById('live-pause-label');
          if (label) {
            label.innerText = this.isPaused ? 'Resume Stream' : 'Pause Stream';
          }
          if (window.AgentLensApp) {
            window.AgentLensApp.showToast(this.isPaused ? 'Live streaming paused' : 'Live streaming resumed', 'info');
          }
        };
      }
    }, 50);
  }
};
