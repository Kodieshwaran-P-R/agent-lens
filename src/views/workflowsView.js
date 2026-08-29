/**
 * AgentLens - Workflow Monitoring View Module
 */

window.WorkflowsView = {
  render: function(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">MULTI-AGENT WORKFLOW MONITORING</h1>
            <p class="text-xs text-slate-400 mt-1">Orchestration telemetry for complex multi-agent DAG pipelines & parallel sub-tasks</p>
          </div>
        </div>

        <!-- Workflow Visual Card -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-6 space-y-6 shadow-xl">
          <div class="flex items-center justify-between border-b border-surfaceBorder pb-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-brandPurple/20 border border-brandPurple/40 flex items-center justify-center text-brandPurple">
                <i data-lucide="git-merge" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="font-bold text-base text-slate-100">Enterprise Research & Briefing Workflow</h3>
                <p class="text-xs text-slate-400 font-mono">5 sequential/parallel agent nodes | Avg Duration: 4.85s</p>
              </div>
            </div>
            <span class="px-2.5 py-0.5 rounded text-xs font-mono bg-statusSuccess/10 text-statusSuccess border border-statusSuccess/30">Active Production Pipeline</span>
          </div>

          <!-- Workflow Visual Pipeline Step Cards -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs font-mono">
            <div class="bg-surfaceElevated p-4 rounded-xl border border-surfaceBorder space-y-2">
              <div class="text-[10px] text-brandBlue font-bold">NODE 1: PLANNER</div>
              <div class="font-bold text-slate-100">PlannerAgent</div>
              <div class="text-slate-400">Decomposes prompt into research tasks</div>
              <div class="text-statusSuccess font-semibold">2.10s (Pass)</div>
            </div>

            <div class="bg-surfaceElevated p-4 rounded-xl border border-brandPurple/50 space-y-2 shadow-glow-purple">
              <div class="text-[10px] text-brandPurple font-bold">NODE 2: PARALLEL</div>
              <div class="font-bold text-slate-100">ResearchAgent</div>
              <div class="text-slate-400">Queries Google Scholar & Arxiv APIs</div>
              <div class="text-statusSuccess font-semibold">1.82s (Pass)</div>
            </div>

            <div class="bg-surfaceElevated p-4 rounded-xl border border-surfaceBorder space-y-2">
              <div class="text-[10px] text-cyan-400 font-bold">NODE 3: ANALYST</div>
              <div class="font-bold text-slate-100">DataAnalystAgent</div>
              <div class="text-slate-400">Aggregates KV-cache metrics into SQL</div>
              <div class="text-statusSuccess font-semibold">1.25s (Pass)</div>
            </div>

            <div class="bg-surfaceElevated p-4 rounded-xl border border-surfaceBorder space-y-2">
              <div class="text-[10px] text-amber-400 font-bold">NODE 4: WRITER</div>
              <div class="font-bold text-slate-100">DocGenAgent</div>
              <div class="text-slate-400">Synthesizes markdown executive report</div>
              <div class="text-statusSuccess font-semibold">0.95s (Pass)</div>
            </div>

            <div class="bg-surfaceElevated p-4 rounded-xl border border-surfaceBorder space-y-2">
              <div class="text-[10px] text-emerald-400 font-bold">NODE 5: AUDIT</div>
              <div class="font-bold text-slate-100">SecurityAuditAgent</div>
              <div class="text-slate-400">Verifies data privacy compliance</div>
              <div class="text-statusSuccess font-semibold">0.45s (Pass)</div>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
