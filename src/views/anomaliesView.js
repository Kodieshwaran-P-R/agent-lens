/**
 * AgentLens - Anomaly Detection View Module
 */

window.AnomaliesView = {
  render: function(container) {
    const anomalies = window.AgentLensData.anomalies;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">AI ANOMALY DETECTION ENGINE</h1>
            <p class="text-xs text-slate-400 mt-1">Automated detection of latency spikes, cost bursts, token outliers, and rate limit errors</p>
          </div>
        </div>

        <!-- Anomalies Cards List -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${anomalies.map(anom => `
            <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-lg hover:border-statusWarning/50 transition-colors">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <span class="p-2 rounded-lg bg-statusWarning/10 text-statusWarning border border-statusWarning/30">
                    <i data-lucide="alert-triangle" class="w-5 h-5"></i>
                  </span>
                  <div>
                    <h3 class="font-bold text-base text-slate-100">${anom.title}</h3>
                    <p class="text-xs text-slate-400 font-mono">Agent: ${anom.agent} | ${anom.detectedAt}</p>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-statusWarning/10 text-statusWarning border border-statusWarning/30">${anom.severity}</span>
              </div>

              <p class="text-xs text-slate-300">${anom.message}</p>

              <!-- Comparison Table -->
              <div class="grid grid-cols-2 gap-3 p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder font-mono text-xs">
                <div>
                  <span class="text-slate-400 text-[10px] block">EXPECTED BASELINE</span>
                  <span class="text-slate-200 font-semibold">${anom.baseline}</span>
                </div>
                <div>
                  <span class="text-statusError text-[10px] block">OBSERVED VALUE</span>
                  <span class="text-statusError font-bold">${anom.observed}</span>
                </div>
              </div>

              <button onclick="window.location.hash='#/traces'" class="w-full py-2 rounded-lg bg-surfaceElevated hover:bg-brandBlue text-slate-200 hover:text-white text-xs font-semibold border border-surfaceBorder transition-all flex items-center justify-center gap-2">
                <span>View ${anom.affectedTracesCount} Affected Traces</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
