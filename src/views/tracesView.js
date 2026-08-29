/**
 * AgentLens - Traces Explorer View Module
 */

window.TracesView = {
  render: function(container) {
    const traces = window.AgentLensData.traces;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-white tracking-tight">DISTRIBUTED TRACES EXPLORER</h1>
            <p class="text-xs text-zinc-400 mt-1">Deep inspection of individual agent trace runs, spans, LLM calls, and tools</p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="window.AgentLensApp.showToast('Exporting traces to CSV...', 'info')" class="px-3 py-1.5 rounded-lg bg-surfaceElevated border border-surfaceBorder hover:border-zinc-500 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all">
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>Export CSV</span>
            </button>
            <button onclick="window.AgentLensApp.showToast('Exporting telemetry JSON...', 'info')" class="px-3 py-1.5 rounded-lg bg-surfaceElevated border border-surfaceBorder hover:border-zinc-500 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all">
              <i data-lucide="file-code" class="w-4 h-4"></i>
              <span>Export OTLP JSON</span>
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <!-- Search Trace ID or Prompt -->
            <div class="relative">
              <input type="text" id="trace-search-input" placeholder="Search Trace ID or Prompt..." class="w-full bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-brandBlue pl-8">
              <i data-lucide="search" class="w-4 h-4 text-zinc-400 absolute left-2.5 top-2.5"></i>
            </div>

            <!-- Agent Filter -->
            <div>
              <select id="filter-agent" class="w-full bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-brandBlue">
                <option value="all">All Agents</option>
                <option value="ResearchAgent">ResearchAgent</option>
                <option value="SupportAgent">SupportAgent</option>
                <option value="PlannerAgent">PlannerAgent</option>
                <option value="CodeAgent">CodeAgent</option>
              </select>
            </div>

            <!-- Status Filter -->
            <div>
              <select id="filter-status" class="w-full bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-brandBlue">
                <option value="all">All Statuses</option>
                <option value="SUCCESS">Success Only</option>
                <option value="ERROR">Error Only</option>
                <option value="RUNNING">Running Only</option>
              </select>
            </div>

            <!-- Model Filter -->
            <div>
              <select id="filter-model" class="w-full bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-brandBlue">
                <option value="all">All Models</option>
                <option value="gpt-4o">gpt-4o</option>
                <option value="claude-3-5-sonnet">claude-3-5-sonnet</option>
              </select>
            </div>

            <!-- Tool Filter -->
            <div>
              <select id="filter-tool" class="w-full bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-brandBlue">
                <option value="all">All Tools</option>
                <option value="WebSearch">WebSearch</option>
                <option value="CodeInterpreter">CodeInterpreter</option>
                <option value="DatabaseQuery">DatabaseQuery</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Traces Table -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl overflow-hidden shadow-lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-surfaceBorder bg-black/50 text-zinc-400 font-mono text-[10px] uppercase">
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
              <tbody class="divide-y divide-surfaceBorder text-zinc-200 font-mono">
                ${traces.map(t => `
                  <tr class="hover:bg-surfaceElevated/60 transition-colors cursor-pointer" onclick="window.location.hash='#/traces/${t.traceId}'">
                    <td class="py-3.5 px-4 font-bold text-white">
                      ${t.traceId}
                    </td>
                    <td class="py-3.5 px-4 font-sans font-semibold text-white flex items-center gap-2">
                      <div class="w-6 h-6 rounded bg-surfaceElevated border border-surfaceBorder flex items-center justify-center text-white">
                        <i data-lucide="bot" class="w-3.5 h-3.5"></i>
                      </div>
                      <span>${t.agentName}</span>
                    </td>
                    <td class="py-3.5 px-4">
                      ${t.status === 'SUCCESS' ? `
                        <span class="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white border border-white/20 font-semibold font-mono">
                          SUCCESS
                        </span>
                      ` : `
                        <span class="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700 font-semibold font-mono">
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
                    <td class="py-3.5 px-4">
                      <a href="#/traces/${t.traceId}" class="px-2.5 py-1 rounded bg-white/10 hover:bg-white hover:text-black text-white font-sans font-semibold text-xs border border-white/20 transition-all inline-block">
                        Inspect →
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

    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
    }, 50);
  }
};

