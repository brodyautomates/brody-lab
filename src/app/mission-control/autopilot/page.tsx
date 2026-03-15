'use client';

import NodeGraph from '@/components/NodeGraph';

export default function AutopilotPage() {
  return (
    <div className="p-3 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="text-term-dim">-- AGENT COMMAND TREE --</span>
        <span className="text-term-dim flex items-center gap-2">
          <span className="text-white" style={{ animation: 'pulse 2s infinite' }}>●</span>
          ALL AGENTS NOMINAL
        </span>
      </div>

      <div className="flex-1 border border-[#333] bg-black relative overflow-hidden">
        <NodeGraph />
        <div className="absolute bottom-2 right-3 text-[10px] text-term-dim">CLICK NODE FOR TELEMETRY</div>
      </div>

      <div className="mt-2 flex gap-6 text-[10px] text-term-dim">
        <span>● ACTIVE</span>
        <span className="opacity-40">● IDLE</span>
        <span>--- DATA FLOW</span>
        <span>· PARTICLE STREAM</span>
      </div>
    </div>
  );
}
