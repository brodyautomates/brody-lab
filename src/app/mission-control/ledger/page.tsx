'use client';

import { revenueStreams, expenses, ledgerStats, revenueVsExpenses, financialAlerts } from '@/lib/mockData';
import RetroChart from '@/components/RetroChart';

function asciiBar(pct: number, width: number = 20): string {
  const filled = Math.round((pct / 100) * width);
  return '\u2588'.repeat(filled) + '\u2591'.repeat(width - filled);
}

function formatCurrency(n: number): string {
  return '$' + n.toLocaleString();
}

function trendArrow(trend: string): string {
  if (trend === 'UP') return '\u25B2';
  if (trend === 'DOWN') return '\u25BC';
  return '\u25BA';
}

function renderSparkline(data: number[]): string {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const blocks = [' ', '\u2581', '\u2582', '\u2583', '\u2584', '\u2585', '\u2586', '\u2587', '\u2588'];
  return data.map((v) => {
    const idx = Math.round(((v - min) / range) * 8);
    return blocks[idx];
  }).join('');
}

export default function LedgerPage() {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalRevenue = revenueStreams.reduce((sum, r) => sum + r.amount, 0);
  const netProfit = ledgerStats.netProfit;

  return (
    <div className="p-3 h-[calc(100vh-64px)] flex flex-col overflow-hidden font-mono bg-black">
      {/* REVENUE BEACON — TOP STRIP */}
      <div className="border border-[#333] p-3 mb-2">
        <div className="text-xs text-term-dim tracking-widest mb-2">$&gt; REVENUE BEACON</div>
        <div className="flex items-center gap-6">
          {/* Large revenue counter */}
          <div className="flex-shrink-0">
            <div className="text-2xl text-white font-bold tracking-wider">
              {formatCurrency(ledgerStats.totalRevenue)}
            </div>
            <div className="text-xs text-term-dim mt-1">
              TOTAL REVENUE &middot; MOM: +{ledgerStats.momGrowth}% {'\u25B2'}
            </div>
          </div>

          {/* Separator */}
          <div className="text-[#333] text-2xl">|</div>

          {/* Mini readouts */}
          <div className="flex gap-6 text-xs">
            <div>
              <div className="text-term-dim">MRR</div>
              <div className="text-white font-bold">{formatCurrency(ledgerStats.mrr)}</div>
              <div className="text-[#555]">{asciiBar(75, 10)}</div>
            </div>
            <div>
              <div className="text-term-dim">ARR</div>
              <div className="text-white font-bold">{formatCurrency(ledgerStats.arr)}</div>
              <div className="text-[#555]">{asciiBar(85, 10)}</div>
            </div>
            <div>
              <div className="text-term-dim">BURN RATE</div>
              <div className="text-white font-bold">{formatCurrency(ledgerStats.burnRate)}</div>
              <div className="text-[#555]">{asciiBar(67, 10)}</div>
            </div>
            <div>
              <div className="text-term-dim">RUNWAY</div>
              <div className="text-white font-bold">{ledgerStats.runway} MO</div>
              <div className="text-[#555]">{asciiBar(58, 10)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION — INCOME STREAMS + EXPENDITURE LOG */}
      <div className="flex-1 flex gap-2 overflow-hidden min-h-0">
        {/* LEFT PANEL — INCOME STREAMS */}
        <div className="flex-1 border border-[#333] p-3 flex flex-col overflow-y-auto">
          <div className="text-xs text-term-dim tracking-widest mb-2">$&gt; INCOME STREAMS</div>
          <div className="flex-1 space-y-2 text-xs">
            {revenueStreams.map((stream) => (
              <div key={stream.name} className="flex items-center gap-2">
                <div className="w-[140px] text-white font-bold truncate">{stream.name}</div>
                <div className="w-[80px] text-white text-right">{formatCurrency(stream.amount)}</div>
                <div className="text-[#888] flex-shrink-0">{asciiBar(stream.pct, 20)}</div>
                <div className="w-[35px] text-term-dim text-right">{stream.pct}%</div>
                <div className={`w-[12px] text-center ${stream.trend === 'UP' ? 'text-white' : stream.trend === 'DOWN' ? 'text-[#555]' : 'text-term-dim'}`}>
                  {trendArrow(stream.trend)}
                </div>
                <div className="text-[#888] text-[10px] tracking-tighter flex-shrink-0">
                  {renderSparkline(stream.sparkline)}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-[#333] pt-2 mt-2 flex items-center gap-2 text-xs">
            <div className="w-[140px] text-white font-bold">TOTAL</div>
            <div className="w-[80px] text-white font-bold text-right">{formatCurrency(totalRevenue)}</div>
            <div className="text-white">{asciiBar(100, 20)}</div>
            <div className="w-[35px] text-white text-right font-bold">100%</div>
          </div>
        </div>

        {/* RIGHT PANEL — EXPENDITURE LOG */}
        <div className="flex-1 border border-[#333] p-3 flex flex-col overflow-y-auto">
          <div className="text-xs text-term-dim tracking-widest mb-2">$&gt; EXPENDITURE LOG</div>
          <div className="flex-1 space-y-2 text-xs">
            {expenses.map((expense) => (
              <div key={expense.name} className="flex items-center gap-2 text-term-dim">
                <div className="w-[140px] font-bold truncate">{expense.name}</div>
                <div className="w-[80px] text-right">{formatCurrency(expense.amount)}</div>
                <div className="text-[#555] flex-shrink-0">{asciiBar(expense.pct, 20)}</div>
                <div className="w-[35px] text-right">{expense.pct}%</div>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-[#333] pt-2 mt-2 flex items-center gap-2 text-xs">
            <div className="w-[140px] text-term-dim font-bold">TOTAL EXPENSES</div>
            <div className="w-[80px] text-term-dim text-right">{formatCurrency(totalExpenses)}</div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <div className="w-[140px] text-white font-bold">NET PROFIT</div>
            <div className="w-[80px] text-white font-bold text-right">{formatCurrency(netProfit)}</div>
            <div className="text-white">{asciiBar(Math.round((netProfit / totalRevenue) * 100), 20)}</div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION — FINANCIAL TELEMETRY */}
      <div className="mt-2 border border-[#333] p-3">
        <div className="text-xs text-term-dim tracking-widest mb-2">$&gt; FINANCIAL TELEMETRY</div>
        <div className="grid grid-cols-2 gap-2">
          <RetroChart
            title="REVENUE TREND"
            data={revenueVsExpenses as Record<string, unknown>[]}
            dataKey="revenue"
            xKey="month"
            unit="$"
          />
          <RetroChart
            title="EXPENSES TREND"
            data={revenueVsExpenses as Record<string, unknown>[]}
            dataKey="expenses"
            xKey="month"
            unit="$"
          />
        </div>

        {/* ALERTS TICKER */}
        <div className="mt-2 border-t border-[#333] pt-2 overflow-hidden">
          <div className="text-xs text-term-dim tracking-widest mb-1">$&gt; ALERTS</div>
          <div className="overflow-hidden whitespace-nowrap text-xs text-white">
            <div className="inline-block animate-[scroll-left_30s_linear_infinite]">
              {financialAlerts.map((alert, i) => (
                <span key={i} className="mr-8">
                  [{String(i + 1).padStart(2, '0')}] {alert} &nbsp;&middot;&nbsp;
                </span>
              ))}
              {financialAlerts.map((alert, i) => (
                <span key={`dup-${i}`} className="mr-8">
                  [{String(i + 1).padStart(2, '0')}] {alert} &nbsp;&middot;&nbsp;
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
