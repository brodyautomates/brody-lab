'use client';

import GaugeReadout from '@/components/GaugeReadout';
import NodeGraph from '@/components/NodeGraph';
import { actionsLog, systemStats } from '@/lib/mockData';

export default function MissionControlDashboard() {
  return (
    <div className="p-4 grid grid-cols-2 grid-rows-2 gap-4 h-[calc(100vh-80px)]">
      {/* Top Left: System Status */}
      <div className="border border-crt-green bg-crt-navy p-4 overflow-hidden" style={{ boxShadow: '0 0 4px #00ff41' }}>
        <h2 className="text-crt-amber text-xs tracking-widest mb-4" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}>
          SYSTEM STATUS
        </h2>

        {/* Autopilot indicator */}
        <div className="flex items-center gap-3 mb-5 border border-crt-green p-2" style={{ boxShadow: '0 0 8px #00ff41', animation: 'glow-pulse 3s infinite' }}>
          <span className="inline-block w-3 h-3 bg-crt-green" style={{ animation: 'blink 1s infinite' }} />
          <span className="text-crt-green text-sm tracking-widest">AUTOPILOT ENGAGED</span>
        </div>

        {/* Uptime */}
        <div className="text-xs text-crt-green opacity-60 mb-4">
          UPTIME: {systemStats.uptimeHours.toLocaleString()} HRS
        </div>

        {/* Gauges */}
        <div className="grid grid-cols-4 gap-2">
          <GaugeReadout label="TOTAL SPEND" value={`$${(systemStats.totalSpend / 1000).toFixed(1)}K`} percentage={78} />
          <GaugeReadout label="AVG ROAS" value={`${systemStats.avgRoas}x`} percentage={71} color="#ffb000" />
          <GaugeReadout label="ACTIVE" value={`${systemStats.activeCampaigns}`} percentage={62} />
          <GaugeReadout label="CONV TODAY" value={`${systemStats.conversionsToday}`} percentage={85} color="#ffb000" />
        </div>
      </div>

      {/* Top Right: Mini Node Graph */}
      <div className="border border-crt-green bg-crt-navy p-4 overflow-hidden" style={{ boxShadow: '0 0 4px #00ff41' }}>
        <h2 className="text-crt-amber text-xs tracking-widest mb-2" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}>
          AGENT PIPELINE STATUS
        </h2>
        <NodeGraph compact />
      </div>

      {/* Bottom Left: Actions Log */}
      <div className="border border-crt-green bg-crt-navy p-4 overflow-auto" style={{ boxShadow: '0 0 4px #00ff41' }}>
        <h2 className="text-crt-amber text-xs tracking-widest mb-4" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}>
          RECENT ACTIONS
        </h2>
        <div className="space-y-2 font-mono text-sm">
          {actionsLog.map((entry, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-crt-amber shrink-0">[{entry.time}]</span>
              <span className="text-crt-green opacity-80">{entry.action}</span>
            </div>
          ))}
          <div className="text-crt-green mt-2" style={{ animation: 'blink 1s infinite' }}>█</div>
        </div>
      </div>

      {/* Bottom Right: Live Telemetry */}
      <div className="border border-crt-green bg-crt-navy p-4 overflow-auto" style={{ boxShadow: '0 0 4px #00ff41' }}>
        <h2 className="text-crt-amber text-xs tracking-widest mb-4" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}>
          LIVE TELEMETRY
        </h2>
        <div className="space-y-3 text-sm">
          {[
            { label: 'DAILY SPEND', value: '$1,775 / $1,875', pct: 94.7 },
            { label: 'FLEET ROAS', value: '3.55x', pct: 71 },
            { label: 'CONV VELOCITY', value: '18.4/HR', pct: 82 },
            { label: 'BUDGET UTIL', value: '94.7%', pct: 94.7 },
            { label: 'CREATIVE FATIGUE', value: '0.23 (LOW)', pct: 23 },
            { label: 'AUDIENCE SAT', value: '67%', pct: 67 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="text-crt-green opacity-60">{item.label}</span>
                <span className="text-crt-amber">{item.value}</span>
              </div>
              <div className="h-1 bg-crt-black border border-crt-green">
                <div
                  className="h-full bg-crt-green"
                  style={{ width: `${item.pct}%`, boxShadow: '0 0 4px #00ff41', transition: 'width 1s ease' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
