/**
 * AgentLens - Traces Explorer View Module
 * With Live Dynamic Filtering, Copy Actions, Trace Exporters, and Empty States
 */

window.TracesView = {
  currentFilters: {
    search: '',
    agent: 'all',
    status: 'all',
    model: 'all',
    tool: 'all'
  },

  render: function(container) {
    this.container = container;
    const traces = this.getFilteredTraces();

    container.innerHTML = `
      <div class="space-y-6 font-sans">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-white tracking-tight font-display">DISTRIBUTED TRACES EXPLORER</h1>
            <p class="text-xs text-zinc-400 mt-1">Deep inspection of individual agent trace runs, spans, LLM calls, and tools</p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="window.TracesView.exportCsv()" class="px-3 py-1.5 rounded-lg bg-surfaceElevated border border-surfaceBorder hover:border-brandBlue text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all cursor-pointer">
              <i data-lucide="download" class="w-4 h-4 text-brandCyan"></i>
              <span>Export CSV</span>
            </button>
            <button onclick="window.TracesView.exportJson()" class="px-3 py-1.5 rounded-lg bg-surfaceElevated border border-surfaceBorder hover:border-brandBlue text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all cursor-pointer">
              <i data-lucide="file-code" class="w-4 h-4 text-brandBlue"></i>
              <span>Export OTLP JSON</span>
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-3 shadow-md">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <!-- Search Trace ID or Prompt -->
            <div class="relative">
              <input type="text" id="trace-search-input" value="${this.currentFilters.search}" placeholder="Search Trace ID, agent, or prompt..." class="w-full bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-brandBlue pl-8">
              <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-2.5 top-2.5"></i>
            </div>

            <!-- Agent Filter -->
            <div>
              <select id="filter-agent" class="w-full bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-brandBlue">
                <option value="all" ${this.currentFilters.agent === 'all' ? 'selected' : ''}>All Agents</option>
                <option value="ResearchAgent" ${this.currentFilters.agent === 'ResearchAgent' ? 'selected' : ''}>ResearchAgent</option>
                <option value="SupportAgent" ${this.currentFilters.agent === 'SupportAgent' ? 'selected' : ''}>SupportAgent</option>
                <option value="PlannerAgent" ${this.currentFilters.agent === 'PlannerAgent' ? 'selected' : ''}>PlannerAgent</option>
                <option value="CodeAgent" ${this.currentFilters.agent === 'CodeAgent' ? 'selected' : ''}>CodeAgent</option>
              </select>
            </div>

            <!-- Status Filter -->
            <div>
              <select id="filter-status" class="w-full bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-brandBlue">
                <option value="all" ${this.currentFilters.status === 'all' ? 'selected' : ''}>All Statuses</option>
                <option value="SUCCESS" ${this.currentFilters.status === 'SUCCESS' ? 'selected' : ''}>Success Only</option>
                <option value="ERROR" ${this.currentFilters.status === 'ERROR' ? 'selected' : ''}>Error Only</option>
                <option value="RUNNING" ${this.currentFilters.status === 'RUNNING' ? 'selected' : ''}>Running Only</option>
              </select>
            </div>

            <!-- Model Filter -->
            <div>
              <select id="filter-model" class="w-full bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-brandBlue">
                <option value="all" ${this.currentFilters.model === 'all' ? 'selected' : ''}>All Models</option>
                <option value="gpt-4o" ${this.currentFilters.model === 'gpt-4o' ? 'selected' : ''}>gpt-4o</option>
                <option value="claude-3-5-sonnet" ${this.currentFilters.model === 'claude-3-5-sonnet' ? 'selected' : ''}>claude-3-5-sonnet</option>
              </select>
            </div>

            <!-- Tool Filter -->
            <div>
              <select id="filter-tool" class="w-full bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-brandBlue">
                <option value="all" ${this.currentFilters.tool === 'all' ? 'selected' : ''}>All Tools</option>
                <option value="WebSearch" ${this.currentFilters.tool === 'WebSearch' ? 'selected' : ''}>WebSearch</option>
                <option value="CodeInterpreter" ${this.currentFilters.tool === 'CodeInterpreter' ? 'selected' : ''}>CodeInterpreter</option>
                <option value="DatabaseQuery" ${this.currentFilters.tool === 'DatabaseQuery' ? 'selected' : ''}>DatabaseQuery</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Traces Table -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl overflow-hidden shadow-lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-surfaceBorder bg-surfaceElevated/50 text-zinc-400 font-mono text-[10px] uppercase">
                  <th class="py-3.5 px-4">TRACE ID</th>
                  <th class="py-3.5 px-4">AGENT</th>
                  <th class="py-3.5 px-4">STATUS</th>
                  <th class="py-3.5 px-4">DURATION</th>
                  <th class="py-3.5 px-4">SPANS</th>
                  <th class="py-3.5 px-4">TOTAL TOKENS</th>
                  <th class="py-3.5 px-4">EST. COST</th>
                  <th class="py-3.5 px-4">MODEL & PROMPT</th>
                  <th class="py-3.5 px-4">STARTED</th>
                  <th class="py-3.5 px-4">ACTION</th>
                </tr>
              </thead>
              <tbody id="traces-table-body" class="divide-y divide-surfaceBorder text-zinc-200 font-mono">
                ${this.renderTableRows(traces)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();

    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
    }, 50);
  },

  getFilteredTraces: function() {
    let traces = window.AgentLensData ? window.AgentLensData.traces : [];
    const { search, agent, status, model, tool } = this.currentFilters;

    return traces.filter(t => {
      if (search) {
        const q = search.toLowerCase();
        const matchesId = t.traceId.toLowerCase().includes(q);
        const matchesAgent = t.agentName.toLowerCase().includes(q);
        const matchesPrompt = t.promptName && t.promptName.toLowerCase().includes(q);
        if (!matchesId && !matchesAgent && !matchesPrompt) return false;
      }
      if (agent !== 'all' && t.agentName !== agent) return false;
      if (status !== 'all' && t.status !== status) return false;
      if (model !== 'all' && t.model !== model) return false;
      if (tool !== 'all' && (!t.toolsUsed || !t.toolsUsed.includes(tool))) return false;
      return true;
    });
  },

  renderTableRows: function(traces) {
    if (!traces || traces.length === 0) {
      return `
        <tr>
          <td colspan="10" class="py-14 px-4 text-center">
            <div class="max-w-sm mx-auto space-y-3">
              <div class="w-12 h-12 rounded-2xl bg-surfaceElevated border border-surfaceBorder flex items-center justify-center mx-auto text-zinc-400 shadow-inner">
                <i data-lucide="filter-x" class="w-6 h-6 text-zinc-400"></i>
              </div>
              <div class="space-y-1">
                <div class="font-bold text-white text-sm font-sans">No matching traces found</div>
                <p class="text-xs text-zinc-400 font-sans">No telemetry traces match your active filters. Try searching for a different ID, agent, or prompt.</p>
              </div>
              <button onclick="window.TracesView.resetFilters()" class="px-4 py-2 rounded-xl bg-brandBlue hover:bg-brandBlueHover text-white text-xs font-semibold font-sans transition-all cursor-pointer shadow-md shadow-brandBlue/20">
                Reset All Filters
              </button>
            </div>
          </td>
        </tr>
      `;
    }

    return traces.map(t => `
      <tr class="hover:bg-surfaceElevated/60 transition-colors cursor-pointer" onclick="window.location.hash='#/traces/${t.traceId}'">
        <td class="py-3.5 px-4 font-bold text-white">
          <div class="flex items-center gap-1.5">
            <span>${t.traceId}</span>
            <button 
              onclick="event.stopPropagation(); window.TracesView.copyTraceId('${t.traceId}')" 
              title="Copy Trace ID" 
              class="p-1 rounded text-zinc-400 hover:text-white hover:bg-surfaceElevated transition-all cursor-pointer"
            >
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
        <td class="py-3.5 px-4 font-sans font-semibold text-white flex items-center gap-2">
          <div class="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <i data-lucide="bot" class="w-3.5 h-3.5"></i>
          </div>
          <span>${t.agentName}</span>
        </td>
        <td class="py-3.5 px-4">
          ${t.status === 'SUCCESS' ? `
            <span class="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold font-mono">
              SUCCESS
            </span>
          ` : `
            <span class="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold font-mono">
              ERROR
            </span>
          `}
        </td>
        <td class="py-3.5 px-4 text-white font-semibold">${t.duration}s</td>
        <td class="py-3.5 px-4 text-zinc-400">${t.spansCount} spans</td>
        <td class="py-3.5 px-4 text-zinc-300">${t.totalTokens.toLocaleString()}</td>
        <td class="py-3.5 px-4 text-white font-semibold">$${t.estimatedCost.toFixed(3)}</td>
        <td class="py-3.5 px-4 text-zinc-400 font-sans">
          <div class="text-zinc-200">${t.model}</div>
          <div class="text-[10px] text-zinc-400 font-mono">${t.promptName}</div>
        </td>
        <td class="py-3.5 px-4 text-zinc-400 font-sans">${t.startTime}</td>
        <td class="py-3.5 px-4 font-sans">
          <a href="#/traces/${t.traceId}" class="px-2.5 py-1 rounded bg-brandBlue/10 hover:bg-brandBlue hover:text-white text-brandBlue text-xs border border-brandBlue/30 transition-all inline-block font-semibold">
            Inspect →
          </a>
        </td>
      </tr>
    `).join('');
  },

  bindEvents: function() {
    const searchInput = document.getElementById('trace-search-input');
    const agentSelect = document.getElementById('filter-agent');
    const statusSelect = document.getElementById('filter-status');
    const modelSelect = document.getElementById('filter-model');
    const toolSelect = document.getElementById('filter-tool');

    const update = () => {
      this.currentFilters.search = searchInput ? searchInput.value : '';
      this.currentFilters.agent = agentSelect ? agentSelect.value : 'all';
      this.currentFilters.status = statusSelect ? statusSelect.value : 'all';
      this.currentFilters.model = modelSelect ? modelSelect.value : 'all';
      this.currentFilters.tool = toolSelect ? toolSelect.value : 'all';

      const filtered = this.getFilteredTraces();
      const tbody = document.getElementById('traces-table-body');
      if (tbody) {
        tbody.innerHTML = this.renderTableRows(filtered);
        if (window.lucide) lucide.createIcons();
      }
    };

    if (searchInput) searchInput.oninput = update;
    if (agentSelect) agentSelect.onchange = update;
    if (statusSelect) statusSelect.onchange = update;
    if (modelSelect) modelSelect.onchange = update;
    if (toolSelect) toolSelect.onchange = update;
  },

  copyTraceId: function(traceId) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(traceId).then(() => {
        if (window.AgentLensApp && window.AgentLensApp.showToast) {
          window.AgentLensApp.showToast(`Copied Trace ID: ${traceId}`, 'info');
        }
      });
    }
  },

  resetFilters: function() {
    this.currentFilters = { search: '', agent: 'all', status: 'all', model: 'all', tool: 'all' };
    if (this.container) this.render(this.container);
  },

  exportCsv: function() {
    const traces = this.getFilteredTraces();
    if (!traces.length) {
      if (window.AgentLensApp) window.AgentLensApp.showToast('No traces to export', 'error');
      return;
    }

    const headers = ['traceId', 'agentName', 'status', 'duration', 'spansCount', 'totalTokens', 'estimatedCost', 'model', 'promptName', 'startTime'];
    const csvRows = [headers.join(',')];

    traces.forEach(t => {
      const values = [
        t.traceId,
        `"${t.agentName}"`,
        t.status,
        t.duration,
        t.spansCount,
        t.totalTokens,
        t.estimatedCost,
        t.model,
        `"${t.promptName || ''}"`,
        `"${t.startTime || ''}"`
      ];
      csvRows.push(values.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agentlens_traces_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    if (window.AgentLensApp && window.AgentLensApp.showToast) {
      window.AgentLensApp.showToast(`Exported ${traces.length} traces as CSV`, 'success');
    }
  },

  exportJson: function() {
    const traces = this.getFilteredTraces();
    if (!traces.length) {
      if (window.AgentLensApp) window.AgentLensApp.showToast('No traces to export', 'error');
      return;
    }

    const blob = new Blob([JSON.stringify(traces, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agentlens_traces_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    if (window.AgentLensApp && window.AgentLensApp.showToast) {
      window.AgentLensApp.showToast(`Exported ${traces.length} traces as OTLP JSON`, 'success');
    }
  }
};
