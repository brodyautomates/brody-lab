'use client';

import { useState } from 'react';
import { funnelStages, leads, leadSources, harvestChartData } from '@/lib/mockData';
import RetroChart from '@/components/RetroChart';

type SortField = 'id' | 'name' | 'emailDomain' | 'score' | 'source' | 'status';
type SortDir = 'asc' | 'desc';

function asciiBar(pct: number, width: number = 20): string {
  const filled = Math.round((pct / 100) * width);
  return '\u2588'.repeat(filled) + '\u2591'.repeat(width - filled);
}

function scoreBar(score: number): string {
  const filled = Math.round((score / 100) * 10);
  return '\u2588'.repeat(filled) + '\u2591'.repeat(10 - filled);
}

export default function HarvestPage() {
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }
    const aStr = String(aVal);
    const bStr = String(bVal);
    return sortDir === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });

  const maxSourceCount = Math.max(...leadSources.map((s) => s.count));

  const sortIndicator = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDir === 'asc' ? ' \u25B2' : ' \u25BC';
  };

  return (
    <div className="p-3 h-[calc(100vh-64px)] flex flex-col overflow-auto font-mono bg-black">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2 text-xs border-b border-[#333] pb-2">
        <span className="text-term-dim">-- HARVEST // LEAD GEN FUNNEL COMMAND CENTER --</span>
        <span className="text-term-dim">{leads.length} LEADS ACTIVE</span>
      </div>

      {/* ===== ACQUISITION FUNNEL ===== */}
      <div className="mb-3">
        <div className="text-xs text-term-dim mb-2 tracking-widest">$&gt; ACQUISITION FUNNEL</div>
        <div className="border border-[#333] bg-black p-3">
          {funnelStages.map((stage, i) => {
            const nextStage = funnelStages[i + 1];
            const convRate = nextStage
              ? ((nextStage.count / stage.count) * 100).toFixed(1)
              : null;
            const barWidth = stage.width;
            const barChars = Math.round((barWidth / 100) * 40);
            return (
              <div key={stage.label} className="mb-1">
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-[140px] text-white shrink-0 tracking-wider">
                    {stage.label}
                  </span>
                  <span className="text-white whitespace-pre">
                    {'\u2588'.repeat(barChars)}
                    {'\u2591'.repeat(40 - barChars)}
                  </span>
                  <span className="w-[70px] text-right text-white shrink-0">
                    {stage.count.toLocaleString()}
                  </span>
                  <span className="w-[80px] text-right text-term-dim shrink-0">
                    {convRate !== null ? `${convRate}% \u2192` : 'FINAL'}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="mt-2 text-xs text-term-dim border-t border-[#333] pt-2">
            TOTAL FUNNEL CONVERSION: {((funnelStages[funnelStages.length - 1].count / funnelStages[0].count) * 100).toFixed(2)}%
            {' // '}
            {funnelStages[0].count.toLocaleString()} VIEWS \u2192 {funnelStages[funnelStages.length - 1].count.toLocaleString()} CUSTOMERS
          </div>
        </div>
      </div>

      {/* ===== LEAD SCORING MATRIX ===== */}
      <div className="mb-3">
        <div className="text-xs text-term-dim mb-2 tracking-widest">$&gt; LEAD SCORING MATRIX</div>
        <div className="border border-[#333] bg-black overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#333] text-term-dim">
                {([
                  ['id', 'LEAD ID'],
                  ['name', 'NAME'],
                  ['emailDomain', 'DOMAIN'],
                  ['score', 'SCORE'],
                  ['source', 'SOURCE'],
                  ['status', 'STATUS'],
                ] as [SortField, string][]).map(([field, label]) => (
                  <th
                    key={field}
                    className="text-left px-3 py-2 cursor-pointer hover:text-white select-none tracking-wider"
                    onClick={() => handleSort(field)}
                  >
                    {label}{sortIndicator(field)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedLeads.map((lead) => {
                const scoreClass =
                  lead.score >= 80
                    ? 'text-white'
                    : lead.score >= 50
                    ? 'text-term-dim'
                    : 'text-white opacity-40';
                return (
                  <tr
                    key={lead.id}
                    className="border-b border-[#333] hover:bg-[#111]"
                  >
                    <td className="px-3 py-1.5 text-term-dim">{lead.id}</td>
                    <td className="px-3 py-1.5 text-white">{lead.name}</td>
                    <td className="px-3 py-1.5 text-term-dim">{lead.emailDomain}</td>
                    <td className={`px-3 py-1.5 whitespace-pre ${scoreClass}`}>
                      {String(lead.score).padStart(3, ' ')} {scoreBar(lead.score)}
                    </td>
                    <td className="px-3 py-1.5 text-term-dim">{lead.source}</td>
                    <td className="px-3 py-1.5 text-white">{lead.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== HARVEST TELEMETRY ===== */}
      <div className="mb-3">
        <div className="text-xs text-term-dim mb-2 tracking-widest">$&gt; HARVEST TELEMETRY</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-3">
          <RetroChart
            title="LEADS/DAY // 30-DAY INTAKE"
            data={harvestChartData as unknown as Record<string, unknown>[]}
            dataKey="leadsPerDay"
            unit=""
          />
          <RetroChart
            title="AVG SCORE // LEAD QUALITY INDEX"
            data={harvestChartData as unknown as Record<string, unknown>[]}
            dataKey="avgScore"
            unit=""
          />
          <RetroChart
            title="CONVERSION RATE // FUNNEL EFFICIENCY"
            data={harvestChartData as unknown as Record<string, unknown>[]}
            dataKey="conversionRate"
            unit="%"
          />
        </div>

        {/* SOURCE SIGNALS */}
        <div className="border border-[#333] bg-black p-3">
          <div className="text-xs text-term-dim mb-2 tracking-widest">SOURCE SIGNALS</div>
          {leadSources.map((src) => {
            const barWidth = Math.round((src.count / maxSourceCount) * 30);
            return (
              <div key={src.source} className="flex items-center gap-3 text-xs mb-1">
                <span className="w-[90px] text-white shrink-0 tracking-wider">
                  {src.source}
                </span>
                <span className="text-white whitespace-pre">
                  {'\u2588'.repeat(barWidth)}
                  {'\u2591'.repeat(30 - barWidth)}
                </span>
                <span className="w-[50px] text-right text-term-dim shrink-0">
                  {src.count.toLocaleString()}
                </span>
                <span className="w-[40px] text-right text-term-dim shrink-0">
                  {src.pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
