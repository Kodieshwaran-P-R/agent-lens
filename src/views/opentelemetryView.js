/**
 * AgentLens - OpenTelemetry (OTLP) Integration & Ingestion View Module
 * With Live Ingestion Test Bench, Simulation Engine, and SDK Snippets
 */

window.OpenTelemetryView = {
  activeTab: 'python',

  snippets: {
    python: `# Install AgentLens OpenTelemetry SDK
pip install agentlens-otlp opentelemetry-exporter-otlp

# Initialize AgentLens Tracer in Python
from agentlens import AgentLensTracer

tracer = AgentLensTracer(
    api_key="al_live_9812471928",
    endpoint="https://otlp.agentlens.ai:4318/v1/traces",
    agent_name="ResearchAgent"
)

# Auto-instruments OpenAI, Anthropic, & LangChain calls
tracer.instrument_openai()
tracer.instrument_langchain()`,

    node: `// Install Node.js SDK
npm install @agentlens/opentelemetry @opentelemetry/api

import { AgentLensSDK } from '@agentlens/opentelemetry';

const tracer = new AgentLensSDK({
  apiKey: process.env.AGENTLENS_API_KEY,
  endpoint: 'https://otlp.agentlens.ai:4318/v1/traces',
  agentName: 'PlannerAgent'
});

await tracer.start();`,

    crewai: `# CrewAI Auto-Instrumentation
from crewai import Agent, Crew, Task
from agentlens.adapters.crewai import instrument_crew

# Single-line CrewAI observability
instrument_crew(api_key="al_live_9812471928")

researcher = Agent(
    role="Senior Research Analyst",
    goal="Discover breakthroughs in AI agent observability",
    verbose=True
)`
  },

  render: function(container) {
    const customTracesCount = (function() {
      try {
        const saved = JSON.parse(localStorage.getItem('agentlens_custom_traces') || '[]');
        return saved.length;
      } catch (e) {
        return 0;
      }
    })();

    container.innerHTML = `
      <div class="space-y-6 font-sans">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-white tracking-tight font-display">OPENTELEMETRY (OTLP) INGESTION & SDK SETUP</h1>
            <p class="text-xs text-zinc-400 mt-1">Vendor-neutral telemetry ingestion via OpenTelemetry standards for AI agents & LLM calls</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> OTLP Collector Online
            </span>
          </div>
        </div>

        <!-- OTLP Telemetry Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1 font-mono shadow-md">
            <div class="text-xs text-zinc-400 font-sans">Spans Ingested / sec</div>
            <div class="text-2xl font-bold text-brandBlue">2,410</div>
            <div class="text-[11px] text-emerald-400">100% OTLP compliant</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1 font-mono shadow-md">
            <div class="text-xs text-zinc-400 font-sans">Custom Ingested Traces</div>
            <div class="text-2xl font-bold text-emerald-400">${customTracesCount}</div>
            <div class="text-[11px] text-zinc-400">Stored in local pipeline</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1 font-mono shadow-md">
            <div class="text-xs text-zinc-400 font-sans">Collector Memory Usage</div>
            <div class="text-2xl font-bold text-brandPurple">142 MB</div>
            <div class="text-[11px] text-zinc-400">Buffer limit: 2,048 MB</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1 font-mono shadow-md">
            <div class="text-xs text-zinc-400 font-sans">Ingestion Endpoint</div>
            <div class="text-sm font-bold text-zinc-200">http://localhost:4318/v1/traces</div>
            <div class="text-[11px] text-zinc-400">HTTP / JSON supported</div>
          </div>
        </div>

        <!-- Live Ingestion Test Bench & Simulator Card -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-xl">
          <div class="flex items-center justify-between border-b border-surfaceBorder pb-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-sm">
                <div class="w-full h-full bg-surfaceDark rounded-[6px] flex items-center justify-center">
                  <i data-lucide="zap" class="w-4 h-4 text-cyan-400"></i>
                </div>
              </div>
              <div>
                <h3 class="font-bold text-sm text-white">Live Ingestion Test Bench & Agent Simulator</h3>
                <p class="text-xs text-zinc-400">Send simulated or custom agent telemetry into the active AgentLens dashboard</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button 
                onclick="
                  const res = window.TelemetryService.simulateAgentRun();
                  if (res && res.success) {
                    window.OpenTelemetryView.render(document.getElementById('view-container'));
                  }
                " 
                class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
              >
                <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
                <span>Simulate Live Agent Run</span>
              </button>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs">
              <label class="text-zinc-300 font-semibold">Direct JSON Trace Ingestion Terminal</label>
              <span class="text-[11px] text-zinc-400 font-mono">Paste OpenTelemetry or AgentLens JSON payload</span>
            </div>
            <textarea 
              id="raw-trace-input" 
              rows="4" 
              class="w-full bg-surfaceElevated border border-surfaceBorder rounded-xl p-3 text-xs font-mono text-zinc-200 focus:border-brandBlue focus:outline-none"
              placeholder='{"agentName": "MyCustomAgent", "model": "gpt-4o", "duration": 1.25, "totalTokens": 1420, "status": "SUCCESS"}'
            ></textarea>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <button 
                  onclick="
                    const val = document.getElementById('raw-trace-input').value.trim();
                    if (!val) { alert('Please enter or paste JSON trace data.'); return; }
                    const res = window.TelemetryService.importJsonTraces(val);
                    if (res.success) {
                      document.getElementById('raw-trace-input').value = '';
                      window.OpenTelemetryView.render(document.getElementById('view-container'));
                    } else {
                      alert('Failed to ingest trace: ' + res.error);
                    }
                  " 
                  class="px-3.5 py-1.5 rounded-lg bg-surfaceElevated border border-surfaceBorder hover:border-brandBlue text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-2"
                >
                  <i data-lucide="upload" class="w-3.5 h-3.5 text-blue-400"></i>
                  <span>Ingest Payload to Traces</span>
                </button>
                <a href="#/traces" class="text-xs text-blue-400 hover:underline flex items-center gap-1 font-mono">
                  View in Traces Explorer →
                </a>
              </div>

              ${customTracesCount > 0 ? `
                <button 
                  onclick="if (confirm('Reset custom ingested traces?')) { window.TelemetryService.resetCustomTraces(); }"
                  class="text-xs text-rose-400 hover:text-rose-300 font-mono underline cursor-pointer"
                >
                  Reset Ingested Traces (${customTracesCount})
                </button>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Code Snippet Setup Card -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-xl">
          <div class="flex items-center justify-between border-b border-surfaceBorder pb-3">
            <h3 class="font-bold text-sm text-white">Zero-Code Auto-Instrumentation Snippet</h3>
            <div class="flex items-center gap-2 text-xs font-mono">
              <button onclick="window.OpenTelemetryView.setTab('python')" class="px-3 py-1 rounded-lg ${this.activeTab === 'python' ? 'bg-blue-600 text-white font-semibold' : 'bg-surfaceElevated text-zinc-400 hover:text-white'} transition-all cursor-pointer">Python</button>
              <button onclick="window.OpenTelemetryView.setTab('node')" class="px-3 py-1 rounded-lg ${this.activeTab === 'node' ? 'bg-blue-600 text-white font-semibold' : 'bg-surfaceElevated text-zinc-400 hover:text-white'} transition-all cursor-pointer">Node.js</button>
              <button onclick="window.OpenTelemetryView.setTab('crewai')" class="px-3 py-1 rounded-lg ${this.activeTab === 'crewai' ? 'bg-blue-600 text-white font-semibold' : 'bg-surfaceElevated text-zinc-400 hover:text-white'} transition-all cursor-pointer">CrewAI</button>
            </div>
          </div>

          <div class="relative">
            <pre class="bg-surfaceElevated p-4 rounded-xl border border-surfaceBorder text-zinc-200 font-mono text-xs overflow-x-auto leading-relaxed">${this.escapeHtml(this.snippets[this.activeTab])}</pre>
            <button 
              onclick="navigator.clipboard.writeText(window.OpenTelemetryView.snippets[window.OpenTelemetryView.activeTab]); window.AgentLensApp.showToast('Copied SDK code snippet!', 'info');"
              class="absolute top-3 right-3 p-1.5 rounded-lg bg-surfaceDark border border-surfaceBorder text-zinc-400 hover:text-white cursor-pointer transition-all"
              title="Copy Code"
            >
              <i data-lucide="copy" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
    }, 50);
  },

  setTab: function(tab) {
    this.activeTab = tab;
    const container = document.getElementById('view-container');
    if (container) this.render(container);
  },

  escapeHtml: function(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};
