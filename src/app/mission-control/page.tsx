'use client';

import GaugeReadout from '@/components/GaugeReadout';
import NodeGraph from '@/components/NodeGraph';
import { actionsLog, systemStats } from '@/lib/mockData';

export default function MissionControlDashboard() {
  return (
    <div className="p-3 grid grid-cols-2 grid-rows-2 gap-2 h-[calc(100vh-64px)]">
      {/* Top Left: System Status */}
      <div className="border border-[#333] p-3 overflow-hidden bg-black">
        <div className="text-xs text-term-dim mb-3">-- SYSTEM STATUS --</div>

        <div className="flex items-center gap-2 mb-3 text-xs">
          <span className="text-white" style={{ animation: 'pulse 2s infinite' }}>●</span>
          <span className="text-white">AUTOPILOT ENGAGED</span>
          <span className="text-term-dim">UPTIME: {systemStats.uptimeHours.toLocaleString()}H</span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <GaugeReadout label="SPEND" value={`$${(systemStats.totalSpend / 1000).toFixed(1)}K`} percentage={78} />
          <GaugeReadout label="ROAS" value={`${systemStats.avgRoas}x`} percentage={71} />
          <GaugeReadout label="ACTIVE" value={`${systemStats.activeCampaigns}`} percentage={62} />
          <GaugeReadout label="CONV" value={`${systemStats.conversionsToday}`} percentage={85} />
        </div>
      </div>

      {/* Top Right: Mini Node Graph */}
      <div className="border border-[#333] p-3 overflow-hidden bg-black">
        <div className="text-xs text-term-dim mb-1">-- NODE TREE --</div>
        <NodeGraph compact />
      </div>

      {/* Bottom Left: Actions Log */}
      <div className="border border-[#333] p-3 overflow-auto bg-black">
        <div className="text-xs text-term-dim mb-2">-- LOG --</div>
        <div className="space-y-1 text-xs font-mono">
          {actionsLog.map((entry, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-term-dim shrink-0">{entry.time}</span>
              <span className="text-term-white opacity-70">{entry.action}</span>
            </div>
          ))}
          <div className="text-white mt-1" style={{ animation: 'blink 1s infinite' }}>█</div>
        </div>
      </div>

      {/* Bottom Right: Telemetry */}
      <div className="border border-[#333] p-3 overflow-auto bg-black">
        <div className="text-xs text-term-dim mb-2">-- TELEMETRY --</div>
        <div className="space-y-2 text-xs">
          {[
            { label: 'DAILY SPEND', value: '$1,775 / $1,875', pct: 94.7 },
            { label: 'FLEET ROAS', value: '3.55x', pct: 71 },
            { label: 'CONV/HR', value: '18.4', pct: 82 },
            { label: 'BUDGET UTIL', value: '94.7%', pct: 94.7 },
            { label: 'CREATIVE FAT', value: '0.23', pct: 23 },
            { label: 'AUDIENCE SAT', value: '67%', pct: 67 },
          ].map((item, i) => {
            const barWidth = 20;
            const filled = Math.round((item.pct / 100) * barWidth);
            const bar = '█'.repeat(filled) + '░'.repeat(barWidth - filled);
            return (
              <div key={i} className="flex justify-between text-term-dim">
                <span>{item.label}</span>
                <span className="text-white">{item.value} {bar}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
