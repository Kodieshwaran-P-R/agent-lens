/**
 * AgentLens - Services & Infrastructure Health View Module
 */

window.ServicesView = {
  render: function(container) {
    const services = window.AgentLensData.servicesHealth;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">INFRASTRUCTURE HEALTH & DEPENDENCIES</h1>
            <p class="text-xs text-slate-400 mt-1">Uptime monitoring across agent runtime nodes, database clusters, and LLM provider gateways</p>
          </div>
        </div>

        <!-- Infrastructure Services Matrix -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl overflow-hidden shadow-lg">
          <div class="p-4 border-b border-surfaceBorder bg-surfaceElevated/40">
            <h3 class="font-bold text-sm text-slate-100">Service Status Matrix</h3>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr class="border-b border-surfaceBorder bg-bgDark/50 text-slate-400">
                  <th class="py-3.5 px-4">SERVICE NAME</th>
                  <th class="py-3.5 px-4">COMPONENT TYPE</th>
                  <th class="py-3.5 px-4">STATUS</th>
                  <th class="py-3.5 px-4">LATENCY</th>
                  <th class="py-3.5 px-4">UPTIME (30D)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surfaceBorder text-slate-200">
                ${services.map(s => `
                  <tr class="hover:bg-surfaceElevated/60 transition-colors">
                    <td class="py-3.5 px-4 font-bold text-slate-100 font-sans flex items-center gap-2.5">
                      <div class="w-7 h-7 rounded bg-surfaceElevated border border-surfaceBorder flex items-center justify-center text-brandBlue">
                        <i data-lucide="server" class="w-4 h-4"></i>
                      </div>
                      <span>${s.name}</span>
                    </td>
                    <td class="py-3.5 px-4 text-slate-400 font-sans">${s.type}</td>
                    <td class="py-3.5 px-4">
                      ${s.status === 'HEALTHY' ? `
                        <span class="px-2 py-0.5 rounded text-[11px] bg-statusSuccess/10 text-statusSuccess border border-statusSuccess/30 font-semibold">● Healthy</span>
                      ` : `
                        <span class="px-2 py-0.5 rounded text-[11px] bg-statusWarning/10 text-statusWarning border border-statusWarning/30 font-semibold">▲ Degraded</span>
                      `}
                    </td>
                    <td class="py-3.5 px-4 text-slate-300">${s.latencyMs}ms</td>
                    <td class="py-3.5 px-4 text-emerald-400 font-semibold">${s.uptime}</td>
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
