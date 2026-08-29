/**
 * AgentLens - Integrations View Module
 */

window.IntegrationsView = {
  render: function(container) {
    const items = [
      { name: 'OpenTelemetry', desc: 'Standard OTLP trace & metric collector', status: 'CONNECTED', icon: 'activity' },
      { name: 'AWS CloudWatch', desc: 'Amazon Web Services metric forwarding', status: 'CONNECTED', icon: 'cloud' },
      { name: 'Google Cloud Platform', desc: 'GCP Cloud Logging & BigQuery export', status: 'CONNECTED', icon: 'database' },
      { name: 'Azure App Insights', desc: 'Microsoft Azure telemetry integration', status: 'DISCONNECTED', icon: 'server' },
      { name: 'Slack Alerts', desc: 'Real-time alert channels for critical incidents', status: 'CONNECTED', icon: 'message-square' },
      { name: 'Microsoft Teams', desc: 'Webhook notification channel', status: 'DISCONNECTED', icon: 'message-circle' },
      { name: 'MongoDB Atlas', desc: 'Agent state & document payload storage', status: 'CONNECTED', icon: 'hard-drive' },
      { name: 'GitHub Actions', desc: 'CI/CD automated regression testing', status: 'CONNECTED', icon: 'git-branch' }
    ];

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">THIRD-PARTY INTEGRATIONS</h1>
            <p class="text-xs text-slate-400 mt-1">Connect AgentLens with cloud providers, messaging tools, and databases</p>
          </div>
        </div>

        <!-- Integrations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          ${items.map(item => `
            <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-4 space-y-3 hover:border-brandBlue/40 transition-colors shadow-lg flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div class="w-9 h-9 rounded-lg bg-surfaceElevated border border-surfaceBorder flex items-center justify-center text-brandBlue">
                    <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                  </div>
                  ${item.status === 'CONNECTED' ? `
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-statusSuccess/10 text-statusSuccess border border-statusSuccess/30">Connected</span>
                  ` : `
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-surfaceElevated text-slate-400 border border-surfaceBorder">Configure</span>
                  `}
                </div>
                <h3 class="font-bold text-sm text-slate-100">${item.name}</h3>
                <p class="text-xs text-slate-400 font-sans">${item.desc}</p>
              </div>

              <button onclick="window.AgentLensApp.showToast('${item.name} settings opened', 'info')" class="w-full py-1.5 rounded-lg bg-surfaceElevated hover:bg-surfaceBorder text-xs text-slate-200 font-semibold border border-surfaceBorder transition-colors">
                Configure Integration
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
