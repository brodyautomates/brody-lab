'use client';

import RetroChart from '@/components/RetroChart';
import { chartData } from '@/lib/mockData';

export default function AnalyticsPage() {
  return (
    <div className="p-3 h-[calc(100vh-64px)] flex flex-col overflow-auto">
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="text-term-dim">-- SIGNAL ANALYSIS --</span>
        <span className="text-term-dim">30-DAY WINDOW</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1">
        <RetroChart title="CPA // COST PER ACQUISITION" data={chartData} dataKey="cpa" unit="$" />
        <RetroChart title="ROAS // RETURN ON AD SPEND" data={chartData} dataKey="roas" unit="x" />
        <RetroChart title="SPEND // DAILY EXPENDITURE" data={chartData} dataKey="spend" unit="$" />
        <RetroChart title="CONV // DAILY CONVERSIONS" data={chartData} dataKey="conversions" unit="" />
      </div>
    </div>
  );
}
