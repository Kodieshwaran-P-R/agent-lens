/**
 * AgentLens - Prompt Observability & Registry View Module
 */

window.PromptsView = {
  render: function(container) {
    const prompts = window.AgentLensData.prompts;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">PROMPT MANAGEMENT & VERSION OBSERVABILITY</h1>
            <p class="text-xs text-slate-400 mt-1">Track prompt template performance, compare versions side-by-side, and inspect quality/cost diffs</p>
          </div>

          <button onclick="window.AgentLensApp.openPromptDiffModal()" class="px-3.5 py-2 rounded-lg bg-gradient-to-r from-brandBlue to-brandPurple text-white text-xs font-semibold hover:opacity-90 transition-all shadow-glow-purple flex items-center gap-2">
            <i data-lucide="git-compare" class="w-4 h-4"></i>
            <span>Compare Prompt Versions (Diff)</span>
          </button>
        </div>

        <!-- Prompts Registry Cards -->
        <div class="space-y-6">
          ${prompts.map(p => `
            <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-lg">
              <div class="flex items-center justify-between border-b border-surfaceBorder pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-brandPurple/20 border border-brandPurple/40 flex items-center justify-center text-brandPurple">
                    <i data-lucide="file-text" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="font-bold text-base text-slate-100">${p.name}</h3>
                      <span class="px-2 py-0.5 rounded text-xs font-mono bg-brandBlue/10 text-brandBlue border border-brandBlue/30">${p.currentVersion} Active</span>
                    </div>
                    <p class="text-xs text-slate-400 font-mono">Agent: ${p.agent} | Model: ${p.model}</p>
                  </div>
                </div>

                <button onclick="window.AgentLensApp.openPromptDiffModal()" class="px-3 py-1.5 rounded-lg bg-surfaceElevated hover:bg-surfaceBorder text-xs text-slate-200 font-semibold border border-surfaceBorder flex items-center gap-2 transition-colors">
                  <i data-lucide="git-commit" class="w-3.5 h-3.5 text-brandPurple"></i>
                  <span>Inspect Diff vs v1.3</span>
                </button>
              </div>

              <!-- Versions Performance Comparison -->
              <div class="space-y-2">
                <div class="text-xs font-semibold text-slate-300">Version History & Performance Metrics:</div>
                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                      <tr class="border-b border-surfaceBorder bg-bgDark/50 text-slate-400">
                        <th class="py-2.5 px-3">VERSION</th>
                        <th class="py-2.5 px-3">DEPLOYED DATE</th>
                        <th class="py-2.5 px-3">SUCCESS RATE</th>
                        <th class="py-2.5 px-3">AVG LATENCY</th>
                        <th class="py-2.5 px-3">COST / REQ</th>
                        <th class="py-2.5 px-3">STATUS</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-surfaceBorder text-slate-200">
                      ${p.versions.map(v => `
                        <tr class="hover:bg-surfaceElevated/50 transition-colors">
                          <td class="py-2.5 px-3 font-bold text-brandBlue">${v.version}</td>
                          <td class="py-2.5 px-3 text-slate-400">${v.date}</td>
                          <td class="py-2.5 px-3 font-semibold ${v.successRate > 95 ? 'text-statusSuccess' : 'text-statusWarning'}">${v.successRate}%</td>
                          <td class="py-2.5 px-3 text-slate-300">${v.latency}s</td>
                          <td class="py-2.5 px-3 text-emerald-400">$${v.costPerReq.toFixed(3)}</td>
                          <td class="py-2.5 px-3">
                            ${v.version === p.currentVersion ? `
                              <span class="px-2 py-0.5 rounded text-[10px] bg-statusSuccess/10 text-statusSuccess border border-statusSuccess/30 font-semibold">ACTIVE</span>
                            ` : `
                              <span class="px-2 py-0.5 rounded text-[10px] bg-surfaceElevated text-slate-400 border border-surfaceBorder">ARCHIVED</span>
                            `}
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
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
