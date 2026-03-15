'use client';

import { useState } from 'react';
import {
  dashboardLeads,
  leadsDashboardStats,
  leadsActivityFeed,
  leadsSourceBreakdown,
  leadsPipelineStages,
  leadsChartData,
  leadsScoreDistribution,
} from '@/lib/mockData';
import type { DashboardLead } from '@/lib/mockData';
import RetroChart from '@/components/RetroChart';

type SortField = 'score' | 'name' | 'company' | 'value' | 'status' | 'source';
type SortDir = 'asc' | 'desc';
type StatusFilter = 'ALL' | DashboardLead['status'];

const STATUS_COLORS: Record<string, string> = {
  NEW: '#ffb000',
  CONTACTED: '#6366f1',
  QUALIFIED: '#00ff41',
  NEGOTIATING: '#00d4ff',
  WON: '#00ff41',
  LOST: '#ff0040',
};

function ScoreRing({ score }: { score: number }) {
  const r = 14;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? '#00ff41' : score >= 60 ? '#ffb000' : '#ff0040';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 36, height: 36 }}>
      <svg width="36" height="36" className="absolute">
        <circle cx="18" cy="18" r={r} fill="none" stroke="#222" strokeWidth="2.5" />
        <circle
          cx="18" cy="18" r={r} fill="none"
          stroke={color} strokeWidth="2.5"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="square"
          transform="rotate(-90 18 18)"
        />
      </svg>
      <span className="text-[10px] font-bold" style={{ color }}>{score}</span>
    </div>
  );
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="border border-[#222] bg-[#0a0a0a] p-4 relative overflow-hidden group hover:border-[#444] transition-colors">
      <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: accent || '#333' }} />
      <div className="text-[10px] text-term-dim tracking-widest mb-2">{label}</div>
      <div className="text-2xl text-white font-bold tracking-tight" style={{ color: accent }}>
        {value}
      </div>
      {sub && <div className="text-[10px] text-term-dim mt-1">{sub}</div>}
    </div>
  );
}

function PipelineBar() {
  const total = leadsPipelineStages.reduce((s, p) => s + p.count, 0);
  const stageColors = ['#ffb000', '#6366f1', '#00ff41', '#00d4ff', '#00ff41'];

  return (
    <div className="border border-[#222] bg-[#0a0a0a] p-4">
      <div className="text-[10px] text-term-dim tracking-widest mb-3">PIPELINE FLOW</div>
      <div className="flex h-2 gap-[2px] mb-3">
        {leadsPipelineStages.map((stage, i) => (
          <div
            key={stage.stage}
            className="h-full transition-all"
            style={{
              width: `${(stage.count / total) * 100}%`,
              background: stageColors[i],
              opacity: 0.8,
            }}
          />
        ))}
      </div>
      <div className="space-y-2">
        {leadsPipelineStages.map((stage, i) => (
          <div key={stage.stage} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2" style={{ background: stageColors[i] }} />
              <span className="text-term-dim">{stage.stage}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white">{stage.count}</span>
              <span className="text-term-dim w-[80px] text-right">${(stage.value / 1000).toFixed(0)}K</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LeadsDashboard() {
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [selectedLead, setSelectedLead] = useState<DashboardLead | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  const sortIndicator = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDir === 'asc' ? ' ▲' : ' ▼';
  };

  const filteredLeads = dashboardLeads
    .filter((l) => statusFilter === 'ALL' || l.status === statusFilter)
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'number' && typeof bVal === 'number')
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

  const statuses: StatusFilter[] = ['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'NEGOTIATING', 'WON', 'LOST'];
  const stats = leadsDashboardStats;

  return (
    <div className="p-4 h-[calc(100vh-64px)] flex flex-col overflow-auto font-mono bg-black">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#222]">
        <div>
          <div className="text-xs text-term-dim tracking-widest">SYSTEM // LEADS DASHBOARD</div>
          <div className="text-lg text-white mt-1 tracking-wide">LEAD INTELLIGENCE CENTER</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-1.5 h-1.5 bg-[#00ff41]" style={{ animation: 'pulse 2s infinite' }} />
            <span className="text-term-dim">LIVE</span>
          </div>
          <div className="text-xs text-term-dim border border-[#333] px-2 py-1">
            {stats.totalLeads} TOTAL
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        <StatCard label="TOTAL LEADS" value={String(stats.totalLeads)} sub={`+${stats.newThisWeek} THIS WEEK`} accent="#e0e0e0" />
        <StatCard label="PIPELINE VALUE" value={`$${(stats.totalPipelineValue / 1000).toFixed(0)}K`} sub="ACROSS ALL STAGES" accent="#6366f1" />
        <StatCard label="QUALIFIED RATE" value={`${stats.qualifiedRate}%`} sub={`AVG SCORE: ${stats.avgScore}`} accent="#00ff41" />
        <StatCard label="WON THIS MONTH" value={String(stats.wonThisMonth)} sub={`$${(stats.wonValue / 1000).toFixed(0)}K VALUE`} accent="#00ff41" />
        <StatCard label="CONVERSION" value={`${stats.conversionRate}%`} sub={`${stats.avgTimeToClose}D AVG CLOSE`} accent="#ffb000" />
        <StatCard label="RESPONSE RATE" value={`${stats.responseRate}%`} sub="ACROSS ALL CHANNELS" accent="#00d4ff" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 flex-1 min-h-0">

        {/* LEFT: LEAD TABLE (3 cols) */}
        <div className="lg:col-span-3 flex flex-col min-h-0">
          {/* FILTERS */}
          <div className="flex items-center gap-1 mb-2 flex-wrap">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`text-[10px] px-2 py-1 border transition-colors tracking-wider ${
                  statusFilter === s
                    ? 'border-white text-white bg-[#1a1a1a]'
                    : 'border-[#222] text-term-dim hover:border-[#444] hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
            <span className="text-[10px] text-term-dim ml-auto">{filteredLeads.length} RESULTS</span>
          </div>

          {/* TABLE */}
          <div className="border border-[#222] bg-[#0a0a0a] overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#222] text-term-dim sticky top-0 bg-[#0a0a0a] z-10">
                  <th className="text-left px-3 py-2.5 w-[36px]"></th>
                  {([
                    ['name', 'NAME'],
                    ['company', 'COMPANY'],
                    ['score', 'SCORE'],
                    ['source', 'SOURCE'],
                    ['value', 'VALUE'],
                    ['status', 'STATUS'],
                  ] as [SortField, string][]).map(([field, label]) => (
                    <th
                      key={field}
                      className="text-left px-3 py-2.5 cursor-pointer hover:text-white select-none tracking-wider"
                      onClick={() => handleSort(field)}
                    >
                      {label}{sortIndicator(field)}
                    </th>
                  ))}
                  <th className="text-left px-3 py-2.5 tracking-wider">ACTIVITY</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={`border-b border-[#111] hover:bg-[#111] cursor-pointer transition-colors ${
                      selectedLead?.id === lead.id ? 'bg-[#111] border-l-2 border-l-white' : ''
                    }`}
                    onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                  >
                    <td className="px-3 py-2">
                      <div
                        className="w-7 h-7 flex items-center justify-center text-[10px] font-bold text-black"
                        style={{ background: STATUS_COLORS[lead.status] || '#666' }}
                      >
                        {lead.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="text-white">{lead.name}</div>
                      <div className="text-[10px] text-term-dim">{lead.email}</div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="text-white">{lead.company}</div>
                      <div className="text-[10px] text-term-dim">{lead.industry}</div>
                    </td>
                    <td className="px-3 py-2">
                      <ScoreRing score={lead.score} />
                    </td>
                    <td className="px-3 py-2 text-term-dim">{lead.source}</td>
                    <td className="px-3 py-2 text-white">${lead.value.toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <span
                        className="text-[10px] px-1.5 py-0.5 border"
                        style={{
                          color: STATUS_COLORS[lead.status],
                          borderColor: STATUS_COLORS[lead.status] + '44',
                          background: STATUS_COLORS[lead.status] + '11',
                        }}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-term-dim text-[10px]">{lead.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SELECTED LEAD DETAIL */}
          {selectedLead && (
            <div className="border border-[#222] bg-[#0a0a0a] p-4 mt-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 flex items-center justify-center text-sm font-bold text-black"
                      style={{ background: STATUS_COLORS[selectedLead.status] || '#666' }}
                    >
                      {selectedLead.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-white text-sm">{selectedLead.name}</div>
                      <div className="text-[10px] text-term-dim">{selectedLead.company} // {selectedLead.industry}</div>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedLead(null)} className="text-term-dim hover:text-white text-xs">[X]</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                <div>
                  <div className="text-[10px] text-term-dim">EMAIL</div>
                  <div className="text-xs text-white mt-0.5">{selectedLead.email}</div>
                </div>
                <div>
                  <div className="text-[10px] text-term-dim">DEAL VALUE</div>
                  <div className="text-xs text-white mt-0.5">${selectedLead.value.toLocaleString()}</div>
                </div>
                {selectedLead.followers && (
                  <div>
                    <div className="text-[10px] text-term-dim">FOLLOWERS</div>
                    <div className="text-xs text-white mt-0.5">{selectedLead.followers.toLocaleString()}</div>
                  </div>
                )}
                {selectedLead.website && (
                  <div>
                    <div className="text-[10px] text-term-dim">WEBSITE</div>
                    <div className="text-xs text-white mt-0.5">{selectedLead.website}</div>
                  </div>
                )}
              </div>
              {selectedLead.tags.length > 0 && (
                <div className="flex gap-1 mt-3">
                  {selectedLead.tags.map((tag) => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 border border-[#333] text-term-dim">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="flex flex-col gap-3 min-h-0 overflow-auto">
          {/* PIPELINE */}
          <PipelineBar />

          {/* ACTIVITY FEED */}
          <div className="border border-[#222] bg-[#0a0a0a] p-4 flex-1 min-h-[200px]">
            <div className="text-[10px] text-term-dim tracking-widest mb-3">ACTIVITY FEED</div>
            <div className="space-y-2">
              {leadsActivityFeed.map((item, i) => (
                <div key={i} className="flex gap-2 text-[10px]">
                  <span className="text-term-dim shrink-0 w-[38px]">{item.time}</span>
                  <span className="shrink-0 w-1 self-stretch" style={{ background: item.color }} />
                  <span className="text-term-dim">
                    <span className="font-bold" style={{ color: item.color }}>{item.type}</span>
                    {' '}{item.message}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SOURCE BREAKDOWN */}
          <div className="border border-[#222] bg-[#0a0a0a] p-4">
            <div className="text-[10px] text-term-dim tracking-widest mb-3">SOURCES</div>
            <div className="space-y-2">
              {leadsSourceBreakdown.map((src) => (
                <div key={src.source}>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-term-dim">{src.source}</span>
                    <span className="text-white">{src.count}</span>
                  </div>
                  <div className="h-1 bg-[#111] w-full">
                    <div className="h-full" style={{ width: `${src.pct}%`, background: src.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SCORE DISTRIBUTION */}
          <div className="border border-[#222] bg-[#0a0a0a] p-4">
            <div className="text-[10px] text-term-dim tracking-widest mb-3">SCORE DISTRIBUTION</div>
            <div className="flex items-end gap-[3px] h-[60px]">
              {leadsScoreDistribution.map((bucket) => {
                const maxPct = Math.max(...leadsScoreDistribution.map((b) => b.pct));
                const height = (bucket.pct / maxPct) * 100;
                const color = parseInt(bucket.range.split('-')[0]) >= 80
                  ? '#00ff41'
                  : parseInt(bucket.range.split('-')[0]) >= 60
                  ? '#ffb000'
                  : '#ff0040';
                return (
                  <div key={bucket.range} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${height}%`, background: color, opacity: 0.7 }} />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-[3px] mt-1">
              {leadsScoreDistribution.map((bucket) => (
                <div key={bucket.range} className="flex-1 text-center text-[8px] text-term-dim">
                  {bucket.range}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-3">
        <RetroChart
          title="NEW LEADS // 30-DAY INTAKE"
          data={leadsChartData as unknown as Record<string, unknown>[]}
          dataKey="newLeads"
          unit=""
        />
        <RetroChart
          title="QUALIFIED // DAILY CONVERSIONS"
          data={leadsChartData as unknown as Record<string, unknown>[]}
          dataKey="qualified"
          unit=""
        />
        <RetroChart
          title="PIPELINE VALUE // 30-DAY TREND"
          data={leadsChartData as unknown as Record<string, unknown>[]}
          dataKey="pipelineValue"
          unit="$"
        />
      </div>
    </div>
  );
}
