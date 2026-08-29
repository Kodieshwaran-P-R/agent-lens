/**
 * AgentLens - Settings & API Keys View Module
 */

window.SettingsView = {
  render: function(container) {
    const currentTheme = localStorage.getItem('agentlens_theme') || 'dark';

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-white tracking-tight">WORKSPACE SETTINGS & API KEYS</h1>
            <p class="text-xs text-zinc-400 mt-1">Manage themes, appearance, API keys, retention rules, and notification webhooks</p>
          </div>
        </div>

        <!-- Appearance & Theme Switcher Card -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-xl">
          <div class="border-b border-surfaceBorder pb-3">
            <h3 class="font-bold text-sm text-white">Appearance & Theme Mode</h3>
            <p class="text-xs text-zinc-400">Choose between dark mode and light mode for optimal contrast and convenience</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg font-sans">
            <!-- Dark Theme Option -->
            <button onclick="window.ThemeService.setTheme('dark', true)" class="p-4 rounded-xl border ${currentTheme === 'dark' ? 'border-brandBlue bg-surfaceElevated ring-1 ring-brandBlue' : 'border-surfaceBorder bg-black hover:border-zinc-500'} text-left space-y-2 transition-all cursor-pointer">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-white flex items-center gap-2">
                  <i data-lucide="moon" class="w-4 h-4"></i> Dark Mode (Obsidian)
                </span>
                ${currentTheme === 'dark' ? '<span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-black">ACTIVE</span>' : ''}
              </div>
              <p class="text-xs text-zinc-400">High-contrast pure black and obsidian surfaces with crisp typography.</p>
            </button>

            <!-- Light Theme Option -->
            <button onclick="window.ThemeService.setTheme('light', true)" class="p-4 rounded-xl border ${currentTheme === 'light' ? 'border-brandBlue bg-surfaceElevated ring-1 ring-brandBlue' : 'border-surfaceBorder bg-zinc-900/50 hover:border-zinc-500'} text-left space-y-2 transition-all cursor-pointer">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-white flex items-center gap-2">
                  <i data-lucide="sun" class="w-4 h-4"></i> Light Mode (Pure Clean)
                </span>
                ${currentTheme === 'light' ? '<span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-black">ACTIVE</span>' : ''}
              </div>
              <p class="text-xs text-zinc-400">Crisp clean light surfaces for bright environments and daylight work.</p>
            </button>
          </div>
        </div>

        <!-- Google OAuth 2.0 & Sign In Setup Card (Sourced from .env) -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-xl">
          <div class="flex items-center justify-between border-b border-surfaceBorder pb-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shadow-sm">
                <svg class="w-full h-full" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-sm text-slate-900 dark:text-white">Google OAuth 2.0 & SSO (.env Protected)</h3>
                <p class="text-xs text-zinc-500 dark:text-zinc-400">Credentials sourced directly from <span class="font-mono text-blue-500 font-bold">.env</span> file (<span class="font-mono text-zinc-400">VITE_GOOGLE_CLIENT_ID</span>)</p>
              </div>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              ● SOURCED VIA .ENV
            </span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            <!-- Client ID Field -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label class="font-semibold text-slate-900 dark:text-zinc-200">Google Client ID (VITE_GOOGLE_CLIENT_ID)</label>
                <a href="https://console.cloud.google.com/apis/credentials" target="_blank" class="text-blue-500 hover:underline flex items-center gap-1 font-mono text-[11px]">
                  Google Cloud Console <i data-lucide="external-link" class="w-3 h-3"></i>
                </a>
              </div>
              <input 
                id="settings-google-client-id" 
                type="text" 
                value="${(window.AppConfig && window.AppConfig.getGoogleClientId()) || ''}" 
                placeholder="Set in .env or paste here"
                class="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white font-mono text-xs outline-none transition-all"
              />
            </div>

            <!-- Client Secret Field -->
            <div class="space-y-1.5">
              <label class="font-semibold text-slate-900 dark:text-zinc-200">Google Client Secret (VITE_GOOGLE_CLIENT_SECRET)</label>
              <div class="relative">
                <input 
                  id="settings-google-client-secret" 
                  type="password" 
                  value="${(window.AppConfig && window.AppConfig.getGoogleClientSecret()) || ''}" 
                  placeholder="Set in .env or paste here"
                  class="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-surfaceElevated border border-surfaceBorder focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white font-mono text-xs outline-none transition-all"
                />
                <button type="button" onclick="const input = document.getElementById('settings-google-client-secret'); input.type = input.type === 'password' ? 'text' : 'password';" class="absolute right-3 top-2.5 text-zinc-400 hover:text-white cursor-pointer">
                  <i data-lucide="eye" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- .env File Snippet Helper -->
          <div class="p-3.5 rounded-xl bg-surfaceElevated/80 border border-surfaceBorder space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="font-semibold text-slate-800 dark:text-zinc-300 font-mono">Your .env Configuration:</span>
              <button onclick="navigator.clipboard.writeText('VITE_GOOGLE_CLIENT_ID=' + document.getElementById('settings-google-client-id').value + '\nVITE_GOOGLE_CLIENT_SECRET=' + document.getElementById('settings-google-client-secret').value); window.AgentLensApp.showToast('Copied .env block to clipboard!', 'success');" class="text-blue-500 hover:underline font-bold font-mono text-[11px]">
                Copy .env Block
              </button>
            </div>
            <pre class="p-2.5 bg-black/60 rounded-lg text-[11px] font-mono text-blue-300 overflow-x-auto border border-surfaceBorder"># .env
VITE_GOOGLE_CLIENT_ID=${(window.AppConfig && window.AppConfig.getGoogleClientId()) || 'your_google_client_id_here'}
VITE_GOOGLE_CLIENT_SECRET=${(window.AppConfig && window.AppConfig.getGoogleClientSecret()) ? '••••••••••••••••' : 'your_google_client_secret_here'}</pre>
          </div>

          <!-- Save and Test Actions -->
          <div class="flex items-center justify-between pt-2">
            <button 
              onclick="window.AuthService.signInWithGoogle()" 
              class="px-4 py-2 rounded-xl bg-surfaceElevated border border-surfaceBorder hover:border-blue-500/40 text-slate-900 dark:text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Test Google Sign-In</span>
            </button>

            <button 
              onclick="
                const id = document.getElementById('settings-google-client-id').value;
                const secret = document.getElementById('settings-google-client-secret').value;
                const res = window.AuthService.saveGoogleConfig(id, secret);
                if (res.success) {
                  window.AgentLensApp.showToast('Environment Configuration Updated & Saved!', 'success');
                } else {
                  alert(res.error);
                }
              " 
              class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <i data-lucide="save" class="w-3.5 h-3.5"></i>
              <span>Save to Active Environment</span>
            </button>
          </div>
        </div>

        <!-- API Keys Management Card -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-xl">
          <div class="flex items-center justify-between border-b border-surfaceBorder pb-3">
            <div>
              <h3 class="font-bold text-sm text-white">Active Telemetry API Keys</h3>
              <p class="text-xs text-zinc-400">Keys used to authenticate OpenTelemetry SDKs and HTTP collectors</p>
            </div>
            <button onclick="window.AgentLensApp.showToast('Generated new API Key: al_live_' + Math.random().toString(36).substring(2,10), 'success')" class="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md">
              <i data-lucide="key" class="w-4 h-4 text-white"></i>
              <span>Generate New API Key</span>
            </button>
          </div>

          <div class="space-y-3 font-mono text-xs">
            <div class="p-3.5 bg-surfaceElevated rounded-lg border border-surfaceBorder flex items-center justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-slate-900 dark:text-white">Production Ingestion Key</span>
                  <span class="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-500 border border-blue-500/20">ACTIVE</span>
                </div>
                <div class="text-zinc-400 mt-1">al_live_9812471928...4f1a</div>
              </div>
              <button onclick="window.AgentLensApp.showToast('Copied API Key to clipboard!', 'info')" class="px-3 py-1.5 rounded bg-surfaceDark hover:bg-surfaceBorder text-slate-900 dark:text-zinc-200 border border-surfaceBorder">Copy Key</button>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
    }, 50);
  }
};

