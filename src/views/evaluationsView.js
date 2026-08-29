/**
 * AgentLens - Evaluations View Module
 */

window.EvaluationsView = {
  render: function(container) {
    const evals = window.AgentLensData.evaluations;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">AI EVALUATIONS & BENCHMARKING</h1>
            <p class="text-xs text-slate-400 mt-1">Automated evaluation runs judging correctness, relevance, hallucination rate, and faithfulness</p>
          </div>

          <button onclick="window.AgentLensApp.showToast('Triggered new evaluation run...', 'info')" class="px-3.5 py-2 rounded-lg bg-brandBlue hover:bg-brandBlueHover text-white text-xs font-semibold flex items-center gap-2 shadow-glow-blue transition-all">
            <i data-lucide="play" class="w-4 h-4"></i>
            <span>Run New Evaluation Benchmark</span>
          </button>
        </div>

        <!-- Evaluation Benchmark Cards -->
        <div class="space-y-6">
          ${evals.map(e => `
            <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-lg">
              <div class="flex items-center justify-between border-b border-surfaceBorder pb-3">
                <div>
                  <h3 class="font-bold text-base text-slate-100">${e.name}</h3>
                  <p class="text-xs text-slate-400 font-mono">Agent: ${e.agent} | Date: ${e.date} | Sample Size: ${e.samples} test prompts</p>
                </div>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono bg-statusSuccess/10 text-statusSuccess border border-statusSuccess/30">Evaluation Passed (94.2%)</span>
              </div>

              <!-- Score Cards Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
                <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-1">
                  <div class="text-slate-400 text-[10px]">CORRECTNESS</div>
                  <div class="text-lg font-bold text-statusSuccess">${e.scores.correctness}%</div>
                </div>
                <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-1">
                  <div class="text-slate-400 text-[10px]">FAITHFULNESS</div>
                  <div class="text-lg font-bold text-brandBlue">${e.scores.faithfulness}%</div>
                </div>
                <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-1">
                  <div class="text-slate-400 text-[10px]">RELEVANCE</div>
                  <div class="text-lg font-bold text-brandPurple">${e.scores.relevance}%</div>
                </div>
                <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-1">
                  <div class="text-slate-400 text-[10px]">HALLUCINATION RATE</div>
                  <div class="text-lg font-bold text-amber-400">${e.scores.hallucinationRate}%</div>
                </div>
                <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-1">
                  <div class="text-slate-400 text-[10px]">TOXICITY SCORE</div>
                  <div class="text-lg font-bold text-emerald-400">${e.scores.toxicity}%</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
