/**
 * AgentLens - Live Telemetry & OTLP Ingestion Service
 * Handles live trace ingestion, local storage persistence, agent run simulations, and event broadcasting.
 */

window.TelemetryService = {
  STORAGE_KEY: 'agentlens_custom_traces',

  init: function() {
    this.loadCustomTraces();
  },

  // Load custom ingested traces from localStorage and merge into global store
  loadCustomTraces: function() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved && window.AgentLensData && Array.isArray(window.AgentLensData.traces)) {
        const customTraces = JSON.parse(saved);
        if (Array.isArray(customTraces) && customTraces.length > 0) {
          // Prepend custom traces avoiding duplicates
          const existingIds = new Set(window.AgentLensData.traces.map(t => t.traceId));
          const toAdd = customTraces.filter(t => !existingIds.has(t.traceId));
          window.AgentLensData.traces.unshift(...toAdd);
          this.updateMetrics();
        }
      }
    } catch (e) {
      console.warn('Could not load custom traces:', e);
    }
  },

  // Ingest a trace (from OpenTelemetry SDK, Webhook, or User Import)
  ingestTrace: function(traceData) {
    if (!traceData) return { success: false, error: 'Empty trace payload' };

    const traceId = traceData.traceId || ('trace_' + Math.random().toString(16).substring(2, 14));
    const agentName = traceData.agentName || 'CustomAgent';
    const status = traceData.status || 'SUCCESS';
    const duration = typeof traceData.duration === 'number' ? traceData.duration : Number((Math.random() * 2 + 0.4).toFixed(2));
    const inputTokens = traceData.inputTokens || Math.floor(Math.random() * 800 + 400);
    const outputTokens = traceData.outputTokens || Math.floor(Math.random() * 300 + 100);
    const totalTokens = traceData.totalTokens || (inputTokens + outputTokens);
    const model = traceData.model || 'gpt-4o';
    const estimatedCost = traceData.estimatedCost !== undefined 
      ? traceData.estimatedCost 
      : Number((totalTokens * 0.000015).toFixed(4));
    const promptName = traceData.promptName || 'User Request';
    const startTime = traceData.startTime || 'Just now';

    // Construct default root span if spans not provided
    const spans = traceData.spans || [
      {
        id: 'span_root_' + traceId.substring(0, 8),
        name: `${agentName}.execute`,
        type: 'agent',
        status: status,
        durationMs: Math.round(duration * 1000),
        startTimeOffsetMs: 0,
        inputTokens: inputTokens,
        outputTokens: outputTokens,
        cost: estimatedCost,
        children: [
          {
            id: 'span_prompt_' + traceId.substring(0, 8),
            name: 'format_prompt',
            type: 'prompt',
            status: 'SUCCESS',
            durationMs: 25,
            startTimeOffsetMs: 0
          },
          {
            id: 'span_llm_' + traceId.substring(0, 8),
            name: `llm.${model}`,
            type: 'llm',
            status: status,
            durationMs: Math.round(duration * 1000) - 100,
            startTimeOffsetMs: 30,
            inputTokens: inputTokens,
            outputTokens: outputTokens,
            cost: estimatedCost
          }
        ]
      }
    ];

    const formattedTrace = {
      traceId,
      agentName,
      status,
      duration,
      spansCount: traceData.spansCount || spans.length + (spans[0]?.children?.length || 0),
      totalTokens,
      inputTokens,
      outputTokens,
      estimatedCost,
      model,
      promptName,
      startTime,
      toolsUsed: traceData.toolsUsed || ['AutoInstrumentation'],
      error: traceData.error || null,
      spans
    };

    // Prepend to active data store
    if (window.AgentLensData && Array.isArray(window.AgentLensData.traces)) {
      window.AgentLensData.traces.unshift(formattedTrace);
    }

    // Save to localStorage
    try {
      const saved = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
      saved.unshift(formattedTrace);
      // Keep up to 50 custom traces locally
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(saved.slice(0, 50)));
    } catch (e) {}

    // Update global metrics
    this.updateMetrics();

    // Broadcast trace ingested event
    window.dispatchEvent(new CustomEvent('agentlens:trace-ingested', { detail: formattedTrace }));

    // Notify user
    if (window.AgentLensApp && window.AgentLensApp.showToast) {
      window.AgentLensApp.showToast(`Ingested new trace #${traceId} (${agentName})`, 'success');
    }

    return { success: true, trace: formattedTrace };
  },

  // Update global summary metrics when new traces arrive
  updateMetrics: function() {
    if (!window.AgentLensData || !window.AgentLensData.summary) return;
    const s = window.AgentLensData.summary;
    s.totalExecutions = (s.totalExecutions || 12482) + 1;
  },

  // Simulate an autonomous agent trace execution with real-time feedback
  simulateAgentRun: function(agentName = 'ResearchAgent') {
    const agents = ['ResearchAgent', 'SupportAgent', 'PlannerAgent', 'CodeAgent', 'DataAnalyst'];
    const chosenAgent = agentName || agents[Math.floor(Math.random() * agents.length)];
    const models = ['gpt-4o', 'claude-3-5-sonnet', 'gemini-1.5-pro'];
    const chosenModel = models[Math.floor(Math.random() * models.length)];
    const isError = Math.random() < 0.15; // 15% error rate simulation
    const duration = Number((Math.random() * 2.8 + 0.4).toFixed(2));
    const inTok = Math.floor(Math.random() * 1200 + 400);
    const outTok = Math.floor(Math.random() * 600 + 150);

    const traceId = Math.random().toString(16).substring(2, 14);

    const tracePayload = {
      traceId: traceId,
      agentName: chosenAgent,
      status: isError ? 'ERROR' : 'SUCCESS',
      duration: duration,
      inputTokens: inTok,
      outputTokens: outTok,
      totalTokens: inTok + outTok,
      model: chosenModel,
      promptName: isError ? 'API RateLimit Recovery Chain' : 'Autonomous Agent Pipeline Run',
      startTime: 'Just now',
      toolsUsed: ['WebSearch', 'VectorRetrieval'],
      error: isError ? 'Downstream tool execution timeout exceeded (5000ms SLA)' : null
    };

    return this.ingestTrace(tracePayload);
  },

  // Import multiple traces from JSON array
  importJsonTraces: function(jsonString) {
    try {
      const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      const list = Array.isArray(parsed) ? parsed : [parsed];
      let count = 0;
      list.forEach(t => {
        if (t && typeof t === 'object') {
          this.ingestTrace(t);
          count++;
        }
      });
      return { success: true, count };
    } catch (e) {
      return { success: false, error: e.message || 'Invalid JSON format' };
    }
  },

  // Reset custom ingested traces
  resetCustomTraces: function() {
    localStorage.removeItem(this.STORAGE_KEY);
    if (window.AgentLensData) {
      window.location.reload();
    }
  }
};

window.TelemetryService.init();
