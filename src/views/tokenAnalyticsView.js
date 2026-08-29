/**
 * AgentLens - Token Analytics View Module
 */

window.TokenAnalyticsView = {
  render: function(container) {
    const summary = window.AgentLensData.summary;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-white tracking-tight">TOKEN ANALYTICS & BREAKDOWN</h1>
            <p class="text-xs text-zinc-400 mt-1">Deep analysis of prompt tokens, completion tokens, context lengths, and token efficiency</p>
          </div>
        </div>

        <!-- Token KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-zinc-400">Total Tokens</div>
            <div class="text-2xl font-bold font-mono text-white">${summary.totalTokens}</div>
            <div class="text-[11px] text-zinc-300">+15.2% vs previous period</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-zinc-400">Input / Prompt Tokens</div>
            <div class="text-2xl font-bold font-mono text-white">${summary.inputTokens}</div>
            <div class="text-[11px] text-zinc-400">72.1% of total token volume</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-zinc-400">Output / Completion Tokens</div>
            <div class="text-2xl font-bold font-mono text-zinc-200">${summary.outputTokens}</div>
            <div class="text-[11px] text-zinc-400">27.9% of total token volume</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-zinc-400">Avg Tokens / Request</div>
            <div class="text-2xl font-bold font-mono text-zinc-300">193 Tokens</div>
            <div class="text-[11px] text-zinc-400">P95: 4,120 tokens/req</div>
          </div>
        </div>

        <!-- Token Distribution Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-lg">
            <h3 class="font-bold text-sm text-white">Tokens Over Time (Input vs Output)</h3>
            <div class="h-60 w-full relative">
              <canvas id="chart-tokens-time"></canvas>
            </div>
          </div>

          <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-lg">
            <h3 class="font-bold text-sm text-white">Token Volume by Agent</h3>
            <div class="h-60 w-full relative">
              <canvas id="chart-tokens-agent"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      this.initCharts();
      lucide.createIcons();
    }, 50);
  },

  initCharts: function() {
    const isDark = document.documentElement.classList.contains('dark');
    const primaryColor = isDark ? '#3B82F6' : '#2563EB';
    const secondaryColor = isDark ? '#38BDF8' : '#0284C7';
    const gridColor = isDark ? 'rgba(59, 130, 246, 0.08)' : 'rgba(0, 0, 0, 0.06)';
    const tickColor = isDark ? '#94A3B8' : '#64748B';
    const legendColor = isDark ? '#E2E8F0' : '#334155';
    const doughnutBorder = isDark ? '#0B1224' : '#FFFFFF';
    const doughnutPalette = isDark 
      ? ['#3B82F6', '#38BDF8', '#6366F1', '#818CF8', '#93C5FD']
      : ['#2563EB', '#0284C7', '#4F46E5', '#60A5FA', '#93C5FD'];

    const ctxTime = document.getElementById('chart-tokens-time');
    if (ctxTime) {
      if (this.chartTimeInstance) this.chartTimeInstance.destroy();
      this.chartTimeInstance = new Chart(ctxTime, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            { label: 'Input Tokens', data: [210, 280, 320, 290, 340, 180, 140], backgroundColor: primaryColor },
            { label: 'Output Tokens', data: [80, 95, 110, 105, 125, 60, 50], backgroundColor: secondaryColor }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: true, labels: { color: legendColor } } },
          scales: {
            x: { stacked: true, grid: { color: gridColor }, ticks: { color: tickColor } },
            y: { stacked: true, grid: { color: gridColor }, ticks: { color: tickColor } }
          }
        }
      });
    }

    const ctxAgent = document.getElementById('chart-tokens-agent');
    if (ctxAgent) {
      if (this.chartAgentInstance) this.chartAgentInstance.destroy();
      this.chartAgentInstance = new Chart(ctxAgent, {
        type: 'doughnut',
        data: {
          labels: ['ResearchAgent', 'SupportAgent', 'CodeAgent', 'PlannerAgent', 'Others'],
          datasets: [{
            data: [920, 450, 410, 380, 250],
            backgroundColor: doughnutPalette,
            borderColor: doughnutBorder,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right', labels: { color: legendColor } } }
        }
      });
    }
  }
};

