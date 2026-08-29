/**
 * AgentLens - Logs Explorer View Module
 */

window.LogsView = {
  render: function(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">HIGH-DENSITY LOGS STREAM EXPLORER</h1>
            <p class="text-xs text-slate-400 mt-1">Structured agent execution logs stream correlated with OTLP trace and span context</p>
          </div>

          <div class="flex items-center gap-2">
            <input type="text" placeholder="Filter logs by keyword or trace ID..." class="bg-surfaceElevated border border-surfaceBorder rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brandBlue">
            <select class="bg-surfaceElevated text-xs text-slate-200 border border-surfaceBorder rounded-lg px-3 py-1.5 focus:outline-none">
              <option value="all">All Log Levels</option>
              <option value="ERROR">ERROR / FATAL</option>
              <option value="WARN">WARN</option>
              <option value="INFO">INFO</option>
              <option value="DEBUG">DEBUG</option>
            </select>
          </div>
        </div>

        <!-- High-Density Terminal Log Stream Table -->
        <div class="bg-[#060911] border border-surfaceBorder rounded-xl p-4 font-mono text-xs overflow-x-auto space-y-2 text-slate-300 shadow-2xl leading-relaxed">
          <div class="flex items-center gap-4 py-1.5 border-b border-surfaceBorder/40 hover:bg-surfaceElevated/50 px-2 rounded">
            <span class="text-slate-500 text-[11px]">11:30:12.040</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] bg-brandBlue/10 text-brandBlue font-bold border border-brandBlue/30">INFO</span>
            <span class="text-purple-400 font-semibold">[ResearchAgent]</span>
            <span class="text-slate-200">Initializing agent execution context for prompt query.</span>
            <a href="#/traces/8fa21c90e4a7" class="ml-auto text-[11px] text-brandBlue hover:underline">trace:8fa21c90e4a7</a>
          </div>

          <div class="flex items-center gap-4 py-1.5 border-b border-surfaceBorder/40 hover:bg-surfaceElevated/50 px-2 rounded">
            <span class="text-slate-500 text-[11px]">11:30:12.080</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] bg-brandPurple/10 text-brandPurple font-bold border border-brandPurple/30">DEBUG</span>
            <span class="text-purple-400 font-semibold">[gpt-4o]</span>
            <span class="text-slate-200">Dispatched prompt payload to OpenAI API endpoint (1,233 input tokens).</span>
            <a href="#/traces/8fa21c90e4a7" class="ml-auto text-[11px] text-brandBlue hover:underline">trace:8fa21c90e4a7</a>
          </div>

          <div class="flex items-center gap-4 py-1.5 border-b border-surfaceBorder/40 hover:bg-surfaceElevated/50 px-2 rounded">
            <span class="text-slate-500 text-[11px]">11:30:12.620</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">INFO</span>
            <span class="text-emerald-400 font-semibold">[WebSearch]</span>
            <span class="text-slate-200">Arxiv HTTP API query completed with 200 OK in 420ms.</span>
            <a href="#/traces/8fa21c90e4a7" class="ml-auto text-[11px] text-brandBlue hover:underline">trace:8fa21c90e4a7</a>
          </div>

          <div class="flex items-center gap-4 py-1.5 border-b border-surfaceBorder/40 hover:bg-statusError/10 px-2 rounded bg-statusError/5">
            <span class="text-slate-500 text-[11px]">11:28:50.410</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] bg-statusError/20 text-statusError font-bold border border-statusError/40">ERROR</span>
            <span class="text-rose-400 font-semibold">[CodeInterpreter]</span>
            <span class="text-statusError font-semibold">TimeoutError: Command execution timed out after 5000ms.</span>
            <a href="#/traces/3bf94d12c8e1" class="ml-auto text-[11px] text-statusError hover:underline">trace:3bf94d12c8e1</a>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
