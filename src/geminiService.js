/**
 * AgentLens - Google Gemini AI Integration Service
 * Powers Lens AI Debug Assistant, Root Cause Analysis, and Telemetry Querying
 */

window.GeminiService = {
  // Supported Gemini models with fast flash default
  MODEL: 'gemini-1.5-flash',
  API_BASE: 'https://generativelanguage.googleapis.com/v1beta/models',

  getApiKey: function() {
    return (window.AppConfig && window.AppConfig.getGeminiApiKey()) || 
           localStorage.getItem('agentlens_gemini_api_key') || 
           '';
  },

  setApiKey: function(key) {
    if (!key) {
      localStorage.removeItem('agentlens_gemini_api_key');
      if (window.AppConfig && window.AppConfig.env) {
        delete window.AppConfig.env.VITE_GEMINI_API_KEY;
        delete window.AppConfig.env.GEMINI_API_KEY;
      }
      return;
    }
    const cleanKey = key.trim();
    localStorage.setItem('agentlens_gemini_api_key', cleanKey);
    if (window.AppConfig && window.AppConfig.env) {
      window.AppConfig.env.VITE_GEMINI_API_KEY = cleanKey;
      window.AppConfig.env.GEMINI_API_KEY = cleanKey;
    }
  },

  isConfigured: function() {
    const key = this.getApiKey();
    return Boolean(key && key.trim().length > 10);
  },

  // Build telemetry system context from live AgentLens data
  getTelemetryContext: function() {
    try {
      const summary = window.AgentLensData ? window.AgentLensData.summary : {};
      const agents = window.AgentLensData ? window.AgentLensData.agents.slice(0, 5) : [];
      
      const agentsSummary = agents.map(a => 
        `- ${a.name} (${a.model}, ${a.primaryTool || a.version || 'v1.0'}): Status=${a.status}, Success=${a.successRate}%, Latency=${a.avgLatency}s, 24hCost=$${a.cost || '0.00'}`
      ).join('\n');

      return `You are "Lens AI", the built-in intelligent observability and debugging assistant for the AgentLens platform.
You analyze AI agent telemetry, traces, execution graphs, latency bottlenecks, token consumption, and model errors.

Current Live Telemetry Snapshot:
- Total Executions (24h): ${summary.totalExecutions || 12482} (${summary.executionsChange || '+12.4%'})
- Global Success Rate: ${summary.successRate || 98.7}%
- Average Latency: ${summary.avgLatency || 1.42}s (P95: ${summary.p95Latency || 3.84}s)
- Total Tokens (24h): ${summary.totalTokens || '2.41M'} (Input: ${summary.inputTokens || '1.74M'}, Output: ${summary.outputTokens || '670K'})
- Estimated 24h Cost: $${summary.estimatedCost || 18.42}
- Error Rate: ${summary.errorRate || 1.3}%
- Active Agents: ${summary.activeAgents || 24}
- Monitored Agents:
${agentsSummary}

Recent Anomaly Flagged:
- ResearchAgent experienced 42% cost and latency anomaly due to WebSearch API 420ms tail latency before gpt-4o token synthesis. Associated Trace: #8fa21c90e4a7.

Instructions:
1. Provide concise, expert, actionable insights formatted in markdown with bullet points or small code/metric blocks.
2. Reference specific agent names, trace IDs (like #8fa21c90e4a7), and latency numbers when diagnosing issues.
3. Be professional, technical, and directly answer the developer's question.`;
    } catch (e) {
      return "You are Lens AI, the observability assistant for AgentLens.";
    }
  },

  // Test the Gemini API Key
  testConnection: async function(testKey) {
    const key = testKey || this.getApiKey();
    if (!key) {
      return { success: false, error: 'No Gemini API key provided.' };
    }

    try {
      const url = `${this.API_BASE}/${this.MODEL}:generateContent?key=${encodeURIComponent(key)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Ping test. Reply with: OK' }] }],
          generationConfig: { maxOutputTokens: 10 }
        })
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMsg = (data.error && data.error.message) || `HTTP error ${res.status}`;
        return { success: false, error: errorMsg };
      }

      return { success: true, message: 'Connected to Google Gemini successfully!' };
    } catch (err) {
      return { success: false, error: err.message || 'Network error connecting to Gemini API.' };
    }
  },

  // Ask Gemini a question with full telemetry context
  askGemini: async function(prompt, chatHistory = []) {
    const key = this.getApiKey();
    if (!key) {
      return {
        success: false,
        needsKey: true,
        error: 'Gemini API key is not configured.'
      };
    }

    try {
      const systemInstruction = this.getTelemetryContext();
      
      // Build conversation contents
      const contents = [];
      
      // System instructions supported via system_instruction in Gemini 1.5
      // or injected as initial model priming
      contents.push({
        role: 'user',
        parts: [{ text: `[System Context]\n${systemInstruction}\n\nDeveloper question: ${prompt}` }]
      });

      const url = `${this.API_BASE}/${this.MODEL}:generateContent?key=${encodeURIComponent(key)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: 0.4,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const message = (data.error && data.error.message) || `Gemini API Error (${response.status})`;
        return { success: false, error: message };
      }

      const text = data.candidates && 
                   data.candidates[0] && 
                   data.candidates[0].content && 
                   data.candidates[0].content.parts && 
                   data.candidates[0].content.parts[0] && 
                   data.candidates[0].content.parts[0].text;

      if (!text) {
        return { success: false, error: 'Empty response received from Gemini.' };
      }

      return {
        success: true,
        text: text,
        usage: data.usageMetadata || null,
        model: this.MODEL
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Network error communicating with Google Gemini API.'
      };
    }
  }
};
