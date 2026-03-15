'use client';

interface GaugeReadoutProps {
  label: string;
  value: string;
  percentage: number;
  color?: string;
}

export default function GaugeReadout({ label, value, percentage, color = '#00ff41' }: GaugeReadoutProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#1a1a2e" strokeWidth="6" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          style={{ filter: `drop-shadow(0 0 4px ${color})`, transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fill={color} fontSize="16" fontFamily="VT323, monospace">
          {value}
        </text>
      </svg>
      <span className="text-xs text-crt-green tracking-wider">{label}</span>
    </div>
  );
}
