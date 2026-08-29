/**
 * AgentLens - Agents Inventory & Detail View Module
 */

window.AgentsView = {
  render: function(container, agentId) {
    if (agentId) {
      this.renderDetail(container, agentId);
    } else {
      this.renderList(container);
    }
  },

  renderList: function(container) {
    const agents = window.AgentLensData.agents;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">AGENT INVENTORY & HEALTH</h1>
            <p class="text-xs text-slate-400 mt-1">24 total registered agents across Production, Staging, and Development</p>
          </div>

          <div class="flex items-center gap-3">
            <input type="text" id="agent-search-input" placeholder="Filter agents by name, model, or tool..." class="bg-surfaceElevated border border-surfaceBorder rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-brandBlue w-56">
            <select id="agent-env-select" class="bg-surfaceElevated text-xs text-zinc-200 border border-surfaceBorder rounded-xl px-3 py-1.5 focus:outline-none focus:border-brandBlue">
              <option value="all">All Environments</option>
              <option value="production">Production</option>
              <option value="staging">Staging</option>
            </select>
          </div>
        </div>

        <!-- Agents Grid / Table -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl overflow-hidden shadow-lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-surfaceBorder bg-surfaceElevated/50 text-zinc-400 font-mono text-[10px] uppercase">
                  <th class="py-3.5 px-4">AGENT NAME & VERSION</th>
                  <th class="py-3.5 px-4">ENV</th>
                  <th class="py-3.5 px-4">STATUS</th>
                  <th class="py-3.5 px-4">EXECUTIONS</th>
                  <th class="py-3.5 px-4">SUCCESS RATE</th>
                  <th class="py-3.5 px-4">AVG LATENCY</th>
                  <th class="py-3.5 px-4">P95</th>
                  <th class="py-3.5 px-4">TOKENS</th>
                  <th class="py-3.5 px-4">COST</th>
                  <th class="py-3.5 px-4">ERRORS</th>
                  <th class="py-3.5 px-4">ACTION</th>
                </tr>
              </thead>
              <tbody id="agents-table-body" class="divide-y divide-surfaceBorder text-zinc-200 font-mono">
                ${this.renderAgentRows(agents)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.bindAgentListEvents();

    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
    }, 50);
  },

  renderAgentRows: function(agents) {
    if (!agents || agents.length === 0) {
      return `
        <tr>
          <td colspan="11" class="py-14 px-4 text-center">
            <div class="max-w-sm mx-auto space-y-3 font-sans">
              <div class="w-12 h-12 rounded-2xl bg-surfaceElevated border border-surfaceBorder flex items-center justify-center mx-auto text-zinc-400">
                <i data-lucide="bot-off" class="w-6 h-6"></i>
              </div>
              <div class="space-y-1">
                <div class="font-bold text-white text-sm">No matching agents found</div>
                <p class="text-xs text-zinc-400">No registered agents match your current keyword or environment filter.</p>
              </div>
              <button onclick="document.getElementById('agent-search-input').value=''; document.getElementById('agent-env-select').value='all'; window.AgentsView.renderList(document.getElementById('view-container'));" class="px-4 py-2 rounded-xl bg-brandBlue hover:bg-brandBlueHover text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-brandBlue/20">
                Reset Filters
              </button>
            </div>
          </td>
        </tr>
      `;
    }

    return agents.map(agent => `
      <tr class="hover:bg-surfaceElevated/60 transition-colors group">
        <td class="py-3.5 px-4 font-semibold text-white flex items-center gap-3 font-sans">
          <div class="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:border-brandBlue/50 transition-colors">
            <i data-lucide="bot" class="w-4 h-4"></i>
          </div>
          <div>
            <a href="#/agents/${agent.id}" class="hover:text-brandBlue font-bold text-sm transition-colors text-white">${agent.name}</a>
            <div class="text-[10px] text-zinc-400 font-mono">${agent.version} | ${agent.model}</div>
          </div>
        </td>
        <td class="py-3.5 px-4 font-mono text-zinc-400">
          <span class="px-2 py-0.5 rounded text-[10px] uppercase bg-surfaceElevated border border-surfaceBorder">${agent.environment}</span>
        </td>
        <td class="py-3.5 px-4">
          ${agent.status === 'HEALTHY' ? `
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ● Healthy
            </span>
          ` : agent.status === 'WARNING' ? `
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
              ▲ Warning
            </span>
          ` : `
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
              ✖ Critical
            </span>
          `}
        </td>
        <td class="py-3.5 px-4 font-mono text-zinc-300">${agent.executions.toLocaleString()}</td>
        <td class="py-3.5 px-4 font-mono font-medium ${agent.successRate > 98 ? 'text-emerald-400' : 'text-amber-400'}">${agent.successRate}%</td>
        <td class="py-3.5 px-4 font-mono text-zinc-300">${agent.avgLatency}s</td>
        <td class="py-3.5 px-4 font-mono text-zinc-400">${agent.p95Latency}s</td>
        <td class="py-3.5 px-4 font-mono text-zinc-300">${agent.totalTokens}</td>
        <td class="py-3.5 px-4 font-mono text-zinc-300">$${agent.cost.toFixed(2)}</td>
        <td class="py-3.5 px-4 font-mono ${agent.errors > 30 ? 'text-rose-400 font-bold' : 'text-zinc-400'}">${agent.errors}</td>
        <td class="py-3.5 px-4 font-sans">
          <a href="#/agents/${agent.id}" class="px-2.5 py-1 rounded bg-brandBlue/10 hover:bg-brandBlue text-brandBlue hover:text-white font-medium text-xs border border-brandBlue/30 transition-all inline-block font-semibold">
            Inspect
          </a>
        </td>
      </tr>
    `).join('');
  },

  bindAgentListEvents: function() {
    const input = document.getElementById('agent-search-input');
    const envSelect = document.getElementById('agent-env-select');

    const update = () => {
      const q = (input ? input.value : '').toLowerCase().trim();
      const env = envSelect ? envSelect.value : 'all';

      const filtered = window.AgentLensData.agents.filter(a => {
        if (env !== 'all' && a.environment !== env) return false;
        if (q) {
          const matchesName = a.name.toLowerCase().includes(q);
          const matchesModel = a.model.toLowerCase().includes(q);
          const matchesTool = a.primaryTool && a.primaryTool.toLowerCase().includes(q);
          if (!matchesName && !matchesModel && !matchesTool) return false;
        }
        return true;
      });

      const tbody = document.getElementById('agents-table-body');
      if (tbody) {
        tbody.innerHTML = this.renderAgentRows(filtered);
        if (window.lucide) lucide.createIcons();
      }
    };

    if (input) input.oninput = update;
    if (envSelect) envSelect.onchange = update;
  },

  renderDetail: function(container, agentId) {
    const agent = window.AgentLensData.agents.find(a => a.id === agentId) || window.AgentLensData.agents[0];

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Breadcrumb & Back -->
        <div class="flex items-center gap-2 text-xs font-mono text-slate-400">
          <a href="#/agents" class="hover:text-brandBlue transition-colors">Agents</a>
          <span>/</span>
          <span class="text-slate-200 font-semibold">${agent.name}</span>
        </div>

        <!-- Detail Header Banner -->
        <div class="bg-surfaceDark border border-surfaceBorder p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-brandBlue to-brandPurple p-0.5 shadow-glow-blue flex-shrink-0">
              <div class="w-full h-full bg-surfaceDark rounded-[10px] flex items-center justify-center">
                <i data-lucide="bot" class="w-6 h-6 text-brandBlue"></i>
              </div>
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-3">
                <h1 class="text-2xl font-bold text-slate-100 tracking-tight">${agent.name}</h1>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono bg-brandBlue/10 text-brandBlue border border-brandBlue/30">${agent.version}</span>
                <span class="px-2.5 py-0.5 rounded text-xs font-mono bg-statusSuccess/10 text-statusSuccess border border-statusSuccess/30">● Healthy</span>
              </div>
              <p class="text-xs text-slate-400 max-w-2xl">${agent.description}</p>
              <div class="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <span>Model: <strong class="text-slate-200">${agent.model}</strong></span>
                <span>Primary Tool: <strong class="text-slate-200">${agent.primaryTool}</strong></span>
                <span>Env: <strong class="text-slate-200 uppercase">${agent.environment}</strong></span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="window.location.hash='#/traces'" class="px-3.5 py-2 rounded-lg bg-brandBlue hover:bg-brandBlueHover text-white text-xs font-semibold flex items-center gap-2 shadow-glow-blue transition-all">
              <i data-lucide="list-filter" class="w-4 h-4"></i>
              <span>View Filtered Traces</span>
            </button>
          </div>
        </div>

        <!-- 10 Sub Tabs -->
        <div class="flex border-b border-surfaceBorder overflow-x-auto text-xs font-medium text-slate-400 gap-6 scrollbar-thin">
          <button class="border-b-2 border-brandBlue text-brandBlue py-3 font-semibold">Overview</button>
          <button class="py-3 hover:text-slate-200">Executions (${agent.executions})</button>
          <button class="py-3 hover:text-slate-200">Traces</button>
          <button class="py-3 hover:text-slate-200">Performance & Latency</button>
          <button class="py-3 hover:text-slate-200">FinOps Costs ($${agent.cost})</button>
          <button class="py-3 hover:text-slate-200">Errors (${agent.errors})</button>
          <button class="py-3 hover:text-slate-200">Evaluations (94.2%)</button>
          <button class="py-3 hover:text-slate-200">Prompts (v1.4)</button>
          <button class="py-3 hover:text-slate-200">Tools (${agent.primaryTool})</button>
          <button class="py-3 hover:text-slate-200">Models (${agent.model})</button>
        </div>

        <!-- Overview Dashboard Cards for Agent -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-slate-400">Total Executions</div>
            <div class="text-2xl font-bold font-mono text-slate-100">${agent.executions.toLocaleString()}</div>
            <div class="text-[11px] text-statusSuccess">+14% vs last week</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-slate-400">Success Rate</div>
            <div class="text-2xl font-bold font-mono text-statusSuccess">${agent.successRate}%</div>
            <div class="text-[11px] text-slate-400">Target SLA: 99.0%</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-slate-400">Avg / P95 Latency</div>
            <div class="text-2xl font-bold font-mono text-brandPurple">${agent.avgLatency}s <span class="text-xs font-normal text-slate-400">/ ${agent.p95Latency}s</span></div>
            <div class="text-[11px] text-slate-400">-5% response time improvement</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-slate-400">Total Cost (24h)</div>
            <div class="text-2xl font-bold font-mono text-emerald-400">$${agent.cost.toFixed(2)}</div>
            <div class="text-[11px] text-slate-400">Tokens: ${agent.totalTokens}</div>
          </div>
        </div>

        <!-- Recent Traces for this agent -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4">
          <h3 class="font-bold text-sm text-slate-100">Recent Executions & Traces for ${agent.name}</h3>
          <div class="space-y-2 font-mono text-xs">
            <div class="p-3 bg-surfaceElevated rounded-lg border border-surfaceBorder flex items-center justify-between hover:border-brandBlue/50 transition-colors cursor-pointer" onclick="window.location.hash='#/traces/8fa21c90e4a7'">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-statusSuccess"></span>
                <span class="font-bold text-brandBlue">8fa21c90e4a7</span>
                <span class="text-slate-400 font-sans">Research paper search query on KV-cache</span>
              </div>
              <div class="flex items-center gap-4 text-slate-400">
                <span>1.82s</span>
                <span>2,431 tokens</span>
                <span class="text-emerald-400">$0.041</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
