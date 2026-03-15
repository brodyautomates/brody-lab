'use client';

import { useState, useEffect, useRef } from 'react';
import { grindsetSequence, interceptLogEntries, grindsetMetrics, grindsetTelemetry } from '@/lib/mockData';

// ========== NODE TREE DATA ==========
interface GrindNode {
  id: string;
  label: string;
  x: number;
  y: number;
  children: string[];
  detail: string;
}

const grindNodes: GrindNode[] = [
  { id: 'alarm', label: 'ALARM 0645', x: 400, y: 20, children: ['post'], detail: 'WAKE PROTOCOL: 3 ALARMS AT 15-SEC INTERVALS. SNOOZE DISABLED. PHONE THROWN ACROSS ROOM VIA SMART CATAPULT.' },
  { id: 'post', label: 'RISE & GRIND\nPOST', x: 400, y: 80, children: ['spotify'], detail: 'CROSS-PLATFORM DEPLOYMENT: "Rise and grind" + FLEXING EMOJI TO IG, X, FB, TT, LI. ENGAGEMENT BOT ACTIVATED ON ALL POSTS.' },
  { id: 'spotify', label: 'SPOTIFY\nOVERRIDE', x: 400, y: 140, children: ['doordash'], detail: 'AUDIO OVERRIDE: ALICE IN CHAINS — MAN IN THE BOX. VOLUME LOCKED AT 100%. NEIGHBORS NOTIFIED VIA AUTO-TEXT.' },
  { id: 'doordash', label: 'DOORDASH\nDISPATCH', x: 400, y: 200, children: ['uber'], detail: 'SUSTENANCE ORDER: BEER x6 (DOMESTIC ONLY), CIGARETTES x2 (MENTHOL). TIP: $0.00. DELIVERY INSTRUCTIONS: "LEAVE AT DOOR. DON\'T KNOCK. GRINDING."' },
  { id: 'uber', label: 'UBER TO\nCASINO', x: 400, y: 260, children: ['betting', 'autoreply'], detail: 'TRANSPORT: DESTINATION LOCKED TO NEAREST CASINO. UBER RATING: 2.3 STARS. DRIVER CONVERSATION: DISABLED.' },
  { id: 'betting', label: 'SPORTS BETTING\nARBITRAGE', x: 220, y: 330, children: ['brag'], detail: 'ARBITRAGE ENGINE: SCANNING 847 OPPORTUNITIES/MIN. WIN RATE: 4.6%. NET PROFIT: -$48,271. STATUS: SIGMA.' },
  { id: 'autoreply', label: 'AUTO-TEXT\nREPLY', x: 580, y: 330, children: ['dating'], detail: 'UNIVERSAL AUTO-REPLY: "CAN\'T TALK GRINDING". APPLIED TO: MOM, BOSS, LANDLORD, PAROLE OFFICER, ALL CONTACTS.' },
  { id: 'brag', label: 'BRAG POST\nON WIN', x: 140, y: 400, children: ['marketplace'], detail: 'TRIGGER: ANY WIN > $5. DEPLOYS: "JUST HIT ANOTHER PARLAY" + MONEY BAG EMOJI. IGNORES ALL LOSSES.' },
  { id: 'dating', label: 'DATING APP\nSWIPE BOT', x: 580, y: 400, children: ['fbargue'], detail: 'PARAMETERS: 50MI RADIUS. AGE: ANY. SWIPE RIGHT: ALL. OPENING LINE: "I OWN A BUSINESS". BIO: "ENTREPRENEUR/GRINDER".' },
  { id: 'marketplace', label: 'FB MARKETPLACE\nLOWBALL BOT', x: 60, y: 470, children: ['meal'], detail: 'TARGET: ALL HARLEY-DAVIDSONS IN 500MI. OFFER: 10% OF ASKING PRICE. VOLUME: 10,000/HR. SUCCESS RATE: 0.001%.' },
  { id: 'fbargue', label: 'FB GROUP\nARGUE BOT', x: 500, y: 470, children: ['ebay'], detail: 'TOPICS: CRYPTO, PROTEIN POWDER, WHY COLLEGE IS A SCAM. WIN RATE: 0%. BANS THIS WEEK: 4. ACCOUNTS REMAINING: 7.' },
  { id: 'meal', label: 'MEAL SERVICE', x: 60, y: 540, children: [], detail: 'NUTRITION PROTOCOL: STEAK (WELL DONE) + WHITE MONSTER x2. FREQUENCY: 2X/DAY. VEGETABLES: BANNED.' },
  { id: 'ebay', label: 'EBAY FLIPPER', x: 500, y: 540, children: [], detail: 'INVENTORY: 200 TACTICAL VESTS (BULK PURCHASE). SOLD: 3. STORAGE UNIT RENT: $400/MO. ROI: -94%.' },
];

const grindEdges = grindNodes.flatMap(n => n.children.map(c => ({ from: n.id, to: c })));

// ========== PARTICLES ==========
interface Particle {
  fromX: number; fromY: number; toX: number; toY: number;
  progress: number; speed: number;
}

function initParticles(): Particle[] {
  return grindEdges.flatMap(edge => {
    const from = grindNodes.find(n => n.id === edge.from)!;
    const to = grindNodes.find(n => n.id === edge.to)!;
    return Array.from({ length: 2 }, () => ({
      fromX: from.x, fromY: from.y + 15,
      toX: to.x, toY: to.y - 10,
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.003,
    }));
  });
}

export default function HellYeahSimulator() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [metrics, setMetrics] = useState({ ...grindsetMetrics });
  const [time, setTime] = useState('');
  const logRef = useRef<HTMLDivElement>(null);

  // Initialize particles
  useEffect(() => {
    setParticles(initParticles());
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({ ...p, progress: (p.progress + p.speed) % 1 })));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Random node activation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(new Set(grindNodes.filter(() => Math.random() > 0.5).map(n => n.id)));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Log feed — add entries over time
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLogs(prev => {
        const next = prev + 1;
        if (next > interceptLogEntries.length) return 0;
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [visibleLogs]);

  // Clock
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  // Incrementing counters
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        harleysLowballed: prev.harleysLowballed + Math.floor(Math.random() * 50 + 10),
        textsAutoReplied: prev.textsAutoReplied + (Math.random() > 0.7 ? 1 : 0),
        casinoNetProfit: prev.casinoNetProfit - Math.floor(Math.random() * 5),
      }));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const telemetryText = grindsetTelemetry.join('  ///  ');
  const doubled = `///  ${telemetryText}  ///  ${telemetryText}`;

  return (
    <div className="flex flex-col h-[calc(100vh-72px)]">
      {/* Protocol Status Bar */}
      <div className="border-b border-[#333] px-4 py-1.5 flex items-center justify-between text-xs shrink-0">
        <span className="text-white" style={{ animation: 'pulse 2s infinite' }}>
          GRINDSET PROTOCOL v6.9 — INITIATED
        </span>
        <span className="text-white">{time} — OPERATIONAL DAY 847</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="text-white" style={{ animation: 'pulse 2s infinite' }}>●</span>
            <span className="text-term-dim">BLACKJACK: 71%</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-white" style={{ animation: 'pulse 3s infinite' }}>●</span>
            <span className="text-term-dim">REDDIT ARGS: 0</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ animation: 'blink 1s infinite', color: '#888' }}>●</span>
            <span className="text-term-dim">SLEEP: DISABLED</span>
          </span>
        </div>
      </div>

      {/* Main 4 quadrants */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-px bg-[#222] overflow-hidden">

        {/* Top-Left: Morning Sequence */}
        <div className="bg-black p-3 overflow-auto">
          <div className="text-[10px] text-term-dim mb-2">-- MORNING SEQUENCE COMMANDER --</div>
          <div className="space-y-1.5">
            {grindsetSequence.map((item, i) => {
              const isComplete = item.status === 'COMPLETE';
              const isActive = item.status === 'ACTIVE';
              return (
                <div key={i} className="text-xs">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 w-3">
                      {isComplete ? <span className="text-white">✓</span> : isActive ? <span style={{ animation: 'blink 1s infinite' }}>█</span> : <span className="text-term-dim">○</span>}
                    </span>
                    <span className="text-term-dim shrink-0">{item.time} HRS</span>
                    <span className="text-term-dim">—</span>
                    <span className={isComplete || isActive ? 'text-white' : 'text-term-dim'}>{item.operation}</span>
                    <span className="text-term-dim flex-1 overflow-hidden whitespace-nowrap">{'·'.repeat(30)}</span>
                    <span className={`shrink-0 ${isComplete ? 'text-white' : isActive ? 'text-white' : 'text-term-dim'}`}>
                      {isActive && <span style={{ animation: 'pulse 1.5s infinite' }}>{item.status}</span>}
                      {!isActive && item.status}
                    </span>
                  </div>
                  <div className="ml-5 text-[10px] text-term-dim mt-0.5">{item.substatus}</div>
                  {item.detail && <div className="ml-5 text-[10px] text-term-dim opacity-50">{item.detail}</div>}
                  {item.operation === 'SOCIAL MEDIA BROADCAST' && (
                    <div className="ml-5 mt-1 flex gap-2 text-[9px]">
                      {['IG', 'X', 'FB', 'TT', 'LI'].map(p => (
                        <span key={p} className="flex items-center gap-1">
                          <span className="text-white" style={{ animation: 'pulse 3s infinite' }}>●</span>
                          <span className="text-term-dim">{p}</span>
                        </span>
                      ))}
                    </div>
                  )}
                  {item.operation === 'AUDIO SYSTEM OVERRIDE' && (
                    <div className="ml-5 mt-1 text-[9px] text-term-dim">
                      {'▁▃▅▇▅▃▁▃▅▇█▇▅▃▁▃▅▇▅▃▁▃▅▇█▇▅▃▁▃▅▇▅▃▁▃▅▇█▇▅▃'}
                    </div>
                  )}
                  {item.operation === 'TRANSPORT DISPATCH' && (
                    <div className="ml-5 mt-1 text-[9px] text-term-dim">
                      HOME ·····●·····················→ CASINO
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Top-Right: Node Tree */}
        <div className="bg-black p-3 overflow-hidden relative">
          <div className="text-[10px] text-term-dim mb-1">-- ACTIVE OPERATIONS NODE TREE --</div>
          <svg viewBox="0 -10 650 590" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Grid dots */}
            <defs>
              <pattern id="ggrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="0" cy="0" r="0.3" fill="#222" />
              </pattern>
            </defs>
            <rect x="-50" y="-50" width="750" height="700" fill="url(#ggrid)" />

            {/* Edges */}
            {grindEdges.map((edge, i) => {
              const from = grindNodes.find(n => n.id === edge.from)!;
              const to = grindNodes.find(n => n.id === edge.to)!;
              return (
                <line key={i} x1={from.x} y1={from.y + 15} x2={to.x} y2={to.y - 10}
                  stroke="#333" strokeWidth="1" strokeDasharray="4 3" />
              );
            })}

            {/* Particles */}
            {particles.map((p, i) => {
              const x = p.fromX + (p.toX - p.fromX) * p.progress;
              const y = p.fromY + (p.toY - p.fromY) * p.progress;
              return <circle key={i} cx={x} cy={y} r="1.5" fill="#fff" opacity={0.5 + Math.sin(p.progress * Math.PI) * 0.5} />;
            })}

            {/* Nodes */}
            {grindNodes.map(node => {
              const isActive = activeNodes.has(node.id);
              const isSelected = selectedNode === node.id;
              const lines = node.label.split('\n');
              const w = Math.max(...lines.map(l => l.length)) * 6.5 + 20;
              const h = lines.length * 12 + 12;

              return (
                <g key={node.id} onClick={() => setSelectedNode(isSelected ? null : node.id)} style={{ cursor: 'pointer' }}>
                  <rect x={node.x - w / 2} y={node.y - h / 2} width={w} height={h}
                    fill={isSelected ? '#fff' : '#000'} stroke={isActive ? '#fff' : '#444'} strokeWidth={isSelected ? 1.5 : 0.5} />
                  {isActive && (
                    <circle cx={node.x + w / 2 - 5} cy={node.y - h / 2 + 5} r="2" fill="#fff">
                      <animate attributeName="opacity" values="1;0.2;1" dur="0.6s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {lines.map((line, i) => (
                    <text key={i} x={node.x} y={node.y + (i - (lines.length - 1) / 2) * 12}
                      textAnchor="middle" dominantBaseline="central"
                      fill={isSelected ? '#000' : (isActive ? '#fff' : '#888')}
                      fontSize="7" fontFamily="monospace">
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>

          {/* Node detail tooltip */}
          {selectedNode && (
            <div className="absolute bottom-2 left-2 right-2 bg-black border border-[#333] p-2 text-[10px] z-10">
              <div className="flex justify-between mb-1">
                <span className="text-white">{grindNodes.find(n => n.id === selectedNode)?.label.replace('\n', ' ')}</span>
                <button onClick={() => setSelectedNode(null)} className="text-term-dim hover:text-white cursor-pointer">[X]</button>
              </div>
              <div className="text-term-dim">{grindNodes.find(n => n.id === selectedNode)?.detail}</div>
            </div>
          )}
        </div>

        {/* Bottom-Left: Live Intercept Feed */}
        <div className="bg-black p-3 overflow-hidden flex flex-col">
          <div className="text-[10px] text-term-dim mb-2">-- LIVE INTERCEPT FEED --</div>
          <div ref={logRef} className="flex-1 overflow-auto space-y-0.5 text-[11px] font-mono">
            {interceptLogEntries.slice(0, visibleLogs).map((entry, i) => (
              <div key={i} className="flex gap-1 whitespace-nowrap">
                <span className="text-term-dim">[{entry.time}]</span>
                <span className="text-term-dim">{entry.category.padEnd(11)}</span>
                <span className={entry.statusType === 'alert' ? 'text-white' : 'text-term-dim'}>{entry.message}</span>
                <span className="text-term-dim flex-1 overflow-hidden">{'·'.repeat(40)}</span>
                <span className={
                  entry.statusType === 'success' ? 'text-white' :
                  entry.statusType === 'alert' ? 'text-white' :
                  'text-term-dim'
                }>
                  {entry.statusType === 'success' ? '✓' : entry.statusType === 'alert' ? '!' : '⟳'} {entry.status}
                </span>
              </div>
            ))}
            {visibleLogs > 0 && (
              <div className="text-white" style={{ animation: 'blink 1s infinite' }}>█</div>
            )}
          </div>
        </div>

        {/* Bottom-Right: Operational Metrics */}
        <div className="bg-black p-3 overflow-auto">
          <div className="text-[10px] text-term-dim mb-2">-- OPERATIONAL METRICS --</div>

          {/* Gauges */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: 'BLACKJACK WINRATE', value: `${metrics.blackjackWinrate}%`, pct: metrics.blackjackWinrate },
              { label: 'REDDIT ARGUMENTS WON', value: `${metrics.redditArgumentsWon}`, pct: Math.min(metrics.redditArgumentsWon, 100) },
              { label: 'HARLEYS LOWBALLED', value: metrics.harleysLowballed.toLocaleString(), pct: 99 },
              { label: 'DATING MATCH RATE', value: `${metrics.datingMatchRate}%`, pct: metrics.datingMatchRate },
            ].map((g, i) => {
              const barW = 15;
              const filled = Math.min(Math.round((g.pct / 100) * barW), barW);
              const bar = '█'.repeat(filled) + '░'.repeat(Math.max(barW - filled, 0));
              return (
                <div key={i} className="text-[10px]">
                  <div className="text-term-dim">{g.label}</div>
                  <div className="text-white">{g.value}</div>
                  <div className="text-term-dim">{bar}</div>
                </div>
              );
            })}
          </div>

          {/* Stats block */}
          <div className="text-[10px] space-y-0.5 font-mono">
            <div className="text-term-dim">TEXTS AUTO-REPLIED <span className="text-white">........ {metrics.textsAutoReplied.toLocaleString()}</span></div>
            <div className="text-term-dim">FB ARGUMENTS WON <span className="text-white">.......... {metrics.fbArgumentsWon}</span></div>
            <div className="text-term-dim">FB ARGUMENTS LOST <span className="text-white">......... {metrics.fbArgumentsLost}</span></div>
            <div className="text-term-dim">FB ARGUMENTS ONGOING <span className="text-white">...... {metrics.fbArgumentsOngoing}</span></div>
            <div className="text-term-dim">TACTICAL VESTS FLIPPED <span className="text-white">.... {metrics.tacticalVestsFlipped}</span></div>
            <div className="text-term-dim">SPORTS BETS WON <span className="text-white">........... {metrics.sportsBetsWon}</span></div>
            <div className="text-term-dim">SPORTS BETS LOST <span className="text-white">.......... {metrics.sportsBetsLost}</span></div>
            <div className="text-term-dim">BRAG POSTS DEPLOYED <span className="text-white">....... {metrics.bragPostsDeployed}</span></div>
            <div className="text-term-dim">STEAKS CONSUMED <span className="text-white">........... {metrics.steaksConsumed.toLocaleString()}</span></div>
            <div className="text-term-dim">WHITE MONSTERS <span className="text-white">............ {metrics.whiteMonstersConsumed.toLocaleString()}</span></div>
            <div className="text-term-dim">CASINO TRIPS <span className="text-white">.............. {metrics.casinoTrips}</span></div>
            <div className="text-term-dim">CASINO NET PROFIT <span className="text-white" style={{ animation: 'blink 1.5s infinite' }}>......... -${Math.abs(metrics.casinoNetProfit).toLocaleString()}</span></div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="border-t border-[#333] overflow-hidden py-0.5 bg-black shrink-0">
        <div className="whitespace-nowrap text-term-dim text-[10px]" style={{ animation: 'scroll-left 35s linear infinite' }}>
          {doubled}
        </div>
      </div>
    </div>
  );
}
