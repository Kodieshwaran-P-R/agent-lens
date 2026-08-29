/**
 * AgentLens - Dedicated Sign Up View Module with Left-Half Blue Grid Mesh
 */

window.SignupView = {
  render: function(container) {
    container.innerHTML = `
      <div class="min-h-screen w-full flex flex-col lg:flex-row bg-bgDark selection:bg-brandBlue selection:text-black">
        <!-- LEFT HALF: User Uploaded Blue Vertical Gradient & Grid Mesh Panel -->
        <div class="hidden lg:flex lg:w-1/2 auth-grid-bg p-12 flex-col justify-between relative overflow-hidden select-none text-white">
          <!-- Subtle Glow Overlay -->
          <div class="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Top Brand Header -->
          <div class="flex items-center justify-between z-10">
            <a href="#/landing" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-white text-black p-2 shadow-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full" fill="currentColor">
                  <path d="M 50 23.5 C 57.5 23.5, 63.5 28.5, 68 38 L 84 70 C 88.5 79, 83.5 86.5, 73.5 86.5 L 61.5 74.5 L 57.5 62.5 C 55.5 56.5, 53 53, 50 53 C 47 53, 44.5 56.5, 42.5 62.5 L 38.5 74.5 L 26.5 86.5 C 16.5 86.5, 11.5 79, 16 70 L 32 38 C 36.5 28.5, 42.5 23.5, 50 23.5 Z" />
                </svg>
              </div>
              <span class="font-display font-extrabold text-xl tracking-wider text-white">AGENTLENS</span>
            </a>

            <div class="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-white/90">
              <span>Enterprise Tier Available</span>
            </div>
          </div>

          <!-- Center Value Proposition & Capability List -->
          <div class="space-y-6 max-w-lg z-10 my-auto">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs font-mono">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>OpenTelemetry-Native Architecture</span>
            </div>

            <h1 class="font-display text-4xl font-extrabold text-white leading-tight tracking-tight shadow-sm">
              Build visibility into every AI agent.
            </h1>

            <p class="text-sm text-blue-50/90 leading-relaxed font-sans">
              Create your enterprise AgentLens workspace to start observing traces, token costs, LLM calls, and real-time execution graphs.
            </p>

            <!-- Feature Value Pillars -->
            <div class="space-y-3 font-mono text-xs text-white/90">
              <div class="flex items-center gap-3 p-2.5 rounded-xl bg-black/20 backdrop-blur-md border border-white/15">
                <i data-lucide="check" class="w-4 h-4 text-emerald-300 flex-shrink-0"></i>
                <span>Zero-code instrumentation with Python & Node.js OTel SDKs</span>
              </div>
              <div class="flex items-center gap-3 p-2.5 rounded-xl bg-black/20 backdrop-blur-md border border-white/15">
                <i data-lucide="check" class="w-4 h-4 text-emerald-300 flex-shrink-0"></i>
                <span>FinOps budget caps & automated token waste detection</span>
              </div>
              <div class="flex items-center gap-3 p-2.5 rounded-xl bg-black/20 backdrop-blur-md border border-white/15">
                <i data-lucide="check" class="w-4 h-4 text-emerald-300 flex-shrink-0"></i>
                <span>SOC2 Type II security with self-hosted agent collectors</span>
              </div>
            </div>
          </div>

          <!-- Bottom Footer Information -->
          <div class="flex items-center justify-between text-xs text-white/80 font-mono z-10 border-t border-white/15 pt-4">
            <span>© 2026 AgentLens AI Inc.</span>
            <span>All rights reserved.</span>
          </div>
        </div>

        <!-- RIGHT HALF: Sign Up Form Panel -->
        <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative bg-surfaceDark overflow-y-auto">
          <div class="w-full max-w-md space-y-6 my-auto">
            <!-- Header for Mobile & Desktop Navigation -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 lg:hidden">
                <div class="brand-logo-badge w-8 h-8 rounded-lg p-1.5 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="brand-logo-svg w-full h-full">
                    <path d="M 50 23.5 C 57.5 23.5, 63.5 28.5, 68 38 L 84 70 C 88.5 79, 83.5 86.5, 73.5 86.5 L 61.5 74.5 L 57.5 62.5 C 55.5 56.5, 53 53, 50 53 C 47 53, 44.5 56.5, 42.5 62.5 L 38.5 74.5 L 26.5 86.5 C 16.5 86.5, 11.5 79, 16 70 L 32 38 C 36.5 28.5, 42.5 23.5, 50 23.5 Z" />
                  </svg>
                </div>
                <span class="font-display font-bold text-lg text-slate-900 dark:text-white">AGENTLENS</span>
              </div>

              <div class="ml-auto">
                <button onclick="window.ThemeService.toggle()" class="p-2 rounded-lg border border-surfaceBorder bg-surfaceElevated text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer" title="Toggle Theme">
                  <i data-lucide="sun-moon" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <div class="space-y-1">
              <h2 class="font-display text-2xl font-bold text-slate-900 dark:text-white">Create your workspace</h2>
              <p class="text-xs text-zinc-500 dark:text-zinc-400">Start observing your autonomous AI systems in minutes</p>
            </div>

            <!-- Success Alert Box -->
            <div id="signup-success-box" class="hidden p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
              <div class="font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                <span>Workspace created successfully!</span>
              </div>
              <p class="text-zinc-600 dark:text-zinc-300">Your AgentLens workspace is ready. Redirecting to Dashboard...</p>
            </div>

            <!-- Social Signup Options -->
            <div class="space-y-2.5">
              <!-- Sign up with Google Button -->
              <button 
                onclick="window.SignupView.handleGoogleSignup()" 
                class="w-full py-3 px-4 rounded-xl bg-surfaceElevated hover:bg-surfaceBorder border border-surfaceBorder hover:border-blue-500/50 text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-3 transition-all shadow-sm cursor-pointer"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign up with Google</span>
              </button>

              <!-- Setup Credentials Link -->
              <div class="flex items-center justify-between px-1 text-[11px] text-zinc-500 font-mono">
                <span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> OAuth 2.0 Configured</span>
                <button type="button" onclick="window.AuthService.showGoogleSetupModal()" class="text-blue-500 hover:text-blue-400 hover:underline cursor-pointer">
                  ⚙ Edit Client ID / Secret
                </button>
              </div>

              <!-- Sign up with GitHub Button -->
              <button 
                onclick="window.SignupView.handleDemoSignup()" 
                class="w-full py-3 px-4 rounded-xl bg-surfaceElevated hover:bg-surfaceBorder border border-surfaceBorder hover:border-zinc-400 text-slate-900 dark:text-white text-xs font-semibold flex items-center justify-center gap-3 transition-all shadow-sm cursor-pointer"
              >
                <i data-lucide="github" class="w-4 h-4"></i>
                <span>Sign up with GitHub</span>
              </button>
            </div>

            <!-- Divider -->
            <div class="relative flex items-center justify-center">
              <div class="border-t border-surfaceBorder w-full"></div>
              <span class="bg-surfaceDark px-3 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">OR WORK EMAIL</span>
            </div>

            <!-- Signup Form -->
            <form id="signup-form" class="space-y-4">
              <div class="space-y-1.5">
                <label for="signup-name" class="block text-xs font-semibold text-slate-800 dark:text-zinc-200">Full Name</label>
                <input 
                  type="text" 
                  id="signup-name" 
                  placeholder="Alex Morgan" 
                  required 
                  class="w-full bg-surfaceElevated border border-surfaceBorder rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                >
              </div>

              <div class="space-y-1.5">
                <label for="signup-email" class="block text-xs font-semibold text-slate-800 dark:text-zinc-200">Work Email</label>
                <input 
                  type="email" 
                  id="signup-email" 
                  placeholder="alex@company.com" 
                  required 
                  class="w-full bg-surfaceElevated border border-surfaceBorder rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                >
              </div>

              <div class="space-y-1.5">
                <label for="signup-ws" class="block text-xs font-semibold text-slate-800 dark:text-zinc-200">Workspace / Company Name</label>
                <input 
                  type="text" 
                  id="signup-ws" 
                  placeholder="Acme Autonomous AI" 
                  required 
                  class="w-full bg-surfaceElevated border border-surfaceBorder rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                >
              </div>

              <div class="space-y-1.5">
                <label for="signup-password" class="block text-xs font-semibold text-slate-800 dark:text-zinc-200">Password</label>
                <input 
                  type="password" 
                  id="signup-password" 
                  placeholder="Create a secure password" 
                  required 
                  class="w-full bg-surfaceElevated border border-surfaceBorder rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                >
              </div>

              <div class="text-xs text-zinc-500 dark:text-zinc-400">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" required checked class="rounded bg-surfaceElevated border-surfaceBorder text-black focus:ring-black">
                  <span>I agree to the Terms of Service & Privacy Policy</span>
                </label>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="w-full py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wide shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create Free Workspace</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </form>

            <!-- Bottom Switch to Sign In -->
            <p class="text-center text-xs text-zinc-500 dark:text-zinc-400">
              Already have a workspace? 
              <a href="#/signin" class="text-slate-900 dark:text-white font-bold hover:underline">Sign In here →</a>
            </p>
          </div>
        </div>
      </div>
    `;

    // Event Listener setup
    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
      const form = document.getElementById('signup-form');
      if (form) {
        form.onsubmit = (e) => {
          e.preventDefault();
          const name = document.getElementById('signup-name').value;
          const email = document.getElementById('signup-email').value;
          const ws = document.getElementById('signup-ws').value;
          const password = document.getElementById('signup-password').value;

          const res = window.AuthService.signUp(name, email, password, ws);
          if (res.success) {
            const successBox = document.getElementById('signup-success-box');
            if (successBox) successBox.classList.remove('hidden');
            setTimeout(() => {
              window.AuthService.signIn(email, password);
              window.location.hash = '#/dashboard';
            }, 1000);
          }
        };
      }
    }, 50);
  },

  handleGoogleSignup: function() {
    window.AuthService.signInWithGoogle();
    window.location.hash = '#/dashboard';
  }
};
