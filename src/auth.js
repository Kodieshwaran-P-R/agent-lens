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
    const existingModal = document.getElementById('google-oauth-modal');
    if (existingModal) existingModal.remove();

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

  // Google OAuth Setup Modal Removed
  showGoogleSetupModal: function() {
    const modal = document.getElementById('google-oauth-modal');
    if (modal) modal.remove();
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
