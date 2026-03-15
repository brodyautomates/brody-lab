'use client';

import { useState } from 'react';
import { campaigns } from '@/lib/mockData';
import CampaignCard from '@/components/CampaignCard';
import PixelButton from '@/components/PixelButton';

type Filter = 'all' | 'active' | 'paused' | 'completed';

export default function CampaignsPage() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all' ? campaigns : campaigns.filter(c => c.status === filter);

  return (
    <div className="p-4 h-[calc(100vh-80px)] flex flex-col overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-crt-amber tracking-widest" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '12px' }}>
          MISSION ROSTER
        </h1>
        <span className="text-crt-green text-sm opacity-60">{filtered.length} MISSIONS</span>
      </div>

      {/* Filter bar */}
      <div className="border border-crt-green bg-crt-navy p-3 mb-4 flex items-center gap-3" style={{ boxShadow: '0 0 4px #00ff41' }}>
        <span className="text-crt-green text-sm opacity-60">&gt; FILTER:</span>
        {(['all', 'active', 'paused', 'completed'] as Filter[]).map((f) => (
          <PixelButton key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f.toUpperCase()}
          </PixelButton>
        ))}
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
        {filtered.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
