'use client';

import RetroChart from '@/components/RetroChart';
import { chartData } from '@/lib/mockData';

export default function AnalyticsPage() {
  return (
    <div className="p-4 h-[calc(100vh-80px)] flex flex-col overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-crt-amber tracking-widest" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '12px' }}>
          SIGNAL ANALYSIS
        </h1>
        <span className="text-crt-green text-sm opacity-60">30-DAY READOUT</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        <RetroChart
          title="COST PER ACQUISITION — OSCILLOSCOPE A"
          data={chartData}
          dataKey="cpa"
          unit="$"
          color="#00ff41"
        />
        <RetroChart
          title="RETURN ON AD SPEND — OSCILLOSCOPE B"
          data={chartData}
          dataKey="roas"
          unit="x"
          color="#ffb000"
        />
        <RetroChart
          title="DAILY EXPENDITURE — OSCILLOSCOPE C"
          data={chartData}
          dataKey="spend"
          unit="$"
          color="#00ff41"
        />
        <RetroChart
          title="DAILY CONVERSIONS — OSCILLOSCOPE D"
          data={chartData}
          dataKey="conversions"
          unit=""
          color="#ffb000"
        />
      </div>
    </div>
  );
}
