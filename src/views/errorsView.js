/**
 * AgentLens - Error Diagnostics View Module
 */

window.ErrorsView = {
  render: function(container) {
    const errors = window.AgentLensData.errorsGrouped;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">ERROR DIAGNOSTICS & ROOT CAUSE ANALYSIS</h1>
            <p class="text-xs text-slate-400 mt-1">Grouped exception occurrences, full stack traces, and automated resolution recommendations</p>
          </div>
        </div>

        <!-- Grouped Error Cards List -->
        <div class="space-y-4">
          ${errors.map(err => `
            <div class="bg-surfaceDark border border-statusError/40 rounded-xl p-5 space-y-4 shadow-lg">
              <div class="flex items-center justify-between border-b border-surfaceBorder pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-statusError/20 border border-statusError/40 flex items-center justify-center text-statusError">
                    <i data-lucide="alert-octagon" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="font-bold text-base text-slate-100 font-mono">${err.type}</h3>
                      <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-statusError/10 text-statusError border border-statusError/30">${err.occurrences} OCCURRENCES</span>
                    </div>
                    <p class="text-xs text-slate-300 font-mono mt-0.5">${err.message}</p>
                  </div>
                </div>

                <div class="text-right text-xs font-mono text-slate-400">
                  <div>Agent: <strong class="text-slate-200 font-sans">${err.agent}</strong></div>
                  <div>Tool: <strong class="text-slate-200 font-sans">${err.tool}</strong></div>
                </div>
              </div>

              <!-- AI Root Cause & Recommendation Callout -->
              <div class="bg-bgDark/80 p-3.5 rounded-lg border border-surfaceBorder space-y-1">
                <div class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <i data-lucide="sparkles" class="w-4 h-4 text-brandBlue"></i>
                  <span>AI Suggested Root Cause & Remediation</span>
                </div>
                <p class="text-xs text-slate-300">${err.suggestedCause}</p>
              </div>

              <!-- Stack Trace Block -->
              <div class="space-y-1">
                <div class="text-[11px] font-mono text-slate-400">Exception Stack Trace:</div>
                <pre class="bg-bgDark p-3 rounded-lg border border-surfaceBorder text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed">${err.stackTrace}</pre>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
