/**
 * AgentLens - LLM Observability & Model Analytics View Module
 */

window.LlmAnalyticsView = {
  render: function(container) {
    const models = window.AgentLensData.models;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">LLM OBSERVABILITY & MODEL ANALYTICS</h1>
            <p class="text-xs text-slate-400 mt-1">Benchmarking token consumption, latency, cost per request, and provider stability across LLMs</p>
          </div>
        </div>

        <!-- Top Metrics Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-slate-400">Total LLM Requests</div>
            <div class="text-2xl font-bold font-mono text-slate-100">12,482</div>
            <div class="text-[11px] text-statusSuccess">+12.4% vs last period</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-slate-400">Total Tokens Consumed</div>
            <div class="text-2xl font-bold font-mono text-brandBlue">2.41M</div>
            <div class="text-[11px] text-slate-400">1.74M input / 670K output</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-slate-400">Avg Model Response Latency</div>
            <div class="text-2xl font-bold font-mono text-brandPurple">1.28s</div>
            <div class="text-[11px] text-statusSuccess">-6.2% faster model time</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-slate-400">Total LLM Spend</div>
            <div class="text-2xl font-bold font-mono text-emerald-400">$18.42</div>
            <div class="text-[11px] text-slate-400">Avg cost per request: $0.0014</div>
          </div>
        </div>

        <!-- Model Comparison Matrix Table -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl overflow-hidden shadow-lg">
          <div class="p-4 border-b border-surfaceBorder flex items-center justify-between bg-surfaceElevated/40">
            <div>
              <h3 class="font-bold text-sm text-slate-100">Model Benchmarking Comparison Matrix</h3>
              <p class="text-xs text-slate-400">Live multi-model performance telemetry across providers</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-surfaceBorder bg-bgDark/50 text-slate-400 font-mono">
                  <th class="py-3.5 px-4">MODEL NAME</th>
                  <th class="py-3.5 px-4">PROVIDER</th>
                  <th class="py-3.5 px-4">REQUESTS</th>
                  <th class="py-3.5 px-4">TOTAL TOKENS</th>
                  <th class="py-3.5 px-4">AVG LATENCY</th>
                  <th class="py-3.5 px-4">P95 LATENCY</th>
                  <th class="py-3.5 px-4">SUCCESS RATE</th>
                  <th class="py-3.5 px-4">TOTAL COST</th>
                  <th class="py-3.5 px-4">COST / REQ</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surfaceBorder text-slate-200 font-mono">
                ${models.map(m => `
                  <tr class="hover:bg-surfaceElevated/60 transition-colors">
                    <td class="py-3.5 px-4 font-bold text-slate-100 font-sans flex items-center gap-2.5">
                      <div class="w-7 h-7 rounded bg-brandPurple/10 border border-brandPurple/30 flex items-center justify-center text-brandPurple">
                        <i data-lucide="cpu" class="w-4 h-4"></i>
                      </div>
                      <span>${m.model}</span>
                    </td>
                    <td class="py-3.5 px-4 text-slate-400 font-sans">${m.provider}</td>
                    <td class="py-3.5 px-4 text-slate-200">${m.requests.toLocaleString()}</td>
                    <td class="py-3.5 px-4 text-brandBlue font-semibold">${m.totalTokens}</td>
                    <td class="py-3.5 px-4 text-slate-300">${m.avgLatency}s</td>
                    <td class="py-3.5 px-4 text-slate-400">${m.p95Latency}s</td>
                    <td class="py-3.5 px-4 text-statusSuccess font-semibold">${m.successRate}%</td>
                    <td class="py-3.5 px-4 text-emerald-400 font-semibold">$${m.cost.toFixed(2)}</td>
                    <td class="py-3.5 px-4 text-slate-400">${m.costPerReq}</td>
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
