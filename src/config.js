/**
 * AgentLens - Environment Configuration & .env Loader
 * Sourced securely from .env and build variables
 */

window.AppConfig = {
  env: {},

  init: function() {
    // 1. Check build environment if available (Vite / Webpack / bundlers)
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      this.env.GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.GOOGLE_CLIENT_ID;
      this.env.GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET || import.meta.env.GOOGLE_CLIENT_SECRET;
      this.env.GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
      this.env.OTEL_ENDPOINT = import.meta.env.VITE_OTEL_EXPORTER_OTLP_ENDPOINT;
    }

    // 2. Check window.ENV if injected by server
    if (window.ENV && typeof window.ENV === 'object') {
      Object.assign(this.env, window.ENV);
    }

    // 3. Attempt runtime fetch of .env file for local dev servers
    this.loadDotEnvFile();
  },

  loadDotEnvFile: function() {
    fetch('.env')
      .then(response => {
        if (!response.ok) return '';
        return response.text();
      })
      .then(text => {
        if (!text) return;
        const lines = text.split('\n');
        lines.forEach(line => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) return;
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx > 0) {
            const key = trimmed.substring(0, eqIdx).trim();
            let value = trimmed.substring(eqIdx + 1).trim();
            // Remove wrapping quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1);
            }
            this.env[key] = value;
          }
        });
      })
      .catch(() => {
        // Silent catch for production static hosting without .env served
      });
  },

  getGoogleClientId: function() {
    return this.env.VITE_GOOGLE_CLIENT_ID || 
           this.env.GOOGLE_CLIENT_ID || 
           localStorage.getItem('agentlens_google_client_id') || 
           '';
  },

  getGoogleClientSecret: function() {
    return this.env.VITE_GOOGLE_CLIENT_SECRET || 
           this.env.GOOGLE_CLIENT_SECRET || 
           localStorage.getItem('agentlens_google_client_secret') || 
           '';
  },

  isGoogleConfigured: function() {
    const id = this.getGoogleClientId();
    return !!(id && id.trim() && !id.includes('your_google_client_id_here'));
  },

  getGeminiApiKey: function() {
    return this.env.VITE_GEMINI_API_KEY || 
           this.env.GEMINI_API_KEY || 
           localStorage.getItem('agentlens_gemini_api_key') || 
           '';
  },

  saveGeminiApiKey: function(key) {
    if (!key) {
      localStorage.removeItem('agentlens_gemini_api_key');
      delete this.env.VITE_GEMINI_API_KEY;
      delete this.env.GEMINI_API_KEY;
      return;
    }
    const cleanKey = key.trim();
    localStorage.setItem('agentlens_gemini_api_key', cleanKey);
    this.env.VITE_GEMINI_API_KEY = cleanKey;
    this.env.GEMINI_API_KEY = cleanKey;
  },

  isGeminiConfigured: function() {
    const key = this.getGeminiApiKey();
    return Boolean(key && key.trim().length > 10);
  },

  getEnvSource: function() {
    if (this.env.VITE_GOOGLE_CLIENT_ID || this.env.GOOGLE_CLIENT_ID || this.env.VITE_GEMINI_API_KEY) {
      return '.env';
    }
    if (localStorage.getItem('agentlens_google_client_id') || localStorage.getItem('agentlens_gemini_api_key')) {
      return 'localStorage';
    }
    return 'unset';
  }
};

// Initialize immediately
window.AppConfig.init();
