/**
 * AgentLens - OpenTelemetry Integration View Module
 */

window.OpenTelemetryView = {
  render: function(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">OPENTELEMETRY (OTLP) INTEGRATION & SDK SETUP</h1>
            <p class="text-xs text-slate-400 mt-1">Vendor-neutral telemetry ingestion via OpenTelemetry standards for AI agents & LLM calls</p>
          </div>
          <span class="px-3 py-1 rounded-lg bg-statusSuccess/10 text-statusSuccess border border-statusSuccess/30 text-xs font-mono font-semibold flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-statusSuccess animate-pulse"></span> OTLP Collector Online
          </span>
        </div>

        <!-- OTLP Telemetry Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1 font-mono">
            <div class="text-xs text-slate-400 font-sans">Spans Ingested / sec</div>
            <div class="text-2xl font-bold text-brandBlue">2,410</div>
            <div class="text-[11px] text-statusSuccess">100% OTLP gRPC compliant</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1 font-mono">
            <div class="text-xs text-slate-400 font-sans">Collector Memory Usage</div>
            <div class="text-2xl font-bold text-brandPurple">142 MB</div>
            <div class="text-[11px] text-slate-400">Buffer limit: 2,048 MB</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1 font-mono">
            <div class="text-xs text-slate-400 font-sans">Ingestion Endpoint</div>
            <div class="text-sm font-bold text-slate-200">otlp.agentlens.ai:4317</div>
            <div class="text-[11px] text-slate-400">gRPC & HTTP/JSON supported</div>
          </div>
        </div>

        <!-- Code Snippet Setup Card -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-xl">
          <div class="flex items-center justify-between border-b border-surfaceBorder pb-3">
            <h3 class="font-bold text-sm text-slate-100">Zero-Code Auto-Instrumentation Snippet</h3>
            <div class="flex items-center gap-2 text-xs font-mono">
              <button class="px-3 py-1 rounded bg-brandBlue text-white font-semibold">Python</button>
              <button class="px-3 py-1 rounded bg-surfaceElevated text-slate-400 hover:text-slate-200">Node.js</button>
              <button class="px-3 py-1 rounded bg-surfaceElevated text-slate-400 hover:text-slate-200">Java</button>
              <button class="px-3 py-1 rounded bg-surfaceElevated text-slate-400 hover:text-slate-200">Go</button>
            </div>
          </div>

          <pre class="bg-bgDark p-4 rounded-lg border border-surfaceBorder text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
<span class="text-slate-500"># Install AgentLens OpenTelemetry SDK</span>
pip install agentlens-otlp opentelemetry-exporter-otlp

<span class="text-slate-500"># Initialize AgentLens Tracer in Python</span>
<span class="text-brandPurple">from</span> agentlens <span class="text-brandPurple">import</span> AgentLensTracer

tracer = AgentLensTracer(
    api_key=<span class="text-emerald-400">"al_live_9812471928"</span>,
    endpoint=<span class="text-emerald-400">"https://otlp.agentlens.ai:4317"</span>,
    agent_name=<span class="text-emerald-400">"ResearchAgent"</span>
)

<span class="text-slate-500"># Auto-instruments OpenAI & LangChain calls</span>
tracer.instrument_openai()
tracer.instrument_langchain()</pre>
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
