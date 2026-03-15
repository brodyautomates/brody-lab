'use client';

import { emailCampaigns, emailPipelineStages, outboundLog, responseIntercepts } from '@/lib/mockData';

function asciiBar(pct: number): string {
  const filled = Math.round((pct / 100) * 15);
  return '█'.repeat(filled) + '░'.repeat(15 - filled);
}

function conversionRate(from: number, to: number): string {
  if (from === 0) return '0%';
  return `${((to / from) * 100).toFixed(1)}%`;
}

function statusColor(status: string): string {
  switch (status) {
    case 'REPLIED':
      return 'text-white';
    case 'OPENED':
      return 'text-[#999]';
    case 'DELIVERED':
      return 'text-[#666]';
    case 'BOUNCED':
      return 'text-[#444]';
    default:
      return 'text-[#666]';
  }
}

function campaignStatusIndicator(status: 'active' | 'paused' | 'completed'): string {
  switch (status) {
    case 'active':
      return '● LIVE';
    case 'paused':
      return '○ PAUSED';
    case 'completed':
      return '◉ DONE';
  }
}

export default function InterceptorPage() {
  const stageWidth = 100;
  const stageHeight = 40;
  const stageGap = 30;
  const totalWidth = emailPipelineStages.length * stageWidth + (emailPipelineStages.length - 1) * stageGap;
  const svgPadding = 20;
  const fullWidth = totalWidth + svgPadding * 2;
  const fullHeight = 80;

  return (
    <div className="p-3 h-[calc(100vh-64px)] flex flex-col overflow-hidden font-mono text-xs">

      {/* ═══ TOP HALF — CAMPAIGN OPERATIONS ═══ */}
      <div className="flex-1 flex flex-col border border-[#333] mb-2 overflow-hidden">
        <div className="border-b border-[#333] px-3 py-1.5 flex items-center justify-between">
          <span className="text-white text-[10px] tracking-[0.2em]">■ CAMPAIGN OPERATIONS</span>
          <span className="text-[#666] text-[10px]">INTERCEPTOR v2.1 — OUTREACH ENGINE</span>
        </div>

        {/* Pipeline SVG */}
        <div className="px-3 py-3 border-b border-[#333] overflow-x-auto flex-shrink-0">
          <svg
            viewBox={`0 0 ${fullWidth} ${fullHeight}`}
            className="w-full max-w-4xl mx-auto"
            style={{ minWidth: 600 }}
          >
            {/* Flow path for animated dots */}
            <defs>
              <path
                id="flowPath"
                d={`M ${svgPadding + stageWidth / 2} ${fullHeight / 2} ${emailPipelineStages
                  .slice(1)
                  .map((_, i) => {
                    const x = svgPadding + (i + 1) * (stageWidth + stageGap) + stageWidth / 2;
                    return `L ${x} ${fullHeight / 2}`;
                  })
                  .join(' ')}`}
                fill="none"
              />
            </defs>

            {emailPipelineStages.map((stage, i) => {
              const x = svgPadding + i * (stageWidth + stageGap);
              const y = (fullHeight - stageHeight) / 2;

              return (
                <g key={stage.label}>
                  {/* Stage rect */}
                  <rect
                    x={x}
                    y={y}
                    width={stageWidth}
                    height={stageHeight}
                    fill="none"
                    stroke="#555"
                    strokeWidth={1}
                  />
                  {/* Label */}
                  <text
                    x={x + stageWidth / 2}
                    y={y + 15}
                    textAnchor="middle"
                    fill="#999"
                    fontSize={8}
                    fontFamily="monospace"
                  >
                    {stage.label}
                  </text>
                  {/* Count */}
                  <text
                    x={x + stageWidth / 2}
                    y={y + 30}
                    textAnchor="middle"
                    fill="white"
                    fontSize={11}
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {stage.count.toLocaleString()}
                  </text>

                  {/* Arrow + conversion rate to next stage */}
                  {i < emailPipelineStages.length - 1 && (
                    <>
                      <line
                        x1={x + stageWidth}
                        y1={fullHeight / 2}
                        x2={x + stageWidth + stageGap}
                        y2={fullHeight / 2}
                        stroke="#444"
                        strokeWidth={1}
                      />
                      <polygon
                        points={`${x + stageWidth + stageGap - 4},${fullHeight / 2 - 3} ${x + stageWidth + stageGap},${fullHeight / 2} ${x + stageWidth + stageGap - 4},${fullHeight / 2 + 3}`}
                        fill="#444"
                      />
                      <text
                        x={x + stageWidth + stageGap / 2}
                        y={fullHeight / 2 - 8}
                        textAnchor="middle"
                        fill="#666"
                        fontSize={7}
                        fontFamily="monospace"
                      >
                        {conversionRate(stage.count, emailPipelineStages[i + 1].count)}
                      </text>
                    </>
                  )}
                </g>
              );
            })}

            {/* Animated flowing dots */}
            {[0, 1, 2, 3, 4].map((dotIndex) => (
              <circle key={dotIndex} r={2} fill="white" opacity={0.8}>
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  begin={`${dotIndex * 0.8}s`}
                >
                  <mpath href="#flowPath" />
                </animateMotion>
              </circle>
            ))}
          </svg>
        </div>

        {/* Campaign rows */}
        <div className="flex-1 overflow-auto px-3 py-2">
          <div className="grid grid-cols-[auto_1fr_80px_180px_80px_80px_90px] gap-x-3 items-center text-[#666] text-[10px] mb-1 px-1">
            <span>ID</span>
            <span>CAMPAIGN</span>
            <span className="text-right">SENDS</span>
            <span>OPEN RATE</span>
            <span className="text-right">REPLY %</span>
            <span className="text-right">MEETINGS</span>
            <span className="text-right">STATUS</span>
          </div>
          {emailCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="grid grid-cols-[auto_1fr_80px_180px_80px_80px_90px] gap-x-3 items-center py-1.5 px-1 border-t border-[#222] hover:bg-[#111] transition-colors"
            >
              <span className="text-[#666]">{campaign.id}</span>
              <span className="text-white">{campaign.name}</span>
              <span className="text-[#999] text-right">{campaign.totalSends.toLocaleString()}</span>
              <span className="text-[#999] whitespace-nowrap">
                <span className="text-[#666]">{asciiBar(campaign.openRate)}</span>{' '}
                <span className="text-white">{campaign.openRate}%</span>
              </span>
              <span className="text-white text-right">{campaign.replyRate}%</span>
              <span className="text-white text-right">{campaign.meetingsBooked}</span>
              <span className={`text-right ${campaign.status === 'active' ? 'text-white' : 'text-[#666]'}`}>
                {campaignStatusIndicator(campaign.status)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ BOTTOM HALF — INTERCEPT LOG ═══ */}
      <div className="flex-1 flex gap-2 overflow-hidden">

        {/* Left Panel — OUTBOUND FEED */}
        <div className="flex-1 border border-[#333] flex flex-col overflow-hidden">
          <div className="border-b border-[#333] px-3 py-1.5 flex items-center justify-between flex-shrink-0">
            <span className="text-white text-[10px] tracking-[0.2em]">■ OUTBOUND FEED</span>
            <span className="text-[#666] text-[10px]">{outboundLog.length} ENTRIES</span>
          </div>
          <div className="flex-1 overflow-auto px-3 py-2">
            <div className="grid grid-cols-[70px_1fr_1fr_80px] gap-x-2 text-[#444] text-[10px] mb-1">
              <span>TIME</span>
              <span>RECIPIENT</span>
              <span>SUBJECT</span>
              <span className="text-right">STATUS</span>
            </div>
            {outboundLog.map((entry, i) => (
              <div
                key={i}
                className="grid grid-cols-[70px_1fr_1fr_80px] gap-x-2 py-1 border-t border-[#1a1a1a]"
              >
                <span className="text-[#666]">{entry.time}</span>
                <span className="text-[#999] truncate">{entry.recipient}</span>
                <span className="text-[#666] truncate">{entry.subject}</span>
                <span className={`text-right ${statusColor(entry.status)}`}>
                  {entry.status}
                </span>
              </div>
            ))}
            {/* Repeating log entries for scrolling terminal feel */}
            {outboundLog.map((entry, i) => (
              <div
                key={`repeat-${i}`}
                className="grid grid-cols-[70px_1fr_1fr_80px] gap-x-2 py-1 border-t border-[#1a1a1a] opacity-50"
              >
                <span className="text-[#666]">{entry.time}</span>
                <span className="text-[#999] truncate">{entry.recipient}</span>
                <span className="text-[#666] truncate">{entry.subject}</span>
                <span className={`text-right ${statusColor(entry.status)}`}>
                  {entry.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — RESPONSE INTERCEPTS */}
        <div className="flex-1 border border-[#333] flex flex-col overflow-hidden">
          <div className="border-b border-[#333] px-3 py-1.5 flex items-center justify-between flex-shrink-0">
            <span className="text-white text-[10px] tracking-[0.2em]">■ RESPONSE INTERCEPTS</span>
            <span className="text-[#666] text-[10px]">{responseIntercepts.length} POSITIVE</span>
          </div>
          <div className="flex-1 overflow-auto px-3 py-2 space-y-2">
            {responseIntercepts.map((intercept, i) => (
              <div
                key={i}
                className="border border-[#333] p-2.5 hover:border-[#555] transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white text-[10px]">FROM: {intercept.from}</span>
                  <span className="text-[#666] text-[10px]">INTERCEPT #{String(i + 1).padStart(3, '0')}</span>
                </div>
                <div className="border-l-2 border-[#555] pl-2 mb-2">
                  <p className="text-white text-[11px] leading-relaxed">
                    &quot;{intercept.snippet}&quot;
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666] text-[10px]">SUGGESTED ACTION:</span>
                  <span className="text-[#999] text-[10px]">→ {intercept.action}</span>
                </div>
              </div>
            ))}

            {/* Command prompt at bottom */}
            <div className="pt-2 border-t border-[#222]">
              <div className="text-[#666] text-[10px]">
                <span className="text-[#444]">$&gt;</span> AWAITING NEW INTERCEPTS...
                <span className="inline-block w-1.5 h-3 bg-white ml-1 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
