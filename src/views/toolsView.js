/**
 * AgentLens - Tool Observability View Module
 */

window.ToolsView = {
  render: function(container) {
    const tools = window.AgentLensData.tools;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">TOOL & API OBSERVABILITY</h1>
            <p class="text-xs text-slate-400 mt-1">Monitoring external API tool calls, sandbox latency, database queries, and failure rates</p>
          </div>
        </div>

        <!-- Tool Cards Matrix Table -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl overflow-hidden shadow-lg">
          <div class="p-4 border-b border-surfaceBorder bg-surfaceElevated/40">
            <h3 class="font-bold text-sm text-slate-100">Registered Tools & Performance Telemetry</h3>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-surfaceBorder bg-bgDark/50 text-slate-400 font-mono">
                  <th class="py-3.5 px-4">TOOL NAME & DESCRIPTION</th>
                  <th class="py-3.5 px-4">TYPE</th>
                  <th class="py-3.5 px-4">TOTAL CALLS</th>
                  <th class="py-3.5 px-4">SUCCESS RATE</th>
                  <th class="py-3.5 px-4">AVG LATENCY</th>
                  <th class="py-3.5 px-4">P95 LATENCY</th>
                  <th class="py-3.5 px-4">ERRORS</th>
                  <th class="py-3.5 px-4">EST. COST</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surfaceBorder text-slate-200 font-mono">
                ${tools.map(t => `
                  <tr class="hover:bg-surfaceElevated/60 transition-colors">
                    <td class="py-3.5 px-4 font-bold text-slate-100 font-sans flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-surfaceElevated border border-surfaceBorder flex items-center justify-center text-statusSuccess">
                        <i data-lucide="wrench" class="w-4 h-4"></i>
                      </div>
                      <div>
                        <div class="text-sm">${t.name}</div>
                        <div class="text-[10px] text-slate-400 font-mono">${t.description}</div>
                      </div>
                    </td>
                    <td class="py-3.5 px-4">
                      <span class="px-2 py-0.5 rounded text-[10px] bg-surfaceElevated text-slate-300 border border-surfaceBorder uppercase">${t.type}</span>
                    </td>
                    <td class="py-3.5 px-4 text-slate-200">${t.calls.toLocaleString()}</td>
                    <td class="py-3.5 px-4 font-semibold ${t.successRate > 98 ? 'text-statusSuccess' : 'text-statusError'}">${t.successRate}%</td>
                    <td class="py-3.5 px-4 text-slate-300">${t.avgLatency}ms</td>
                    <td class="py-3.5 px-4 text-slate-400">${t.p95Latency}ms</td>
                    <td class="py-3.5 px-4 ${t.errors > 20 ? 'text-statusError font-bold' : 'text-slate-400'}">${t.errors}</td>
                    <td class="py-3.5 px-4 text-emerald-400">$${t.cost.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
