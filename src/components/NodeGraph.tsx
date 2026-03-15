'use client';

import { useState, useEffect, useRef } from 'react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  children: string[];
  depth: number;
}

// Generate a complex tree structure
function generateTree(): Node[] {
  const nodes: Node[] = [];
  const root = { id: 'ROOT', label: 'ORCHESTRATOR', x: 600, y: 30, children: ['A', 'B', 'C'], depth: 0 };
  nodes.push(root);

  const layer1 = [
    { id: 'A', label: 'AUDIENCE_SCAN', x: 200, y: 120, children: ['A1', 'A2', 'A3'], depth: 1 },
    { id: 'B', label: 'CREATIVE_ENGINE', x: 600, y: 120, children: ['B1', 'B2'], depth: 1 },
    { id: 'C', label: 'BUDGET_ALLOC', x: 1000, y: 120, children: ['C1', 'C2', 'C3'], depth: 1 },
  ];
  nodes.push(...layer1);

  const layer2 = [
    { id: 'A1', label: 'LOOKALIKE_GEN', x: 80, y: 220, children: ['A1a', 'A1b'], depth: 2 },
    { id: 'A2', label: 'INTEREST_MAP', x: 200, y: 220, children: ['A2a'], depth: 2 },
    { id: 'A3', label: 'RETARGET_POOL', x: 320, y: 220, children: ['A3a', 'A3b'], depth: 2 },
    { id: 'B1', label: 'VARIANT_TEST', x: 520, y: 220, children: ['B1a', 'B1b', 'B1c'], depth: 2 },
    { id: 'B2', label: 'COPY_WRITER', x: 680, y: 220, children: ['B2a'], depth: 2 },
    { id: 'C1', label: 'SPEND_OPTIMIZER', x: 880, y: 220, children: ['C1a', 'C1b'], depth: 2 },
    { id: 'C2', label: 'BID_STRATEGY', x: 1020, y: 220, children: ['C2a'], depth: 2 },
    { id: 'C3', label: 'PACING_CTRL', x: 1140, y: 220, children: [], depth: 2 },
  ];
  nodes.push(...layer2);

  const layer3 = [
    { id: 'A1a', label: 'SEED_1%', x: 40, y: 320, children: [], depth: 3 },
    { id: 'A1b', label: 'SEED_3%', x: 130, y: 320, children: [], depth: 3 },
    { id: 'A2a', label: 'AFFINITY_CLU', x: 200, y: 320, children: [], depth: 3 },
    { id: 'A3a', label: 'SITE_VISIT', x: 290, y: 320, children: [], depth: 3 },
    { id: 'A3b', label: 'CART_ABANDON', x: 380, y: 320, children: [], depth: 3 },
    { id: 'B1a', label: 'IMG_VAR_A', x: 460, y: 320, children: [], depth: 3 },
    { id: 'B1b', label: 'IMG_VAR_B', x: 540, y: 320, children: [], depth: 3 },
    { id: 'B1c', label: 'VID_VAR_A', x: 620, y: 320, children: [], depth: 3 },
    { id: 'B2a', label: 'HEADLINE_GEN', x: 710, y: 320, children: [], depth: 3 },
    { id: 'C1a', label: 'CPA_TARGET', x: 840, y: 320, children: [], depth: 3 },
    { id: 'C1b', label: 'ROAS_TARGET', x: 940, y: 320, children: [], depth: 3 },
    { id: 'C2a', label: 'AUTO_BID', x: 1040, y: 320, children: [], depth: 3 },
  ];
  nodes.push(...layer3);

  return nodes;
}

interface Particle {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
}

export default function NodeGraph({ compact = false }: { compact?: boolean }) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const nodesRef = useRef(generateTree());
  const nodes = nodesRef.current;

  useEffect(() => {
    // Create particles flowing through edges
    const edges: [Node, Node][] = [];
    nodes.forEach(node => {
      node.children.forEach(childId => {
        const child = nodes.find(n => n.id === childId);
        if (child) edges.push([node, child]);
      });
    });

    const initialParticles: Particle[] = edges.flatMap(([from, to]) =>
      Array.from({ length: 3 }, () => ({
        fromX: from.x, fromY: from.y + 10,
        toX: to.x, toY: to.y - 5,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
      }))
    );
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        progress: (p.progress + p.speed) % 1,
      })));
    }, 30);

    // Randomly activate nodes
    const activeInterval = setInterval(() => {
      const randomNodes = nodes
        .filter(() => Math.random() > 0.6)
        .map(n => n.id);
      setActiveNodes(new Set(randomNodes));
    }, 800);

    return () => { clearInterval(interval); clearInterval(activeInterval); };
  }, [nodes]);

  const viewBox = compact ? '0 -10 1200 380' : '0 -20 1200 400';

  return (
    <div className="relative w-full h-full">
      <svg viewBox={viewBox} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid */}
        <defs>
          <pattern id="termgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="0.3" fill="#333" />
          </pattern>
        </defs>
        <rect x="-100" y="-100" width="1400" height="600" fill="url(#termgrid)" />

        {/* Edges */}
        {nodes.map(node =>
          node.children.map(childId => {
            const child = nodes.find(n => n.id === childId);
            if (!child) return null;
            return (
              <line
                key={`${node.id}-${childId}`}
                x1={node.x} y1={node.y + 10}
                x2={child.x} y2={child.y - 5}
                stroke="#333" strokeWidth="1"
              />
            );
          })
        )}

        {/* Particles */}
        {particles.map((p, i) => {
          const x = p.fromX + (p.toX - p.fromX) * p.progress;
          const y = p.fromY + (p.toY - p.fromY) * p.progress;
          return (
            <circle
              key={i} cx={x} cy={y} r="1.5"
              fill="#fff" opacity={0.6 + Math.sin(p.progress * Math.PI) * 0.4}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map(node => {
          const isActive = activeNodes.has(node.id);
          const isSelected = selectedNode === node.id;
          const isLeaf = node.children.length === 0;
          const w = isLeaf ? 70 : (node.depth === 0 ? 100 : 85);

          return (
            <g
              key={node.id}
              onClick={() => !compact && setSelectedNode(isSelected ? null : node.id)}
              style={{ cursor: compact ? 'default' : 'pointer' }}
            >
              {/* Node box */}
              <rect
                x={node.x - w / 2} y={node.y - 12}
                width={w} height={24}
                fill={isSelected ? '#fff' : '#000'}
                stroke={isActive ? '#fff' : '#444'}
                strokeWidth={isSelected ? 1.5 : 0.5}
              />
              {/* Label */}
              <text
                x={node.x} y={node.y + 1}
                textAnchor="middle" dominantBaseline="central"
                fill={isSelected ? '#000' : (isActive ? '#fff' : '#888')}
                fontSize={isLeaf ? 6 : (node.depth === 0 ? 8 : 7)}
                fontFamily="monospace"
              >
                {node.label}
              </text>
              {/* Activity indicator */}
              {isActive && (
                <circle cx={node.x + w / 2 - 4} cy={node.y - 8} r="1.5" fill="#fff">
                  <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Selected node telemetry */}
      {selectedNode && !compact && (
        <div className="absolute top-0 right-0 w-64 h-full bg-black border-l border-[#333] p-3 text-xs overflow-auto">
          <div className="flex justify-between mb-3">
            <span className="text-white">NODE: {selectedNode}</span>
            <button onClick={() => setSelectedNode(null)} className="text-term-dim hover:text-white cursor-pointer">[x]</button>
          </div>
          <div className="text-term-dim mb-3">
            {nodes.find(n => n.id === selectedNode)?.label}
          </div>
          <div className="space-y-1 text-term-dim">
            <div>STATUS .... <span className="text-white">ACTIVE</span></div>
            <div>UPTIME .... <span className="text-white">1847H</span></div>
            <div>CYCLES .... <span className="text-white">{Math.floor(Math.random() * 9000 + 1000)}</span></div>
            <div>LATENCY ... <span className="text-white">{(Math.random() * 2 + 0.1).toFixed(1)}MS</span></div>
            <div>ERRORS .... <span className="text-white">0</span></div>
            <div>LOAD ...... <span className="text-white">{Math.floor(Math.random() * 40 + 20)}%</span></div>
            <div className="pt-2 border-t border-[#222] mt-2">
              CHILDREN: {nodes.find(n => n.id === selectedNode)?.children.join(', ') || 'LEAF'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
