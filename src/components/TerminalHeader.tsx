'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TerminalHeader() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-crt-green flex items-center justify-between px-4 py-2" style={{ boxShadow: '0 0 4px #00ff41' }}>
      <Link href="/mission-control" className="text-crt-green text-lg tracking-widest hover:text-crt-amber transition-colors" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}>
        MISSION CONTROL v2.4.1
      </Link>
      <nav className="flex gap-6 text-sm">
        <Link href="/mission-control" className="text-crt-green hover:text-crt-amber transition-colors">DASHBOARD</Link>
        <Link href="/mission-control/autopilot" className="text-crt-green hover:text-crt-amber transition-colors">AUTOPILOT</Link>
        <Link href="/mission-control/campaigns" className="text-crt-green hover:text-crt-amber transition-colors">MISSIONS</Link>
        <Link href="/mission-control/analytics" className="text-crt-green hover:text-crt-amber transition-colors">SIGNALS</Link>
      </nav>
      <div className="flex items-center gap-4 text-sm">
        <span className="inline-block w-2 h-2 bg-crt-green" style={{ animation: 'pulse 2s infinite', boxShadow: '0 0 6px #00ff41' }} />
        <span className="text-crt-green">SYSTEM ONLINE</span>
        <span className="text-crt-amber">{time}</span>
      </div>
    </header>
  );
}
