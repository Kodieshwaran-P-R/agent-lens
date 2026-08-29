/**
 * AgentLens - Sessions Explorer View Module
 */

window.SessionsView = {
  render: function(container) {
    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surfaceBorder">
          <div>
            <h1 class="text-xl font-bold text-slate-100 tracking-tight">CONVERSATION SESSIONS EXPLORER</h1>
            <p class="text-xs text-slate-400 mt-1">Multi-turn user conversation sessions and session-level aggregate metrics</p>
          </div>
        </div>

        <!-- Sessions Table -->
        <div class="bg-surfaceDark border border-surfaceBorder rounded-xl overflow-hidden shadow-lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-surfaceBorder bg-bgDark/50 text-slate-400 font-mono">
                  <th class="py-3.5 px-4">SESSION ID</th>
                  <th class="py-3.5 px-4">USER ID</th>
                  <th class="py-3.5 px-4">PRIMARY AGENT</th>
                  <th class="py-3.5 px-4">EXECUTIONS</th>
                  <th class="py-3.5 px-4">DURATION</th>
                  <th class="py-3.5 px-4">TOTAL TOKENS</th>
                  <th class="py-3.5 px-4">TOTAL COST</th>
                  <th class="py-3.5 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surfaceBorder text-slate-200 font-mono">
                <tr class="hover:bg-surfaceElevated/60 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-brandBlue">sess-98214</td>
                  <td class="py-3.5 px-4 text-slate-300 font-sans">usr_researcher_84</td>
                  <td class="py-3.5 px-4 text-slate-100 font-sans">ResearchAgent</td>
                  <td class="py-3.5 px-4 text-slate-300">4 runs</td>
                  <td class="py-3.5 px-4 text-slate-300">8.4s</td>
                  <td class="py-3.5 px-4 text-brandBlue">9,420</td>
                  <td class="py-3.5 px-4 text-emerald-400">$0.142</td>
                  <td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded text-[10px] bg-statusSuccess/10 text-statusSuccess border border-statusSuccess/30">ACTIVE</span></td>
                </tr>
                <tr class="hover:bg-surfaceElevated/60 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-brandBlue">sess-98215</td>
                  <td class="py-3.5 px-4 text-slate-300 font-sans">usr_dev_102</td>
                  <td class="py-3.5 px-4 text-slate-100 font-sans">CodeAgent</td>
                  <td class="py-3.5 px-4 text-slate-300">2 runs</td>
                  <td class="py-3.5 px-4 text-slate-300">5.4s</td>
                  <td class="py-3.5 px-4 text-brandBlue">4,890</td>
                  <td class="py-3.5 px-4 text-emerald-400">$0.078</td>
                  <td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded text-[10px] bg-statusError/10 text-statusError border border-statusError/30">ERROR</span></td>
                </tr>
                <tr class="hover:bg-surfaceElevated/60 transition-colors">
                  <td class="py-3.5 px-4 font-bold text-brandBlue">sess-98216</td>
                  <td class="py-3.5 px-4 text-slate-300 font-sans">usr_cust_391</td>
                  <td class="py-3.5 px-4 text-slate-100 font-sans">SupportAgent</td>
                  <td class="py-3.5 px-4 text-slate-300">1 run</td>
                  <td class="py-3.5 px-4 text-slate-300">0.8s</td>
                  <td class="py-3.5 px-4 text-brandBlue">890</td>
                  <td class="py-3.5 px-4 text-emerald-400">$0.009</td>
                  <td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded text-[10px] bg-statusSuccess/10 text-statusSuccess border border-statusSuccess/30">CLOSED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => lucide.createIcons(), 50);
  }
};
