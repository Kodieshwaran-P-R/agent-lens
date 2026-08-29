/**
 * AgentLens - API Usage & Endpoint Analytics View Module
 */

window.ApiView = {
  render: function(container) {
    const endpoints = [
      { method: 'POST', path: '/v1/telemetry/spans', requests: 1240000, avgLatency: 12, errors: 4, rateLimit: '10,000 / sec' },
      { method: 'GET', path: '/v1/traces', requests: 84200, avgLatency: 45, errors: 0, rateLimit: '1,000 / sec' },
      { method: 'GET', path: '/v1/agents', requests: 42100, avgLatency: 18, errors: 0, rateLimit: '500 / sec' },
      { method: 'POST', path: '/v1/evaluations/run', requests: 1240, avgLatency: 890, errors: 2, rateLimit: '50 / sec' }
    ];

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">API USAGE & RATE LIMIT ANALYTICS</h1>
            <p class="text-xs text-slate-400 mt-1">REST & gRPC endpoint throughput, HTTP response codes, and rate limit quotas</p>
          </div>
        </div>

        <!-- Endpoints Table -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl overflow-hidden shadow-lg">
          <div class="p-4 border-b border-surfaceBorder bg-surfaceElevated/40">
            <h3 class="font-bold text-sm text-slate-100">API Endpoint Metrics</h3>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr class="border-b border-surfaceBorder bg-bgDark/50 text-slate-400">
                  <th class="py-3.5 px-4">METHOD</th>
                  <th class="py-3.5 px-4">ENDPOINT PATH</th>
                  <th class="py-3.5 px-4">REQUESTS (24H)</th>
                  <th class="py-3.5 px-4">AVG LATENCY</th>
                  <th class="py-3.5 px-4">ERRORS</th>
                  <th class="py-3.5 px-4">RATE LIMIT QUOTA</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surfaceBorder text-slate-200">
                ${endpoints.map(ep => `
                  <tr class="hover:bg-surfaceElevated/60 transition-colors">
                    <td class="py-3.5 px-4">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${ep.method === 'POST' ? 'bg-brandPurple/20 text-brandPurple border border-brandPurple/30' : 'bg-brandBlue/20 text-brandBlue border border-brandBlue/30'}">${ep.method}</span>
                    </td>
                    <td class="py-3.5 px-4 font-bold text-slate-100">${ep.path}</td>
                    <td class="py-3.5 px-4 text-brandBlue font-semibold">${ep.requests.toLocaleString()}</td>
                    <td class="py-3.5 px-4 text-slate-300">${ep.avgLatency}ms</td>
                    <td class="py-3.5 px-4 text-slate-400">${ep.errors}</td>
                    <td class="py-3.5 px-4 text-emerald-400">${ep.rateLimit}</td>
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
