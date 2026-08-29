/**
 * AgentLens - FinOps AI Cost Analytics View Module
 */

window.CostAnalyticsView = {
  render: function(container) {
    const costs = window.AgentLensData.costs;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-white tracking-tight">FINOPS AI COST ANALYTICS & BUDGETING</h1>
            <p class="text-xs text-zinc-400 mt-1">Real-time spend forecasting, cost allocation by model/agent, and automated cost optimization</p>
          </div>
        </div>

        <!-- FinOps Top KPI Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-zinc-400">Today's Spend</div>
            <div class="text-2xl font-bold font-mono text-white">$${costs.today.toFixed(2)}</div>
            <div class="text-[11px] text-zinc-400">+3.1% vs yesterday</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-zinc-400">Weekly Spend</div>
            <div class="text-2xl font-bold font-mono text-zinc-100">$${costs.weekly.toFixed(2)}</div>
            <div class="text-[11px] text-white font-semibold">On target for weekly budget</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-zinc-400">Projected Monthly Spend</div>
            <div class="text-2xl font-bold font-mono text-zinc-200">$${costs.projectedMonthly.toFixed(2)}</div>
            <div class="text-[11px] text-zinc-400">Budget Limit: $${costs.budget.toFixed(2)}</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-zinc-400">Remaining Budget</div>
            <div class="text-2xl font-bold font-mono text-white">$${costs.remaining.toFixed(2)}</div>
            <div class="text-[11px] text-zinc-400">25.8% remaining for current cycle</div>
          </div>
        </div>

        <!-- Monthly Budget Progress Bar -->
        <div class="bg-surfaceDark border border-surfaceBorder p-5 rounded-xl space-y-3 shadow-lg">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-zinc-200">Monthly FinOps Budget Progress</span>
            <span class="font-mono text-zinc-300">$${costs.monthly.toFixed(2)} spent of $${costs.budget.toFixed(2)} budget (74.2%)</span>
          </div>
          <div class="w-full bg-black h-3 rounded-full overflow-hidden p-0.5 border border-surfaceBorder">
            <div class="bg-white h-full rounded-full w-[74%]"></div>
          </div>
        </div>

        <!-- Cost Optimization Suggestions Box -->
        <div class="bg-black border border-surfaceBorder hover:border-white/30 p-5 rounded-xl space-y-3 shadow-lg transition-colors">
          <div class="flex items-center gap-2 text-white font-bold text-sm">
            <i data-lucide="lightbulb" class="w-5 h-5 text-white"></i>
            <span>Cost Optimization Insights & Potential Savings: ~$18.40 / month</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
            <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-1">
              <div class="font-semibold text-zinc-200">1. Switch Classification Step Model</div>
              <p class="text-zinc-400">Use <strong class="text-white font-mono">gpt-4o-mini</strong> for intent parsing in ResearchAgent instead of standard gpt-4o.</p>
              <div class="text-[10px] text-white font-mono font-semibold">Estimated savings: $9.20/mo</div>
            </div>
            <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-1">
              <div class="font-semibold text-zinc-200">2. Cache WebSearch Responses</div>
              <p class="text-zinc-400">Cache repeated search queries for 1 hour using Redis layer.</p>
              <div class="text-[10px] text-white font-mono font-semibold">Estimated savings: $5.80/mo</div>
            </div>
            <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-1">
              <div class="font-semibold text-zinc-200">3. Limit CodeInterpreter Retries</div>
              <p class="text-zinc-400">Reduce timeout retries from 3 to 1 for failing python execution scripts.</p>
              <div class="text-[10px] text-white font-mono font-semibold">Estimated savings: $3.40/mo</div>
            </div>
          </div>
        </div>

        <!-- Cost Breakdown Charts Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-lg">
            <h3 class="font-bold text-sm text-white">Cost Allocation by Agent</h3>
            <div class="h-60 w-full relative">
              <canvas id="chart-cost-agent"></canvas>
            </div>
          </div>

          <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-lg">
            <h3 class="font-bold text-sm text-white">Cost Allocation by Model</h3>
            <div class="h-60 w-full relative">
              <canvas id="chart-cost-model"></canvas>
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
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)';
    const tickColor = isDark ? '#9CA3AF' : '#64748B';
    const legendColor = isDark ? '#E2E8F0' : '#334155';
    const pieBorder = isDark ? '#18191D' : '#FFFFFF';
    const piePalette = isDark
      ? ['#3B82F6', '#38BDF8', '#6366F1', '#818CF8']
      : ['#2563EB', '#0284C7', '#4F46E5', '#60A5FA'];

    const ctxAgent = document.getElementById('chart-cost-agent');
    if (ctxAgent) {
      if (this.chartCostAgentInstance) this.chartCostAgentInstance.destroy();
      this.chartCostAgentInstance = new Chart(ctxAgent, {
        type: 'bar',
        data: {
          labels: ['Research', 'Planner', 'Support', 'Code', 'DataAnalyst'],
          datasets: [{
            label: 'Cost ($)',
            data: [7.45, 3.85, 3.12, 2.98, 0.92],
            backgroundColor: primaryColor
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: tickColor } },
            y: { grid: { color: gridColor }, ticks: { color: tickColor } }
          }
        }
      });
    }

    const ctxModel = document.getElementById('chart-cost-model');
    if (ctxModel) {
      if (this.chartCostModelInstance) this.chartCostModelInstance.destroy();
      this.chartCostModelInstance = new Chart(ctxModel, {
        type: 'pie',
        data: {
          labels: ['gpt-4o', 'claude-3-5-sonnet', 'gemini-1-5-pro', 'Others'],
          datasets: [{
            data: [11.20, 5.62, 1.15, 0.45],
            backgroundColor: piePalette,
            borderColor: pieBorder,
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

