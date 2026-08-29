/**
 * AgentLens - Trace Detail & Gantt Execution Waterfall Debugger Module
 */

window.TraceDetailView = {
  render: function(container, traceId) {
    const trace = window.AgentLensData.traces.find(t => t.traceId === traceId) || window.AgentLensData.traces[0];

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Trace Header Banner -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
              <a href="#/traces" class="hover:text-brandBlue transition-colors">Traces</a>
              <span>/</span>
              <span class="text-brandBlue font-bold">${trace.traceId}</span>
            </div>
            <div class="flex items-center gap-3">
              <h1 class="text-xl font-bold text-slate-100 font-mono">TRACE ID: ${trace.traceId}</h1>
              ${trace.status === 'SUCCESS' ? `
                <span class="px-2.5 py-0.5 rounded text-xs font-mono bg-statusSuccess/10 text-statusSuccess border border-statusSuccess/30 font-semibold">SUCCESS</span>
              ` : `
                <span class="px-2.5 py-0.5 rounded text-xs font-mono bg-statusError/10 text-statusError border border-statusError/30 font-semibold">ERROR</span>
              `}
              <span class="px-2 py-0.5 rounded text-xs font-mono bg-surfaceElevated text-slate-300 border border-surfaceBorder">${trace.agentName}</span>
            </div>
          </div>

          <div class="flex items-center gap-2.5">
            <button onclick="window.TraceDetailView.copyTraceId('${trace.traceId}')" class="px-3 py-1.5 rounded-lg bg-surfaceElevated border border-surfaceBorder hover:border-brandBlue text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all cursor-pointer">
              <i data-lucide="copy" class="w-4 h-4 text-brandBlue"></i>
              <span>Copy ID</span>
            </button>
            <button onclick="window.TraceDetailView.exportJson('${trace.traceId}')" class="px-3 py-1.5 rounded-lg bg-surfaceElevated border border-surfaceBorder hover:border-brandCyan text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all cursor-pointer">
              <i data-lucide="download" class="w-4 h-4 text-brandCyan"></i>
              <span>Download JSON</span>
            </button>
            <button onclick="window.AgentLensApp.showToast('Copied Trace URL to clipboard!', 'success')" class="px-3 py-1.5 rounded-lg bg-surfaceElevated border border-surfaceBorder hover:border-zinc-500 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all cursor-pointer">
              <i data-lucide="share-2" class="w-4 h-4 text-brandBlue"></i>
              <span>Share</span>
            </button>
            <button onclick="window.location.hash='#/graph'" class="px-3.5 py-1.5 rounded-lg bg-brandPurple hover:bg-brandPurple/90 text-white text-xs font-semibold flex items-center gap-2 shadow-glow-purple transition-all cursor-pointer">
              <i data-lucide="network" class="w-4 h-4"></i>
              <span>Execution Graph</span>
            </button>
          </div>
        </div>

        <!-- Metrics Strip -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl font-mono space-y-1">
            <div class="text-xs text-slate-400 font-sans">Total Duration</div>
            <div class="text-xl font-bold text-slate-100">${trace.duration}s</div>
            <div class="text-[10px] text-slate-400">Total execution latency</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl font-mono space-y-1">
            <div class="text-xs text-slate-400 font-sans">Total Tokens</div>
            <div class="text-xl font-bold text-brandBlue">${trace.totalTokens.toLocaleString()}</div>
            <div class="text-[10px] text-slate-400">In: ${trace.inputTokens} | Out: ${trace.outputTokens}</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl font-mono space-y-1">
            <div class="text-xs text-slate-400 font-sans">Estimated Cost</div>
            <div class="text-xl font-bold text-emerald-400">$${trace.estimatedCost.toFixed(4)}</div>
            <div class="text-[10px] text-slate-400">Model: ${trace.model}</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl font-mono space-y-1">
            <div class="text-xs text-slate-400 font-sans">Total Spans</div>
            <div class="text-xl font-bold text-brandPurple">${trace.spansCount} Spans</div>
            <div class="text-[10px] text-slate-400">Nested telemetry hierarchy</div>
          </div>
        </div>

        ${trace.error ? `
          <!-- Error Diagnostics Callout Box -->
          <div class="bg-statusError/10 border border-statusError/30 p-4 rounded-xl space-y-2">
            <div class="flex items-center gap-2 text-statusError font-bold text-sm">
              <i data-lucide="alert-octagon" class="w-5 h-5"></i>
              <span>Root Cause Exception Detected</span>
            </div>
            <p class="text-xs text-slate-200 font-mono bg-bgDark p-3 rounded border border-statusError/30 overflow-x-auto">
              ${trace.error}
            </p>
          </div>
        ` : ''}

        <!-- Visual Execution Waterfall Timeline (Gantt-Style) -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl overflow-hidden shadow-xl">
          <div class="p-4 border-b border-surfaceBorder flex items-center justify-between bg-surfaceElevated/50">
            <div>
              <h3 class="font-bold text-sm text-slate-100">Execution Waterfall Timeline</h3>
              <p class="text-xs text-slate-400">Click any span bar to inspect input/output payloads, attributes, and token costs</p>
            </div>

            <!-- Legend -->
            <div class="flex items-center gap-4 text-xs font-mono">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-brandPurple inline-block"></span> LLM Call</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> Tool Call</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-cyan-400 inline-block"></span> Database</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded bg-brandBlue inline-block"></span> Agent</span>
            </div>
          </div>

          <!-- Gantt Header Scale (0ms to total duration) -->
          <div class="border-b border-surfaceBorder px-4 py-2 bg-bgDark/60 flex items-center text-[11px] font-mono text-slate-400">
            <div class="w-80 flex-shrink-0">SPAN NAME & TYPE</div>
            <div class="flex-1 flex justify-between px-2">
              <span>0ms</span>
              <span>${(trace.duration * 250).toFixed(0)}ms</span>
              <span>${(trace.duration * 500).toFixed(0)}ms</span>
              <span>${(trace.duration * 750).toFixed(0)}ms</span>
              <span>${(trace.duration * 1000).toFixed(0)}ms</span>
            </div>
          </div>

          <!-- Gantt Spans Rows -->
          <div class="divide-y divide-surfaceBorder font-mono text-xs">
            ${this.renderSpanRows(trace.rootSpan, trace.duration * 1000)}
          </div>
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  },

  renderSpanRows: function(span, totalDurationMs, depth = 0) {
    if (!span) return '';

    const indentPx = depth * 24;
    const startPct = Math.max(0, Math.min(95, (span.startTimeMs / totalDurationMs) * 100));
    const widthPct = Math.max(2, Math.min(100 - startPct, (span.durationMs / totalDurationMs) * 100));

    let colorClass = 'bg-brandBlue';
    if (span.type === 'LLM') colorClass = 'bg-brandPurple';
    if (span.type === 'TOOL') colorClass = span.status === 'ERROR' ? 'bg-statusError' : 'bg-emerald-500';
    if (span.type === 'DATABASE') colorClass = 'bg-cyan-400';

    let html = `
      <div class="p-3 hover:bg-surfaceElevated/60 transition-colors flex items-center cursor-pointer group" onclick="window.AgentLensApp.openSpanInspector('${span.spanId}')">
        <!-- Left: Span Name & Details -->
        <div class="w-80 flex-shrink-0 flex items-center gap-2 pr-4 truncate" style="padding-left: ${indentPx}px">
          ${span.children && span.children.length > 0 ? `
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></i>
          ` : `
            <i data-lucide="minus" class="w-3.5 h-3.5 text-slate-600 flex-shrink-0"></i>
          `}
          <span class="font-semibold text-slate-100 truncate">${span.name}</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-surfaceElevated text-slate-400 border border-surfaceBorder uppercase flex-shrink-0">${span.type}</span>
        </div>

        <!-- Right: Visual Timeline Waterfall Bar -->
        <div class="flex-1 relative h-7 bg-bgDark/40 rounded flex items-center px-1">
          <div 
            class="absolute h-5 rounded ${colorClass} text-[10px] text-white font-semibold flex items-center px-2 shadow whitespace-nowrap overflow-hidden waterfall-bar"
            style="left: ${startPct}%; width: ${widthPct}%;"
          >
            <span>${span.durationMs}ms</span>
            ${span.inputTokens ? `<span class="ml-2 opacity-80">| ${span.inputTokens + span.outputTokens} tok</span>` : ''}
            ${span.cost ? `<span class="ml-2 opacity-90">$${span.cost.toFixed(3)}</span>` : ''}
          </div>
        </div>
      </div>
    `;

    if (span.children && span.children.length > 0) {
      span.children.forEach(child => {
        html += this.renderSpanRows(child, totalDurationMs, depth + 1);
      });
    }

    return html;
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

  exportJson: function(traceId) {
    const trace = window.AgentLensData && window.AgentLensData.traces 
      ? window.AgentLensData.traces.find(t => t.traceId === traceId) 
      : null;

    if (!trace) {
      if (window.AgentLensApp) window.AgentLensApp.showToast('Trace not found', 'error');
      return;
    }

    const blob = new Blob([JSON.stringify(trace, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trace_${traceId}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    if (window.AgentLensApp && window.AgentLensApp.showToast) {
      window.AgentLensApp.showToast(`Downloaded trace ${traceId} as JSON`, 'success');
    }
  }
};
