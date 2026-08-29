/**
 * AgentLens - Dashboard View Module
 */

window.DashboardView = {
  render: function (container) {
    const data = window.AgentLensData.summary;
    const agents = window.AgentLensData.agents;
    const anomalies = window.AgentLensData.anomalies;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header Banner & System Status -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <div class="flex items-center gap-2">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">System Status: All Systems Operational</h1>
            </div>
            <p class="text-xs text-zinc-400 mt-1">Monitoring 24 active AI agents across Production and Staging environments</p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex items-center gap-2">
            <button onclick="window.location.hash='#/live'" class="px-3 py-1.5 rounded-lg bg-surfaceElevated border border-surfaceBorder hover:border-brandBlue/50 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all cursor-pointer">
              <i data-lucide="radio" class="w-4 h-4 text-brandBlue animate-pulse"></i>
              <span>Live Monitor</span>
            </button>
            <button onclick="window.location.hash='#/traces'" class="px-3 py-1.5 rounded-lg bg-brandBlue text-white hover:bg-brandBlueHover text-xs font-semibold flex items-center gap-2 shadow-md shadow-brandBlue/25 transition-all cursor-pointer">
              <i data-lucide="list-filter" class="w-4 h-4 text-white"></i>
              <span>Explore Traces</span>
            </button>
          </div>
        </div>

        <!-- 8 Core KPI Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Total Executions -->
          <div class="bg-surfaceDark border border-surfaceBorder hover:border-surfaceBorderHover p-4 rounded-xl space-y-2 transition-all hover:shadow-lg group">
            <div class="flex items-center justify-between text-xs text-zinc-400">
              <span class="font-medium">Total Executions</span>
              <i data-lucide="activity" class="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform"></i>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-slate-900 dark:text-white font-mono">${data.totalExecutions.toLocaleString()}</span>
              <span class="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">${data.executionsChange}</span>
            </div>
            <p class="text-[11px] text-zinc-400">vs previous 24h period</p>
          </div>

          <!-- Success Rate -->
          <div class="bg-surfaceDark border border-surfaceBorder hover:border-surfaceBorderHover p-4 rounded-xl space-y-2 transition-all hover:shadow-lg group">
            <div class="flex items-center justify-between text-xs text-zinc-400">
              <span class="font-medium">Success Rate</span>
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform"></i>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-slate-900 dark:text-white font-mono">${data.successRate}%</span>
              <span class="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">${data.successRateChange}</span>
            </div>
            <p class="text-[11px] text-zinc-400">12,320 successful runs</p>
          </div>

          <!-- Avg Latency -->
          <div class="bg-surfaceDark border border-surfaceBorder hover:border-surfaceBorderHover p-4 rounded-xl space-y-2 transition-all hover:shadow-lg group">
            <div class="flex items-center justify-between text-xs text-zinc-400">
              <span class="font-medium">Average Latency</span>
              <i data-lucide="clock" class="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform"></i>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-slate-900 dark:text-white font-mono">${data.avgLatency}s</span>
              <span class="text-xs font-medium text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">${data.avgLatencyChange}</span>
            </div>
            <p class="text-[11px] text-zinc-400">P95: <span class="font-mono text-sky-300">${data.p95Latency}s</span></p>
          </div>

          <!-- Total Tokens -->
          <div class="bg-surfaceDark border border-surfaceBorder hover:border-surfaceBorderHover p-4 rounded-xl space-y-2 transition-all hover:shadow-lg group">
            <div class="flex items-center justify-between text-xs text-zinc-400">
              <span class="font-medium">Total Tokens</span>
              <i data-lucide="cpu" class="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform"></i>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-slate-900 dark:text-white font-mono">${data.totalTokens}</span>
              <span class="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">${data.tokensChange}</span>
            </div>
            <p class="text-[11px] text-zinc-400">In: ${data.inputTokens} | Out: ${data.outputTokens}</p>
          </div>

          <!-- Estimated Cost -->
          <div class="bg-surfaceDark border border-surfaceBorder hover:border-surfaceBorderHover p-4 rounded-xl space-y-2 transition-all hover:shadow-lg group">
            <div class="flex items-center justify-between text-xs text-zinc-400">
              <span class="font-medium">Estimated Cost (24h)</span>
              <i data-lucide="dollar-sign" class="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform"></i>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-slate-900 dark:text-white font-mono">$${data.estimatedCost}</span>
              <span class="text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">${data.costChange}</span>
            </div>
            <p class="text-[11px] text-zinc-400">Projected: <span class="font-mono text-amber-300">$560/mo</span></p>
          </div>

          <!-- Error Rate -->
          <div class="bg-surfaceDark border border-surfaceBorder hover:border-surfaceBorderHover p-4 rounded-xl space-y-2 transition-all hover:shadow-lg group">
            <div class="flex items-center justify-between text-xs text-zinc-400">
              <span class="font-medium">Error Rate</span>
              <i data-lucide="alert-triangle" class="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform"></i>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-slate-900 dark:text-white font-mono">${data.errorRate}%</span>
              <span class="text-xs font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">${data.errorRateChange}</span>
            </div>
            <p class="text-[11px] text-zinc-400">162 total errors logged</p>
          </div>

          <!-- Active Agents -->
          <div class="bg-surfaceDark border border-surfaceBorder hover:border-surfaceBorderHover p-4 rounded-xl space-y-2 transition-all hover:shadow-lg group">
            <div class="flex items-center justify-between text-xs text-zinc-400">
              <span class="font-medium">Active Agents</span>
              <i data-lucide="bot" class="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform"></i>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-slate-900 dark:text-white font-mono">${data.activeAgents}</span>
              <span class="text-xs font-mono text-blue-400 font-semibold">8 prod / 16 dev</span>
            </div>
            <p class="text-[11px] text-zinc-400">100% deployment coverage</p>
          </div>

          <!-- Active Sessions -->
          <div class="bg-surfaceDark border border-surfaceBorder hover:border-surfaceBorderHover p-4 rounded-xl space-y-2 transition-all hover:shadow-lg group">
            <div class="flex items-center justify-between text-xs text-zinc-400">
              <span class="font-medium">Active Sessions</span>
              <i data-lucide="users" class="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform"></i>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-bold text-slate-900 dark:text-white font-mono">${data.activeSessions}</span>
              <span class="text-xs font-medium text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">+18%</span>
            </div>
            <p class="text-[11px] text-zinc-400">Concurrent user conversations</p>
          </div>
        </div>

        <!-- AI Root Cause Alert Widget -->
        ${anomalies.length > 0 ? `
          <div class="anomaly-banner bg-amber-500/10 border border-amber-500/30 hover:border-amber-500/50 p-4 rounded-xl flex items-start gap-4 shadow-lg transition-colors">
            <div class="p-2 bg-amber-500/20 rounded-lg text-amber-400 border border-amber-500/30 flex-shrink-0">
              <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-400"></i>
            </div>
            <div class="flex-1 space-y-1">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">${anomalies[0].title}: ${anomalies[0].agent}</h3>
                <span class="text-[10px] font-mono text-zinc-400">${anomalies[0].detectedAt}</span>
              </div>
              <p class="text-xs text-zinc-300">${anomalies[0].message}</p>
            </div>
            <button onclick="window.location.hash='#/anomalies'" class="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 hover:text-white text-xs text-amber-300 font-semibold border border-amber-500/40 flex-shrink-0 transition-colors cursor-pointer">
              Investigate Anomaly →
            </button>
          </div>
        ` : ''}

        <!-- Charts Section (Grid: Line volume + Bar latency) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Execution Volume Line Chart -->
          <div class="bg-surfaceDark border border-surfaceBorder p-5 rounded-xl space-y-4 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <i data-lucide="activity" class="w-4 h-4 text-brandBlue"></i> Execution Volume & Error Trend
                </h3>
                <p class="text-xs text-zinc-400">24-hour trace throughput (hourly bins)</p>
              </div>
              <div class="flex items-center gap-3 text-xs">
                <span class="flex items-center gap-1.5 text-zinc-200"><span class="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shadow-sm shadow-blue-500/50"></span> Success</span>
                <span class="flex items-center gap-1.5 text-zinc-400"><span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-sm shadow-rose-500/50"></span> Errors</span>
              </div>
            </div>
            <div class="h-64 relative">
              <canvas id="chart-execution-volume"></canvas>
            </div>
          </div>

          <!-- Latency Percentiles Chart -->
          <div class="bg-surfaceDark border border-surfaceBorder p-5 rounded-xl space-y-4 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <i data-lucide="bar-chart-2" class="w-4 h-4 text-sky-400"></i> Latency Distribution (P50, P95, P99)
                </h3>
                <p class="text-xs text-zinc-400">Response latency in seconds across top agent pipelines</p>
              </div>
              <div class="flex items-center gap-3 text-xs">
                <span class="flex items-center gap-1 text-zinc-200"><span class="w-2 h-2 bg-blue-500 inline-block rounded-sm"></span> P50</span>
                <span class="flex items-center gap-1 text-zinc-400"><span class="w-2 h-2 bg-sky-400 inline-block rounded-sm"></span> P95</span>
                <span class="flex items-center gap-1 text-zinc-500"><span class="w-2 h-2 bg-indigo-400 inline-block rounded-sm"></span> P99</span>
              </div>
            </div>
            <div class="h-64 relative">
              <canvas id="chart-latency-percentiles"></canvas>
            </div>
          </div>
        </div>

        <!-- Agents Health & Live Metrics Table -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl overflow-hidden shadow-lg">
          <div class="p-4 border-b border-surfaceBorder flex items-center justify-between bg-surfaceElevated/30">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">Monitored Agent Pipelines</h3>
              <p class="text-xs text-zinc-400">Real-time status, health, and throughput of deployed agent models</p>
            </div>
            <a href="#/agents" class="text-xs font-semibold text-brandBlue hover:underline flex items-center gap-1">
              View All Agents →
            </a>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-surfaceElevated/50 text-zinc-400 font-mono uppercase text-[10px] border-b border-surfaceBorder">
                <tr>
                  <th class="py-3 px-4">Agent Name</th>
                  <th class="py-3 px-4">Environment</th>
                  <th class="py-3 px-4">Model & Framework</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4">Success Rate</th>
                  <th class="py-3 px-4">Avg Latency</th>
                  <th class="py-3 px-4">24h Cost</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surfaceBorder text-zinc-200 font-mono">
                ${agents.slice(0, 5).map(agent => `
                  <tr class="hover:bg-surfaceElevated/60 transition-colors cursor-pointer" onclick="window.location.hash='#/agents/${agent.id}'">
                    <td class="py-3 px-4 font-sans font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <div class="w-6 h-6 rounded bg-brandBlue/15 border border-brandBlue/30 flex items-center justify-center text-brandBlue text-[10px] font-bold">
                        ${agent.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div>${agent.name}</div>
                        <div class="text-[10px] font-mono text-zinc-400 font-normal">ID: ${agent.id}</div>
                      </div>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono ${agent.environment === 'production' ? 'bg-brandBlue/15 text-brandBlue border border-brandBlue/30' : 'bg-surfaceElevated text-zinc-300 border border-surfaceBorder'} font-semibold uppercase">
                        ${agent.environment}
                      </span>
                    </td>
                    <td class="py-3 px-4 font-sans">
                      <div class="text-zinc-200 font-medium">${agent.model}</div>
                      <div class="text-[10px] text-zinc-400 font-mono">${agent.framework}</div>
                    </td>
                    <td class="py-3 px-4">
                      <span class="flex items-center gap-1.5 ${agent.status === 'HEALTHY' ? 'text-emerald-400' : 'text-amber-400'} font-semibold font-sans">
                        <span class="w-2 h-2 rounded-full ${agent.status === 'HEALTHY' ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-amber-400 shadow-sm shadow-amber-400/50'}"></span>
                        ${agent.status}
                      </span>
                    </td>
                    <td class="py-3 px-4 font-bold text-emerald-400">${agent.successRate}%</td>
                    <td class="py-3 px-4 font-medium text-zinc-300">${agent.avgLatency}s</td>
                    <td class="py-3 px-4 font-bold text-slate-900 dark:text-white">$${agent.totalCost}</td>
                    <td class="py-3 px-4 text-right font-sans">
                      <a href="#/agents/${agent.id}" class="px-2.5 py-1 rounded bg-brandBlue/10 hover:bg-brandBlue hover:text-white text-brandBlue text-xs border border-brandBlue/30 transition-all inline-block font-semibold">
                        Inspect
                      </a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    lucide.createIcons();
    this.initCharts();
  },

  initCharts: function () {
    const isDark = document.documentElement.classList.contains('dark');
    const primaryColor = isDark ? '#3B82F6' : '#2563EB'; // Electric/Royal Blue (Hero & Login)
    const secondaryColor = isDark ? '#EF4444' : '#DC2626'; // Error Coral/Crimson
    const p50Color = isDark ? '#3B82F6' : '#2563EB'; // Electric Blue
    const p95Color = isDark ? '#38BDF8' : '#0284C7'; // Luminous Sky Cyan
    const p99Color = isDark ? '#818CF8' : '#6366F1'; // Royal Indigo / Aurora
    const gridColor = isDark ? 'rgba(59, 130, 246, 0.08)' : 'rgba(0, 0, 0, 0.06)';
    const tickColor = isDark ? '#94A3B8' : '#64748B';
    const fillBg = isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(37, 99, 235, 0.08)';
    const errorFill = isDark ? 'rgba(239, 68, 68, 0.12)' : 'rgba(220, 38, 38, 0.06)';

    // Chart 1: Execution Volume Line Chart
    const ctxVol = document.getElementById('chart-execution-volume');
    if (ctxVol) {
      if (this.chartVolInstance) {
        this.chartVolInstance.destroy();
      }
      this.chartVolInstance = new Chart(ctxVol, {
        type: 'line',
        data: {
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
          datasets: [
            {
              label: 'Successful Executions',
              data: [1200, 950, 1400, 2100, 2450, 2200, 1850, 1500],
              borderColor: primaryColor,
              backgroundColor: fillBg,
              fill: true,
              tension: 0.35,
              borderWidth: 2.5,
              pointBackgroundColor: primaryColor,
              pointBorderColor: '#FFFFFF',
              pointHoverRadius: 5
            },
            {
              label: 'Errors',
              data: [14, 8, 22, 45, 18, 12, 28, 15],
              borderColor: secondaryColor,
              backgroundColor: errorFill,
              fill: true,
              tension: 0.35,
              borderWidth: 2,
              pointBackgroundColor: secondaryColor,
              pointHoverRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 10 } } },
            y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 10 } } }
          }
        }
      });
    }

    // Chart 2: Latency Percentiles Chart
    const ctxLat = document.getElementById('chart-latency-percentiles');
    if (ctxLat) {
      if (this.chartLatInstance) {
        this.chartLatInstance.destroy();
      }
      this.chartLatInstance = new Chart(ctxLat, {
        type: 'bar',
        data: {
          labels: ['ResearchAgent', 'SupportAgent', 'PlannerAgent', 'CodeAgent', 'DataAnalyst'],
          datasets: [
            { label: 'P50', data: [1.2, 0.5, 1.4, 2.1, 0.8], backgroundColor: p50Color, borderRadius: 4 },
            { label: 'P95', data: [4.1, 1.9, 5.4, 8.9, 2.8], backgroundColor: p95Color, borderRadius: 4 },
            { label: 'P99', data: [6.8, 3.2, 8.1, 12.4, 4.5], backgroundColor: p99Color, borderRadius: 4 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 10 } } },
            y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 10 } } }
          }
        }
      });
    }
  }
};
