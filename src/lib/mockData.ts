// ========== SEEDED RANDOM ==========
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// ========== MISSION CONTROL ==========
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

export const systemStats = {
  totalSpend: 39625,
  avgRoas: 3.55,
  activeCampaigns: 5,
  conversionsToday: 147,
  uptimeHours: 1847,
};

export const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  cpa: +(25 + Math.sin(i * 0.5) * 8 + seededRandom(i) * 4).toFixed(2),
  roas: +(3.2 + Math.cos(i * 0.3) * 1.2 + seededRandom(i + 100) * 0.5).toFixed(2),
  spend: +(1200 + Math.sin(i * 0.4) * 400 + seededRandom(i + 200) * 200).toFixed(0),
  conversions: +(40 + Math.sin(i * 0.6) * 15 + seededRandom(i + 300) * 10).toFixed(0),
}));

// ========== BROADCAST ==========
export interface ContentOpportunity {
  id: string;
  topic: string;
  trendScore: number;
  platforms: string[];
  angle: number;
  distance: number;
}

export const contentOpportunities: ContentOpportunity[] = [
  { id: 'BRD-001', topic: 'AI AUTOMATION WORKFLOWS', trendScore: 92, platforms: ['IG', 'YT'], angle: 30, distance: 25 },
  { id: 'BRD-002', topic: 'CLAUDE CODE TUTORIAL', trendScore: 88, platforms: ['YT', 'TT'], angle: 75, distance: 35 },
  { id: 'BRD-003', topic: 'AGENCY SCALING TIPS', trendScore: 76, platforms: ['IG', 'X'], angle: 120, distance: 20 },
  { id: 'BRD-004', topic: 'NO-CODE VS CODE DEBATE', trendScore: 71, platforms: ['X', 'YT'], angle: 165, distance: 40 },
  { id: 'BRD-005', topic: 'CLIENT ONBOARDING FLOW', trendScore: 65, platforms: ['IG'], angle: 210, distance: 30 },
  { id: 'BRD-006', topic: 'MCP SERVER SETUP', trendScore: 94, platforms: ['YT', 'IG', 'TT'], angle: 250, distance: 15 },
  { id: 'BRD-007', topic: 'PROMPT ENGINEERING 2.0', trendScore: 83, platforms: ['YT', 'X'], angle: 290, distance: 28 },
  { id: 'BRD-008', topic: 'SAAS LAUNCH PLAYBOOK', trendScore: 59, platforms: ['IG', 'YT'], angle: 330, distance: 45 },
  { id: 'BRD-009', topic: 'AUTONOMOUS AGENTS DEEP DIVE', trendScore: 96, platforms: ['YT'], angle: 50, distance: 12 },
  { id: 'BRD-010', topic: 'WEBHOOK AUTOMATION', trendScore: 68, platforms: ['TT', 'IG'], angle: 140, distance: 38 },
  { id: 'BRD-011', topic: 'REVENUE BREAKDOWN VIDEO', trendScore: 74, platforms: ['YT', 'IG'], angle: 195, distance: 32 },
  { id: 'BRD-012', topic: 'TOOL STACK WALKTHROUGH', trendScore: 81, platforms: ['IG', 'TT', 'YT'], angle: 310, distance: 22 },
];

export interface ScheduledPost {
  id: string;
  time: string;
  platform: string;
  type: string;
  content: string;
  status: 'QUEUED' | 'DEPLOYED' | 'FAILED';
  progress: number;
}

export const scheduledPosts: ScheduledPost[] = [
  { id: 'POST-001', time: '0800', platform: 'IG', type: 'REEL', content: 'HOW I AUTOMATED MY ENTIRE AGENCY IN 30 DAYS', status: 'DEPLOYED', progress: 100 },
  { id: 'POST-002', time: '1000', platform: 'YT', type: 'SHORT', content: 'CLAUDE CODE TRICK THAT SAVES 4 HOURS/DAY', status: 'DEPLOYED', progress: 100 },
  { id: 'POST-003', time: '1200', platform: 'X', type: 'THREAD', content: 'THE AUTONOMOUS AGENCY FRAMEWORK — 7 STEPS', status: 'DEPLOYED', progress: 100 },
  { id: 'POST-004', time: '1400', platform: 'TT', type: 'REEL', content: 'STOP DOING THIS WITH YOUR AI TOOLS', status: 'QUEUED', progress: 65 },
  { id: 'POST-005', time: '1600', platform: 'IG', type: 'CAROUSEL', content: '5 MCP SERVERS EVERY DEVELOPER NEEDS', status: 'QUEUED', progress: 40 },
  { id: 'POST-006', time: '1800', platform: 'YT', type: 'VIDEO', content: 'BUILDING A $10K/MO SAAS WITH CLAUDE CODE', status: 'QUEUED', progress: 20 },
  { id: 'POST-007', time: '2000', platform: 'IG', type: 'REEL', content: 'MY EXACT COLD EMAIL TEMPLATE THAT BOOKS CALLS', status: 'QUEUED', progress: 10 },
  { id: 'POST-008', time: '2200', platform: 'X', type: 'THREAD', content: 'WHY MOST AI AGENCIES WILL FAIL IN 2026', status: 'FAILED', progress: 0 },
];

export const broadcastStats = {
  engagementRate: 4.7,
  followerGrowth: 1247,
  postFrequency: 3.2,
  topPostReach: 284000,
  topPostEngagement: 12400,
  platformHealth: { IG: 'NOMINAL', YT: 'NOMINAL', TT: 'DEGRADED', X: 'NOMINAL' } as Record<string, string>,
};

export const broadcastChartData = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  engagement: +(3.2 + Math.sin(i * 0.4) * 1.5 + seededRandom(i + 400) * 0.8).toFixed(2),
  followers: +(800 + i * 40 + seededRandom(i + 500) * 200).toFixed(0),
  posts: +(2 + Math.sin(i * 0.8) * 1.5 + seededRandom(i + 600) * 1).toFixed(1),
}));

// ========== INTERCEPTOR ==========
export interface EmailCampaign {
  id: string;
  name: string;
  totalSends: number;
  openRate: number;
  replyRate: number;
  meetingsBooked: number;
  status: 'active' | 'paused' | 'completed';
}

export const emailCampaigns: EmailCampaign[] = [
  { id: 'INT-001', name: 'SAAS FOUNDERS Q1', totalSends: 2847, openRate: 42.3, replyRate: 8.7, meetingsBooked: 24, status: 'active' },
  { id: 'INT-002', name: 'AGENCY OWNERS COLD', totalSends: 1520, openRate: 38.1, replyRate: 6.2, meetingsBooked: 12, status: 'active' },
  { id: 'INT-003', name: 'ECOM BRAND OUTREACH', totalSends: 3200, openRate: 35.8, replyRate: 5.1, meetingsBooked: 18, status: 'paused' },
];

export const emailPipelineStages = [
  { label: 'PROSPECTS', count: 7567 },
  { label: 'SEQUENCED', count: 4200 },
  { label: 'SENT', count: 3847 },
  { label: 'OPENED', count: 1540 },
  { label: 'REPLIED', count: 284 },
  { label: 'BOOKED', count: 54 },
];

export const outboundLog = [
  { time: '14:31:42', recipient: 'FOUNDER@ACME.IO', subject: 'RE: SCALING YOUR AD OPS', status: 'REPLIED' },
  { time: '14:29:15', recipient: 'CEO@GROWTH.CO', subject: 'QUICK Q ABOUT YOUR STACK', status: 'OPENED' },
  { time: '14:27:03', recipient: 'OPS@BIGBRAND.COM', subject: 'PARTNERSHIP OPPORTUNITY', status: 'DELIVERED' },
  { time: '14:24:58', recipient: 'HEAD@STARTUP.DEV', subject: 'SAW YOUR RECENT LAUNCH', status: 'OPENED' },
  { time: '14:22:11', recipient: 'MARK@SCALE.AI', subject: 'AUTOMATION FOR YOUR TEAM', status: 'BOUNCED' },
  { time: '14:19:44', recipient: 'LISA@ECOM.STORE', subject: 'RE: FOLLOW UP', status: 'REPLIED' },
  { time: '14:17:20', recipient: 'ADMIN@SAAS.APP', subject: 'INTRO — AI AUTOMATION', status: 'DELIVERED' },
  { time: '14:15:02', recipient: 'JANE@AGENCY.PRO', subject: 'YOUR AD PERFORMANCE', status: 'OPENED' },
];

export const responseIntercepts = [
  { from: 'FOUNDER@ACME.IO', snippet: 'THIS SOUNDS INTERESTING — CAN WE JUMP ON A CALL THURSDAY?', action: 'SEND CALENDLY LINK' },
  { from: 'LISA@ECOM.STORE', snippet: 'WE HAVE BEEN LOOKING FOR EXACTLY THIS. WHAT ARE YOUR RATES?', action: 'SEND RATE CARD + CASE STUDY' },
  { from: 'CEO@GROWTH.CO', snippet: 'FORWARDED TO MY HEAD OF MARKETING — SHE WILL REACH OUT.', action: 'MONITOR FOR FOLLOW-UP' },
];

// ========== DEALFLOW ==========
export interface Deal {
  id: string;
  brand: string;
  value: number;
  contact: string;
  lastActivity: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  daysInStage: number;
  stage: string;
}

export const deals: Deal[] = [
  { id: 'DEAL-001', brand: 'NOTION', value: 25000, contact: 'SARAH K.', lastActivity: '2 HRS AGO', priority: 'HIGH', daysInStage: 3, stage: 'NEGOTIATION' },
  { id: 'DEAL-002', brand: 'VERCEL', value: 15000, contact: 'MIKE T.', lastActivity: '1 DAY AGO', priority: 'HIGH', daysInStage: 7, stage: 'CONTRACT' },
  { id: 'DEAL-003', brand: 'SUPABASE', value: 8000, contact: 'ALEX R.', lastActivity: '3 HRS AGO', priority: 'MEDIUM', daysInStage: 2, stage: 'OUTREACH' },
  { id: 'DEAL-004', brand: 'LINEAR', value: 12000, contact: 'CHRIS L.', lastActivity: '5 HRS AGO', priority: 'MEDIUM', daysInStage: 5, stage: 'NEGOTIATION' },
  { id: 'DEAL-005', brand: 'ANTHROPIC', value: 50000, contact: 'DAN W.', lastActivity: '30 MIN AGO', priority: 'HIGH', daysInStage: 1, stage: 'PROSPECTING' },
  { id: 'DEAL-006', brand: 'RAYCAST', value: 5000, contact: 'EMMA S.', lastActivity: '2 DAYS AGO', priority: 'LOW', daysInStage: 12, stage: 'OUTREACH' },
  { id: 'DEAL-007', brand: 'CURSOR', value: 20000, contact: 'JAMES P.', lastActivity: '6 HRS AGO', priority: 'HIGH', daysInStage: 4, stage: 'CONTRACT' },
  { id: 'DEAL-008', brand: 'STRIPE', value: 35000, contact: 'NINA C.', lastActivity: '1 DAY AGO', priority: 'MEDIUM', daysInStage: 8, stage: 'CLOSED' },
  { id: 'DEAL-009', brand: 'FIGMA', value: 18000, contact: 'RYAN M.', lastActivity: '4 HRS AGO', priority: 'MEDIUM', daysInStage: 6, stage: 'NEGOTIATION' },
  { id: 'DEAL-010', brand: 'ARC BROWSER', value: 3500, contact: 'ZOE K.', lastActivity: '3 DAYS AGO', priority: 'LOW', daysInStage: 15, stage: 'PROSPECTING' },
];

export const dealStages = ['PROSPECTING', 'OUTREACH', 'NEGOTIATION', 'CONTRACT', 'CLOSED'] as const;

export const dealStats = {
  totalPipeline: 191500,
  avgDealSize: 19150,
  winRate: 34,
  avgDaysToClose: 28,
};

export const dealsClosedMonthly = [
  { month: 'OCT', count: 3, value: 28000 },
  { month: 'NOV', count: 5, value: 45000 },
  { month: 'DEC', count: 2, value: 18000 },
  { month: 'JAN', count: 4, value: 52000 },
  { month: 'FEB', count: 6, value: 71000 },
  { month: 'MAR', count: 3, value: 35000 },
];

// ========== SENTINEL ==========
export interface SupportTicket {
  id: string;
  subject: string;
  customer: string;
  severity: 'CRITICAL' | 'HIGH' | 'ROUTINE';
  category: string;
  timeSince: string;
  status: 'OPEN' | 'PROCESSING' | 'RESOLVED';
}

export const supportTickets: SupportTicket[] = [
  { id: 'TKT-4821', subject: 'PAYMENT FAILED — CANNOT ACCESS COURSE', customer: 'JOHN D.', severity: 'CRITICAL', category: 'BILLING', timeSince: '4 MIN', status: 'PROCESSING' },
  { id: 'TKT-4820', subject: 'API KEY NOT WORKING AFTER RESET', customer: 'SARAH M.', severity: 'CRITICAL', category: 'TECHNICAL', timeSince: '12 MIN', status: 'OPEN' },
  { id: 'TKT-4819', subject: 'WRONG PLAN CHARGED ON INVOICE', customer: 'MIKE R.', severity: 'HIGH', category: 'BILLING', timeSince: '23 MIN', status: 'OPEN' },
  { id: 'TKT-4818', subject: 'CANNOT DOWNLOAD PURCHASED TEMPLATE', customer: 'ALEX T.', severity: 'HIGH', category: 'TECHNICAL', timeSince: '35 MIN', status: 'OPEN' },
  { id: 'TKT-4817', subject: 'SHIPPING DELAYED — NO TRACKING UPDATE', customer: 'EMMA L.', severity: 'HIGH', category: 'SHIPPING', timeSince: '42 MIN', status: 'OPEN' },
  { id: 'TKT-4816', subject: 'NEED PASSWORD RESET LINK', customer: 'CHRIS B.', severity: 'ROUTINE', category: 'ACCOUNT', timeSince: '1 HR', status: 'OPEN' },
  { id: 'TKT-4815', subject: 'REFUND REQUEST — COURSE MODULE 3', customer: 'LISA K.', severity: 'HIGH', category: 'BILLING', timeSince: '1 HR', status: 'OPEN' },
  { id: 'TKT-4814', subject: 'LOGIN LOOP ON MOBILE SAFARI', customer: 'DAN P.', severity: 'ROUTINE', category: 'TECHNICAL', timeSince: '2 HR', status: 'OPEN' },
  { id: 'TKT-4813', subject: 'FEATURE REQUEST: DARK MODE', customer: 'NINA W.', severity: 'ROUTINE', category: 'ACCOUNT', timeSince: '2 HR', status: 'RESOLVED' },
  { id: 'TKT-4812', subject: 'WEBHOOK FAILING INTERMITTENTLY', customer: 'RYAN S.', severity: 'HIGH', category: 'TECHNICAL', timeSince: '3 HR', status: 'RESOLVED' },
  { id: 'TKT-4811', subject: 'BULK EXPORT NOT GENERATING CSV', customer: 'ZOE A.', severity: 'ROUTINE', category: 'TECHNICAL', timeSince: '3 HR', status: 'RESOLVED' },
  { id: 'TKT-4810', subject: 'NEED INVOICE FOR TAX FILING', customer: 'MARK J.', severity: 'ROUTINE', category: 'BILLING', timeSince: '4 HR', status: 'RESOLVED' },
  { id: 'TKT-4809', subject: 'TEAM MEMBER CANNOT BE ADDED', customer: 'AMY H.', severity: 'ROUTINE', category: 'ACCOUNT', timeSince: '4 HR', status: 'RESOLVED' },
  { id: 'TKT-4808', subject: 'WRONG TIMEZONE ON SCHEDULED POSTS', customer: 'TOM F.', severity: 'ROUTINE', category: 'TECHNICAL', timeSince: '5 HR', status: 'RESOLVED' },
  { id: 'TKT-4807', subject: 'UPGRADE PLAN — ENTERPRISE INQUIRY', customer: 'KATE V.', severity: 'ROUTINE', category: 'ACCOUNT', timeSince: '6 HR', status: 'RESOLVED' },
];

export const sentinelStats = {
  ticketsToday: 47,
  avgResponseTime: '2.3 MIN',
  aiResolutionRate: 78,
  customerSatisfaction: 94,
};

export const recentDispatches = [
  { id: 'TKT-4813', resolution: 'DARK MODE ADDED TO ROADMAP — AUTO-RESPONSE SENT WITH TIMELINE' },
  { id: 'TKT-4812', resolution: 'WEBHOOK ENDPOINT ROTATED — CUSTOMER NOTIFIED WITH NEW URL' },
  { id: 'TKT-4811', resolution: 'CSV GENERATION QUEUE CLEARED — DOWNLOAD LINK SENT' },
  { id: 'TKT-4810', resolution: 'INVOICE PDF GENERATED AND EMAILED TO CUSTOMER' },
  { id: 'TKT-4809', resolution: 'TEAM SEAT LIMIT INCREASED — INVITE RESENT' },
];

// ========== HARVEST ==========
export const funnelStages = [
  { label: 'PAGE VIEWS', count: 48200, width: 100 },
  { label: 'EMAIL CAPTURED', count: 7230, width: 75 },
  { label: 'QUALIFIED', count: 2892, width: 50 },
  { label: 'SALES CALL', count: 578, width: 30 },
  { label: 'CUSTOMER', count: 145, width: 15 },
];

export interface Lead {
  id: string;
  name: string;
  emailDomain: string;
  score: number;
  source: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED';
}

export const leads: Lead[] = [
  { id: 'LEAD-001', name: 'JAMES CHEN', emailDomain: '@TECHCORP.IO', score: 94, source: 'ORGANIC', status: 'QUALIFIED' },
  { id: 'LEAD-002', name: 'MARIA SANTOS', emailDomain: '@GROWTH.CO', score: 87, source: 'PAID', status: 'CONTACTED' },
  { id: 'LEAD-003', name: 'DAVID KIM', emailDomain: '@STARTUP.DEV', score: 82, source: 'REFERRAL', status: 'QUALIFIED' },
  { id: 'LEAD-004', name: 'ANNA WEBER', emailDomain: '@SCALE.APP', score: 76, source: 'SOCIAL', status: 'CONTACTED' },
  { id: 'LEAD-005', name: 'OMAR HASSAN', emailDomain: '@FOUNDER.VC', score: 91, source: 'ORGANIC', status: 'CONVERTED' },
  { id: 'LEAD-006', name: 'ELENA POPOV', emailDomain: '@BRAND.SHOP', score: 45, source: 'PAID', status: 'NEW' },
  { id: 'LEAD-007', name: 'TYLER BROOKS', emailDomain: '@AGENCY.PRO', score: 68, source: 'DIRECT', status: 'CONTACTED' },
  { id: 'LEAD-008', name: 'PRIYA PATEL', emailDomain: '@SAAS.CLOUD', score: 88, source: 'REFERRAL', status: 'QUALIFIED' },
  { id: 'LEAD-009', name: 'LUCAS MEYER', emailDomain: '@ECOM.STORE', score: 33, source: 'SOCIAL', status: 'NEW' },
  { id: 'LEAD-010', name: 'SOPHIE TRAN', emailDomain: '@DESIGN.CO', score: 72, source: 'ORGANIC', status: 'CONTACTED' },
  { id: 'LEAD-011', name: 'NOAH CLARK', emailDomain: '@DEV.TOOLS', score: 85, source: 'DIRECT', status: 'QUALIFIED' },
  { id: 'LEAD-012', name: 'CHLOE WANG', emailDomain: '@MEDIA.NYC', score: 41, source: 'PAID', status: 'NEW' },
];

export const leadSources = [
  { source: 'ORGANIC', count: 1840, pct: 38 },
  { source: 'PAID', count: 1450, pct: 30 },
  { source: 'REFERRAL', count: 720, pct: 15 },
  { source: 'SOCIAL', count: 530, pct: 11 },
  { source: 'DIRECT', count: 290, pct: 6 },
];

export const harvestChartData = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  leadsPerDay: +(15 + Math.sin(i * 0.5) * 8 + seededRandom(i + 700) * 5).toFixed(0),
  avgScore: +(60 + Math.sin(i * 0.3) * 12 + seededRandom(i + 800) * 8).toFixed(1),
  conversionRate: +(2.5 + Math.cos(i * 0.4) * 1.2 + seededRandom(i + 900) * 0.6).toFixed(2),
}));

// ========== LEDGER ==========
export const revenueStreams = [
  { name: 'COURSE SALES', amount: 42800, pct: 34, trend: 'UP', sparkline: [28, 35, 32, 40, 38, 42, 45] },
  { name: 'CONSULTING', amount: 28500, pct: 23, trend: 'UP', sparkline: [20, 22, 25, 24, 28, 27, 30] },
  { name: 'SAAS MRR', amount: 18200, pct: 15, trend: 'UP', sparkline: [12, 13, 14, 15, 16, 17, 18] },
  { name: 'AFFILIATE', amount: 15400, pct: 12, trend: 'DOWN', sparkline: [18, 17, 16, 15, 16, 14, 15] },
  { name: 'SPONSORSHIPS', amount: 12000, pct: 10, trend: 'FLAT', sparkline: [12, 11, 12, 13, 12, 11, 12] },
  { name: 'DIGITAL PRODUCTS', amount: 8100, pct: 6, trend: 'UP', sparkline: [5, 6, 6, 7, 7, 8, 8] },
];

export const expenses = [
  { name: 'PAYROLL', amount: 32000, pct: 38 },
  { name: 'SOFTWARE', amount: 8400, pct: 10 },
  { name: 'ADS', amount: 18500, pct: 22 },
  { name: 'CONTRACTORS', amount: 12000, pct: 14 },
  { name: 'OPERATIONS', amount: 6800, pct: 8 },
  { name: 'TAXES', amount: 6300, pct: 8 },
];

export const ledgerStats = {
  totalRevenue: 125000,
  totalExpenses: 84000,
  netProfit: 41000,
  mrr: 18200,
  arr: 218400,
  burnRate: 84000,
  runway: 14,
  momGrowth: 12.4,
};

export const revenueVsExpenses = Array.from({ length: 12 }, (_, i) => ({
  month: ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'][i],
  revenue: +(80000 + i * 4000 + seededRandom(i + 1000) * 10000).toFixed(0),
  expenses: +(65000 + i * 1500 + seededRandom(i + 1100) * 5000).toFixed(0),
}));

export const financialAlerts = [
  'SUBSCRIPTION CHURN RATE ELEVATED — 4.2% VS 3.1% TARGET',
  'AD SPEND ROI BELOW THRESHOLD ON CAMPAIGN MSN-004',
  'CONSULTING REVENUE UP 18% MOM — CAPACITY WARNING',
  'TAX PAYMENT DUE IN 14 DAYS — $6,300 RESERVED',
  'SAAS MRR CROSSED $18K MILESTONE',
];

// ========== HELL YEAH SIMULATOR ==========
export interface GrindsetSequenceItem {
  time: string;
  operation: string;
  status: 'COMPLETE' | 'ACTIVE' | 'STANDING BY' | 'ARMED' | 'LOADED' | 'QUEUED' | 'SYNCED';
  substatus: string;
  detail?: string;
}

export const grindsetSequence: GrindsetSequenceItem[] = [
  { time: '0645', operation: 'ALARM TRIGGER', status: 'COMPLETE', substatus: 'Rise and grind deployment queued' },
  { time: '0645', operation: 'SOCIAL MEDIA BROADCAST', status: 'COMPLETE', substatus: '> POSTING: "Rise and grind" to ALL CHANNELS', detail: 'IG/X/FB/TT/LI — ALL DEPLOYED' },
  { time: '0650', operation: 'AUDIO SYSTEM OVERRIDE', status: 'ACTIVE', substatus: 'SPOTIFY API → Man in the Box — Alice in Chains', detail: 'VOLUME: MAXIMUM' },
  { time: '0700', operation: 'SUSTENANCE DELIVERY', status: 'QUEUED', substatus: 'DOORDASH API → Beer (x6) + Cigarettes (x2)', detail: 'ETA: 13 MIN' },
  { time: '0715', operation: 'TRANSPORT DISPATCH', status: 'SYNCED', substatus: 'UBER API → Destination: CASINO', detail: 'Timed to sustenance delivery arrival' },
];

export interface InterceptLogEntry {
  time: string;
  category: string;
  message: string;
  status: string;
  statusType: 'success' | 'progress' | 'alert';
}

export const interceptLogEntries: InterceptLogEntry[] = [
  { time: '0645', category: 'SOCIAL', message: 'Posted "Rise and grind" to Instagram', status: 'DEPLOYED', statusType: 'success' },
  { time: '0645', category: 'SOCIAL', message: 'Posted "Rise and grind" to Twitter', status: 'DEPLOYED', statusType: 'success' },
  { time: '0645', category: 'SOCIAL', message: 'Posted "Rise and grind" to Facebook', status: 'DEPLOYED', statusType: 'success' },
  { time: '0650', category: 'AUDIO', message: 'Spotify: Now playing "Man in the Box" — Alice in Chains', status: 'ACTIVE', statusType: 'success' },
  { time: '0651', category: 'COMMS', message: 'Auto-replied to Mom: "can\'t talk grinding"', status: 'SENT', statusType: 'success' },
  { time: '0651', category: 'COMMS', message: 'Auto-replied to Boss: "can\'t talk grinding"', status: 'SENT', statusType: 'success' },
  { time: '0655', category: 'SUPPLY', message: 'DoorDash order placed: Beer x6, Cigarettes x2', status: 'CONFIRMED', statusType: 'success' },
  { time: '0702', category: 'SUPPLY', message: 'DoorDash ETA: 13 minutes', status: 'TRACKING', statusType: 'progress' },
  { time: '0715', category: 'TRANSPORT', message: 'Uber dispatched to: CASINO', status: 'EN ROUTE', statusType: 'success' },
  { time: '0720', category: 'BETTING', message: 'Arbitrage scan: 847 opportunities analyzed', status: 'COMPLETE', statusType: 'success' },
  { time: '0721', category: 'BETTING', message: 'WIN detected: $47.50 on Packers ML', status: 'PROFIT', statusType: 'success' },
  { time: '0721', category: 'SOCIAL', message: 'Brag post deployed: "Just hit another parlay"', status: 'DEPLOYED', statusType: 'success' },
  { time: '0722', category: 'MARKETPLACE', message: 'Lowball batch sent: 10,000 Harleys targeted', status: 'DISPATCHED', statusType: 'success' },
  { time: '0722', category: 'MARKETPLACE', message: 'Response received: "Are you serious?"', status: 'IGNORED', statusType: 'progress' },
  { time: '0723', category: 'DATING', message: 'Swipe session: 342 right swipes in 50mi radius', status: 'COMPLETE', statusType: 'success' },
  { time: '0723', category: 'DATING', message: 'Match detected: "Linda, 47, loves fishing"', status: 'ALERT', statusType: 'alert' },
  { time: '0730', category: 'SOCIAL', message: 'FB Group argument initiated: "Actually, crypto is..."', status: 'ENGAGED', statusType: 'success' },
  { time: '0731', category: 'SOCIAL', message: 'FB Group argument escalating', status: 'ONGOING', statusType: 'progress' },
  { time: '0731', category: 'SOCIAL', message: 'FB Group: Got called a bot. Denied it', status: 'DEFLECTED', statusType: 'success' },
  { time: '0800', category: 'SUPPLY', message: 'Meal order: Steak + White Monster x2', status: 'LUNCH QUEUED', statusType: 'success' },
  { time: '0801', category: 'COMMERCE', message: 'eBay Flipper: Purchased bulk tactical vests x200', status: 'ACQUIRED', statusType: 'success' },
  { time: '0802', category: 'COMMERCE', message: 'eBay Flipper: Listed 200 tactical vests at 3x', status: 'LISTED', statusType: 'success' },
  { time: '0803', category: 'COMMERCE', message: 'eBay Flipper: 1 vest sold. Profit: $4.20', status: 'FLIPPED', statusType: 'success' },
];

export const grindsetMetrics = {
  textsAutoReplied: 2847,
  fbArgumentsWon: 0,
  fbArgumentsLost: 47,
  fbArgumentsOngoing: 12,
  tacticalVestsFlipped: 3,
  sportsBetsWon: 2,
  sportsBetsLost: 41,
  bragPostsDeployed: 2,
  steaksConsumed: 1694,
  whiteMonstersConsumed: 3388,
  casinoTrips: 847,
  casinoNetProfit: -48271,
  harleysLowballed: 847291,
  datingMatchRate: 0.02,
  blackjackWinrate: 71,
  redditArgumentsWon: 83011,
};

export const grindsetTelemetry = [
  'HELL YEAH PROTOCOL ACTIVE',
  'SLEEP IS FOR THE WEAK',
  'LOWBALLING 10,000 HARLEYS PER HOUR',
  'SIGMA GRINDSET ENGAGED',
  'CASINO NET: -$48,271 BUT WE\'RE UP IN EXPERIENCE',
  'AUTO-ARGUING IN 12 FB GROUPS',
  'TACTICAL GEAR INVENTORY: 197 UNSOLD VESTS',
  'NEXT STEAK ETA: 4H 22M',
];
