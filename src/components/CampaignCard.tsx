'use client';

import type { Campaign } from '@/lib/mockData';

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const barWidth = 15;
  const roasFilled = Math.round(Math.min((campaign.roas / 6) * barWidth, barWidth));
  const roasBar = '█'.repeat(roasFilled) + '░'.repeat(barWidth - roasFilled);

  return (
    <div className="border border-[#333] p-3 bg-black hover:border-[#666] transition-colors text-xs font-mono">
      <div className="flex items-center justify-between mb-2">
        <span className="text-term-dim">{campaign.id}</span>
        <span className={`${campaign.status === 'active' ? 'text-white' : 'text-term-dim'}`} style={campaign.status === 'active' ? { animation: 'pulse 3s infinite' } : {}}>
          ● {campaign.status}
        </span>
      </div>
      <div className="text-white text-sm mb-2">{campaign.name}</div>
      <div className="space-y-0.5 text-term-dim">
        <div>BUDGET .. ${campaign.dailyBudget}/DAY</div>
        <div>ROAS ... {campaign.roas.toFixed(1)}x {roasBar}</div>
        <div>CPA .... ${campaign.cpa.toFixed(2)}</div>
        <div>CTR .... {campaign.ctr.toFixed(1)}%</div>
        <div className="pt-1 border-t border-[#222] mt-1 text-term-dim">
          TOTAL: ${campaign.totalSpend.toLocaleString()} | {campaign.conversions} CONV
        </div>
      </div>
    </div>
  );
}
