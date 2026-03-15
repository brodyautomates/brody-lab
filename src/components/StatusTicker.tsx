'use client';

import { telemetryFeed } from '@/lib/mockData';

export default function StatusTicker() {
  const text = telemetryFeed.join('  |  ');
  const doubled = `${text}  |  ${text}`;

  return (
    <div className="border-t border-[#222] overflow-hidden py-0.5 bg-black">
      <div
        className="whitespace-nowrap text-term-dim text-xs"
        style={{ animation: 'scroll-left 40s linear infinite' }}
      >
        {doubled}
      </div>
    </div>
  );
}
