'use client';

import { telemetryFeed } from '@/lib/mockData';

export default function StatusTicker() {
  const text = telemetryFeed.join('  ///  ');
  const doubled = `${text}  ///  ${text}`;

  return (
    <div className="border-t border-crt-green overflow-hidden py-1" style={{ boxShadow: '0 0 4px #00ff41' }}>
      <div
        className="whitespace-nowrap text-crt-amber text-sm"
        style={{ animation: 'scroll-left 30s linear infinite' }}
      >
        {doubled}
      </div>
    </div>
  );
}
