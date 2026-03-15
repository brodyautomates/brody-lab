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
    <div className="border border-[#333] p-3 bg-black">
      <div className="mb-2 text-xs text-term-dim tracking-wider">
        {props.title}
      </div>
      {mounted ? <LazyChart {...props} /> : <div className="h-[180px] flex items-center justify-center text-term-dim text-xs">LOADING...</div>}
    </div>
  );
}
