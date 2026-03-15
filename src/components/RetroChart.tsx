'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const LazyChart = dynamic(() => import('./RetroChartInner'), { ssr: false });

interface RetroChartProps {
  title: string;
  data: Record<string, unknown>[];
  dataKey: string;
  xKey?: string;
  color?: string;
  unit?: string;
}

export default function RetroChart(props: RetroChartProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="border border-crt-green bg-crt-navy p-4" style={{ boxShadow: '0 0 4px #00ff41' }}>
      <div className="mb-3 text-xs tracking-widest text-crt-amber" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}>
        {props.title}
      </div>
      {mounted ? <LazyChart {...props} /> : <div className="h-[200px] flex items-center justify-center text-crt-green text-sm opacity-40">LOADING SIGNAL...</div>}
    </div>
  );
}
