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

  getEnvSource: function() {
    if (this.env.VITE_GOOGLE_CLIENT_ID || this.env.GOOGLE_CLIENT_ID) {
      return '.env';
    }
    if (localStorage.getItem('agentlens_google_client_id')) {
      return 'localStorage';
    }
    return 'unset';
  }
};

// Initialize immediately
window.AppConfig.init();
