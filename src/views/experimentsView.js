/**
 * AgentLens - Experiments View Module
 */

window.ExperimentsView = {
  render: function(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">A/B EXPERIMENTATION ENGINE</h1>
            <p class="text-xs text-slate-400 mt-1">Side-by-side performance comparison of models, prompt variants, and agent versions</p>
          </div>
        </div>

        <!-- Active Experiment Card -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-6 shadow-xl">
          <div class="flex items-center justify-between border-b border-surfaceBorder pb-3">
            <div>
              <h3 class="font-bold text-base text-slate-100">Experiment #802: gpt-4o vs claude-3-5-sonnet for SupportAgent</h3>
              <p class="text-xs text-slate-400 font-mono">Running live 50/50 traffic split | Total Samples: 2,400 runs</p>
            </div>
            <span class="px-2.5 py-0.5 rounded text-xs font-mono bg-brandBlue/10 text-brandBlue border border-brandBlue/30">Active Test</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Variant A -->
            <div class="bg-surfaceElevated p-4 rounded-xl border border-surfaceBorder space-y-3 font-mono text-xs">
              <div class="flex items-center justify-between border-b border-surfaceBorder pb-2">
                <span class="font-bold text-slate-100 text-sm font-sans">Variant A: gpt-4o</span>
                <span class="text-slate-400">50% Traffic</span>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between"><span>Success Rate:</span><span class="text-statusSuccess font-bold">99.1%</span></div>
                <div class="flex justify-between"><span>Avg Latency:</span><span class="text-slate-200">1.35s</span></div>
                <div class="flex justify-between"><span>Avg Cost / Req:</span><span class="text-emerald-400">$0.0017</span></div>
              </div>
            </div>

            <!-- Variant B (Winner) -->
            <div class="bg-surfaceElevated p-4 rounded-xl border border-statusSuccess/50 shadow-glow-blue space-y-3 font-mono text-xs relative">
              <span class="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] bg-statusSuccess/20 text-statusSuccess border border-statusSuccess/40 font-bold font-sans">★ WINNER (95% Conf)</span>
              <div class="flex items-center justify-between border-b border-surfaceBorder pb-2">
                <span class="font-bold text-slate-100 text-sm font-sans">Variant B: claude-3-5-sonnet</span>
                <span class="text-slate-400">50% Traffic</span>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between"><span>Success Rate:</span><span class="text-statusSuccess font-bold">99.4% (+0.3%)</span></div>
                <div class="flex justify-between"><span>Avg Latency:</span><span class="text-statusSuccess font-bold">1.12s (17% faster)</span></div>
                <div class="flex justify-between"><span>Avg Cost / Req:</span><span class="text-statusSuccess font-bold">$0.0013 (23% cheaper)</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
