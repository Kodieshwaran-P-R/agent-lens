/**
 * AgentLens - Alerts & Incidents Management View Module
 */

window.AlertsView = {
  render: function(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">ALERTS & INCIDENT MANAGEMENT</h1>
            <p class="text-xs text-slate-400 mt-1">Configure automated alert triggers and manage live incident timelines</p>
          </div>

          <button onclick="window.AgentLensApp.showToast('Rule created!', 'success')" class="px-3.5 py-2 rounded-lg bg-brandBlue hover:bg-brandBlueHover text-white text-xs font-semibold flex items-center gap-2 shadow-glow-blue transition-all">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Create Alert Rule</span>
          </button>
        </div>

        <!-- Live Incident Timeline Banner -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-xl">
          <div class="flex items-center justify-between border-b border-surfaceBorder pb-3">
            <div class="flex items-center gap-3">
              <span class="p-2 rounded-lg bg-statusError/10 text-statusError border border-statusError/30">
                <i data-lucide="siren" class="w-5 h-5"></i>
              </span>
              <div>
                <h3 class="font-bold text-base text-slate-100">INCIDENT #412: ResearchAgent Elevated Latency Spike</h3>
                <p class="text-xs text-slate-400 font-mono">Status: INVESTIGATING | Severity: HIGH</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="window.AgentLensApp.showToast('Incident acknowledged', 'info')" class="px-3 py-1.5 rounded-lg bg-surfaceElevated hover:bg-surfaceBorder text-xs text-slate-200 font-semibold border border-surfaceBorder">
                Acknowledge
              </button>
              <button onclick="window.AgentLensApp.showToast('Incident resolved!', 'success')" class="px-3 py-1.5 rounded-lg bg-statusSuccess text-white hover:bg-emerald-600 text-xs font-semibold">
                Resolve Incident
              </button>
            </div>
          </div>

          <!-- Timeline -->
          <div class="space-y-3 font-mono text-xs pl-2 border-l-2 border-surfaceBorder">
            <div class="relative pl-4">
              <span class="absolute -left-[9px] top-1 w-3 h-3 rounded-full bg-statusError"></span>
              <span class="font-bold text-slate-200">12:42 PM:</span> Error rate crossed threshold (&gt; 5.0%)
            </div>
            <div class="relative pl-4">
              <span class="absolute -left-[9px] top-1 w-3 h-3 rounded-full bg-statusWarning"></span>
              <span class="font-bold text-slate-200">12:45 PM:</span> PagerDuty alert notification dispatched to DevOps team
            </div>
            <div class="relative pl-4">
              <span class="absolute -left-[9px] top-1 w-3 h-3 rounded-full bg-brandBlue"></span>
              <span class="font-bold text-slate-200">12:48 PM:</span> Investigation initiated by Lens AI Assistant
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
