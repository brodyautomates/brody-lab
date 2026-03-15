'use client';

import type { Campaign } from '@/lib/mockData';

const statusColor = {
  active: '#00ff41',
  paused: '#ffb000',
  completed: '#555',
};

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const maxRoas = 6;
  const roasWidth = Math.min((campaign.roas / maxRoas) * 100, 100);

  return (
    <div
      className="border border-crt-green p-4 bg-crt-navy relative overflow-hidden hover:border-crt-amber transition-colors"
      style={{ boxShadow: '0 0 4px #00ff41' }}
    >
      {/* Scanline overlay on card */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{ background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)' }}
      />

      <div className="flex items-center justify-between mb-3">
        <span className="text-crt-amber text-xs tracking-widest">{campaign.id}</span>
        <span
          className="inline-block w-2 h-2"
          style={{
            backgroundColor: statusColor[campaign.status],
            boxShadow: `0 0 6px ${statusColor[campaign.status]}`,
            animation: campaign.status === 'active' ? 'pulse 2s infinite' : 'none',
          }}
        />
      </div>

      <h3 className="text-crt-green text-lg mb-3" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}>
        {campaign.name}
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-crt-green opacity-70">FUEL ALLOCATION</span>
          <span className="text-crt-amber">${campaign.dailyBudget}/DAY</span>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-crt-green opacity-70">SIGNAL STRENGTH</span>
            <span className="text-crt-green">{campaign.roas.toFixed(1)}x</span>
          </div>
          <div className="h-2 bg-crt-black border border-crt-green">
            <div className="h-full bg-crt-green transition-all" style={{ width: `${roasWidth}%`, boxShadow: '0 0 4px #00ff41' }} />
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-crt-green opacity-70">CPA</span>
          <span className="text-crt-green">${campaign.cpa.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-crt-green opacity-70">CTR</span>
          <span className="text-crt-green">{campaign.ctr.toFixed(1)}%</span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-crt-green opacity-50 text-xs flex justify-between">
        <span>STATUS: {campaign.status.toUpperCase()}</span>
        <span>SPEND: ${campaign.totalSpend.toLocaleString()}</span>
      </div>
    </div>
  );
}
