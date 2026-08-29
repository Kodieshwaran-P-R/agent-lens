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
            <input type="text" id="agent-search-input" placeholder="Filter agents by name or tool..." class="bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brandBlue">
            <select class="bg-surfaceElevated text-xs text-slate-200 border border-surfaceBorder rounded-lg px-3 py-1.5 focus:outline-none">
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
                <tr class="border-b border-surfaceBorder bg-bgDark/50 text-slate-400 font-mono">
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
              <tbody class="divide-y divide-surfaceBorder text-slate-200">
                ${agents.map(agent => `
                  <tr class="hover:bg-surfaceElevated/60 transition-colors group">
                    <td class="py-3.5 px-4 font-semibold text-slate-100 flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-surfaceElevated border border-surfaceBorder flex items-center justify-center text-brandBlue group-hover:border-brandBlue/50 transition-colors">
                        <i data-lucide="bot" class="w-4 h-4"></i>
                      </div>
                      <div>
                        <a href="#/agents/${agent.id}" class="hover:text-brandBlue font-bold text-sm transition-colors">${agent.name}</a>
                        <div class="text-[10px] text-slate-400 font-mono">${agent.version} | ${agent.model}</div>
                      </div>
                    </td>
                    <td class="py-3.5 px-4 font-mono text-slate-400">
                      <span class="px-2 py-0.5 rounded text-[10px] uppercase bg-surfaceElevated border border-surfaceBorder">${agent.environment}</span>
                    </td>
                    <td class="py-3.5 px-4">
                      ${agent.status === 'HEALTHY' ? `
                        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono bg-statusSuccess/10 text-statusSuccess border border-statusSuccess/30">
                          ● Healthy
                        </span>
                      ` : agent.status === 'WARNING' ? `
                        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono bg-statusWarning/10 text-statusWarning border border-statusWarning/30">
                          ▲ Warning
                        </span>
                      ` : `
                        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono bg-statusError/10 text-statusError border border-statusError/30">
                          ✖ Critical
                        </span>
                      `}
                    </td>
                    <td class="py-3.5 px-4 font-mono text-slate-300">${agent.executions.toLocaleString()}</td>
                    <td class="py-3.5 px-4 font-mono font-medium ${agent.successRate > 98 ? 'text-statusSuccess' : 'text-statusWarning'}">${agent.successRate}%</td>
                    <td class="py-3.5 px-4 font-mono text-slate-300">${agent.avgLatency}s</td>
                    <td class="py-3.5 px-4 font-mono text-slate-400">${agent.p95Latency}s</td>
                    <td class="py-3.5 px-4 font-mono text-slate-300">${agent.totalTokens}</td>
                    <td class="py-3.5 px-4 font-mono text-slate-300">$${agent.cost.toFixed(2)}</td>
                    <td class="py-3.5 px-4 font-mono ${agent.errors > 30 ? 'text-statusError font-bold' : 'text-slate-400'}">${agent.errors}</td>
                    <td class="py-3.5 px-4">
                      <a href="#/agents/${agent.id}" class="px-2.5 py-1 rounded bg-surfaceElevated hover:bg-brandBlue text-slate-200 hover:text-white font-medium text-xs border border-surfaceBorder transition-all inline-block">
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

    setTimeout(() => lucide.createIcons(), 50);
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
