/**
 * AgentLens Mock Dataset
 * Enterprise-grade observability telemetry mock store
 */

window.AgentLensData = {
  // Global Platform Metrics
  summary: {
    totalExecutions: 12482,
    executionsChange: '+12.4%',
    successRate: 98.7,
    successRateChange: '+0.5%',
    avgLatency: 1.42,
    avgLatencyChange: '-8.3%',
    p95Latency: 3.84,
    p95LatencyChange: '-4.1%',
    totalTokens: '2.41M',
    inputTokens: '1.74M',
    outputTokens: '670K',
    tokensChange: '+15.2%',
    estimatedCost: 18.42,
    costChange: '+3.1%',
    errorRate: 1.3,
    errorRateChange: '-0.2%',
    activeAgents: 24,
    activeSessions: 142
  },

  // Active Agents List
  agents: [
    {
      id: 'agent-01',
      name: 'ResearchAgent',
      version: 'v2.4.1',
      environment: 'production',
      description: 'Autonomous research assistant scanning academic papers and web sources',
      status: 'HEALTHY',
      executions: 4812,
      successRate: 98.4,
      avgLatency: 1.82,
      p95Latency: 4.12,
      totalTokens: '920K',
      cost: 7.45,
      errors: 77,
      lastActive: '2 mins ago',
      model: 'gpt-4o',
      primaryTool: 'WebSearch'
    },
    {
      id: 'agent-02',
      name: 'SupportAgent',
      version: 'v3.1.0',
      environment: 'production',
      description: 'Customer service agent processing tier-1 support tickets and FAQs',
      status: 'HEALTHY',
      executions: 3290,
      successRate: 99.3,
      avgLatency: 0.81,
      p95Latency: 1.95,
      totalTokens: '450K',
      cost: 3.12,
      errors: 23,
      lastActive: 'Just now',
      model: 'claude-3-5-sonnet',
      primaryTool: 'DatabaseQuery'
    },
    {
      id: 'agent-03',
      name: 'PlannerAgent',
      version: 'v1.8.4',
      environment: 'production',
      description: 'High-level task decomposition and multi-agent workflow DAG planner',
      status: 'HEALTHY',
      executions: 1540,
      successRate: 97.8,
      avgLatency: 2.10,
      p95Latency: 5.40,
      totalTokens: '380K',
      cost: 3.85,
      errors: 34,
      lastActive: '5 mins ago',
      model: 'gpt-4o',
      primaryTool: 'WorkflowEngine'
    },
    {
      id: 'agent-04',
      name: 'CodeAgent',
      version: 'v4.0.2',
      environment: 'production',
      description: 'Code synthesis, refactoring, unit test generation and git PR reviewer',
      status: 'WARNING',
      executions: 1120,
      successRate: 94.2,
      avgLatency: 3.45,
      p95Latency: 8.90,
      totalTokens: '410K',
      cost: 2.98,
      errors: 65,
      lastActive: '1 min ago',
      model: 'claude-3-5-sonnet',
      primaryTool: 'CodeInterpreter'
    },
    {
      id: 'agent-05',
      name: 'DataAnalystAgent',
      version: 'v1.2.0',
      environment: 'production',
      description: 'SQL query generation, data aggregation, and chart summary creation',
      status: 'HEALTHY',
      executions: 840,
      successRate: 98.9,
      avgLatency: 1.25,
      p95Latency: 2.80,
      totalTokens: '180K',
      cost: 0.92,
      errors: 9,
      lastActive: '12 mins ago',
      model: 'gemini-1-5-pro',
      primaryTool: 'DatabaseQuery'
    },
    {
      id: 'agent-06',
      name: 'EmailAgent',
      version: 'v2.0.1',
      environment: 'staging',
      description: 'Automated email parsing, summary generation, and draft composition',
      status: 'HEALTHY',
      executions: 410,
      successRate: 99.5,
      avgLatency: 0.65,
      p95Latency: 1.40,
      totalTokens: '70K',
      cost: 0.10,
      errors: 2,
      lastActive: '1 hour ago',
      model: 'gpt-4o-mini',
      primaryTool: 'EmailClient'
    },
    {
      id: 'agent-07',
      name: 'RAGRetrievalAgent',
      version: 'v1.5.0',
      environment: 'production',
      description: 'Vector database semantic retrieval and document reranking engine',
      status: 'HEALTHY',
      executions: 2150,
      successRate: 99.1,
      avgLatency: 0.42,
      p95Latency: 0.95,
      totalTokens: '290K',
      cost: 0.45,
      errors: 19,
      lastActive: 'Just now',
      model: 'text-embedding-3-large',
      primaryTool: 'VectorSearch'
    },
    {
      id: 'agent-08',
      name: 'SecurityAuditAgent',
      version: 'v1.0.4',
      environment: 'production',
      description: 'Automated vulnerability scanning and IAM policy compliance check',
      status: 'CRITICAL',
      executions: 310,
      successRate: 88.5,
      avgLatency: 5.20,
      p95Latency: 12.40,
      totalTokens: '190K',
      cost: 1.62,
      errors: 36,
      lastActive: '4 mins ago',
      model: 'gpt-4o',
      primaryTool: 'HTTP_API'
    }
  ],

  // Detailed Traces
  traces: [
    {
      traceId: '8fa21c90e4a7',
      agentId: 'agent-01',
      agentName: 'ResearchAgent',
      sessionId: 'sess-98214',
      environment: 'production',
      status: 'SUCCESS',
      startTime: '2026-08-08 11:30:12',
      duration: 1.82,
      totalTokens: 2431,
      inputTokens: 1840,
      outputTokens: 591,
      estimatedCost: 0.041,
      spansCount: 5,
      model: 'gpt-4o',
      promptName: 'ResearchPrompt v1.4',
      rootSpan: {
        spanId: 'span-001',
        type: 'AGENT',
        name: 'ResearchAgent.execute',
        durationMs: 1820,
        startTimeMs: 0,
        children: [
          {
            spanId: 'span-002',
            type: 'LLM',
            name: 'gpt-4o completion (intent)',
            durationMs: 540,
            startTimeMs: 40,
            model: 'gpt-4o',
            provider: 'OpenAI',
            inputTokens: 1233,
            outputTokens: 180,
            cost: 0.018,
            temperature: 0.2,
            prompt: 'You are an expert autonomous AI research assistant. Query: "Latest papers on Transformer KV-cache compression". Extract key search terms.',
            response: '{"search_query": "Transformer KV cache compression 2025 2026", "filters": ["arxiv"]}'
          },
          {
            spanId: 'span-003',
            type: 'TOOL',
            name: 'WebSearch API (Arxiv)',
            durationMs: 420,
            startTimeMs: 600,
            toolName: 'WebSearch',
            args: '{"query": "Transformer KV cache compression 2025 2026", "max_results": 5}',
            response: '{"status": 200, "results": [{"title": "vLLM PagedAttention v3", "authors": ["Kwon et al."], "abstract": "We present dynamic KV cache pruning resulting in 4x throughput..."}]}',
            status: 'SUCCESS'
          },
          {
            spanId: 'span-004',
            type: 'LLM',
            name: 'gpt-4o completion (synthesis)',
            durationMs: 600,
            startTimeMs: 1040,
            model: 'gpt-4o',
            provider: 'OpenAI',
            inputTokens: 607,
            outputTokens: 411,
            cost: 0.021,
            temperature: 0.3,
            prompt: 'Summarize the search results into a executive technical briefing with key metrics.',
            response: 'Here is the summary of recent advancements in KV-cache compression: 1. vLLM PagedAttention v3 achieves 4x memory savings...'
          },
          {
            spanId: 'span-005',
            type: 'DATABASE',
            name: 'PostgreSQL cache write',
            durationMs: 82,
            startTimeMs: 1660,
            query: 'INSERT INTO research_cache (query_hash, summary) VALUES ($1, $2)',
            status: 'SUCCESS'
          }
        ]
      }
    },
    {
      traceId: '3bf94d12c8e1',
      agentId: 'agent-04',
      agentName: 'CodeAgent',
      sessionId: 'sess-98215',
      environment: 'production',
      status: 'ERROR',
      startTime: '2026-08-08 11:28:45',
      duration: 5.42,
      totalTokens: 4890,
      inputTokens: 4100,
      outputTokens: 790,
      estimatedCost: 0.078,
      spansCount: 4,
      model: 'claude-3-5-sonnet',
      promptName: 'CodeReviewer v2.0',
      error: 'CodeInterpreter: Command execution timed out after 5000ms',
      rootSpan: {
        spanId: 'span-101',
        type: 'AGENT',
        name: 'CodeAgent.review',
        durationMs: 5420,
        startTimeMs: 0,
        children: [
          {
            spanId: 'span-102',
            type: 'LLM',
            name: 'claude-3-5-sonnet (generate sandbox script)',
            durationMs: 380,
            startTimeMs: 20,
            model: 'claude-3-5-sonnet',
            provider: 'Anthropic',
            inputTokens: 3200,
            outputTokens: 340,
            cost: 0.032,
            temperature: 0.0,
            prompt: 'Generate pytest verification script for PR #4812 in repo agentlens/core.',
            response: '```python\nimport pytest\nfrom agentlens import Tracer\n...'
          },
          {
            spanId: 'span-103',
            type: 'TOOL',
            name: 'CodeInterpreter (Docker sandbox)',
            durationMs: 5000,
            startTimeMs: 410,
            toolName: 'CodeInterpreter',
            args: '{"script": "pytest tests/test_tracer.py", "timeout_ms": 5000}',
            response: '{"error": "TimeoutError: Command execution timed out after 5000ms", "exit_code": 124}',
            status: 'ERROR',
            errorMessage: 'TimeoutError: Command execution timed out after 5000ms'
          }
        ]
      }
    },
    {
      traceId: '7ca01994e3b2',
      agentId: 'agent-02',
      agentName: 'SupportAgent',
      sessionId: 'sess-98216',
      environment: 'production',
      status: 'SUCCESS',
      startTime: '2026-08-08 11:27:10',
      duration: 0.81,
      totalTokens: 890,
      inputTokens: 710,
      outputTokens: 180,
      estimatedCost: 0.009,
      spansCount: 3,
      model: 'claude-3-5-sonnet',
      promptName: 'SupportTicket v3.1',
      rootSpan: {
        spanId: 'span-201',
        type: 'AGENT',
        name: 'SupportAgent.handleTicket',
        durationMs: 810,
        startTimeMs: 0,
        children: [
          {
            spanId: 'span-202',
            type: 'DATABASE',
            name: 'VectorDB Query (Customer Knowledge Base)',
            durationMs: 110,
            startTimeMs: 20,
            query: 'SELECT doc_chunk FROM kb_vectors WHERE similarity > 0.85',
            status: 'SUCCESS'
          },
          {
            spanId: 'span-203',
            type: 'LLM',
            name: 'claude-3-5-sonnet (draft response)',
            durationMs: 650,
            startTimeMs: 140,
            model: 'claude-3-5-sonnet',
            provider: 'Anthropic',
            inputTokens: 710,
            outputTokens: 180,
            cost: 0.009,
            prompt: 'Customer asks: "How do I set up OTLP exporter in Python?" Provide code sample based on context.',
            response: 'To set up OTLP exporter in Python:\n```python\nfrom opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter\n...'
          }
        ]
      }
    },
    {
      traceId: '1ee92b45a901',
      agentId: 'agent-03',
      agentName: 'PlannerAgent',
      sessionId: 'sess-98217',
      environment: 'production',
      status: 'SUCCESS',
      startTime: '2026-08-08 11:25:30',
      duration: 2.10,
      totalTokens: 3120,
      inputTokens: 2500,
      outputTokens: 620,
      estimatedCost: 0.038,
      spansCount: 4,
      model: 'gpt-4o',
      promptName: 'PlannerPrompt v1.8',
      rootSpan: {
        spanId: 'span-301',
        type: 'AGENT',
        name: 'PlannerAgent.orchestrate',
        durationMs: 2100,
        startTimeMs: 0,
        children: [
          {
            spanId: 'span-302',
            type: 'LLM',
            name: 'gpt-4o (DAG decomposition)',
            durationMs: 950,
            startTimeMs: 50,
            model: 'gpt-4o',
            inputTokens: 2500,
            outputTokens: 620,
            cost: 0.038,
            prompt: 'Decompose user request into sub-agent DAG tasks: ["Research", "DataAnalyst", "DocGen"]',
            response: '{"dag": [{"node": 1, "agent": "ResearchAgent"}, {"node": 2, "agent": "DataAnalystAgent"}]}'
          }
        ]
      }
    }
  ],

  // LLM Models Performance Matrix
  models: [
    {
      model: 'gpt-4o',
      provider: 'OpenAI',
      requests: 6420,
      totalTokens: '1.24M',
      avgLatency: 1.35,
      p95Latency: 3.10,
      successRate: 99.1,
      cost: 11.20,
      costPerReq: '$0.0017'
    },
    {
      model: 'claude-3-5-sonnet',
      provider: 'Anthropic',
      requests: 4110,
      totalTokens: '810K',
      avgLatency: 1.12,
      p95Latency: 2.65,
      successRate: 99.4,
      cost: 5.62,
      costPerReq: '$0.0013'
    },
    {
      model: 'gemini-1-5-pro',
      provider: 'Google Cloud',
      requests: 1200,
      totalTokens: '240K',
      avgLatency: 0.95,
      p95Latency: 2.10,
      successRate: 98.8,
      cost: 1.15,
      costPerReq: '$0.0009'
    },
    {
      model: 'deepseek-r1',
      provider: 'DeepSeek',
      requests: 480,
      totalTokens: '95K',
      avgLatency: 2.80,
      p95Latency: 6.50,
      successRate: 96.2,
      cost: 0.35,
      costPerReq: '$0.0007'
    },
    {
      model: 'llama-3-70b',
      provider: 'Together AI',
      requests: 272,
      totalTokens: '25K',
      avgLatency: 0.72,
      p95Latency: 1.50,
      successRate: 99.6,
      cost: 0.10,
      costPerReq: '$0.0003'
    }
  ],

  // Tools Observability Matrix
  tools: [
    {
      id: 'tool-01',
      name: 'WebSearch',
      type: 'HTTP API',
      calls: 3820,
      successRate: 98.2,
      avgLatency: 420,
      p95Latency: 1100,
      errors: 68,
      cost: 1.84,
      description: 'SerpAPI & Google Scholar integration'
    },
    {
      id: 'tool-02',
      name: 'DatabaseQuery',
      type: 'Database',
      calls: 2940,
      successRate: 99.7,
      avgLatency: 82,
      p95Latency: 210,
      errors: 9,
      cost: 0.12,
      description: 'PostgreSQL read/write query driver'
    },
    {
      id: 'tool-03',
      name: 'CodeInterpreter',
      type: 'Sandbox',
      calls: 1120,
      successRate: 94.2,
      avgLatency: 2450,
      p95Latency: 5200,
      errors: 65,
      cost: 2.10,
      description: 'Isolated Docker container Python runtime'
    },
    {
      id: 'tool-04',
      name: 'VectorSearch',
      type: 'Database',
      calls: 2150,
      successRate: 99.8,
      avgLatency: 45,
      p95Latency: 110,
      errors: 4,
      cost: 0.25,
      description: 'Pinecone / Qdrant vector embedding retrieval'
    },
    {
      id: 'tool-05',
      name: 'Calculator',
      type: 'Native Utility',
      calls: 640,
      successRate: 100.0,
      avgLatency: 5,
      p95Latency: 12,
      errors: 0,
      cost: 0.00,
      description: 'Math expression evaluator'
    }
  ],

  // Prompt Registry with Versions
  prompts: [
    {
      name: 'ResearchPrompt',
      agent: 'ResearchAgent',
      currentVersion: 'v1.4',
      model: 'gpt-4o',
      versions: [
        { version: 'v1.4', date: '2026-08-01', successRate: 98.7, latency: 1.42, costPerReq: 0.021 },
        { version: 'v1.3', date: '2026-07-20', successRate: 91.2, latency: 1.82, costPerReq: 0.026 },
        { version: 'v1.2', date: '2026-07-05', successRate: 85.4, latency: 2.10, costPerReq: 0.031 }
      ]
    },
    {
      name: 'SupportTicket',
      agent: 'SupportAgent',
      currentVersion: 'v3.1',
      model: 'claude-3-5-sonnet',
      versions: [
        { version: 'v3.1', date: '2026-08-04', successRate: 99.3, latency: 0.81, costPerReq: 0.009 },
        { version: 'v3.0', date: '2026-07-15', successRate: 97.0, latency: 0.95, costPerReq: 0.012 }
      ]
    }
  ],

  // Error Diagnostics Grouped
  errorsGrouped: [
    {
      id: 'err-01',
      type: 'ToolTimeoutError',
      message: 'CodeInterpreter: Command execution timed out after 5000ms',
      agent: 'CodeAgent',
      tool: 'CodeInterpreter',
      occurrences: 42,
      firstSeen: '2026-08-06 09:12',
      lastSeen: '12 mins ago',
      status: 'UNRESOLVED',
      suggestedCause: 'Python sandbox process blocked on external network call or heavy CPU computation loop.',
      stackTrace: `TimeoutError: Command execution timed out after 5000ms
    at DockerSandbox.execute (src/sandbox/runner.py:142)
    at CodeInterpreter.run (src/tools/code_interpreter.py:89)
    at AgentRunner._invoke_tool (src/agent/executor.py:214)`
    },
    {
      id: 'err-02',
      type: 'RateLimitError',
      message: 'OpenAI API 429: Rate limit exceeded for gpt-4o (TPM 450,000)',
      agent: 'ResearchAgent',
      tool: 'LLM Gateway',
      occurrences: 18,
      firstSeen: '2026-08-07 14:30',
      lastSeen: '1 hour ago',
      status: 'INVESTIGATING',
      suggestedCause: 'Token burst during batch research query execution exceeded tier-4 TPM limit.',
      stackTrace: `RateLimitError: Error code: 429 - {'error': {'message': 'Rate limit reached for gpt-4o in organization'}}
    at OpenAIClient._handle_error (src/providers/openai.py:65)
    at AgentRunner.call_llm (src/agent/executor.py:180)`
    },
    {
      id: 'err-03',
      type: 'DatabaseConnectionError',
      message: 'PostgreSQL connection pool exhausted (max 50 active clients)',
      agent: 'DataAnalystAgent',
      tool: 'DatabaseQuery',
      occurrences: 7,
      firstSeen: '2026-08-08 08:20',
      lastSeen: '3 hours ago',
      status: 'RESOLVED',
      suggestedCause: 'Unclosed database cursors in multi-threading pool during high concurrency spikes.',
      stackTrace: `OperationalError: FATAL: remaining connection slots are reserved for non-replication superuser connections
    at asyncpg.pool.Pool.acquire (asyncpg/pool.py:310)`
    }
  ],

  // Anomalies
  anomalies: [
    {
      id: 'anom-01',
      title: 'Cost Anomaly Detected',
      agent: 'ResearchAgent',
      severity: 'WARNING',
      type: 'COST_SPIKE',
      detectedAt: '2026-08-08 10:15',
      message: 'ResearchAgent cost is 42% higher than baseline ($0.041/req vs $0.029 expected).',
      baseline: '$0.029 / request',
      observed: '$0.041 / request',
      affectedTracesCount: 142
    },
    {
      id: 'anom-02',
      title: 'Latency Spike Alert',
      agent: 'CodeAgent',
      severity: 'CRITICAL',
      type: 'LATENCY_SPIKE',
      detectedAt: '2026-08-08 11:00',
      message: 'P95 latency increased from 3.2s to 8.9s due to Docker sandbox contention.',
      baseline: '3.2s P95',
      observed: '8.9s P95',
      affectedTracesCount: 65
    }
  ],

  // FinOps AI Cost Analytics Data
  costs: {
    today: 18.42,
    weekly: 112.50,
    monthly: 482.10,
    projectedMonthly: 560.00,
    budget: 650.00,
    remaining: 167.90,
    byAgent: [
      { name: 'ResearchAgent', cost: 7.45, pct: 40.4 },
      { name: 'PlannerAgent', cost: 3.85, pct: 20.9 },
      { name: 'SupportAgent', cost: 3.12, pct: 16.9 },
      { name: 'CodeAgent', cost: 2.98, pct: 16.2 },
      { name: 'DataAnalystAgent', cost: 0.92, pct: 5.0 },
      { name: 'Others', cost: 0.10, pct: 0.6 }
    ],
    byModel: [
      { name: 'gpt-4o', cost: 11.20, pct: 60.8 },
      { name: 'claude-3-5-sonnet', cost: 5.62, pct: 30.5 },
      { name: 'gemini-1-5-pro', cost: 1.15, pct: 6.2 },
      { name: 'Others', cost: 0.45, pct: 2.5 }
    ]
  },

  // Evaluations Runs
  evaluations: [
    {
      id: 'eval-01',
      name: 'Research Accuracy Benchmark v2.4',
      date: '2026-08-07',
      agent: 'ResearchAgent',
      samples: 500,
      scores: {
        correctness: 94.2,
        faithfulness: 96.8,
        relevance: 95.1,
        hallucinationRate: 2.4,
        toxicity: 0.0
      }
    },
    {
      id: 'eval-02',
      name: 'Support Ticket QA Evaluation',
      date: '2026-08-06',
      agent: 'SupportAgent',
      samples: 1200,
      scores: {
        correctness: 98.1,
        faithfulness: 99.4,
        relevance: 97.8,
        hallucinationRate: 0.8,
        toxicity: 0.0
      }
    }
  ],

  // System Infrastructure Health Nodes
  servicesHealth: [
    { name: 'OpenTelemetry OTLP Collector', type: 'Ingestion Engine', status: 'HEALTHY', latencyMs: 12, uptime: '99.99%' },
    { name: 'Vector DB Index (Pinecone)', type: 'Database', status: 'HEALTHY', latencyMs: 24, uptime: '99.95%' },
    { name: 'PostgreSQL Telemetry DB', type: 'Database', status: 'HEALTHY', latencyMs: 8, uptime: '99.99%' },
    { name: 'OpenAI API Gateway', type: 'LLM Provider', status: 'HEALTHY', latencyMs: 320, uptime: '99.85%' },
    { name: 'Anthropic API Gateway', type: 'LLM Provider', status: 'HEALTHY', latencyMs: 280, uptime: '99.92%' },
    { name: 'CodeInterpreter Sandbox Pool', type: 'Runtime Environment', status: 'DEGRADED', latencyMs: 1450, uptime: '98.50%' }
  ]
};
