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
    <div className="p-3 h-[calc(100vh-64px)] flex flex-col overflow-auto">
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="text-term-dim">-- MISSION ROSTER --</span>
        <span className="text-term-dim">{filtered.length} OPS</span>
      </div>

      <div className="flex items-center gap-2 mb-3 text-xs">
        <span className="text-term-dim">$&gt; FILTER</span>
        {(['all', 'active', 'paused', 'completed'] as Filter[]).map((f) => (
          <PixelButton key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </PixelButton>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 flex-1">
        {filtered.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
