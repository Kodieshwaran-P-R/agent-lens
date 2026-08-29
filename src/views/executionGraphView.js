/**
 * AgentLens - Execution Graph Visual View Module
 */

window.ExecutionGraphView = {
  render: function(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-white tracking-tight">AGENT EXECUTION GRAPH</h1>
            <p class="text-xs text-zinc-400 mt-1">Visual DAG node breakdown showing agent control flow, tool dependencies, and latency bottlenecks</p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="window.AgentLensApp.showToast('Graph zoomed to fit', 'info')" class="px-3 py-1.5 rounded-lg bg-surfaceElevated border border-surfaceBorder hover:border-zinc-500 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all">
              <i data-lucide="maximize-2" class="w-4 h-4"></i>
              <span>Fit Screen</span>
            </button>
            <button onclick="window.location.hash='#/traces/8fa21c90e4a7'" class="px-3 py-1.5 rounded-lg bg-brandBlue text-black hover:bg-brandBlueHover text-xs font-semibold flex items-center gap-2 shadow-md transition-all">
              <i data-lucide="file-text" class="w-4 h-4 text-black"></i>
              <span>Open Trace Timeline</span>
            </button>
          </div>
        </div>

        <!-- Interactive Node Graph Container -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-8 min-h-[600px] flex flex-col justify-center items-center relative overflow-hidden shadow-2xl">
          <!-- Background Grid Overlay -->
          <div class="absolute inset-0 bg-[radial-gradient(#52525B_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

          <!-- Nodes Flow SVG & Cards -->
          <div class="relative z-10 flex flex-col items-center gap-12 w-full max-w-4xl">
            <!-- Node 1: User Request -->
            <div class="bg-surfaceElevated border border-surfaceBorder hover:border-white/50 p-4 rounded-xl shadow-md flex items-center gap-4 cursor-pointer hover:scale-105 transition-all">
              <div class="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <i data-lucide="user" class="w-5 h-5"></i>
              </div>
              <div>
                <div class="text-xs text-zinc-400 font-mono">TRIGGER NODE</div>
                <div class="font-bold text-white text-sm">User Request Prompt</div>
                <div class="text-[11px] text-zinc-400 font-mono">"Find research papers on KV cache..."</div>
              </div>
            </div>

            <!-- Down Arrow Connector -->
            <div class="flex flex-col items-center text-zinc-400">
              <div class="h-8 w-0.5 bg-zinc-600"></div>
              <i data-lucide="chevron-down" class="w-4 h-4 -mt-1"></i>
            </div>

            <!-- Node 2: ResearchAgent -->
            <div class="bg-surfaceElevated border-2 border-white/60 p-4 rounded-xl shadow-lg flex items-center gap-4 cursor-pointer hover:scale-105 transition-all">
              <div class="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                <i data-lucide="bot" class="w-5 h-5 text-black"></i>
              </div>
              <div>
                <div class="text-xs text-zinc-300 font-mono font-bold">AGENT WORKER (v2.4.1)</div>
                <div class="font-bold text-white text-sm">ResearchAgent</div>
                <div class="text-[11px] text-zinc-400 font-mono">Latency: 1.82s | Tokens: 2,431</div>
              </div>
            </div>

            <!-- Branch Split Connectors -->
            <div class="w-full flex items-center justify-center relative">
              <div class="w-2/3 h-0.5 bg-zinc-600"></div>
            </div>

            <!-- Parallel Execution Branches -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <!-- Branch A: WebSearch API Tool -->
              <div class="bg-surfaceElevated border border-surfaceBorder hover:border-white p-4 rounded-xl flex items-center gap-3 cursor-pointer transition-all">
                <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <i data-lucide="search" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="text-[10px] font-mono text-zinc-400">TOOL EXECUTION</div>
                  <div class="font-bold text-xs text-white">WebSearch API</div>
                  <div class="text-[10px] text-white font-mono">0.68s (HTTP 200)</div>
                </div>
              </div>

              <!-- Branch B: Python Code Sandbox Tool -->
              <div class="bg-surfaceElevated border border-surfaceBorder hover:border-white p-4 rounded-xl flex items-center gap-3 cursor-pointer transition-all">
                <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <i data-lucide="terminal" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="text-[10px] font-mono text-zinc-400">SANDBOX CONTAINER</div>
                  <div class="font-bold text-xs text-white">CodeInterpreter Sandbox</div>
                  <div class="text-[10px] text-white font-mono">0.45s (Exit 0)</div>
                </div>
              </div>
            </div>

            <!-- Down Arrow to Final Synthesis -->
            <div class="flex flex-col items-center text-zinc-400">
              <div class="h-8 w-0.5 bg-zinc-600"></div>
              <i data-lucide="chevron-down" class="w-4 h-4 -mt-1"></i>
            </div>

            <!-- Node 3: LLM Synthesis Completion -->
            <div class="bg-surfaceElevated border border-white/40 p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:scale-105 transition-all">
              <div class="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <i data-lucide="check-circle-2" class="w-5 h-5"></i>
              </div>
              <div>
                <div class="text-xs text-zinc-300 font-mono font-bold">SYNTHESIS & EVALUATION</div>
                <div class="font-bold text-white text-sm">gpt-4o Response Formatted</div>
                <div class="text-[11px] text-white font-mono">Status: SUCCESS | 0.94s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
    }, 50);
  }
};
