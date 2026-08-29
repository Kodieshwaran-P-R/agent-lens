/**
 * AgentLens - Dedicated Sign In View Module with Left-Half Blue Grid Mesh
 */

window.SigninView = {
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
              <span>v2.4.0 OTLP Native</span>
            </div>
          </div>

          <!-- Center Value Proposition -->
          <div class="space-y-6 max-w-lg z-10 my-auto">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs font-mono">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Observability & Tracing for Autonomous AI</span>
            </div>

            <h1 class="font-display text-4xl font-extrabold text-white leading-tight tracking-tight shadow-sm">
              Observe every decision your AI agents make.
            </h1>

            <p class="text-sm text-blue-50/90 leading-relaxed font-sans">
              Stream OpenTelemetry traces, debug tool call latencies, map execution DAGs, and eliminate LLM token cost waste.
            </p>
          </div>

          <!-- Bottom Footer Information -->
          <div class="flex items-center justify-between text-xs text-white/80 font-mono z-10 border-t border-white/15 pt-4">
            <span>© 2026 AgentLens AI Inc.</span>
            <span>SOC2 Type II · OpenTelemetry</span>
          </div>
        </div>

        <!-- RIGHT HALF: Sign In Form Panel -->
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
              <h2 class="font-display text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
              <p class="text-xs text-zinc-500 dark:text-zinc-400">Sign in to your AgentLens workspace to inspect live telemetry</p>
            </div>

            <!-- Error Feedback Box -->
            <div id="signin-error-box" class="hidden p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2.5">
              <i data-lucide="alert-circle" class="w-4 h-4 flex-shrink-0"></i>
              <span id="signin-error-text">Invalid work email or password.</span>
            </div>

            <!-- Social Login Options -->
            <div class="space-y-2.5">
              <!-- Sign In with Google Button -->
              <button 
                onclick="window.SigninView.handleGoogleLogin()" 
                class="w-full py-3 px-4 rounded-xl bg-surfaceElevated hover:bg-surfaceBorder border border-surfaceBorder hover:border-blue-500/50 text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-3 transition-all shadow-sm cursor-pointer group"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign in with Google</span>
              </button>

              <!-- Sign In with GitHub Button -->
              <button 
                onclick="window.SigninView.handleDemoLogin()" 
                class="w-full py-3 px-4 rounded-xl bg-surfaceElevated hover:bg-surfaceBorder border border-surfaceBorder hover:border-zinc-400 text-slate-900 dark:text-white text-xs font-semibold flex items-center justify-center gap-3 transition-all shadow-sm cursor-pointer"
              >
                <i data-lucide="github" class="w-4 h-4"></i>
                <span>Sign in with GitHub</span>
              </button>
            </div>

            <!-- Divider -->
            <div class="relative flex items-center justify-center">
              <div class="border-t border-surfaceBorder w-full"></div>
              <span class="bg-surfaceDark px-3 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">OR WORK EMAIL</span>
            </div>

            <!-- Email / Password Form -->
            <form id="signin-form" class="space-y-4">
              <div class="space-y-1.5">
                <label for="signin-email" class="block text-xs font-semibold text-slate-800 dark:text-zinc-200">Work Email</label>
                <input 
                  type="email" 
                  id="signin-email" 
                  value="kodieshwaran@agentlens.ai" 
                  placeholder="name@company.com" 
                  required
                  class="w-full bg-surfaceElevated border border-surfaceBorder rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                >
              </div>

              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <label for="signin-password" class="block text-xs font-semibold text-slate-800 dark:text-zinc-200">Password</label>
                  <a href="javascript:void(0)" onclick="window.AgentLensApp.showToast('Password reset dispatched to your email.', 'info')" class="text-xs text-zinc-500 hover:text-slate-900 dark:hover:text-white hover:underline font-medium">Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  id="signin-password" 
                  value="••••••••••••" 
                  placeholder="••••••••••••" 
                  required
                  class="w-full bg-surfaceElevated border border-surfaceBorder rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                >
              </div>

              <div class="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="signin-remember" checked class="rounded bg-surfaceElevated border-surfaceBorder text-black focus:ring-black">
                  <span>Remember me for 30 days</span>
                </label>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                class="w-full py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-xs tracking-wide shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In to Workspace</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </form>

            <!-- Quick 1-Click Demo Mode -->
            <div class="pt-1">
              <button 
                onclick="window.SigninView.handleDemoLogin()"
                class="w-full py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder hover:border-zinc-400 text-slate-900 dark:text-white font-mono font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <i data-lucide="sparkles" class="w-4 h-4"></i>
                <span>⚡ Instant 1-Click Guest Demo</span>
              </button>
            </div>

            <!-- Bottom Switch to Sign Up -->
            <p class="text-center text-xs text-zinc-500 dark:text-zinc-400">
              Don't have an account? 
              <a href="#/signup" class="text-slate-900 dark:text-white font-bold hover:underline">Create AgentLens Workspace →</a>
            </p>
          </div>
        </div>
      </div>
    `;

    // Event Listener setup
    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
      const form = document.getElementById('signin-form');
      if (form) {
        form.onsubmit = (e) => {
          e.preventDefault();
          const email = document.getElementById('signin-email').value;
          const password = document.getElementById('signin-password').value;
          const res = window.AuthService.signIn(email, password);
          if (res.success) {
            window.location.hash = '#/dashboard';
          } else {
            const errBox = document.getElementById('signin-error-box');
            const errText = document.getElementById('signin-error-text');
            if (errBox && errText) {
              errText.innerText = res.error;
              errBox.classList.remove('hidden');
            }
          }
        };
      }
    }, 50);
  },

  handleGoogleLogin: function() {
    window.AuthService.signInWithGoogle();
    window.location.hash = '#/dashboard';
  },

  handleDemoLogin: function() {
    window.AuthService.signInDemo();
    window.location.hash = '#/dashboard';
  }
};
