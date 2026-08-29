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

  history: [],

  clearHistory: function() {
    this.history = [];
  },

  getHistory: function() {
    return this.history;
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

  // Stream Gemini response tokens in real-time with multi-turn chat history
  askGeminiStream: async function(prompt, onChunk, onDone, onError) {
    const key = this.getApiKey();
    if (!key) {
      if (onError) onError('Gemini API key is not configured.');
      return;
    }

    try {
      const systemInstruction = this.getTelemetryContext();

      // Maintain multi-turn history (limit to last 8 messages for speed)
      if (this.history.length > 8) {
        this.history = this.history.slice(-8);
      }

      // Add user turn
      const userTurn = { role: 'user', parts: [{ text: prompt }] };
      const conversationPayload = [...this.history, userTurn];

      const url = `${this.API_BASE}/${this.MODEL}:streamGenerateContent?alt=sse&key=${encodeURIComponent(key)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: conversationPayload,
          system_instruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            temperature: 0.4,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048
          }
        })
      });

      if (!response.ok) {
        let errMsg = `Gemini API Error (${response.status})`;
        try {
          const errData = await response.json();
          if (errData.error && errData.error.message) errMsg = errData.error.message;
        } catch (e) {}
        if (onError) onError(errMsg);
        return;
      }

      if (!response.body) {
        if (onError) onError('Readable stream not supported by browser.');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullText = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Keep incomplete trailing piece in buffer

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const jsonStr = trimmed.slice(6).trim();
            if (!jsonStr || jsonStr === '[DONE]') continue;
            try {
              const data = JSON.parse(jsonStr);
              const textChunk = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
              if (textChunk) {
                fullText += textChunk;
                if (onChunk) onChunk(textChunk, fullText);
              }
            } catch (e) {
              // Ignore partial JSON chunks
            }
          }
        }
      }

      // Record successful turn into conversation memory
      this.history.push(userTurn);
      this.history.push({ role: 'model', parts: [{ text: fullText }] });

      if (onDone) onDone(fullText);
    } catch (err) {
      if (onError) onError(err.message || 'Network error streaming from Gemini API.');
    }
  },

  // Fallback single-call askGemini
  askGemini: async function(prompt) {
    return new Promise((resolve) => {
      let resultText = '';
      this.askGeminiStream(
        prompt,
        (chunk, accumulated) => { resultText = accumulated; },
        (full) => resolve({ success: true, text: full }),
        (err) => resolve({ success: false, error: err })
      );
    });
  }
};
