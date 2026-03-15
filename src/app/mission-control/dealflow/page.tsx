'use client';

import { deals, dealStages, dealStats, dealsClosedMonthly } from '@/lib/mockData';

function asciiBar(pct: number, width: number = 20): string {
  const filled = Math.round((pct / 100) * width);
  return '\u2588'.repeat(filled) + '\u2591'.repeat(width - filled);
}

function formatCurrency(n: number): string {
  return '$' + n.toLocaleString();
}

export default function DealflowPage() {
  const stageData = dealStages.map((stage) => {
    const stageDeals = deals.filter((d) => d.stage === stage);
    const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
    return { stage, deals: stageDeals, count: stageDeals.length, totalValue };
  });

  const maxMonthlyValue = Math.max(...dealsClosedMonthly.map((m) => m.value));

  return (
    <div className="p-3 h-[calc(100vh-64px)] flex flex-col overflow-hidden font-mono">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2 text-xs border-b border-[#333] pb-2">
        <span className="text-term-dim">-- DEALFLOW // BRAND DEAL PIPELINE --</span>
        <span className="text-term-dim">{deals.length} DEALS TRACKED</span>
      </div>

      {/* DEAL TRACKING GRID */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="text-xs text-term-dim mb-1 tracking-widest">$&gt; DEAL TRACKING GRID</div>
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-2 h-full min-w-[1200px]">
            {stageData.map(({ stage, deals: stageDeals, count, totalValue }) => (
              <div
                key={stage}
                className="flex-1 flex flex-col border border-[#333] bg-black min-w-[220px]"
              >
                {/* COLUMN HEADER */}
                <div className="border-b border-[#333] p-2 text-xs">
                  <div className="text-white font-bold tracking-widest">{stage}</div>
                  <div className="text-term-dim mt-1">
                    {count} DEAL{count !== 1 ? 'S' : ''} &middot; {formatCurrency(totalValue)}
                  </div>
                </div>

                {/* DEAL CARDS */}
                <div className="flex-1 overflow-y-auto p-1 space-y-1">
                  {stageDeals.length === 0 && (
                    <div className="text-term-dim text-xs p-2 text-center">-- EMPTY --</div>
                  )}
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className={`border border-[#333] p-2 text-xs ${
                        deal.priority === 'HIGH'
                          ? 'text-white'
                          : deal.priority === 'LOW'
                          ? 'text-[#555]'
                          : 'text-[#999]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-bold tracking-wider ${
                          deal.priority === 'HIGH' ? 'text-white' : deal.priority === 'LOW' ? 'text-[#555]' : 'text-[#aaa]'
                        }`}>
                          {deal.brand}
                        </span>
                        <span className={`text-[10px] ${
                          deal.priority === 'HIGH' ? 'text-white' : 'text-term-dim'
                        }`}>
                          [{deal.priority}]
                        </span>
                      </div>
                      <div className={`mt-1 ${deal.priority === 'HIGH' ? 'text-white' : 'text-term-dim'}`}>
                        {formatCurrency(deal.value)}
                      </div>
                      <div className="text-term-dim mt-1">CONTACT: {deal.contact}</div>
                      <div className="text-term-dim">LAST: {deal.lastActivity}</div>
                      <div className="text-term-dim flex justify-between mt-1">
                        <span>{deal.id}</span>
                        <span>{deal.daysInStage}D IN STAGE</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CLOSED MONTHLY */}
      <div className="mt-2 border border-[#333] p-2">
        <div className="text-xs text-term-dim tracking-widest mb-1">$&gt; DEALS CLOSED MONTHLY</div>
        <div className="grid grid-cols-6 gap-2 text-xs">
          {dealsClosedMonthly.map((m) => {
            const pct = Math.round((m.value / maxMonthlyValue) * 100);
            return (
              <div key={m.month}>
                <div className="text-white font-bold">{m.month}</div>
                <div className="text-term-dim">{m.count} DEALS &middot; {formatCurrency(m.value)}</div>
                <div className="text-[#888]">{asciiBar(pct, 16)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PIPELINE TELEMETRY */}
      <div className="mt-2 border-t border-[#333] pt-2">
        <div className="text-xs text-term-dim tracking-widest mb-1">$&gt; PIPELINE TELEMETRY</div>
        <div className="grid grid-cols-4 gap-3 text-xs">
          <div>
            <div className="text-term-dim">TOTAL PIPELINE VALUE</div>
            <div className="text-white font-bold text-sm">{formatCurrency(dealStats.totalPipeline)}</div>
            <div className="text-[#888]">{asciiBar(75)}</div>
          </div>
          <div>
            <div className="text-term-dim">AVG DEAL SIZE</div>
            <div className="text-white font-bold text-sm">{formatCurrency(dealStats.avgDealSize)}</div>
            <div className="text-[#888]">{asciiBar(55)}</div>
          </div>
          <div>
            <div className="text-term-dim">WIN RATE %</div>
            <div className="text-white font-bold text-sm">{dealStats.winRate}%</div>
            <div className="text-[#888]">{asciiBar(dealStats.winRate)}</div>
          </div>
          <div>
            <div className="text-term-dim">AVG DAYS TO CLOSE</div>
            <div className="text-white font-bold text-sm">{dealStats.avgDaysToClose} DAYS</div>
            <div className="text-[#888]">{asciiBar(Math.min(100, Math.round((dealStats.avgDaysToClose / 60) * 100)))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
