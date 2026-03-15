'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface RetroChartProps {
  title: string;
  data: Record<string, unknown>[];
  dataKey: string;
  xKey?: string;
  color?: string;
  unit?: string;
}

export default function RetroChart({ title, data, dataKey, xKey = 'day', color = '#00ff41', unit = '' }: RetroChartProps) {
  return (
    <div className="border border-crt-green bg-crt-navy p-4" style={{ boxShadow: '0 0 4px #00ff41' }}>
      <div className="mb-3 text-xs tracking-widest text-crt-amber" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px' }}>
        {title}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#00ff4115" strokeDasharray="2 4" />
          <XAxis
            dataKey={xKey} tick={{ fill: '#00ff41', fontSize: 11, fontFamily: 'VT323, monospace' }}
            axisLine={{ stroke: '#00ff4140' }} tickLine={{ stroke: '#00ff4140' }}
          />
          <YAxis
            tick={{ fill: '#00ff41', fontSize: 11, fontFamily: 'VT323, monospace' }}
            axisLine={{ stroke: '#00ff4140' }} tickLine={{ stroke: '#00ff4140' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #00ff41', fontFamily: 'VT323, monospace', color: '#00ff41' }}
            formatter={(value: unknown) => [`${Number(value).toFixed(2)}${unit}`, dataKey.toUpperCase()]}
          />
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#grad-${dataKey})`} strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
