'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const systems = [
  { href: '/mission-control', code: 'MISSION CONTROL', desc: 'Meta Ads Autonomous Manager' },
  { href: '/mission-control/broadcast', code: 'BROADCAST', desc: 'Content Ideation & Auto-Post System' },
  { href: '/mission-control/interceptor', code: 'INTERCEPTOR', desc: 'Cold Email Outreach Engine' },
  { href: '/mission-control/dealflow', code: 'DEALFLOW', desc: 'Brand Deal Pipeline CRM' },
  { href: '/mission-control/sentinel', code: 'SENTINEL', desc: 'AI Support Ticket Agent' },
  { href: '/mission-control/harvest', code: 'HARVEST', desc: 'Lead Gen Funnel & Scoring' },
  { href: '/mission-control/ledger', code: 'LEDGER', desc: 'Revenue Operations Center' },
  { href: '/mission-control/hellyeah', code: 'HELL YEAH SIMULATOR', desc: 'Autonomous Grindset Protocol' },
];

export default function SystemSelector() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('');
  const [frame, setFrame] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = systems.find(s => {
    if (s.href === '/mission-control') return pathname === '/mission-control' || pathname === '/mission-control/autopilot' || pathname === '/mission-control/campaigns' || pathname === '/mission-control/analytics';
    return pathname.startsWith(s.href);
  }) || systems[0];

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    update();
    const t1 = setInterval(update, 1000);
    const t2 = setInterval(() => setFrame(f => f + 1), 500);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const cursor = frame % 2 === 0 ? '█' : ' ';

  return (
    <div className="h-10 border-b border-[#333] bg-black flex items-center justify-between px-4 relative z-40 shrink-0" ref={dropdownRef}>
      {/* Left */}
      <div className="text-[9px] text-term-dim tracking-widest whitespace-nowrap">
        ANALOG SYSTEMS NETWORK
      </div>

      {/* Center — dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-xs text-white cursor-pointer hover:text-term-dim transition-colors"
        >
          <span className="text-term-dim">&gt; ACTIVE SYSTEM:</span>
          <span className="border border-[#333] px-3 py-0.5 flex items-center gap-2">
            {current.code}
            <span className="text-term-dim text-[10px]">▼</span>
          </span>
        </button>

        {open && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-96 border border-[#333] bg-black z-50 overflow-hidden">
            {/* Scanline overlay on dropdown */}
            <div className="absolute inset-0 pointer-events-none opacity-5" style={{
              background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)',
            }} />
            <div className="text-[9px] text-term-dim px-3 py-1.5 border-b border-[#222]">
              SELECT SYSTEM
            </div>
            {systems.map((sys) => {
              const isActive = sys.href === current.href;
              return (
                <button
                  key={sys.href}
                  onClick={() => { router.push(sys.href); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-3 transition-colors cursor-pointer ${
                    isActive ? 'bg-[#111] text-white' : 'text-term-dim hover:bg-[#0a0a0a] hover:text-white'
                  }`}
                >
                  {isActive && <span style={{ animation: 'blink 1s infinite' }}>█</span>}
                  {!isActive && <span className="opacity-0">█</span>}
                  <div>
                    <div className={isActive ? 'text-white' : ''}>{sys.code}</div>
                    <div className="text-[10px] text-term-dim">{sys.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 text-xs text-term-dim whitespace-nowrap">
        <span className="text-white" style={{ animation: 'pulse 3s infinite' }}>●</span>
        <span>ONLINE</span>
        <span className="text-white">{time}</span>
        <span className="text-term-dim">{cursor}</span>
      </div>
    </div>
  );
}
