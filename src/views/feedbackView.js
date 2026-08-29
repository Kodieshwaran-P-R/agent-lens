/**
 * AgentLens - Feedback Analytics View Module
 */

window.FeedbackView = {
  render: function(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">USER FEEDBACK & SATISFACTION ANALYTICS</h1>
            <p class="text-xs text-slate-400 mt-1">End-user 👍 / 👎 ratings, feedback comments, and trace quality feedback debugging</p>
          </div>
        </div>

        <!-- Feedback KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-slate-400">Positive Feedback (👍)</div>
            <div class="text-2xl font-bold font-mono text-statusSuccess">96.4%</div>
            <div class="text-[11px] text-slate-400">4,120 positive ratings</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-slate-400">Negative Feedback (👎)</div>
            <div class="text-2xl font-bold font-mono text-statusError">3.6%</div>
            <div class="text-[11px] text-slate-400">154 negative ratings logged</div>
          </div>
          <div class="bg-surfaceDark border border-surfaceBorder p-4 rounded-xl space-y-1">
            <div class="text-xs text-slate-400">Avg Quality Score</div>
            <div class="text-2xl font-bold font-mono text-brandBlue">4.8 / 5.0</div>
            <div class="text-[11px] text-statusSuccess">+0.2 vs last month</div>
          </div>
        </div>

        <!-- Recent Negative Feedback Debug List -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl p-5 space-y-4 shadow-lg">
          <h3 class="font-bold text-sm text-slate-100">Recent Negative Feedback Traces</h3>
          <div class="space-y-3 font-mono text-xs">
            <div class="p-3.5 bg-surfaceElevated rounded-lg border border-surfaceBorder space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-statusError font-bold">👎 Negative (1 Star)</span>
                  <span class="text-slate-400">Trace ID: <a href="#/traces/3bf94d12c8e1" class="text-brandBlue hover:underline">3bf94d12c8e1</a></span>
                </div>
                <span class="text-slate-400 font-sans text-[11px]">15 mins ago</span>
              </div>
              <p class="text-slate-300 font-sans">User comment: "The code generation script took too long and timed out without giving a final response."</p>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
