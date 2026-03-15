'use client';

import { useState } from 'react';
import { agentNodes, agentConnections } from '@/lib/mockData';

const statusColors: Record<string, string> = {
  active: '#00ff41',
  processing: '#ffb000',
  alert: '#ff0040',
};

const agentTelemetry: Record<string, { metric: string; value: string }[]> = {
  audience: [
    { metric: 'SEGMENTS SCANNED', value: '2,847' },
    { metric: 'LOOKALIKES ACTIVE', value: '12' },
    { metric: 'SATURATION INDEX', value: '0.67' },
  ],
  creative: [
    { metric: 'VARIANTS DEPLOYED', value: '48' },
    { metric: 'FATIGUE INDEX', value: '0.23' },
    { metric: 'TOP VARIANT CTR', value: '3.2%' },
  ],
  budget: [
    { metric: 'TOTAL ALLOCATED', value: '$1,875' },
    { metric: 'UTILIZATION', value: '94.7%' },
    { metric: 'REALLOCATIONS TODAY', value: '3' },
  ],
  monitor: [
    { metric: 'METRICS TRACKED', value: '24' },
    { metric: 'ALERTS FIRED', value: '2' },
    { metric: 'AVG RESPONSE TIME', value: '1.2s' },
  ],
  optimizer: [
    { metric: 'OPTIMIZATIONS RUN', value: '47' },
    { metric: 'ROAS IMPROVEMENT', value: '+12.3%' },
    { metric: 'CPA REDUCTION', value: '-8.7%' },
  ],
  reporter: [
    { metric: 'REPORTS GENERATED', value: '156' },
    { metric: 'LAST REPORT', value: '14:30 UTC' },
    { metric: 'ANOMALIES FLAGGED', value: '1' },
  ],
};

export default function NodeGraph({ compact = false }: { compact?: boolean }) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const scale = compact ? 0.45 : 0.8;
  const viewBox = compact ? '0 0 1300 300' : '0 0 1300 400';
  const nodeWidth = 140;
  const nodeHeight = 60;

  return (
    <div className="relative">
      <svg viewBox={viewBox} className="w-full" style={{ filter: 'drop-shadow(0 0 2px #00ff41)' }}>
        {/* Grid dots background */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="#00ff4120" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Connections */}
        {agentConnections.map((conn, i) => {
          const from = agentNodes.find(n => n.id === conn.from)!;
          const to = agentNodes.find(n => n.id === conn.to)!;
          const x1 = from.x + nodeWidth / 2;
          const y1 = from.y + nodeHeight / 2;
          const x2 = to.x + nodeWidth / 2;
          const y2 = to.y + nodeHeight / 2;

          return (
            <g key={i}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#00ff4140" strokeWidth="2" strokeDasharray="8 4"
              />
              {/* Animated flow dots */}
              {[0, 0.33, 0.66].map((delay, j) => (
                <circle key={j} r="3" fill="#00ff41">
                  <animateMotion
                    dur="3s" repeatCount="indefinite"
                    begin={`${delay * 3}s`}
                    path={`M${x1},${y1} L${x2},${y2}`}
                  />
                </circle>
              ))}
            </g>
          );
        })}

        {/* Nodes */}
        {agentNodes.map((node) => {
          const color = statusColors[node.status];
          const isSelected = selectedNode === node.id;

          return (
            <g
              key={node.id}
              onClick={() => !compact && setSelectedNode(isSelected ? null : node.id)}
              style={{ cursor: compact ? 'default' : 'pointer' }}
            >
              <rect
                x={node.x} y={node.y}
                width={nodeWidth} height={nodeHeight}
                fill="#1a1a2e" stroke={color} strokeWidth="2"
                style={{ filter: `drop-shadow(0 0 4px ${color})` }}
              />
              {/* Status light */}
              <circle
                cx={node.x + nodeWidth - 10} cy={node.y + 10}
                r="4" fill={color}
              >
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Label */}
              {node.label.split('\n').map((line, i) => (
                <text
                  key={i}
                  x={node.x + nodeWidth / 2}
                  y={node.y + nodeHeight / 2 + (i - (node.label.split('\n').length - 1) / 2) * 14}
                  textAnchor="middle" dominantBaseline="central"
                  fill={color} fontSize="11" fontFamily="VT323, monospace"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>

      {/* Side panel */}
      {selectedNode && !compact && (
        <div
          className="absolute top-0 right-0 w-72 h-full bg-crt-navy border-l border-crt-green p-4 overflow-auto"
          style={{ boxShadow: '-4px 0 8px rgba(0,255,65,0.1)' }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-crt-amber text-sm" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px' }}>
              AGENT TELEMETRY
            </h3>
            <button onClick={() => setSelectedNode(null)} className="text-crt-green hover:text-crt-amber cursor-pointer">
              [X]
            </button>
          </div>
          <div className="text-crt-green text-sm mb-4">
            {agentNodes.find(n => n.id === selectedNode)?.label.replace('\n', ' ')}
          </div>
          <div className="space-y-3">
            {agentTelemetry[selectedNode]?.map((item, i) => (
              <div key={i} className="border-b border-crt-green pb-2 opacity-80">
                <div className="text-xs text-crt-green opacity-60">{item.metric}</div>
                <div className="text-crt-amber">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
