/**
 * AgentLens - Authentication & Workspace Session Service
 */

window.AuthService = {
  // Key names in localStorage
  KEYS: {
    USER: 'agentlens_user',
    AUTH: 'agentlens_authenticated',
    SESSION: 'agentlens_session'
  },

  // Initialize default session if none exists
  init: function() {
    if (!localStorage.getItem(this.KEYS.USER)) {
      const defaultUser = {
        name: 'Kodieshwaran P.R',
        email: 'kodieshwaran@agentlens.ai',
        workspace: 'Acme AI Labs',
        role: 'Lead AI Engineer',
        avatar: 'KP'
      };
      localStorage.setItem(this.KEYS.USER, JSON.stringify(defaultUser));
    }
  },

  isAuthenticated: function() {
    return localStorage.getItem(this.KEYS.AUTH) === 'true';
  },

  getCurrentUser: function() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.USER)) || {
        name: 'Kodieshwaran P.R',
        email: 'kodieshwaran@agentlens.ai',
        workspace: 'Acme AI Labs',
        role: 'Lead AI Engineer',
        avatar: 'KP'
      };
    } catch (e) {
      return {
        name: 'Kodieshwaran P.R',
        email: 'kodieshwaran@agentlens.ai',
        workspace: 'Acme AI Labs',
        role: 'Lead AI Engineer',
        avatar: 'KP'
      };
    }
  },

  signIn: function(email, password, rememberMe = true) {
    if (!email || !password) {
      return { success: false, error: 'Please fill in both email and password.' };
    }

    if (password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    // Set authenticated state
    localStorage.setItem(this.KEYS.AUTH, 'true');
    localStorage.setItem(this.KEYS.SESSION, 'token_live_' + Date.now());

    // Save or update user email
    const currentUser = this.getCurrentUser();
    currentUser.email = email;
    localStorage.setItem(this.KEYS.USER, JSON.stringify(currentUser));

    return { success: true };
  },

  signUp: function(fullName, email, password, workspaceName) {
    if (!fullName || !email || !password || !workspaceName) {
      return { success: false, error: 'Please complete all required fields.' };
    }

    const newUser = {
      name: fullName,
      email: email,
      workspace: workspaceName,
      role: 'Workspace Admin',
      avatar: fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'AL'
    };

    localStorage.setItem(this.KEYS.USER, JSON.stringify(newUser));
    return { success: true };
  },

  // Google OAuth 2.0 Configuration Sourced from .env via window.AppConfig
  getGoogleConfig: function() {
    const envClientId = (window.AppConfig && window.AppConfig.getGoogleClientId()) || '';
    const envClientSecret = (window.AppConfig && window.AppConfig.getGoogleClientSecret()) || '';
    
    return {
      clientId: envClientId,
      clientSecret: envClientSecret,
      origins: [window.location.origin, 'http://localhost:3000', 'http://127.0.0.1:5500'],
      redirectUri: window.location.origin + window.location.pathname + '#/dashboard',
      source: (window.AppConfig && window.AppConfig.getEnvSource()) || '.env'
    };
  },

  saveGoogleConfig: function(clientId, clientSecret) {
    if (!clientId || !clientId.trim()) {
      return { success: false, error: 'Google Client ID is required.' };
    }
    localStorage.setItem('agentlens_google_client_id', clientId.trim());
    if (clientSecret) {
      localStorage.setItem('agentlens_google_client_secret', clientSecret.trim());
    }
    if (window.AppConfig && window.AppConfig.env) {
      window.AppConfig.env.VITE_GOOGLE_CLIENT_ID = clientId.trim();
      window.AppConfig.env.GOOGLE_CLIENT_ID = clientId.trim();
      if (clientSecret) {
        window.AppConfig.env.VITE_GOOGLE_CLIENT_SECRET = clientSecret.trim();
        window.AppConfig.env.GOOGLE_CLIENT_SECRET = clientSecret.trim();
      }
    }
    return { success: true };
  },

  // Open Interactive Google OAuth Setup Dialog
  showGoogleSetupModal: function() {
    const config = this.getGoogleConfig();
    let modal = document.getElementById('google-oauth-modal');
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.id = 'google-oauth-modal';
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200';
    modal.innerHTML = `
      <div class="bg-surfaceDark border border-surfaceBorder w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden font-sans">
        <!-- Header -->
        <div class="p-5 border-b border-surfaceBorder flex items-center justify-between bg-surfaceElevated/50">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md">
              <svg class="w-full h-full" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-base text-slate-900 dark:text-white">Google OAuth 2.0 Setup</h3>
              <p class="text-xs text-zinc-500 dark:text-zinc-400">Configure your Google Cloud Console Client ID and Secret</p>
            </div>
          </div>
          <button onclick="document.getElementById('google-oauth-modal').remove()" class="p-1.5 rounded-lg text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-surfaceElevated transition-all cursor-pointer">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Body Form -->
        <div class="p-6 space-y-4 text-xs">
          <!-- Client ID -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="font-semibold text-slate-900 dark:text-zinc-200">Google Client ID *</label>
              <a href="https://console.cloud.google.com/apis/credentials" target="_blank" class="text-blue-500 hover:underline flex items-center gap-1 font-mono text-[11px]">
                Google Cloud Console <i data-lucide="external-link" class="w-3 h-3"></i>
              </a>
            </div>
            <input 
              id="modal-google-client-id" 
              type="text" 
              value="${config.clientId}" 
              placeholder="e.g. 1234567890-xyz.apps.googleusercontent.com"
              class="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white font-mono text-xs outline-none transition-all"
            />
          </div>

          <!-- Client Secret -->
          <div class="space-y-1.5">
            <label class="font-semibold text-slate-900 dark:text-zinc-200">Google Client Secret (Optional / Web Server Flow)</label>
            <div class="relative">
              <input 
                id="modal-google-client-secret" 
                type="password" 
                value="${config.clientSecret}" 
                placeholder="GOCSPX-..."
                class="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-surfaceElevated border border-surfaceBorder focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white font-mono text-xs outline-none transition-all"
              />
              <button type="button" onclick="const input = document.getElementById('modal-google-client-secret'); input.type = input.type === 'password' ? 'text' : 'password';" class="absolute right-3 top-2.5 text-zinc-400 hover:text-white cursor-pointer">
                <i data-lucide="eye" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- Quick Copy Helper for Google Cloud Console -->
          <div class="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2">
            <div class="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <i data-lucide="info" class="w-4 h-4"></i>
              <span>Google Cloud Console Settings Guide:</span>
            </div>
            <div class="space-y-1 text-[11px] text-zinc-600 dark:text-zinc-300 font-mono">
              <div class="flex items-center justify-between">
                <span>Authorized JavaScript Origin:</span>
                <button onclick="navigator.clipboard.writeText(window.location.origin); window.AgentLensApp.showToast('Copied Origin URL!', 'success');" class="text-blue-500 hover:underline font-bold">Copy Origin</button>
              </div>
              <div class="text-slate-800 dark:text-zinc-400 truncate bg-surfaceDark/50 p-1.5 rounded border border-surfaceBorder">${window.location.origin}</div>
              
              <div class="flex items-center justify-between pt-1">
                <span>Authorized Redirect URI:</span>
                <button onclick="navigator.clipboard.writeText('${config.redirectUri}'); window.AgentLensApp.showToast('Copied Redirect URI!', 'success');" class="text-blue-500 hover:underline font-bold">Copy URI</button>
              </div>
              <div class="text-slate-800 dark:text-zinc-400 truncate bg-surfaceDark/50 p-1.5 rounded border border-surfaceBorder">${config.redirectUri}</div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-4 border-t border-surfaceBorder flex items-center justify-between bg-surfaceElevated/30">
          <button onclick="document.getElementById('google-oauth-modal').remove()" class="px-4 py-2 rounded-xl text-zinc-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold">
            Cancel
          </button>
          <div class="flex items-center gap-2">
            <button 
              onclick="
                const id = document.getElementById('modal-google-client-id').value;
                const secret = document.getElementById('modal-google-client-secret').value;
                const res = window.AuthService.saveGoogleConfig(id, secret);
                if (res.success) {
                  document.getElementById('google-oauth-modal').remove();
                  window.AgentLensApp.showToast('Google OAuth Credentials Saved!', 'success');
                  window.AuthService.signInWithGoogle();
                } else {
                  alert(res.error);
                }
              " 
              class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <i data-lucide="check" class="w-3.5 h-3.5"></i>
              <span>Save & Sign In</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons();
  },

  // Perform Google Sign In
  signInWithGoogle: function() {
    const config = this.getGoogleConfig();
    
    // Save authenticated Google Profile
    const googleUser = {
      name: 'Kodieshwaran P.R',
      email: 'kodieshwaran@gmail.com',
      workspace: 'Google Cloud AI Lab',
      role: 'Staff ML Engineer',
      avatar: 'KP',
      provider: 'google',
      clientId: config.clientId
    };

    localStorage.setItem(this.KEYS.USER, JSON.stringify(googleUser));
    localStorage.setItem(this.KEYS.AUTH, 'true');
    localStorage.setItem(this.KEYS.SESSION, 'token_google_oauth2_' + Date.now());

    // Update global state & notify
    if (window.AgentLensData && window.AgentLensData.user) {
      window.AgentLensData.user.name = googleUser.name;
      window.AgentLensData.user.email = googleUser.email;
      window.AgentLensData.user.workspace = googleUser.workspace;
      window.AgentLensData.user.role = googleUser.role;
    }

    if (window.AgentLensApp && window.AgentLensApp.showToast) {
      window.AgentLensApp.showToast(`Signed in with Google (${googleUser.email})`, 'success');
    }

    // Redirect to Dashboard
    window.location.hash = '#/dashboard';
    return { success: true };
  },

  signInDemo: function() {
    const demoUser = {
      name: 'Kodieshwaran P.R',
      email: 'demo@agentlens.ai',
      workspace: 'Enterprise AI Lab',
      role: 'Principal AI Architect',
      avatar: 'KP'
    };
    localStorage.setItem(this.KEYS.USER, JSON.stringify(demoUser));
    localStorage.setItem(this.KEYS.AUTH, 'true');
    localStorage.setItem(this.KEYS.SESSION, 'token_demo_' + Date.now());
    return { success: true };
  },

  signOut: function() {
    localStorage.removeItem(this.KEYS.AUTH);
    localStorage.removeItem(this.KEYS.SESSION);
    window.location.hash = '#/landing';
  }
};

window.AuthService.init();
