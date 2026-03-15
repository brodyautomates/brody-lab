'use client';

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface RetroChartInnerProps {
  data: Record<string, unknown>[];
  dataKey: string;
  xKey?: string;
  unit?: string;
}

export default function RetroChartInner({ data, dataKey, xKey = 'day', unit = '' }: RetroChartInnerProps) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffffff" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#222" strokeDasharray="2 4" />
        <XAxis
          dataKey={xKey} tick={{ fill: '#666', fontSize: 9, fontFamily: 'monospace' }}
          axisLine={{ stroke: '#333' }} tickLine={{ stroke: '#333' }}
        />
        <YAxis
          tick={{ fill: '#666', fontSize: 9, fontFamily: 'monospace' }}
          axisLine={{ stroke: '#333' }} tickLine={{ stroke: '#333' }}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontFamily: 'monospace', color: '#e0e0e0', fontSize: 11 }}
          formatter={(value: unknown) => [`${Number(value).toFixed(2)}${unit}`, dataKey.toUpperCase()]}
        />
        <Area type="monotone" dataKey={dataKey} stroke="#e0e0e0" fill={`url(#grad-${dataKey})`} strokeWidth={1} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
