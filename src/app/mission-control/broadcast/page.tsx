'use client';

import { useState } from 'react';
import RetroChart from '@/components/RetroChart';
import {
  contentOpportunities,
  scheduledPosts,
  broadcastStats,
  broadcastChartData,
} from '@/lib/mockData';

function trendBar(score: number) {
  const filled = Math.round(score / 10);
  return '█'.repeat(filled) + '░'.repeat(10 - filled);
}

function progressBar(progress: number) {
  const total = 10;
  const filled = Math.round(progress / (100 / total));
  return '█'.repeat(filled) + '░'.repeat(total - filled);
}

export default function BroadcastPage() {
  const [queued, setQueued] = useState<Set<string>>(new Set());

  const handleQueue = (id: string) => {
    setQueued((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="p-3 h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="text-term-dim">-- BROADCAST COMMAND CENTER --</span>
        <span className="text-term-dim">
          {scheduledPosts.filter((p) => p.status === 'DEPLOYED').length}/
          {scheduledPosts.length} DEPLOYED
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 flex-1 min-h-0">
        {/* LEFT: CONTENT RADAR */}
        <div className="border border-[#333] flex flex-col min-h-0 overflow-hidden">
          <div className="px-3 pt-3 pb-1 text-xs text-term-dim tracking-wider border-b border-[#333] flex items-center justify-between shrink-0">
            <span>CONTENT RADAR</span>
            <span className="text-term-dim">{contentOpportunities.length} TARGETS</span>
          </div>

          {/* RADAR DISPLAY */}
          <div className="flex justify-center py-4 shrink-0">
            <div className="relative w-[140px] h-[140px]">
              <svg viewBox="0 0 140 140" className="w-full h-full">
                {/* Radar rings */}
                <circle cx="70" cy="70" r="65" fill="none" stroke="#222" strokeWidth="0.5" />
                <circle cx="70" cy="70" r="45" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
                <circle cx="70" cy="70" r="25" fill="none" stroke="#1a1a1a" strokeWidth="0.5" />
                {/* Crosshairs */}
                <line x1="5" y1="70" x2="135" y2="70" stroke="#1a1a1a" strokeWidth="0.5" />
                <line x1="70" y1="5" x2="70" y2="135" stroke="#1a1a1a" strokeWidth="0.5" />
                {/* Blips */}
                {contentOpportunities.map((opp) => {
                  const rad = (opp.angle * Math.PI) / 180;
                  const r = (opp.distance / 50) * 60;
                  const x = 70 + r * Math.cos(rad);
                  const y = 70 + r * Math.sin(rad);
                  const brightness = opp.trendScore > 85 ? '#fff' : opp.trendScore > 70 ? '#999' : '#555';
                  return (
                    <g key={opp.id}>
                      <circle cx={x} cy={y} r="2.5" fill={brightness} className="animate-[pulse_2s_ease-in-out_infinite]" style={{ animationDelay: `${opp.angle * 10}ms` }} />
                    </g>
                  );
                })}
                {/* Sweep line */}
                <line
                  x1="70"
                  y1="70"
                  x2="70"
                  y2="5"
                  stroke="#555"
                  strokeWidth="1"
                  className="origin-[70px_70px]"
                  style={{
                    animation: 'radar-sweep 4s linear infinite',
                    transformOrigin: '70px 70px',
                  }}
                />
                {/* Sweep gradient trail */}
                <path
                  d="M70,70 L70,5 A65,65 0 0,1 126.3,37.5 Z"
                  fill="url(#sweepGrad)"
                  className="origin-[70px_70px]"
                  style={{
                    animation: 'radar-sweep 4s linear infinite',
                    transformOrigin: '70px 70px',
                  }}
                />
                <defs>
                  <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* CONTENT LIST */}
          <div className="flex-1 overflow-auto px-2 pb-2">
            {contentOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="border border-[#222] p-2 mb-1 text-[10px] hover:border-[#444] transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-white font-bold leading-tight flex-1">
                    {opp.topic}
                  </span>
                  <button
                    onClick={() => handleQueue(opp.id)}
                    className={`shrink-0 px-1.5 py-0.5 border text-[9px] tracking-wider cursor-pointer transition-colors ${
                      queued.has(opp.id)
                        ? 'border-white text-black bg-white'
                        : 'border-[#444] text-term-dim hover:border-white hover:text-white'
                    }`}
                  >
                    {queued.has(opp.id) ? 'QUEUED' : 'QUEUE'}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-term-dim">
                  <span className="text-[9px] w-[28px]">{opp.trendScore}%</span>
                  <span className="text-[9px] tracking-[0.15em] leading-none">
                    {trendBar(opp.trendScore)}
                  </span>
                </div>
                <div className="flex gap-1 mt-1">
                  {opp.platforms.map((p) => (
                    <span
                      key={p}
                      className="text-[8px] border border-[#333] px-1 text-term-dim"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: DEPLOYMENT QUEUE */}
        <div className="border border-[#333] flex flex-col min-h-0 overflow-hidden">
          <div className="px-3 pt-3 pb-1 text-xs text-term-dim tracking-wider border-b border-[#333] flex items-center justify-between shrink-0">
            <span>DEPLOYMENT QUEUE</span>
            <span className="text-term-dim">
              {scheduledPosts.filter((p) => p.status === 'QUEUED').length} PENDING
            </span>
          </div>

          <div className="flex-1 overflow-auto px-3 py-2">
            {scheduledPosts.map((post, i) => (
              <div key={post.id} className="flex gap-3 mb-0.5">
                {/* TIMELINE */}
                <div className="flex flex-col items-center shrink-0 w-3">
                  <div
                    className={`w-1.5 h-1.5 ${
                      post.status === 'DEPLOYED'
                        ? 'bg-white'
                        : post.status === 'FAILED'
                        ? 'bg-[#555] animate-[blink_1s_ease-in-out_infinite]'
                        : 'bg-[#444]'
                    }`}
                  />
                  {i < scheduledPosts.length - 1 && (
                    <div className="w-[1px] flex-1 bg-[#222] min-h-[40px]" />
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex-1 pb-3 text-[10px]">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white font-bold">
                      {post.time.slice(0, 2)}:{post.time.slice(2)}
                    </span>
                    <span className="border border-[#333] px-1 text-term-dim text-[8px]">
                      {post.platform}
                    </span>
                    <span className="border border-[#333] px-1 text-term-dim text-[8px]">
                      {post.type}
                    </span>
                    <span
                      className={`ml-auto text-[8px] tracking-wider ${
                        post.status === 'DEPLOYED'
                          ? 'text-white'
                          : post.status === 'FAILED'
                          ? 'text-[#888] animate-[blink_1s_ease-in-out_infinite]'
                          : 'text-term-dim'
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <div className="text-term-dim leading-tight mb-1 pr-2">
                    {post.content}
                  </div>
                  <div className="flex items-center gap-2 text-[9px]">
                    <span className="text-term-dim tracking-[0.1em] leading-none">
                      {progressBar(post.progress)}
                    </span>
                    <span className="text-term-dim">{post.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: PERFORMANCE TELEMETRY */}
        <div className="border border-[#333] flex flex-col min-h-0 overflow-hidden">
          <div className="px-3 pt-3 pb-1 text-xs text-term-dim tracking-wider border-b border-[#333] shrink-0">
            PERFORMANCE TELEMETRY
          </div>

          <div className="flex-1 overflow-auto">
            {/* CHARTS */}
            <div className="p-2 space-y-2">
              <RetroChart
                title="ENGAGEMENT RATE // 30D"
                data={broadcastChartData}
                dataKey="engagement"
                unit="%"
              />
              <RetroChart
                title="FOLLOWER GROWTH // 30D"
                data={broadcastChartData}
                dataKey="followers"
                unit=""
              />
            </div>

            {/* PLATFORM HEALTH */}
            <div className="px-3 pb-2">
              <div className="text-[10px] text-term-dim tracking-wider mb-2 border-b border-[#222] pb-1">
                PLATFORM STATUS
              </div>
              {Object.entries(broadcastStats.platformHealth).map(
                ([platform, status]) => (
                  <div
                    key={platform}
                    className="flex items-center justify-between text-[10px] py-0.5"
                  >
                    <span className="text-term-dim">{platform}</span>
                    <span
                      className={
                        status === 'NOMINAL'
                          ? 'text-white'
                          : 'text-[#888] animate-[pulse_2s_ease-in-out_infinite]'
                      }
                    >
                      [{status}]
                    </span>
                  </div>
                )
              )}
            </div>

            {/* TOP STATS */}
            <div className="px-3 pb-3">
              <div className="text-[10px] text-term-dim tracking-wider mb-2 border-b border-[#222] pb-1">
                BROADCAST METRICS
              </div>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-term-dim">ENGAGEMENT RATE</span>
                  <span className="text-white">{broadcastStats.engagementRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-term-dim">FOLLOWER GROWTH (30D)</span>
                  <span className="text-white">+{broadcastStats.followerGrowth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-term-dim">POST FREQUENCY</span>
                  <span className="text-white">{broadcastStats.postFrequency}/DAY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-term-dim">TOP POST REACH</span>
                  <span className="text-white">{(broadcastStats.topPostReach / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-term-dim">TOP POST ENGAGEMENT</span>
                  <span className="text-white">{(broadcastStats.topPostEngagement / 1000).toFixed(1)}K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RADAR SWEEP ANIMATION */}
      <style>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
