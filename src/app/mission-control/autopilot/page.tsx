'use client';

import NodeGraph from '@/components/NodeGraph';

export default function AutopilotPage() {
  return (
    <div className="p-4 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-crt-amber tracking-widest" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '12px' }}>
          AGENT COMMAND TREE
        </h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-block w-2 h-2 bg-crt-green" style={{ animation: 'pulse 2s infinite', boxShadow: '0 0 6px #00ff41' }} />
          <span className="text-crt-green">ALL AGENTS NOMINAL</span>
        </div>
      </div>

      <div className="flex-1 border border-crt-green bg-crt-navy relative overflow-hidden" style={{ boxShadow: '0 0 4px #00ff41' }}>
        {/* Radar sweep effect */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{
          background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,255,65,0.1) 3px, rgba(0,255,65,0.1) 4px)',
        }} />

        <div className="p-4 h-full flex items-center">
          <NodeGraph />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 text-crt-green opacity-30 text-xs">◄ NODE NETWORK ►</div>
        <div className="absolute bottom-2 right-2 text-crt-green opacity-30 text-xs">CLICK NODE FOR TELEMETRY</div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex gap-6 text-xs text-crt-green opacity-60">
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-crt-green" /> ACTIVE
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-crt-amber" /> PROCESSING
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2" style={{ backgroundColor: '#ff0040' }} /> ALERT
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 border-t border-dashed border-crt-green" /> DATA FLOW
        </span>
      </div>
    </div>
  );
}
