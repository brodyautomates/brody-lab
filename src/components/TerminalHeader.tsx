'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TerminalHeader() {
  const [time, setTime] = useState('');
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const update = () => {
      setTime(new Date().toISOString().replace('T', ' ').slice(0, 19) + 'Z');
    };
    update();
    const t1 = setInterval(update, 1000);
    const t2 = setInterval(() => setFrame(f => f + 1), 150);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const spinner = ['|', '/', '-', '\\'][frame % 4];

  return (
    <header className="border-b border-[#222] px-3 py-1.5 flex items-center justify-between text-xs">
      <div className="flex items-center gap-4">
        <Link href="/mission-control" className="text-white hover:text-term-dim transition-colors">
          MISSION_CONTROL
        </Link>
        <span className="text-term-dim">PID:4821</span>
        <span className="text-term-dim">{spinner}</span>
      </div>
      <nav className="flex gap-4">
        <Link href="/mission-control" className="text-term-dim hover:text-white transition-colors">SYS</Link>
        <Link href="/mission-control/autopilot" className="text-term-dim hover:text-white transition-colors">NODES</Link>
        <Link href="/mission-control/campaigns" className="text-term-dim hover:text-white transition-colors">OPS</Link>
        <Link href="/mission-control/analytics" className="text-term-dim hover:text-white transition-colors">SIG</Link>
      </nav>
      <div className="flex items-center gap-3 text-term-dim">
        <span className="text-white" style={{ animation: 'pulse 3s infinite' }}>●</span>
        <span>{time}</span>
      </div>
    </header>
  );
}
