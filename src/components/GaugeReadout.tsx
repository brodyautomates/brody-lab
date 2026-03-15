'use client';

interface GaugeReadoutProps {
  label: string;
  value: string;
  percentage: number;
}

export default function GaugeReadout({ label, value, percentage }: GaugeReadoutProps) {
  const barWidth = 20;
  const filled = Math.round((percentage / 100) * barWidth);
  const bar = '█'.repeat(filled) + '░'.repeat(barWidth - filled);

  return (
    <div className="text-xs">
      <div className="text-term-dim">{label}</div>
      <div className="text-white">{value}</div>
      <div className="text-term-dim">{bar} {percentage.toFixed(0)}%</div>
    </div>
  );
}
