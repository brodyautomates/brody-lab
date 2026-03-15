export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  dailyBudget: number;
  totalSpend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cpa: number;
  roas: number;
  ctr: number;
}

export const campaigns: Campaign[] = [
  { id: 'MSN-001', name: 'ALPHA STRIKE', status: 'active', dailyBudget: 250, totalSpend: 4820, impressions: 384000, clicks: 7680, conversions: 192, cpa: 25.10, roas: 4.2, ctr: 2.0 },
  { id: 'MSN-002', name: 'GHOST RECON', status: 'active', dailyBudget: 180, totalSpend: 3240, impressions: 216000, clicks: 5400, conversions: 135, cpa: 24.00, roas: 3.8, ctr: 2.5 },
  { id: 'MSN-003', name: 'NIGHT HAWK', status: 'active', dailyBudget: 320, totalSpend: 7040, impressions: 512000, clicks: 10240, conversions: 256, cpa: 27.50, roas: 5.1, ctr: 2.0 },
  { id: 'MSN-004', name: 'IRON EAGLE', status: 'paused', dailyBudget: 150, totalSpend: 2100, impressions: 140000, clicks: 2800, conversions: 56, cpa: 37.50, roas: 1.9, ctr: 2.0 },
  { id: 'MSN-005', name: 'DELTA FORCE', status: 'active', dailyBudget: 400, totalSpend: 8800, impressions: 640000, clicks: 12800, conversions: 320, cpa: 27.50, roas: 4.6, ctr: 2.0 },
  { id: 'MSN-006', name: 'SHADOW OPS', status: 'completed', dailyBudget: 200, totalSpend: 6000, impressions: 480000, clicks: 9600, conversions: 240, cpa: 25.00, roas: 3.5, ctr: 2.0 },
  { id: 'MSN-007', name: 'THUNDER RUN', status: 'active', dailyBudget: 275, totalSpend: 5225, impressions: 330000, clicks: 6600, conversions: 165, cpa: 31.67, roas: 3.2, ctr: 2.0 },
  { id: 'MSN-008', name: 'VIPER STRIKE', status: 'paused', dailyBudget: 100, totalSpend: 1400, impressions: 98000, clicks: 1960, conversions: 39, cpa: 35.90, roas: 2.1, ctr: 2.0 },
];

export const actionsLog = [
  { time: '14:32:07', action: 'BUDGET REALLOCATED: MSN-001 +$50/day — ROAS exceeds 4.0x threshold' },
  { time: '14:28:15', action: 'CREATIVE ROTATED: MSN-003 — variant B outperforming A by 23%' },
  { time: '14:15:42', action: 'AUDIENCE EXPANDED: MSN-005 — lookalike 2% → 3% — headroom detected' },
  { time: '14:02:33', action: 'CAMPAIGN PAUSED: MSN-004 — CPA exceeded $35 ceiling for 48hrs' },
  { time: '13:55:10', action: 'ALERT CLEARED: MSN-007 — CTR recovered above 1.8% floor' },
  { time: '13:41:28', action: 'OPTIMIZATION CYCLE COMPLETE — 6/8 missions within target parameters' },
  { time: '13:30:00', action: 'SYSTEM DIAGNOSTIC: ALL AGENTS NOMINAL — next cycle in 30min' },
];

export const telemetryFeed = [
  'TOTAL DAILY SPEND: $1,775 / $1,875 ALLOCATED',
  'AVG ROAS ACROSS FLEET: 3.55x',
  'CONVERSION VELOCITY: 18.4/hr',
  'TOP PERFORMER: MSN-003 NIGHT HAWK — ROAS 5.1x',
  'BUDGET UTILIZATION: 94.7%',
  'AGENT UPTIME: 99.97% — LAST RESTART: 72HRS AGO',
  'CREATIVE FATIGUE INDEX: LOW (0.23)',
  'AUDIENCE SATURATION: MSN-005 AT 67% — MONITOR',
  'CPA FLEET AVERAGE: $28.12 — WITHIN TARGET',
  'NEXT OPTIMIZATION WINDOW: T-22MIN',
];

export const agentNodes = [
  { id: 'audience', label: 'AUDIENCE\nSCAN', x: 100, y: 200, status: 'active' as const },
  { id: 'creative', label: 'CREATIVE\nDEPLOY', x: 300, y: 100, status: 'active' as const },
  { id: 'budget', label: 'BUDGET\nALLOCATOR', x: 500, y: 200, status: 'processing' as const },
  { id: 'monitor', label: 'PERFORMANCE\nMONITOR', x: 700, y: 100, status: 'active' as const },
  { id: 'optimizer', label: 'OPTIMIZER', x: 900, y: 200, status: 'active' as const },
  { id: 'reporter', label: 'REPORT\nGENERATOR', x: 1100, y: 100, status: 'active' as const },
];

export const agentConnections = [
  { from: 'audience', to: 'creative' },
  { from: 'creative', to: 'budget' },
  { from: 'budget', to: 'monitor' },
  { from: 'monitor', to: 'optimizer' },
  { from: 'optimizer', to: 'reporter' },
];

export const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  cpa: 25 + Math.sin(i * 0.5) * 8 + Math.random() * 4,
  roas: 3.2 + Math.cos(i * 0.3) * 1.2 + Math.random() * 0.5,
  spend: 1200 + Math.sin(i * 0.4) * 400 + Math.random() * 200,
  conversions: 40 + Math.sin(i * 0.6) * 15 + Math.random() * 10,
}));

export const systemStats = {
  totalSpend: 39625,
  avgRoas: 3.55,
  activeCampaigns: 5,
  conversionsToday: 147,
  uptimeHours: 1847,
};
