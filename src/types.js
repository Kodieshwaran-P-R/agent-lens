/**
 * AgentLens - Data Type Declarations & Enums
 */

window.AgentLensTypes = {
  SpanType: {
    AGENT: 'AGENT',
    LLM: 'LLM',
    TOOL: 'TOOL',
    DATABASE: 'DATABASE',
    HTTP_API: 'HTTP_API',
    WORKFLOW: 'WORKFLOW'
  },
  
  Status: {
    SUCCESS: 'SUCCESS',
    RUNNING: 'RUNNING',
    WAITING: 'WAITING',
    WARNING: 'WARNING',
    ERROR: 'ERROR'
  },

  HealthStatus: {
    HEALTHY: 'HEALTHY',
    DEGRADED: 'DEGRADED',
    CRITICAL: 'CRITICAL'
  },

  LogLevel: {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    FATAL: 'FATAL'
  }
};
