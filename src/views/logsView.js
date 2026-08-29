/**
 * AgentLens - Logs Explorer View Module
 * With Live Dynamic Filtering, Trace ID Copying, and Empty States
 */

window.LogsView = {
  currentFilters: {
    search: '',
    level: 'all'
  },

  defaultLogs: [
    {
      time: '11:30:12.040',
      level: 'INFO',
      agent: 'ResearchAgent',
      message: 'Initializing agent execution context for prompt query.',
      traceId: '8fa21c90e4a7'
    },
    {
      time: '11:30:12.080',
      level: 'DEBUG',
      agent: 'gpt-4o',
      message: 'Dispatched prompt payload to OpenAI API endpoint (1,233 input tokens).',
      traceId: '8fa21c90e4a7'
    },
    {
      time: '11:30:12.620',
      level: 'INFO',
      agent: 'WebSearch',
      message: 'Arxiv HTTP API query completed with 200 OK in 420ms.',
      traceId: '8fa21c90e4a7'
    },
    {
      time: '11:28:50.410',
      level: 'ERROR',
      agent: 'CodeInterpreter',
      message: 'TimeoutError: Command execution timed out after 5000ms SLA.',
      traceId: '3bf94d12c8e1'
    },
    {
      time: '11:27:30.120',
      level: 'WARN',
      agent: 'SupportAgent',
      message: 'Context window utilization reached 84% of max tokens limit.',
      traceId: '7ca19d45e219'
    },
    {
      time: '11:25:18.902',
      level: 'INFO',
      agent: 'PlannerAgent',
      message: 'Multi-step execution plan successfully decomposed into 4 parallel tasks.',
      traceId: '1ea94b22c091'
    },
    {
      time: '11:24:05.311',
      level: 'DEBUG',
      agent: 'VectorRetrieval',
      message: 'Embedded 3 query chunks with text-embedding-3-small (cosine sim: 0.89).',
      traceId: '1ea94b22c091'
    },
    {
      time: '11:22:45.710',
      level: 'ERROR',
      agent: 'DatabaseQuery',
      message: 'ConnectionRefused: Read replica connection pool exhausted under burst.',
      traceId: '5de88a91b344'
    }
  ],

  render: function(container) {
    this.container = container;
    const filtered = this.getFilteredLogs();

    container.innerHTML = `
      <div class="space-y-6 font-sans">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-white tracking-tight font-display">HIGH-DENSITY LOGS STREAM EXPLORER</h1>
            <p class="text-xs text-zinc-400 mt-1">Structured agent execution logs stream correlated with OTLP trace and span context</p>
          </div>

          <div class="flex items-center gap-2">
            <div class="relative">
              <input 
                type="text" 
                id="log-search-input" 
                value="${this.currentFilters.search}" 
                placeholder="Filter logs by keyword, agent, or trace ID..." 
                class="bg-surfaceElevated border border-surfaceBorder rounded-xl px-3 py-2 pl-8 text-xs text-zinc-200 focus:outline-none focus:border-brandBlue w-64"
              >
              <i data-lucide="search" class="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5"></i>
            </div>
            <select id="log-level-select" class="bg-surfaceElevated text-xs text-zinc-200 border border-surfaceBorder rounded-xl px-3 py-2 focus:outline-none focus:border-brandBlue">
              <option value="all" ${this.currentFilters.level === 'all' ? 'selected' : ''}>All Log Levels</option>
              <option value="ERROR" ${this.currentFilters.level === 'ERROR' ? 'selected' : ''}>ERROR Only</option>
              <option value="WARN" ${this.currentFilters.level === 'WARN' ? 'selected' : ''}>WARN Only</option>
              <option value="INFO" ${this.currentFilters.level === 'INFO' ? 'selected' : ''}>INFO Only</option>
              <option value="DEBUG" ${this.currentFilters.level === 'DEBUG' ? 'selected' : ''}>DEBUG Only</option>
            </select>
          </div>
        </div>

        <!-- High-Density Terminal Log Stream Table -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-4 font-mono text-xs overflow-x-auto shadow-xl leading-relaxed">
          <div id="logs-container" class="space-y-1.5">
            ${this.renderLogRows(filtered)}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();

    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
    }, 50);
  },

  getFilteredLogs: function() {
    const { search, level } = this.currentFilters;
    const q = search.toLowerCase().trim();

    return this.defaultLogs.filter(log => {
      if (level !== 'all' && log.level !== level) return false;
      if (q) {
        const matchesMsg = log.message.toLowerCase().includes(q);
        const matchesAgent = log.agent.toLowerCase().includes(q);
        const matchesTrace = log.traceId.toLowerCase().includes(q);
        if (!matchesMsg && !matchesAgent && !matchesTrace) return false;
      }
      return true;
    });
  },

  renderLogRows: function(logs) {
    if (!logs || logs.length === 0) {
      return `
        <div class="py-14 px-4 text-center">
          <div class="max-w-sm mx-auto space-y-3 font-sans">
            <div class="w-12 h-12 rounded-2xl bg-surfaceElevated border border-surfaceBorder flex items-center justify-center mx-auto text-zinc-400">
              <i data-lucide="file-search" class="w-6 h-6"></i>
            </div>
            <div class="space-y-1">
              <div class="font-bold text-white text-sm">No matching log records</div>
              <p class="text-xs text-zinc-400">No log entries matched your keyword or level filter.</p>
            </div>
            <button onclick="window.LogsView.resetFilters()" class="px-4 py-2 rounded-xl bg-brandBlue hover:bg-brandBlueHover text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-brandBlue/20">
              Clear Filters
            </button>
          </div>
        </div>
      `;
    }

    return logs.map(log => {
      let levelBadge = '';
      let rowBg = 'hover:bg-surfaceElevated/60';

      if (log.level === 'ERROR') {
        levelBadge = '<span class="px-1.5 py-0.5 rounded text-[10px] bg-rose-500/15 text-rose-400 font-bold border border-rose-500/30">ERROR</span>';
        rowBg = 'bg-rose-500/5 hover:bg-rose-500/10 border-l-2 border-rose-500';
      } else if (log.level === 'WARN') {
        levelBadge = '<span class="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30">WARN</span>';
      } else if (log.level === 'DEBUG') {
        levelBadge = '<span class="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/15 text-purple-400 font-bold border border-purple-500/30">DEBUG</span>';
      } else {
        levelBadge = '<span class="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/15 text-blue-400 font-bold border border-blue-500/30">INFO</span>';
      }

      return `
        <div class="flex items-center gap-3 py-2 px-3 border-b border-surfaceBorder/40 rounded-lg transition-colors ${rowBg}">
          <span class="text-zinc-500 text-[11px] select-none">${log.time}</span>
          ${levelBadge}
          <span class="text-cyan-400 font-semibold">[${log.agent}]</span>
          <span class="text-zinc-200 flex-1 truncate">${log.message}</span>
          <div class="flex items-center gap-1 ml-auto text-[11px]">
            <a href="#/traces/${log.traceId}" class="text-blue-400 hover:underline">trace:${log.traceId}</a>
            <button 
              onclick="navigator.clipboard.writeText('${log.traceId}'); window.AgentLensApp.showToast('Copied Trace ID #${log.traceId}', 'info');" 
              title="Copy Trace ID" 
              class="p-1 text-zinc-500 hover:text-white rounded hover:bg-surfaceElevated cursor-pointer transition-colors"
            >
              <i data-lucide="copy" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  bindEvents: function() {
    const input = document.getElementById('log-search-input');
    const select = document.getElementById('log-level-select');

    const update = () => {
      this.currentFilters.search = input ? input.value : '';
      this.currentFilters.level = select ? select.value : 'all';

      const filtered = this.getFilteredLogs();
      const container = document.getElementById('logs-container');
      if (container) {
        container.innerHTML = this.renderLogRows(filtered);
        if (window.lucide) lucide.createIcons();
      }
    };

    if (input) input.oninput = update;
    if (select) select.onchange = update;
  },

  resetFilters: function() {
    this.currentFilters = { search: '', level: 'all' };
    if (this.container) this.render(this.container);
  }
};
